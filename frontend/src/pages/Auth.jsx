import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!isLogin && !formData.name) return setError("Name is required for Signup");
    if (!formData.email || !formData.password) return setError("Please fill all fields");

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    
    try {
      if (isLogin) {
        // Handle precise backend logic
        const res = await axios.post(`http://localhost:5000${endpoint}`, {
          email: formData.email,
          password: formData.password
        });
        // Connect authenticated status to Cart/Details global availability 
        localStorage.setItem('userId', res.data.userId);
        localStorage.setItem('name', res.data.name);
        localStorage.setItem('token', res.data.token);
        
        window.location.href = '/'; // Hard reload triggers App header state change smoothly
      } else {
        await axios.post(`http://localhost:5000${endpoint}`, formData);
        alert('Signup Successful! Please Log in using your email and password.');
        setIsLogin(true); // Switch to the login view naturally
      }
    } catch (err) {
      setError(err.response?.data?.message || "Internal network error occurred");
    }
  };

  return (
    <div style={{maxWidth: '420px', margin: '60px auto', background: 'var(--bg-card)', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.5)'}}>
      <h2 style={{textAlign: 'center', marginBottom: '25px', color: 'var(--primary)'}}>
        {isLogin ? 'Sign-In to Amazon Clone' : 'Create Account'}
      </h2>
      
      {error && <div style={{color: 'var(--danger)', marginBottom: '15px', padding: '10px', background: 'rgba(220, 53, 69, 0.1)', borderRadius: '4px'}}>{error}</div>}
      
      <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
        {!isLogin && (
          <div>
            <label style={{display: 'block', marginBottom: '8px', fontWeight: '500'}}>Your Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} style={{padding: '12px', borderRadius: '6px', border: '1px solid #444', width: '100%', outline: 'none', background: '#333', color: '#fff'}} />
          </div>
        )}
        
        <div>
          <label style={{display: 'block', marginBottom: '8px', fontWeight: '500'}}>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} style={{padding: '12px', borderRadius: '6px', border: '1px solid #444', width: '100%', outline: 'none', background: '#333', color: '#fff'}} />
        </div>
        
        <div>
          <label style={{display: 'block', marginBottom: '8px', fontWeight: '500'}}>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} style={{padding: '12px', borderRadius: '6px', border: '1px solid #444', width: '100%', outline: 'none', background: '#333', color: '#fff'}} />
        </div>
        
        <button type="submit" className="btn" style={{marginTop: '10px', padding: '15px'}}>{isLogin ? 'Sign In' : 'Create your Amazon account'}</button>
      </form>
      
      <div style={{marginTop: '25px', textAlign: 'center'}}>
        <span style={{color: 'var(--text-muted)'}}>{isLogin ? "New to Amazon? " : "Already have an account? "}</span>
        <span style={{color: 'var(--primary)', cursor: 'pointer', fontWeight: '600', textDecoration: 'underline'}} onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Create an account" : "Sign In"}
        </span>
      </div>
    </div>
  );
};

export default Auth;
