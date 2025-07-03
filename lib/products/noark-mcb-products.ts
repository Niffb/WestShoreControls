import { Product } from '@/lib/types/shared-types';

// Manually import B1N data to ensure compatibility with Next.js server components
// Instead of dynamic file reading, we'll import a JSON file directly
import b1nJsonData from '@/lib/data/noark/B1n.json';
// Import B1H data
import b1hJsonData from '@/lib/data/noark/B1h.json';

// Import the B1NQ products
import { noarkB1NQProducts } from './noark-b1nq-products';

// Convert B1N data to Product format
const convertB1NDataToProduct = () => {
  try {
    // Convert B1N data to Product format
    return (b1nJsonData as any[]).map((item: any, index: number) => {
      const id = 6000 + index;
      const model = item.model;
      const name = `${model} - ${item.rated_current} ${item.poles} ${item.trip_curve} MCB`;
      
      // Determine the image path based on model name
      let imagePath = '/assets/images/categories/Miniature Circuit Breakers/B1N Series Breakers.avif';
      
      // Use specific images for B1N products with 1Q or 2Q in their name
      if (model.includes('1Q')) {
        imagePath = '/B1NQ+1P.jpg';
      } else if (model.includes('2Q')) {
        imagePath = '/B1NQ+2P.jpg';
      }
      
      return {
        id,
        name,
        description: `${item.description} - ${item.series} - ${item.poles} - ${item.rated_current} - ${item.trip_curve} - ${item.rated_voltage} - ${item.interrupting_rating} - ${item.connections} - ${item.mounting}`,
        category: 'Miniature Circuit Breakers',
        brand: item.brand,
        model,
        rating: 4.7,
        reviews: Math.floor(Math.random() * 20) + 5, // Random number of reviews between 5 and 24
        specs: [
          `Series: ${item.series}`,
          `Current Rating: ${item.rated_current}`,
          `Pole Configuration: ${item.poles}`,
          `Trip Characteristic: ${item.trip_curve}`,
          `Voltage Rating: ${item.rated_voltage}`,
          `Interrupting Rating: ${item.interrupting_rating}`,
          `Connections: ${item.connections}`,
          `Mounting: ${item.mounting}`,
          item.equivalent_to ? `Equivalent to: ${item.equivalent_to}` : null,
        ].filter(Boolean),
        images: [imagePath],
        url: `/noark/circuit-protection/miniature-circuit-breakers/b1n/${model.toLowerCase()}`,
        inStock: true
      };
    });
  } catch (error) {
    console.error('Error processing B1N data:', error);
    return [];
  }
};

// Convert B1H data to Product format
const convertB1HDataToProduct = () => {
  try {
    return (b1hJsonData as any[]).map((item: any, index: number) => {
      const id = 6500 + index;
      const model = item.model;
      const name = `${model} - ${item.rated_current} ${item.poles} ${item.trip_curve} MCB`;

      return {
        id,
        name,
        description: `${item.description} - ${item.series} - ${item.poles} - ${item.rated_current} - ${item.trip_curve} - ${item.rated_voltage} - ${item.interrupting_rating} - ${item.connections} - ${item.mounting}`,
        category: 'Miniature Circuit Breakers',
        brand: item.brand,
        model,
        rating: 4.7,
        reviews: Math.floor(Math.random() * 20) + 5, // Random number of reviews between 5 and 24
        specs: [
          `Series: ${item.series}`,
          `Current Rating: ${item.rated_current}`,
          `Pole Configuration: ${item.poles}`,
          `Trip Characteristic: ${item.trip_curve}`,
          `Voltage Rating: ${item.rated_voltage}`,
          `Interrupting Rating: ${item.interrupting_rating}`,
          `Connections: ${item.connections}`,
          `Mounting: ${item.mounting}`,
          item.equivalent_to ? `Equivalent to: ${item.equivalent_to}` : null,
        ].filter(Boolean),
        images: ['/assets/images/categories/Miniature Circuit Breakers/B1H Series Breakers.avif'],
        url: `/noark/circuit-protection/miniature-circuit-breakers/b1h/${model.toLowerCase()}`,
        inStock: true
      };
    });
  } catch (error) {
    console.error('Error processing B1H data:', error);
    return [];
  }
};

// Convert B1N and B1H data to product arrays
const b1nProducts = convertB1NDataToProduct();
const b1hProducts = convertB1HDataToProduct();

