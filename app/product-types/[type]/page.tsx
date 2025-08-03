import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { 
  getPaginatedProductsByType,
  getProductTypeWithStats, 
  productTypes, 
  shouldUsePaginationSync
} from '@/lib/utils/product-types'
import { getVFDProductFamilies, getCircuitBreakerProductFamilies, getProductFamiliesForCategory } from '@/lib/utils/product-families'
import { ProductTypeDetailPage } from '@/components/page'

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
  let shouldShowFamilies = false
  
  try {
    typeConfig = productTypes.find(type => type.slug === productType)
    usePagination = shouldUsePaginationSync(productType)
    
    // Check if this product type should show families instead of individual products
    // All product types should show families now
    shouldShowFamilies = true
    
    if (shouldShowFamilies) {
      // Get product families for this category
      const categoryName = typeConfig?.category || ''
      let families = []
      
      if (productType === 'variable-frequency-drives') {
        families = getVFDProductFamilies()
      } else if (productType === 'circuit-breakers') {
        families = getCircuitBreakerProductFamilies()
      } else {
        // Use the general product families function for all other categories
        families = getProductFamiliesForCategory(categoryName)
      }
      
      console.log(`Loading ${families.length} product families for ${productType} (category: ${categoryName})`)
      
      paginatedResult = {
        items: families,
        pagination: {
          page: 1,
          limit: families.length,
          total: families.length,
          totalPages: 1,
          hasNext: false,
          hasPrev: false
        }
      }
    } else if (usePagination) {
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
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Browse All Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  let typeWithStats = await getProductTypeWithStats(typeConfig)

  // If showing families, update stats to reflect family data
  if (shouldShowFamilies && products.length > 0) {
    const totalModels = products.reduce((sum, family) => sum + (family.models?.length || 0), 0)
    const brandSet = new Set(products.map(family => family.brand))
    const familyBrands = Array.from(brandSet)
    
    typeWithStats = {
      ...typeWithStats,
      count: totalModels,
      brands: familyBrands
    }
    
    console.log(`Updated stats for ${productType}: ${totalModels} models across ${familyBrands.length} brands`)
  }

  return (
    <ProductTypeDetailPage
      productType={typeWithStats}
      products={products}
      usePagination={usePagination}
      pagination={pagination}
    />
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
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Browse All Products
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