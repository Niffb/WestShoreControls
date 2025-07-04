import { Product } from '@/lib/types/shared-types';

// Helper function to convert B1N JSON data to Product format
const convertB1NDataToProduct = (data: any, index: number): Product => {
  const id = 5000 + index;
  const model = data.model;
  const name = `${model} - ${data.rated_current} ${data.poles} ${data.trip_curve} MCB`;
  
  // Determine the image path based on poles configuration
  let imagePath = '/assets/images/categories/Miniature Circuit Breakers/B1N Series Breakers.avif';
  
  // Use specific images based on pole count
  if (data.poles.includes('1-pole') || data.poles.includes('1P')) {
    imagePath = '/noark 1 pole.jpg';
  } else if (data.poles.includes('2-pole') || data.poles.includes('2P')) {
    imagePath = '/noark 2 pole.jpg';
  } else if (data.poles.includes('3-pole') || data.poles.includes('3P')) {
    imagePath = '/noark 3 pole.jpg';
  }
  
  return {
    id,
    name,
    description: `${data.description} - ${data.series} - ${data.poles} - ${data.rated_current} - ${data.trip_curve} - ${data.rated_voltage} - ${data.interrupting_rating} - ${data.connections} - ${data.mounting}`,
    category: 'Miniature Circuit Breakers',
    brand: data.brand,
    model,
    rating: 4.7,
    reviews: Math.floor(Math.random() * 20) + 5, // Random number of reviews between 5 and 24
    specs: [
      `Series: ${data.series}`,
      `Current Rating: ${data.rated_current}`,
      `Pole Configuration: ${data.poles}`,
      `Trip Characteristic: ${data.trip_curve}`,
      `Voltage Rating: ${data.rated_voltage}`,
      `Interrupting Rating: ${data.interrupting_rating}`,
      `Connections: ${data.connections}`,
      `Mounting: ${data.mounting}`,
      data.equivalent_to ? `Equivalent to: ${data.equivalent_to}` : null,
    ].filter(Boolean),
    images: [imagePath],
    url: `/noark/circuit-protection/miniature-circuit-breakers/b1n/${model.toLowerCase()}`,
    inStock: true
  };
};

