# nVent ERIFLEX/ERICO Product Scraper

Scrapes product data from the [nVent ERIFLEX website](https://www.nvent.com/en-gb/eriflex) for the West Shore Controls product catalog.

## Product Categories

The scraper covers all major ERIFLEX product categories:

1. **Flexible Busbars** - Flexibar Advanced, Kits, End Covers, Supports
2. **Flexible Conductors** - IBS, IBSB, IBSHY, PBC, PPS braided conductors
3. **FleXbus System** - Conductors, Supports, Clamps, Fire Barriers
4. **Distribution Blocks** - Power blocks, terminals, PEN systems
5. **Grounding Braids** - CPI, MBJ, MBJYG, BJ bonding braids
6. **Power Meters** - Network analyzers, Rogowski sensors
7. **Insulators** - ISO-TP, ISO-ADV low voltage insulators
8. **Earthing Busbars** - EB-12 through EB-60, connecting bars
9. **Copper Busbars** - PCB, DPCB, TCB threaded busbars
10. **Busbar Supports** - Adjustable, flat, compact, universal supports
11. **Connecting Clamps** - BC, FC, FBC, HCBC, QCC clamps
12. **DIN Profiles** - PDRG, PDR, PCR, DRG, DR profiles
13. **Cable Management** - FGBS, PDBS, SBS, Spirflex, Zipflex sleeves
14. **Tools** - Hydraulic, manual, and crimping tools

## Installation

```bash
cd scrapers/erico
npm install
```

## Usage

### Option 1: Live Scraping (Puppeteer)

Scrapes directly from the nVent website using Puppeteer:

```bash
npm run scrape
```

**Requirements:**
- Google Chrome installed
- Or set `CHROME_PATH` environment variable

### Option 2: Generate from Curated Data

Generates products from the curated product catalog (recommended for reliability):

```bash
npm run generate
```

This uses pre-defined product data based on the nVent ERIFLEX catalog and doesn't require Chrome.

## Output

Both methods output to `scraped-products.json` with the following structure:

```json
{
  "id": 3100,
  "name": "nVent ERIFLEX Flexibar Advanced",
  "model": "FLEXIBAR-ADV",
  "brand": "ERICO",
  "category": "Flexible Busbars",
  "subcategory": "Flexibar Advanced",
  "description": "...",
  "features": ["..."],
  "specs": ["..."],
  "images": [],
  "url": "https://www.nvent.com/en-gb/eriflex",
  "inStock": true
}
```

## Integration

After scraping, integrate the products into the main application:

1. Copy/merge `scraped-products.json` into the lib/products directory
2. Update `lib/products/erico-products.ts` or create `lib/products/erico-products-scraped.ts`
3. Import in `lib/products/products.ts`

## Notes

- Product IDs start at 3100 (existing ERICO products are 3001-3024)
- Images need to be downloaded separately and placed in `public/assets/images/products/erico/`
- The nVent website uses JavaScript SPA rendering, which can make direct scraping challenging
- The generate script provides more reliable product data
