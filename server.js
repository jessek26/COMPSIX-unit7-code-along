const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

//middleware
app.use(express.json());

//connect to db
const db = new sqlite3.Database('./database/inventory.db');


//get all products 
app.get('/api/products', (req,res) => {
    db.all('SELECT * FROM products', (err, rows) =>{
        res.json(rows);
    });
});

//get single product
app.get('/api/products/:id', (req,res) => {
    const id = req.params.id;
    db.all('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
        res.json(row);
    });
});

//create new products
app.post('/api/products', (req,res) => {
    const {name, description, price, category, inStock} = req.body;
    db.run(`
        INSERT INTO products (name, description, price, category, inStock)
        VALUES (?,?,?,?,?)`,
         [name, description, price, category, inStock],
    function(err) {
        res.json({id: this.lastID});
    });
});

// //update product price
// db.run('UPDATE products SET price = ? WHERE id = ?',
//     [49.99, 1],
//     function(err) {
//         console.log('rows updated:', this.changes)
//     }
// );

//updating a product
app.put('/api/products/:id', (req,res) => {
    const id = req.params.id;
    const {name, description, price, category, inStock} = req.body;
    db.run(`UPDATE products SET name = ?, description = ?, price = ?, category = ?, inStock = ? WHERE id = ?`,
        [name, description, price, category, inStock, id],
        function(err) {
            res.json({message: 'product updated'});
        }
    )
});

// //hardcode delete
// db.run('DELETE FROM products WHERE id = ?', [6], function(err) {
//     console.log('rows deleted', this.changes);
// });

//delete function
app.delete('/api/products/:id', (req,res) => {
    const id = req.params.id;
    db.run('DELETE FROM products WHERE id = ?',
        [id],
        function(err){
            res.json({message: 'product deleted'})
        }
    );
});

app.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`);
});