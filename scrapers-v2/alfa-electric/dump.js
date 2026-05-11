import puppeteer from 'puppeteer-core';
import { findChrome } from '../shared/utils.js';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch({ executablePath: findChrome(), headless: true });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');
  await page.goto('https://alfaelectric.com/en/ventilation/fan-filter-units/atv-filter-fan-units-ce-ul/', {waitUntil: 'networkidle2'});
  const html = await page.content();
  fs.writeFileSync('dump.html', html);
  await browser.close();
})();
