'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { cleanProducts, productCategories } from '@/lib/products/products'
import { mitsubishiProducts } from '@/lib/products/mitsubishi-products'
import { tmeicProducts } from '@/lib/products/tmeic-products'
import { getAllKatkoProducts } from '@/lib/products/katko-products'
import { ericoProducts } from '@/lib/products/erico-products'
import { lsIndustrialProducts } from '@/lib/products/ls-industrial-products'
import { klemsanProducts } from '@/lib/products/klemsan-products'
import { getImageUrl } from '@/lib/config/image-config'

// Brand data with logos and available categories
// Top row: Mitsubishi, TMEIC, LS Industrial
// Bottom row: remaining brands in any order
const brands = [
  {
    name: 'Mitsubishi',
    logo: getImageUrl('MitsubishiLogo.png'),
    description: 'Complete Factory Automation & Electric Controls Product Line',
    website: 'https://www.mitsubishielectric.com',
    categories: ['Controllers', 'Variable Frequency Drives', 'Motors', 'Circuit Breakers', 'Contactors', 'Overload Relays']
  },
  {
    name: 'TMEIC',
    logo: getImageUrl('TMEIC_logo.svg'),
    description: 'Full Range of High Power Drives & Industrial Systems',
    website: 'https://www.tmeic.com',
    categories: ['Variable Frequency Drives', 'Motors', 'DC Drives']
  },
  {
    name: 'LS Industrial',
    logo: getImageUrl('LS.webp'),
    description: 'Complete Variable Frequency Drives & Motor Controls Product Line',
    website: 'https://www.lsis.com',
    categories: ['Variable Frequency Drives', 'Contactors', 'Controllers', 'Motors']
  },
  {
    name: 'ERICO',
    logo: getImageUrl('Erico.jpg'),
    description: 'Full Line of Electrical Connection & Protection Products',
    website: 'https://www.erico.com',
        categories: ['Flexible Conductors', 'Busbars', 'Cable Management']
  },
  {
    name: 'Katko',
    logo: getImageUrl('Katko.webp'),
    description: 'Complete Range of Enclosed Isolators & Safety Switches',
    website: 'https://www.katko.fi',
    categories: ['Enclosed Isolators']
  },
  {
    name: 'Klemsan',
    logo: getImageUrl('klemsan-logo.png'),
    description: 'Full Product Line of Terminal Blocks & Connection Solutions',
    website: 'https://www.klemsan.com',
    categories: ['Terminal Blocks', 'Accessories', 'Marking Solutions', 'Electronic Terminals', 'Terminal Marking']
  },
  {
    name: 'Noark',
    logo: getImageUrl('Noark.jpg'),
    description: 'Complete Circuit Protection & Industrial Controls Product Line',
    website: 'https://www.noark-electric.com', 
    categories: ['Circuit Protection', 'Motor Circuit Protectors', 'Miniature Circuit Breakers', 'Surge Protective Device', 'Power Circuit Breakers', 'Molded Case Switches', 'DIN Rail Fuse Holders and Fuses', 'Enclosed Breakers']
  },
  {
    name: 'Elsteel',
    logo: getImageUrl('Elsteel.png'),
    description: 'Full Range of Electrical Steel & Distribution Equipment',
    website: 'https://www.elsteel.com',
    categories: ['Enclosures', 'Distribution Blocks', 'Power Blocks and Terminals']
  }
]

// Static fallback counts to prevent hydration issues
const staticProductCounts = {
  'Mitsubishi': 11,
  'TMEIC': 32,
  'LS Industrial': 37,
  'ERICO': 25,
  'Katko': 15,
  'Klemsan': 120,
  'Noark': 383, // Total products: 308 MCP + 20 MCB + 3 PCB + 14 Switches + 15 SPD + 11 Fuse Holders + 12 Enclosed Breakers
  'Elsteel': 8
}

