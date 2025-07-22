'use client'

import { useState, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon, XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline'
import { Product } from '@/lib/types/shared-types'
import { ProductType } from '@/lib/utils/product-types'
import { ProductImage } from '@/components/ui/OptimizedImage'
import ProgressiveProductGrid from '@/components/ui/ProgressiveProductGrid'
import { useDebounce } from '@/lib/utils/performance-utils'
import { getImageUrl } from '@/lib/config/image-config'

interface ProductTypeDetailPageProps {
  productType: ProductType
  products: Product[]
  usePagination: boolean
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Pagination component
function Pagination({ 
  currentPage, 
  totalPages, 
  hasNext, 
  hasPrev, 
  productType 
}: {
  currentPage: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
  productType: string
}) {
  const getPageUrl = (page: number) => `/product-types/${productType}?page=${page}`
  
  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      const start = Math.max(1, currentPage - 2)
      const end = Math.min(totalPages, start + maxVisible - 1)
      
      if (start > 1) {
        pages.push(1)
        if (start > 2) pages.push('...')
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      if (end < totalPages) {
        if (end < totalPages - 1) pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      {/* Previous button */}
      <Link
        href={getPageUrl(currentPage - 1)}
        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
          hasPrev
            ? 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
            : 'text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed'
        }`}
        {...(!hasPrev && { 'aria-disabled': true })}
      >
        <ChevronLeftIcon className="h-4 w-4 mr-1" />
        Previous
      </Link>

      {/* Page numbers */}
      <div className="flex space-x-1">
        {getPageNumbers().map((page, index) => (
          <span key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-gray-500">...</span>
            ) : (
              <Link
                href={getPageUrl(page as number)}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  page === currentPage
                    ? 'text-white bg-red-600 border border-red-600'
                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </Link>
            )}
          </span>
        ))}
      </div>

      {/* Next button */}
      <Link
        href={getPageUrl(currentPage + 1)}
        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
          hasNext
            ? 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
            : 'text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed'
        }`}
        {...(!hasNext && { 'aria-disabled': true })}
      >
        Next
        <ChevronRightIcon className="h-4 w-4 ml-1" />
      </Link>
    </div>
  )
}

export default function ProductTypeDetailPage({
  productType,
  products: initialProducts,
  usePagination,
  pagination
}: ProductTypeDetailPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Use debounced search for better performance
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  // Get unique brands and categories from products
  const { allBrands, allCategories } = useMemo(() => {
    const brandSet = new Set<string>()
    const categorySet = new Set<string>()
    
    initialProducts.forEach(product => {
      if (product.brand) brandSet.add(product.brand)
      if (product.category) categorySet.add(product.category)
    })
    
    return {
      allBrands: Array.from(brandSet).sort(),
      allCategories: Array.from(categorySet).sort()
    }
  }, [initialProducts])

  // Filter products based on search query and selected filters
  const filteredProducts = useMemo(() => {
    let filtered = initialProducts

    // Apply search query filter
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase().trim()
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

    return filtered
  }, [initialProducts, debouncedSearchQuery, selectedBrands])

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

  const renderProductCard = (product: Product) => (
    <div
      key={product.id}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden"
    >
      <div className="aspect-square bg-gray-100 relative">
        <ProductImage
          src={getImageUrl(product.images?.[0] || 'products/placeholder.jpg')}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.badge && (
          <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
            {product.badge}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-red-600">{product.brand}</span>
          <span className="text-sm text-gray-500">{product.category}</span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        {product.rating && (
          <div className="flex items-center justify-end mb-3">
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
            </div>
          </div>
        )}
        
        <div className="mt-4">
          <Link 
            href={product.url || '#'} 
            className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            View Details
            <svg className="ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-900/5">
      {/* Breadcrumb Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 pt-24 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link 
              href="/" 
              className="text-gray-500 hover:text-red-600 transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link 
              href="/product-types"
              className="text-gray-500 hover:text-red-600 transition-colors flex items-center"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              Product Types
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-red-600 font-medium">{productType.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              {productType.name}
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              {productType.description}
            </p>
            
            {/* Stats */}
            <div className="mt-8 flex justify-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{pagination?.total || initialProducts.length}</div>
                <div className="text-sm text-gray-600">Products Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">
                  {Array.from(new Set(initialProducts.map(p => p.brand))).length}
                </div>
                <div className="text-sm text-gray-600">Brands</div>
              </div>
              {usePagination && pagination && (
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">
                    {pagination.page} of {pagination.totalPages}
                  </div>
                  <div className="text-sm text-gray-600">Pages</div>
                </div>
              )}
            </div>
          </div>

          {/* Search Section */}
          <div className="mb-8 w-full max-w-4xl mx-auto">
            {/* Search Input */}
            <div className="relative mb-4">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${productType.name.toLowerCase()}...`}
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
                {allBrands.length > 1 && (
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
            {showFilters && allBrands.length > 1 && (
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
                    Brand: {brand}
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
              Showing {filteredProducts.length} of {initialProducts.length} products
              {hasActiveFilters && (
                <span className="ml-2 text-red-600">
                  ({initialProducts.length - filteredProducts.length} filtered out)
                </span>
              )}
            </div>
          </div>

          {/* Brand Filter Pills */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Brands</h3>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(initialProducts.map(p => p.brand)))
                .sort()
                .map((brand) => (
                  <span
                    key={brand}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800"
                  >
                    {brand}
                  </span>
                ))}
            </div>
          </div>

          {/* Product Grid */}
          {usePagination ? (
            // Use traditional pagination for very large categories
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => renderProductCard(product))}
              </div>

              {/* Pagination */}
              {pagination && (
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  hasNext={pagination.hasNext}
                  hasPrev={pagination.hasPrev}
                  productType={productType.slug}
                />
              )}
            </>
          ) : (
            // Use progressive loading for smaller categories
            <ProgressiveProductGrid
              products={filteredProducts}
              initialCount={12}
              incrementCount={8}
              maxCount={100}
            />
          )}

          {/* No Results Message */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <svg className="h-12 w-12 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                </svg>
                <p className="text-lg">No products found</p>
                <p className="text-sm">Try adjusting your search criteria</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 