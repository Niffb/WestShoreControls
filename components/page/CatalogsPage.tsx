'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { getImageUrl } from '@/lib/config/image-config'

interface Catalog {
  title: string
  description: string
  pages: number
  downloadUrl: string
}

interface CatalogBrand {
  brand: string
  logo: string
  catalogs: Catalog[]
}

function catalogLinkProps(url: string, title: string) {
  const safeFilename =
    title
      .replace(/[^a-z0-9]+/gi, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase()
      .slice(0, 72) || 'catalog'

  if (url.startsWith('/api/catalog-download')) {
    return {
      title: 'Download PDF through Westshore Controls',
      download: `${safeFilename}.pdf`,
    }
  }

  return {
    target: '_blank' as const,
    rel: 'noopener noreferrer' as const,
    title: 'Opens partner site in a new tab',
  }
}

function linkMeta(url: string) {
  if (url.startsWith('/api/catalog-download')) return 'PDF download'
  return 'Partner site · new tab'
}

const catalogs: CatalogBrand[] = [
  {
    brand: 'LS Industrial',
    logo: getImageUrl('brands/LS.webp'),
    catalogs: [
      {
        title: 'Manuals, catalogs & downloads',
        description: 'Official LS Electric Americas hub for manuals, catalogs, certificates, software, and technical data.',
        pages: 0,
        downloadUrl: 'https://www.lselectricamerica.com/manual/',
      },
    ],
  },
  {
    brand: 'Mitsubishi Electric',
    logo: getImageUrl('brands/MitsubishiLogo.webp'),
    catalogs: [
      {
        title: 'LES Product Catalogue',
        description: 'Industrial automation and motor drives (online viewer).',
        pages: 466,
        downloadUrl: 'https://library.mitsubishielectric.co.uk/pdf/book/LES_Product_Catalogue#page-1',
      },
    ],
  },
  {
    brand: 'TMEIC',
    logo: getImageUrl('brands/TMEIC_logo.png'),
    catalogs: [
      {
        title: 'TMdrive MVe2 application guide',
        description: 'Medium-voltage multilevel IGBT drive reference.',
        pages: 0,
        downloadUrl: '/api/catalog-download?id=tmeic-mve2-app-guide',
      },
    ],
  },
  {
    brand: 'ERICO',
    logo: getImageUrl('brands/Erico.webp'),
    catalogs: [
      {
        title: 'Resource library',
        description: 'Grounding, bonding, and electrical infrastructure downloads.',
        pages: 0,
        downloadUrl: 'https://www.nvent.com/en-us/erico/resource-library',
      },
    ],
  },
  {
    brand: 'Noark',
    logo: getImageUrl('brands/Noark.webp'),
    catalogs: [
      {
        title: 'Master catalogs & downloads',
        description: 'Circuit breakers, contactors, motor protection, and switchboards.',
        pages: 0,
        downloadUrl: 'https://na.noark-electric.com/master-catalogs/',
      },
    ],
  },
  {
    brand: 'Klemsan',
    logo: getImageUrl('brands/klemsan-logo.webp'),
    catalogs: [
      {
        title: 'Automation components',
        description: 'Relays, power supplies, terminal blocks, and automation catalogs.',
        pages: 0,
        downloadUrl: 'https://www.klemsan.com.tr/documents-and-videos',
      },
      {
        title: 'Accessories & connection solutions',
        description: 'Marking, installation tools, and wiring ducts.',
        pages: 0,
        downloadUrl: 'https://www.klemsan.com.tr/documents-and-videos',
      },
    ],
  },
  {
    brand: 'Katko',
    logo: getImageUrl('brands/Katko.webp'),
    catalogs: [
      {
        title: 'IsoSafe catalogue',
        description: 'Enclosed isolating switches.',
        pages: 0,
        downloadUrl: '/api/catalog-download?id=katko-isosafe',
      },
      {
        title: 'LoadSafe catalogue',
        description: 'Load-break switches and disconnects.',
        pages: 0,
        downloadUrl: '/api/catalog-download?id=katko-loadsafe',
      },
      {
        title: 'ConnectSafe catalogue',
        description: 'Connectors and terminal blocks.',
        pages: 0,
        downloadUrl: '/api/catalog-download?id=katko-connectsafe',
      },
      {
        title: 'All downloads & certificates',
        description: 'Brochures, UL/CSA docs, and certificates on Katko’s site.',
        pages: 0,
        downloadUrl: 'https://katko.com/pages/downloads',
      },
    ],
  },
  {
    brand: 'Elsteel',
    logo: getImageUrl('brands/Elsteel.webp'),
    catalogs: [
      {
        title: 'Techno Module brochure',
        description: '200mm grid modular system for panel builders.',
        pages: 0,
        downloadUrl: '/api/catalog-download?id=elsteel-techno-module',
      },
      {
        title: 'Techno Module Light brochure',
        description: 'Compact Techno Module line.',
        pages: 0,
        downloadUrl: '/api/catalog-download?id=elsteel-techno-module-light',
      },
      {
        title: 'Box brochure',
        description: 'Steel and stainless boxes and terminal enclosures.',
        pages: 0,
        downloadUrl: '/api/catalog-download?id=elsteel-box',
      },
      {
        title: 'Special enclosures',
        description: 'Custom enclosure solutions.',
        pages: 0,
        downloadUrl: '/api/catalog-download?id=elsteel-special-enclosures',
      },
      {
        title: 'Plug & Power solutions',
        description: 'Modular plug and power distribution.',
        pages: 0,
        downloadUrl: '/api/catalog-download?id=elsteel-plug-power',
      },
      {
        title: '19" Super Frame brochure',
        description: 'Telecom, data, and UPS applications.',
        pages: 0,
        downloadUrl: '/api/catalog-download?id=elsteel-19-super-frame',
      },
    ],
  },
]

export default function CatalogsPageComponent() {
  return (
    <div className="bg-white min-h-screen">
      <section className="border-b border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Product <span className="text-gray-700">Catalogs</span>
          </h1>
          <p className="mt-2 text-gray-600 max-w-2xl">
            PDFs download through our site where available. Other entries link to the manufacturer’s library in a new tab.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="divide-y divide-gray-200">
            {catalogs.map((brand) => (
              <div key={brand.brand} className="py-10 first:pt-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative h-10 w-10 shrink-0">
                    <Image
                      src={brand.logo}
                      alt={`${brand.brand} logo`}
                      fill
                      className="object-contain"
                      sizes="40px"
                    />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">{brand.brand}</h2>
                </div>
                <ul className="space-y-0 border-t border-gray-100">
                  {brand.catalogs.map((catalog, index) => (
                    <li key={`${catalog.title}-${index}`}>
                      <a
                        href={catalog.downloadUrl}
                        {...catalogLinkProps(catalog.downloadUrl, catalog.title)}
                        className="group flex items-start justify-between gap-4 py-4 border-b border-gray-100 last:border-b-0 text-left w-full"
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block font-medium text-gray-900 group-hover:text-gray-700">
                            {catalog.title}
                          </span>
                          <span className="mt-0.5 block text-sm text-gray-500">
                            {catalog.description}
                            {catalog.pages > 0 && (
                              <span className="text-gray-400"> · {catalog.pages} pages</span>
                            )}
                          </span>
                          <span className="mt-1 block text-xs text-gray-400">
                            {linkMeta(catalog.downloadUrl)}
                          </span>
                        </span>
                        <ChevronRightIcon
                          className="h-5 w-5 shrink-0 text-gray-300 group-hover:text-gray-500 mt-0.5"
                          aria-hidden
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-gray-500">
            Need help choosing a catalog or product?{' '}
            <Link href="/contact" className="text-gray-700 underline underline-offset-2 hover:no-underline">
              Contact us
            </Link>{' '}
            or call{' '}
            <a
              href="tel:+16048170987"
              className="text-gray-700 underline underline-offset-2 hover:no-underline"
            >
              (604) 817-0987
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  )
}
