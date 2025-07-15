# Westshore Controls

This is the official website for Westshore Controls, a leading supplier of electrical control equipment and industrial automation solutions.

## Overview

Westshore Controls specializes in providing high-quality electrical control equipment including:
- Variable Frequency Drives (VFDs)
- Motor Controls
- Contactors and Relays
- Power Distribution Equipment
- Industrial Automation Components

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel/Azure Static Web Apps

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Utility Scripts

The project includes several utility scripts to help with development:

- `compress-images.sh` - Compresses and converts JPG/PNG images to WebP format
- `organize-files.sh` - Helps organize various file types into the correct directories
- `generate-favicon.js` - Generates favicon files from source image

To run these scripts:

```bash
# Compress and optimize images
chmod +x compress-images.sh
./compress-images.sh

# Organize files in the root directory
chmod +x organize-files.sh
./organize-files.sh
```

## Project Structure

- `/app` - Next.js app router pages and layouts
- `/components` - Reusable React components
- `/lib` - Utility functions, product data, and configuration
  - `/lib/data` - JSON data files for products
  - `/lib/products` - Product definitions and utility functions
  - `/lib/types` - TypeScript type definitions
  - `/lib/utils` - Utility functions for performance and SEO
  - `/lib/config` - Configuration files
- `/public` - Static assets served at root
  - `/public/images` - Public images (logos, icons)
  - `/public/documents` - PDF files (brochures, datasheets, manuals)
- `/assets` - Source assets (processed during build)
  - `/assets/images` - Source images by category
- `/docs` - Project documentation files

## Features

- Responsive design optimized for all devices
- Product catalog with search and filtering
- Partnership showcases
- Contact forms and company information
- SEO optimized with meta tags and structured data
