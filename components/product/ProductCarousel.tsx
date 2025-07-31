'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import { cleanProducts } from '@/lib/products/products'
import { getImageUrl, getFallbackImageUrl } from '@/lib/config/image-config'

export default function ProductCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [imageLoadStates, setImageLoadStates] = useState<{[key: string]: boolean}>({})
  
  // Get first 8 clean products 
  const featuredProducts = cleanProducts.slice(0, 8)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320 // Width of one card plus gap
      const currentScroll = scrollContainerRef.current.scrollLeft
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      })
    }
  }

  const handleImageLoad = (productId: string) => {
    setImageLoadStates(prev => ({ ...prev, [productId]: true }))
  }

  const handleImageError = (productId: string, imgElement: HTMLImageElement) => {
    console.error('Failed to load carousel image:', imgElement.src)
    // Use westlogo.jpg for Variable Frequency Drives, otherwise use placeholder
    const product = featuredProducts.find(p => p.id.toString() === productId)
    if (product?.category === 'Variable Frequency Drives') {
      imgElement.src = '/images/westlogo.jpg'
    } else {
      imgElement.src = getImageUrl('products/placeholder.jpg')
    }
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Featured Products
            </h2>
            <p className="text-gray-600">
              Discover our most popular electrical components
            </p>
          </div>
          
          {/* Navigation Buttons */}
          <div className="hidden sm:flex space-x-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full bg-white border border-gray-200 hover:border-primary-500 hover:text-primary-500 transition-colors duration-200 shadow-sm"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full bg-white border border-gray-200 hover:border-primary-500 hover:text-primary-500 transition-colors duration-200 shadow-sm"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Product Carousel */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex space-x-4 sm:space-x-6 overflow-x-auto scrollbar-hide pb-4 touch-pan-x"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              scrollSnapType: 'x mandatory'
            }}
          >
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-72 sm:w-80 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-pointer touch-manipulation block"
                style={{ scrollSnapAlign: 'start' }}
              >
                {/* Product Image with optimized loading */}
                <div className="relative h-48 bg-gray-100 rounded-t-xl overflow-hidden">
                  {/* Image skeleton/loading state */}
                  {!imageLoadStates[product.id.toString()] && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                      <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
                    </div>
                  )}
                  
                  <div className="w-full h-full relative">
                    <Image
                      src={getImageUrl(product.images[0])}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 288px, 320px"
                      className={`object-contain p-2 group-hover:scale-105 ${
                        // For VFD products using westlogo.jpg, no transitions - show immediately
                        product.category === 'Variable Frequency Drives' 
                          ? 'opacity-100' 
                          : `transition-transform duration-300 ${imageLoadStates[product.id.toString()] ? 'opacity-100' : 'opacity-0'}`
                      }`}
                      onLoad={() => handleImageLoad(product.id.toString())}
                      onError={(e) => handleImageError(product.id.toString(), e.currentTarget)}
                      priority={false} // Lazy load by default
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    />
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 sm:p-5">
                  <div className="mb-2">
                    <span className="text-xs text-primary-500 font-medium uppercase tracking-wide">
                      {product.category}
                    </span>
                  </div>
                  
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-500 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarSolidIcon
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center mt-6 sm:hidden">
            <div className="flex space-x-2">
              {[...Array(Math.ceil(featuredProducts.length / 2))].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-gray-300"
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link href="/products" className="btn-primary inline-block">
            View All Featured Products →
          </Link>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          /* Cross-platform scrollbar hiding */
          -ms-overflow-style: none;
          scrollbar-width: none;
          overflow: -moz-scrollbars-none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
        .line-clamp-2 {
          /* Cross-platform text clamping */
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          -moz-line-clamp: 2;
          line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
          /* Fallback for unsupported browsers */
          max-height: 2.4em;
          line-height: 1.2em;
        }
      `}</style>
    </section>
  )
} 