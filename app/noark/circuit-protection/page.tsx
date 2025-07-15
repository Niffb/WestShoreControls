import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { HomeIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// Metadata for SEO
export const metadata: Metadata = {
  title: 'NOARK Circuit Protection Solutions | West Shore Controls',
  description: 'Explore NOARK\'s comprehensive range of circuit protection products including MCBs, MCCBs, MCPs, enclosed breakers, fuse holders and surge protection devices.',
  keywords: 'NOARK, Circuit Protection, MCB, MCCB, MCP, Fuse Holders, Surge Protection, Electrical Equipment',
};

export default function NoarkCircuitProtectionPage() {
  // Define subcategories for the Circuit Protection category
  const subcategories = [
    {
      name: 'Miniature Circuit Breakers',
      description: 'Miniature Circuit Breakers (MCBs) for protection against overloads and short circuits in low-voltage electrical installations.',
      url: '/noark/circuit-protection/miniature-circuit-breakers',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
    },
    {
      name: 'Molded Case Circuit Breakers',
      description: 'Molded Case Circuit Breakers (MCCBs) designed for higher amperage applications with adjustable trip settings.',
      url: '/noark/circuit-protection/molded-case-circuit-breakers-mccbs',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 019 14.437V9.564z" />
        </svg>
      ),
    },
    {
      name: 'Motor Circuit Protectors',
      description: 'Motor Circuit Protectors (MCPs) specifically designed to protect motor circuits against short circuits.',
      url: '/noark/circuit-protection/motor-circuit-protectors-mcps',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" />
        </svg>
      ),
    },
    {
      name: 'Enclosed Breakers',
      description: 'Enclosed circuit breakers with protective housing for safe installation in various environments.',
      url: '/noark/circuit-protection/enclosed-breakers',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      ),
    },
    {
      name: 'DIN Rail Fuse Holders and Fuses',
      description: 'DIN rail mountable fuse holders and fuses for circuit protection in control panels and electrical cabinets.',
      url: '/noark/circuit-protection/din-rail-fuse-holders-and-fuses',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
        </svg>
      ),
    },
    {
      name: 'Surge Protective Devices',
      description: 'Protection against voltage surges and transients in electrical systems to prevent damage to equipment.',
      url: '/noark/circuit-protection/surge-protective-device',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
    },
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
          <span className="text-gray-900">Circuit Protection</span>
        </nav>
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">NOARK Circuit Protection Solutions</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            NOARK offers a comprehensive range of circuit protection products designed to safeguard electrical systems
            from overloads, short circuits, and other electrical faults.
          </p>
        </div>
        
        {/* Subcategories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {subcategories.map((subcategory) => (
            <Link 
              href={subcategory.url} 
              key={subcategory.name}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
            >
              <div className="p-6">
                <div className="text-primary-600 mb-4 group-hover:text-primary-700">
                  {subcategory.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {subcategory.name}
                </h3>
                <p className="text-gray-600">
                  {subcategory.description}
                </p>
                <div className="mt-4 flex items-center text-primary-600 group-hover:text-primary-800">
                  <span>View Products</span>
                  <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* About NOARK Circuit Protection */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About NOARK Circuit Protection</h2>
          <div className="prose max-w-none">
            <p>
              NOARK Electric provides comprehensive circuit protection solutions designed to meet the needs of modern electrical systems.
              Their extensive range of products ensures reliable protection for electrical installations across residential, commercial, and industrial applications.
            </p>
            
            <h3>Quality and Standards</h3>
            <p>
              NOARK's circuit protection devices are manufactured to meet or exceed international standards including UL, IEC, and CSA requirements.
              Each product undergoes rigorous testing to ensure consistent performance and long-term reliability.
            </p>
            
            <h3>Applications</h3>
            <p>
              NOARK circuit protection products are suitable for a wide range of applications including:
            </p>
            <ul>
              <li>Power distribution systems</li>
              <li>Control panels</li>
              <li>Motor control centers</li>
              <li>Building electrical systems</li>
              <li>Industrial automation</li>
              <li>Renewable energy installations</li>
            </ul>
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