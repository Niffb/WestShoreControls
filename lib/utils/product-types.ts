import { Product } from '@/lib/types/shared-types'
import { getAllProductsIncludingMitsubishi, productCategories } from '@/lib/products/products'
import { searchIndex, initializeSearchIndex, filterProductsByType } from '@/lib/utils/search-index'

// Product type configuration with icons and descriptions
export interface ProductType {
  id: string
  name: string
  description: string
  icon: string
  slug: string
  category: string
  count: number
  brands: string[]
  featured: boolean
}

// Pagination interface
export interface PaginatedResult<T> {
  items: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Enhanced caching with multiple cache layers
interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
  size: number
}

class ProductCache {
  private cache = new Map<string, CacheEntry<any>>()
  private readonly maxSize = 100 * 1024 * 1024 // 100MB cache limit
  private readonly defaultTTL = 10 * 60 * 1000 // 10 minutes for product data
  private readonly statsTTL = 5 * 60 * 1000 // 5 minutes for stats
  private currentSize = 0

  set<T>(key: string, data: T, ttl?: number): void {
    const serialized = JSON.stringify(data)
    const size = serialized.length * 2 // Rough estimate of memory usage
    
    // Clean up if we're approaching cache limit
    if (this.currentSize + size > this.maxSize) {
      this.cleanup()
    }
    
    // Remove old entry if exists
    if (this.cache.has(key)) {
      this.currentSize -= this.cache.get(key)!.size
    }
    
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL,
      size
    })
    
    this.currentSize += size
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    if (Date.now() - entry.timestamp > entry.ttl) {
      this.delete(key)
      return null
    }

    return entry.data as T
  }

  delete(key: string): void {
    const entry = this.cache.get(key)
    if (entry) {
      this.currentSize -= entry.size
      this.cache.delete(key)
    }
  }

  cleanup(): void {
    const now = Date.now()
    const entries = Array.from(this.cache.entries())
    
    // Remove expired entries first
    for (const [key, entry] of entries) {
      if (now - entry.timestamp > entry.ttl) {
        this.delete(key)
      }
    }
    
    // If still over limit, remove oldest entries
    if (this.currentSize > this.maxSize * 0.8) {
      const sortedEntries = entries
        .filter(([key]) => this.cache.has(key))
        .sort(([, a], [, b]) => a.timestamp - b.timestamp)
      
      for (const [key] of sortedEntries) {
        this.delete(key)
        if (this.currentSize < this.maxSize * 0.6) break
      }
    }
  }

  clear(): void {
    this.cache.clear()
    this.currentSize = 0
  }

  getStats() {
    return {
      size: this.currentSize,
      entries: this.cache.size,
      maxSize: this.maxSize
    }
  }
}

// Global cache instance
const productCache = new ProductCache()

// Lazy loading with progressive data fetching
class ProductLoader {
  private loadingPromises = new Map<string, Promise<Product[]>>()
  private isFullyLoaded = false
  private loadedBrands = new Set<string>()

  async loadAllProducts(): Promise<Product[]> {
    const cacheKey = 'all-products'
    const cached = productCache.get<Product[]>(cacheKey)
    if (cached) return cached

    // Check if we have a loading promise in progress
    if (this.loadingPromises.has(cacheKey)) {
      return this.loadingPromises.get(cacheKey)!
    }

    const loadingPromise = this.performFullLoad()
    this.loadingPromises.set(cacheKey, loadingPromise)

    try {
      const products = await loadingPromise
      productCache.set(cacheKey, products)
      this.isFullyLoaded = true
      return products
    } finally {
      this.loadingPromises.delete(cacheKey)
    }
  }

  private async performFullLoad(): Promise<Product[]> {
    // Use a performance monitor to track loading time
    const startTime = performance.now()
    
    try {
      const products = getAllProductsIncludingMitsubishi()
      
      const loadTime = performance.now() - startTime
      if (loadTime > 1000) {
        console.warn(`Slow product loading detected: ${loadTime.toFixed(2)}ms`)
      }
      
      return products
    } catch (error) {
      console.error('Error loading products:', error)
      return []
    }
  }

