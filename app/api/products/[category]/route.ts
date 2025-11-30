import { NextRequest, NextResponse } from 'next/server'
import { loadProductsForCategory } from '@/lib/utils/product-loader'

interface PaginationParams {
  page?: number
  limit?: number
  search?: string
  sortBy?: 'name' | 'price' | 'stock_status'
  sortOrder?: 'asc' | 'desc'
  inStockOnly?: boolean
}

function filterAndSortProducts(products: any[], params: PaginationParams) {
  let filtered = [...products]

  // Apply search filter
  if (params.search) {
    const searchLower = params.search.toLowerCase()
    filtered = filtered.filter(product => {
      const searchableText = [
        product.name || '',
        product.model || '',
        product.description || '',
        product.brand || '',
        ...(product.specs || []),
        ...(product.features || [])
      ].join(' ').toLowerCase()
      
      return searchableText.includes(searchLower)
    })
  }

  // Apply in-stock filter
  if (params.inStockOnly) {
    filtered = filtered.filter(product => product.inStock === true)
  }

  // Apply sorting
  if (params.sortBy) {
    filtered.sort((a, b) => {
      let compareA: any
      let compareB: any

      if (params.sortBy === 'price') {
        compareA = a.price || 0
        compareB = b.price || 0
      } else if (params.sortBy === 'stock_status') {
        compareA = a.inStock ? 0 : 1
        compareB = b.inStock ? 0 : 1
      } else { // name
        compareA = (a.name || '').toLowerCase()
        compareB = (b.name || '').toLowerCase()
      }

      const order = params.sortOrder === 'desc' ? -1 : 1
      if (compareA < compareB) return -1 * order
      if (compareA > compareB) return 1 * order
      return 0
    })
  }

  return filtered
}

function paginateResults(products: any[], page: number = 1, limit: number = 12) {
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedProducts = products.slice(startIndex, endIndex)
  
  return {
    products: paginatedProducts,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(products.length / limit),
      totalItems: products.length,
      itemsPerPage: limit,
      hasNextPage: endIndex < products.length,
      hasPrevPage: page > 1,
      startIndex: startIndex + 1,
      endIndex: Math.min(endIndex, products.length)
    }
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { category: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Parse query parameters
    const paginationParams: PaginationParams = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '12'),
      search: searchParams.get('search') || undefined,
      sortBy: (searchParams.get('sortBy') as any) || 'name',
      sortOrder: (searchParams.get('sortOrder') as any) || 'asc',
      inStockOnly: searchParams.get('inStockOnly') === 'true'
    }

    // Load all products for the category
    const allProducts = await loadProductsForCategory(params.category)
    
    // Apply filtering and sorting
    const filteredProducts = filterAndSortProducts(allProducts, paginationParams)
    
    // Check if pagination is requested
    const enablePagination = searchParams.get('paginate') === 'true'
    
    if (enablePagination) {
      // Return paginated results
      const paginatedResult = paginateResults(
        filteredProducts, 
        paginationParams.page, 
        paginationParams.limit
      )
      
      return NextResponse.json({
        success: true,
        ...paginatedResult,
        totalProducts: allProducts.length,
        filteredCount: filteredProducts.length
      })
    } else {
      // Return all filtered products (for client-side pagination)
      return NextResponse.json({
        success: true,
        products: filteredProducts,
        count: filteredProducts.length,
        totalProducts: allProducts.length
      })
    }
  } catch (error) {
    console.error('Error loading products:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to load products',
        products: [],
        count: 0,
        pagination: null
      },
      { status: 500 }
    )
  }
}
