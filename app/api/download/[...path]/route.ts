import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
import { createReadStream } from 'fs'

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    // Join the path segments to create the full file path
    const filePath = params.path.join('/')
    const fullPath = path.join(process.cwd(), 'public', 'downloads', filePath)
    
    console.log(`Download request for: ${filePath}`)
    console.log(`Full path: ${fullPath}`)
    console.log(`Working directory: ${process.cwd()}`)
    
    // Security check: ensure path is within downloads directory
    const publicDownloadsPath = path.join(process.cwd(), 'public', 'downloads')
    const resolvedPath = path.resolve(fullPath)
    const resolvedDownloadsPath = path.resolve(publicDownloadsPath)
    
    if (!resolvedPath.startsWith(resolvedDownloadsPath)) {
      console.error('Security violation: Path traversal attempt', resolvedPath)
      return new NextResponse('Forbidden', { status: 403 })
    }
    
    // Check if file exists using async operations for better cloud compatibility
    let fileStats
    try {
      fileStats = await fs.promises.stat(fullPath)
    } catch (error) {
      console.error('File not found:', fullPath, error)
      return new NextResponse('File not found', { status: 404 })
    }
    
    // Verify it's a file and not a directory
    if (!fileStats.isFile()) {
      console.error('Path is not a file:', fullPath)
      return new NextResponse('Invalid file', { status: 400 })
    }
    
    console.log(`File found: ${fileStats.size} bytes`)
    
    // Get file extension to determine content type
    const ext = path.extname(fullPath).toLowerCase()
    const contentType = ext === '.pdf' ? 'application/pdf' : 'application/octet-stream'
    
    // Get filename for download
    const filename = path.basename(fullPath)
    
    // Use buffer method for all files for reliability
    // In production with sufficient memory, this is more reliable than streaming
    
    // For smaller files or fallback, read into buffer
    try {
      const fileBuffer = await fs.promises.readFile(fullPath)
      console.log(`File read successfully: ${fileBuffer.length} bytes`)
      
      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Content-Disposition': `attachment; filename="${filename}"`,
          'Content-Length': fileBuffer.length.toString(),
          'Cache-Control': 'public, max-age=3600',
        },
      })
    } catch (readError) {
      console.error('Error reading file:', readError)
      return new NextResponse('Error reading file', { status: 500 })
    }
    
  } catch (error) {
    console.error('Download error:', error)
    
    // Provide more specific error information
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      })
    }
    
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 