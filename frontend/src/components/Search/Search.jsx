import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { Search as SearchIcon, MapPin, Award, Heart, UserPlus } from 'lucide-react';
import { userService } from '../../services/api';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const [followed, setFollowed] = useState(new Set());

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    
    if (searchQuery.trim()) {
      setIsSearching(true);
      try {
        const results = await userService.searchUsers(searchQuery);
        setSearchResults(results || []);
      } catch (err) {
        setError('Failed to search users. Please try again.');
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }
  };

  const handleFollow = (userId) => {
    setFollowed(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="section-title">Search Users</h1>
          <p className="section-subtitle">Find users and discover their skills</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="w-full">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-3 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by username, skill, or location..."
              className="input-field pl-12 py-3 text-base"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="absolute right-3 top-2 btn-primary px-4"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((user) => (
              <div key={user.id} className="card card-hover">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {user.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <Heart className="text-gray-300 hover:text-red-500 cursor-pointer" size={20} />
                </div>
                <h3 className="font-semibold text-gray-900">{user.fullName || user.username}</h3>
                <p className="text-sm text-gray-600">@{user.username}</p>
                <p className="text-sm text-gray-600 mt-2">{user.bio || 'No bio yet'}</p>
                
                {user.location && (
                  <div className="flex items-center gap-2 mt-3 text-gray-600 text-sm">
                    <MapPin size={16} />
                    <span>{user.location}</span>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                  <button
                    onClick={() => handleFollow(user.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-medium transition-all ${
                      followed.has(user.id)
                        ? 'bg-red-50 text-red-600 border border-red-200'
                        : 'btn-primary'
                    }`}
                  >
                    <UserPlus size={16} />
                    {followed.has(user.id) ? 'Following' : 'Follow'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : searchQuery && !isSearching ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No users found. Try a different search term.</p>
          </div>
        ) : !searchQuery ? (
          <div className="text-center py-12">
            <SearchIcon className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-600 text-lg">Start searching to find users</p>
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default Search;
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
