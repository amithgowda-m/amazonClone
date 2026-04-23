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
        setProducts(response.data);
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
      <div className="hero-banner"></div>

      <div className="home-grid">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
        
        {/* Fill up space with a mock Auth card if User is not logged in */}
        {!localStorage.getItem('userId') && (
          <div className="amz-card" style={{height: 'fit-content'}}>
            <h2>Sign in for your best experience</h2>
            <button className="btn" onClick={() => window.location.href='/auth'} style={{marginTop: '15px'}}>Sign in securely</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
