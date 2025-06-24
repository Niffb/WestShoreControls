const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

// Test configuration
const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';
const TEST_RESULTS_DIR = './test-results';

// Ensure test results directory exists
if (!fs.existsSync(TEST_RESULTS_DIR)) {
  fs.mkdirSync(TEST_RESULTS_DIR, { recursive: true });
}

console.log('🔍 PDF Download Corruption Test\n');

// Function to calculate MD5 hash of a file
function calculateFileHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(fileBuffer).digest('hex');
}

// Function to download a file and save it
async function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : require('http');
    
    protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
        return;
      }

      const fileStream = fs.createWriteStream(outputPath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

// Function to check if a PDF is valid
function isPdfValid(filePath) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    
    // Check PDF header
    const pdfHeader = fileBuffer.slice(0, 4).toString();
    if (pdfHeader !== '%PDF') {
      return { valid: false, reason: 'Invalid PDF header' };
    }
    
    // Check for PDF footer
    const fileStr = fileBuffer.toString('ascii');
    if (!fileStr.includes('%%EOF')) {
      return { valid: false, reason: 'Missing PDF EOF marker' };
    }
    
    // Check minimum file size (PDFs should be at least a few hundred bytes)
    if (fileBuffer.length < 100) {
      return { valid: false, reason: 'File too small to be a valid PDF' };
    }
    
    return { valid: true, reason: 'PDF appears valid' };
  } catch (error) {
    return { valid: false, reason: `Error reading file: ${error.message}` };
  }
}

// Function to find PDF files in downloads directory
function findPdfFiles(dir) {
  const pdfFiles = [];
  
  function scanDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (path.extname(item).toLowerCase() === '.pdf') {
        // Get relative path from public/downloads
        const relativePath = path.relative(path.join(process.cwd(), 'public', 'downloads'), fullPath);
        pdfFiles.push(relativePath);
      }
    }
  }
  
  try {
    scanDirectory(dir);
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error.message);
  }
  
  return pdfFiles;
}

// Main testing function
async function testPdfDownloads() {
  const downloadsDir = path.join(process.cwd(), 'public', 'downloads');
  
  if (!fs.existsSync(downloadsDir)) {
    console.error('❌ Downloads directory not found:', downloadsDir);
    return;
  }
  
  console.log('📁 Scanning for PDF files...');
  const pdfFiles = findPdfFiles(downloadsDir);
  
  if (pdfFiles.length === 0) {
    console.log('⚠️  No PDF files found in downloads directory');
    return;
  }
  
  console.log(`📋 Found ${pdfFiles.length} PDF files to test\n`);
  
  let passedTests = 0;
  let failedTests = 0;
  
  for (const pdfFile of pdfFiles.slice(0, 5)) { // Test first 5 PDFs
    console.log(`🧪 Testing: ${pdfFile}`);
    
    try {
      // Original file path
      const originalPath = path.join(downloadsDir, pdfFile);
      const originalHash = calculateFileHash(originalPath);
      const originalSize = fs.statSync(originalPath).size;
      
      console.log(`   📊 Original: ${originalSize} bytes, hash: ${originalHash.substring(0, 8)}...`);
      
      // Download via API
      const downloadUrl = `${BASE_URL}/api/download/${pdfFile.replace(/\\/g, '/')}`;
      const downloadedPath = path.join(TEST_RESULTS_DIR, `downloaded_${path.basename(pdfFile)}`);
      
      console.log(`   🌐 Downloading from: ${downloadUrl}`);
      await downloadFile(downloadUrl, downloadedPath);
      
      // Check downloaded file
      const downloadedHash = calculateFileHash(downloadedPath);
      const downloadedSize = fs.statSync(downloadedPath).size;
      
      console.log(`   📥 Downloaded: ${downloadedSize} bytes, hash: ${downloadedHash.substring(0, 8)}...`);
      
      // Validate PDF integrity
      const pdfValidation = isPdfValid(downloadedPath);
      
      if (originalHash === downloadedHash && pdfValidation.valid) {
        console.log(`   ✅ PASS - File integrity maintained, PDF is valid`);
        passedTests++;
      } else {
        console.log(`   ❌ FAIL - ${!pdfValidation.valid ? pdfValidation.reason : 'Hash mismatch'}`);
        failedTests++;
        
        if (originalHash !== downloadedHash) {
          console.log(`   🔍 Hash mismatch: original vs downloaded`);
          console.log(`      Original:  ${originalHash}`);
          console.log(`      Downloaded: ${downloadedHash}`);
        }
      }
      
      // Clean up downloaded file
      fs.unlinkSync(downloadedPath);
      
    } catch (error) {
      console.log(`   ❌ FAIL - Error: ${error.message}`);
      failedTests++;
    }
    
    console.log(''); // Empty line for readability
  }
  
  // Summary
  console.log('📊 Test Summary');
  console.log('═══════════════');
  console.log(`✅ Passed: ${passedTests}`);
  console.log(`❌ Failed: ${failedTests}`);
  console.log(`📈 Success Rate: ${passedTests > 0 ? Math.round((passedTests / (passedTests + failedTests)) * 100) : 0}%`);
  
  if (failedTests === 0) {
    console.log('\n🎉 All PDF downloads are working correctly!');
  } else {
    console.log('\n⚠️  Some PDF downloads are corrupted. Check the implementation.');
  }
}

// Run the test
testPdfDownloads().catch(error => {
  console.error('Test failed:', error);
  process.exit(1);
}); 