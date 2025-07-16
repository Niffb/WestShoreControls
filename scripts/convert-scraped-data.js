#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const SCRAPED_DATA_DIR = './scraped_data';
const OUTPUT_DIR = './lib/products/scraped';
const BASE_ID = 50000; // Start IDs from 50000 to avoid conflicts

// Brand detection patterns
const BRAND_PATTERNS = {
  'Mitsubishi': [
    /mitsubishi/i,
    /melsec/i,
    /fr-[a-z]/i,
    /mr-j/i,
    /hg-[a-z]/i,
    /q[0-9]/i,
    /fx[0-9]/i,
    /gt[0-9]/i,
    /ws0/i
  ],
  'Noark': [
    /noark/i,
    /ex9/i,
    /b1[a-z]/i,
    /m[0-9]n/i,
    /nh[0-9]/i
  ],
  'General Electric': [
    /general electric/i,
    /ge /i,
    /spectra/i,
    /entellisys/i,
    /multilin/i
  ],
  'Schneider Electric': [
    /schneider/i,
    /telemecanique/i,
    /modicon/i,
    /altivar/i,
    /lexium/i,
    /harmony/i
  ],
  'Allen Bradley': [
    /allen bradley/i,
    /rockwell/i,
    /powerflex/i,
    /compactlogix/i,
    /micrologix/i,
    /slc/i,
    /plc-5/i
  ],
  'Siemens': [
    /siemens/i,
    /simatic/i,
    /micromaster/i,
    /g120/i,
    /s7-/i
  ],
  'ABB': [
    /abb/i,
    /acs/i,
    /dcs/i
  ],
  'Eaton': [
    /eaton/i,
    /cutler hammer/i,
    /westinghouse/i
  ],
  'Square D': [
    /square d/i,
    /masterpact/i,
    /compact ns/i
  ],
  'Omron': [
    /omron/i,
    /cj[0-9]/i,
    /cp[0-9]/i,
    /nx[0-9]/i
  ],
  'Honeywell': [
    /honeywell/i,
    /experion/i,
    /c300/i
  ],
  'Emerson': [
    /emerson/i,
    /deltav/i,
    /ovation/i
  ],
  'Danfoss': [
    /danfoss/i,
    /vlt/i,
    /fc-/i
  ],
  'Yaskawa': [
    /yaskawa/i,
    /motoman/i,
    /v1000/i,
    /a1000/i
  ],
  'Fuji Electric': [
    /fuji/i,
    /frenic/i,
    /fvr/i
  ],
  'Delta': [
    /delta/i,
    /vfd/i,
    /dvp/i
  ],
  'WEG': [
    /weg/i,
    /cfw/i
  ],
  'Lenze': [
    /lenze/i,
    /8400/i,
    /i950/i
  ],
  'SEW': [
    /sew/i,
    /eurodrive/i,
    /movitrac/i
  ],
  'Phoenix Contact': [
    /phoenix/i,
    /contact/i,
    /plc next/i
  ],
  'Pilz': [
    /pilz/i,
    /pnoz/i,
    /pss/i
  ],
  'Turck': [
    /turck/i,
    /bi[0-9]/i,
    /ni[0-9]/i
  ],
  'Pepperl Fuchs': [
    /pepperl/i,
    /fuchs/i,
    /nbb/i
  ],
  'Sick': [
    /sick/i,
    /wl[0-9]/i,
    /im[0-9]/i
  ],
  'Balluff': [
    /balluff/i,
    /bes/i,
    /btl/i
  ],
  'IFM': [
    /ifm/i,
    /efector/i,
    /o[0-9]d/i
  ],
  'Keyence': [
    /keyence/i,
    /kv-/i,
    /lv-/i
  ],
  'Banner': [
    /banner/i,
    /sm[0-9]/i,
    /qm[0-9]/i
  ],
  'Cognex': [
    /cognex/i,
    /dataman/i,
    /insight/i
  ],
  'Datalogic': [
    /datalogic/i,
    /s[0-9][0-9]/i
  ],
  'Leuze': [
    /leuze/i,
    /bcl/i,
    /cml/i
  ],
  'Contrinex': [
    /contrinex/i,
    /dw-/i,
    /lts/i
  ],
  'Murr': [
    /murr/i,
    /elektronik/i,
    /mico/i
  ],
  'Harting': [
    /harting/i,
    /han/i,
    /mica/i
  ],
  'Molex': [
    /molex/i,
    /brad/i,
    /woodhead/i
  ],
  'TE Connectivity': [
    /te connectivity/i,
    /tyco/i,
    /amp/i
  ],
  'Amphenol': [
    /amphenol/i,
    /sine/i,
    /tuchel/i
  ],
  'Belden': [
    /belden/i,
    /lumberg/i,
    /hirschmann/i
  ],
  'Panduit': [
    /panduit/i,
    /mini-com/i,
    /opticom/i
  ],
  'Legrand': [
    /legrand/i,
    /ortronics/i,
    /cablofil/i
  ],
  'Wieland': [
    /wieland/i,
    /gesis/i,
    /samos/i
  ],
  'Wago': [
    /wago/i,
    /750-/i,
    /221-/i
  ],
  'Beckhoff': [
    /beckhoff/i,
    /cx[0-9]/i,
    /el[0-9]/i
  ],
  'B&R': [
    /b&r/i,
    /x20/i,
    /power panel/i
  ],
  'Lapp': [
    /lapp/i,
    /ölflex/i,
    /unitronic/i
  ],
  'Igus': [
    /igus/i,
    /chainflex/i,
    /e-chain/i
  ],
  'Rittal': [
    /rittal/i,
    /ts 8/i,
    /ae/i
  ],
  'Hoffman': [
    /hoffman/i,
    /a-/i,
    /concept/i
  ],
  'Hammond': [
    /hammond/i,
    /1444/i,
    /1590/i
  ],
  'Stahlin': [
    /stahlin/i,
    /j[0-9]/i,
    /ds[0-9]/i
  ],
  'Fibox': [
    /fibox/i,
    /arca/i,
    /tempo/i
  ],
  'nVent': [
    /nvent/i,
    /erico/i,
    /caddy/i,
    /hoffman/i
  ]
};

