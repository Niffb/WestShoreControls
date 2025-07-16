import { Product } from '@/lib/types/shared-types'

// Search index interface
interface SearchIndex {
  byCategory: Map<string, Product[]>
  byBrand: Map<string, Product[]>
  byName: Map<string, Product[]>
  byKeywords: Map<string, Product[]>
  fullTextIndex: Map<string, Set<number>>
  products: Product[]
  lastUpdated: number
}

// Singleton search index
class ProductSearchIndex {
  private static instance: ProductSearchIndex
  private index: SearchIndex | null = null
  private readonly indexTTL = 15 * 60 * 1000 // 15 minutes

  static getInstance(): ProductSearchIndex {
    if (!ProductSearchIndex.instance) {
      ProductSearchIndex.instance = new ProductSearchIndex()
    }
    return ProductSearchIndex.instance
  }

  private constructor() {}

  // Build the search index
  buildIndex(products: Product[]): void {
    const startTime = performance.now()
    
    const index: SearchIndex = {
      byCategory: new Map(),
      byBrand: new Map(),
      byName: new Map(),
      byKeywords: new Map(),
      fullTextIndex: new Map(),
      products: [...products],
      lastUpdated: Date.now()
    }

    // Build category index
    products.forEach(product => {
      const category = product.category?.toLowerCase() || 'unknown'
      if (!index.byCategory.has(category)) {
        index.byCategory.set(category, [])
      }
      index.byCategory.get(category)!.push(product)
    })

    // Build brand index
    products.forEach(product => {
      const brand = product.brand?.toLowerCase() || 'unknown'
      if (!index.byBrand.has(brand)) {
        index.byBrand.set(brand, [])
      }
      index.byBrand.get(brand)!.push(product)
    })

    // Build name index (for prefix matching)
    products.forEach((product, idx) => {
      const name = product.name?.toLowerCase() || ''
      const words = name.split(/\s+/)
      
      words.forEach(word => {
        if (word.length > 2) { // Only index words longer than 2 characters
          for (let i = 3; i <= word.length; i++) {
            const prefix = word.substring(0, i)
            if (!index.byName.has(prefix)) {
              index.byName.set(prefix, [])
            }
            index.byName.get(prefix)!.push(product)
          }
        }
      })
    })

    // Build full-text search index
    products.forEach((product, idx) => {
      const searchableText = [
        product.name,
        product.description,
        product.category,
        product.brand,
        product.model,
        ...(product.specs || []),
        ...(product.features || [])
      ].join(' ').toLowerCase()

      const words = searchableText.split(/\s+/)
      const uniqueWords = new Set(words.filter(word => word.length > 2))

      uniqueWords.forEach(word => {
        if (!index.fullTextIndex.has(word)) {
          index.fullTextIndex.set(word, new Set())
        }
        index.fullTextIndex.get(word)!.add(idx)
      })
    })

    // Build keyword index for common search terms
    const commonKeywords = [
      'circuit breaker', 'variable frequency drive', 'vfd', 'contactor',
      'relay', 'switch', 'motor', 'protection', 'control', 'automation',
      'industrial', 'electrical', 'power', 'voltage', 'current', 'amp',
      'volt', 'phase', 'pole', 'miniature', 'molded', 'case'
    ]

    commonKeywords.forEach(keyword => {
      const matchingProducts = products.filter(product => {
        const searchText = [
          product.name,
          product.description,
          product.category
        ].join(' ').toLowerCase()
        return searchText.includes(keyword)
      })

      if (matchingProducts.length > 0) {
        index.byKeywords.set(keyword, matchingProducts)
      }
    })

    this.index = index
    
    const buildTime = performance.now() - startTime
    console.log(`Search index built in ${buildTime.toFixed(2)}ms for ${products.length} products`)
  }

  // Check if index needs rebuilding
  isIndexValid(): boolean {
    if (!this.index) return false
    return Date.now() - this.index.lastUpdated < this.indexTTL
  }

  // Get products by category (optimized)
  getProductsByCategory(category: string): Product[] {
    if (!this.isIndexValid()) return []
    return this.index!.byCategory.get(category.toLowerCase()) || []
  }

  // Get products by brand (optimized)
  getProductsByBrand(brand: string): Product[] {
    if (!this.isIndexValid()) return []
    return this.index!.byBrand.get(brand.toLowerCase()) || []
  }

  // Fast prefix search for product names
  searchProductsByName(query: string): Product[] {
    if (!this.isIndexValid() || query.length < 3) return []
    
    const normalizedQuery = query.toLowerCase()
    const results = new Set<Product>()
    
    // Find all products with names starting with the query
    Array.from(this.index!.byName.entries()).forEach(([prefix, products]) => {
      if (prefix.startsWith(normalizedQuery)) {
        products.forEach(product => results.add(product))
      }
    })
    
    return Array.from(results)
  }

