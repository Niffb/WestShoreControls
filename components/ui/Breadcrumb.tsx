'use client'

import Link from 'next/link'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline'

export interface BreadcrumbItem {
  name: string
  href: string
  current?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  // Generate structured data for breadcrumbs
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://westshorecontrols.com"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.name,
        "item": `https://westshorecontrols.com${item.href}`
      }))
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <nav 
        className="flex bg-white/80 backdrop-blur-sm border-b border-gray-200" 
        aria-label="Breadcrumb"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 py-3">
            {/* Home Link */}
            <li>
              <div className="flex items-center">
                <Link 
                  href="/" 
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center"
                  aria-label="Home"
                >
                  <HomeIcon className="h-4 w-4" aria-hidden="true" />
                  <span className="ml-1 text-sm font-medium">Home</span>
                </Link>
              </div>
            </li>

            {/* Dynamic Breadcrumb Items */}
            {items.map((item, index) => (
              <li key={item.href}>
                <div className="flex items-center">
                  <ChevronRightIcon 
                    className="h-4 w-4 text-gray-400 flex-shrink-0" 
                    aria-hidden="true" 
                  />
                  {item.current ? (
                    <span 
                      className="ml-2 text-sm font-medium text-gray-900"
                      aria-current="page"
                    >
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  )
} 