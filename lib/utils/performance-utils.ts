import { useCallback, useEffect, useRef, useState, useMemo } from 'react'

// Debounced search hook for better performance
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Custom hook for debounced search
export function useDebouncedSearch(
  initialValue: string = '',
  delay: number = 300
) {
  const [searchTerm, setSearchTerm] = useState(initialValue)
  const debouncedSearchTerm = useDebounce(searchTerm, delay)

  return {
    searchTerm,
    debouncedSearchTerm,
    setSearchTerm,
  }
}

// Image preloading utility
export class ImagePreloader {
  private cache = new Map<string, Promise<HTMLImageElement>>()
  private loadedImages = new Set<string>()

  preloadImage(src: string): Promise<HTMLImageElement> {
    if (this.loadedImages.has(src)) {
      return Promise.resolve(new Image())
    }

    if (this.cache.has(src)) {
      return this.cache.get(src)!
    }

    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image()
      
      img.onload = () => {
        this.loadedImages.add(src)
        this.cache.delete(src) // Remove from pending cache
        resolve(img)
      }
      
      img.onerror = (error) => {
        this.cache.delete(src) // Remove from pending cache
        reject(error)
      }
      
      img.src = src
    })

    this.cache.set(src, promise)
    return promise
  }

  preloadImages(srcs: string[]): Promise<HTMLImageElement[]> {
    return Promise.all(srcs.map(src => this.preloadImage(src)))
  }

  isImageLoaded(src: string): boolean {
    return this.loadedImages.has(src)
  }

  clearCache(): void {
    this.cache.clear()
    this.loadedImages.clear()
  }

  getCacheSize(): number {
    return this.cache.size + this.loadedImages.size
  }
}

// Global image preloader instance
export const imagePreloader = new ImagePreloader()

// Hook for preloading images
export function useImagePreloader() {
  const preloadImage = useCallback((src: string) => {
    return imagePreloader.preloadImage(src)
  }, [])

  const preloadImages = useCallback((srcs: string[]) => {
    return imagePreloader.preloadImages(srcs)
  }, [])

  const isImageLoaded = useCallback((src: string) => {
    return imagePreloader.isImageLoaded(src)
  }, [])

  return {
    preloadImage,
    preloadImages,
    isImageLoaded,
  }
}

// Virtual scrolling utilities
export interface VirtualScrollProps {
  itemCount: number
  itemHeight: number
  containerHeight: number
  overscan?: number
}

export function calculateVirtualScrollRange({
  itemCount,
  itemHeight,
  containerHeight,
  scrollTop,
  overscan = 5,
}: VirtualScrollProps & { scrollTop: number }) {
  const visibleStart = Math.floor(scrollTop / itemHeight)
  const visibleEnd = Math.min(
    itemCount - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight)
  )

  const start = Math.max(0, visibleStart - overscan)
  const end = Math.min(itemCount - 1, visibleEnd + overscan)

  return {
    start,
    end,
    visibleStart,
    visibleEnd,
  }
}

// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics = new Map<string, number[]>()

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  startMeasure(name: string): () => void {
    const startTime = performance.now()
    
    return () => {
      const endTime = performance.now()
      const duration = endTime - startTime
      
      if (!this.metrics.has(name)) {
        this.metrics.set(name, [])
      }
      
      this.metrics.get(name)!.push(duration)
      
      // Keep only last 100 measurements to prevent memory leaks
      const measurements = this.metrics.get(name)!
      if (measurements.length > 100) {
        measurements.shift()
      }
      
      // Log slow operations (> 100ms)
      if (duration > 100) {
        console.warn(`Slow operation detected: ${name} took ${duration.toFixed(2)}ms`)
      }
    }
  }

  getAverageTime(name: string): number {
    const measurements = this.metrics.get(name)
    if (!measurements || measurements.length === 0) return 0
    
    return measurements.reduce((sum, time) => sum + time, 0) / measurements.length
  }

  getMetrics(): Record<string, { average: number; count: number; latest: number }> {
    const result: Record<string, { average: number; count: number; latest: number }> = {}
    
    this.metrics.forEach((measurements, name) => {
      if (measurements.length > 0) {
        result[name] = {
          average: this.getAverageTime(name),
          count: measurements.length,
          latest: measurements[measurements.length - 1]
        }
      }
    })
    
    return result
  }

  clearMetrics(): void {
    this.metrics.clear()
  }
}

// Global performance monitor instance
export const performanceMonitor = PerformanceMonitor.getInstance()

// Hook for performance monitoring
export function usePerformanceMonitor() {
  const startMeasure = useCallback((name: string) => {
    return performanceMonitor.startMeasure(name)
  }, [])

  const getMetrics = useCallback(() => {
    return performanceMonitor.getMetrics()
  }, [])

  return {
    startMeasure,
    getMetrics,
  }
}

