import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

export async function GET(request: NextRequest) {
  try {
    const healthInfo = {
      timestamp: new Date().toISOString(),
      workingDirectory: process.cwd(),
      nodeVersion: process.version,
      platform: process.platform,
      architecture: process.arch,
      memoryUsage: process.memoryUsage(),
      env: {
        nodeEnv: process.env.NODE_ENV,
        vercel: process.env.VERCEL,
        googleCloud: !!process.env.GOOGLE_CLOUD_PROJECT,
      },
      fileSystem: {
        publicExists: false,
        downloadsExists: false,
        catalogsExists: false,
        catalogFiles: [] as string[],
        permissions: null as any
      }
    }

    // Check if directories exist
    const publicPath = path.join(process.cwd(), 'public')
    const downloadsPath = path.join(process.cwd(), 'public', 'downloads')
    const catalogsPath = path.join(process.cwd(), 'public', 'downloads', 'catalogs')

    try {
      await fs.promises.access(publicPath)
      healthInfo.fileSystem.publicExists = true
    } catch (error) {
      console.log('Public directory not accessible:', error)
    }

    try {
      await fs.promises.access(downloadsPath)
      healthInfo.fileSystem.downloadsExists = true
    } catch (error) {
      console.log('Downloads directory not accessible:', error)
    }

    try {
      await fs.promises.access(catalogsPath)
      healthInfo.fileSystem.catalogsExists = true
      
      // List catalog files
      const files = await fs.promises.readdir(catalogsPath)
      healthInfo.fileSystem.catalogFiles = files.filter(file => file.endsWith('.pdf'))
      
      // Check permissions on first PDF file
      if (healthInfo.fileSystem.catalogFiles.length > 0) {
        const firstFile = path.join(catalogsPath, healthInfo.fileSystem.catalogFiles[0])
        try {
          const stats = await fs.promises.stat(firstFile)
          healthInfo.fileSystem.permissions = {
            isFile: stats.isFile(),
            size: stats.size,
            mode: stats.mode.toString(8),
            uid: stats.uid,
            gid: stats.gid,
          }
        } catch (permError) {
          healthInfo.fileSystem.permissions = { error: permError.message }
        }
      }
    } catch (error) {
      console.log('Catalogs directory not accessible:', error)
    }

    return NextResponse.json(healthInfo, { status: 200 })
  } catch (error) {
    console.error('Health check error:', error)
    return NextResponse.json(
      { 
        error: 'Health check failed', 
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }, 
      { status: 500 }
    )
  }
} 