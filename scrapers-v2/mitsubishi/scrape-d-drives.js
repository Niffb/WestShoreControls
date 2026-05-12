/**
 * Mitsubishi FR-D700 Series VFD Scraper
 *
 * Scrapes individual D700-series drive SKUs from shop1.us.mitsubishielectric.com
 * (Kyklo-powered store, behind Cloudflare – requires a real browser via puppeteer).
 *
 * Output format matches mitsu-a-drives.json / fra860.json so that
 * mitsubishi-products.ts can import and spread it without changes.
 *
 * Run from scrapers-v2/:
 *   node mitsubishi/scrape-d-drives.js
 */

import puppeteer from 'puppeteer-core';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { findChrome, sleep } from '../shared/utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../..');

const LISTING_URL =
  'https://shop1.us.mitsubishielectric.com/categories/70-variable-speed-drives-inverters' +
  '?characteristics%5B%5D=product-series-family-name-freqrol-fr-d700-series';

const OUTPUT_SCRAPER = path.resolve(__dirname, '../output/mitsu-d-drives.json');
const OUTPUT_LIB     = path.resolve(REPO_ROOT, 'lib/data/mitsu-d-drives.json');

const CATEGORIES = [
  'Automation components',
  'Motor & motion control',
  'Variable Speed Drives - Inverters',
];

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

function normaliseAvailability(raw = '') {
  const lower = raw.toLowerCase();
  if (lower.includes('in stock') || lower.includes('available')) return 'IN STOCK';
  return 'Contact for availability';
}

function skuFromUrl(url) {
  // e.g. /products/fr-d720-008  →  FR-D720-008
  const m = url.match(/\/products\/([\w-]+)(?:\?|$)/i);
  return m ? m[1].toUpperCase() : '';
}

/* ------------------------------------------------------------------ */
/* Step 1 – Collect product page URLs from the paginated listing       */
/* ------------------------------------------------------------------ */

async function collectProductUrls(page) {
  const seen = new Set();
  let pageNum = 1;

  while (true) {
    const url = pageNum === 1
      ? LISTING_URL
      : `${LISTING_URL}&page=${pageNum}`;

    console.log(`  Listing page ${pageNum}: ${url}`);
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    } catch {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    }
    // Give Cloudflare / JS a moment to settle
    await sleep(3000);

    const { hrefs, hasNext } = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a[href]'));
      const hrefs = links
        .map(a => a.href)
        .filter(h => /\/products\/fr-d/i.test(h));

      // Kyklo paginates with ?page=N
      const hasNext = links.some(a =>
        a.rel === 'next' ||
        (a.className && /\bnext\b/.test(a.className) && !a.className.includes('disabled'))
      );

      return { hrefs, hasNext };
    });

    hrefs.forEach(h => seen.add(h.split('?')[0])); // strip query params
    console.log(`    Found ${hrefs.length} product links (total ${seen.size})`);

    if (!hasNext || hrefs.length === 0) break;
    pageNum++;
    if (pageNum > 30) break; // safety
    await sleep(1500);
  }

  return [...seen];
}

/* ------------------------------------------------------------------ */
/* Step 2 – Scrape each product detail page                            */
/* ------------------------------------------------------------------ */

async function scrapeProduct(page, url) {
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(1500);

    const data = await page.evaluate(() => {
      // SKU / part number
      const skuEl =
        document.querySelector('[class*="sku"]') ||
        document.querySelector('[class*="part-number"]') ||
        document.querySelector('[itemprop="sku"]') ||
        document.querySelector('[class*="model"]');
      const sku = skuEl?.textContent?.trim() ?? '';

      // Description – prefer meta, then visible text blocks
      let description =
        document.querySelector('meta[name="description"]')?.getAttribute('content') ||
        document.querySelector('meta[property="og:description"]')?.getAttribute('content') ||
        '';

      if (description.length < 30) {
        const paras = [
          ...document.querySelectorAll(
            '[class*="description"] p, .product-description, [itemprop="description"]'
          ),
        ];
        description = paras.map(p => p.textContent.trim()).filter(t => t.length > 10).join(' ');
      }

      if (description.length < 30) {
        const paras = [...document.querySelectorAll('main p, .content p')];
        description = paras
          .map(p => p.textContent.trim())
          .filter(t => t.length > 15 && !t.includes('©'))
          .join(' ')
          .slice(0, 600);
      }

      // Availability
      const availEl = document.querySelector(
        '[class*="availability"], [class*="stock-status"], [class*="in-stock"]'
      );
      const availability = availEl?.textContent?.trim() ?? '';

      return { sku, description, availability };
    });

    const sku = data.sku || skuFromUrl(url);
    if (!sku) return null;

    return {
      brand: 'Mitsubishi Electric',
      sku,
      description: data.description || sku,
      availability: normaliseAvailability(data.availability),
      categories: CATEGORIES,
    };
  } catch (err) {
    console.log(`  ✗ ${url}: ${err.message}`);
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* Main                                                                 */
/* ------------------------------------------------------------------ */

async function main() {
  console.log('=== Mitsubishi FR-D700 Series Scraper ===\n');

  const chromePath = findChrome();
  console.log(`Using Chrome: ${chromePath}\n`);

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--window-size=1920,1080',
    ],
    defaultViewport: { width: 1920, height: 1080 },
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
      '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    );
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    });

    /* --- Step 1: collect product URLs --- */
    console.log('Step 1: Collecting D700 product URLs from listing…');
    const productUrls = await collectProductUrls(page);
    console.log(`\nTotal product URLs found: ${productUrls.length}`);

    if (productUrls.length === 0) {
      console.error(
        '\nNo product URLs found. Possible causes:\n' +
        '  • Cloudflare blocked the headless browser\n' +
        '  • The listing page DOM structure changed\n' +
        'Try running with headless:false for debugging.\n'
      );
      process.exit(1);
    }

    /* --- Step 2: scrape each product --- */
    console.log('\nStep 2: Scraping product detail pages…');
    const products = [];

    for (let i = 0; i < productUrls.length; i++) {
      const url = productUrls[i];
      console.log(`  [${i + 1}/${productUrls.length}] ${url}`);
      const product = await scrapeProduct(page, url);
      if (product) {
        products.push(product);
        console.log(`    ✓ ${product.sku}`);
      }
      await sleep(600);
    }

    /* --- Deduplicate --- */
    const seen = new Set();
    const unique = products.filter(p => {
      if (!p.sku || seen.has(p.sku)) return false;
      seen.add(p.sku);
      return true;
    });

    console.log(`\n✓ ${unique.length} unique D700 drives scraped`);

    /* --- Save --- */
    await fs.mkdir(path.dirname(OUTPUT_SCRAPER), { recursive: true });
    await fs.writeFile(OUTPUT_SCRAPER, JSON.stringify(unique, null, 2));
    await fs.writeFile(OUTPUT_LIB, JSON.stringify(unique, null, 2));

    console.log(`  → ${OUTPUT_SCRAPER}`);
    console.log(`  → ${OUTPUT_LIB}`);

    const inStock = unique.filter(p => p.availability === 'IN STOCK').length;
    console.log(`  In-stock: ${inStock}  /  Contact-for-availability: ${unique.length - inStock}`);
  } finally {
    await browser.close();
  }
}

main().catch(err => {
  console.error('D-drives scraper failed:', err);
  process.exit(1);
});
