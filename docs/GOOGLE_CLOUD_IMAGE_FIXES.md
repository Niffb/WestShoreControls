# Google Cloud Image Loading Fixes

## Issues Identified

### 1. Missing `apple-touch-icon.png`
- **Problem**: The `manifest.json` referenced `/apple-touch-icon.png` but the file didn't exist
- **Impact**: 404 errors and potential manifest parsing issues
- **Fix**: Created `public/apple-touch-icon.png` file

### 2. Static Asset Serving Configuration
- **Problem**: Dockerfile copied `assets` to `./assets` but Next.js serves static files from `public`
- **Impact**: All `/assets/images/*` paths returning 400 errors
- **Fix**: Updated Dockerfile to copy assets to `./public/assets`

### 3. Next.js Image Optimization Issues
- **Problem**: Image optimization enabled (`unoptimized: false`) causing 400 errors in Google Cloud
- **Impact**: All optimized images failing to load
- **Fix**: Disabled image optimization (`unoptimized: true`) for deployment

### 4. Inconsistent Image Path Logic
- **Problem**: Mixed usage of `/assets/images` and `/images` paths throughout codebase
- **Impact**: Some images loading, others failing depending on path used
- **Fix**: Updated image configuration to handle both paths correctly

## Changes Made

### 1. Updated `Dockerfile`
```dockerfile
# Before
COPY --from=builder /app/assets ./assets

# After  
COPY --from=builder /app/public ./public
COPY --from=builder /app/assets ./public/assets
```

### 2. Updated `next.config.js`
```javascript
images: {
  unoptimized: true, // Disabled to prevent 400 errors in Google Cloud
  // ... other settings
}
```

### 3. Updated `lib/config/image-config.ts`
- Enhanced fallback logic for `/images/` paths
- Improved error handling with public directory fallbacks
- Updated critical image preloading to use public paths

### 4. Updated `components/ui/OptimizedImage.tsx`
- Added format fallback logic (webp → jpg → png → fallback)
- Improved error handling with automatic format switching

### 5. Updated `components/brand/BrandCategoriesPageNew.tsx`
- Standardized brand logos to use `getImageUrl()` helper
- Ensures consistent path handling

### 6. Created Missing Files
- `public/apple-touch-icon.png` - Required by manifest.json
- `.dockerignore` - Optimizes Docker build context

## Deployment Instructions

1. **Build New Docker Image**:
   ```bash
   docker build -t westshorecontrols .
   ```

2. **Test Locally**:
   ```bash
   docker run -p 3000:3000 westshorecontrols
   ```

3. **Deploy to Google Cloud**:
   - Push the updated Docker image to Google Container Registry
   - Deploy the new image to your Google Cloud Run service

## Verification

After deployment, verify that:
- [ ] Brand logos display correctly on all pages
- [ ] No 400 errors for images in browser console
- [ ] No 404 errors for apple-touch-icon.png or TMEIC_logo.svg
- [ ] Manifest.json loads without syntax errors
- [ ] All product images load correctly

## Technical Notes

### Image Serving Strategy
- **Public Directory**: Critical images served directly from `/public/images/*`
- **Assets Directory**: Product images served from `/public/assets/images/*`
- **Fallback Logic**: Automatic fallback to public directory if assets fail

### Performance Considerations
- Image optimization disabled to prevent server errors
- Format fallback ensures maximum compatibility
- Lazy loading still enabled for performance

### Future Improvements
- Consider implementing a CDN for image serving
- Re-enable image optimization when server configuration allows
- Implement progressive image loading for better UX

## Troubleshooting

If images still don't load after deployment:

1. **Check Container Logs**:
   ```bash
   gcloud logs read --service=your-service-name
   ```

2. **Verify File Permissions**:
   - Ensure the nextjs user has read access to copied files
   - Check that files were copied correctly in container

3. **Test Image Paths**:
   - Access individual image URLs directly
   - Verify both `/images/*` and `/assets/images/*` paths work

4. **Fallback Strategy**:
   - All images should fall back to `/images/westlogo.jpg` if they fail
   - Check browser network tab for specific failing requests 