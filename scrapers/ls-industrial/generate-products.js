/**
 * Generate TypeScript products file from scraped JSON
 * 
 * This script converts the scraped-products.json file into a TypeScript file
 * that can be imported by the Next.js application.
 */

const fs = require('fs').promises;
const path = require('path');

// Default price ranges by category (for display purposes)
const CATEGORY_PRICES = {
    'Variable Frequency Drives': { min: 485, max: 2500 },
    'Programmable Logic Controllers': { min: 850, max: 2500 },
    'Human Machine Interface': { min: 650, max: 2200 },
    'Servo Motors': { min: 750, max: 1800 },
    'Contactors': { min: 85, max: 450 },
    'Motor Starters': { min: 125, max: 350 },
    'Overload Relays': { min: 75, max: 250 },
    'Softstarters': { min: 350, max: 1200 },
    'Circuit Breakers': { min: 185, max: 3500 },
    'I/O Modules': { min: 250, max: 600 }
};

// Generate a consistent price based on product name
function generatePrice(product) {
    const range = CATEGORY_PRICES[product.category] || { min: 200, max: 1000 };
    // Use product name hash to generate consistent price
    let hash = 0;
    for (let i = 0; i < product.name.length; i++) {
        hash = ((hash << 5) - hash) + product.name.charCodeAt(i);
        hash = hash & hash;
    }
    const normalized = Math.abs(hash % 100) / 100;
    return Math.round(range.min + (range.max - range.min) * normalized);
}

// Generate rating between 4.4 and 4.9
function generateRating(product) {
    let hash = 0;
    for (let i = 0; i < product.name.length; i++) {
        hash = ((hash << 3) - hash) + product.name.charCodeAt(i);
    }
    const normalized = Math.abs(hash % 50) / 100;
    return Math.round((4.4 + normalized) * 10) / 10;
}

// Generate review count
function generateReviews(product) {
    let hash = 0;
    for (let i = 0; i < product.name.length; i++) {
        hash = ((hash << 4) - hash) + product.name.charCodeAt(i);
    }
    return 50 + Math.abs(hash % 250);
}

async function generateProductsFile() {
    // Read the scraped products
    const inputPath = path.join(__dirname, 'scraped-products.json');
    const outputPath = path.join(__dirname, '../../lib/products/ls-industrial-scraped.ts');

    let products;
    try {
        const jsonData = await fs.readFile(inputPath, 'utf-8');
        products = JSON.parse(jsonData);
    } catch (err) {
        console.error('Error reading scraped products:', err.message);
        process.exit(1);
    }

    // Get unique categories and their images
    const categoryImages = {};
    const categories = [...new Set(products.map(p => p.category))];
    const subcategories = [...new Set(products.map(p => p.subcategory).filter(Boolean))];

    categories.forEach(category => {
        const product = products.find(p => p.category === category && (p.mainImage || (p.images && p.images.length > 0)));
        const image = product?.mainImage || product?.images?.[0];
        if (image) {
            categoryImages[category] = image;
        }
    });

    // Transform products for TypeScript export
    const transformedProducts = products.map(p => ({
        id: p.id,
        name: p.name,
        model: p.model,
        brand: p.brand,
        category: p.category,
        subcategory: p.subcategory || undefined,
        description: p.description || `LS Electric ${p.name} - ${p.subcategory || p.category}`,
        price: generatePrice(p),
        rating: generateRating(p),
        reviews: generateReviews(p),
        images: p.images || (p.mainImage ? [p.mainImage] : []),
        inStock: true,
        specs: p.specs || [],
        features: p.features || [],
        url: p.url
    }));

    // Generate TypeScript content
    const tsContent = `import { Product } from '@/lib/types/shared-types'

/**
 * LS Industrial Products - Auto-generated from scraper
 * Generated on: ${new Date().toISOString()}
 * 
 * This file contains products scraped from the LS Electric Smart Automation section.
 * Images are loaded directly from the LS Electric website.
 * 
 * Categories: ${categories.length}
 * Subcategories: ${subcategories.length}
 * Total Products: ${products.length}
 * 
 * Run the scraper again to update product data and images:
 *   cd scrapers/ls-industrial && npm run scrape && npm run generate
 */

export const lsIndustrialScraped: Product[] = ${JSON.stringify(transformedProducts, null, 2)};

// Get products by category
export const getScrapedProductsByCategory = (category: string): Product[] => {
    if (category === 'All Products') return lsIndustrialScraped;
    return lsIndustrialScraped.filter(p => p.category === category);
};

// Get products by subcategory
export const getScrapedProductsBySubcategory = (subcategory: string): Product[] => {
    return lsIndustrialScraped.filter(p => p.subcategory === subcategory);
};

// Get unique categories
export const getScrapedCategories = (): string[] => {
    const categories = Array.from(new Set(lsIndustrialScraped.map(p => p.category)));
    return ['All Products', ...categories];
};

// Get unique subcategories for a category
export const getScrapedSubcategories = (category: string): string[] => {
    return Array.from(new Set(
        lsIndustrialScraped
            .filter(p => p.category === category && p.subcategory)
            .map(p => p.subcategory as string)
    ));
};

// Export category image mapping using first product image from each category
export const lsIndustrialCategoryImages: Record<string, string> = ${JSON.stringify(categoryImages, null, 2)};

// Summary statistics
export const lsIndustrialStats = {
    totalProducts: ${products.length},
    categories: ${categories.length},
    subcategories: ${subcategories.length},
    withImages: ${products.filter(p => p.mainImage || (p.images && p.images.length > 0)).length},
    withFeatures: ${products.filter(p => p.features && p.features.length > 0).length},
    withSpecs: ${products.filter(p => p.specs && p.specs.length > 0).length}
};
`;

    // Write the TypeScript file
    await fs.writeFile(outputPath, tsContent);

    console.log(`\n✓ Generated TypeScript file: ${outputPath}`);
    console.log(`\n  Statistics:`);
    console.log(`  - ${products.length} total products`);
    console.log(`  - ${categories.length} categories: ${categories.join(', ')}`);
    console.log(`  - ${subcategories.length} subcategories`);
    console.log(`  - ${products.filter(p => p.mainImage || (p.images && p.images.length > 0)).length} products with images`);
    console.log(`  - ${products.filter(p => p.features && p.features.length > 0).length} products with features`);
    console.log(`  - ${products.filter(p => p.specs && p.specs.length > 0).length} products with specs`);
}

generateProductsFile()
    .then(() => process.exit(0))
    .catch(err => {
        console.error('Generation failed:', err);
        process.exit(1);
    });
