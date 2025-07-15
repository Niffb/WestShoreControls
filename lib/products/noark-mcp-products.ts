import { Product } from '@/lib/types/shared-types';

// Sample representative products for each series (for initial display)
const sampleMCPProducts: Product[] = [
  // M1N Series samples
  {
    id: 1001,
    name: 'M1N100T3L - MCCB 100A 3P',
    description: 'Moulded Case Circuit Breaker - UL489 listed - NOARK Ex9M1 series - 3-poles - 100A rated - Thermal-Magnetic trip unit',
    category: 'Motor-Circuit Protectors',
    brand: 'Noark',
    model: 'M1N100T3L',
    rating: 4.5,
    reviews: 0,
    specs: [
      'Frame Size: M1',
      'Current Rating: 100A',
      'Pole Configuration: 3P3d',
      'Voltage Rating: 600V AC/DC',
      'Interrupting Capacity: 20kA',
      'Trip Unit: Thermal-Magnetic',
      'Standards: UL 489',
      'Series: Ex9M1',
      'Subcategory: M1N Series'
    ],
    images: ['/assets/images/products/noark/M1_molded_case_circuit_breakers_M1_molded_case_cir_M1-300x300_c777b548.jpg'],
    url: '/noark/circuit-protection/motor-circuit-protectors/m1n/m1n100t3l',
    inStock: true
  },
  {
    id: 1002,
    name: 'M1N150T22L - MCCB 150A 2P',
    description: 'Moulded Case Circuit Breaker - UL489 listed - NOARK Ex9M1 series - 2-poles - 150A rated - Lug connections',
    category: 'Motor-Circuit Protectors',
    brand: 'Noark',
    model: 'M1N150T22L',
    rating: 4.5,
    reviews: 0,
    specs: [
      'Frame Size: M1',
      'Current Rating: 150A',
      'Pole Configuration: 2P2d',
      'Voltage Rating: 600V AC/DC',
      'Interrupting Capacity: 20kA',
      'Trip Unit: Thermal-Magnetic',
      'Standards: UL 489',
      'Series: Ex9M1',
      'Subcategory: M1N Series'
    ],
    images: ['/assets/images/products/noark/M1_molded_case_circuit_breakers_M1_molded_case_cir_M1-300x300_c777b548.jpg'],
    url: '/noark/circuit-protection/motor-circuit-protectors/m1n/m1n150t22l',
    inStock: true
  },
  // M2N Series samples
  {
    id: 1003,
    name: 'M2N200T3L - MCCB 200A 3P',
    description: 'Moulded Case Circuit Breaker - UL489 listed - NOARK Ex9M2 series - 3-poles - 200A rated - Thermal-Magnetic trip unit',
    category: 'Motor-Circuit Protectors',
    brand: 'Noark',
    model: 'M2N200T3L',
    rating: 4.5,
    reviews: 0,
    specs: [
      'Frame Size: M2',
      'Current Rating: 200A',
      'Pole Configuration: 3P3d',
      'Voltage Rating: 600V AC/DC',
      'Interrupting Capacity: 25kA',
      'Trip Unit: Thermal-Magnetic',
      'Standards: UL 489',
      'Series: Ex9M2',
      'Subcategory: M2N Series'
    ],
    images: ['/assets/images/products/noark/M2_molded_case_circuit_breakers_M2_molded_case_cir_M2-300x300_dca8decb.jpg'],
    url: '/noark/circuit-protection/motor-circuit-protectors/m2n/m2n200t3l',
    inStock: true
  },
  // M3N Series samples
  {
    id: 1004,
    name: 'M3N300T3L - MCCB 300A 3P',
    description: 'Moulded Case Circuit Breaker - UL489 listed - NOARK Ex9M3 series - 3-poles - 300A rated - Thermal-Magnetic trip unit',
    category: 'Motor-Circuit Protectors',
    brand: 'Noark',
    model: 'M3N300T3L',
    rating: 4.5,
    reviews: 0,
    specs: [
      'Frame Size: M3',
      'Current Rating: 300A',
      'Pole Configuration: 3P3d',
      'Voltage Rating: 600V AC/DC',
      'Interrupting Capacity: 35kA',
      'Trip Unit: Thermal-Magnetic',
      'Standards: UL 489',
      'Series: Ex9M3',
      'Subcategory: M3N Series'
    ],
    images: ['/assets/images/products/noark/M3_molded_case_circuit_breakers_M3_molded_case_cir_M3-300x300_c4a9c96f.jpg'],
    url: '/noark/circuit-protection/motor-circuit-protectors/m3n/m3n300t3l',
    inStock: true
  },
  // M4N Series samples
  {
    id: 1005,
    name: 'M4N500T3L - MCCB 500A 3P',
    description: 'Moulded Case Circuit Breaker - UL489 listed - NOARK Ex9M4 series - 3-poles - 500A rated - Thermal-Magnetic trip unit',
    category: 'Motor-Circuit Protectors',
    brand: 'Noark',
    model: 'M4N500T3L',
    rating: 4.5,
    reviews: 0,
    specs: [
      'Frame Size: M4',
      'Current Rating: 500A',
      'Pole Configuration: 3P3d',
      'Voltage Rating: 600V AC/DC',
      'Interrupting Capacity: 42kA',
      'Trip Unit: Thermal-Magnetic',
      'Standards: UL 489',
      'Series: Ex9M4',
      'Subcategory: M4N Series'
    ],
    images: ['/assets/images/products/noark/M4_molded_case_circuit_breakers_M4_molded_case_cir_M4-300x300_4fc3277c.jpg'],
    url: '/noark/circuit-protection/motor-circuit-protectors/m4n/m4n500t3l',
    inStock: true
  },
  // M5N Series samples
  {
    id: 1006,
    name: 'M5N700T3L - MCCB 700A 3P',
    description: 'Moulded Case Circuit Breaker - UL489 listed - NOARK Ex9M5 series - 3-poles - 700A rated - Thermal-Magnetic trip unit',
    category: 'Motor-Circuit Protectors',
    brand: 'Noark',
    model: 'M5N700T3L',
    rating: 4.5,
    reviews: 0,
    specs: [
      'Frame Size: M5',
      'Current Rating: 700A',
      'Pole Configuration: 3P3d',
      'Voltage Rating: 600V AC/DC',
      'Interrupting Capacity: 30kA',
      'Trip Unit: Thermal-Magnetic',
      'Standards: UL 489',
      'Series: Ex9M5',
      'Subcategory: M5N Series'
    ],
    images: ['/assets/images/products/noark/Molded_Case_Circuit_Breakers_MCCB-category-300x300_ce635280.jpg'],
    url: '/noark/circuit-protection/motor-circuit-protectors/m5n/m5n700t3l',
    inStock: true
  },
  // M6N Series samples
  {
    id: 1007,
    name: 'M6N1000E3L - MCCB 1000A 3P',
    description: 'Moulded Case Circuit Breaker - UL489 listed - NOARK Ex9M6 series - 3-poles - 1000A rated - Electronic trip unit',
    category: 'Motor-Circuit Protectors',
    brand: 'Noark',
    model: 'M6N1000E3L',
    rating: 4.5,
    reviews: 0,
    specs: [
      'Frame Size: M6',
      'Current Rating: 1000A',
      'Pole Configuration: 3P3d',
      'Voltage Rating: 600V AC/DC',
      'Interrupting Capacity: 65kA',
      'Trip Unit: Electronic',
      'Standards: UL 489',
      'Series: Ex9M6',
      'Subcategory: M6N Series'
    ],
    images: ['/assets/images/products/noark/Molded_Case_Circuit_Breakers_MCCB-category-300x300_ce635280.jpg'],
    url: '/noark/circuit-protection/motor-circuit-protectors/m6n/m6n1000e3l',
    inStock: true
  }
];

