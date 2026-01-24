/**
 * TMEIC Product Scraper (Improved)
 * 
 * Scrapes product data from the TMEIC website including:
 * - Product names and models
 * - Descriptions
 * - Categories
 * - Image URLs (main product image only)
 * - Specifications
 * 
 * Improvements:
 * - Filters out navigation/menu items from features
 * - Gets only the main product image (not badges, related products)
 * - Properly identifies product-specific content
 */

import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs/promises';
import path from 'path';

// Base URL for TMEIC
const BASE_URL = 'https://www.tmeic.com';

// Known product URLs to scrape (sorted by category)
const PRODUCT_URLS = {
    'Variable Frequency Drives': [
        '/tmdrive-10',
        '/tmdrive-10e2',
        '/tmdrive-10e2-dp',
        '/tmdrive-10e2-spr',
        '/tmdrive-30',
        '/tmdrive-50',
        '/tmdrive-70',
        '/tmdrive-70e2',
        '/tmdrive-mve2',
        '/tmdrive-mvg2',
        '/tmdrive-xl55',
        '/tmdrive-xl75',
        '/tmdrive-xl80',
        '/tmdrive-xl85',
        '/tmdrive-guardian'
    ],
    'DC Drives': [
        '/tmdrive-dc',
        '/tmdrive-dce2'
    ],
    'PV Inverters': [
        '/solar-ware-samurai',
        '/solar-ware-ninja-universal-pcs',
        '/solar-ware-833',
        '/solar-ware-750',
        '/solar-ware-665',
        '/solar-ware-675',
        '/solar-ware-630',
        '/solar-ware-500e',
        '/solar-ware-500',
        '/solar-ware-490',
        '/solar-ware-1000',
        '/solar-ware-1667',
        '/solar-ware-1833',
        '/solar-ware-2220',
        '/solar-ware-2500',
        '/solar-ware-2550',
        '/solar-ware-2700',
        '/solar-ware-3200',
        '/solar-ware-station'
    ],
    'Energy Storage': [
        '/energy-storage'
    ],
    'Motors': [
        '/21-fii-series',
        '/21-g-series',
        '/21-h-series',
        '/21-l-series-vertical',
        '/21-vll-series-vertical-motors',
        '/custom-designed-induction-motors',
        '/custom-designed-synchronous-motors',
        '/rolling-mills',
        '/tm-ac-series-800-frame'
    ],
    'Generators': [
        '/air-cooled-type-synchronous-generators',
        '/custom-designed-2-pole-synchronous-generators',
        '/tm21-tg-series-4-pole-for-turbine-drive',
        '/tm21-tg-series-2-pole'
    ],
    'Controllers': [
        '/innovation-series-controller'
    ],
    'Software': [
        '/dynamic-var-compensation-dyna-var'
    ]
};

// Delay between requests to be respectful to the server
const REQUEST_DELAY = 1000;

// Sleep function
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Items to filter out from features (navigation items, regions, etc.)
const FILTER_OUT_FEATURES = [
    'news',
    'events',
    'contact',
    'careers',
    'industries',
    'products',
    'sustainability',
    'support',
    'africa',
    'americas',
    'australia',
    'europe',
    'asia',
    'japan',
    'china',
    'india',
    'middle east',
    'follow us',
    'facebook',
    'twitter',
    'linkedin',
    'youtube',
    'instagram',
    'privacy',
    'cookie',
    'terms',
    'footer',
    'header',
    'menu',
    'navigation',
    'home',
    'about',
    'login',
    'register',
    'search',
    'newsletter'
];

// Image patterns to exclude (badges, icons, certifications, small images)
const EXCLUDE_IMAGE_PATTERNS = [
    'icon',
    'logo',
    'favicon',
    'placeholder',
    '1x1',
    'certification',
    'ce_dark',
    'ce_light',
    'ce_certification',
    'ul_listed',
    'c_ul_us',
    'iec_dark',
    'iec_light',
    'jec_dark',
    'jec_light',
    'gost',
    'atex',
    'abnt',
    'nec',
    'sa_dark',
    'sa_light',
    '-50x0-c-default',  // Small badge images
    'w_c_ul_us',
    'w_ul_listed',
    'w_abnt',
    'w_nec',
    'header-all'
];

/**
 * Check if an image URL should be excluded
 */
function shouldExcludeImage(url) {
    const lowerUrl = url.toLowerCase();
    return EXCLUDE_IMAGE_PATTERNS.some(pattern => lowerUrl.includes(pattern));
}

/**
 * Check if a feature text should be excluded
 */
function shouldExcludeFeature(text) {
    const lowerText = text.toLowerCase();
    // Filter out short text or text that matches navigation items
    if (text.length < 10) return true;
    if (text.includes('\n') && text.length > 50) return true; // Multi-line navigation 
    return FILTER_OUT_FEATURES.some(pattern => lowerText.includes(pattern));
}

/**
 * Fetch a page and parse it with Cheerio
 */
async function fetchPage(url) {
    try {
        console.log(`Fetching: ${url}`);
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5'
            },
            timeout: 30000
        });
        return cheerio.load(response.data);
    } catch (error) {
        console.error(`Error fetching ${url}: ${error.message}`);
        return null;
    }
}

/**
 * Get the main product image - prioritize og:image and hero images
 */
