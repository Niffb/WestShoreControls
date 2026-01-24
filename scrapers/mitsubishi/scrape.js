/**
 * Mitsubishi Electric Factory Automation Products Scraper
 * 
 * Scrapes products from the US Mitsubishi Electric website.
 * Handles the site's embedded <style> tags and filters navigation items.
 */

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs').promises;
const path = require('path');

const BASE_URL = 'https://us.mitsubishielectric.com';
const REQUEST_DELAY = 1200;

// Product categories with their listing pages
const CATEGORIES = [
    // Variable Frequency Drives
    {
        name: 'Variable Frequency Drives',
        products: [
            { name: 'FR-A800 Series', url: '/fa/en/products/drv/inv/items/fr-a-series/' },
            { name: 'FR-A800 Plus Series', url: '/fa/en/products/drv/inv/items/fr-a800-plus/' },
            { name: 'FR-F800 Series', url: '/fa/en/products/drv/inv/items/fr-f-series/' },
            { name: 'FR-E800 Series', url: '/fa/en/products/drv/inv/items/fr-e-series/' },
            { name: 'FR-D800 Series', url: '/fa/en/products/drv/inv/items/fr-d-series/' },
            { name: 'FR-XC Regeneration Converter', url: '/fa/en/products/drv/inv/items/fr-xc-series/' },
        ]
    },
    // Programmable Controllers
    {
        name: 'Programmable Logic Controllers',
        products: [
            { name: 'MELSEC iQ-R Series', url: '/fa/en/products/cnt/programmable-controllers/melsec-iq-r-series/' },
            { name: 'MELSEC iQ-F Series', url: '/fa/en/products/cnt/programmable-controllers/melsec-iq-f-series/' },
            { name: 'MELSEC-Q Series', url: '/fa/en/products/cnt/programmable-controllers/melsec-q-series/' },
            { name: 'MELSEC-L Series', url: '/fa/en/products/cnt/programmable-controllers/melsec-l-series/' },
            { name: 'MELSEC-FX Series', url: '/fa/en/products/cnt/programmable-controllers/melsec-fx-series/' },
        ]
    },
    // Motion Controllers
    {
        name: 'Motion Controllers',
        products: [
            { name: 'Motion Controller', url: '/fa/en/products/cnt/motion-controllers/' },
        ]
    },
    // HMI
    {
        name: 'Human Machine Interface',
        products: [
            { name: 'GOT2000 Series', url: '/fa/en/products/hmi/human-machine-interface/' },
        ]
    },
    // Servo Motors
    {
        name: 'Servo Motors',
        products: [
            { name: 'MELSERVO AC Servo', url: '/fa/en/products/drv/servos/' },
        ]
    },
    // Circuit Breakers
    {
        name: 'Circuit Breakers',
        products: [
            { name: 'Low-voltage Circuit Breakers', url: '/fa/en/products/lvd/circuit-breakers/' },
        ]
    },
    // Contactors
    {
        name: 'Contactors',
        products: [
            { name: 'Contactors and Motor Starters', url: '/fa/en/products/lvd/contactors-motor-starters/' },
        ]
    },
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Navigation/garbage items to filter out
const GARBAGE_PATTERNS = [
    'website help', 'oem locator', 'solutions partners', 'diamond partners',
    'distributor locator', 'site map', 'contact', 'careers', 'news', 'events',
    'facebook', 'twitter', 'linkedin', 'youtube', 'instagram', 'privacy',
    'cookie', 'terms', 'footer', 'header', 'menu', 'login', 'search',
    'newsletter', 'subscribe', 'copyright', 'follow us', 'home',
    // Navigation series links
    'vfds (inverters-freqrol)', 'fr-a800 series', 'fr-a800 plus series',
    'fr-f series', 'fr-e series', 'fr-d series', 'fr-xc series',
    'melsec iq-r', 'melsec iq-f', 'melsec-q', 'melsec-l', 'melsec-fx',
    'got2000', 'melservo'
];

/**
 * Fetch a page and parse with Cheerio
 */
async function fetchPage(url) {
    try {
        console.log(`  Fetching: ${url}`);
        const response = await axios.get(url, {
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
 * Remove style and script tags from element before extracting text
 */
function getCleanText($, selector) {
    const $el = $(selector).first().clone();
    // Remove style and script tags
    $el.find('style, script').remove();
    return $el.text().replace(/\s+/g, ' ').trim();
}

/**
 * Get meta description 
 */
function getMetaDescription($) {
    return $('meta[name="description"]').attr('content') ||
        $('meta[property="og:description"]').attr('content') || '';
}

/**
 * Get product image - looking for actual product images
 */
function getProductImage($) {
    // Priority 1: Product list images (.c-linkWithImage img) - these are the actual product images
    const productListSelectors = [
        '.c-linkWithImage img',
        '.c-linkWithImage__image img',
        '.l-productList img'
    ];

    for (const sel of productListSelectors) {
        const $img = $(sel).first();
        let src = $img.attr('src') || $img.attr('data-src');
        if (src && src.includes('/-/media/') && !src.includes('logo')) {
            if (src.startsWith('//')) src = 'https:' + src;
            else if (src.startsWith('/')) src = BASE_URL + src;
            return src;
        }
    }

    // Priority 2: Main visual/hero images
    const heroSelectors = [
        '.c-mainVisual img',
        '.p-product-visual img',
        'article img[src*="product"]',
        'main img[src*="/-/media/"]'
    ];

    for (const sel of heroSelectors) {
        const $img = $(sel).first();
        let src = $img.attr('src') || $img.attr('data-src');
        if (src && !src.includes('logo') && !src.includes('icon') && !src.includes('1x1')) {
            if (src.startsWith('//')) src = 'https:' + src;
            else if (src.startsWith('/')) src = BASE_URL + src;
            return src;
        }
    }

    // Priority 3: Any image with /-/media/images/webredesign/products in the path
    $('img').each((_, el) => {
        let src = $(el).attr('src');
        if (src && src.includes('/webredesign/products/')) {
            if (src.startsWith('/')) src = BASE_URL + src;
            return src;
        }
    });

    return '';
}

/**
 * Extract real features (not navigation items)
 */
function extractFeatures($) {
    const features = [];

    // Look for feature sections in main content
    const $main = $('main, article, .l-contents');

    $main.find('p, .c-text, .c-lead').each((_, el) => {
        const text = $(el).text().trim();
        // Only include substantial text that's not garbage
        if (text.length > 30 && text.length < 400 &&
            !GARBAGE_PATTERNS.some(p => text.toLowerCase().includes(p))) {
            features.push(text);
        }
    });

    // Also check for bullet points
    $main.find('ul li, .c-list li').each((_, el) => {
        const text = $(el).text().trim();
        if (text.length > 15 && text.length < 200 &&
            !GARBAGE_PATTERNS.some(p => text.toLowerCase().includes(p)) &&
            !text.includes('{')) { // No CSS
            features.push(text);
        }
    });

    // Deduplicate and limit
    return [...new Set(features)].slice(0, 8);
}

/**
 * Scrape a single product page
 */
async function scrapeProduct(productInfo, categoryName) {
    const fullUrl = BASE_URL + productInfo.url;
    const $ = await fetchPage(fullUrl);

    if (!$) {
        return {
            name: productInfo.name,
            model: productInfo.name,
            description: '',
            mainImage: '',
            features: [],
            specs: [],
            category: categoryName,
            url: fullUrl
        };
    }

    // Use the defined product name (these are clean)
    const name = productInfo.name;

    // Get description from meta (this works well)
    const description = getMetaDescription($);

    // Get image
    const mainImage = getProductImage($);

    // Get features
    const features = extractFeatures($);

    return {
        name,
        model: productInfo.name,
        description,
        mainImage,
        features,
        specs: [],
        category: categoryName,
        url: fullUrl
    };
}

/**
 * Main scraping function
 */
async function scrapeAllProducts() {
    console.log('Starting Mitsubishi Electric product scraping...\n');

    const allProducts = [];
    let id = 60001;

    for (const category of CATEGORIES) {
        console.log(`\n=== ${category.name} ===`);

        for (const product of category.products) {
            console.log(`\nScraping: ${product.name}`);

            const scrapedProduct = await scrapeProduct(product, category.name);
            scrapedProduct.id = id++;
            scrapedProduct.brand = 'Mitsubishi';

            allProducts.push(scrapedProduct);

            const imgIcon = scrapedProduct.mainImage ? '✓' : '✗';
            console.log(`  ${imgIcon} ${scrapedProduct.name} (${scrapedProduct.features.length} features)`);

            await sleep(REQUEST_DELAY);
        }
    }

    // Save output
    const outputPath = path.join(__dirname, 'scraped-products.json');
    await fs.writeFile(outputPath, JSON.stringify(allProducts, null, 2));

    console.log(`\n\n=== Scraping Complete ===`);
    console.log(`✓ Saved ${allProducts.length} products to scraped-products.json`);
    console.log(`  With images: ${allProducts.filter(p => p.mainImage).length}`);
    console.log(`  With features: ${allProducts.filter(p => p.features.length > 0).length}`);

    return allProducts;
}

// Run
scrapeAllProducts()
    .then(() => process.exit(0))
    .catch(err => {
        console.error('Scraping failed:', err);
        process.exit(1);
    });
