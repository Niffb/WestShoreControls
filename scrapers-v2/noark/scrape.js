/**
 * NOARK Electric Product Scraper (Kyklo Platform)
 *
 * Scrapes the full product catalog from NOARK's Kyklo-based site
 * at products.na.noark-electric.com using puppeteer-core.
 * The platform requires JavaScript rendering and uses infinite scroll.
 */

import puppeteer from 'puppeteer-core';
import fs from 'fs/promises';
import { findChrome, sleep, makeProduct, deduplicateBy, saveOutput, puppeteerPool } from '../shared/utils.js';
import { printValidationReport } from '../shared/schema.js';

const BASE_URL = 'https://products.na.noark-electric.com';
const SCROLL_DELAY = 400;
const POOL_SIZE = 3;

const CATEGORIES = [
  { name: 'Miniature Circuit Breakers',       subcategory: 'MCBs',                    url: '/brands/noark/main-functions/miniature-circuit-breaker-mcb' },
  { name: 'Molded Case Circuit Breakers',     subcategory: 'MCCBs',                   url: '/brands/noark/main-functions/moulded-case-circuit-breaker-mccb' },
  { name: 'Motor Protection Circuit Breakers',subcategory: 'Motor Protection',        url: '/brands/noark/main-functions/motor-protection-circuit-breaker-mpcb' },
  { name: 'Air Circuit Breakers',             subcategory: 'ACBs',                    url: '/brands/noark/main-functions/air-circuit-breaker-acb' },
  { name: 'Contactors',                       subcategory: 'Industrial Contactors',   url: '/brands/noark/main-functions/contactor' },
  { name: 'Overload Relays',                  subcategory: 'Thermal Overloads',       url: '/brands/noark/main-functions/overload-relay' },
  { name: 'Variable Frequency Drives',        subcategory: 'VFDs',                    url: '/brands/noark/main-functions/variable-frequency-drive' },
  { name: 'Soft Starters',                    subcategory: 'Soft Starters',           url: '/brands/noark/main-functions/soft-starter' },
  { name: 'Switch Disconnectors',             subcategory: 'Disconnects',             url: '/brands/noark/main-functions/switch-disconnector' },
  { name: 'Surge Protection Devices',         subcategory: 'SPDs',                    url: '/brands/noark/main-functions/surge-protection-device-spd' },
  { name: 'Pilot Devices',                    subcategory: 'Pushbuttons & Indicators',url: '/brands/noark/main-functions/pilot-device' },
  { name: 'Terminal Blocks',                  subcategory: 'Din Rail Terminals',       url: '/brands/noark/main-functions/terminal-block' },
  { name: 'Fuse Holders',                     subcategory: 'Din Rail Fuse Holders',    url: '/brands/noark/main-functions/fuse-holder' },
  { name: 'Motor Starters',                   subcategory: 'DOL Starters',             url: '/brands/noark/main-functions/motor-starter' },
  { name: 'Handles',                          subcategory: 'Accessories',              url: '/brands/noark/main-functions/handle' },
];

async function scrollToLoadAll(page, maxAttempts = 200) {
  let previousHeight = 0;
  let currentHeight = await page.evaluate(() => document.body.scrollHeight);
  let attempts = 0;
  let staleRounds = 0;

  while (attempts < maxAttempts) {
    previousHeight = currentHeight;
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await sleep(SCROLL_DELAY);
    currentHeight = await page.evaluate(() => document.body.scrollHeight);
    attempts++;

    if (previousHeight === currentHeight) {
      staleRounds++;
      if (staleRounds >= 5) break;
      await sleep(1000);
    } else {
      staleRounds = 0;
    }

    if (attempts % 50 === 0) {
      const linkCount = await page.evaluate(() => document.querySelectorAll('a[href*="/products/"]').length);
      console.log(`    Scrolling… attempt ${attempts}, ${linkCount} product links found`);
    }
  }
}

async function extractProductUrls(page) {
  return page.evaluate((base) => {
    const urls = new Set();
    document.querySelectorAll('a[href*="/products/"]').forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.includes('{{')) {
        const full = href.startsWith('http') ? href : base + href;
        urls.add(full);
      }
    });
    return [...urls];
  }, BASE_URL);
}

