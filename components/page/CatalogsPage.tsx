'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { DocumentArrowDownIcon, ArrowLeftIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { getImageUrl } from '@/lib/config/image-config'

interface Catalog {
  title: string
  description: string
  size: string
  pages: number
  downloadUrl: string
}

interface CatalogBrand {
  brand: string
  logo: string
  catalogs: Catalog[]
}

export default function CatalogsPageComponent() {
  const [expandedBrands, setExpandedBrands] = useState<string[]>([])

  const toggleBrand = (brand: string) => {
    setExpandedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    )
  }

  const catalogs: CatalogBrand[] = [
    {
      brand: "LS Industrial",
      logo: getImageUrl("brands/LS.webp"),
      catalogs: [
        { title: "Factory Automation Catalog 2024", description: "Complete range of industrial automation products including contactors, circuit breakers, motor starters, and control systems.", size: "9.5 MB", pages: 400, downloadUrl: "/downloads/catalogs/ls-industrial-factory-automation-catalog-2024.pdf" }
      ]
    },
    {
      brand: "Mitsubishi Electric",
      logo: getImageUrl("brands/MitsubishiLogo.webp"),
      catalogs: [
        { title: "LES Product Catalogue 2025", description: "Comprehensive catalog featuring Mitsubishi Electric's complete range of industrial automation solutions and motor drives.", size: "Online", pages: 438, downloadUrl: "https://library.mitsubishielectric.co.uk/pdf/book/LES_Product_Catalogue#page-1" }
      ]
    },
    {
      brand: "Noark",
      logo: getImageUrl("brands/Noark.webp"),
      catalogs: [
        { title: "Noark Product Catalogue", description: "Complete range of circuit breakers, contactors, motor protection devices, and electrical components.", size: "6.5 MB", pages: 120, downloadUrl: "/downloads/catalogs/noark-product-catalogue.pdf" }
      ]
    },
    {
      brand: "Klemsan",
      logo: getImageUrl("brands/klemsan-logo.webp"),
      catalogs: [
        { title: "Automation Components Catalog", description: "Industrial automation components including relays, power supplies, terminal blocks, and control accessories.", size: "12 MB", pages: 200, downloadUrl: "/downloads/catalogs/automation-klemsan.pdf" },
        { title: "Accessories & Connection Solutions", description: "Terminal blocks, connection accessories, marking systems, and installation tools.", size: "6.8 MB", pages: 150, downloadUrl: "/downloads/catalogs/klemsan-accessories.pdf" }
      ]
    },
    {
      brand: "Katko",
      logo: getImageUrl("brands/Katko.webp"),
      catalogs: [
        { title: "Product Catalogue 2021", description: "Complete range of enclosed isolating switches, motor controls, and safety disconnect switches.", size: "41 MB", pages: 300, downloadUrl: "/downloads/catalogs/katko-product-catalogue-2021.pdf" }
      ]
    },
    {
      brand: "Elsteel",
      logo: getImageUrl("brands/Elsteel.webp"),
      catalogs: [
        { title: '19" Super Frame Brochure', description: '19" Super Frame cabinets for telecommunications, data communication, and UPS applications.', size: "19.5 MB", pages: 48, downloadUrl: "/downloads/catalogs/elsteel-19-super-frame-brochure.pdf" },
        { title: "Box Brochure", description: "Mild steel and stainless steel boxes including terminal boxes and custom enclosures.", size: "12.9 MB", pages: 32, downloadUrl: "/downloads/catalogs/elsteel-box-brochure.pdf" },
        { title: "Special Enclosures", description: "Custom made enclosures manufactured to your specific needs and requirements.", size: "1.1 MB", pages: 8, downloadUrl: "/downloads/catalogs/elsteel-special-enclosures.pdf" },
        { title: "Plug & Power Solutions", description: "Modular plug and power distribution systems for industrial applications.", size: "6.9 MB", pages: 20, downloadUrl: "/downloads/catalogs/elsteel-plug-and-power.pdf" },
        { title: "Techno Module Brochure", description: "200mm grid solution offering flexibility, reliability, and safety for panel builders.", size: "7.3 MB", pages: 28, downloadUrl: "/downloads/catalogs/elsteel-techno-module-brochure.pdf" },
        { title: "Techno Module Light", description: "Compact version of Techno Module for space-efficient solutions.", size: "37.1 MB", pages: 64, downloadUrl: "/downloads/catalogs/elsteel-techno-module-light-brochure.pdf" }
      ]
    }
  ]

  const totalCatalogs = catalogs.reduce((sum, brand) => sum + brand.catalogs.length, 0)

  return (
    <div className="min-h-screen bg-white">
      {/* Page Heading */}
      <section className="border-b border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-primary-600 transition-colors flex items-center">
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              Home
            </Link>
            <span>/</span>
            <span className="text-primary-600 font-medium">Catalogs</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Product <span className="text-primary-600">Catalogs</span>
          </h1>
          <p className="mt-2 text-gray-600 max-w-2xl">
            Download catalogs and technical documentation from our brand partners. {catalogs.length} brands, {totalCatalogs} catalogs available.
          </p>
        </div>
      </section>

      {/* Catalogs Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {catalogs.map((brand) => {
            const isExpanded = expandedBrands.includes(brand.brand)

            return (
              <div key={brand.brand} className="group">
                <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                  <button
                    onClick={() => toggleBrand(brand.brand)}
                    className="w-full p-5 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-white p-2 border border-gray-100 flex-shrink-0">
                        <Image
                          src={brand.logo}
                          alt={`${brand.brand} logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="text-left">
                        <h2 className="text-lg font-bold text-gray-900">
                          {brand.brand}
                        </h2>
                        <span className="text-sm text-gray-500">
                          {brand.catalogs.length} {brand.catalogs.length === 1 ? 'Catalog' : 'Catalogs'}
                        </span>
                      </div>
                    </div>
                    <div className={`p-2 rounded-full bg-gray-200 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                      <ChevronDownIcon className="h-5 w-5 text-gray-600" />
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-4 pt-0 space-y-3 border-t border-gray-100">
                      {brand.catalogs.map((catalog, index) => (
                        <a
                          key={index}
                          href={catalog.downloadUrl}
                          {...(catalog.downloadUrl.startsWith('http')
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {}
                          )}
                          className="block p-4 rounded-lg bg-gray-50 hover:bg-primary-50 border border-gray-100 hover:border-primary-200 transition-colors duration-150"
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-primary-100 text-primary-600 flex-shrink-0">
                              <DocumentArrowDownIcon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 text-sm mb-1">
                                {catalog.title}
                              </h3>
                              <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                                {catalog.description}
                              </p>
                              <div className="flex items-center gap-3 text-xs text-gray-400">
                                <span>{catalog.size}</span>
                                <span>&middot;</span>
                                <span>{catalog.pages} pages</span>
                              </div>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need Technical Support?</h2>
          <p className="text-gray-400 mb-8">
            Our technical team is here to help you select the right products for your application.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-white text-gray-900 font-semibold rounded-md hover:bg-gray-100 transition-colors"
            >
              Contact Technical Support
            </Link>
            <a
              href="tel:+16048170987"
              className="inline-flex items-center px-8 py-3 border border-white text-white font-semibold rounded-md hover:bg-white hover:text-gray-900 transition-colors"
            >
              Call (604) 817-0987
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
