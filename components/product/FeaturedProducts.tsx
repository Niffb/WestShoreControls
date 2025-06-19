'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { StarIcon, HeartIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon, HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { getImageUrl } from '@/lib/config/image-config'

import { cleanProducts } from '@/lib/products/products'

export default function FeaturedProducts() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [currentOffset, setCurrentOffset] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [itemWidth, setItemWidth] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Get featured products (first 12 clean products)
  const products = cleanProducts.slice(0, 12)

  // Create a duplicated array for seamless infinite scroll
  const duplicatedProducts = [...products, ...products]

  // Calculate item width based on screen size
  useEffect(() => {
    const calculateItemWidth = () => {
      if (typeof window !== 'undefined') {
        const containerWidth = containerRef.current?.offsetWidth || 1200
        const gap = 32 // 2rem gap
        let visibleItems = 3 // default for large screens
        
        if (window.innerWidth < 768) {
          visibleItems = 1 // mobile
        } else if (window.innerWidth < 1024) {
          visibleItems = 2 // tablet
        }
        
        const totalGaps = (visibleItems - 1) * gap
        const width = (containerWidth - totalGaps) / visibleItems
        setItemWidth(width)
      }
    }

    calculateItemWidth()
    window.addEventListener('resize', calculateItemWidth)
    return () => window.removeEventListener('resize', calculateItemWidth)
  }, [])

  // Auto-scroll functionality with seamless loop
  useEffect(() => {
    if (!isPaused && itemWidth > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentOffset((prev) => {
          const singleProductWidth = itemWidth + 32 // item width + gap
          const maxOffset = products.length * singleProductWidth
          const newOffset = prev + singleProductWidth
          
          // Reset to 0 when we've scrolled through all original products
          return newOffset >= maxOffset ? 0 : newOffset
        })
      }, 3000) // Change every 3 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused, itemWidth, products.length])

  const nextProduct = () => {
    const singleProductWidth = itemWidth + 32
    const maxOffset = products.length * singleProductWidth
    setCurrentOffset((prev) => {
      const newOffset = prev + singleProductWidth
      return newOffset >= maxOffset ? 0 : newOffset
    })
  }

  const prevProduct = () => {
    const singleProductWidth = itemWidth + 32
    const maxOffset = products.length * singleProductWidth
    setCurrentOffset((prev) => {
      return prev <= 0 ? maxOffset - singleProductWidth : prev - singleProductWidth
    })
  }

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }



  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Discover our most popular electrical components, carefully selected for their 
            quality, reliability, and performance in industrial applications.
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={prevProduct}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-600 hover:text-primary-500 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 -translate-x-4"
            aria-label="Previous product"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <button
            onClick={nextProduct}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-600 hover:text-primary-500 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 translate-x-4"
            aria-label="Next product"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>

          {/* Carousel Track */}
          <div ref={containerRef} className="overflow-hidden rounded-xl">
            <div 
              className="flex gap-8 transition-transform duration-700 ease-in-out"
              style={{ 
                transform: `translateX(-${currentOffset}px)`,
                width: `${duplicatedProducts.length * (itemWidth + 32)}px`
              }}
            >
              {duplicatedProducts.map((product, index) => (
                <div
                  key={`${product.id}-${index}`}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group flex-shrink-0 block cursor-pointer"
                  style={{ width: `${itemWidth}px` }}
                >
                  {/* Product Image */}
                  <div className="relative h-64 bg-gray-100 overflow-hidden">
                    {product.images[0] && product.images[0] !== "products/placeholder.jpg" ? (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center transition-all duration-500 group-hover:from-primary-50 group-hover:to-primary-100">
                        <img
                          src={getImageUrl(product.images[0])}
                          alt={product.name}
                          className="w-full h-full object-contain p-4 transform group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            console.error('Failed to load image:', getImageUrl(product.images[0]));
                            (e.target as HTMLImageElement).src = getImageUrl('products/placeholder.jpg');
                          }}
                          onLoad={() => {}}
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center transition-all duration-500 group-hover:from-primary-50 group-hover:to-primary-100">
                        <div className="text-gray-500 text-center transform group-hover:scale-110 transition-transform duration-500">
                          <div className="w-16 h-16 bg-gray-400 rounded-lg mx-auto mb-2 group-hover:bg-primary-400 transition-colors duration-500 group-hover:rotate-12"></div>
                          <p className="text-sm group-hover:text-primary-600 transition-colors duration-300">{product.name}</p>
                        </div>
                      </div>
                    )}
                    


                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 group/favorite"
                    >
                      {favorites.includes(product.id) ? (
                        <HeartSolidIcon className="h-5 w-5 text-primary-500" />
                      ) : (
                        <HeartIcon className="h-5 w-5 text-gray-400 group-hover/favorite:text-primary-500 transition-colors duration-300" />
                      )}
                    </button>

                    {/* Stock Status */}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center animate-fade-in">
                        <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="mb-2">
                      <span className="text-sm text-primary-500 font-medium hover:text-primary-600 transition-colors duration-300">
                        {product.category}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-500 transition-colors duration-300 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarSolidIcon
                            key={i}
                            className={`h-4 w-4 transition-all duration-300 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400'
                                : 'text-gray-200'
                            }`}
                            style={{ animationDelay: `${i * 0.1}s` }}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>


                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-3">
              {products.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    Math.floor(currentOffset / (itemWidth + 32)) % products.length === index
                      ? 'bg-primary-500 w-8'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Auto-scroll indicator */}
          <div className="text-center mt-4">
            <div className="inline-flex items-center gap-2 text-sm text-gray-500">
              <div className={`w-2 h-2 rounded-full ${isPaused ? 'bg-gray-400' : 'bg-accent-green'}`}></div>
              {isPaused ? 'Paused' : 'Auto-scrolling'}
            </div>
          </div>
        </div>

        {/* View All Products Button */}
        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <Link 
            href="/products"
            className="group bg-white border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg inline-flex items-center justify-center"
          >
            <span className="flex items-center justify-center">
              View All Products
              <div className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                →
              </div>
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
} 