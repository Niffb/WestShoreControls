/**
 * KATKO Product Scraper (Shopify JSON API)
 *
 * Scrapes the full product catalog from katko.com's Shopify storefront API.
 * Extracts names, models, SKUs, descriptions, images (as remote URLs),
 * categories (mapped from tags), features, and variant data.
 */

import { retryFetch, sleep, cleanHtml, makeProduct, deduplicateBy, saveOutput } from '../shared/utils.js';
import { printValidationReport } from '../shared/schema.js';

const BASE_URL = 'https://katko.com';
const PRODUCTS_API = `${BASE_URL}/products.json`;
const PER_PAGE = 250;
const REQUEST_DELAY = 200;

const CATEGORY_MAP = {
  'IsoSafe':                       { category: 'Enclosed Isolators',    subcategory: 'IsoSafe Switches' },
  'LoadSafe':                      { category: 'Load Break Switches',   subcategory: 'LoadSafe Switches' },
  'FuseSafe':                      { category: 'Switch Fuses',          subcategory: 'FuseSafe Fuse Switches' },
  'ConnectSafe':                   { category: 'Connectors',            subcategory: 'ConnectSafe Terminal Blocks' },
  'Isolators':                     { category: 'Enclosed Isolators',    subcategory: 'Enclosed Isolators' },
  'IECEx Isolators':               { category: 'Enclosed Isolators',    subcategory: 'IECEx Isolators' },
  'ATEX Isolators':                { category: 'Enclosed Isolators',    subcategory: 'ATEX Isolators' },
  'EMC Isolators':                 { category: 'Enclosed Isolators',    subcategory: 'EMC Isolators' },
  'Firerated Isolators':           { category: 'Enclosed Isolators',    subcategory: 'Fire-rated Isolators' },
  'Photovoltaic Isolators':        { category: 'Enclosed Isolators',    subcategory: 'Photovoltaic Isolators' },
  'Changeover Switches':           { category: 'Changeover Switches',   subcategory: 'Enclosed Changeover Switches' },
  'Bypass Switches':               { category: 'Changeover Switches',   subcategory: 'Bypass Switches' },
  'Motor Control Switches':        { category: 'Motor Control',         subcategory: 'Motor Control Switches' },
  'Door-Mounted Switches':         { category: 'Load Break Switches',   subcategory: 'Door Mounted Switches' },
  'Load Break Switches':           { category: 'Load Break Switches',   subcategory: 'Load Break Switches' },
  'Switch Fuses':                  { category: 'Switch Fuses',          subcategory: 'Switch Fuses' },
  'UL/cUL listed Load Break Switches':    { category: 'UL/CSA Listed', subcategory: 'Load Break Switches' },
  'UL/cUL listed Enclosed Disconnects':   { category: 'UL/CSA Listed', subcategory: 'Enclosed Disconnects' },
  'UL/cUL listed Switch Fuses':           { category: 'UL/CSA Listed', subcategory: 'Switch Fuses' },
  'UL/cUL listed Terminal Blocks':        { category: 'UL/CSA Listed', subcategory: 'Terminal Blocks' },
  'UL98 listed Load Break Switches':      { category: 'UL/CSA Listed', subcategory: 'UL98 Load Break Switches' },
  'UL98 listed Enclosed Disconnects':     { category: 'UL/CSA Listed', subcategory: 'UL98 Enclosed Disconnects' },
  'Auxiliary Contacts':            { category: 'Accessories',           subcategory: 'Auxiliary Contacts' },
  'Handles':                       { category: 'Accessories',           subcategory: 'Handles' },
  'Cable Glands':                  { category: 'Accessories',           subcategory: 'Cable Glands' },
  'Door Mounting Kits':            { category: 'Accessories',           subcategory: 'Door Mounting Kits' },
  'Shafts':                        { category: 'Accessories',           subcategory: 'Shafts' },
  'Front Plates':                  { category: 'Accessories',           subcategory: 'Front Plates' },
  'Protective Roofs':              { category: 'Accessories',           subcategory: 'Protective Roofs' },
  'Terminal Covers':               { category: 'Accessories',           subcategory: 'Terminal Covers' },
  'Phase Barriers':                { category: 'Accessories',           subcategory: 'Phase Barriers' },
  'Installation Enclosures':       { category: 'Installation Enclosures', subcategory: 'KCS Enclosures' },
  'Junction Boxes':                { category: 'Installation Enclosures', subcategory: 'Junction Boxes' },
  'Fuse Boxes':                    { category: 'Switch Fuses',          subcategory: 'Fuse Boxes' },
  'Terminal Blocks':               { category: 'Connectors',            subcategory: 'Terminal Blocks' },
  'Cable Connectors':              { category: 'Connectors',            subcategory: 'Cable Connectors' },
};

