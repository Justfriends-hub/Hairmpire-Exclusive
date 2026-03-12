'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Check } from 'lucide-react'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
      <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-12 sm:px-12 sm:py-16">
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
            Get 10% Off Your First Order
          </h2>
          <p className="mt-4 text-primary-foreground/80">
            Subscribe to our newsletter for exclusive deals, styling tips, and early access to new arrivals.
          </p>
          
          {submitted ? (
            <div className="mt-8 flex items-center justify-center gap-2 text-primary-foreground">
              <Check className="h-5 w-5" />
              <span>Thank you for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-primary-foreground text-foreground placeholder:text-muted-foreground border-0"
              />
              <Button
                type="submit"
                variant="secondary"
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                Subscribe
              </Button>
            </form>
          )}
          
          <p className="mt-4 text-xs text-primary-foreground/60">
            By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  )
}
