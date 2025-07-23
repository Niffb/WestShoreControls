import { useEffect, useState, useCallback } from 'react'
import { Product } from '@/lib/types/shared-types'
import { resolveProductImage, preloadProductImages } from '@/lib/utils/intelligent-image-resolver'

interface UseImagePreloaderOptions {
  enabled?: boolean
  preloadCount?: number
  priority?: boolean
}

interface ImagePreloadState {
  preloadedImages: Set<string>
  isPreloading: boolean
  preloadProgress: number
}

export function useImagePreloader(
  products: Product[],
  options: UseImagePreloaderOptions = {}
) {
  const {
    enabled = true,
    preloadCount = 10,
    priority = false
  } = options

  const [state, setState] = useState<ImagePreloadState>({
    preloadedImages: new Set(),
    isPreloading: false,
    preloadProgress: 0
  })

  const preloadImages = useCallback(async (productsToPreload: Product[]) => {
    if (!enabled || productsToPreload.length === 0) return

    setState(prev => ({ ...prev, isPreloading: true, preloadProgress: 0 }))

    const imagesToPreload = productsToPreload
      .slice(0, preloadCount)
      .map(product => resolveProductImage(product))
      .filter(imageUrl => !state.preloadedImages.has(imageUrl))

    if (imagesToPreload.length === 0) {
      setState(prev => ({ ...prev, isPreloading: false, preloadProgress: 100 }))
      return
    }

    const preloadPromises = imagesToPreload.map((imageUrl, index) => 
      new Promise<void>((resolve, reject) => {
        if (typeof window === 'undefined') {
          resolve()
          return
        }

        const img = new Image()
        
        img.onload = () => {
          setState(prev => ({
            ...prev,
            preloadedImages: new Set(Array.from(prev.preloadedImages).concat(imageUrl)),
            preloadProgress: ((index + 1) / imagesToPreload.length) * 100
          }))
          resolve()
        }
        
        img.onerror = () => {
          // Still mark as "preloaded" to avoid retrying
          setState(prev => ({
            ...prev,
            preloadedImages: new Set(Array.from(prev.preloadedImages).concat(imageUrl)),
            preloadProgress: ((index + 1) / imagesToPreload.length) * 100
          }))
          resolve() // Don't reject to avoid stopping other preloads
        }

        // Add to DOM for priority loading if needed
        if (priority) {
          const link = document.createElement('link')
          link.rel = 'preload'
          link.as = 'image'
          link.href = imageUrl
          document.head.appendChild(link)
        }

        img.src = imageUrl
      })
    )

    try {
      await Promise.allSettled(preloadPromises)
    } catch (error) {
      console.warn('Some images failed to preload:', error)
    } finally {
      setState(prev => ({ ...prev, isPreloading: false }))
    }
  }, [enabled, preloadCount, priority, state.preloadedImages])

  // Preload images when products change
  useEffect(() => {
    if (products.length > 0) {
      preloadImages(products)
    }
  }, [products, preloadImages])

  const preloadAdditionalImages = useCallback((additionalProducts: Product[]) => {
    preloadImages(additionalProducts)
  }, [preloadImages])

  const isImagePreloaded = useCallback((product: Product) => {
    const imageUrl = resolveProductImage(product)
    return state.preloadedImages.has(imageUrl)
  }, [state.preloadedImages])

  return {
    isPreloading: state.isPreloading,
    preloadProgress: state.preloadProgress,
    preloadedCount: state.preloadedImages.size,
    isImagePreloaded,
    preloadAdditionalImages
  }
}

// Hook for intersection-based preloading
export function useIntersectionImagePreloader(
  products: Product[],
  options: UseImagePreloaderOptions & { rootMargin?: string; threshold?: number } = {}
) {
  const {
    rootMargin = '200px',
    threshold = 0.1,
    ...preloaderOptions
  } = options

  const [visibleProducts, setVisibleProducts] = useState<Product[]>([])
  const preloader = useImagePreloader(visibleProducts, preloaderOptions)

  const observeProduct = useCallback((element: Element, product: Product) => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setVisibleProducts(prev => [...prev, product])
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleProducts(prev => {
            if (!prev.find(p => p.id === product.id)) {
              return [...prev, product]
            }
            return prev
          })
          observer.disconnect()
        }
      },
      { rootMargin, threshold }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [rootMargin, threshold])

  return {
    ...preloader,
    observeProduct
  }
}

// Hook for smart preloading based on user behavior
export function useSmartImagePreloader(
  products: Product[],
  options: UseImagePreloaderOptions = {}
) {
  const [userInteraction, setUserInteraction] = useState({
    hasScrolled: false,
    hasHovered: false,
    isIdle: false
  })

  const preloader = useImagePreloader(
    products,
    {
      ...options,
      enabled: options.enabled && (userInteraction.hasScrolled || userInteraction.hasHovered)
    }
  )

  useEffect(() => {
    if (typeof window === 'undefined') return

    let idleTimer: NodeJS.Timeout

    const handleScroll = () => {
      setUserInteraction(prev => ({ ...prev, hasScrolled: true }))
    }

    const handleMouseMove = () => {
      setUserInteraction(prev => ({ ...prev, hasHovered: true }))
      
      // Reset idle timer
      clearTimeout(idleTimer)
      idleTimer = setTimeout(() => {
        setUserInteraction(prev => ({ ...prev, isIdle: true }))
      }, 2000)
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setUserInteraction(prev => ({ ...prev, hasHovered: true }))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      clearTimeout(idleTimer)
    }
  }, [])

  return {
    ...preloader,
    userInteraction
  }
} 