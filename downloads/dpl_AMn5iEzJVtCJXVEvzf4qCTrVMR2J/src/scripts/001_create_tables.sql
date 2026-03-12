-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  image_url TEXT,
  images TEXT[] DEFAULT '{}',
  lengths TEXT[] DEFAULT '{}',
  colors TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT FALSE,
  is_best_seller BOOLEAN DEFAULT FALSE,
  stock INTEGER DEFAULT 0,
  rating DECIMAL(2, 1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create admin_users table to track admin status
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Categories policies (public read, admin write)
CREATE POLICY "categories_public_read" ON categories FOR SELECT USING (true);
CREATE POLICY "categories_admin_insert" ON categories FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "categories_admin_update" ON categories FOR UPDATE USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "categories_admin_delete" ON categories FOR DELETE USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);

-- Products policies (public read, admin write)
CREATE POLICY "products_public_read" ON products FOR SELECT USING (true);
CREATE POLICY "products_admin_insert" ON products FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "products_admin_update" ON products FOR UPDATE USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "products_admin_delete" ON products FOR DELETE USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);

-- Reviews policies (public read approved, users can insert, admin can manage)
CREATE POLICY "reviews_public_read" ON reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "reviews_user_insert" ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "reviews_admin_read_all" ON reviews FOR SELECT USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "reviews_admin_update" ON reviews FOR UPDATE USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "reviews_admin_delete" ON reviews FOR DELETE USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);

-- Admin users policies
CREATE POLICY "admin_users_read_own" ON admin_users FOR SELECT USING (id = auth.uid());
CREATE POLICY "admin_users_admin_read" ON admin_users FOR SELECT USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_products_best_seller ON products(is_best_seller) WHERE is_best_seller = true;
CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(is_approved) WHERE is_approved = true;
