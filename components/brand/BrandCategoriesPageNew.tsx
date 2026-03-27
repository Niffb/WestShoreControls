'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRightIcon, HomeIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import {
  BoltIcon,
  CpuChipIcon,
  PowerIcon,
  WrenchScrewdriverIcon,
  LightBulbIcon,
  CogIcon,
  Squares2X2Icon,
  CommandLineIcon,
  BeakerIcon
} from '@heroicons/react/24/outline'
import { ShieldCheckIcon, BuildingLibraryIcon, LinkIcon, WrenchIcon } from '@heroicons/react/24/solid'

import { cleanProducts, cleanProductsWithMitsubishi, getProductsByBrandEnhanced } from '@/lib/products/products'
import { mitsubishiProducts } from '@/lib/products/mitsubishi-products'
import { mitsubishiScrapedProducts, mitsubishiCategoryImages } from '@/lib/products/mitsubishi-products-scraped'
import { tmeicProducts as tmeicProductsOriginal } from '@/lib/products/tmeic-products'
import { tmeicProducts as tmeicProductsScraped, tmeicCategoryImages } from '@/lib/products/tmeic-products-scraped'
import { katkoProducts as katkoProductsScraped, katkoCategoryImages } from '@/lib/products/katko-products-scraped'
import { lsIndustrialScraped, lsIndustrialCategoryImages } from '@/lib/products/ls-industrial-scraped'
import { noarkScrapedProducts, noarkCategoryImages } from '@/lib/products/noark-products-scraped'
import { klemsanScrapedProducts, klemsanCategoryImages } from '@/lib/products/klemsan-products-scraped'
import { elsteelScrapedProducts, elsteelCategoryImages } from '@/lib/products/elsteel-products-scraped'
import { getImageUrl } from '@/lib/config/image-config'
// Import detailed Mitsubishi products with unique IDs
import { mitsubishiDrives_vfdsScrapedProducts } from '@/lib/products/scraped/mitsubishi-drives_vfds-scraped-products'
import { mitsubishiBatteries_powerScrapedProducts } from '@/lib/products/scraped/mitsubishi-batteries_power-scraped-products'
import { mitsubishiCables_accessoriesScrapedProducts } from '@/lib/products/scraped/mitsubishi-cables_accessories-scraped-products'
import { mitsubishiCircuit_breakersScrapedProducts } from '@/lib/products/scraped/mitsubishi-circuit_breakers-scraped-products'
import { mitsubishiServo_motorsScrapedProducts } from '@/lib/products/scraped/mitsubishi-servo_motors-scraped-products'
import { mitsubishiPower_distributionScrapedProducts } from '@/lib/products/scraped/mitsubishi-power_distribution-scraped-products'
import { mitsubishiOther_productsScrapedProducts } from '@/lib/products/scraped/mitsubishi-other_products-scraped-products'
import { Product } from '@/lib/types/shared-types'

// Combined Mitsubishi products - detailed products where available, series for others
const detailedMitsubishiCategories = new Set([
  'variable frequency drives',
  'batteries & power',
  'cables & accessories', 
  'circuit breakers',
  'servo motors',
  'power distribution',
  'other products'
])

// Keep series products only for categories without detailed products (PLCs, HMI, Motion Controllers, Contactors)
const mitsubishiSeriesForMissingCategories = mitsubishiScrapedProducts.filter(
  p => !detailedMitsubishiCategories.has(p.category?.toLowerCase() || '')
)

const allMitsubishiDetailedProducts: Product[] = [
  ...mitsubishiSeriesForMissingCategories, // Series for PLCs, HMI, Motion Controllers, Contactors
  ...mitsubishiDrives_vfdsScrapedProducts, // 627 VFD products
  ...mitsubishiBatteries_powerScrapedProducts, // 5 products
  ...mitsubishiCables_accessoriesScrapedProducts, // 10 products
  ...mitsubishiCircuit_breakersScrapedProducts, // 341 products
  ...mitsubishiServo_motorsScrapedProducts, // 543 products
  ...mitsubishiPower_distributionScrapedProducts, // 1 product
  ...mitsubishiOther_productsScrapedProducts, // 63 products
]

// Use scraped products for TMEIC (has external image URLs)
const tmeicProducts = tmeicProductsScraped
// Use scraped products for Katko (2459 products)
const katkoProducts = katkoProductsScraped
// Use scraped products for Noark (4307 products)
const noarkProducts = noarkScrapedProducts
// Use scraped products for Klemsan (265 products)
const klemsanProducts = klemsanScrapedProducts
// Use scraped products for Elsteel (18 products)
const elsteelProducts = elsteelScrapedProducts

