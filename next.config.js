/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  
  // Asset prefix for static exports
  assetPrefix: '',
  
  // Performance optimizations
  swcMinify: true,
  poweredByHeader: false,
  
  // Compression and optimization
  compress: true,
  
  images: {
    // Static exports require unoptimized images since Next.js Image Optimization API
    // is not available in static mode. However, we can still benefit from:
    // - Proper image sizing and responsive images
    // - Lazy loading (built into next/image)
    // - WebP/AVIF format serving (when available)
    // - Priority loading for above-the-fold images
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 year
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // Experimental features for better performance (compatible with Next.js 14)
  experimental: {
    scrollRestoration: true,
    // Enable Server Components
    serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
  },
  
  // Bundle optimization
  webpack: (config, { dev, webpack }) => {
    // Production optimizations
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: -10,
              chunks: 'all',
            },
            common: {
              minChunks: 2,
              priority: -5,
              reuseExistingChunk: true,
            },
          },
        },
      }
    }

    // Add bundle analyzer if enabled
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
        })
      )
    }

    return config
  },
}

module.exports = nextConfig 