/**
 * Elsteel Product Generator
 * 
 * Converts scraped JSON data into TypeScript file for the Next.js application.
 * Uses external images from elsteel.com
 */

import fs from 'fs/promises';
import path from 'path';

const BASE_URL = 'https://elsteel.com';

// Category images from Elsteel website
const CATEGORY_IMAGES = {
    'Modular Enclosures': `${BASE_URL}/web/image/4568-4507088c/ModularMain.jpg`,
    'Enclosures': `${BASE_URL}/web/image/1451-1b05d395/bh.jpg`,
    'Special Enclosures': `${BASE_URL}/web/image/1461-8a976d9e/Asset%2054%402x.png`,
    'Super Frame': `${BASE_URL}/web/image/1418-69b4a9db/TMD-BG-1.jpg`,
    'Plug and Power': `${BASE_URL}/web/image/7222-87abf689/White%20%26%20Red.png`,
    'Software & Tools': `${BASE_URL}/web/image/1413-b7fc88d6/Asset%2048%402x.png`,
    'Accessories': `${BASE_URL}/web/image/1414-02ba4dae/Asset%2050%402x.png`
};

const DEFAULT_IMAGE = `${BASE_URL}/web/image/4568-4507088c/ModularMain.jpg`;

async function generateProducts() {
    console.log('=== Elsteel Product Generator ===\n');
    
    // Read the scraped JSON
    const jsonPath = path.join(process.cwd(), 'scraped-products.json');
    
    let products;
    try {
        const jsonContent = await fs.readFile(jsonPath, 'utf-8');
        products = JSON.parse(jsonContent);
    } catch (e) {
        console.error(`Error reading ${jsonPath}:`, e.message);
        console.log('Run "npm run scrape" first to create the JSON file.');
        return;
    }
    
    console.log(`Loaded ${products.length} products from JSON\n`);
    
    // Round ratings to one decimal place
    products = products.map(p => ({
        ...p,
        rating: Math.round(p.rating * 10) / 10
    }));
    
    // Get statistics
    const categories = [...new Set(products.map(p => p.category))].sort();
    const withImages = products.filter(p => p.images && p.images.length > 0).length;
    
    // Build category images map
    const categoryImages = {};
    for (const category of categories) {
        categoryImages[category] = CATEGORY_IMAGES[category] || DEFAULT_IMAGE;
    }
    
    // Generate TypeScript file content
    const tsContent = `import { Product } from '@/lib/types/shared-types'

/**
 * Elsteel Products - Auto-generated from scraper
 * Generated on: ${new Date().toISOString()}
 * Total products: ${products.length}
 * 
 * Elsteel - Modular Enclosures & Industrial Solutions
 * Images are loaded from elsteel.com
 */
export const elsteelScrapedProducts: Product[] = ${JSON.stringify(products.map(p => ({
    id: p.id,
    name: p.name,
    model: p.model,
    brand: p.brand,
    category: p.category,
    subcategory: p.subcategory,
    description: p.description,
    price: p.price,
    rating: p.rating,
    reviews: p.reviews,
    images: p.images,
    inStock: p.inStock,
    specs: p.specs,
    url: p.url,
    features: p.features,
    sku: p.sku
})), null, 2)};

export const elsteelCategoryImages: Record<string, string> = ${JSON.stringify(categoryImages, null, 2)};

export const elsteelStats = {
    totalProducts: ${products.length},
    withImages: ${withImages},
    categories: ${categories.length},
    imageSource: 'elsteel.com'
};

// Helper functions
export function getElsteelProductsByCategory(category: string): Product[] {
    if (category === 'All Products') return elsteelScrapedProducts;
    return elsteelScrapedProducts.filter(p => p.category === category);
}

export default elsteelScrapedProducts;
`;
    
    // Write to lib/products/elsteel-products-scraped.ts
    const outputPath = path.join(process.cwd(), '..', '..', 'lib', 'products', 'elsteel-products-scraped.ts');
    await fs.writeFile(outputPath, tsContent);
    
    console.log('=== Generation Complete ===');
    console.log(`✓ Generated ${products.length} products`);
    console.log(`  Categories: ${categories.length}`);
    console.log(`✓ Written to: ${outputPath}`);
    console.log(`\nCategory images (from ${BASE_URL}):`);
    for (const [cat, img] of Object.entries(categoryImages)) {
        const imgName = img.split('/').pop();
        console.log(`  ${cat}: ${imgName}`);
    }
}

generateProducts().catch(console.error);
