/**
 * Mitsubishi Electric Factory Automation Product Scraper
 *
 * Scrapes products from us.mitsubishielectric.com/fa/en/products using axios + cheerio.
 * Follows the category hierarchy: products → category → series → individual product pages.
 * Extracts specs, features, images (as remote URLs), and downloadable documents.
 */

import * as cheerio from 'cheerio';
import { retryFetch, sleep, cleanHtml, absoluteUrl, makeProduct, deduplicateBy, saveOutput, batchProcess } from '../shared/utils.js';
import { printValidationReport } from '../shared/schema.js';

const BASE_URL = 'https://us.mitsubishielectric.com';
const FA_BASE = `${BASE_URL}/fa/en`;
const CONCURRENCY = 6;

const CATEGORY_PAGES = [
  {
    name: 'Programmable Controllers',
    category: 'PLCs',
    subcategory: 'MELSEC',
    urls: [
      '/fa/en/products/cnt/programmable-controllers/melsec-iq-r-series/',
      '/fa/en/products/cnt/programmable-controllers/melsec-iq-f-series/',
      '/fa/en/products/cnt/programmable-controllers/melsec-q-series/',
      '/fa/en/products/cnt/programmable-controllers/melsec-l-series/',
      '/fa/en/products/cnt/programmable-controllers/melsec-fx-series/',
      '/fa/en/products/cnt/programmable-controllers/melsec-qs-ws-series/',
    ],
  },
  {
    name: 'VFDs / Inverters',
    category: 'Drives & VFDs',
    subcategory: 'FREQROL Inverters',
    urls: [
      '/fa/en/products/drv/inverters-freqrol/',
    ],
  },
  {
    name: 'Servo Systems',
    category: 'Servo Motors',
    subcategory: 'MELSERVO',
    urls: [
      '/fa/en/products/drv/servos/',
      '/fa/en/products/drv/servo/',
    ],
  },
  {
    name: 'HMI',
    category: 'Human Machine Interface',
    subcategory: 'GOT',
    urls: [
      '/fa/en/products/hmi/human-machine-interface/',
    ],
  },
  {
    name: 'Robots',
    category: 'Robots',
    subcategory: 'MELFA',
    urls: [
      '/fa/en/products/rbt/industrial-robots/',
      '/fa/en/products/rbt/collaborative-robot/',
    ],
  },
  {
    name: 'Circuit Breakers',
    category: 'Circuit Breakers',
    subcategory: 'Low-voltage',
    urls: [
      '/fa/en/products/lvd/circuit-breakers/',
    ],
  },
  {
    name: 'Contactors & Motor Starters',
    category: 'Contactors',
    subcategory: 'Motor Starters',
    urls: [
      '/fa/en/products/lvd/contactors-motor-starters/',
    ],
  },
  {
    name: 'Motion Controllers',
    category: 'Motion Control',
    subcategory: 'Motion Controllers',
    urls: [
      '/fa/en/products/cnt/motion-controllers/',
    ],
  },
  {
    name: 'CNC',
    category: 'CNC',
    subcategory: 'Computerized Numerical Controllers',
    urls: [
      '/fa/en/products/cnt/computerized-numerical-controllers/',
    ],
  },
  {
    name: 'Power Meters',
    category: 'Power Management',
    subcategory: 'Power Meters',
    urls: [
      '/fa/en/products/pmng/power-meters/',
    ],
  },
  {
    name: 'Energy Saving Devices',
    category: 'Power Management',
    subcategory: 'Energy Saving',
    urls: [
      '/fa/en/products/pmng/energy-saving-devices/',
    ],
  },
  {
    name: 'Simple Application Controllers',
    category: 'PLCs',
    subcategory: 'Simple Application Controllers',
    urls: [
      '/fa/en/products/cnt/simple-application-controllers/',
    ],
  },
  {
    name: 'MX Automation Controllers',
    category: 'PLCs',
    subcategory: 'MX Automation Controllers',
    urls: [
      '/fa/en/products/cnt/mx-automation-controllers/',
    ],
  },
  {
    name: 'Engineering Software',
    category: 'Software',
    subcategory: 'Engineering Software',
    urls: [
      '/fa/en/products/cnt/programmable-controllers/engineering-software/',
    ],
  },
  {
    name: 'Edge Computing (MELIPC)',
    category: 'Edge Computing',
    subcategory: 'MELIPC',
    urls: [
      '/fa/en/products/edge/industrial-computer-melipc/',
    ],
  },
  {
    name: 'Laser Processing',
    category: 'Laser Processing',
    subcategory: 'Laser Machines',
    urls: [
      '/fa/en/products/laser-processing/laser/',
    ],
  },
  {
    name: 'EDM',
    category: 'EDM',
    subcategory: 'Electrical Discharge Machines',
    urls: [
      '/fa/en/products/electrical-discharge/edm/',
    ],
  },
  {
    name: 'Network Products',
    category: 'Network',
    subcategory: 'CC-Link / Industrial Networks',
    urls: [
      '/fa/en/products/cnt/programmable-controllers/network-related-products/',
    ],
  },
];

