'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import DynamicProductGrid from '@/components/product/DynamicProductGrid'
import ProductDetailsModal from '@/components/product/ProductDetailsModal'
import { Product } from '@/lib/types/shared-types'
import { cleanProductsWithMitsubishi } from '@/lib/products/products'

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
      let products = cleanProductsWithMitsubishi

      if (selectedBrand) {
        products = products.filter(product => 
          product.brand?.toLowerCase() === selectedBrand.toLowerCase()
        )
      }

      if (selectedCategory) {
        products = products.filter(product => 
          product.category?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          product.subcategory?.toLowerCase().includes(selectedCategory.toLowerCase())
        )
      }

      if (selectedSubcategory) {
        products = products.filter(product => 
          product.subcategory?.toLowerCase().includes(selectedSubcategory.toLowerCase())
        )
      }

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-900/5">
        <div className="pt-24 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-6 bg-gray-200 rounded animate-pulse mb-4 w-64"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse mb-4 w-96"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse w-80"></div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-900/5">
      {/* Hero Section */}
      <section className="relative pt-24 pb-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-200/30 to-red-800/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-800/30 to-red-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              {breadcrumbs.map((breadcrumb, index) => (
                <li key={breadcrumb.name} className="inline-flex items-center">
                  {index > 0 && (
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {index === breadcrumbs.length - 1 ? (
                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                      {breadcrumb.name}
                    </span>
                  ) : (
                    <Link
                      href={breadcrumb.href}
                      className="ml-1 text-sm font-medium text-gray-700 hover:text-red-600 md:ml-2"
                    >
                      {breadcrumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* Back Button */}
          {breadcrumbs.length > 2 && (
            <Link
              href={breadcrumbs[breadcrumbs.length - 2].href}
              className="inline-flex items-center text-sm text-gray-600 hover:text-red-600 mb-4 transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              Back to {breadcrumbs[breadcrumbs.length - 2].name}
            </Link>
          )}

          {/* Page Title */}
          <motion.h1 
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {getPageTitle()}
          </motion.h1>

          <motion.p 
            className="text-xl text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {getPageDescription()}
          </motion.p>

          {/* Product Count */}
          <motion.div 
            className="flex items-center bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg inline-flex"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="font-medium text-gray-700">
              {filteredProducts.length} Products Found
            </span>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <DynamicProductGrid
          products={filteredProducts}
          onProductClick={handleProductClick}
          enablePagination={true}
          itemsPerPage={24}
          showSearch={true}
          searchPlaceholder={`Search ${selectedBrand || ''} products...`}
        />
      </section>

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}