// B1N Series Miniature Circuit Breakers
export const noarkB1NProducts: Product[] = [
  {
    id: 5001,
    name: 'B1N Series Miniature Circuit Breakers',
    description: 'B1N series Miniature Circuit Breakers (MCB) - UL 489 compliant. Available in 1-pole, 2-pole, and 3-pole configurations with B-curve, C-curve, and D-curve trip characteristics.',
    category: 'Miniature Circuit Breakers',
    brand: 'Noark',
    model: 'B1N series',
    rating: 4.7,
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
  // B1N3D30
  {
    id: 5002,
    name: 'B1N3D30 - 30A 3P D-Curve MCB',
    description: 'Miniature Circuit Breaker (MCB) - UL 489 - B1N series - 3-poles (3P) - 30A - D-curve - 240Vac - 10kA (240Vac) interrupting rating - Box lug connections - DIN rail mounting (35mm width)',
    category: 'Miniature Circuit Breakers',
    brand: 'NOARK',
    model: 'B1N3D30',
    rating: 4.7,
    reviews: 15,
    specs: [
      'Series: B1N series',
      'Current Rating: 30A',
      'Pole Configuration: 3-poles (3P)',
      'Trip Characteristic: D-curve',
      'Voltage Rating: 240Vac',
      'Interrupting Rating: 10kA (240Vac)',
      'Connections: box lug connections',
      'Mounting: DIN rail mounting (35mm width)',
      'Equivalent to: 1000191'
    ],
    images: ['/noark 3 pole.jpg'],
    url: '/noark/circuit-protection/miniature-circuit-breakers/b1n/b1n3d30',
    inStock: true
  },
  // B1N3C8R
  {
    id: 5003,
    name: 'B1N3C8R - 8A 3P C-Curve MCB',
    description: 'Miniature Circuit Breaker (MCB) - UL 489 - B1N series - 3-poles (3P) - 8A - C-curve - 240Vac - 10kA (240Vac) interrupting rating - Ring tongue connections - DIN rail mounting (35mm width)',
    category: 'Miniature Circuit Breakers',
    brand: 'NOARK',
    model: 'B1N3C8R',
    rating: 4.7,
    reviews: 12,
    specs: [
      'Series: B1N series',
      'Current Rating: 8A',
      'Pole Configuration: 3-poles (3P)',
      'Trip Characteristic: C-curve',
      'Voltage Rating: 240Vac',
      'Interrupting Rating: 10kA (240Vac)',
      'Connections: ring tongue connections',
      'Mounting: DIN rail mounting (35mm width)',
      'Equivalent to: 1000339'
    ],
    images: ['/assets/images/categories/Miniature Circuit Breakers/B1N 3P.avif'],
    url: '/noark/circuit-protection/miniature-circuit-breakers/b1n/b1n3c8r',
    inStock: true
  },
  // B1N3B8R
  {
    id: 5004,
    name: 'B1N3B8R - 8A 3P B-Curve MCB',
    description: 'Miniature Circuit Breaker (MCB) - UL 489 - B1N series - 3-poles (3P) - 8A - B-curve - 240Vac - 10kA (240Vac) interrupting rating - Ring tongue connections - DIN rail mounting (35mm width)',
    category: 'Miniature Circuit Breakers',
    brand: 'NOARK',
    model: 'B1N3B8R',
    rating: 4.7,
    reviews: 10,
    specs: [
      'Series: B1N series',
      'Current Rating: 8A',
      'Pole Configuration: 3-poles (3P)',
      'Trip Characteristic: B-curve',
      'Voltage Rating: 240Vac',
      'Interrupting Rating: 10kA (240Vac)',
      'Connections: ring tongue connections',
      'Mounting: DIN rail mounting (35mm width)',
      'Equivalent to: 1000320'
    ],
    images: ['/assets/images/categories/Miniature Circuit Breakers/B1N 3P.avif'],
    url: '/noark/circuit-protection/miniature-circuit-breakers/b1n/b1n3b8r',
    inStock: true
  },
  // B1N3D3
  {
    id: 5005,
    name: 'B1N3D3 - 3A 3P D-Curve MCB',
    description: 'Miniature Circuit Breaker (MCB) - UL 489 - B1N series - 3-poles (3P) - 3A - D-curve - 240Vac - 10kA (240Vac) interrupting rating - Box lug connections - DIN rail mounting (35mm width)',
    category: 'Miniature Circuit Breakers',
    brand: 'NOARK',
    model: 'B1N3D3',
    rating: 4.7,
    reviews: 9,
    specs: [
      'Series: B1N series',
      'Current Rating: 3A',
      'Pole Configuration: 3-poles (3P)',
      'Trip Characteristic: D-curve',
      'Voltage Rating: 240Vac',
      'Interrupting Rating: 10kA (240Vac)',
      'Connections: box lug connections',
      'Mounting: DIN rail mounting (35mm width)',
      'Equivalent to: 1000180'
    ],
    images: ['/assets/images/categories/Miniature Circuit Breakers/B1N 3P.avif'],
    url: '/noark/circuit-protection/miniature-circuit-breakers/b1n/b1n3d3',
    inStock: true
  },
  // B1N3D2R
  {
    id: 5006,
    name: 'B1N3D2R - 2A 3P D-Curve MCB',
    description: 'Miniature Circuit Breaker (MCB) - UL 489 - B1N series - 3-poles (3P) - 2A - D-curve - 240Vac - 10kA (240Vac) interrupting rating - Ring tongue connections - DIN rail mounting (35mm width)',
    category: 'Miniature Circuit Breakers',
    brand: 'NOARK',
    model: 'B1N3D2R',
    rating: 4.7,
    reviews: 8,
    specs: [
      'Series: B1N series',
      'Current Rating: 2A',
      'Pole Configuration: 3-poles (3P)',
      'Trip Characteristic: D-curve',
      'Voltage Rating: 240Vac',
      'Interrupting Rating: 10kA (240Vac)',
      'Connections: ring tongue connections',
      'Mounting: DIN rail mounting (35mm width)',
      'Equivalent to: 1000353'
    ],
    images: ['/assets/images/categories/Miniature Circuit Breakers/B1N 3P.avif'],
    url: '/noark/circuit-protection/miniature-circuit-breakers/b1n/b1n3d2r',
    inStock: true
  },
  // B1N3D25R
  {
    id: 5007,
    name: 'B1N3D25R - 25A 3P D-Curve MCB',
    description: 'Miniature Circuit Breaker (MCB) - UL 489 - B1N series - 3-poles (3P) - 25A - D-curve - 240Vac - 10kA (240Vac) interrupting rating - Ring tongue connections - DIN rail mounting (35mm width)',
    category: 'Miniature Circuit Breakers',
    brand: 'NOARK',
    model: 'B1N3D25R',
    rating: 4.7,
    reviews: 14,
    specs: [
      'Series: B1N series',
      'Current Rating: 25A',
      'Pole Configuration: 3-poles (3P)',
      'Trip Characteristic: D-curve',
      'Voltage Rating: 240Vac',
      'Interrupting Rating: 10kA (240Vac)',
      'Connections: ring tongue connections',
      'Mounting: DIN rail mounting (35mm width)',
      'Equivalent to: 1000364'
    ],
    images: ['/assets/images/categories/Miniature Circuit Breakers/B1N 3P.avif'],
    url: '/noark/circuit-protection/miniature-circuit-breakers/b1n/b1n3d25r',
    inStock: true
  },
  // B1N3D20R
  {
    id: 5008,
    name: 'B1N3D20R - 20A 3P D-Curve MCB',
    description: 'Miniature Circuit Breaker (MCB) - UL 489 - B1N series - 3-poles (3P) - 20A - D-curve - 240Vac - 10kA (240Vac) interrupting rating - Ring tongue connections - DIN rail mounting (35mm width)',
    category: 'Miniature Circuit Breakers',
    brand: 'NOARK',
    model: 'B1N3D20R',
    rating: 4.7,
    reviews: 16,
    specs: [
      'Series: B1N series',
      'Current Rating: 20A',
      'Pole Configuration: 3-poles (3P)',
      'Trip Characteristic: D-curve',
      'Voltage Rating: 240Vac',
      'Interrupting Rating: 10kA (240Vac)',
      'Connections: ring tongue connections',
      'Mounting: DIN rail mounting (35mm width)',
      'Equivalent to: 1000363'
    ],
    images: ['/assets/images/categories/Miniature Circuit Breakers/B1N 3P.avif'],
    url: '/noark/circuit-protection/miniature-circuit-breakers/b1n/b1n3d20r',
    inStock: true
  },
  // B1N1B1
  {
    id: 5009,
    name: 'B1N1B1 - 1A 1P B-Curve MCB',
    description: 'Miniature Circuit Breaker (MCB) - UL 489 - B1N series - 1-pole (1P) - 1A - B-curve - 240Vac/60Vdc - 10kA interrupting rating - Box lug connections - DIN rail mounting (35mm width)',
    category: 'Miniature Circuit Breakers',
    brand: 'NOARK',
    model: 'B1N1B1',
    rating: 4.7,
    reviews: 11,
    specs: [
      'Series: B1N series',
      'Current Rating: 1A',
      'Pole Configuration: 1-pole (1P)',
      'Trip Characteristic: B-curve',
      'Voltage Rating: 240Vac/60Vdc',
      'Interrupting Rating: 10kA',
      'Connections: Box lug connections',
      'Mounting: DIN rail (35mm width)'
    ],
    images: ['/assets/images/categories/Miniature Circuit Breakers/B1N 1P.avif'],
    url: '/noark/circuit-protection/miniature-circuit-breakers/b1n/b1n1b1',
    inStock: true
  },
  // B1N2C20
  {
    id: 5010,
    name: 'B1N2C20 - 20A 2P C-Curve MCB',
    description: 'Miniature Circuit Breaker (MCB) - UL 489 - B1N series - 2-poles (2P) - 20A - C-curve - 240Vac/125Vdc - 10kA interrupting rating - Box lug connections - DIN rail mounting (35mm width)',
    category: 'Miniature Circuit Breakers',
    brand: 'NOARK',
    model: 'B1N2C20',
    rating: 4.7,
    reviews: 13,
    specs: [
      'Series: B1N series',
      'Current Rating: 20A',
      'Pole Configuration: 2-poles (2P)',
      'Trip Characteristic: C-curve',
      'Voltage Rating: 240Vac/125Vdc',
      'Interrupting Rating: 10kA',
      'Connections: Box lug connections',
      'Mounting: DIN rail (35mm width)'
    ],
    images: ['/assets/images/categories/Miniature Circuit Breakers/B1N 2P.avif'],
    url: '/noark/circuit-protection/miniature-circuit-breakers/b1n/b1n2c20',
    inStock: true
  }
];

// Export as both named export and default
export default noarkB1NProducts; 