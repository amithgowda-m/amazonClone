import React, { useState, useEffect, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Hide dropdown if clicked outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length === 0) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await axios.get(`http://localhost:5000/api/products/search?q=${query}`);
        setSuggestions(res.data);
      } catch (error) {
        console.error("Search fetch error", error);
      }
    };

    // Debounce to avoid flooding the API
    const delayDebounce = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSelectProduct = (productId) => {
    setShowDropdown(false);
    setQuery('');
    navigate(`/product/${productId}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(query) {
       // Optional: Route to a full search results page if desired
       // navigate(`/search?q=${query}`);
    }
  };

  return (
    <form className="nav-search" onSubmit={handleSubmit} style={{position: 'relative'}} ref={dropdownRef}>
      <select><option>All</option></select>
      <input 
        type="text" 
        placeholder="Search Amazon.in" 
        value={query}
        onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
      />
      <button type="submit"><FiSearch size={20} color="#333" /></button>

      {/* Auto-Suggestions Dropdown */}
      {showDropdown && suggestions.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '42px',
          left: '50px', // offset past the select dropdown
          right: '50px', // offset past the search button
          backgroundColor: '#fff',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          borderBottomLeftRadius: '4px',
          borderBottomRightRadius: '4px',
          zIndex: 1000,
          maxHeight: '400px',
          overflowY: 'auto',
          color: '#0F1111'
        }}>
          {suggestions.map((p) => (
            <div 
              key={p._id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 15px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f3f3'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
              onClick={() => handleSelectProduct(p._id)}
            >
              {/* Show image locally without breaking layout */}
              <img src={p.image} alt={p.title} style={{width: '40px', height: '40px', objectFit: 'contain', marginRight: '15px'}} />
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <span style={{fontSize: '14px', fontWeight: '500'}}>{p.title.substring(0, 60)}{p.title.length > 60 ? '...' : ''}</span>
                <span style={{fontSize: '12px', color: '#555', fontStyle: 'italic'}}>in {p.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default SearchBar;
