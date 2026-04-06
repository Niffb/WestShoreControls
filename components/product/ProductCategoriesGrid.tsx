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
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  image: string
  slug: string
}

const productCategories: ProductCategory[] = [
  {
    id: 'drives-vfds',
    name: 'Drives / VFDs',
    description: 'Variable frequency drives for precise motor speed control and energy efficiency',
    icon: CpuChipIcon,
    image: 'https://us.mitsubishielectric.com/fa/en/-/media/images/webredesign/products/drv/inv/img/thumbnail-a800.ashx?h=372&w=660&la=en',
    slug: 'drives-vfds'
  },
  {
    id: 'servo-motors',
    name: 'Servo Motors',
    description: 'High-precision servo motors for accurate positioning and motion control',
    icon: CogIcon,
    image: 'https://www.mitsubishielectric.com/fa/products/drv/servo/items/assets/img/mr_j5_top.png',
    slug: 'servo-motors'
  },
  {
    id: 'circuit-breakers',
    name: 'Circuit Breakers / Protection',
    description: 'Circuit protection devices including MCBs, MCCBs, and motor protection',
    icon: BoltIcon,
    image: '/assets/images/products/noark/Molded_Case_Circuit_Breakers_MCCB-category-300x300_ce635280.webp',
    slug: 'circuit-breakers-protection'
  },
  {
    id: 'contactors',
    name: 'Contactors',
    description: 'Electromagnetic switches for motor control and power switching applications',
    icon: WrenchScrewdriverIcon,
    image: '/assets/images/products/contactors/standard-NR-IEC-contactors-Ex9C_standard-NR-IEC-co_standard-NR-IEC-contactors-Ex9C-300x300_8410f80d.webp',
    slug: 'contactors'
  },
  {
    id: 'overload-relays',
    name: 'Overload Relays',
    description: 'Motor protection relays to prevent damage from overcurrent conditions',
    icon: ShieldCheckIcon,
    image: '/assets/images/products/circuit_breakers/meta-mec_and_metasol_overload_meta-mec_and_metasol_meta-mec-overload-300x300_ae08a150.webp',
    slug: 'overload-relays'
  },
  {
    id: 'plcs',
    name: 'PLCs',
    description: 'Programmable logic controllers for industrial automation and control',
    icon: ComputerDesktopIcon,
    image: '/assets/images/products/vfd/simple_plc_functionnality_plc_5cf0a389.webp',
    slug: 'plcs'
  },
  {
    id: 'manual-motor-starters',
    name: 'Manual Motor Starters',
    description: 'Manual motor starting switches with integrated overload protection',
    icon: HandRaisedIcon,
    image: '/assets/images/products/circuit_breakers/susol_circuit_breakers_and_manual_motor_starters_s_susol-circuit-breakers_9e6518a3.webp',
    slug: 'manual-motor-starters'
  },
  {
    id: 'power-distribution',
    name: 'Power Distribution',
    description: 'Power distribution equipment including panels, busbars, and switchgear',
    icon: RectangleStackIcon,
    image: '/assets/images/products/busbars/eriflex_flexibar_busbar_eriflex-flexibar-busbar_eriflex-flexibar-busbar_a7557744.webp',
    slug: 'power-distribution'
  },
  {
    id: 'custom-control-panels',
    name: 'Custom Control Panels',
    description: 'Custom-engineered control panels designed for your specific applications',
    icon: BuildingOffice2Icon,
    image: '/assets/images/products/general/XGT-panel-HMI_XGT-panel-HMI_XGT-panel-HMI_35b20c5b.webp',
    slug: 'custom-control-panels'
  },
  {
    id: 'led-indicators',
    name: 'LED Indicators',
    description: 'LED pilot lights and indicators for status indication and signaling',
    icon: LightBulbIcon,
    image: '/assets/images/products/noark/22_mm_Pilot_Devices_indicator-lights-category-300x300_3bdf9523.webp',
    slug: 'led-indicators'
  },
  {
    id: 'push-buttons',
    name: 'Push Buttons',
    description: 'Industrial push buttons, switches, and operator interface devices',
    icon: CursorArrowRaysIcon,
    image: '/assets/images/products/noark/22_mm_Pushbuttons_Ex9PB_pushbuttons-category-300x300_12540e52.webp',
    slug: 'push-buttons'
  }
]

export default function ProductCategoriesGrid() {
  const [filter, setFilter] = useState<'categories' | 'brands'>('categories')
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({})
  const handleImageError = (categoryId: string) => {
    setImageErrors(prev => ({ ...prev, [categoryId]: true }))
  }

  return (
    <div>
      {/* Filter Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setFilter('categories')}
            className={`px-6 py-2 rounded-md font-medium text-sm transition-colors ${
              filter === 'categories'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Categories ({productCategories.length})
          </button>
          <button
            onClick={() => setFilter('brands')}
            className={`px-6 py-2 rounded-md font-medium text-sm transition-colors ${
              filter === 'brands'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Brands
          </button>
        </div>
      </div>

      {filter === 'categories' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productCategories.map((category) => {
            const IconComponent = category.icon

            return (
              <Link
                key={category.id}
                href={`/products/${category.slug}`}
                className="group bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  {!imageErrors[category.id] ? (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={() => handleImageError(category.id)}
                      unoptimized={category.image.startsWith('http')}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50">
                      <IconComponent className="w-16 h-16 text-gray-300" />
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 p-2 bg-gray-50 rounded-md">
                      <IconComponent className="w-5 h-5 text-gray-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {category.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-600 font-medium text-sm">
                      View Products
                    </span>
                    <svg className="w-4 h-4 text-primary-600 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        <BrandGrid />
      )}
    </div>
  )
}
