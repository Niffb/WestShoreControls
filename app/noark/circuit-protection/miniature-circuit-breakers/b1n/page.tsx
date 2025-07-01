import { Suspense } from 'react';
import { Metadata } from 'next';
import DynamicProductGrid from '@/components/product/DynamicProductGrid';
import noarkB1NProducts from '@/lib/products/noark-b1n-products';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftIcon, HomeIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

// Metadata for SEO
export const metadata: Metadata = {
  title: 'NOARK B1N Series | Miniature Circuit Breakers | West Shore Controls',
  description: 'B1N series Miniature Circuit Breakers (MCB) from NOARK - UL 489 compliant with multiple pole configurations and trip curve options. High quality circuit protection for your electrical installations.',
  keywords: 'NOARK, B1N Series, Miniature Circuit Breaker, MCB, UL 489, circuit protection, electrical equipment',
};

export default function NoarkB1NPage() {
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
          <span className="text-gray-900">B1N Series</span>
        </nav>
        
        {/* Back button */}
        <Link href="/noark/circuit-protection/miniature-circuit-breakers" className="inline-flex items-center text-primary-600 hover:text-primary-800 mb-6 transition duration-150 ease-in-out">
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Miniature Circuit Breakers
        </Link>
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">NOARK B1N Series Miniature Circuit Breakers</h1>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <div className="flex items-center mr-4">
              <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
              <span>4.7 (48 reviews)</span>
            </div>
            <div className="flex items-center">
              <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">In Stock</span>
            </div>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl">
            The B1N series Miniature Circuit Breakers (MCBs) from NOARK provide reliable circuit protection in a variety of configurations. 
            UL 489 compliant, these breakers are available in 1-pole, 2-pole, and 3-pole configurations with B-curve, C-curve, and D-curve trip characteristics.
          </p>
        </div>
        
        {/* Product features */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 text-primary-600 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">UL 489 Compliant</h3>
                <p className="mt-1 text-sm text-gray-500">Meets UL 489 standards for safety and performance</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 text-primary-600 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">Multiple Pole Configurations</h3>
                <p className="mt-1 text-sm text-gray-500">Available in 1-pole, 2-pole, and 3-pole options</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 text-primary-600 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">Trip Curve Options</h3>
                <p className="mt-1 text-sm text-gray-500">B-curve, C-curve, and D-curve characteristics</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 text-primary-600 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">High Interrupting Capacity</h3>
                <p className="mt-1 text-sm text-gray-500">10kA interrupting rating for reliable protection</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 text-primary-600 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">Connection Options</h3>
                <p className="mt-1 text-sm text-gray-500">Box lug or ring tongue connection options</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 text-primary-600 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">Easy Installation</h3>
                <p className="mt-1 text-sm text-gray-500">DIN rail mounting (35mm width) for simple setup</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">B1N Series Products</h2>
        <div className="mb-12">
          <Suspense fallback={<div>Loading products...</div>}>
            <DynamicProductGrid products={noarkB1NProducts} />
          </Suspense>
        </div>
        
        {/* Additional Information */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Technical Information</h2>
          <div className="prose max-w-none">
            <p>
              NOARK B1N series Miniature Circuit Breakers are designed for branch circuit protection in accordance with UL 489 standards. 
              These MCBs provide overcurrent and short circuit protection for electrical installations in residential, commercial, and industrial applications.
            </p>
            <h3>Trip Curve Characteristics:</h3>
            <ul>
              <li><strong>B-curve:</strong> Trips between 3-5 times rated current for magnetic tripping. Ideal for resistive loads with low inrush currents.</li>
              <li><strong>C-curve:</strong> Trips between 5-10 times rated current for magnetic tripping. Suitable for general purpose and mixed resistive/inductive loads.</li>
              <li><strong>D-curve:</strong> Trips between 10-20 times rated current for magnetic tripping. Designed for highly inductive loads with high inrush currents.</li>
            </ul>
            <p>
              All B1N series breakers feature 35mm DIN rail mounting for easy installation and are available with either box lug or ring tongue connections to suit various application requirements.
            </p>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="bg-primary-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Need Assistance?</h2>
          <p className="text-gray-600 mb-4">Our product specialists are available to help you select the right circuit protection solution for your application.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
              Contact Us
            </Link>
            <Link href="/catalogs" className="inline-flex items-center justify-center px-5 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Download Catalogs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 