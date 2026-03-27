import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.resolve(__dirname, '..', 'output');

const DEFAULT_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
};

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Locate the system Chrome installation for Puppeteer scrapers.
 */
export function findChrome() {
  const candidates = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    process.env.CHROME_PATH,
  ];

  for (const p of candidates) {
    if (!p) continue;
    try {
      execSync(`test -f "${p}"`, { stdio: 'ignore' });
      return p;
    } catch { /* not found, try next */ }
  }

  throw new Error('Chrome not found. Install Chrome or set CHROME_PATH env variable.');
}

/**
 * Axios GET with exponential back-off & retry on transient errors (429, 5xx).
 */
export async function retryFetch(url, opts = {}, retries = 3) {
  const { headers = {}, timeout = 30000, ...rest } = opts;
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await axios.get(url, {
        headers: { ...DEFAULT_HEADERS, ...headers },
        timeout,
        ...rest,
      });
      return res;
    } catch (err) {
      lastError = err;
      const status = err.response?.status;
      if (status === 429 || (status && status >= 500)) {
        const wait = Math.min(2000 * 2 ** attempt, 30000);
        console.log(`  [retry] ${status || err.code} on ${url} – waiting ${wait}ms (attempt ${attempt + 1}/${retries + 1})`);
        await sleep(wait);
        continue;
      }
      throw err;
    }
  }
  throw lastError;
}

/**
 * Strip HTML tags and normalise whitespace to produce plain text.
 */
export function cleanHtml(html) {
  if (!html) return '';
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?(p|div|li|tr|td|th|h[1-6])[^>]*>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+/g, ' ')
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean)
    .join('\n')
    .trim();
}

export function truncate(str, max = 1000) {
  if (!str || str.length <= max) return str || '';
  return str.slice(0, max).replace(/\s+\S*$/, '') + '…';
}

/**
 * Deduplicate an array of objects by a key-producing function.
 */
export function deduplicateBy(arr, keyFn) {
  const seen = new Set();
  return arr.filter(item => {
    const k = keyFn(item);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/**
 * Ensure a URL is absolute by prepending a base when needed.
 */
export function absoluteUrl(href, base) {
  if (!href) return '';
  if (href.startsWith('http')) return href;
  if (href.startsWith('//')) return 'https:' + href;
  try {
    return new URL(href, base).href;
  } catch {
    return base.replace(/\/$/, '') + '/' + href.replace(/^\//, '');
  }
}

/**
 * Write the final product array as pretty JSON into output/<brand>.json.
 */
export async function saveOutput(brandSlug, products) {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  const filePath = path.join(OUTPUT_DIR, `${brandSlug}.json`);
  await fs.writeFile(filePath, JSON.stringify(products, null, 2));
  console.log(`\n✓ Saved ${products.length} products → ${filePath}`);
  return filePath;
}

/**
 * Process an array of items with bounded concurrency.
 * Fires up to `concurrency` calls of `fn` in parallel, waits for the batch
 * to settle, then moves to the next batch with an optional inter-batch delay.
 */
export async function batchProcess(items, fn, { concurrency = 5, delayMs = 200, label = '' } = {}) {
  const results = [];
  const total = items.length;
  for (let i = 0; i < total; i += concurrency) {
    const batch = items.slice(i, i + concurrency);
    const settled = await Promise.allSettled(batch.map(fn));
    for (const r of settled) {
      if (r.status === 'fulfilled' && r.value != null) results.push(r.value);
    }
    const done = Math.min(i + concurrency, total);
    if (label && done % (concurrency * 5) === 0) console.log(`  ${label}: ${done}/${total}`);
    if (done < total) await sleep(delayMs);
  }
  return results;
}

/**
 * Run a scrape function across many URLs using a pool of Puppeteer pages.
 * `scrapeFn(page, url, index)` receives a pre-created Page and must return
 * a result (or null). Pages are reused across URLs.
 */
export async function puppeteerPool(browser, urls, scrapeFn, { poolSize = 3, delayMs = 200, label = '' } = {}) {
  const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
  const pages = [];
  for (let t = 0; t < Math.min(poolSize, urls.length); t++) {
    const p = await browser.newPage();
    await p.setUserAgent(UA);
    pages.push(p);
  }

  const results = [];
  const total = urls.length;
  let nextIdx = 0;
  let completed = 0;

  async function worker(page) {
    while (true) {
      const idx = nextIdx++;
      if (idx >= total) return;
      try {
        const result = await scrapeFn(page, urls[idx], idx);
        if (result != null) results.push(result);
      } catch (err) {
        console.log(`  ✗ Pool error [${idx}] ${urls[idx]}: ${err.message}`);
      }
      completed++;
      if (label && completed % 20 === 0) console.log(`  ${label}: ${completed}/${total}`);
      if (delayMs > 0) await sleep(delayMs);
    }
  }

  await Promise.all(pages.map(p => worker(p)));

  for (const p of pages) {
    try { await p.close(); } catch { /* ignore */ }
  }

  return results;
}

/**
 * Build a product object in the unified schema.
 */
export function makeProduct({
  brand,
  name,
  model = '',
  sku = '',
  category = '',
  subcategory = '',
  description = '',
  url = '',
  images = [],
  specs = [],
  features = [],
  documents = [],
}) {
  return {
    brand,
    name: name?.trim() || '',
    model: model?.trim() || '',
    sku: sku?.trim() || '',
    category: category?.trim() || '',
    subcategory: subcategory?.trim() || '',
    description: truncate(description?.trim(), 2000),
    url: url?.trim() || '',
    images: images.filter(Boolean),
    specs: specs.filter(s => s && s.label),
    features: features.filter(Boolean),
    documents: documents.filter(d => d && d.url),
    scrapedAt: new Date().toISOString(),
  };
}
