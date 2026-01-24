import fs from 'fs'
import path from 'path'

// Import the shared Product type instead of defining our own
import { Product } from '@/lib/types/shared-types'

// Import the unified product collection - it already includes all product sources
// (mitsubishiProducts, tmeicProducts, lsIndustrialProducts, ericoProducts, katkoProducts, noarkProducts, etc.)
import { cleanProductsWithMitsubishi } from '@/lib/products/products'

// Import brand-specific scraped products for unified product display
import { mitsubishiScrapedProducts } from '@/lib/products/scraped/mitsubishi-scraped-products'
import { tmeicProducts as tmeicProductsScraped } from '@/lib/products/tmeic-products-scraped'
import { katkoProducts as katkoProductsScraped } from '@/lib/products/katko-products-scraped'
import { lsIndustrialScraped } from '@/lib/products/ls-industrial-scraped'
import { noarkScrapedProducts } from '@/lib/products/noark-products-scraped'
import { klemsanScrapedProducts } from '@/lib/products/klemsan-products-scraped'
import { elsteelScrapedProducts } from '@/lib/products/elsteel-products-scraped'
import { ericoScrapedProducts } from '@/lib/products/erico-products-scraped'
import { mitsubishiProducts } from '@/lib/products/mitsubishi-products'
import { tmeicProducts } from '@/lib/products/tmeic-products'
import { ericoProducts } from '@/lib/products/erico-products'

// Internal interface for raw product data from JSON files
interface RawProductData {
  product_number?: string
  name?: string
  description?: string
  product_details?: string
  price?: number | string
  stock_status?: string
  image_url?: string
  images?: string[]
  brand?: string
  category?: string
  specifications?: Record<string, any>
  id?: number
  rating?: number
  reviews?: number
  inStock?: boolean
  model?: string
  specs?: string[]
}

interface RawProductDataFile {
  products: RawProductData[]
}

// Category to directory mapping for JSON files
const CATEGORY_MAPPINGS: Record<string, string[]> = {
  'drives-vfds': ['VFDs'],
  'servo-motors': ['Servo-Motors'],
  'circuit-breakers-protection': ['Circuit-Breakers', 'Protection', 'MCCBs'],
  'contactors': ['Contactors'],
  'overload-relays': ['overload relays'],
  'plcs': ['PLCs'],
  'manual-motor-starters': ['manual motor'],
  'power-distribution': ['power distribution'],
  'custom-control-panels': ['Custom-Control-Panels'],
  'led-indicators': ['LED-Indicators'],
  'push-buttons': ['Push-buttons']
}

// Category slug to TypeScript product category name mappings
// This normalizes category names between JSON and TypeScript product sources
const CATEGORY_NAME_MAPPINGS: Record<string, string[]> = {
  'drives-vfds': ['Variable Frequency Drives', 'VFDs', 'Drives', 'DC Drives'],
  'servo-motors': ['Servo Motors', 'Servo', 'Motors', 'Low Power Motors'],
  'circuit-breakers-protection': [
    'Circuit Breakers',
    'Circuit Protection',
    'Miniature Circuit Breakers',
    'Motor Circuit Protectors',
    'Motor-Circuit Protectors',
    'Power Circuit Breakers',
    'Molded Case Switches',
    'Air Circuit Breakers',
    'DIN Rail Miniature Circuit Breakers',
    'Enclosed Breakers'
  ],
  'contactors': ['Contactors', 'Magnetic Contactor'],
  'overload-relays': ['Overload Relays', 'Thermal Overload Relays'],
  'plcs': ['PLCs', 'Programmable Logic Controllers', 'Controllers'],
  'manual-motor-starters': ['Manual Motor Starters', 'Motor Starters', 'Manual Motor Controllers'],
  'power-distribution': [
    'Power Distribution',
    'Busbars',
    'Distribution Blocks',
    'Power Blocks and Terminals',
    'Flexible Conductors',
    'Busbar Supports',
    'Power Terminals',
    'Connecting Clamps',
    'Insulators'
  ],
  'custom-control-panels': ['Custom Control Panels', 'Control Panels', 'Enclosures', 'Modular Enclosures'],
  'led-indicators': ['LED Indicators', 'Pilot Devices', 'Indicators'],
  'push-buttons': ['Push Buttons', 'Pushbuttons', 'Control Buttons']
}

/**
 * Generate a unique key for a product based on name, model, and brand
 * This helps identify true duplicates even if they have different IDs
 */
function getProductUniqueKey(product: Product): string {
  const name = (product.name || '').toLowerCase().trim()
  const model = (product.model || '').toLowerCase().trim()
  const brand = (product.brand || '').toLowerCase().trim()

  // Create a normalized key - if model exists use name+model+brand, otherwise just name+brand
  if (model) {
    return `${name}|${model}|${brand}`
  }
  return `${name}|${brand}`
}

