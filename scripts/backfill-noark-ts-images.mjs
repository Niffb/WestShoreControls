// Scrape lowcostcontrols.com Shopify endpoints for any Noark TS product still
// pointing at a generic placeholder image, and patch the TS files in place.

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const TS_FILES = [
  path.join(ROOT, 'lib/products/noark-products-scraped.ts'),
  path.join(ROOT, 'lib/products/scraped/noark-scraped-products.ts'),
  path.join(ROOT, 'lib/products/scraped/noark-circuit-breakers-scraped-products.ts'),
  path.join(ROOT, 'lib/products/scraped/noark-circuit_breakers-scraped-products.ts'),
];

const GENERIC_IMAGE_PATTERNS = [
  'placeholder.jpg',
  'placeholder.png',
  'productfroupweb',
  'productgroupweb',
  'Circuit-Protection-Text-2-Image',
  'Stock-Images-e1694255111739',
  'Power-Circuit-Breakers-2',
  'U4-Surge-Protective-Devices',
  'NOARK-ECB-Page',
  'ElectronicM3.png',
];
const isGeneric = (u) => !u || GENERIC_IMAGE_PATTERNS.some((p) => u.includes(p));

const CONCURRENCY = 4;
const RETRY_LIMIT = 4;
const TIMEOUT_MS = 25000;
const NULL_RETRY_PASSES = 3;
const CACHE_PATH = path.join(ROOT, '.noark-ts-image-cache.json');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function loadCache() {
  try {
    return JSON.parse(fs.readFileSync(CACHE_PATH, 'utf-8'));
  } catch {
    return {};
  }
}
function saveCache(cache) {
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
}

function normalizeImg(src) {
  if (!src) return null;
  if (src.startsWith('//')) return 'https:' + src;
  return src;
}

async function fetchImage(sku) {
  const url = `https://lowcostcontrols.com/products/${sku.toLowerCase()}.json`;
  for (let attempt = 0; attempt <= RETRY_LIMIT; attempt++) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (image-backfill; +westshorecontrols.com)',
          Accept: 'application/json',
        },
        signal: controller.signal,
      });
      clearTimeout(timer);
      if (!res.ok) {
        if (res.status === 404) return null;
        if (res.status === 429 || res.status >= 500) {
          await sleep(800 * (attempt + 1));
          continue;
        }
        return null;
      }
      const data = await res.json();
      const p = data.product;
      if (!p) return null;
      if (p.image && typeof p.image.src === 'string') return normalizeImg(p.image.src);
      if (typeof p.featured_image === 'string') return normalizeImg(p.featured_image);
      if (Array.isArray(p.images) && p.images.length > 0) {
        const first = p.images[0];
        if (typeof first === 'string') return normalizeImg(first);
        if (first && typeof first.src === 'string') return normalizeImg(first.src);
      }
      return null;
    } catch {
      if (attempt === RETRY_LIMIT) return null;
      await sleep(500 * (attempt + 1));
    }
  }
  return null;
}

// Match each product object literal containing an "images": ["..."] field.
const PRODUCT_BLOCK_RE = /\{\s*"id":[\s\S]*?\n\s*\}/g;

function collectTargets() {
  const skus = new Set();
  const targetsByFile = new Map();
  for (const fp of TS_FILES) {
    if (!fs.existsSync(fp)) continue;
    const content = fs.readFileSync(fp, 'utf-8');
    const blocks = content.match(PRODUCT_BLOCK_RE) || [];
    const fileTargets = [];
    for (const b of blocks) {
      const imgMatch = b.match(/"images":\s*\[\s*"([^"]+)"\s*\]/);
      if (!imgMatch) continue;
      if (!isGeneric(imgMatch[1])) continue;
      const skuMatch = b.match(/"sku":\s*"([^"]+)"/) || b.match(/"model":\s*"([^"]+)"/) || b.match(/"name":\s*"([^"]+)"/);
      if (!skuMatch) continue;
      const sku = skuMatch[1].trim();
      if (!sku) continue;
      skus.add(sku);
      fileTargets.push({ sku });
    }
    targetsByFile.set(fp, fileTargets);
  }
  return { skus: [...skus], targetsByFile };
}

