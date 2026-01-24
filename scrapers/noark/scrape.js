/**
 * NOARK Electric Product Scraper (Kyklo Platform)
 * 
 * Scrapes product data from the NOARK Electric Kyklo catalog including:
 * - Product SKUs and names
 * - Descriptions
 * - Categories
 * - Image URLs
 * - Specifications
 * 
 * Uses Puppeteer because the Kyklo platform requires JavaScript rendering.
 */

import puppeteer from 'puppeteer-core';
import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';

// Find Chrome executable
function findChrome() {
    const paths = [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/Applications/Chromium.app/Contents/MacOS/Chromium',
        process.env.CHROME_PATH
    ];
    
    for (const p of paths) {
        if (p) {
            try {
                execSync(`test -f "${p}"`);
                return p;
            } catch {}
        }
    }
    
    throw new Error('Chrome not found. Install Chrome or set CHROME_PATH');
}

// Base URL for NOARK products catalog
const BASE_URL = 'https://products.na.noark-electric.com';

// Product categories with their URLs
const CATEGORIES = [
    {
        name: 'Miniature Circuit Breakers',
        subcategory: 'MCBs',
        url: '/brands/noark/main-functions/miniature-circuit-breaker-mcb'
    },
    {
        name: 'Molded Case Circuit Breakers',
        subcategory: 'MCCBs',
        url: '/brands/noark/main-functions/moulded-case-circuit-breaker-mccb'
    },
    {
        name: 'Motor Protection Circuit Breakers',
        subcategory: 'Motor Protection',
        url: '/brands/noark/main-functions/motor-protection-circuit-breaker-mpcb'
    },
    {
        name: 'Air Circuit Breakers',
        subcategory: 'ACBs',
        url: '/brands/noark/main-functions/air-circuit-breaker-acb'
    },
    {
        name: 'Contactors',
        subcategory: 'Industrial Contactors',
        url: '/brands/noark/main-functions/contactor'
    },
    {
        name: 'Overload Relays',
        subcategory: 'Thermal Overloads',
        url: '/brands/noark/main-functions/overload-relay'
    },
    {
        name: 'Variable Frequency Drives',
        subcategory: 'VFDs',
        url: '/brands/noark/main-functions/variable-frequency-drive'
    },
    {
        name: 'Soft Starters',
        subcategory: 'Soft Starters',
        url: '/brands/noark/main-functions/soft-starter'
    },
    {
        name: 'Switch Disconnectors',
        subcategory: 'Disconnects',
        url: '/brands/noark/main-functions/switch-disconnector'
    },
    {
        name: 'Surge Protection Devices',
        subcategory: 'SPDs',
        url: '/brands/noark/main-functions/surge-protection-device-spd'
    },
    {
        name: 'Pilot Devices',
        subcategory: 'Pushbuttons & Indicators',
        url: '/brands/noark/main-functions/pilot-device'
    },
    {
        name: 'Terminal Blocks',
        subcategory: 'Din Rail Terminals',
        url: '/brands/noark/main-functions/terminal-block'
    },
    {
        name: 'Fuse Holders',
        subcategory: 'Din Rail Fuse Holders',
        url: '/brands/noark/main-functions/fuse-holder'
    },
    {
        name: 'Motor Starters',
        subcategory: 'DOL Starters',
        url: '/brands/noark/main-functions/motor-starter'
    },
    {
        name: 'Handles',
        subcategory: 'Accessories',
        url: '/brands/noark/main-functions/handle'
    }
];

// Delays
const PAGE_LOAD_DELAY = 2000;
const SCROLL_DELAY = 500;
const PRODUCT_DELAY = 300;

// Sleep function
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Wait for page content to load
 */
async function waitForProducts(page) {
    try {
        // Wait for product cards or table to appear
        await page.waitForSelector('a[href*="/products/"]', { timeout: 15000 });
        await sleep(1000);
    } catch (e) {
        console.log('  No product links found');
    }
}

/**
 * Scroll to load all products (handles infinite scroll)
 */
async function scrollToLoadAll(page) {
    let previousHeight = 0;
    let currentHeight = await page.evaluate(() => document.body.scrollHeight);
    let scrollAttempts = 0;
    const maxScrolls = 20;

    while (previousHeight < currentHeight && scrollAttempts < maxScrolls) {
        previousHeight = currentHeight;
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await sleep(SCROLL_DELAY);
        currentHeight = await page.evaluate(() => document.body.scrollHeight);
        scrollAttempts++;
    }
}

/**
 * Extract product URLs from a category page
 */
async function extractProductUrls(page) {
    return await page.evaluate((baseUrl) => {
        const urls = new Set();
        
        // Find all product links
        document.querySelectorAll('a[href*="/products/"]').forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.includes('{{')) {
                const fullUrl = href.startsWith('http') ? href : baseUrl + href;
                urls.add(fullUrl);
            }
        });

        return [...urls];
    }, BASE_URL);
}

/**
 * Extract product data from a product detail page
 */
