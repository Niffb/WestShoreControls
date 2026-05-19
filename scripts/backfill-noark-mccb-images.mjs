import fs from 'fs';
import path from 'path';

const JSON_PATH = path.join(
  process.cwd(),
  'Products/MCCBs/Noark/json/noark-Mccb.json'
);
const CONCURRENCY = 4;
const RETRY_LIMIT = 4;
const TIMEOUT_MS = 25000;
const NULL_RETRY_PASSES = 3;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function shopifyUrl(sku) {
  return `https://lowcostcontrols.com/products/${sku.toLowerCase()}.json`;
}

function normalizeImg(src) {
  if (!src) return null;
  if (src.startsWith('//')) return 'https:' + src;
  return src;
}

async function fetchImage(sku) {
  const url = shopifyUrl(sku);
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
          await sleep(700 * (attempt + 1));
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

async function main() {
  const raw = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));
  const products = raw.products;
  console.log(`Loaded ${products.length} products from ${JSON_PATH}`);

  const skus = products.map((p) => p.product_number);
  const results = new Map();

  let cursor = 0;
  let done = 0;
  async function worker() {
    while (cursor < skus.length) {
      const idx = cursor++;
      const sku = skus[idx];
      const img = await fetchImage(sku);
      results.set(sku, img);
      done++;
      if (done % 20 === 0 || done === skus.length) {
        const found = [...results.values()].filter(Boolean).length;
        console.log(`  ${done}/${skus.length} fetched (${found} matched)`);
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  // Retry passes for any SKUs that came back null (Shopify endpoint flakes
  // intermittently). Use serial fetches with a small delay to maximize success.
  for (let pass = 1; pass <= NULL_RETRY_PASSES; pass++) {
    const stillMissing = skus.filter((s) => !results.get(s));
    if (stillMissing.length === 0) break;
    console.log(
      `\nRetry pass ${pass}: ${stillMissing.length} SKUs still missing — retrying serially`
    );
    for (const sku of stillMissing) {
      const img = await fetchImage(sku);
      if (img) results.set(sku, img);
      await sleep(400);
    }
  }

  let matched = 0;
  for (const p of products) {
    const img = results.get(p.product_number);
    if (img) {
      p.image_url = img;
      matched++;
    }
  }

  fs.writeFileSync(JSON_PATH, JSON.stringify(raw, null, 2) + '\n');
  console.log(
    `\nDone: ${matched}/${products.length} products updated with image_url`
  );

  const misses = products.filter((p) => !results.get(p.product_number));
  if (misses.length) {
    console.log(`\nMissing (${misses.length}):`);
    for (const m of misses.slice(0, 50)) console.log(`  - ${m.product_number}`);
    if (misses.length > 50) console.log(`  ... and ${misses.length - 50} more`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
