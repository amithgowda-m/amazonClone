import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        
        // Use DB products if available, otherwise gracefully fallback to high-quality dummy data
        if (response.data && response.data.length > 0) {
          setProducts(response.data);
        } else {
          setProducts([
            {
              _id: 'dummy1',
              title: "Razer DeathAdder V2 Gaming Mouse",
              price: 69.99,
              image: "https://m.media-amazon.com/images/I/611ZzBqikPL._AC_SL1500_.jpg",
              description: "Focus+ 20K DPI Optical Sensor"
            },
            {
              _id: 'dummy2',
              title: "Apple MacBook Air M2",
              price: 1199.00,
              image: "https://m.media-amazon.com/images/I/719C6bJv8jL._AC_SL1500_.jpg",
              description: "13.6-inch Liquid Retina Display, 8GB RAM, 256GB SSD"
            },
            {
              _id: 'dummy3',
              title: "Sony WH-1000XM5 Wireless Headphones",
              price: 348.00,
              image: "https://m.media-amazon.com/images/I/61+btxcigvL._AC_SL1500_.jpg",
              description: "Industry Leading Noise Canceling with Auto Noise Canceling Optimizer"
            },
            {
              _id: 'dummy4',
              title: "Samsung 49-Inch Odyssey G9 Gaming Monitor",
              price: 1299.99,
              image: "https://m.media-amazon.com/images/I/61SQz8S+fEL._AC_SL1000_.jpg",
              description: "1000R Curved Screen, 240Hz, 1ms, FreeSync Premium Pro"
            }
          ]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}><h2>Loading...</h2></div>;

  return (
    <div>
      <h1 className="page-title">Featured Products</h1>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
