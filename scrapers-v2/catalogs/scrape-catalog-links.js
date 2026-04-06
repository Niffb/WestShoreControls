/**
 * Scrapes partner catalog/download pages and writes lib/data/vendor-catalog-manifest.json
 * for the Next.js /api/catalog-download proxy (keeps users on westshorecontrols.com for PDFs).
 *
 * Run from repo root: npm run scrape:catalog-links (see scrapers-v2/package.json)
 */

import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..', '..');
const OUT_FILE = path.join(REPO_ROOT, 'lib', 'data', 'vendor-catalog-manifest.json');

const UA = {
  'User-Agent':
    'Mozilla/5.0 (compatible; WestshoreControlsCatalogBot/1.0; +https://westshorecontrols.com)',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
};

function absolutizeKatko(href) {
  if (!href) return null;
  const h = href.trim();
  if (h.startsWith('http')) return h.split('#')[0];
  if (h.startsWith('//')) return `https:${h}`.split('#')[0];
  return null;
}

async function scrapeKatkoPdfMap() {
  const { data: html } = await axios.get('https://katko.com/pages/downloads', {
    headers: UA,
    timeout: 45000,
    validateStatus: (s) => s < 500,
  });
  if (typeof html !== 'string') throw new Error('Katko: empty response');
  const $ = cheerio.load(html);
  const found = { isosafe: null, loadsafe: null, connectsafe: null };
  $('a[href*=".pdf"]').each((_, el) => {
    const raw = $(el).attr('href');
    const url = absolutizeKatko(raw);
    if (!url || !url.includes('cdn.shopify.com')) return;
    const lower = url.toLowerCase();
    if (/isosafe.*catalogue.*\.pdf/i.test(lower) && !found.isosafe) found.isosafe = url;
    if (/loadsafe.*catalogue.*\.pdf/i.test(lower) && !found.loadsafe) found.loadsafe = url;
    if (/connectsafe.*catalogue.*\.pdf/i.test(lower) && !found.connectsafe) found.connectsafe = url;
  });
  return found;
}

function normalizeElsteelTitle(t) {
  return t
    .replace(/\u2122/g, '')
    .replace(/["']/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

async function scrapeElsteelMap() {
  const { data: html } = await axios.get('https://www.elsteel.com/brochures', {
    headers: UA,
    timeout: 45000,
    validateStatus: (s) => s < 500,
  });
  const $ = cheerio.load(html);
  const byTitle = {};

  $('div.card').each((_, card) => {
    const titleRaw = $(card).find('h4.card-title').text();
    const href = $(card).find('a[href*="/document/download/"]').attr('href');
    if (!href) return;
    const title = normalizeElsteelTitle(titleRaw);
    const u = new URL(href.trim(), 'https://www.elsteel.com/');
    u.pathname = u.pathname.replace(/\/{2,}/g, '/');
    const abs = u.href.split('#')[0];
    if (!title) return;
    byTitle[title] = abs;
  });

  const ELSTEEL_ID_BY_TITLE = {
    'techno module': 'elsteel-techno-module',
    'techno module light': 'elsteel-techno-module-light',
    box: 'elsteel-box',
    'special enclosure': 'elsteel-special-enclosures',
    'plug & power': 'elsteel-plug-power',
    '19" super frame': 'elsteel-19-super-frame',
  };

  const items = {};
  for (const [titleKey, id] of Object.entries(ELSTEEL_ID_BY_TITLE)) {
    const url = byTitle[titleKey];
    if (url) {
      items[id] = {
        sourceUrl: url,
        filename: `${id}.pdf`,
      };
    }
  }
  return items;
}

function staticItems() {
  return {
    'tmeic-mve2-app-guide': {
      sourceUrl:
        'https://tmeic.com/wp-content/uploads/2025/05/TM-MVe2AppGuide-D-0007-A_June2021-web.pdf',
      filename: 'tmeic-tmdrive-mve2-application-guide.pdf',
    },
  };
}

async function main() {
  console.log('Scraping Katko downloads page…');
  const katko = await scrapeKatkoPdfMap();
  const katkoItems = {};
  if (katko.isosafe) {
    katkoItems['katko-isosafe'] = { sourceUrl: katko.isosafe, filename: 'katko-isosafe-catalogue.pdf' };
  }
  if (katko.loadsafe) {
    katkoItems['katko-loadsafe'] = { sourceUrl: katko.loadsafe, filename: 'katko-loadsafe-catalogue.pdf' };
  }
  if (katko.connectsafe) {
    katkoItems['katko-connectsafe'] = {
      sourceUrl: katko.connectsafe,
      filename: 'katko-connectsafe-catalogue.pdf',
    };
  }
  console.log('Katko PDFs:', Object.keys(katkoItems).length, katkoItems);

  console.log('Scraping Elsteel brochures page…');
  const elsteelItems = await scrapeElsteelMap();
  console.log('Elsteel PDFs:', Object.keys(elsteelItems).length, elsteelItems);

  const items = {
    ...staticItems(),
    ...katkoItems,
    ...elsteelItems,
  };

  const manifest = {
    version: 1,
    scrapedAt: new Date().toISOString(),
    items,
  };

  await fs.mkdir(path.dirname(OUT_FILE), { recursive: true });
  await fs.writeFile(OUT_FILE, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`\nWrote ${Object.keys(items).length} catalog proxy entries → ${OUT_FILE}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