async function scrapeProductPage(page, url, category) {
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(1200);

    const data = await page.evaluate((base) => {
      const sku = window.location.pathname.split('/products/')[1]?.split('?')[0] || '';
      const h1 = document.querySelector('h1');
      const name = h1?.textContent?.trim() || sku;

      // Description – look for various containers
      let description = '';
      for (const sel of ['.product-description', '[class*="description"]', 'p.description', '.product-detail p']) {
        const el = document.querySelector(sel);
        if (el) { description = el.textContent.trim(); break; }
      }
      if (!description) {
        const metaDesc = document.querySelector('meta[name="description"]');
        description = metaDesc?.content || '';
      }

      // Images – filter noise
      const images = [];
      const seenSrc = new Set();
      document.querySelectorAll('img').forEach(img => {
        const src = img.src || img.getAttribute('data-src');
        if (
          src && !seenSrc.has(src) &&
          !src.includes('logo') && !src.includes('icon') && !src.includes('placeholder') &&
          !src.includes('flags/') && !src.includes('1x1') && !src.includes('spinner') &&
          (src.includes('noark') || src.includes('product') || src.includes('/images/') || src.includes('kyklo'))
        ) {
          const full = src.startsWith('http') ? src : base + src;
          seenSrc.add(full);
          images.push(full);
        }
      });

      // Specs from tables
      const specs = [];
      document.querySelectorAll('table tr, .spec-row, [class*="specification"] tr').forEach(row => {
        const cells = row.querySelectorAll('td, th, .spec-label, .spec-value');
        if (cells.length >= 2) {
          const label = cells[0]?.textContent?.trim();
          const value = cells[1]?.textContent?.trim();
          if (label && value && label.length < 120 && value.length < 300) {
            specs.push({ label, value });
          }
        }
      });

      // Also check for definition lists
      document.querySelectorAll('dl').forEach(dl => {
        const dts = dl.querySelectorAll('dt');
        const dds = dl.querySelectorAll('dd');
        dts.forEach((dt, i) => {
          const label = dt.textContent.trim();
          const value = dds[i]?.textContent?.trim();
          if (label && value) specs.push({ label, value });
        });
      });

      // Features from lists
      const features = [];
      document.querySelectorAll('.features li, .product-features li, ul.features li, .feature-list li').forEach(li => {
        const text = li.textContent?.trim();
        if (text && text.length > 5 && text.length < 300) {
          features.push(text);
        }
      });

      // Documents (PDF links)
      const documents = [];
      document.querySelectorAll('a[href$=".pdf"]').forEach(a => {
        const docUrl = a.href;
        const docName = a.textContent?.trim() || 'Document';
        if (docUrl) documents.push({ name: docName, url: docUrl, type: 'pdf' });
      });

      return { sku, name, description, images, specs, features, documents };
    }, BASE_URL);

    if (!data.name || data.name.length < 2) return null;

    return makeProduct({
      brand: 'Noark',
      name: data.name,
      model: data.sku || data.name,
      sku: data.sku,
      category: category.name,
      subcategory: category.subcategory,
      description: data.description,
      url,
      images: data.images.slice(0, 6),
      specs: data.specs.slice(0, 30),
      features: data.features.slice(0, 15),
      documents: data.documents,
    });
  } catch (err) {
    console.log(`    ✗ Error on ${url}: ${err.message}`);
    return null;
  }
}

async function discoverCategoryUrls(page, category) {
  console.log(`\n=== ${category.name} ===`);
  const fullUrl = `${BASE_URL}${category.url}`;

  try {
    await page.goto(fullUrl, { waitUntil: 'networkidle2', timeout: 60000 });
    try {
      await page.waitForSelector('a[href*="/products/"]', { timeout: 15000 });
    } catch { /* no products found */ }
    await sleep(1500);

    // Click "Load More" / "Show All" buttons if present
    let clickedLoadMore = true;
    while (clickedLoadMore) {
      clickedLoadMore = await page.evaluate(() => {
        const btns = [...document.querySelectorAll('button, a, [role="button"]')];
        const loadMore = btns.find(b => {
          const text = (b.textContent || '').toLowerCase();
          return text.includes('load more') || text.includes('show more') || text.includes('show all') || text.includes('view all');
        });
        if (loadMore) { loadMore.click(); return true; }
        return false;
      });
      if (clickedLoadMore) await sleep(2000);
    }

    await scrollToLoadAll(page);
  } catch (err) {
    console.log(`  ✗ Failed to load: ${err.message}`);
    return [];
  }

  const productUrls = await extractProductUrls(page);
  console.log(`  Found ${productUrls.length} product URLs`);
  return productUrls;
}

async function main() {
  console.log('=== NOARK Scraper (v2) ===\n');
  console.log('Launching browser…');

  const chromePath = findChrome();
  console.log(`Using Chrome: ${chromePath}\n`);

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--window-size=1920,1080'],
    defaultViewport: { width: 1920, height: 1080 },
  });

  // Phase 1: discover all product URLs sequentially (needs scroll interaction)
  const discoveryPage = await browser.newPage();
  await discoveryPage.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

  const urlsByCategory = [];
  for (const cat of CATEGORIES) {
    const urls = await discoverCategoryUrls(discoveryPage, cat);
    urlsByCategory.push({ category: cat, urls });
    await sleep(500);
  }
  await discoveryPage.close();

  // Phase 2: scrape all product pages using a tab pool
  const allUrlsWithCat = urlsByCategory.flatMap(({ category, urls }) =>
    urls.map(url => ({ url, category }))
  );
  console.log(`\nScraping ${allUrlsWithCat.length} products with ${POOL_SIZE} tabs…`);

  const allProducts = await puppeteerPool(
    browser,
    allUrlsWithCat.map(u => u.url),
    async (page, url, idx) => {
      const { category } = allUrlsWithCat[idx];
      return scrapeProductPage(page, url, category);
    },
    { poolSize: POOL_SIZE, delayMs: 200, label: 'Noark' }
  );

  await browser.close();

  const unique = deduplicateBy(allProducts, p => p.sku || p.name.toLowerCase());
  printValidationReport(unique, 'Noark');

  const cats = [...new Set(unique.map(p => p.category))].sort();
  console.log(`\n  Categories (${cats.length}): ${cats.join(', ')}`);
  console.log(`  With images: ${unique.filter(p => p.images.length > 0).length}`);
  console.log(`  With specs: ${unique.filter(p => p.specs.length > 0).length}`);

  await saveOutput('noark', unique);
}

main().catch(err => { console.error('NOARK scraper failed:', err); process.exit(1); });