  // Full-text search with ranking
  searchProducts(query: string, options: {
    categories?: string[]
    brands?: string[]
    limit?: number
  } = {}): Product[] {
    if (!this.isIndexValid() || !query.trim()) return []
    
    const normalizedQuery = query.toLowerCase()
    const queryWords = normalizedQuery.split(/\s+/).filter(word => word.length > 2)
    
    if (queryWords.length === 0) return []
    
    // Score products based on query matches
    const productScores = new Map<number, number>()
    
    queryWords.forEach(word => {
      // Exact word matches
      if (this.index!.fullTextIndex.has(word)) {
        this.index!.fullTextIndex.get(word)!.forEach(productIdx => {
          productScores.set(productIdx, (productScores.get(productIdx) || 0) + 3)
        })
      }
      
      // Partial word matches
      Array.from(this.index!.fullTextIndex.entries()).forEach(([indexWord, productIndices]) => {
        if (indexWord.includes(word) && indexWord !== word) {
          productIndices.forEach(productIdx => {
            productScores.set(productIdx, (productScores.get(productIdx) || 0) + 1)
          })
        }
      })
    })
    
    // Convert scores to products and sort by relevance
    let results = Array.from(productScores.entries())
      .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
      .map(([productIdx]) => this.index!.products[productIdx])
    
    // Apply filters
    if (options.categories && options.categories.length > 0) {
      const categorySet = new Set(options.categories.map(c => c.toLowerCase()))
      results = results.filter(product => 
        categorySet.has(product.category?.toLowerCase() || '')
      )
    }
    
    if (options.brands && options.brands.length > 0) {
      const brandSet = new Set(options.brands.map(b => b.toLowerCase()))
      results = results.filter(product => 
        brandSet.has(product.brand?.toLowerCase() || '')
      )
    }
    
    // Apply limit
    if (options.limit) {
      results = results.slice(0, options.limit)
    }
    
    return results
  }

  // Get search suggestions
  getSearchSuggestions(query: string, limit: number = 5): string[] {
    if (!this.isIndexValid() || query.length < 2) return []
    
    const normalizedQuery = query.toLowerCase()
    const suggestions = new Set<string>()
    
    // Add keyword suggestions
    Array.from(this.index!.byKeywords.keys()).forEach(keyword => {
      if (keyword.includes(normalizedQuery)) {
        suggestions.add(keyword)
      }
    })
    
    // Add category suggestions
    Array.from(this.index!.byCategory.keys()).forEach(category => {
      if (category.includes(normalizedQuery)) {
        suggestions.add(category)
      }
    })
    
    // Add brand suggestions
    Array.from(this.index!.byBrand.keys()).forEach(brand => {
      if (brand.includes(normalizedQuery)) {
        suggestions.add(brand)
      }
    })
    
    return Array.from(suggestions).slice(0, limit)
  }

  // Get index statistics
  getIndexStats() {
    if (!this.index) return null
    
    return {
      totalProducts: this.index.products.length,
      categories: this.index.byCategory.size,
      brands: this.index.byBrand.size,
      keywords: this.index.byKeywords.size,
      fullTextTerms: this.index.fullTextIndex.size,
      lastUpdated: this.index.lastUpdated,
      age: Date.now() - this.index.lastUpdated
    }
  }

  // Clear the index
  clearIndex(): void {
    this.index = null
  }
}

// Export singleton instance
export const searchIndex = ProductSearchIndex.getInstance()

// Utility functions for filtering
export function filterProductsByType(
  products: Product[], 
  productType: string
): Product[] {
  const startTime = performance.now()
  
  // Use index if available
  if (searchIndex.isIndexValid()) {
    const results = searchIndex.getProductsByCategory(productType)
    const filterTime = performance.now() - startTime
    
    if (filterTime > 10) {
      console.warn(`Slow product filtering: ${filterTime.toFixed(2)}ms for ${productType}`)
    }
    
    return results
  }
  
  // Fallback to linear search
  const results = products.filter(product => 
    product.category?.toLowerCase() === productType.toLowerCase()
  )
  
  const filterTime = performance.now() - startTime
  if (filterTime > 50) {
    console.warn(`Very slow product filtering: ${filterTime.toFixed(2)}ms for ${productType}`)
  }
  
  return results
}

// Optimized search function
export function searchProductsOptimized(
  query: string,
  options: {
    categories?: string[]
    brands?: string[]
    limit?: number
  } = {}
): Product[] {
  return searchIndex.searchProducts(query, options)
}

// Initialize index with products
export function initializeSearchIndex(products: Product[]): void {
  searchIndex.buildIndex(products)
}

// Get search suggestions
export function getSearchSuggestions(query: string, limit?: number): string[] {
  return searchIndex.getSearchSuggestions(query, limit)
} 