import { NextResponse } from 'next/server'
import manifest from '@/lib/data/vendor-catalog-manifest.json'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Manifest = {
  version: number
  scrapedAt: string
  items: Record<string, { sourceUrl: string; filename: string }>
}

const data = manifest as Manifest

const ALLOWED_HOSTS = new Set([
  'cdn.shopify.com',
  'www.elsteel.com',
  'elsteel.com',
  'tmeic.com',
  'www.tmeic.com',
])

function isAllowedSourceUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname
    return ALLOWED_HOSTS.has(host)
  } catch {
    return false
  }
}

export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get('id')?.trim()
  if (!id || !data.items[id]) {
    return NextResponse.json({ error: 'Unknown catalog id' }, { status: 404 })
  }

  const entry = data.items[id]
  let sourceUrl: string
  try {
    sourceUrl = new URL(entry.sourceUrl).href
  } catch {
    return NextResponse.json({ error: 'Invalid catalog URL' }, { status: 500 })
  }

  if (!isAllowedSourceUrl(sourceUrl)) {
    return NextResponse.json({ error: 'Forbidden source' }, { status: 403 })
  }

  const upstream = await fetch(sourceUrl, {
    headers: {
      'User-Agent':
        'WestshoreControls/1.0 (catalog proxy; +https://westshorecontrols.com)',
      Accept: 'application/pdf,application/octet-stream,*/*',
    },
    redirect: 'follow',
    cache: 'no-store',
  })

  if (!upstream.ok || !upstream.body) {
    return NextResponse.json(
      { error: 'Catalog could not be retrieved from manufacturer' },
      { status: 502 }
    )
  }

  const safeFilename = entry.filename.replace(/[^a-zA-Z0-9._-]+/g, '-')
  const rawType = upstream.headers.get('content-type')
  const contentType =
    rawType?.split(';')[0]?.trim() || 'application/pdf'

  return new NextResponse(upstream.body, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${safeFilename}"`,
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
