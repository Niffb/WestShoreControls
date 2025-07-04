import { Product } from '@/lib/types/shared-types';

// Import Ex9BP data from the JSON file
// Since the JSON is in the root directory, we need to import it directly
import ex9bpJsonData from '../../ex9bp.json';

// Convert Ex9BP data to Product format
const convertEx9BPDataToProduct = () => {
  try {
    // Ensure ex9bpJsonData is treated as an array
    const dataArray = Array.isArray(ex9bpJsonData) ? ex9bpJsonData : [];
    
    return dataArray.map((item: any, index: number) => {
      const id = 8000 + index;
      const model = item.model;
      const name = `${model} - ${item.rated_current} ${item.poles} ${item.curve} MCB`;

      // Determine the image path based on poles configuration
      let imagePath = '/assets/images/categories/Miniature Circuit Breakers/Ex9BP Series Breakers.avif';
      
      // Use specific images based on pole count
      if (item.poles.includes('1-pole') || item.poles.includes('1P')) {
        imagePath = '/noark 1 pole.jpg';
      } else if (item.poles.includes('2-pole') || item.poles.includes('2P')) {
        imagePath = '/noark 2 pole.jpg';
      } else if (item.poles.includes('3-pole') || item.poles.includes('3P') || item.poles.includes('4-pole') || item.poles.includes('4P')) {
        imagePath = '/noark 3 pole.jpg'; // Using 3-pole image for 4-pole as well
      }

      return {
        id,
        name,
        description: `${item.description} - ${item.poles} - ${item.rated_current} - ${item.curve} - ${item.rated_voltage} - ${item.interrupting_rating} - ${item.mounting}`,
        category: 'Miniature Circuit Breakers',
        brand: item.brand,
        model,
        rating: 4.7,
        reviews: Math.floor(Math.random() * 20) + 5, // Random number of reviews between 5 and 24
        specs: [
          `Series: Ex9BP`,
          `Current Rating: ${item.rated_current}`,
          `Pole Configuration: ${item.poles}`,
          `Trip Characteristic: ${item.curve}`,
          `Voltage Rating: ${item.rated_voltage}`,
          `Interrupting Rating: ${item.interrupting_rating}`,
          `Mounting: ${item.mounting}`,
          item.equivalent_to ? `Equivalent to: ${item.equivalent_to}` : null,
        ].filter(Boolean),
        images: [imagePath],
        url: `/noark/circuit-protection/miniature-circuit-breakers/ex9bp/${model.toLowerCase()}`,
        inStock: true
      };
    });
  } catch (error) {
    console.error('Error processing Ex9BP data:', error);
    return [];
  }
};

// Convert Ex9BP data to product array
export const noarkEx9BPProducts = convertEx9BPDataToProduct();

// Main Ex9BP Product
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
  images: ['/noark 2 pole.jpg', '/noark 3 pole.jpg'], // Using 3-pole image for 4-pole
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