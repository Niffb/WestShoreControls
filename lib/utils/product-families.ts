// Product families utility for grouping individual models under main product lines
// This enables showing product cards (e.g., Mitsubishi A800) instead of individual models
import { Product } from '@/lib/types/shared-types'
import { getAllProductsIncludingMitsubishi } from '@/lib/products/products'
import { scrapedVFDFamilies } from './scraped-vfd-families-inline'
import { getBestSeriesImage, getCategoryFallbackImage } from './series-image-mapper'
// @ts-ignore
import { allScrapedFamilies, getFamiliesByCategory as getScrapedFamiliesByCategory } from '@/lib/data/all-scraped-families.js'

export interface ProductFamily {
  id: string
  name: string
  brand: string
  category: string
  description: string
  image: string
  models: Product[]
  specs: string[]
  features: string[]
  rating: number
  reviews: number
  inStock: boolean
  badge?: string
  downloads?: {
    name: string
    url: string
    type: 'pdf' | 'doc' | 'other'
  }[]
}

// Define product family patterns for grouping
interface FamilyPattern {
  name: string
  brand: string
  category: string
  description: string
  image: string
  badge?: string
  matchPatterns: string[]
  specs: string[]
  features: string[]
}

const PRODUCT_FAMILY_PATTERNS: Record<string, FamilyPattern> = {
  // VFD Families
  'mitsubishi-a800': {
    name: 'Mitsubishi FR-A800 Plus Series',
    brand: 'Mitsubishi',
    category: 'Variable Frequency Drives',
    description: 'Premium inverters with advanced features and high performance for demanding applications. The FR-A800 Plus Series offers enhanced energy savings, superior system integration, and extended life design.',
    image: getBestSeriesImage('FR', 'Drives & VFDs'),
    badge: 'Premium',
    matchPatterns: [
      'FR-A8',
      'A800',
      'subcategory:FR-A800 Plus Series Inverters'
    ],
    specs: [
      'Input voltage: 200-240VAC / 380-500VAC (3-phase)',
      'Power range: 0.4kW to 280kW',
      'Advanced motor control with Real Sensorless Vector Control',
      'Built-in Ethernet/IP and Modbus RTU communication',
      'Extended conformal coating available',
      'High-speed response with 1ms sampling'
    ],
    features: [
      'Advanced energy-saving algorithms',
      'Enhanced system protection features',
      'Integrated PLC functionality',
      'USB programming port',
      'Extended life design (10-year maintenance free)',
      'Multiple control modes'
    ]
  },
  'mitsubishi-f800': {
    name: 'Mitsubishi FR-F800 Series',
    brand: 'Mitsubishi',
    category: 'Variable Frequency Drives',
    description: 'Specialized inverters optimized for fan and pump applications with enhanced energy efficiency and environmental resistance.',
    image: getBestSeriesImage('FR', 'Drives & VFDs'),
    badge: 'Energy Efficient',
    matchPatterns: [
      'FR-F8',
      'F800',
      'subcategory:FR-F800 Series Inverters'
    ],
    specs: [
      'Optimized for fans, pumps and compressors',
      'High energy savings',
      'Robust design for industrial environments',
      'Wide output frequency range (0.2-590Hz)',
      'Modbus RTU/Ethernet communication'
    ],
    features: [
      'Energy optimization algorithms',
      'Advanced environmental resistance',
      'Easy installation and maintenance',
      'Built-in protection functions',
      'Communication ready'
    ]
  },
  'mitsubishi-e800': {
    name: 'Mitsubishi FR-E800 Series',
    brand: 'Mitsubishi',
    category: 'Variable Frequency Drives',
    description: 'Compact and user-friendly inverters for general-purpose applications with reliable motor control and cost-effective operation.',
    image: getBestSeriesImage('E8', 'Drives & VFDs'),
    badge: 'Compact',
    matchPatterns: [
      'FR-E8',
      'E800',
      'subcategory:FR-E800 Series Inverters'
    ],
    specs: [
      'Compact design',
      'User-friendly operation',
      'General-purpose applications',
      'Reliable motor control',
      'Multiple control modes'
    ],
    features: [
      'Easy programming and setup',
      'Compact footprint',
      'Cost-effective solution',
      'Reliable performance',
      'Communication ready'
    ]
  },
  
  // Circuit Breaker Families
  'noark-b1n': {
    name: 'Noark B1N Series MCBs',
    brand: 'Noark',
    category: 'Miniature Circuit Breakers',
    description: 'Standard miniature circuit breakers for AC applications with UL 489 and IEC 60898 compliance.',
    image: getBestSeriesImage('B1NQ', 'Circuit Breakers'),
    matchPatterns: [
      'B1N',
      'series:B1N'
    ],
    specs: [
      'Current Range: 0.5A to 63A',
      'Breaking Capacity: 10kA at 240Vac',
      'Poles: 1, 2 & 3-pole',
      'Standards: UL 489, IEC 60898',
      'Trip Characteristics: B, C, D'
    ],
    features: [
      'UL Listed',
      'DIN rail mounting',
      'Thermal-magnetic protection',
      'High breaking capacity',
      'Reliable operation'
    ]
  },
  'noark-b1h': {
    name: 'Noark B1H Series MCBs',
    brand: 'Noark',
    category: 'Miniature Circuit Breakers',
    description: 'High voltage AC miniature circuit breakers designed for 480Y/277Vac applications.',
    image: getBestSeriesImage('B1H', 'Circuit Breakers'),
    matchPatterns: [
      'B1H',
      'series:B1H'
    ],
    specs: [
      'Current Range: 0.5A to 32A',
      'Breaking Capacity: 10kA at 480Y/277Vac',
      'Poles: 1, 2 & 3-pole',
      'Standards: UL 489, IEC 60898',
      'High voltage applications'
    ],
    features: [
      'High voltage rated',
      'UL Listed',
      'DIN rail mounting',
      'Thermal-magnetic protection',
      'Industrial applications'
    ]
  },
  
  // Contactor Families
  'noark-ex9c': {
    name: 'Noark Ex9C Series Contactors',
    brand: 'Noark',
    category: 'Contactors',
    description: 'Industrial contactors for motor control and switching applications with high reliability and performance.',
    image: getBestSeriesImage('EX9CDR', 'Contactors'),
    matchPatterns: [
      'Ex9C',
      'series:Ex9C'
    ],
    specs: [
      'AC-3 rated current up to 95A',
      'Coil voltages: 24V to 690V AC/DC',
      'High switching capacity',
      'DIN rail or panel mounting',
      'Auxiliary contacts available'
    ],
    features: [
      'High reliability switching',
      'Compact design',
      'Easy installation',
      'Wide coil voltage range',
      'Long electrical life'
    ]
  },
  'ls-industrial-metasol': {
    name: 'LS Industrial METASOL Series',
    brand: 'LS Industrial',
    category: 'Contactors',
    description: 'High-performance contactors for industrial motor control with superior switching capabilities.',
    image: getBestSeriesImage('UZ', 'Contactors'),
    matchPatterns: [
      'METASOL',
      'series:METASOL'
    ],
    specs: [
      'AC-3 rated current up to 800A',
      'Advanced arc control technology',
      'Multiple mounting options',
      'Wide operating temperature range',
      'High mechanical durability'
    ],
    features: [
      'Superior switching performance',
      'Advanced contact materials',
      'Robust construction',
      'Easy maintenance',
      'Global certifications'
    ]
  },
  
  // PLC Families
  'mitsubishi-melsec-q': {
    name: 'Mitsubishi MELSEC-Q Series',
    brand: 'Mitsubishi',
    category: 'Programmable Logic Controllers',
    description: 'High-performance PLCs for complex automation applications with advanced processing capabilities.',
    image: getBestSeriesImage('Q', 'PLCs'),
    matchPatterns: [
      'MELSEC-Q',
      'Q Series',
      'series:MELSEC-Q'
    ],
    specs: [
      'High-speed processing',
      'Modular design',
      'Multiple communication options',
      'Advanced motion control',
      'Redundant system support'
    ],
    features: [
      'Scalable architecture',
      'High reliability',
      'Advanced diagnostics',
      'Multiple programming languages',
      'Integrated safety functions'
    ]
  },
  'mitsubishi-melsec-fx': {
    name: 'Mitsubishi MELSEC-FX Series',
    brand: 'Mitsubishi',
    category: 'Programmable Logic Controllers',
    description: 'Compact PLCs for small to medium automation applications with cost-effective solutions.',
    image: getBestSeriesImage('FX5, FX3', 'PLCs'),
    matchPatterns: [
      'MELSEC-FX',
      'FX Series',
      'series:MELSEC-FX'
    ],
    specs: [
      'Compact design',
      'Built-in I/O',
      'Multiple communication ports',
      'Easy programming',
      'Cost-effective solution'
    ],
    features: [
      'Simple configuration',
      'Reliable operation',
      'Easy maintenance',
      'Flexible expansion',
      'User-friendly programming'
    ]
  },
  
  // Servo Motor Families
  'mitsubishi-melservo-j5': {
    name: 'Mitsubishi MELSERVO-J5 Series',
    brand: 'Mitsubishi',
    category: 'Servo Motors',
    description: 'High-performance servo motors with advanced control for precision applications.',
    image: getBestSeriesImage('J5', 'Servo Motors'),
    matchPatterns: [
      'MELSERVO-J5',
      'J5 Series',
      'series:MELSERVO-J5'
    ],
    specs: [
      'High torque density',
      'Advanced encoder technology',
      'Multiple power ratings',
      'High-speed operation',
      'Precise positioning'
    ],
    features: [
      'Superior precision',
      'High reliability',
      'Advanced control algorithms',
      'Easy integration',
      'Maintenance-free operation'
    ]
  },
  'mitsubishi-melservo-j4': {
    name: 'Mitsubishi MELSERVO-J4 Series',
    brand: 'Mitsubishi',
    category: 'Servo Motors',
    description: 'Versatile servo motors for general automation applications with excellent performance.',
    image: getBestSeriesImage('MR', 'Servo Motors'),
    matchPatterns: [
      'MELSERVO-J4',
      'J4 Series',
      'series:MELSERVO-J4'
    ],
    specs: [
      'Wide power range',
      'Multiple mounting options',
      'High-resolution encoder',
      'Robust construction',
      'Easy installation'
    ],
    features: [
      'Reliable performance',
      'Flexible mounting',
      'Easy setup',
      'Cost-effective',
      'Wide application range'
    ]
  },
  
  // Overload Relay Families
  'noark-ex9r': {
    name: 'Noark Ex9R Series Overload Relays',
    brand: 'Noark',
    category: 'Overload Relays',
    description: 'Thermal overload relays for motor protection with adjustable current settings.',
    image: getBestSeriesImage('EX9R', 'Overload Relays'),
    matchPatterns: [
      'Ex9R',
      'series:Ex9R'
    ],
    specs: [
      'Current range: 0.1A to 95A',
      'Class 10A/20 trip characteristics',
      'Manual and automatic reset',
      'Auxiliary contacts',
      'DIN rail mounting'
    ],
    features: [
      'Reliable motor protection',
      'Easy adjustment',
      'Compact design',
      'Visual trip indication',
      'Long service life'
    ]
  },
  
  // Push Button Families
  'noark-ex9pb': {
    name: 'Noark Ex9PB Series Push Buttons',
    brand: 'Noark',
    category: 'Push Buttons',
    description: '22mm push buttons for control panel applications with various actuator types.',
    image: getBestSeriesImage('EX9PBR', 'Push Buttons'),
    matchPatterns: [
      'Ex9PB',
      'series:Ex9PB'
    ],
    specs: [
      '22mm mounting hole',
      'Multiple actuator types',
      'Various contact configurations',
      'IP65 front protection',
      'Multiple colors available'
    ],
    features: [
      'Reliable switching',
      'Easy installation',
      'Visual indication',
      'Durable construction',
      'Wide operating temperature'
    ]
  },
  
  // LED Indicator Families
  'noark-ex9il': {
    name: 'Noark Ex9IL Series LED Indicators',
    brand: 'Noark',
    category: 'LED Indicators',
    description: '22mm LED indicators for status indication in control panels and equipment.',
    image: getBestSeriesImage('ES50', 'LED Indicators'),
    matchPatterns: [
      'Ex9IL',
      'series:Ex9IL'
    ],
    specs: [
      '22mm mounting hole',
      'LED technology',
      'Multiple voltage ratings',
      'Various colors available',
      'Long service life'
    ],
    features: [
      'Energy efficient',
      'Bright illumination',
      'Long life expectancy',
      'Easy installation',
      'Multiple mounting options'
    ]
  },
  
  // Manual Motor Starter Families
  'schneider-gv2': {
    name: 'Schneider Electric GV2 Series',
    brand: 'Schneider Electric',
    category: 'Manual Motor Starters',
    description: 'Manual motor starters for direct motor control with integrated protection.',
    image: getBestSeriesImage('MMS', 'Manual Motor Starters'),
    matchPatterns: [
      'GV2',
      'series:GV2'
    ],
    specs: [
      'Current range: 0.1A to 32A',
      'Integrated thermal protection',
      'Manual operation',
      'DIN rail mounting',
      'Auxiliary contacts available'
    ],
    features: [
      'Integrated protection',
      'Manual control',
      'Compact design',
      'Easy installation',
      'Reliable operation'
    ]
  },
  
  // Power Distribution Families
  'abb-system-pro': {
    name: 'ABB System Pro M Compact',
    brand: 'ABB',
    category: 'Power Distribution',
    description: 'Modular distribution systems for industrial and commercial applications.',
    image: getBestSeriesImage('PCB', 'Power Distribution'),
    matchPatterns: [
      'System Pro',
      'series:System Pro'
    ],
    specs: [
      'Modular design',
      'High current capacity',
      'Multiple configurations',
      'Easy installation',
      'Flexible expansion'
    ],
    features: [
      'Modular flexibility',
      'High reliability',
      'Easy maintenance',
      'Space-saving design',
      'Professional installation'
    ]
  },
  
  // Cables & Accessories Families
  'mitsubishi-mr-j3bat': {
    name: 'Mitsubishi MR-J3BAT Battery Units',
    brand: 'Mitsubishi',
    category: 'Batteries & Power',
    description: 'Battery backup units for servo amplifiers to maintain position during power outages.',
    image: getBestSeriesImage('MR J3BAT', 'Batteries & Power'),
    matchPatterns: [
      'MR-J3BAT',
      'series:MR-J3BAT'
    ],
    specs: [
      'Backup power for servo systems',
      'Long service life',
      'Easy installation',
      'Maintenance-free operation',
      'Compact design'
    ],
    features: [
      'Position retention',
      'Reliable backup power',
      'Easy replacement',
      'Long battery life',
      'System compatibility'
    ]
  }
}

