import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/cart?userId=${userId}`);
      if (response.data && response.data.items) {
        // Filter out any items whose productId became null (due to product being deleted from DB)
        const validItems = response.data.items.filter(item => item.productId !== null);
        setCartItems(validItems);
      }
    } catch (error) {
      console.log('Error fetching cart:', error);
    }
    setLoading(false);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => item.productId._id === productId ? { ...item, quantity: newQuantity } : item));
    const userId = localStorage.getItem('userId');
    if(userId) {
      axios.put('http://localhost:5000/api/cart', { userId, productId, quantity: newQuantity })
      .catch(err => console.log('Backend sync failed'));
    }
  };

  const removeItem = (productId) => {
    setCartItems(cartItems.filter(item => item.productId._id !== productId));
    const userId = localStorage.getItem('userId');
    if(userId) {
      axios.delete('http://localhost:5000/api/cart', { data: { userId, productId } })
      .catch(err => console.log('Backend sync failed'));
    }
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}><h2>Loading Cart...</h2></div>;

  const total = cartItems.reduce((sum, item) => sum + (item.productId.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart-page">
      <div className="cart-list">
        <h1>Shopping Cart</h1>
        {!localStorage.getItem('userId') ? (
          <div><h2>Please Sign In to view your cart.</h2></div>
        ) : cartItems.length === 0 ? (
          <div><h2>Your Amazon Cart is empty.</h2></div>
        ) : (
          cartItems.map((item, idx) => (
            <div className="cart-item" key={idx}>
              <img src={item.productId.image} alt={item.productId.title} />
              <div className="cart-item-info" style={{ flex: 1 }}>
                <h3>{item.productId.title}</h3>
                <div style={{color: '#007600', fontSize:'12px', margin: '5px 0'}}>In stock</div>
                <div className="cart-actions">
                  <select 
                    value={item.quantity} 
                    onChange={(e) => updateQuantity(item.productId._id, parseInt(e.target.value))}
                    style={{padding: '5px 10px', borderRadius: '8px', background: '#F0F2F2', border: '1px solid #D5D9D9', cursor: 'pointer', boxShadow: '0 2px 5px rgba(15,17,17,.15)'}}
                  >
                    {[...Array(10).keys()].map(x => <option key={x+1} value={x+1}>Qty: {x+1}</option>)}
                  </select>
                  <span style={{color: '#ddd'}}>|</span>
                  <span className="amz-card-link" style={{cursor: 'pointer'}} onClick={() => removeItem(item.productId._id)}>Delete</span>
                </div>
              </div>
              <div className="cart-item-price">
                ₹{item.productId.price.toLocaleString('en-IN')}
              </div>
            </div>
          ))
        )}
        {cartItems.length > 0 && (
          <div style={{textAlign: 'right', fontSize: '18px', paddingTop: '10px'}}>
            Subtotal ({totalItems} items): <span style={{fontWeight: 'bold'}}>₹{total.toLocaleString('en-IN')}</span>
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="cart-subtotal-box">
          <div style={{fontSize: '18px', marginBottom: '20px'}}>
            Subtotal ({totalItems} items): <br/>
            <span style={{fontWeight: 'bold'}}>₹{total.toLocaleString('en-IN')}</span>
          </div>
          <button className="btn" style={{width: '100%', borderRadius: '8px', padding: '10px'}}>Proceed to Buy</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
