/**
 * ERICO / nVent ERIFLEX Product Scraper
 *
 * Scrapes ERIFLEX product data from nvent.com using puppeteer-core.
 * The nVent site is an SPA -- we start from the main ERIFLEX page,
 * discover product and solution pages, and extract product info.
 *
 * nVent's ERIFLEX section uses solution-based navigation rather than a
 * traditional product catalog, so we crawl broadly within /eriflex/ paths.
 */

import puppeteer from 'puppeteer-core';
import { findChrome, sleep, makeProduct, deduplicateBy, saveOutput, puppeteerPool } from '../shared/utils.js';
import { printValidationReport } from '../shared/schema.js';

const BASE_URL = 'https://www.nvent.com';
const SCROLL_DELAY = 500;
const POOL_SIZE = 3;

const PRODUCTS_INDEX_URL = '/en-us/eriflex';

async function acceptCookies(page) {
  try {
    const btn = await page.$('#onetrust-accept-btn-handler');
    if (btn) { await btn.click(); await sleep(500); }
  } catch { /* no banner */ }
}

async function scrollPage(page) {
  let prev = 0;
  let cur = await page.evaluate(() => document.body.scrollHeight);
  let attempts = 0;
  while (prev < cur && attempts < 15) {
    prev = cur;
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await sleep(SCROLL_DELAY);
    cur = await page.evaluate(() => document.body.scrollHeight);
    attempts++;
  }
}

async function discoverAllEriflexProducts(page) {
  console.log('Discovering ERIFLEX product pages…\n');
  const allUrls = new Set();

  const fullUrl = BASE_URL + PRODUCTS_INDEX_URL;
  try {
    await page.goto(fullUrl, { waitUntil: 'networkidle2', timeout: 60000 });
    await acceptCookies(page);
    await sleep(2000);
    await scrollPage(page);

    const found = await page.evaluate((base) => {
      const links = new Set();
      document.querySelectorAll('a[href]').forEach(a => {
        const href = a.getAttribute('href');
        if (!href) return;
        const full = href.startsWith('http') ? href : base + href;
        if (
          full.includes('/eriflex/products/') &&
          !full.includes('#') &&
          !full.includes('javascript:') &&
          !full.includes('mailto:')
        ) {
          links.add(full.split('?')[0]);
        }
      });
      return [...links];
    }, BASE_URL);

    found.forEach(u => allUrls.add(u));
    console.log(`  Found ${found.length} product links from main page`);
  } catch (err) {
    console.log(`  ✗ Main page failed: ${err.message}`);
  }

  console.log(`  Total unique product pages: ${allUrls.size}\n`);
  return [...allUrls];
}

function classifyUrl(url) {
  const lower = url.toLowerCase();
  if (lower.includes('flexbus')) return { category: 'Flexible Busbars', subcategory: 'ERIFLEX FleXbus' };
  if (lower.includes('flexibar')) return { category: 'Flexible Busbars', subcategory: 'ERIFLEX Flexibar' };
  if (lower.includes('busbar') || lower.includes('conductor')) return { category: 'Flexible Busbars', subcategory: 'ERIFLEX Busbars' };
  if (lower.includes('distribution') || lower.includes('block')) return { category: 'Power Distribution', subcategory: 'Distribution Blocks' };
  if (lower.includes('cable') || lower.includes('management')) return { category: 'Cable Management', subcategory: 'Cable Management' };
  if (lower.includes('indoor') || lower.includes('outdoor')) return { category: 'Solutions', subcategory: 'Indoor/Outdoor' };
  if (lower.includes('panel')) return { category: 'Solutions', subcategory: 'Electric Panel' };
  if (lower.includes('advanced')) return { category: 'Advanced Technology', subcategory: 'Advanced Solutions' };
  return { category: 'ERIFLEX Products', subcategory: 'General' };
}