// Intersection Observer utilities for better lazy loading
export interface UseIntersectionObserverProps {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  skip?: boolean
}

export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = '50px',
  triggerOnce = true,
  skip = false,
}: UseIntersectionObserverProps = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const elementRef = useRef<HTMLElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (skip) return

    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting
        
        if (isElementIntersecting) {
          setIsIntersecting(true)
          setHasIntersected(true)
          
          if (triggerOnce) {
            observer.unobserve(element)
          }
        } else if (!triggerOnce) {
          setIsIntersecting(false)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)
    observerRef.current = observer

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [threshold, rootMargin, triggerOnce, skip])

  return {
    elementRef,
    isIntersecting: triggerOnce ? hasIntersected : isIntersecting,
    hasIntersected,
  }
}

// Memory management utilities
export function createMemoizedFilter<T>(
  filterFn: (items: T[], ...args: any[]) => T[]
) {
  const cache = new Map<string, T[]>()
  
  return (items: T[], ...args: any[]): T[] => {
    // Create cache key from items length and arguments
    const cacheKey = `${items.length}-${JSON.stringify(args)}`
    
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey)!
    }
    
    const result = filterFn(items, ...args)
    
    // Limit cache size to prevent memory leaks
    if (cache.size > 50) {
      const firstKey = cache.keys().next().value
      cache.delete(firstKey)
    }
    
    cache.set(cacheKey, result)
    return result
  }
}

// Bundle size optimization - conditional imports
export async function loadLargeComponent<T>(
  importFn: () => Promise<{ default: T }>
): Promise<T> {
  try {
    const module = await importFn()
    return module.default
  } catch (error) {
    console.error('Failed to load component:', error)
    throw error
  }
}

// Progressive loading utilities for better performance
export interface ProgressiveLoaderOptions {
  initialCount: number
  incrementCount: number
  loadThreshold: number
  maxCount?: number
}

export function useProgressiveLoader<T>(
  items: T[],
  options: ProgressiveLoaderOptions = {
    initialCount: 12,
    incrementCount: 8,
    loadThreshold: 0.8,
  }
) {
  const [displayCount, setDisplayCount] = useState(options.initialCount)
  const [isLoading, setIsLoading] = useState(false)
  const loaderRef = useRef<HTMLDivElement>(null)

  const { elementRef: triggerRef, isIntersecting: inView } = useIntersectionObserver({
    threshold: options.loadThreshold,
    triggerOnce: false,
    rootMargin: '100px'
  })

  const loadMore = useCallback(() => {
    if (isLoading || displayCount >= items.length) return
    
    setIsLoading(true)
    
    // Simulate slight delay for smoother UX
    setTimeout(() => {
      setDisplayCount(prev => {
        const nextCount = prev + options.incrementCount
        const maxCount = options.maxCount || items.length
        return Math.min(nextCount, maxCount)
      })
      setIsLoading(false)
    }, 150)
  }, [displayCount, items.length, isLoading, options.incrementCount, options.maxCount])

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

  const hasMore = displayCount < items.length
  const loadProgress = Math.min((displayCount / items.length) * 100, 100)

  return {
    visibleItems,
    hasMore,
    isLoading,
    loadMore,
    loadProgress,
    triggerRef,
    displayCount,
    totalCount: items.length
  }
}

// Enhanced virtual scrolling for very large lists
export interface VirtualScrollConfig {
  itemHeight: number | ((index: number) => number)
  containerHeight: number
  overscan?: number
  threshold?: number
}

export function useVirtualScroll<T>(
  items: T[],
  config: VirtualScrollConfig
) {
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const getItemHeight = useCallback((index: number) => {
    return typeof config.itemHeight === 'function' 
      ? config.itemHeight(index) 
      : config.itemHeight
  }, [config.itemHeight])

  const { visibleRange, totalHeight } = useMemo(() => {
    const overscan = config.overscan || 5
    let startIndex = 0
    let endIndex = items.length - 1
    let currentHeight = 0

    // Calculate start index
    for (let i = 0; i < items.length; i++) {
      const itemHeight = getItemHeight(i)
      if (currentHeight + itemHeight > scrollTop) {
        startIndex = Math.max(0, i - overscan)
        break
      }
      currentHeight += itemHeight
    }

    // Calculate end index
    const viewportBottom = scrollTop + config.containerHeight
    currentHeight = 0
    for (let i = 0; i < items.length; i++) {
      currentHeight += getItemHeight(i)
      if (currentHeight > viewportBottom) {
        endIndex = Math.min(items.length - 1, i + overscan)
        break
      }
    }

    // Calculate total height
    let total = 0
    for (let i = 0; i < items.length; i++) {
      total += getItemHeight(i)
    }

    return {
      visibleRange: { start: startIndex, end: endIndex },
      totalHeight: total
    }
  }, [scrollTop, config.containerHeight, config.overscan, items.length, getItemHeight])

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }, [])

  const visibleItems = useMemo(() => {
    const result: Array<{ item: T; index: number; offset: number }> = []
    let offset = 0

    for (let i = 0; i < visibleRange.start; i++) {
      offset += getItemHeight(i)
    }

    for (let i = visibleRange.start; i <= visibleRange.end; i++) {
      if (i < items.length) {
        result.push({
          item: items[i],
          index: i,
          offset
        })
        offset += getItemHeight(i)
      }
    }

    return result
  }, [items, visibleRange, getItemHeight])

  return {
    containerRef,
    visibleItems,
    totalHeight,
    handleScroll,
    scrollTop,
    visibleRange
  }
}

