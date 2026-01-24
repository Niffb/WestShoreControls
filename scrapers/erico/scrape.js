/**
 * nVent ERIFLEX/ERICO Product Scraper
 * 
 * Scrapes product data from the nVent ERIFLEX website including:
 * - Product names and models
 * - Descriptions
 * - Categories and subcategories
 * - Image URLs
 * - Specifications
 * 
 * Uses Puppeteer because the nVent website requires JavaScript rendering.
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

// Base URL for nVent ERIFLEX products
const BASE_URL = 'https://www.nvent.com';
const ERIFLEX_BASE = 'https://www.nvent.com/en-gb/eriflex';

// Product categories with their URLs based on the nVent ERIFLEX website structure
const CATEGORIES = [
    // Flexibar Flexible Busbar
    {
        name: 'Flexible Busbars',
        subcategory: 'Flexibar Advanced',
        url: '/en-gb/eriflex/products/nvent-eriflex-flexibar-flexible-busbar/nvent-eriflex-flexibar-advanced-tinned-copper'
    },
    {
        name: 'Flexible Busbars',
        subcategory: 'Flexibar Kit',
        url: '/en-gb/eriflex/products/nvent-eriflex-flexibar-flexible-busbar/nvent-eriflex-flexibar-advanced-kit'
    },
    {
        name: 'Flexible Busbars',
        subcategory: 'Flexibar End Cover',
        url: '/en-gb/eriflex/products/nvent-eriflex-flexibar-flexible-busbar/nvent-eriflex-flexibar-end-cover'
    },
    {
        name: 'Flexible Busbars',
        subcategory: 'Flexibar Supports',
        url: '/en-gb/eriflex/products/nvent-eriflex-flexibar-flexible-busbar/nvent-eriflex-flexibar-and-ibsb-supports'
    },
    
    // Flexible Power Braids and Shunts
    {
        name: 'Flexible Conductors',
        subcategory: 'IBS Advanced Round',
        url: '/en-gb/eriflex/products/flexible-power-braids-and-shunts/ibs-advanced-round-insulated-braided-conductor-halogen-free'
    },
    {
        name: 'Flexible Conductors',
        subcategory: 'IBS/IBSB Advanced',
        url: '/en-gb/eriflex/products/flexible-power-braids-and-shunts/ibsibsb-advanced-insulated-braided-conductor-halogen-free'
    },
    {
        name: 'Flexible Conductors',
        subcategory: 'IBSHY Braided Conductor',
        url: '/en-gb/eriflex/products/flexible-power-braids-and-shunts/ibshy-insulated-braided-conductor-compact-circuit-breakers'
    },
    {
        name: 'Flexible Conductors',
        subcategory: 'PBC Braided Power Shunt',
        url: '/en-gb/eriflex/products/flexible-power-braids-and-shunts/pbc-braided-power-shunt'
    },
    {
        name: 'Flexible Conductors',
        subcategory: 'PPS Presswelded Power Shunt',
        url: '/en-gb/eriflex/products/flexible-power-braids-and-shunts/pps-presswelded-power-shunt'
    },
    
    // FleXbus System
    {
        name: 'FleXbus System',
        subcategory: 'FleXbus Conductor',
        url: '/en-gb/eriflex/products/nvent-eriflex-flexbus-system/nvent-eriflex-flexbus-conductor'
    },
    {
        name: 'FleXbus System',
        subcategory: 'FleXbus Supports',
        url: '/en-gb/eriflex/products/nvent-eriflex-flexbus-system/nvent-eriflex-flexbus-supports-and-bracing-system'
    },
    {
        name: 'FleXbus System',
        subcategory: 'FleXbus HCBC Clamp',
        url: '/en-gb/eriflex/products/nvent-eriflex-flexbus-system/nvent-eriflex-flexbus-hcbc-clamp-and-plate-power-supply-connection'
    },
    
    // Distribution Blocks and Power Terminals
    {
        name: 'Distribution Blocks',
        subcategory: 'Distribution Blocks',
        url: '/en-gb/eriflex/products/distribution-blocks-and-power-terminals/distribution-blocks'
    },
    {
        name: 'Distribution Blocks',
        subcategory: 'Power Block',
        url: '/en-gb/eriflex/products/distribution-blocks-and-power-terminals/power-block'
    },
    {
        name: 'Power Terminals',
        subcategory: 'Power Terminals',
        url: '/en-gb/eriflex/products/distribution-blocks-and-power-terminals/power-terminals'
    },
    
    // Grounding and Bonding Braids
    {
        name: 'Grounding Braids',
        subcategory: 'CPI Stainless Steel',
        url: '/en-gb/eriflex/products/grounding-and-bonding-braids/cpi-grounding-and-bonding-braid-stainless-steel'
    },
    {
        name: 'Grounding Braids',
        subcategory: 'MBJ Tinned Copper',
        url: '/en-gb/eriflex/products/grounding-and-bonding-braids/mbj-grounding-and-bonding-braid-tinned-copper'
    },
    {
        name: 'Grounding Braids',
        subcategory: 'MBJYG Halogen Free',
        url: '/en-gb/eriflex/products/grounding-and-bonding-braids/mbjyg-grounding-and-bonding-braid-tinned-copper-halogen-free'
    },
    {
        name: 'Grounding Braids',
        subcategory: 'BJ Round Braid',
        url: '/en-gb/eriflex/products/grounding-and-bonding-braids/bj-round-braid-crimped-lugs'
    },
    
    // Network Analyzer and Rogowski Sensor
    {
        name: 'Power Meters',
        subcategory: 'Power Meters',
        url: '/en-gb/eriflex/products/network-analyzer-and-rogowski-sensor/nvent-eriflex-power-meters-and-software'
    },
    {
        name: 'Power Meters',
        subcategory: 'Rogowski Sensors',
        url: '/en-gb/eriflex/products/network-analyzer-and-rogowski-sensor/nvent-eriflex-rogowski-sensors'
    },
    
    // Low Voltage Insulators
    {
        name: 'Insulators',
        subcategory: 'ISO-TP Metric Thread',
        url: '/en-gb/eriflex/products/low-voltage-insulators/iso-tp-low-voltage-insulators-metric-thread'
    },
    {
        name: 'Insulators',
        subcategory: 'ISO-ADV Advanced',
        url: '/en-gb/eriflex/products/low-voltage-insulators/iso-adv-low-voltage-advanced-insulators-metric-thread'
    },
    
    // Grounding/Neutral Busbars
    {
        name: 'Earthing Busbars',
        subcategory: 'EB-12 Busbar',
        url: '/en-gb/eriflex/products/groundingneutral-busbars-and-accessories/eb-12-earthing-and-neutral-busbar'
    },
    {
        name: 'Earthing Busbars',
        subcategory: 'EB-20 Busbar',
        url: '/en-gb/eriflex/products/groundingneutral-busbars-and-accessories/eb-20-earthing-and-neutral-busbar'
    },
    {
        name: 'Earthing Busbars',
        subcategory: 'EB-36 Busbar',
        url: '/en-gb/eriflex/products/groundingneutral-busbars-and-accessories/eb-36-earthing-and-neutral-busbar'
    },
    {
        name: 'Earthing Busbars',
        subcategory: 'EB-44 Busbar',
        url: '/en-gb/eriflex/products/groundingneutral-busbars-and-accessories/eb-44-earthing-and-neutral-busbar'
    },
    {
        name: 'Earthing Busbars',
        subcategory: 'EB-60 Busbar',
        url: '/en-gb/eriflex/products/groundingneutral-busbars-and-accessories/eb-60-earthing-and-neutral-busbar'
    },
    {
        name: 'Earthing Busbars',
        subcategory: 'Universal Connecting Bar',
        url: '/en-gb/eriflex/products/groundingneutral-busbars-and-accessories/universal-connecting-bar'
    },
    
    // Copper Busbars
    {
        name: 'Busbars',
        subcategory: 'PCB Plain Copper',
        url: '/en-gb/eriflex/products/copper-busbars/pcb-plain-copper-busbar'
    },
    {
        name: 'Busbars',
        subcategory: 'DPCB Punched Single',
        url: '/en-gb/eriflex/products/copper-busbars/dpcb-punched-plain-copper-busbar-single'
    },
    {
        name: 'Busbars',
        subcategory: 'DPCB Punched Double',
        url: '/en-gb/eriflex/products/copper-busbars/dpcb-punched-plain-copper-busbar-double'
    },
    {
        name: 'Busbars',
        subcategory: 'TCB Threaded Busbar',
        url: '/en-gb/eriflex/products/copper-busbars/tcb-threaded-busbar'
    },
    {
        name: 'Busbars',
        subcategory: 'TCBW Threaded W-Thread',
        url: '/en-gb/eriflex/products/copper-busbars/tcbw-threaded-busbar-w-thread'
    },
    {
        name: 'Busbars',
        subcategory: 'XM5 Connector',
        url: '/en-gb/eriflex/products/copper-busbars/xm5-threaded-busbar-connector'
    },
    
    // Busbar Supports
    {
        name: 'Busbar Supports',
        subcategory: 'Adjustable Supports',
        url: '/en-gb/eriflex/products/busbar-supports/adjustable-busbar-supports'
    },
    {
        name: 'Busbar Supports',
        subcategory: 'Adjustable Flat Supports',
        url: '/en-gb/eriflex/products/busbar-supports/adjustable-flat-busbar-supports'
    },
    {
        name: 'Busbar Supports',
        subcategory: 'Compact Adjustable',
        url: '/en-gb/eriflex/products/busbar-supports/compact-adjustable-busbar-supports'
    },
    {
        name: 'Busbar Supports',
        subcategory: 'Compact Reinforced',
        url: '/en-gb/eriflex/products/busbar-supports/compact-reinforced-busbar-supports'
    },
    {
        name: 'Busbar Supports',
        subcategory: 'Flat Supports',
        url: '/en-gb/eriflex/products/busbar-supports/flat-busbar-supports'
    },
    {
        name: 'Busbar Supports',
        subcategory: 'Universal Supports',
        url: '/en-gb/eriflex/products/busbar-supports/universal-busbar-supports'
    },
    
    // Busbar Clamps and Connectors
    {
        name: 'Connecting Clamps',
        subcategory: 'BC Ribbed Clamp',
        url: '/en-gb/eriflex/products/busbar-clamps-and-connectors/bc-ribbed-steel-busbar-clamp'
    },
    {
        name: 'Connecting Clamps',
        subcategory: 'FBC Cable to Busbar',
        url: '/en-gb/eriflex/products/busbar-clamps-and-connectors/fbc-nvent-eriflex-flexibarcable-busbar-clamp'
    },
    {
        name: 'Connecting Clamps',
        subcategory: 'FC Flexibar Clamp',
        url: '/en-gb/eriflex/products/busbar-clamps-and-connectors/fc-nvent-eriflex-flexibar-busbar-clamp'
    },
    {
        name: 'Connecting Clamps',
        subcategory: 'HCBC High Current',
        url: '/en-gb/eriflex/products/busbar-clamps-and-connectors/hcbc-high-current-busbar-clamp'
    },
    {
        name: 'Connecting Clamps',
        subcategory: 'QCC Flexibar Clamp',
        url: '/en-gb/eriflex/products/busbar-clamps-and-connectors/qcc-nvent-eriflex-flexibar-clamp'
    },
    
    // DIN Profiles
    {
        name: 'DIN Profiles',
        subcategory: 'PDRG Asymmetric',
        url: '/en-gb/eriflex/products/din-profiles/pdrg-perforated-asymmetric-profile'
    },
    {
        name: 'DIN Profiles',
        subcategory: 'PDR Symmetric',
        url: '/en-gb/eriflex/products/din-profiles/pdr-perforated-symmetric-profile'
    },
    {
        name: 'DIN Profiles',
        subcategory: 'PCR C-Shaped',
        url: '/en-gb/eriflex/products/din-profiles/pcr-perforated-c-shaped-profile'
    },
    {
        name: 'DIN Profiles',
        subcategory: 'DRG Asymmetric',
        url: '/en-gb/eriflex/products/din-profiles/drg-asymmetric-profile'
    },
    {
        name: 'DIN Profiles',
        subcategory: 'DR Symmetric',
        url: '/en-gb/eriflex/products/din-profiles/dr-symmetric-profile'
    },
    
    // Cabling Sleeves
    {
        name: 'Cable Management',
        subcategory: 'FGBS Fiberglass',
        url: '/en-gb/eriflex/products/cabling-sleeves/fgbs-fiberglass-braided-sleeve'
    },
    {
        name: 'Cable Management',
        subcategory: 'PDBS Polyamide',
        url: '/en-gb/eriflex/products/cabling-sleeves/pdbs-polyamide-braided-sleeve'
    },
    {
        name: 'Cable Management',
        subcategory: 'SBS Silicone',
        url: '/en-gb/eriflex/products/cabling-sleeves/sbs-isolating-silicone-sleeve'
    },
    {
        name: 'Cable Management',
        subcategory: 'Spirflex Spiral',
        url: '/en-gb/eriflex/products/cabling-sleeves/nvent-eriflex-spirflex-spiral-sleeve'
    },
    {
        name: 'Cable Management',
        subcategory: 'Zipflex Sleeve',
        url: '/en-gb/eriflex/products/cabling-sleeves/nvent-eriflex-zipflex-sleeve'
    },
    
    // Tools
    {
        name: 'Tools',
        subcategory: 'Hydraulic Tools',
        url: '/en-gb/eriflex/products/tools-nvent-eriflex-flexibar-and-copper-busbars/hydraulic-tools'
    },
    {
        name: 'Tools',
        subcategory: 'Manual Tools',
        url: '/en-gb/eriflex/products/tools-nvent-eriflex-flexibar-and-copper-busbars/manual-tools'
    },
    {
        name: 'Tools',
        subcategory: 'Crimping Tools',
        url: '/en-gb/eriflex/products/tools-nvent-eriflex-flexibar-and-copper-busbars/crimping-tools'
    }
];

// Delays
const PAGE_LOAD_DELAY = 2500;
const SCROLL_DELAY = 600;
const PRODUCT_DELAY = 400;

// Sleep function
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Wait for page content to load
 */
