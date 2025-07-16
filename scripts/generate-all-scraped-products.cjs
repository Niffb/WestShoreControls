const fs = require('fs');
const path = require('path');

const SCRAPED_DIR = './lib/products/scraped';
const OUTPUT_FILE = path.join(SCRAPED_DIR, 'all-scraped-products.ts');

// Get all TypeScript files in the scraped directory except the all-scraped-products.ts file
const scrapedFiles = fs.readdirSync(SCRAPED_DIR)
  .filter(file => file.endsWith('.ts') && file !== 'all-scraped-products.ts')
  .sort();

console.log(`Found ${scrapedFiles.length} scraped product files`);

// Generate import statements and export names
const imports = [];
const exportsList = [];

scrapedFiles.forEach(file => {
  const filename = file.replace('.ts', '');
  
  // Read the file to extract the export name
  const content = fs.readFileSync(path.join(SCRAPED_DIR, file), 'utf8');
  const exportMatch = content.match(/export const (\w+):/);
  
  if (exportMatch) {
    const exportName = exportMatch[1];
    imports.push(`import { ${exportName} } from './${filename}';`);
    exportsList.push(`  ...${exportName},`);
    console.log(`Added ${exportName} from ${filename}`);
  } else {
    console.warn(`Could not find export in ${file}`);
  }
});

// Generate the complete file content
const content = `import { Product } from '@/lib/types/shared-types';

// Import all scraped products from individual files
${imports.join('\n')}

// All scraped products combined
// Total files: ${scrapedFiles.length}
// Generated automatically by scripts/generate-all-scraped-products.js
export const allScrapedProducts: Product[] = [
${exportsList.join('\n')}
];

// Export count for debugging
export const scrapedProductsCount = allScrapedProducts.length;
`;

// Write the file
fs.writeFileSync(OUTPUT_FILE, content);

console.log(`\n✅ Generated ${OUTPUT_FILE} with ${imports.length} imports`);
console.log(`📊 This will include all scraped products from the JSON files`);
console.log(`\nNext steps:`);
console.log(`1. Run npm run build to verify everything works`);
console.log(`2. Test the website to see all products in their categories`); 