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
        ...(product.specs || [])
      ].join(' ').toLowerCase()

      return searchableFields.includes(searchLower)
    })

    endMeasure()
    return filtered
  }, [products, debouncedSearchTerm, startMeasure])

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

  const currentPageProducts = useMemo(() => {
    const endMeasure = startMeasure('pagination-slice')
    const result = filteredProducts.slice(paginationInfo.startIndex, paginationInfo.endIndex)
    endMeasure()
    return result
  }, [filteredProducts, paginationInfo.startIndex, paginationInfo.endIndex, startMeasure])

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchTerm])

  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= paginationInfo.totalPages) {
      setCurrentPage(page)
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

  const getPageNumbers = useCallback(() => {
    const { totalPages, currentPage } = paginationInfo
    const pages: (number | string)[] = []
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      
      if (currentPage > 4) {
        pages.push('...')
      }
      
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      if (currentPage < totalPages - 3) {
        pages.push('...')
      }
      
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }
    
    return pages
  }, [paginationInfo])

  return (
    <div className={`space-y-5 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {showSearch && (
          <div className="relative max-w-sm w-full">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-md bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />
          </div>
        )}

        <p className="text-sm text-gray-500 shrink-0">
          {debouncedSearchTerm ? (
            <>
              <span className="font-medium text-gray-900">{paginationInfo.totalItems}</span> results
              {paginationInfo.totalItems !== products.length && (
                <span className="text-gray-400"> of {products.length}</span>
              )}
            </>
          ) : (
            <>
              <span className="font-medium text-gray-900">{paginationInfo.totalItems.toLocaleString()}</span> products
            </>
          )}
        </p>
      </div>

      {currentPageProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {currentPageProducts.map((product, index) => (
            <div key={`product-${product.id}-${paginationInfo.startIndex + index}`}>
              {renderProduct(product, paginationInfo.startIndex + index)}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-12 text-center">
          <MagnifyingGlassIcon className="mx-auto h-10 w-10 text-gray-300 mb-4" />
          <h3 className="text-base font-medium text-gray-900 mb-1">No products found</h3>
          <p className="text-sm text-gray-500 mb-4">
            {debouncedSearchTerm 
              ? `No products match "${debouncedSearchTerm}".`
              : "No products available in this category."
            }
          </p>
          {debouncedSearchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear search
            </button>
          )}
        </div>
      )}

      {paginationInfo.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 pt-5">
          <button
            onClick={goToPrevPage}
            disabled={!paginationInfo.hasPrevPage}
            className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
              paginationInfo.hasPrevPage
                ? 'text-gray-700 hover:text-gray-900'
                : 'text-gray-300 cursor-not-allowed'
            }`}
          >
            <ChevronLeftIcon className="h-4 w-4" />
            Previous
          </button>

          <div className="hidden sm:flex items-center gap-1">
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' ? goToPage(page) : undefined}
                disabled={typeof page !== 'number'}
                className={`min-w-[36px] h-9 text-sm font-medium rounded-md transition-colors ${
                  page === paginationInfo.currentPage
                    ? 'bg-gray-900 text-white'
                    : typeof page === 'number'
                    ? 'text-gray-600 hover:bg-gray-100'
                    : 'text-gray-400 cursor-default'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <span className="text-sm text-gray-500 sm:hidden">
            Page {paginationInfo.currentPage} of {paginationInfo.totalPages}
          </span>

          <button
            onClick={goToNextPage}
            disabled={!paginationInfo.hasNextPage}
            className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
              paginationInfo.hasNextPage
                ? 'text-gray-700 hover:text-gray-900'
                : 'text-gray-300 cursor-not-allowed'
            }`}
          >
            Next
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}