/**
 * Remove duplicate products based on name, model, and brand
 * Keeps the first occurrence of each unique product
 */
function deduplicateProducts(products: Product[]): Product[] {
  const seen = new Set<string>()
  const seenIds = new Set<number>()
  const uniqueProducts: Product[] = []

  for (const product of products) {
    const uniqueKey = getProductUniqueKey(product)

    // Skip if we've seen this exact product (by key) or this ID
    if (seen.has(uniqueKey) || seenIds.has(product.id)) {
      continue
    }

    seen.add(uniqueKey)
    seenIds.add(product.id)
    uniqueProducts.push(product)
  }

  return uniqueProducts
}

/**
 * Get all products from TypeScript product arrays (brand products)
 * This combines all brand-specific scraped products for unified display
 */
function getAllBrandProducts(): Product[] {
  const allBrandProducts: Product[] = [
    ...mitsubishiScrapedProducts,
    ...mitsubishiProducts,
    ...tmeicProductsScraped,
    ...tmeicProducts,
    ...katkoProductsScraped,
    ...lsIndustrialScraped,
    ...noarkScrapedProducts,
    ...klemsanScrapedProducts,
    ...elsteelScrapedProducts,
    ...ericoScrapedProducts,
    ...ericoProducts,
    ...cleanProductsWithMitsubishi
  ]

  return deduplicateProducts(allBrandProducts)
}

/**
 * Get all products from TypeScript product arrays
 * Note: cleanProductsWithMitsubishi already includes mitsubishiProducts, tmeicProducts,
 * lsIndustrialProducts, ericoProducts, and katkoProducts - so we only use that
 * to avoid duplicates at the source
 */
function getAllTypescriptProducts(): Product[] {
  // cleanProductsWithMitsubishi already combines all product sources
  // No need to add individual arrays again - that was causing duplicates!
  const allProducts = [...cleanProductsWithMitsubishi]

  // Still deduplicate to catch any duplicates within cleanProductsWithMitsubishi itself
  return deduplicateProducts(allProducts)
}

/**
 * Filter TypeScript products by category slug
 */
function getTypescriptProductsForCategory(categorySlug: string): Product[] {
  const categoryNames = CATEGORY_NAME_MAPPINGS[categorySlug]
  if (!categoryNames) {
    return []
  }

  // getAllTypescriptProducts already returns deduplicated products
  const allProducts = getAllTypescriptProducts()

  const filteredProducts: Product[] = []

  for (const product of allProducts) {
    // Check if product category matches any of the category names
    const productCategory = product.category?.toLowerCase() || ''
    const matches = categoryNames.some(name =>
      productCategory === name.toLowerCase() ||
      productCategory.includes(name.toLowerCase()) ||
      name.toLowerCase().includes(productCategory)
    )

    if (matches) {
      filteredProducts.push(product)
    }
  }

  return filteredProducts
}

/**
 * Filter all brand products by category slug
 * This is the main function that provides unified product data for the products page
 */
function getBrandProductsForCategory(categorySlug: string): Product[] {
  const categoryNames = CATEGORY_NAME_MAPPINGS[categorySlug]
  if (!categoryNames) {
    return []
  }

  // Get all brand products (already deduplicated)
  const allProducts = getAllBrandProducts()

  const filteredProducts: Product[] = []

  for (const product of allProducts) {
    // Check if product category matches any of the category names
    const productCategory = product.category?.toLowerCase() || ''
    const matches = categoryNames.some(name =>
      productCategory === name.toLowerCase() ||
      productCategory.includes(name.toLowerCase()) ||
      name.toLowerCase().includes(productCategory)
    )

    if (matches) {
      filteredProducts.push(product)
    }
  }

  return filteredProducts
}

/**
 * Load products for a specific category from all sources (JSON files + TypeScript brand products)
 * This provides unified product data matching what's shown on the brands page
 */
export async function loadProductsForCategory(categorySlug: string): Promise<Product[]> {
  const jsonProducts: Product[] = []
  const productsBasePath = path.join(process.cwd(), 'Products')

  // Load from JSON files if directory mapping exists
  const directories = CATEGORY_MAPPINGS[categorySlug]
  if (directories) {
    for (const directory of directories) {
      const categoryPath = path.join(productsBasePath, directory)

      // Check if directory exists
      if (!fs.existsSync(categoryPath)) {
        console.warn(`Directory not found: ${categoryPath}`)
        continue
      }

      // Look for JSON files in the Json subdirectory and subdirectories
      await loadJsonFilesRecursively(categoryPath, jsonProducts, categorySlug)
    }
  }

  // Get brand products for this category (from TypeScript product arrays)
  const brandProducts = getBrandProductsForCategory(categorySlug)

  // Combine JSON products and brand products, then deduplicate
  const allProducts = [...jsonProducts, ...brandProducts]
  return deduplicateProducts(allProducts)
}

