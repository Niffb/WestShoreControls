/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  
  // Asset prefix for static exports
  assetPrefix: '',
  
  // Performance optimizations
  swcMinify: true,
  poweredByHeader: false,
  
  // Compression and optimization
  compress: true,
  
  images: {
    disableStaticImages: false, // Enable static image imports
    unoptimized: true, // Disable optimization to prevent 400 errors in Google Cloud
    domains: ['localhost', 'westshorecontrols.com'],
    remotePatterns: [],
    minimumCacheTTL: 31536000, // 1 year
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Static file serving configuration
  async rewrites() {
    return [
      {
        source: '/assets/:path*',
        destination: '/assets/:path*',
      },
    ]
  },

  // Headers for better caching
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
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