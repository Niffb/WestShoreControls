'use client'

import { useState } from 'react'
import { DocumentTextIcon, CloudArrowDownIcon, ShieldCheckIcon, CpuChipIcon } from '@heroicons/react/24/outline'
import { simpleDownload, fetchDownload, secureDownload, adaptiveDownload, bulkDownload, formatFileSize } from '@/lib/utils/download-utils'

interface DemoFile {
  name: string
  url: string
  size: string
  description: string
}

export default function DownloadDemo() {
  const [results, setResults] = useState<string[]>([])

  const demoFiles: DemoFile[] = [
    {
      name: "Noark Product Catalogue",
      url: "/api/download/catalogs/noark-product-catalogue.pdf",
      size: "6.5 MB",
      description: "Circuit breakers, contactors, and motor protection devices"
    },
    {
      name: "Klemsan Automation Components",
      url: "/api/download/catalogs/automation-klemsan.pdf", 
      size: "12 MB",
      description: "Industrial automation components and terminal blocks"
    },
    {
      name: "Elsteel Box Brochure",
      url: "/api/download/catalogs/elsteel-box-brochure.pdf",
      size: "13 MB", 
      description: "Mild steel and stainless steel electrical enclosures"
    }
  ]

  const addResult = (message: string) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const demoSimpleDownload = async (file: DemoFile) => {
    addResult(`Simple download started for ${file.name}`)
    const result = simpleDownload(file.url.replace('/api/download/', '/downloads/'), file.name)
    addResult(`Simple download ${result.success ? 'completed' : 'failed'}: ${result.error || 'Success'}`)
  }

  const demoFetchDownload = async (file: DemoFile) => {
    addResult(`Fetch download started for ${file.name}`)
    const result = await fetchDownload(file.url, {
      filename: file.name,
      onProgress: (loaded, total) => {
        const percent = Math.round((loaded / total) * 100)
        console.log(`Download progress: ${percent}%`)
      }
    })
    addResult(`Fetch download ${result.success ? 'completed' : 'failed'}: ${result.error || `Success (${formatFileSize(result.fileSize || 0)})`}`)
  }

  const demoSecureDownload = async (file: DemoFile) => {
    addResult(`Secure download started for ${file.name}`)
    const result = await secureDownload(file.url.replace('/api/download/', ''), {
      filename: file.name
    })
    addResult(`Secure download ${result.success ? 'completed' : 'failed'}: ${result.error || 'Success'}`)
  }

  const demoAdaptiveDownload = async (file: DemoFile) => {
    addResult(`Adaptive download started for ${file.name}`)
    const result = await adaptiveDownload(file.url, {
      filename: file.name,
      useApiRoute: true,
      showProgress: true
    })
    addResult(`Adaptive download ${result.success ? 'completed' : 'failed'}: ${result.error || 'Success'}`)
  }

  const demoBulkDownload = async () => {
    addResult('Bulk download started for all demo files')
    const downloads = demoFiles.map(file => ({
      url: file.url,
      filename: file.name
    }))
    
    const results = await bulkDownload(downloads, (completed, total) => {
      addResult(`Bulk progress: ${completed}/${total} files completed`)
    })
    
    const successful = results.filter(r => r.success).length
    addResult(`Bulk download completed: ${successful}/${results.length} files successful`)
  }

  const clearResults = () => setResults([])

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          PDF Download Methods Demo
        </h1>
        <p className="text-lg text-gray-600">
          Demonstrating different approaches to PDF catalog downloads
        </p>
      </div>

      {/* Demo Files */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {demoFiles.map((file, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <DocumentTextIcon className="h-8 w-8 text-red-600" />
              <div>
                <h3 className="font-semibold text-gray-900">{file.name}</h3>
                <p className="text-sm text-gray-500">{file.size}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">{file.description}</p>
            
            <div className="space-y-2">
              {/* Method 1: Simple HTML Download */}
              <button
                onClick={() => demoSimpleDownload(file)}
                className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
              >
                <CloudArrowDownIcon className="h-4 w-4" />
                <span>Simple HTML</span>
              </button>

              {/* Method 2: Fetch with Progress */}
              <button
                onClick={() => demoFetchDownload(file)}
                className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
              >
                <CpuChipIcon className="h-4 w-4" />
                <span>Fetch + Progress</span>
              </button>

              {/* Method 3: Secure API */}
              <button
                onClick={() => demoSecureDownload(file)}
                className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition-colors"
              >
                <ShieldCheckIcon className="h-4 w-4" />
                <span>Secure API</span>
              </button>

              {/* Method 4: Adaptive */}
              <button
                onClick={() => demoAdaptiveDownload(file)}
                className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition-colors"
              >
                <CpuChipIcon className="h-4 w-4" />
                <span>Adaptive</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bulk Download Demo */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Bulk Download Demo</h3>
        <p className="text-gray-600 mb-4">
          Download all demo files at once with progress tracking
        </p>
        <button
          onClick={demoBulkDownload}
          className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
        >
          Download All Files
        </button>
      </div>

      {/* Results Log */}
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Download Results Log</h3>
          <button
            onClick={clearResults}
            className="text-gray-400 hover:text-white text-sm"
          >
            Clear Log
          </button>
        </div>
        <div className="bg-gray-800 rounded p-4 h-64 overflow-y-auto">
          {results.length === 0 ? (
            <p className="text-gray-400 italic">No downloads yet. Try the buttons above!</p>
          ) : (
            <div className="space-y-1">
              {results.map((result, index) => (
                <div key={index} className="text-green-400 text-sm font-mono">
                  {result}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Method Descriptions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Download Methods Explained</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium text-blue-600">Simple HTML:</span>
              <p className="text-gray-600">Uses the HTML5 download attribute. Fast and simple, but limited control.</p>
            </div>
            <div>
              <span className="font-medium text-green-600">Fetch + Progress:</span>
              <p className="text-gray-600">Uses Fetch API with progress tracking. Good for user feedback on large files.</p>
            </div>
            <div>
              <span className="font-medium text-purple-600">Secure API:</span>
              <p className="text-gray-600">Downloads through secure server-side API route with access control.</p>
            </div>
            <div>
              <span className="font-medium text-indigo-600">Adaptive:</span>
              <p className="text-gray-600">Intelligent method selection with automatic fallbacks for reliability.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Implementation Benefits</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-gray-600">Multiple fallback methods ensure reliable downloads</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-gray-600">Progress tracking for better user experience</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-gray-600">Security features prevent unauthorized access</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-gray-600">Cross-browser compatibility with graceful degradation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 