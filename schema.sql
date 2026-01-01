-- ============================================
-- RESTAURANT DATABASE SCHEMA
-- MySQL Database Setup
-- ============================================

-- Create database
CREATE DATABASE IF NOT EXISTS restaurant_db;
USE restaurant_db;

-- Menu Items Table
CREATE TABLE IF NOT EXISTS menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image_url VARCHAR(500),
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Reservations Table
CREATE TABLE IF NOT EXISTS reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    party_size INT NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    special_requests TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample menu items
INSERT INTO menu (name, description, price, category, is_available) VALUES
('Margherita Pizza', 'Classic pizza with tomato sauce, mozzarella, and fresh basil', 12.99, 'Main Course', true),
('Caesar Salad', 'Crispy romaine lettuce with Caesar dressing and croutons', 8.99, 'Appetizer', true),
('Grilled Salmon', 'Fresh Atlantic salmon with herbs and lemon butter', 18.99, 'Main Course', true),
('Chocolate Lava Cake', 'Warm chocolate cake with molten center, served with vanilla ice cream', 7.99, 'Dessert', true),
('Fresh Lemonade', 'Homemade lemonade with fresh lemons and mint', 3.99, 'Beverage', true);

-- Insert sample reservation
INSERT INTO reservations (customer_name, customer_email, customer_phone, party_size, reservation_date, reservation_time, special_requests, status) VALUES
('John Doe', 'john.doe@example.com', '+1234567890', 4, '2025-01-15', '19:00:00', 'Window seat preferred', 'confirmed');

-- Display success message
SELECT 'Database schema created successfully!' as message;
