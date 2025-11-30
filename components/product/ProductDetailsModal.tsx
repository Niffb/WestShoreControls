'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { Product } from '@/lib/types/shared-types'
import {
  XMarkIcon,
  CheckCircleIcon,
  XCircleIcon,
  ShoppingCartIcon,
  DocumentTextIcon,
  TagIcon,
  CurrencyDollarIcon,
  BuildingStorefrontIcon,
  DocumentArrowDownIcon,
  FolderIcon
} from '@heroicons/react/24/outline'

interface ProductDetailsModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function ProductDetailsModal({ product, isOpen, onClose }: ProductDetailsModalProps) {
  const [imageError, setImageError] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted (client-side)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '0px' // Prevent layout shift
    } else {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = 'unset'
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = 'unset'
    }
  }, [isOpen])

  if (!mounted || !isOpen || !product) return null

  const handleImageError = () => {
    setImageError(true)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const modalContent = (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center"
      onClick={handleBackdropClick}
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: '1rem',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)'
      }}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Image */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
                {!imageError ? (
                  <Image
                    src={product.images?.[0] || '/images/products/placeholder.jpg'}
                    alt={product.name || 'Product image'}
                    fill
                    className="object-contain p-4"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShoppingCartIcon className="w-10 h-10 text-red-600" />
                      </div>
                      <div className="text-gray-500">No Image Available</div>
                    </div>
                  </div>
                )}
                
                {/* Catalog Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-red-100 text-red-800 text-sm font-semibold px-3 py-2 rounded-full flex items-center gap-2">
                    <FolderIcon className="w-4 h-4" />
                    Catalog Available
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-4">
              {/* Product Header */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                {product.brand && (
                  <div className="flex items-center gap-2 text-red-600 font-medium mb-4">
                    <TagIcon className="w-5 h-5" />
                    {product.brand}
                  </div>
                )}
              </div>


              {/* Description */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <DocumentTextIcon className="w-5 h-5 text-gray-600" />
                  <span className="text-base font-semibold text-gray-900">Description</span>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {product.description}
                </p>
              </div>

              {/* Additional Details */}
              {product.category && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <TagIcon className="w-4 h-4 text-gray-600" />
                    <span className="font-medium text-gray-900 text-sm">Category</span>
                  </div>
                  <span className="text-gray-700 text-sm">{product.category}</span>
                </div>
              )}

              {/* Specifications */}
              {product.specs && product.specs.length > 0 && (
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">Specifications</h3>
                  <div className="bg-gray-50 rounded-lg p-3 max-h-32 overflow-y-auto">
                    <div className="grid grid-cols-1 gap-1">
                      {product.specs.slice(0, 5).map((spec, index) => (
                        <div key={index} className="py-1 border-b border-gray-200 last:border-b-0">
                          <span className="text-gray-700 text-xs">{spec}</span>
                        </div>
                      ))}
                      {product.specs.length > 5 && (
                        <div className="text-xs text-gray-500 pt-1">
                          +{product.specs.length - 5} more specifications
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-3">
                <button 
                  onClick={() => {
                    // Generate catalog filename based on product category or brand
                    const catalogName = product.category?.toLowerCase().replace(/\s+/g, '-') || 'product-catalog'
                    const pdfUrl = `/downloads/${catalogName}.pdf`
                    
                    // Create a temporary link to trigger download
                    const link = document.createElement('a')
                    link.href = pdfUrl
                    link.download = `${catalogName}.pdf`
                    link.target = '_blank'
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                  }}
                  className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors text-sm"
                >
                  <DocumentArrowDownIcon className="w-4 h-4" />
                  Catalog
                </button>
                <button className="flex-1 bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2 text-sm">
                  Request Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Use portal to render modal at document body level
  return createPortal(modalContent, document.body)
}