// Brand data with logos and categories (same as in BrandSelection)
const brands = [
  {
    name: 'LS Industrial',
    logo: getImageUrl('brands/LS.webp'),
    description: 'Complete Industrial Automation Solutions - Full Range of VFDs, PLCs, Contactors & Control Systems',
    categories: ['Variable Frequency Drives', 'Programmable Logic Controllers', 'Contactors', 'Circuit Breakers', 'Overload Relays', 'Softstarters', 'I/O Modules', 'Human Machine Interface']
  },
  {
    name: 'ERICO',
    logo: getImageUrl('brands/Erico.webp'),
    description: 'Complete Electrical Connection & Protection Product Line',
    categories: ['Flexible Conductors', 'Busbars', 'Cable Management']
  },
  {
    name: 'Katko',
    logo: getImageUrl('brands/Katko.webp'),
    description: 'Complete Range of Enclosed Isolators & Safety Switches',
    categories: ['Enclosed Isolators', 'Load Break Switches', 'Switch Fuses', 'UL/CSA Listed', 'Connectors', 'Installation Enclosures', 'Accessories']
  },
  {
    name: 'Klemsan',
    logo: getImageUrl('brands/klemsan-logo.webp'),
    description: 'Full Product Line of Terminal Blocks & Connection Solutions',
    categories: ['Screw Terminals', 'Quick Release', 'Spring Terminals', 'Plug Terminals', 'Other Terminals', 'End Stops', 'Power Sources', 'Intermediate Relays', 'Automation', 'Climate', 'Cam Switches', 'Control Buttons', 'Junction Boxes', 'Thermal Printers', 'Cable Channels', 'Tools and Accessories']
  },
  {
    name: 'TMEIC',
    logo: getImageUrl('brands/TMEIC_logo.png'),
    description: 'Complete Range of High Power Drives & Industrial Systems',
    categories: ['Variable Frequency Drives', 'DC Drives', 'PV Inverters', 'Energy Storage', 'Motors', 'Generators', 'Software']
  },
  {
    name: 'Mitsubishi',
    logo: getImageUrl('brands/MitsubishiLogo.webp'),
    description: 'Complete Factory Automation & Electric Controls Product Line',
    categories: [
      'Variable Frequency Drives',
      'Programmable Logic Controllers',
      'Motion Controllers',
      'Human Machine Interface',
      'Servo Motors',
      'Circuit Breakers',
      'Contactors'
    ]
  },
  {
    name: 'Noark',
    logo: getImageUrl('brands/Noark.webp'),
    description: 'Complete Circuit Protection & Industrial Controls Product Line',
    categories: ['Circuit Breakers', 'Contactors', 'Overload Relays', 'Manual Motor Starters', 'Push Buttons', 'LED Indicators', 'Power Distribution', 'Other Products']
  },
  {
    name: 'Elsteel',
    logo: getImageUrl('brands/Elsteel.webp'),
    description: 'Full Range of Electrical Steel & Distribution Equipment',
    categories: ['Modular Enclosures', 'Enclosures', 'Special Enclosures', 'Super Frame', 'Plug and Power', 'Accessories', 'Software & Tools']
  }
]

