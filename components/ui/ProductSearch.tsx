'use client'

import { useState, useMemo, useEffect } from 'react'
import { MagnifyingGlassIcon, XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline'
import { Product } from '@/lib/types/shared-types'

interface ProductSearchProps {
  products: Product[]
  onFilteredResults: (filteredProducts: Product[]) => void
  placeholder?: string
  showBrandFilter?: boolean
  showCategoryFilter?: boolean
}

export default function ProductSearch({
  products,
  onFilteredResults,
  placeholder = "Search products...",
  showBrandFilter = true,
  showCategoryFilter = false
}: ProductSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Get unique brands and categories from products
  const { allBrands, allCategories } = useMemo(() => {
    const brandSet = new Set<string>()
    const categorySet = new Set<string>()
    
    products.forEach(product => {
      if (product.brand) brandSet.add(product.brand)
      if (product.category) categorySet.add(product.category)
    })
    
    return {
      allBrands: Array.from(brandSet).sort(),
      allCategories: Array.from(categorySet).sort()
    }
  }, [products])

  // Filter products based on search query and selected filters
  const filteredProducts = useMemo(() => {
    let filtered = products

    // Apply search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter(product => {
        const searchableText = [
          product.name,
          product.description,
          product.brand,
          product.category,
          product.model,
          ...(product.specs || []),
          ...(product.features || [])
        ].join(' ').toLowerCase()
        
        return searchableText.includes(query)
      })
    }

    // Apply brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => 
        product.brand && selectedBrands.includes(product.brand)
      )
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        product.category && selectedCategories.includes(product.category)
      )
    }

    return filtered
  }, [products, searchQuery, selectedBrands, selectedCategories])

  // Notify parent component of filtered results
  useEffect(() => {
    onFilteredResults(filteredProducts)
  }, [filteredProducts, onFilteredResults])

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    )
  }

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedBrands([])
    setSelectedCategories([])
    setShowFilters(false)
  }

  const hasActiveFilters = searchQuery.trim() || selectedBrands.length > 0 || selectedCategories.length > 0

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
          {(showBrandFilter || showCategoryFilter) && (
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors ${
                showFilters || selectedBrands.length > 0 || selectedCategories.length > 0
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
      {showFilters && (showBrandFilter || showCategoryFilter) && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-900">Filters</h3>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Clear All
              </button>
            )}
          </div>
          
          {/* Brand Filter */}
          {showBrandFilter && allBrands.length > 1 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Brand</h4>
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

          {/* Category Filter */}
          {showCategoryFilter && allCategories.length > 1 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Category</h4>
              <div className="flex flex-wrap gap-2">
                {allCategories.map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategoryToggle(category)}
                    className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                      selectedCategories.includes(category)
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:text-blue-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
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
              Brand: {brand}
              <button
                onClick={() => handleBrandToggle(brand)}
                className="ml-1 p-0.5 hover:bg-red-200 rounded-full"
              >
                <XMarkIcon className="h-3 w-3" />
              </button>
            </span>
          ))}

          {selectedCategories.map(category => (
            <span
              key={category}
              className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
            >
              Category: {category}
              <button
                onClick={() => handleCategoryToggle(category)}
                className="ml-1 p-0.5 hover:bg-blue-200 rounded-full"
              >
                <XMarkIcon className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredProducts.length} of {products.length} products
        {hasActiveFilters && (
          <span className="ml-2 text-red-600">
            ({products.length - filteredProducts.length} filtered out)
          </span>
        )}
      </div>
    </div>
  )
} 