import { NextResponse } from 'next/server'
import { loadProductsForCategory } from '@/lib/utils/product-loader'

// Category slugs that match the ProductCategoriesGrid
const CATEGORY_SLUGS = [
  'drives-vfds',
  'servo-motors',
  'circuit-breakers-protection',
  'contactors',
  'overload-relays',
  'plcs',
  'manual-motor-starters',
  'power-distribution',
  'custom-control-panels',
  'led-indicators',
  'push-buttons'
]

export async function GET() {
  try {
    const counts: Record<string, number> = {}
    
    // Load product counts for each category in parallel
    const countPromises = CATEGORY_SLUGS.map(async (slug) => {
      const products = await loadProductsForCategory(slug)
      return { slug, count: products.length }
    })
    
    const results = await Promise.all(countPromises)
    
    for (const result of results) {
      counts[result.slug] = result.count
    }
    
    return NextResponse.json({
      success: true,
      counts,
      total: Object.values(counts).reduce((sum, count) => sum + count, 0)
    })
  } catch (error) {
    console.error('Error loading product counts:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to load product counts',
        counts: {}
      },
      { status: 500 }
    )
  }
}
