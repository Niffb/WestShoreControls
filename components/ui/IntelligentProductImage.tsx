'use client'

import { useState, useEffect, useCallback, memo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Product } from '@/lib/types/shared-types'
import { resolveProductImage, resolveProductImages } from '@/lib/utils/intelligent-image-resolver'

interface IntelligentProductImageProps {
  product: Product
  className?: string
  priority?: boolean
  sizes?: string
  fill?: boolean
  width?: number
  height?: number
  showBadge?: boolean
  showMultipleImages?: boolean
  maxImages?: number
  onImageLoad?: () => void
  onImageError?: () => void
  placeholder?: 'blur' | 'empty'
  quality?: number
}

const IntelligentProductImage = memo(({
  product,
  className = "w-full h-full object-contain",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  fill = true,
  width,
  height,
  showBadge = true,
  showMultipleImages = false,
  maxImages = 3,
  onImageLoad,
  onImageError,
  placeholder = 'blur',
  quality = 85
}: IntelligentProductImageProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [images, setImages] = useState<string[]>([])

  // Resolve images on mount or when product changes
  useEffect(() => {
    if (showMultipleImages) {
      const resolvedImages = resolveProductImages(product, maxImages)
      setImages(resolvedImages)
    } else {
      const resolvedImage = resolveProductImage(product)
      setImages([resolvedImage])
    }
    setCurrentImageIndex(0)
    setImageLoaded(false)
    setImageError(false)
  }, [product, showMultipleImages, maxImages])

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true)
    onImageLoad?.()
  }, [onImageLoad])

  const handleImageError = useCallback(() => {
    setImageError(true)
    setImageLoaded(true)
    onImageError?.()
  }, [onImageError])

  const nextImage = useCallback(() => {
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
      setImageLoaded(false)
    }
  }, [images.length])

  const previousImage = useCallback(() => {
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
      setImageLoaded(false)
    }
  }, [images.length])

  const currentImage = images[currentImageIndex] || resolveProductImage(product)

  // Generate blur data URL for placeholder
  const blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxAAPwCdABmX/9k="

  return (
    <div className="relative w-full h-full">
      {/* Loading skeleton */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-12 h-12 bg-gray-400 rounded-lg opacity-50"></div>
        </div>
      )}

      {/* Main image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-full"
        >
          {fill ? (
            <Image
              src={currentImage}
              alt={`${product.name} - ${product.brand}`}
              fill
              sizes={sizes}
              className={`transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              } ${className}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              priority={priority}
              quality={quality}
              placeholder={placeholder}
              blurDataURL={placeholder === 'blur' ? blurDataURL : undefined}
            />
          ) : (
            <Image
              src={currentImage}
              alt={`${product.name} - ${product.brand}`}
              width={width || 300}
              height={height || 300}
              className={`transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              } ${className}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              priority={priority}
              quality={quality}
              placeholder={placeholder}
              blurDataURL={placeholder === 'blur' ? blurDataURL : undefined}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Badge */}
      {showBadge && product.badge && (
        <div className="absolute top-2 left-2 z-10">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-600 text-white shadow-lg">
            {product.badge}
          </span>
        </div>
      )}

      {/* Multiple images navigation */}
      {showMultipleImages && images.length > 1 && (
        <>
          {/* Navigation buttons */}
          <button
            onClick={previousImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
            aria-label="Previous image"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
            aria-label="Next image"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image indicators */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10 flex space-x-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentImageIndex(index)
                  setImageLoaded(false)
                }}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentImageIndex
                    ? 'bg-white shadow-lg'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Error fallback */}
      {imageError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-gray-500 text-center">
            <div className="w-12 h-12 bg-gray-300 rounded-lg mx-auto mb-2"></div>
            <p className="text-xs font-medium">{product.category}</p>
            <p className="text-xs text-gray-400 mt-1">{product.brand}</p>
          </div>
        </div>
      )}
    </div>
  )
})

IntelligentProductImage.displayName = 'IntelligentProductImage'

// Specialized variants for common use cases
export const ProductCardImage = memo((props: Omit<IntelligentProductImageProps, 'className' | 'fill'>) => (
  <IntelligentProductImage
    {...props}
    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
    fill
  />
))

export const ProductListImage = memo((props: Omit<IntelligentProductImageProps, 'className' | 'fill' | 'width' | 'height'>) => (
  <IntelligentProductImage
    {...props}
    className="object-contain"
    fill={false}
    width={64}
    height={64}
  />
))

export const ProductTableImage = memo((props: Omit<IntelligentProductImageProps, 'className' | 'fill' | 'width' | 'height'>) => (
  <IntelligentProductImage
    {...props}
    className="object-contain rounded-md"
    fill={false}
    width={40}
    height={40}
  />
))

export const ProductGalleryImage = memo((props: Omit<IntelligentProductImageProps, 'showMultipleImages' | 'maxImages'>) => (
  <IntelligentProductImage
    {...props}
    showMultipleImages={true}
    maxImages={5}
  />
))

export default IntelligentProductImage 