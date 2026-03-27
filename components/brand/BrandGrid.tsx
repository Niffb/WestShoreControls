'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

const brands = [
  {
    name: 'Mitsubishi',
    logo: '/assets/images/brands/MitsubishiLogo.webp',
    description: 'Complete Factory Automation & Electric Controls Product Line',
    categories: ['Controllers', 'Variable Frequency Drives', 'Motors', 'Circuit Breakers', 'Contactors', 'Overload Relays'],
    productCount: 16
  },
  {
    name: 'TMEIC',
    logo: '/assets/images/brands/TMEIC_logo.png',
    description: 'Full Range of High Power Drives & Industrial Systems',
    categories: ['Variable Frequency Drives', 'Motors', 'DC Drives'],
    productCount: 51
  },
  {
    name: 'LS Industrial',
    logo: '/assets/images/brands/LS.webp',
    description: 'Complete Variable Frequency Drives & Motor Controls Product Line',
    categories: ['Variable Frequency Drives', 'Contactors', 'Controllers', 'Motors'],
    productCount: 42
  },
  {
    name: 'ERICO',
    logo: '/assets/images/brands/Erico.webp',
    description: 'Full Line of Electrical Connection & Protection Products',
    categories: ['Flexible Conductors', 'Busbars', 'Cable Management'],
    productCount: 24
  },
  {
    name: 'Katko',
    logo: '/assets/images/brands/Katko.webp',
    description: 'Complete Range of Enclosed Isolators & Safety Switches',
    categories: ['Enclosed Isolators'],
    productCount: 3080
  },
  {
    name: 'Klemsan',
    logo: '/assets/images/brands/klemsan-logo.webp',
    description: 'Full Product Line of Terminal Blocks & Connection Solutions',
    categories: ['Screw Terminals', 'Quick Release', 'Spring Terminals', 'Plug Terminals', 'Power Sources', 'Automation', 'Junction Boxes', 'Cable Channels'],
    productCount: 265
  },
  {
    name: 'Noark',
    logo: '/assets/images/brands/Noark.webp',
    description: 'Complete Circuit Protection & Industrial Controls Product Line',
    categories: ['Circuit Protection', 'Motor Circuit Protectors', 'Miniature Circuit Breakers', 'Surge Protective Device', 'Power Circuit Breakers', 'Molded Case Switches', 'DIN Rail Fuse Holders and Fuses', 'Enclosed Breakers'],
    productCount: 4307
  },
  {
    name: 'Elsteel',
    logo: '/assets/images/brands/Elsteel.webp',
    description: 'Full Range of Electrical Steel & Distribution Equipment',
    categories: ['Modular Enclosures', 'Enclosures', 'Special Enclosures', 'Super Frame', 'Plug and Power'],
    productCount: 18
  }
]

export default function BrandGrid() {
  return (
    <section className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <Link
            key={brand.name}
            href={`/${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
            className="group bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200 block h-full"
          >
            <div className="h-20 bg-gray-50 rounded-md px-4 flex items-center justify-center mb-4">
              <Image
                src={brand.logo}
                alt={`${brand.name} logo`}
                width={120}
                height={60}
                className="max-w-full max-h-14 object-contain"
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {brand.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {brand.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-700">
                  {brand.productCount.toLocaleString()} Products Available
                </span>
              </div>

              <div className="mb-5">
                <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Available Categories:</p>
                <div className="flex flex-wrap gap-1">
                  {brand.categories.slice(0, 3).map((category) => (
                    <span
                      key={category}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                    >
                      {category}
                    </span>
                  ))}
                  {brand.categories.length > 3 && (
                    <span className="text-xs text-gray-400 px-2 py-0.5">
                      +{brand.categories.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center text-primary-600 font-medium text-sm group-hover:text-primary-700 transition-colors">
                Browse Products
                <ArrowRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
