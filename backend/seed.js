const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const INITIAL_PRODUCTS = [
  {
    title: "Razer DeathAdder V2 Gaming Mouse",
    price: 5499,
    image: "https://m.media-amazon.com/images/I/61bdB76eUCL._AC_SL1500_.jpg",
    description: "Focus+ 20K DPI Optical Sensor. Auto-calibration across mouse mats and reduction of cursor shoot-off from lift-off.",
    category: "Electronics"
  },
  {
    title: "Apple MacBook Air M2 (2022)",
    price: 99900,
    image: "https://m.media-amazon.com/images/I/71jG+e7roXL._AC_SL1500_.jpg",
    description: "13.6-inch Liquid Retina Display, 8GB RAM, 256GB SSD, Backlit Keyboard, 1080p FaceTime HD Camera.",
    category: "Computers"
  },
  {
    title: "Sony WH-1000XM5 Wireless Headphones",
    price: 29990,
    image: "https://m.media-amazon.com/images/I/51aXvjBcqwL._AC_SL1000_.jpg",
    description: "Industry Leading Noise Canceling with Auto Noise Canceling Optimizer. Crystal clear hands-free calling and Up to 30-hour battery life.",
    category: "Electronics"
  },
  {
    title: "Samsung 49-Inch Odyssey G9 Gaming Monitor",
    price: 119000,
    image: "https://m.media-amazon.com/images/I/61SQz8S+fEL._AC_SL1000_.jpg",
    description: "1000R Curved Screen, 240Hz, 1ms, FreeSync Premium Pro. Dual QHD resolution and QLED technology for stunning visuals.",
    category: "Computers"
  },
  {
    title: "Kindle Paperwhite (8 GB)",
    price: 13999,
    image: "https://m.media-amazon.com/images/I/71TPda7cwNL._AC_SL1500_.jpg",
    description: "Now with a 6.8\" display and thinner borders, adjustable warm light, up to 10 weeks of battery life, and 20% faster page turns.",
    category: "Electronics"
  },
  {
    title: "Echo Dot (5th Gen, 2022 release)",
    price: 4999,
    image: "https://m.media-amazon.com/images/I/81lgHjUjS6L._AC_SL1500_.jpg",
    description: "Our best sounding Echo Dot yet – Enjoy an improved audio experience compared to any previous Echo Dot with Alexa for clearer vocals.",
    category: "Smart Home"
  },
  {
    title: "Bose SoundLink Flex Bluetooth Speaker",
    price: 14900,
    image: "https://m.media-amazon.com/images/I/51y-0BfGE4L._AC_SL1500_.jpg",
    description: "State-of-the-art design – SoundLink Flex outdoor speaker is packed with exclusive technologies and a custom-engineered transducer.",
    category: "Electronics"
  },
  {
    title: "Logitech MX Master 3S Advanced Mouse",
    price: 9995,
    image: "https://m.media-amazon.com/images/I/61vGQNUEsGL._AC_SL1500_.jpg",
    description: "Auto-shift scrolling. MagSpeed Electromagnetic scrolling is precise enough to stop on a pixel and quick enough to scroll 1,000 lines a second.",
    category: "Electronics"
  }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/amazon_clone')
  .then(async () => {
    console.log('MongoDB Connected for Seed...');
    await Product.deleteMany({}); // Clear existing ones to prevent duplicates
    await Product.insertMany(INITIAL_PRODUCTS);
    console.log('Successfully Seeded 8 Products Database!');
    process.exit();
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
