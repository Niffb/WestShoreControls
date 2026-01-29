/**
 * Mitsubishi Electric Factory Automation Products Scraper
 * 
 * Comprehensive scraper that crawls all product categories and sub-products
 * from the US Mitsubishi Electric website.
 * Saves image URLs as arrays like other brand scrapers.
 */

import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs/promises';
import path from 'path';

const BASE_URL = 'https://us.mitsubishielectric.com';
const REQUEST_DELAY = 1000;

// Main product category pages to crawl for sub-products
const CATEGORY_PAGES = [
    // Drive Products - Inverters
    {
        category: 'Variable Frequency Drives',
        url: '/fa/en/products/drive-products/inverters-freqrol/',
        subPages: [
            '/fa/en/products/drive-products/inverters-freqrol/fra/',
            '/fa/en/products/drive-products/inverters-freqrol/fra800plus/',
            '/fa/en/products/drive-products/inverters-freqrol/frf/',
            '/fa/en/products/drive-products/inverters-freqrol/fre/',
            '/fa/en/products/drive-products/inverters-freqrol/frd/',
            '/fa/en/products/drive-products/inverters-freqrol/regenerative-converter/',
        ]
    },
    // Drive Products - Servos
    {
        category: 'Servo Systems',
        url: '/fa/en/products/drive-products/ac-servos-melservo/',
        subPages: [
            '/fa/en/products/drive-products/ac-servos-melservo/mrj5/',
            '/fa/en/products/drive-products/ac-servos-melservo/mrjet/',
            '/fa/en/products/drive-products/ac-servos-melservo/melservoj4/',
            '/fa/en/products/drive-products/ac-servos-melservo/mrje/',
            '/fa/en/products/drive-products/ac-servos-melservo/melservo-jn/',
            '/fa/en/products/drive-products/ac-servos-melservo/melservo-others/',
        ]
    },
    // Controllers - PLCs
    {
        category: 'Programmable Logic Controllers',
        url: '/fa/en/products/controllers/programmable-controllers-melsec/',
        subPages: [
            '/fa/en/products/cnt/programmable-controllers/melsec-iq-r-series/',
            '/fa/en/products/cnt/programmable-controllers/melsec-iq-f-series/',
            '/fa/en/products/cnt/programmable-controllers/melsec-q-series/',
            '/fa/en/products/cnt/programmable-controllers/melsec-l-series/',
            '/fa/en/products/cnt/programmable-controllers/melsec-fx-series/',
            '/fa/en/products/cnt/programmable-controllers/melsec-qs-ws-series/',
            '/fa/en/products/cnt/programmable-controllers/melsec-a-features/',
        ]
    },
    // Controllers - Motion
    {
        category: 'Motion Controllers',
        url: '/fa/en/products/controllers/motion-controllers/',
        subPages: []
    },
    // Controllers - CNC
    {
        category: 'CNC Systems',
        url: '/fa/en/products/controllers/computerized-numerical-controllers-cncs/',
        subPages: []
    },
    // Visualization - HMI
    {
        category: 'Human Machine Interface',
        url: '/fa/en/products/visualization/human-machine-interfaces-hmis-got/',
        subPages: []
    },
    // Robots
    {
        category: 'Industrial Robots',
        url: '/fa/en/products/industrial-robots-melfa/',
        subPages: []
    },
    // Low Voltage Products
    {
        category: 'Circuit Breakers',
        url: '/fa/en/products/lvpdp/low-voltage-circuit-breakers/',
        subPages: []
    },
    {
        category: 'Contactors & Motor Starters',
        url: '/fa/en/products/lvpdp/contactors-and-motor-starters/',
        subPages: []
    },
    // Edge Computing
    {
        category: 'Edge Computing',
        url: '/fa/en/products/edge/melipc/',
        subPages: []
    },
    // Power Monitoring
    {
        category: 'Power Monitoring',
        url: '/fa/en/products/pmp/power-management-meters/',
        subPages: []
    },
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Navigation/garbage items to filter out
const GARBAGE_PATTERNS = [
    'website help', 'oem locator', 'solutions partners', 'diamond partners',
    'distributor locator', 'site map', 'contact', 'careers', 'news', 'events',
    'facebook', 'twitter', 'linkedin', 'youtube', 'instagram', 'privacy',
    'cookie', 'terms', 'footer', 'header', 'menu', 'login', 'search',
    'newsletter', 'subscribe', 'copyright', 'follow us', 'home', 'join us',
    'support', 'request a product', 'contact sales', 'how can we help',
    'select & quote', 'shop now', 'find a distributor'
];

// Image patterns to exclude
const EXCLUDE_IMAGE_PATTERNS = [
    'logo', 'icon', 'favicon', '1x1', 'spacer', 'blank',
    'header-all', 'footer', 'social', 'arrow', 'button',
    'chicklet', 'contact', 'quote', 'join'
];

/**
 * Fetch a page and parse with Cheerio
 */
async function fetchPage(url) {
    try {
        // Skip external URLs
        if (url.startsWith('http') && !url.includes('us.mitsubishielectric.com')) {
            return null;
        }
        
        const fullUrl = url.startsWith('http') ? url : BASE_URL + url;
        console.log(`  Fetching: ${fullUrl}`);
        const response = await axios.get(fullUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            },
            timeout: 20000
        });
        return cheerio.load(response.data);
    } catch (error) {
        console.error(`  ✗ Error fetching ${url}: ${error.message}`);
        return null;
    }
}

