'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { getImageUrl } from '@/lib/config/image-config'

export default function PartnershipsHero() {
  const partnerships = [
    {
      name: 'Mitsubishi Electric',
      logo: getImageUrl('Mitsubishi-Electric.png'),
      alt: 'Mitsubishi Electric Logo'
    },
    {
      name: 'LS Industrial',
      logo: getImageUrl('LS.webp'),
      alt: 'LS Industrial Logo'
    },
    {
      name: 'Erico',
      logo: getImageUrl('Erico.jpg'),
      alt: 'Erico Logo'
    },
    {
      name: 'Noark',
      logo: getImageUrl('Noark.jpg'),
      alt: 'Noark Logo'
    },
    {
      name: 'Katko',
      logo: getImageUrl('Katko.webp'),
              alt: 'Katko Logo'
      },
      {
        name: 'Elsteel',
        logo: getImageUrl('Elsteel.png'),
        alt: 'Elsteel Logo'
      },
      {
        name: 'Klemsan',
      logo: getImageUrl('klemsan-logo.png'),
      alt: 'Klemsan Logo'
    }
  ]

  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
          >
            Trusted by Industry Leaders
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            We carry <strong className="text-gray-900">complete product lines</strong> from the world's leading manufacturers, bringing you comprehensive electrical and automation solutions for all your factory and industrial needs.
          </motion.p>
        </div>

        {/* Partnerships Logos Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 sm:gap-8 items-center justify-items-center"
        >
          {partnerships.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1 + 0.3,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="group relative"
            >
              <div className="relative w-28 h-16 sm:w-32 sm:h-20 flex items-center justify-center p-3 sm:p-4 rounded-lg border border-gray-100 bg-white hover:border-gray-200 hover:shadow-md transition-all duration-300 group-hover:bg-gray-50 touch-manipulation">
                <Image
                  src={partner.logo}
                  alt={partner.alt}
                  fill
                  className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300 p-2"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
              </div>
              
              {/* Tooltip */}
              <div className="absolute -top-10 sm:-top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs sm:text-sm py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                {partner.name}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Optional subtitle */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-gray-500">
                          VAR (Value-Added Reseller) for TMEIC products and authorized distributor with access to complete product catalogs from all premium brand partners
          </p>
        </motion.div>
      </div>
    </section>
  )
} 