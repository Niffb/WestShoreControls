#!/bin/bash

# File organization script for westshorecontrols-production
# This script helps organize files into their correct directories based on type

echo "📁 Starting file organization..."

# Create required directories if they don't exist
mkdir -p assets/images/products/{mitsubishi,noark,erico,katko,klemsan,ls,tmeic,elsteel}
mkdir -p assets/images/brands
mkdir -p public/images/{brands,products}
mkdir -p public/documents/{brochures,datasheets,manuals}
mkdir -p lib/data/raw

# Move image files to appropriate directories
echo "🖼️ Moving image files..."
find . -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" -o -iname "*.avif" \) | while read file; do
  # Extract filename
  filename=$(basename "$file")
  
  # Determine target directory based on filename
  if [[ "$filename" == *"mitsubishi"* || "$filename" == *"Alpha_2"* || "$filename" == *"Melsec"* || "$filename" == *"IQ-"* ]]; then
    echo "Moving $filename to assets/images/products/mitsubishi/"
    mv "$file" "assets/images/products/mitsubishi/"
  elif [[ "$filename" == *"noark"* || "$filename" == *"NOARK"* ]]; then
    echo "Moving $filename to assets/images/products/noark/"
    mv "$file" "assets/images/products/noark/"
  elif [[ "$filename" == *"erico"* || "$filename" == *"ERICO"* ]]; then
    echo "Moving $filename to assets/images/products/erico/"
    mv "$file" "assets/images/products/erico/"
  elif [[ "$filename" == *"katko"* || "$filename" == *"KATKO"* ]]; then
    echo "Moving $filename to assets/images/products/katko/"
    mv "$file" "assets/images/products/katko/"
  elif [[ "$filename" == *"klemsan"* || "$filename" == *"KLEMSAN"* ]]; then
    echo "Moving $filename to assets/images/products/klemsan/"
    mv "$file" "assets/images/products/klemsan/"
  elif [[ "$filename" == *"ls"* || "$filename" == *"LS"* ]]; then
    echo "Moving $filename to assets/images/products/ls/"
    mv "$file" "assets/images/products/ls/"
  elif [[ "$filename" == *"tmeic"* || "$filename" == *"TMEIC"* ]]; then
    echo "Moving $filename to assets/images/products/tmeic/"
    mv "$file" "assets/images/products/tmeic/"
  elif [[ "$filename" == *"elsteel"* || "$filename" == *"ELSTEEL"* ]]; then
    echo "Moving $filename to assets/images/products/elsteel/"
    mv "$file" "assets/images/products/elsteel/"
  elif [[ "$filename" == *"logo"* || "$filename" == *"Logo"* || "$filename" == *"LOGO"* ]]; then
    echo "Moving $filename to assets/images/brands/"
    mv "$file" "assets/images/brands/"
  else
    echo "Couldn't determine category for $filename"
  fi
done

# Move document files to appropriate directories
echo "📄 Moving document files..."
find . -maxdepth 1 -type f \( -iname "*.pdf" -o -iname "*.PDF" \) | while read file; do
  # Extract filename
  filename=$(basename "$file")
  
  # Determine target directory based on filename
  if [[ "$filename" == *"brochure"* || "$filename" == *"Brochure"* ]]; then
    echo "Moving $filename to public/documents/brochures/"
    mv "$file" "public/documents/brochures/"
  elif [[ "$filename" == *"datasheet"* || "$filename" == *"Datasheet"* || "$filename" == *"spec"* || "$filename" == *"Spec"* ]]; then
    echo "Moving $filename to public/documents/datasheets/"
    mv "$file" "public/documents/datasheets/"
  elif [[ "$filename" == *"manual"* || "$filename" == *"Manual"* || "$filename" == *"guide"* || "$filename" == *"Guide"* ]]; then
    echo "Moving $filename to public/documents/manuals/"
    mv "$file" "public/documents/manuals/"
  else
    echo "Moving $filename to public/documents/brochures/ (default)"
    mv "$file" "public/documents/brochures/"
  fi
done

# Move JSON data files to data directory
echo "🧩 Moving JSON data files..."
find . -maxdepth 1 -type f -name "*.json" -not -path "./package*.json" -not -path "./tsconfig.json" -not -path "./tailwind.config.js" -not -path "./next.config.js" | while read file; do
  echo "Moving $(basename "$file") to lib/data/"
  mv "$file" "lib/data/"
done

# Move text data files to raw data directory
echo "📊 Moving text data files..."
find . -maxdepth 1 -type f -name "*.txt" | while read file; do
  echo "Moving $(basename "$file") to lib/data/raw/"
  mv "$file" "lib/data/raw/"
done

echo ""
echo "✅ File organization complete!"
echo ""
echo "💡 Next steps:"
echo "1. Run './compress-images.sh' to optimize any new images"
echo "2. Update your code to use the new file paths if needed"
echo "" 