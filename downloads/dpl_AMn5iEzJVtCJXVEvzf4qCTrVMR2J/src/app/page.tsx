import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/hero-section'
import { CategoriesSection } from '@/components/categories-section'
import { FeaturedProducts } from '@/components/featured-products'
import { TestimonialsSection } from '@/components/testimonials-section'
import { NewsletterSection } from '@/components/newsletter-section'
import type { Category, Product } from '@/lib/types'

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

async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true)
    .limit(8)
  
  if (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
  return data || []
}

async function getBestSellers(): Promise<Product[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_best_seller', true)
    .limit(4)
  
  if (error) {
    console.error('Error fetching best sellers:', error)
    return []
  }
  return data || []
}

export default async function HomePage() {
  const [categories, featuredProducts, bestSellers] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
    getBestSellers(),
  ])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <CategoriesSection categories={categories} />
        <FeaturedProducts
          products={featuredProducts}
          title="Featured Collection"
          subtitle="Handpicked products that our customers love"
        />
        <TestimonialsSection />
        <FeaturedProducts
          products={bestSellers}
          title="Best Sellers"
          subtitle="Our most popular products based on sales"
          viewAllLink="/shop?sort=best-sellers"
        />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
