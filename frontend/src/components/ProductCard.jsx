import React from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.title} className="product-image" />
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        
        <div className="card-action">
          <Link to={`/product/${product._id}`} className="btn card-btn btn-icon">
            <FiEye /> View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
