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
import { getImageUrl } from '@/lib/config/image-config'
import { 
  noarkCategoryImages, 
  klemsanCategoryImages, 
  elsteelCategoryImages,
  mitsubishiCategoryImages,
  tmeicCategoryImages,
  katkoCategoryImages,
  lsIndustrialCategoryImages
} from '@/lib/products/category-images'

interface BrandCategoriesPageNewProps {
  selectedBrand: string
  categoryCounts?: Record<string, number>
}

// Brand data with logos and categories
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

// Representative images logic moved to simpler lookup
const getCategoryImage = (category: string, brand?: string) => {
  const brandImages: Record<string, any> = {
    'TMEIC': tmeicCategoryImages,
    'Katko': katkoCategoryImages,
    'Mitsubishi': mitsubishiCategoryImages,
    'Klemsan': klemsanCategoryImages,
    'Elsteel': elsteelCategoryImages,
    'LS Industrial': lsIndustrialCategoryImages,
    'Noark': noarkCategoryImages
  }

  if (brand && brandImages[brand]?.[category]) {
    return brandImages[brand][category]
  }

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
    if (ericoImageMap[category]) return ericoImageMap[category]
  }

  const defaultImageMap: { [key: string]: string } = {
    'Contactors': 'products/contactors/IEC-contactors-Ex9CS-Mini-NR_IEC-contactors-Ex9CS-_IEC-contactors-Ex9CS-Mini-NR_5e300640.jpg',
    'Variable Frequency Drives': 'products/general/starvert-ie5_starvert-ie5_starvert-ie5_0e6fd403.jpg',
    'Circuit Breakers': 'products/circuit_breakers/air_circuit_breakers_air_circuit_breakers_air-circuit-breakers_36dc9a41.jpg',
    'Terminal Blocks': 'products/klemsan/OPK_EKI_112010N.webp',
    'Enclosures': 'products/enclosures/fully-welded-ip69k.jpg',
    'Plug and Power': 'products/plug-power/plug-power-reloaded.jpg'
  }
  return defaultImageMap[category] || '/images/westlogo.jpg'
}

export default function BrandCategoriesPageNew({ 
  selectedBrand,
  categoryCounts = {}
}: BrandCategoriesPageNewProps) {
  const brandData = brands.find(brand => brand.name === selectedBrand)

  if (!brandData) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Brand not found</h1>
          <Link href="/" className="text-primary-600 hover:text-primary-700">
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const totalProducts = Object.values(categoryCounts).reduce((a, b) => a + b, 0)

  const getBrandSlug = (brandName: string) => brandName.toLowerCase().replace(/\s+/g, '-')
  
  const getCategorySlug = (categoryName: string) => {
    return categoryName
      .toLowerCase()
      .replace(/\s*&\s*/g, '-')
      .replace(/\s+/g, '-')
      .replace(/[()]/g, '')
  }

  return (
    <div className="min-h-screen bg-white">
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
                {brandData.categories.length} categories &middot; {totalProducts.toLocaleString()} products
              </p>
            </div>
          </div>

          <p className="text-gray-600 max-w-3xl">
            {brandData.description}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandData.categories.map((category) => {
              const productCount = categoryCounts[category] || 0
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
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-2 line-clamp-2">
                      {category}
                    </h3>

                    <p className="text-sm text-gray-500 mb-4">
                      {productCount === 0
                        ? 'Contact us for availability'
                        : `${productCount} ${selectedBrand === 'Klemsan' ? 'models' : 'products'} available`}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-sm font-medium text-primary-600 group-hover:text-primary-700 flex items-center">
                        {productCount === 0 ? 'Inquire' : 'View Products'}
                        <ArrowRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}

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
