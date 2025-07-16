import { Product } from '@/lib/types/shared-types';
import ex9bpJsonData from '@/lib/data/noark/ex9bp.json';

const convertEx9BPDataToProduct = (item: any, index: number): Product => {
  const id = 8000 + index;
  const model = item.model;
  const name = `${model} - ${item.rated_current} ${item.poles} ${item.curve} MCB`;

  let imagePath = '/assets/images/categories/Miniature Circuit Breakers/Ex9BP Series Breakers.avif';
  
  if (item.poles.includes('1-pole') || item.poles.includes('1P')) {
    imagePath = '/noark 1 pole.jpg';
  } else if (item.poles.includes('2-pole') || item.poles.includes('2P')) {
    imagePath = '/noark 2 pole.jpg';
  } else if (item.poles.includes('3-pole') || item.poles.includes('3P') || item.poles.includes('4-pole') || item.poles.includes('4P')) {
    imagePath = '/noark 3 pole.jpg';
  }

  return {
    id,
    name,
    description: `${item.description} - ${item.poles} - ${item.rated_current} - ${item.curve} - ${item.rated_voltage} - ${item.interrupting_rating} - ${item.mounting}`,
    category: 'Miniature Circuit Breakers',
    brand: item.brand,
    model,
    rating: 4.7,
    reviews: Math.floor(Math.random() * 20) + 5,
    specs: [
      `Series: Ex9BP`,
      `Current Rating: ${item.rated_current}`,
      `Pole Configuration: ${item.poles}`,
      `Trip Characteristic: ${item.curve}`,
      `Voltage Rating: ${item.rated_voltage}`,
      `Interrupting Rating: ${item.interrupting_rating}`,
      `Mounting: ${item.mounting}`,
      item.equivalent_to ? `Equivalent to: ${item.equivalent_to}` : null,
    ].filter(Boolean) as string[],
    images: [imagePath],
    url: `/noark/circuit-protection/miniature-circuit-breakers/ex9bp/${model.toLowerCase()}`,
    inStock: true
  };
};

export const ex9bpSeriesProduct: Product = {
  id: 6104,
  name: 'Ex9BP Series Miniature Circuit Breakers',
  description: 'Ex9BP series Miniature Circuit Breakers (MCB) - UL 1077 compliant DC circuit breakers designed for high voltage DC applications. Available in 2-pole and 4-pole configurations with C-curve trip characteristics.',
  category: 'Miniature Circuit Breakers',
  brand: 'NOARK',
  model: 'Ex9BP Series',
  rating: 4.6,
  reviews: 25,
  specs: [
    'Series: Ex9BP',
    'Standard: UL 1077',
    'Trip Curves: C',
    'Poles: 2P, 4P',
    'Rated Voltage: 300Vdc (2P), 600Vdc (4P)',
    'Interrupting Rating: 6kA',
    'Mounting: DIN Rail (35mm)'
  ],
  images: ['/noark 2 pole.jpg', '/noark 3 pole.jpg'],
  url: '/noark/circuit-protection/miniature-circuit-breakers/ex9bp',
  inStock: true,
  features: [
    'UL 1077 Compliant',
    'DC circuit protection for high voltage applications',
    '2-pole and 4-pole configurations',
    'C-curve trip characteristics',
    'Interrupting capacity (6kA)',
    'DIN rail mounting capability'
  ]
};

const ex9bpProducts = Array.isArray(ex9bpJsonData) ? ex9bpJsonData.map(convertEx9BPDataToProduct) : [];
export const noarkEx9BPProducts: Product[] = [ex9bpSeriesProduct, ...ex9bpProducts]; 