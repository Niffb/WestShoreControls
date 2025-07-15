'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import ProductsPageNew from '@/components/page/ProductsPageNew';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

export default function F800SeriesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-20 flex items-center justify-center">Loading...</div>}>
      <div className="bg-white/80 backdrop-blur-sm mb-4 py-4 border-b border-gray-200 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm mb-2">
            <Link 
              href="/" 
              className="text-gray-500 hover:text-red-600 transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link 
              href="/mitsubishi"
              className="text-gray-500 hover:text-red-600 transition-colors"
            >
              Mitsubishi
            </Link>
            <span className="text-gray-400">/</span>
            <Link 
              href="/mitsubishi/variable-frequency-drives"
              className="text-gray-500 hover:text-red-600 transition-colors flex items-center"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              Variable Frequency Drives
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-red-600 font-medium">F800 Series</span>
          </nav>
        </div>
      </div>
      <ProductsPageNew selectedBrand="Mitsubishi" selectedCategory="FR-F800 Series Inverters" />
    </Suspense>
  );
} 