// Category icons mapping
const getCategoryIcon = (category: string) => {
  const iconMap: { [key: string]: any } = {
    'Contactors': BoltIcon,
    'Variable Frequency Drives': CpuChipIcon,
    'DIN Rail Miniature Circuit Breakers': PowerIcon,
    'Circuit Breakers': PowerIcon,
    'Circuit Protection': PowerIcon,
    'Motor Circuit Protectors': BoltIcon,
    'Power Circuit Breakers': PowerIcon,
    'Molded Case Circuit Breakers (MCCBs)': PowerIcon,
    'Molded Case Switches': BoltIcon,
    'Motor-Circuit Protectors (MCPs)': BoltIcon,
    'Miniature Circuit Breakers': PowerIcon,
    'Enclosed Breakers': Squares2X2Icon,
    'DIN Rail Fuse Holders and Fuses': Squares2X2Icon,
    'Surge Protective Device': BoltIcon,
    'Industrial Control Systems': CogIcon,
    'Industrial Controls': CogIcon,
    'LV Switchboards': PowerIcon,
    'Power T & D': PowerIcon,
    'Special Applications': BeakerIcon,
    'Switchboards': Squares2X2Icon,
    'Power Transmission & Distribution': PowerIcon,
    'Pilot Devices': LightBulbIcon,
    'Manual Motor Controllers': CogIcon,
    'Motor Starters': CogIcon,
    'Flexible Conductors': WrenchScrewdriverIcon,
    'Busbars': WrenchScrewdriverIcon,
    'Terminal Blocks': Squares2X2Icon,
    'Overload Relays': CommandLineIcon,
    'Controllers': CpuChipIcon,
    'Motors': CogIcon,
    'Programmable Logic Controllers': CpuChipIcon,
    'Softstarters': BoltIcon,
    'I/O Modules': Squares2X2Icon,

    'Cable Management': WrenchScrewdriverIcon,
    'Marking Solutions': BeakerIcon,
    'Electronic Terminals': Squares2X2Icon,
    'Terminal Marking': BeakerIcon,
    'DC Drives': CpuChipIcon,
    'Enclosures': Squares2X2Icon,
    'Distribution Blocks': PowerIcon,
    'Power Blocks and Terminals': PowerIcon,
    'Modular Enclosures': Squares2X2Icon,
    'Plug and Power': BoltIcon,
    'Special Enclosures': WrenchScrewdriverIcon,
    'Super Frame': CpuChipIcon,
    'Human Machine Interface': LightBulbIcon,
    'SCADA Systems': CommandLineIcon,
    'Robotics': CogIcon,
    'Field Devices': WrenchScrewdriverIcon,
    'Energy Management': BeakerIcon,
    'Low Power Motors': PowerIcon,
    'PV Inverters': PowerIcon,
    'Energy Storage': BoltIcon,
    'Software': CommandLineIcon,
    'Load Break Switches': PowerIcon,
    'Switch Fuses': BoltIcon,
    'Enclosed Isolators': Squares2X2Icon,
    'UL/CSA Listed': ShieldCheckIcon,
    'Connectors': LinkIcon,
    'Installation Enclosures': BuildingLibraryIcon,
    'Accessories': WrenchIcon,

    // Klemsan specific icons
    'Screw Terminals': WrenchScrewdriverIcon,
    'Quick Release': BoltIcon,
    'Spring Terminals': Squares2X2Icon,
    'Plug Terminals': LinkIcon,
    'Other Terminals': Squares2X2Icon,
    'End Stops': WrenchIcon,
    'Power Sources': PowerIcon,
    'Intermediate Relays': CommandLineIcon,
    'Automation': CogIcon,
    'Climate': BeakerIcon,
    'Cam Switches': CogIcon,
    'Control Buttons': LightBulbIcon,
    'Junction Boxes': Squares2X2Icon,
    'Thermal Printers': BeakerIcon,
    'Cable Channels': WrenchScrewdriverIcon,
    'Tools and Accessories': WrenchIcon
  }
  return iconMap[category] || Squares2X2Icon
}

// Category colors
const getCategoryColor = (category: string) => {
  const colorMap: { [key: string]: string } = {
    'Contactors': 'bg-blue-500',
    'Variable Frequency Drives': 'bg-purple-500',
    'DIN Rail Miniature Circuit Breakers': 'bg-red-500',
    'Circuit Breakers': 'bg-red-500',
    'Circuit Protection': 'bg-red-600',
    'Motor Circuit Protectors': 'bg-blue-600',
    'Power Circuit Breakers': 'bg-red-500',
    'Molded Case Circuit Breakers (MCCBs)': 'bg-orange-600',
    'Molded Case Switches': 'bg-blue-700',
    'Motor-Circuit Protectors (MCPs)': 'bg-blue-600',
    'Miniature Circuit Breakers': 'bg-red-400',
    'Enclosed Breakers': 'bg-gray-500',
    'DIN Rail Fuse Holders and Fuses': 'bg-gray-600',
    'Surge Protective Device': 'bg-yellow-600',
    'Industrial Control Systems': 'bg-green-600',
    'Industrial Controls': 'bg-green-600',
    'LV Switchboards': 'bg-purple-600',
    'Power T & D': 'bg-indigo-600',
    'Special Applications': 'bg-pink-600',
    'Switchboards': 'bg-indigo-600',
    'Power Transmission & Distribution': 'bg-orange-600',
    'Pilot Devices': 'bg-yellow-500',
    'Manual Motor Controllers': 'bg-green-500',
    'Motor Starters': 'bg-green-500',
    'Flexible Conductors': 'bg-orange-500',
    'Busbars': 'bg-orange-500',
    'Terminal Blocks': 'bg-gray-500',
    'Overload Relays': 'bg-indigo-500',
    'Controllers': 'bg-purple-500',
    'Motors': 'bg-green-500',
    'Programmable Logic Controllers': 'bg-blue-600',
    'Softstarters': 'bg-yellow-600',
    'I/O Modules': 'bg-teal-500',

    'Cable Management': 'bg-orange-500',
    'Marking Solutions': 'bg-pink-500',
    'Electronic Terminals': 'bg-gray-500',
    'Terminal Marking': 'bg-pink-500',
    'DC Drives': 'bg-purple-500',
    'Enclosures': 'bg-gray-500',
    'Distribution Blocks': 'bg-red-500',
    'Power Blocks and Terminals': 'bg-red-500',
    'Plug and Power': 'bg-blue-600',
    'Special Enclosures': 'bg-purple-600',
    'Super Frame': 'bg-green-600',
    'Human Machine Interface': 'bg-yellow-500',
    'SCADA Systems': 'bg-indigo-500',
    'Robotics': 'bg-green-500',
    'Field Devices': 'bg-orange-500',
    'Energy Management': 'bg-pink-500',
    'Low Power Motors': 'bg-green-500',
    'PV Inverters': 'bg-blue-500',
    'Energy Storage': 'bg-green-600',
    'Software': 'bg-purple-600',
    'Load Break Switches': 'bg-blue-600',
    'Switch Fuses': 'bg-orange-600',
    'Enclosed Isolators': 'bg-gray-500',
    'UL/CSA Listed': 'bg-green-700',
    'Connectors': 'bg-purple-600',
    'Installation Enclosures': 'bg-indigo-600',
    'Accessories': 'bg-yellow-600',

    // Klemsan specific colors
    'Screw Terminals': 'bg-orange-500',
    'Quick Release': 'bg-blue-500',
    'Spring Terminals': 'bg-green-500',
    'Plug Terminals': 'bg-purple-500',
    'Other Terminals': 'bg-gray-500',
    'End Stops': 'bg-yellow-500',
    'Power Sources': 'bg-red-500',
    'Intermediate Relays': 'bg-indigo-500',
    'Automation': 'bg-green-600',
    'Climate': 'bg-blue-600',
    'Cam Switches': 'bg-purple-600',
    'Control Buttons': 'bg-yellow-600',
    'Junction Boxes': 'bg-gray-600',
    'Thermal Printers': 'bg-pink-500',
    'Cable Channels': 'bg-orange-600',
    'Tools and Accessories': 'bg-yellow-700'
  }
  return colorMap[category] || 'bg-gray-500'
}

