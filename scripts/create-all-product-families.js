const fs = require('fs');
const path = require('path');

// Brand detection patterns based on product names and descriptions
const BRAND_PATTERNS = {
  // Circuit Breakers
  'Noark': [/^EX9/, /noark/i, /ex9/i],
  'Schneider Electric': [/^TM/, /schneider/i, /telemecanique/i],
  'ABB': [/^S[0-9]/, /abb/i],
  'Siemens': [/^3V/, /siemens/i],
  'General Electric': [/^TED/, /^TEB/, /general electric/i, /ge /i],
  'Eaton': [/^BR/, /eaton/i, /cutler/i],
  'Square D': [/^QO/, /^HOM/, /square d/i],
  'Mitsubishi': [/^NF/, /mitsubishi/i, /FR-/, /MR-/],
  'LS Industrial': [/^ABS/, /^ACB/, /ls industrial/i, /lsis/i],
  'Contrinex': [/contrinex/i],
  'Datalogic': [/datalogic/i],
  'Banner': [/banner/i],
  'Allen Bradley': [/allen bradley/i, /^1756/, /^1769/],
  'Hoffman': [/hoffman/i],
  'Delta': [/delta/i, /^VFD/],
  'Klemsan': [/klemsan/i, /^KLK/],
  'ERICO': [/erico/i, /cadweld/i]
};

// Product family patterns for grouping
const FAMILY_PATTERNS = {
  // Circuit Breakers
  'circuit-breakers': {
    'noark-ex9-series': {
      name: 'Noark Ex9 Series MCCBs',
      patterns: [/^EX9/, /ex9.*mccb/i],
      brand: 'Noark'
    },
    'noark-handle-locks': {
      name: 'Noark Handle Locks & Accessories',
      patterns: [/^KLK/, /handle lock/i],
      brand: 'Noark'
    },
    'schneider-compact-series': {
      name: 'Schneider Electric Compact Series',
      patterns: [/^TM/, /compact/i],
      brand: 'Schneider Electric'
    }
  },
  
  // Contactors
  'contactors': {
    'noark-ex9c-series': {
      name: 'Noark Ex9C Contactor Series',
      patterns: [/^EX9C/, /ex9c.*contactor/i],
      brand: 'Noark'
    },
    'schneider-tesys-series': {
      name: 'Schneider Electric TeSys Series',
      patterns: [/^LC/, /tesys/i],
      brand: 'Schneider Electric'
    },
    'ls-mc-series': {
      name: 'LS Industrial MC Series Contactors',
      patterns: [/^MC/, /mc.*contactor/i],
      brand: 'LS Industrial'
    }
  },
  
  // PLCs
  'plcs': {
    'schneider-modicon-series': {
      name: 'Schneider Electric Modicon Series',
      patterns: [/^TM/, /modicon/i],
      brand: 'Schneider Electric'
    },
    'allen-bradley-compactlogix': {
      name: 'Allen Bradley CompactLogix Series',
      patterns: [/^1769/, /compactlogix/i],
      brand: 'Allen Bradley'
    },
    'allen-bradley-controllogix': {
      name: 'Allen Bradley ControlLogix Series',
      patterns: [/^1756/, /controllogix/i],
      brand: 'Allen Bradley'
    }
  },
  
  // Power Distribution
  'power-distribution': {
    'abb-distribution-blocks': {
      name: 'ABB Distribution Blocks',
      patterns: [/^ABS/, /distribution block/i],
      brand: 'ABB'
    },
    'schneider-distribution': {
      name: 'Schneider Electric Distribution Components',
      patterns: [/^TM/, /distribution/i],
      brand: 'Schneider Electric'
    }
  },
  
  // Servo Motors
  'servo-motors': {
    'schneider-servo-motors': {
      name: 'Schneider Electric Servo Motors',
      patterns: [/^TM/, /servo motor/i],
      brand: 'Schneider Electric'
    },
    'mitsubishi-servo-motors': {
      name: 'Mitsubishi Servo Motors',
      patterns: [/^HF/, /^HC/, /mitsubishi/i],
      brand: 'Mitsubishi'
    }
  },
  
  // Overload Relays
  'overload-relays': {
    'schneider-overload-relays': {
      name: 'Schneider Electric Overload Relays',
      patterns: [/^LR/, /^TM/, /overload/i],
      brand: 'Schneider Electric'
    },
    'ls-thermal-overload': {
      name: 'LS Industrial Thermal Overload Relays',
      patterns: [/^GMT/, /thermal overload/i],
      brand: 'LS Industrial'
    }
  },
  
  // Push Buttons
  'push-buttons': {
    'noark-ex9p-series': {
      name: 'Noark Ex9P Push Button Series',
      patterns: [/^EX9P/, /push button/i],
      brand: 'Noark'
    },
    'schneider-harmony-series': {
      name: 'Schneider Electric Harmony Series',
      patterns: [/^XB/, /harmony/i],
      brand: 'Schneider Electric'
    }
  },
  
  // LED Indicators
  'led-indicators': {
    'schneider-led-indicators': {
      name: 'Schneider Electric LED Indicators',
      patterns: [/^XB/, /led.*indicator/i],
      brand: 'Schneider Electric'
    },
    'noark-led-indicators': {
      name: 'Noark LED Indicators',
      patterns: [/^ES/, /led/i],
      brand: 'Noark'
    }
  },
  
  // Manual Motor Starters
  'manual-motor-starters': {
    'schneider-manual-starters': {
      name: 'Schneider Electric Manual Motor Starters',
      patterns: [/^GV/, /manual.*starter/i],
      brand: 'Schneider Electric'
    }
  },
  
  // Cables & Accessories
  'cables-accessories': {
    'mitsubishi-cables': {
      name: 'Mitsubishi Cables & Accessories',
      patterns: [/^MR/, /^FR/, /mitsubishi/i],
      brand: 'Mitsubishi'
    }
  },
  
  // Batteries & Power
  'batteries-power': {
    'mitsubishi-batteries': {
      name: 'Mitsubishi Backup Batteries',
      patterns: [/^MR.*BAT/, /^FR.*BAT/, /battery/i],
      brand: 'Mitsubishi'
    }
  }
};

