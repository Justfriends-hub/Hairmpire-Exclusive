import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import type { Category } from '@/lib/types'

async function getCategories(): Promise<Category[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')
  
  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }
  return data || []
}

async function getProductCounts(): Promise<Record<string, number>> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('category_id')
  
  if (error) {
    return {}
  }
  
  const counts: Record<string, number> = {}
  data?.forEach(product => {
    if (product.category_id) {
      counts[product.category_id] = (counts[product.category_id] || 0) + 1
    }
  })
  return counts
}

export default async function AdminCategoriesPage() {
  const [categories, productCounts] = await Promise.all([
    getCategories(),
    getProductCounts(),
  ])

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-foreground">Categories</h1>
          <p className="mt-1 text-muted-foreground">
            Manage product categories
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Products</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <div className="relative h-12 w-12 overflow-hidden rounded-md bg-muted">
                    {category.image_url ? (
                      <Image
                        src={category.image_url}
                        alt={category.name}
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
                <TableCell className="font-medium text-foreground">
                  {category.name}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {category.slug}
                </TableCell>
                <TableCell className="max-w-[200px]">
                  <p className="text-sm text-muted-foreground truncate">
                    {category.description || '-'}
                  </p>
                </TableCell>
                <TableCell>
                  <span className="font-medium">
                    {productCounts[category.id] || 0}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {categories.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No categories found</p>
          </div>
        )}
      </div>
    </div>
  )
}
