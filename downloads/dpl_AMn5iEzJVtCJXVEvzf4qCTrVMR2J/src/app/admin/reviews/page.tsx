import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, CheckCircle, XCircle } from 'lucide-react'
import type { Review, Product } from '@/lib/types'

interface ReviewWithProduct extends Review {
  product: Pick<Product, 'name' | 'slug'> | null
}

async function getReviews(): Promise<ReviewWithProduct[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('reviews')
    .select('*, product:products(name, slug)')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching reviews:', error)
    return []
  }
  return data || []
}

export default async function AdminReviewsPage() {
  const reviews = await getReviews()
  const pendingReviews = reviews.filter(r => !r.is_approved)
  const approvedReviews = reviews.filter(r => r.is_approved)

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-semibold text-foreground">Reviews</h1>
        <p className="mt-1 text-muted-foreground">
          Manage customer reviews
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-2xl font-semibold text-foreground">{reviews.length}</p>
            <p className="text-sm text-muted-foreground">Total Reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-2xl font-semibold text-foreground">{pendingReviews.length}</p>
            <p className="text-sm text-muted-foreground">Pending Approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-2xl font-semibold text-foreground">{approvedReviews.length}</p>
            <p className="text-sm text-muted-foreground">Approved</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Reviews */}
      {pendingReviews.length > 0 && (
        <div className="mb-8">
          <h2 className="font-semibold text-lg text-foreground mb-4">Pending Approval</h2>
          <div className="space-y-4">
            {pendingReviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
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
                        <Badge variant="outline">Pending</Badge>
                      </div>
                      {review.comment && (
                        <p className="text-sm text-muted-foreground mb-2">
                          {review.comment}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Product: {review.product?.name || 'Unknown'} | 
                        {' '}{new Date(review.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="gap-1">
                        <CheckCircle className="h-4 w-4" />
                        Approve
                      </Button>
                      <Button size="sm" variant="ghost" className="gap-1 text-destructive hover:text-destructive">
                        <XCircle className="h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Approved Reviews */}
      <div>
        <h2 className="font-semibold text-lg text-foreground mb-4">Approved Reviews</h2>
        {approvedReviews.length > 0 ? (
          <div className="space-y-4">
            {approvedReviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
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
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Approved
                        </Badge>
                      </div>
                      {review.comment && (
                        <p className="text-sm text-muted-foreground mb-2">
                          {review.comment}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Product: {review.product?.name || 'Unknown'} | 
                        {' '}{new Date(review.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No approved reviews yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
