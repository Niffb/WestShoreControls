const fs = require('fs');
const path = require('path');

// Load the scraped VFD data
const vfdData = JSON.parse(fs.readFileSync('scraped_data/drives_vfds.json', 'utf8'));

// Function to determine product family and brand from product name
function categorizeVFDProduct(name, description) {
  let family = null;
  let brand = 'Unknown';
  let series = '';
  
  // Mitsubishi FR-A8xx Series (A800 Plus)
  if (name.match(/FR[- ]?A8[0-9]/)) {
    family = 'mitsubishi-a8xx';
    brand = 'Mitsubishi';
    series = 'FR-A8xx Series';
  }
  // Mitsubishi FR-F8xx Series (F800 Series)
  else if (name.match(/FR[- ]?F8[0-9]/)) {
    family = 'mitsubishi-f8xx';
    brand = 'Mitsubishi';
    series = 'FR-F8xx Series';
  }
  // Mitsubishi FR-A7xx Series
  else if (name.match(/FR[- ]?A7[0-9]/)) {
    family = 'mitsubishi-a7xx';
    brand = 'Mitsubishi';
    series = 'FR-A7xx Series';
  }
  // Mitsubishi FR-E7xx Series
  else if (name.match(/FR[- ]?E7[0-9]/)) {
    family = 'mitsubishi-e7xx';
    brand = 'Mitsubishi';
    series = 'FR-E7xx Series';
  }
  // Mitsubishi FR-D7xx Series
  else if (name.match(/FR[- ]?D7[0-9]/)) {
    family = 'mitsubishi-d7xx';
    brand = 'Mitsubishi';
    series = 'FR-D7xx Series';
  }
  // Mitsubishi E8xx Series (different naming convention)
  else if (name.match(/^E8[0-9]/)) {
    family = 'mitsubishi-e8xx';
    brand = 'Mitsubishi';
    series = 'E8xx Series';
  }
  // LS Industrial Starvert iC5 Series
  else if (name.match(/SV[0-9]+IC5/)) {
    family = 'ls-starvert-ic5';
    brand = 'LS Industrial';
    series = 'Starvert iC5 Series';
  }
  // LS Industrial Starvert iG5A Series
  else if (name.match(/SV[0-9]+IG5A/)) {
    family = 'ls-starvert-ig5a';
    brand = 'LS Industrial';
    series = 'Starvert iG5A Series';
  }
  // LS Industrial Starvert iE5 Series
  else if (name.match(/SV[0-9]+IE5/)) {
    family = 'ls-starvert-ie5';
    brand = 'LS Industrial';
    series = 'Starvert iE5 Series';
  }
  // LS Industrial Starvert iP5A Series
  else if (name.match(/SV[0-9]+IP5A/)) {
    family = 'ls-starvert-ip5a';
    brand = 'LS Industrial';
    series = 'Starvert iP5A Series';
  }
  // LS Industrial Starvert iS7 Series
  else if (name.match(/SV[0-9]+IS7/)) {
    family = 'ls-starvert-is7';
    brand = 'LS Industrial';
    series = 'Starvert iS7 Series';
  }
  // LS Industrial LSLV Series
  else if (name.match(/LSLV[0-9]/)) {
    family = 'ls-lslv';
    brand = 'LS Industrial';
    series = 'LSLV Series';
  }
  // Mitsubishi MR-J Series (Servo drives)
  else if (name.match(/MR[- ]?J[0-9]/)) {
    family = 'mitsubishi-mr-j';
    brand = 'Mitsubishi';
    series = 'MR-J Servo Series';
  }
  
  return { family, brand, series };
}

// Function to extract specifications from description
function extractSpecs(description, name) {
  const specs = [];
  
  // Extract voltage
  const voltageMatch = description.match(/(\d+V\s+Class|\d+V|\d+-\d+V)/i);
  if (voltageMatch) specs.push(`Input Voltage: ${voltageMatch[1]}`);
  
  // Extract motor capacity/power
  const powerMatch = description.match(/(\d+(?:\.\d+)?hp|\d+(?:\.\d+)?kW)/i);
  if (powerMatch) specs.push(`Motor Capacity: ${powerMatch[1]}`);
  
  // Extract current rating
  const currentMatch = description.match(/(\d+(?:\.\d+)?A\s+Output|\d+(?:\.\d+)?A)/i);
  if (currentMatch) specs.push(`Current Rating: ${currentMatch[1]}`);
  
  // Extract frame size
  const frameMatch = description.match(/Frame Size:\s*([A-Z])/i);
  if (frameMatch) specs.push(`Frame Size: ${frameMatch[1]}`);
  
  // Extract cooling type
  const coolingMatch = description.match(/(Natural Cooling|Forced Air Cooling)/i);
  if (coolingMatch) specs.push(`Cooling: ${coolingMatch[1]}`);
  
  // Extract protection rating
  const protectionMatch = description.match(/(IP\d+|NEMA\d+|UL TYPE \d+)/i);
  if (protectionMatch) specs.push(`Protection: ${protectionMatch[1]}`);
  
  return specs;
}

