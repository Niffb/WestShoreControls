'use client'

import { useState, useEffect, useCallback } from 'react'
import { HomeIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import DynamicProductGrid from '@/components/product/DynamicProductGrid'
import ProductDetailsModal from '@/components/product/ProductDetailsModal'
import { Product } from '@/lib/types/shared-types'
import { cleanProductsWithMitsubishi } from '@/lib/products/products'
import { tmeicProducts as tmeicProductsScraped } from '@/lib/products/tmeic-products-scraped'
import { katkoProducts as katkoProductsScraped } from '@/lib/products/katko-products-scraped'
import { lsIndustrialScraped } from '@/lib/products/ls-industrial-scraped'
import { noarkScrapedProducts } from '@/lib/products/noark-products-scraped'
import { klemsanScrapedProducts } from '@/lib/products/klemsan-products-scraped'
import { elsteelScrapedProducts } from '@/lib/products/elsteel-products-scraped'

interface ProductsPageNewProps {
  selectedBrand?: string
  selectedCategory?: string
  selectedSubcategory?: string
}

export default function ProductsPageNew({
  selectedBrand,
  selectedCategory,
  selectedSubcategory
}: ProductsPageNewProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
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

  useEffect(() => {
    const filterProducts = () => {
      // Use scraped products for TMEIC, Katko, LS Industrial, and Noark brands, otherwise use cleanProductsWithMitsubishi
      let products: Product[] = selectedBrand?.toLowerCase() === 'tmeic'
        ? tmeicProductsScraped
        : selectedBrand?.toLowerCase() === 'katko'
          ? katkoProductsScraped
          : selectedBrand?.toLowerCase() === 'ls industrial'
            ? lsIndustrialScraped
            : selectedBrand?.toLowerCase() === 'noark'
              ? noarkScrapedProducts
              : selectedBrand?.toLowerCase() === 'klemsan'
                ? klemsanScrapedProducts
                : selectedBrand?.toLowerCase() === 'elsteel'
                  ? elsteelScrapedProducts
                  : cleanProductsWithMitsubishi

      if (selectedBrand && 
          selectedBrand.toLowerCase() !== 'tmeic' && 
          selectedBrand.toLowerCase() !== 'katko' &&
          selectedBrand.toLowerCase() !== 'ls industrial' &&
          selectedBrand.toLowerCase() !== 'noark' &&
          selectedBrand.toLowerCase() !== 'klemsan' &&
          selectedBrand.toLowerCase() !== 'elsteel') {
        products = products.filter(product =>
          product.brand?.toLowerCase() === selectedBrand.toLowerCase()
        )
      }

      if (selectedCategory) {
        // Normalize category name for flexible matching
        const normalizedSelectedCategory = selectedCategory.toLowerCase()

        // For TMEIC, Katko, LS Industrial, Noark, and Klemsan brands, use exact category matching
        if (selectedBrand?.toLowerCase() === 'tmeic' || 
            selectedBrand?.toLowerCase() === 'katko' ||
            selectedBrand?.toLowerCase() === 'ls industrial' ||
            selectedBrand?.toLowerCase() === 'noark' ||
            selectedBrand?.toLowerCase() === 'klemsan' ||
            selectedBrand?.toLowerCase() === 'elsteel') {
          products = products.filter(product => {
            const productCategory = product.category?.toLowerCase() || ''
            const productSubcategory = (product as any).subcategory?.toLowerCase() || ''
            return productCategory === normalizedSelectedCategory || 
                   productSubcategory === normalizedSelectedCategory
          })
        } else {
          // Create variations of the category name for matching
          const categoryVariations = [
            normalizedSelectedCategory,
            normalizedSelectedCategory.replace(/-/g, ' '),
            normalizedSelectedCategory.replace(/\s+/g, '-'),
            // Handle common variations
            normalizedSelectedCategory === 'variable frequency drives' ? 'vfds' : '',
            normalizedSelectedCategory === 'programmable logic controllers' ? 'plcs' : '',
            normalizedSelectedCategory === 'circuit breakers' ? 'circuit protection' : '',
          ].filter(Boolean)

          products = products.filter(product => {
            const productCategory = product.category?.toLowerCase() || ''
            const productSubcategory = (product as any).subcategory?.toLowerCase() || ''

            return categoryVariations.some(variation =>
              productCategory.includes(variation) ||
              variation.includes(productCategory) ||
              productSubcategory.includes(variation) ||
              variation.includes(productSubcategory)
            )
          })
        }
      }

      if (selectedSubcategory) {
        products = products.filter(product =>
          (product as any).subcategory?.toLowerCase().includes(selectedSubcategory.toLowerCase())
        )
      }

      // Filter out products that only have the default West Shore logo as their image
      products = products.filter(product => {
        const hasDefaultLogo = product.images?.length === 1 &&
          (product.images[0] === '/images/westlogo.jpg' ||
            product.images[0]?.includes('westlogo'))
        return !hasDefaultLogo
      })

      setFilteredProducts(products)
      setIsLoading(false)
    }

    filterProducts()
  }, [selectedBrand, selectedCategory, selectedSubcategory])

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

  if (isLoading) {
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
          {filteredProducts.length > 0 && (
            <p className="mt-2 text-sm text-gray-500">
              {filteredProducts.length} products available
            </p>
          )}
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
