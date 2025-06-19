import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://westshorecontrols.com'
  
  // Define the valid brands
  const validBrands = [
    'mitsubishi',
    'noark',
    'ls-industrial',
    'tmeic',
    'erico',
    'katko',
    'klemsan',
    'elsteel',
    'westshore-controls'
  ]

  // Define brand categories for more detailed sitemap
  const brandCategories: { [key: string]: string[] } = {
    'mitsubishi': ['automation', 'drives', 'plc', 'hmi'],
    'noark': ['contactors', 'circuit-breakers', 'motor-protection', 'switchboards'],
    'ls-industrial': ['contactors', 'circuit-breakers', 'motor-starters', 'drives'],
    'tmeic': ['drives', 'inverters', 'generators', 'motors'],
    'erico': ['grounding', 'bonding', 'conductors', 'busbars'],
    'katko': ['motor-controllers', 'safety-switches', 'controls'],
    'klemsan': ['terminal-blocks', 'connectors', 'automation'],
    'elsteel': ['electrical-steel', 'metals', 'fabrication'],
    'westshore-controls': ['all-products']
  }

  const currentDate = new Date().toISOString()

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/partnerships/`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/brands/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }
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

  return [
    ...staticPages,
    ...brandPages,
    ...brandCategoryPages
  ]
} 