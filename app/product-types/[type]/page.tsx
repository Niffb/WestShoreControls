import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { 
  getPaginatedProductsByType,
  getProductTypeWithStats, 
  productTypes, 
  getProductTypeBreadcrumbs,
  shouldUsePaginationSync,
  getProductCountByType
} from '@/lib/utils/product-types'
import ProductsPageNew from '@/components/page/ProductsPageNew'
import { ProductImage } from '@/components/ui/OptimizedImage'
import ProgressiveProductGrid from '@/components/ui/ProgressiveProductGrid'

interface Props {
  params: {
    type: string
  }
  searchParams: {
    page?: string
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

    const typeWithStats = await getProductTypeWithStats(productType)
    
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

// Pagination component
function Pagination({ 
  currentPage, 
  totalPages, 
  hasNext, 
  hasPrev, 
  productType 
}: {
  currentPage: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
  productType: string
}) {
  const getPageUrl = (page: number) => `/product-types/${productType}?page=${page}`
  
  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      const start = Math.max(1, currentPage - 2)
      const end = Math.min(totalPages, start + maxVisible - 1)
      
      if (start > 1) {
        pages.push(1)
        if (start > 2) pages.push('...')
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      if (end < totalPages) {
        if (end < totalPages - 1) pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      {/* Previous button */}
      <Link
        href={getPageUrl(currentPage - 1)}
        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
          hasPrev
            ? 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
            : 'text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed'
        }`}
        {...(!hasPrev && { 'aria-disabled': true })}
      >
        <ChevronLeftIcon className="h-4 w-4 mr-1" />
        Previous
      </Link>

      {/* Page numbers */}
      <div className="flex space-x-1">
        {getPageNumbers().map((page, index) => (
          <span key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-gray-500">...</span>
            ) : (
              <Link
                href={getPageUrl(page as number)}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  page === currentPage
                    ? 'text-white bg-red-600 border border-red-600'
                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </Link>
            )}
          </span>
        ))}
      </div>

      {/* Next button */}
      <Link
        href={getPageUrl(currentPage + 1)}
        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
          hasNext
            ? 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
            : 'text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed'
        }`}
        {...(!hasNext && { 'aria-disabled': true })}
      >
        Next
        <ChevronRightIcon className="h-4 w-4 ml-1" />
      </Link>
    </div>
  )
}

// Loading skeleton for product grid
function ProductGridSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Custom ProductTypePageNew component that uses pagination for large categories
async function ProductTypePageNew({ productType, currentPage }: { productType: string; currentPage: number }) {
  let paginatedResult = { items: [], pagination: { page: 1, limit: 24, total: 0, totalPages: 0, hasNext: false, hasPrev: false } }
  let typeConfig = null
  let usePagination = false
  
  try {
    typeConfig = productTypes.find(type => type.slug === productType)
    usePagination = shouldUsePaginationSync(productType)
    
    if (usePagination) {
      paginatedResult = await getPaginatedProductsByType(productType, currentPage, 24)
    } else {
      // For smaller categories, get all products
      const allProducts = (await getPaginatedProductsByType(productType, 1, 1000)).items
      paginatedResult = {
        items: allProducts,
        pagination: {
          page: 1,
          limit: allProducts.length,
          total: allProducts.length,
          totalPages: 1,
          hasNext: false,
          hasPrev: false
        }
      }
    }
  } catch (error) {
    console.error('Error loading products for type:', productType, error)
    paginatedResult = { items: [], pagination: { page: 1, limit: 24, total: 0, totalPages: 0, hasNext: false, hasPrev: false } }
  }
  
  const { items: products, pagination } = paginatedResult
  
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
                <div className="text-3xl font-bold text-red-600">{pagination.total}</div>
                <div className="text-sm text-gray-600">Products Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">
                  {Array.from(new Set(products.map(p => p.brand))).length}
                </div>
                <div className="text-sm text-gray-600">Brands</div>
              </div>
              {usePagination && (
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">
                    {pagination.page} of {pagination.totalPages}
                  </div>
                  <div className="text-sm text-gray-600">Pages</div>
                </div>
              )}
            </div>
          </div>

          {/* Brand Filter Pills */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Brands</h3>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(products.map(p => p.brand)))
                .sort()
                .map((brand) => (
                  <span
                    key={brand}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800"
                  >
                    {brand}
                  </span>
                ))}
            </div>
          </div>

          {/* Product Grid with Progressive Loading */}
          {usePagination ? (
            // Use traditional pagination for very large categories
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden"
                >
                  <div className="aspect-square bg-gray-100 relative">
                    <ProductImage
                      src={product.images?.[0] || '/images/placeholder.jpg'}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.badge && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                        {product.badge}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-red-600">{product.brand}</span>
                      <span className="text-sm text-gray-500">{product.category}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    
                    {product.rating && (
                      <div className="flex items-center justify-end mb-3">
                        <div className="flex items-center">
                          <span className="text-yellow-400">★</span>
                          <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                        </div>
                      </div>
                    )}
                    
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
          ) : (
            // Use progressive loading for smaller categories
            <ProgressiveProductGrid
              products={products}
              initialCount={12}
              incrementCount={8}
              maxCount={100}
            />
          )}

          {/* Pagination */}
          {usePagination && (
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              hasNext={pagination.hasNext}
              hasPrev={pagination.hasPrev}
              productType={productType}
            />
          )}
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
    </div>
  )
}

// Main page component with error boundary
export default function ProductTypePage({ params, searchParams }: Props) {
  const currentPage = parseInt(searchParams.page || '1', 10)
  
  try {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-900/5 pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
            <ProductGridSkeleton />
          </div>
        </div>
      }>
        <ProductTypePageNew productType={params.type} currentPage={currentPage} />
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