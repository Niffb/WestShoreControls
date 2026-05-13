import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();

// Known generic/category-level images that should be replaced with real product photos
const GENERIC_IMAGE_PATTERNS = [
  'placeholder.jpg',
  'placeholder.png',
  'productfroupweb.png',
  'productfroupweb',
  'Circuit-Protection-Text-2-Image.png',
  'Stock-Images-e1694255111739.jpg',
  'Power-Circuit-Breakers-2',
  'U4-Surge-Protective-Devices.jpg',
  'NOARK-ECB-Page.jpg',
  'productgroupweb',
];

function isGenericImage(url) {
  if (!url) return true;
  return GENERIC_IMAGE_PATTERNS.some(p => url.includes(p));
}

// Normalize a key by lowercasing and stripping non-alphanumeric characters
function norm(s) {
  return (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Build maps from JSON scraped data
// - byNorm: normalized product_number -> image_url (e.g., "uz12" -> url)
// - byLower: lowercase product_number -> image_url  (e.g., "uz-12" -> url)
const byNorm = new Map();
const byLower = new Map();

function collectFromDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectFromDir(full);
    } else if (entry.name.endsWith('.json') && !entry.name.includes('package')) {
      try {
        const raw = JSON.parse(fs.readFileSync(full, 'utf-8'));
        const products = raw.products ?? (Array.isArray(raw) ? raw : null);
        if (!products) continue;
        for (const p of products) {
          if (!p.product_number) continue;
          let url = p.image_url;
          if (!url) continue;
          if (isGenericImage(url)) continue;
          if (!url.startsWith('http') && !url.startsWith('/')) url = '/' + url;
          const lower = p.product_number.toLowerCase();
          const normalized = norm(p.product_number);
          if (!byLower.has(lower)) byLower.set(lower, url);
          if (!byNorm.has(normalized)) byNorm.set(normalized, url);
        }
      } catch { /* skip malformed JSON */ }
    }
  }
}

collectFromDir(path.join(ROOT, 'Products'));
console.log(`Built image map: ${byLower.size} by lower-key / ${byNorm.size} by normalized-key`);

// Extract trailing slug from a product URL (text after the final '/')
function slugFromUrl(url) {
  if (!url) return '';
  const m = url.match(/\/products\/([^/?#]+)/);
  return m ? m[1].toLowerCase() : '';
}

function lookupImage({ urlSlug, name, model }) {
  if (urlSlug) {
    if (byLower.has(urlSlug)) return byLower.get(urlSlug);
    const n = norm(urlSlug);
    if (byNorm.has(n)) return byNorm.get(n);
  }
  if (name) {
    const n = norm(name);
    if (byNorm.has(n)) return byNorm.get(n);
  }
  if (model) {
    const n = norm(model);
    if (byNorm.has(n)) return byNorm.get(n);
  }
  return null;
}

// Match each product object literal inside a TS file, where the product
// contains an "images": [ "..." ] field. We then look at the same object's
// "url", "name", and "model" fields to find a matching JSON entry.
const PRODUCT_BLOCK_RE = /\{\s*"id":[\s\S]*?\n\s*\}/g;

function patchFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf-8');
  let patched = 0;

  const updated = original.replace(PRODUCT_BLOCK_RE, (block) => {
    const imgMatch = block.match(/"images":\s*\[\s*"([^"]+)"\s*\]/);
    if (!imgMatch) return block;
    const currentImage = imgMatch[1];
    if (!isGenericImage(currentImage)) return block;

    const urlMatch = block.match(/"url":\s*"([^"]+)"/);
    const nameMatch = block.match(/"name":\s*"([^"]+)"/);
    const modelMatch = block.match(/"model":\s*"([^"]+)"/);

    const replacement = lookupImage({
      urlSlug: urlMatch ? slugFromUrl(urlMatch[1]) : '',
      name: nameMatch ? nameMatch[1] : '',
      model: modelMatch ? modelMatch[1] : '',
    });

    if (!replacement) return block;
    patched++;
    return block.replace(
      /"images":\s*\[\s*"[^"]+"\s*\]/,
      `"images": [\n      "${replacement}"\n    ]`
    );
  });

  if (patched > 0) {
    fs.writeFileSync(filePath, updated);
  }
  return patched;
}

const targets = [
  path.join(ROOT, 'lib/products/scraped'),
  path.join(ROOT, 'lib/products'),
];

let totalFiles = 0;
let totalProducts = 0;

for (const dir of targets) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
  for (const file of files) {
    const filePath = path.join(dir, file);
    const patched = patchFile(filePath);
    if (patched > 0) {
      console.log(`  ${file}: ${patched} products patched`);
      totalFiles++;
      totalProducts += patched;
    }
  }
}

console.log(`\nDone: ${totalProducts} products updated across ${totalFiles} files`);
