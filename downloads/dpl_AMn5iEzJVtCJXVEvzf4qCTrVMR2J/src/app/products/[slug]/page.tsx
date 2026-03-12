import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductDetails } from '@/components/product-details'
import { FeaturedProducts } from '@/components/featured-products'
import type { Product, Review } from '@/lib/types'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

async function getProduct(slug: string): Promise<Product | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('slug', slug)
    .single()
  
  if (error || !data) {
    return null
  }
  return data
}

async function getProductReviews(productId: string): Promise<Review[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('product_id', productId)
    .eq('is_approved', true)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching reviews:', error)
    return []
  }
  return data || []
}

async function getRelatedProducts(categoryId: string, currentProductId: string): Promise<Product[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', categoryId)
    .neq('id', currentProductId)
    .limit(4)
  
  if (error) {
    console.error('Error fetching related products:', error)
    return []
  }
  return data || []
}

export async function generateMetadata({ params }: ProductPageProps) {
  const resolvedParams = await params
  const product = await getProduct(resolvedParams.slug)
  
  if (!product) {
    return {
      title: 'Product Not Found | LuxeHair',
    }
  }
  
  return {
    title: `${product.name} | LuxeHair`,
    description: product.description || `Shop ${product.name} at LuxeHair`,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params
  const product = await getProduct(resolvedParams.slug)
  
  if (!product) {
    notFound()
  }
  
  const [reviews, relatedProducts] = await Promise.all([
    getProductReviews(product.id),
    product.category_id ? getRelatedProducts(product.category_id, product.id) : Promise.resolve([]),
  ])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ProductDetails product={product} reviews={reviews} />
        
        {relatedProducts.length > 0 && (
          <FeaturedProducts
            products={relatedProducts}
            title="You May Also Like"
            subtitle="Similar products you might be interested in"
            viewAllLink={`/shop?category=${product.category?.slug || ''}`}
          />
        )}
      </main>
      <Footer />
    </div>
  )
}
