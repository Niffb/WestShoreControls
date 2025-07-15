#!/bin/bash

# Image compression script for westshorecontrols-production
# This script converts JPG/PNG files to WebP format for better compression

echo "🖼️  Starting image compression..."
echo "📁 Scanning assets/images directory..."

# Counter for processed files
total_files=0
compressed_files=0
total_size_before=0
total_size_after=0

# Function to get file size in bytes
get_file_size() {
    if [[ -f "$1" ]]; then
        if [[ "$OSTYPE" == "darwin"* ]]; then
            stat -f%z "$1"
        else
            stat -c%s "$1"
        fi
    else
        echo 0
    fi
}

# Find and process JPG/PNG files
find assets/images -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r file; do
    total_files=$((total_files + 1))
    
    # Get original file size
    original_size=$(get_file_size "$file")
    total_size_before=$((total_size_before + original_size))
    
    # Get file extension and basename
    extension="${file##*.}"
    basename="${file%.*}"
    webp_file="${basename}.webp"
    
    # Skip if WebP version already exists
    if [[ -f "$webp_file" ]]; then
        echo "⏭️  Skipping $file (WebP version exists)"
        continue
    fi
    
    echo "🔄 Processing: $file"
    
    # Convert to WebP with high quality (85% quality, good balance of size/quality)
    if cwebp -q 85 "$file" -o "$webp_file" 2>/dev/null; then
        webp_size=$(get_file_size "$webp_file")
        total_size_after=$((total_size_after + webp_size))
        compressed_files=$((compressed_files + 1))
        
        # Calculate compression ratio
        if [[ $original_size -gt 0 ]]; then
            compression_ratio=$(echo "scale=1; (1 - $webp_size / $original_size) * 100" | bc -l 2>/dev/null || echo "N/A")
            echo "✅ Created: $webp_file (${compression_ratio}% smaller)"
        else
            echo "✅ Created: $webp_file"
        fi
        
        # Optional: Remove original file (uncomment the next line if you want to delete originals)
        # rm "$file"
    else
        echo "❌ Failed to convert: $file"
    fi
done

echo ""
echo "📊 Compression Summary:"
echo "📁 Total files found: $total_files"
echo "✅ Files compressed: $compressed_files"

# Calculate total savings if we have bc available
if command -v bc >/dev/null 2>&1 && [[ $total_size_before -gt 0 ]]; then
    size_mb_before=$(echo "scale=2; $total_size_before / 1048576" | bc -l)
    size_mb_after=$(echo "scale=2; $total_size_after / 1048576" | bc -l)
    savings_percent=$(echo "scale=1; (1 - $total_size_after / $total_size_before) * 100" | bc -l)
    echo "💾 Size before: ${size_mb_before}MB"
    echo "💾 Size after: ${size_mb_after}MB"
    echo "🎉 Total savings: ${savings_percent}%"
fi

echo ""
echo "🔧 Next steps:"
echo "1. Update your code to use .webp extensions instead of .jpg/.png"
echo "2. Test that all images load correctly"
echo "3. If everything works, you can delete the original files to save space"
echo ""
echo "💡 Tip: Modern browsers support WebP format and it typically reduces file sizes by 25-35%" 