// Animated background particles
const FloatingParticles = () => {
  // Use fixed seed values to ensure consistent server/client rendering
  const particles = Array.from({length: 12}, (_, i) => {
    // Use index-based deterministic values instead of Math.random()
    const seedX = (i * 17.3 + 23.7) % 100
    const seedY = (i * 13.1 + 31.9) % 100
    const seedSize = (i % 3) + 1
    const seedColor = i % 4
    
    return {
      id: i,
      x: seedX,
      y: seedY,
      size: seedSize,
      color: ['#ef4444', '#f97316', '#3b82f6', '#10b981'][seedColor]
    }
  })

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map((particle, index) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, (index % 2 === 0 ? 10 : -10), 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: (index % 3) + 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export default function BrandSelection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [productCounts, setProductCounts] = useState(staticProductCounts)
  const [isHydrated, setIsHydrated] = useState(false)

  // Get accurate product count for each brand (client-side only)
  const getBrandProductCount = async (brandName: string) => {
    try {
      switch (brandName) {
        case 'Mitsubishi':
          return mitsubishiProducts.length
        case 'TMEIC':
          return tmeicProducts.length
        case 'LS Industrial':
          return lsIndustrialProducts.length
        case 'ERICO':
          return ericoProducts.length
        case 'Katko':
          return getAllKatkoProducts().length
        case 'Klemsan':
          return klemsanProducts.length
        case 'Noark':
                  // Import Noark MCP, MCB, PCB, Switches, SPD, Fuse Holders, and Enclosed Breakers products dynamically
        const { noarkMCPProducts } = await import('@/lib/products/noark-mcp-products')
        const { noarkMCBProducts } = await import('@/lib/products/noark-mcb-products')
        const { allPCBProducts } = await import('@/lib/products/noark-pcb-products')
        const { noarkSwitchesProducts } = await import('@/lib/products/noark-switches-products')
        const { noarkSPDProducts } = await import('@/lib/products/noark-spd-products')
        const { noarkFuseHoldersProducts } = await import('@/lib/products/noark-fuse-holders-products')
        const { noarkEnclosedBreakersProducts } = await import('@/lib/products/noark-enclosed-breakers-products')
                      return noarkMCPProducts.length + noarkMCBProducts.length + allPCBProducts.length + noarkSwitchesProducts.length + noarkSPDProducts.length + noarkFuseHoldersProducts.length + noarkEnclosedBreakersProducts.length
        case 'Elsteel':
          return cleanProducts.filter(product => product.brand === brandName).length
        default:
          return cleanProducts.filter(product => product.brand === brandName).length
      }
    } catch (error) {
      console.warn(`Error counting products for ${brandName}:`, error)
      return staticProductCounts[brandName] || 0
    }
  }

  // Update product counts after hydration
  useEffect(() => {
    setIsHydrated(true)
    
    const updateProductCounts = async () => {
      const newCounts: { [key: string]: number } = {}
      for (const brand of brands) {
        newCounts[brand.name] = await getBrandProductCount(brand.name)
      }
      setProductCounts(newCounts as typeof staticProductCounts)
    }

    updateProductCounts()
  }, [])

  // Calculate total products across all brands
  const getTotalProductCount = () => {
    return Object.values(productCounts).reduce((total, count) => total + count, 0)
  }

  return (
    <>
      <FloatingParticles />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-900/5 relative">
        {/* Hero Section */}
        <motion.section   
          className="relative pt-24 pb-16 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-200/30 to-red-800/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-800/30 to-red-200/30 rounded-full blur-3xl"></div>
          </div>
          
          {/* Dynamic gradient background */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-red-800/5 to-red-600/5"
              animate={{
                background: [
                  'linear-gradient(0deg, rgba(239, 68, 68, 0.05), rgba(153, 27, 27, 0.05), rgba(220, 38, 38, 0.05))',
                  'linear-gradient(120deg, rgba(239, 68, 68, 0.05), rgba(153, 27, 27, 0.05), rgba(220, 38, 38, 0.05))',
                  'linear-gradient(240deg, rgba(239, 68, 68, 0.05), rgba(153, 27, 27, 0.05), rgba(220, 38, 38, 0.05))',
                  'linear-gradient(360deg, rgba(239, 68, 68, 0.05), rgba(153, 27, 27, 0.05), rgba(220, 38, 38, 0.05))',
                ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Select a 
              <span className="text-transparent bg-gradient-to-r from-red-500 to-red-900 bg-clip-text"> Brand</span>
            </motion.h1>
           
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-900 mx-auto mb-8 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
           
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              We carry <strong className="text-gray-900">complete product lines</strong> from our trusted brand partners. Explore comprehensive factory and automation solutions from industry-leading manufacturers.
            </motion.p>

            {/* Quick Stats */}
            <motion.div 
              className="flex flex-wrap justify-center gap-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="flex items-center bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                <span className="font-medium text-gray-700">{brands.length} Trusted Brands</span>
              </div>
              <div className="flex items-center bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                <span className="font-medium text-gray-700">{getTotalProductCount().toLocaleString()}+ Products</span>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Brand Selection Grid */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16" ref={ref}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {brands.map((brand, index) => {
              const productCount = productCounts[brand.name] || staticProductCounts[brand.name] || 0
              
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
                          {productCount.toLocaleString()} Products Available
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
      </div>
    </>
  )
} 