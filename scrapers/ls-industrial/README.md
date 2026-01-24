# LS Industrial Products Generator

This generator creates a comprehensive product catalog for LS Industrial products using curated data and local images.

> **Note**: The LS Electric website uses JavaScript SPA rendering which makes direct web scraping unreliable. This generator uses pre-defined product data with local images for consistent, high-quality results.

## Product Categories

- **Variable Frequency Drives (VFDs)** - M100, S100, H100, C100, iV5, iS7, iP5A, iG5A, iC5, iE5, iS8, iS9
- **Programmable Logic Controllers (PLCs)** - XGT Series (XGK, XGI, XGR), XGB Series, XEC Series
- **Human Machine Interfaces (HMI)** - iXP2, iXP, XP, eXP Series
- **Servo & Motion Control** - L7, L7C, L7P, L7S Series Drives, APM-SA/SC/SB Motors
- **Contactors** - MC, GMC Magnetic Contactors
- **Overload Relays** - MT, GTH Thermal Overload Relays
- **Softstarters** - SS2 Soft Starter
- **Circuit Breakers** - Susol MCCB, UTE/UTS MCCB, ABN/ABS MCCB, Susol ACB, BKN/BKH MCB
- **I/O Modules** - SMART I/O Remote I/O

## Usage

### Generate Products

```bash
cd scrapers/ls-industrial
npm install
npm run scrape
```

This will:
1. Generate product data from the curated catalog
2. Map products to their local image paths
3. Save results to `scraped-products.json`

### Generate TypeScript File

```bash
npm run generate
```

This will:
1. Read `scraped-products.json`
2. Transform data to match the application's Product type
3. Generate `lib/products/ls-industrial-scraped.ts`

### Full Pipeline

```bash
npm run scrape && npm run generate
```

## Output

### scraped-products.json

Raw JSON data with all product information:

```json
{
  "id": 70001,
  "name": "M100",
  "model": "M100",
  "description": "Compact vector control drive...",
  "mainImage": "assets/images/products/ls_industrial/vfd_series/...",
  "images": ["..."],
  "features": ["Sensorless vector control", "..."],
  "specs": ["Power Range: 0.4-22kW", "..."],
  "category": "Variable Frequency Drives",
  "subcategory": "Low Voltage VFD",
  "brand": "LS Industrial"
}
```

### lib/products/ls-industrial-scraped.ts

TypeScript file ready for import in Next.js:

```typescript
import { lsIndustrialScraped } from '@/lib/products/ls-industrial-scraped'

// Get products by category
import { getScrapedProductsByCategory } from '@/lib/products/ls-industrial-scraped'
const vfds = getScrapedProductsByCategory('Variable Frequency Drives')

// Get unique categories
import { getScrapedCategories } from '@/lib/products/ls-industrial-scraped'
const categories = getScrapedCategories()
```

## Product Data

Each product includes:

| Field | Description |
|-------|-------------|
| `id` | Unique product ID (70001+) |
| `name` | Product display name |
| `model` | Product model number |
| `brand` | "LS Industrial" |
| `category` | Main product category |
| `subcategory` | Specific product series/type |
| `description` | Detailed product description |
| `price` | Generated price (for display) |
| `rating` | Product rating (4.4-4.9) |
| `reviews` | Number of reviews |
| `images` | Array of local image paths |
| `inStock` | Availability status |
| `specs` | Technical specifications |
| `features` | Product features/benefits |
| `url` | Link to LS Electric website |

## Adding New Products

To add new products, edit `scrape.js`:

1. Add the product to the `PRODUCTS` array with all fields
2. Add an image mapping in `PRODUCT_IMAGES` if an image exists
3. Run `npm run scrape && npm run generate`

## Image Locations

Product images are stored in:
- `assets/images/products/ls_industrial/` - Main product images
- `assets/images/products/ls_industrial/vfd_series/` - VFD images
- `assets/images/products/ls_industrial/circuit_breakers/` - Circuit breaker images
- `products/ls_industrial/` - Additional product images

## Statistics

Current catalog:
- **42 total products**
- **9 categories**
- **16 subcategories**
- **42 products with images**
- **42 products with specifications**
- **42 products with features**
