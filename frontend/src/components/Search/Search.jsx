import React, { useState } from 'react';
import NavigationBar from '../Dashboard/NavigationBar';
import './Search.css';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock search results
  const mockUsers = [
    { id: 1, username: 'John Doe', skills: 'JavaScript, React', interests: 'Python, AI', location: 'New York' },
    { id: 2, username: 'Jane Smith', skills: 'Python, Django', interests: 'React, Node.js', location: 'California' },
    { id: 3, username: 'Mike Johnson', skills: 'Java, Spring Boot', interests: 'AWS, DevOps', location: 'Texas' },
    { id: 4, username: 'Sarah Williams', skills: 'UI/UX Design', interests: 'Frontend Development', location: 'Florida' },
    { id: 5, username: 'David Brown', skills: 'Machine Learning', interests: 'Data Science', location: 'Washington' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      // Simulate API call
      setTimeout(() => {
        const results = mockUsers.filter(user => 
          user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.skills.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.interests.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(results);
        setIsSearching(false);
      }, 500);
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
          <button type="submit" className="search-main-btn">
            Search
          </button>
        </form>

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
                    <div className="user-result-detail">
                      <span className="detail-label">📚 Offers:</span>
                      <span className="detail-value">{user.skills}</span>
                    </div>
                    <div className="user-result-detail">
                      <span className="detail-label">🎯 Wants:</span>
                      <span className="detail-value">{user.interests}</span>
                    </div>
                    <div className="user-result-detail">
                      <span className="detail-label">📍 Location:</span>
                      <span className="detail-value">{user.location}</span>
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
