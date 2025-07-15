'use client'

import React from 'react'

// Generic loading skeleton component
export function LoadingSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
  )
}

// Product card skeleton for grid views
export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      {/* Image skeleton */}
      <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
      
      {/* Content skeleton */}
      <div className="p-6">
        {/* Brand badge skeleton */}
        <div className="flex items-center justify-between mb-2">
          <div className="w-16 h-5 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-12 h-5 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
        
        {/* Title skeleton */}
        <div className="space-y-2 mb-2">
          <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
        </div>
        
        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
        </div>
        
        {/* Rating skeleton */}
        <div className="flex items-center mb-4">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
          <div className="ml-2 w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        {/* Button skeleton */}
        <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    </div>
  )
}

// Product grid skeleton for paginated views
export function ProductGridSkeleton({ count = 24 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(count)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

// Page loading skeleton for product type pages
export function ProductTypePageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-900/5">
      {/* Breadcrumb skeleton */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 pt-24 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
            <span className="text-gray-400">/</span>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            <span className="text-gray-400">/</span>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Hero section skeleton */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            {/* Title skeleton */}
            <div className="h-12 w-96 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
            
            {/* Description skeleton */}
            <div className="space-y-2 mb-8">
              <div className="h-6 w-full max-w-3xl bg-gray-200 rounded animate-pulse mx-auto"></div>
              <div className="h-6 w-2/3 bg-gray-200 rounded animate-pulse mx-auto"></div>
            </div>
            
            {/* Stats skeleton */}
            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mx-auto mb-2"></div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="text-center">
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mx-auto mb-2"></div>
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Brand filters skeleton */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products grid skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductGridSkeleton count={24} />
      </div>
    </div>
  )
}

// Pagination skeleton
export function PaginationSkeleton() {
  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      {/* Previous button skeleton */}
      <div className="h-10 w-20 bg-gray-200 rounded-md animate-pulse"></div>
      
      {/* Page numbers skeleton */}
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 w-10 bg-gray-200 rounded-md animate-pulse"></div>
        ))}
      </div>
      
      {/* Next button skeleton */}
      <div className="h-10 w-16 bg-gray-200 rounded-md animate-pulse"></div>
    </div>
  )
}

// Generic content skeleton
export function ContentSkeleton({ 
  lines = 3, 
  className = '' 
}: { 
  lines?: number
  className?: string 
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {[...Array(lines)].map((_, i) => (
        <div 
          key={i} 
          className={`h-4 bg-gray-200 rounded animate-pulse ${
            i === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        ></div>
      ))}
    </div>
  )
}

// Table skeleton for list views
export function TableSkeleton({ 
  rows = 10, 
  columns = 4 
}: { 
  rows?: number
  columns?: number 
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Table header skeleton */}
      <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
        <div className="grid grid-cols-4 gap-4">
          {[...Array(columns)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
      
      {/* Table rows skeleton */}
      <div className="divide-y divide-gray-200">
        {[...Array(rows)].map((_, i) => (
          <div key={i} className="px-6 py-4">
            <div className="grid grid-cols-4 gap-4">
              {[...Array(columns)].map((_, j) => (
                <div key={j} className="h-4 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Performance dashboard skeleton
export function PerformanceDashboardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="text-center">
            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mx-auto mb-2"></div>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mx-auto"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LoadingSkeleton 