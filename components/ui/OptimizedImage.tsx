'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { usePerformanceMonitor } from '@/lib/utils/performance-utils'
import { getImageUrl } from '@/lib/config/image-config'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  sizes?: string
  priority?: boolean
  className?: string
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  onLoad?: () => void
  onError?: () => void
}

/**
 * OptimizedImage component that leverages Next.js built-in image optimization.
 * Now that sharp is installed and unoptimized: false is set in next.config.js,
 * Next.js will automatically handle resizing, format conversion (WebP/AVIF),
 * and lazy loading.
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes = '100vw',
  priority = false,
  className = '',
  objectFit = 'contain',
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const { startMeasure } = usePerformanceMonitor()

  const handleLoad = useCallback(() => {
    const endMeasure = startMeasure('image-load')
    setIsLoaded(true)
    onLoad?.()
    endMeasure()
  }, [onLoad, startMeasure])

  const handleError = useCallback(() => {
    setHasError(true)
    onError?.()
  }, [onError])

  // Don't render if no src
  if (!src) return null

  // Resolve source URL
  const resolvedSrc = src.startsWith('http') ? src : getImageUrl(src)

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={fill ? undefined : { width, height }}
    >
      {/* Loading overlay - only show for non-priority images */}
      {!isLoaded && !hasError && !priority && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
          <div className="animate-spin w-6 h-6 border-2 border-gray-300 border-t-primary-500 rounded-full" />
        </div>
      )}

      {/* Main image - using Next.js Image for automatic optimization */}
      <Image
        src={hasError ? '/images/westlogo.jpg' : resolvedSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        sizes={sizes}
        priority={priority}
        quality={quality}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${objectFit === 'contain' ? 'object-contain' : 
           objectFit === 'cover' ? 'object-cover' : 
           objectFit === 'fill' ? 'object-fill' : 
           objectFit === 'none' ? 'object-none' : 'object-scale-down'}`}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoad={handleLoad}
        onError={handleError}
      />

      {/* Error fallback info overlay */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-50 flex flex-col items-center justify-center p-2">
          <div className="text-gray-400 text-xs text-center">
            <div className="mb-1 text-lg">📷</div>
            <div className="line-clamp-1">{alt}</div>
          </div>
        </div>
      )}
    </div>
  )
}

// Specialized optimized image for product cards
export const ProductImage = ({
  src,
  alt,
  className = 'w-full h-48',
  priority = false,
  ...props
}: Omit<OptimizedImageProps, 'fill' | 'width' | 'height'>) => {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      fill
      className={className}
      objectFit="contain"
      priority={priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
      {...props}
    />
  )
}

// Specialized optimized image for hero sections
export const HeroImage = ({
  src,
  alt,
  className = 'w-full h-full',
  ...props
}: Omit<OptimizedImageProps, 'fill' | 'priority'>) => {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      fill
      className={className}
      objectFit="cover"
      priority
      quality={90}
      sizes="100vw"
      {...props}
    />
  )
}
