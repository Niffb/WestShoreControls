import { Product } from '@/lib/types/shared-types';
import b1hJsonData from '@/lib/data/noark/B1h.json';

const convertB1HDataToProduct = (item: any, index: number): Product => {
  const id = 7000 + index;
  const model = item.model;
  const name = `${model} - ${item.rated_current} ${item.poles} ${item.trip_curve} MCB`;
  
  let imagePath = '/assets/images/categories/Miniature Circuit Breakers/B1H Series Breakers.avif';
  
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
    url: `/noark/circuit-protection/miniature-circuit-breakers/b1h/${model.toLowerCase()}`,
    inStock: true
  };
};

export const b1hSeriesProduct: Product = {
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
  };

const b1hProducts = Array.isArray(b1hJsonData) ? b1hJsonData.map(convertB1HDataToProduct) : [];
export const noarkB1HProducts: Product[] = [b1hSeriesProduct, ...b1hProducts];

// Utility functions to filter B1H products by various criteria
export const getB1HProductsByCharacteristic = (characteristic: string): Product[] => {
  return noarkB1HProducts.filter(product => 
    product.specs.some(spec => spec.includes(`Trip Characteristic: ${characteristic}`))
  );
};

export const getB1HProductsByPoles = (poles: string): Product[] => {
  return noarkB1HProducts.filter(product => 
    product.specs.some(spec => spec.includes(`Pole Configuration: ${poles}`))
  );
};

export const getB1HProductsByCurrentRange = (minCurrent: number, maxCurrent: number): Product[] => {
  return noarkB1HProducts.filter(product => {
    const currentSpec = product.specs.find(spec => spec.startsWith('Current Rating:'));
    if (currentSpec) {
      const currentValue = parseFloat(currentSpec.replace('Current Rating: ', '').replace('A', ''));
      return currentValue >= minCurrent && currentValue <= maxCurrent;
    }
    return false;
  });
};

export default noarkB1HProducts; 