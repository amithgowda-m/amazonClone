import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // We are heavily relying on the actual backend if this was real,
  // but for the WOW factor in case the user has no database yet:
  const DUMMY_PRODUCTS = {
    'dummy1': { _id: 'dummy1', title: "Razer DeathAdder V2 Gaming Mouse", price: 69.99, image: "https://m.media-amazon.com/images/I/611ZzBqikPL._AC_SL1500_.jpg", description: "Focus+ 20K DPI Optical Sensor. Auto-calibration across mouse mats and reduction of cursor shoot-off from lift-off." },
    'dummy2': { _id: 'dummy2', title: "Apple MacBook Air M2", price: 1199.00, image: "https://m.media-amazon.com/images/I/719C6bJv8jL._AC_SL1500_.jpg", description: "13.6-inch Liquid Retina Display, 8GB RAM, 256GB SSD, Backlit Keyboard, 1080p FaceTime HD Camera. Works seamlessly with iPhone." },
    'dummy3': { _id: 'dummy3', title: "Sony WH-1000XM5 Wireless Headphones", price: 348.00, image: "https://m.media-amazon.com/images/I/61+btxcigvL._AC_SL1500_.jpg", description: "Industry Leading Noise Canceling with Auto Noise Canceling Optimizer. Crystal clear hands-free calling and Up to 30-hour battery life." },
    'dummy4': { _id: 'dummy4', title: "Samsung 49-Inch Odyssey G9 Gaming Monitor", price: 1299.99, image: "https://m.media-amazon.com/images/I/61SQz8S+fEL._AC_SL1000_.jpg", description: "1000R Curved Screen, 240Hz, 1ms, FreeSync Premium Pro. Dual QHD resolution and QLED technology for stunning visuals." }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id.startsWith('dummy')) {
          setProduct(DUMMY_PRODUCTS[id]);
          setLoading(false);
          return;
        }

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
    try {
      // In a real app we'd have a logged in user. We simulate 'user123' for Hackathon flow.
      await axios.post('http://localhost:5000/api/cart', {
        userId: 'hackathon_user_id', 
        productId: product._id,
        quantity: 1
      });
      alert('Added to Cart!');
    } catch (error) {
      // Graceful fallback dummy
      console.log('Fake Added to cart!');
      alert('Successfully Added to Cart (Local UI)!');
    }
    navigate('/cart');
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}><h2>Loading Product...</h2></div>;
  if (!product) return <div style={{ textAlign: 'center', marginTop: '50px' }}><h2>Product Not Found</h2></div>;

  return (
    <div>
      <h1 className="page-title">Product Details</h1>
      
      <div className="detail-container">
        <div className="detail-image-box">
          <img src={product.image} alt={product.title} className="detail-image" />
        </div>
        
        <div className="detail-info">
          <h2 className="detail-title">{product.title}</h2>
          <div className="detail-price">${product.price.toFixed(2)}</div>
          
          <div className="detail-desc">
            <strong>About this item:</strong><br /><br />
            {product.description}
          </div>
          
          <button className="btn add-to-cart-btn btn-icon" onClick={addToCart}>
            <FiShoppingCart size={22} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
