import { Product } from '@/lib/types/shared-types';

// Manually import B1H data to ensure compatibility with Next.js server components
import b1hJsonData from '@/lib/data/noark/B1h.json';

// Convert B1H data to Product format
export const convertB1HDataToProduct = () => {
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

// Export the B1H products array
export const noarkB1HProducts: Product[] = convertB1HDataToProduct();

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