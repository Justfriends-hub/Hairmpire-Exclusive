'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/cart-store'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore()
  const total = getTotal()
  const shipping = total > 100 ? 0 : 9.99
  const tax = total * 0.08 // 8% tax
  const finalTotal = total + shipping + tax

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="text-center">
            <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
            <h1 className="mt-4 font-serif text-2xl font-semibold text-foreground">
              Your cart is empty
            </h1>
            <p className="mt-2 text-muted-foreground">
              Looks like you haven{"'"}t added anything to your cart yet.
            </p>
            <Link href="/shop">
              <Button className="mt-6 gap-2">
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
          <h1 className="font-serif text-3xl font-semibold text-foreground">
            Shopping Cart
          </h1>
          <p className="mt-1 text-muted-foreground">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
          </p>

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedLength}-${item.selectedColor}`}
                    className="flex gap-4 rounded-lg border border-border bg-card p-4"
                  >
                    {/* Image */}
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                      {item.product.image_url ? (
                        <Image
                          src={item.product.image_url}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <div>
                          <Link
                            href={`/products/${item.product.slug}`}
                            className="font-medium text-foreground hover:text-primary transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          <div className="mt-1 text-sm text-muted-foreground">
                            {item.selectedLength && (
                              <span>Length: {item.selectedLength}</span>
                            )}
                            {item.selectedLength && item.selectedColor && (
                              <span className="mx-2">|</span>
                            )}
                            {item.selectedColor && (
                              <span>Color: {item.selectedColor}</span>
                            )}
                          </div>
                        </div>
                        <p className="text-lg font-semibold text-foreground">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-3">
                        {/* Quantity */}
                        <div className="flex items-center rounded-md border border-border">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedLength,
                                item.selectedColor,
                                item.quantity - 1
                              )
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedLength,
                                item.selectedColor,
                                item.quantity + 1
                              )
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* Remove */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() =>
                            removeItem(
                              item.product.id,
                              item.selectedLength,
                              item.selectedColor
                            )
                          }
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-6 flex items-center justify-between">
                <Link href="/shop">
                  <Button variant="outline" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Continue Shopping
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="font-semibold text-lg text-foreground">
                  Order Summary
                </h2>

                <div className="mt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span className="text-foreground">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="font-semibold text-foreground">
                        ${finalTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {shipping === 0 && (
                  <p className="mt-4 text-xs text-primary">
                    You qualify for free shipping!
                  </p>
                )}
                {shipping > 0 && (
                  <p className="mt-4 text-xs text-muted-foreground">
                    Spend ${(100 - total).toFixed(2)} more for free shipping
                  </p>
                )}

                <Button className="mt-6 w-full" size="lg">
                  Proceed to Checkout
                </Button>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
