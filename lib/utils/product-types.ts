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
    id: 'flexible-conductors',
    name: 'Flexible Conductors',
    description: 'Flexible copper braids and conductors for electrical connections',
    icon: 'WireIcon',
    slug: 'flexible-conductors',
    category: 'Flexible Conductors',
    count: 0,
    brands: [],
    featured: false
  },
  {
    id: 'enclosed-isolators',
    name: 'Enclosed Isolators',
    description: 'Safety switches and isolators for electrical system protection',
    icon: 'LockClosedIcon',
    slug: 'enclosed-isolators',
    category: 'Enclosed Isolators',
    count: 0,
    brands: [],
    featured: false
  },
  {
    id: 'busbars',
    name: 'Busbars',
    description: 'Metallic strips for electrical power distribution',
    icon: 'RectangleStackIcon',
    slug: 'busbars',
    category: 'Busbars',
    count: 0,
    brands: [],
    featured: false
  },
  {
    id: 'power-distribution',
    name: 'Power Distribution',
    description: 'Equipment for distributing electrical power in industrial applications',
    icon: 'CircuitBoardIcon',
    slug: 'power-distribution',
    category: 'Power Distribution',
    count: 0,
    brands: [],
    featured: false
  },
  {
    id: 'surge-protective-devices',
    name: 'Surge Protective Devices',
    description: 'Devices that protect electrical systems from voltage spikes',
    icon: 'ShieldExclamationIcon',
    slug: 'surge-protective-devices',
    category: 'Surge Protective Device',
    count: 0,
    brands: [],
    featured: false
  },
  {
    id: 'push-buttons',
    name: 'Push Buttons',
    description: 'Manual control switches for industrial applications',
    icon: 'HandRaisedIcon',
    slug: 'push-buttons',
    category: 'Push Buttons',
    count: 0,
    brands: [],
    featured: false
  },
  {
    id: 'led-indicators',
    name: 'LED Indicators',
    description: 'Visual indication devices for status monitoring',
    icon: 'LightBulbIcon',
    slug: 'led-indicators',
    category: 'LED Indicators',
    count: 0,
    brands: [],
    featured: false
  },
  {
    id: 'manual-motor-starters',
    name: 'Manual Motor Starters',
    description: 'Manual control devices for starting and stopping motors',
    icon: 'PlayIcon',
    slug: 'manual-motor-starters',
    category: 'Manual Motor Starters',
    count: 0,
    brands: [],
    featured: false
  },
  {
    id: 'servo-motors',
    name: 'Servo Motors',
    description: 'Precision motors for accurate position and speed control',
    icon: 'ArrowPathIcon',
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
  }
]

// Get all products aggregated by type
export function getProductsByType(productType: string): Product[] {
  const allProducts = getAllProductsIncludingMitsubishi()
  
  // Find the product type configuration
  const typeConfig = productTypes.find(type => type.slug === productType)
  if (!typeConfig) return []
  
  // Filter products by category
  return allProducts.filter(product => {
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
}

// Get product type with updated counts and brands
export function getProductTypeWithStats(productType: ProductType): ProductType {
  const products = getProductsByType(productType.slug)
  const brandSet = new Set(products.map(p => p.brand))
  const brands = Array.from(brandSet)
  
  return {
    ...productType,
    count: products.length,
    brands: brands.sort()
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