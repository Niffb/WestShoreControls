/**
 * TMEIC Product TypeScript Generator
 * 
 * Converts the scraped product data into a TypeScript file
 * that can be used by the Next.js website.
 */

import fs from 'fs/promises';
import path from 'path';

async function generateProducts() {
    // Read scraped data
    const scrapedDataPath = path.join(process.cwd(), 'scraped-products.json');

    let products;
    try {
        const data = await fs.readFile(scrapedDataPath, 'utf-8');
        products = JSON.parse(data);
    } catch (error) {
        console.error('Error reading scraped-products.json:', error.message);
        console.log('Please run "npm run scrape" first to scrape product data.');
        process.exit(1);
    }

    // Generate TypeScript content
    const tsContent = `import { Product } from '@/lib/types/shared-types'

/**
 * TMEIC Products - Auto-generated from scraper
 * Generated on: ${new Date().toISOString()}
 * 
 * Images are loaded directly from the TMEIC website.
 * Run the scraper again to update product data and images.
 */
export const tmeicProducts: Product[] = ${JSON.stringify(products.map(p => ({
        id: p.id,
        name: p.name,
        model: p.model || p.name,
        brand: 'TMEIC',
        category: p.category,
        description: p.description || '',
        price: 0, // Contact for pricing
        rating: 4.8,
        reviews: 0,
        images: p.images.length > 0 ? p.images : ['https://www.tmeic.com/themes/custom/tmeic/logo.svg'],
        inStock: true,
        specs: p.specs || [],
        url: p.url,
        features: p.features || []
    })), null, 2)};

// Export category image mapping using first product image from each category
export const tmeicCategoryImages: Record<string, string> = {
${products.reduce((acc, p) => {
        if (p.images.length > 0 && !acc.some(item => item.category === p.category)) {
            acc.push({ category: p.category, image: p.images[0] });
        }
        return acc;
    }, []).map(item => `  '${item.category}': '${item.image}'`).join(',\n')}
};
`;

    // Write to the lib/products directory
    const outputPath = path.join(process.cwd(), '..', '..', 'lib', 'products', 'tmeic-products-scraped.ts');

    try {
        await fs.writeFile(outputPath, tsContent);
        console.log(`✓ Generated TypeScript file: ${outputPath}`);
        console.log(`  - ${products.length} products`);
        console.log(`  - Categories: ${[...new Set(products.map(p => p.category))].join(', ')}`);
    } catch (error) {
        // If can't write to lib, save locally
        const localPath = path.join(process.cwd(), 'tmeic-products-scraped.ts');
        await fs.writeFile(localPath, tsContent);
        console.log(`✓ Generated TypeScript file: ${localPath}`);
        console.log('  (Could not write to lib/products, saved locally instead)');
        console.log(`  - ${products.length} products`);
    }
}

generateProducts().catch(console.error);
