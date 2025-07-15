import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import ProductsPageNew from '@/components/page/ProductsPageNew'

// Performance optimization - enable static generation
export const revalidate = 3600 // 1 hour
export const dynamic = 'force-static'

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

// Map URL slugs to display names
const brandDisplayNames: { [key: string]: string } = {
  'mitsubishi': 'Mitsubishi',
  'noark': 'Noark',
  'ls-industrial': 'LS Industrial', 
  'tmeic': 'TMEIC',
  'erico': 'ERICO',
  'katko': 'Katko',
  'klemsan': 'Klemsan',
  'elsteel': 'Elsteel',
  'westshore-controls': 'Westshore Controls'
}

// Loading skeleton component
const ProductPageSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-900/5">
    {/* Hero Section Skeleton */}
    <div className="pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-6 bg-gray-200 rounded animate-pulse mb-4 w-64"></div>
        <div className="h-12 bg-gray-200 rounded animate-pulse mb-4 w-96"></div>
        <div className="h-6 bg-gray-200 rounded animate-pulse w-80"></div>
      </div>
    </div>
    
    {/* Filters Skeleton */}
    <div className="bg-white/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex gap-4">
          <div className="h-10 bg-gray-200 rounded animate-pulse flex-1 max-w-md"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse w-32"></div>
        </div>
      </div>
    </div>
    
    {/* Products Grid Skeleton */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-48 bg-gray-200 animate-pulse"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

interface Props {
  params: {
    brand: string
    category: string
  }
}

export default function BrandCategoryPage({ params }: Props) {
  const brandSlug = params.brand.toLowerCase()
  const categorySlug = params.category.toLowerCase()
  
  // Check if the brand is valid
  if (!validBrands.includes(brandSlug)) {
    notFound()
  }

  const brandName = brandDisplayNames[brandSlug]
  
  // Map category slugs to proper display names
  const categoryDisplayNames: { [key: string]: string } = {
    'variable-frequency-drives': 'Variable Frequency Drives',
    'dc-drives': 'DC Drives',
    'pv-inverters': 'PV Inverters',
    'energy-storage': 'Energy Storage',
    'motors': 'Motors',
    'controllers': 'Controllers',
    'software': 'Software',
    'contactors': 'Contactors',
    'din-rail-miniature-circuit-breakers': 'DIN Rail Miniature Circuit Breakers',
    'pilot-devices': 'Pilot Devices',
    'overload-relays': 'Overload Relays',
    'circuit-breakers': 'Circuit Breakers',
    'motor-starters': 'Motor Starters',
    'circuit-protection': 'Circuit Protection',
    'motor-circuit-protectors': 'Motor Circuit Protectors',
    'miniature-circuit-breakers': 'Miniature Circuit Breakers',
    'industrial-controls': 'Industrial Controls',
    'power-circuit-breakers': 'Power Circuit Breakers', 
    'molded-case-circuit-breakers-mccbs': 'Molded Case Circuit Breakers (MCCBs)',
    'motor-circuit-protectors-mcps': 'Motor-Circuit Protectors (MCPs)',
    'enclosed-breakers': 'Enclosed Breakers',
    'din-rail-fuse-holders-and-fuses': 'DIN Rail Fuse Holders and Fuses',
    'surge-protective-device': 'Surge Protective Device',
    'industrial-control-systems': 'Industrial Control Systems',
    'lv-switchboards': 'LV Switchboards',
    'power-t-d': 'Power T & D',
    'special-applications': 'Special Applications',
    'switchboards': 'Switchboards',
    'power-transmission-distribution': 'Power Transmission & Distribution',
    'flexible-conductors': 'Flexible Conductors',
    'busbars': 'Busbars',
    'cable-management': 'Cable Management',
    'manual-motor-controllers': 'Manual Motor Controllers',
    'enclosed-isolators': 'Enclosed Isolators',
    'load-break-switches': 'Load Break Switches',
    'switch-fuses': 'Switch Fuses',
    'ul-csa-listed': 'UL/CSA Listed',
    'connectors': 'Connectors',
    'installation-enclosures': 'Installation Enclosures',
    'accessories': 'Accessories',
    'terminal-blocks': 'Terminal Blocks',
    'marking-solutions': 'Marking Solutions',
    'electronic-terminals': 'Electronic Terminals',
    'terminal-marking': 'Terminal Marking',
    'enclosures': 'Enclosures',
    'distribution-blocks': 'Distribution Blocks',
    'power-blocks-and-terminals': 'Power Blocks and Terminals',
    'modular-enclosures': 'Modular Enclosures',
    'plug-and-power': 'Plug and Power',
    'special-enclosures': 'Special Enclosures',
    'super-frame': 'Super Frame',
    'human-machine-interface': 'Human Machine Interface',
    'scada-systems': 'SCADA Systems',
    'robotics': 'Robotics',
    'field-devices': 'Field Devices',
    'energy-management': 'Energy Management',
    'low-power-motors': 'Low Power Motors',
    'screw-terminals': 'Screw Terminals',
    'quick-release': 'Quick Release',
    'spring-terminals': 'Spring Terminals',
    'plug-terminals': 'Plug Terminals',
    'other-terminals': 'Other Terminals',
    'end-stops': 'End Stops',
    'power-sources': 'Power Sources',
    'intermediate-relays': 'Intermediate Relays',
    'automation': 'Automation',
    'climate': 'Climate',
    'cam-switches': 'Cam Switches',
    'control-buttons': 'Control Buttons',
    'junction-boxes': 'Junction Boxes',
    'thermal-printers': 'Thermal Printers',
    'cable-channels': 'Cable Channels',
    'tools-and-accessories': 'Tools and Accessories',
    'programmable-logic-controllers': 'Programmable Logic Controllers',
    'softstarters': 'Softstarters',
    'i-o-modules': 'I/O Modules',
    'molded-case-switches': 'Molded Case Switches',
  }
  
  // Get proper category name from mapping, fallback to title case conversion
  const categoryName = categoryDisplayNames[categorySlug] || categorySlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  // Use ProductsPageNew for all brands to ensure consistent styling
  return (
    <Suspense fallback={<ProductPageSkeleton />}>
      <ProductsPageNew selectedBrand={brandName} selectedCategory={categoryName} />
    </Suspense>
  )
}

// Generate static params for all valid brand-category combinations
export async function generateStaticParams() {
  // Define categories for each brand
  const brandCategories: { [key: string]: string[] } = {
    'mitsubishi': [
      'controllers', 
      'variable-frequency-drives', 
      'human-machine-interface', 
      'scada-systems',
      'robotics',
      'circuit-breakers', 
      'contactors', 
      'overload-relays',
      'field-devices',
      'energy-management',
      'low-power-motors'
    ],
    'noark': [
      'circuit-protection',
      'motor-circuit-protectors',
      'miniature-circuit-breakers',
      'molded-case-switches',
      'industrial-controls',
      'power-circuit-breakers',
      'molded-case-circuit-breakers-mccbs',
      'motor-circuit-protectors-mcps',
      'enclosed-breakers',
      'din-rail-fuse-holders-and-fuses',
      'surge-protective-device',
      'industrial-control-systems',
      'lv-switchboards',
      'power-t-d',
      'special-applications',
      'switchboards',
      'power-transmission-distribution'
    ],
    'ls-industrial': ['variable-frequency-drives', 'programmable-logic-controllers', 'contactors', 'circuit-breakers', 'overload-relays', 'softstarters', 'i-o-modules', 'human-machine-interface'],
    'erico': ['flexible-conductors', 'busbars', 'cable-management'],
    'katko': ['enclosed-isolators', 'load-break-switches', 'switch-fuses', 'ul-csa-listed', 'connectors', 'installation-enclosures', 'accessories'],
    'klemsan': ['screw-terminals', 'quick-release', 'spring-terminals', 'plug-terminals', 'other-terminals', 'end-stops', 'power-sources', 'intermediate-relays', 'automation', 'climate', 'cam-switches', 'control-buttons', 'junction-boxes', 'thermal-printers', 'cable-channels', 'tools-and-accessories'],
    'tmeic': ['variable-frequency-drives', 'dc-drives', 'pv-inverters', 'energy-storage', 'motors', 'controllers', 'software'],
    'elsteel': ['modular-enclosures', 'plug-and-power', 'enclosures', 'special-enclosures', 'super-frame'],
    'westshore-controls': []
  }

  const params = []
  for (const [brand, categories] of Object.entries(brandCategories)) {
    for (const category of categories) {
      params.push({
        brand: brand,
        category: category,
      })
    }
  }
  
  return params
} 