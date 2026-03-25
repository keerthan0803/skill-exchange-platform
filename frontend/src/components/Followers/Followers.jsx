import React, { useState, useEffect } from 'react';
import NavigationBar from '../Dashboard/NavigationBar';
import { userService, authService } from '../../services/api';
import './Followers.css';

const Followers = () => {
  const [activeTab, setActiveTab] = useState('followers');
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const loadNetworkData = async () => {
      try {
        setIsLoading(true);
        setError('');
        
        // Get current user profile to get their ID
        const profile = await authService.getProfile();
        setCurrentUserId(profile.id);
        
        // Fetch followers and following
        const followersData = await userService.getFollowers(profile.id);
        const followingData = await userService.getFollowing(profile.id);
        
        setFollowers(followersData);
        setFollowing(followingData);
      } catch (err) {
        setError('Failed to load network data');
        console.error('Network data error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadNetworkData();
  }, []);

  const handleUnfollow = async (userId) => {
    try {
      await userService.unfollowUser(userId);
      setFollowing(following.filter(user => user.id !== userId));
    } catch (err) {
      setError('Failed to unfollow user');
      console.error('Unfollow error:', err);
    }
  };

  const handleViewProfile = (userId) => {
    // Navigate to user profile or show profile modal
    alert(`View profile for user ${userId}`);
  };

  return (
    <div className="followers-container">
      <NavigationBar />
      
      <div className="followers-content">
        <div className="followers-header">
          <h1>My Network</h1>
          <p>Connect with people to exchange skills and knowledge</p>
        </div>

        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'followers' ? 'active' : ''}`}
            onClick={() => setActiveTab('followers')}
          >
            Followers ({followers.length})
          </button>
          <button 
            className={`tab ${activeTab === 'following' ? 'active' : ''}`}
            onClick={() => setActiveTab('following')}
          >
            Following ({following.length})
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading your network...</p>
          </div>
        ) : (
          <div className="followers-list">
            {activeTab === 'followers' ? (
              followers.length > 0 ? (
                followers.map((follower) => (
                  <div key={follower.id} className="follower-card">
                    <div className="follower-avatar">
                      {follower.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="follower-info">
                      <h3>{follower.username}</h3>
                      {follower.fullName && <p className="full-name">{follower.fullName}</p>}
                      <p className="skills">{follower.skills || 'No skills listed'}</p>
                    </div>
                    <button 
                      className="action-btn"
                      onClick={() => handleViewProfile(follower.id)}
                    >
                      View Profile
                    </button>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">👥</div>
                  <h2>No followers yet</h2>
                  <p>Share your skills and start connecting with others!</p>
                </div>
              )
            ) : (
              following.length > 0 ? (
                following.map((user) => (
                  <div key={user.id} className="follower-card">
                    <div className="follower-avatar">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="follower-info">
                      <h3>{user.username}</h3>
                      {user.fullName && <p className="full-name">{user.fullName}</p>}
                      <p className="skills">{user.skills || 'No skills listed'}</p>
                    </div>
                    <button 
                      className="action-btn unfollow"
                      onClick={() => handleUnfollow(user.id)}
                    >
                      Unfollow
                    </button>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">🔍</div>
                  <h2>Not following anyone yet</h2>
                  <p>Explore and connect with people who share your interests!</p>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Followers;