// Category representative images
const getCategoryImage = (category: string, brand?: string) => {
  // Use TMEIC-specific images from scraped data (external URLs)
  if (brand === 'TMEIC') {
    // Use category images from scraped data (external TMEIC website URLs)
    if (tmeicCategoryImages[category]) {
      return tmeicCategoryImages[category]
    }
    // Fallback to first product image in that category
    const product = tmeicProducts.find(p => p.category === category)
    if (product && product.images && product.images.length > 0) {
      return product.images[0]
    }
  }

  // Use Katko-specific images from scraped data (Shopify CDN)
  if (brand === 'Katko') {
    // Use category images from scraped data if available
    if (katkoCategoryImages[category]) {
      // Only use if it's a proper Katko image (from Shopify CDN), not CE marking
      if (katkoCategoryImages[category].includes('cdn.shopify.com') && !katkoCategoryImages[category].includes('europa.eu')) {
        return katkoCategoryImages[category]
      }
    }
    // Fallback to first product image in that category (from Shopify CDN)
    const product = katkoProducts.find(p =>
      p.category === category &&
      p.images &&
      p.images.length > 0 &&
      (p.images[0].includes('cdn.shopify.com') || p.images[0].includes('katko.com'))
    )
    if (product && product.images && product.images.length > 0) {
      return product.images[0]
    }
  }

  // Use Mitsubishi-specific images from scraped data
  if (brand === 'Mitsubishi') {
    // Use category images from scraped data (external Mitsubishi website URLs)
    if (mitsubishiCategoryImages[category]) {
      return mitsubishiCategoryImages[category]
    }
    // Fallback to first product image in that category from detailed products
    const product = allMitsubishiDetailedProducts.find(p => 
      p.category === category && 
      p.images && 
      p.images.length > 0 &&
      !p.images[0].includes('westlogo')
    )
    if (product && product.images && product.images.length > 0) {
      return product.images[0]
    }
  }

  // Use Klemsan-specific images for Klemsan brand categories (local images)
  if (brand === 'Klemsan') {
    if (klemsanCategoryImages[category]) {
      return klemsanCategoryImages[category]
    }
    // Fallback to first product image in that category
    const product = klemsanProducts.find(p =>
      p.category === category &&
      p.images &&
      p.images.length > 0
    )
    if (product && product.images && product.images.length > 0) {
      return product.images[0]
    }
  }

  // Use Elsteel-specific images for Elsteel brand categories (external from elsteel.com)
  if (brand === 'Elsteel') {
    if (elsteelCategoryImages[category]) {
      return elsteelCategoryImages[category]
    }
    // Fallback to first product image in that category
    const product = elsteelProducts.find(p =>
      p.category === category &&
      p.images &&
      p.images.length > 0
    )
    if (product && product.images && product.images.length > 0) {
      return product.images[0]
    }
  }

  // Use LS Industrial-specific images for LS Industrial brand categories (local images)
  if (brand === 'LS Industrial') {
    if (lsIndustrialCategoryImages[category]) {
      return lsIndustrialCategoryImages[category]
    }
  }

  // Use Noark-specific images for Noark brand categories (local images)
  if (brand === 'Noark') {
    if (noarkCategoryImages[category]) {
      return noarkCategoryImages[category]
    }
    // Fallback to first product image in that category
    const product = noarkProducts.find(p =>
      p.category === category &&
      p.images &&
      p.images.length > 0 &&
      !p.images[0].includes('placeholder') &&
      !p.images[0].includes('noark-logo')
    )
    if (product && product.images && product.images.length > 0) {
      return product.images[0]
    }
  }

  // Use ERICO-specific images for ERICO brand categories
  if (brand === 'ERICO') {
    const ericoImageMap: { [key: string]: string } = {
      'Flexible Conductors': '/assets/images/products/erico/BJ_round_braid_with_crimped_lugs_BJ_round_braid_wi_BJ-round-braid-crimped-lugs-350x360_3e8fa2ee.webp',
      'Busbars': '/assets/images/products/erico/DPCB_punched_plain_copper_busbar_double_DPCB_punch_DPCB_double_punched_busbar-350x360_feeee51d.webp',
      'Cable Management': '/assets/images/products/erico/FGBS_FGBS_FGBS-300x300_2cd174d2.webp',
      'Distribution Blocks': '/assets/images/products/erico/BD-40A_BD-40A_BD-40A-300x300_36e975cb.webp',
      'Power Blocks and Terminals': '/assets/images/products/erico/SB-power-terminals_SB-power-terminals_SB-power-terminals-300x300_81ee0a3c.webp',
      'Busbar Supports': '/assets/images/products/erico/Busbar_Supports_solutions-for-electrical-power-category-img-300x300_8f79b7f0.webp',
      'Connecting Clamps': '/assets/images/products/erico/FC_erico_flexibar_clamp_FC_erico_flexibar_clamp_FC_erico_flexibar_clamp-350x360_8175290c.webp',
      'Power Terminals': '/assets/images/products/erico/SB-power-terminals_SB-power-terminals_SB-power-terminals-300x300_81ee0a3c.webp',
      'Insulators': '/assets/images/products/erico/ISO-TP_low_voltage_metric_insulators_ISO-TP_low_vo_ISO-TP-insulators-300x300_f859f294.jpg',
      'Connectors': '/assets/images/products/erico/XM5_threaded_busbar_connector_XM5_threaded_busbar__XM5_connector-350x360_80d380c4.webp'
    }

    if (ericoImageMap[category]) {
      return ericoImageMap[category]
    }
  }

  // Default images for other brands
  const imageMap: { [key: string]: string } = {
    'Contactors': 'products/contactors/IEC-contactors-Ex9CS-Mini-NR_IEC-contactors-Ex9CS-_IEC-contactors-Ex9CS-Mini-NR_5e300640.jpg',
    'Variable Frequency Drives': 'products/general/starvert-ie5_starvert-ie5_starvert-ie5_0e6fd403.jpg',
    'DIN Rail Miniature Circuit Breakers': 'products/circuit_breakers/susol-circuit-breakers-product-info_susol-circuit-breakers-product-info_58961ab2.jpg',
    'Circuit Breakers': 'products/circuit_breakers/air_circuit_breakers_air_circuit_breakers_air-circuit-breakers_36dc9a41.jpg',
    'Pilot Devices': 'products/pilot_devices/Ex9PB_22mm_pushbuttons_specifications_Ex9PB_22mm_pushbuttons_specifications_fff32144.jpg',
    'Manual Motor Controllers': 'products/contactors/manual-motor-starters-Ex9SN_manual-motor-starters-_manual-motor-starters-Ex9SN1-300x300_b4553354.jpg',
    'Motor Starters': 'products/contactors/manual-motor-starters-Ex9SN_manual-motor-starters-_manual-motor-starters-Ex9SN1-300x300_b4553354.jpg',
    'Flexible Conductors': '/assets/images/products/erico/BJ_round_braid_with_crimped_lugs_BJ_round_braid_wi_BJ-round-braid-crimped-lugs-350x360_3e8fa2ee.webp',
    'Busbars': '/assets/images/products/erico/DPCB_punched_plain_copper_busbar_double_DPCB_punch_DPCB_double_punched_busbar-350x360_feeee51d.webp',
    'Terminal Blocks': 'products/klemsan/OPK_EKI_112010N.webp',
    'Overload Relays': 'products/noark/Thermal_Overload_Relays_Ex9RD_Ex9RD-thermal-overload-relays-300x300_486a7e7a.jpg',
    'Motor Circuit Protectors': 'categories/Motor Circuit Protectors/Motor Circuit Protectors Stock Images.avif',
    'Miniature Circuit Breakers': 'categories/Miniature Circuit Breakers/Miniature Circuit Breakers.avif',
    'Molded Case Switches': 'categories/Molded Case Switches/Molded Case Switches Ex9MD Series (1).avif',
    'Surge Protective Device': 'categories/Surge Protection Device/Surge Protective Devices.avif',
    'Power Circuit Breakers': 'categories/Power Curcuit /Power Circuit Breakers NOARK.avif',
    'DIN Rail Fuse Holders and Fuses': 'categories/DIN Rail Fuse Holders and Fuses/DIN Rail Fuse Holders and Fuses.avif',
    'Enclosed Breakers': 'categories/enclosed breakers/Enclosed Breakers.avif',
    'Circuit Protection': 'categories/Motor Circuit Protectors/Motor Circuit Protectors Stock Images.avif',
    'Controllers': 'products/general/starvert-ie5_starvert-ie5_starvert-ie5_0e6fd403.jpg',
    'Motors': 'products/motors/AC-motors-Ex9IE3_motor_AC-motors-Ex9IE3_motor_26e75140.jpg',
    'Cable Management': '/assets/images/products/erico/FGBS_FGBS_FGBS-300x300_2cd174d2.webp',
    'Marking Solutions': 'products/klemsan/marking-systems-klippon-connect_marking-systems-klippon-connect_marking-systems-klippon-connect_0f427544.jpg',
    'Electronic Terminals': 'products/klemsan/OPK_EKI_112010N.webp',
    'Terminal Marking': 'products/klemsan/marking-systems-klippon-connect_marking-systems-klippon-connect_marking-systems-klippon-connect_0f427544.jpg',
    'DC Drives': 'products/general/starvert-ie5_starvert-ie5_starvert-ie5_0e6fd403.jpg',
    'Enclosures': 'products/enclosures/fully-welded-ip69k.jpg',
    'Distribution Blocks': '/assets/images/products/erico/BD-40A_BD-40A_BD-40A-300x300_36e975cb.webp',
    'Power Blocks and Terminals': '/assets/images/products/erico/SB-power-terminals_SB-power-terminals_SB-power-terminals-300x300_81ee0a3c.webp',
    'Busbar Supports': '/assets/images/products/erico/Busbar_Supports_solutions-for-electrical-power-category-img-300x300_8f79b7f0.webp',
    'Connecting Clamps': '/assets/images/products/erico/FC_erico_flexibar_clamp_FC_erico_flexibar_clamp_FC_erico_flexibar_clamp-350x360_8175290c.webp',
    'Power Terminals': '/assets/images/products/erico/SB-power-terminals_SB-power-terminals_SB-power-terminals-300x300_81ee0a3c.webp',
    'Insulators': '/assets/images/products/erico/ISO-TP_low_voltage_metric_insulators_ISO-TP_low_vo_ISO-TP-insulators-300x300_f859f294.jpg',
    'Load Break Switches': 'products/katko/load-break-switches/LoadSafe Product Image.png',
    'Switch Fuses': 'products/katko/switch-fuses/FuseSafe Product Image.png',
    'Enclosed Isolators': 'products/katko/enclosed-isolators/IsoSafe Product Image.png',
    'UL/CSA Listed': 'products/katko/ul-csa-listed/UL Listed Product Image.png',
    'Connectors': 'products/katko/connectors/ConnectSafe Product Image.png',
    'Installation Enclosures': 'products/katko/installation-enclosures/KATKO Product Range.png',
    'Accessories': 'products/katko/accessories/KATKO Accessories.png',
    'Plug and Power': 'products/plug-power/plug-power-reloaded.jpg',
    'Special Enclosures': 'products/special-enclosures/custom-made.jpg',
    'Super Frame': 'products/super-frame/19-inch-super-frame.jpg',
  }
  return imageMap[category] || '/images/westlogo.jpg'
}