  async loadProductsByType(productType: string): Promise<Product[]> {
    const cacheKey = `products-by-type-${productType}`
    const cached = productCache.get<Product[]>(cacheKey)
    if (cached) return cached

    if (this.loadingPromises.has(cacheKey)) {
      return this.loadingPromises.get(cacheKey)!
    }

    const loadingPromise = this.performTypeLoad(productType)
    this.loadingPromises.set(cacheKey, loadingPromise)

    try {
      const products = await loadingPromise
      productCache.set(cacheKey, products)
      return products
    } finally {
      this.loadingPromises.delete(cacheKey)
    }
  }

  private async performTypeLoad(productType: string): Promise<Product[]> {
    const allProducts = await this.loadAllProducts()
    
    // Initialize search index if not already done
    if (!searchIndex.isIndexValid()) {
      initializeSearchIndex(allProducts)
    }
    
    // Find the product type configuration
    const typeConfig = productTypes.find(type => type.slug === productType)
    if (!typeConfig) return []
    
    // Use optimized filtering with search index
    let filteredProducts = filterProductsByType(allProducts, typeConfig.category)
    
    // Handle special cases with additional filtering
    if (filteredProducts.length === 0 || typeConfig.slug === 'variable-frequency-drives') {
      switch (typeConfig.slug) {
        case 'circuit-breakers':
          filteredProducts = allProducts.filter(product => 
            product.category === 'Circuit Breakers' || 
            product.category === 'Miniature Circuit Breakers' ||
            product.category === 'Motor-Circuit Protectors' ||
            product.category === 'Air Circuit Breakers' ||
            product.category === 'Power Circuit Breakers'
          )
          break
        
        case 'variable-frequency-drives':
          // More precise filtering for VFDs to exclude non-VFD products
          console.log('Filtering VFD products from', allProducts.length, 'total products')
          
          filteredProducts = allProducts.filter(product => {
            const category = product.category?.toLowerCase() || ''
            const name = product.name?.toLowerCase() || ''
            const description = product.description?.toLowerCase() || ''
            
            // Include if category is exactly "Variable Frequency Drives"
            if (product.category === 'Variable Frequency Drives') {
              return true
            }
            
            // Include if subcategory contains "Series Inverters" (for Mitsubishi drives)
            if ((product as any).subcategory?.includes('Series Inverters')) {
              return true
            }
            
            // Exclude products that are clearly not VFDs
            const nonVfdCategories = [
              'controllers', 'controller', 'plc', 'programmable logic',
              'hmi', 'human machine interface',
              'robots', 'robot', 'robotics',
              'computing', 'computer', 'industrial computer',
              'servo motors', 'servo motor', 'servo',
              'circuit breakers', 'circuit breaker',
              'contactors', 'contactor',
              'overload relays', 'overload relay',
              'terminal blocks', 'terminal block',
              'switches', 'switch',
              'sensors', 'sensor',
              'cables', 'cable',
              'enclosures', 'enclosure'
            ]
            
            // Check if this product belongs to non-VFD categories
            const isNonVfd = nonVfdCategories.some(nonVfdCat => 
              category.includes(nonVfdCat) ||
              name.includes(nonVfdCat) ||
              description.includes(nonVfdCat)
            )
            
            if (isNonVfd) {
              return false
            }
            
            // Include if name/description contains VFD-related terms
            const vfdTerms = [
              'variable frequency drive', 'vfd', 'inverter', 'drive',
              'frequency drive', 'ac drive', 'motor drive',
              'freqrol', 'starvert', 'tmdrive'
            ]
            
            const isVfd = vfdTerms.some(vfdTerm => 
              category.includes(vfdTerm) ||
              name.includes(vfdTerm) ||
              description.includes(vfdTerm)
            )
            
            return isVfd
          })
          
          console.log('Filtered to', filteredProducts.length, 'VFD products')
          console.log('Sample VFD products:', filteredProducts.slice(0, 5).map(p => ({ name: p.name, category: p.category, brand: p.brand })))
          break
        
        case 'contactors':
          filteredProducts = allProducts.filter(product => 
            product.category === 'Contactors' ||
            product.category === 'Magnetic Contactor'
          )
          break
        
        case 'terminal-blocks':
          filteredProducts = allProducts.filter(product => 
            product.category === 'Terminal Blocks' ||
            product.category === 'Screw Terminals' ||
            product.category === 'Spring Terminals' ||
            product.category === 'Plug Terminals' ||
            product.category === 'Other Terminals'
          )
          break
        
        default:
          filteredProducts = []
      }
    }
    
    return filteredProducts
  }

