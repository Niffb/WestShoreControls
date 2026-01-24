import { Product } from '@/lib/types/shared-types'
import scrapedData from '../../scrapers/erico/scraped-products.json'

/**
 * ERICO/ERIFLEX Products - Loaded from scraper JSON
 * Source: nVent ERIFLEX website (https://www.nvent.com/en-gb/eriflex)
 * 
 * This file imports from the scraped JSON directly for efficiency.
 * To update products, run: cd scrapers/erico && npm run generate
 */
export const ericoScrapedProducts: Product[] = scrapedData.map(product => ({
  id: product.id,
  name: product.name,
  model: product.model || product.name.split(' ')[0],
  brand: 'ERICO',
  category: product.category,
  subcategory: product.subcategory,
  description: product.description,
  price: 0,
  rating: product.rating || 4.7,
  reviews: product.reviews || 25,
  images: product.images || [],
  inStock: product.inStock !== false,
  specs: product.specs || [],
  features: product.features || [],
  url: product.url || 'https://www.nvent.com/en-gb/eriflex'
}))

// Category images for ERICO products
export const ericoCategoryImages: Record<string, string> = {
  'Flexible Busbars': '/assets/images/products/erico/Flexible_Conductors_flexible-conductor_98144139.jpg',
  'Flexible Conductors': '/assets/images/products/erico/IBS_Flat_Insulated_Braided_Conductor_IBS-conductor_IBS-conductor_ec75339b.jpg',
  'FleXbus System': '/assets/images/products/erico/Flexible_Conductors_flexible-conductor_98144139.jpg',
  'Distribution Blocks': '/assets/images/products/erico/BD-40A_BD-40A_BD-40A-300x300_36e975cb.jpg',
  'Power Terminals': '/assets/images/products/erico/SB-power-terminals_SB-power-terminals_SB-power-terminals-300x300_81ee0a3c.jpg',
  'Grounding Braids': '/assets/images/products/erico/MBJ_grounding_bonding_braids_erico_MBJ_grounding_b_MBJ-grounding-bonding-braids-350x360_80fa7804.jpg',
  'Power Meters': '/assets/images/products/erico/ISO-TP_low_voltage_metric_insulators_ISO-TP_low_vo_ISO-TP-insulators-300x300_f859f294.jpg',
  'Insulators': '/assets/images/products/erico/ISO-TP_low_voltage_metric_insulators_ISO-TP_low_vo_ISO-TP-insulators-300x300_f859f294.jpg',
  'Earthing Busbars': '/assets/images/products/erico/UD-80A_distribution_blocks_UD-80A_distribution_blo_UD-80A-300x300_559cda7a.jpg',
  'Busbars': '/assets/images/products/erico/TCB_threaded_busbar_TCB_threaded_busbar_TCB_threaded_busbar-350x360_52c7809c.jpg',
  'Busbar Supports': '/assets/images/products/erico/UBS_Universal_Busbar_Supports_UBS_Universal_Busbar_UBS-300x300_3b919330.jpg',
  'Connecting Clamps': '/assets/images/products/erico/FC_erico_flexibar_clamp_FC_erico_flexibar_clamp_FC_erico_flexibar_clamp-350x360_8175290c.jpg',
  'DIN Profiles': '/assets/images/products/erico/adjustable_busbar_supports_adjustable_busbar_suppo_adjustable-busbar-supports-300x300_152ba74f.jpg',
  'Cable Management': '/assets/images/products/erico/FGBS_FGBS_FGBS-300x300_2cd174d2.jpg',
  'Tools': '/assets/images/products/erico/PCB_plain_copper_busbar_PCB_plain_copper_busbar_PBC_plain_busbar-350x360_b933d97c.jpg'
}

export const ericoStats = {
  totalProducts: ericoScrapedProducts.length,
  withFeatures: ericoScrapedProducts.filter(p => p.features && p.features.length > 0).length,
  withSpecs: ericoScrapedProducts.filter(p => p.specs && p.specs.length > 0).length,
  categories: [...new Set(ericoScrapedProducts.map(p => p.category))].length,
  source: 'nVent ERIFLEX'
}

// Helper functions
export function getEricoProductsByCategory(category: string): Product[] {
  if (category === 'All Products') return ericoScrapedProducts
  return ericoScrapedProducts.filter(p => p.category === category)
}

export function getEricoCategories(): string[] {
  return [...new Set(ericoScrapedProducts.map(p => p.category))]
}

export default ericoScrapedProducts
