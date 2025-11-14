const sqlite3 = require('sqlite3').verbose()

//create and connect to database file

const db = new sqlite3.Database('./database/inventory.db');
console.log('connected to SQLite database');

// create products table
db.run(`
    CREATE TABLE products(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    price REAL,
    category TEXT,
    inStock INTEGER
    )
`);
console.log('products table created');
