/**
 * KATKO Product Scraper (Shopify API Version)
 * 
 * Scrapes all product data from the KATKO Shopify store including:
 * - Product names and models
 * - Descriptions
 * - Categories and subcategories (from tags)
 * - Image URLs
 * - Features/specifications
 * 
 * Uses the Shopify JSON API for efficient data retrieval.
 */

import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

// Base URL for KATKO Shopify store
const BASE_URL = 'https://katko.com';
const PRODUCTS_API = `${BASE_URL}/products.json`;

// Shopify API limits
const PRODUCTS_PER_PAGE = 250; // Maximum allowed by Shopify

// Delay between requests to be respectful to the server
const REQUEST_DELAY = 500;

// Sleep function
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Category mapping based on common Katko product tags
const CATEGORY_MAPPING = {
    // Main product categories
    'IsoSafe': { category: 'Enclosed Isolators', subcategory: 'IsoSafe Switches' },
    'LoadSafe': { category: 'Load Break Switches', subcategory: 'LoadSafe Switches' },
    'FuseSafe': { category: 'Switch Fuses', subcategory: 'FuseSafe Fuse Switches' },
    'ConnectSafe': { category: 'Connectors', subcategory: 'ConnectSafe Terminal Blocks' },
    
    // Isolator types
    'IECEx Isolators': { category: 'Enclosed Isolators', subcategory: 'IECEx Isolators' },
    'ATEX Isolators': { category: 'Enclosed Isolators', subcategory: 'ATEX Isolators' },
    'EMC Isolators': { category: 'Enclosed Isolators', subcategory: 'EMC Isolators' },
    'Firerated Isolators': { category: 'Enclosed Isolators', subcategory: 'Fire-rated Isolators' },
    'Photovoltaic Isolators': { category: 'Enclosed Isolators', subcategory: 'Photovoltaic Isolators' },
    
    // Switch types
    'Changeover Switches': { category: 'Changeover Switches', subcategory: 'Enclosed Changeover Switches' },
    'Bypass Switches': { category: 'Changeover Switches', subcategory: 'Bypass Switches' },
    'Motor Control Switches': { category: 'Motor Control', subcategory: 'Motor Control Switches' },
    'Door-Mounted Switches': { category: 'Load Break Switches', subcategory: 'Door Mounted Switches' },
    
    // UL/CSA Listed
    'UL/cUL listed Load Break Switches': { category: 'UL/CSA Listed', subcategory: 'Load Break Switches' },
    'UL/cUL listed Enclosed Disconnects': { category: 'UL/CSA Listed', subcategory: 'Enclosed Disconnects' },
    'UL/cUL listed Switch Fuses': { category: 'UL/CSA Listed', subcategory: 'Switch Fuses' },
    'UL/cUL listed Terminal Blocks': { category: 'UL/CSA Listed', subcategory: 'Terminal Blocks' },
    'UL98 listed Load Break Switches': { category: 'UL/CSA Listed', subcategory: 'UL98 Load Break Switches' },
    'UL98 listed Enclosed Disconnects': { category: 'UL/CSA Listed', subcategory: 'UL98 Enclosed Disconnects' },
    
    // Accessories
    'Auxiliary Contacts': { category: 'Accessories', subcategory: 'Auxiliary Contacts' },
    'Handles': { category: 'Accessories', subcategory: 'Handles' },
    'Cable Glands': { category: 'Accessories', subcategory: 'Cable Glands' },
    'Door Mounting Kits': { category: 'Accessories', subcategory: 'Door Mounting Kits' },
    'Shafts': { category: 'Accessories', subcategory: 'Shafts' },
    'Front Plates': { category: 'Accessories', subcategory: 'Front Plates' },
    'Protective Roofs': { category: 'Accessories', subcategory: 'Protective Roofs' },
    'Terminal Covers': { category: 'Accessories', subcategory: 'Terminal Covers' },
    'Phase Barriers': { category: 'Accessories', subcategory: 'Phase Barriers' },
    'Changeover Kits': { category: 'Accessories', subcategory: 'Changeover Kits' },
    'Parallel Kits': { category: 'Accessories', subcategory: 'Parallel Kits' },
    'Earthing Plates': { category: 'Accessories', subcategory: 'Earthing Plates' },
    'Spreaders': { category: 'Accessories', subcategory: 'Spreaders' },
    
    // Enclosures
    'Installation Enclosures': { category: 'Installation Enclosures', subcategory: 'KCS Enclosures' },
    'Junction Boxes': { category: 'Installation Enclosures', subcategory: 'Junction Boxes' },
    'Fuse Boxes': { category: 'Switch Fuses', subcategory: 'Fuse Boxes' },
    
    // Terminal Blocks
    'Terminal Blocks': { category: 'Connectors', subcategory: 'Terminal Blocks' },
    'Cable Connectors': { category: 'Connectors', subcategory: 'Cable Connectors' },
};

