'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Product } from '@/lib/types/shared-types'
import { useDebouncedSearch, usePerformanceMonitor } from '@/lib/utils/performance-utils'

interface PaginatedProductGridProps {
  products: Product[]
  onProductClick?: (product: Product) => void
  itemsPerPage?: number
  searchPlaceholder?: string
  showSearch?: boolean
  renderProduct: (product: Product, index: number) => React.ReactNode
  className?: string
}

interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalItems: number
  startIndex: number
  endIndex: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export default function PaginatedProductGrid({
  products,
  onProductClick,
  itemsPerPage = 12,
  searchPlaceholder = "Search products...",
  showSearch = true,
  renderProduct,
  className = ""
}: PaginatedProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const { searchTerm, debouncedSearchTerm, setSearchTerm } = useDebouncedSearch('', 300)
  const { startMeasure } = usePerformanceMonitor()

  // Filter products based on search term (searches across ALL products)
  const filteredProducts = useMemo(() => {
    const endMeasure = startMeasure('product-search-filter')
    
    if (!debouncedSearchTerm.trim()) {
      endMeasure()
      return products
    }

    const searchLower = debouncedSearchTerm.toLowerCase()
    const filtered = products.filter(product => {
      const searchableFields = [
        product.name || '',
        product.description || '',
        product.brand || '',
        product.category || '',
        product.name || '',
        product.name || '',
        product.description || '',
        ...(product.specs || [])
      ].join(' ').toLowerCase()

      return searchableFields.includes(searchLower)
    })

    endMeasure()
    return filtered
  }, [products, debouncedSearchTerm, startMeasure])

  // Calculate pagination info
  const paginationInfo: PaginationInfo = useMemo(() => {
    const totalItems = filteredProducts.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems)

    return {
      currentPage,
      totalPages,
      totalItems,
      startIndex,
      endIndex,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1
    }
  }, [filteredProducts.length, currentPage, itemsPerPage])

  // Get current page products
  const currentPageProducts = useMemo(() => {
    const endMeasure = startMeasure('pagination-slice')
    const result = filteredProducts.slice(paginationInfo.startIndex, paginationInfo.endIndex)
    endMeasure()
    return result
  }, [filteredProducts, paginationInfo.startIndex, paginationInfo.endIndex, startMeasure])

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchTerm])

  // Navigation handlers
  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= paginationInfo.totalPages) {
      setCurrentPage(page)
      // Scroll to top of results
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [paginationInfo.totalPages])

  const goToNextPage = useCallback(() => {
    if (paginationInfo.hasNextPage) {
      goToPage(currentPage + 1)
    }
  }, [currentPage, paginationInfo.hasNextPage, goToPage])

  const goToPrevPage = useCallback(() => {
    if (paginationInfo.hasPrevPage) {
      goToPage(currentPage - 1)
    }
  }, [currentPage, paginationInfo.hasPrevPage, goToPage])

  // Generate page numbers for pagination controls
  const getPageNumbers = useCallback(() => {
    const { totalPages, currentPage } = paginationInfo
    const pages: (number | string)[] = []
    
    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)
      
      if (currentPage > 4) {
        pages.push('...')
      }
      
      // Show pages around current page
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      if (currentPage < totalPages - 3) {
        pages.push('...')
      }
      
      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }
    
    return pages
  }, [paginationInfo])

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search Bar */}
      {showSearch && (
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="relative max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          {debouncedSearchTerm && (
            <div className="mt-2 text-sm text-gray-600">
              Searching across all {products.length} products...
            </div>
          )}
        </div>
      )}

      {/* Results Summary */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-gray-600">
            {debouncedSearchTerm ? (
              <>
                Found <span className="font-semibold text-gray-900">{paginationInfo.totalItems}</span> products
                {paginationInfo.totalItems !== products.length && (
                  <span> out of {products.length} total</span>
                )}
                {paginationInfo.totalItems > 0 && (
                  <>
                    {' • '}Showing <span className="font-semibold">{paginationInfo.startIndex + 1}-{paginationInfo.endIndex}</span>
                  </>
                )}
              </>
            ) : (
              <>
                Showing <span className="font-semibold text-gray-900">{paginationInfo.startIndex + 1}-{paginationInfo.endIndex}</span> of{' '}
                <span className="font-semibold">{paginationInfo.totalItems}</span> products
              </>
            )}
          </div>
          
          {paginationInfo.totalPages > 1 && (
            <div className="text-sm text-gray-500">
              Page {paginationInfo.currentPage} of {paginationInfo.totalPages}
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {currentPageProducts.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentPageProducts.map((product, index) => (
              <div key={`product-${product.id}-${paginationInfo.startIndex + index}`}>
                {renderProduct(product, paginationInfo.startIndex + index)}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
          <div className="max-w-md mx-auto">
            <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-4">
              {debouncedSearchTerm 
                ? `No products match "${debouncedSearchTerm}". Try adjusting your search terms.`
                : "No products available in this category."
              }
            </p>
            {debouncedSearchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Clear search
              </button>
            )}
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      {paginationInfo.totalPages > 1 && (
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            {/* Previous Button */}
            <button
              onClick={goToPrevPage}
              disabled={!paginationInfo.hasPrevPage}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                paginationInfo.hasPrevPage
                  ? 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                  : 'text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed'
              }`}
            >
              <ChevronLeftIcon className="h-4 w-4 mr-1" />
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex items-center space-x-1">
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === 'number' ? goToPage(page) : undefined}
                  disabled={typeof page !== 'number'}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    page === paginationInfo.currentPage
                      ? 'bg-red-600 text-white'
                      : typeof page === 'number'
                      ? 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                      : 'text-gray-400 cursor-default'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={goToNextPage}
              disabled={!paginationInfo.hasNextPage}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                paginationInfo.hasNextPage
                  ? 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                  : 'text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed'
              }`}
            >
              Next
              <ChevronRightIcon className="h-4 w-4 ml-1" />
            </button>
          </div>

          {/* Mobile-friendly page info */}
          <div className="mt-3 text-center text-sm text-gray-500 sm:hidden">
            Page {paginationInfo.currentPage} of {paginationInfo.totalPages}
          </div>
        </div>
      )}
    </div>
  )
}
