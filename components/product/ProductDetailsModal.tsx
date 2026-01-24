'use client'

import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Product } from '@/lib/types/shared-types'
import {
  XMarkIcon,
  CheckCircleIcon,
  StarIcon,
  HeartIcon,
  ShoppingCartIcon,
  DocumentTextIcon,
  TagIcon,
  DocumentArrowDownIcon,
  ClipboardDocumentListIcon,
  InformationCircleIcon,
  ArrowDownTrayIcon,
  DocumentIcon
} from '@heroicons/react/24/outline'
import { getImageUrl } from '@/lib/config/image-config'

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
      document.body.style.paddingRight = '0px'
    } else {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = 'unset'
    }
  }, [isOpen])

  // Reset image error when product changes
  useEffect(() => {
    setImageError(false)
  }, [product])

  if (!mounted || !isOpen || !product) return null

  const handleImageError = () => {
    setImageError(true)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const getProductImageUrl = () => {
    if (imageError) {
      return '/images/westlogo.jpg'
    }
    
    const imagePath = product.images?.[0]
    if (!imagePath) return '/images/westlogo.jpg'
    
    // External URLs pass through directly
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath
    }
    
    return getImageUrl(imagePath)
  }

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <StarIcon
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ))
  }

  const renderFeatures = () => {
    if (product.features && Array.isArray(product.features)) {
      return product.features.map((feature: string, index: number) => (
        <div key={index} className="flex items-start gap-2">
          <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
          <span className="text-sm text-gray-700">{feature}</span>
        </div>
      ))
    }
    return null
  }

  const renderSpecifications = () => {
    if (product.specs && Array.isArray(product.specs)) {
      return product.specs.map((spec: string, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <InformationCircleIcon className="h-4 w-4 text-blue-500" />
          <span className="text-sm text-gray-700">{spec}</span>
        </div>
      ))
    }
    return <div className="text-gray-500 text-sm">No specifications available</div>
  }

  const handleCatalogClick = () => {
    const brandCatalogs: { [key: string]: string } = {
      'ls industrial': '/downloads/catalogs/ls-industrial-factory-automation-catalog-2024.pdf',
      'ls-industrial': '/downloads/catalogs/ls-industrial-factory-automation-catalog-2024.pdf',
      'mitsubishi': 'https://library.mitsubishielectric.co.uk/pdf/book/LES_Product_Catalogue#page-1',
      'mitsubishi electric': 'https://library.mitsubishielectric.co.uk/pdf/book/LES_Product_Catalogue#page-1',
      'noark': '/downloads/catalogs/noark-product-catalogue.pdf',
      'klemsan': '/downloads/catalogs/automation-klemsan.pdf',
      'katko': '/downloads/catalogs/katko-product-catalogue-2021.pdf',
      'elsteel': '/downloads/catalogs/elsteel-techno-module-brochure.pdf',
      'tmeic': '/downloads/catalogs/tmeic-product-catalog.pdf',
      'erico': '/downloads/catalogs/erico-product-catalog.pdf',
    }

    const brandKey = product.brand?.toLowerCase() || ''
    const catalogUrl = brandCatalogs[brandKey] || '/catalogs'

    if (catalogUrl.startsWith('http')) {
      window.open(catalogUrl, '_blank', 'noopener,noreferrer')
    } else if (catalogUrl === '/catalogs') {
      window.location.href = catalogUrl
    } else {
      const link = document.createElement('a')
      link.href = catalogUrl
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-md"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            margin: 0,
            padding: '1rem'
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 group"
            >
              <XMarkIcon className="h-6 w-6 text-gray-600 group-hover:text-gray-900" />
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[90vh]">
              {/* Header Section with Image */}
              <div className="relative">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gray-50">
                    <Image
                      src={getProductImageUrl()}
                      alt={product.name || 'Product image'}
                      fill
                      className="object-contain p-4"
                      priority
                      onError={handleImageError}
                    />
                    {product.badge && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                        {product.badge}
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-6 lg:p-8">
                    <div className="space-y-4">
                      {/* Brand */}
                      {product.brand && (
                        <div className="flex items-center gap-2">
                          <TagIcon className="h-4 w-4 text-red-500" />
                          <span className="text-sm font-medium text-red-600 uppercase tracking-wide">
                            {product.brand}
                          </span>
                        </div>
                      )}

                      {/* Product Name */}
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                        {product.name}
                      </h2>

                      {/* Model */}
                      {product.model && (
                        <div className="text-gray-600">
                          <span className="font-medium">Model: {product.model}</span>
                        </div>
                      )}

                      {/* Rating */}
                      {product.rating && (
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            {renderStars(product.rating)}
                            <span className="text-sm text-gray-600 ml-2">
                              ({product.reviews || 0} reviews)
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Category */}
                      {product.category && (
                        <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                          <span className="text-sm font-medium text-gray-700">{product.category}</span>
                        </div>
                      )}

                      {/* Stock Status */}
                      <div className="flex items-center gap-2">
                        {product.inStock !== false ? (
                          <>
                            <CheckCircleIcon className="h-5 w-5 text-green-500" />
                            <span className="text-sm text-green-600 font-medium">In Stock</span>
                          </>
                        ) : (
                          <>
                            <XMarkIcon className="h-5 w-5 text-red-500" />
                            <span className="text-sm text-red-600 font-medium">Contact for Availability</span>
                          </>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="bg-gray-50 p-4 rounded-xl mt-4">
                        <div className="flex justify-center gap-3">
                          <button 
                            onClick={handleCatalogClick}
                            className="px-6 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium flex items-center gap-2 text-gray-700"
                          >
                            <DocumentArrowDownIcon className="h-5 w-5" />
                            Catalog
                          </button>
                          <button className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium flex items-center gap-2">
                            <ShoppingCartIcon className="h-5 w-5" />
                            Request Quote
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Information */}
              <div className="border-t border-gray-200">
                <div className="p-6 lg:p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Description & Features */}
                    <div className="space-y-6">
                      {/* Description */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <DocumentTextIcon className="h-5 w-5 text-gray-500" />
                          Description
                        </h3>
                        <div className="text-gray-700 leading-relaxed">
                          {product.description}
                        </div>
                      </div>

                      {/* Features */}
                      {product.features && product.features.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <CheckCircleIcon className="h-5 w-5 text-green-500" />
                            Features
                          </h3>
                          <div className="space-y-3">
                            {renderFeatures()}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Specifications */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <ClipboardDocumentListIcon className="h-5 w-5 text-purple-500" />
                        Specifications
                      </h3>
                      <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                        {renderSpecifications()}
                      </div>
                    </div>
                  </div>

                  {/* Additional Images */}
                  {product.images && product.images.length > 1 && (
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Images</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {product.images.slice(1, 5).map((image: string, index: number) => (
                          <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            <Image
                              src={image.startsWith('http') ? image : getImageUrl(image)}
                              alt={`${product.name} - Image ${index + 2}`}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
}