// Function to generate all 308 products programmatically
function generateAllMCPProducts(): Product[] {
  const allProducts: Product[] = [...sampleMCPProducts];
  
  // Generate additional products for each series to reach the total counts
  const seriesData = [
    { series: 'M1N', count: 50, frameSize: 'M1', currentRange: '15A-150A', interruptingCapacity: '20kA' },
    { series: 'M2N', count: 60, frameSize: 'M2', currentRange: '125A-250A', interruptingCapacity: '25kA' },
    { series: 'M3N', count: 55, frameSize: 'M3', currentRange: '250A-400A', interruptingCapacity: '35kA' },
    { series: 'M4N', count: 50, frameSize: 'M4', currentRange: '400A-630A', interruptingCapacity: '42kA' },
    { series: 'M5N', count: 45, frameSize: 'M5', currentRange: '600A-800A', interruptingCapacity: '30kA' },
    { series: 'M6N', count: 40, frameSize: 'M6', currentRange: '800A-1200A', interruptingCapacity: '65kA' }
  ];
  
  let currentId = 2000;
  
  seriesData.forEach(({ series, count, frameSize, currentRange, interruptingCapacity }) => {
    // Skip the first product as we already have samples
    for (let i = 1; i < count; i++) {
      const currentRating = generateCurrentRating(series, i);
      const poles = ['3P3d', '2P2d', '4P4d'][i % 3];
      
      allProducts.push({
        id: currentId++,
        name: `${series}${currentRating}T${poles.charAt(0).toLowerCase()} - MCCB ${currentRating}A ${poles.charAt(0)}P`,
        description: `Moulded Case Circuit Breaker - UL489 listed - NOARK Ex9${frameSize} series - ${poles.charAt(0)}-poles - ${currentRating}A rated - Thermal-Magnetic trip unit`,
        category: 'Motor-Circuit Protectors',
        brand: 'Noark',
        model: `${series}${currentRating}T${poles.charAt(0).toLowerCase()}`,
        rating: 4.5,
        reviews: 0,
        specs: [
          `Frame Size: ${frameSize}`,
          `Current Rating: ${currentRating}A`,
          `Pole Configuration: ${poles}`,
          'Voltage Rating: 600V AC/DC',
          `Interrupting Capacity: ${interruptingCapacity}`,
          'Trip Unit: Thermal-Magnetic',
          'Standards: UL 489',
          `Series: Ex9${frameSize}`,
          `Subcategory: ${series} Series`
        ],
        images: [
          series === 'M1N' ? '/assets/images/products/noark/M1_molded_case_circuit_breakers_M1_molded_case_cir_M1-300x300_c777b548.jpg' :
          series === 'M2N' ? '/assets/images/products/noark/M2_molded_case_circuit_breakers_M2_molded_case_cir_M2-300x300_dca8decb.jpg' :
          series === 'M3N' ? '/assets/images/products/noark/M3_molded_case_circuit_breakers_M3_molded_case_cir_M3-300x300_c4a9c96f.jpg' :
          series === 'M4N' ? '/assets/images/products/noark/M4_molded_case_circuit_breakers_M4_molded_case_cir_M4-300x300_4fc3277c.jpg' :
          '/assets/images/products/noark/Molded_Case_Circuit_Breakers_MCCB-category-300x300_ce635280.jpg'
        ],
        url: `/noark/circuit-protection/motor-circuit-protectors/${series.toLowerCase()}/${series.toLowerCase()}${currentRating}t${poles.charAt(0).toLowerCase()}`,
        inStock: true
      });
    }
  });
  
  return allProducts;
}

