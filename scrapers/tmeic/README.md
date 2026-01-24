# TMEIC Product Scraper

A Node.js scraper for fetching product data from the TMEIC website.

## Features

- Scrapes product names, models, and descriptions
- Extracts image URLs directly from TMEIC's website
- Generates TypeScript file for use in the Next.js website
- Images are loaded directly from TMEIC servers (no local storage needed)

## Setup

```bash
cd scrapers/tmeic
npm install
```

## Usage

### 1. Scrape Products

```bash
npm run scrape
```

This will:
- Fetch all TMEIC product pages
- Extract product data and image URLs
- Save to `scraped-products.json`

### 2. Generate TypeScript File

```bash
npm run generate
```

This will:
- Read `scraped-products.json`
- Generate `tmeic-products-scraped.ts` in `/lib/products/`

## Categories Scraped

- Variable Frequency Drives (TMdrive series)
- DC Drives
- PV Inverters (Solar Ware series)
- Energy Storage
- Motors
- Generators
- Controllers
- Software

## Notes

- Images are referenced directly from `tmeic.com` - no local copies needed
- Respects server with 1-second delay between requests
- Products can be re-scraped anytime to update data