function getMainProductImage($, productSlug) {
    // Priority 1: Open Graph image (usually the main product image)
    const ogImage = $('meta[property="og:image"]').attr('content');
    if (ogImage && !shouldExcludeImage(ogImage)) {
        return ogImage.startsWith('/') ? `${BASE_URL}${ogImage}` : ogImage;
    }

    // Priority 2: Look for product-specific images with the product name in the filename
    const productName = productSlug.replace(/[/-]/g, '').toLowerCase();
    let bestMatch = null;

    $('img').each((_, el) => {
        const src = $(el).attr('src') || $(el).attr('data-src');
        if (src && !shouldExcludeImage(src)) {
            const srcLower = src.toLowerCase();
            // Prefer images that contain the product name or "product-" prefix
            if (srcLower.includes(productName) || srcLower.includes('product-')) {
                if (!bestMatch) {
                    bestMatch = src.startsWith('/') ? `${BASE_URL}${src}` :
                        (!src.startsWith('http') ? `${BASE_URL}/${src}` : src);
                }
            }
        }
    });

    if (bestMatch) return bestMatch;

    // Priority 3: First product image in the article/main content
    const mainImageSelectors = [
        'article img.wp-post-image',
        '.product-hero img',
        '.product-image img',
        'main article img',
        '.entry-content > figure img',
        '.wp-block-image img'
    ];

    for (const selector of mainImageSelectors) {
        const img = $(selector).first();
        const src = img.attr('src') || img.attr('data-src');
        if (src && !shouldExcludeImage(src)) {
            return src.startsWith('/') ? `${BASE_URL}${src}` :
                (!src.startsWith('http') ? `${BASE_URL}/${src}` : src);
        }
    }

    return null;
}

/**
 * Extract actual product features (not navigation items)
 */
function extractFeatures($) {
    const features = [];

    // Look for feature-specific content sections
    const featureSelectors = [
        '.product-features li',
        '.features-list li',
        '.key-features li',
        '.product-benefits li',
        '[class*="feature"] li',
        '.wp-block-list li'
    ];

    for (const selector of featureSelectors) {
        $(selector).each((_, el) => {
            const text = $(el).text().trim();
            if (text && !shouldExcludeFeature(text) && text.length > 10 && text.length < 300) {
                features.push(text);
            }
        });

        // If we found features with this selector, don't look further
        if (features.length >= 3) break;
    }

    // Deduplicate
    return [...new Set(features)].slice(0, 10);
}

/**
 * Extract product specifications
 */
function extractSpecs($) {
    const specs = [];

    // Look for specification tables
    $('table tr').each((_, row) => {
        const cells = $(row).find('td, th');
        if (cells.length >= 2) {
            const label = $(cells[0]).text().trim();
            const value = $(cells[1]).text().trim();
            if (label && value && label.length < 50 && value.length < 200) {
                specs.push(`${label}: ${value}`);
            }
        }
    });

    // Also look for definition lists
    $('dl dt').each((_, dt) => {
        const label = $(dt).text().trim();
        const value = $(dt).next('dd').text().trim();
        if (label && value && label.length < 50 && value.length < 200) {
            specs.push(`${label}: ${value}`);
        }
    });

    return [...new Set(specs)].slice(0, 15);
}

/**
 * Extract product data from a product page
 */
async function scrapeProduct(productUrl, category) {
    const fullUrl = `${BASE_URL}${productUrl}`;
    const $ = await fetchPage(fullUrl);

    if (!$) {
        return null;
    }

    // Extract product name
    const name = $('h1').first().text().trim() ||
        $('title').text().replace(' | TMEIC', '').trim();

    // Get description from meta or first content paragraph
    const description = $('meta[property="og:description"]').attr('content') ||
        $('meta[name="description"]').attr('content') ||
        '';

    // Get the main product image
    const mainImage = getMainProductImage($, productUrl);

    // Extract features (filtered)
    const features = extractFeatures($);

    // Extract specifications
    const specs = extractSpecs($);

    const product = {
        url: fullUrl,
        category: category,
        name: name,
        model: name,
        description: description.trim(),
        images: mainImage ? [mainImage] : [],
        specs: specs,
        features: features
    };

    return product;
}

/**
 * Main scraping function
 */
async function scrapeAllProducts() {
    const allProducts = [];
    let productId = 60001; // Starting ID for TMEIC products

    console.log('Starting TMEIC product scraping (improved)...\n');

    for (const [category, urls] of Object.entries(PRODUCT_URLS)) {
        console.log(`\n=== Scraping ${category} ===`);

        for (const url of urls) {
            const product = await scrapeProduct(url, category);

            if (product) {
                product.id = productId++;
                product.brand = 'TMEIC';
                allProducts.push(product);

                const imageStatus = product.images.length > 0 ? '✓ image' : '✗ no image';
                console.log(`  ✓ ${product.name} (${imageStatus})`);
            } else {
                console.log(`  ✗ Failed to scrape ${url}`);
            }

            await sleep(REQUEST_DELAY);
        }
    }

    // Save raw scraped data
    const outputPath = path.join(process.cwd(), 'scraped-products.json');
    await fs.writeFile(outputPath, JSON.stringify(allProducts, null, 2));
    console.log(`\n\nSaved ${allProducts.length} products to ${outputPath}`);

    return allProducts;
}

// Run the scraper
scrapeAllProducts().catch(console.error);
