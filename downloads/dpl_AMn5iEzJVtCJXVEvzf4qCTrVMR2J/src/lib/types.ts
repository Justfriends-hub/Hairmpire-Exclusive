export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  created_at: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  compare_price: number | null
  category_id: string | null
  image_url: string | null
  images: string[]
  lengths: string[]
  colors: string[]
  is_featured: boolean
  is_best_seller: boolean
  stock: number
  rating: number
  review_count: number
  created_at: string
  updated_at: string
  category?: Category
}

export interface Review {
  id: string
  product_id: string
  user_id: string | null
  customer_name: string
  customer_email: string | null
  rating: number
  comment: string | null
  is_approved: boolean
  created_at: string
}

export interface CartItem {
  product: Product
  quantity: number
  selectedLength: string
  selectedColor: string
}

export interface AdminUser {
  id: string
  email: string
  created_at: string
}
