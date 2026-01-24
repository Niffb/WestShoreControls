/**
 * Klemsan Product Generator
 * 
 * Converts expanded JSON data into TypeScript file for the Next.js application.
 * Uses local images from /assets/images/products/klemsan/
 */

import fs from 'fs/promises';
import path from 'path';

// Local category images
const CATEGORY_IMAGES = {
    'Screw Terminals': '/assets/images/products/klemsan/OPK_EKI_112010N.webp',
    'Quick Release': '/assets/images/products/klemsan/WG_-_EKI_110010N.webp',
    'Spring Terminals': '/assets/images/products/klemsan/YKB_94_(2,5X100)_White_532100B.webp',
    'Plug Terminals': '/assets/images/products/klemsan/OPK_EKI_112110N.webp',
    'Other Terminals': '/assets/images/products/klemsan/OPK_EKI_112220N.webp',
    'End Stops': '/assets/images/products/klemsan/DM_6-S_113060.webp',
    'Power Sources': '/assets/images/products/klemsan/KLP-10-24_261003.webp',
    'Intermediate Relays': '/assets/images/products/klemsan/REL_24V_DC_SLIM_TIP_6A250VAC_095041.webp',
    'Automation': '/assets/images/products/klemsan/REMOTE_IO__260001.webp',
    'Climate': '/assets/images/products/klemsan/Z1T-M5_216018.webp',
    'Cam Switches': '/assets/images/products/klemsan/G1-SA_270130.webp',
    'Control Buttons': '/assets/images/products/klemsan/G1-SAP_270131.webp',
    'Junction Boxes': '/assets/images/products/klemsan/D3899926WH53SA_936WH53SA.webp',
    'Thermal Printers': '/assets/images/products/klemsan/KLEMARK_RIBON_30mm_x_300m__1020010.webp',
    'Cable Channels': '/assets/images/products/klemsan/YKB_914_(9X914)_BEYAZ_539914B.webp',
    'Tools and Accessories': '/assets/images/products/klemsan/YKB_762_(9X762)_SIYAH_539762S.webp',
    'Terminal Blocks': '/assets/images/products/klemsan/OPK_EKI_112010N.webp',
    'Marking Solutions': '/assets/images/products/klemsan/KLEMARK_RIBON_50mm_x_300m__1020011.webp',
    'Accessories': '/assets/images/products/klemsan/DM_8-S_113080.webp',
    'Electronic Terminals': '/assets/images/products/klemsan/Z1K-M10_216019.webp',
    'Terminal Marking': '/assets/images/products/klemsan/SLF-P1_W_11,2mm_x_15m__1020100.webp'
};

const DEFAULT_IMAGE = '/assets/images/products/klemsan/OPK_EKI_112010N.webp';

async function generateProducts() {
    console.log('=== Klemsan Product Generator ===\n');
    
    // Read the expanded JSON
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
 * Klemsan Products - Auto-generated from product data
 * Generated on: ${new Date().toISOString()}
 * Total products: ${products.length}
 * 
 * Klemsan - Terminal Blocks & Connection Solutions
 * Images are loaded from local assets.
 */
export const klemsanScrapedProducts: Product[] = ${JSON.stringify(products.map(p => ({
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

export const klemsanCategoryImages: Record<string, string> = ${JSON.stringify(categoryImages, null, 2)};

export const klemsanStats = {
    totalProducts: ${products.length},
    withImages: ${withImages},
    categories: ${categories.length}
};

// Helper functions
export function getKlemsanProductsByCategory(category: string): Product[] {
    if (category === 'All Products') return klemsanScrapedProducts;
    return klemsanScrapedProducts.filter(p => p.category === category);
}

export default klemsanScrapedProducts;
`;
    
    // Write to lib/products/klemsan-products-scraped.ts
    const outputPath = path.join(process.cwd(), '..', '..', 'lib', 'products', 'klemsan-products-scraped.ts');
    await fs.writeFile(outputPath, tsContent);
    
    console.log('=== Generation Complete ===');
    console.log(`✓ Generated ${products.length} products`);
    console.log(`  Categories: ${categories.length}`);
    console.log(`✓ Written to: ${outputPath}`);
    console.log(`\nCategory images (local paths):`);
    for (const [cat, img] of Object.entries(categoryImages)) {
        console.log(`  ${cat}: ${img.split('/').pop()}`);
    }
}

generateProducts().catch(console.error);
