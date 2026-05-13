import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const SCRAPED_DIR = path.join(ROOT, 'lib/products/scraped');
const OTHER_DIR = path.join(ROOT, 'lib/products');
const CACHE_PATH = path.join(ROOT, '.image-fetch-cache.json');

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
];
function isGenericImage(url) {
  if (!url) return true;
  return GENERIC_IMAGE_PATTERNS.some(p => url.includes(p));
}

const CONCURRENCY = 8;
const RETRY_LIMIT = 2;
const REQUEST_TIMEOUT_MS = 15000;

// Step 1: Walk TS files and collect each block needing a real image, keyed by URL.
const PRODUCT_BLOCK_RE = /\{\s*"id":[\s\S]*?\n\s*\}/g;

function collectTargets() {
  const targets = new Map(); // urlOrKey -> [files]
  const dirs = [SCRAPED_DIR, OTHER_DIR];
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith('.ts')) continue;
      const fp = path.join(dir, file);
      const content = fs.readFileSync(fp, 'utf-8');
      const blocks = content.match(PRODUCT_BLOCK_RE) || [];
      for (const b of blocks) {
        const imgMatch = b.match(/"images":\s*\[\s*"([^"]+)"\s*\]/);
        if (!imgMatch) continue;
        if (!isGenericImage(imgMatch[1])) continue;
        const urlMatch = b.match(/"url":\s*"([^"]+)"/);
        if (!urlMatch) continue;
        const slug = extractSlug(urlMatch[1]);
        if (!slug) continue;
        if (!targets.has(slug)) targets.set(slug, []);
        targets.get(slug).push(fp);
      }
    }
  }
  return targets;
}

// Extract the trailing slug from a URL. We treat anything after the final '/'
// as the product handle and look it up on lowcostcontrols.com.
function extractSlug(rawUrl) {
  if (!rawUrl) return null;
  let pathname = rawUrl;
  try {
    if (/^https?:\/\//i.test(rawUrl)) pathname = new URL(rawUrl).pathname;
  } catch {
    // fall through and treat as raw path
  }
  const cleaned = pathname.split(/[?#]/)[0].replace(/\/+$/, '');
  const slug = cleaned.split('/').filter(Boolean).pop();
  if (!slug) return null;
  return slug.toLowerCase();
}

function shopifyJsonUrl(slug) {
  return `https://lowcostcontrols.com/products/${slug}.json`;
}

async function fetchImage(slug) {
  const jsonUrl = shopifyJsonUrl(slug);
  if (!jsonUrl) return null;
  for (let attempt = 0; attempt <= RETRY_LIMIT; attempt++) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
      const res = await fetch(jsonUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (image-backfill; +westshorecontrols.com)',
          'Accept': 'application/json',
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
      const product = data.product;
      if (!product) return null;
      const featured = product.featured_image;
      if (typeof featured === 'string' && featured) return normalizeShopifyImg(featured);
      if (Array.isArray(product.images) && product.images.length > 0) {
        const first = product.images[0];
        if (typeof first === 'string') return normalizeShopifyImg(first);
        if (first && typeof first.src === 'string') return normalizeShopifyImg(first.src);
      }
      return null;
    } catch (err) {
      if (attempt === RETRY_LIMIT) {
        return null;
      }
      await sleep(500 * (attempt + 1));
    }
  }
  return null;
}

function normalizeShopifyImg(src) {
  // featured_image is often returned as a protocol-relative URL like //cdn.shopify.com/...
  if (src.startsWith('//')) return 'https:' + src;
  return src;
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function fetchAll(targets) {
  const urls = [...targets.keys()];
  const cache = loadCache();
  const results = new Map(); // url -> image_url or null
  let done = 0;
  let saved = 0;

  // Seed from cache
  for (const url of urls) {
    if (cache[url] !== undefined) {
      results.set(url, cache[url]);
      saved++;
    }
  }
  const toFetch = urls.filter(u => !results.has(u));
  console.log(`Fetching ${toFetch.length} URLs (skipping ${saved} cached) ...`);

  let cursor = 0;
  async function worker() {
    while (cursor < toFetch.length) {
      const idx = cursor++;
      const url = toFetch[idx];
      const img = await fetchImage(url);
      results.set(url, img);
      cache[url] = img;
      done++;
      if (done % 50 === 0 || done === toFetch.length) {
        saveCache(cache);
        const found = [...results.values()].filter(Boolean).length;
        console.log(`  ${done}/${toFetch.length} fetched (${found} matches so far)`);
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  saveCache(cache);
  return results;
}

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

// Step 2: Patch TS files with results.
function patchFiles(results) {
  const filesByUrl = new Map();
  for (const [url, img] of results) {
    if (!img) continue;
  }
  // Re-scan files this time and replace each block's placeholder image with the
  // matching real URL based on the block's "url" field.
  const dirs = [SCRAPED_DIR, OTHER_DIR];
  let totalProducts = 0;
  let filesTouched = 0;

  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith('.ts')) continue;
      const fp = path.join(dir, file);
      let content = fs.readFileSync(fp, 'utf-8');
      let patched = 0;
      const updated = content.replace(PRODUCT_BLOCK_RE, (block) => {
        const imgMatch = block.match(/"images":\s*\[\s*"([^"]+)"\s*\]/);
        if (!imgMatch) return block;
        if (!isGenericImage(imgMatch[1])) return block;
        const urlMatch = block.match(/"url":\s*"([^"]+)"/);
        if (!urlMatch) return block;
        const slug = extractSlug(urlMatch[1]);
        if (!slug) return block;
        const replacement = results.get(slug);
        if (!replacement) return block;
        patched++;
        return block.replace(
          /"images":\s*\[\s*"[^"]+"\s*\]/,
          `"images": [\n      "${replacement}"\n    ]`
        );
      });
      if (patched > 0) {
        fs.writeFileSync(fp, updated);
        console.log(`  ${file}: ${patched} products patched`);
        filesTouched++;
        totalProducts += patched;
      }
    }
  }
  console.log(`\nDone: ${totalProducts} products updated across ${filesTouched} files`);
}

(async () => {
  const targets = collectTargets();
  console.log(`Found ${targets.size} unique product URLs with placeholder images`);
  if (targets.size === 0) return;

  const results = await fetchAll(targets);
  const matches = [...results.values()].filter(Boolean).length;
  const misses = results.size - matches;
  console.log(`\nFetch summary: ${matches} matched / ${misses} missing\n`);
  patchFiles(results);
})();
