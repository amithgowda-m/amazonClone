const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'General'
    },
    rating: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