/**
 * Check if an image URL should be excluded
 */
function shouldExcludeImage(url) {
    if (!url) return true;
    const lowerUrl = url.toLowerCase();
    return EXCLUDE_IMAGE_PATTERNS.some(pattern => lowerUrl.includes(pattern));
}

/**
 * Normalize image URL to full absolute URL
 */
function normalizeImageUrl(src) {
    if (!src) return null;
    if (src.startsWith('//')) return 'https:' + src;
    if (src.startsWith('/')) return BASE_URL + src;
    if (!src.startsWith('http')) return BASE_URL + '/' + src;
    return src;
}

/**
 * Check if text is garbage/navigation
 */
function isGarbageText(text) {
    if (!text || text.length < 10) return true;
    const lowerText = text.toLowerCase();
    return GARBAGE_PATTERNS.some(p => lowerText.includes(p));
}

/**
 * Get meta description 
 */
function getMetaDescription($) {
    return $('meta[name="description"]').attr('content') ||
        $('meta[property="og:description"]').attr('content') || '';
}

/**
 * Detect category from URL path
 */
function detectCategoryFromUrl(url) {
    const lowerUrl = url.toLowerCase();
    
    if (lowerUrl.includes('/inverters-freqrol/') || lowerUrl.includes('/drv/inv/')) {
        return 'Variable Frequency Drives';
    }
    if (lowerUrl.includes('/ac-servos-melservo/') || lowerUrl.includes('/drv/servo/')) {
        return 'Servo Systems';
    }
    if (lowerUrl.includes('/programmable-controllers/') || lowerUrl.includes('/cnt/programmable-controllers/')) {
        return 'Programmable Logic Controllers';
    }
    if (lowerUrl.includes('/motion-controllers/') || lowerUrl.includes('/cnt/motion-controllers/')) {
        return 'Motion Controllers';
    }
    if (lowerUrl.includes('/computerized-numerical-controllers/') || lowerUrl.includes('/cnt/cnc/')) {
        return 'CNC Systems';
    }
    if (lowerUrl.includes('/human-machine-interface/') || lowerUrl.includes('/hmi/')) {
        return 'Human Machine Interface';
    }
    if (lowerUrl.includes('/industrial-robots/') || lowerUrl.includes('/rbt/')) {
        return 'Industrial Robots';
    }
    if (lowerUrl.includes('/collaborative-robot/')) {
        return 'Collaborative Robots';
    }
    if (lowerUrl.includes('/circuit-breakers/') || lowerUrl.includes('/lvd/circuit-breakers/')) {
        return 'Circuit Breakers';
    }
    if (lowerUrl.includes('/contactors/') || lowerUrl.includes('/lvpdp/contactors/')) {
        return 'Contactors & Motor Starters';
    }
    if (lowerUrl.includes('/melipc/') || lowerUrl.includes('/edge/')) {
        return 'Edge Computing';
    }
    if (lowerUrl.includes('/power-meters/') || lowerUrl.includes('/pmng/') || lowerUrl.includes('/pmp/')) {
        return 'Power Monitoring';
    }
    if (lowerUrl.includes('/laser-processing/') || lowerUrl.includes('/laser/')) {
        return 'Laser Processing Machines';
    }
    if (lowerUrl.includes('/electrical-discharge/') || lowerUrl.includes('/edm/')) {
        return 'Electrical Discharge Machines';
    }
    if (lowerUrl.includes('/mx-automation-controllers/')) {
        return 'Programmable Automation Controllers';
    }
    if (lowerUrl.includes('/simple-application-controllers/')) {
        return 'Simple Application Controllers';
    }
    if (lowerUrl.includes('/network-related-products/') || lowerUrl.includes('/cclink/')) {
        return 'Industrial Networks';
    }
    if (lowerUrl.includes('/visualization/') && !lowerUrl.includes('/hmi/')) {
        return 'Visualization Software';
    }
    if (lowerUrl.includes('/software/')) {
        return 'Engineering Software';
    }
    
    return null;
}

