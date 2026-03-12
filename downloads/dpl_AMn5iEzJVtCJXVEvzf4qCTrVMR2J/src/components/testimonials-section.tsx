import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    content:
      "The quality of the Brazilian body wave bundles exceeded my expectations. The hair is so soft, shiny, and has held up beautifully for months. I've gotten so many compliments!",
    author: 'Sarah M.',
    rating: 5,
    product: 'Brazilian Body Wave Bundle',
  },
  {
    id: 2,
    content:
      "I've been wearing wigs for years and this is hands down the best quality I've ever purchased. The HD lace is truly invisible and the hair moves so naturally.",
    author: 'Michelle T.',
    rating: 5,
    product: 'Body Wave Full Lace Wig',
  },
  {
    id: 3,
    content:
      "Finally found a brand that delivers on their promises! The frontal I ordered was exactly as described - pre-plucked, bleached knots, and the hairline looks like my own.",
    author: 'Ashley R.',
    rating: 5,
    product: '13x4 HD Lace Frontal',
  },
]

export function TestimonialsSection() {
  return (
    <section className="bg-secondary/30 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Customer Love
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Join thousands of satisfied customers who have transformed their look with LuxeHair.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative rounded-xl bg-card p-6 shadow-sm"
            >
              <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/20" />
              
              {/* Rating */}
              <div className="flex gap-0.5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-primary text-primary"
                  />
                ))}
              </div>
              
              {/* Content */}
              <blockquote className="mt-4 text-foreground leading-relaxed">
                {'"'}{testimonial.content}{'"'}
              </blockquote>
              
              {/* Author */}
              <div className="mt-6 border-t border-border pt-4">
                <p className="font-medium text-foreground">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">
                  Purchased: {testimonial.product}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
