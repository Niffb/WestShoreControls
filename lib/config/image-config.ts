// Image hosting configuration - using local assets
export const IMAGE_BASE_URL = '/assets/images'

// Essential images that should stay local for critical page loading
export const LOCAL_IMAGES = [
  'westlogo.jpg',
  'hero-background.png',
  'placeholder.jpg',
  'PC Picture LPM.avif'
]

// Common image extensions to try when path is incomplete
const IMAGE_EXTENSIONS = ['.webp', '.jpg', '.jpeg', '.png', '.avif', '.svg']

// Helper function to get correct image URL with optimized CDN loading
export const getImageUrl = (imagePath: string): string => {
  // Handle empty or invalid paths
  if (!imagePath || imagePath === '') {
    return '/images/westlogo.jpg' // Use public fallback
  }

  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath
  
  // Handle hardcoded /images/ paths - keep them as is for public directory
  if (cleanPath.startsWith('images/') || imagePath.startsWith('/images/')) {
    return imagePath.startsWith('/') ? imagePath : `/${cleanPath}`
  }
  
  // Remove 'assets/images/' prefix if present (for backward compatibility)
  const relativePath = cleanPath.startsWith('assets/images/') 
    ? cleanPath.replace('assets/images/', '') 
    : cleanPath

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
  return `${IMAGE_BASE_URL}/${processedPath}`
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
    return '/images/westlogo.jpg' // Use public fallback
  }

  const cleanPath = originalPath.startsWith('/') ? originalPath.slice(1) : originalPath
  
  // Handle hardcoded /images/ paths - keep them as is
  if (cleanPath.startsWith('images/') || originalPath.startsWith('/images/')) {
    return originalPath.startsWith('/') ? originalPath : `/${cleanPath}`
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
    return `/images/${basePath}${ext}` // Fallback to public/images
  }
  
  // Return placeholder if all else fails
  return '/images/westlogo.jpg'
}

// Helper function to preload critical images
export const preloadCriticalImages = () => {
  const criticalImages = [
    '/images/westlogo.jpg', // Use public paths for critical images
    '/images/hero-background.png',
    '/images/Noark.jpg',
    '/images/LS.webp',
    '/images/Mitsubishi-Electric.png'
  ]

  criticalImages.forEach(src => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
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