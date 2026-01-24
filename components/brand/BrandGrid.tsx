'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

// Brand data with logos and available categories
const brands = [
  {
    name: 'Mitsubishi',
    logo: '/assets/images/brands/MitsubishiLogo.webp',
    description: 'Complete Factory Automation & Electric Controls Product Line',
    website: 'https://www.mitsubishielectric.com',
    categories: ['Controllers', 'Variable Frequency Drives', 'Motors', 'Circuit Breakers', 'Contactors', 'Overload Relays'],
    productCount: 16
  },
  {
    name: 'TMEIC',
    logo: '/assets/images/brands/TMEIC_logo.png',
    description: 'Full Range of High Power Drives & Industrial Systems',
    website: 'https://www.tmeic.com',
    categories: ['Variable Frequency Drives', 'Motors', 'DC Drives'],
    productCount: 51
  },
  {
    name: 'LS Industrial',
    logo: '/assets/images/brands/LS.webp',
    description: 'Complete Variable Frequency Drives & Motor Controls Product Line',
    website: 'https://www.lsis.com',
    categories: ['Variable Frequency Drives', 'Contactors', 'Controllers', 'Motors'],
    productCount: 42
  },
  {
    name: 'ERICO',
    logo: '/assets/images/brands/Erico.webp',
    description: 'Full Line of Electrical Connection & Protection Products',
    website: 'https://www.erico.com',
    categories: ['Flexible Conductors', 'Busbars', 'Cable Management'],
    productCount: 24
  },
  {
    name: 'Katko',
    logo: '/assets/images/brands/Katko.webp',
    description: 'Complete Range of Enclosed Isolators & Safety Switches',
    website: 'https://www.katko.fi',
    categories: ['Enclosed Isolators'],
    productCount: 3080
  },
  {
    name: 'Klemsan',
    logo: '/assets/images/brands/klemsan-logo.webp',
    description: 'Full Product Line of Terminal Blocks & Connection Solutions',
    website: 'https://www.klemsan.com',
    categories: ['Screw Terminals', 'Quick Release', 'Spring Terminals', 'Plug Terminals', 'Power Sources', 'Automation', 'Junction Boxes', 'Cable Channels'],
    productCount: 265
  },
  {
    name: 'Noark',
    logo: '/assets/images/brands/Noark.webp',
    description: 'Complete Circuit Protection & Industrial Controls Product Line',
    website: 'https://www.noark-electric.com',
    categories: ['Circuit Protection', 'Motor Circuit Protectors', 'Miniature Circuit Breakers', 'Surge Protective Device', 'Power Circuit Breakers', 'Molded Case Switches', 'DIN Rail Fuse Holders and Fuses', 'Enclosed Breakers'],
    productCount: 4307
  },
  {
    name: 'Elsteel',
    logo: '/assets/images/brands/Elsteel.webp',
    description: 'Full Range of Electrical Steel & Distribution Equipment',
    website: 'https://www.elsteel.com',
    categories: ['Modular Enclosures', 'Enclosures', 'Special Enclosures', 'Super Frame', 'Plug and Power'],
    productCount: 18
  }
]

export default function BrandGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative" ref={ref}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {brands.map((brand, index) => {
          return (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: "easeOut"
              }}
              whileHover={{
                scale: 1.02,
                y: -5,
                boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
              }}
              className="perspective-1000"
            >
              <Link
                href={`/${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group relative bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-2xl transition-all duration-500 cursor-pointer block overflow-hidden touch-manipulation h-full"
              >
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05), transparent 50%)'
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Brand Logo */}
                <div className="relative w-full h-32 mb-6 flex items-center justify-center bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors duration-300">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    width={120}
                    height={60}
                    className="max-w-full max-h-20 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Brand Info */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    {brand.name}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {brand.description}
                  </p>

                  {/* Product Count */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-700">
                      {brand.productCount.toLocaleString()} Products Available
                    </span>
                  </div>

                  {/* Categories */}
                  <div className="mb-6">
                    <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Available Categories:</p>
                    <div className="flex flex-wrap gap-1">
                      {brand.categories.slice(0, 3).map((category) => (
                        <span
                          key={category}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md group-hover:bg-red-50 group-hover:text-red-600 transition-colors"
                        >
                          {category}
                        </span>
                      ))}
                      {brand.categories.length > 3 && (
                        <span className="text-xs text-gray-400 px-2 py-1">
                          +{brand.categories.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex items-center justify-between">
                    <motion.span
                      className="text-red-600 font-medium group-hover:text-red-700 transition-colors flex items-center"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      Browse Products
                      <ArrowRightIcon className="h-4 w-4 ml-1" />
                    </motion.span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
