'use client'

import { useState, useMemo, useCallback } from 'react'
import Image from 'next/image'
import { Product } from '@/lib/types/shared-types'
import ProductDetailsModal from './ProductDetailsModal'
import PaginatedProductGrid from '@/components/ui/PaginatedProductGrid'
import { 
  EyeIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline'

interface ProductGridProps {
  products: Product[]
  categoryName: string
}

export default function ProductGrid({ products, categoryName }: ProductGridProps) {
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'inStock'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [showInStockOnly, setShowInStockOnly] = useState(false)
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

  // Apply sorting and filtering (but not search - that's handled by PaginatedProductGrid)
  const sortedAndFilteredProducts = useMemo(() => {
    let filtered = [...products]

    // Debug: Check for products with undefined/invalid data
    const productsWithUndefinedNames = filtered.filter(p => !p.name)
    const productsWithUndefinedImages = filtered.filter(p => !p.images || !Array.isArray(p.images) || p.images.length === 0)
    
    if (productsWithUndefinedNames.length > 0) {
      console.warn(`Found ${productsWithUndefinedNames.length} products with undefined names:`, 
        productsWithUndefinedNames.map(p => ({ id: p.id, model: p.model, brand: p.brand })))
    }
    
    if (productsWithUndefinedImages.length > 0) {
      console.warn(`Found ${productsWithUndefinedImages.length} products with undefined/empty images:`, 
        productsWithUndefinedImages.map(p => ({ id: p.id, name: p.name, model: p.model, brand: p.brand })))
    }

    // Apply in-stock filter
    if (showInStockOnly) {
      filtered = filtered.filter(product => product.inStock)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let compareA: any
      let compareB: any

      if (sortBy === 'price') {
        compareA = a.price ?? 0
        compareB = b.price ?? 0
      } else if (sortBy === 'inStock') {
        compareA = a.inStock ? 0 : 1
        compareB = b.inStock ? 0 : 1
      } else { // name
        compareA = (a.name || '').toLowerCase()
        compareB = (b.name || '').toLowerCase()
      }

      if (compareA < compareB) return sortOrder === 'asc' ? -1 : 1
      if (compareA > compareB) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }, [products, sortBy, sortOrder, showInStockOnly])

  const toggleSortOrder = useCallback(() => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))
  }, [])

  // Render individual product card
  const renderProductCard = useCallback((product: Product, index: number) => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col">
      <div className="relative h-48 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
        {!imageErrors[product.id] ? (
          <Image
            src={product.images?.[0] || '/images/products/placeholder.jpg'}
            alt={product.name || 'Product image'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-4"
            onError={() => handleImageError(product.id)}
          />
        ) : (
          <div className="text-gray-400 text-sm text-center p-4">
            <XCircleIcon className="h-10 w-10 mx-auto mb-2" />
            Image Not Available
          </div>
        )}
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name || 'Unnamed Product'}
        </h3>
        <p className="text-sm text-gray-600 mb-3 flex-grow line-clamp-3">
          {product.description || 'No description available'}
        </p>
        <button 
          onClick={() => handleProductClick(product)}
          className="mt-auto w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
        >
          <EyeIcon className="h-5 w-5 mr-2" /> Details
        </button>
      </div>
    </div>
  ), [imageErrors, handleImageError, handleProductClick])

  return (
    <div className="space-y-6">
      {/* Sorting and Filtering Controls */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Sort By */}
          <div className="flex items-center gap-2">
            <label htmlFor="sortBy" className="text-gray-700 text-sm font-medium">Sort by:</label>
            <select
              id="sortBy"
              className="border border-gray-300 rounded-lg py-2 px-3 text-sm focus:ring-red-500 focus:border-red-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            >
              <option value="name">Product Name</option>
              <option value="price">Price</option>
              <option value="inStock">Stock Status</option>
            </select>
            <button
              onClick={toggleSortOrder}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label={`Sort order ${sortOrder === 'asc' ? 'ascending' : 'descending'}`}
            >
              {sortOrder === 'asc' ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
            </button>
          </div>

          {/* In Stock Filter */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="inStockOnly"
              className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
              checked={showInStockOnly}
              onChange={(e) => setShowInStockOnly(e.target.checked)}
            />
            <label htmlFor="inStockOnly" className="text-gray-700 text-sm font-medium">In Stock Only</label>
          </div>
        </div>
      </div>

      {/* Paginated Product Grid with Search */}
      <PaginatedProductGrid
        products={sortedAndFilteredProducts}
        onProductClick={handleProductClick}
        itemsPerPage={12}
        searchPlaceholder={`Search ${categoryName} products...`}
        showSearch={true}
        renderProduct={renderProductCard}
      />

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}
