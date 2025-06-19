import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import ProductsPageNew from '@/components/page/ProductsPageNew'

// Define the valid brands
const validBrands = [
  'noark',
  'klemsan'
]

// Map URL slugs to display names
const brandDisplayNames: { [key: string]: string } = {
  'noark': 'Noark',
  'klemsan': 'Klemsan'
}

interface Props {
  params: {
    brand: string
    category: string
    subcategory: string
  }
}

export default function BrandCategorySubcategoryPage({ params }: Props) {
  const brandSlug = params.brand.toLowerCase()
  const categorySlug = params.category.toLowerCase()
  const subcategorySlug = params.subcategory.toLowerCase()
  
  // Check if the brand is valid
  if (!validBrands.includes(brandSlug)) {
    notFound()
  }

  // Handle Noark routing
  if (brandSlug === 'noark' && !['circuit-protection', 'industrial-controls', 'special-applications', 'switchboards', 'power-transmission-distribution'].includes(categorySlug)) {
    notFound()
  }
  
  // Handle Klemsan routing - support terminal-blocks, electrical-accessories, and automation categories
  if (brandSlug === 'klemsan' && !['terminal-blocks', 'electrical-accessories', 'automation'].includes(categorySlug)) {
    notFound()
  }

  const brandName = brandDisplayNames[brandSlug]
  
  // Map subcategory slugs to proper display names
  const subcategoryDisplayNames: { [key: string]: string } = {
    // Circuit Protection subcategories
    'power-circuit-breakers': 'Power Circuit Breakers',
    'molded-case-circuit-breakers': 'Molded Case Circuit Breakers',
    'molded-case-switches': 'Molded Case Switches',
    'motor-circuit-protectors': 'Motor Circuit Protectors',
    'miniature-circuit-breakers': 'Miniature Circuit Breakers',
    'din-rail-circuit-protection': 'DIN Rail Circuit Protection',
    'surge-protective-devices': 'Surge Protective Devices',
    'enclosed-breakers': 'Enclosed Breakers',
    // MCCB Series subcategories
    'm1n-series-15a-150a': 'M1N Series (15A-150A)',
    'm2n-series-125a-250a': 'M2N Series (125A-250A)',
    'm3n-series-250a-400a': 'M3N Series (250A-400A)',
    'm4n-series-400a-630a': 'M4N Series (400A-630A)',
    'm5n-series-600a-800a': 'M5N Series (600A-800A)',
    'm6n-series-800a-1200a': 'M6N Series (800A-1200A)',
    // Industrial Controls subcategories (both data-defined and component-generated)
    'contactors': 'Contactors',
    'motor-starters': 'Motor Starters', 
    'overload-relays': 'Overload Relays',
    'motor-contactors-and-overload-relays': 'Motor Contactors and Overload Relays',
    'safety-contactors-and-relays': 'Safety Contactors and Relays',
    'manual-motor-starters': 'Manual Motor Starters',
    'solid-state-soft-starters': 'Solid State Soft Starters',
    'pilot-devices': 'Pilot Devices',
    // Special Applications subcategories
    'custom-solutions': 'Custom Solutions',
    'marine': 'Marine Applications',
    'marine-applications': 'Marine Applications',
    'hazardous-location': 'Hazardous Location',
    // Switchboards subcategories
    'lv-switchboards': 'LV Switchboards',
    'motor-control-centers': 'Motor Control Centers',
    'distribution-panels': 'Distribution Panels',
    // Power T&D subcategories
    'power-transformers': 'Power Transformers',
    'distribution-equipment': 'Distribution Equipment',
    'protection-systems': 'Protection Systems',
    // Klemsan Terminal Blocks subcategories
    'screw-terminals': 'Screw Terminals',
    'quick-release': 'Quick Release',
    'spring-terminals': 'Spring Terminals',
    'plug-terminals': 'Plug Terminals',
    'other-terminals': 'Other Terminals',
    'end-stops': 'End Stops',
    // Klemsan Electrical Accessories subcategories
    'power-sources': 'Power Sources',
    'intermediate-relays': 'Intermediate Relays',
    'climate': 'Climate',
    'cam-switches': 'Cam Switches',
    'control-buttons': 'Control Buttons',
    'junction-boxes': 'Junction Boxes',
    'thermal-printers': 'Thermal Printers',
    'cable-channels': 'Cable Channels',
    'tools-and-accessories': 'Tools and Accessories',
    // Klemsan Automation subcategories
    'automation': 'Automation'
  }
  
  // Get proper subcategory name from mapping
  const subcategoryName = subcategoryDisplayNames[subcategorySlug]
  
  if (!subcategoryName) {
    notFound()
  }

  return (
    <Suspense fallback={<div className="min-h-screen pt-20 flex items-center justify-center">Loading...</div>}>
      <ProductsPageNew selectedBrand={brandName} selectedCategory={subcategoryName} />
    </Suspense>
  )
}