// Function to extract features from description
function extractFeatures(description, series) {
  const features = [];
  
  if (description.includes('SensorLess Vector Control')) features.push('Sensorless Vector Control');
  if (description.includes('Built-in EMC Filter')) features.push('Built-in EMC Filter');
  if (description.includes('High Torque')) features.push('High Torque Performance');
  if (description.includes('Ethernet')) features.push('Ethernet Communication');
  if (description.includes('Single Phase')) features.push('Single Phase Input');
  if (description.includes('Three Phase')) features.push('Three Phase Input');
  
  // Add series-specific features
  if (series.includes('iC5')) features.push('Compact Design', 'Easy Programming');
  if (series.includes('iG5A')) features.push('Advanced Control', 'Energy Saving');
  if (series.includes('A8')) features.push('Premium Performance', 'Extended Life Design');
  if (series.includes('F8')) features.push('Fan & Pump Optimized', 'Energy Efficient');
  
  return features;
}

// Group products by family
const families = {};
let productIdCounter = 70000; // Start from 70000 to avoid conflicts

vfdData.products.forEach((product) => {
  const { family, brand, series } = categorizeVFDProduct(product.name, product.description);
  
  if (!family) return; // Skip uncategorized products
  
  if (!families[family]) {
    families[family] = {
      id: family,
      name: '',
      brand: brand,
      category: 'Variable Frequency Drives',
      description: '',
      image: '',
      models: [],
      specs: [],
      features: [],
      rating: 0,
      reviews: 0,
      inStock: true,
      badge: '',
      downloads: []
    };
  }
  
  // Extract specs and features
  const specs = extractSpecs(product.description, product.name);
  const features = extractFeatures(product.description, series);
  
  // Create product model
  const model = {
    id: productIdCounter++,
    name: product.name,
    model: product.name,
    brand: brand,
    category: 'Variable Frequency Drives',
    subcategory: series,
    description: product.description,
    rating: 4.5 + Math.random() * 0.5, // Generate rating between 4.5-5.0
    reviews: Math.floor(Math.random() * 50) + 5, // 5-55 reviews
    images: ['assets/images/products/westlogo.jpg'], // Default image
    inStock: true,
    specs: specs,
    features: features,
    url: product.url
  };
  
  families[family].models.push(model);
});

