#!/usr/bin/env node

const http = require('http')
const path = require('path')

/**
 * Simple test script to verify download functionality
 * Run this after starting the Next.js development server
 */

const TEST_DOWNLOADS = [
  '/api/download/catalogs/noark-product-catalogue.pdf',
  '/api/download/catalogs/2025-les-product-catalogue.pdf',
  '/api/download/health'
]

async function testDownload(url) {
  return new Promise((resolve) => {
    const fullUrl = `http://localhost:3000${url}`
    console.log(`Testing: ${fullUrl}`)
    
    const req = http.request(fullUrl, { method: 'HEAD' }, (res) => {
      console.log(`Response: ${res.statusCode} ${res.statusMessage}`)
      console.log('Headers:', {
        'content-type': res.headers['content-type'],
        'content-length': res.headers['content-length'],
        'content-disposition': res.headers['content-disposition']
      })
      console.log('---')
      resolve({
        url,
        status: res.statusCode,
        headers: res.headers
      })
    })
    
    req.on('error', (err) => {
      console.error(`Error testing ${url}:`, err.message)
      console.log('---')
      resolve({
        url,
        error: err.message
      })
    })
    
    req.end()
  })
}

async function runTests() {
  console.log('Testing Download API Endpoints...\n')
  
  for (const url of TEST_DOWNLOADS) {
    await testDownload(url)
    await new Promise(resolve => setTimeout(resolve, 100)) // Small delay
  }
  
  console.log('Testing complete!')
}

// Run tests if this script is executed directly
if (require.main === module) {
  runTests().catch(console.error)
}

module.exports = { testDownload, runTests } 