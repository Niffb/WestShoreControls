// Scrape products.na.noark-electric.com (kyklo API) for SKUs still pointing at
// the generic ElectronicM3.png placeholder in lib/products/noark-products-scraped.ts
// and patch them in place.
//
// Strategy:
//   1. Try the exact SKU first: /api/v2/products.json?sku=<SKU>
//   2. If empty, prefix-search by progressively shorter SKU prefixes and pick
//      the closest match (longest shared prefix).
//
// Some accessories share an image across variants (e.g. ERH32* all reuse the
// same handle photo); the prefix fallback gives us a real product image for
// those instead of leaving a generic placeholder.

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const TS_FILE = path.join(ROOT, 'lib/products/noark-products-scraped.ts');
const CACHE_PATH = path.join(ROOT, '.noark-kyklo-image-cache.json');

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

const CONCURRENCY = 1;
const TIMEOUT_MS = 30000;
const RETRY_LIMIT = 6;
const REQUEST_DELAY_MS = 3500;
const RATE_LIMIT_BACKOFF_MS = 90000;
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

async function apiCall(qs) {
  const url = `https://products.na.noark-electric.com/api/v2/products.json?${qs}`;
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
        if (res.status === 429 || res.status >= 500) {
          // Cloudflare 1015 / rate-limited: long backoff
          const wait = RATE_LIMIT_BACKOFF_MS * (attempt + 1);
          console.log(`    [429/${res.status}] backing off ${wait}ms (attempt ${attempt + 1})`);
          await sleep(wait);
          continue;
        }
        return [];
      }
      // Some 200 responses still contain cloudflare error JSON when borderline rate-limited.
      const text = await res.text();
      try {
        const data = JSON.parse(text);
        if (data && typeof data === 'object' && !Array.isArray(data) && data.error) {
          await sleep(RATE_LIMIT_BACKOFF_MS * (attempt + 1));
          continue;
        }
        return Array.isArray(data) ? data : [];
      } catch {
        // body wasn't JSON — likely an HTML rate-limit page
        if (/error code|1015/i.test(text)) {
          await sleep(RATE_LIMIT_BACKOFF_MS * (attempt + 1));
          continue;
        }
        return [];
      }
    } catch {
      if (attempt === RETRY_LIMIT) return [];
      await sleep(500 * (attempt + 1));
    }
  }
  return [];
}

async function pace() {
  await sleep(REQUEST_DELAY_MS);
}

function longestSharedPrefixLength(a, b) {
  const la = a.toUpperCase();
  const lb = b.toUpperCase();
  let i = 0;
  while (i < la.length && i < lb.length && la[i] === lb[i]) i++;
  return i;
}

async function fetchImage(sku) {
  // 1. Exact SKU match
  let results = await apiCall(`sku=${encodeURIComponent(sku)}`);
  await pace();
  for (const p of results) {
    if (p.image_url && p.sku?.toUpperCase() === sku.toUpperCase()) return p.image_url;
  }
  // 2. Some SKUs differ by an -R packaging suffix from the kyklo SKU.
  if (/R$/.test(sku)) {
    const base = sku.replace(/R$/, '');
    results = await apiCall(`sku=${encodeURIComponent(base)}`);
    await pace();
    for (const p of results) {
      if (p.image_url && p.sku?.toUpperCase() === base.toUpperCase()) return p.image_url;
    }
  }
  // 3. Prefix search, shrinking until we find a candidate with an image_url.
  //    Pick the result with the longest shared prefix.
  for (let len = sku.length - 1; len >= 3; len--) {
    const prefix = sku.slice(0, len);
    const candidates = await apiCall(`search=${encodeURIComponent(prefix)}`);
    await pace();
    if (candidates.length === 0) continue;
    let best = null;
    let bestLen = -1;
    for (const p of candidates) {
      if (!p.image_url) continue;
      const psku = p.sku || '';
      const lp = longestSharedPrefixLength(psku, sku);
      if (lp > bestLen) {
        best = p;
        bestLen = lp;
      }
    }
    if (best && bestLen >= Math.min(3, sku.length)) return best.image_url;
  }
  return null;
}

const PRODUCT_BLOCK_RE = /\{\s*"id":[\s\S]*?\n\s*\}/g;

function collectTargets() {
  const targets = new Set();
  const content = fs.readFileSync(TS_FILE, 'utf-8');
  const blocks = content.match(PRODUCT_BLOCK_RE) || [];
  for (const b of blocks) {
    const imgMatch = b.match(/"images":\s*\[\s*"([^"]+)"\s*\]/);
    if (!imgMatch) continue;
    if (!isGeneric(imgMatch[1])) continue;
    const skuMatch =
      b.match(/"sku":\s*"([^"]+)"/) ||
      b.match(/"model":\s*"([^"]+)"/) ||
      b.match(/"name":\s*"([^"]+)"/);
    if (!skuMatch) continue;
    targets.add(skuMatch[1].trim());
  }
  return [...targets];
}

async function fetchAll(skus) {
  const cache = loadCache();
  const results = new Map();
  for (const s of skus) if (s in cache) results.set(s, cache[s]);
  const toFetch = skus.filter((s) => !results.has(s));
  console.log(`Fetching ${toFetch.length} SKUs from kyklo (skipping ${skus.length - toFetch.length} cached)`);

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
      if (done % 10 === 0 || done === toFetch.length) {
        saveCache(cache);
        const found = [...results.values()].filter(Boolean).length;
        console.log(`  ${done}/${toFetch.length} fetched (${found} matched total)`);
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  saveCache(cache);
  return results;
}

function patchTs(results) {
  const original = fs.readFileSync(TS_FILE, 'utf-8');
  let patched = 0;
  const updated = original.replace(PRODUCT_BLOCK_RE, (block) => {
    const imgMatch = block.match(/"images":\s*\[\s*"([^"]+)"\s*\]/);
    if (!imgMatch) return block;
    if (!isGeneric(imgMatch[1])) return block;
    const skuMatch =
      block.match(/"sku":\s*"([^"]+)"/) ||
      block.match(/"model":\s*"([^"]+)"/) ||
      block.match(/"name":\s*"([^"]+)"/);
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
  if (patched > 0) fs.writeFileSync(TS_FILE, updated);
  return patched;
}

async function main() {
  const skus = collectTargets();
  console.log(`Found ${skus.length} SKUs still on generic placeholder in ${path.basename(TS_FILE)}`);
  if (skus.length === 0) return;
  const results = await fetchAll(skus);
  const matched = [...results.values()].filter(Boolean).length;
  console.log(`\nFetch summary: ${matched} matched / ${skus.length - matched} missing`);
  const patched = patchTs(results);
  console.log(`Patched ${patched} TS product records`);

  const stillMissing = skus.filter((s) => !results.get(s));
  if (stillMissing.length) {
    console.log(`\nNo kyklo match (${stillMissing.length}):`);
    for (const s of stillMissing.slice(0, 50)) console.log(`  - ${s}`);
    if (stillMissing.length > 50) console.log(`  ... and ${stillMissing.length - 50} more`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