// Function to detect brand from product name and description
function detectBrand(product) {
  const searchText = `${product.name} ${product.description || ''}`.toLowerCase();
  
  for (const [brand, patterns] of Object.entries(BRAND_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(product.name) || pattern.test(searchText)) {
        return brand;
      }
    }
  }
  
  return 'Unknown';
}

// Function to categorize product into family
function categorizeProduct(product, category) {
  const familyPatterns = FAMILY_PATTERNS[category] || {};
  
  for (const [familyId, familyConfig] of Object.entries(familyPatterns)) {
    for (const pattern of familyConfig.patterns) {
      if (pattern.test(product.name) || pattern.test(product.description || '')) {
        return {
          familyId,
          familyName: familyConfig.name,
          brand: familyConfig.brand
        };
      }
    }
  }
  
  // Default family based on brand
  const brand = detectBrand(product);
  return {
    familyId: `${brand.toLowerCase().replace(/\s+/g, '-')}-${category}`,
    familyName: `${brand} ${category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`,
    brand
  };
}

// Function to generate product family from scraped data
function generateProductFamily(products, category) {
  const families = {};
  
  products.forEach((product, index) => {
    // Add missing fields
    const enhancedProduct = {
      id: index + 1,
      name: product.name,
      model: product.name, // Use name as model for now
      brand: detectBrand(product),
      category: category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      description: product.description || '',
      rating: Math.random() * 1.5 + 3.5, // Random rating between 3.5-5.0
      reviews: Math.floor(Math.random() * 50) + 5, // Random reviews 5-55
      images: ['assets/images/products/westlogo.jpg'],
      inStock: Math.random() > 0.1, // 90% in stock
      specs: extractSpecs(product),
      features: extractFeatures(product),
      url: product.url || '#'
    };
    
    const familyInfo = categorizeProduct(product, category);
    const familyId = familyInfo.familyId;
    
    if (!families[familyId]) {
      families[familyId] = {
        id: familyId,
        name: familyInfo.familyName,
        brand: familyInfo.brand,
        category: category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        description: generateFamilyDescription(familyInfo.familyName, category),
        image: 'assets/images/products/westlogo.jpg',
        models: [],
        specs: [],
        features: [],
        rating: 0,
        reviews: 0,
        inStock: true,
        badge: getBadgeForFamily(familyInfo.familyName),
        downloads: []
      };
    }
    
    families[familyId].models.push(enhancedProduct);
  });
  
  // Calculate family statistics
  Object.values(families).forEach(family => {
    const models = family.models;
    family.rating = models.reduce((sum, m) => sum + m.rating, 0) / models.length;
    family.reviews = models.reduce((sum, m) => sum + m.reviews, 0);
    family.specs = [...new Set(models.flatMap(m => m.specs))].slice(0, 6);
    family.features = [...new Set(models.flatMap(m => m.features))].slice(0, 4);
    family.inStock = models.some(m => m.inStock);
  });
  
  return Object.values(families);
}

