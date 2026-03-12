import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-24 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="max-w-xl">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Premium Hair Collection
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Elevate Your Beauty with Luxury Hair
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Discover our collection of 100% virgin human hair bundles, closures, 
              frontals, and wigs. Premium quality that transforms your look.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/shop">
                <Button size="lg" className="gap-2">
                  Shop Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/shop?category=wigs">
                <Button variant="outline" size="lg">
                  Explore Wigs
                </Button>
              </Link>
            </div>
            
            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap items-center gap-8 border-t border-border pt-8">
              <div className="text-center">
                <p className="text-2xl font-semibold text-foreground">10K+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-foreground">100%</p>
                <p className="text-sm text-muted-foreground">Virgin Hair</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-foreground">30 Day</p>
                <p className="text-sm text-muted-foreground">Returns</p>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
              <Image
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800"
                alt="Beautiful woman with luxurious hair"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 rounded-xl bg-card p-4 shadow-lg sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-card bg-muted"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">2,000+ Reviews</p>
                  <p className="text-xs text-muted-foreground">4.9 Average Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
