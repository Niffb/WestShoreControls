/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  
  // Asset prefix for static exports
  assetPrefix: '',
  
  // Ensure proper trailing slash handling
  trailingSlash: false,
  
  // Performance optimizations
  swcMinify: true,
  poweredByHeader: false,
  
  // Compression and optimization
  compress: true,
  
  // Disable static exports since we're using server
  distDir: '.next',
  
  // Optimize for large data sets
  experimental: {
    largePageDataBytes: 128 * 1024, // 128KB
    workerThreads: false,
    cpus: 1,
    scrollRestoration: true,
    // Enable Server Components
    serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
  },
  
  // Increase timeout for serverless functions
  serverRuntimeConfig: {
    maxDuration: 30, // 30 seconds
  },
  
  images: {
    disableStaticImages: false, // Enable static image imports
    unoptimized: true, // Disable optimization to prevent 400 errors in Google Cloud
    domains: ['localhost', 'westshorecontrols.com', 'cdn.kyklo.co'],
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
      {
        source: '/_next/static/:path*',
        destination: '/_next/static/:path*',
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
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/download/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'",
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
      {
        source: '/downloads/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
    ]
  },
  
  // Bundle optimization
  webpack: (config, { dev, webpack }) => {
    // Exclude backup directories from being processed
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/node_modules/**', '**/extracted-brands-subcategories.backup/**'],
    };
    
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

    return config
  },
}

module.exports = nextConfig
