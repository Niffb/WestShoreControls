'use client'

import { useState, useMemo, useCallback, memo, useRef, useEffect, Suspense } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { StarIcon, EyeIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import { getImageUrl } from '@/lib/config/image-config'
import {
  useDebounce,
  useDebouncedSearch,
  usePerformanceMonitor,
  imagePreloader,
  createMemoizedFilter
} from '@/lib/utils/performance-utils'
import { Product } from '@/lib/types/shared-types'

interface DynamicProductGridProps {
  products: Product[]
  onProductClick?: (product: Product) => void
  viewMode?: 'grid' | 'list' | 'table'
  initialLoadCount?: number
  loadIncrement?: number
  enableVirtualScroll?: boolean
  enableProgressiveLoading?: boolean
}

// Progressive loading hook
function useProgressiveLoading<T>(
  items: T[],
  options: {
    initialCount: number
    increment: number
    threshold: number
  }
) {
  const [displayCount, setDisplayCount] = useState(options.initialCount)
  const [isLoading, setIsLoading] = useState(false)

  const { ref: loadMoreRef, inView } = useInView({
    threshold: options.threshold,
    triggerOnce: false,
    rootMargin: '100px'
  })

  const loadMore = useCallback(() => {
    if (isLoading || displayCount >= items.length) return
    
    setIsLoading(true)
    
    // Small delay for smooth UX
    setTimeout(() => {
      setDisplayCount(prev => Math.min(prev + options.increment, items.length))
      setIsLoading(false)
    }, 100)
  }, [displayCount, items.length, isLoading, options.increment])

  useEffect(() => {
    if (inView && !isLoading && displayCount < items.length) {
      loadMore()
    }
  }, [inView, loadMore, displayCount, items.length, isLoading])

  // Reset when items change
  useEffect(() => {
    setDisplayCount(options.initialCount)
  }, [items.length, options.initialCount])

  const visibleItems = useMemo(() => 
    items.slice(0, displayCount), 
    [items, displayCount]
  )

  return {
    visibleItems,
    hasMore: displayCount < items.length,
    isLoading,
    loadMoreRef,
    displayCount,
    totalCount: items.length,
    loadProgress: Math.min((displayCount / items.length) * 100, 100)
  }
}

// Smart image loading hook
function useSmartImages(images: string[], preloadCount = 3) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())

  const preloadNext = useCallback((currentIndex: number) => {
    const nextImages = images.slice(currentIndex, currentIndex + preloadCount)
    nextImages.forEach(src => {
      if (!loadedImages.has(src) && !failedImages.has(src)) {
        imagePreloader.preloadImage(src)
          .then(() => setLoadedImages(prev => new Set(prev).add(src)))
          .catch(() => setFailedImages(prev => new Set(prev).add(src)))
      }
    })
  }, [images, preloadCount, loadedImages, failedImages])

  return {
    isLoaded: (src: string) => loadedImages.has(src),
    isFailed: (src: string) => failedImages.has(src),
    preloadNext
  }
}

