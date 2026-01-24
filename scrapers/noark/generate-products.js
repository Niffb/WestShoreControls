/**
 * NOARK Product Generator
 * 
 * Converts consolidated JSON data into TypeScript file for the Next.js application.
 * Uses external image URLs from na.noark-electric.com
 */

import fs from 'fs/promises';
import path from 'path';

const NOARK_IMAGE_BASE = 'https://na.noark-electric.com/wp-content/uploads';

// External category images from Noark website
const CATEGORY_IMAGES = {
    'Circuit Breakers': `${NOARK_IMAGE_BASE}/2025/08/ElectronicM3.png`,
    'Contactors': `${NOARK_IMAGE_BASE}/2024/05/productfroupweb.png`,
    'Overload Relays': `${NOARK_IMAGE_BASE}/2024/05/productfroupweb.png`,
    'Manual Motor Starters': `${NOARK_IMAGE_BASE}/2024/05/productfroupweb.png`,
    'Push Buttons': `${NOARK_IMAGE_BASE}/2024/05/productfroupweb.png`,
    'LED Indicators': `${NOARK_IMAGE_BASE}/2024/05/productfroupweb.png`,
    'Power Distribution': `${NOARK_IMAGE_BASE}/2024/05/productfroupweb.png`,
    'Other Products': `${NOARK_IMAGE_BASE}/2024/05/productfroupweb.png`,
    'Miniature Circuit Breakers': `${NOARK_IMAGE_BASE}/2024/05/Circuit-Protection-Text-2-Image.png`,
    'Motor Circuit Protectors': `${NOARK_IMAGE_BASE}/2024/05/Stock-Images-e1694255111739.jpg`,
    'Power Circuit Breakers': `${NOARK_IMAGE_BASE}/2024/05/Power-Circuit-Breakers-2-e1692743350831.jpg`,
    'Surge Protection Devices': `${NOARK_IMAGE_BASE}/2024/11/U4-Surge-Protective-Devices.jpg`,
    'Enclosed Breakers': `${NOARK_IMAGE_BASE}/2024/11/NOARK-ECB-Page.jpg`,
    'Disconnect Switches': `${NOARK_IMAGE_BASE}/2025/07/RDS1B_3P-scaled-e1752028091107.png`,
    'Fuse Holders': `${NOARK_IMAGE_BASE}/2024/05/Stock-Images-e1694255111739.jpg`
};

// Default fallback image
const DEFAULT_IMAGE = `${NOARK_IMAGE_BASE}/2024/05/productfroupweb.png`;

async function generateProducts() {
    console.log('=== NOARK Product Generator ===\n');
    
    // Read the consolidated JSON
    const jsonPath = path.join(process.cwd(), 'scraped-products.json');
    
    let products;
    try {
        const jsonContent = await fs.readFile(jsonPath, 'utf-8');
        products = JSON.parse(jsonContent);
    } catch (e) {
        console.error(`Error reading ${jsonPath}:`, e.message);
        console.log('Run "npm run consolidate" first to create the JSON file.');
        return;
    }
    
    console.log(`Loaded ${products.length} products from JSON\n`);
    
    // Ensure all products have external image URLs
    products = products.map(p => ({
        ...p,
        images: p.images.map(img => 
            img.startsWith('https://') ? img : 
            img.startsWith('/') ? DEFAULT_IMAGE : 
            img.includes('placeholder') ? DEFAULT_IMAGE :
            img
        )
    }));
    
    // Get statistics
    const categories = [...new Set(products.map(p => p.category))].sort();
    const subcategories = [...new Set(products.map(p => p.subcategory).filter(Boolean))].sort();
    const withExternalImages = products.filter(p => 
        p.images && p.images.length > 0 && p.images[0].startsWith('https://')
    ).length;
    
    // Build category images map
    const categoryImages = {};
    for (const category of categories) {
        categoryImages[category] = CATEGORY_IMAGES[category] || DEFAULT_IMAGE;
    }
    
    // Generate TypeScript file content
    const tsContent = `import { Product } from '@/lib/types/shared-types'

/**
 * NOARK Products - Auto-generated from consolidated product data
 * Generated on: ${new Date().toISOString()}
 * Total products: ${products.length}
 * 
 * Images are loaded directly from the NOARK website (na.noark-electric.com).
 * Run the consolidator again to update product data and images.
 */
export const noarkScrapedProducts: Product[] = ${JSON.stringify(products.map(p => ({
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

export const noarkCategoryImages: Record<string, string> = ${JSON.stringify(categoryImages, null, 2)};

export const noarkStats = {
    totalProducts: ${products.length},
    withExternalImages: ${withExternalImages},
    categories: ${categories.length},
    subcategories: ${subcategories.length},
    imageSource: 'na.noark-electric.com'
};

// Helper functions
export function getNoarkProductsByCategory(category: string): Product[] {
    if (category === 'All Products') return noarkScrapedProducts;
    return noarkScrapedProducts.filter(p => p.category === category);
}

export function getNoarkProductsBySubcategory(subcategory: string): Product[] {
    return noarkScrapedProducts.filter(p => (p as any).subcategory === subcategory);
}

export default noarkScrapedProducts;
`;
    
    // Write to lib/products/noark-products-scraped.ts
    const outputPath = path.join(process.cwd(), '..', '..', 'lib', 'products', 'noark-products-scraped.ts');
    await fs.writeFile(outputPath, tsContent);
    
    console.log('=== Generation Complete ===');
    console.log(`✓ Generated ${products.length} products`);
    console.log(`  With external images: ${withExternalImages}`);
    console.log(`  Categories: ${categories.length}`);
    console.log(`  Subcategories: ${subcategories.length}`);
    console.log(`\n✓ Written to: ${outputPath}`);
    console.log(`\nCategory images (from ${NOARK_IMAGE_BASE}):`);
    for (const [cat, img] of Object.entries(categoryImages)) {
        console.log(`  ${cat}: ${img.split('/').pop()}`);
    }
}

generateProducts().catch(console.error);
