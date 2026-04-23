import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import ProductList from './pages/ProductList';

import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Auth from './pages/Auth';

function App() {
  const userName = localStorage.getItem('name');

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    window.location.href = '/';
  };
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="container nav-container">
            <Link to="/" className="nav-logo">
              Amazon<span>Clone</span>
            </Link>
            <div className="nav-links">
              {userName ? (
                <>
                  <span className="nav-link" style={{marginRight: '15px'}}>Hello, {userName}</span>
                  <button onClick={handleLogout} className="btn" style={{padding: '5px 15px', marginRight: '15px'}}>Sign Out</button>
                </>
              ) : (
                <Link to="/auth" className="nav-link" style={{marginRight: '15px'}}>
                  <span>Sign In</span>
                </Link>
              )}
              
              <Link to="/cart" className="nav-link">
                <FiShoppingCart size={24} />
                <span>Cart</span>
              </Link>
            </div>
          </div>
        </nav>

        <main className="container">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
