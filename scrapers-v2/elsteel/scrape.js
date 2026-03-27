/**
 * Elsteel Product Scraper
 *
 * Scrapes product data from elsteel.com using puppeteer-core.
 * Elsteel's site is slow-loading and needs JS rendering.
 * Their product line consists of modular enclosure systems -- each product page
 * describes a product line (Techno Module, Super Frame, etc.) with specs.
 */

import puppeteer from 'puppeteer-core';
import { findChrome, sleep, makeProduct, deduplicateBy, saveOutput, puppeteerPool } from '../shared/utils.js';
import { printValidationReport } from '../shared/schema.js';

const BASE_URL = 'https://elsteel.com';
const POOL_SIZE = 3;

const PRODUCT_PAGES = [
  { url: '/modular-enclosures',     category: 'Modular Enclosures',  subcategory: 'Modular Systems' },
  { url: '/techno-module',          category: 'Modular Enclosures',  subcategory: 'Techno Module' },
  { url: '/techno-module-light',    category: 'Modular Enclosures',  subcategory: 'Techno Module Light' },
  { url: '/tmd',                    category: 'Modular Enclosures',  subcategory: 'TMD' },
  { url: '/instant-panel',          category: 'Modular Enclosures',  subcategory: 'Instant Panel' },
  { url: '/busbar-system',          category: 'Modular Enclosures',  subcategory: 'Busbar System' },
  { url: '/plug-power',             category: 'Modular Enclosures',  subcategory: 'Plug & Power' },
  { url: '/full-welded',            category: 'Enclosures',          subcategory: 'Fully Welded Boxes' },
  { url: '/special-enclosures',     category: 'Enclosures',          subcategory: 'Custom Enclosures' },
  { url: '/mild-steel-box',         category: 'Enclosures',          subcategory: 'Mild Steel Box' },
  { url: '/stainless-steel-box',    category: 'Enclosures',          subcategory: 'Stainless Steel Box' },
  { url: '/terminal-box',           category: 'Enclosures',          subcategory: 'Terminal Boxes' },
  { url: '/ip69k',                  category: 'Enclosures',          subcategory: 'IP69K' },
  { url: '/19-superframe',          category: 'Server Racks',        subcategory: '19" Super Frame' },
];

async function discoverProductSubpages(page, productUrl) {
  const fullUrl = BASE_URL + productUrl;
  const links = new Set();
  links.add(fullUrl);

  try {
    await page.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await sleep(1500);

    const found = await page.evaluate((base, startUrl) => {
      const urls = new Set();
      const EXCLUDED = [
        '/blog', '/contact', '/about', '/history', '/career', '/privacy', '/cookie',
        '/power-the-planet', '/why-elsteel', '/brochures', '/certificate', '/whistleblowing',
        '/sustainability', '/references', '/news', '/events', '/video', '/webinar',
        'mailto:', 'javascript:', 'tel:', '/eworld', '/global-network',
        '/fr/', '/de/', '/fi/', '/se/', '/no/', '/dk/', '/nl/',
      ];
      document.querySelectorAll('a[href]').forEach(a => {
        const href = a.getAttribute('href');
        if (!href) return;
        const full = href.startsWith('http') ? href : base + href;
        if (
          full.startsWith(base) &&
          full !== startUrl &&
          !full.includes('#') &&
          !EXCLUDED.some(ex => full.includes(ex)) &&
          full !== base &&
          full !== base + '/'
        ) {
          urls.add(full);
        }
      });
      return [...urls];
    }, BASE_URL, fullUrl);

    found.forEach(u => links.add(u));
  } catch (err) {
    console.log(`  ✗ Failed to discover subpages from ${productUrl}: ${err.message}`);
  }

  return [...links];
}