// Generate static params for Noark and Klemsan subcategories
export async function generateStaticParams() {
  const params = [
    // Circuit Protection subcategories
    { brand: 'noark', category: 'circuit-protection', subcategory: 'power-circuit-breakers' },
    { brand: 'noark', category: 'circuit-protection', subcategory: 'molded-case-circuit-breakers' },
    { brand: 'noark', category: 'circuit-protection', subcategory: 'molded-case-switches' },
    { brand: 'noark', category: 'circuit-protection', subcategory: 'motor-circuit-protectors' },
    { brand: 'noark', category: 'circuit-protection', subcategory: 'miniature-circuit-breakers' },
    { brand: 'noark', category: 'circuit-protection', subcategory: 'din-rail-circuit-protection' },
    { brand: 'noark', category: 'circuit-protection', subcategory: 'surge-protective-devices' },
    { brand: 'noark', category: 'circuit-protection', subcategory: 'enclosed-breakers' },
    // MCCB Series subcategories
    { brand: 'noark', category: 'circuit-protection', subcategory: 'm1n-series-15a-150a' },
    { brand: 'noark', category: 'circuit-protection', subcategory: 'm2n-series-125a-250a' },
    { brand: 'noark', category: 'circuit-protection', subcategory: 'm3n-series-250a-400a' },
    { brand: 'noark', category: 'circuit-protection', subcategory: 'm4n-series-400a-630a' },
    { brand: 'noark', category: 'circuit-protection', subcategory: 'm5n-series-600a-800a' },
    { brand: 'noark', category: 'circuit-protection', subcategory: 'm6n-series-800a-1200a' },
    // Industrial Controls subcategories (matching actual component-generated URLs)
    { brand: 'noark', category: 'industrial-controls', subcategory: 'contactors' },
    { brand: 'noark', category: 'industrial-controls', subcategory: 'motor-starters' },
    { brand: 'noark', category: 'industrial-controls', subcategory: 'overload-relays' },
    { brand: 'noark', category: 'industrial-controls', subcategory: 'motor-contactors-and-overload-relays' },
    { brand: 'noark', category: 'industrial-controls', subcategory: 'safety-contactors-and-relays' },
    { brand: 'noark', category: 'industrial-controls', subcategory: 'manual-motor-starters' },
    { brand: 'noark', category: 'industrial-controls', subcategory: 'solid-state-soft-starters' },
    { brand: 'noark', category: 'industrial-controls', subcategory: 'pilot-devices' },
    // Special Applications subcategories (including both URL formats to be safe)
    { brand: 'noark', category: 'special-applications', subcategory: 'custom-solutions' },
    { brand: 'noark', category: 'special-applications', subcategory: 'marine' },
    { brand: 'noark', category: 'special-applications', subcategory: 'marine-applications' },
    { brand: 'noark', category: 'special-applications', subcategory: 'hazardous-location' },
    // Switchboards subcategories
    { brand: 'noark', category: 'switchboards', subcategory: 'lv-switchboards' },
    { brand: 'noark', category: 'switchboards', subcategory: 'motor-control-centers' },
    { brand: 'noark', category: 'switchboards', subcategory: 'distribution-panels' },
    // Power T&D subcategories (fixed to match actual subcategories in noarkPowerTDCategory)
    { brand: 'noark', category: 'power-transmission-distribution', subcategory: 'power-transformers' },
    { brand: 'noark', category: 'power-transmission-distribution', subcategory: 'distribution-equipment' },
    { brand: 'noark', category: 'power-transmission-distribution', subcategory: 'protection-systems' },
    // Klemsan Terminal Blocks subcategories
    { brand: 'klemsan', category: 'terminal-blocks', subcategory: 'screw-terminals' },
    { brand: 'klemsan', category: 'terminal-blocks', subcategory: 'quick-release' },
    { brand: 'klemsan', category: 'terminal-blocks', subcategory: 'spring-terminals' },
    { brand: 'klemsan', category: 'terminal-blocks', subcategory: 'plug-terminals' },
    { brand: 'klemsan', category: 'terminal-blocks', subcategory: 'other-terminals' },
    { brand: 'klemsan', category: 'terminal-blocks', subcategory: 'end-stops' },
    // Klemsan Electrical Accessories subcategories
    { brand: 'klemsan', category: 'electrical-accessories', subcategory: 'power-sources' },
    { brand: 'klemsan', category: 'electrical-accessories', subcategory: 'intermediate-relays' },
    { brand: 'klemsan', category: 'electrical-accessories', subcategory: 'climate' },
    { brand: 'klemsan', category: 'electrical-accessories', subcategory: 'cam-switches' },
    { brand: 'klemsan', category: 'electrical-accessories', subcategory: 'control-buttons' },
    { brand: 'klemsan', category: 'electrical-accessories', subcategory: 'junction-boxes' },
    { brand: 'klemsan', category: 'electrical-accessories', subcategory: 'thermal-printers' },
    { brand: 'klemsan', category: 'electrical-accessories', subcategory: 'cable-channels' },
    { brand: 'klemsan', category: 'electrical-accessories', subcategory: 'tools-and-accessories' },
    // Klemsan Automation subcategories
    { brand: 'klemsan', category: 'automation', subcategory: 'automation' }
  ]
  
  return params
} 