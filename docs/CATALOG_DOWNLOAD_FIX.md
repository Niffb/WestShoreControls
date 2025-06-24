# Catalog Download Fix

## Issue
When users clicked the download button on the catalogs page, they were downloading HTML files instead of the actual PDF files. This was happening because the direct links to `/downloads/catalogs/filename.pdf` were being handled by Next.js routing instead of serving the static files directly.

## Root Cause
- Direct links to PDF files in the `/public/downloads/` directory were not being served with proper headers
- Browsers were receiving the HTML page response instead of the PDF file
- Missing `Content-Disposition: attachment` header to force download behavior
- Incorrect content-type headers

## Solution
Created a dedicated API route handler at `/app/api/download/[...path]/route.ts` that:

1. **Properly serves PDF files** with correct content-type (`application/pdf`)
2. **Forces download behavior** using `Content-Disposition: attachment` header
3. **Includes security checks** to prevent path traversal attacks
4. **Provides proper caching** with `Cache-Control` headers
5. **Includes logging** for debugging purposes

## Changes Made

### 1. Created API Route
- **File**: `app/api/download/[...path]/route.ts`
- **Purpose**: Handle all catalog downloads through a controlled endpoint
- **Features**:
  - Path traversal protection
  - Proper content-type headers
  - Forced download behavior
  - Error handling and logging

### 2. Updated Catalog URLs
- **File**: `components/page/CatalogsPage.tsx`
- **Change**: Updated all `downloadUrl` properties from `/downloads/catalogs/filename.pdf` to `/api/download/catalogs/filename.pdf`
- **Impact**: All catalog downloads now go through the new API route

### 3. Enhanced Next.js Configuration
- **File**: `next.config.js`
- **Addition**: Added headers configuration for `/api/download/:path*` endpoints
- **Purpose**: Additional caching and security headers

## Testing
The solution has been tested and verified:

```bash
# Test API endpoint directly
curl -I http://localhost:3000/api/download/catalogs/noark-product-catalogue.pdf

# Expected response includes:
# content-type: application/pdf
# content-disposition: attachment; filename="noark-product-catalogue.pdf"
# content-length: [file_size]
```

## Files Available
All catalog files are properly located in `/public/downloads/catalogs/`:
- `2025-les-product-catalogue.pdf` (141 MB)
- `noark-product-catalogue.pdf` (6.5 MB)
- `automation-klemsan.pdf` (12 MB)
- `klemsan-accessories.pdf` (6.8 MB)
- `katko-product-catalogue-2021.pdf` (41 MB)
- All Elsteel brochures (7 files)

## Security Features
- Path traversal protection prevents accessing files outside the downloads directory
- Proper content-type validation
- Logging for security monitoring

## Benefits
1. ✅ **Proper PDF downloads** instead of HTML files
2. ✅ **Forced download behavior** - files are saved, not opened in browser
3. ✅ **Security protection** against path traversal attacks
4. ✅ **Better performance** with proper caching headers
5. ✅ **Easy debugging** with comprehensive logging
6. ✅ **Consistent behavior** across all browsers and devices 