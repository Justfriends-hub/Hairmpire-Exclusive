import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/product-card'
import type { Product } from '@/lib/types'

interface FeaturedProductsProps {
  products: Product[]
  title?: string
  subtitle?: string
  viewAllLink?: string
}

export function FeaturedProducts({
  products,
  title = 'Featured Products',
  subtitle = 'Our most popular items, loved by thousands of customers',
  viewAllLink = '/shop',
}: FeaturedProductsProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Curated Selection
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">{subtitle}</p>
        </div>
        <Link href={viewAllLink}>
          <Button variant="outline" className="gap-2">
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
