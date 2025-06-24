'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowDownTrayIcon, DocumentTextIcon, FolderIcon, GlobeAltIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { getImageUrl } from '@/lib/config/image-config'
import { useState } from 'react'

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
  description: string
  catalogCount: number
  color: string
  gradient: string
  catalogs: Catalog[]
}

export default function CatalogsPageComponent() {
  const [downloadedFiles, setDownloadedFiles] = useState<Set<string>>(new Set())

  const handleDownload = async (downloadUrl: string, filename: string) => {
    try {
      // First, try to fetch the file to check if it's available
      const response = await fetch(downloadUrl, { method: 'HEAD' })
      
      if (!response.ok) {
        console.error('Download failed:', response.status, response.statusText)
        
        // If API route fails, try direct file access as fallback
        const directUrl = downloadUrl.replace('/api/download/', '/downloads/')
        const directResponse = await fetch(directUrl, { method: 'HEAD' })
        
        if (directResponse.ok) {
          // Use direct download as fallback
          window.open(directUrl, '_blank')
          setDownloadedFiles(prev => new Set(prev).add(downloadUrl))
        } else {
          alert(`Sorry, the file "${filename}" is currently unavailable. Please try again later or contact support.`)
          return
        }
      } else {
        // File is available via API route, trigger the download
        // Extract the actual filename from the URL
        const actualFilename = downloadUrl.split('/').pop() || filename
        
        // Create a temporary link element to trigger download
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = actualFilename
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        // Mark as downloaded
        setDownloadedFiles(prev => new Set(prev).add(downloadUrl))
      }
    } catch (error) {
      console.error('Download error:', error)
      alert(`Sorry, there was an error downloading "${filename}". Please try again later.`)
    }
  }

  const catalogs: CatalogBrand[] = [
    {
      brand: "LS Industrial",
      logo: getImageUrl("LS.webp"),
      description: "Comprehensive industrial automation solutions including contactors, circuit breakers, and drives.",
      catalogCount: 1,
      color: "green",
      gradient: "from-green-500 to-green-600",
      catalogs: [
        {
          title: "2025 LES Product Catalogue",
          description: "Complete range of industrial automation products including contactors, circuit breakers, motor starters, and control systems with technical specifications and wiring diagrams.",
          size: "141 MB",
          pages: 800,
          downloadUrl: "/api/download/catalogs/2025-les-product-catalogue.pdf"
        }
      ]
    },
    {
      brand: "Noark",
      logo: getImageUrl("brands/Noark.webp"),
      description: "High-quality electrical components including contactors, circuit breakers, and motor protection devices.",
      catalogCount: 1,
      color: "orange",
      gradient: "from-orange-500 to-orange-600",
      catalogs: [
        {
          title: "Noark Product Catalogue",
          description: "Complete range of circuit breakers, contactors, motor protection devices, and electrical components with technical specifications and application guides.",
          size: "6.5 MB",
          pages: 120,
          downloadUrl: "/api/download/catalogs/noark-product-catalogue.pdf"
        }
      ]
    },
    {
      brand: "Klemsan",
      logo: getImageUrl("brands/klemsan-logo.webp"),
      description: "Terminal blocks, industrial automation components, and electrical connection solutions.",
      catalogCount: 2,
      color: "purple",
      gradient: "from-purple-500 to-purple-600",
      catalogs: [
        {
          title: "Automation Components Catalog",
          description: "Comprehensive range of industrial automation components including relays, power supplies, terminal blocks, and control system accessories.",
          size: "12 MB",
          pages: 200,
          downloadUrl: "/api/download/catalogs/automation-klemsan.pdf"
        },
        {
          title: "Accessories & Connection Solutions",
          description: "Terminal blocks, connection accessories, marking systems, and installation tools with technical specifications and application examples.",
          size: "6.8 MB",
          pages: 150,
          downloadUrl: "/api/download/catalogs/klemsan-accessories.pdf"
        }
      ]
    },
    {
      brand: "Katko",
      logo: getImageUrl("Katko.webp"),
      description: "UL Listed manual motor controllers and industrial control solutions for safety applications.",
      catalogCount: 1,
      color: "indigo",
      gradient: "from-indigo-500 to-indigo-600",
      catalogs: [
        {
          title: "Product Catalogue 2021",
          description: "Complete range of enclosed isolating switches, motor controls, and safety disconnect switches with UL certifications and installation procedures.",
          size: "41 MB",
          pages: 300,
          downloadUrl: "/api/download/catalogs/katko-product-catalogue-2021.pdf"
        }
      ]
    },
    {
      brand: "Elsteel",
      logo: getImageUrl("brands/Elsteel.webp"),
      description: "Full range of electrical steel and distribution equipment including modular enclosures, special enclosures, and super frame systems.",
      catalogCount: 7,
      color: "slate",
      gradient: "from-slate-500 to-slate-600",
      catalogs: [
        {
          title: "19\" Super Frame Brochure",
          description: "Comprehensive guide to Elsteel's 19\" Super Frame cabinets designed for high-tech requirements in telecommunications, data communication, and UPS applications.",
          size: "19.5 MB",
          pages: 48,
          downloadUrl: "/api/download/catalogs/elsteel-19-super-frame-brochure.pdf"
        },
        {
          title: "Box Brochure",
          description: "Complete range of mild steel and stainless steel boxes including terminal boxes, custom made enclosures, and special size solutions for various applications.",
          size: "12.9 MB",
          pages: 32,
          downloadUrl: "/api/download/catalogs/elsteel-box-brochure.pdf"
        },
        {
          title: "Special Enclosures",
          description: "Custom made enclosures and special size solutions manufactured according to your specific needs and requirements with flexible manufacturing processes.",
          size: "1.1 MB",
          pages: 8,
          downloadUrl: "/api/download/catalogs/elsteel-special-enclosures.pdf"
        },
        {
          title: "Marine Simulator Brochure",
          description: "Specialized marine simulation equipment and enclosures designed for maritime applications with high durability and corrosion resistance.",
          size: "9.2 MB",
          pages: 24,
          downloadUrl: "/api/download/catalogs/elsteel-marine-simulator-brochure.pdf"
        },
        {
          title: "Plug & Power Solutions",
          description: "Comprehensive plug and power distribution solutions including modular systems and flexible power distribution equipment for industrial applications.",
          size: "6.9 MB",
          pages: 20,
          downloadUrl: "/api/download/catalogs/elsteel-plug-and-power.pdf"
        },
        {
          title: "Techno Module Brochure",
          description: "Elsteel's original 200mm grid solution offering flexibility, reliability, and safety for panel builders and consultants worldwide.",
          size: "7.3 MB",
          pages: 28,
          downloadUrl: "/api/download/catalogs/elsteel-techno-module-brochure.pdf"
        },
        {
          title: "Techno Module Light Brochure",
          description: "Compact version of Techno Module designed with the same flexibility and reliability for projects requiring smaller panels and space-efficient solutions.",
          size: "37.1 MB",
          pages: 64,
          downloadUrl: "/api/download/catalogs/elsteel-techno-module-light-brochure.pdf"
        }
      ]
    }
  ]

  const getColorClasses = (color: string) => {
    const colorMap = {
      red: "border-primary-200 hover:border-primary-300 hover:shadow-primary-100",
      blue: "border-blue-200 hover:border-blue-300 hover:shadow-blue-100",
      green: "border-green-200 hover:border-green-300 hover:shadow-green-100",
      orange: "border-orange-200 hover:border-orange-300 hover:shadow-orange-100",
      purple: "border-purple-200 hover:border-purple-300 hover:shadow-purple-100",
      indigo: "border-indigo-200 hover:border-indigo-300 hover:shadow-indigo-100",
      slate: "border-slate-200 hover:border-slate-300 hover:shadow-slate-100"
    }
    return colorMap[color as keyof typeof colorMap] || "border-primary-200 hover:border-primary-300 hover:shadow-primary-100"
  }

  const getBadgeClasses = (color: string) => {
    const colorMap = {
      red: "bg-primary-50 text-primary-700 border-primary-200",
      blue: "bg-blue-50 text-blue-700 border-blue-200",
      green: "bg-green-50 text-green-700 border-green-200",
      orange: "bg-orange-50 text-orange-700 border-orange-200",
      purple: "bg-purple-50 text-purple-700 border-purple-200",
      indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
      slate: "bg-slate-50 text-slate-700 border-slate-200"
    }
    return colorMap[color as keyof typeof colorMap] || "bg-primary-50 text-primary-700 border-primary-200"
  }

  const isDownloaded = (downloadUrl: string) => downloadedFiles.has(downloadUrl)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-primary-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-primary-100 rounded-full">
                <FolderIcon className="h-8 w-8 text-primary-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Product <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-500">Catalogs</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Download comprehensive product catalogs and technical documentation from leading industrial equipment manufacturers. Access detailed specifications, installation guides, and product selection tools.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <DocumentTextIcon className="h-5 w-5" />
                <span>Technical Specifications</span>
              </div>
              <div className="flex items-center space-x-2">
                <ArrowDownTrayIcon className="h-5 w-5" />
                <span>Instant Downloads</span>
              </div>
              <div className="flex items-center space-x-2">
                <GlobeAltIcon className="h-5 w-5" />
                <span>Global Standards</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogs Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {catalogs.map((brand) => (
              <div key={brand.brand} className="group">
                {/* Brand Header */}
                <div className={`flex items-center space-x-6 mb-8 p-6 bg-white rounded-2xl border-2 ${getColorClasses(brand.color)} shadow-sm transition-all duration-300 hover:shadow-lg`}>
                  <div className="flex-shrink-0">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white p-2 shadow-sm">
                      <Image
                        src={brand.logo}
                        alt={`${brand.brand} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h2 className="text-2xl font-bold text-gray-900">{brand.brand}</h2>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getBadgeClasses(brand.color)}`}>
                        {brand.catalogCount} Catalogs
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{brand.description}</p>
                  </div>
                </div>

                {/* Catalogs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {brand.catalogs.map((catalog, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group/card"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${brand.gradient} text-white`}>
                            <DocumentTextIcon className="h-6 w-6" />
                          </div>
                          <div className="text-right text-sm text-gray-500">
                            <div>{catalog.size}</div>
                            <div>{catalog.pages} pages</div>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover/card:text-primary-600 transition-colors">
                          {catalog.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                          {catalog.description}
                        </p>
                        
                        <div className="flex items-center space-x-3">
                          <a
                            href={catalog.downloadUrl}
                            download
                            onClick={(e) => {
                              e.preventDefault()
                              handleDownload(catalog.downloadUrl, catalog.title)
                            }}
                            className={`flex-1 inline-flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r ${brand.gradient} text-white font-medium rounded-lg hover:opacity-90 transition-all duration-200 group-hover/card:shadow-lg ${isDownloaded(catalog.downloadUrl) ? 'opacity-75' : ''}`}
                          >
                            {isDownloaded(catalog.downloadUrl) ? (
                              <CheckCircleIcon className="h-5 w-5" />
                            ) : (
                              <ArrowDownTrayIcon className="h-5 w-5" />
                            )}
                            <span>{isDownloaded(catalog.downloadUrl) ? 'Downloaded' : 'Download Catalog'}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Need Technical Support?
          </h2>
          <p className="text-xl text-primary-100 mb-8 leading-relaxed">
            Our technical team is here to help you select the right products for your application. 
            Contact us for expert guidance and custom solutions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
            >
              Contact Technical Support
            </Link>
            <a
              href="tel:+16048170987"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors"
            >
              Call (604) 817-0987
            </a>
          </div>
        </div>
      </section>
    </div>
  )
} 