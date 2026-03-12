-- Seed categories
INSERT INTO categories (name, slug, description, image_url) VALUES
  ('Wigs', 'wigs', 'Premium quality wigs for every style', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400'),
  ('Hair Extensions', 'hair-extensions', 'Natural and synthetic hair extensions', 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400'),
  ('Attachments', 'attachments', 'Ponytails, buns, and clip-ins', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400'),
  ('Hair Creams', 'hair-creams', 'Styling and treatment products', 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400'),
  ('Hair Accessories', 'hair-accessories', 'Clips, bands, and styling tools', 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=400')
ON CONFLICT (slug) DO NOTHING;

-- Seed products
INSERT INTO products (name, slug, description, price, category_id, image_url, images, lengths, colors, is_featured, is_best_seller, stock, rating, review_count) VALUES
  (
    'Brazilian Body Wave Wig',
    'brazilian-body-wave-wig',
    'Premium 100% human hair Brazilian body wave wig. Soft, natural-looking waves that can be styled, colored, and heat-treated. Features a breathable cap construction for all-day comfort.',
    189.99,
    (SELECT id FROM categories WHERE slug = 'wigs'),
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600',
    ARRAY['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600', 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600'],
    ARRAY['14 inches', '18 inches', '22 inches', '26 inches'],
    ARRAY['Natural Black', 'Dark Brown', 'Medium Brown'],
    true, true, 50, 4.8, 124
  ),
  (
    'Straight Lace Front Wig',
    'straight-lace-front-wig',
    'Sleek and silky straight lace front wig made from virgin human hair. Natural hairline with baby hairs. Perfect for a polished, professional look.',
    159.99,
    (SELECT id FROM categories WHERE slug = 'wigs'),
    'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600',
    ARRAY['https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600'],
    ARRAY['10 inches', '14 inches', '18 inches', '22 inches'],
    ARRAY['Jet Black', 'Natural Black', 'Burgundy'],
    true, false, 35, 4.6, 89
  ),
  (
    'Deep Wave Hair Extensions',
    'deep-wave-extensions',
    'Luxurious deep wave hair extensions. 100% Remy human hair that blends seamlessly with natural hair. Tangle-free and long-lasting.',
    89.99,
    (SELECT id FROM categories WHERE slug = 'hair-extensions'),
    'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600',
    ARRAY['https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600'],
    ARRAY['12 inches', '16 inches', '20 inches', '24 inches'],
    ARRAY['Natural Black', 'Ombre Brown', 'Honey Blonde'],
    true, true, 100, 4.9, 203
  ),
  (
    'Clip-In Hair Extensions Set',
    'clip-in-extensions-set',
    '7-piece clip-in hair extensions set. Easy to apply and remove. Adds instant volume and length without commitment.',
    69.99,
    (SELECT id FROM categories WHERE slug = 'hair-extensions'),
    'https://images.unsplash.com/photo-1522337094846-8a818192de1f?w=600',
    ARRAY['https://images.unsplash.com/photo-1522337094846-8a818192de1f?w=600'],
    ARRAY['14 inches', '18 inches', '22 inches'],
    ARRAY['Natural Black', 'Dark Brown', 'Light Brown', 'Blonde'],
    false, true, 75, 4.7, 156
  ),
  (
    'Curly Ponytail Extension',
    'curly-ponytail',
    'Drawstring curly ponytail extension. Creates a voluminous, bouncy ponytail in seconds. Heat-resistant synthetic fiber.',
    34.99,
    (SELECT id FROM categories WHERE slug = 'attachments'),
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600',
    ARRAY['https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600'],
    ARRAY['16 inches', '20 inches'],
    ARRAY['Natural Black', 'Dark Brown'],
    false, false, 60, 4.5, 78
  ),
  (
    'Sleek Bun Hair Piece',
    'sleek-bun-piece',
    'Elegant donut bun hair piece for instant updo styles. Perfect for weddings, formal events, or everyday glam.',
    24.99,
    (SELECT id FROM categories WHERE slug = 'attachments'),
    'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600',
    ARRAY['https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600'],
    ARRAY['Small', 'Medium', 'Large'],
    ARRAY['Jet Black', 'Natural Black', 'Dark Brown'],
    true, false, 45, 4.4, 52
  ),
  (
    'Argan Oil Hair Treatment',
    'argan-oil-treatment',
    'Luxurious argan oil treatment for dry and damaged hair. Restores shine, reduces frizz, and promotes healthy hair growth.',
    29.99,
    (SELECT id FROM categories WHERE slug = 'hair-creams'),
    'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600',
    ARRAY['https://images.unsplash.com/photo-248543803-ba4f8c70ae0b?w=600'],
    ARRAY['100ml', '200ml'],
    ARRAY['N/A'],
    true, true, 200, 4.9, 312
  ),
  (
    'Edge Control Gel',
    'edge-control-gel',
    'Strong hold edge control gel. Tames flyaways and baby hairs without flaking. Infused with natural oils for added moisture.',
    14.99,
    (SELECT id FROM categories WHERE slug = 'hair-creams'),
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600',
    ARRAY['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600'],
    ARRAY['50g', '100g'],
    ARRAY['N/A'],
    false, true, 150, 4.6, 189
  ),
  (
    'Silk Hair Bonnet',
    'silk-bonnet',
    'Premium silk hair bonnet to protect your hair while sleeping. Reduces friction and prevents breakage. Adjustable elastic band.',
    19.99,
    (SELECT id FROM categories WHERE slug = 'hair-accessories'),
    'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=600',
    ARRAY['https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=600'],
    ARRAY['One Size'],
    ARRAY['Pink', 'Black', 'Champagne', 'Lavender'],
    false, false, 80, 4.8, 167
  ),
  (
    'Professional Styling Comb Set',
    'styling-comb-set',
    '5-piece professional styling comb set. Includes wide-tooth comb, rat tail comb, and detangling brushes. Perfect for all hair types.',
    12.99,
    (SELECT id FROM categories WHERE slug = 'hair-accessories'),
    'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600',
    ARRAY['https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600'],
    ARRAY['5-Piece Set'],
    ARRAY['Black', 'Rose Gold'],
    false, false, 120, 4.3, 95
  ),
  (
    'Kinky Curly Full Lace Wig',
    'kinky-curly-wig',
    'Natural kinky curly full lace wig. Mimics the texture of natural afro hair. Lightweight and breathable for comfortable wear.',
    219.99,
    (SELECT id FROM categories WHERE slug = 'wigs'),
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600',
    ARRAY['https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600'],
    ARRAY['10 inches', '14 inches', '18 inches'],
    ARRAY['Natural Black', 'Dark Brown'],
    true, true, 30, 4.9, 87
  ),
  (
    'Blonde Highlights Bundle',
    'blonde-highlights-bundle',
    'Premium blonde highlights hair bundle. Perfect for adding dimension and brightness. Can be sewn in or bonded.',
    129.99,
    (SELECT id FROM categories WHERE slug = 'hair-extensions'),
    'https://images.unsplash.com/photo-1605980776566-0486c3ac7617?w=600',
    ARRAY['https://images.unsplash.com/photo-1605980776566-0486c3ac7617?w=600'],
    ARRAY['16 inches', '20 inches', '24 inches'],
    ARRAY['Honey Blonde', 'Platinum Blonde', 'Strawberry Blonde'],
    false, false, 40, 4.5, 63
  )
ON CONFLICT (slug) DO NOTHING;

-- Seed some approved reviews
INSERT INTO reviews (product_id, customer_name, rating, comment, is_approved) VALUES
  ((SELECT id FROM products WHERE slug = 'brazilian-body-wave-wig'), 'Sarah M.', 5, 'Absolutely love this wig! The quality is amazing and it looks so natural. I get compliments everywhere I go!', true),
  ((SELECT id FROM products WHERE slug = 'brazilian-body-wave-wig'), 'Jessica T.', 5, 'Best wig I have ever purchased. The waves are beautiful and it is so soft. Will definitely buy again!', true),
  ((SELECT id FROM products WHERE slug = 'deep-wave-extensions'), 'Michelle K.', 5, 'These extensions blend perfectly with my natural hair. No tangling at all and they last a long time.', true),
  ((SELECT id FROM products WHERE slug = 'argan-oil-treatment'), 'Amanda R.', 5, 'My hair has never looked better! This argan oil is a game changer. So shiny and healthy looking now.', true),
  ((SELECT id FROM products WHERE slug = 'kinky-curly-wig'), 'Tiffany L.', 5, 'Finally found a wig that matches my natural texture! It is so comfortable and looks like my real hair.', true),
  ((SELECT id FROM products WHERE slug = 'clip-in-extensions-set'), 'Lauren B.', 4, 'Great for adding volume on special occasions. Easy to put in and take out. Love them!', true)
ON CONFLICT DO NOTHING;