async function waitForContent(page) {
    try {
        await page.waitForSelector('body', { timeout: 15000 });
        await sleep(1500);
    } catch (e) {
        console.log('  Page load timeout');
    }
}

/**
 * Accept cookies if popup appears
 */
async function acceptCookies(page) {
    try {
        const cookieButton = await page.$('button[id*="cookie"], button[class*="cookie"], button:has-text("Accept")');
        if (cookieButton) {
            await cookieButton.click();
            await sleep(500);
        }
    } catch (e) {
        // Ignore cookie errors
    }
}

/**
 * Scroll to load all products
 */
async function scrollToLoadAll(page) {
    let previousHeight = 0;
    let currentHeight = await page.evaluate(() => document.body.scrollHeight);
    let scrollAttempts = 0;
    const maxScrolls = 15;

    while (previousHeight < currentHeight && scrollAttempts < maxScrolls) {
        previousHeight = currentHeight;
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await sleep(SCROLL_DELAY);
        currentHeight = await page.evaluate(() => document.body.scrollHeight);
        scrollAttempts++;
    }
    
    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
}

/**
 * Extract products from a category page
 */
async function extractProducts(page, category) {
    return await page.evaluate((cat) => {
        const products = [];
        
        // Try multiple selectors for product items
        const selectors = [
            '.product-card',
            '.product-item',
            '.product-tile',
            '[class*="product"]',
            '.card',
            'article',
            '.item'
        ];
        
        let productElements = [];
        for (const selector of selectors) {
            const elements = document.querySelectorAll(selector);
            if (elements.length > 0) {
                productElements = [...elements];
                break;
            }
        }
        
        // If no product elements found, try to extract from the page content
        if (productElements.length === 0) {
            // Get main content text
            const mainContent = document.querySelector('main, .main-content, #main, .content');
            if (mainContent) {
                const headings = mainContent.querySelectorAll('h1, h2, h3, h4');
                headings.forEach((heading, idx) => {
                    const name = heading.textContent?.trim();
                    if (name && name.length > 3 && name.length < 200) {
                        // Get next sibling paragraphs for description
                        let description = '';
                        let sibling = heading.nextElementSibling;
                        while (sibling && sibling.tagName !== 'H1' && sibling.tagName !== 'H2' && sibling.tagName !== 'H3') {
                            if (sibling.tagName === 'P' || sibling.tagName === 'DIV') {
                                description += sibling.textContent?.trim() + ' ';
                            }
                            sibling = sibling.nextElementSibling;
                        }
                        
                        // Find nearby images
                        const images = [];
                        const nearbyImgs = heading.parentElement?.querySelectorAll('img') || [];
                        nearbyImgs.forEach(img => {
                            const src = img.src || img.getAttribute('data-src');
                            if (src && !src.includes('logo') && !src.includes('icon')) {
                                images.push(src);
                            }
                        });
                        
                        products.push({
                            name,
                            description: description.trim().substring(0, 500),
                            images,
                            category: cat.name,
                            subcategory: cat.subcategory
                        });
                    }
                });
            }
        }
        
        // Extract from product elements
        productElements.forEach((el, idx) => {
            // Get product name
            const nameEl = el.querySelector('h1, h2, h3, h4, .title, .name, .product-name, [class*="title"]');
            const name = nameEl?.textContent?.trim() || '';
            
            if (!name || name.length < 3) return;
            
            // Get description
            const descEl = el.querySelector('p, .description, .product-description, [class*="description"]');
            const description = descEl?.textContent?.trim() || '';
            
            // Get images
            const images = [];
            el.querySelectorAll('img').forEach(img => {
                const src = img.src || img.getAttribute('data-src') || img.getAttribute('data-lazy');
                if (src && !src.includes('logo') && !src.includes('icon') && !src.includes('placeholder')) {
                    images.push(src);
                }
            });
            
            // Get link
            const linkEl = el.querySelector('a[href]');
            const url = linkEl?.href || '';
            
            // Get specs from lists
            const specs = [];
            el.querySelectorAll('li, .spec, [class*="spec"]').forEach(li => {
                const text = li.textContent?.trim();
                if (text && text.length > 3 && text.length < 150) {
                    specs.push(text);
                }
            });
            
            products.push({
                name,
                description: description.substring(0, 500),
                images,
                url,
                specs: specs.slice(0, 10),
                category: cat.name,
                subcategory: cat.subcategory
            });
        });
        
        return products;
    }, category);
}

