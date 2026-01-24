/**
 * NOARK Product Consolidator
 * 
 * Consolidates all existing NOARK product data from the various source files
 * into a single comprehensive scraped products file.
 * 
 * Uses external image URLs from na.noark-electric.com
 */

import fs from 'fs/promises';
import path from 'path';

// Base URL for Noark images
const NOARK_IMAGE_BASE = 'https://na.noark-electric.com/wp-content/uploads';

// External image URLs from the Noark website
const EXTERNAL_IMAGES = {
    // Circuit Breakers - MCCB Series
    'M1': `${NOARK_IMAGE_BASE}/2024/05/Stock-Images-e1694255111739.jpg`,
    'M2': `${NOARK_IMAGE_BASE}/2024/05/Stock-Images-e1694255111739.jpg`,
    'M3': `${NOARK_IMAGE_BASE}/2025/08/ElectronicM3.png`,
    'M4': `${NOARK_IMAGE_BASE}/2024/05/Power-Circuit-Breakers-2-e1692743350831.jpg`,
    'Ex9M': `${NOARK_IMAGE_BASE}/2024/05/Stock-Images-e1694255111739.jpg`,
    
    // Miniature Circuit Breakers
    'B1N': `${NOARK_IMAGE_BASE}/2024/05/Circuit-Protection-Text-2-Image.png`,
    'B1H': `${NOARK_IMAGE_BASE}/2024/05/Circuit-Protection-Text-2-Image.png`,
    'B1D': `${NOARK_IMAGE_BASE}/2024/05/Circuit-Protection-Text-2-Image.png`,
    'B1E': `${NOARK_IMAGE_BASE}/2024/05/Circuit-Protection-Text-2-Image.png`,
    'B1NQ': `${NOARK_IMAGE_BASE}/2024/05/Circuit-Protection-Text-2-Image.png`,
    
    // Contactors
    'Ex9C': `${NOARK_IMAGE_BASE}/2024/05/productfroupweb.png`,
    'Ex9CDR': `${NOARK_IMAGE_BASE}/2024/05/productfroupweb.png`,
    'Ex9CK': `${NOARK_IMAGE_BASE}/2024/05/productfroupweb.png`,
    
    // Overload Relays
    'Ex9R': `${NOARK_IMAGE_BASE}/2024/05/productfroupweb.png`,
    'Ex9RD': `${NOARK_IMAGE_BASE}/2024/05/productfroupweb.png`,
    
    // Manual Motor Starters
    'Ex9S': `${NOARK_IMAGE_BASE}/2024/05/productfroupweb.png`,
    'Ex9SN': `${NOARK_IMAGE_BASE}/2024/05/productfroupweb.png`,
    
    // Push Buttons & Pilot Devices
    'Ex9PB': `${NOARK_IMAGE_BASE}/2024/05/productfroupweb.png`,
    'Ex9IL': `${NOARK_IMAGE_BASE}/2024/05/productfroupweb.png`,
    
    // SPD
    'Ex9UE': `${NOARK_IMAGE_BASE}/2024/11/U4-Surge-Protective-Devices.jpg`,
    'Ex9UP': `${NOARK_IMAGE_BASE}/2024/11/U4-Surge-Protective-Devices.jpg`,
    
    // Enclosed Breakers
    'ECB': `${NOARK_IMAGE_BASE}/2024/11/NOARK-ECB-Page.jpg`,
    
    // Switches
    'RDS': `${NOARK_IMAGE_BASE}/2025/07/RDS1B_3P-scaled-e1752028091107.png`,
    'Ex9MD': `${NOARK_IMAGE_BASE}/2024/05/Stock-Images-e1694255111739.jpg`,
    
    // Default category images
    'default_circuit_breakers': `${NOARK_IMAGE_BASE}/2024/05/Stock-Images-e1694255111739.jpg`,
    'default_contactors': `${NOARK_IMAGE_BASE}/2024/05/productfroupweb.png`,
    'default_overload_relays': `${NOARK_IMAGE_BASE}/2024/05/productfroupweb.png`,
    'default_manual_motor_starters': `${NOARK_IMAGE_BASE}/2024/05/productfroupweb.png`,
    'default_push_buttons': `${NOARK_IMAGE_BASE}/2024/05/productfroupweb.png`,
    'default_led_indicators': `${NOARK_IMAGE_BASE}/2024/05/productfroupweb.png`,
    'default_power_distribution': `${NOARK_IMAGE_BASE}/2024/05/productfroupweb.png`,
    'default_other': `${NOARK_IMAGE_BASE}/2024/05/productfroupweb.png`
};