// Main MCB Products
const noarkMCBData: Product[] = [
  // B1N Series Main Entry
  {
    id: 6100,
    name: 'B1N Series Miniature Circuit Breakers',
    description: 'B1N series Miniature Circuit Breakers (MCB) - UL 489 compliant. Available in 1-pole, 2-pole, and 3-pole configurations with B-curve, C-curve, and D-curve trip characteristics.',
    category: 'Miniature Circuit Breakers',
    brand: 'NOARK',
    model: 'B1N Series',
    rating: 4.8,
    reviews: 48,
    specs: [
      'Series: B1N',
      'Standard: UL 489',
      'Trip Curves: B, C, D',
      'Poles: 1P, 2P, 3P',
      'Rated Voltage: 240Vac (1P), 240Vac/125Vdc (2P), 240Vac (3P)',
      'Interrupting Rating: 10kA',
      'Connection Types: Box Lug, Ring Tongue',
      'Mounting: DIN Rail (35mm)'
    ],
    images: ['/assets/images/categories/Miniature Circuit Breakers/B1N Series Breakers.avif'],
    url: '/noark/circuit-protection/miniature-circuit-breakers/b1n',
    inStock: true,
    features: [
      'UL 489 Compliant',
      'Multiple pole configurations',
      'Three trip curve options (B, C, D)',
      'High interrupting capacity (10kA)',
      'Box lug or ring tongue connection options',
      'DIN rail mounting capability'
    ]
  },
  // B1H Series Main Entry
  {
    id: 6101,
    name: 'B1H Series Miniature Circuit Breakers',
    description: 'B1H series Miniature Circuit Breakers (MCB) - UL 1077 compliant. Available in 1-pole, 2-pole, and 3-pole configurations with B-curve, C-curve, and D-curve trip characteristics.',
    category: 'Miniature Circuit Breakers',
    brand: 'NOARK',
    model: 'B1H Series',
    rating: 4.7,
    reviews: 35,
    specs: [
      'Series: B1H',
      'Standard: UL 1077',
      'Trip Curves: B, C, D',
      'Poles: 1P, 2P, 3P',
      'Rated Voltage: 240Vac/60Vdc (1P), 415Vac/125Vdc (2P), 415Vac/125Vdc (3P)',
      'Interrupting Rating: 6kA',
      'Connection Types: Tunnel terminal',
      'Mounting: DIN Rail (35mm)'
    ],
    images: ['/assets/images/categories/Miniature Circuit Breakers/B1H Series Breakers.avif'],
    url: '/noark/circuit-protection/miniature-circuit-breakers/b1h',
    inStock: true,
    features: [
      'UL 1077 Compliant',
      'Multiple pole configurations',
      'Three trip curve options (B, C, D)',
      'High interrupting capacity (6kA)',
      'Tunnel terminal connections',
      'DIN rail mounting capability'
    ]
  }
];

// Combine existing MCB products with B1N, B1H, and B1NQ products
export const noarkMCBProducts: Product[] = [...noarkMCBData, ...b1nProducts, ...b1hProducts, ...noarkB1NQProducts];

// Series information
export const mcbSeries = [
  {
    name: 'B1N Series',
    description: 'Standard MCBs for AC applications',
    currentRange: '0.5A to 63A',
    breakingCapacity: '10kA at 240Vac',
    poles: '1, 2 & 3-pole',
    standards: 'UL 489, IEC 60898'
  },
  {
    name: 'B1H Series', 
    description: 'High voltage AC MCBs',
    currentRange: '0.5A to 32A',
    breakingCapacity: '10kA at 480Y/277Vac',
    poles: '1, 2 & 3-pole',
    standards: 'UL 489, IEC 60898'
  },
  {
    name: 'B1NQ Series',
    description: 'Split phase AC MCBs',
    currentRange: '0.5A to 63A', 
    breakingCapacity: '10kA at 120/240Vac',
    poles: '1 & 2-pole',
    standards: 'UL 489, IEC 60898'
  },
  {
    name: 'B1D Series',
    description: 'DC MCBs for solar/battery applications',
    currentRange: '0.5A to 63A',
    breakingCapacity: '10kA at 250Vdc',
    poles: '1 and 2-pole',
    standards: 'UL 489, IEC 60947-2'
  },
  {
    name: 'B1B Series',
    description: 'High voltage DC MCBs',
    currentRange: '25A to 63A',
    breakingCapacity: '10kA at 500Vdc/2-pole & 1000Vdc/4-pole',
    poles: '2 & 4-pole',
    standards: 'UL 489, IEC 60947-2'
  },
  {
    name: 'B1E Series',
    description: 'High current MCBs',
    currentRange: 'Up to 125A',
    breakingCapacity: '5kA at 480Y/277Vac and 10kA at 240Vac, 10kA at 220Vdc (B1E 80~125A 2-Pole)',
    poles: '1, 2, 3 and 4-pole',
    standards: 'UL 489, IEC 60898'
  },
  {
    name: 'Ex9BP Series',
    description: 'High voltage DC MCBs for solar applications',
    currentRange: '10-63A',
    breakingCapacity: '6kA at 600Vdc',
    poles: '2 & 4-pole',
    standards: 'UL 489, IEC 60947-2'
  },
  {
    name: 'Ex9BN Series',
    description: 'Standard miniature circuit breakers for residential and commercial applications',
    currentRange: '15-63A',
    tripCharacteristics: 'Type B, C, D',
    breakingCapacity: '6kA at 415V AC',
    standards: 'UL 489, IEC 60898'
  }
];

// Helper functions
export const getMCBProductsByCharacteristic = (characteristic: string): Product[] => {
  return noarkMCBProducts.filter(product => 
    product.specs?.some(spec => spec.toLowerCase().includes(`trip characteristic: type ${characteristic.toLowerCase()}`))
  );
};

export const getMCBProductsByPoles = (poles: string): Product[] => {
  return noarkMCBProducts.filter(product => 
    product.specs?.some(spec => spec.toLowerCase().includes(`pole configuration: ${poles.toLowerCase()}`))
  );
};

export const getMCBProductsByCurrentRange = (minCurrent: number, maxCurrent: number): Product[] => {
  return noarkMCBProducts.filter(product => {
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

// Export total count for brand page
export const totalMCBProducts = noarkMCBProducts.length;

console.log(`Generated ${totalMCBProducts} MCB products for Noark Ex9BN series`); 