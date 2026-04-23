const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Utility function to get or create a cart for a user
const getCart = async (userId) => {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
        cart = new Cart({ userId, items: [] });
    }
    return cart;
};

// GET /cart - Get the cart for a user
// Example request: GET /api/cart?userId=6523abc...
router.get('/', async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) return res.status(400).json({ message: "userId query parameter is required" });

        // populate() will automatically fill in the product details based on the productId
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        
        if (!cart) {
            return res.status(200).json({ items: [] });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching cart', error: error.message });
    }
});

// POST /cart - Add an item to the cart (or increase quantity if it exists)
router.post('/', async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const qty = quantity || 1;

        if (!userId || !productId) {
            return res.status(400).json({ message: "userId and productId are required!" });
        }

        let cart = await getCart(userId);
        
        // Find if the item already exists in the cart array
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex > -1) {
            // Exists => update quantity
            cart.items[itemIndex].quantity += qty;
        } else {
            // Does not exist => add to array
            cart.items.push({ productId, quantity: qty });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error adding to cart', error: error.message });
    }
});

// PUT /cart - Update the exact quantity of an item
router.put('/', async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || typeof quantity === 'undefined') {
            return res.status(400).json({ message: "userId, productId, and quantity are required!" });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex > -1) {
            // Update to specific quantity
            cart.items[itemIndex].quantity = quantity;
            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "Item not in cart" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error updating cart', error: error.message });
    }
});

// DELETE /cart - Remove an item from the cart completely
router.delete('/', async (req, res) => {
    try {
        const { userId, productId } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({ message: "userId and productId are required!" });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        // Filter out the item to be removed
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();
        
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error removing from cart', error: error.message });
    }
});

module.exports = router;