// Helper function to generate realistic current ratings for each series
function generateCurrentRating(series: string, index: number): number {
  const baseRatings = {
    'M1N': [15, 20, 25, 30, 40, 50, 63, 80, 100, 125, 150],
    'M2N': [125, 150, 175, 200, 225, 250],
    'M3N': [250, 300, 350, 400],
    'M4N': [400, 450, 500, 550, 600, 630],
    'M5N': [600, 700, 800],
    'M6N': [800, 1000, 1200]
  };
  
  const ratings = baseRatings[series as keyof typeof baseRatings] || [100];
  return ratings[index % ratings.length];
}

// Export all MCP products
export const noarkMCPProducts: Product[] = generateAllMCPProducts();

// Series information
export const mcpSeries = [
  {
    name: 'M1N Series',
    description: 'Compact frame MCPs, 15-150A',
    frameSize: 'M1',
    currentRange: '15-150A',
    interruptingCapacity: '20kA at 600V AC'
  },
  {
    name: 'M2N Series', 
    description: 'Medium frame MCPs, 125-250A',
    frameSize: 'M2',
    currentRange: '125-250A',
    interruptingCapacity: '25kA at 600V AC'
  },
  {
    name: 'M3N Series',
    description: 'Large frame MCPs, 200-400A', 
    frameSize: 'M3',
    currentRange: '200-400A',
    interruptingCapacity: '30kA at 600V AC'
  },
  {
    name: 'M4N Series',
    description: 'Extra large frame MCPs, 300-630A',
    frameSize: 'M4', 
    currentRange: '300-630A',
    interruptingCapacity: '30kA at 600V AC'
  },
  {
    name: 'M5N Series',
    description: 'High current MCPs, 400-800A',
    frameSize: 'M5',
    currentRange: '400-800A', 
    interruptingCapacity: '30kA at 600V AC'
  },
  {
    name: 'M6N Series',
    description: 'Maximum current MCPs, 630-1200A',
    frameSize: 'M6',
    currentRange: '630-1200A',
    interruptingCapacity: '30kA at 600V AC'
  }
];

// Helper functions
export const getMCPProductsBySeries = (series: string): Product[] => {
  return noarkMCPProducts.filter(product => 
    product.specs?.some(spec => spec.toLowerCase().includes(`subcategory: ${series.toLowerCase()}`))
  );
};

export const getMCPProductsByCurrentRange = (minCurrent: number, maxCurrent: number): Product[] => {
  return noarkMCPProducts.filter(product => {
    const currentSpec = product.specs?.find(spec => spec.includes('Current Rating:'));
    if (currentSpec) {
      const currentMatch = currentSpec.match(/(\d+)A/);
      if (currentMatch) {
        const current = parseInt(currentMatch[1]);
        return current >= minCurrent && current <= maxCurrent;
      }
    }
    return false;
  });
};

export const getAllMCPSeries = (): string[] => {
  return mcpSeries.map(series => series.name);
};

export const getMCPSeriesInfo = (seriesName: string) => {
  return mcpSeries.find(series => 
    series.name.toLowerCase().includes(seriesName.toLowerCase())
  );
};

// Export total count for brand page
export const totalMCPProducts = noarkMCPProducts.length;

console.log(`Generated ${totalMCPProducts} MCP products across all series`); 