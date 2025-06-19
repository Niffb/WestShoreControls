'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { getImageUrl } from '@/lib/config/image-config'

import { StarIcon, ShieldCheckIcon, TrophyIcon } from '@heroicons/react/24/solid'

export default function Partnership() {
  const benefits = [
    {
      icon: ShieldCheckIcon,
      title: 'Authorized Distributor',
      description: 'Authorized distributor of Mitsubishi Electric products with enhanced support services'
    },
    {
      icon: TrophyIcon,
      title: 'Diamond Partner Status',
      description: 'Highest level of partnership recognition for excellence and commitment'
    },
    {
      icon: StarIcon,
      title: 'Premium Support',
      description: 'Direct access to technical resources and priority customer service'
    }
  ]

  return (
    <section id="partners" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Trusted 
            <span className="text-primary-500"> Mitsubishi Electric</span> Partner
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            As an authorized distributor and Diamond Partner for Mitsubishi Electric, 
            we provide you with access to premium industrial automation solutions 
            backed by world-class support and enhanced services.
          </p>
        </div>

        {/* Partnership Logos */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Mitsubishi Distributor */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Authorized Distributor
              </h3>
              <p className="text-gray-600">
                Authorized distributor of Mitsubishi Electric automation products
              </p>
            </div>
            <div className="flex justify-center mb-6">
              <div className="relative w-64 h-20">
                <Image
                  src={getImageUrl("/images/MitsubishiLogo.png")}
                  alt="Mitsubishi Electric"
                  width={120}
                  height={40}
                  className="object-contain filter brightness-90 group-hover:brightness-100 transition-all duration-300"
                />
              </div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                ✓ Authorized Partner Since 2010
              </div>
            </div>
          </div>

          {/* Diamond Partner */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 transform rotate-45 translate-x-10 -translate-y-10"></div>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Diamond Partner
              </h3>
              <p className="text-gray-600">
                Highest level of partnership recognition for excellence
              </p>
            </div>
            <div className="flex justify-center mb-6">
              <div className="relative w-48 h-20">
                <Image
                  src={getImageUrl("/images/DiamondPartnerLogo.png")}
                  alt="Diamond Partner Program"
                  width={150}
                  height={50}
                  className="object-contain filter brightness-90 group-hover:brightness-100 transition-all duration-300"
                />
              </div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                ⭐ Premium Partner Status
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              What This Means for You
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our partnership status ensures you receive the highest quality products and service
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div
                  key={index}
                  className="text-center p-4 sm:p-6 rounded-lg hover:bg-white hover:shadow-lg transition-all duration-200 touch-manipulation"
                >
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <IconComponent className="h-10 w-10 sm:h-12 sm:w-12 text-primary-500" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                    {benefit.title}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
} 