/**
 * Recursively load JSON files from a directory and its subdirectories
 */
async function loadJsonFilesRecursively(basePath: string, allProducts: Product[], categorySlug: string) {
  try {
    const items = fs.readdirSync(basePath, { withFileTypes: true })

    // Check if the current directory itself is a json directory and contains JSON files
    const currentDirName = path.basename(basePath).toLowerCase()
    if (currentDirName === 'json') {
      try {
        const jsonFiles = fs.readdirSync(basePath).filter(file => file.endsWith('.json'))

        for (const jsonFile of jsonFiles) {
          const filePath = path.join(basePath, jsonFile)
          await processJsonFile(filePath, allProducts, categorySlug, path.basename(path.dirname(basePath)))
        }
      } catch (error) {
        console.error(`Error loading products from ${basePath}:`, error)
      }
    }

    for (const item of items) {
      const itemPath = path.join(basePath, item.name)

      if (item.isDirectory()) {
        // Check if this directory contains JSON files in a subdirectory
        const jsonPath = path.join(itemPath, 'json')
        const JsonPath = path.join(itemPath, 'Json') // Also check capitalized version

        // Try lowercase 'json' first, then capitalized 'Json'
        for (const jsonDir of [jsonPath, JsonPath]) {
          if (fs.existsSync(jsonDir)) {
            try {
              const jsonFiles = fs.readdirSync(jsonDir).filter(file => file.endsWith('.json'))

              for (const jsonFile of jsonFiles) {
                const filePath = path.join(jsonDir, jsonFile)
                await processJsonFile(filePath, allProducts, categorySlug, item.name)
              }
            } catch (error) {
              console.error(`Error loading products from ${jsonDir}:`, error)
            }
          }
        }

        // Also recursively check subdirectories
        await loadJsonFilesRecursively(itemPath, allProducts, categorySlug)
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${basePath}:`, error)
  }
}

/**
 * Process a single JSON file and add products to the collection
 */
async function processJsonFile(filePath: string, allProducts: Product[], categorySlug: string, brandHint?: string) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const data: RawProductDataFile = JSON.parse(fileContent)

    // Add category and brand information to products if not present
    // Also normalize different field names and data formats
    const enhancedProducts = data.products.map((rawProduct, index) => {
      // Normalize product name (use 'name' or fallback to 'product_number')
      const name = rawProduct.name || rawProduct.product_number || 'Unnamed Product'

      // Normalize description (handle both 'description' and 'product_details')
      const description = rawProduct.description || rawProduct.product_details || ''

      // Normalize price (handle both number and string formats)
      let price = 0
      if (typeof rawProduct.price === 'number') {
        price = rawProduct.price
      } else if (typeof rawProduct.price === 'string') {
        // Remove currency symbols and convert to number
        const priceStr = rawProduct.price.replace(/[$,]/g, '')
        price = parseFloat(priceStr) || 0
      }

      // Normalize images (convert single image_url to images array)
      let images: string[] = []
      if (rawProduct.images && rawProduct.images.length > 0) {
        images = rawProduct.images
      } else if (rawProduct.image_url) {
        images = [rawProduct.image_url]
      } else {
        // Generate image URL if not present
        const imageUrl = generateImageUrl(filePath, name, brandHint)
        images = [imageUrl]
      }

      // Normalize stock status
      const inStock = rawProduct.inStock !== undefined
        ? rawProduct.inStock
        : (rawProduct.stock_status?.toLowerCase().includes('stock') || false)

      // Generate a unique ID if not present
      const id = rawProduct.id || Date.now() + index

      // Return product in the correct format matching shared-types
      const product: Product = {
        id: id,
        name: name,
        model: rawProduct.model || rawProduct.product_number || '',
        brand: rawProduct.brand || brandHint || extractBrandFromProduct({ ...rawProduct, description }),
        category: rawProduct.category || getCategoryDisplayName(categorySlug),
        description: description,
        price: price,
        rating: rawProduct.rating || 0,
        reviews: rawProduct.reviews || 0,
        images: images,
        inStock: inStock,
        specs: rawProduct.specs || []
      }

      return product
    })

    allProducts.push(...enhancedProducts)
  } catch (error) {
    console.error(`Error processing JSON file ${filePath}:`, error)
  }
}

/**
 * Generate image URL for products that don't have one
 */
function generateImageUrl(jsonFilePath: string, productNumber: string, brandHint?: string): string {
  // Get the directory containing the JSON file
  const jsonDir = path.dirname(jsonFilePath)
  const categoryDir = path.dirname(jsonDir)

  // Look for Images or images directory
  const imagesDir = path.join(categoryDir, 'Images')
  const imagesLowerDir = path.join(categoryDir, 'images')

  let targetImagesDir = ''
  if (fs.existsSync(imagesDir)) {
    targetImagesDir = imagesDir
  } else if (fs.existsSync(imagesLowerDir)) {
    targetImagesDir = imagesLowerDir
  }

  if (targetImagesDir) {
    try {
      const imageFiles = fs.readdirSync(targetImagesDir)
      // Look for images that might match this product or brand
      const matchingImage = imageFiles.find(file =>
        file.toLowerCase().includes(productNumber.toLowerCase()) ||
        (brandHint && file.toLowerCase().includes(brandHint.toLowerCase()))
      )

      if (matchingImage) {
        // Convert absolute path to relative path from public directory
        const relativePath = path.relative(process.cwd(), path.join(targetImagesDir, matchingImage))
        return `/${relativePath}`
      }

      // If no specific match, use the first available image
      if (imageFiles.length > 0) {
        const relativePath = path.relative(process.cwd(), path.join(targetImagesDir, imageFiles[0]))
        return `/${relativePath}`
      }
    } catch (error) {
      console.error(`Error reading images directory ${targetImagesDir}:`, error)
    }
  }

  // Default fallback image - WestShore logo
  return '/images/westlogo.jpg'
}

/**
 * Get all available categories that have product data
 */
export async function getAvailableCategories(): Promise<string[]> {
  const productsBasePath = path.join(process.cwd(), 'Products')

  if (!fs.existsSync(productsBasePath)) {
    return []
  }

  const availableCategories: string[] = []

  for (const [categorySlug, directories] of Object.entries(CATEGORY_MAPPINGS)) {
    for (const directory of directories) {
      const categoryPath = path.join(productsBasePath, directory)
      const jsonPath = path.join(categoryPath, 'Json')

      if (fs.existsSync(jsonPath)) {
        const jsonFiles = fs.readdirSync(jsonPath).filter(file => file.endsWith('.json'))
        if (jsonFiles.length > 0) {
          availableCategories.push(categorySlug)
          break // Found at least one JSON file for this category
        }
      }
    }
  }

  return availableCategories
}

/**
 * Get product count for a category
 */
export async function getProductCountForCategory(categorySlug: string): Promise<number> {
  const products = await loadProductsForCategory(categorySlug)
  return products.length
}

/**
 * Extract brand from product data
 */
function extractBrandFromProduct(product: Partial<RawProductData>): string {
  // Try to extract brand from product number or description
  const productId = product.product_number || product.name || ''
  const text = `${productId} ${product.description || ''}`.toLowerCase()

  if (text.includes('mitsubishi') || text.includes('fr-')) return 'Mitsubishi'
  if (text.includes('yaskawa') || text.includes('sigma') || text.includes('sgm')) return 'Yaskawa'
  if (text.includes('schneider')) return 'Schneider Electric'
  if (text.includes('abb')) return 'ABB'
  if (text.includes('siemens')) return 'Siemens'
  if (text.includes('allen bradley') || text.includes('rockwell')) return 'Allen Bradley'
  if (text.includes('omron')) return 'Omron'
  if (text.includes('fanuc')) return 'Fanuc'
  if (text.includes('delta')) return 'Delta'
  if (text.includes('ls industrial') || text.includes('ls electric')) return 'LS Industrial'
  if (text.includes('noark') || text.includes('ex9m')) return 'NOARK'

  return 'Unknown'
}

/**
 * Convert category slug to display name
 */
function getCategoryDisplayName(categorySlug: string): string {
  const displayNames: Record<string, string> = {
    'drives-vfds': 'Variable Frequency Drives',
    'servo-motors': 'Servo Motors',
    'circuit-breakers-protection': 'Circuit Breakers & Protection',
    'contactors': 'Contactors',
    'overload-relays': 'Overload Relays',
    'plcs': 'Programmable Logic Controllers',
    'manual-motor-starters': 'Manual Motor Starters',
    'power-distribution': 'Power Distribution',
    'custom-control-panels': 'Custom Control Panels',
    'led-indicators': 'LED Indicators',
    'push-buttons': 'Push Buttons'
  }

  return displayNames[categorySlug] || categorySlug
}

/**
 * Search products across all categories
 */
export async function searchProducts(query: string, categorySlug?: string): Promise<Product[]> {
  let products: Product[] = []

  if (categorySlug) {
    products = await loadProductsForCategory(categorySlug)
  } else {
    // Search across all categories
    const categories = await getAvailableCategories()
    for (const category of categories) {
      const categoryProducts = await loadProductsForCategory(category)
      products.push(...categoryProducts)
    }
  }

  if (!query.trim()) {
    return products
  }

  const searchTerm = query.toLowerCase()
  return products.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.model?.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.brand.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  )
}