// Category mapping
const CATEGORY_MAPPING = {
  'contactors': 'Contactors',
  'drives_vfds': 'Variable Frequency Drives',
  'circuit_breakers': 'Circuit Breakers',
  'overload_relays': 'Overload Relays',
  'plcs': 'Programmable Logic Controllers',
  'led_indicators': 'LED Indicators',
  'servo_motors': 'Servo Motors',
  'push_buttons': 'Push Buttons',
  'power_distribution': 'Power Distribution',
  'cables_accessories': 'Cables & Accessories',
  'batteries_power': 'Batteries & Power',
  'manual_motor_starters': 'Manual Motor Starters',
  'other_products': 'Other Products'
};

// Function to detect brand from product name and description
function detectBrand(productName, productDescription) {
  const text = `${productName} ${productDescription}`.toLowerCase();
  
  for (const [brand, patterns] of Object.entries(BRAND_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(text)) {
        return brand;
      }
    }
  }
  
  return 'Unknown';
}

// Function to generate price based on category and brand
function generatePrice(category, brand) {
  const basePrice = {
    'Contactors': 150,
    'Variable Frequency Drives': 800,
    'Circuit Breakers': 120,
    'Overload Relays': 180,
    'Programmable Logic Controllers': 1200,
    'LED Indicators': 45,
    'Servo Motors': 2500,
    'Push Buttons': 35,
    'Power Distribution': 250,
    'Cables & Accessories': 85,
    'Batteries & Power': 95,
    'Manual Motor Starters': 220,
    'Other Products': 150
  };
  
  const brandMultiplier = {
    'Mitsubishi': 1.3,
    'Siemens': 1.4,
    'Allen Bradley': 1.5,
    'Schneider Electric': 1.2,
    'ABB': 1.3,
    'General Electric': 1.1,
    'Eaton': 1.0,
    'Square D': 1.1,
    'Omron': 1.2,
    'Noark': 0.8,
    'Unknown': 0.9
  };
  
  const base = basePrice[category] || 100;
  const multiplier = brandMultiplier[brand] || 1.0;
  const variation = 0.8 + (Math.random() * 0.4); // ±20% variation
  
  return Math.round(base * multiplier * variation);
}