async function scrapePage(page, url, classification) {
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await sleep(1200);

    const data = await page.evaluate((base) => {
      const name = document.querySelector('h1')?.textContent?.trim() || '';
      if (!name || name.length < 3) return null;

      const lower = name.toLowerCase();
      if (['contact', 'about', 'privacy', 'cookie', 'home', 'login', 'elsteel', 'brochures', 'not found',
           'internal server error', 'certificate library', 'whistleblowing service', 'global network',
           'sustainability', 'references', 'news', 'events'].some(w => lower === w || lower.includes(w))) return null;

      let description = '';
      const metaDesc = document.querySelector('meta[property="og:description"]')?.content ||
                       document.querySelector('meta[name="description"]')?.content || '';
      const paras = document.querySelectorAll('main p, section p, article p, .content p');
      const bodyText = Array.from(paras).map(p => p.textContent.trim()).filter(t => t.length > 20 && !t.includes('©')).join('\n');
      description = bodyText.length > metaDesc.length ? bodyText : metaDesc;

      const images = [];
      const seenImg = new Set();
      document.querySelectorAll('img').forEach(img => {
        const src = img.src || img.getAttribute('data-src') || '';
        if (src && !seenImg.has(src) && !src.includes('logo') && !src.includes('icon') && !src.includes('flag') && !src.includes('1x1')) {
          seenImg.add(src);
          images.push(src);
        }
      });

      const features = [];
      document.querySelectorAll('li').forEach(li => {
        const t = li.textContent?.trim();
        if (t && t.length > 10 && t.length < 300 && !t.includes('©') && !t.includes('Cookie')) {
          features.push(t);
        }
      });

      const specs = [];
      document.querySelectorAll('table tr').forEach(row => {
        const cells = row.querySelectorAll('td, th');
        if (cells.length >= 2) {
          const label = cells[0]?.textContent?.trim();
          const value = cells[1]?.textContent?.trim();
          if (label && value) specs.push({ label, value });
        }
      });

      const documents = [];
      document.querySelectorAll('a[href$=".pdf"]').forEach(a => {
        const docUrl = a.href;
        const docName = a.textContent?.trim() || 'Document';
        if (docUrl) documents.push({ name: docName, url: docUrl, type: 'pdf' });
      });

      return { name, description, images, features, specs, documents };
    }, BASE_URL);

    if (!data || !data.name) return null;

    return makeProduct({
      brand: 'Elsteel',
      name: data.name,
      model: data.name,
      category: classification.category,
      subcategory: classification.subcategory,
      description: data.description,
      url,
      images: data.images.slice(0, 5),
      specs: data.specs.slice(0, 20),
      features: data.features.slice(0, 12),
      documents: data.documents,
    });
  } catch (err) {
    console.log(`  ✗ Failed: ${url}: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log('=== Elsteel Scraper (v2) ===\n');
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

  // Phase 1: discover all URLs sequentially (needs single page for navigation)
  const allUrlsWithClass = [];
  for (const pp of PRODUCT_PAGES) {
    console.log(`\n--- ${pp.subcategory} ---`);
    const urls = await discoverProductSubpages(page, pp.url);
    console.log(`  ${urls.length} pages to scrape`);
    urls.forEach(u => allUrlsWithClass.push({ url: u, classification: pp }));
  }
  await page.close();

  // Phase 2: scrape all pages using a tab pool
  console.log(`\nScraping ${allUrlsWithClass.length} pages with ${POOL_SIZE} tabs…`);
  const allProducts = await puppeteerPool(
    browser,
    allUrlsWithClass.map(u => u.url),
    async (poolPage, url, idx) => scrapePage(poolPage, url, allUrlsWithClass[idx].classification),
    { poolSize: POOL_SIZE, delayMs: 200, label: 'Elsteel' }
  );

  await browser.close();

  const unique = deduplicateBy(allProducts, p => p.name.toLowerCase());
  printValidationReport(unique, 'Elsteel');

  console.log(`  With images: ${unique.filter(p => p.images.length > 0).length}`);
  console.log(`  With features: ${unique.filter(p => p.features.length > 0).length}`);

  await saveOutput('elsteel', unique);
}

main().catch(err => { console.error('Elsteel scraper failed:', err); process.exit(1); });