// Function to match a product to a family pattern
function matchesPattern(product: Product, patterns: string[]): boolean {
  const searchText = `${product.name} ${product.model || ''} ${product.description} ${(product as any).subcategory || ''}`.toLowerCase()
  
  return patterns.some(pattern => {
    if (pattern.startsWith('subcategory:')) {
      const subcategory = pattern.replace('subcategory:', '')
      return (product as any).subcategory === subcategory
    }
    if (pattern.startsWith('series:')) {
      const series = pattern.replace('series:', '').toLowerCase()
      return searchText.includes(series)
    }
    return searchText.includes(pattern.toLowerCase())
  })
}

// Get all product families for a given category
export function getProductFamiliesForCategory(category: string): ProductFamily[] {
  // First get families from scraped data
  const categorySlug = category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '').replace(/\s*-\s*/g, '-')
  let scrapedFamilies: ProductFamily[] = []
  
  // Map category names to scraped data keys
  const categoryMappings: Record<string, string> = {
    'Circuit Breakers': 'circuit-breakers',
    'Miniature Circuit Breakers': 'circuit-breakers', // MCBs are part of circuit breakers
    'Motor-Circuit Protectors': 'circuit-breakers', // MCPs are also circuit breakers
    'Contactors': 'contactors',
    'Magnetic Contactor': 'contactors',
    'Programmable Logic Controllers': 'plcs',
    'Power Distribution': 'power-distribution',
    'Servo Motors': 'servo-motors',
    'Overload Relays': 'overload-relays',
    'Push Buttons': 'push-buttons',
    'Manual Motor Starters': 'manual-motor-starters',
    'LED Indicators': 'led-indicators',
    'Cables & Accessories': 'cables-accessories',
    'Batteries & Power': 'batteries-power',
    'Terminal Blocks': 'other-products', // Terminal blocks might be in other products
    'Variable Frequency Drives': 'drives-vfds' // Add VFD mapping for completeness
  }
  
  const mappedCategory = categoryMappings[category] || categorySlug
  
  try {
    scrapedFamilies = getScrapedFamiliesByCategory(mappedCategory) || []
    console.log(`Found ${scrapedFamilies.length} scraped families for category: ${category} (mapped to: ${mappedCategory})`)
    
    // Enhance scraped families with series images
    scrapedFamilies = scrapedFamilies.map((family: ProductFamily) => {
      // Try to extract series name from family name or id
      let seriesName = ''
      
      // Common patterns to extract series names
      if (family.name.includes('FR-A8')) seriesName = 'FR'
      else if (family.name.includes('FR-F8')) seriesName = 'FR'
      else if (family.name.includes('FR-E8')) seriesName = 'E8'
      else if (family.name.includes('B1N')) seriesName = 'B1NQ'
      else if (family.name.includes('B1H')) seriesName = 'B1H'
      else if (family.name.includes('B1E')) seriesName = 'B1E'
      else if (family.name.includes('Ex9C')) seriesName = 'EX9CDR'
      else if (family.name.includes('Ex9R')) seriesName = 'EX9R'
      else if (family.name.includes('Ex9PB')) seriesName = 'EX9PBR'
      else if (family.name.includes('Ex9IL')) seriesName = 'ES50'
      else if (family.name.includes('MELSERVO')) {
        if (family.name.includes('J5')) seriesName = 'J5'
        else if (family.name.includes('J4')) seriesName = 'MR'
        else seriesName = 'MR'
      }
      else if (family.name.includes('MELSEC')) {
        if (family.name.includes('Q')) seriesName = 'Q'
        else if (family.name.includes('FX')) seriesName = 'FX5, FX3'
        else seriesName = 'Q'
      }
      else if (family.name.includes('METASOL')) seriesName = 'UZ'
      else if (family.name.includes('GV2')) seriesName = 'MMS'
      else if (family.name.includes('System Pro')) seriesName = 'PCB'
      else if (family.name.includes('MR-J3BAT')) seriesName = 'MR J3BAT'
      
      // Get the best series image
      if (seriesName && family.image === '/images/westlogo.jpg') {
        const seriesImage = getBestSeriesImage(seriesName, category)
        return {
          ...family,
          image: seriesImage
        }
      }
      
      return family
    })
    
    // If no scraped families found, log available categories for debugging
    if (scrapedFamilies.length === 0) {
      console.log(`No scraped families found for ${mappedCategory}. Available categories:`, Object.keys(allScrapedFamilies))
    }
  } catch (error) {
    console.error(`Error loading scraped families for ${category}:`, error)
    scrapedFamilies = []
  }
  
  // Then get families from pattern-based system
  const allProducts = getAllProductsIncludingMitsubishi()
  const patternFamilies: ProductFamily[] = []
  
  // Filter products by category
  const categoryProducts = allProducts.filter(product => 
    product.category === category || 
    product.category.toLowerCase().includes(category.toLowerCase())
  )
  
  // Group products into families
  Object.entries(PRODUCT_FAMILY_PATTERNS).forEach(([familyId, familyConfig]) => {
    if (familyConfig.category !== category) return
    
    const familyProducts = categoryProducts.filter(product => 
      matchesPattern(product, familyConfig.matchPatterns)
    )
    
    if (familyProducts.length > 0) {
      // Calculate family stats
      const totalReviews = familyProducts.reduce((sum, p) => sum + p.reviews, 0)
      const avgRating = familyProducts.reduce((sum, p) => sum + p.rating, 0) / familyProducts.length
      const hasInStock = familyProducts.some(p => p.inStock)
      
      // Collect unique downloads
      const allDownloads = familyProducts.flatMap(p => p.downloads || [])
      const uniqueDownloads = allDownloads.filter((download, index, self) => 
        index === self.findIndex(d => d.name === download.name)
      )
      
      patternFamilies.push({
        id: familyId,
        name: familyConfig.name,
        brand: familyConfig.brand,
        category: familyConfig.category,
        description: familyConfig.description,
        image: familyConfig.image,
        models: familyProducts.sort((a, b) => a.name.localeCompare(b.name)),
        specs: familyConfig.specs,
        features: familyConfig.features,
        rating: Math.round(avgRating * 10) / 10,
        reviews: totalReviews,
        inStock: hasInStock,
        badge: familyConfig.badge,
        downloads: uniqueDownloads.length > 0 ? uniqueDownloads : undefined
      })
    }
  })
  
  // Combine scraped and pattern-based families
  let allFamilies = [...scrapedFamilies, ...patternFamilies]
  
  // Filter out unwanted brands based on category
  const unwantedBrandsByCategory: Record<string, string[]> = {
    'Variable Frequency Drives': ['LS Industrial', 'Delta', 'General Electric'],
    'Programmable Logic Controllers': ['Allen Bradley', 'General Electric']
  }
  
  const unwantedBrands = unwantedBrandsByCategory[category] || []
  if (unwantedBrands.length > 0) {
    allFamilies = allFamilies.filter(family => !unwantedBrands.includes(family.brand))
    console.log(`Filtered out ${unwantedBrands.join(', ')} from ${category}`)
  }
  
  console.log(`Total families for ${category}: ${allFamilies.length} (${scrapedFamilies.length} scraped + ${patternFamilies.length} pattern-based)`)
  
  return allFamilies.sort((a, b) => a.name.localeCompare(b.name))
}

