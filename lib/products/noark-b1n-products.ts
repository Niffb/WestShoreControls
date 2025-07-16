import { Product } from '@/lib/types/shared-types';
import b1nJsonData from '@/lib/data/noark/B1n.json';

const convertB1NDataToProduct = (item: any, index: number): Product => {
  const id = 5000 + index;
  const model = item.model;
  const name = `${model} - ${item.rated_current} ${item.poles} ${item.trip_curve} MCB`;
  
  let imagePath = '/assets/images/categories/Miniature Circuit Breakers/B1N Series Breakers.avif';
  
  if (item.poles.includes('1-pole') || item.poles.includes('1P')) {
    imagePath = 'assets/images/products/noark/circuit_breakers/Noark_MCB_medium.avif';
  } else if (item.poles.includes('2-pole') || item.poles.includes('2P')) {
    imagePath = 'assets/images/products/noark/circuit_breakers/Noark_MCB_e0490812-66e8-43f8-b876-7742ba3fae49_medium.avif';
  } else if (item.poles.includes('3-pole') || item.poles.includes('3P')) {
    imagePath = 'assets/images/products/noark/circuit_breakers/Noark_MCB_medium.avif';
  }
  
  return {
    id,
    name,
    description: `${item.description} - ${item.series} - ${item.poles} - ${item.rated_current} - ${item.trip_curve} - ${item.rated_voltage} - ${item.interrupting_rating} - ${item.connections} - ${item.mounting}`,
    category: 'Miniature Circuit Breakers',
    brand: item.brand,
    model,
    rating: 4.7,
    reviews: Math.floor(Math.random() * 20) + 5,
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
    ].filter(Boolean) as string[],
    images: [imagePath],
    url: `/noark/circuit-protection/miniature-circuit-breakers/b1n/${model.toLowerCase()}`,
    inStock: true
  };
};

export const b1nSeriesProduct: Product = {
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
};

const b1nProducts = Array.isArray(b1nJsonData) ? b1nJsonData.map(convertB1NDataToProduct) : [];
export const noarkB1NProducts: Product[] = [b1nSeriesProduct, ...b1nProducts];

// Export as both named export and default
export default noarkB1NProducts; 