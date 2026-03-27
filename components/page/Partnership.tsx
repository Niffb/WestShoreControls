'use client'

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
    <section id="partners" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid lg:grid-cols-2 gap-8 items-center mb-20">
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Authorized Distributor</h3>
            <p className="text-gray-600 mb-6">Authorized distributor of Mitsubishi Electric automation products</p>
            <div className="flex justify-center mb-6">
              <Image
                src={getImageUrl("brands/MitsubishiLogo.webp")}
                alt="Mitsubishi Electric"
                width={150}
                height={60}
                className="object-contain max-h-16 w-auto"
              />
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
              Authorized Partner Since 2010
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Diamond Partner</h3>
            <p className="text-gray-600 mb-6">Highest level of partnership recognition for excellence</p>
            <div className="flex justify-center mb-6">
              <Image
                src={getImageUrl("brands/DiamondPartnerLogo.webp")}
                alt="Diamond Partner"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-yellow-50 text-yellow-800 rounded-full text-sm font-medium">
              Premium Partner Status
            </div>
          </div>
        </div>

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
                <div key={index} className="text-center p-6 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-150">
                  <div className="flex justify-center mb-4">
                    <IconComponent className="h-10 w-10 text-primary-500" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
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