// Category configurations with external images
const CATEGORY_CONFIG = {
    'Miniature Circuit Breakers': {
        subcategory: 'MCBs',
        image: EXTERNAL_IMAGES['B1N'],
        description: 'NOARK miniature circuit breakers for residential and commercial applications.'
    },
    'Motor Circuit Protectors': {
        subcategory: 'MCPs',
        image: EXTERNAL_IMAGES['Ex9S'],
        description: 'NOARK motor circuit protectors for motor protection applications.'
    },
    'Power Circuit Breakers': {
        subcategory: 'ACBs',
        image: EXTERNAL_IMAGES['M4'],
        description: 'NOARK air circuit breakers for high-current applications.'
    },
    'Surge Protection Devices': {
        subcategory: 'SPDs',
        image: EXTERNAL_IMAGES['Ex9UE'],
        description: 'NOARK surge protection devices for electrical system protection.'
    },
    'Disconnect Switches': {
        subcategory: 'Switch Disconnectors',
        image: EXTERNAL_IMAGES['RDS'],
        description: 'NOARK disconnect switches and load break switches.'
    },
    'Enclosed Breakers': {
        subcategory: 'Enclosed MCCBs',
        image: EXTERNAL_IMAGES['ECB'],
        description: 'NOARK enclosed molded case circuit breakers.'
    },
    'Fuse Holders': {
        subcategory: 'Din Rail Fuse Holders',
        image: EXTERNAL_IMAGES['default_circuit_breakers'],
        description: 'NOARK DIN rail fuse holders and fuses.'
    },
    'Circuit Breakers': {
        subcategory: 'MCCBs',
        image: EXTERNAL_IMAGES['M3'],
        description: 'NOARK molded case circuit breakers.'
    },
    'Contactors': {
        subcategory: 'Industrial Contactors',
        image: EXTERNAL_IMAGES['Ex9C'],
        description: 'NOARK IEC contactors for industrial motor control.'
    },
    'Overload Relays': {
        subcategory: 'Thermal Overloads',
        image: EXTERNAL_IMAGES['Ex9R'],
        description: 'NOARK thermal overload relays for motor protection.'
    },
    'LED Indicators': {
        subcategory: 'Pilot Lights',
        image: EXTERNAL_IMAGES['Ex9IL'],
        description: 'NOARK LED indicator lights and pilot devices.'
    },
    'Manual Motor Starters': {
        subcategory: 'Motor Starters',
        image: EXTERNAL_IMAGES['Ex9SN'],
        description: 'NOARK manual motor starters for direct-on-line starting.'
    },
    'Push Buttons': {
        subcategory: 'Pushbuttons',
        image: EXTERNAL_IMAGES['Ex9PB'],
        description: 'NOARK 22mm pushbuttons and control devices.'
    },
    'Power Distribution': {
        subcategory: 'Power Distribution',
        image: EXTERNAL_IMAGES['default_power_distribution'],
        description: 'NOARK power distribution components.'
    },
    'Other Products': {
        subcategory: 'Accessories',
        image: EXTERNAL_IMAGES['default_other'],
        description: 'NOARK accessories and other electrical components.'
    }
};

// Get external image URL for a product based on model prefix
function getExternalImageUrl(model, category) {
    if (!model) {
        const config = CATEGORY_CONFIG[category];
        return config?.image || EXTERNAL_IMAGES['default_other'];
    }
    
    const upperModel = model.toUpperCase();
    
    // Check for specific model prefix matches
    const prefixes = ['EX9CDR', 'EX9CK', 'EX9C', 'EX9RD', 'EX9R', 'EX9SN', 'EX9S', 'EX9PB', 'EX9IL', 
                     'EX9UE', 'EX9UP', 'EX9M', 'EX9MD', 'B1NQ', 'B1N', 'B1H', 'B1D', 'B1E',
                     'M1N', 'M2N', 'M3N', 'M4N', 'M1', 'M2', 'M3', 'M4', 'RDS', 'ECB', 'KLK'];
    
    for (const prefix of prefixes) {
        if (upperModel.startsWith(prefix)) {
            // Map to the external image
            const key = prefix.replace(/N$/, ''); // Remove trailing N for series
            if (EXTERNAL_IMAGES[key]) {
                return EXTERNAL_IMAGES[key];
            }
        }
    }
    
    // Fallback to category default
    const config = CATEGORY_CONFIG[category];
    if (config?.image) {
        return config.image;
    }
    
    // Final fallback
    const defaultKey = `default_${category.toLowerCase().replace(/\s+/g, '_')}`;
    return EXTERNAL_IMAGES[defaultKey] || EXTERNAL_IMAGES['default_other'];
}