/**
 * Get product images - returns array of image URLs
 */
function getProductImages($) {
    const images = [];
    
    // Priority 1: Open Graph image
    const ogImage = $('meta[property="og:image"]').attr('content');
    if (ogImage && !shouldExcludeImage(ogImage)) {
        const normalizedOg = normalizeImageUrl(ogImage);
        if (normalizedOg) images.push(normalizedOg);
    }

    // Priority 2: Product images in main content
    const productSelectors = [
        '.c-linkWithImage img',
        '.c-linkWithImage__image img',
        '.l-productList img',
        '.product-image img',
        'article img[src*="products"]',
        'main img[src*="/-/media/"]'
    ];

    for (const sel of productSelectors) {
        $(sel).each((_, el) => {
            let src = $(el).attr('src') || $(el).attr('data-src');
            if (src && !shouldExcludeImage(src)) {
                const normalized = normalizeImageUrl(src);
                if (normalized && !images.includes(normalized)) {
                    images.push(normalized);
                }
            }
        });
    }

    // Priority 3: Any product-related images
    $('img').each((_, el) => {
        let src = $(el).attr('src');
        if (src && (src.includes('/products/') || src.includes('/-/media/images/')) && !shouldExcludeImage(src)) {
            const normalized = normalizeImageUrl(src);
            if (normalized && !images.includes(normalized)) {
                images.push(normalized);
            }
        }
    });

    return images.slice(0, 5);
}

/**
 * Extract features from product page
 */
function extractFeatures($) {
    const features = [];
    const $main = $('main, article, .l-contents, .content');

    // Look for feature text in paragraphs
    $main.find('p, .c-text, .c-lead').each((_, el) => {
        const text = $(el).text().trim().replace(/\s+/g, ' ');
        if (text.length > 30 && text.length < 500 && !isGarbageText(text) && !text.includes('{')) {
            features.push(text);
        }
    });

    // Look for bullet points
    $main.find('ul li').each((_, el) => {
        const text = $(el).text().trim().replace(/\s+/g, ' ');
        if (text.length > 15 && text.length < 300 && !isGarbageText(text) && !text.includes('{')) {
            features.push(text);
        }
    });

    return [...new Set(features)].slice(0, 8);
}

/**
 * Check if a URL should be excluded
 */
function shouldExcludeUrl(href) {
    if (!href) return true;
    
    const excludePatterns = [
        '#', 'search', 'knowledge-base', 'getdocument', 'support-tools',
        'contact', 'dropdowns', '.pdf', 'login', 'account', 'mailto:',
        'twitter.com', 'facebook.com', 'linkedin.com', 'youtube.com',
        'instagram.com', 'mx.mitsubishielectric', 'fr-mitsubishielectric',
        'shop1.us.mitsubishielectric', 'returnurl', 'share.php', 'share?'
    ];
    
    const lowerHref = href.toLowerCase();
    return excludePatterns.some(pattern => lowerHref.includes(pattern));
}

/**
 * Extract sub-product links from a category/series page
 */