  clearCache(): void {
    productCache.clear()
    this.loadingPromises.clear()
    this.isFullyLoaded = false
    this.loadedBrands.clear()
    
    // Clear search index as well
    searchIndex.clearIndex()
  }

  // Memory management - cleanup old data
  performMemoryCleanup(): void {
    // Clear old cache entries
    productCache.cleanup()
    
    // Clear loading promises that might be stuck
    this.loadingPromises.clear()
    
    // Force garbage collection hint (if available)
    if (typeof global !== 'undefined' && global.gc) {
      global.gc()
    }
  }
}

// Global loader instance
const productLoader = new ProductLoader()

// Main product types that exist across brands
export const productTypes: ProductType[] = [
  {
    id: 'variable-frequency-drives',
    name: 'Variable Frequency Drives',
    description: 'Motor speed control drives for precise control of AC motor speed and torque',
    icon: 'CpuChipIcon',
    slug: 'variable-frequency-drives',
    category: 'Variable Frequency Drives',
    count: 0,
    brands: [],
    featured: true
  },
  {
    id: 'circuit-breakers',
    name: 'Circuit Breakers',
    description: 'Protective devices that interrupt current flow when faults are detected',
    icon: 'BoltIcon',
    slug: 'circuit-breakers',
    category: 'Circuit Breakers',
    count: 0,
    brands: [],
    featured: true
  },
  {
    id: 'miniature-circuit-breakers',
    name: 'Miniature Circuit Breakers',
    description: 'Compact circuit breakers for residential and commercial applications',
    icon: 'PowerIcon',
    slug: 'miniature-circuit-breakers',
    category: 'Miniature Circuit Breakers',
    count: 0,
    brands: [],
    featured: true
  },
  {
    id: 'motor-circuit-protectors',
    name: 'Motor Circuit Protectors',
    description: 'Specialized protection devices for motor circuits and applications',
    icon: 'CogIcon',
    slug: 'motor-circuit-protectors',
    category: 'Motor-Circuit Protectors',
    count: 0,
    brands: [],
    featured: true
  },
  {
    id: 'contactors',
    name: 'Contactors',
    description: 'Electromagnetic switches for controlling electrical circuits',
    icon: 'WrenchScrewdriverIcon',
    slug: 'contactors',
    category: 'Contactors',
    count: 0,
    brands: [],
    featured: true
  },
  {
    id: 'overload-relays',
    name: 'Overload Relays',
    description: 'Protective devices that monitor motor current and prevent overload damage',
    icon: 'ShieldCheckIcon',
    slug: 'overload-relays',
    category: 'Overload Relays',
    count: 0,
    brands: [],
    featured: true
  },
  {
    id: 'programmable-logic-controllers',
    name: 'Programmable Logic Controllers',
    description: 'Industrial computers for automation and control systems',
    icon: 'ComputerDesktopIcon',
    slug: 'programmable-logic-controllers',
    category: 'Programmable Logic Controllers',
    count: 0,
    brands: [],
    featured: true
  },
  {
    id: 'terminal-blocks',
    name: 'Terminal Blocks',
    description: 'Connection devices for joining electrical circuits together',
    icon: 'LinkIcon',
    slug: 'terminal-blocks',
    category: 'Terminal Blocks',
    count: 0,
    brands: [],
    featured: true
  },
  {
    id: 'magnetic-contactor',
    name: 'Magnetic Contactors',
    description: 'Electromagnetic switches for motor control applications',
    icon: 'MagnetIcon',
    slug: 'magnetic-contactor',
    category: 'Magnetic Contactor',
    count: 0,
    brands: [],
    featured: true
  },
  {
    id: 'manual-motor-starters',
    name: 'Manual Motor Starters',
    description: 'Manual switches for starting and stopping motors',
    icon: 'HandIcon',
    slug: 'manual-motor-starters',
    category: 'Manual Motor Starters',
    count: 0,
    brands: [],
    featured: false
  },
  {
    id: 'push-buttons',
    name: 'Push Buttons',
    description: 'Control switches activated by manual pressure',
    icon: 'ButtonIcon',
    slug: 'push-buttons',
    category: 'Push Buttons',
    count: 0,
    brands: [],
    featured: false
  },
  {
    id: 'led-indicators',
    name: 'LED Indicators',
    description: 'Visual status indicators for control panels and equipment',
    icon: 'LightBulbIcon',
    slug: 'led-indicators',
    category: 'LED Indicators',
    count: 0,
    brands: [],
    featured: false
  },
  {
    id: 'power-distribution',
    name: 'Power Distribution',
    description: 'Components for distributing electrical power in systems',
    icon: 'DistributionIcon',
    slug: 'power-distribution',
    category: 'Power Distribution',
    count: 0,
    brands: [],
    featured: false
  },
  {
    id: 'cables-accessories',
    name: 'Cables & Accessories',
    description: 'Electrical cables and connection accessories',
    icon: 'CableIcon',
    slug: 'cables-accessories',
    category: 'Cables & Accessories',
    count: 0,
    brands: [],
    featured: false
  },
  {
    id: 'servo-motors',
    name: 'Servo Motors',
    description: 'Precision motors for accurate position and speed control',
    icon: 'MotorIcon',
    slug: 'servo-motors',
    category: 'Servo Motors',
    count: 0,
    brands: [],
    featured: false
  },
  {
    id: 'batteries-power',
    name: 'Batteries & Power',
    description: 'Power storage and backup solutions for industrial applications',
    icon: 'BatteryIcon',
    slug: 'batteries-power',
    category: 'Batteries & Power',
    count: 0,
    brands: [],
    featured: false
  }
]

