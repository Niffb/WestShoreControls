'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Product } from '@/lib/types/shared-types'
import { useDebouncedSearch, usePerformanceMonitor } from '@/lib/utils/performance-utils'

interface ServerPaginatedProductGridProps {
  categorySlug: string
  onProductClick?: (product: Product) => void
  itemsPerPage?: number
  searchPlaceholder?: string
  showSearch?: boolean
  renderProduct: (product: Product, index: number) => React.ReactNode
  className?: string
  enableServerPagination?: boolean
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

interface ApiResponse {
  success: boolean
  products: Product[]
  count: number
  totalProducts: number
  filteredCount?: number
  pagination?: PaginationInfo
  error?: string
}

export default function ServerPaginatedProductGrid({
  categorySlug,
  onProductClick,
  itemsPerPage = 12,
  searchPlaceholder = "Search products...",
  showSearch = true,
  renderProduct,
  className = "",
  enableServerPagination = false
}: ServerPaginatedProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(null)
  const [totalProducts, setTotalProducts] = useState(0)
  
  const { searchTerm, debouncedSearchTerm, setSearchTerm } = useDebouncedSearch('', 300)
  const { startMeasure } = usePerformanceMonitor()

  // Fetch products from API
  const fetchProducts = useCallback(async (page: number = 1, search: string = '') => {
    const endMeasure = startMeasure('api-fetch-products')
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: itemsPerPage.toString(),
        paginate: enableServerPagination.toString()
      })

      if (search.trim()) {
        params.append('search', search.trim())
      }

      const response = await fetch(`/api/products/${categorySlug}?${params}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: ApiResponse = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch products')
      }

      setProducts(data.products)
      setTotalProducts(data.totalProducts || data.count)
      
      if (enableServerPagination && data.pagination) {
        setPaginationInfo(data.pagination)
      } else {
        // For client-side pagination, calculate pagination info
        const totalItems = data.count
        const totalPages = Math.ceil(totalItems / itemsPerPage)
        const startIndex = (page - 1) * itemsPerPage
        const endIndex = Math.min(startIndex + itemsPerPage, totalItems)

        setPaginationInfo({
          currentPage: page,
          totalPages,
          totalItems,
          startIndex,
          endIndex,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        })
      }

    } catch (err) {
      console.error('Error fetching products:', err)
      setError(err instanceof Error ? err.message : 'Failed to load products')
      setProducts([])
      setPaginationInfo(null)
    } finally {
      setLoading(false)
      endMeasure()
    }
  }, [categorySlug, itemsPerPage, enableServerPagination, startMeasure])

  // Fetch products when page or search changes
  useEffect(() => {
    fetchProducts(currentPage, debouncedSearchTerm)
  }, [currentPage, debouncedSearchTerm, fetchProducts])

  // Reset to page 1 when search changes
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1)
    }
  }, [debouncedSearchTerm]) // Don't include currentPage in deps to avoid infinite loop

  // Navigation handlers
  const goToPage = useCallback((page: number) => {
    if (paginationInfo && page >= 1 && page <= paginationInfo.totalPages) {
      setCurrentPage(page)
      // Scroll to top of results
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [paginationInfo])

  const goToNextPage = useCallback(() => {
    if (paginationInfo?.hasNextPage) {
      goToPage(currentPage + 1)
    }
  }, [currentPage, paginationInfo?.hasNextPage, goToPage])

  const goToPrevPage = useCallback(() => {
    if (paginationInfo?.hasPrevPage) {
      goToPage(currentPage - 1)
    }
  }, [currentPage, paginationInfo?.hasPrevPage, goToPage])

  // Generate page numbers for pagination controls
  const getPageNumbers = useCallback(() => {
    if (!paginationInfo) return []
    
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

  // Display products (for client-side pagination, slice the products)
  const displayProducts = useMemo(() => {
    if (enableServerPagination || !paginationInfo) {
      return products
    }
    
    // Client-side pagination
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return products.slice(startIndex, endIndex)
  }, [products, enableServerPagination, paginationInfo, currentPage, itemsPerPage])

  if (error) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border p-12 text-center ${className}`}>
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Products</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={() => fetchProducts(currentPage, debouncedSearchTerm)}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

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
              disabled={loading}
            />
          </div>
          {debouncedSearchTerm && (
            <div className="mt-2 text-sm text-gray-600">
              {enableServerPagination 
                ? `Searching ${totalProducts} products...`
                : `Searching across all ${totalProducts} products...`
              }
            </div>
          )}
        </div>
      )}

      {/* Results Summary */}
      {paginationInfo && (
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-gray-600">
              {debouncedSearchTerm ? (
                <>
                  Found <span className="font-semibold text-gray-900">{paginationInfo.totalItems}</span> products
                  {paginationInfo.totalItems !== totalProducts && (
                    <span> out of {totalProducts} total</span>
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
      )}

      {/* Products Grid */}
      {loading ? (
        <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      ) : displayProducts.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayProducts.map((product, index) => (
              <div key={`${product.name}-${index}`}>
                {renderProduct(product, index)}
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
      {paginationInfo && paginationInfo.totalPages > 1 && (
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            {/* Previous Button */}
            <button
              onClick={goToPrevPage}
              disabled={!paginationInfo.hasPrevPage || loading}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                paginationInfo.hasPrevPage && !loading
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
                  disabled={typeof page !== 'number' || loading}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    page === paginationInfo.currentPage
                      ? 'bg-red-600 text-white'
                      : typeof page === 'number'
                      ? 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                      : 'text-gray-400 cursor-default'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={goToNextPage}
              disabled={!paginationInfo.hasNextPage || loading}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                paginationInfo.hasNextPage && !loading
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
