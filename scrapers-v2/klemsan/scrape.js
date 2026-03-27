/**
 * Klemsan Product Scraper
 *
 * Scrapes product data from klemsan.com using puppeteer-core.
 * The Klemsan site is slow-loading and needs JS rendering.
 * Navigates the product category tree, then scrapes each product/sub-page.
 */

import puppeteer from 'puppeteer-core';
import { findChrome, sleep, makeProduct, deduplicateBy, saveOutput, puppeteerPool } from '../shared/utils.js';
import { printValidationReport } from '../shared/schema.js';

const BASE_URL = 'https://www.klemsan.com';
const PRODUCTS_URL = `${BASE_URL}/en/products`;
const POOL_SIZE = 3;
const SCROLL_DELAY = 400;

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

async function discoverCategoryLinks(page) {
  console.log('Navigating to products page…');
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      await page.goto(PRODUCTS_URL, { waitUntil: 'domcontentloaded', timeout: 90000 });
      break;
    } catch (err) {
      console.log(`  Attempt ${attempt + 1} failed: ${err.message}`);
      if (attempt === 2) throw err;
      await sleep(3000);
    }
  }
  await sleep(2000);
  await scrollPage(page);

  const links = await page.evaluate((base) => {
    const found = new Set();
    document.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      if (!href) return;
      const full = href.startsWith('http') ? href : base + href;
      if (
        full.includes('/en/products/') &&
        full !== base + '/en/products' &&
        full !== base + '/en/products/' &&
        !full.includes('#') &&
        !full.includes('javascript:')
      ) {
        found.add(full);
      }
    });
    return [...found];
  }, BASE_URL);

  console.log(`  Found ${links.length} category/product links\n`);
  return links;
}

