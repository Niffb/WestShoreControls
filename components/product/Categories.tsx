'use client'

import { 
  BoltIcon, 
  CpuChipIcon, 
  PowerIcon, 
  WrenchScrewdriverIcon,
  LightBulbIcon,
  CogIcon 
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export const categories = [
  {
    name: 'Variable Frequency Drives',
    description: 'LS Industrial motor speed control drives',
    icon: CpuChipIcon,
    count: 'LS Industrial',
    color: 'bg-primary-500',
    slug: 'Variable Frequency Drives',
    brands: ['LS Industrial', 'TMEIC'] 
  },
  {
    name: 'Contactors and Relays',
    description: 'Noark and LS Industrial switching devices',
    icon: BoltIcon,
    count: 'Noark & LS Industrial',
    color: 'bg-accent-blue',
    slug: 'Contactors and Relays',
    brands: ['Noark', 'LS Industrial']
  },

  {
    name: 'Enclosed Isolators',
    description: 'Katko enclosed isolators and switchgear solutions',
    icon: CogIcon,
    count: 'Katko Products',
    color: 'bg-accent-purple',
    slug: 'Enclosed Isolators',
    brands: ['Katko']
  },
  {
    name: 'Flexible Conductors',
    description: 'ERICO® FLEXIBAR® and copper braids',
    icon: WrenchScrewdriverIcon,
    count: 'ERICO Products',
    color: 'bg-accent-orange',
    slug: 'Flexible Conductors',
    brands: ['ERICO']
  },
  {
    name: 'DIN Rail Miniature Circuit Breakers',
    description: 'Noark UL 489 & UL 1077 circuit breakers',
    icon: PowerIcon,
    count: 'Noark Products',
    color: 'bg-primary-600',
    slug: 'DIN Rail Miniature Circuit Breakers',
    brands: ['Noark']
  },
  {
    name: '22 mm Pilot Devices',
    description: 'Noark pushbuttons and indicator lights',
    icon: LightBulbIcon,
    count: 'Noark Ex9PB & Ex9IL',
    color: 'bg-gray-600',
    slug: '22 mm Pilot Devices',
    brands: ['Noark']
  }
]

export default function Categories() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <section id="categories" className="py-20 bg-white relative overflow-hidden" ref={ref}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(45deg, #f3f4f6 25%, transparent 25%), 
                             linear-gradient(-45deg, #f3f4f6 25%, transparent 25%), 
                             linear-gradient(45deg, transparent 75%, #f3f4f6 75%), 
                             linear-gradient(-45deg, transparent 75%, #f3f4f6 75%)`,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
          }}
          animate={{
            x: [0, 20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Featured Product Categories
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Browse our electrical components by brand. Each brand specializes in specific product categories to meet your industrial and commercial needs.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
                transition={{ 
                  delay: 0.6 + index * 0.1, 
                  duration: 0.6,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
                }}
                className="perspective-1000"
              >
                <Link
                  href={`/${category.brands[0].toLowerCase().replace(/\s+/g, '-')}/${encodeURIComponent(category.slug.toLowerCase().replace(/\s+/g, '-'))}`}
                  className="group relative bg-white rounded-xl border border-gray-200 p-6 sm:p-8 hover:shadow-xl transition-all duration-300 cursor-pointer block overflow-hidden touch-manipulation"
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, ${category.color.replace('bg-', 'rgba(')}, 0.05), transparent 50%)`
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="flex items-center mb-4 sm:mb-6 relative z-10">
                    <motion.div 
                      className={`${category.color} p-2.5 sm:p-3 rounded-lg mr-3 sm:mr-4 flex-shrink-0`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </motion.div>
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-primary-500 transition-colors leading-tight">
                        {category.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">{category.count}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 relative z-10 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className="flex justify-between items-center relative z-10">
                    <motion.span 
                      className="text-primary-500 font-medium group-hover:text-primary-600 transition-colors"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      Browse Products →
                    </motion.span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/brands" className="btn-primary text-lg px-8 py-3 inline-block relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative">View All Brands</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 