/**
 * Scrape a category page
 */
async function scrapeCategory(page, category) {
    console.log(`\n=== Scraping ${category.name} - ${category.subcategory} ===`);
    
    const fullUrl = `${BASE_URL}${category.url}`;
    console.log(`  URL: ${fullUrl}`);

    try {
        await page.goto(fullUrl, { waitUntil: 'networkidle2', timeout: 45000 });
        await waitForContent(page);
        await acceptCookies(page);
        await scrollToLoadAll(page);
    } catch (e) {
        console.log(`  ✗ Failed to load: ${e.message}`);
        return [];
    }

    const products = await extractProducts(page, category);
    
    if (products.length === 0) {
        // Create a product from the page title/content if no products found
        const pageInfo = await page.evaluate((cat) => {
            const title = document.querySelector('h1')?.textContent?.trim() || cat.subcategory;
            const description = document.querySelector('meta[name="description"]')?.content || 
                               document.querySelector('.intro, .description, p')?.textContent?.trim() || '';
            const images = [];
            document.querySelectorAll('img').forEach(img => {
                const src = img.src || img.getAttribute('data-src');
                if (src && !src.includes('logo') && !src.includes('icon') && src.includes('nvent')) {
                    images.push(src);
                }
            });
            
            return { title, description: description.substring(0, 500), images: images.slice(0, 5) };
        }, category);
        
        if (pageInfo.title) {
            products.push({
                name: pageInfo.title,
                description: pageInfo.description,
                images: pageInfo.images,
                category: category.name,
                subcategory: category.subcategory,
                url: fullUrl
            });
        }
    }

    console.log(`  ✓ Found ${products.length} products`);
    return products;
}

/**
 * Main scraping function
 */
async function scrapeAllProducts() {
    console.log('=== nVent ERIFLEX/ERICO Product Scraper ===\n');
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
    let productId = 3100; // Start after existing ERICO products (3001-3024)

    // Scrape each category
    for (const category of CATEGORIES) {
        try {
            const products = await scrapeCategory(page, category);
            
            // Add IDs and brand
            products.forEach(product => {
                product.id = productId++;
                product.brand = 'ERICO';
                product.model = product.name.split(' ')[0];
            });

            allProducts.push(...products);
        } catch (e) {
            console.log(`  ✗ Error in category ${category.name}: ${e.message}`);
        }

        await sleep(PAGE_LOAD_DELAY);
    }

    await browser.close();

    // Deduplicate by name
    const uniqueProducts = [];
    const seenNames = new Set();
    for (const product of allProducts) {
        const key = product.name.toLowerCase().trim();
        if (!seenNames.has(key)) {
            seenNames.add(key);
            uniqueProducts.push(product);
        }
    }

    // Calculate statistics
    const withImages = uniqueProducts.filter(p => p.images && p.images.length > 0).length;
    const withDescriptions = uniqueProducts.filter(p => p.description && p.description.length > 10).length;
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
