/**
 * TMEIC Product Scraper
 *
 * Scrapes product data from tmeic.com using axios + cheerio.
 * First fetches the product listing page to discover all product URLs,
 * then scrapes each individual product page for full details.
 */

import * as cheerio from 'cheerio';
import { retryFetch, sleep, cleanHtml, absoluteUrl, makeProduct, deduplicateBy, saveOutput, batchProcess } from '../shared/utils.js';
import { printValidationReport } from '../shared/schema.js';

const BASE_URL = 'https://www.tmeic.com';
const PRODUCTS_INDEX = `${BASE_URL}/products`;
const CONCURRENCY = 6;

const CATEGORY_PAGES = [
  { slug: 'controllers',          category: 'Controllers',          subcategory: 'Industrial Controllers' },
  { slug: 'drives',               category: 'Drives',               subcategory: 'Variable Frequency Drives' },
  { slug: 'generators',           category: 'Generators',           subcategory: 'Synchronous Generators' },
  { slug: 'motors',               category: 'Motors',               subcategory: 'Industrial Motors' },
  { slug: 'mpc',                  category: 'MPC',                  subcategory: 'Power Compensators' },
  { slug: 'pv-inverters',         category: 'PV Inverters',         subcategory: 'Solar Inverters' },
  { slug: 'software',             category: 'Software',             subcategory: 'Industrial Software' },
  { slug: 'specialized-products', category: 'Specialized Products', subcategory: 'Specialized Equipment' },
];

async function discoverProductUrls() {
  console.log('Discovering product URLs via WordPress REST API…');
  const urls = new Set();

  const WP_API = `${BASE_URL}/wp-json/wp/v2/product`;
  let page = 1;
  const perPage = 100;

  while (true) {
    try {
      const res = await retryFetch(WP_API, { params: { per_page: perPage, page, _fields: 'link,slug' } });
      const posts = res.data;
      if (!Array.isArray(posts) || posts.length === 0) break;

      for (const post of posts) {
        const url = post.link?.replace(/\/$/, '') || `${BASE_URL}/${post.slug}`;
        urls.add(url);
      }

      console.log(`  API page ${page}: ${posts.length} products`);
      if (posts.length < perPage) break;
      page++;
      await sleep(200);
    } catch (err) {
      console.log(`  API page ${page} failed: ${err.message}`);
      break;
    }
  }

  // Fallback: also check HTML listing pages for any unlisted products
  const htmlUrls = new Set();
  const htmlRes = await retryFetch(PRODUCTS_INDEX);
  const $ = cheerio.load(htmlRes.data);
  $('a').each((_, el) => {
    const text = $(el).text().trim();
    if (text.includes('View Product')) {
      const href = $(el).attr('href');
      if (href) htmlUrls.add(absoluteUrl(href, BASE_URL).replace(/\/$/, ''));
    }
  });
  htmlUrls.forEach(u => urls.add(u));

  console.log(`  Total unique product URLs: ${urls.size}\n`);
  return [...urls];
}

function classifyProduct(url, $) {
  const urlLower = url.toLowerCase();
  const slug = urlLower.split('/').pop() || '';

  // URL slug matching is the most reliable since TMEIC uses descriptive URLs
  // and the breadcrumb nav links appear on every page.
  if (slug.includes('tmdrive') || slug.includes('dyna-var')) return CATEGORY_PAGES.find(c => c.slug === 'drives');
  if (slug.includes('21-') || slug.includes('motor') || slug.includes('rolling-mill') || slug.includes('tm-ac')) return CATEGORY_PAGES.find(c => c.slug === 'motors');
  if (slug.includes('generator') || slug.includes('tm21-tg')) return CATEGORY_PAGES.find(c => c.slug === 'generators');
  if (slug.includes('solar') || slug.includes('energy-storage')) return CATEGORY_PAGES.find(c => c.slug === 'pv-inverters');
  if (slug.includes('controller') || slug.includes('nv-series') || slug.includes('power-plant')) return CATEGORY_PAGES.find(c => c.slug === 'controllers');
  if (slug.includes('mpc') || slug.includes('compensator')) return CATEGORY_PAGES.find(c => c.slug === 'mpc');
  if (slug.includes('pasolution') || slug.includes('utool') || slug.includes('navigator') || slug.includes('viewer') || slug.includes('data-gathering') || slug.includes('software')) return CATEGORY_PAGES.find(c => c.slug === 'software');
  if (slug.includes('induction-heater') || slug.includes('ultrasonic') || slug.includes('welding')) return CATEGORY_PAGES.find(c => c.slug === 'specialized-products');
  if (slug.includes('tmups') || slug.includes('ups')) return { category: 'UPS Systems', subcategory: 'Uninterruptible Power Supply' };

  // Breadcrumb-based fallback using product page breadcrumbs (not nav)
  const breadcrumbContainer = $('nav[aria-label*="breadcrumb"], .breadcrumb, [class*="breadcrumb"]');
  if (breadcrumbContainer.length > 0) {
    const bcLinks = breadcrumbContainer.find('a[href*="/product-category/"]');
    for (let i = bcLinks.length - 1; i >= 0; i--) {
      const href = $(bcLinks[i]).attr('href') || '';
      for (const cat of CATEGORY_PAGES) {
        if (href.includes(cat.slug)) return cat;
      }
    }
  }

  return { category: 'Other Products', subcategory: 'General' };
}

