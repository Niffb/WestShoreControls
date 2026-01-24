/**
 * KATKO Product TypeScript Generator
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

    // Get categories with images
    const categoryImages = products.reduce((acc, p) => {
        if (p.images && p.images.length > 0 && !acc[p.category]) {
            acc[p.category] = p.images[0];
        }
        return acc;
    }, {});

    // Statistics
    const categories = [...new Set(products.map(p => p.category))].sort();
    const subcategories = [...new Set(products.map(p => p.subcategory))].sort();
    const withImages = products.filter(p => p.images && p.images.length > 0).length;
    
    // Generate TypeScript content
    const tsContent = `import { Product } from '@/lib/types/shared-types'

/**
 * KATKO Products - Auto-generated from Shopify scraper
 * Generated on: ${new Date().toISOString()}
 * Total products: ${products.length}
 * 
 * Images are loaded directly from the KATKO Shopify CDN.
 * Run the scraper again to update product data and images.
 */
export const katkoProducts: Product[] = ${JSON.stringify(products.map(p => ({
        id: p.id,
        name: p.name,
        model: p.model || p.name,
        brand: 'KATKO',
        category: p.category,
        subcategory: p.subcategory || p.category,
        description: p.description || '',
        price: 0, // Contact for pricing
        rating: 4.8,
        reviews: 0,
        images: p.images && p.images.length > 0 ? p.images : ['/images/brands/KATKO.png'],
        inStock: true,
        specs: [],
        url: p.url,
        features: p.features || [],
        sku: p.sku || ''
    })), null, 2)};

// Export category image mapping using first product image from each category
export const katkoCategoryImages: Record<string, string> = ${JSON.stringify(categoryImages, null, 2)};

// Summary statistics
export const katkoStats = {
    totalProducts: ${products.length},
    withImages: ${withImages},
    categories: ${categories.length},
    subcategories: ${subcategories.length}
};
`;

    // Write to the lib/products directory
    const outputPath = path.join(process.cwd(), '..', '..', 'lib', 'products', 'katko-products-scraped.ts');

    try {
        await fs.writeFile(outputPath, tsContent);
        console.log(`✓ Generated TypeScript file: ${outputPath}`);
        console.log(`  - ${products.length} products`);
        console.log(`  - Categories: ${[...new Set(products.map(p => p.category))].join(', ')}`);
    } catch (error) {
        // If can't write to lib, save locally
        const localPath = path.join(process.cwd(), 'katko-products-scraped.ts');
        await fs.writeFile(localPath, tsContent);
        console.log(`✓ Generated TypeScript file: ${localPath}`);
        console.log('  (Could not write to lib/products, saved locally instead)');
        console.log(`  - ${products.length} products`);
    }
}

generateProducts().catch(console.error);
