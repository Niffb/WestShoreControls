import { MetadataRoute } from 'next'
import { productTypes } from '@/lib/utils/product-types'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://westshorecontrols.com'
  const currentDate = new Date().toISOString()
  
  // Valid brands for dynamic routes
  const validBrands = [
    'mitsubishi',
    'tmeic',
    'katko',
    'noark',
    'klemsan',
    'erico',
    'ls-industrial'
  ]
  
  // Brand-to-categories mapping
  const brandCategories: { [key: string]: string[] } = {
    'mitsubishi': [
      'variable-frequency-drives',
      'controllers',
      'software',
      'power-sources',
    ],
    'tmeic': [
      'variable-frequency-drives',
      'pv-inverters',
      'energy-storage',
      'motors',
      'controllers',
      'software'
    ],
    'katko': [
      'enclosed-isolators',
      'switch-fuses',
      'cam-switches'
    ],
    'noark': [
      'circuit-protection',
      'industrial-controls',
      'special-applications',
      'switchboards',
      'power-transmission-distribution'
    ],
    'klemsan': [
      'terminal-blocks',
      'electrical-accessories',
      'automation'
    ],
    'erico': [
      'flexible-conductors',
      'busbars',
      'cable-management'
    ],
    'ls-industrial': [
      'industrial-controls',
      'circuit-protection',
      'human-machine-interface',
      'power-transmission-distribution'
    ]
  }
  
  // Add subcategories for specific categories
  const categorySubcategories: { [key: string]: { [key: string]: string[] } } = {
    'noark': {
      'circuit-protection': [
        'miniature-circuit-breakers',
        'molded-case-circuit-breakers-mccbs',
        'motor-circuit-protectors-mcps',
        'enclosed-breakers',
        'din-rail-fuse-holders-and-fuses',
        'surge-protective-device'
      ]
    }
  }
  
  // Add third-level routes for specific subcategories
  const subcategoryRoutes: { [key: string]: { [key: string]: { [key: string]: string[] } } } = {
    'noark': {
      'circuit-protection': {
        'miniature-circuit-breakers': [
          'b1n'
        ]
      }
    }
  }

  // Static pages
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products/`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/brands/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/product-types/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/catalogs/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/partnerships/`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // Dynamic brand pages
  const brandPages = validBrands.map(brand => ({
    url: `${baseUrl}/${brand}/`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Dynamic brand category pages
  const brandCategoryPages = Object.entries(brandCategories).flatMap(([brand, categories]) =>
    categories.map(category => ({
      url: `${baseUrl}/${brand}/${category}/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  )
  
  // Dynamic subcategory pages
  const subcategoryPages = Object.entries(categorySubcategories).flatMap(([brand, categories]) =>
    Object.entries(categories).flatMap(([category, subcategories]) =>
      subcategories.map(subcategory => ({
        url: `${baseUrl}/${brand}/${category}/${subcategory}/`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }))
    )
  )
  
  // Third-level routes (e.g., noark/circuit-protection/miniature-circuit-breakers/b1n)
  const thirdLevelPages = Object.entries(subcategoryRoutes).flatMap(([brand, categories]) =>
    Object.entries(categories).flatMap(([category, subcategories]) =>
      Object.entries(subcategories).flatMap(([subcategory, routes]) =>
        routes.map(route => ({
          url: `${baseUrl}/${brand}/${category}/${subcategory}/${route}/`,
          lastModified: currentDate,
          changeFrequency: 'weekly' as const,
          priority: 0.5,
        }))
      )
    )
  )

  // Product type pages
  const productTypePages = productTypes.map(type => ({
    url: `${baseUrl}/product-types/${type.slug}/`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    ...staticPages,
    ...brandPages,
    ...brandCategoryPages,
    ...subcategoryPages,
    ...thirdLevelPages,
    ...productTypePages
  ]
} 