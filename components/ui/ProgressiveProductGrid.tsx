'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { useProgressiveLoader } from '@/lib/utils/performance-utils'
import { Product } from '@/lib/types/shared-types'
import ProductModal from '@/components/product/ProductModal'
import { getImageUrl } from '@/lib/config/image-config'
import { resolveProductImage } from '@/lib/utils/intelligent-image-resolver'

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
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  
  const resolvedImagePath = resolveProductImage(product)
  const finalImageUrl = getImageUrl(resolvedImagePath)

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true)
  }, [])

  const handleImageError = useCallback(() => {
    setImageError(true)
    setImageLoaded(true)
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden">
      <div className="aspect-square bg-gray-100 relative">
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 bg-gray-400 rounded-lg opacity-50"></div>
          </div>
        )}
        
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2 left-2 z-10">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-600 text-white shadow-lg">
              {product.badge}
            </span>
          </div>
        )}

        {/* Product Image */}
        {!imageError ? (
          <img
            src={finalImageUrl}
            alt={`${product.name} - ${product.brand}`}
            className={`w-full h-full object-contain p-4 group-hover:scale-105 transition-all duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <div className="text-gray-500 text-center">
              <div className="w-12 h-12 bg-gray-400 rounded-lg mx-auto mb-2"></div>
              <p className="text-xs font-medium">{product.category}</p>
              <p className="text-xs text-gray-400 mt-1">{product.brand}</p>
            </div>
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