async function scrapePage(page, url) {
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await acceptCookies(page);
    await sleep(1200);

    const data = await page.evaluate(() => {
      const name = document.querySelector('h1')?.textContent?.trim() || '';
      if (!name || name.length < 3) return null;

      const lower = name.toLowerCase();
      if (['search', 'contact', 'resources'].some(w => lower.includes(w))) return null;

      let description = '';
      const metaDesc = document.querySelector('meta[name="description"]')?.content ||
                       document.querySelector('meta[property="og:description"]')?.content || '';
      const paras = document.querySelectorAll('main p, section p, article p, .content p');
      const bodyDesc = Array.from(paras).map(p => p.textContent.trim()).filter(t => t.length > 20 && !t.includes('©')).join('\n');
      description = bodyDesc.length > metaDesc.length ? bodyDesc : metaDesc;

      const images = [];
      const seenImg = new Set();
      document.querySelectorAll('img').forEach(img => {
        const src = img.src || img.getAttribute('data-src') || '';
        if (
          src && !seenImg.has(src) &&
          !src.includes('logo') && !src.includes('icon') && !src.includes('flag') &&
          !src.includes('avatar') && !src.includes('1x1') &&
          (src.includes('nvent') || src.includes('eriflex') || src.includes('scene7') || src.includes('cloudinary') || src.includes('widen'))
        ) {
          seenImg.add(src);
          images.push(src);
        }
      });

      const specs = [];
      document.querySelectorAll('table tr').forEach(row => {
        const cells = row.querySelectorAll('td, th');
        if (cells.length >= 2) {
          const label = cells[0]?.textContent?.trim();
          const value = cells[1]?.textContent?.trim();
          if (label && value && label.length < 120 && value.length < 300) specs.push({ label, value });
        }
      });

      const features = [];
      document.querySelectorAll('li').forEach(li => {
        const t = li.textContent?.trim();
        if (t && t.length > 10 && t.length < 300 && !t.includes('©') && !t.includes('Cookie') && !t.includes('Privacy')) {
          features.push(t);
        }
      });

      const documents = [];
      document.querySelectorAll('a[href$=".pdf"]').forEach(a => {
        const docUrl = a.href;
        const docName = a.textContent?.trim() || 'Document';
        if (docUrl) documents.push({ name: docName, url: docUrl, type: 'pdf' });
      });

      let sku = '';
      const skuEl = document.querySelector('[class*="part-number"], [class*="sku"], [data-sku]');
      if (skuEl) sku = skuEl.textContent?.trim() || skuEl.getAttribute('data-sku') || '';

      return { name, description, images, specs, features, documents, sku };
    });

    if (!data || !data.name) return null;

    const { category, subcategory } = classifyUrl(url);

    return makeProduct({
      brand: 'ERICO',
      name: data.name,
      model: data.name.split(' ').slice(0, 4).join(' '),
      sku: data.sku,
      category,
      subcategory,
      description: data.description,
      url,
      images: data.images.slice(0, 5),
      specs: data.specs.slice(0, 25),
      features: data.features.slice(0, 12),
      documents: data.documents,
    });
  } catch (err) {
    console.log(`  ✗ Failed: ${url}: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log('=== ERICO / nVent ERIFLEX Scraper (v2) ===\n');
  console.log('Launching browser…');

  const chromePath = findChrome();
  console.log(`Using Chrome: ${chromePath}\n`);

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--window-size=1920,1080'],
    defaultViewport: { width: 1920, height: 1080 },
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

  const allUrls = await discoverAllEriflexProducts(page);
  await page.close();

  console.log(`Scraping ${allUrls.length} pages with ${POOL_SIZE} tabs…`);
  const products = await puppeteerPool(
    browser,
    allUrls,
    async (poolPage, url) => scrapePage(poolPage, url),
    { poolSize: POOL_SIZE, delayMs: 300, label: 'ERICO' }
  );

  await browser.close();

  const unique = deduplicateBy(products, p => p.name.toLowerCase());
  printValidationReport(unique, 'ERICO');

  const cats = [...new Set(unique.map(p => p.category))].sort();
  console.log(`\n  Categories (${cats.length}): ${cats.join(', ')}`);
  console.log(`  With images: ${unique.filter(p => p.images.length > 0).length}`);
  console.log(`  With specs: ${unique.filter(p => p.specs.length > 0).length}`);

  await saveOutput('erico', unique);
}

main().catch(err => { console.error('ERICO scraper failed:', err); process.exit(1); });
