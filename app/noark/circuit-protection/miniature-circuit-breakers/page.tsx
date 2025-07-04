import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { HomeIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { noarkMCBProducts } from '@/lib/products/noark-mcb-products';

// Metadata for SEO
export const metadata: Metadata = {
  title: 'NOARK Miniature Circuit Breakers | West Shore Controls',
  description: 'Explore NOARK\'s range of high-quality Miniature Circuit Breakers (MCBs) including the B1N, B1H, B1NQ, B1D and B1E series. Reliable protection for electrical installations with multiple configurations.',
  keywords: 'NOARK, Miniature Circuit Breakers, MCB, B1N Series, B1H Series, B1D Series, B1NQ Series, B1E Series, circuit protection, electrical equipment',
};

export default function NoarkMCBPage() {
  // Count the number of B1N products for display
  const b1nProductCount = noarkMCBProducts.filter(product => 
    product.model && product.model.startsWith('B1N')).length;
  
  // Count the number of B1H products for display
  const b1hProductCount = noarkMCBProducts.filter(product => 
    product.model && product.model.startsWith('B1H')).length;
    
  // Count the number of B1NQ products for display
  const b1nqProductCount = noarkMCBProducts.filter(product => 
    product.model && product.model.startsWith('B1NQ')).length;
    
  // Count the number of B1D products for display
  const b1dProductCount = noarkMCBProducts.filter(product => 
    product.model && product.model.startsWith('B1D')).length;
    
  // Count the number of B1E products for display
  const b1eProductCount = noarkMCBProducts.filter(product => 
    product.model && product.model.startsWith('B1E')).length;
    
  // Count the number of Ex9BP products for display
  const ex9bpProductCount = noarkMCBProducts.filter(product => 
    product.model && product.model.startsWith('Ex9BP')).length;

  const subcategories = [
    {
      name: 'B1N Series',
      description: 'B1N series Miniature Circuit Breakers (MCB) - UL 489 compliant with multiple pole configurations and trip curve options.',
      image: '/assets/images/categories/Miniature Circuit Breakers/B1N Series Breakers.avif',
      url: '/noark/circuit-protection/miniature-circuit-breakers/b1n',
      productCount: b1nProductCount,
      features: [
        'Multiple pole configurations (1P, 2P, 3P)',
        'B, C, and D trip curves',
        '10kA interrupting rating',
        'Box lug and ring tongue connections',
      ],
    },
    {
      name: 'B1H Series',
      description: 'B1H series Miniature Circuit Breakers (MCB) - UL 489 compliant with multiple pole configurations and trip curve options.',
      image: '/assets/images/categories/Miniature Circuit Breakers/B1H Series Breakers.avif',
      url: '/noark/circuit-protection/miniature-circuit-breakers/b1h',
      productCount: b1hProductCount,
      features: [
        'Multiple pole configurations (1P, 2P, 3P)',
        'B, C, and D trip curves',
        '10kA interrupting rating (480Y/277Vac)',
        'Box lug and ring tongue connections',
      ],
    },
    {
      name: 'B1D Series',
      description: 'B1D series DC Miniature Circuit Breakers (MCB) - UL 489 compliant designed specifically for solar and battery applications.',
      image: '/assets/images/categories/Miniature Circuit Breakers/B1D Series Breakers.avif',
      url: '/noark/circuit-protection/miniature-circuit-breakers/b1d',
      productCount: b1dProductCount,
      features: [
        'DC circuit protection for solar/battery applications',
        'Multiple pole configurations (1P, 2P)',
        'C and D trip curves',
        '10kA interrupting rating (125Vdc/250Vdc)',
        'Box lug and ring tongue connections',
      ],
    },
    {
      name: 'B1E Series',
      description: 'B1E series Miniature Circuit Breakers (MCB) - UL 489 compliant high-current breakers for large commercial and industrial applications.',
      image: '/assets/images/categories/Miniature Circuit Breakers/B1E Series Breakers.avif',
      url: '/noark/circuit-protection/miniature-circuit-breakers/b1e',
      productCount: b1eProductCount,
      features: [
        'High current ratings up to 125A',
        'Multiple pole configurations (1P, 2P, 3P, 4P)',
        'B, C, and D trip curves',
        '5kA at 480Y/277Vac and 10kA at 240Vac',
        'Box lug connections for secure wiring',
      ],
    },
    {
      name: 'Ex9BN Series',
      description: 'Ex9BN series Miniature Circuit Breakers (MCB) - IEC 60898 compliant with multiple pole configurations and trip curve options.',
      image: '/assets/images/categories/Miniature Circuit Breakers/Miniature Circuit Breakers.avif',
      url: '/noark/circuit-protection/miniature-circuit-breakers/ex9bn',
      features: [
        'Multiple pole configurations (1P, 2P, 3P)',
        'B, C, and D trip curves',
        '6kA interrupting rating',
        'DIN rail mounting',
      ],
    },
    {
      name: 'Ex9BP Series',
      description: 'Ex9BP series Miniature Circuit Breakers (MCB) - UL 1077 compliant DC circuit breakers for high voltage applications.',
      image: '/assets/images/categories/Miniature Circuit Breakers/Miniature Circuit Breakers.avif',
      url: '/noark/circuit-protection/miniature-circuit-breakers/ex9bp',
      productCount: ex9bpProductCount,
      features: [
        '2-pole and 4-pole configurations',
        'C-curve trip characteristics',
        '6kA interrupting rating (300Vdc/600Vdc)',
        'DIN rail mounting (35mm width)',
      ],
    },
    {
      name: 'B1NQ Series',
      description: 'B1NQ series Miniature Circuit Breakers (MCB) - UL 489 compliant with 1-pole and 2-pole configurations and various trip curves.',
      image: '/B1NQ+1P.jpg',
      url: '/noark/circuit-protection/miniature-circuit-breakers/b1nq',
      productCount: b1nqProductCount,
      features: [
        '1-pole and 2-pole configurations',
        'B, C, and D trip curves',
        '10kA interrupting rating (120Vac/240Vac)',
        'Box lug and quick plug-in connections (T models)',
        'DIN rail mounting (35mm width)',
      ],
    },
    // Add more subcategories as they become available
  ];

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
          <span className="text-gray-900">Miniature Circuit Breakers</span>
        </nav>
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">NOARK Miniature Circuit Breakers</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            NOARK offers a comprehensive range of Miniature Circuit Breakers designed for various applications,
            providing reliable overcurrent and short-circuit protection for electrical installations.
          </p>
        </div>
        
        {/* Subcategories Grid */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Series</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {subcategories.map((subcategory) => (
            <Link 
              href={subcategory.url} 
              key={subcategory.name}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-lg font-semibold text-gray-800">
                    {subcategory.name}
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600">
                    {subcategory.name}
                  </h3>
                  {subcategory.productCount && (
                    <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                      {subcategory.productCount} products
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-4">
                  {subcategory.description}
                </p>
                
                {/* Features */}
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {subcategory.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start">
                        <svg className="h-4 w-4 text-primary-600 mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* CTA Button */}
                <div className="mt-6">
                  <span className="inline-flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-4 py-2 border border-primary-300 text-sm font-medium rounded-md text-primary-700 bg-primary-50 hover:bg-primary-100 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                      View Series Details
                      <svg className="ml-2 -mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Overview Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About NOARK Miniature Circuit Breakers</h2>
          <div className="prose max-w-none">
            <p>
              NOARK Miniature Circuit Breakers (MCBs) provide essential protection for electrical circuits against overloads and short circuits. 
              Available in various configurations, these breakers are designed to meet different application requirements across residential, commercial, and industrial environments.
            </p>
            
            <h3>Applications</h3>
            <ul>
              <li><strong>Residential:</strong> Protection for lighting circuits, power outlets, and home appliances</li>
              <li><strong>Commercial:</strong> Office buildings, retail spaces, and small businesses</li>
              <li><strong>Industrial:</strong> Factory automation, control panels, and machine protection</li>
              <li><strong>Renewable Energy:</strong> Solar power systems and battery storage applications (B1D Series)</li>
              <li><strong>Heavy Commercial:</strong> Large equipment, industrial machinery, and high-current loads (B1E Series)</li>
            </ul>
            
            <h3>Key Benefits</h3>
            <ul>
              <li><strong>Reliable Protection:</strong> Consistent tripping characteristics for dependable circuit protection</li>
              <li><strong>Multiple Options:</strong> Various current ratings, trip curves, and pole configurations</li>
              <li><strong>Standards Compliance:</strong> Meets UL 489 and international safety standards</li>
              <li><strong>Easy Installation:</strong> DIN rail mounting for simple setup and replacement</li>
              <li><strong>Durable Construction:</strong> Designed for long service life in demanding environments</li>
              <li><strong>Application Specific:</strong> Specialized series for AC, DC, and high current applications</li>
            </ul>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="bg-primary-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Need Assistance?</h2>
          <p className="text-gray-600 mb-4">Our product specialists can help you select the right NOARK circuit protection solution for your specific requirements.</p>
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