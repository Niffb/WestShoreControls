import { Product } from '@/lib/types/shared-types';
import { noarkB1NProducts } from './noark-b1n-products';
import { noarkB1HProducts } from './noark-b1h-products';
import { noarkB1NQProducts } from './noark-b1nq-products';
import { noarkB1DProducts } from './noark-b1d-products';
import { noarkB1EProducts } from './noark-b1e-products';
import { noarkEx9BPProducts } from './noark-ex9bp-products';

const mainProducts = noarkB1NProducts.filter(p => p.model.endsWith('Series'));
const b1nProducts = noarkB1NProducts.filter(p => !p.model.endsWith('Series'));

const mainB1h = noarkB1HProducts.filter(p => p.model.endsWith('Series'));
const b1hProducts = noarkB1HProducts.filter(p => !p.model.endsWith('Series'));

const mainB1nq = noarkB1NQProducts.filter(p => p.model.endsWith('Series'));
const b1nqProducts = noarkB1NQProducts.filter(p => !p.model.endsWith('Series'));

const mainB1d = noarkB1DProducts.filter(p => p.model.endsWith('Series'));
const b1dProducts = noarkB1DProducts.filter(p => !p.model.endsWith('Series'));

const mainB1e = noarkB1EProducts.filter(p => p.model.endsWith('Series'));
const b1eProducts = noarkB1EProducts.filter(p => !p.model.endsWith('Series'));

const mainEx9bp = noarkEx9BPProducts.filter(p => p.model.endsWith('Series'));
const ex9bpProducts = noarkEx9BPProducts.filter(p => !p.model.endsWith('Series'));


const noarkMCBData: Product[] = [
    ...mainProducts,
    ...mainB1h,
    ...mainB1nq,
    ...mainB1d,
    ...mainB1e,
    ...mainEx9bp
];

export const noarkMCBProducts: Product[] = [
    ...noarkMCBData, 
    ...b1nProducts, 
    ...b1hProducts, 
    ...b1nqProducts,
    ...b1dProducts,
    ...b1eProducts,
    ...ex9bpProducts
];

// Series information
export const mcbSeries = [
  {
    name: 'B1N Series',
    description: 'Standard MCBs for AC applications',
    currentRange: '0.5A to 63A',
    breakingCapacity: '10kA at 240Vac',
    poles: '1, 2 & 3-pole',
    standards: 'UL 489, IEC 60898'
  },
  {
    name: 'B1H Series', 
    description: 'High voltage AC MCBs',
    currentRange: '0.5A to 32A',
    breakingCapacity: '10kA at 480Y/277Vac',
    poles: '1, 2 & 3-pole',
    standards: 'UL 489, IEC 60898'
  },
  {
    name: 'B1NQ Series',
    description: 'Split phase AC MCBs',
    currentRange: '0.5A to 63A', 
    breakingCapacity: '10kA at 120/240Vac',
    poles: '1 & 2-pole',
    standards: 'UL 489, IEC 60898'
  },
  {
    name: 'B1D Series',
    description: 'DC MCBs for solar/battery applications',
    currentRange: '0.5A to 63A',
    breakingCapacity: '10kA at 250Vdc',
    poles: '1 and 2-pole',
    standards: 'UL 489, IEC 60947-2'
  },
  {
    name: 'B1E Series',
    description: 'High current MCBs',
    currentRange: 'Up to 125A',
    breakingCapacity: '5kA at 480Y/277Vac and 10kA at 240Vac, 10kA at 220Vdc (B1E 80~125A 2-Pole)',
    poles: '1, 2, 3 and 4-pole',
    standards: 'UL 489, IEC 60898'
  },
  {
    name: 'B1B Series',
    description: 'High voltage DC MCBs',
    currentRange: '25A to 63A',
    breakingCapacity: '10kA at 500Vdc/2-pole & 1000Vdc/4-pole',
    poles: '2 & 4-pole',
    standards: 'UL 489, IEC 60947-2'
  },
  {
    name: 'Ex9BP Series',
    description: 'High voltage DC MCBs for solar applications',
    currentRange: '10-63A',
    breakingCapacity: '6kA at 600Vdc',
    poles: '2 & 4-pole',
    standards: 'UL 489, IEC 60947-2'
  },
  {
    name: 'Ex9BN Series',
    description: 'Standard miniature circuit breakers for residential and commercial applications',
    currentRange: '15-63A',
    tripCharacteristics: 'Type B, C, D',
    breakingCapacity: '6kA at 415V AC',
    standards: 'UL 489, IEC 60898'
  }
];

// Helper functions
export const getMCBProductsByCharacteristic = (characteristic: string): Product[] => {
  return noarkMCBProducts.filter(product => 
    product.specs?.some(spec => spec.toLowerCase().includes(`trip characteristic: type ${characteristic.toLowerCase()}`))
  );
};

export const getMCBProductsByPoles = (poles: string): Product[] => {
  return noarkMCBProducts.filter(product => 
    product.specs?.some(spec => spec.toLowerCase().includes(`pole configuration: ${poles.toLowerCase()}`))
  );
};

export const getMCBProductsByCurrentRange = (minCurrent: number, maxCurrent: number): Product[] => {
  return noarkMCBProducts.filter(product => {
    const currentSpec = product.specs?.find(spec => spec.includes('Current Rating:'));
    if (currentSpec) {
      const currentMatch = currentSpec.match(/(\d+)A/);
      if (currentMatch) {
        const current = parseInt(currentMatch[1]);
        return current >= minCurrent && current <= maxCurrent;
      }
    }
    return false;
  });
};

// Export total count for brand page
export const totalMCBProducts = noarkMCBProducts.length;

console.log(`Generated ${totalMCBProducts} MCB products for Noark Ex9BN series`); 