/**
 * Determine category and subcategory from product tags
 */
function getCategoryFromTags(tags) {
    if (!tags || tags.length === 0) {
        return { category: 'Other Products', subcategory: 'General' };
    }

    // Check each tag against our mapping
    for (const tag of tags) {
        if (CATEGORY_MAPPING[tag]) {
            return CATEGORY_MAPPING[tag];
        }
    }

    // Try partial matches
    for (const tag of tags) {
        for (const [key, value] of Object.entries(CATEGORY_MAPPING)) {
            if (tag.toLowerCase().includes(key.toLowerCase()) || 
                key.toLowerCase().includes(tag.toLowerCase())) {
                return value;
            }
        }
    }

    // Default based on first tag
    const firstTag = tags[0] || 'General';
    return { category: 'Other Products', subcategory: firstTag };
}

/**
 * Extract features from product description HTML
 */
function extractFeatures(htmlDescription) {
    if (!htmlDescription) return [];
    
    const features = [];
    
    // Remove HTML tags but keep text
    const text = htmlDescription
        .replace(/<[^>]*>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/\s+/g, ' ')
        .trim();
    
    // Split into sentences and extract key features
    const sentences = text.split(/[.!]/).filter(s => s.trim().length > 10);
    
    for (const sentence of sentences.slice(0, 5)) {
        const cleaned = sentence.trim();
        if (cleaned.length > 15 && cleaned.length < 300) {
            features.push(cleaned + '.');
        }
    }
    
    return features;
}

/**
 * Clean and extract model number from product title
 */
function extractModel(title) {
    // Katko products often have model numbers at the start or in specific patterns
    // e.g., "Load break switch 4x125A" -> "4x125A"
    // or "KEA 3x16A IECEX" -> "KEA 3x16A"
    
    // Try to find pattern like "3x16A", "4x125A", etc.
    const ampMatch = title.match(/\d+x\d+A/i);
    if (ampMatch) {
        // Get the product code before or including the amp rating
        const beforeAmp = title.substring(0, title.indexOf(ampMatch[0]) + ampMatch[0].length);
        const words = beforeAmp.split(' ');
        // Return last 2-3 meaningful words
        return words.slice(-3).join(' ').trim();
    }
    
    // Try to find product codes like "KEA", "KEM", "KU", etc.
    const codeMatch = title.match(/\b(K[A-Z]{1,3}[-\s]?\d+[A-Z0-9-]*)/i);
    if (codeMatch) {
        return codeMatch[1];
    }
    
    return title;
}

/**
 * Fetch products from Shopify API with pagination
 */
