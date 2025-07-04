import { Product } from '@/lib/types/shared-types';

// Import B1D data
import b1dJsonData from '@/lib/data/noark/B1d.json';

// Convert B1D data to Product format
const convertB1DDataToProduct = () => {
  try {
    // Ensure b1dJsonData is treated as an array by using Array.isArray check
    const dataArray = Array.isArray(b1dJsonData) ? b1dJsonData : [];
    
    return dataArray.map((item: any, index: number) => {
      const id = 7000 + index;
      const model = item.model;
      
      // Extract the curve type from the model name
      const curveMatch = model.match(/[BCD](?=\d+$|$)/);
      const tripCurve = curveMatch ? `Type ${curveMatch[0]}` : 'Unknown';
      
      const name = `${model} - ${item.rated_current} ${item.poles} ${item.curve} MCB`;

      // Determine the image path based on poles configuration
      let imagePath = '/assets/images/categories/Miniature Circuit Breakers/B1D Series Breakers.avif';
      
      // Use specific images based on pole count
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
        reviews: Math.floor(Math.random() * 20) + 5, // Random number of reviews between 5 and 24
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
        ].filter(Boolean),
        images: [imagePath],
        url: `/noark/circuit-protection/miniature-circuit-breakers/b1d/${model.toLowerCase()}`,
        inStock: true
      };
    });
  } catch (error) {
    console.error('Error processing B1D data:', error);
    return [];
  }
};

// Convert B1D data to product array
export const noarkB1DProducts = convertB1DDataToProduct();

// Main B1D Product
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