import { Product } from '@/lib/types/shared-types';

// Allen Bradley products from scraped data
export const allenbradleyScrapedProducts: Product[] = [
  {
    "id": 58768,
    "name": "SV IS7 PLC CARD",
    "model": "IS7",
    "brand": "Allen Bradley",
    "category": "Programmable Logic Controllers",
    "description": "PLC CARD (MK120S PLATFORM",
    "price": 542.9,
    "rating": 3.9,
    "reviews": 23,
    "images": [
      "placeholder.jpg"
    ],
    "inStock": true,
    "specs": [],
    "url": "/allen-bradley/programmable-logic-controllers/sv-is7-plc-card",
    "features": []
  }
];

// Export functions for compatibility
export const getAllenBradleyProductsByCategory = (category: string): Product[] => {
  if (category === 'All Products') return allenbradleyScrapedProducts;
  return allenbradleyScrapedProducts.filter(p => p.category === category);
};

export default allenbradleyScrapedProducts;
