const sqlite3 = require('sqlite3').verbose();

// Connect to database file
const db = new sqlite3.Database('./database/inventory.db');

db.run(`
    INSERT INTO products (name, description, price, category, inStock)
    VALUES
    ('Wireless Headphones', 'Bluetooth headphones with noise cancellation', 89.99, 'Electronics', 25),
    ('Coffee Mug', 'Ceramic mug with company logo', 12.50, 'Office Supplies', 100),
    ('Laptop Stand', 'Adjustable aluminum laptop stand', 45.00, 'Electronics', 15),
    ('Notebook', 'Spiral-bound notebook with 200 pages', 8.99, 'Office Supplies', 50)
`);
console.log('sample data inserted');

db.all('SELECT * FROM products', (err, rows) => {
    console.log(rows);
});``