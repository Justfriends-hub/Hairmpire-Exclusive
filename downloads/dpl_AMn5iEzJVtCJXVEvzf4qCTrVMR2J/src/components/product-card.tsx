'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.compare_price
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : 0

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.is_best_seller && (
            <Badge className="bg-primary text-primary-foreground">Best Seller</Badge>
          )}
          {discount > 0 && (
            <Badge variant="secondary" className="bg-foreground text-background">
              -{discount}%
            </Badge>
          )}
        </div>
      </div>
      
      <div className="mt-4 space-y-1">
        <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors text-balance">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(product.rating)
                    ? 'fill-primary text-primary'
                    : 'fill-muted text-muted'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.review_count})
          </span>
        </div>
        
        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          {product.compare_price && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.compare_price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
