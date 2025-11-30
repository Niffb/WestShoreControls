# Adding New Test Product Categories

This guide explains how to add new product categories to the dynamic test products system.

## 📁 Folder Structure

The test products system loads products from the `Products-test/` folder using this structure:

```
Products-test/
├── VFDs/
│   ├── Images/
│   │   └── Mitsubishi_FR-A800_240_VFDs_medium.avif
│   └── Json/
│       └── 240V-Class.json
├── Servo-Motors/
│   └── Json/
│       └── servo-motors.json
└── [New-Category]/
    ├── Images/
    │   └── [product-images]
    └── Json/
        └── [category-data].json
```

## 🔧 Adding a New Category

### Step 1: Create Folder Structure

Create the folder structure for your new category:

```bash
mkdir -p "Products-test/[Category-Name]/Json"
mkdir -p "Products-test/[Category-Name]/Images"
```

### Step 2: Create JSON Data File

Create a JSON file with your product data:

```json
{
  "products": [
    {
      "product_number": "PRODUCT-123",
      "name": "Product Name",
      "description": "Detailed product description with specifications",
      "price": 999.99,
      "stock_status": "In Stock",
      "image_url": "Products-test/[Category-Name]/Images/product-image.jpg"
    }
  ]
}
```

### Step 3: Update Test Product Loader

Add your category to `lib/utils/test-product-loader.ts`:

```typescript
// In the switch statement of loadTestCategoryProducts function
case 'your-category-slug':
  try {
    const categoryData = await import('@/Products-test/[Category-Name]/Json/[data-file].json')
    products = transformTestProducts(categoryData.default as TestProductData, 'Category Display Name', 'category-slug')
  } catch (error) {
    console.error('Failed to load category products:', error)
  }
  break
```

### Step 4: Update Route Metadata

Add metadata in `app/test-products/[category]/page.tsx`:

```typescript
const categoryMetadata: { [key: string]: { name: string, description: string, keywords: string } } = {
  // ... existing categories
  'your-category-slug': {
    name: 'Your Category Name',
    description: 'Description of your category products',
    keywords: 'relevant, keywords, for, seo'
  }
}
```

### Step 5: Add Category to Products Test Page

Update `app/products-test/page.tsx`:

1. Add to test categories array:
```typescript
const testCategories = [
  // ... existing categories
  {
    name: 'Your Category Name',
    product_count: 10, // number of products
    slug: 'your-category-test',
    json_file: 'your-data.json'
  }
]
```

2. Add routing logic:
```typescript
href={
  category.slug === 'vfd-test' ? '/test-products/vfds' :
  category.slug === 'servo-motors-test' ? '/test-products/servo-motors' :
  category.slug === 'your-category-test' ? '/test-products/your-category-slug' :
  `/category-test/${category.slug}`
}
```

3. Add icons and colors:
```typescript
// Icon mapping
'your-category-test': YourIcon

// Color mapping
'your-category-test': { gradient: 'from-color-500 to-color-600', bg: 'bg-color-500' }
```

## 📋 JSON Data Format

### Required Fields
- `description`: Product description (required)

### Optional Fields
- `product_number`: Product model/part number
- `name`: Product name (falls back to product_number)
- `price`: Product price
- `stock_status`: "In Stock", "Limited Stock", "Out of Stock"
- `image_url`: Path to product image

### Example JSON Structure

```json
{
  "products": [
    {
      "product_number": "ABC-123",
      "name": "Sample Product",
      "description": "High-performance product with advanced features. Specifications: 100V, 5A, Frame Size B, Weight: 2.5lbs",
      "price": 299.99,
      "stock_status": "In Stock",
      "image_url": "Products-test/Sample-Category/Images/sample-product.jpg"
    }
  ]
}
```

## 🎯 Features Automatically Generated

The system automatically extracts:

- **Specifications**: Voltage, current, power, frame size, weight, etc.
- **Features**: Standard model, certifications, cooling type, etc.
- **Brand**: Detected from product description
- **Stock Status**: Badge display for in-stock products
- **Search**: Full-text search across all product fields

## 🚀 Navigation

Once configured, users can:

1. Visit `/products-test` to see all categories
2. Click on your category card
3. Navigate to `/test-products/your-category-slug`
4. Browse, search, and view product details

## 📝 Notes

- Images should be optimized (WebP/AVIF preferred)
- Product descriptions should include specifications for auto-extraction
- Category slugs should be lowercase with hyphens
- The system is hydration-safe and SEO optimized
