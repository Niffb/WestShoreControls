// Product family types for organized product data

export interface ProductModel {
  id: number
  name: string
  model: string
  brand?: string
  category?: string
  subcategory?: string
  description?: string
  price?: number
  rating?: number
  reviews?: number
  images?: string[]
  inStock?: boolean
  specs?: string[]
  features?: string[]
  url?: string
  badge?: string
  originalPrice?: number
  downloads?: Array<{
    name: string
    url: string
    type?: string
  }>
}

export interface ProductFamily {
  id: string
  name: string
  brand: string
  category: string
  subcategory?: string
  description: string
  image: string
  models: ProductModel[]
  specs?: string[]
  features?: string[]
  badge?: string
  rating?: number
  reviews?: number
  inStock?: boolean
  price?: number
  originalPrice?: number
  downloads?: Array<{
    name: string
    url: string
    type?: string
  }> | undefined[]
}