async function fetchAll(skus) {
  const cache = loadCache();
  const results = new Map();
  for (const s of skus) {
    if (s in cache) results.set(s, cache[s]);
  }
  const toFetch = skus.filter((s) => !results.has(s));
  console.log(`Fetching ${toFetch.length} SKUs (skipping ${skus.length - toFetch.length} cached)`);

  let cursor = 0;
  let done = 0;
  async function worker() {
    while (cursor < toFetch.length) {
      const idx = cursor++;
      const sku = toFetch[idx];
      const img = await fetchImage(sku);
      results.set(sku, img);
      cache[sku] = img;
      done++;
      if (done % 25 === 0 || done === toFetch.length) {
        saveCache(cache);
        const found = [...results.values()].filter(Boolean).length;
        console.log(`  ${done}/${toFetch.length} fetched (${found} matched total)`);
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  saveCache(cache);

  for (let pass = 1; pass <= NULL_RETRY_PASSES; pass++) {
    const stillMissing = skus.filter((s) => !results.get(s));
    if (stillMissing.length === 0) break;
    console.log(`Retry pass ${pass}: ${stillMissing.length} still missing — serial retry`);
    for (const sku of stillMissing) {
      const img = await fetchImage(sku);
      if (img) {
        results.set(sku, img);
        cache[sku] = img;
      }
      await sleep(400);
    }
    saveCache(cache);
  }
  return results;
}

function patchFile(fp, results) {
  const original = fs.readFileSync(fp, 'utf-8');
  let patched = 0;
  const updated = original.replace(PRODUCT_BLOCK_RE, (block) => {
    const imgMatch = block.match(/"images":\s*\[\s*"([^"]+)"\s*\]/);
    if (!imgMatch) return block;
    if (!isGeneric(imgMatch[1])) return block;
    const skuMatch = block.match(/"sku":\s*"([^"]+)"/) || block.match(/"model":\s*"([^"]+)"/) || block.match(/"name":\s*"([^"]+)"/);
    if (!skuMatch) return block;
    const sku = skuMatch[1].trim();
    const replacement = results.get(sku);
    if (!replacement) return block;
    patched++;
    return block.replace(
      /"images":\s*\[\s*"[^"]+"\s*\]/,
      `"images": [\n      "${replacement}"\n    ]`
    );
  });
  if (patched > 0) fs.writeFileSync(fp, updated);
  return patched;
}

async function main() {
  const { skus, targetsByFile } = collectTargets();
  console.log(`Found ${skus.length} unique Noark SKUs with generic images across ${targetsByFile.size} TS files`);
  if (skus.length === 0) return;
  const results = await fetchAll(skus);
  const matched = [...results.values()].filter(Boolean).length;
  const missed = skus.length - matched;
  console.log(`\nFetch summary: ${matched} matched / ${missed} missing`);

  let totalPatched = 0;
  for (const fp of TS_FILES) {
    if (!fs.existsSync(fp)) continue;
    const n = patchFile(fp, results);
    if (n > 0) {
      console.log(`  ${path.basename(fp)}: ${n} products patched`);
      totalPatched += n;
    }
  }
  console.log(`\nDone: ${totalPatched} TS product records updated`);

  const stillMissing = skus.filter((s) => !results.get(s));
  if (stillMissing.length) {
    console.log(`\nNot on lowcostcontrols.com (${stillMissing.length}):`);
    for (const s of stillMissing.slice(0, 80)) console.log(`  - ${s}`);
    if (stillMissing.length > 80) console.log(`  ... and ${stillMissing.length - 80} more`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
