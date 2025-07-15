# File Structure Documentation

This document outlines the file structure and organization conventions used in the Westshore Controls website project.

## Overview

The project follows a structured approach to file organization to ensure maintainability and efficiency. The key directories include:

```
westshorecontrols-production/
├── app/                    # Next.js App Router pages and routing
├── assets/                 # Source assets (processed during build)
│   └── images/             # Original source images
│       ├── brands/         # Brand logos and images
│       └── products/       # Product images by brand
├── components/             # React components
├── lib/                    # Library code, utilities, and data
│   ├── config/             # Configuration files
│   ├── data/               # JSON data files
│   │   └── raw/            # Raw data files for processing
│   ├── products/           # Product definitions
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── public/                 # Static assets (served at root)
│   ├── documents/          # PDF files
│   │   ├── brochures/      # Product brochures
│   │   ├── datasheets/     # Product datasheets
│   │   └── manuals/        # User manuals and guides
│   └── images/             # Optimized images for web
└── docs/                   # Project documentation
```

## Image Handling

The project uses a dual-image structure:

1. **Source Images** (`/assets/images/`) - Original, high-quality source images
2. **Optimized Images** (`/public/images/`) - Processed, web-optimized versions

When adding new images:

1. Place the source images in the appropriate `/assets/images/` subdirectory
2. Run `./compress-images.sh` to generate optimized WebP versions
3. Use the `getImageUrl()` function from `lib/config/image-config.ts` to reference images in code

## Product Data

Product data is structured as follows:

- Product definitions are in the `/lib/products/` directory
- Each brand has its own file (`mitsubishi-products.ts`, etc.)
- Supplementary JSON data is stored in `/lib/data/`
- Raw data files that need processing are in `/lib/data/raw/`

## Documentation

Project documentation is stored in the `/docs/` directory:

- Feature-specific documentation (e.g., `PERFORMANCE_IMPROVEMENTS.md`)
- Process documentation (e.g., this file, `FILE_STRUCTURE.md`)

## Utility Scripts

The project includes several utility scripts:

- `compress-images.sh` - Converts and optimizes images for the web
- `organize-files.sh` - Helps sort files into the correct directories
- `generate-favicon.js` - Generates favicons from source image

## Best Practices

When adding new files:

1. Follow the existing organization patterns
2. Use the appropriate directory for the file type
3. For new images, follow the image handling guidelines
4. Run `./organize-files.sh` if you're unsure where a file should go
5. Update documentation if you introduce significant structural changes 