import React from 'react';
import { Metadata } from 'next';
import { noarkB1NQProducts } from '@/lib/products/noark-b1nq-products';
import DynamicProductGrid from '@/components/product/DynamicProductGrid';

export const metadata: Metadata = {
  title: 'NOARK B1NQ Series Miniature Circuit Breakers | West Shore Controls',
  description: 'NOARK B1NQ Series UL 489 Miniature Circuit Breakers (MCBs) with 1-pole and 2-pole configurations and various trip curves. Perfect for industrial and commercial circuit protection.',
  openGraph: {
    title: 'NOARK B1NQ Series Miniature Circuit Breakers | West Shore Controls',
    description: 'NOARK B1NQ Series UL 489 Miniature Circuit Breakers (MCBs) with 1-pole and 2-pole configurations and various trip curves. Perfect for industrial and commercial circuit protection.',
    url: '/noark/circuit-protection/miniature-circuit-breakers/b1nq',
    siteName: 'West Shore Controls',
    images: [
      {
        url: '/B1NQ+1P.jpg',
        width: 800,
        height: 600,
        alt: 'NOARK B1NQ Series Miniature Circuit Breakers'
      }
    ],
    locale: 'en_US',
    type: 'website',
  }
};

const B1NQProductsPage: React.FC = () => {
  const mainProduct = noarkB1NQProducts[0]; // Get the main product description
  const individualProducts = noarkB1NQProducts.slice(1); // Get all individual products
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">NOARK B1NQ Series Miniature Circuit Breakers</h1>
        <p className="text-lg mb-4">
          The B1NQ Series Miniature Circuit Breakers (MCBs) from NOARK are UL 489 compliant circuit protection devices 
          designed for commercial and industrial applications. These breakers feature quick-acting trip mechanisms to 
          protect electrical circuits from damage caused by overcurrent and short circuits.
        </p>
        <div className="flex flex-wrap gap-8 mb-8">
          <div className="flex-1 min-w-[280px]">
            <h2 className="text-xl font-semibold mb-3">Features</h2>
            <ul className="list-disc pl-5 space-y-1">
              {mainProduct.features?.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="flex-1 min-w-[280px]">
            <h2 className="text-xl font-semibold mb-3">Specifications</h2>
            <ul className="list-disc pl-5 space-y-1">
              {mainProduct.specs?.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">B1NQ Series Product Range</h2>
        <DynamicProductGrid products={individualProducts} />
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Applications</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Industrial control panels</li>
          <li>Commercial building protection</li>
          <li>Machine control circuits</li>
          <li>Motor branch circuits</li>
          <li>HVAC equipment</li>
          <li>Power distribution panels</li>
        </ul>
      </div>
    </div>
  );
};

export default B1NQProductsPage; 