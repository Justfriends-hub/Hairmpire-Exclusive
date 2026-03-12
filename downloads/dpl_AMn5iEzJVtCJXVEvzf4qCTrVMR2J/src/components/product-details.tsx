'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Minus, Plus, ShoppingBag, Heart, Truck, RotateCcw, Shield, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { useCartStore } from '@/lib/cart-store'
import type { Product, Review } from '@/lib/types'

interface ProductDetailsProps {
  product: Product
  reviews: Review[]
}

export function ProductDetails({ product, reviews }: ProductDetailsProps) {
  const [selectedLength, setSelectedLength] = useState(product.lengths[0] || '')
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '')
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)
  
  const addItem = useCartStore((state) => state.addItem)
  
  const images = product.images.length > 0 
    ? product.images 
    : product.image_url 
      ? [product.image_url] 
      : []
  
  const discount = product.compare_price
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : 0
    
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedLength, selectedColor)
    }
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
          </BreadcrumbItem>
          {product.category && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/shop?category=${product.category.slug}`}>
                  {product.category.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
            {images.length > 0 ? (
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-muted-foreground">No image available</span>
              </div>
            )}
            
            {/* Badges */}
            <div className="absolute left-4 top-4 flex flex-col gap-2">
              {product.is_best_seller && (
                <Badge className="bg-primary text-primary-foreground">Best Seller</Badge>
              )}
              {discount > 0 && (
                <Badge variant="secondary" className="bg-foreground text-background">
                  -{discount}% OFF
                </Badge>
              )}
            </div>
          </div>
          
          {/* Thumbnail Gallery */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {product.name}
          </h1>
          
          {/* Rating */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-primary text-primary'
                      : 'fill-muted text-muted'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.review_count} reviews)
            </span>
          </div>
          
          {/* Price */}
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-semibold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.compare_price && (
              <span className="text-xl text-muted-foreground line-through">
                ${product.compare_price.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Description */}
          {product.description && (
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          )}
          
          {/* Length Selection */}
          {product.lengths.length > 0 && (
            <div className="mt-6">
              <label className="text-sm font-medium text-foreground">
                Length: <span className="text-primary">{selectedLength}</span>
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.lengths.map((length) => (
                  <button
                    key={length}
                    onClick={() => setSelectedLength(length)}
                    className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                      selectedLength === length
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-background text-foreground hover:border-primary'
                    }`}
                  >
                    {length}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Color Selection */}
          {product.colors.length > 0 && (
            <div className="mt-6">
              <label className="text-sm font-medium text-foreground">
                Color: <span className="text-primary">{selectedColor}</span>
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                      selectedColor === color
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-background text-foreground hover:border-primary'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity */}
          <div className="mt-6">
            <label className="text-sm font-medium text-foreground">Quantity</label>
            <div className="mt-2 flex items-center gap-3">
              <div className="flex items-center rounded-md border border-border">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-sm text-muted-foreground">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>
          </div>
          
          {/* Add to Cart */}
          <div className="mt-8 flex gap-3">
            <Button
              size="lg"
              className="flex-1 gap-2"
              onClick={handleAddToCart}
              disabled={product.stock === 0 || addedToCart}
            >
              {addedToCart ? (
                <>
                  <Check className="h-5 w-5" />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingBag className="h-5 w-5" />
                  Add to Cart
                </>
              )}
            </Button>
            <Button variant="outline" size="lg" className="px-4">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Add to wishlist</span>
            </Button>
          </div>
          
          {/* Features */}
          <div className="mt-8 grid gap-4 border-t border-border pt-8 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Free Shipping</p>
                <p className="text-xs text-muted-foreground">Orders over $100</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">30-Day Returns</p>
                <p className="text-xs text-muted-foreground">Easy returns</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Quality Guarantee</p>
                <p className="text-xs text-muted-foreground">100% virgin hair</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reviews Section */}
      {reviews.length > 0 && (
        <div className="mt-16 border-t border-border pt-16">
          <h2 className="font-serif text-2xl font-semibold text-foreground">
            Customer Reviews ({reviews.length})
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {reviews.map((review) => (
              <div key={review.id} className="rounded-lg border border-border p-6">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground">{review.customer_name}</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? 'fill-primary text-primary'
                            : 'fill-muted text-muted'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                {review.comment && (
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {review.comment}
                  </p>
                )}
                <p className="mt-3 text-xs text-muted-foreground">
                  {new Date(review.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