function extractSubProductLinks($, baseUrl) {
    const links = new Set();
    
    // Look for product links in the Product List section
    $('a[href*="/products/"]').each((_, el) => {
        const href = $(el).attr('href');
        
        // Skip excluded URLs
        if (shouldExcludeUrl(href)) return;
        
        // Only process URLs from the same domain
        if (href.startsWith('http') && !href.includes('us.mitsubishielectric.com')) return;
        
        // Normalize the URL
        let fullUrl = href;
        if (href.startsWith('/')) {
            fullUrl = href;
        } else if (href.startsWith('http')) {
            // Extract path from full URL
            try {
                const url = new URL(href);
                fullUrl = url.pathname;
            } catch (e) {
                return;
            }
        } else {
            fullUrl = '/' + href;
        }
        
        // Only include product-related URLs from us.mitsubishielectric.com
        if (fullUrl.includes('/products/') && fullUrl.startsWith('/fa/en/')) {
            links.add(fullUrl);
        }
    });
    
    return Array.from(links);
}

/**
 * Scrape individual product details from a page
 */
async function scrapeProductPage(url, defaultCategory) {
    const $ = await fetchPage(url);
    if (!$) return null;

    // Get product name from h1 or title
    let name = $('h1').first().text().trim();
    if (!name || name.length > 100) {
        name = $('title').text().replace(/\s*\|.*$/, '').trim();
    }
    
    // Clean up the name
    name = name.replace(/\s+/g, ' ').trim();
    
    if (!name || isGarbageText(name)) return null;

    const description = getMetaDescription($);
    const images = getProductImages($);
    const features = extractFeatures($);
    
    // Detect category from URL, fallback to default
    const detectedCategory = detectCategoryFromUrl(url);
    const category = detectedCategory || defaultCategory;

    return {
        name,
        model: name,
        description,
        images,
        features,
        specs: [],
        category,
        url: url.startsWith('http') ? url : BASE_URL + url
    };
}

/**
 * Scrape products from a series page that lists multiple sub-products
 */
async function scrapeSeriesPage($, url, defaultCategory) {
    const products = [];
    
    // Find product items on the page
    const productItems = [];
    
    // Pattern 1: Product List with links
    $('.c-linkWithImage, .product-item, [class*="product-list"] > *').each((_, el) => {
        const $el = $(el);
        const $link = $el.find('a').first();
        const $img = $el.find('img').first();
        const name = $link.text().trim() || $el.find('h2, h3, h4').first().text().trim();
        const href = $link.attr('href');
        const imgSrc = $img.attr('src') || $img.attr('data-src');
        const desc = $el.find('p').first().text().trim();
        
        if (name && name.length > 2 && name.length < 100 && !isGarbageText(name)) {
            productItems.push({ name, href, imgSrc, desc });
        }
    });

    // Pattern 2: Section headers with descriptions
    $('h3, h4').each((_, el) => {
        const $el = $(el);
        const name = $el.text().trim();
        const $parent = $el.parent();
        const $link = $parent.find('a').first();
        const $img = $parent.find('img').first();
        const href = $link.attr('href') || $el.find('a').attr('href');
        const imgSrc = $img.attr('src') || $img.attr('data-src');
        const desc = $parent.find('p').first().text().trim();
        
        if (name && name.length > 2 && name.length < 100 && !isGarbageText(name) &&
            !productItems.find(p => p.name === name)) {
            productItems.push({ name, href, imgSrc, desc });
        }
    });

    // Create product entries
    for (const item of productItems) {
        if (item.name && !isGarbageText(item.name)) {
            const images = [];
            if (item.imgSrc && !shouldExcludeImage(item.imgSrc)) {
                const normalized = normalizeImageUrl(item.imgSrc);
                if (normalized) images.push(normalized);
            }
            
            // Detect category from the item's URL if available
            const itemUrl = item.href ? (item.href.startsWith('http') ? item.href : BASE_URL + item.href) : (url.startsWith('http') ? url : BASE_URL + url);
            const detectedCategory = detectCategoryFromUrl(itemUrl) || detectCategoryFromUrl(url);
            const category = detectedCategory || defaultCategory;
            
            products.push({
                name: item.name,
                model: item.name,
                description: item.desc || '',
                images,
                features: [],
                specs: [],
                category,
                url: itemUrl
            });
        }
    }

    return products;
}

/**
 * Main scraping function
 */
