'use client'

import Image from 'next/image'
import { getImageUrl } from '@/lib/config/image-config'

export default function PartnershipsHero() {
  const partnerships = [
    { name: 'TMEIC', logo: getImageUrl('brands/TMEIC_logo.png'), alt: 'TMEIC Logo' },
    { name: 'Mitsubishi Electric', logo: getImageUrl('brands/Mitsubishi-Electric.webp'), alt: 'Mitsubishi Electric Logo' },
    { name: 'LS Industrial', logo: getImageUrl('brands/LS.webp'), alt: 'LS Industrial Logo' },
    { name: 'Erico', logo: getImageUrl('brands/Erico.webp'), alt: 'Erico Logo' },
    { name: 'Noark', logo: getImageUrl('brands/Noark.webp'), alt: 'Noark Logo' },
    { name: 'Katko', logo: getImageUrl('brands/Katko.webp'), alt: 'Katko Logo' },
    { name: 'Elsteel', logo: getImageUrl('brands/Elsteel.webp'), alt: 'Elsteel Logo' },
    { name: 'Klemsan', logo: getImageUrl('brands/klemsan-logo.webp'), alt: 'Klemsan Logo' }
  ]

  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We carry <strong className="text-gray-900">complete product lines</strong> from the world&apos;s leading manufacturers, bringing you comprehensive electrical and automation solutions for all your factory and industrial needs.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6 sm:gap-8 items-center justify-items-center">
          {partnerships.map((partner) => (
            <div key={partner.name} className="group relative">
              <div className="relative w-28 h-16 sm:w-32 sm:h-20 flex items-center justify-center p-3 sm:p-4 rounded-lg border border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm transition-all duration-200">
                <Image
                  src={partner.logo}
                  alt={partner.alt}
                  fill
                  className="object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-200 p-2"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            VAR (Value-Added Reseller) for TMEIC products and authorized distributor with access to complete product catalogs from all premium brand partners
          </p>
        </div>
      </div>
    </section>
  )
}
