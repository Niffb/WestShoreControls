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
  
  // Server configuration
  server: {
    port: parseInt(process.env.PORT, 10) || 8080,
    host: '0.0.0.0'
  },
  
  images: {
    // Enable image optimization for Cloud Run
    unoptimized: false,
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