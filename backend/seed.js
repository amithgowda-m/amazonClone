const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// Completely stable Fakestore API items
const INITIAL_PRODUCTS = [
  {
    title: "WD 2TB Elements Portable External Hard Drive",
    price: 5499,
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    description: "USB 3.0 and USB 2.0 Compatibility. Fast data transfers. Improve PC Performance. High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7.",
    category: "Electronics"
  },
  {
    title: "Samsung 49-Inch CHG90 144Hz Monitor",
    price: 99900,
    image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SY817_.jpg",
    description: "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side.",
    category: "Computers"
  },
  {
    title: "WD 4TB Gaming Drive Works with Playstation 4",
    price: 9990,
    image: "https://fakestoreapi.com/img/61mtL65D4cG._AC_SX679_.jpg",
    description: "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
    category: "Electronics"
  },
  {
    title: "Acer SB220Q bi 21.5 inches Full HD IPS Display",
    price: 11000,
    image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
    description: "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz",
    category: "Computers"
  },
  {
    title: "Silicon Power 256GB SSD 3D NAND",
    price: 3999,
    image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
    description: "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance.",
    category: "Electronics"
  },
  {
    title: "SanDisk SSD PLUS 1TB Internal SSD",
    price: 8999,
    image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    description: "Easy upgrade for faster boot up, shutdown, application load and response. Boosts burst write performance, making it ideal for typical PC workloads.",
    category: "Computers"
  },
  {
    title: "Fjallraven - Foldsack No. 1 Backpack",
    price: 4900,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "Fashion"
  },
  {
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    price: 995,
    image: "https://fakestoreapi.com/img/71-3HjGNDMAC._SY800_.jpg",
    description: "Slim-fitting style, contrast raglan sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
    category: "Fashion"
  }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/amazon_clone')
  .then(async () => {
    console.log('MongoDB Connected for Seed...');
    await Product.deleteMany({});
    await Product.insertMany(INITIAL_PRODUCTS);
    console.log('Successfully Seeded 8 Guaranteed-Image Products!');
    process.exit();
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
