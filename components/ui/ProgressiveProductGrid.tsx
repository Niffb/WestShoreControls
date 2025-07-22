'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { useProgressiveLoader } from '@/lib/utils/performance-utils'
import { ProductImage } from '@/components/ui/OptimizedImage'
import { Product } from '@/lib/types/shared-types'
import ProductModal from '@/components/product/ProductModal'

interface ProgressiveProductGridProps {
  products: Product[]
  initialCount?: number
  incrementCount?: number
  maxCount?: number
  className?: string
}

export default function ProgressiveProductGrid({
  products,
  initialCount = 12,
  incrementCount = 8,
  maxCount,
  className = ''
}: ProgressiveProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const {
    visibleItems,
    hasMore,
    isLoading,
    loadMore,
    loadProgress,
    triggerRef,
    displayCount,
    totalCount
  } = useProgressiveLoader(products, {
    initialCount,
    incrementCount,
    maxCount,
    loadThreshold: 0.8
  })

  // Handle view details click
  const handleViewDetails = useCallback((product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }, [])

  // Close modal
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }, [])

  // Memoize the grid items to prevent unnecessary re-renders
  const gridItems = useMemo(() => {
    return visibleItems.map((product) => (
      <ProductGridItem 
        key={product.id} 
        product={product} 
        onViewDetails={handleViewDetails}
      />
    ))
  }, [visibleItems, handleViewDetails])

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Progress indicator for large datasets */}
      {totalCount > initialCount && (
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Showing {displayCount} of {totalCount} products
            </span>
            <span className="text-sm font-medium text-red-600">
              {Math.round(loadProgress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-red-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {gridItems}
      </div>

      {/* Loading trigger and button */}
      {hasMore && (
        <div className="text-center py-8">
          <div ref={triggerRef as any} className="mb-4">
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
                <span className="text-gray-600">Loading more products...</span>
              </div>
            ) : (
              <button
                onClick={loadMore}
                className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                Load More Products
                <svg className="ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Completion message */}
      {!hasMore && totalCount > initialCount && (
        <div className="text-center py-4 text-gray-600">
          <p>All {totalCount} products loaded</p>
        </div>
      )}

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

// Memoized product grid item component
const ProductGridItem = ({ product, onViewDetails }: { product: Product; onViewDetails: (product: Product) => void }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden">
      <div className="aspect-square bg-gray-100 relative">
        <ProductImage
          src={product.images?.[0] || '/images/placeholder.jpg'}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.badge && (
          <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
            {product.badge}
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-medium">Out of Stock</span>
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
        
        {/* Product specs preview */}
        {product.specs && product.specs.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {product.specs.slice(0, 2).map((spec, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                >
                  {spec}
                </span>
              ))}
              {product.specs.length > 2 && (
                <span className="text-xs text-gray-500">+{product.specs.length - 2} more</span>
              )}
            </div>
          </div>
        )}
        
        <div className="mt-4">
          <button 
            onClick={() => onViewDetails(product)}
            className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            View Details
            <svg className="ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
} 