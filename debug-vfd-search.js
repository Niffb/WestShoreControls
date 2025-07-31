// Debug script to test VFD product loading and search
const { getAllProductsIncludingMitsubishi } = require('./lib/products/products.ts');

async function testVFDProducts() {
  try {
    console.log('Loading all products...');
    const allProducts = await getAllProductsIncludingMitsubishi();
    console.log(`Total products loaded: ${allProducts.length}`);
    
    // Filter VFD products using the same logic as product-types.ts
    const vfdProducts = allProducts.filter(product => {
      const category = product.category?.toLowerCase() || '';
      const name = product.name?.toLowerCase() || '';
      const description = product.description?.toLowerCase() || '';
      
      // Include if category is exactly "Variable Frequency Drives"
      if (product.category === 'Variable Frequency Drives') {
        return true;
      }
      
      // Include if subcategory contains "Series Inverters" (for Mitsubishi drives)
      if (product.subcategory?.includes('Series Inverters')) {
        return true;
      }
      
      // Exclude products that are clearly not VFDs
      const nonVfdCategories = [
        'controllers', 'controller', 'plc', 'programmable logic',
        'hmi', 'human machine interface',
        'robots', 'robot', 'robotics',
        'computing', 'computer', 'industrial computer',
        'servo motors', 'servo motor', 'servo',
        'circuit breakers', 'circuit breaker',
        'contactors', 'contactor',
        'overload relays', 'overload relay',
        'terminal blocks', 'terminal block',
        'switches', 'switch',
        'sensors', 'sensor',
        'cables', 'cable',
        'enclosures', 'enclosure'
      ];
      
      // Check if this product belongs to non-VFD categories
      const isNonVfd = nonVfdCategories.some(nonVfdCat => 
        category.includes(nonVfdCat) ||
        name.includes(nonVfdCat) ||
        description.includes(nonVfdCat)
      );
      
      if (isNonVfd) {
        return false;
      }
      
      // Include if name/description contains VFD-related terms
      const vfdTerms = [
        'variable frequency drive', 'vfd', 'inverter', 'drive',
        'frequency drive', 'ac drive', 'motor drive',
        'freqrol', 'starvert', 'tmdrive'
      ];
      
      const isVfd = vfdTerms.some(vfdTerm => 
        category.includes(vfdTerm) ||
        name.includes(vfdTerm) ||
        description.includes(vfdTerm)
      );
      
      return isVfd;
    });
    
    console.log(`VFD products found: ${vfdProducts.length}`);
    console.log('Sample VFD products:');
    vfdProducts.slice(0, 10).forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} (${product.brand}) - ${product.category}`);
    });
    
    // Test search functionality
    const searchTerm = 'mitsubishi';
    const searchResults = vfdProducts.filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        (product.model && product.model.toLowerCase().includes(searchTerm)) ||
        (product.specs && product.specs.some(spec => spec.toLowerCase().includes(searchTerm))) ||
        (product.features && product.features.some(feature => feature.toLowerCase().includes(searchTerm)));
      
      return matchesSearch;
    });
    
    console.log(`\nSearch results for "${searchTerm}": ${searchResults.length}`);
    searchResults.slice(0, 5).forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} (${product.brand})`);
    });
    
  } catch (error) {
    console.error('Error testing VFD products:', error);
  }
}

testVFDProducts(); 