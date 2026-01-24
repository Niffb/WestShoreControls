// Image hosting configuration - using local assets
export const IMAGE_BASE_URL = '/images'

// Additional paths for specific image categories
export const ASSETS_IMAGE_PATH = '/assets/images'

// Essential images that should stay local for critical page loading
export const LOCAL_IMAGES = [
  'brands/westlogo.webp',
  'brands/hero-background.webp',
  'products/placeholder.jpg',
  'PC Picture LPM.avif'
]

// Common image extensions to try when path is incomplete
const IMAGE_EXTENSIONS = ['.webp', '.jpg', '.jpeg', '.png', '.avif', '.svg']

// Helper function to get correct image URL with optimized CDN loading
export const getImageUrl = (imagePath: string): string => {
  // Handle empty or invalid paths
  if (!imagePath || imagePath === '') {
    return `${IMAGE_BASE_URL}/brands/westlogo.webp` // Use local public fallback
  }

  // Handle external URLs (http:// or https://) - pass through without modification
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }

  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath

  // Handle specific problematic paths first
  if (cleanPath === 'assets/images/products/westlogo.jpg' || cleanPath === 'westlogo.jpg') {
    return `${IMAGE_BASE_URL}/westlogo.jpg`
  }

  // Check if this is an assets image
  if (cleanPath.startsWith('assets/images/')) {
    // Keep assets path structure intact
    return `/${cleanPath}`
  }

  // Handle series_images paths (now in public directory)
  if (cleanPath.startsWith('series_images/') || imagePath.startsWith('/series_images/')) {
    const seriesPath = cleanPath.replace(/^(\/)?series_images\//, '')
    // Check if path already has an extension
    const hasExtension = IMAGE_EXTENSIONS.some(ext => seriesPath.toLowerCase().endsWith(ext))
    if (hasExtension) {
      return `/series_images/${seriesPath}`
    }

    // If no extension, try common extensions for series images
    // Most series images are JPG, but some are PNG
    const extensionsToTry = ['.jpg', '.png', '.jpeg', '.webp', '.avif']

    // For now, return the path with .jpg extension as most series images are JPG
    return `/series_images/${seriesPath}.jpg`
  }

  // Handle hardcoded /images/ paths - normalize to relative paths
  if (cleanPath.startsWith('images/') || imagePath.startsWith('/images/')) {
    const finalPath = cleanPath.replace(/^(\/)?images\//, '')
    return `${IMAGE_BASE_URL}/${finalPath}`
  }

  // Handle legacy paths (for backward compatibility)
  const relativePath = cleanPath

  // Handle legacy category paths
  let processedPath = relativePath
  if (processedPath.includes('categories/images/categories/')) {
    processedPath = processedPath.replace('categories/images/categories/', 'categories/')
  }

  // Handle NOARK legacy paths
  if (processedPath.startsWith('noark-')) {
    processedPath = processedPath.replace('noark-', 'noark/')
  }

  // Check if the path already has an extension
  const hasExtension = IMAGE_EXTENSIONS.some(ext => processedPath.toLowerCase().endsWith(ext))

  // If no extension, use appropriate format based on path
  if (!hasExtension && !processedPath.includes('placeholder')) {
    // For Noark products, use .jpg as they are stored in that format
    if (processedPath.includes('noark/') || processedPath.includes('products/noark/')) {
      processedPath = `${processedPath}.jpg`
    } else {
      // For other images, prioritize WebP for better performance
      processedPath = `${processedPath}.webp`
    }
  }

  // Return final URL with optimized path
  const finalUrl = `${IMAGE_BASE_URL}/${processedPath}`

  // Debug logging for development
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log(`[getImageUrl] Input: ${imagePath}, Output: ${finalUrl}`)
  }

  return finalUrl
}

// Helper function to get multiple format options for manual optimization
export const getOptimizedImageUrl = (imagePath: string) => {
  const baseUrl = getImageUrl(imagePath)
  const basePath = baseUrl.replace(/\.[^/.]+$/, '')

  return {
    webp: `${basePath}.webp`,
    avif: `${basePath}.avif`,
    jpg: `${basePath}.jpg`,
    png: `${basePath}.png`,
    fallback: baseUrl
  }
}

// Helper function to get fallback image URL if primary fails
export const getFallbackImageUrl = (originalPath: string): string => {
  if (!originalPath || originalPath === '') {
    return `${IMAGE_BASE_URL}/brands/westlogo.webp` // Use local public fallback
  }

  // For external URLs, return the default fallback (external images should handle their own fallbacks)
  if (originalPath.startsWith('http://') || originalPath.startsWith('https://')) {
    return `${IMAGE_BASE_URL}/brands/westlogo.webp`
  }

  const cleanPath = originalPath.startsWith('/') ? originalPath.slice(1) : originalPath

  // Handle hardcoded /images/ paths - normalize to relative paths
  if (cleanPath.startsWith('images/') || originalPath.startsWith('/images/')) {
    const finalPath = cleanPath.replace(/^(\/)?images\//, '')
    return `${IMAGE_BASE_URL}/${finalPath}`
  }

  // Handle assets/images prefix
  let relativePath = cleanPath.startsWith('assets/images/')
    ? cleanPath.replace('assets/images/', '')
    : cleanPath

  // Handle legacy category paths
  if (relativePath.includes('categories/images/categories/')) {
    relativePath = relativePath.replace('categories/images/categories/', 'categories/')
  }

  // Try different extensions if the original fails
  const basePath = relativePath.replace(/\.[^/.]+$/, '')

  // Try extensions in appropriate order based on path
  let extensionsToTry: string[]
  if (relativePath.includes('noark/') || relativePath.includes('products/noark/')) {
    // For Noark products, try JPG first
    extensionsToTry = ['.jpg', '.jpeg', '.webp', '.png', '.avif']
  } else {
    // For other images, try WebP first for performance
    extensionsToTry = ['.webp', '.avif', '.jpg', '.png', '.jpeg']
  }

  // Return the first path with fallback to public directory
  for (const ext of extensionsToTry) {
    return `${IMAGE_BASE_URL}/${basePath}${ext}`
  }

  // Return placeholder if all else fails
  return `${IMAGE_BASE_URL}/brands/westlogo.webp`
}

// Helper function to preload critical images
export const preloadCriticalImages = () => {
  const criticalImages = [
    'brands/westlogo.webp',
    'brands/hero-background.webp',
    'brands/Noark.webp',
    'brands/LS.webp',
    'brands/Mitsubishi-Electric.webp',
    'brands/MitsubishiLogo.webp',
    'brands/TMEIC_logo.png',
    'brands/Erico.webp',
    'brands/Katko.webp',
    'brands/klemsan-logo.webp',
    'brands/Elsteel.webp'
  ]

  criticalImages.forEach(src => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = `${IMAGE_BASE_URL}/${src}`
    document.head.appendChild(link)
  })
}

// Helper function to optimize image loading with intersection observer
export const createImageObserver = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null
  }

  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        const src = img.dataset.src
        if (src) {
          img.src = src
          img.onload = () => {
            img.classList.add('loaded')
          }
          img.onerror = () => {
            img.src = getFallbackImageUrl(src)
          }
        }
      }
    })
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  })
} 