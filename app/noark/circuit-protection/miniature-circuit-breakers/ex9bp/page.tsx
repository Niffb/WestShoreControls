import { Metadata } from 'next';
import { noarkMCBProducts } from '@/lib/products/noark-mcb-products';
import ProductGrid from '../ProductGrid';
import Link from 'next/link';
import { HomeIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// Filter products to only include Ex9BP products
const ex9bpProducts = noarkMCBProducts.filter(product => 
  product.model && product.model.startsWith('Ex9BP')
);

// Metadata for SEO
export const metadata: Metadata = {
  title: 'NOARK Ex9BP Series Miniature Circuit Breakers | West Shore Controls',
  description: 'Explore NOARK\'s Ex9BP series of high-voltage DC Miniature Circuit Breakers (MCBs) for solar and battery applications with 2-pole and 4-pole configurations.',
  keywords: 'NOARK, Ex9BP Series, DC Miniature Circuit Breakers, MCB, high-voltage DC, circuit protection, solar applications',
};

export default function Ex9BPPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-900/5 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm font-medium text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-700 flex items-center">
            <HomeIcon className="h-4 w-4 mr-1" />
            Home
          </Link>
          <ChevronRightIcon className="h-4 w-4 mx-1" />
          <Link href="/noark" className="hover:text-gray-700">
            NOARK
          </Link>
          <ChevronRightIcon className="h-4 w-4 mx-1" />
          <Link href="/noark/circuit-protection" className="hover:text-gray-700">
            Circuit Protection
          </Link>
          <ChevronRightIcon className="h-4 w-4 mx-1" />
          <Link href="/noark/circuit-protection/miniature-circuit-breakers" className="hover:text-gray-700">
            Miniature Circuit Breakers
          </Link>
          <ChevronRightIcon className="h-4 w-4 mx-1" />
          <span className="text-gray-900">Ex9BP Series</span>
        </nav>
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">NOARK Ex9BP Series Miniature Circuit Breakers</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Ex9BP series Miniature Circuit Breakers (MCB) provide reliable protection for DC circuits in high-voltage applications. 
            These UL 1077 compliant breakers are available in 2-pole and 4-pole configurations with C-curve trip characteristics.
          </p>
        </div>
        
        {/* Product Grid */}
        <ProductGrid products={ex9bpProducts} />
      </div>
    </div>
  );
} 