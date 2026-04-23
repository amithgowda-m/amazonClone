const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const INITIAL_PRODUCTS = [
  
  {
    title: "Apple MacBook Air M2 (2022)",
    price: 99900,
    image: "/products/macbook.jpg",
    description: "13.6-inch Liquid Retina Display, 8GB RAM, 256GB SSD, Backlit Keyboard, 1080p FaceTime HD Camera.",
    category: "Computers"
  },
  {
    title: "Sony WH-1000XM5 Wireless Headphones",
    price: 29990,
    image: "/products/sony.jpg",
    description: "Industry Leading Noise Canceling with Auto Noise Canceling Optimizer. Crystal clear hands-free calling and Up to 30-hour battery life.",
    category: "Electronics"
  },
  {
    title: "Samsung 49-Inch Odyssey G9 Gaming Monitor",
    price: 119000,
    image: "/products/odyssey.jpg",
    description: "1000R Curved Screen, 240Hz, 1ms, FreeSync Premium Pro. Dual QHD resolution and QLED technology for stunning visuals.",
    category: "Computers"
  },
  {
    title: "Kindle Paperwhite (8 GB)",
    price: 13999,
    image: "/products/kindle.jpg",
    description: "Now with a 6.8\" display and thinner borders, adjustable warm light, up to 10 weeks of battery life, and 20% faster page turns.",
    category: "Electronics"
  },
  {
    title: "Echo Dot (5th Gen, 2022 release)",
    price: 4999,
    image: "/products/echo.jpg",
    description: "Our best sounding Echo Dot yet – Enjoy an improved audio experience compared to any previous Echo Dot with Alexa for clearer vocals.",
    category: "Smart Home"
  },
  {
    title: "Bose SoundLink Flex Bluetooth Speaker",
    price: 14900,
    image: "/products/bose.jpg",
    description: "State-of-the-art design – SoundLink Flex outdoor speaker is packed with exclusive technologies and a custom-engineered transducer.",
    category: "Electronics"
  },
  {
    title: "Logitech MX Master 3S Advanced Mouse",
    price: 9995,
    image: "/products/logitech.jpg",
    description: "Auto-shift scrolling. MagSpeed Electromagnetic scrolling is precise enough to stop on a pixel and quick enough to scroll 1,000 lines a second.",
    category: "Electronics"
  }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/amazon_clone')
  .then(async () => {
    console.log('MongoDB Connected for Seed...');
    await Product.deleteMany({});
    await Product.insertMany(INITIAL_PRODUCTS);
    console.log(`Successfully Seeded ${INITIAL_PRODUCTS.length} Local-Image Products!`);
    process.exit();
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
