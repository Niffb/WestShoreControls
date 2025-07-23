# Intelligent Product Image System

## Overview

The Intelligent Product Image System automatically resolves the best image for any product based on its metadata (brand, category, model, specifications) without requiring hardcoded image paths. This system provides:

- **Automatic image resolution** based on product metadata
- **Intelligent fallbacks** for missing images
- **Performance optimizations** with lazy loading and preloading
- **Multiple image variants** for different use cases
- **Zero configuration** - works out of the box

## Key Features

### 🎯 Smart Image Resolution
- Automatically finds the best image based on brand, category, and model
- Uses pattern matching to locate images in organized folder structures
- Provides intelligent fallbacks when specific images aren't available

### 🚀 Performance Optimized
- Lazy loading with intersection observer
- Smart preloading based on user behavior
- Image compression and format optimization
- Memory-efficient caching

### 🎨 Multiple Variants
- Product cards, lists, tables, and galleries
- Different sizes and aspect ratios
- Badge and overlay support
- Multi-image carousels

### 🔧 Zero Configuration
- Works with existing product data
- No need to update product files
- Automatic fallback system
- Extensible configuration

## Usage

### Basic Usage

```tsx
import { IntelligentProductImage } from '@/components/ui'

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <IntelligentProductImage
        product={product}
        priority={false}
        showBadge={true}
        placeholder="blur"
      />
    </div>
  )
}
```

### Specialized Components

```tsx
import { 
  ProductCardImage, 
  ProductListImage, 
  ProductTableImage, 
  ProductGalleryImage 
} from '@/components/ui'

// For product cards
<ProductCardImage product={product} priority={false} />

// For list views
<ProductListImage product={product} />

// For table rows
<ProductTableImage product={product} />

// For image galleries with multiple images
<ProductGalleryImage product={product} />
```

### With Performance Hooks

```tsx
import { useSmartImagePreloader } from '@/lib/hooks/useImagePreloader'

function ProductGrid({ products }) {
  const { isPreloading, preloadProgress, isImagePreloaded } = useSmartImagePreloader(products)

  return (
    <div className="grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <IntelligentProductImage
            product={product}
            priority={isImagePreloaded(product)}
          />
        </div>
      ))}
      
      {isPreloading && (
        <div className="preload-indicator">
          Loading images... {Math.round(preloadProgress)}%
        </div>
      )}
    </div>
  )
}
```

## How It Works

### 1. Image Resolution Process

The system follows this resolution hierarchy:

1. **Existing Valid Images**: If the product already has valid images, use them
2. **Metadata Resolution**: Resolve based on brand, category, and model
3. **Pattern Matching**: Try various naming patterns and folder structures
4. **Category Fallback**: Use category-specific fallback images
5. **Default Fallback**: Use generic placeholder

### 2. Folder Structure Recognition

The system understands these folder patterns:

```
assets/images/products/
├── mitsubishi/
│   ├── drives/
│   ├── controllers/
│   └── servo-motors/
├── noark/
│   ├── circuit_breakers/
│   └── switches/
├── ls_industrial/
│   └── vfd_series/
└── erico/
    └── conductors/
```

### 3. Naming Pattern Recognition

Automatically recognizes these patterns:

- `brand_model.extension`
- `brand/category/model.extension`
- `brand/category/brand_model.extension`
- Series-based naming: `series_name.extension`
- Pole-specific naming: `model_1pole.extension`

## Configuration

### Image Configuration

```typescript
// lib/utils/intelligent-image-resolver.ts
const imageConfig = {
  baseUrl: '/assets/images/products',
  
  fallbackImages: {
    'Variable Frequency Drives': '/path/to/vfd-fallback.avif',
    'Circuit Breakers': '/path/to/breaker-fallback.avif',
    // Add more categories...
  },
  
  brandFolders: {
    'Mitsubishi': 'mitsubishi',
    'NOARK': 'noark',
    // Add more brands...
  },
  
  categoryMappings: {
    'Variable Frequency Drives': ['drives', 'vfd_series'],
    'Circuit Breakers': ['circuit_breakers'],
    // Add more mappings...
  }
}
```

