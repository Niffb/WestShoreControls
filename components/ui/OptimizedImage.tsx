'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { usePerformanceMonitor, imagePreloader } from '@/lib/utils/performance-utils'
import { getImageUrl, getOptimizedImageUrl } from '@/lib/config/image-config'

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
  lazy?: boolean
  webp?: boolean
  preload?: boolean
}

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
  onError,
  lazy = true,
  webp = true,
  preload = false
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  // Detect the original format from the src and start with that
  const getInitialFormat = (src: string): 'webp' | 'avif' | 'jpg' | 'png' | 'fallback' => {
    if (src.toLowerCase().includes('.avif')) return 'avif'
    if (src.toLowerCase().includes('.webp')) return 'webp'
    if (src.toLowerCase().includes('.jpg') || src.toLowerCase().includes('.jpeg')) return 'jpg'
    if (src.toLowerCase().includes('.png')) return 'png'
    return 'webp' // default fallback
  }
  
  const [currentFormat, setCurrentFormat] = useState<'webp' | 'avif' | 'jpg' | 'png' | 'fallback'>(() => getInitialFormat(src))
  const imageRef = useRef<HTMLDivElement>(null)
  const { startMeasure } = usePerformanceMonitor()

  // Intersection observer for lazy loading
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '50px',
    skip: !lazy || priority
  })

  const imageFormats = getOptimizedImageUrl(src)
  
  // Function to get the current image source based on format preference
  const getCurrentSrc = () => {
    switch (currentFormat) {
      case 'avif':
        return imageFormats.avif
      case 'webp':
        return imageFormats.webp
      case 'jpg':
        return imageFormats.jpg
      case 'png':
        return imageFormats.png
      default:
        return imageFormats.fallback
    }
  }

  // Preload image when component mounts or comes into view
  useEffect(() => {
    const shouldLoad = !lazy || priority || inView
    
    if (shouldLoad && src && !getCurrentSrc()) {
      // Try fallback formats in order: avif -> webp -> jpg -> png -> fallback
      switch (currentFormat) {
        case 'avif':
          setCurrentFormat('webp')
          break
        case 'webp':
          setCurrentFormat('jpg')
          break
        case 'jpg':
          setCurrentFormat('png')
          break
        case 'png':
          setCurrentFormat('fallback')
          break
        default:
          // If all formats fail, keep the fallback
          break
      }
    }
  }, [src, lazy, priority, inView, getCurrentSrc])

  // Handle image load
  const handleLoad = useCallback(() => {
    const endMeasure = startMeasure('image-load')
    setIsLoaded(true)
    onLoad?.()
    endMeasure()
  }, [onLoad, startMeasure])

  // Handle image error
  const handleError = useCallback(() => {
    console.warn(`Failed to load image: ${getCurrentSrc()}`)
    
    // Try fallback formats based on current format
    if (currentFormat === 'avif') {
      setCurrentFormat('webp')
      return
    } else if (currentFormat === 'webp') {
      setCurrentFormat('jpg')
      return
    } else if (currentFormat === 'jpg') {
      setCurrentFormat('png')
      return
    } else if (currentFormat === 'png') {
      setCurrentFormat('fallback')
      return
    }
    
    // If all formats fail, set error state
    setHasError(true)
    onError?.()
  }, [getCurrentSrc, onError, currentFormat])

  // Generate blur placeholder
  const generateBlurDataURL = (w: number = 10, h: number = 10) => {
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.fillStyle = '#f3f4f6'
      ctx.fillRect(0, 0, w, h)
    }
    return canvas.toDataURL()
  }

  // Don't render if no src or error with no fallback
  if (!src || (hasError && !alt)) {
    return null
  }

  // Render placeholder while loading
  if (!getCurrentSrc() || (!isLoaded && lazy && !priority)) {
    return (
      <div
        ref={ref}
        className={`${className} bg-gray-100 animate-pulse flex items-center justify-center`}
        style={fill ? undefined : { width, height }}
      >
        <div className="text-gray-400 text-sm">Loading...</div>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={fill ? undefined : { width, height }}
    >
      {/* Loading overlay */}
      {!isLoaded && (
        <motion.div
          className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10"
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="animate-spin w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full" />
        </motion.div>
      )}

      {/* Main image */}
      <Image
        src={getCurrentSrc()}
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
        blurDataURL={
          blurDataURL || 
          (placeholder === 'blur' && typeof window !== 'undefined' ? 
            generateBlurDataURL(width || 10, height || 10) : undefined)
        }
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
      />

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-gray-400 text-sm text-center p-4">
            <div className="mb-2">📷</div>
            <div>Image unavailable</div>
            {alt && <div className="text-xs mt-1">{alt}</div>}
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
      webp
      lazy={!priority}
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
      quality={95}
      sizes="100vw"
      webp
      preload
      {...props}
    />
  )
} 