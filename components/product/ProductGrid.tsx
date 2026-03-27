'use client'

import { useState, useMemo, useCallback } from 'react'
import Image from 'next/image'
import { Product } from '@/lib/types/shared-types'
import ProductDetailsModal from './ProductDetailsModal'
import PaginatedProductGrid from '@/components/ui/PaginatedProductGrid'
import { EyeIcon } from '@heroicons/react/24/outline'

interface ProductGridProps {
  products: Product[]
  categoryName: string
}

export default function ProductGrid({ products, categoryName }: ProductGridProps) {
  const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({})
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleImageError = useCallback((productId: number) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }))
  }, [])

  const handleProductClick = useCallback((product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }, [])

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      const nameA = (a.name || '').toLowerCase()
      const nameB = (b.name || '').toLowerCase()
      return nameA.localeCompare(nameB)
    })
  }, [products])

  const renderProductCard = useCallback((product: Product, index: number) => (
    <button
      type="button"
      onClick={() => handleProductClick(product)}
      className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow text-left w-full flex flex-col"
    >
      <div className="relative h-44 bg-gray-50 flex items-center justify-center overflow-hidden">
        {!imageErrors[product.id] ? (
          <Image
            src={product.images?.[0] || '/images/westlogo.jpg'}
            alt={product.name || 'Product image'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-contain p-4"
            onError={() => handleImageError(product.id)}
          />
        ) : (
          <Image
            src="/images/westlogo.jpg"
            alt="West Shore Controls"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-contain p-4"
          />
        )}
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {product.name || 'Unnamed Product'}
        </h3>
        <p className="text-sm text-gray-500 mb-3 flex-grow line-clamp-2">
          {product.description || 'No description available'}
        </p>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600">
          <EyeIcon className="w-4 h-4" />
          View Details
        </span>
      </div>
    </button>
  ), [imageErrors, handleImageError, handleProductClick])

  return (
    <div>
      <PaginatedProductGrid
        products={sortedProducts}
        onProductClick={handleProductClick}
        itemsPerPage={12}
        searchPlaceholder={`Search ${categoryName} products...`}
        showSearch={true}
        renderProduct={renderProductCard}
      />

      <ProductDetailsModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}