const SUBPAGE_PATTERNS = [
  /\/concept$/i,
  /\/overview$/i,
  /\/features?$/i,
  /\/network$/i,
  /\/software$/i,
  /\/system-recorder/i,
  /\/system-design/i,
  /\/programming$/i,
  /\/debug$/i,
  /\/maintenance$/i,
  /\/simulation$/i,
  /\/predictive$/i,
  /\/preventive$/i,
  /\/new-functions$/i,
  /\/types$/i,
  /\/got-solutions$/i,
  /\/analog$/i,
  /\/cpu$/i,
  /\/anywire/i,
  /\/cc-?link/i,
  /\/discontinued/i,
  /\/smart-plus/i,
  /\/motion-control-software/i,
  /\/pmerit\//i,
];

function isSubpageUrl(url) {
  return SUBPAGE_PATTERNS.some(p => p.test(url));
}

function isGarbageUrl(url) {
  return [
    /login|signup|cart|checkout|privacy|cookie|terms|careers|join-us/i,
    /\.pdf$|\.zip$|\.exe$/i,
    /javascript:|mailto:/i,
    /#$/,
  ].some(p => p.test(url));
}

/**
 * Crawl a category page and extract ONLY direct product series links,
 * not feature sub-pages, concept pages, or software tool pages.
 * Only goes one level deep from the category page.
 */
async function discoverLinks(pageUrl) {
  const links = new Set();
  const pathParts = pageUrl.split('/products/');
  const productArea = pathParts.length > 1 ? '/products/' + pathParts[1].split('/')[0] + '/' : '/products/';

  try {
    const res = await retryFetch(BASE_URL + pageUrl);
    const $ = cheerio.load(res.data);

    $('a[href]').each((_, el) => {
      const href = $(el).attr('href');
      if (!href) return;
      const full = absoluteUrl(href, BASE_URL);
      if (
        full.startsWith(FA_BASE) &&
        full.includes(productArea) &&
        !isGarbageUrl(full) &&
        !isSubpageUrl(full) &&
        !full.includes('/search/') &&
        !full.includes('/flash/') &&
        !full.includes('/support/') &&
        !full.includes('/about-us/') &&
        !full.includes('shop1.') &&
        full !== BASE_URL + pageUrl
      ) {
        links.add(full.replace(/\/$/, ''));
      }
    });
  } catch (err) {
    console.log(`    ✗ Could not load ${pageUrl}: ${err.message}`);
  }
  return [...links];
}