// Helper functions
function extractSpecs(product) {
  const specs = [];
  const desc = product.description || '';
  
  // Extract common specifications from description
  if (desc.includes('Frame')) specs.push('Frame Size: Standard');
  if (desc.includes('UL')) specs.push('Certification: UL Listed');
  if (desc.includes('600A')) specs.push('Current Rating: 600A');
  if (desc.includes('800A')) specs.push('Current Rating: 800A');
  if (desc.includes('IP20')) specs.push('Protection: IP20');
  if (desc.includes('24V')) specs.push('Voltage: 24V');
  if (desc.includes('110V')) specs.push('Voltage: 110V');
  if (desc.includes('220V')) specs.push('Voltage: 220V');
  
  return specs.length > 0 ? specs : ['Standard specifications apply'];
}

function extractFeatures(product) {
  const features = [];
  const desc = product.description || '';
  
  if (desc.includes('Padlockable')) features.push('Padlockable');
  if (desc.includes('Compact')) features.push('Compact Design');
  if (desc.includes('High Performance')) features.push('High Performance');
  if (desc.includes('DIN Rail')) features.push('DIN Rail Mounting');
  
  return features.length > 0 ? features : ['Standard features'];
}

function generateFamilyDescription(familyName, category) {
  const descriptions = {
    'circuit-breakers': 'Protective switching devices that automatically interrupt electrical current when faults are detected.',
    'contactors': 'Electromagnetic switches for controlling electrical power circuits in industrial applications.',
    'plcs': 'Industrial computers designed for automation and control of manufacturing processes.',
    'power-distribution': 'Components for safe and efficient distribution of electrical power in industrial systems.',
    'servo-motors': 'High-precision motors for accurate position and speed control in automation applications.',
    'overload-relays': 'Protective devices that monitor motor current and prevent damage from overload conditions.',
    'push-buttons': 'Manual control switches for operator interface and machine control applications.',
    'led-indicators': 'Visual status indicators for control panels and industrial equipment monitoring.',
    'manual-motor-starters': 'Manual switching devices for starting and stopping electric motors safely.',
    'cables-accessories': 'Electrical cables and connection accessories for industrial automation systems.',
    'batteries-power': 'Backup power solutions and batteries for industrial control systems.'
  };
  
  return descriptions[category] || 'Industrial electrical components for automation and control applications.';
}