async function scrapeAllProducts() {
    console.log('Starting Mitsubishi Electric Factory Automation comprehensive scraping...\n');

    const allProducts = [];
    const scrapedUrls = new Set();
    let id = 60001;

    for (const categoryInfo of CATEGORY_PAGES) {
        console.log(`\n=== ${categoryInfo.category} ===`);
        
        // Scrape main category page
        const $ = await fetchPage(categoryInfo.url);
        if (!$) {
            await sleep(REQUEST_DELAY);
            continue;
        }

        // Get products from the category page itself
        const categoryProducts = await scrapeSeriesPage($, categoryInfo.url, categoryInfo.category);
        
        for (const product of categoryProducts) {
            if (!scrapedUrls.has(product.url)) {
                product.id = id++;
                product.brand = 'Mitsubishi';
                allProducts.push(product);
                scrapedUrls.add(product.url);
                console.log(`  ✓ ${product.name} (${product.images.length} images)`);
            }
        }

        // Find additional product links on the page
        const subLinks = extractSubProductLinks($, categoryInfo.url);
        
        // Combine with predefined sub-pages
        const allSubPages = [...new Set([...categoryInfo.subPages, ...subLinks])];
        
        await sleep(REQUEST_DELAY);

        // Scrape each sub-page
        for (const subUrl of allSubPages) {
            if (scrapedUrls.has(subUrl) || scrapedUrls.has(BASE_URL + subUrl)) continue;
            if (shouldExcludeUrl(subUrl)) continue;
            
            const $sub = await fetchPage(subUrl);
            if (!$sub) {
                await sleep(REQUEST_DELAY);
                continue;
            }

            // First, try to get the main product from this page
            const mainProduct = await scrapeProductPage(subUrl, categoryInfo.category);
            if (mainProduct && mainProduct.name && !scrapedUrls.has(mainProduct.url)) {
                mainProduct.id = id++;
                mainProduct.brand = 'Mitsubishi';
                allProducts.push(mainProduct);
                scrapedUrls.add(mainProduct.url);
                console.log(`  ✓ ${mainProduct.name} (${mainProduct.images.length} images, ${mainProduct.features.length} features)`);
            }

            // Then, get any sub-products listed on this page
            const subProducts = await scrapeSeriesPage($sub, subUrl, categoryInfo.category);
            for (const product of subProducts) {
                // Avoid duplicates by checking name similarity
                const isDuplicate = allProducts.some(p => 
                    p.name === product.name || 
                    p.url === product.url ||
                    (p.name.includes(product.name) && p.category === product.category)
                );
                
                if (!isDuplicate && product.name && !isGarbageText(product.name)) {
                    product.id = id++;
                    product.brand = 'Mitsubishi';
                    allProducts.push(product);
                    scrapedUrls.add(product.url);
                    console.log(`    → ${product.name} (${product.images.length} images)`);
                }
            }

            await sleep(REQUEST_DELAY);
        }
    }

    // Deduplicate by name within same category
    const uniqueProducts = [];
    const seenNames = new Map();
    
    for (const product of allProducts) {
        const key = `${product.category}:${product.name}`;
        if (!seenNames.has(key)) {
            seenNames.set(key, true);
            uniqueProducts.push(product);
        }
    }

    // Re-assign IDs
    uniqueProducts.forEach((p, i) => p.id = 60001 + i);

    // Save output
    const outputPath = path.join(process.cwd(), 'scraped-products.json');
    await fs.writeFile(outputPath, JSON.stringify(uniqueProducts, null, 2));

    console.log(`\n\n=== Scraping Complete ===`);
    console.log(`✓ Saved ${uniqueProducts.length} products to scraped-products.json`);
    console.log(`  With images: ${uniqueProducts.filter(p => p.images.length > 0).length}`);
    console.log(`  With features: ${uniqueProducts.filter(p => p.features.length > 0).length}`);
    
    // Category breakdown
    const categories = {};
    for (const p of uniqueProducts) {
        categories[p.category] = (categories[p.category] || 0) + 1;
    }
    console.log(`\n  Products by category:`);
    for (const [cat, count] of Object.entries(categories)) {
        console.log(`    - ${cat}: ${count}`);
    }

    return uniqueProducts;
}

// Run
scrapeAllProducts()
    .then(() => process.exit(0))
    .catch(err => {
        console.error('Scraping failed:', err);
        process.exit(1);
    });