async function scrapeProductPage(url, catInfo) {
  try {
    const res = await retryFetch(url);
    const $ = cheerio.load(res.data);

    const name = $('h1').first().text().trim() || $('title').text().split('|')[0]?.trim();
    if (!name || name.length < 2) return null;

    const lowerName = name.toLowerCase();
    if (lowerName === 'products' || lowerName === 'factory automation products') return null;
    if (lowerName.includes('how can we help') || lowerName.includes('contact') || lowerName.includes('sign in')) return null;
    if (lowerName.startsWith('product features') || lowerName === 'concept' || lowerName === 'features') return null;
    if (lowerName.startsWith('software features') || lowerName === 'product lines') return null;
    if (lowerName === 'discontinued products') return null;

    let description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || '';
    const mainParagraphs = $('main, .content-area, #content, article')
      .find('p')
      .map((_, el) => $(el).text().trim())
      .get()
      .filter(t => t.length > 20 && !t.includes('©'));
    const bodyDesc = mainParagraphs.join('\n');
    if (bodyDesc.length > description.length) description = bodyDesc;

    const images = [];
    const seenImg = new Set();
    $('img').each((_, el) => {
      let src = $(el).attr('src') || $(el).attr('data-src') || '';
      src = absoluteUrl(src, BASE_URL);
      if (
        src &&
        !seenImg.has(src) &&
        !src.includes('.svg') &&
        !src.includes('logo') &&
        !src.includes('icon') &&
        !src.includes('arrow') &&
        !src.includes('btn_') &&
        !src.includes('spacer') &&
        !src.includes('1x1') &&
        !src.includes('/header/') &&
        !src.includes('/footer/') &&
        !src.includes('search.ashx') &&
        !src.includes('section-landing-hero/fa_logo') &&
        !src.includes('certification') &&
        src.includes('mitsubishielectric')
      ) {
        seenImg.add(src);
        images.push(src);
      }
    });

    // Specs
    const specs = [];
    $('table tr').each((_, row) => {
      const cells = $(row).find('td, th');
      if (cells.length >= 2) {
        const label = $(cells[0]).text().trim();
        const value = $(cells[1]).text().trim();
        if (label && value && label.length < 120 && value.length < 400) {
          specs.push({ label, value });
        }
      }
    });
    $('dl').each((_, dl) => {
      const dts = $(dl).find('dt');
      const dds = $(dl).find('dd');
      dts.each((i, dt) => {
        const label = $(dt).text().trim();
        const value = $(dds.eq(i)).text().trim();
        if (label && value) specs.push({ label, value });
      });
    });

    // Features
    const features = [];
    $('li').each((_, el) => {
      const t = $(el).text().trim();
      if (t.length > 10 && t.length < 400 && !t.includes('©') && !isGarbageUrl(t)) {
        features.push(t);
      }
    });

    // Documents
    const documents = [];
    $('a[href$=".pdf"]').each((_, el) => {
      const docUrl = absoluteUrl($(el).attr('href'), BASE_URL);
      const docName = $(el).text().trim() || 'Document';
      if (docUrl && !documents.some(d => d.url === docUrl)) {
        documents.push({ name: docName, url: docUrl, type: 'pdf' });
      }
    });

    // Model extraction – Mitsubishi uses series names like "MELSEC iQ-R", "FR-A800", etc.
    const model = name.replace(/\s+Series$/, '').trim();

    return makeProduct({
      brand: 'Mitsubishi Electric',
      name,
      model,
      category: catInfo.category,
      subcategory: catInfo.subcategory,
      description,
      url,
      images: images.slice(0, 6),
      specs: specs.slice(0, 30),
      features: features.slice(0, 15),
      documents: documents.slice(0, 10),
    });
  } catch (err) {
    console.log(`    ✗ Failed: ${url}: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log('=== Mitsubishi Electric Scraper (v2) ===\n');
  const allProducts = [];

  for (const cat of CATEGORY_PAGES) {
    console.log(`\n--- ${cat.name} (${cat.category}) ---`);

    const allLinks = new Set();

    for (const startUrl of cat.urls) {
      const level1Links = await discoverLinks(startUrl);
      console.log(`  ${startUrl} → ${level1Links.length} links`);
      level1Links.forEach(l => allLinks.add(l));
    }

    console.log(`  Total unique pages: ${allLinks.size}`);

    const products = await batchProcess(
      [...allLinks],
      url => scrapeProductPage(url, cat),
      { concurrency: CONCURRENCY, delayMs: 200, label: cat.name }
    );
    allProducts.push(...products);
  }

  const unique = deduplicateBy(allProducts, p => p.url || p.name.toLowerCase());
  printValidationReport(unique, 'Mitsubishi Electric');

  const cats = [...new Set(unique.map(p => p.category))].sort();
  console.log(`\n  Categories (${cats.length}): ${cats.join(', ')}`);
  console.log(`  With images: ${unique.filter(p => p.images.length > 0).length}`);
  console.log(`  With specs: ${unique.filter(p => p.specs.length > 0).length}`);
  console.log(`  With documents: ${unique.filter(p => p.documents.length > 0).length}`);

  await saveOutput('mitsubishi', unique);
}

main().catch(err => { console.error('Mitsubishi scraper failed:', err); process.exit(1); });
