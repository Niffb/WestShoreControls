'use client'

import { useState, useEffect, useCallback } from 'react'
import { HomeIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Product } from '@/lib/types/shared-types'

// Dynamic imports for components that use heavy icons or large logic
const DynamicProductGrid = dynamic(() => import('@/components/product/DynamicProductGrid'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-50 rounded-lg"></div>,
  ssr: true
})

const ProductDetailsModal = dynamic(() => import('@/components/product/ProductDetailsModal'), {
  ssr: false
})

interface ProductsPageNewProps {
  selectedBrand?: string
  selectedCategory?: string
  selectedSubcategory?: string
  initialProducts?: Product[]
}

export default function ProductsPageNew({
  selectedBrand,
  selectedCategory,
  selectedSubcategory,
  initialProducts = []
}: ProductsPageNewProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts)
  const [isLoading, setIsLoading] = useState(initialProducts.length === 0)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleProductClick = useCallback((product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }, [])

  // Update filtered products when initialProducts change
  useEffect(() => {
    if (initialProducts.length > 0) {
      setFilteredProducts(initialProducts)
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }, [initialProducts])

  const getBreadcrumbs = () => {
    const breadcrumbs = [
      { name: 'Home', href: '/' },
      { name: 'Brands', href: '/brands' }
    ]

    if (selectedBrand) {
      breadcrumbs.push({
        name: selectedBrand,
        href: `/${selectedBrand.toLowerCase().replace(/\s+/g, '-')}`
      })
    }

    if (selectedCategory) {
      breadcrumbs.push({
        name: selectedCategory,
        href: `/${selectedBrand?.toLowerCase().replace(/\s+/g, '-')}/${selectedCategory.toLowerCase().replace(/\s+/g, '-')}`
      })
    }

    if (selectedSubcategory) {
      breadcrumbs.push({
        name: selectedSubcategory,
        href: '#'
      })
    }

    return breadcrumbs
  }

  const getPageTitle = () => {
    if (selectedSubcategory) {
      return `${selectedBrand} ${selectedSubcategory}`
    }
    if (selectedCategory) {
      return `${selectedBrand} ${selectedCategory}`
    }
    if (selectedBrand) {
      return `${selectedBrand} Products`
    }
    return 'Products'
  }

  const getPageDescription = () => {
    if (selectedSubcategory) {
      return `Browse ${selectedBrand} ${selectedSubcategory} products`
    }
    if (selectedCategory) {
      return `Browse ${selectedBrand} ${selectedCategory} products`
    }
    if (selectedBrand) {
      return `Browse all ${selectedBrand} products and solutions`
    }
    return 'Browse our complete product catalog'
  }

  const breadcrumbs = getBreadcrumbs()

  if (isLoading && initialProducts.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="border-b border-gray-100 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-48"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse mb-3 w-72"></div>
            <div className="h-5 bg-gray-200 rounded animate-pulse w-96"></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="h-44 bg-gray-100 animate-pulse"></div>
                <div className="p-5">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="border-b border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="flex items-center space-x-2 text-sm mb-4" aria-label="Breadcrumb">
            {breadcrumbs.map((breadcrumb, index) => (
              <span key={breadcrumb.name} className="inline-flex items-center">
                {index > 0 && (
                  <ChevronRightIcon className="w-4 h-4 text-gray-400 mr-2" />
                )}
                {index === 0 ? (
                  <Link
                    href={breadcrumb.href}
                    className="text-gray-500 hover:text-gray-700 flex items-center"
                  >
                    <HomeIcon className="w-4 h-4 mr-1" />
                    {breadcrumb.name}
                  </Link>
                ) : index === breadcrumbs.length - 1 ? (
                  <span className="text-gray-900 font-medium">
                    {breadcrumb.name}
                  </span>
                ) : (
                  <Link
                    href={breadcrumb.href}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {breadcrumb.name}
                  </Link>
                )}
              </span>
            ))}
          </nav>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {getPageTitle()}
          </h1>
          <p className="mt-2 text-gray-600 max-w-3xl">
            {getPageDescription()}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DynamicProductGrid
            products={filteredProducts}
            onProductClick={handleProductClick}
            enablePagination={true}
            itemsPerPage={24}
            showSearch={true}
            searchPlaceholder={`Search ${selectedBrand || ''} products...`}
          />
        </div>
      </section>

      <ProductDetailsModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}
