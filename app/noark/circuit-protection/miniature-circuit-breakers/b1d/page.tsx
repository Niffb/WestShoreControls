import { Metadata } from 'next';
import Link from 'next/link';
import { HomeIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import ProductGrid from '../ProductGrid';
import { noarkMCBProducts } from '@/lib/products/noark-mcb-products';

// Metadata for SEO
export const metadata: Metadata = {
  title: 'NOARK B1D Series DC Miniature Circuit Breakers | West Shore Controls',
  description: 'Explore NOARK\'s B1D series DC Miniature Circuit Breakers (MCBs) designed for solar and battery applications. UL 489 compliant with multiple configurations and current ratings.',
  keywords: 'NOARK, B1D Series, DC Circuit Breakers, MCB, UL 489, solar protection, battery protection, circuit protection, miniature circuit breakers',
};

export default function NoarkB1DPage() {
  // Filter products for B1D series
  const b1dProducts = noarkMCBProducts.filter(product => 
    product.model && product.model.startsWith('B1D') && product.model !== 'B1D Series'
  );

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
          <span className="text-gray-900">B1D Series</span>
        </nav>
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">NOARK B1D Series DC Miniature Circuit Breakers</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            B1D series DC Miniature Circuit Breakers (MCB) are UL 489 compliant and specifically designed for solar and battery applications.
            Available in 1-pole and 2-pole configurations with C-curve and D-curve trip characteristics.
          </p>
        </div>
        
        {/* Product Overview Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">B1D Series Overview</h2>
          <div className="prose max-w-none">
            <p>
              NOARK B1D series MCBs provide essential protection for DC circuits in solar and battery applications.
              These circuit breakers are specifically designed to handle the unique characteristics of DC power systems
              and meet UL 489 standards for safety and reliability.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Key Features</h3>
            <ul>
              <li><strong>DC Optimized Design:</strong> Specifically engineered for DC applications with higher interrupting ratings</li>
              <li><strong>Multiple Configurations:</strong> Available in 1-pole (125Vdc) and 2-pole (250Vdc) versions</li>
              <li><strong>Various Current Ratings:</strong> Options from 0.5A to 63A to match specific circuit requirements</li>
              <li><strong>Trip Curves:</strong> C-curve for standard applications and D-curve for high inrush current scenarios</li>
              <li><strong>Connection Options:</strong> Box lug terminals for standard installations and ring tongue terminals for special applications</li>
              <li><strong>DIN Rail Mounting:</strong> Easy installation on standard 35mm DIN rails</li>
              <li><strong>UL 489 Compliant:</strong> Meets strict safety standards for circuit protection</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Applications</h3>
            <ul>
              <li><strong>Solar PV Systems:</strong> DC circuit protection for photovoltaic arrays and combiners</li>
              <li><strong>Battery Energy Storage:</strong> Protection for battery banks and charging systems</li>
              <li><strong>DC Power Distribution:</strong> Circuit protection for DC power distribution panels</li>
              <li><strong>Telecommunications:</strong> Protection for DC-powered telecommunications equipment</li>
              <li><strong>Electric Vehicle Charging:</strong> DC circuit protection for EV charging infrastructure</li>
            </ul>
          </div>
        </div>
        
        {/* Product Grid */}
        <ProductGrid products={b1dProducts} />
        
        {/* Technical Information */}
        <div className="bg-white rounded-xl shadow-sm p-8 mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Technical Information</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specification</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">1-Pole</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">2-Pole</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Rated Voltage</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">125Vdc</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">250Vdc</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Rated Current Range</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">0.5A - 63A</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">0.5A - 63A</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Interrupting Rating</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">10kA @ 125Vdc</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">10kA @ 250Vdc</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Trip Characteristics</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">C-curve, D-curve</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">C-curve, D-curve</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Connection Type</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Box lug, Ring tongue</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Box lug</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Standard</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">UL 489, IEC 60947-2</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">UL 489, IEC 60947-2</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Mounting</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">35mm DIN rail</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">35mm DIN rail</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="bg-primary-50 rounded-xl p-6 mt-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Need Assistance?</h2>
          <p className="text-gray-600 mb-4">Our product specialists can help you select the right NOARK B1D circuit breaker for your specific DC application requirements.</p>
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