// Function to generate rating
function generateRating() {
  const ratings = [3.5, 3.8, 4.0, 4.2, 4.5, 4.7, 4.8, 4.9, 5.0];
  return ratings[Math.floor(Math.random() * ratings.length)];
}

// Function to generate review count
function generateReviews() {
  return Math.floor(Math.random() * 200) + 15;
}

// Function to convert JSON product to TypeScript Product
function convertToProduct(jsonProduct, category, index) {
  const brand = detectBrand(jsonProduct.name, jsonProduct.description);
  const price = generatePrice(category, brand);
  const rating = generateRating();
  const reviews = generateReviews();
  
  // Create URL slug
  const slug = jsonProduct.name.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
  
  return {
    id: BASE_ID + index,
    name: jsonProduct.name,
    model: jsonProduct.name.split(' ')[0] || jsonProduct.name,
    brand: brand,
    category: category,
    description: jsonProduct.description,
    price: price,
    rating: rating,
    reviews: reviews,
    images: ['placeholder.jpg'],
    inStock: true,
    specs: [],
    url: jsonProduct.url || `/${brand.toLowerCase().replace(/\s+/g, '-')}/${category.toLowerCase().replace(/\s+/g, '-')}/${slug}`,
    features: []
  };
}

// Function to process a single JSON file
function processJsonFile(filename) {
  const filePath = path.join(SCRAPED_DATA_DIR, filename);
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  const categoryKey = filename.replace('.json', '');
  const categoryName = CATEGORY_MAPPING[categoryKey] || categoryKey;
  
  console.log(`Processing ${filename} - ${jsonData.products.length} products`);
  
  // Group products by brand
  const productsByBrand = {};
  
  jsonData.products.forEach((product, index) => {
    const convertedProduct = convertToProduct(product, categoryName, index);
    const brand = convertedProduct.brand;
    
    if (!productsByBrand[brand]) {
      productsByBrand[brand] = [];
    }
    
    productsByBrand[brand].push(convertedProduct);
  });
  
  // Create TypeScript files for each brand
  Object.entries(productsByBrand).forEach(([brand, products]) => {
    const brandSlug = brand.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const categorySlug = categoryKey.replace(/_/g, '-');
    const filename = `${brandSlug}-${categorySlug}-scraped-products.ts`;
    const outputPath = path.join(OUTPUT_DIR, filename);
    
    const exportName = `${brandSlug.replace(/-/g, '')}${categorySlug.replace(/-/g, '_')}ScrapedProducts`;
    
    const content = `import { Product } from '@/lib/types/shared-types';

// ${brand} ${categoryName} products from scraped data
// Generated from ${categoryKey}.json
// Total products: ${products.length}

export const ${exportName}: Product[] = ${JSON.stringify(products, null, 2)};
`;
    
    fs.writeFileSync(outputPath, content);
    console.log(`Created ${filename} with ${products.length} products`);
  });
}

// Main function
function main() {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  // Get all JSON files from scraped_data directory
  const jsonFiles = fs.readdirSync(SCRAPED_DATA_DIR)
    .filter(file => file.endsWith('.json') && file !== 'scraping_summary.json');
  
  console.log(`Found ${jsonFiles.length} JSON files to process`);
  
  // Process each JSON file
  jsonFiles.forEach(processJsonFile);
  
  console.log('\n✅ All JSON files processed successfully!');
  console.log('\nNext steps:');
  console.log('1. Update lib/products/scraped/all-scraped-products.ts to import the new files');
  console.log('2. Run npm run build to verify everything works');
}

// Run the script
main(); 