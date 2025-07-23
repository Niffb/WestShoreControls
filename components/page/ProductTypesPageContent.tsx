'use client'

import { useState, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { 
  BoltIcon, 
  CpuChipIcon, 
  PowerIcon, 
  WrenchScrewdriverIcon,
  LightBulbIcon,
  CogIcon,
  ShieldCheckIcon,
  ComputerDesktopIcon,
  LinkIcon,
  LockClosedIcon,
  RectangleStackIcon,
  ShieldExclamationIcon,
  HandRaisedIcon,
  PlayIcon,
  ArrowPathIcon,
  Battery0Icon,
  Squares2X2Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'
import { ProductType } from '@/lib/utils/product-types'
import { useDebouncedSearch } from '@/lib/utils/performance-utils'

// Icon mapping
const iconMap: { [key: string]: any } = {
  'BoltIcon': BoltIcon,
  'CpuChipIcon': CpuChipIcon,
  'PowerIcon': PowerIcon,
  'WrenchScrewdriverIcon': WrenchScrewdriverIcon,
  'LightBulbIcon': LightBulbIcon,
  'CogIcon': CogIcon,
  'ShieldCheckIcon': ShieldCheckIcon,
  'ComputerDesktopIcon': ComputerDesktopIcon,
  'LinkIcon': LinkIcon,
  'LockClosedIcon': LockClosedIcon,
  'RectangleStackIcon': RectangleStackIcon,
  'CircuitBoardIcon': Squares2X2Icon,
  'ShieldExclamationIcon': ShieldExclamationIcon,
  'HandRaisedIcon': HandRaisedIcon,
  'PlayIcon': PlayIcon,
  'ArrowPathIcon': ArrowPathIcon,
  'BatteryIcon': Battery0Icon,
}

interface ProductTypesPageContentProps {
  featuredTypes: ProductType[]
  otherTypes: ProductType[]
}

export default function ProductTypesPageContent({ 
  featuredTypes, 
  otherTypes 
}: ProductTypesPageContentProps) {
  // Use the same debounced search logic as the working brand pages
  const { searchTerm, debouncedSearchTerm, setSearchTerm } = useDebouncedSearch('', 300)
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Combine all types for search
  const allTypes = [...featuredTypes, ...otherTypes]

  // Get unique brands from all product types
  const allBrands = useMemo(() => {
    const brandSet = new Set<string>()
    allTypes.forEach(type => {
      if (type.brands && Array.isArray(type.brands)) {
        type.brands.forEach(brand => {
          if (brand && typeof brand === 'string') {
            brandSet.add(brand)
          }
        })
      }
    })
    return Array.from(brandSet).sort()
  }, [allTypes])

  // Filter product types based on search query and selected filters
  const filteredProductTypes = useMemo(() => {
    let filtered = [...allTypes]

    // Apply search query filter
    if (debouncedSearchTerm.trim()) {
      const query = debouncedSearchTerm.toLowerCase().trim()
      filtered = filtered.filter(type => {
        return (
          type.name?.toLowerCase().includes(query) ||
          type.description?.toLowerCase().includes(query) ||
          type.brands?.some(brand => brand.toLowerCase().includes(query)) ||
          type.category?.toLowerCase().includes(query)
        )
      })
    }

    // Apply brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(type => 
        type.brands?.some(brand => selectedBrands.includes(brand))
      )
    }

    return filtered
  }, [allTypes, debouncedSearchTerm, selectedBrands])

  const searchActive = filteredProductTypes.length !== allTypes.length

  // Determine which types to display based on search activity
  const displayedFeaturedTypes = searchActive ? filteredProductTypes : featuredTypes;
  const displayedOtherTypes = searchActive ? [] : otherTypes;

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    )
  }

  const clearAllFilters = () => {
    setSearchTerm('')
    setSelectedBrands([])
    setShowFilters(false)
  }

  const hasActiveFilters = searchTerm.trim() || selectedBrands.length > 0

  const renderProductTypeCard = (type: ProductType, featured: boolean = false) => {
    const IconComponent = iconMap[type.icon] || CogIcon
    
    if (featured) {
      return (
        <Link
          key={type.id}
          href={`/product-types/${type.slug}`}
          className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-red-200"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                <IconComponent className="h-6 w-6 text-red-600" />
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{type.count}</div>
                <div className="text-xs text-gray-500">products</div>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
              {type.name}
            </h3>
            
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {type.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {type.brands.slice(0, 3).map((brand) => (
                  <span key={brand} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {brand}
                  </span>
                ))}
                {type.brands.length > 3 && (
                  <span className="text-xs text-gray-500">+{type.brands.length - 3} more</span>
                )}
              </div>
              
              <div className="text-red-600 group-hover:text-red-700 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      )
    } else {
      return (
        <Link
          key={type.id}
          href={`/product-types/${type.slug}`}
          className="group flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-red-200"
        >
          <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-red-100 transition-colors mr-4">
            <IconComponent className="h-5 w-5 text-gray-600 group-hover:text-red-600" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 group-hover:text-red-600 transition-colors">
              {type.name}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {type.count} products from {type.brands.length} brands
            </p>
          </div>
          
          <div className="text-gray-400 group-hover:text-red-600 transition-colors">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </Link>
      )
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      {/* Search Section */}
      <div className="mb-12 w-full max-w-4xl mx-auto">
        {/* Search Input */}
        <div className="relative mb-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search product types..."
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-10 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
              >
                <XMarkIcon className="h-4 w-4 text-gray-400" />
              </button>
            )}
            {allBrands.length > 0 && (
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors ${
                  showFilters || selectedBrands.length > 0
                    ? 'bg-red-100 text-red-600'
                    : 'hover:bg-gray-100 text-gray-400'
                }`}
              >
                <FunnelIcon className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && allBrands.length > 0 && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-900">Filter by Brand</h3>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Clear All
                </button>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {allBrands.map(brand => (
                <button
                  key={brand}
                  onClick={() => handleBrandToggle(brand)}
                  className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                    selectedBrands.includes(brand)
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-red-300 hover:text-red-600'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            
                      {searchTerm && (
            <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              Search: "{searchTerm}"
                <button
                  onClick={() => setSearchTerm('')}
                  className="ml-1 p-0.5 hover:bg-blue-200 rounded-full"
                >
                  <XMarkIcon className="h-3 w-3" />
                </button>
              </span>
            )}
            
            {selectedBrands.map(brand => (
              <span
                key={brand}
                className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 text-sm rounded-full"
              >
                {brand}
                <button
                  onClick={() => handleBrandToggle(brand)}
                  className="ml-1 p-0.5 hover:bg-red-200 rounded-full"
                >
                  <XMarkIcon className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredProductTypes.length} of {allTypes.length} product types
          {hasActiveFilters && (
            <span className="ml-2 text-red-600">
              ({allTypes.length - filteredProductTypes.length} filtered out)
            </span>
          )}
        </div>
      </div>

      {/* Featured Product Types (only show when search is not active) */}
      {!searchActive && displayedFeaturedTypes.length > 0 && (
        <>
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Product Types</h2>
            <p className="text-gray-600">Most popular product categories across all brands</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {displayedFeaturedTypes.map((type) => renderProductTypeCard(type, true))}
          </div>
        </>
      )}

      {/* Search Results or All Product Types */}
      {searchActive ? (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Search Results</h2>
            <p className="text-gray-600">
              {displayedFeaturedTypes.length === 0 
                ? "No product types found matching your criteria"
                : `Found ${displayedFeaturedTypes.length} product types matching your criteria`
              }
            </p>
          </div>

          {displayedFeaturedTypes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedFeaturedTypes.map((type) => renderProductTypeCard(type, true))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <CogIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No product types found</p>
                <p className="text-sm">Try adjusting your search criteria</p>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {/* All Product Types */}
          {displayedOtherTypes.length > 0 && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">All Product Types</h2>
                <p className="text-gray-600">Complete list of all available product categories</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedOtherTypes.map((type) => renderProductTypeCard(type, false))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
} 