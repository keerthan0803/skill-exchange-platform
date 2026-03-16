import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './NavigationBar.css';

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem('username');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Add search functionality here
    }
  };

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="navigation-bar">
      <div className="nav-container">
        <div className="nav-brand">
          <h2>Skill Exchange</h2>
        </div>
        
        <div className="nav-links">
          <Link to="/dashboard" className={isActive('/dashboard')}>
            Dashboard
          </Link>
          
          <Link to="/profile" className={isActive('/profile')}>
            My Profile
          </Link>
          
          <Link to="/exchange-skill" className={isActive('/exchange-skill')}>
            Exchange Skill
          </Link>
          
          <Link to="/settings" className={isActive('/settings')}>
            Settings
          </Link>
        </div>

        <div className="nav-user">
          <span className="user-name">Welcome, {username || 'User'}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
