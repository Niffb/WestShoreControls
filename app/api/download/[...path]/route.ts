import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

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
    
    // Security check: ensure path is within downloads directory
    const publicDownloadsPath = path.join(process.cwd(), 'public', 'downloads')
    const resolvedPath = path.resolve(fullPath)
    const resolvedDownloadsPath = path.resolve(publicDownloadsPath)
    
    if (!resolvedPath.startsWith(resolvedDownloadsPath)) {
      console.error('Security violation: Path traversal attempt', resolvedPath)
      return new NextResponse('Forbidden', { status: 403 })
    }
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      console.error('File not found:', fullPath)
      return new NextResponse('File not found', { status: 404 })
    }
    
    // Read the file
    const fileBuffer = fs.readFileSync(fullPath)
    console.log(`File read successfully: ${fileBuffer.length} bytes`)
    
    // Get file extension to determine content type
    const ext = path.extname(fullPath).toLowerCase()
    const contentType = ext === '.pdf' ? 'application/pdf' : 'application/octet-stream'
    
    // Get filename for download
    const filename = path.basename(fullPath)
    
    // Return the file with proper headers
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    })
  } catch (error) {
    console.error('Download error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 