### Custom Resolution Logic

```typescript
// Add custom patterns for specific brands
if (brandFolder === 'custom-brand') {
  if (model.includes('special-series')) {
    paths.push(`${brandFolder}/special/${model}.avif`)
  }
}
```

## Performance Optimization

### Preloading Strategies

```tsx
// Basic preloading
const { isPreloading } = useImagePreloader(products, {
  preloadCount: 10,
  priority: true
})

// Intersection-based preloading
const { observeProduct } = useIntersectionImagePreloader(products, {
  rootMargin: '200px',
  threshold: 0.1
})

// Smart preloading based on user behavior
const { userInteraction } = useSmartImagePreloader(products, {
  enabled: true,
  preloadCount: 15
})
```

### Image Optimization

- **WebP/AVIF support**: Automatically serves modern formats
- **Responsive images**: Different sizes for different viewports
- **Lazy loading**: Only loads images when needed
- **Blur placeholders**: Smooth loading experience

## Migration Guide

### From Old System

```tsx
// Old way - hardcoded paths
<Image src="/assets/images/products/hardcoded-path.jpg" />

// New way - intelligent resolution
<IntelligentProductImage product={product} />
```

### Updating Product Data

No changes needed to existing product data! The system works with:

```typescript
interface Product {
  name: string
  brand: string
  category: string
  model?: string
  images?: string[] // Optional - system will resolve if missing
}
```

## Best Practices

### 1. Image Organization
- Keep images in organized brand/category folders
- Use consistent naming conventions
- Provide multiple formats (AVIF, WebP, JPG)

### 2. Performance
- Use preloading for above-the-fold images
- Enable lazy loading for below-the-fold content
- Implement intersection observer for large lists

### 3. Fallbacks
- Ensure category fallback images exist
- Test with products that have missing images
- Provide meaningful alt text

### 4. Accessibility
- Always include descriptive alt text
- Ensure images have proper contrast
- Support keyboard navigation for galleries

## Troubleshooting

### Common Issues

**Images not loading:**
- Check folder structure matches configuration
- Verify image file extensions
- Ensure images are in public/assets folder

**Performance issues:**
- Reduce preload count
- Implement intersection observer
- Use appropriate image sizes

**Missing fallbacks:**
- Add category-specific fallback images
- Check fallback image paths
- Ensure default fallback exists

### Debugging

```tsx
// Enable debug logging
const imageUrl = resolveProductImage(product)
console.log('Resolved image:', imageUrl)

// Check preload status
const { preloadedCount, isPreloading } = useImagePreloader(products)
console.log(`Preloaded: ${preloadedCount}, Loading: ${isPreloading}`)
```

## Future Enhancements

- **Build-time image optimization**: Pre-generate responsive images
- **CDN integration**: Automatic CDN URL generation
- **Machine learning**: Smart image selection based on user preferences
- **A/B testing**: Test different image variants
- **Analytics**: Track image performance metrics

## API Reference

### Components

#### `IntelligentProductImage`
Main component for displaying product images.

**Props:**
- `product: Product` - Product data
- `className?: string` - CSS classes
- `priority?: boolean` - Load with high priority
- `sizes?: string` - Responsive image sizes
- `fill?: boolean` - Fill container
- `showBadge?: boolean` - Show product badge
- `showMultipleImages?: boolean` - Enable image carousel
- `maxImages?: number` - Maximum images to show

#### `ProductCardImage`
Optimized for product cards with hover effects.

#### `ProductListImage`
Small images for list views (64x64).

#### `ProductTableImage`
Tiny images for table rows (40x40).

#### `ProductGalleryImage`
Full-featured gallery with navigation.

### Hooks

#### `useImagePreloader`
Basic image preloading functionality.

#### `useIntersectionImagePreloader`
Preload images when they come into viewport.

#### `useSmartImagePreloader`
Intelligent preloading based on user behavior.

### Utilities

#### `resolveProductImage`
Resolve single image for a product.

#### `resolveProductImages`
Resolve multiple images for a product.

#### `IntelligentImageResolver`
Main resolver class with all logic. 