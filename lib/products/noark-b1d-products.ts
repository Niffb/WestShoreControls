import { Product } from '@/lib/types/shared-types';
import b1dJsonData from '@/lib/data/noark/B1d.json';

const convertB1DDataToProduct = (item: any, index: number): Product => {
  const id = 7000 + index;
  const model = item.model;
  const name = `${model} - ${item.rated_current} ${item.poles} ${item.curve} MCB`;

  let imagePath = '/assets/images/categories/Miniature Circuit Breakers/B1D Series Breakers.avif';
  
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
    description: `${item.description} - ${item.poles} - ${item.rated_current} - ${item.curve} - ${item.rated_voltage} - ${item.interrupting_rating} - ${item.connections} - ${item.mounting}`,
    category: 'Miniature Circuit Breakers',
    brand: item.brand,
    model,
    rating: 4.7,
    reviews: Math.floor(Math.random() * 20) + 5,
    specs: [
      `Series: B1D`,
      `Current Rating: ${item.rated_current}`,
      `Pole Configuration: ${item.poles}`,
      `Trip Characteristic: ${item.curve}`,
      `Voltage Rating: ${item.rated_voltage}`,
      `Interrupting Rating: ${item.interrupting_rating}`,
      `Connections: ${item.connections}`,
      `Mounting: ${item.mounting}`,
      item.equivalent_to ? `Equivalent to: ${item.equivalent_to}` : null,
    ].filter(Boolean) as string[],
    images: [imagePath],
    url: `/noark/circuit-protection/miniature-circuit-breakers/b1d/${model.toLowerCase()}`,
    inStock: true
  };
};

export const b1dSeriesProduct: Product = {
  id: 6102,
  name: 'B1D Series Miniature Circuit Breakers',
  description: 'B1D series Miniature Circuit Breakers (MCB) - UL 489 compliant DC circuit breakers designed for solar and battery applications. Available in 1-pole and 2-pole configurations with C-curve and D-curve trip characteristics.',
  category: 'Miniature Circuit Breakers',
  brand: 'NOARK',
  model: 'B1D Series',
  rating: 4.7,
  reviews: 30,
  specs: [
    'Series: B1D',
    'Standard: UL 489',
    'Trip Curves: C, D',
    'Poles: 1P, 2P',
    'Rated Voltage: 125Vdc (1P), 250Vdc (2P)',
    'Interrupting Rating: 10kA',
    'Connection Types: Box Lug, Ring Tongue',
    'Mounting: DIN Rail (35mm)'
  ],
  images: ['/assets/images/categories/Miniature Circuit Breakers/B1D Series Breakers.avif'],
  url: '/noark/circuit-protection/miniature-circuit-breakers/b1d',
  inStock: true,
  features: [
    'UL 489 Compliant',
    'DC circuit protection for solar/battery applications',
    'Multiple pole configurations',
    'C and D trip curve options',
    'High interrupting capacity (10kA)',
    'Box lug or ring tongue connection options',
    'DIN rail mounting capability'
  ]
};

const b1dProducts = Array.isArray(b1dJsonData) ? b1dJsonData.map(convertB1DDataToProduct) : [];
export const noarkB1DProducts: Product[] = [b1dSeriesProduct, ...b1dProducts]; 