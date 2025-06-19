'use client'

import { motion } from 'framer-motion'

// Enhanced shimmer effect
const shimmerVariants = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: {
      duration: 1.5,
      ease: 'linear',
      repeat: Infinity,
    },
  },
}

// Product card skeleton
export const ProductCardSkeleton = ({ viewMode = 'grid' }: { viewMode?: 'grid' | 'list' }) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="flex items-center space-x-4">
          <motion.div
            className="w-16 h-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg"
            style={{ backgroundSize: '400% 100%' }}
            variants={shimmerVariants}
            animate="animate"
          />
          <div className="flex-1 space-y-2">
            <motion.div
              className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4"
              style={{ backgroundSize: '400% 100%' }}
              variants={shimmerVariants}
              animate="animate"
            />
            <motion.div
              className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-1/2"
              style={{ backgroundSize: '400% 100%' }}
              variants={shimmerVariants}
              animate="animate"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 space-y-4">
      <motion.div
        className="w-full h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg"
        style={{ backgroundSize: '400% 100%' }}
        variants={shimmerVariants}
        animate="animate"
      />
      <div className="space-y-2">
        <motion.div
          className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4"
          style={{ backgroundSize: '400% 100%' }}
          variants={shimmerVariants}
          animate="animate"
        />
        <motion.div
          className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-1/2"
          style={{ backgroundSize: '400% 100%' }}
          variants={shimmerVariants}
          animate="animate"
        />
      </div>
    </div>
  )
}

// Product grid skeleton
export const ProductGridSkeleton = ({ count = 12, viewMode = 'grid' }: { count?: number; viewMode?: 'grid' | 'list' }) => {
  return (
    <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} viewMode={viewMode} />
      ))}
    </div>
  )
}

// Page header skeleton
export const PageHeaderSkeleton = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white border-b border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <motion.div
            className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-1/3"
            style={{ backgroundSize: '400% 100%' }}
            variants={shimmerVariants}
            animate="animate"
          />
          <motion.div
            className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-2/3"
            style={{ backgroundSize: '400% 100%' }}
            variants={shimmerVariants}
            animate="animate"
          />
        </div>
      </div>
    </div>
  )
}

// Filter bar skeleton
export const FilterBarSkeleton = () => {
  return (
    <div className="bg-white border-b border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div
              className="h-10 w-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg"
              style={{ backgroundSize: '400% 100%' }}
              variants={shimmerVariants}
              animate="animate"
            />
            <motion.div
              className="h-10 w-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg"
              style={{ backgroundSize: '400% 100%' }}
              variants={shimmerVariants}
              animate="animate"
            />
          </div>
          <div className="flex items-center space-x-2">
            <motion.div
              className="h-10 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg"
              style={{ backgroundSize: '400% 100%' }}
              variants={shimmerVariants}
              animate="animate"
            />
            <motion.div
              className="h-10 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg"
              style={{ backgroundSize: '400% 100%' }}
              variants={shimmerVariants}
              animate="animate"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Hero skeleton
export const HeroSkeleton = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[65vh]">
          <div className="space-y-6">
            <motion.div
              className="h-6 w-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full"
              style={{ backgroundSize: '400% 100%' }}
              variants={shimmerVariants}
              animate="animate"
            />
            <div className="space-y-4">
              <motion.div
                className="h-12 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded"
                style={{ backgroundSize: '400% 100%' }}
                variants={shimmerVariants}
                animate="animate"
              />
              <motion.div
                className="h-12 w-4/5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded"
                style={{ backgroundSize: '400% 100%' }}
                variants={shimmerVariants}
                animate="animate"
              />
            </div>
            <motion.div
              className="h-20 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded"
              style={{ backgroundSize: '400% 100%' }}
              variants={shimmerVariants}
              animate="animate"
            />
            <div className="flex space-x-4">
              <motion.div
                className="h-12 w-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg"
                style={{ backgroundSize: '400% 100%' }}
                variants={shimmerVariants}
                animate="animate"
              />
              <motion.div
                className="h-12 w-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg"
                style={{ backgroundSize: '400% 100%' }}
                variants={shimmerVariants}
                animate="animate"
              />
            </div>
          </div>
          <motion.div
            className="w-full h-96 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg"
            style={{ backgroundSize: '400% 100%' }}
            variants={shimmerVariants}
            animate="animate"
          />
        </div>
      </div>
    </div>
  )
}

// Brand selection skeleton
export const BrandSelectionSkeleton = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            className="h-8 w-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mx-auto mb-4"
            style={{ backgroundSize: '400% 100%' }}
            variants={shimmerVariants}
            animate="animate"
          />
          <motion.div
            className="h-4 w-96 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mx-auto"
            style={{ backgroundSize: '400% 100%' }}
            variants={shimmerVariants}
            animate="animate"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <motion.div
              key={index}
              className="h-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg"
              style={{ backgroundSize: '400% 100%' }}
              variants={shimmerVariants}
              animate="animate"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Complete page skeleton
export const PageSkeleton = () => {
  return (
    <div>
      <HeroSkeleton />
      <BrandSelectionSkeleton />
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductGridSkeleton count={8} />
        </div>
      </div>
    </div>
  )
} 