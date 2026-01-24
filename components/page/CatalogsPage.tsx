'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { DocumentArrowDownIcon, FolderIcon, ArrowLeftIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
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
        {
          title: "Factory Automation Catalog 2024",
          description: "Complete range of industrial automation products including contactors, circuit breakers, motor starters, and control systems.",
          size: "9.5 MB",
          pages: 400,
          downloadUrl: "/downloads/catalogs/ls-industrial-factory-automation-catalog-2024.pdf"
        }
      ]
    },
    {
      brand: "Mitsubishi Electric",
      logo: getImageUrl("brands/MitsubishiLogo.webp"),
      catalogs: [
        {
          title: "LES Product Catalogue 2025",
          description: "Comprehensive catalog featuring Mitsubishi Electric's complete range of industrial automation solutions and motor drives.",
          size: "Online",
          pages: 438,
          downloadUrl: "https://library.mitsubishielectric.co.uk/pdf/book/LES_Product_Catalogue#page-1"
        }
      ]
    },
    {
      brand: "Noark",
      logo: getImageUrl("brands/Noark.webp"),
      catalogs: [
        {
          title: "Noark Product Catalogue",
          description: "Complete range of circuit breakers, contactors, motor protection devices, and electrical components.",
          size: "6.5 MB",
          pages: 120,
          downloadUrl: "/downloads/catalogs/noark-product-catalogue.pdf"
        }
      ]
    },
    {
      brand: "Klemsan",
      logo: getImageUrl("brands/klemsan-logo.webp"),
      catalogs: [
        {
          title: "Automation Components Catalog",
          description: "Industrial automation components including relays, power supplies, terminal blocks, and control accessories.",
          size: "12 MB",
          pages: 200,
          downloadUrl: "/downloads/catalogs/automation-klemsan.pdf"
        },
        {
          title: "Accessories & Connection Solutions",
          description: "Terminal blocks, connection accessories, marking systems, and installation tools.",
          size: "6.8 MB",
          pages: 150,
          downloadUrl: "/downloads/catalogs/klemsan-accessories.pdf"
        }
      ]
    },
    {
      brand: "Katko",
      logo: getImageUrl("brands/Katko.webp"),
      catalogs: [
        {
          title: "Product Catalogue 2021",
          description: "Complete range of enclosed isolating switches, motor controls, and safety disconnect switches.",
          size: "41 MB",
          pages: 300,
          downloadUrl: "/downloads/catalogs/katko-product-catalogue-2021.pdf"
        }
      ]
    },
    {
      brand: "Elsteel",
      logo: getImageUrl("brands/Elsteel.webp"),
      catalogs: [
        {
          title: "19\" Super Frame Brochure",
          description: "19\" Super Frame cabinets for telecommunications, data communication, and UPS applications.",
          size: "19.5 MB",
          pages: 48,
          downloadUrl: "/downloads/catalogs/elsteel-19-super-frame-brochure.pdf"
        },
        {
          title: "Box Brochure",
          description: "Mild steel and stainless steel boxes including terminal boxes and custom enclosures.",
          size: "12.9 MB",
          pages: 32,
          downloadUrl: "/downloads/catalogs/elsteel-box-brochure.pdf"
        },
        {
          title: "Special Enclosures",
          description: "Custom made enclosures manufactured to your specific needs and requirements.",
          size: "1.1 MB",
          pages: 8,
          downloadUrl: "/downloads/catalogs/elsteel-special-enclosures.pdf"
        },
        {
          title: "Plug & Power Solutions",
          description: "Modular plug and power distribution systems for industrial applications.",
          size: "6.9 MB",
          pages: 20,
          downloadUrl: "/downloads/catalogs/elsteel-plug-and-power.pdf"
        },
        {
          title: "Techno Module Brochure",
          description: "200mm grid solution offering flexibility, reliability, and safety for panel builders.",
          size: "7.3 MB",
          pages: 28,
          downloadUrl: "/downloads/catalogs/elsteel-techno-module-brochure.pdf"
        },
        {
          title: "Techno Module Light",
          description: "Compact version of Techno Module for space-efficient solutions.",
          size: "37.1 MB",
          pages: 64,
          downloadUrl: "/downloads/catalogs/elsteel-techno-module-light-brochure.pdf"
        }
      ]
    }
  ]

  const totalCatalogs = catalogs.reduce((sum, brand) => sum + brand.catalogs.length, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-900/5">
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumb */}
          <motion.nav
            className="flex items-center justify-center space-x-2 text-sm mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="text-gray-500 hover:text-red-600 transition-colors flex items-center"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-red-600 font-medium">Catalogs</span>
          </motion.nav>

          <motion.div
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="p-3 bg-red-100 rounded-full">
              <FolderIcon className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
              Product Catalogs
            </h1>
          </motion.div>

          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-900 mx-auto mb-8 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />

          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Download comprehensive product catalogs and technical documentation from our premium brand partners
          </motion.p>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
              <span className="font-medium text-gray-700">{catalogs.length} Brands</span>
            </div>
            <div className="flex items-center bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
              <span className="font-medium text-gray-700">{totalCatalogs} Catalogs</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Catalogs Grid with Dropdowns */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {catalogs.map((brand, brandIndex) => {
            const isExpanded = expandedBrands.includes(brand.brand)

            return (
              <motion.div
                key={brand.brand}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: brandIndex * 0.1 }}
                className="group"
              >
                {/* Brand Card */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl hover:border-red-200 transition-all duration-300">
                  {/* Brand Header - Clickable */}
                  <button
                    onClick={() => toggleBrand(brand.brand)}
                    className="w-full p-5 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white hover:from-red-50 hover:to-white transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white p-2 shadow-sm border border-gray-100 flex-shrink-0">
                        <Image
                          src={brand.logo}
                          alt={`${brand.brand} logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="text-left">
                        <h2 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                          {brand.brand}
                        </h2>
                        <span className="text-sm text-gray-500">
                          {brand.catalogs.length} {brand.catalogs.length === 1 ? 'Catalog' : 'Catalogs'}
                        </span>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="p-2 rounded-full bg-gray-100 group-hover:bg-red-100 transition-colors"
                    >
                      <ChevronDownIcon className="h-5 w-5 text-gray-600 group-hover:text-red-600 transition-colors" />
                    </motion.div>
                  </button>

                  {/* Dropdown Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 space-y-3 border-t border-gray-100">
                          {brand.catalogs.map((catalog, index) => (
                            <motion.a
                              key={index}
                              href={catalog.downloadUrl}
                              {...(catalog.downloadUrl.startsWith('http')
                                ? { target: '_blank', rel: 'noopener noreferrer' }
                                : {}
                              )}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="block p-4 rounded-xl bg-gray-50 hover:bg-red-50 border border-gray-100 hover:border-red-200 transition-all duration-200 group/item"
                            >
                              <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-red-100 text-red-600 flex-shrink-0 group-hover/item:bg-red-600 group-hover/item:text-white transition-colors">
                                  <DocumentArrowDownIcon className="h-5 w-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover/item:text-red-600 transition-colors">
                                    {catalog.title}
                                  </h3>
                                  <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                                    {catalog.description}
                                  </p>
                                  <div className="flex items-center gap-3 text-xs text-gray-400">
                                    <span>{catalog.size}</span>
                                    <span>•</span>
                                    <span>{catalog.pages} pages</span>
                                  </div>
                                </div>
                              </div>
                            </motion.a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Need Technical Support?
          </motion.h2>
          <motion.p
            className="text-xl text-red-100 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Our technical team is here to help you select the right products for your application.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-red-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors shadow-lg"
            >
              Contact Technical Support
            </Link>
            <a
              href="tel:+16048170987"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-red-600 transition-colors"
            >
              Call (604) 817-0987
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}