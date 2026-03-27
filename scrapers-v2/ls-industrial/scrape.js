/**
 * LS Industrial (LS Electric) Product Scraper
 *
 * Scrapes product data from the LS Electric website.
 * Uses the /api/products/list/en JSON endpoint for product discovery,
 * then uses puppeteer-core to render individual product pages for full details.
 */

import puppeteer from 'puppeteer-core';
import { findChrome, sleep, absoluteUrl, retryFetch, makeProduct, deduplicateBy, saveOutput, puppeteerPool } from '../shared/utils.js';
import { printValidationReport } from '../shared/schema.js';

const BASE_URL = 'https://www.ls-electric.com';
const API_URL = `${BASE_URL}/api/products/list/en`;
const POOL_SIZE = 2;
const SCROLL_DELAY = 500;

const DEPTH1_NAMES = {
  'AAA': 'Smart Power Solution',
  'BBB': 'Smart Automation Solution',
  'CCC': 'Smart Railway Solution',
};

function encodeProductUrl(name) {
  return name.replace(/ /g, '_').replace(/\(/g, '-*').replace(/\)/g, '*-').replace(/\//g, '!').replace(/™/g, '-tm');
}

async function discoverProductsFromApi() {
  console.log('Fetching product catalog from API…');
  const res = await retryFetch(API_URL, { headers: { Accept: 'application/json' } });
  const data = res.data;

  if (!Array.isArray(data)) {
    console.log('  API did not return an array');
    return [];
  }

  const categories = data.filter(d => d.p_type === 'C');
  const products = data.filter(d => d.p_type === 'P');

  console.log(`  ${categories.length} categories, ${products.length} products from API\n`);

  const catLookup = {};
  for (const cat of categories) {
    catLookup[`${cat.c_depth1}_${cat.c_depth2}_${cat.c_depth3 || ''}`] = cat.p_name;
  }

  const result = products.map(p => {
    const depth1Name = DEPTH1_NAMES[p.c_depth1] || 'Other';
    const depth2Name = catLookup[`${p.c_depth1}_${p.c_depth2}_`] || '';
    const depth3Name = catLookup[`${p.c_depth1}_${p.c_depth2}_${p.c_depth3 || ''}`] || '';

    const urlParts = ['/products/category', encodeProductUrl(depth1Name)];
    if (depth2Name) urlParts.push(encodeProductUrl(depth2Name));
    if (depth3Name && depth3Name !== depth2Name) urlParts.push(encodeProductUrl(depth3Name));
    urlParts.push(encodeProductUrl(p.p_name));
    const url = BASE_URL + urlParts.join('/');

    return {
      name: p.p_name,
      category: depth2Name || depth1Name,
      subcategory: depth3Name || depth2Name || 'General',
      url,
      apiData: p,
    };
  });

  return result;
}

async function scrapeProductPage(page, url, category) {
  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(1200);

    const data = await page.evaluate((base) => {
      const name = document.querySelector('h1, h2.product-name, .product-title')?.textContent?.trim() || '';
      if (!name) return null;

      // Description
      let description = '';
      for (const sel of ['.product-description', '[class*="desc"]', '.overview', 'meta[name="description"]', 'meta[property="og:description"]']) {
        const el = document.querySelector(sel);
        if (el) {
          description = el.content || el.textContent?.trim() || '';
          if (description && description.length > 20) break;
        }
      }
      if (!description || description.length < 20) {
        const paras = document.querySelectorAll('main p, .content p, article p');
        description = Array.from(paras).map(p => p.textContent.trim()).filter(t => t.length > 15).join('\n');
      }

      // Images
      const images = [];
      const seenImg = new Set();
      document.querySelectorAll('img').forEach(img => {
        const src = img.src || img.getAttribute('data-src') || '';
        if (
          src && !seenImg.has(src) &&
          !src.includes('logo') && !src.includes('icon') && !src.includes('flag') &&
          !src.includes('placeholder') && !src.includes('1x1') &&
          (src.includes('ls-electric') || src.includes('lsis') || src.includes('product') || src.includes('/upload/'))
        ) {
          seenImg.add(src);
          images.push(src);
        }
      });

      // Specs
      const specs = [];
      document.querySelectorAll('table tr').forEach(row => {
        const cells = row.querySelectorAll('td, th');
        if (cells.length >= 2) {
          const label = cells[0]?.textContent?.trim();
          const value = cells[1]?.textContent?.trim();
          if (label && value && label.length < 120 && value.length < 400) {
            specs.push({ label, value });
          }
        }
      });
      document.querySelectorAll('dl').forEach(dl => {
        const dts = dl.querySelectorAll('dt');
        const dds = dl.querySelectorAll('dd');
        dts.forEach((dt, i) => {
          const label = dt.textContent.trim();
          const value = dds[i]?.textContent?.trim();
          if (label && value) specs.push({ label, value });
        });
      });

      // Features
      const features = [];
      document.querySelectorAll('li').forEach(li => {
        const t = li.textContent?.trim();
        if (t && t.length > 10 && t.length < 300 && !t.includes('©') && !t.includes('Cookie') && !t.includes('Privacy')) {
          features.push(t);
        }
      });

      // Documents
      const documents = [];
      document.querySelectorAll('a[href$=".pdf"]').forEach(a => {
        const docUrl = a.href;
        const docName = a.textContent?.trim() || 'Document';
        if (docUrl) documents.push({ name: docName, url: docUrl, type: 'pdf' });
      });

      // Model
      const modelEl = document.querySelector('[class*="model"], [class*="part-number"]');
      const model = modelEl?.textContent?.trim() || name;

      return { name, model, description, images, specs, features, documents };
    }, BASE_URL);

    if (!data || !data.name) return null;

    return makeProduct({
      brand: 'LS Industrial',
      name: data.name,
      model: data.model,
      category: category.category || 'Other Products',
      subcategory: category.subcategory || 'General',
      description: data.description,
      url,
      images: data.images.slice(0, 6),
      specs: data.specs.slice(0, 30),
      features: data.features.slice(0, 15),
      documents: data.documents,
    });
  } catch (err) {
    console.log(`    ✗ Failed: ${url}: ${err.message}`);
    return null;
  }
}


