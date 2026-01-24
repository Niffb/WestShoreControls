/**
 * NOARK Image Fetcher
 * 
 * Fetches actual product image URLs from the Noark Kyklo catalog
 * and updates the existing product data with external image references.
 */

import puppeteer from 'puppeteer-core';
import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';

const BASE_URL = 'https://products.na.noark-electric.com';
const REQUEST_DELAY = 1500;
const MAX_PRODUCTS_PER_CATEGORY = 100; // Limit to speed up scraping

// Find Chrome/Chromium executable
function findChrome() {
    const possiblePaths = [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/Applications/Chromium.app/Contents/MacOS/Chromium',
        '/usr/bin/google-chrome',
        '/usr/bin/chromium-browser',
        '/usr/bin/chromium'
    ];
    
    for (const chromePath of possiblePaths) {
        try {
            execSync(`test -f "${chromePath}"`);
            return chromePath;
        } catch (e) {
            continue;
        }
    }
    
    // Try to find using 'which'
    try {
        const result = execSync('which google-chrome || which chromium || which chromium-browser', { encoding: 'utf-8' });
        return result.trim();
    } catch (e) {
        throw new Error('Could not find Chrome/Chromium. Please install Chrome.');
    }
}

// Product categories on the Noark Kyklo site
const CATEGORIES = [
    { path: '/en/molded-case-circuit-breakers-accessories', name: 'Circuit Breakers' },
    { path: '/en/iec-contactors', name: 'Contactors' },
    { path: '/en/thermal-overload-relays', name: 'Overload Relays' },
    { path: '/en/manual-motor-starters', name: 'Manual Motor Starters' },
    { path: '/en/pushbuttons-pilot-lights', name: 'Push Buttons' },
    { path: '/en/led-pilot-lights', name: 'LED Indicators' },
    { path: '/en/power-distribution', name: 'Power Distribution' }
];

// Image URL mapping by product model prefix
const KYKLO_IMAGE_BASE = 'https://cdn.kyklo.co/products/product_images';

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchCategoryImages(browser, category) {
    console.log(`\n📂 Fetching images for: ${category.name}`);
    
    const page = await browser.newPage();
    const products = [];
    
    try {
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36');
        await page.setViewport({ width: 1920, height: 1080 });
        
        // Navigate to category page
        const url = `${BASE_URL}${category.path}`;
        console.log(`  Loading: ${url}`);
        
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
        await delay(2000);
        
        // Scroll to load lazy images
        await page.evaluate(async () => {
            for (let i = 0; i < 5; i++) {
                window.scrollBy(0, window.innerHeight);
                await new Promise(r => setTimeout(r, 500));
            }
            window.scrollTo(0, 0);
        });
        
        await delay(1000);
        
        // Extract product cards with images
        const categoryProducts = await page.evaluate(() => {
            const items = [];
            const cards = document.querySelectorAll('.product-card, .product-item, [data-product-id], .product-thumbnail');
            
            cards.forEach(card => {
                const nameEl = card.querySelector('.product-name, .product-title, h3, h4, .title');
                const imgEl = card.querySelector('img[src*="cdn.kyklo"], img[data-src*="cdn.kyklo"], img');
                const linkEl = card.querySelector('a[href*="/products/"]');
                
                if (nameEl || imgEl) {
                    const name = nameEl?.textContent?.trim() || '';
                    let imageUrl = imgEl?.src || imgEl?.dataset?.src || '';
                    const productUrl = linkEl?.href || '';
                    
                    // Convert to full URL if needed
                    if (imageUrl && !imageUrl.startsWith('http')) {
                        imageUrl = '';
                    }
                    
                    if (name || imageUrl) {
                        items.push({
                            name: name,
                            model: name.split(' ')[0] || name,
                            image: imageUrl,
                            url: productUrl
                        });
                    }
                }
            });
            
            return items;
        });
        
        console.log(`  Found ${categoryProducts.length} products in category`);
        
        // Add category to each product
        categoryProducts.forEach(p => {
            p.category = category.name;
            products.push(p);
        });
        
    } catch (e) {
        console.log(`  ⚠ Error fetching category: ${e.message}`);
    } finally {
        await page.close();
    }
    
    return products;
}

async function fetchProductImages() {
    console.log('=== NOARK Image Fetcher ===\n');
    
    const chromePath = findChrome();
    console.log(`Using Chrome at: ${chromePath}\n`);
    
    const browser = await puppeteer.launch({
        executablePath: chromePath,
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ]
    });
    
    const allProducts = [];
    
    try {
        for (const category of CATEGORIES) {
            const products = await fetchCategoryImages(browser, category);
            allProducts.push(...products);
            await delay(REQUEST_DELAY);
        }
    } finally {
        await browser.close();
    }
    
    // Create image mapping
    const imageMap = {};
    for (const product of allProducts) {
        if (product.image && product.image.includes('cdn.kyklo')) {
            const key = product.model.toLowerCase().replace(/[^a-z0-9]/g, '');
            if (!imageMap[key]) {
                imageMap[key] = product.image;
            }
        }
    }
    
    // Save the image mapping
    const outputPath = path.join(process.cwd(), 'image-mapping.json');
    await fs.writeFile(outputPath, JSON.stringify(imageMap, null, 2));
    
    console.log('\n=== Fetch Complete ===');
    console.log(`✓ Found ${allProducts.length} products with images`);
    console.log(`✓ Saved image mapping to ${outputPath}`);
    
    return imageMap;
}

// Run the fetcher
fetchProductImages().catch(console.error);