async function scrapeProductPage(page, url, category) {
    try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        await sleep(1000);

        const product = await page.evaluate((baseUrl, categoryData) => {
            // Extract SKU from URL
            const sku = window.location.pathname.split('/products/')[1]?.split('?')[0] || '';
            
            // Get product name from h1 or title
            const h1 = document.querySelector('h1');
            let name = h1?.textContent?.trim() || sku;
            
            // Get description
            const descEl = document.querySelector('.product-description, [class*="description"], p.description');
            const description = descEl?.textContent?.trim() || '';
            
            // Get images
            const images = [];
            document.querySelectorAll('img').forEach(img => {
                const src = img.src || img.getAttribute('data-src');
                if (src && 
                    !src.includes('logo') && 
                    !src.includes('icon') && 
                    !src.includes('placeholder') &&
                    !src.includes('flags/') &&
                    (src.includes('noark') || src.includes('product') || src.includes('/images/'))) {
                    const fullSrc = src.startsWith('http') ? src : baseUrl + src;
                    if (!images.includes(fullSrc)) {
                        images.push(fullSrc);
                    }
                }
            });

            // Get specifications from tables
            const specs = [];
            document.querySelectorAll('table tr, .spec-row, [class*="specification"]').forEach(row => {
                const cells = row.querySelectorAll('td, th, .spec-label, .spec-value');
                if (cells.length >= 2) {
                    const label = cells[0]?.textContent?.trim();
                    const value = cells[1]?.textContent?.trim();
                    if (label && value && label.length < 100 && value.length < 200) {
                        specs.push({ label, value });
                    }
                }
            });

            // Get features from lists
            const features = [];
            document.querySelectorAll('.features li, .product-features li, ul.features li').forEach(li => {
                const text = li.textContent?.trim();
                if (text && text.length > 5 && text.length < 300) {
                    features.push(text);
                }
            });

            return {
                sku,
                name,
                description: description.substring(0, 500),
                images,
                specs,
                features,
                category: categoryData.name,
                subcategory: categoryData.subcategory
            };
        }, BASE_URL, category);

        return {
            ...product,
            url,
            model: product.sku
        };

    } catch (e) {
        console.log(`  ✗ Error scraping ${url}: ${e.message}`);
        return null;
    }
}

/**
 * Scrape all products from a category
 */
async function scrapeCategory(page, category) {
    console.log(`\n=== Scraping ${category.name} ===`);
    
    const fullUrl = `${BASE_URL}${category.url}`;
    console.log(`  URL: ${fullUrl}`);

    try {
        await page.goto(fullUrl, { waitUntil: 'networkidle2', timeout: 45000 });
        await waitForProducts(page);
        await scrollToLoadAll(page);
    } catch (e) {
        console.log(`  ✗ Failed to load category: ${e.message}`);
        return [];
    }

    // Get all product URLs from the category
    const productUrls = await extractProductUrls(page);
    console.log(`  Found ${productUrls.length} product URLs`);

    if (productUrls.length === 0) {
        return [];
    }

    // Scrape each product
    const products = [];
    for (let i = 0; i < productUrls.length; i++) {
        const url = productUrls[i];
        const sku = url.split('/products/')[1]?.split('?')[0] || '';
        
        if (i > 0 && i % 20 === 0) {
            console.log(`  Progress: ${i}/${productUrls.length}`);
        }

        const product = await scrapeProductPage(page, url, category);
        if (product) {
            products.push(product);
        }

        await sleep(PRODUCT_DELAY);
    }

    console.log(`  ✓ Scraped ${products.length} products from ${category.name}`);
    return products;
}

/**
 * Main scraping function
 */
async function scrapeAllProducts() {
    console.log('=== NOARK Electric Product Scraper ===\n');
    console.log('Launching browser...\n');

    const chromePath = findChrome();
    console.log(`Using Chrome at: ${chromePath}\n`);
    
    const browser = await puppeteer.launch({
        executablePath: chromePath,
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--window-size=1920,1080'
        ],
        defaultViewport: { width: 1920, height: 1080 }
    });

    const page = await browser.newPage();

    // Set user agent
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    const allProducts = [];
    let productId = 90001;

    // Scrape each category
    for (const category of CATEGORIES) {
        try {
            const products = await scrapeCategory(page, category);
            
            // Add IDs and brand
            products.forEach(product => {
                product.id = productId++;
                product.brand = 'Noark';
            });

            allProducts.push(...products);
        } catch (e) {
            console.log(`  ✗ Error in category ${category.name}: ${e.message}`);
        }

        await sleep(PAGE_LOAD_DELAY);
    }

    await browser.close();

    // Deduplicate by SKU
    const uniqueProducts = [];
    const seenSkus = new Set();
    for (const product of allProducts) {
        if (!seenSkus.has(product.sku)) {
            seenSkus.add(product.sku);
            uniqueProducts.push(product);
        }
    }

    // Calculate statistics
    const withImages = uniqueProducts.filter(p => p.images.length > 0).length;
    const withDescriptions = uniqueProducts.filter(p => p.description.length > 10).length;
    const categories = [...new Set(uniqueProducts.map(p => p.category))];

    // Save to JSON
    const outputPath = path.join(process.cwd(), 'scraped-products.json');
    await fs.writeFile(outputPath, JSON.stringify(uniqueProducts, null, 2));

    console.log('\n=== Scraping Complete ===');
    console.log(`✓ Saved ${uniqueProducts.length} products to ${outputPath}`);
    console.log(`  With images: ${withImages}`);
    console.log(`  With descriptions: ${withDescriptions}`);
    console.log(`  Categories: ${categories.join(', ')}`);

    return uniqueProducts;
}

// Run the scraper
scrapeAllProducts().catch(console.error);
