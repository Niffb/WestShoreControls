'use client';

import { Suspense, useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  HomeIcon, 
  ChevronRightIcon, 
  XMarkIcon,
  AdjustmentsHorizontalIcon,
  TableCellsIcon,
  Squares2X2Icon,
  MagnifyingGlassIcon,
  ListBulletIcon
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import DynamicProductGrid from '@/components/product/DynamicProductGrid';
import ProductModal from '@/components/product/ProductModal';
import { noarkB1HProducts } from '@/lib/products/noark-b1h-products';
import { Product } from '@/lib/types/shared-types';

// Parameter options for filter
const filterOptions = {
  poles: ['1-pole (1P)', '2-poles (2P)', '3-poles (3P)'],
  tripCurve: ['B-curve', 'C-curve', 'D-curve'],
  currentRating: ['0.5A', '1A', '1.6A', '2A', '3A', '4A', '5A', '6A', '7A', '8A', '10A', '13A', '15A', '16A', '20A', '25A', '30A', '32A'],
  connections: ['box lug connections', 'ring tongue connections']
};

export default function NoarkB1HPage() {
  // State for filters
  const [selectedPoles, setSelectedPoles] = useState<string[]>([]);
  const [selectedTripCurve, setSelectedTripCurve] = useState<string[]>([]);
  const [selectedCurrentRating, setSelectedCurrentRating] = useState<string[]>([]);
  const [selectedConnections, setSelectedConnections] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'table'>('grid');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter products based on selected parameters
  const filteredProducts = useMemo(() => {
    return noarkB1HProducts.filter(product => {
      // Search by model or description
      if (searchQuery && !product.model?.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !product.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Filter by poles
      if (selectedPoles.length > 0 && !selectedPoles.some(pole => product.specs?.some(spec => spec.includes(pole)))) {
        return false;
      }

      // Filter by trip curve
      if (selectedTripCurve.length > 0 && !selectedTripCurve.some(curve => product.specs?.some(spec => spec.includes(curve)))) {
        return false;
      }

      // Filter by current rating
      if (selectedCurrentRating.length > 0 && !selectedCurrentRating.some(rating => product.specs?.some(spec => spec.includes(`Current Rating: ${rating}`)))) {
        return false;
      }

      // Filter by connections
      if (selectedConnections.length > 0 && !selectedConnections.some(conn => product.specs?.some(spec => spec.includes(conn)))) {
        return false;
      }

      return true;
    });
  }, [selectedPoles, selectedTripCurve, selectedCurrentRating, selectedConnections, searchQuery]);

  // Handle filter changes
  const toggleFilter = useCallback((value: string, currentSelections: string[], setSelections: React.Dispatch<React.SetStateAction<string[]>>) => {
    setSelections(prev => 
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSelectedPoles([]);
    setSelectedTripCurve([]);
    setSelectedCurrentRating([]);
    setSelectedConnections([]);
    setSearchQuery('');
  }, []);

  // Handle product click
  const handleProductClick = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  // Close modal
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

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
          <span className="text-gray-900">B1H Series</span>
        </nav>
        
        {/* Back button */}
        <Link href="/noark/circuit-protection/miniature-circuit-breakers" className="inline-flex items-center text-primary-600 hover:text-primary-800 mb-6 transition duration-150 ease-in-out">
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Miniature Circuit Breakers
        </Link>
        
        {/* Header with Product Image */}
        <div className="grid md:grid-cols-2 gap-8 mb-10 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="relative h-64 md:h-full bg-white">
            <Image
              src="/assets/images/categories/Miniature Circuit Breakers/B1H Series Breakers.avif"
              alt="NOARK B1H Series Miniature Circuit Breaker"
              fill
              className="object-contain p-4"
              priority
            />
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">NOARK B1H Series Miniature Circuit Breakers</h1>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <div className="flex items-center mr-4">
                <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                <span>4.6 (37 reviews)</span>
              </div>
              <div className="flex items-center">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">In Stock</span>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              The B1H series Miniature Circuit Breakers (MCBs) from NOARK provide reliable circuit protection in a variety of configurations. 
              UL 489 compliant, these breakers are available in 1-pole, 2-pole, and 3-pole configurations with B-curve, C-curve, and D-curve trip characteristics.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                <span className="text-sm text-gray-700">10kA interrupting rating (480Y/277Vac)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                <span className="text-sm text-gray-700">DIN rail mounting (35mm)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                <span className="text-sm text-gray-700">UL 489 certified for safety</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Filter and Search Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <div className="flex items-center gap-2">
              <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-900">Filter Products</h2>
            </div>
            
            {/* View mode switcher */}
            <div className="flex items-center border border-gray-200 rounded-lg bg-white">
              <button 
                onClick={() => setViewMode('grid')}
                className={`flex items-center px-3 py-1.5 ${viewMode === 'grid' ? 'bg-primary-50 text-primary-700' : 'text-gray-600'}`}
              >
                <Squares2X2Icon className="h-5 w-5" />
                <span className="ml-1 text-sm">Grid</span>
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`flex items-center px-3 py-1.5 ${viewMode === 'list' ? 'bg-primary-50 text-primary-700' : 'text-gray-600'}`}
              >
                <ListBulletIcon className="h-5 w-5" />
                <span className="ml-1 text-sm">List</span>
              </button>
              <button 
                onClick={() => setViewMode('table')}
                className={`flex items-center px-3 py-1.5 ${viewMode === 'table' ? 'bg-primary-50 text-primary-700' : 'text-gray-600'}`}
              >
                <TableCellsIcon className="h-5 w-5" />
                <span className="ml-1 text-sm">Table</span>
              </button>
            </div>
          </div>
          
          {/* Search input */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              placeholder="Search by model number or specifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Filter groups */}
          <div className="space-y-6">
            {/* Poles filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Pole Configuration</h3>
              <div className="flex flex-wrap gap-2">
                {filterOptions.poles.map((pole) => (
                  <button
                    key={pole}
                    onClick={() => toggleFilter(pole, selectedPoles, setSelectedPoles)}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      selectedPoles.includes(pole)
                        ? 'bg-primary-100 text-primary-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {pole}
                    {selectedPoles.includes(pole) && (
                      <XMarkIcon className="ml-1 h-4 w-4" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Trip curve filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Trip Curve</h3>
              <div className="flex flex-wrap gap-2">
                {filterOptions.tripCurve.map((curve) => (
                  <button
                    key={curve}
                    onClick={() => toggleFilter(curve, selectedTripCurve, setSelectedTripCurve)}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      selectedTripCurve.includes(curve)
                        ? 'bg-primary-100 text-primary-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {curve}
                    {selectedTripCurve.includes(curve) && (
                      <XMarkIcon className="ml-1 h-4 w-4" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Current rating filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Current Rating</h3>
              <div className="flex flex-wrap gap-2">
                {filterOptions.currentRating.map((rating) => (
                  <button
                    key={rating}
                    onClick={() => toggleFilter(rating, selectedCurrentRating, setSelectedCurrentRating)}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      selectedCurrentRating.includes(rating)
                        ? 'bg-primary-100 text-primary-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {rating}
                    {selectedCurrentRating.includes(rating) && (
                      <XMarkIcon className="ml-1 h-4 w-4" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Connections filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Connection Type</h3>
              <div className="flex flex-wrap gap-2">
                {filterOptions.connections.map((conn) => (
                  <button
                    key={conn}
                    onClick={() => toggleFilter(conn, selectedConnections, setSelectedConnections)}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      selectedConnections.includes(conn)
                        ? 'bg-primary-100 text-primary-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {conn}
                    {selectedConnections.includes(conn) && (
                      <XMarkIcon className="ml-1 h-4 w-4" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Clear filters button */}
            <div className="flex justify-end">
              <button
                onClick={clearFilters}
                className="text-primary-600 hover:text-primary-800 text-sm font-medium"
              >
                Clear all filters
              </button>
            </div>
          </div>
        </div>
        
        {/* Results count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing <span className="font-medium">{filteredProducts.length}</span> products
          </p>
        </div>
        
        {/* Product Grid */}
        <div className="mb-12">
          <Suspense fallback={<div>Loading products...</div>}>
            <DynamicProductGrid 
              products={filteredProducts} 
              onProductClick={handleProductClick}
              viewMode={viewMode}
            />
          </Suspense>
        </div>
        
        {/* Product Information Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About B1H Series Miniature Circuit Breakers</h2>
          <div className="prose max-w-none">
            <p>
              NOARK B1H Series Miniature Circuit Breakers (MCBs) provide essential protection against overloads and short circuits in electrical installations. 
              These UL 489 listed devices are designed for residential, commercial, and industrial applications where reliable circuit protection is required.
            </p>
            
            <h3>Key Features</h3>
            <ul>
              <li><strong>Multiple Configurations:</strong> Available in 1-pole, 2-pole, and 3-pole versions</li>
              <li><strong>Trip Curve Options:</strong> B-curve, C-curve, and D-curve to suit various applications</li>
              <li><strong>Current Ratings:</strong> Wide range from 1A to 32A</li>
              <li><strong>Connection Types:</strong> Box lug or ring tongue connections</li>
              <li><strong>High Interrupting Rating:</strong> 10kA at 480Y/277VAC</li>
              <li><strong>Standard Mounting:</strong> 35mm DIN rail compatible</li>
              <li><strong>UL Listed:</strong> Complies with UL 489 standards for safety</li>
            </ul>
            
            <h3>Applications</h3>
            <p>
              B1H Series Miniature Circuit Breakers are suitable for a wide range of applications, including:
            </p>
            <ul>
              <li>Main and branch circuit protection</li>
              <li>Lighting circuits</li>
              <li>HVAC systems</li>
              <li>Motor control circuits</li>
              <li>Industrial equipment protection</li>
              <li>Commercial building electrical systems</li>
            </ul>
            
            <p>
              For assistance in selecting the right B1H Series MCB for your specific application, please contact our technical support team.
            </p>
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
      
      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          product={selectedProduct}
        />
      )}
    </div>
  );
} 