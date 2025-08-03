import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowLeftIcon, StarIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import { getProductFamilyById } from '@/lib/utils/product-families'
import { getImageUrl } from '@/lib/config/image-config'

interface Props {
  params: {
    familyId: string
  }
}

// Generate metadata for each product family page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const family = getProductFamilyById(params.familyId)
    
    if (!family) {
      return {
        title: 'Product Family Not Found - Westshore Controls',
        description: 'The requested product family was not found.'
      }
    }
    
    return {
      title: `${family.name} | Westshore Controls - All Models & Specifications`,
      description: `${family.description} View all ${family.models.length} models with detailed specifications, features, and technical data.`,
      keywords: `${family.name.toLowerCase()}, ${family.brand.toLowerCase()}, specifications, models, technical data`,
      openGraph: {
        title: `${family.name} | Westshore Controls`,
        description: family.description,
        type: 'website',
        url: `https://westshorecontrols.com/product-families/${params.familyId}/`,
      },
      alternates: {
        canonical: `/product-families/${params.familyId}/`,
      },
    }
  } catch (error) {
    console.error('Error generating metadata for product family:', error)
    return {
      title: 'Product Family - Westshore Controls',
      description: 'Browse our product family with detailed specifications.'
    }
  }
}

// Product Family Detail Component
function ProductFamilyDetail({ familyId }: { familyId: string }) {
  const family = getProductFamilyById(familyId)
  
  if (!family) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-900/5 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Product Family Not Found
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              The requested product family could not be found.
            </p>
            <Link 
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <StarSolidIcon
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-900/5">
      {/* Breadcrumb Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 pt-24 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link 
              href="/" 
              className="text-gray-500 hover:text-red-600 transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link 
              href="/products"
              className="text-gray-500 hover:text-red-600 transition-colors flex items-center"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              Products
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-red-600 font-medium">{family.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            {/* Product Family Image */}
            <div className="relative">
              <div className="aspect-square bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                {family.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-600 text-white shadow-lg">
                      {family.badge}
                    </span>
                  </div>
                )}
                <img
                  src={getImageUrl(family.image)}
                  alt={family.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Product Family Info */}
            <div>
              <div className="mb-4">
                <span className="text-sm font-medium text-red-600 uppercase tracking-wide">
                  {family.brand}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {family.name}
              </h1>
              
              <p className="text-xl text-gray-600 mb-6">
                {family.description}
              </p>

              {/* Rating and Stats */}
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center">
                  <div className="flex items-center mr-2">
                    {renderStars(family.rating)}
                  </div>
                  <span className="text-sm text-gray-600">
                    {family.rating} ({family.reviews} reviews)
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{family.models.length}</span> models available
                </div>
                {family.inStock && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    In Stock
                  </span>
                )}
              </div>

              {/* Key Features */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {family.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-2 h-2 bg-red-600 rounded-full mt-2 mr-3"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Downloads */}
              {family.downloads && family.downloads.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Downloads</h3>
                  <div className="space-y-2">
                    {family.downloads.slice(0, 3).map((download, index) => (
                      <a
                        key={index}
                        href={download.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                        {download.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Specifications Overview */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {family.specs.map((spec, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-700">{spec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Models Table */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Models & Specifications</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Model
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Key Specifications
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {family.models.map((model, index) => (
                      <tr key={model.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 object-contain bg-gray-100 rounded-lg p-1"
                                src={getImageUrl(model.images && model.images.length > 0 ? model.images[0] : 'assets/images/products/westlogo.jpg')}
                                alt={model.name}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {model.model || model.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {model.brand}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs">
                            {model.description.length > 100 
                              ? `${model.description.substring(0, 100)}...`
                              : model.description
                            }
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-700">
                            {model.specs ? (
                              <ul className="space-y-1">
                                {model.specs.slice(0, 3).map((spec, specIndex) => (
                                  <li key={specIndex} className="text-xs">
                                    • {spec}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <span className="text-gray-400">No specs available</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <StarSolidIcon className="h-4 w-4 text-yellow-400 mr-1" />
                            <span className="text-sm text-gray-600">{model.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {model.inStock ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              In Stock
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Out of Stock
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center bg-gray-50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Need Help Choosing the Right Model?
            </h3>
            <p className="text-gray-600 mb-6">
              Our technical experts can help you select the perfect {family.name} model for your application.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              Contact Our Experts
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main page component
export default function ProductFamilyPage({ params }: Props) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-900/5 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading product family...</p>
          </div>
        </div>
      </div>
    }>
      <ProductFamilyDetail familyId={params.familyId} />
    </Suspense>
  )
}

// This would be used for static generation if needed
export async function generateStaticParams() {
  // For now, return empty array to use dynamic generation
  // In production, you might want to pre-generate popular families
  return []
} 