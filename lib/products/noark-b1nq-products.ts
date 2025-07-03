import { Product } from '@/lib/types/shared-types';

// Import the B1NQ JSON data from the proper location
import b1nqJsonData from '@/lib/data/noark/B1nq.json';

// Helper function to convert B1NQ JSON data to Product format
const convertB1NQDataToProduct = (data: any, index: number): Product => {
  const id = 7000 + index;
  const model = data.model;
  const poles = model.includes('1') ? '1P' : model.includes('2') ? '2P' : '3P';
  const tripCurve = model.includes('B') ? 'B' : model.includes('C') ? 'C' : model.includes('D') ? 'D' : '';
  const ratedCurrent = model.replace(/[^\d.]/g, '');
  
  // Format name based on model details
  const name = `${model} - ${ratedCurrent}A ${poles} ${tripCurve}-Curve MCB`;
  
  // Determine the image path based on model name
  let imagePath = '/assets/images/categories/Miniature Circuit Breakers/B1NQ Series Breakers.avif';
  
  // Use specific images for B1NQ products with 1P or 2P
  if (model.includes('1')) {
    imagePath = '/B1NQ+1P.jpg';
  } else if (model.includes('2')) {
    imagePath = '/B1NQ+2P.jpg';
  }
  
  // Extract description details
  const descriptionParts = data.description.split(' - ');
  const descriptionStart = descriptionParts[0];
  
  return {
    id,
    name,
    description: data.description,
    category: 'Miniature Circuit Breakers',
    brand: data.brand,
    model,
    rating: 4.7,
    reviews: Math.floor(Math.random() * 20) + 5, // Random number of reviews between 5 and 24
    specs: [
      `Series: B1NQ series`,
      `Current Rating: ${ratedCurrent}A`,
      `Pole Configuration: ${poles}`,
      `Trip Characteristic: ${tripCurve}-curve`,
      `Voltage Rating: 120Vac/240Vac`,
      `Interrupting Rating: 10kA (120Vac) / 10kA (240Vac)`,
      `Connections: ${model.includes('T') ? 'box lug (line side) / quick plug-in connections (load side)' : 'box lug connections'}`,
      `Mounting: DIN rail mounting (35mm width)`
    ],
    images: [imagePath],
    url: `/noark/circuit-protection/miniature-circuit-breakers/b1nq/${model.toLowerCase()}`,
    inStock: true
  };
};

// B1NQ Series Miniature Circuit Breakers - Main product entry
export const mainB1NQProduct: Product = {
  id: 7000,
  name: 'B1NQ Series Miniature Circuit Breakers',
  description: 'B1NQ series Miniature Circuit Breakers (MCB) - UL 489 compliant. Available in 1-pole and 2-pole configurations with B-curve, C-curve, and D-curve trip characteristics.',
  category: 'Miniature Circuit Breakers',
  brand: 'NOARK',
  model: 'B1NQ series',
  rating: 4.8,
  reviews: 52,
  specs: [
    'Series: B1NQ',
    'Standard: UL 489',
    'Trip Curves: B, C, D',
    'Poles: 1P, 2P',
    'Rated Voltage: 120Vac/240Vac',
    'Interrupting Rating: 10kA',
    'Connection Types: Box Lug, Quick Plug-in (T models)',
    'Mounting: DIN Rail (35mm)'
  ],
  images: ['/B1NQ+1P.jpg', '/B1NQ+2P.jpg'],
  url: '/noark/circuit-protection/miniature-circuit-breakers/b1nq',
  inStock: true,
  features: [
    'UL 489 Compliant',
    'Multiple pole configurations',
    'Three trip curve options (B, C, D)',
    'High interrupting capacity (10kA)',
    'Box lug or quick plug-in connection options',
    'DIN rail mounting capability'
  ]
};

// Process all B1NQ products from the imported JSON file
const b1nqProducts = b1nqJsonData.map(convertB1NQDataToProduct);

// Combine the main product entry with all individual products
export const noarkB1NQProducts: Product[] = [mainB1NQProduct, ...b1nqProducts];

export default noarkB1NQProducts; 