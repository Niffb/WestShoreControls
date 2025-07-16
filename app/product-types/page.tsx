import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { 
  BoltIcon, 
  CpuChipIcon, 
  PowerIcon, 
  WrenchScrewdriverIcon,
  LightBulbIcon,
  CogIcon,
  ShieldCheckIcon,
  ComputerDesktopIcon,
  LinkIcon,
  LockClosedIcon,
  RectangleStackIcon,
  ShieldExclamationIcon,
  HandRaisedIcon,
  PlayIcon,
  ArrowPathIcon,
  Battery0Icon,
  Squares2X2Icon
} from '@heroicons/react/24/outline'
import { getAllProductTypes, getFeaturedProductTypes } from '@/lib/utils/product-types'

export const metadata: Metadata = {
  title: 'Product Types | Westshore Controls - Find Products by Type',
  description: 'Browse all industrial products by type across all brands. Find circuit breakers, variable frequency drives, contactors, PLCs, and more from Mitsubishi, Noark, LS Industrial, and other leading manufacturers.',
  keywords: 'product types, industrial products, circuit breakers, variable frequency drives, contactors, PLCs, motor protection, electrical equipment',
  openGraph: {
    title: 'Product Types | Westshore Controls',
    description: 'Browse all industrial products by type across all brands',
    type: 'website',
    url: 'https://westshorecontrols.com/product-types/',
  },
  alternates: {
    canonical: '/product-types/',
  },
}

// Icon mapping
const iconMap: { [key: string]: any } = {
  'BoltIcon': BoltIcon,
  'CpuChipIcon': CpuChipIcon,
  'PowerIcon': PowerIcon,
  'WrenchScrewdriverIcon': WrenchScrewdriverIcon,
  'LightBulbIcon': LightBulbIcon,
  'CogIcon': CogIcon,
  'ShieldCheckIcon': ShieldCheckIcon,
  'ComputerDesktopIcon': ComputerDesktopIcon,
  'LinkIcon': LinkIcon,
  'LockClosedIcon': LockClosedIcon,
  'RectangleStackIcon': RectangleStackIcon,
  'CircuitBoardIcon': Squares2X2Icon,
  'ShieldExclamationIcon': ShieldExclamationIcon,
  'HandRaisedIcon': HandRaisedIcon,
  'PlayIcon': PlayIcon,
  'ArrowPathIcon': ArrowPathIcon,
  'BatteryIcon': Battery0Icon,
}

// Loading skeleton component
function ProductTypesSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gray-200 rounded-lg w-12 h-12"></div>
              <div className="text-right">
                <div className="h-4 bg-gray-200 rounded w-8 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-12"></div>
              </div>
            </div>
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Main content component
async function ProductTypesContent() {
  const featuredTypes = await getFeaturedProductTypes()
  const allTypes = await getAllProductTypes()
  const otherTypes = allTypes.filter(type => !type.featured)

  return (
    <>
      {/* Featured Product Types */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Product Types</h2>
          <p className="text-gray-600">Most popular product categories across all brands</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {featuredTypes.map((type) => {
            const IconComponent = iconMap[type.icon] || CogIcon
            return (
              <Link
                key={type.id}
                href={`/product-types/${type.slug}`}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-red-200"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                      <IconComponent className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{type.count}</div>
                      <div className="text-xs text-gray-500">products</div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    {type.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {type.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {type.brands.slice(0, 3).map((brand) => (
                        <span key={brand} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {brand}
                        </span>
                      ))}
                      {type.brands.length > 3 && (
                        <span className="text-xs text-gray-500">+{type.brands.length - 3} more</span>
                      )}
                    </div>
                    
                    <div className="text-red-600 group-hover:text-red-700 transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* All Product Types */}
        {otherTypes.length > 0 && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">All Product Types</h2>
              <p className="text-gray-600">Complete list of all available product categories</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherTypes.map((type) => {
                const IconComponent = iconMap[type.icon] || CogIcon
                return (
                  <Link
                    key={type.id}
                    href={`/product-types/${type.slug}`}
                    className="group flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-red-200"
                  >
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-red-100 transition-colors mr-4">
                      <IconComponent className="h-5 w-5 text-gray-600 group-hover:text-red-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 group-hover:text-red-600 transition-colors">
                        {type.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {type.count} products from {type.brands.length} brands
                      </p>
                    </div>
                    
                    <div className="text-gray-400 group-hover:text-red-600 transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </Link>
                )
              })}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default function ProductTypesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-900/5">
      {/* Hero Section */}
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
              Browse by <span className="text-red-600">Product Type</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Find products by type across all brands. Search for specific product categories 
              without needing to know the exact manufacturer.
            </p>
          </div>
        </div>
      </div>

      {/* Content with Suspense */}
      <Suspense fallback={<ProductTypesSkeleton />}>
        <ProductTypesContent />
      </Suspense>

      {/* Benefits Section */}
      <div className="bg-white/60 backdrop-blur-sm py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Browse by Product Type?</h2>
            <p className="mt-4 text-lg text-gray-600">
              Find exactly what you need without knowing the specific brand
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <CogIcon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Cross-Brand Comparison</h3>
              <p className="text-gray-600">
                Compare products from different manufacturers in one place to find the best solution for your needs.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <BoltIcon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Faster Product Discovery</h3>
              <p className="text-gray-600">
                Skip the brand research and go straight to the product type you need for your application.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheckIcon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Assurance</h3>
              <p className="text-gray-600">
                All products are sourced from trusted manufacturers and meet industry standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 