'use client';

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  XMarkIcon, 
  StarIcon, 
  HeartIcon, 
  ShoppingCartIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClipboardDocumentListIcon,
  InformationCircleIcon,
  TagIcon,
  ArrowDownTrayIcon,
  DocumentIcon
} from '@heroicons/react/24/outline'
import { getImageUrl, getFallbackImageUrl } from '@/lib/config/image-config'

interface ProductModalProps {
  product: any
  isOpen: boolean
  onClose: () => void
  getProductImage?: (product: any) => string // Make it optional
}

export default function ProductModal({ product, isOpen, onClose, getProductImage }: ProductModalProps) {
  const [imageError, setImageError] = useState(false)
  
  if (!product) return null

  // Internal image handling function
  const getProductImageUrl = useCallback((product: any) => {
    // Use the provided function if available
    if (getProductImage) {
      return getProductImage(product)
    }
    
    // Otherwise, handle internally
    if (imageError) {
      return getFallbackImageUrl(product.images?.[0] || 'products/placeholder.jpg')
    }
    
    return getImageUrl(product.images?.[0] || 'products/placeholder.jpg')
  }, [getProductImage, imageError])

  const handleImageError = useCallback(() => {
    setImageError(true)
  }, [])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
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
    if (product.specifications || product.specs) {
      const specs = product.specifications || product.specs
      
      if (typeof specs === 'object' && !Array.isArray(specs)) {
        return Object.entries(specs).map(([key, value]: [string, any]) => (
          <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
            <span className="font-medium text-gray-600 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}:
            </span>
            <span className="text-gray-900">{value}</span>
          </div>
        ))
      } else if (Array.isArray(specs)) {
        return specs.map((spec: string, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <InformationCircleIcon className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-gray-700">{spec}</span>
          </div>
        ))
      }
    }
    return <div className="text-gray-500 text-sm">No specifications available</div>
  }

  const renderModels = () => {
    if (product.models && Array.isArray(product.models)) {
      return (
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ClipboardDocumentListIcon className="h-5 w-5 text-indigo-600" />
            Available Models 
            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full ml-1">
              {product.models.length}
            </span>
          </h4>
          <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 rounded-2xl p-6 border border-indigo-100 shadow-sm">
            <div className="max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {product.models.map((model: string, index: number) => (
                  <div 
                    key={index} 
                    className="group relative flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-indigo-300 hover:shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-3 h-3 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full shadow-sm group-hover:shadow-md transition-shadow duration-300"></div>
                    </div>
                    <span className="text-sm text-gray-800 font-mono tracking-tight font-medium group-hover:text-indigo-900 transition-colors duration-300 min-w-0 flex-1">
                      {model}
                    </span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {product.models.length > 9 && (
              <div className="mt-4 pt-4 border-t border-indigo-100">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                  <p className="text-xs text-indigo-600 font-medium">
                    Scroll to view all {product.models.length} available models
                  </p>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
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
                      src={getProductImageUrl(product)}
                      alt={product.name}
                      fill
                      className="object-cover"
                      priority
                      onError={handleImageError}
                    />
                    {product.badge && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                        {product.badge}
                      </div>
                    )}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold shadow-lg flex items-center gap-2">
                          <ExclamationTriangleIcon className="h-5 w-5 text-orange-500" />
                          Out of Stock
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-6 lg:p-8">
                    <div className="space-y-4">
                      {/* Brand */}
                      <div className="flex items-center gap-2">
                        <TagIcon className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                          {product.brand}
                        </span>
                      </div>

                      {/* Product Name */}
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                        {product.name}
                      </h2>

                      {/* Model/Series */}
                      {(product.model || product.series) && (
                        <div className="text-gray-600">
                          {product.model && <span className="font-medium">Model: {product.model}</span>}
                          {product.series && product.model && <span className="mx-2">•</span>}
                          {product.series && <span className="font-medium">Series: {product.series}</span>}
                        </div>
                      )}

                      {/* Rating */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          {renderStars(product.rating || 4.5)}
                          <span className="text-sm text-gray-600 ml-2">
                            ({product.reviews || 0} reviews)
                          </span>
                        </div>
                      </div>

                      {/* Category */}
                      {product.category && (
                        <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                          <span className="text-sm font-medium text-gray-700">{product.category}</span>
                          {product.subcategory && (
                            <>
                              <span className="text-gray-400">•</span>
                              <span className="text-sm text-gray-600">{product.subcategory}</span>
                            </>
                          )}
                        </div>
                      )}

                      {renderModels()}

                      {/* Action Buttons */}
                      <div className="bg-gray-50 p-4 rounded-xl mt-4">
                        <div className="flex justify-center gap-3">
                          <button className="p-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                            <HeartIcon className="h-5 w-5 text-gray-600" />
                          </button>
                          <button className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium flex items-center gap-2">
                            <ShoppingCartIcon className="h-5 w-5" />
                            Contact Us
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Information Tabs */}
              <div className="border-t border-gray-200">
                <div className="p-6 lg:p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Description & Features */}
                    <div className="space-y-6">
                      {/* Description */}
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <ClipboardDocumentListIcon className="h-6 w-6 text-gray-500" />
                          Description
                        </h3>
                        <div className="text-gray-700 leading-relaxed text-sm">
                          {product.description}
                        </div>
                        {renderFeatures()}
                      </div>

                      {/* Features */}
                      {product.features && (
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

                      {/* Downloads Section */}
                      {product.downloads && product.downloads.length > 0 && (
                        <div className="mt-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <ArrowDownTrayIcon className="h-5 w-5 text-blue-500" />
                            Downloads
                          </h3>
                          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                            {product.downloads.map((download, index) => (
                              <a
                                key={index}
                                href={download.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-blue-50 transition-colors border border-gray-200 hover:border-blue-200"
                              >
                                <DocumentIcon className="h-5 w-5 text-blue-500" />
                                <span className="text-sm text-gray-700 hover:text-blue-700">{download.name}</span>
                                <ArrowDownTrayIcon className="h-4 w-4 text-gray-400 ml-auto" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
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
                              src={getImageUrl(image)}
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
} 