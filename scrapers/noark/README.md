# NOARK Electric Scraper

Scrapes product data from the NOARK Electric website (products.na.noark-electric.com).

## Setup

```bash
npm install
```

## Usage

### Scrape Products
```bash
npm run scrape
```

This will:
1. Navigate to the NOARK products catalog using Puppeteer (browser-based)
2. Scrape all product categories
3. Output to `scraped-products.json`

### Generate TypeScript
```bash
npm run generate
```

Converts the scraped JSON to TypeScript format for use in the brands page.

## Notes

- The products catalog (products.na.noark-electric.com) blocks direct HTTP requests (returns 403)
- Puppeteer is used to bypass this by rendering pages in a real browser
- Add delays between requests to be respectful to the server
