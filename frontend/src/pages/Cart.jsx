import React, { useState, useEffect } from 'react';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initial mockup fallback
  const DUMMY_CART = [
    {
      productId: {
        _id: 'dummy1',
        title: "Razer DeathAdder V2 Gaming Mouse",
        price: 69.99,
        image: "https://m.media-amazon.com/images/I/611ZzBqikPL._AC_SL1500_.jpg",
      },
      quantity: 1
    },
    {
      productId: {
        _id: 'dummy3',
        title: "Sony WH-1000XM5 Wireless Headphones",
        price: 348.00,
        image: "https://m.media-amazon.com/images/I/61+btxcigvL._AC_SL1500_.jpg",
      },
      quantity: 2
    }
  ];

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cart?userId=hackathon_user_id');
      if (response.data && response.data.items && response.data.items.length > 0) {
        setCartItems(response.data.items);
      } else {
        setCartItems(DUMMY_CART); // Graceful fallback
      }
    } catch (error) {
      console.log('Using local cart dummy');
      setCartItems(DUMMY_CART);
    }
    setLoading(false);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    // Optimistic UI Update Fake for hackathon speed
    setCartItems(cartItems.map(item => 
      item.productId._id === productId 
        ? { ...item, quantity: newQuantity } 
        : item
    ));

    // Try backend
    axios.put('http://localhost:5000/api/cart', {
      userId: 'hackathon_user_id',
      productId,
      quantity: newQuantity
    }).catch(err => console.log('Backend sync failed, using UI state'));
  };

  const removeItem = (productId) => {
    setCartItems(cartItems.filter(item => item.productId._id !== productId));
    
    // Try backend
    axios.delete('http://localhost:5000/api/cart', {
      data: { userId: 'hackathon_user_id', productId }
    }).catch(err => console.log('Backend sync failed, using UI state'));
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}><h2>Loading Cart...</h2></div>;

  const total = cartItems.reduce((sum, item) => sum + (item.productId.price * item.quantity), 0);

  return (
    <div>
      <h1 className="page-title">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div style={{textAlign: 'center', marginTop: '40px'}}>
          <h2>Your cart is entirely empty!</h2>
        </div>
      ) : (
        <div className="cart-container">
          {cartItems.map((item, idx) => (
            <div className="cart-item" key={idx}>
              <img src={item.productId.image} alt={item.productId.title} className="cart-item-image" />
              
              <div className="cart-item-details">
                <h3 className="cart-item-title">{item.productId.title}</h3>
                <div className="cart-item-price">${item.productId.price.toFixed(2)}</div>
              </div>
              
              <div className="cart-item-actions">
                <button className="qty-btn" onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}>
                  <FiMinus />
                </button>
                <span className="cart-qty">{item.quantity}</span>
                <button className="qty-btn" onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}>
                  <FiPlus />
                </button>
                
                <button className="btn remove-btn btn-icon" onClick={() => removeItem(item.productId._id)} style={{marginLeft: '20px'}}>
                  <FiTrash2 /> Remove
                </button>
              </div>
            </div>
          ))}
          
          <div className="cart-summary">
            Total Subtotal: <strong>${total.toFixed(2)}</strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
