import { Product } from '@/lib/types/shared-types';

// Manually import B1N data to ensure compatibility with Next.js server components
// Instead of dynamic file reading, we'll import a JSON file directly
import b1nJsonData from '@/lib/data/noark/B1n.json';
// Import B1H data
import b1hJsonData from '@/lib/data/noark/B1h.json';

// Convert B1N data to Product format
const convertB1NDataToProduct = () => {
  try {
    // Convert B1N data to Product format
    return (b1nJsonData as any[]).map((item: any, index: number) => {
      const id = 6000 + index;
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
        images: ['/assets/images/categories/Miniature Circuit Breakers/B1N Series Breakers.avif'],
        url: `/noark/circuit-protection/miniature-circuit-breakers/b1n/${model.toLowerCase()}`,
        inStock: true
      };
    });
  } catch (error) {
    console.error("Error converting B1N data:", error);
    return [];
  }
};

// Convert B1H data to Product format
const convertB1HDataToProduct = () => {
  try {
    // Convert B1H data to Product format
    return (b1hJsonData as any[]).map((item: any, index: number) => {
      const id = 7000 + index;
      const model = item.model;
      const name = `${model} - ${item.rated_current} ${item.poles} ${item.trip_curve} MCB`;
      
      return {
        id,
        name,
        description: `${item.description} - ${item.series} - ${item.poles} - ${item.rated_current} - ${item.trip_curve} - ${item.rated_voltage} - ${item.interrupting_rating} - ${item.connections} - ${item.mounting}`,
        category: 'Miniature Circuit Breakers',
        brand: item.brand,
        model,
        rating: 4.6,
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
    console.error("Error converting B1H data:", error);
    return [];
  }
};

// Noark Miniature Circuit Breakers (MCBs) - Typically 15A-125A range
const noarkMCBData: Product[] = [
  // Ex9BN Series - Standard Miniature Circuit Breakers
  {
    id: 4001,
    name: 'Ex9BN-15A-1P-C - MCB 15A 1-Pole Type C',
    description: 'Miniature Circuit Breaker - Ex9BN Series - 1-pole - 15A rated - Type C characteristic - 240/415V AC - DIN rail mounting - UL Listed',
    category: 'Miniature Circuit Breakers',
    brand: 'Noark',
    model: 'Ex9BN-15A-1P-C',
    rating: 4.6,
    reviews: 23,
    specs: [
      'Series: Ex9BN',
      'Current Rating: 15A',
      'Pole Configuration: 1-Pole',
      'Trip Characteristic: Type C',
      'Voltage Rating: 240/415V AC',
      'Breaking Capacity: 6kA',
      'Standards: UL 489, IEC 60898',
      'Mounting: DIN Rail',
      'Type: Miniature Circuit Breaker'
    ],
    images: ['/assets/images/categories/Miniature Circuit Breakers/Miniature Circuit Breakers.avif'],
    url: '/noark/circuit-protection/miniature-circuit-breakers/ex9bn/ex9bn-15a-1p-c',
    inStock: true
  },
  {
    id: 4002,
    name: 'Ex9BN-20A-1P-C - MCB 20A 1-Pole Type C',
    description: 'Miniature Circuit Breaker - Ex9BN Series - 1-pole - 20A rated - Type C characteristic - 240/415V AC - DIN rail mounting - UL Listed',
    category: 'Miniature Circuit Breakers',
    brand: 'Noark',
    model: 'Ex9BN-20A-1P-C',
    rating: 4.6,
    reviews: 18,
    specs: [
      'Series: Ex9BN',
      'Current Rating: 20A',
      'Pole Configuration: 1-Pole',
      'Trip Characteristic: Type C',
      'Voltage Rating: 240/415V AC',
      'Breaking Capacity: 6kA',
      'Standards: UL 489, IEC 60898',
      'Mounting: DIN Rail',
      'Type: Miniature Circuit Breaker'
    ],
    images: ['/assets/images/categories/Miniature Circuit Breakers/Miniature Circuit Breakers (1).avif'],
    url: '/noark/circuit-protection/miniature-circuit-breakers/ex9bn/ex9bn-20a-1p-c',
    inStock: true
  },
  {
    id: 4003,
    name: 'Ex9BN-25A-1P-C - MCB 25A 1-Pole Type C',
    description: 'Miniature Circuit Breaker - Ex9BN Series - 1-pole - 25A rated - Type C characteristic - 240/415V AC - DIN rail mounting - UL Listed',
    category: 'Miniature Circuit Breakers',
    brand: 'Noark',
    model: 'Ex9BN-25A-1P-C',
    rating: 4.6,
    reviews: 31,
    specs: [
      'Series: Ex9BN',
      'Current Rating: 25A',
      'Pole Configuration: 1-Pole',
      'Trip Characteristic: Type C',
      'Voltage Rating: 240/415V AC',
      'Breaking Capacity: 6kA',
      'Standards: UL 489, IEC 60898',
      'Mounting: DIN Rail',
      'Type: Miniature Circuit Breaker'
    ],
    images: ['/assets/images/categories/Miniature Circuit Breakers/Miniature Circuit Breakers (2).avif'],
    url: '/noark/circuit-protection/miniature-circuit-breakers/ex9bn/ex9bn-25a-1p-c',
    inStock: true
  },
  {
    id: 4004,
    name: 'Ex9BN-32A-1P-C - MCB 32A 1-Pole Type C',
    description: 'Miniature Circuit Breaker - Ex9BN Series - 1-pole - 32A rated - Type C characteristic - 240/415V AC - DIN rail mounting - UL Listed',
    category: 'Miniature Circuit Breakers',
    brand: 'Noark',
    model: 'Ex9BN-32A-1P-C',
    rating: 4.6,
    reviews: 27,
    specs: [
      'Series: Ex9BN',
      'Current Rating: 32A',
      'Pole Configuration: 1-Pole',
      'Trip Characteristic: Type C',
      'Voltage Rating: 240/415V AC',
      'Breaking Capacity: 6kA',
      'Standards: UL 489, IEC 60898',
      'Mounting: DIN Rail',
      'Type: Miniature Circuit Breaker'
    ],
    images: ['/assets/images/categories/Miniature Circuit Breakers/Miniature Circuit Breakers (3).avif'],
    url: '/noark/circuit-protection/miniature-circuit-breakers/ex9bn/ex9bn-32a-1p-c',
    inStock: true
  },
  {
    id: 4005,
    name: 'Ex9BN-40A-1P-C - MCB 40A 1-Pole Type C',
    description: 'Miniature Circuit Breaker - Ex9BN Series - 1-pole - 40A rated - Type C characteristic - 240/415V AC - DIN rail mounting - UL Listed',
    category: 'Miniature Circuit Breakers',
    brand: 'Noark',
    model: 'Ex9BN-40A-1P-C',
    rating: 4.6,
    reviews: 35,
    specs: [
      'Series: Ex9BN',
      'Current Rating: 40A',
      'Pole Configuration: 1-Pole',
      'Trip Characteristic: Type C',
      'Voltage Rating: 240/415V AC',
      'Breaking Capacity: 6kA',
      'Standards: UL 489, IEC 60898',
      'Mounting: DIN Rail',
      'Type: Miniature Circuit Breaker'
    ],
    images: ['/assets/images/categories/Miniature Circuit Breakers/Miniature Circuit Breakers (4).avif'],
    url: '/noark/circuit-protection/miniature-circuit-breakers/ex9bn/ex9bn-40a-1p-c',
    inStock: true
  },
  {
    id: 4006,
    name: 'Ex9BN-50A-1P-C - MCB 50A 1-Pole Type C',
    description: 'Miniature Circuit Breaker - Ex9BN Series - 1-pole - 50A rated - Type C characteristic - 240/415V AC - DIN rail mounting - UL Listed',
    category: 'Miniature Circuit Breakers',
    brand: 'Noark',
    model: 'Ex9BN-50A-1P-C',
    rating: 4.6,
    reviews: 42,
    specs: [
      'Series: Ex9BN',
      'Current Rating: 50A',
      'Pole Configuration: 1-Pole',
      'Trip Characteristic: Type C',
      'Voltage Rating: 240/415V AC',
      'Breaking Capacity: 6kA',
      'Standards: UL 489, IEC 60898',
      'Mounting: DIN Rail',
      'Type: Miniature Circuit Breaker'
    ],
    images: ['/assets/images/categories/Miniature Circuit Breakers/Miniature Circuit Breakers (5).avif'],
    url: '/noark/circuit-protection/miniature-circuit-breakers/ex9bn/ex9bn-50a-1p-c',
    inStock: true
  },
  {
    id: 4007,
    name: 'Ex9BN-63A-1P-C - MCB 63A 1-Pole Type C',
    description: 'Miniature Circuit Breaker - Ex9BN Series - 1-pole - 63A rated - Type C characteristic - 240/415V AC - DIN rail mounting - UL Listed',
    category: 'Miniature Circuit Breakers',
    brand: 'Noark',
    model: 'Ex9BN-63A-1P-C',
    rating: 4.6,
    reviews: 38,
    specs: [
      'Series: Ex9BN',
      'Current Rating: 63A',
      'Pole Configuration: 1-Pole',
      'Trip Characteristic: Type C',
      'Voltage Rating: 240/415V AC',
      'Breaking Capacity: 6kA',
      'Standards: UL 489, IEC 60898',
      'Mounting: DIN Rail',
      'Type: Miniature Circuit Breaker'
    ],
    images: ['/assets/images/categories/Miniature Circuit Breakers/Miniature Circuit Breakers (6).avif'],
    url: '/noark/circuit-protection/miniature-circuit-breakers/ex9bn/ex9bn-63a-1p-c',
    inStock: true
  },
  // 2-Pole variants
  {
    id: 4008,
    name: 'Ex9BN-15A-2P-C - MCB 15A 2-Pole Type C',
    description: 'Miniature Circuit Breaker - Ex9BN Series - 2-pole - 15A rated - Type C characteristic - 240/415V AC - DIN rail mounting - UL Listed',
    category: 'Miniature Circuit Breakers',
    brand: 'Noark',
    model: 'Ex9BN-15A-2P-C',
    rating: 4.6,
    reviews: 29,
    specs: [
      'Series: Ex9BN',
      'Current Rating: 15A',
      'Pole Configuration: 2-Pole',
      'Trip Characteristic: Type C',
      'Voltage Rating: 240/415V AC',
      'Breaking Capacity: 6kA',
      'Standards: UL 489, IEC 60898',
      'Mounting: DIN Rail',
      'Type: Miniature Circuit Breaker'
    ],
    images: ['/assets/images/categories/Miniature Circuit Breakers/Miniature Circuit Breakers.avif'],
    url: '/noark/circuit-protection/miniature-circuit-breakers/ex9bn/ex9bn-15a-2p-c',
    inStock: true
  },
  {
    id: 4009,
    name: 'Ex9BN-20A-2P-C - MCB 20A 2-Pole Type C',
    description: 'Miniature Circuit Breaker - Ex9BN Series - 2-pole - 20A rated - Type C characteristic - 240/415V AC - DIN rail mounting - UL Listed',
    category: 'Miniature Circuit Breakers',
    brand: 'Noark',
    model: 'Ex9BN-20A-2P-C',
    rating: 4.6,
    reviews: 33,
    specs: [
      'Series: Ex9BN',
      'Current Rating: 20A',
      'Pole Configuration: 2-Pole',
      'Trip Characteristic: Type C',
      'Voltage Rating: 240/415V AC',
      'Breaking Capacity: 6kA',
      'Standards: UL 489, IEC 60898',
      'Mounting: DIN Rail',
      'Type: Miniature Circuit Breaker'
    ],
    images: ['/assets/images/categories/Miniature Circuit Breakers/Miniature Circuit Breakers (1).avif'],
    url: '/noark/circuit-protection/miniature-circuit-breakers/ex9bn/ex9bn-20a-2p-c',
    inStock: true
  },
  {
    id: 4010,
    name: 'Ex9BN-25A-2P-C - MCB 25A 2-Pole Type C',
    description: 'Miniature Circuit Breaker - Ex9BN Series - 2-pole - 25A rated - Type C characteristic - 240/415V AC - DIN rail mounting - UL Listed',
    category: 'Miniature Circuit Breakers',
    brand: 'Noark',
    model: 'Ex9BN-25A-2P-C',
    rating: 4.6,
    reviews: 26,
    specs: [
      'Series: Ex9BN',
      'Current Rating: 25A',
      'Pole Configuration: 2-Pole',
      'Trip Characteristic: Type C',
      'Voltage Rating: 240/415V AC',
      'Breaking Capacity: 6kA',
      'Standards: UL 489, IEC 60898',
      'Mounting: DIN Rail',
      'Type: Miniature Circuit Breaker'
    ],
    images: ['/assets/images/categories/Miniature Circuit Breakers/Miniature Circuit Breakers (2).avif'],
    url: '/noark/circuit-protection/miniature-circuit-breakers/ex9bn/ex9bn-25a-2p-c',
    inStock: true
  },
  {
    id: 4011,
    name: 'Ex9BN-32A-2P-C - MCB 32A 2-Pole Type C',
    description: 'Miniature Circuit Breaker - Ex9BN Series - 2-pole - 32A rated - Type C characteristic - 240/415V AC - DIN rail mounting - UL Listed',
    category: 'Miniature Circuit Breakers',
    brand: 'Noark',
    model: 'Ex9BN-32A-2P-C',
    rating: 4.6,
    reviews: 31,
    specs: [
      'Series: Ex9BN',
      'Current Rating: 32A',
      'Pole Configuration: 2-Pole',
      'Trip Characteristic: Type C',
      'Voltage Rating: 240/415V AC',
      'Breaking Capacity: 6kA',
      'Standards: UL 489, IEC 60898',
      'Mounting: DIN Rail',
      'Type: Miniature Circuit Breaker'
    ],
    images: ['/assets/images/categories/Miniature Circuit Breakers/Miniature Circuit Breakers (3).avif'],
    url: '/noark/circuit-protection/miniature-circuit-breakers/ex9bn/ex9bn-32a-2p-c',
    inStock: true
  },
  // 3-Pole variants
  {
    id: 4012,
    name: 'Ex9BN-15A-3P-C - MCB 15A 3-Pole Type C',
    description: 'Miniature Circuit Breaker - Ex9BN Series - 3-pole - 15A rated - Type C characteristic - 240/415V AC - DIN rail mounting - UL Listed',
    category: 'Miniature Circuit Breakers',
    brand: 'Noark',
    model: 'Ex9BN-15A-3P-C',
    rating: 4.6,
    reviews: 44,
    specs: [
      'Series: Ex9BN',
      'Current Rating: 15A',
      'Pole Configuration: 3-Pole',
      'Trip Characteristic: Type C',
      'Voltage Rating: 240/415V AC',
      'Breaking Capacity: 6kA',
      'Standards: UL 489, IEC 60898',
      'Mounting: DIN Rail',
      'Type: Miniature Circuit Breaker'
    ],
    images: ['/assets/images/categories/Miniature Circuit Breakers/Miniature Circuit Breakers (4).avif'],
    url: '/noark/circuit-protection/miniature-circuit-breakers/ex9bn/ex9bn-15a-3p-c',
    inStock: true
  },
  {
    id: 4013,
    name: 'Ex9BN-20A-3P-C - MCB 20A 3-Pole Type C',
    description: 'Miniature Circuit Breaker - Ex9BN Series - 3-pole - 20A rated - Type C characteristic - 240/415V AC - DIN rail mounting - UL Listed',
    category: 'Miniature Circuit Breakers',
    brand: 'Noark',
    model: 'Ex9BN-20A-3P-C',
    rating: 4.6,
    reviews: 37,
    specs: [
      'Series: Ex9BN',
      'Current Rating: 20A',
      'Pole Configuration: 3-Pole',
      'Trip Characteristic: Type C',
      'Voltage Rating: 240/415V AC',
      'Breaking Capacity: 6kA',
      'Standards: UL 489, IEC 60898',
      'Mounting: DIN Rail',
      'Type: Miniature Circuit Breaker'
    ],
    images: ['/assets/images/categories/Miniature Circuit Breakers/Miniature Circuit Breakers (5).avif'],
    url: '/noark/circuit-protection/miniature-circuit-breakers/ex9bn/ex9bn-20a-3p-c',
    inStock: true
  },
  {
    id: 4014,
    name: 'Ex9BN-25A-3P-C - MCB 25A 3-Pole Type C',
    description: 'Miniature Circuit Breaker - Ex9BN Series - 3-pole - 25A rated - Type C characteristic - 240/415V AC - DIN rail mounting - UL Listed',
    category: 'Miniature Circuit Breakers',
    brand: 'Noark',
    model: 'Ex9BN-25A-3P-C',
    rating: 4.6,
    reviews: 52,
    specs: [
      'Series: Ex9BN',
      'Current Rating: 25A',
      'Pole Configuration: 3-Pole',
      'Trip Characteristic: Type C',
      'Voltage Rating: 240/415V AC',
      'Breaking Capacity: 6kA',
      'Standards: UL 489, IEC 60898',
      'Mounting: DIN Rail',
      'Type: Miniature Circuit Breaker'
    ],
    images: ['/assets/images/categories/Miniature Circuit Breakers/Miniature Circuit Breakers (6).avif'],
    url: '/noark/circuit-protection/miniature-circuit-breakers/ex9bn/ex9bn-25a-3p-c',
    inStock: true
  },
  {
    id: 4015,
    name: 'Ex9BN-32A-3P-C - MCB 32A 3-Pole Type C',
    description: 'Miniature Circuit Breaker - Ex9BN Series - 3-pole - 32A rated - Type C characteristic - 240/415V AC - DIN rail mounting - UL Listed',
    category: 'Miniature Circuit Breakers',
    brand: 'Noark',
    model: 'Ex9BN-32A-3P-C',
    rating: 4.6,
    reviews: 48,
    specs: [
      'Series: Ex9BN',
      'Current Rating: 32A',
      'Pole Configuration: 3-Pole',
      'Trip Characteristic: Type C',
      'Voltage Rating: 240/415V AC',
      'Breaking Capacity: 6kA',
      'Standards: UL 489, IEC 60898',
      'Mounting: DIN Rail',
      'Type: Miniature Circuit Breaker'
    ],
    images: ['/assets/images/categories/Miniature Circuit Breakers/Miniature Circuit Breakers.avif'],
    url: '/noark/circuit-protection/miniature-circuit-breakers/ex9bn/ex9bn-32a-3p-c',
    inStock: true
  },
  // Type B variants (sensitive to small overloads)
  {
    id: 4016,
    name: 'Ex9BN-15A-1P-B - MCB 15A 1-Pole Type B',
    description: 'Miniature Circuit Breaker - Ex9BN Series - 1-pole - 15A rated - Type B characteristic - 240/415V AC - DIN rail mounting - UL Listed',
    category: 'Miniature Circuit Breakers',
    brand: 'Noark',
    model: 'Ex9BN-15A-1P-B',
    rating: 4.6,
    reviews: 19,
    specs: [
      'Series: Ex9BN',
      'Current Rating: 15A',
      'Pole Configuration: 1-Pole',
      'Trip Characteristic: Type B',
      'Voltage Rating: 240/415V AC',
      'Breaking Capacity: 6kA',
      'Standards: UL 489, IEC 60898',
      'Mounting: DIN Rail',
      'Type: Miniature Circuit Breaker'
    ],
    images: ['/assets/images/categories/Miniature Circuit Breakers/Miniature Circuit Breakers (1).avif'],
    url: '/noark/circuit-protection/miniature-circuit-breakers/ex9bn/ex9bn-15a-1p-b',
    inStock: true
  },
  {
    id: 4017,
    name: 'Ex9BN-20A-1P-B - MCB 20A 1-Pole Type B',
    description: 'Miniature Circuit Breaker - Ex9BN Series - 1-pole - 20A rated - Type B characteristic - 240/415V AC - DIN rail mounting - UL Listed',
    category: 'Miniature Circuit Breakers',
    brand: 'Noark',
    model: 'Ex9BN-20A-1P-B',
    rating: 4.6,
    reviews: 24,
    specs: [
      'Series: Ex9BN',
      'Current Rating: 20A',
      'Pole Configuration: 1-Pole',
      'Trip Characteristic: Type B',
      'Voltage Rating: 240/415V AC',
      'Breaking Capacity: 6kA',
      'Standards: UL 489, IEC 60898',
      'Mounting: DIN Rail',
      'Type: Miniature Circuit Breaker'
    ],
    images: ['/assets/images/categories/Miniature Circuit Breakers/Miniature Circuit Breakers (2).avif'],
    url: '/noark/circuit-protection/miniature-circuit-breakers/ex9bn/ex9bn-20a-1p-b',
    inStock: true
  },
  // Type D variants (for high inrush current applications)
  {
    id: 4018,
    name: 'Ex9BN-15A-1P-D - MCB 15A 1-Pole Type D',
    description: 'Miniature Circuit Breaker - Ex9BN Series - 1-pole - 15A rated - Type D characteristic - 240/415V AC - DIN rail mounting - UL Listed',
    category: 'Miniature Circuit Breakers',
    brand: 'Noark',
    model: 'Ex9BN-15A-1P-D',
    rating: 4.6,
    reviews: 16,
    specs: [
      'Series: Ex9BN',
      'Current Rating: 15A',
      'Pole Configuration: 1-Pole',
      'Trip Characteristic: Type D',
      'Voltage Rating: 240/415V AC',
      'Breaking Capacity: 6kA',
      'Standards: UL 489, IEC 60898',
      'Mounting: DIN Rail',
      'Type: Miniature Circuit Breaker'
    ],
    images: ['/assets/images/categories/Miniature Circuit Breakers/Miniature Circuit Breakers (3).avif'],
    url: '/noark/circuit-protection/miniature-circuit-breakers/ex9bn/ex9bn-15a-1p-d',
    inStock: true
  },
  {
    id: 4019,
    name: 'Ex9BN-20A-1P-D - MCB 20A 1-Pole Type D',
    description: 'Miniature Circuit Breaker - Ex9BN Series - 1-pole - 20A rated - Type D characteristic - 240/415V AC - DIN rail mounting - UL Listed',
    category: 'Miniature Circuit Breakers',
    brand: 'Noark',
    model: 'Ex9BN-20A-1P-D',
    rating: 4.6,
    reviews: 21,
    specs: [
      'Series: Ex9BN',
      'Current Rating: 20A',
      'Pole Configuration: 1-Pole',
      'Trip Characteristic: Type D',
      'Voltage Rating: 240/415V AC',
      'Breaking Capacity: 6kA',
      'Standards: UL 489, IEC 60898',
      'Mounting: DIN Rail',
      'Type: Miniature Circuit Breaker'
    ],
    images: ['/assets/images/categories/Miniature Circuit Breakers/Miniature Circuit Breakers (4).avif'],
    url: '/noark/circuit-protection/miniature-circuit-breakers/ex9bn/ex9bn-20a-1p-d',
    inStock: true
  },
  {
    id: 4020,
    name: 'Ex9BN-25A-1P-D - MCB 25A 1-Pole Type D',
    description: 'Miniature Circuit Breaker - Ex9BN Series - 1-pole - 25A rated - Type D characteristic - 240/415V AC - DIN rail mounting - UL Listed',
    category: 'Miniature Circuit Breakers',
    brand: 'Noark',
    model: 'Ex9BN-25A-1P-D',
    rating: 4.6,
    reviews: 28,
    specs: [
      'Series: Ex9BN',
      'Current Rating: 25A',
      'Pole Configuration: 1-Pole',
      'Trip Characteristic: Type D',
      'Voltage Rating: 240/415V AC',
      'Breaking Capacity: 6kA',
      'Standards: UL 489, IEC 60898',
      'Mounting: DIN Rail',
      'Type: Miniature Circuit Breaker'
    ],
    images: ['/assets/images/categories/Miniature Circuit Breakers/Miniature Circuit Breakers (5).avif'],
    url: '/noark/circuit-protection/miniature-circuit-breakers/ex9bn/ex9bn-25a-1p-d',
    inStock: true
  }
];

// Export the products
// Convert B1N products from the JSON data
const b1nProducts = convertB1NDataToProduct();
// Convert B1H products from the JSON data
const b1hProducts = convertB1HDataToProduct();

// Combine existing MCB products with B1N and B1H products
export const noarkMCBProducts: Product[] = [...noarkMCBData, ...b1nProducts, ...b1hProducts];

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