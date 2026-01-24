# KATKO Product Scraper

Scrapes product data from the KATKO website (https://www.katko.com/products/).

## Categories Scraped
- Enclosed Isolators (Safety switches, Isolators, Disconnectors)
- Load Break Switches (Rotary switches, Toggle Switches, Change-over switches)
- Switch Fuses
- UL/CSA Listed (Enclosed switches, Disconnectors, UL98 Switches)
- Installation Enclosures (KCS Enclosures and Accessories)
- Connectors (Terminal blocks and cable connectors)
- Accessories (Auxiliary contacts, cable glands, handles)

## Usage

### 1. Install dependencies
```bash
npm install
```

### 2. Run the scraper
This will crawl all categories and product pages, saving data to `scraped-products.json`:
```bash
npm run scrape
```

### 3. Generate TypeScript file
This converts the scraped data into a TypeScript file for the website:
```bash
npm run generate
```

The output file will be saved to `lib/products/katko-products-scraped.ts`.

## Notes
- The scraper includes a delay between requests to be respectful to the server
- Product images are loaded from og:image meta tags when available
- Products are assigned IDs starting from 80001