// Define family-specific information
const familyDefinitions = {
  'mitsubishi-a8xx': {
    name: 'Mitsubishi FR-A8xx Plus Series',
    description: 'Premium variable frequency drives with advanced features and high performance for demanding industrial applications.',
    image: 'assets/images/products/mitsubishi/drives/Mitsubishi_A800_Series_300x300_f4449bac-61ee-47f0-8e3b-7aa6411acc03_medium.avif',
    badge: 'Premium',
    specs: [
      'Input voltage: 200-240VAC / 380-500VAC (3-phase)',
      'Power range: 0.4kW to 280kW',
      'Advanced motor control with Real Sensorless Vector Control',
      'Built-in Ethernet/IP and Modbus RTU communication',
      'Extended conformal coating available',
      'High-speed response with 1ms sampling'
    ],
    features: [
      'Advanced energy-saving algorithms',
      'Enhanced system protection features',
      'Integrated PLC functionality',
      'USB programming port',
      'Extended life design (10-year maintenance free)',
      'Multiple control modes'
    ]
  },
  'mitsubishi-f8xx': {
    name: 'Mitsubishi FR-F8xx Series',
    description: 'Specialized inverters optimized for fan and pump applications with enhanced energy efficiency and environmental resistance.',
    image: 'assets/images/products/mitsubishi/drives/Mitsubishi_F800_Series_300x300_019b1561-110c-4fb4-a377-1493b5180803_medium.avif',
    badge: 'Energy Efficient',
    specs: [
      'Optimized for fans, pumps and compressors',
      'High energy savings',
      'Robust design for industrial environments',
      'Wide output frequency range (0.2-590Hz)',
      'Modbus RTU/Ethernet communication'
    ],
    features: [
      'Energy optimization algorithms',
      'Advanced environmental resistance',
      'Easy installation and maintenance',
      'Built-in protection functions',
      'Communication ready'
    ]
  },
  'mitsubishi-a7xx': {
    name: 'Mitsubishi FR-A7xx Series',
    description: 'Reliable and versatile variable frequency drives for general industrial applications with proven performance.',
    image: 'assets/images/products/mitsubishi/drives/Mitsubishi_A800_Series_300x300_f4449bac-61ee-47f0-8e3b-7aa6411acc03_medium.avif',
    badge: 'Reliable',
    specs: [
      'General purpose applications',
      'Multiple control modes',
      'Reliable performance',
      'Easy programming',
      'Standard communication interfaces'
    ],
    features: [
      'Proven reliability',
      'Easy setup and operation',
      'Standard control functions',
      'Cost-effective solution',
      'Wide application range'
    ]
  },
  'mitsubishi-e7xx': {
    name: 'Mitsubishi FR-E7xx Series',
    description: 'Compact and economical variable frequency drives for basic applications with simple operation.',
    image: 'assets/images/products/mitsubishi/drives/Mitsubishi_E800_VFD_medium.avif',
    badge: 'Compact',
    specs: [
      'Compact design',
      'Basic control functions',
      'Easy operation',
      'Cost-effective',
      'Space-saving installation'
    ],
    features: [
      'Simple programming',
      'Compact footprint',
      'Basic protection functions',
      'Easy maintenance',
      'Economical solution'
    ]
  },
  'mitsubishi-d7xx': {
    name: 'Mitsubishi FR-D7xx Series',
    description: 'Entry-level variable frequency drives with essential features for basic motor control applications.',
    image: 'assets/images/products/mitsubishi/drives/Mitsubishi_D700_Series_300x300_72a55542-e148-4d3c-aa1b-ef4bcddb54fd_medium.avif',
    badge: 'Entry Level',
    specs: [
      'Entry-level performance',
      'Essential control functions',
      'Basic programming',
      'Standard protection',
      'Simple operation'
    ],
    features: [
      'Easy to use',
      'Basic motor control',
      'Cost-effective',
      'Reliable operation',
      'Simple installation'
    ]
  },
  'mitsubishi-e8xx': {
    name: 'Mitsubishi E8xx Series',
    description: 'Advanced variable frequency drives with enhanced features for precision control applications.',
    image: 'assets/images/products/mitsubishi/drives/Mitsubishi_E800_VFD_medium.avif',
    badge: 'Advanced',
    specs: [
      'Enhanced control features',
      'Precision motor control',
      'Advanced programming',
      'Multiple communication options',
      'High performance'
    ],
    features: [
      'Precision control',
      'Advanced algorithms',
      'Multiple control modes',
      'Enhanced diagnostics',
      'Communication ready'
    ]
  },
  'ls-starvert-ic5': {
    name: 'LS Starvert iC5 Series',
    description: 'High torque micro VFDs with sensorless vector control, perfect for compact applications requiring precise motor control.',
    image: 'assets/images/products/ls_industrial/vfd_series/Starvert_iC5_medium.avif',
    badge: 'Micro VFD',
    specs: [
      'High torque performance',
      'Sensorless vector control',
      'Single phase input',
      'Built-in EMC filter',
      'Compact design'
    ],
    features: [
      'High torque at low speeds',
      'Sensorless vector control',
      'Built-in EMC filter',
      'Compact size',
      'Easy programming'
    ]
  },
  'ls-starvert-ig5a': {
    name: 'LS Starvert iG5A Series',
    description: 'General purpose VFDs with advanced control features and energy-saving functions for industrial applications.',
    image: 'assets/images/products/ls_industrial/vfd_series/Starvert_iG5A_e972cb1c-e133-493e-99ad-39997d662be8_medium.avif',
    badge: 'General Purpose',
    specs: [
      'General purpose applications',
      'Advanced control features',
      'Energy-saving functions',
      'Multiple control modes',
      'Communication interfaces'
    ],
    features: [
      'Energy-saving operation',
      'Advanced control algorithms',
      'Multiple control modes',
      'Communication ready',
      'User-friendly operation'
    ]
  },
  'ls-starvert-ie5': {
    name: 'LS Starvert iE5 Series',
    description: 'Energy-efficient VFDs with advanced power-saving features and intelligent control for optimal performance.',
    image: 'assets/images/products/ls_industrial/vfd_series/LS_Starvert_iE5_-_VFD_medium.avif',
    badge: 'Energy Efficient',
    specs: [
      'Energy-efficient design',
      'Power-saving features',
      'Intelligent control',
      'Advanced algorithms',
      'Optimal performance'
    ],
    features: [
      'Maximum energy savings',
      'Intelligent control algorithms',
      'Advanced power management',
      'Optimal efficiency',
      'Smart operation'
    ]
  },
  'ls-starvert-ip5a': {
    name: 'LS Starvert iP5A Series',
    description: 'High-performance VFDs with premium features for demanding industrial applications requiring precise control.',
    image: 'assets/images/products/ls_industrial/vfd_series/Starvert_iP5A_medium.avif',
    badge: 'High Performance',
    specs: [
      'High-performance control',
      'Premium features',
      'Precise motor control',
      'Advanced diagnostics',
      'Industrial-grade design'
    ],
    features: [
      'Premium performance',
      'Precise control',
      'Advanced diagnostics',
      'Industrial reliability',
      'Enhanced features'
    ]
  },
  'ls-starvert-is7': {
    name: 'LS Starvert iS7 Series',
    description: 'Standard VFDs with reliable performance and essential features for general industrial motor control applications.',
    image: 'assets/images/products/ls_industrial/vfd_series/Starvert_S100_medium.avif',
    badge: 'Standard',
    specs: [
      'Standard performance',
      'Reliable operation',
      'Essential features',
      'General applications',
      'Cost-effective'
    ],
    features: [
      'Reliable performance',
      'Standard control functions',
      'Easy operation',
      'Cost-effective solution',
      'Wide application range'
    ]
  },
  'ls-lslv': {
    name: 'LS LSLV Series',
    description: 'Low voltage VFDs designed for specific applications with customized features and enhanced performance.',
    image: 'assets/images/products/ls_industrial/vfd_series/LS_Starvert_iE5_-_VFD_medium.avif',
    badge: 'Low Voltage',
    specs: [
      'Low voltage design',
      'Customized features',
      'Enhanced performance',
      'Specific applications',
      'Optimized control'
    ],
    features: [
      'Low voltage operation',
      'Customized functionality',
      'Enhanced performance',
      'Application-specific',
      'Optimized design'
    ]
  },
  'mitsubishi-mr-j': {
    name: 'Mitsubishi MR-J Servo Series',
    description: 'High-precision servo drives for motion control applications requiring exact positioning and speed control.',
    image: 'assets/images/products/mitsubishi/servo-motors/Mitsubishi_MELSERVO_J4_medium.avif',
    badge: 'Servo Drive',
    specs: [
      'High-precision control',
      'Servo motor drive',
      'Exact positioning',
      'Speed control',
      'Motion control applications'
    ],
    features: [
      'High precision positioning',
      'Advanced motion control',
      'Servo motor compatibility',
      'Real-time response',
      'Motion control ready'
    ]
  }
};

