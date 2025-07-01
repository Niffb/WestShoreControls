'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import ProductsPageNew from '@/components/page/ProductsPageNew';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

// Define subcategories for direct access
const subcategories = [
  { name: 'A800 Series', slug: 'a800-series' },
  { name: 'F800 Series', slug: 'f800-series' },
  { name: 'D700 Series', slug: 'd700-series' },
  { name: 'E700 Series', slug: 'e700-series' },
  { name: 'FR-A800', slug: 'fr-a800' },
  { name: 'FR-F800', slug: 'fr-f800' },
  { name: 'FR-E700', slug: 'fr-e700' },
  { name: 'FR-D700', slug: 'fr-d700' }
];

// Custom page component that includes subcategories
export default function MitsubishiVFDPage() {
  // Add subcategories section above the ProductsPageNew
  return (
    <>
      {/* Subcategories Section */}
      <section className="relative bg-white/80 backdrop-blur-sm mt-24 mb-4 py-4 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm mb-4">
            <Link 
              href="/" 
              className="text-gray-500 hover:text-red-600 transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link 
              href="/mitsubishi"
              className="text-gray-500 hover:text-red-600 transition-colors flex items-center"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              Mitsubishi
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-red-600 font-medium">Variable Frequency Drives</span>
          </div>
          
          <motion.div 
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-sm font-medium text-gray-500 mr-2">Subcategories:</h3>
            {subcategories.map((subcategory) => (
              <Link
                key={subcategory.slug}
                href={`/mitsubishi/variable-frequency-drives/${subcategory.slug}`}
                className="px-4 py-1.5 bg-white text-sm text-gray-800 border border-gray-300 hover:border-red-500 hover:text-red-600 rounded-full transition-colors flex items-center gap-1 shadow-sm hover:shadow"
              >
                {subcategory.name}
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main product page */}
      <Suspense fallback={<div className="min-h-screen pt-20 flex items-center justify-center">Loading...</div>}>
        <ProductsPageNew selectedBrand="Mitsubishi" selectedCategory="Variable Frequency Drives" />
      </Suspense>
    </>
  );
} 