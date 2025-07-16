import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { HomeIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { noarkMCPProducts } from '@/lib/products/noark-mcp-products';
import ProductGrid from './ProductGrid';

// Metadata for SEO
export const metadata: Metadata = {
  title: 'NOARK Motor Circuit Protectors (MCPs) | West Shore Controls',
  description: 'Explore NOARK\'s range of high-quality Motor Circuit Protectors (MCPs) including the M1N, M2N, M3N, M4N, and M5N series. Reliable protection for motor circuits.',
  keywords: 'NOARK, Motor Circuit Protectors, MCPs, M1N Series, M2N Series, motor protection, electrical equipment',
};

export default function NoarkMCPPage() {
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
          <span className="text-gray-900">Motor Circuit Protectors</span>
        </nav>
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">NOARK Motor Circuit Protectors (MCPs)</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            NOARK offers a comprehensive range of Motor Circuit Protectors designed for motor applications,
            providing reliable short-circuit protection for motor circuits in various industrial environments.
          </p>
        </div>
        
        {/* Products Section with Pagination */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">All Motor Circuit Protectors</h2>
        <Suspense fallback={<div>Loading products...</div>}>
          <ProductGrid products={noarkMCPProducts} />
        </Suspense>
        
        {/* Overview Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About NOARK Motor Circuit Protectors</h2>
          <div className="prose max-w-none">
            <p>
              NOARK Motor Circuit Protectors (MCPs) provide essential protection for motor circuits against short circuits. 
              Available in various frame sizes and current ratings, these protectors are designed to meet different application requirements across industrial environments.
            </p>
            
            <h3>Applications</h3>
            <ul>
              <li><strong>Industrial:</strong> Factory automation, pumps, fans, and conveyors</li>
              <li><strong>Commercial:</strong> HVAC systems, elevators, and material handling</li>
              <li><strong>Manufacturing:</strong> Machine tools, production equipment, and process systems</li>
            </ul>
            
            <h3>Key Benefits</h3>
            <ul>
              <li><strong>Motor-Specific Protection:</strong> Designed specifically for motor circuit applications</li>
              <li><strong>Multiple Options:</strong> Various current ratings and frame sizes</li>
              <li><strong>Standards Compliance:</strong> Meets UL and international safety standards</li>
              <li><strong>Easy Installation:</strong> Simple setup and replacement</li>
              <li><strong>Durable Construction:</strong> Designed for long service life in demanding environments</li>
            </ul>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="bg-primary-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Need Assistance?</h2>
          <p className="text-gray-600 mb-4">Our product specialists can help you select the right NOARK motor protection solution for your specific requirements.</p>
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