interface Props {
  selectedBrand: string
}

export default function BrandCategoriesPageNew({ selectedBrand }: Props) {
  // Find the selected brand data
  const brandData = brands.find(brand => brand.name === selectedBrand)

  if (!brandData) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Brand not found</h1>
          <Link href="/" className="text-red-600 hover:text-red-700">
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  // Get product count for each category with enhanced Mitsubishi, TMEIC, Noark, and Klemsan support
  const getCategoryProductCount = (category: string) => {
    if (selectedBrand === 'Mitsubishi') {
      // Use the combined detailed products for accurate counts
      return allMitsubishiDetailedProducts.filter(product => product.category === category).length
    }
    if (selectedBrand === 'TMEIC') {
      return tmeicProducts.filter(product => product.category === category).length
    }
    if (selectedBrand === 'Katko') {
      return katkoProducts.filter(product => product.category === category).length
    }
    if (selectedBrand === 'Noark') {
      // Use scraped Noark products (4307 products)
      return noarkProducts.filter(product => product.category === category).length
    }
    if (selectedBrand === 'LS Industrial') {
      return lsIndustrialScraped.filter(product => product.category === category).length
    }
    if (selectedBrand === 'Klemsan') {
      // Use scraped Klemsan products (265 products)
      return klemsanProducts.filter(product => product.category === category).length
    }
    if (selectedBrand === 'Elsteel') {
      // Use scraped Elsteel products (18 products)
      return elsteelProducts.filter(product => product.category === category).length
    }
    return cleanProductsWithMitsubishi.filter(product =>
      product.brand === selectedBrand && product.category === category
    ).length
  }

  // Convert brand name to URL slug
  const getBrandSlug = (brandName: string) => {
    return brandName.toLowerCase().replace(/\s+/g, '-')
  }

  // Convert category name to URL slug that matches generateStaticParams
  const getCategorySlug = (categoryName: string) => {
    return categoryName
      .toLowerCase()
      .replace(/\s*&\s*/g, '-') // Replace " & " with "-"
      .replace(/\s+/g, '-') // Replace spaces with dashes
      .replace(/[()]/g, '') // Remove parentheses
  }

  // Function to check if a category has subcategories
  const hasSubcategories = (brandName: string, categoryName: string) => {
    // Categories that have scraped families and should show subcategories
    const categoriesWithSubcategories = {
      'Mitsubishi': [
        'Variable Frequency Drives',
        'Programmable Logic Controllers',
        'Servo Motors',
        'Cables & Accessories',
        'Batteries & Power'
      ],
      'Noark': [
        'Circuit Breakers',
        'Contactors',
        'Overload Relays',
        'Manual Motor Starters',
        'Push Buttons',
        'LED Indicators',
        'Power Distribution',
        'Other Products'
      ],
      'LS Industrial': [
        'Variable Frequency Drives',
        'Contactors',
        'Magnetic Contactor'
      ],
      'Schneider Electric': [
        'Manual Motor Starters',
        'Servo Motors',
        'Overload Relays'
      ],
      'ABB': [
        'Power Distribution'
      ],
      'General Electric': [
        'Circuit Breakers',
        'Contactors',
        'Programmable Logic Controllers',
        'Power Distribution',
        'Overload Relays'
      ]
    }

    const brandCategories = categoriesWithSubcategories[brandName]
    return brandCategories ? brandCategories.includes(categoryName) : false
  }

  // Function to get subcategories for a category
  const getSubcategories = (brandName: string, categoryName: string) => {
    // Define subcategories based on scraped families and product patterns
    const subcategoryMappings: Record<string, Record<string, Array<{ name: string, slug: string }>>> = {
      'Mitsubishi': {
        'Variable Frequency Drives': [
          { name: 'A800 Series', slug: 'a800-series' },
          { name: 'F800 Series', slug: 'f800-series' },
          { name: 'E800 Series', slug: 'e800-series' },
          { name: 'D700 Series', slug: 'd700-series' },
          { name: 'E700 Series', slug: 'e700-series' }
        ],
        'Programmable Logic Controllers': [
          { name: 'MELSEC-Q Series', slug: 'melsec-q-series' },
          { name: 'MELSEC-FX Series', slug: 'melsec-fx-series' },
          { name: 'MELSEC-iQ-R Series', slug: 'melsec-iq-r-series' }
        ],
        'Servo Motors': [
          { name: 'MELSERVO-J5 Series', slug: 'melservo-j5-series' },
          { name: 'MELSERVO-J4 Series', slug: 'melservo-j4-series' },
          { name: 'MELSERVO-JN Series', slug: 'melservo-jn-series' }
        ],
        'Batteries & Power': [
          { name: 'MR-J3BAT Battery Units', slug: 'mr-j3bat-series' },
          { name: 'Power Supply Units', slug: 'power-supply-units' }
        ]
      },
      'Noark': {
        'Circuit Breakers': [
          { name: 'Molded Case Circuit Breakers', slug: 'mccbs' },
          { name: 'Miniature Circuit Breakers', slug: 'mcbs' },
          { name: 'Motor Circuit Protectors', slug: 'mcps' }
        ],
        'Contactors': [
          { name: 'Industrial Contactors', slug: 'industrial-contactors' }
        ],
        'Overload Relays': [
          { name: 'Thermal Overloads', slug: 'thermal-overloads' }
        ],
        'Manual Motor Starters': [
          { name: 'Motor Starters', slug: 'motor-starters' }
        ],
        'Push Buttons': [
          { name: 'Pushbuttons', slug: 'pushbuttons' }
        ],
        'LED Indicators': [
          { name: 'Pilot Lights', slug: 'pilot-lights' }
        ],
        'Power Distribution': [
          { name: 'Power Distribution', slug: 'power-distribution' }
        ],
        'Other Products': [
          { name: 'Accessories', slug: 'accessories' }
        ]
      },
      'LS Industrial': {
        'Variable Frequency Drives': [
          { name: 'Starvert iE5 Series', slug: 'starvert-ie5-series' },
          { name: 'Starvert iC5 Series', slug: 'starvert-ic5-series' },
          { name: 'Starvert iG5A Series', slug: 'starvert-ig5a-series' }
        ],
        'Contactors': [
          { name: 'METASOL Series', slug: 'metasol-series' },
          { name: 'MC Series', slug: 'mc-series' }
        ]
      },
      'Schneider Electric': {
        'Manual Motor Starters': [
          { name: 'GV2 Series', slug: 'gv2-series' },
          { name: 'GV3 Series', slug: 'gv3-series' }
        ],
        'Servo Motors': [
          { name: 'Lexium Series', slug: 'lexium-series' },
          { name: 'BMH Series', slug: 'bmh-series' }
        ]
      },
      'ABB': {
        'Power Distribution': [
          { name: 'System Pro M Compact', slug: 'system-pro-m-compact' },
          { name: 'Distribution Boards', slug: 'distribution-boards' }
        ]
      }
    }

    const brandSubcategories = subcategoryMappings[brandName]
    return brandSubcategories ? (brandSubcategories[categoryName] || []) : []
  }

  const getTotalProducts = () => {
    if (selectedBrand === 'Mitsubishi') return mitsubishiProducts.length
    if (selectedBrand === 'TMEIC') return tmeicProducts.length
    if (selectedBrand === 'Katko') return katkoProducts.length
    if (selectedBrand === 'LS Industrial') return lsIndustrialScraped.length
    if (selectedBrand === 'Noark') return noarkProducts.length
    if (selectedBrand === 'Klemsan') return klemsanProducts.length
    if (selectedBrand === 'Elsteel') return elsteelProducts.length
    return cleanProductsWithMitsubishi.filter(p => p.brand === selectedBrand).length
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="border-b border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="flex items-center space-x-2 text-sm mb-4">
            <Link href="/" className="text-gray-500 hover:text-gray-700 flex items-center">
              <HomeIcon className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRightIcon className="w-4 h-4 text-gray-400" />
            <Link href="/products" className="text-gray-500 hover:text-gray-700">
              Products
            </Link>
            <ChevronRightIcon className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{selectedBrand}</span>
          </nav>

          <div className="flex items-center gap-4 mb-3">
            <div className="bg-white rounded-lg px-3 py-2 border border-gray-200">
              <Image
                src={brandData.logo}
                alt={`${brandData.name} logo`}
                width={100}
                height={36}
                className="max-h-12 w-auto object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {selectedBrand} Products
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {brandData.categories.length} categories &middot; {getTotalProducts().toLocaleString()} products
              </p>
            </div>
          </div>

          <p className="text-gray-600 max-w-3xl">
            {brandData.description}
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandData.categories.map((category) => {
              const productCount = getCategoryProductCount(category)
              const IconComponent = getCategoryIcon(category)
              const colorClass = getCategoryColor(category)
              const categoryImage = getCategoryImage(category, selectedBrand)
              const brandSlug = getBrandSlug(selectedBrand)

              return (
                <Link
                  key={category}
                  href={productCount === 0
                    ? '/contact'
                    : `/${brandSlug}/${getCategorySlug(category)}`}
                  className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 block"
                >
                  <div className="relative w-full h-52 bg-gray-50">
                    <Image
                      src={categoryImage.startsWith('http') ? categoryImage : getImageUrl(categoryImage)}
                      alt={`${category} example`}
                      fill
                      className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      unoptimized={categoryImage.startsWith('http')}
                    />
                    <div className="absolute top-3 right-3">
                      <div className={`${colorClass} p-2 rounded-lg`}>
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors mb-2 line-clamp-2">
                      {category}
                    </h3>

                    <p className="text-sm text-gray-500 mb-4">
                      {productCount === 0
                        ? 'Contact us for availability'
                        : `${productCount} ${selectedBrand === 'Klemsan' ? 'models' : 'products'} available`}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-sm font-medium text-red-600 group-hover:text-red-700 flex items-center">
                        {productCount === 0 ? 'Inquire' : 'View Products'}
                        <ArrowRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}

            {/* Inquiry Card */}
            <Link
              href="/contact"
              className="group bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors block"
            >
              <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                <div className="mb-4 p-3 bg-white/10 rounded-lg">
                  <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">
                  Need Help Selecting Products?
                </h3>

                <p className="text-gray-400 text-sm mb-6">
                  Our team can help you find the right {selectedBrand} products for your application.
                </p>

                <span className="text-sm font-medium text-white flex items-center">
                  Contact Us
                  <ArrowRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Authorized {selectedBrand} Distributor
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Westshore Controls provides the complete {selectedBrand} product line with expert technical support and competitive pricing.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Request a Quote
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center px-5 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Browse All Brands
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 