import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Plus, Pencil, Star } from 'lucide-react'
import type { Product } from '@/lib/types'

async function getProducts(): Promise<Product[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(name)')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching products:', error)
    return []
  }
  return data || []
}

export default async function AdminProductsPage() {
  const products = await getProducts()

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-foreground">Products</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your product catalog
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="relative h-12 w-12 overflow-hidden rounded-md bg-muted">
                    {product.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                        N/A
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{product.name}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                      {product.slug}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {(product.category as { name: string } | null)?.name || '-'}
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">${product.price.toFixed(2)}</p>
                    {product.compare_price && (
                      <p className="text-xs text-muted-foreground line-through">
                        ${product.compare_price.toFixed(2)}
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span className={product.stock < 10 ? 'text-destructive' : 'text-foreground'}>
                    {product.stock}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="text-sm">{product.rating}</span>
                    <span className="text-xs text-muted-foreground">
                      ({product.review_count})
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {product.is_featured && (
                      <Badge variant="secondary" className="text-xs">Featured</Badge>
                    )}
                    {product.is_best_seller && (
                      <Badge className="text-xs">Best Seller</Badge>
                    )}
                    {!product.is_featured && !product.is_best_seller && (
                      <span className="text-muted-foreground text-sm">-</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {products.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No products found</p>
          </div>
        )}
      </div>
    </div>
  )
}
