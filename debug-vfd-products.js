// Debug script to check Mitsubishi VFD products
const fs = require('fs');

// Read the mitsubishi products file to see what's being loaded
const mitsubishiProductsPath = './lib/products/mitsubishi-products.ts';

if (fs.existsSync(mitsubishiProductsPath)) {
  const content = fs.readFileSync(mitsubishiProductsPath, 'utf8');
  
  // Extract some product examples
  const lines = content.split('\n');
  const vfdLines = lines.filter(line => 
    line.includes('Variable Frequency Drives') || 
    line.includes('FR-A') || 
    line.includes('MELSERVO') ||
    line.includes('images:')
  );
  
  console.log('Mitsubishi VFD Product Data Analysis:');
  console.log('=====================================');
  
  vfdLines.slice(0, 20).forEach((line, index) => {
    console.log(`${index + 1}: ${line.trim()}`);
  });
  
  console.log('\n\nLooking for image paths in products...');
  
  const imageLines = lines.filter(line => 
    line.includes('images:') || 
    line.includes('assets/images/products/mitsubishi')
  );
  
  imageLines.slice(0, 10).forEach((line, index) => {
    console.log(`Image ${index + 1}: ${line.trim()}`);
  });
  
} else {
  console.log('Mitsubishi products file not found');
}

// Check if our image files exist
const imagePath = './public/assets/images/products/mitsubishi/drives/';

if (fs.existsSync(imagePath)) {
  const files = fs.readdirSync(imagePath);
  console.log('\n\nAvailable Mitsubishi VFD Images:');
  console.log('===============================');
  files.forEach((file, index) => {
    console.log(`${index + 1}: ${file}`);
  });
  
  console.log(`\nTotal images found: ${files.length}`);
} else {
  console.log('\n\nImage directory not found:', imagePath);
}

// Test the image resolver logic
console.log('\n\nTesting Image Resolver Logic:');
console.log('============================');

const testProducts = [
  {
    name: "FR-A820-00046-1-60 A800 Plus Series Inverter",
    model: "FR-A820-00046-1-60", 
    brand: "Mitsubishi",
    category: "Variable Frequency Drives",
    images: []
  },
  {
    name: "MELSERVO J5 AC Servo System",
    model: "MELSERVO-J5",
    brand: "Mitsubishi", 
    category: "Variable Frequency Drives",
    images: []
  }
];

testProducts.forEach(product => {
  console.log(`\nProduct: ${product.name}`);
  console.log(`Model: ${product.model}`);
  console.log(`Brand: ${product.brand}`);
  console.log(`Category: ${product.category}`);
  console.log(`Has existing images: ${product.images.length > 0 ? 'Yes' : 'No'}`);
  
  // Simulate resolution
  const model = product.model?.toLowerCase() || '';
  const name = product.name?.toLowerCase() || '';
  
  if (product.brand === 'Mitsubishi' && product.category.includes('Drive')) {
    let expectedImage = null;
    
    if (model.includes('a800') || name.includes('a800')) {
      expectedImage = '/assets/images/products/mitsubishi/drives/Mitsubishi_A800_Series_300x300_f4449bac-61ee-47f0-8e3b-7aa6411acc03_medium.avif';
    } else if (model.includes('melservo') || name.includes('melservo')) {
      if (model.includes('j5') || name.includes('j5')) {
        expectedImage = '/assets/images/products/mitsubishi/drives/Mitsubishi_MELSERVO_J5_medium.avif';
      }
    }
    
    console.log(`Expected image: ${expectedImage || 'No match found'}`);
    
    if (expectedImage) {
      const fullPath = './public' + expectedImage;
      const exists = fs.existsSync(fullPath);
      console.log(`Image file exists: ${exists ? 'Yes' : 'No'}`);
      if (!exists) {
        console.log(`Looking for file at: ${fullPath}`);
      }
    }
  }
}); 