async function discoverProductLinks(page, categoryUrl) {
  try {
    await page.goto(categoryUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await sleep(1500);
    await scrollPage(page);

    return await page.evaluate((base, catUrl) => {
      const found = new Set();
      document.querySelectorAll('a[href]').forEach(a => {
        const href = a.getAttribute('href');
        if (!href) return;
        const full = href.startsWith('http') ? href : base + href;
        if (
          full.includes('/en/products/') &&
          full !== catUrl &&
          !full.includes('#') &&
          !full.includes('javascript:') &&
          full.split('/').filter(Boolean).length > catUrl.split('/').filter(Boolean).length
        ) {
          found.add(full);
        }
      });
      return [...found];
    }, BASE_URL, categoryUrl);
  } catch (err) {
    console.log(`    ✗ Failed: ${categoryUrl}: ${err.message}`);
    return [];
  }
}

function classifyUrl(url) {
  const path = url.replace(BASE_URL, '').toLowerCase();
  if (path.includes('terminal-block') || path.includes('screw') || path.includes('spring') || path.includes('push-in') || path.includes('plug-in'))
    return { category: 'Terminal Blocks', subcategory: inferSubcat(path) };
  if (path.includes('power-suppl'))
    return { category: 'Power Supplies', subcategory: 'DIN Rail Power Supplies' };
  if (path.includes('relay') || path.includes('interface'))
    return { category: 'Relays', subcategory: 'Interface Relays' };
  if (path.includes('signal-cond'))
    return { category: 'Signal Conditioners', subcategory: 'Signal Conditioners' };
  if (path.includes('automation') || path.includes('remote-io') || path.includes('plc'))
    return { category: 'Automation', subcategory: 'Remote I/O' };
  if (path.includes('climate') || path.includes('fan') || path.includes('heater'))
    return { category: 'Climate Control', subcategory: 'Enclosure Climate' };
  if (path.includes('cam-switch'))
    return { category: 'Switches', subcategory: 'Cam Switches' };
  if (path.includes('button') || path.includes('indicator') || path.includes('pilot'))
    return { category: 'Control Buttons', subcategory: 'Pushbuttons & Indicators' };
  if (path.includes('junction') || path.includes('enclosure') || path.includes('box'))
    return { category: 'Enclosures', subcategory: 'Junction Boxes' };
  if (path.includes('cable') || path.includes('duct') || path.includes('channel'))
    return { category: 'Cable Management', subcategory: 'Cable Ducts' };
  if (path.includes('mark') || path.includes('print') || path.includes('label'))
    return { category: 'Marking', subcategory: 'Terminal Markers' };
  if (path.includes('tool') || path.includes('accessori') || path.includes('end-stop') || path.includes('bracket'))
    return { category: 'Accessories', subcategory: 'Tools & Accessories' };
  if (path.includes('fuse'))
    return { category: 'Terminal Blocks', subcategory: 'Fuse Terminals' };
  if (path.includes('ground') || path.includes('earth'))
    return { category: 'Terminal Blocks', subcategory: 'Ground Terminals' };
  if (path.includes('disconnect'))
    return { category: 'Terminal Blocks', subcategory: 'Disconnect Terminals' };
  return { category: 'Other Products', subcategory: 'General' };
}

function inferSubcat(path) {
  if (path.includes('screw')) return 'Screw Terminals';
  if (path.includes('spring')) return 'Spring Terminals';
  if (path.includes('push-in')) return 'Push-in Terminals';
  if (path.includes('plug-in')) return 'Plug-in Terminals';
  if (path.includes('pcb')) return 'PCB Terminals';
  if (path.includes('power')) return 'Power Terminals';
  if (path.includes('sensor') || path.includes('actuator')) return 'Sensor/Actuator Terminals';
  if (path.includes('multi')) return 'Multi-level Terminals';
  return 'Terminal Blocks';
}

async function scrapeProductPage(page, url) {
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await sleep(1000);

    const data = await page.evaluate((base) => {
      const name = document.querySelector('h1')?.textContent?.trim() || '';
      if (!name || name.length < 2) return null;

      // Skip nav pages
      const lower = name.toLowerCase();
      if (['products', 'home', 'contact', 'about', 'klemsan'].includes(lower)) return null;

      let description = '';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) description = metaDesc.content || '';
      const paras = document.querySelectorAll('main p, .content p, article p, .product-detail p, section p');
      const bodyDesc = Array.from(paras).map(p => p.textContent.trim()).filter(t => t.length > 15 && !t.includes('©')).join('\n');
      if (bodyDesc.length > description.length) description = bodyDesc;

      const images = [];
      const seenImg = new Set();
      document.querySelectorAll('img').forEach(img => {
        const src = img.src || img.getAttribute('data-src') || '';
        if (src && !seenImg.has(src) && !src.includes('logo') && !src.includes('icon') && !src.includes('flag') && !src.includes('1x1')) {
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
      document.querySelectorAll('dl').forEach(dl => {
        const dts = dl.querySelectorAll('dt');
        const dds = dl.querySelectorAll('dd');
        dts.forEach((dt, i) => {
          const label = dt.textContent.trim();
          const value = dds[i]?.textContent?.trim();
          if (label && value) specs.push({ label, value });
        });
      });

      const features = [];
      document.querySelectorAll('ul li, ol li').forEach(li => {
        const t = li.textContent?.trim();
        if (t && t.length > 8 && t.length < 300 && !t.includes('©') && !t.includes('Cookie') && !t.includes('Privacy')) {
          features.push(t);
        }
      });

      const documents = [];
      document.querySelectorAll('a[href$=".pdf"]').forEach(a => {
        const docUrl = a.href;
        const docName = a.textContent?.trim() || 'Document';
        if (docUrl) documents.push({ name: docName, url: docUrl, type: 'pdf' });
      });

      return { name, description, images, specs, features, documents };
    }, BASE_URL);

    if (!data || !data.name) return null;
    const { category, subcategory } = classifyUrl(url);

    return makeProduct({
      brand: 'Klemsan',
      name: data.name,
      model: data.name,
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
    console.log(`    ✗ Failed: ${url}: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log('=== Klemsan Scraper (v2) ===\n');
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

  // Step 1: Find top-level category links
  const categoryLinks = await discoverCategoryLinks(page);

  // Step 2: Go one level deeper into each category to find product pages
  const allProductUrls = new Set();
  for (const catLink of categoryLinks) {
    allProductUrls.add(catLink);
    const subLinks = await discoverProductLinks(page, catLink);
    console.log(`  ${catLink.replace(BASE_URL, '')} → ${subLinks.length} sub-links`);
    subLinks.forEach(l => allProductUrls.add(l));
    await sleep(500);
  }
  await page.close();

  console.log(`\nTotal unique URLs to scrape: ${allProductUrls.size}`);
  console.log(`Scraping with ${POOL_SIZE} tabs…\n`);

  // Step 3: Scrape all pages using a tab pool
  const products = await puppeteerPool(
    browser,
    [...allProductUrls],
    async (poolPage, url) => scrapeProductPage(poolPage, url),
    { poolSize: POOL_SIZE, delayMs: 200, label: 'Klemsan' }
  );

  await browser.close();

  const unique = deduplicateBy(products, p => p.url || p.name.toLowerCase());
  printValidationReport(unique, 'Klemsan');

  const cats = [...new Set(unique.map(p => p.category))].sort();
  console.log(`\n  Categories (${cats.length}): ${cats.join(', ')}`);
  console.log(`  With images: ${unique.filter(p => p.images.length > 0).length}`);

  await saveOutput('klemsan', unique);
}

main().catch(err => { console.error('Klemsan scraper failed:', err); process.exit(1); });