// Apply family definitions and calculate statistics
Object.keys(families).forEach(familyId => {
  const family = families[familyId];
  const definition = familyDefinitions[familyId];
  
  if (definition) {
    family.name = definition.name;
    family.description = definition.description;
    family.image = definition.image;
    family.badge = definition.badge;
    family.specs = definition.specs;
    family.features = definition.features;
  }
  
  // Calculate family statistics
  if (family.models.length > 0) {
    family.rating = Math.round((family.models.reduce((sum, model) => sum + model.rating, 0) / family.models.length) * 10) / 10;
    family.reviews = family.models.reduce((sum, model) => sum + model.reviews, 0);
    family.inStock = family.models.some(model => model.inStock);
  }
});

// Filter out families with no models
const validFamilies = Object.values(families).filter(family => family.models.length > 0);

// Generate output
console.log('VFD Product Families Generated:');
validFamilies.forEach(family => {
  console.log(`${family.brand} - ${family.name}: ${family.models.length} models`);
});

console.log(`\nTotal families: ${validFamilies.length}`);
console.log(`Total models: ${validFamilies.reduce((sum, family) => sum + family.models.length, 0)}`);

// Save the families data
const output = {
  vfdFamilies: validFamilies,
  generatedAt: new Date().toISOString(),
  totalFamilies: validFamilies.length,
  totalModels: validFamilies.reduce((sum, family) => sum + family.models.length, 0)
};

fs.writeFileSync('scraped_data/vfd_families_processed.json', JSON.stringify(output, null, 2));
console.log('\nVFD families data saved to scraped_data/vfd_families_processed.json');

// Generate TypeScript export for integration
const tsExport = `// Auto-generated VFD product families from scraped data
// Generated on: ${new Date().toISOString()}

import { ProductFamily } from '@/lib/utils/product-families'

export const scrapedVFDFamilies: ProductFamily[] = ${JSON.stringify(validFamilies, null, 2)};
`;

fs.writeFileSync('lib/data/scraped-vfd-families.ts', tsExport);
console.log('TypeScript export saved to lib/data/scraped-vfd-families.ts'); 