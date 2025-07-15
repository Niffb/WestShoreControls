import { Product } from '@/lib/types/shared-types'
import { getAllProductsIncludingMitsubishi, productCategories } from '@/lib/products/products'

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

// Cache for product data to prevent repeated expensive operations
let productCache: Product[] | null = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Lazy load products with caching
function getProductsWithCache(): Product[] {
  const now = Date.now()
  
  // Return cached data if still valid
  if (productCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return productCache
  }
  
  try {
    // Load products and cache them
    productCache = getAllProductsIncludingMitsubishi()
    cacheTimestamp = now
    return productCache
  } catch (error) {
    console.error('Error loading products:', error)
    // Return empty array if loading fails
    return []
  }
}

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

// Get all products aggregated by type with optimization
export function getProductsByType(productType: string): Product[] {
  try {
    const allProducts = getProductsWithCache()
    
    // Find the product type configuration
    const typeConfig = productTypes.find(type => type.slug === productType)
    if (!typeConfig) return []
    
    // Filter products by category with optimized filtering
    const filteredProducts = allProducts.filter(product => {
      // Direct category match
      if (product.category === typeConfig.category) return true
      
      // Handle special cases and alternative category names
      switch (typeConfig.slug) {
        case 'circuit-breakers':
          return product.category === 'Circuit Breakers' || 
                 product.category === 'Miniature Circuit Breakers' ||
                 product.category === 'Motor-Circuit Protectors' ||
                 product.category === 'Air Circuit Breakers' ||
                 product.category === 'Power Circuit Breakers'
        
        case 'variable-frequency-drives':
          return product.category === 'Variable Frequency Drives' ||
                 (product as any).subcategory?.includes('Series Inverters')
        
        case 'contactors':
          return product.category === 'Contactors' ||
                 product.category === 'Magnetic Contactor'
        
        case 'terminal-blocks':
          return product.category === 'Terminal Blocks' ||
                 product.category === 'Screw Terminals' ||
                 product.category === 'Spring Terminals' ||
                 product.category === 'Plug Terminals' ||
                 product.category === 'Other Terminals'
        
        default:
          return false
      }
    })
    
    return filteredProducts
  } catch (error) {
    console.error('Error filtering products by type:', error)
    return []
  }
}

// Get paginated products by type
export function getPaginatedProductsByType(
  productType: string, 
  page: number = 1, 
  limit: number = 24
): PaginatedResult<Product> {
  try {
    const allProducts = getProductsByType(productType)
    const total = allProducts.length
    const totalPages = Math.ceil(total / limit)
    const offset = (page - 1) * limit
    const items = allProducts.slice(offset, offset + limit)
    
    return {
      items,
      pagination: {
        page,
        limit,
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

// Get product count by type (for statistics)
export function getProductCountByType(productType: string): number {
  try {
    return getProductsByType(productType).length
  } catch (error) {
    console.error('Error getting product count:', error)
    return 0
  }
}

// Get product type with updated counts and brands
export function getProductTypeWithStats(productType: ProductType): ProductType {
  try {
    const products = getProductsByType(productType.slug)
    const brandSet = new Set(products.map(p => p.brand))
    const brands = Array.from(brandSet)
    
    return {
      ...productType,
      count: products.length,
      brands: brands.sort()
    }
  } catch (error) {
    console.error('Error getting product type stats:', error)
    return {
      ...productType,
      count: 0,
      brands: []
    }
  }
}

// Get all product types with updated statistics
export function getAllProductTypesWithStats(): ProductType[] {
  return productTypes.map(getProductTypeWithStats)
}

// Get featured product types
export function getFeaturedProductTypes(): ProductType[] {
  return getAllProductTypesWithStats().filter(type => type.featured && type.count > 0)
}

// Get all product types (including non-featured)
export function getAllProductTypes(): ProductType[] {
  return getAllProductTypesWithStats().filter(type => type.count > 0)
}

// Convert product type name to URL slug
export function getProductTypeSlug(typeName: string): string {
  return typeName
    .toLowerCase()
    .replace(/\s*&\s*/g, '-')
    .replace(/\s+/g, '-')
    .replace(/[()]/g, '')
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

// Clear cache function for manual cache invalidation
export function clearProductCache() {
  productCache = null
  cacheTimestamp = 0
}

// Helper function to determine if a category needs pagination
export function shouldUsePagination(productType: string): boolean {
  const count = getProductCountByType(productType)
  return count > 50 // Use pagination for categories with more than 50 products
} 