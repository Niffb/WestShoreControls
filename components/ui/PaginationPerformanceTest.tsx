'use client'

import { useState, useEffect, useMemo } from 'react'
import { Product } from '@/lib/types/shared-types'
import PaginatedProductGrid from './PaginatedProductGrid'
import { usePerformanceMonitor } from '@/lib/utils/performance-utils'

interface PaginationPerformanceTestProps {
  products: Product[]
  categoryName: string
}

// Mock product generator for testing
function generateMockProducts(count: number): Product[] {
  const mockProducts: Product[] = []
  
  for (let i = 1; i <= count; i++) {
    mockProducts.push({
      id: i,
      name: `Test Product ${i}`,
      description: `This is a test product description for product number ${i}. It contains various details about the product features and specifications.`,
      price: Math.random() * 1000 + 50,
      images: [`/images/placeholder-product.jpg`],
      brand: ['TestBrand A', 'TestBrand B', 'TestBrand C'][i % 3],
      category: 'test-category',
      rating: Math.floor(Math.random() * 5) + 1,
      reviews: Math.floor(Math.random() * 100),
      inStock: i % 3 !== 0,
      specs: [
        `Spec 1: Value 1 for product ${i}`,
        `Spec 2: Value 2 for product ${i}`
      ]
    })
  }
  
  return mockProducts
}

export default function PaginationPerformanceTest({ 
  products: initialProducts, 
  categoryName 
}: PaginationPerformanceTestProps) {
  const [testMode, setTestMode] = useState<'real' | 'mock-100' | 'mock-500' | 'mock-1000'>('real')
  const [renderTime, setRenderTime] = useState<number>(0)
  const { startMeasure, getMetrics } = usePerformanceMonitor()

  // Generate test products based on mode
  const testProducts = useMemo(() => {
    const endMeasure = startMeasure('test-product-generation')
    
    let products: Product[]
    switch (testMode) {
      case 'mock-100':
        products = generateMockProducts(100)
        break
      case 'mock-500':
        products = generateMockProducts(500)
        break
      case 'mock-1000':
        products = generateMockProducts(1000)
        break
      default:
        products = initialProducts
    }
    
    endMeasure()
    return products
  }, [testMode, initialProducts, startMeasure])

  // Measure render time
  useEffect(() => {
    const endMeasure = startMeasure('pagination-render')
    
    // Use setTimeout to measure after render
    const timer = setTimeout(() => {
      const metrics = getMetrics()
      const renderMetric = metrics['pagination-render']
      if (renderMetric) {
        setRenderTime(renderMetric.latest)
      }
      endMeasure()
    }, 0)

    return () => clearTimeout(timer)
  }, [testProducts, startMeasure, getMetrics])

  const renderProductCard = (product: Product, index: number) => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="relative h-48 w-full bg-gray-100 flex items-center justify-center">
        <div className="text-gray-400 text-sm text-center p-4">
          <div className="w-16 h-16 bg-gray-300 rounded mx-auto mb-2"></div>
          Test Product Image
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
          {product.description}
        </p>
        <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
          View Details
        </button>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Performance Test Controls */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Pagination Performance Test</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Test Mode Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test Dataset
            </label>
            <select
              value={testMode}
              onChange={(e) => setTestMode(e.target.value as any)}
              className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-red-500 focus:border-red-500"
            >
              <option value="real">Real Products ({initialProducts.length})</option>
              <option value="mock-100">Mock Products (100)</option>
              <option value="mock-500">Mock Products (500)</option>
              <option value="mock-1000">Mock Products (1000)</option>
            </select>
          </div>

          {/* Performance Metrics */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Performance Metrics
            </label>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm">
                <div className="flex justify-between">
                  <span>Total Products:</span>
                  <span className="font-semibold">{testProducts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Render Time:</span>
                  <span className="font-semibold">{renderTime.toFixed(2)}ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Items per Page:</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Pages:</span>
                  <span className="font-semibold">{Math.ceil(testProducts.length / 12)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Benefits */}
        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <h3 className="text-sm font-medium text-green-800 mb-2">Performance Benefits</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Only renders 12 products at a time instead of all {testProducts.length}</li>
            <li>• Search functionality works across all products</li>
            <li>• Smooth pagination with page navigation</li>
            <li>• Reduced initial load time and memory usage</li>
            <li>• Better user experience with faster interactions</li>
          </ul>
        </div>
      </div>

      {/* Paginated Product Grid */}
      <PaginatedProductGrid
        products={testProducts}
        itemsPerPage={12}
        searchPlaceholder={`Search ${categoryName} products...`}
        showSearch={true}
        renderProduct={renderProductCard}
      />
    </div>
  )
}
