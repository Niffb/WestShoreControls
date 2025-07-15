import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { 
  getProductsByType, 
  getProductTypeWithStats, 
  productTypes, 
  getProductTypeBreadcrumbs 
} from '@/lib/utils/product-types'
import ProductsPageNew from '@/components/page/ProductsPageNew'
import { ProductImage } from '@/components/ui/OptimizedImage'

interface Props {
  params: {
    type: string
  }
}

// Generate metadata for each product type page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const productType = productTypes.find(type => type.slug === params.type)
    
    if (!productType) {
      return {
        title: 'Product Type Not Found - Westshore Controls',
        description: 'The requested product type was not found. Browse our available product types.'
      }
    }

    const typeWithStats = getProductTypeWithStats(productType)
    
    return {
      title: `${productType.name} | Westshore Controls - All Brands`,
      description: `${productType.description} Browse ${typeWithStats.count} products from ${typeWithStats.brands.join(', ')} and other leading manufacturers.`,
      keywords: `${productType.name.toLowerCase()}, ${typeWithStats.brands.join(', ').toLowerCase()}, industrial equipment, electrical products`,
      openGraph: {
        title: `${productType.name} | Westshore Controls`,
        description: productType.description,
        type: 'website',
        url: `https://westshorecontrols.com/product-types/${params.type}/`,
      },
      alternates: {
        canonical: `/product-types/${params.type}/`,
      },
    }
  } catch (error) {
    console.error('Error generating metadata for product type:', error)
    return {
      title: 'Product Type - Westshore Controls',
      description: 'Browse our electrical and industrial products by type.'
    }
  }
}

// Custom ProductTypePageNew component that uses ProductsPageNew but with type-specific filtering
function ProductTypePageNew({ productType }: { productType: string }) {
  let products = []
  let typeConfig = null
  
  try {
    products = getProductsByType(productType)
    typeConfig = productTypes.find(type => type.slug === productType)
  } catch (error) {
    console.error('Error loading products for type:', productType, error)
    products = []
  }
  
  if (!typeConfig || products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-900/5 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              No {typeConfig?.name || 'Products'} Found
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              We don't currently have any products in this category.
            </p>
            <Link 
              href="/product-types"
              className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Browse All Product Types
            </Link>
          </div>
        </div>
      </div>
    )
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
              href="/product-types"
              className="text-gray-500 hover:text-red-600 transition-colors flex items-center"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              Product Types
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-red-600 font-medium">{typeConfig.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              {typeConfig.name}
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              {typeConfig.description}
            </p>
            
            {/* Stats */}
            <div className="mt-8 flex justify-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{products.length}</div>
                <div className="text-sm text-gray-600">Products Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">
                  {Array.from(new Set(products.map(p => p.brand))).length}
                </div>
                <div className="text-sm text-gray-600">Brands</div>
              </div>
            </div>
          </div>

          {/* Brand Filter Pills */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              {Array.from(new Set(products.map(p => p.brand))).sort().map((brand) => (
                <span
                  key={brand}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  {brand}
                  <span className="ml-2 text-xs bg-gray-300 text-gray-700 px-2 py-0.5 rounded-full">
                    {products.filter(p => p.brand === brand).length}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid - Use existing ProductsPageNew component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                {product.images && product.images.length > 0 ? (
                  <ProductImage
                    src={product.images[0]}
                    alt={product.name}
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {product.brand}
                  </span>
                  {product.badge && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {product.badge}
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {product.description}
                </p>
                
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
                
                <div className="mt-4">
                  <Link 
                    href={product.url || '#'} 
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                  >
                    View Details
                    <svg className="ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Product Types */}
      <div className="bg-white/60 backdrop-blur-sm mt-16 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Related Product Types</h2>
            <p className="mt-4 text-lg text-gray-600">
              You might also be interested in these product categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productTypes
              .filter(type => type.slug !== productType && type.featured)
              .slice(0, 6)
              .map((type) => (
                <Link
                  key={type.id}
                  href={`/product-types/${type.slug}`}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100"
                >
                  <div className="text-center">
                    <div className="text-red-600 mb-4">
                      <div className="w-12 h-12 mx-auto bg-red-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">⚡</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                      {type.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {type.description}
                    </p>
                    <div className="text-sm text-red-600 font-medium">
                      Explore Products →
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Main page component with error boundary
export default function ProductTypePage({ params }: Props) {
  try {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-900/5 pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          </div>
        </div>
      }>
        <ProductTypePageNew productType={params.type} />
      </Suspense>
    )
  } catch (error) {
    console.error('Error rendering product type page:', error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-900/5 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Something went wrong
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              We're having trouble loading this product type. Please try again later.
            </p>
            <Link 
              href="/product-types"
              className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Browse All Product Types
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

// Generate static params for all product types
export async function generateStaticParams() {
  try {
    return productTypes.map((type) => ({
      type: type.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
} 