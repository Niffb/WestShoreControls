'use client'

import { useState, useMemo, useEffect } from 'react'
import { MagnifyingGlassIcon, XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline'
import { ProductType } from '@/lib/utils/product-types'
import { useDebounce } from '@/lib/utils/performance-utils'

interface ProductTypeSearchProps {
  productTypes: ProductType[]
  onFilteredResults: (filteredTypes: ProductType[]) => void
  placeholder?: string
  showBrandFilter?: boolean
  showCategoryFilter?: boolean
}

export default function ProductTypeSearch({
  productTypes,
  onFilteredResults,
  placeholder = "Search product types...",
  showBrandFilter = true,
  showCategoryFilter = false
}: ProductTypeSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  
  // Use debounced search for better performance
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  // Get unique brands from all product types
  const allBrands = useMemo(() => {
    const brandSet = new Set<string>()
    productTypes.forEach(type => {
      if (type.brands && Array.isArray(type.brands)) {
        type.brands.forEach(brand => {
          if (brand && typeof brand === 'string') {
            brandSet.add(brand)
          }
        })
      }
    })
    return Array.from(brandSet).sort()
  }, [productTypes])

  // Filter product types based on search query and selected filters
  const filteredProductTypes = useMemo(() => {
    let filtered = [...productTypes]

    // Apply search query filter
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase().trim()
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
  }, [productTypes, debouncedSearchQuery, selectedBrands])

  // Notify parent component of filtered results
  useEffect(() => {
    onFilteredResults(filteredProductTypes)
  }, [filteredProductTypes, onFilteredResults])

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    )
  }

  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedBrands([])
    setShowFilters(false)
  }

  const hasActiveFilters = searchQuery.trim() || selectedBrands.length > 0

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Input */}
      <div className="relative mb-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-10 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
            >
              <XMarkIcon className="h-4 w-4 text-gray-400" />
            </button>
          )}
          {showBrandFilter && (
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
      {showFilters && showBrandFilter && (
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
          
          {searchQuery && (
            <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              Search: "{searchQuery}"
              <button
                onClick={() => setSearchQuery('')}
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
        Showing {filteredProductTypes.length} of {productTypes.length} product types
        {hasActiveFilters && (
          <span className="ml-2 text-red-600">
            ({productTypes.length - filteredProductTypes.length} filtered out)
          </span>
        )}
        {process.env.NODE_ENV === 'development' && (
          <div className="text-xs text-gray-500 mt-1">
            Debug: {allBrands.length} brands available, Search: "{debouncedSearchQuery}", Selected brands: {selectedBrands.length}
            <button 
              onClick={() => console.log('Product types:', productTypes.slice(0, 3))}
              className="ml-2 px-2 py-1 bg-blue-500 text-white text-xs rounded"
            >
              Log Data
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 