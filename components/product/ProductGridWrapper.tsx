'use client'

import { useState, useEffect } from 'react'
import ProductGrid from './ProductGrid'
import { Product } from '@/lib/types/shared-types'

interface ProductGridWrapperProps {
  categorySlug: string
  categoryName: string
}

export default function ProductGridWrapper({ categorySlug, categoryName }: ProductGridWrapperProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        const response = await fetch(`/api/products/${categorySlug}`)
        if (!response.ok) {
          throw new Error('Failed to load products')
        }
        const data = await response.json()
        // Filter out products that only have the default West Shore logo as their image
        const filteredProducts = (data.products || []).filter((product: Product) => {
          const hasDefaultLogo = product.images?.length === 1 &&
            (product.images[0] === '/images/westlogo.jpg' ||
              product.images[0]?.includes('westlogo'))
          return !hasDefaultLogo
        })
        setProducts(filteredProducts)
      } catch (err) {
        console.error('Error loading products:', err)
        setError('Failed to load products')
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [categorySlug])

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Products</h2>
          <p className="text-lg text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading products...</p>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Products Coming Soon
          </h2>

          <p className="text-lg text-gray-600 mb-8">
            We're currently building our {categoryName.toLowerCase()} catalog.
            Our product database will be populated with high-quality products from leading manufacturers.
          </p>

          <div className="bg-red-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-red-900 mb-2">
              What to Expect:
            </h3>
            <ul className="text-left text-red-800 space-y-2">
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                Comprehensive product specifications and datasheets
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                High-resolution product images and technical drawings
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                Real-time inventory and pricing information
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                Advanced filtering and search capabilities
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Category Stats */}
      <div className="mb-8 bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Available Products
            </h2>
            <p className="text-gray-600">
              {products.length} products available in {categoryName}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{products.length}</div>
              <div className="text-sm text-gray-600">Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {products.filter(p => p.inStock).length}
              </div>
              <div className="text-sm text-gray-600">In Stock</div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <ProductGrid products={products} categoryName={categoryName} />
    </>
  )
}
