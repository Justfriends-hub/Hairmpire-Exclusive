import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, FolderOpen, MessageSquare, DollarSign, TrendingUp, Users } from 'lucide-react'

async function getDashboardStats() {
  const supabase = await createClient()
  
  const [productsResult, categoriesResult, reviewsResult] = await Promise.all([
    supabase.from('products').select('id, price, stock', { count: 'exact' }),
    supabase.from('categories').select('id', { count: 'exact' }),
    supabase.from('reviews').select('id, is_approved', { count: 'exact' }),
  ])
  
  const products = productsResult.data || []
  const totalRevenue = products.reduce((sum, p) => sum + Number(p.price), 0)
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0)
  const pendingReviews = (reviewsResult.data || []).filter(r => !r.is_approved).length
  
  return {
    totalProducts: productsResult.count || 0,
    totalCategories: categoriesResult.count || 0,
    totalReviews: reviewsResult.count || 0,
    pendingReviews,
    totalRevenue,
    totalStock,
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats()

  const cards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      description: `${stats.totalStock} items in stock`,
    },
    {
      title: 'Categories',
      value: stats.totalCategories,
      icon: FolderOpen,
      description: 'Product categories',
    },
    {
      title: 'Reviews',
      value: stats.totalReviews,
      icon: MessageSquare,
      description: `${stats.pendingReviews} pending approval`,
    },
    {
      title: 'Inventory Value',
      value: `$${stats.totalRevenue.toFixed(0)}`,
      icon: DollarSign,
      description: 'Total product value',
    },
  ]

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-semibold text-foreground">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Welcome back! Here{"'"}s an overview of your store.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <card.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-foreground">{card.value}</p>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="font-semibold text-lg text-foreground mb-4">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="cursor-pointer hover:bg-secondary/50 transition-colors">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Add New Product</p>
                <p className="text-sm text-muted-foreground">Create a new product listing</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:bg-secondary/50 transition-colors">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Review Management</p>
                <p className="text-sm text-muted-foreground">{stats.pendingReviews} reviews pending</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:bg-secondary/50 transition-colors">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">View Analytics</p>
                <p className="text-sm text-muted-foreground">Track store performance</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