// Read existing product files dynamically
async function loadExistingProducts() {
    const productsDir = path.join(process.cwd(), '..', '..', 'lib', 'products');
    const allProducts = [];
    
    // Files to consolidate
    const noarkFiles = [
        'noark-b1d-products.ts',
        'noark-b1e-products.ts',
        'noark-b1h-products.ts',
        'noark-b1n-products.ts',
        'noark-b1nq-products.ts',
        'noark-ex9bp-products.ts',
        'noark-mcp-products.ts',
        'noark-spd-products.ts',
        'noark-switches-products.ts',
        'noark-enclosed-breakers-products.ts',
        'noark-fuse-holders-products.ts'
    ];
    
    for (const file of noarkFiles) {
        const filePath = path.join(productsDir, file);
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            
            // Extract the array from the TypeScript file
            const match = content.match(/export const \w+:\s*Product\[\]\s*=\s*(\[[\s\S]*?\]);?\s*(?:export|\/\/|$)/);
            
            if (match) {
                try {
                    const arrayStr = match[1]
                        .replace(/\/\/.*$/gm, '')
                        .replace(/,(\s*[\]}])/g, '$1');
                    
                    const products = eval(`(${arrayStr})`);
                    if (Array.isArray(products)) {
                        console.log(`  ✓ Loaded ${products.length} products from ${file}`);
                        allProducts.push(...products);
                    }
                } catch (e) {
                    console.log(`  ⚠ Could not parse products from ${file}: ${e.message}`);
                }
            }
        } catch (e) {
            console.log(`  ⚠ Could not read ${file}: ${e.message}`);
        }
    }
    
    // Also load scraped products from the scraped folder
    const scrapedDir = path.join(productsDir, 'scraped');
    try {
        const scrapedFiles = await fs.readdir(scrapedDir);
        for (const file of scrapedFiles.filter(f => f.startsWith('noark-') && f.endsWith('.ts'))) {
            const filePath = path.join(scrapedDir, file);
            try {
                const content = await fs.readFile(filePath, 'utf-8');
                const match = content.match(/export const \w+:\s*Product\[\]\s*=\s*(\[[\s\S]*?\]);?\s*(?:export|\/\/|$)/);
                if (match) {
                    try {
                        const arrayStr = match[1]
                            .replace(/\/\/.*$/gm, '')
                            .replace(/,(\s*[\]}])/g, '$1');
                        const products = eval(`(${arrayStr})`);
                        if (Array.isArray(products)) {
                            console.log(`  ✓ Loaded ${products.length} products from scraped/${file}`);
                            allProducts.push(...products);
                        }
                    } catch (e) {
                        // Skip parsing errors
                    }
                }
            } catch (e) {
                // Skip file read errors
            }
        }
    } catch (e) {
        console.log('  ⚠ Could not read scraped folder');
    }
    
    return allProducts;
}

async function consolidateProducts() {
    console.log('=== NOARK Product Consolidator ===\n');
    console.log('Using external images from na.noark-electric.com\n');
    console.log('Loading existing product files...\n');
    
    const existingProducts = await loadExistingProducts();
    
    console.log(`\nTotal products loaded: ${existingProducts.length}`);
    
    // Deduplicate by model/name
    const uniqueProducts = [];
    const seenModels = new Set();
    
    for (const product of existingProducts) {
        const key = (product.model || product.name || '').toLowerCase();
        if (!seenModels.has(key) && key) {
            seenModels.add(key);
            uniqueProducts.push(product);
        }
    }
    
    console.log(`Unique products after deduplication: ${uniqueProducts.length}`);
    
    // Assign new IDs and update with external images
    let productId = 90001;
    const consolidatedProducts = uniqueProducts.map(product => {
        const category = product.category || 'Circuit Breakers';
        const config = CATEGORY_CONFIG[category] || { 
            subcategory: category, 
            image: EXTERNAL_IMAGES['default_other'],
            description: ''
        };
        
        // Get external image URL based on product model
        const externalImageUrl = getExternalImageUrl(product.model || product.name, category);
        
        return {
            id: productId++,
            name: product.name || product.model,
            model: product.model || product.name,
            brand: 'Noark',
            category: category,
            subcategory: product.subcategory || config.subcategory,
            description: product.description || config.description,
            price: product.price || 0,
            rating: product.rating || 4.7,
            reviews: product.reviews || 0,
            images: [externalImageUrl],
            inStock: product.inStock !== false,
            specs: product.specs || [],
            url: product.url || `/noark/${category.toLowerCase().replace(/\s+/g, '-')}/${(product.model || product.name || '').toLowerCase()}`,
            features: product.features || [],
            sku: product.sku || product.model || ''
        };
    });
    
    // Calculate statistics
    const categories = [...new Set(consolidatedProducts.map(p => p.category))].sort();
    const withExternalImages = consolidatedProducts.filter(p => 
        p.images.length > 0 && p.images[0].startsWith('https://')
    ).length;
    
    // Generate category images map using external URLs
    const categoryImages = {};
    for (const [category, config] of Object.entries(CATEGORY_CONFIG)) {
        categoryImages[category] = config.image;
    }
    
    // Save to JSON
    const outputPath = path.join(process.cwd(), 'scraped-products.json');
    await fs.writeFile(outputPath, JSON.stringify(consolidatedProducts, null, 2));
    
    console.log('\n=== Consolidation Complete ===');
    console.log(`✓ Saved ${consolidatedProducts.length} products to ${outputPath}`);
    console.log(`  With external images: ${withExternalImages}`);
    console.log(`  Categories: ${categories.join(', ')}`);
    console.log(`\nExternal image base: ${NOARK_IMAGE_BASE}`);
    
    return consolidatedProducts;
}

// Run consolidation
consolidateProducts().catch(console.error);
