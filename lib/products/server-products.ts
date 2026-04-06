import { Product } from '@/lib/types/shared-types'
import { tmeicProducts as tmeicProductsScraped } from './tmeic-products-scraped'
import { katkoProducts as katkoProductsScraped } from './katko-products-scraped'
import { lsIndustrialScraped } from './ls-industrial-scraped'
import { noarkScrapedProducts } from './noark-products-scraped'
import { klemsanScrapedProducts } from './klemsan-products-scraped'
import { elsteelScrapedProducts } from './elsteel-products-scraped'
import { mitsubishiScrapedProducts } from './scraped/mitsubishi-scraped-products'
import { mitsubishiDrives_vfdsScrapedProducts } from './scraped/mitsubishi-drives_vfds-scraped-products'
import { mitsubishiBatteries_powerScrapedProducts } from './scraped/mitsubishi-batteries_power-scraped-products'
import { mitsubishiCables_accessoriesScrapedProducts } from './scraped/mitsubishi-cables_accessories-scraped-products'
import { mitsubishiCircuit_breakersScrapedProducts } from './scraped/mitsubishi-circuit_breakers-scraped-products'
import { mitsubishiServo_motorsScrapedProducts } from './scraped/mitsubishi-servo_motors-scraped-products'
import { mitsubishiPower_distributionScrapedProducts } from './scraped/mitsubishi-power_distribution-scraped-products'
import { mitsubishiOther_productsScrapedProducts } from './scraped/mitsubishi-other_products-scraped-products'
import { cleanProductsWithMitsubishi } from './products'

// Combined Mitsubishi products - detailed products where available, series for others
const detailedCategories = new Set([
  'variable frequency drives',
  'batteries & power',
  'cables & accessories', 
  'circuit breakers',
  'servo motors',
  'power distribution',
  'other products'
])

const seriesProductsForMissingCategories = mitsubishiScrapedProducts.filter(
  p => !detailedCategories.has(p.category?.toLowerCase() || '')
)

const allMitsubishiProducts: Product[] = [
  ...seriesProductsForMissingCategories,
  ...mitsubishiDrives_vfdsScrapedProducts,
  ...mitsubishiBatteries_powerScrapedProducts,
  ...mitsubishiCables_accessoriesScrapedProducts,
  ...mitsubishiCircuit_breakersScrapedProducts,
  ...mitsubishiServo_motorsScrapedProducts,
  ...mitsubishiPower_distributionScrapedProducts,
  ...mitsubishiOther_productsScrapedProducts,
]

export interface ProductFilterOptions {
  brand?: string
  category?: string
  subcategory?: string
}

export async function getFilteredProducts({
  brand,
  category,
  subcategory
}: ProductFilterOptions): Promise<Product[]> {
  // Use brand-specific product sources for known brands
  let products: Product[] = brand?.toLowerCase() === 'tmeic'
    ? tmeicProductsScraped
    : brand?.toLowerCase() === 'katko'
      ? katkoProductsScraped
      : brand?.toLowerCase() === 'ls industrial' || brand?.toLowerCase() === 'ls-industrial'
        ? lsIndustrialScraped
        : brand?.toLowerCase() === 'noark'
          ? noarkScrapedProducts
          : brand?.toLowerCase() === 'klemsan'
            ? klemsanScrapedProducts
            : brand?.toLowerCase() === 'elsteel'
              ? elsteelScrapedProducts
              : brand?.toLowerCase() === 'mitsubishi'
                ? allMitsubishiProducts
                : cleanProductsWithMitsubishi

  // For brands not explicitly handled above, filter by brand name
  const handledBrands = ['tmeic', 'katko', 'ls industrial', 'ls-industrial', 'noark', 'klemsan', 'elsteel', 'mitsubishi']
  if (brand && !handledBrands.includes(brand.toLowerCase())) {
    products = products.filter(product =>
      product.brand?.toLowerCase() === brand.toLowerCase()
    )
  }

  if (category) {
    const normalizedCategory = category.toLowerCase()

    if (handledBrands.includes(brand?.toLowerCase() || '')) {
      products = products.filter(product => {
        const productCategory = product.category?.toLowerCase() || ''
        const productSubcategory = (product as any).subcategory?.toLowerCase() || ''
        return productCategory === normalizedCategory || 
               productSubcategory === normalizedCategory
      })
    } else {
      const categoryVariations = [
        normalizedCategory,
        normalizedCategory.replace(/-/g, ' '),
        normalizedCategory.replace(/\s+/g, '-'),
        normalizedCategory === 'variable frequency drives' ? 'vfds' : '',
        normalizedCategory === 'programmable logic controllers' ? 'plcs' : '',
        normalizedCategory === 'circuit breakers' ? 'circuit protection' : '',
      ].filter(Boolean)

      products = products.filter(product => {
        const productCategory = product.category?.toLowerCase() || ''
        const productSubcategory = (product as any).subcategory?.toLowerCase() || ''

        return categoryVariations.some(variation =>
          productCategory.includes(variation) ||
          variation.includes(productCategory) ||
          productSubcategory.includes(variation) ||
          variation.includes(productSubcategory)
        )
      })
    }
  }

  if (subcategory) {
    products = products.filter(product =>
      (product as any).subcategory?.toLowerCase().includes(subcategory.toLowerCase())
    )
  }

  // Filter out products that only have the default West Shore logo as their image
  products = products.filter(product => {
    const hasDefaultLogo = product.images?.length === 1 &&
      (product.images[0] === '/images/westlogo.jpg' ||
        product.images[0]?.includes('westlogo'))
    return !hasDefaultLogo
  })

  return products
}

export async function getBrandCategoryCounts(brandName: string): Promise<Record<string, number>> {
  const products = await getFilteredProducts({ brand: brandName })
  const counts: Record<string, number> = {}
  
  products.forEach(product => {
    const category = product.category || 'Other'
    counts[category] = (counts[category] || 0) + 1
  })
  
  return counts
}