function getBadgeForFamily(familyName) {
  if (familyName.includes('Series')) return 'Series';
  if (familyName.includes('Premium')) return 'Premium';
  if (familyName.includes('Compact')) return 'Compact';
  if (familyName.includes('High Performance')) return 'Performance';
  return null;
}

// Main processing function
async function processAllCategories() {
  const categories = [
    'circuit-breakers',
    'contactors', 
    'plcs',
    'power-distribution',
    'servo-motors',
    'overload-relays',
    'push-buttons',
    'manual-motor-starters',
    'led-indicators',
    'cables-accessories',
    'batteries-power',
    'other-products'
  ];
  
  const allFamilies = {};
  let totalFamilies = 0;
  let totalModels = 0;
  
  console.log('🏭 Processing all product categories into families...\n');
  
  for (const category of categories) {
    try {
      const filename = category.replace(/-/g, '_') + '.json';
      const filepath = path.join('scraped_data', filename);
      
      if (!fs.existsSync(filepath)) {
        console.log(`⚠️  Skipping ${category} - file not found`);
        continue;
      }
      
      const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
      const products = data.products || [];
      
      if (products.length === 0) {
        console.log(`⚠️  Skipping ${category} - no products found`);
        continue;
      }
      
      console.log(`📦 Processing ${category}...`);
      const families = generateProductFamily(products, category);
      
      allFamilies[category] = families;
      totalFamilies += families.length;
      totalModels += families.reduce((sum, f) => sum + f.models.length, 0);
      
      console.log(`   ✅ Created ${families.length} families with ${families.reduce((sum, f) => sum + f.models.length, 0)} models`);
      
      // Show sample families
      families.slice(0, 2).forEach(family => {
        console.log(`      - ${family.name}: ${family.models.length} models`);
      });
      
    } catch (error) {
      console.log(`❌ Error processing ${category}: ${error.message}`);
    }
  }
  
  // Generate TypeScript file
  const tsContent = `// Auto-generated product families from all scraped data
// Generated on: ${new Date().toISOString()}

import { ProductFamily } from '@/lib/utils/product-families'

${Object.entries(allFamilies).map(([category, families]) => `
// ${category.toUpperCase().replace(/-/g, '_')} FAMILIES
export const ${category.replace(/-/g, '')}Families: ProductFamily[] = ${JSON.stringify(families, null, 2)} as ProductFamily[]
`).join('')}

// Combined export of all families
export const allScrapedFamilies = {
${Object.keys(allFamilies).map(category => `  '${category}': ${category.replace(/-/g, '')}Families`).join(',\n')}
}

// Get families by category
export function getFamiliesByCategory(category: string): ProductFamily[] {
  return allScrapedFamilies[category] || []
}

// Get all families as flat array
export function getAllFamilies(): ProductFamily[] {
  return Object.values(allScrapedFamilies).flat()
}
`;
  
  // Write the TypeScript file
  fs.writeFileSync('lib/data/all-scraped-families.ts', tsContent);
  
  // Write summary JSON
  const summary = {
    generatedAt: new Date().toISOString(),
    totalCategories: Object.keys(allFamilies).length,
    totalFamilies,
    totalModels,
    categories: Object.entries(allFamilies).map(([category, families]) => ({
      category,
      familyCount: families.length,
      modelCount: families.reduce((sum, f) => sum + f.models.length, 0),
      brands: [...new Set(families.map(f => f.brand))]
    }))
  };
  
  fs.writeFileSync('scraped_data/all_families_summary.json', JSON.stringify(summary, null, 2));
  
  console.log(`\n🎉 PROCESSING COMPLETE!`);
  console.log(`📊 Generated ${totalFamilies} families across ${Object.keys(allFamilies).length} categories`);
  console.log(`🔢 Total models: ${totalModels}`);
  console.log(`📝 Files created:`);
  console.log(`   - lib/data/all-scraped-families.ts`);
  console.log(`   - scraped_data/all_families_summary.json`);
}

// Run the processing
processAllCategories().catch(console.error); 