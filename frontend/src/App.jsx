import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FiShoppingCart, FiSearch, FiMapPin, FiMenu } from 'react-icons/fi';
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
        {/* Top Navbar */}
        <nav className="navbar">
          <Link to="/" className="nav-logo">
            amazon<span>.in</span>
          </Link>

          <div className="nav-location">
            <span style={{display: 'flex', alignItems: 'center', gap: '2px'}}><FiMapPin /> Delivering to Gubbi 572216</span>
            <span>Update location</span>
          </div>

          <div className="nav-search">
            <select><option>All</option></select>
            <input type="text" placeholder="Search Amazon.in" />
            <button><FiSearch size={20} color="#333" /></button>
          </div>

          <div className="nav-right">
            <div className="nav-action" style={{flexDirection: 'row', alignItems: 'center', gap: '5px', fontWeight: 'bold'}}>
              <img src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" style={{width: 20}} alt="IN" /> EN
            </div>
            
            {userName ? (
              <div className="nav-action" onClick={handleLogout} style={{cursor: 'pointer'}}>
                <span>Hello, {userName}</span>
                <span>Sign Out</span>
              </div>
            ) : (
              <Link to="/auth" className="nav-action">
                <span>Hello, sign in</span>
                <span>Account & Lists</span>
              </Link>
            )}

            <div className="nav-action">
              <span>Returns</span>
              <span>& Orders</span>
            </div>

            <Link to="/cart" className="nav-cart">
              <FiShoppingCart size={32} />
              <span>Cart</span>
            </Link>
          </div>
        </nav>

        {/* Secondary Sub-Navbar */}
        <div className="sub-navbar">
          <a href="#" style={{display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '700'}}><FiMenu size={18} /> All</a>
          <a href="#">Fresh</a>
          <a href="#">MX Player</a>
          <a href="#">Sell</a>
          <a href="#">Bestsellers</a>
          <a href="#">Mobiles</a>
          <a href="#">Today's Deals</a>
          <a href="#">Customer Service</a>
          <a href="#">New Releases</a>
          <a href="#">Prime</a>
          <a href="#">Amazon Pay</a>
          <a href="#">Fashion</a>
          <a href="#">Electronics</a>
        </div>

        <main>
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