async function scrapeProductPage(url) {
  try {
    const res = await retryFetch(url);
    const $ = cheerio.load(res.data);
    const { category, subcategory } = classifyProduct(url, $);

    const name = $('h1').first().text().trim();
    if (!name) return null;

    // Description from meta or first paragraph
    let description = $('meta[property="og:description"]').attr('content') || '';
    if (!description) {
      description = $('meta[name="description"]').attr('content') || '';
    }
    // Also grab the main body text for a richer description
    const mainText = $('.entry-content, .product-content, main').first().find('p').map((_, el) => $(el).text().trim()).get().filter(t => t.length > 20).join('\n');
    if (mainText && mainText.length > description.length) {
      description = mainText;
    }

    // Images
    const images = [];
    const seen = new Set();
    $('img').each((_, el) => {
      let src = $(el).attr('src') || $(el).attr('data-src') || '';
      src = absoluteUrl(src, BASE_URL);
      if (
        src &&
        !seen.has(src) &&
        !src.includes('logo') &&
        !src.includes('icon') &&
        !src.includes('favicon') &&
        !src.includes('placeholder') &&
        !src.includes('avatar') &&
        !src.includes('gravatar') &&
        !src.includes('certification') &&
        !src.includes('50x0') &&
        !src.includes('cropped-') &&
        !/-\d+x0-/.test(src) &&
        (src.includes('tmeic.com') || src.includes('wp-content'))
      ) {
        seen.add(src);
        images.push(src);
      }
    });

    // Features – look for lists in the content area
    const features = [];
    $('li').each((_, el) => {
      const t = $(el).text().trim();
      if (t.length > 10 && t.length < 300 && !t.includes('View Product') && !t.includes('©')) {
        features.push(t);
      }
    });

    // Specs from tables / definition lists
    const specs = [];
    $('table tr').each((_, row) => {
      const cells = $(row).find('td, th');
      if (cells.length >= 2) {
        const label = $(cells[0]).text().trim();
        const value = $(cells[1]).text().trim();
        if (label && value && label.length < 100 && value.length < 300) {
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

    // Documents (PDFs)
    const documents = [];
    $('a[href$=".pdf"]').each((_, el) => {
      const docUrl = absoluteUrl($(el).attr('href'), BASE_URL);
      const docName = $(el).text().trim() || 'Document';
      if (docUrl && !documents.some(d => d.url === docUrl)) {
        documents.push({ name: docName, url: docUrl, type: 'pdf' });
      }
    });

    // Model from title – TMEIC uses product names like "TMdrive-10e2"
    const model = name.replace(/\s+Series$/, '').trim();

    return makeProduct({
      brand: 'TMEIC',
      name,
      model,
      category,
      subcategory,
      description,
      url,
      images: images.slice(0, 5),
      specs,
      features: features.slice(0, 15),
      documents,
    });
  } catch (err) {
    console.log(`  ✗ Failed to scrape ${url}: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log('=== TMEIC Scraper (v2) ===\n');
  const urls = await discoverProductUrls();

  console.log(`Scraping ${urls.length} products (concurrency: ${CONCURRENCY})…`);
  const products = await batchProcess(urls, scrapeProductPage, { concurrency: CONCURRENCY, delayMs: 200, label: 'TMEIC' });

  const unique = deduplicateBy(products, p => p.name.toLowerCase());
  printValidationReport(unique, 'TMEIC');

  const cats = [...new Set(unique.map(p => p.category))].sort();
  console.log(`  Categories (${cats.length}): ${cats.join(', ')}`);
  console.log(`  With images: ${unique.filter(p => p.images.length > 0).length}`);
  console.log(`  With documents: ${unique.filter(p => p.documents.length > 0).length}`);

  await saveOutput('tmeic', unique);
}

main().catch(err => { console.error('TMEIC scraper failed:', err); process.exit(1); });
