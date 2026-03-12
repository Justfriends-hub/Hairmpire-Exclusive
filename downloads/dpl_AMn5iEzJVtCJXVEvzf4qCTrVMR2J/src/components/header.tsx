'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingBag, Menu, X, User, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useCartStore } from '@/lib/cart-store'

const navigation = [
  { name: 'Shop', href: '/shop' },
  { name: 'Bundles', href: '/shop?category=bundles' },
  { name: 'Wigs', href: '/shop?category=wigs' },
  { name: 'Closures', href: '/shop?category=closures' },
  { name: 'Frontals', href: '/shop?category=frontals' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const itemCount = useCartStore((state) => state.getItemCount())

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="-m-2.5">
                <span className="sr-only">Open main menu</span>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs">
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                  <span className="font-serif text-2xl font-semibold tracking-tight text-foreground">
                    LuxeHair
                  </span>
                </Link>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-border">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium text-foreground hover:bg-secondary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    <Link
                      href="/auth/login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium text-foreground hover:bg-secondary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Log in
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="font-serif text-2xl font-semibold tracking-tight text-foreground">
              LuxeHair
            </span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex flex-1 items-center justify-end gap-x-4">
          <Button variant="ghost" size="icon" className="hidden lg:flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          
          <Link href="/auth/login">
            <Button variant="ghost" size="icon" className="hidden lg:flex">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>
          
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                  {itemCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  )
}