async function fetchAllProducts() {
    console.log('Fetching products from KATKO Shopify store...\n');
    
    const allProducts = [];
    let page = 1;
    let hasMore = true;
    
    while (hasMore) {
        try {
            console.log(`Fetching page ${page}...`);
            
            const response = await axios.get(PRODUCTS_API, {
                params: {
                    limit: PRODUCTS_PER_PAGE,
                    page: page
                },
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': 'application/json'
                },
                timeout: 30000
            });
            
            const products = response.data.products || [];
            console.log(`  Found ${products.length} products on page ${page}`);
            
            if (products.length === 0) {
                hasMore = false;
            } else {
                allProducts.push(...products);
                page++;
                
                // Check if we got less than the limit (last page)
                if (products.length < PRODUCTS_PER_PAGE) {
                    hasMore = false;
                }
                
                // Respect rate limits
                await sleep(REQUEST_DELAY);
            }
            
        } catch (error) {
            console.error(`Error fetching page ${page}: ${error.message}`);
            
            // If we get a rate limit error, wait longer and retry
            if (error.response?.status === 429) {
                console.log('  Rate limited, waiting 5 seconds...');
                await sleep(5000);
            } else {
                // Stop on other errors after some products
                if (allProducts.length > 0) {
                    console.log(`  Continuing with ${allProducts.length} products scraped so far`);
                    hasMore = false;
                } else {
                    throw error;
                }
            }
        }
    }
    
    console.log(`\nTotal products fetched: ${allProducts.length}\n`);
    return allProducts;
}

/**
 * Transform Shopify product to our format
 */
function transformProduct(shopifyProduct, index) {
    const { category, subcategory } = getCategoryFromTags(shopifyProduct.tags);
    
    // Get images
    const images = (shopifyProduct.images || [])
        .map(img => img.src)
        .filter(src => src && !src.includes('placeholder'));
    
    // Get main image
    const mainImage = images[0] || null;
    
    // Extract features from description
    const features = extractFeatures(shopifyProduct.body_html);
    
    // Get SKU from first variant
    const sku = shopifyProduct.variants?.[0]?.sku || '';
    
    // Clean description (remove HTML)
    let description = shopifyProduct.body_html || '';
    description = description
        .replace(/<[^>]*>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/\s+/g, ' ')
        .trim()
        .substring(0, 500);
    
    return {
        id: 80001 + index, // Starting ID for KATKO products
        name: shopifyProduct.title,
        model: extractModel(shopifyProduct.title),
        brand: 'KATKO',
        category,
        subcategory,
        description,
        url: `${BASE_URL}/products/${shopifyProduct.handle}`,
        images: images.length > 0 ? images : (mainImage ? [mainImage] : []),
        mainImage,
        features,
        sku,
        tags: shopifyProduct.tags || [],
        shopifyId: shopifyProduct.id,
        handle: shopifyProduct.handle,
        createdAt: shopifyProduct.created_at,
        updatedAt: shopifyProduct.updated_at
    };
}

/**
 * Main scraping function
 */
async function scrapeAllProducts() {
    console.log('=== KATKO Product Scraper (Shopify API) ===\n');
    
    try {
        // Fetch all products from Shopify API
        const shopifyProducts = await fetchAllProducts();
        
        // Transform to our format
        console.log('Transforming product data...\n');
        const products = shopifyProducts.map((p, i) => transformProduct(p, i));
        
        // Calculate statistics
        const withImages = products.filter(p => p.images.length > 0).length;
        const withDescriptions = products.filter(p => p.description.length > 10).length;
        const withFeatures = products.filter(p => p.features.length > 0).length;
        
        const categories = [...new Set(products.map(p => p.category))].sort();
        const subcategories = [...new Set(products.map(p => p.subcategory))].sort();
        
        // Show sample products
        console.log('Sample products:');
        for (const p of products.slice(0, 5)) {
            const imgStatus = p.images.length > 0 ? '✓' : '✗';
            console.log(`  ${imgStatus} ${p.name.substring(0, 60)}... [${p.category}]`);
        }
        console.log('  ...\n');
        
        // Save scraped data
        const outputPath = path.join(process.cwd(), 'scraped-products.json');
        await fs.writeFile(outputPath, JSON.stringify(products, null, 2));
        
        console.log('=== Scraping Complete ===');
        console.log(`✓ Saved ${products.length} products to ${outputPath}`);
        console.log(`  With images: ${withImages}`);
        console.log(`  With descriptions: ${withDescriptions}`);
        console.log(`  With features: ${withFeatures}`);
        console.log(`  Categories (${categories.length}): ${categories.join(', ')}`);
        console.log(`  Subcategories: ${subcategories.length}`);
        
        return products;
        
    } catch (error) {
        console.error('Scraping failed:', error.message);
        throw error;
    }
}

// Run the scraper
scrapeAllProducts().catch(console.error);
