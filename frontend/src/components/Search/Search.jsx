import React, { useState } from 'react';
import NavigationBar from '../Dashboard/NavigationBar';
import { userService } from '../../services/api';
import './Search.css';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    
    if (searchQuery.trim()) {
      setIsSearching(true);
      try {
        const results = await userService.searchUsers(searchQuery);
        setSearchResults(results);
      } catch (err) {
        setError('Failed to search users. Please try again.');
        console.error('Search error:', err);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }
  };

  const handleConnect = (userId) => {
    alert(`Connection request sent to user ${userId}`);
  };

  return (
    <div className="search-container">
      <NavigationBar />
      
      <div className="search-content">
        <div className="search-header">
          <h1>🔍 Search Users</h1>
          <p>Find people with skills you want to learn</p>
        </div>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search by name, skill, or interest..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-main-input"
          />
          <button type="submit" className="search-main-btn" disabled={isSearching}>
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </form>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {isSearching && (
          <div className="search-loading">
            <div className="spinner"></div>
            <p>Searching...</p>
          </div>
        )}

        {!isSearching && searchResults.length > 0 && (
          <div className="search-results">
            <h2>Found {searchResults.length} {searchResults.length === 1 ? 'user' : 'users'}</h2>
            <div className="results-list">
              {searchResults.map(user => (
                <div key={user.id} className="user-result-card">
                  <div className="user-result-avatar">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="user-result-info">
                    <h3>{user.username}</h3>
                    {user.fullName && <p className="full-name">{user.fullName}</p>}
                    <div className="user-result-detail">
                      <span className="detail-label">📚 Offers:</span>
                      <span className="detail-value">{user.skills || 'N/A'}</span>
                    </div>
                    <div className="user-result-detail">
                      <span className="detail-label">🎯 Wants:</span>
                      <span className="detail-value">{user.interests || 'N/A'}</span>
                    </div>
                    <div className="user-result-detail">
                      <span className="detail-label">📍 Location:</span>
                      <span className="detail-value">{user.location || 'N/A'}</span>
                    </div>
                  </div>
                  <button 
                    className="connect-btn"
                    onClick={() => handleConnect(user.id)}
                  >
                    Connect
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isSearching && searchQuery && searchResults.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h2>No users found</h2>
            <p>Try searching with different keywords</p>
          </div>
        )}

        {!searchQuery && !isSearching && (
          <div className="search-empty">
            <div className="search-empty-icon">👥</div>
            <h2>Start Searching</h2>
            <p>Enter a name, skill, or interest to find users</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
