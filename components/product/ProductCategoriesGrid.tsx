'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  CpuChipIcon, 
  CogIcon, 
  BoltIcon, 
  WrenchScrewdriverIcon,
  ShieldCheckIcon,
  ComputerDesktopIcon,
  HandRaisedIcon,
  RectangleStackIcon,
  BuildingOffice2Icon,
  LightBulbIcon,
  CursorArrowRaysIcon
} from '@heroicons/react/24/outline'
import { BrandGrid } from '@/components/brand'

interface ProductCategory {
  id: string
  name: string
  description: string
  icon: React.ComponentType<any>
  image: string
  productCount: number
  featured: boolean
  slug: string
}

const productCategories: ProductCategory[] = [
  {
    id: 'drives-vfds',
    name: 'Drives / VFDs',
    description: 'Variable frequency drives for precise motor speed control and energy efficiency',
    icon: CpuChipIcon,
    image: '/Products/VFDs/Images/Mitsubishi_A800_af6dd002-312a-4881-93a5-db958e43ad71_medium.avif',
    productCount: 544,
    featured: true,
    slug: 'drives-vfds'
  },
  {
    id: 'servo-motors',
    name: 'Servo Motors',
    description: 'High-precision servo motors for accurate positioning and motion control',
    icon: CogIcon,
    image: '/Products/Servo-Motors/images/Mitsubishi_MELSERVO_J5_medium.avif',
    productCount: 139,
    featured: true,
    slug: 'servo-motors'
  },
  {
    id: 'circuit-breakers',
    name: 'Circuit Breakers / Protection',
    description: 'Circuit protection devices including MCBs, MCCBs, and motor protection',
    icon: BoltIcon,
    image: '/assets/images/products/noark/Molded_Case_Circuit_Breakers_MCCB-category-300x300_ce635280.webp',
    productCount: 794,
    featured: true,
    slug: 'circuit-breakers-protection'
  },
  {
    id: 'contactors',
    name: 'Contactors',
    description: 'Electromagnetic switches for motor control and power switching applications',
    icon: WrenchScrewdriverIcon,
    image: '/assets/images/products/contactors/standard-NR-IEC-contactors-Ex9C_standard-NR-IEC-co_standard-NR-IEC-contactors-Ex9C-300x300_8410f80d.webp',
    productCount: 120,
    featured: true,
    slug: 'contactors'
  },
  {
    id: 'overload-relays',
    name: 'Overload Relays',
    description: 'Motor protection relays to prevent damage from overcurrent conditions',
    icon: ShieldCheckIcon,
    image: '/assets/images/products/circuit_breakers/meta-mec_and_metasol_overload_meta-mec_and_metasol_meta-mec-overload-300x300_ae08a150.webp',
    productCount: 622,
    featured: false,
    slug: 'overload-relays'
  },
  {
    id: 'plcs',
    name: 'PLCs',
    description: 'Programmable logic controllers for industrial automation and control',
    icon: ComputerDesktopIcon,
    image: '/assets/images/products/vfd/simple_plc_functionnality_plc_5cf0a389.webp',
    productCount: 95,
    featured: true,
    slug: 'plcs'
  },
  {
    id: 'manual-motor-starters',
    name: 'Manual Motor Starters',
    description: 'Manual motor starting switches with integrated overload protection',
    icon: HandRaisedIcon,
    image: '/assets/images/products/circuit_breakers/susol_circuit_breakers_and_manual_motor_starters_s_susol-circuit-breakers_9e6518a3.webp',
    productCount: 45,
    featured: false,
    slug: 'manual-motor-starters'
  },
  {
    id: 'power-distribution',
    name: 'Power Distribution',
    description: 'Power distribution equipment including panels, busbars, and switchgear',
    icon: RectangleStackIcon,
    image: '/assets/images/products/busbars/eriflex_flexibar_busbar_eriflex-flexibar-busbar_eriflex-flexibar-busbar_a7557744.webp',
    productCount: 110,
    featured: false,
    slug: 'power-distribution'
  },
  {
    id: 'custom-control-panels',
    name: 'Custom Control Panels',
    description: 'Custom-engineered control panels designed for your specific applications',
    icon: BuildingOffice2Icon,
    image: '/assets/images/products/general/XGT-panel-HMI_XGT-panel-HMI_XGT-panel-HMI_35b20c5b.webp',
    productCount: 25,
    featured: true,
    slug: 'custom-control-panels'
  },
  {
    id: 'led-indicators',
    name: 'LED Indicators',
    description: 'LED pilot lights and indicators for status indication and signaling',
    icon: LightBulbIcon,
    image: '/assets/images/products/noark/22_mm_Pilot_Devices_indicator-lights-category-300x300_3bdf9523.webp',
    productCount: 60,
    featured: false,
    slug: 'led-indicators'
  },
  {
    id: 'push-buttons',
    name: 'Push Buttons',
    description: 'Industrial push buttons, switches, and operator interface devices',
    icon: CursorArrowRaysIcon,
    image: '/assets/images/products/noark/22_mm_Pushbuttons_Ex9PB_pushbuttons-category-300x300_12540e52.webp',
    productCount: 80,
    featured: false,
    slug: 'push-buttons'
  }
]

export default function ProductCategoriesGrid() {
  const [filter, setFilter] = useState<'categories' | 'brands'>('categories')
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({})

  const filteredCategories = productCategories

  const handleImageError = (categoryId: string) => {
    setImageErrors(prev => ({ ...prev, [categoryId]: true }))
  }

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-lg p-1 shadow-sm border">
          <button
            onClick={() => setFilter('categories')}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              filter === 'categories'
                ? 'bg-red-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Categories ({productCategories.length})
          </button>
          <button
            onClick={() => setFilter('brands')}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              filter === 'brands'
                ? 'bg-red-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Brands (8)
          </button>
        </div>
      </div>

      {/* Content Area */}
      {filter === 'categories' ? (
        /* Categories Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const IconComponent = category.icon
            
            return (
              <Link
                key={category.id}
                href={`/products/${category.slug}`}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-red-200"
              >
                {/* Image Section */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  {!imageErrors[category.id] ? (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={() => handleImageError(category.id)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
                      <IconComponent className="w-16 h-16 text-red-600" />
                    </div>
                  )}
                  
                  {/* Featured Badge */}
                  {category.featured && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Product Count Badge */}
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-sm font-medium px-2 py-1 rounded-full">
                      {category.productCount} products
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
                      <IconComponent className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {category.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-red-600 font-medium text-sm group-hover:text-red-700">
                      Explore Products
                    </span>
                    <svg 
                      className="w-4 h-4 text-red-600 group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        /* Brands Selection */
        <BrandGrid />
      )}

      {/* Stats Section - Only show for categories */}
      {filter === 'categories' && (
        <div className="mt-16 bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Our Product Portfolio
            </h3>
            <p className="text-gray-600">
              Comprehensive selection from industry-leading manufacturers
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-1">
                {productCategories.reduce((sum, cat) => sum + cat.productCount, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-1">
                {productCategories.length}
              </div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-1">
                15+
              </div>
              <div className="text-sm text-gray-600">Brands</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-1">
                24/7
              </div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
