import { Product } from '@/lib/types/shared-types';
import b1eJsonData from '@/lib/data/noark/B1e.json';

const convertB1EDataToProduct = (item: any, index: number): Product => {
  const id = 8000 + index;
  const model = item.model;
  const name = `${model} - ${item.rated_current} ${item.poles} ${item.curve} MCB`;

  let imagePath = '/assets/images/categories/Miniature Circuit Breakers/B1E Series Breakers.avif';
  
  if (item.poles.includes('1-pole') || item.poles.includes('1P')) {
    imagePath = '/noark 1 pole.jpg';
  } else if (item.poles.includes('2-pole') || item.poles.includes('2P')) {
    imagePath = '/noark 2 pole.jpg';
  } else if (item.poles.includes('3-pole') || item.poles.includes('3P')) {
    imagePath = '/noark 3 pole.jpg';
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
      `Series: B1E`,
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
    url: `/noark/circuit-protection/miniature-circuit-breakers/b1e/${model.toLowerCase()}`,
    inStock: true
  };
};

export const b1eSeriesProduct: Product = {
  id: 6103,
  name: 'B1E Series High Current Miniature Circuit Breakers',
  description: 'B1E series Miniature Circuit Breakers (MCB) - UL 489 compliant high-current circuit breakers designed for large loads. Available in 1-pole, 2-pole, 3-pole, and 4-pole configurations with B-curve, C-curve, and D-curve trip characteristics.',
  category: 'Miniature Circuit Breakers',
  brand: 'NOARK',
  model: 'B1E Series',
  rating: 4.7,
  reviews: 28,
  specs: [
    'Series: B1E',
    'Standard: UL 489',
    'Trip Curves: B, C, D',
    'Poles: 1P, 2P, 3P, 4P',
    'Rated Voltage: 480Y/277Vac (1P), 480Y/277Vac (2P), 480Y/277Vac (3P), 480Y/277Vac (4P)',
    'Rated Current: Up to 125A',
    'Interrupting Rating: 5kA at 480Y/277Vac and 10kA at 240Vac, 10kA at 220Vdc (B1E 80~125A 2-Pole)',
    'Connection Types: Box Lug',
    'Mounting: DIN Rail (35mm)'
  ],
  images: ['/assets/images/categories/Miniature Circuit Breakers/B1E Series Breakers.avif'],
  url: '/noark/circuit-protection/miniature-circuit-breakers/b1e',
  inStock: true,
  features: [
    'UL 489 Compliant',
    'High current ratings up to 125A',
    'Multiple pole configurations',
    'Three trip curve options (B, C, D)',
    'Suitable for large commercial and industrial applications',
    'Box lug connection for secure wiring',
    'DIN rail mounting capability'
  ]
};

const b1eProducts = Array.isArray(b1eJsonData) ? b1eJsonData.map(convertB1EDataToProduct) : [];
export const noarkB1EProducts: Product[] = [b1eSeriesProduct, ...b1eProducts]; 