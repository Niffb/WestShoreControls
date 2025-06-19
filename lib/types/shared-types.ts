// Shared types used across multiple product files
export interface Product {
  id: number
  name: string
  model?: string
  brand: string
  category: string
  description: string
  price?: number
  originalPrice?: number
  rating: number
  reviews: number
  images: string[]
  badge?: string
  inStock: boolean
  specs?: string[]
  url?: string
  features?: string[]
} 