// Get a specific product family by ID
export function getProductFamilyById(familyId: string): ProductFamily | null {
  // First check all scraped families from all categories
  try {
    // Search through all scraped families to find the one with matching ID
    const allCategories = Object.keys(allScrapedFamilies)
    for (const category of allCategories) {
      const categoryFamilies = allScrapedFamilies[category] || []
      const scrapedFamily = categoryFamilies.find((family: ProductFamily) => family.id === familyId)
      if (scrapedFamily) {
        console.log(`Found scraped family: ${familyId} in category: ${category}`)
        return scrapedFamily
      }
    }
  } catch (error) {
    console.error(`Error searching scraped families for ${familyId}:`, error)
  }
  
  // Also check VFD families (legacy support)
  const vfdFamily = scrapedVFDFamilies.find(family => family.id === familyId)
  if (vfdFamily) {
    console.log(`Found VFD family: ${familyId}`)
    return vfdFamily
  }
  
  // Then check pattern-based families
  const familyConfig = PRODUCT_FAMILY_PATTERNS[familyId]
  if (!familyConfig) {
    console.log(`No family found for ID: ${familyId}`)
    return null
  }
  
  const allProducts = getAllProductsIncludingMitsubishi()
  const familyProducts = allProducts.filter(product => 
    matchesPattern(product, familyConfig.matchPatterns)
  )
  
  if (familyProducts.length === 0) return null
  
  // Calculate family stats
  const totalReviews = familyProducts.reduce((sum, p) => sum + p.reviews, 0)
  const avgRating = familyProducts.reduce((sum, p) => sum + p.rating, 0) / familyProducts.length
  const hasInStock = familyProducts.some(p => p.inStock)
  
  // Collect unique downloads
  const allDownloads = familyProducts.flatMap(p => p.downloads || [])
  const uniqueDownloads = allDownloads.filter((download, index, self) => 
    index === self.findIndex(d => d.name === download.name)
  )
  
  return {
    id: familyId,
    name: familyConfig.name,
    brand: familyConfig.brand,
    category: familyConfig.category,
    description: familyConfig.description,
    image: familyConfig.image,
    models: familyProducts.sort((a, b) => a.name.localeCompare(b.name)),
    specs: familyConfig.specs,
    features: familyConfig.features,
    rating: Math.round(avgRating * 10) / 10,
    reviews: totalReviews,
    inStock: hasInStock,
    badge: familyConfig.badge,
    downloads: uniqueDownloads.length > 0 ? uniqueDownloads : undefined
  }
}

// Get product families for VFDs specifically
export function getVFDProductFamilies(): ProductFamily[] {
  const existingFamilies = getProductFamiliesForCategory('Variable Frequency Drives')
  
  // Add scraped VFD families, but filter out unwanted brands
  const unwantedVFDBrands = ['LS Industrial', 'Delta', 'General Electric']
  const filteredScrapedVFDFamilies = scrapedVFDFamilies.filter(family => 
    !unwantedVFDBrands.includes(family.brand)
  )
  
  const allFamilies = [...existingFamilies, ...filteredScrapedVFDFamilies]
  
  return allFamilies.sort((a, b) => a.name.localeCompare(b.name))
}

// Get product families for Circuit Breakers specifically
export function getCircuitBreakerProductFamilies(): ProductFamily[] {
  return getProductFamiliesForCategory('Miniature Circuit Breakers')
}

// Convert a product family to a URL slug
export function getProductFamilySlug(family: ProductFamily): string {
  return family.name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
} 