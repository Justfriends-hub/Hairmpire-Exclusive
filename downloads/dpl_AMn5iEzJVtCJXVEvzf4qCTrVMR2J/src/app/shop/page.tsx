import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { ShopFilters } from '@/components/shop-filters'
import { Skeleton } from '@/components/ui/skeleton'
import type { Category, Product } from '@/lib/types'

interface ShopPageProps {
  searchParams: Promise<{
    category?: string
    sort?: string
    minPrice?: string
    maxPrice?: string
  }>
}

async function getCategories(): Promise<Category[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')
  
  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }
  return data || []
}

async function getProducts(params: {
  category?: string
  sort?: string
  minPrice?: string
  maxPrice?: string
}): Promise<Product[]> {
  const supabase = await createClient()
  
  let query = supabase.from('products').select('*, category:categories(*)')
  
  // Filter by category
  if (params.category) {
    const { data: category } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', params.category)
      .single()
    
    if (category) {
      query = query.eq('category_id', category.id)
    }
  }
  
  // Filter by price
  if (params.minPrice) {
    query = query.gte('price', parseFloat(params.minPrice))
  }
  if (params.maxPrice) {
    query = query.lte('price', parseFloat(params.maxPrice))
  }
  
  // Sort
  switch (params.sort) {
    case 'price-asc':
      query = query.order('price', { ascending: true })
      break
    case 'price-desc':
      query = query.order('price', { ascending: false })
      break
    case 'best-sellers':
      query = query.eq('is_best_seller', true).order('review_count', { ascending: false })
      break
    case 'newest':
      query = query.order('created_at', { ascending: false })
      break
    case 'rating':
      query = query.order('rating', { ascending: false })
      break
    default:
      query = query.order('is_featured', { ascending: false }).order('created_at', { ascending: false })
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching products:', error)
    return []
  }
  return data || []
}

function ProductGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="aspect-square rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  )
}

async function ProductGrid({ params }: { params: ShopPageProps['searchParams'] }) {
  const resolvedParams = await params
  const products = await getProducts(resolvedParams)
  
  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-muted-foreground">No products found</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Try adjusting your filters or browse all products
        </p>
      </div>
    )
  }
  
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const resolvedParams = await searchParams
  const categories = await getCategories()
  const currentCategory = categories.find((c) => c.slug === resolvedParams.category)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {currentCategory ? currentCategory.name : 'All Products'}
            </h1>
            {currentCategory?.description && (
              <p className="mt-2 max-w-2xl text-muted-foreground">
                {currentCategory.description}
              </p>
            )}
          </div>
          
          {/* Filters */}
          <ShopFilters categories={categories} />
          
          {/* Products Grid */}
          <div className="mt-8">
            <Suspense fallback={<ProductGridSkeleton />}>
              <ProductGrid params={searchParams} />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
