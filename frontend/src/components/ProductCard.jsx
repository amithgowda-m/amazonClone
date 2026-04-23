import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="amz-card">
      <h2>{product.title}</h2>
      <Link to={`/product/${product._id}`}>
        <img 
          src={product.image} 
          alt={product.title} 
          className="amz-card-image"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/250?text=No+Image+Available"; }} 
        />
      </Link>
      
      <div style={{ marginTop: '5px', fontSize: '18px', color: '#B12704', fontWeight: 'bold' }}>
        ₹{product.price.toLocaleString('en-IN')}
      </div>

      <Link to={`/product/${product._id}`} className="amz-card-link">
        See more
      </Link>
    </div>
  );
};

export default ProductCard;
