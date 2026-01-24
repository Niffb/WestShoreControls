import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import ProductsPageNew from '@/components/page/ProductsPageNew'

// Define the valid brands
const validBrands = [
  'noark',
  'klemsan',
  'mitsubishi',
  'ls-industrial',
  'schneider-electric',
  'abb',
  'general-electric'
]

// Map URL slugs to display names
const brandDisplayNames: { [key: string]: string } = {
  'noark': 'Noark',
  'klemsan': 'Klemsan',
  'mitsubishi': 'Mitsubishi',
  'ls-industrial': 'LS Industrial',
  'schneider-electric': 'Schneider Electric',
  'abb': 'ABB',
  'general-electric': 'General Electric'
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
  if (brandSlug === 'noark' && !['circuit-protection', 'industrial-controls', 'special-applications', 'switchboards', 'power-transmission-distribution', 'miniature-circuit-breakers', 'contactors', 'overload-relays', 'push-buttons', 'led-indicators'].includes(categorySlug)) {
    notFound()
  }
  
  // Handle Klemsan routing - support terminal-blocks, electrical-accessories, and automation categories
  if (brandSlug === 'klemsan' && !['terminal-blocks', 'electrical-accessories', 'automation'].includes(categorySlug)) {
    notFound()
  }

  // Handle Mitsubishi routing - support all categories with subcategories
  if (brandSlug === 'mitsubishi' && !['variable-frequency-drives', 'controllers', 'human-machine-interface', 'circuit-breakers', 'servo-motors', 'batteries-power'].includes(categorySlug)) {
    notFound()
  }
  
  // Handle LS Industrial routing - support all categories with subcategories
  if (brandSlug === 'ls-industrial' && !['variable-frequency-drives', 'programmable-logic-controllers', 'human-machine-interface', 'servo-motors', 'contactors', 'overload-relays', 'circuit-breakers', 'softstarters', 'i-o-modules'].includes(categorySlug)) {
    notFound()
  }
  
  // Handle Schneider Electric routing
  if (brandSlug === 'schneider-electric' && !['manual-motor-starters', 'servo-motors', 'overload-relays'].includes(categorySlug)) {
    notFound()
  }
  
  // Handle ABB routing
  if (brandSlug === 'abb' && !['power-distribution'].includes(categorySlug)) {
    notFound()
  }
  
  // Handle General Electric routing
  if (brandSlug === 'general-electric' && !['circuit-breakers', 'contactors', 'programmable-logic-controllers', 'power-distribution', 'overload-relays'].includes(categorySlug)) {
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
    'automation': 'Automation',
    // Mitsubishi VFD subcategories
    'a800-series': 'A800 Series',
    'f800-series': 'F800 Series',
    'e800-series': 'E800 Series',
    'd700-series': 'D700 Series',
    'e700-series': 'E700 Series',
    'fr-a800': 'FR-A800',
    'fr-f800': 'FR-F800',
    'fr-e700': 'FR-E700',
    'fr-d700': 'FR-D700',
    // Mitsubishi PLC subcategories
    'melsec-q-series': 'MELSEC-Q Series',
    'melsec-fx-series': 'MELSEC-FX Series',
    'melsec-iq-r-series': 'MELSEC-iQ-R Series',
    // Mitsubishi Servo Motor subcategories
    'melservo-j5-series': 'MELSERVO-J5 Series',
    'melservo-j4-series': 'MELSERVO-J4 Series',
    'melservo-jn-series': 'MELSERVO-JN Series',
    // Mitsubishi Batteries & Power subcategories
    'mr-j3bat-series': 'MR-J3BAT Battery Units',
    'power-supply-units': 'Power Supply Units',
    // Noark MCB series subcategories
    'b1n-series': 'B1N Series',
    'b1h-series': 'B1H Series',
    'b1e-series': 'B1E Series',
    'b1d-series': 'B1D Series',
    // Noark Contactor subcategories
    'ex9c-series': 'Ex9C Series',
    'ex9ck-series': 'Ex9CK Series',
    'ex9cdr-series': 'Ex9CDR Series',
    // Noark Overload Relay subcategories
    'ex9r-series': 'Ex9R Series',
    'thermal-overload-relays': 'Thermal Overload Relays',
    // Noark Push Button subcategories
    'ex9pb-series': 'Ex9PB Series',
    '22mm-push-buttons': '22mm Push Buttons',
    // Noark LED Indicator subcategories
    'ex9il-series': 'Ex9IL Series',
    '22mm-led-indicators': '22mm LED Indicators',
    // LS Industrial VFD subcategories
    'low-voltage-vfd': 'Low Voltage VFD',
    'medium-voltage-vfd': 'Medium Voltage VFD',
    'starvert-ie5-series': 'Starvert iE5 Series',
    'starvert-ic5-series': 'Starvert iC5 Series',
    'starvert-ig5a-series': 'Starvert iG5A Series',
    // LS Industrial PLC subcategories
    'xgt-series': 'XGT Series',
    'xgb-series': 'XGB Series',
    'xec-series': 'XEC Series',
    'master-k-series': 'Master-K Series',
    // LS Industrial HMI subcategories
    'xgt-panel': 'XGT Panel',
    'exp-panel': 'eXP Panel',
    // LS Industrial Servo subcategories
    'servo-drive': 'Servo Drive',
    'servo-motor': 'Servo Motor',
    // LS Industrial Contactor subcategories
    'magnetic-contactors': 'Magnetic Contactors',
    'metasol-series': 'METASOL Series',
    'mc-series': 'MC Series',
    // LS Industrial Overload Relay subcategories (uses shared 'thermal-overload-relays' key)
    // LS Industrial Circuit Breaker subcategories
    'molded-case-circuit-breakers': 'Molded Case Circuit Breakers',
    'air-circuit-breakers': 'Air Circuit Breakers',
    'miniature-circuit-breakers': 'Miniature Circuit Breakers',
    // LS Industrial Softstarter subcategories
    'soft-starters': 'Soft Starters',
    // LS Industrial I/O Module subcategories
    'remote-i-o': 'Remote I/O',
    // Schneider Electric Manual Motor Starter subcategories
    'gv2-series': 'GV2 Series',
    'gv3-series': 'GV3 Series',
    // Schneider Electric Servo Motor subcategories
    'lexium-series': 'Lexium Series',
    'bmh-series': 'BMH Series',
    // ABB Power Distribution subcategories
    'system-pro-m-compact': 'System Pro M Compact',
    'distribution-boards': 'Distribution Boards',
    // Motor Circuit Protectors subcategories
    'motor-circuit-protectors-mcps': 'Motor Circuit Protectors (MCPs)',
    // DIN Rail Fuse Holders subcategories
    'din-rail-fuse-holders-and-fuses': 'DIN Rail Fuse Holders and Fuses',
    // Surge Protective Device subcategories
    'surge-protective-device': 'Surge Protective Device'
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
    { brand: 'klemsan', category: 'automation', subcategory: 'automation' },
    // Mitsubishi VFD subcategories
    { brand: 'mitsubishi', category: 'variable-frequency-drives', subcategory: 'a800-series' },
    { brand: 'mitsubishi', category: 'variable-frequency-drives', subcategory: 'f800-series' },
    { brand: 'mitsubishi', category: 'variable-frequency-drives', subcategory: 'e800-series' },
    { brand: 'mitsubishi', category: 'variable-frequency-drives', subcategory: 'd700-series' },
    { brand: 'mitsubishi', category: 'variable-frequency-drives', subcategory: 'e700-series' },
    { brand: 'mitsubishi', category: 'variable-frequency-drives', subcategory: 'fr-a800' },
    { brand: 'mitsubishi', category: 'variable-frequency-drives', subcategory: 'fr-f800' },
    { brand: 'mitsubishi', category: 'variable-frequency-drives', subcategory: 'fr-e700' },
    { brand: 'mitsubishi', category: 'variable-frequency-drives', subcategory: 'fr-d700' },
    // Mitsubishi PLC subcategories
    { brand: 'mitsubishi', category: 'controllers', subcategory: 'melsec-q-series' },
    { brand: 'mitsubishi', category: 'controllers', subcategory: 'melsec-fx-series' },
    { brand: 'mitsubishi', category: 'controllers', subcategory: 'melsec-iq-r-series' },
    // Mitsubishi Servo Motor subcategories
    { brand: 'mitsubishi', category: 'servo-motors', subcategory: 'melservo-j5-series' },
    { brand: 'mitsubishi', category: 'servo-motors', subcategory: 'melservo-j4-series' },
    { brand: 'mitsubishi', category: 'servo-motors', subcategory: 'melservo-jn-series' },
    // Mitsubishi Batteries & Power subcategories
    { brand: 'mitsubishi', category: 'batteries-power', subcategory: 'mr-j3bat-series' },
    { brand: 'mitsubishi', category: 'batteries-power', subcategory: 'power-supply-units' },
    // Noark MCB series subcategories
    { brand: 'noark', category: 'miniature-circuit-breakers', subcategory: 'b1n-series' },
    { brand: 'noark', category: 'miniature-circuit-breakers', subcategory: 'b1h-series' },
    { brand: 'noark', category: 'miniature-circuit-breakers', subcategory: 'b1e-series' },
    { brand: 'noark', category: 'miniature-circuit-breakers', subcategory: 'b1d-series' },
    // Noark Contactor subcategories
    { brand: 'noark', category: 'contactors', subcategory: 'ex9c-series' },
    { brand: 'noark', category: 'contactors', subcategory: 'ex9ck-series' },
    { brand: 'noark', category: 'contactors', subcategory: 'ex9cdr-series' },
    // Noark Overload Relay subcategories
    { brand: 'noark', category: 'overload-relays', subcategory: 'ex9r-series' },
    { brand: 'noark', category: 'overload-relays', subcategory: 'thermal-overload-relays' },
    // Noark Push Button subcategories
    { brand: 'noark', category: 'push-buttons', subcategory: 'ex9pb-series' },
    { brand: 'noark', category: 'push-buttons', subcategory: '22mm-push-buttons' },
    // Noark LED Indicator subcategories
    { brand: 'noark', category: 'led-indicators', subcategory: 'ex9il-series' },
    { brand: 'noark', category: 'led-indicators', subcategory: '22mm-led-indicators' },
    // LS Industrial VFD subcategories
    { brand: 'ls-industrial', category: 'variable-frequency-drives', subcategory: 'low-voltage-vfd' },
    { brand: 'ls-industrial', category: 'variable-frequency-drives', subcategory: 'medium-voltage-vfd' },
    { brand: 'ls-industrial', category: 'variable-frequency-drives', subcategory: 'starvert-ie5-series' },
    { brand: 'ls-industrial', category: 'variable-frequency-drives', subcategory: 'starvert-ic5-series' },
    { brand: 'ls-industrial', category: 'variable-frequency-drives', subcategory: 'starvert-ig5a-series' },
    // LS Industrial PLC subcategories
    { brand: 'ls-industrial', category: 'programmable-logic-controllers', subcategory: 'xgt-series' },
    { brand: 'ls-industrial', category: 'programmable-logic-controllers', subcategory: 'xgb-series' },
    { brand: 'ls-industrial', category: 'programmable-logic-controllers', subcategory: 'xec-series' },
    { brand: 'ls-industrial', category: 'programmable-logic-controllers', subcategory: 'master-k-series' },
    // LS Industrial HMI subcategories
    { brand: 'ls-industrial', category: 'human-machine-interface', subcategory: 'xgt-panel' },
    { brand: 'ls-industrial', category: 'human-machine-interface', subcategory: 'exp-panel' },
    // LS Industrial Servo subcategories
    { brand: 'ls-industrial', category: 'servo-motors', subcategory: 'servo-drive' },
    { brand: 'ls-industrial', category: 'servo-motors', subcategory: 'servo-motor' },
    // LS Industrial Contactor subcategories
    { brand: 'ls-industrial', category: 'contactors', subcategory: 'magnetic-contactors' },
    { brand: 'ls-industrial', category: 'contactors', subcategory: 'metasol-series' },
    { brand: 'ls-industrial', category: 'contactors', subcategory: 'mc-series' },
    // LS Industrial Overload Relay subcategories
    { brand: 'ls-industrial', category: 'overload-relays', subcategory: 'thermal-overload-relays' },
    // LS Industrial Circuit Breaker subcategories
    { brand: 'ls-industrial', category: 'circuit-breakers', subcategory: 'molded-case-circuit-breakers' },
    { brand: 'ls-industrial', category: 'circuit-breakers', subcategory: 'air-circuit-breakers' },
    { brand: 'ls-industrial', category: 'circuit-breakers', subcategory: 'miniature-circuit-breakers' },
    // LS Industrial Softstarter subcategories
    { brand: 'ls-industrial', category: 'softstarters', subcategory: 'soft-starters' },
    // LS Industrial I/O Module subcategories
    { brand: 'ls-industrial', category: 'i-o-modules', subcategory: 'remote-i-o' },
    // Schneider Electric Manual Motor Starter subcategories
    { brand: 'schneider-electric', category: 'manual-motor-starters', subcategory: 'gv2-series' },
    { brand: 'schneider-electric', category: 'manual-motor-starters', subcategory: 'gv3-series' },
    // Schneider Electric Servo Motor subcategories
    { brand: 'schneider-electric', category: 'servo-motors', subcategory: 'lexium-series' },
    { brand: 'schneider-electric', category: 'servo-motors', subcategory: 'bmh-series' },
    // ABB Power Distribution subcategories
    { brand: 'abb', category: 'power-distribution', subcategory: 'system-pro-m-compact' },
    { brand: 'abb', category: 'power-distribution', subcategory: 'distribution-boards' }
  ]
  
  return params
} 