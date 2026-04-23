import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching single product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert("You need to Sign In before adding to your cart!");
      navigate('/auth');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/cart', {
        userId: userId, 
        productId: product._id,
        quantity: 1
      });
      alert('Added to Cart!');
    } catch (error) {
      console.log('Error adding to cart');
      alert('Error syncing to cart');
    }
    navigate('/cart');
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}><h2>Loading Product...</h2></div>;
  if (!product) return <div style={{ textAlign: 'center', marginTop: '50px' }}><h2>Product Not Found</h2></div>;

  return (
    <div className="detail-page">
      <div className="detail-img-sec">
        <img src={product.image} alt={product.title} />
      </div>
      
      <div className="detail-info-sec">
        <h1 className="detail-title">{product.title}</h1>
        <div style={{color: '#007185', marginBottom: '15px'}}>{product.category} Brand</div>
        <div className="detail-price">
          <span style={{fontSize: '14px', position: 'relative', top: '-10px'}}>₹</span>
          {product.price.toLocaleString('en-IN')}
        </div>
        
        <div style={{borderTop: '1px solid #ccc', paddingTop: '15px', marginTop: '15px'}}>
          <strong>About this item:</strong><br />
          <ul style={{marginLeft: '20px', marginTop: '10px', color: '#0F1111'}}>
            <li style={{marginBottom: '5px'}}>{product.description}</li>
            <li style={{marginBottom: '5px'}}>Genuine product with warranty</li>
            <li style={{marginBottom: '5px'}}>Easy 10-day return policy</li>
          </ul>
        </div>
      </div>

      <div className="detail-buy-box">
        <div style={{fontSize: '18px', color: '#B12704', fontWeight: 'bold'}}>₹{product.price.toLocaleString('en-IN')}</div>
        <div style={{color: '#007185', margin: '15px 0'}}>FREE delivery</div>
        <h3 style={{color: '#007600', fontSize:'18px', fontWeight:'normal'}}>In stock</h3>
        
        <button className="btn" onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
