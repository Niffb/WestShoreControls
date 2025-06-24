/**
 * Download utilities for PDF catalogs and other files
 * Provides multiple download approaches based on the user's comprehensive guide
 */

export interface DownloadOptions {
  filename?: string
  useApiRoute?: boolean
  showProgress?: boolean
  onProgress?: (loaded: number, total: number) => void
  onComplete?: () => void
  onError?: (error: string) => void
}

export interface DownloadResult {
  success: boolean
  error?: string
  fileSize?: number
  downloadTime?: number
}

/**
 * Method 1: Simple HTML download attribute approach
 * Most straightforward implementation using HTML5 download attribute
 */
export function simpleDownload(url: string, filename?: string): DownloadResult {
  try {
    const link = document.createElement('a')
    link.href = url
    if (filename) {
      link.download = filename
    } else {
      link.download = '' // Browser will use the file's original name
    }
    link.style.display = 'none'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    return { success: true }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Download failed' 
    }
  }
}

/**
 * Method 2: Fetch API with Blob approach
 * More control over the download process, good for tracking progress
 */
export async function fetchDownload(
  url: string, 
  options: DownloadOptions = {}
): Promise<DownloadResult> {
  const startTime = Date.now()
  
  try {
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const contentLength = response.headers.get('content-length')
    const total = contentLength ? parseInt(contentLength, 10) : 0
    
    if (!response.body) {
      throw new Error('Response body is null')
    }
    
    const reader = response.body.getReader()
    const chunks: Uint8Array[] = []
    let loaded = 0
    
    // Read the stream
    while (true) {
      const { done, value } = await reader.read()
      
      if (done) break
      
      chunks.push(value)
      loaded += value.length
      
      // Report progress
      if (options.onProgress && total > 0) {
        options.onProgress(loaded, total)
      }
    }
    
    // Combine chunks into blob
    const blob = new Blob(chunks, { type: response.headers.get('content-type') || 'application/octet-stream' })
    
    // Create download
    const blobUrl = URL.createObjectURL(blob)
    const filename = options.filename || extractFilenameFromUrl(url) || 'download'
    
    const link = document.createElement('a')
    link.href = blobUrl
    link.download = filename
    link.style.display = 'none'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Cleanup
    URL.revokeObjectURL(blobUrl)
    
    const downloadTime = Date.now() - startTime
    options.onComplete?.()
    
    return { 
      success: true, 
      fileSize: loaded,
      downloadTime
    }
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Download failed'
    options.onError?.(errorMessage)
    
    return { 
      success: false, 
      error: errorMessage 
    }
  }
}

/**
 * Method 3: Secure server-side download through API route
 * Best for security, access control, and server-side processing
 */
export async function secureDownload(
  filePath: string,
  options: DownloadOptions = {}
): Promise<DownloadResult> {
  const apiUrl = `/api/download/${filePath}`
  return fetchDownload(apiUrl, options)
}

/**
 * Method 4: Adaptive download with fallback
 * Tries multiple methods with graceful fallbacks
 */
export async function adaptiveDownload(
  url: string,
  options: DownloadOptions = {}
): Promise<DownloadResult> {
  try {
    // First attempt: Use API route if available
    if (options.useApiRoute !== false && url.startsWith('/downloads/')) {
      const apiUrl = `/api/download/${url.replace('/downloads/', '')}`
      const result = await fetchDownload(apiUrl, options)
      if (result.success) return result
    }
    
    // Second attempt: Fetch download with progress
    if (options.showProgress) {
      const result = await fetchDownload(url, options)
      if (result.success) return result
    }
    
    // Final fallback: Simple download
    return simpleDownload(url, options.filename)
    
  } catch (error) {
    // Last resort fallback
    return simpleDownload(url, options.filename)
  }
}

/**
 * Method 5: Bulk download utility
 * Download multiple files with progress tracking
 */
export async function bulkDownload(
  downloads: Array<{ url: string; filename?: string }>,
  onProgress?: (completed: number, total: number) => void
): Promise<DownloadResult[]> {
  const results: DownloadResult[] = []
  const total = downloads.length
  
  for (let i = 0; i < downloads.length; i++) {
    const { url, filename } = downloads[i]
    const result = await adaptiveDownload(url, { filename })
    results.push(result)
    
    onProgress?.(i + 1, total)
    
    // Small delay to prevent overwhelming the browser
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  return results
}

/**
 * Utility: Extract filename from URL
 */
function extractFilenameFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url, window.location.origin)
    const pathname = urlObj.pathname
    const filename = pathname.split('/').pop()
    return filename || null
  } catch {
    return null
  }
}

/**
 * Utility: Check if browser supports download attribute
 */
export function supportsDownloadAttribute(): boolean {
  const a = document.createElement('a')
  return 'download' in a
}

/**
 * Utility: Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Utility: Validate PDF file
 */
export function isPdfUrl(url: string): boolean {
  return url.toLowerCase().endsWith('.pdf')
}

/**
 * Utility: Check if file exists (HEAD request)
 */
export async function checkFileExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}

/**
 * Default export: Recommended download function
 * Provides the best user experience with intelligent fallbacks
 */
export default function download(url: string, options: DownloadOptions = {}): Promise<DownloadResult> {
  return adaptiveDownload(url, {
    useApiRoute: true,
    showProgress: true,
    ...options
  })
} 