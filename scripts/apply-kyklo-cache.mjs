// Apply non-null entries from .noark-kyklo-image-cache.json to the Noark TS
// file. Useful for committing already-fetched images without making more API
// calls (the kyklo endpoint is rate-limited).

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const TS_FILE = path.join(ROOT, 'lib/products/noark-products-scraped.ts');
const CACHE_PATH = path.join(ROOT, '.noark-kyklo-image-cache.json');

const GENERIC = [
  'placeholder.jpg', 'placeholder.png',
  'productfroupweb', 'productgroupweb',
  'Circuit-Protection-Text-2-Image',
  'Stock-Images-e1694255111739',
  'Power-Circuit-Breakers-2',
  'U4-Surge-Protective-Devices',
  'NOARK-ECB-Page',
  'ElectronicM3.png',
];
const isGeneric = (u) => !u || GENERIC.some((p) => u.includes(p));

const cache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf-8'));
const lookup = new Map(Object.entries(cache).filter(([, v]) => v));

const PRODUCT_BLOCK_RE = /\{\s*"id":[\s\S]*?\n\s*\}/g;
const original = fs.readFileSync(TS_FILE, 'utf-8');
let patched = 0;
const updated = original.replace(PRODUCT_BLOCK_RE, (block) => {
  const imgMatch = block.match(/"images":\s*\[\s*"([^"]+)"\s*\]/);
  if (!imgMatch || !isGeneric(imgMatch[1])) return block;
  const skuMatch =
    block.match(/"sku":\s*"([^"]+)"/) ||
    block.match(/"model":\s*"([^"]+)"/) ||
    block.match(/"name":\s*"([^"]+)"/);
  if (!skuMatch) return block;
  const replacement = lookup.get(skuMatch[1].trim());
  if (!replacement) return block;
  patched++;
  return block.replace(
    /"images":\s*\[\s*"[^"]+"\s*\]/,
    `"images": [\n      "${replacement}"\n    ]`
  );
});
if (patched > 0) fs.writeFileSync(TS_FILE, updated);
console.log(`Patched ${patched} records from kyklo cache`);