// Memoized product card component
const ProductCard = memo(({ 
  product, 
  onClick, 
  viewMode = 'grid',
  index 
}: { 
  product: Product
  onClick?: (product: Product) => void
  viewMode?: 'grid' | 'list' | 'table'
  index: number
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '50px'
  })

  const { preloadNext } = useSmartImages(product.images)

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true)
    preloadNext(1) // Preload next image when current loads
  }, [preloadNext])

  const handleImageError = useCallback(() => {
    setImageError(true)
    setImageLoaded(true)
  }, [])

  const handleClick = useCallback(() => {
    onClick?.(product)
  }, [onClick, product])

  // Animation variants for staggered loading
  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.4,
        delay: Math.min(index * 0.05, 0.3) // Cap delay at 300ms
      }
    }
  }

  if (viewMode === 'table') {
    return (
      <motion.tr
        ref={ref}
        variants={itemVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
        onClick={handleClick}
      >
        <td className="p-3">
          <div className="flex items-center">
            {/* Small product image */}
            <div className="relative w-10 h-10 mr-3 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
              {inView && product.images[0] && !imageError ? (
                <Image
                  src={getImageUrl(product.images[0])}
                  alt={product.name}
                  fill
                  sizes="40px"
                  className={`object-contain transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  loading={index < 20 ? 'eager' : 'lazy'}
                />
              ) : (
                <div className="w-full h-full bg-gray-200"></div>
              )}
            </div>
            
            {/* Product model/name */}
            <div>
              <p className="font-medium text-gray-900">{product.model}</p>
              <p className="text-xs text-gray-500 truncate">{product.brand}</p>
            </div>
          </div>
        </td>
        
        {/* Rating */}
        <td className="p-3">
          <div className="flex items-center">
            <StarSolidIcon className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="text-sm text-gray-600">{product.rating}</span>
          </div>
        </td>
        
        {/* Specs (hidden on mobile) */}
        <td className="p-3 hidden md:table-cell">
          <p className="text-sm text-gray-600 line-clamp-1">
            {product.specs?.slice(0, 2).join(' • ')}
          </p>
        </td>
        
        {/* Status */}
        <td className="p-3 hidden lg:table-cell">
          {product.inStock ? (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              In Stock
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Out of Stock
            </span>
          )}
        </td>
      </motion.tr>
    );
  }

  if (viewMode === 'list') {
    return (
      <motion.div
        ref={ref}
        variants={itemVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4 cursor-pointer border border-gray-100"
        onClick={handleClick}
      >
        <div className="flex items-center space-x-4">
          {/* Product Image */}
          <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
            )}
            
            {inView && product.images[0] && !imageError ? (
              <Image
                src={getImageUrl(product.images[0])}
                alt={`${product.name} - ${product.brand}`}
                fill
                sizes="64px"
                className={`object-contain transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={handleImageLoad}
                onError={handleImageError}
                priority={index < 4}
                loading={index < 4 ? 'eager' : 'lazy'}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <div className="w-6 h-6 bg-gray-400 rounded"></div>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {product.name}
                </h3>
                <p className="text-sm text-primary-600 font-medium mt-1">
                  {product.brand} • {product.category}
                </p>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {product.description}
                </p>
              </div>
              
              <div className="flex items-center ml-4 flex-shrink-0">
                <StarSolidIcon className="h-4 w-4 text-yellow-400" />
                <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden border border-gray-100"
      onClick={handleClick}
    >
      {/* Product Image */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 bg-gray-400 rounded-lg opacity-50"></div>
          </div>
        )}
        
        {/* Badge */}
        {product.badge && product.category !== "Variable Frequency Drives" && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
              {product.badge}
            </span>
          </div>
        )}

        {/* Lazy load images only when in view */}
        {inView && product.images[0] && !imageError ? (
          <Image
            src={product.name?.includes("A800") ? getImageUrl("/W1siZiIsIjIwMTkvMDUvMjkvMTIvNTAvNDUvMTg4NDI2NzMtMjQ2ZS00OTM2LTk4N2YtMWEwNjBlZGJjNWJmL21pdHN1YmlzaGktZWxlY3RyaWMtRkEtYTgwMC5qcGciXSxbInAiLCJ0aHVtYiIsIjQwMHg0MDBcdTAwM2UiXV0.png") : getImageUrl(product.images[0])}
            alt={`${product.name} - ${product.brand}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-contain p-4 group-hover:scale-105 transition-all duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            priority={index < 8}
            loading={index < 8 ? 'eager' : 'lazy'}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <div className="text-gray-500 text-center">
              <div className="w-12 h-12 bg-gray-400 rounded-lg mx-auto mb-2"></div>
              <p className="text-xs font-medium">{product.category}</p>
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center ml-2 flex-shrink-0">
            <StarSolidIcon className="h-4 w-4 text-yellow-400" />
            <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
          </div>
        </div>
        
        <p className="text-sm text-primary-600 font-medium mb-2">
          {product.brand} • {product.category}
        </p>
        
        <p className="text-gray-600 text-sm line-clamp-3 mb-3">
          {product.description}
        </p>

        {/* Product specs preview */}
        {product.specs && product.specs.length > 0 && (
          <div className="border-t pt-3">
            <p className="text-xs text-gray-500 mb-1">Key Specifications:</p>
            <div className="flex flex-wrap gap-1">
              {product.specs.slice(0, 2).map((spec, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded"
                >
                  {spec.length > 20 ? `${spec.substring(0, 20)}...` : spec}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}, (prevProps, nextProps) => {
  // Custom comparison for better memoization
  return (
    prevProps.product.id === nextProps.product.id &&
    prevProps.viewMode === nextProps.viewMode &&
    prevProps.index === nextProps.index
  )
})

ProductCard.displayName = 'ProductCard'

// Loading skeleton component
const ProductCardSkeleton = ({ viewMode }: { viewMode: 'grid' | 'list' | 'table' }) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 animate-pulse"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }
  
  if (viewMode === 'table') {
    return (
      <tr className="border-b border-gray-200">
        <td className="p-3">
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        </td>
        <td className="p-3">
          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        </td>
        <td className="p-3 hidden md:table-cell">
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
        </td>
        <td className="p-3 hidden lg:table-cell">
          <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
        </td>
      </tr>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <div className="h-48 bg-gray-200 animate-pulse"></div>
      <div className="p-4">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-3 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
      </div>
    </div>
  )
}

// Main DynamicProductGrid component
export default function DynamicProductGrid({
  products,
  onProductClick,
  viewMode = 'grid',
  initialLoadCount = 12,
  loadIncrement = 8,
  enableVirtualScroll = false,
  enableProgressiveLoading = true
}: DynamicProductGridProps) {
  // Performance monitoring
  usePerformanceMonitor()
  
  // Progressive loading setup
  const { 
    visibleItems, 
    hasMore, 
    isLoading, 
    loadMoreRef, 
    displayCount, 
    totalCount,
    loadProgress
  } = useProgressiveLoading(products, {
    initialCount: initialLoadCount,
    increment: loadIncrement,
    threshold: 0.1
  })

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      {enableProgressiveLoading && hasMore && viewMode !== 'table' && (
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Showing {displayCount} of {totalCount} products
            </span>
            <span className="text-sm font-medium text-primary-600">
              {Math.round(loadProgress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Specifications
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <AnimatePresence>
                  {visibleItems.map((product, index) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onClick={onProductClick} 
                      viewMode="table"
                      index={index}
                    />
                  ))}

                  {/* Loading skeletons */}
                  {isLoading && 
                    Array.from({ length: 3 }).map((_, idx) => (
                      <ProductCardSkeleton key={`skeleton-${idx}`} viewMode="table" />
                    ))
                  }
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className={`grid grid-cols-1 ${viewMode === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : ''} gap-4`}>
          <AnimatePresence>
            {visibleItems.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={onProductClick} 
                viewMode={viewMode}
                index={index}
              />
            ))}
            
            {/* Loading skeletons */}
            {isLoading && 
              Array.from({ length: 3 }).map((_, idx) => (
                <ProductCardSkeleton key={`skeleton-${idx}`} viewMode={viewMode} />
              ))
            }
          </AnimatePresence>
        </div>
      )}

      {/* Load more trigger */}
      <div ref={loadMoreRef} className="flex justify-center py-8">
        {isLoading ? (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
            <span>Loading more products...</span>
          </div>
        ) : hasMore ? (
          <div className="text-gray-400 text-sm">
            Scroll down to load more products
          </div>
        ) : null}
      </div>
    </div>
  );
} 