// Data prefetching and caching utilities
export class DataCache<T> {
  private cache = new Map<string, { data: T; timestamp: number; ttl: number }>()
  private defaultTTL = 5 * 60 * 1000 // 5 minutes

  set(key: string, data: T, ttl?: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL
    })
  }

  get(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      return null
    }

    return entry.data
  }

  has(key: string): boolean {
    return this.get(key) !== null
  }

  clear(): void {
    this.cache.clear()
  }

  size(): number {
    return this.cache.size
  }

  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  cleanup(): void {
    const now = Date.now()
    const entries = Array.from(this.cache.entries())
    for (const [key, entry] of entries) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key)
      }
    }
  }
}

// Global data cache instance
export const dataCache = new DataCache()

// Hook for cached data fetching
export function useCachedData<T>(
  key: string,
  fetcher: () => Promise<T> | T,
  options: { 
    ttl?: number
    enabled?: boolean
    onSuccess?: (data: T) => void
    onError?: (error: Error) => void
  } = {}
) {
  const [data, setData] = useState<T | null>(() => {
    const cached = dataCache.get(key)
    return cached as T | null
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    if (!options.enabled && options.enabled !== undefined) return

    // Check cache first
    const cachedData = dataCache.get(key)
    if (cachedData) {
      setData(cachedData as T)
      return cachedData as T
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await fetcher()
      dataCache.set(key, result, options.ttl)
      setData(result)
      options.onSuccess?.(result)
      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error')
      setError(error)
      options.onError?.(error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [key, fetcher, options])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const invalidate = useCallback(() => {
    // Clear cache entry
    dataCache.delete(key)
    fetchData()
  }, [key, fetchData])

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
    invalidate
  }
}

// Smart image loading with progressive enhancement
export function useSmartImageLoading(
  images: string[],
  options: {
    preloadCount?: number
    lowQualityPlaceholder?: boolean
    onLoad?: (src: string) => void
    onError?: (src: string, error: Event) => void
  } = {}
) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set())

  const preloadCount = options.preloadCount || 3

  const loadImage = useCallback((src: string): Promise<void> => {
    if (loadedImages.has(src) || failedImages.has(src) || loadingImages.has(src)) {
      return Promise.resolve()
    }

    setLoadingImages(prev => new Set(prev).add(src))

    return new Promise((resolve) => {
      const img = new Image()
      
      img.onload = () => {
        setLoadedImages(prev => new Set(prev).add(src))
        setLoadingImages(prev => {
          const next = new Set(prev)
          next.delete(src)
          return next
        })
        options.onLoad?.(src)
        resolve()
      }

      img.onerror = (error) => {
        setFailedImages(prev => new Set(prev).add(src))
        setLoadingImages(prev => {
          const next = new Set(prev)
          next.delete(src)
          return next
        })
        if (error instanceof Event) {
          options.onError?.(src, error)
        }
        resolve()
      }

      img.src = src
    })
  }, [loadedImages, failedImages, loadingImages, options])

  // Preload initial images
  useEffect(() => {
    const imagesToPreload = images.slice(0, preloadCount)
    imagesToPreload.forEach(loadImage)
  }, [images, preloadCount, loadImage])

  const loadNext = useCallback((currentIndex: number) => {
    const nextIndex = currentIndex + 1
    if (nextIndex < images.length) {
      loadImage(images[nextIndex])
    }
  }, [images, loadImage])

  return {
    loadedImages,
    failedImages,
    loadingImages,
    loadImage,
    loadNext,
    isLoaded: (src: string) => loadedImages.has(src),
    isFailed: (src: string) => failedImages.has(src),
    isLoading: (src: string) => loadingImages.has(src)
  }
} 