const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /products - Return list of all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).json({ message: 'Server error while fetching products' });
    }
});

// GET /products/search?q=keyword - Intelligent Search Algorithm
router.get('/search', async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) return res.status(200).json([]);

        // Good Algorithmic Search: split by spaces and perform multi-regex matching
        // so typing "steel shaker" matches "Stainless Steel Protein Shaker"
        const terms = query.split(' ').map(term => `(?=.*${term})`).join('');
        const regex = new RegExp(terms, 'i');

        const products = await Product.find({
            $or: [
                { title: regex },
                { description: regex },
                { category: new RegExp(query, 'i') }
            ]
        }).limit(10); // Limit suggestions to top 10 for performance

        res.status(200).json(products);
    } catch (error) {
        console.error("Error searching products:", error.message);
        res.status(500).json({ message: 'Server error during search' });
    }
});

// GET /products/:id - Return a single product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching single product:", error.message);
        // Handle Invalid ObjectId Error gracefully
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(500).json({ message: 'Server error while fetching product' });
    }
});

// POST /products - Create a new product (Added for testing/seeding)
router.post('/', async (req, res) => {
    try {
        const { title, price, image, description, category, rating } = req.body;
        
        const product = new Product({
            title,
            price,
            image,
            description,
            category,
            rating
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error("Error creating product:", error.message);
        res.status(500).json({ message: 'Server error while creating product' });
    }
});

// DELETE /products/:id - Delete an existing product
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error("Error deleting product:", error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(500).json({ message: 'Server error while deleting product' });
    }
});

module.exports = router;
