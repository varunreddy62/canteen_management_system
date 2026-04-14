-- ==============================================
-- Canteen Management System - PostgreSQL Setup
-- (Useful for manual testing or setting up the Render DB directly)
-- Note: Render automatically provides a DB. Run these scripts inside it.
-- ==============================================

CREATE TABLE IF NOT EXISTS food_items (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(500),
    category VARCHAR(255) NOT NULL,
    price DOUBLE PRECISION NOT NULL,
    image_url VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS orders (
    id BIGSERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    total_amount DOUBLE PRECISION NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
    id BIGSERIAL PRIMARY KEY,
    quantity INT NOT NULL,
    price DOUBLE PRECISION NOT NULL,
    food_item_id BIGINT NOT NULL,
    order_id BIGINT NOT NULL,
    FOREIGN KEY (food_item_id) REFERENCES food_items(id),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS admins (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- ==============================================
-- Sample Data
-- ==============================================

-- Admin user (username: admin, password: admin123)
-- (Only run this if the admins table is empty to avoid uniqueness constraint violations)
INSERT INTO admins (username, password) VALUES ('admin', 'admin123') ON CONFLICT DO NOTHING;

-- Breakfast Items
INSERT INTO food_items (name, description, category, price, image_url) VALUES
('Masala Dosa', 'Crispy dosa with potato masala filling, served with chutney and sambar', 'Breakfast', 60.00, 'https://images.unsplash.com/photo-1668236543090-82eb5eadcf04?w=400'),
('Idli Vada', 'Soft steamed idlis with crispy vada, accompanied by coconut chutney', 'Breakfast', 45.00, 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400'),
('Poha', 'Flattened rice cooked with onions, peanuts, and fresh herbs', 'Breakfast', 35.00, 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=400'),
('Upma', 'Savory semolina dish with vegetables and mustard seeds', 'Breakfast', 35.00, 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=400'),
('Aloo Paratha', 'Stuffed flatbread with spiced potato filling, served with curd', 'Breakfast', 50.00, 'https://images.unsplash.com/photo-1604882355535-89e1e4b1a194?w=400');

-- Lunch Items
INSERT INTO food_items (name, description, category, price, image_url) VALUES
('Veg Thali', 'Complete meal with dal, sabzi, rice, roti, salad, and dessert', 'Lunch', 120.00, 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400'),
('Chicken Biryani', 'Aromatic basmati rice layered with tender chicken and spices', 'Lunch', 150.00, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400'),
('Paneer Butter Masala', 'Rich and creamy paneer in tomato-based gravy with naan', 'Lunch', 130.00, 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400'),
('Chole Bhature', 'Spicy chickpea curry with fluffy deep-fried bread', 'Lunch', 90.00, 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=400'),
('Rajma Chawal', 'Kidney bean curry served with steamed basmati rice', 'Lunch', 80.00, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400');

-- Snacks
INSERT INTO food_items (name, description, category, price, image_url) VALUES
('Samosa', 'Crispy pastry filled with spiced potatoes and peas', 'Snacks', 20.00, 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400'),
('Vada Pav', 'Mumbai-style spiced potato fritter in a bun with chutneys', 'Snacks', 25.00, 'https://images.unsplash.com/photo-1606491956689-2ea866880049?w=400'),
('Spring Roll', 'Crispy rolls stuffed with mixed vegetables and noodles', 'Snacks', 40.00, 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400'),
('French Fries', 'Golden crispy potato fries with ketchup and mayo', 'Snacks', 60.00, 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400'),
('Pav Bhaji', 'Spiced mashed vegetable curry with buttered buns', 'Snacks', 70.00, 'https://images.unsplash.com/photo-1606491956689-2ea866880049?w=400');

-- Drinks
INSERT INTO food_items (name, description, category, price, image_url) VALUES
('Masala Chai', 'Traditional Indian spiced tea with ginger and cardamom', 'Drinks', 15.00, 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400'),
('Cold Coffee', 'Creamy blended iced coffee with a chocolate drizzle', 'Drinks', 50.00, 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400'),
('Mango Lassi', 'Chilled yogurt drink blended with fresh mango pulp', 'Drinks', 45.00, 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400'),
('Fresh Lime Soda', 'Refreshing lime soda – sweet or salted', 'Drinks', 30.00, 'https://images.unsplash.com/photo-1513558161293-cdaf765ed514?w=400'),
('Buttermilk', 'Cool and refreshing spiced buttermilk with mint', 'Drinks', 20.00, 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=400');
