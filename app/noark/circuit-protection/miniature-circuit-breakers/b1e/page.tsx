import { Metadata } from 'next';
import Link from 'next/link';
import { HomeIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import ProductGrid from '../ProductGrid';
import { noarkMCBProducts } from '@/lib/products/noark-mcb-products';

// Metadata for SEO
export const metadata: Metadata = {
  title: 'NOARK B1E Series High Current Miniature Circuit Breakers | West Shore Controls',
  description: 'Explore NOARK\'s B1E series high current Miniature Circuit Breakers (MCBs) designed for large commercial and industrial applications. UL 489 compliant with current ratings up to 125A.',
  keywords: 'NOARK, B1E Series, High Current Circuit Breakers, MCB, UL 489, industrial circuit protection, high current protection, miniature circuit breakers',
};

export default function NoarkB1EPage() {
  // Filter products for B1E series
  const b1eProducts = noarkMCBProducts.filter(product => 
    product.model && product.model.startsWith('B1E') && product.model !== 'B1E Series'
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
          <span className="text-gray-900">B1E Series</span>
        </nav>
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">NOARK B1E Series High Current Miniature Circuit Breakers</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            B1E series Miniature Circuit Breakers (MCB) are UL 489 compliant high-current breakers designed for demanding applications.
            Available in 1-pole, 2-pole, 3-pole, and 4-pole configurations with current ratings up to 125A.
          </p>
        </div>
        
        {/* Product Overview Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">B1E Series Overview</h2>
          <div className="prose max-w-none">
            <p>
              NOARK B1E series MCBs provide essential protection for high-current circuits in commercial and industrial applications.
              These circuit breakers are specifically designed to handle large loads while maintaining the compact form factor of
              standard MCBs with current ratings up to 125A.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Key Features</h3>
            <ul>
              <li><strong>High Current Ratings:</strong> Available in ratings up to 125A for demanding applications</li>
              <li><strong>Multiple Configurations:</strong> Available in 1-pole, 2-pole, 3-pole, and 4-pole versions</li>
              <li><strong>Various Trip Curves:</strong> B-curve for sensitive loads, C-curve for standard applications, and D-curve for high inrush current scenarios</li>
              <li><strong>Voltage Ratings:</strong> Suitable for 240Vac and 480Y/277Vac systems</li>
              <li><strong>High Interrupting Rating:</strong> 5kA at 480Y/277Vac and 10kA at 240Vac</li>
              <li><strong>Box Lug Connections:</strong> Secure termination for large conductors</li>
              <li><strong>DIN Rail Mounting:</strong> Easy installation on standard 35mm DIN rails</li>
              <li><strong>UL 489 Compliant:</strong> Meets strict safety standards for circuit protection</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Applications</h3>
            <ul>
              <li><strong>Commercial Buildings:</strong> Main distribution panels and large power systems</li>
              <li><strong>Industrial Facilities:</strong> Protection for high-current machinery and equipment</li>
              <li><strong>HVAC Systems:</strong> Large air handling units and cooling equipment</li>
              <li><strong>Data Centers:</strong> Critical power distribution and backup systems</li>
              <li><strong>Manufacturing:</strong> High-power production machinery and equipment</li>
              <li><strong>Motor Control Centers:</strong> Protection for large motor loads</li>
            </ul>
          </div>
        </div>
        
        {/* Product Grid */}
        <ProductGrid products={b1eProducts} />
        
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
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">3-Pole</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">4-Pole</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Rated Voltage</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">480Y/277Vac</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">480Y/277Vac, 220Vdc</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">480Y/277Vac</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">480Y/277Vac</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Rated Current Range</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">15A - 125A</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">15A - 125A</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">15A - 125A</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">15A - 125A</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Interrupting Rating</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">5kA @ 480Y/277Vac</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">5kA @ 480Y/277Vac, 10kA @ 220Vdc</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">5kA @ 480Y/277Vac</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">5kA @ 480Y/277Vac</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Trip Characteristics</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">B, C, D curves</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">B, C, D curves</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">B, C, D curves</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">B, C, D curves</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Connection Type</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Box lug</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Box lug</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Box lug</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Box lug</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Standard</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">UL 489, IEC 60898</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">UL 489, IEC 60898</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">UL 489, IEC 60898</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">UL 489, IEC 60898</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Mounting</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">35mm DIN rail</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">35mm DIN rail</td>
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
          <p className="text-gray-600 mb-4">Our product specialists can help you select the right NOARK B1E circuit breaker for your high-current application requirements.</p>
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