function categoriseFromTags(tags) {
  if (!tags || tags.length === 0) return { category: 'Other Products', subcategory: 'General' };

  for (const tag of tags) {
    if (CATEGORY_MAP[tag]) return CATEGORY_MAP[tag];
  }
  for (const tag of tags) {
    for (const [key, val] of Object.entries(CATEGORY_MAP)) {
      if (tag.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(tag.toLowerCase())) {
        return val;
      }
    }
  }
  return { category: 'Other Products', subcategory: tags[0] || 'General' };
}

function extractModel(title) {
  const codeMatch = title.match(/\b(K[A-Z]{1,4}[-\s]?\d+[A-Z0-9/\-]*)/i);
  if (codeMatch) return codeMatch[1].trim();
  const ampMatch = title.match(/(\d+x\d+A)/i);
  if (ampMatch) return ampMatch[1];
  return title;
}

function extractFeatures(bodyHtml) {
  const text = cleanHtml(bodyHtml);
  if (!text) return [];
  return text
    .split(/[.\n]/)
    .map(s => s.trim())
    .filter(s => s.length > 15 && s.length < 400)
    .slice(0, 8);
}

async function fetchAllProducts() {
  console.log('Fetching products from Katko Shopify API…\n');
  const all = [];
  let page = 1;

  while (true) {
    console.log(`  Page ${page}…`);
    const res = await retryFetch(PRODUCTS_API, {
      params: { limit: PER_PAGE, page },
      headers: { Accept: 'application/json' },
    });
    const products = res.data.products || [];
    console.log(`    → ${products.length} products`);
    if (products.length === 0) break;
    all.push(...products);
    if (products.length < PER_PAGE) break;
    page++;
    await sleep(REQUEST_DELAY);
  }

  console.log(`\nTotal fetched: ${all.length}\n`);
  return all;
}

function transformProduct(raw) {
  const { category, subcategory } = categoriseFromTags(raw.tags);
  const images = (raw.images || []).map(img => img.src).filter(Boolean);
  const variant = raw.variants?.[0];

  const cleanName = raw.title.replace(/^-\s+/, '').trim();

  return makeProduct({
    brand: 'KATKO',
    name: cleanName,
    model: extractModel(cleanName),
    sku: variant?.sku || '',
    category,
    subcategory,
    description: cleanHtml(raw.body_html),
    url: `${BASE_URL}/products/${raw.handle}`,
    images,
    specs: [
      variant?.weight ? { label: 'Weight', value: `${variant.weight} ${variant.weight_unit || 'g'}` } : null,
      raw.product_type ? { label: 'Product Type', value: raw.product_type } : null,
    ].filter(Boolean),
    features: extractFeatures(raw.body_html),
  });
}

async function main() {
  console.log('=== KATKO Scraper (v2) ===\n');
  const raw = await fetchAllProducts();
  const products = raw.map(transformProduct);
  const unique = deduplicateBy(products, p => p.sku || p.name);

  printValidationReport(unique, 'KATKO');

  const cats = [...new Set(unique.map(p => p.category))].sort();
  console.log(`  Categories (${cats.length}): ${cats.join(', ')}`);
  console.log(`  With images: ${unique.filter(p => p.images.length > 0).length}`);
  console.log(`  With description: ${unique.filter(p => p.description.length > 10).length}`);

  await saveOutput('katko', unique);
}

main().catch(err => { console.error('KATKO scraper failed:', err); process.exit(1); });