// Enhanced product loading with lazy loading
export async function getProductsByType(productType: string): Promise<Product[]> {
  try {
    return await productLoader.loadProductsByType(productType)
  } catch (error) {
    console.error('Error loading products by type:', error)
    return []
  }
}

// Optimized pagination with streaming
export async function getPaginatedProductsByType(
  productType: string, 
  page: number = 1, 
  limit: number = 24
): Promise<PaginatedResult<Product>> {
  try {
    // Use smaller limits for very large categories
    const usePagination = shouldUsePaginationSync(productType)
    const adjustedLimit = usePagination ? Math.min(limit, 48) : limit
    
    const allProducts = await productLoader.loadProductsByType(productType)
    const total = allProducts.length
    const totalPages = Math.ceil(total / adjustedLimit)
    const offset = (page - 1) * adjustedLimit
    
    // Only slice the data we need for this page
    const items = allProducts.slice(offset, offset + adjustedLimit)
    
    return {
      items,
      pagination: {
        page,
        limit: adjustedLimit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    }
  } catch (error) {
    console.error('Error getting paginated products:', error)
    return {
      items: [],
      pagination: {
        page: 1,
        limit,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: false
      }
    }
  }
}

// Optimized count function with caching
export async function getProductCountByType(productType: string): Promise<number> {
  const cacheKey = `count-${productType}`
  const cached = productCache.get<number>(cacheKey)
  if (cached !== null) return cached

  try {
    const products = await productLoader.loadProductsByType(productType)
    const count = products.length
    productCache.set(cacheKey, count, productCache['statsTTL'])
    return count
  } catch (error) {
    console.error('Error getting product count:', error)
    return 0
  }
}

// Enhanced product type with statistics
export async function getProductTypeWithStats(productType: ProductType): Promise<ProductType> {
  const cacheKey = `stats-${productType.slug}`
  const cached = productCache.get<ProductType>(cacheKey)
  if (cached) return cached

  try {
    const products = await productLoader.loadProductsByType(productType.slug)
    const brandSet = new Set(products.map(p => p.brand))
    const brands = Array.from(brandSet)
    
    const result = {
      ...productType,
      count: products.length,
      brands: brands.sort()
    }
    
    productCache.set(cacheKey, result, productCache['statsTTL'])
    return result
  } catch (error) {
    console.error('Error getting product type stats:', error)
    return {
      ...productType,
      count: 0,
      brands: []
    }
  }
}

// Optimized functions for getting all product types
export async function getAllProductTypesWithStats(): Promise<ProductType[]> {
  const cacheKey = 'all-product-types-stats'
  const cached = productCache.get<ProductType[]>(cacheKey)
  if (cached) return cached

  try {
    const results = await Promise.all(
      productTypes.map(type => getProductTypeWithStats(type))
    )
    
    productCache.set(cacheKey, results, productCache['statsTTL'])
    return results
  } catch (error) {
    console.error('Error getting all product types with stats:', error)
    return productTypes.map(type => ({ ...type, count: 0, brands: [] }))
  }
}

export async function getFeaturedProductTypes(): Promise<ProductType[]> {
  const allTypes = await getAllProductTypesWithStats()
  return allTypes.filter(type => type.featured && type.count > 0)
}

export async function getAllProductTypes(): Promise<ProductType[]> {
  const allTypes = await getAllProductTypesWithStats()
  return allTypes.filter(type => type.count > 0)
}

// Enhanced pagination detection with more aggressive thresholds
export async function shouldUsePagination(productType: string): Promise<boolean> {
  // Use more aggressive pagination for performance
  const thresholds = {
    'circuit-breakers': 30,        // Very large category
    'variable-frequency-drives': 40, // Large category
    'contactors': 35,              // Large category
    'miniature-circuit-breakers': 25, // Large category
    'motor-circuit-protectors': 30,   // Large category
    'overload-relays': 40,         // Medium category
    'default': 50                  // Default threshold
  }
  
  try {
    const count = await getProductCountByType(productType)
    const threshold = thresholds[productType] || thresholds.default
    return count > threshold
  } catch (error) {
    return true // Default to pagination on error
  }
}

// Synchronous version for immediate use
export function shouldUsePaginationSync(productType: string): boolean {
  const thresholds = {
    'circuit-breakers': 30,
    'variable-frequency-drives': 40,
    'contactors': 35,
    'miniature-circuit-breakers': 25,
    'motor-circuit-protectors': 30,
    'overload-relays': 40,
    'default': 50
  }
  
  // Check cache first
  const cacheKey = `count-${productType}`
  const cachedCount = productCache.get<number>(cacheKey)
  if (cachedCount !== null) {
    const threshold = thresholds[productType] || thresholds.default
    return cachedCount > threshold
  }
  
  // Default to pagination for unknown categories
  return true
}

// Get breadcrumb data for product type pages
export function getProductTypeBreadcrumbs(productTypeSlug: string) {
  const productType = productTypes.find(type => type.slug === productTypeSlug)
  
  return [
    { name: 'Home', href: '/' },
    { name: 'Product Types', href: '/product-types' },
    { name: productType?.name || 'Product Type', href: `/product-types/${productTypeSlug}` }
  ]
}

// Convert product type name to URL slug
export function getProductTypeSlug(typeName: string): string {
  return typeName
    .toLowerCase()
    .replace(/\s*&\s*/g, '-')
    .replace(/\s+/g, '-')
    .replace(/[()]/g, '')
}

// Cache management utilities
export function clearProductCache(): void {
  productLoader.clearCache()
}

export function getProductCacheStats() {
  return productCache.getStats()
}

// Preload critical product types
export async function preloadCriticalTypes(): Promise<void> {
  const criticalTypes = [
    'variable-frequency-drives',
    'circuit-breakers',
    'contactors',
    'miniature-circuit-breakers'
  ]
  
  // Load in parallel but don't await to avoid blocking
  criticalTypes.forEach(type => {
    productLoader.loadProductsByType(type).catch(error => {
      console.warn(`Failed to preload ${type}:`, error)
    })
  })
}

// Background cache warming and memory management
if (typeof window !== 'undefined') {
  // Only run in browser
  setTimeout(() => {
    preloadCriticalTypes().catch(console.error)
  }, 1000)
  
  // Periodic memory cleanup (every 10 minutes)
  setInterval(() => {
    productLoader.performMemoryCleanup()
  }, 10 * 60 * 1000)
  
  // Memory pressure handling
  if ('memory' in performance) {
    const checkMemoryPressure = () => {
      const memInfo = (performance as any).memory
      if (memInfo) {
        const usedRatio = memInfo.usedJSHeapSize / memInfo.totalJSHeapSize
        if (usedRatio > 0.8) {
          console.warn('High memory usage detected, performing cleanup')
          productLoader.performMemoryCleanup()
        }
      }
    }
    
    // Check memory pressure every 2 minutes
    setInterval(checkMemoryPressure, 2 * 60 * 1000)
  }
  
  // Handle page visibility changes for memory management
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // Page is hidden, perform cleanup
      setTimeout(() => {
        productLoader.performMemoryCleanup()
      }, 5000) // Wait 5 seconds before cleanup
    }
  })
} 