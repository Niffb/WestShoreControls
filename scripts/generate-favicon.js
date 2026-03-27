const fs = require('fs');
const path = require('path');

console.log('Generating favicon files...');

// Copy the existing westlogo.webp to favicon.ico location
try {
  // First, ensure favicon.ico exists and is not empty
  const faviconPath = path.join(__dirname, 'public', 'favicon.ico');
  const westLogoPath = path.join(__dirname, 'public', 'assets', 'images', 'brands', 'westlogo.webp');
  
  // Remove the empty favicon.ico if it exists
  if (fs.existsSync(faviconPath)) {
    console.log('Removing empty favicon.ico...');
    fs.unlinkSync(faviconPath);
  }
  
  // Copy westlogo.webp to favicon.ico location
  // Note: This is a temporary solution until a proper .ico file can be generated
  console.log(`Copying ${westLogoPath} to favicon.ico location...`);
  fs.copyFileSync(westLogoPath, faviconPath);
  
  console.log('Favicon files generated successfully!');
  console.log('Note: For a production environment, it is recommended to generate a proper .ico file using a tool like ImageMagick or a favicon generator service.');
} catch (error) {
  console.error('Error generating favicon files:', error);
} 