#!/bin/bash

# Complete Image Optimization Script for westshorecontrols-production
# This script helps you transition from JPG/PNG to WebP images

echo "🖼️  Image Optimization Helper"
echo "================================"

# Function to calculate directory size
get_dir_size() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        du -sh "$1" | cut -f1
    else
        du -sh "$1" | cut -f1
    fi
}

# Current status
echo "📊 Current Status:"
original_size=$(get_dir_size assets/images)
echo "Total directory size: $original_size"

# Count files
jpg_count=$(find assets/images -name "*.jpg" | wc -l | tr -d ' ')
png_count=$(find assets/images -name "*.png" | wc -l | tr -d ' ')
webp_count=$(find assets/images -name "*.webp" | wc -l | tr -d ' ')

echo "📁 File counts:"
echo "  JPG files: $jpg_count"
echo "  PNG files: $png_count"
echo "  WebP files: $webp_count"

# Show potential savings examples
echo ""
echo "💾 Compression Examples:"
echo "Sample of original vs WebP sizes:"

# Show a few examples
count=0
find assets/images -name "*.jpg" -o -name "*.png" | head -5 | while read -r original_file; do
    if [[ -f "$original_file" ]]; then
        basename="${original_file%.*}"
        webp_file="${basename}.webp"
        
        if [[ -f "$webp_file" ]]; then
            original_size_bytes=$(stat -f%z "$original_file" 2>/dev/null || stat -c%s "$original_file" 2>/dev/null || echo "0")
            webp_size_bytes=$(stat -f%z "$webp_file" 2>/dev/null || stat -c%s "$webp_file" 2>/dev/null || echo "0")
            
            if [[ $original_size_bytes -gt 0 && $webp_size_bytes -gt 0 ]]; then
                reduction=$(echo "scale=1; (1 - $webp_size_bytes / $original_size_bytes) * 100" | bc -l 2>/dev/null || echo "N/A")
                echo "  $(basename "$original_file"): ${reduction}% smaller"
            fi
        fi
    fi
done

echo ""
echo "🔧 Next Steps - Choose an option:"
echo "1. Update code references (find/replace .jpg/.png with .webp)"
echo "2. Remove original files after updating code"
echo "3. Create backup before cleanup"
echo "4. Show files with spaces in names (need manual handling)"
echo ""

read -p "Enter your choice (1-4) or 'q' to quit: " choice

case $choice in
    1)
        echo "🔍 Searching for image references in code files..."
        echo "Found references in these files:"
        grep -r "\.(jpg\|png\|jpeg)" --include="*.tsx" --include="*.ts" --include="*.js" --include="*.jsx" . | head -10
        echo ""
        echo "💡 You'll need to manually update these references to use .webp extensions"
        echo "   Example: 'image.jpg' → 'image.webp'"
        ;;
    2)
        echo "⚠️  WARNING: This will DELETE original JPG/PNG files!"
        read -p "Are you sure? Type 'DELETE' to confirm: " confirm
        if [[ "$confirm" == "DELETE" ]]; then
            echo "🗑️  Removing original files..."
            find assets/images -name "*.jpg" -delete
            find assets/images -name "*.png" -delete
            new_size=$(get_dir_size assets/images)
            echo "✅ Cleanup complete!"
            echo "📊 New directory size: $new_size"
        else
            echo "❌ Cancelled - no files deleted"
        fi
        ;;
    3)
        echo "💾 Creating backup..."
        backup_name="assets_backup_$(date +%Y%m%d_%H%M%S)"
        cp -r assets/images "$backup_name"
        echo "✅ Backup created: $backup_name"
        ;;
    4)
        echo "📋 Files with spaces in names (need manual handling):"
        find assets/images -name "* *" | head -10
        ;;
    q)
        echo "👋 Goodbye!"
        ;;
    *)
        echo "❌ Invalid choice"
        ;;
esac

echo ""
echo "📈 Performance Benefits of WebP:"
echo "• 25-35% smaller file sizes on average"
echo "• Faster page load times"
echo "• Better SEO scores"
echo "• Modern browser support (95%+ compatibility)"
echo ""
echo "🔗 Don't forget to update your image references in the code!" 