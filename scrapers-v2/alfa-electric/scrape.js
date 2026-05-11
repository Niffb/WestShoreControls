import axios from 'axios';
import * as cheerio from 'cheerio';
import { retryFetch, cleanHtml, makeProduct, saveOutput, absoluteUrl, truncate } from '../shared/utils.js';

async function scrapePage(url, category) {
  console.log(`Scraping ${url}...`);
  const res = await axios.get(url);
  const $ = cheerio.load(res.data);
  
  const products = [];
  let commonDescription = cleanHtml($('.elementor-widget-container').text());
  if (commonDescription.length > 2000) {
    commonDescription = truncate(commonDescription, 1000);
  }

  const pageImages = [];
  $('img').each((i, el) => {
    const src = $(el).attr('src');
    if (src && !src.includes('logo') && !src.includes('icon') && !src.includes('/flags/')) {
      pageImages.push(absoluteUrl(src, url));
    }
  });

  const dimensions = [];
  const tables = $('table');
  
  // Extract dimensions from the first table if it contains 'Dimensions'
  const dimTable = tables.filter((i, el) => $(el).text().includes('Dimensions')).first();
  if (dimTable.length) {
    $(dimTable).find('tr').slice(1).each((i, tr) => {
      const cells = $(tr).find('td');
      if (cells.length >= 2) {
        const code = $(cells[0]).text().trim();
        const dim = $(cells[1]).text().trim();
        dimensions.push({ code, dim });
      }
    });
  }

  // Helper to find dimensions
  const findDim = (code) => {
    const match = dimensions.find(d => code.startsWith(d.code.replace('000', '')));
    if (match) return match.dim;
    // Fallback: match first 4 chars
    const match4 = dimensions.find(d => code.substring(0, 4) === d.code.substring(0, 4));
    return match4 ? match4.dim : '';
  };

  // Extract performance data from other tables
  tables.each((i, el) => {
    const text = $(el).text();
    if (text.includes('Air Flow') && text.includes('Power Supply')) {
      $(el).find('tr').slice(1).each((j, tr) => {
        const cells = $(tr).find('td');
        if (cells.length >= 3) {
          const code = $(cells[0]).text().trim();
          const airFlow = $(cells[1]).text().trim();
          const powerSupply = $(cells[2]).text().trim();
          
          const productDim = findDim(code);

          products.push(makeProduct({
            brand: 'Alfa Electric',
            name: `ATV Series Filter Fan ${code}`,
            model: code,
            category: category,
            subcategory: 'Filter Fans',
            description: commonDescription,
            url: url,
            images: pageImages.slice(0, 5),
            specs: [
              { label: 'Air Flow', value: airFlow },
              { label: 'Power Supply', value: powerSupply },
              { label: 'Dimensions', value: productDim }
            ].filter(s => s.value),
            features: [
              "Quick Installation",
              "Easy Filter Replacement",
              "Durable Construction",
              "High IP Rating"
            ]
          }));
        }
      });
    }
  });

  return products;
}

async function main() {
  const url1 = 'https://alfaelectric.com/en/ventilation/fan-filter-units/atv-filter-fan-units-ce-ul/';
  const url2 = 'https://alfaelectric.com/en/ventilation/fan-filter-units/atv-filter-fan-units-for-outdoor-applications/';
  
  const p1 = await scrapePage(url1, 'Certified Filter Fans');
  const p2 = await scrapePage(url2, 'Outdoor Filter Fans');
  
  const allProducts = [...p1, ...p2];
  console.log(`Total products scraped: ${allProducts.length}`);
  
  await saveOutput('alfa-electric', allProducts);
}

main().catch(console.error);
