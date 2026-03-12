import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { Category } from '@/lib/types'

interface CategoriesSectionProps {
  categories: Category[]
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          Shop by Category
        </p>
        <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Find Your Perfect Match
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Browse our curated collection of premium hair products, from virgin bundles to ready-to-wear wigs.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/shop?category=${category.slug}`}
            className="group relative overflow-hidden rounded-xl bg-muted aspect-[4/3]"
          >
            {category.image_url ? (
              <Image
                src={category.image_url}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="h-full w-full bg-secondary" />
            )}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="font-serif text-xl font-semibold text-white">
                {category.name}
              </h3>
              {category.description && (
                <p className="mt-1 text-sm text-white/80 line-clamp-2">
                  {category.description}
                </p>
              )}
              <div className="mt-3 flex items-center gap-1 text-sm font-medium text-white group-hover:gap-2 transition-all">
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