async function main() {
  console.log('=== LS Industrial Scraper (v2) ===\n');
  console.log('Launching browser…');

  const chromePath = findChrome();
  console.log(`Using Chrome: ${chromePath}\n`);

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--window-size=1920,1080'],
    defaultViewport: { width: 1920, height: 1080 },
  });

  // Step 1: Get all products from the API
  const apiProducts = await discoverProductsFromApi();

  if (apiProducts.length === 0) {
    console.log('  No products from API.');
    await browser.close();
    await saveOutput('ls-industrial', []);
    return;
  }

  // Step 2: Scrape each product page using tab pool for full details
  const allProducts = await puppeteerPool(
    browser,
    apiProducts.map(p => p.url),
    async (poolPage, url, idx) => {
      const apiProd = apiProducts[idx];
      return scrapeProductPage(poolPage, url, { category: apiProd.category, subcategory: apiProd.subcategory });
    },
    { poolSize: POOL_SIZE, delayMs: 300, label: 'LS' }
  );

  await browser.close();

  const unique = deduplicateBy(allProducts, p => p.url || p.name.toLowerCase());
  printValidationReport(unique, 'LS Industrial');

  const cats = [...new Set(unique.map(p => p.category))].sort();
  console.log(`\n  Categories (${cats.length}): ${cats.join(', ')}`);
  console.log(`  With images: ${unique.filter(p => p.images.length > 0).length}`);
  console.log(`  With specs: ${unique.filter(p => p.specs.length > 0).length}`);

  await saveOutput('ls-industrial', unique);
}

main().catch(err => { console.error('LS Industrial scraper failed:', err); process.exit(1); });
