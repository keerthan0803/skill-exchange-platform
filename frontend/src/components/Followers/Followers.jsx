import React, { useState } from 'react';
import NavigationBar from '../Dashboard/NavigationBar';
import './Followers.css';

const Followers = () => {
  const [activeTab, setActiveTab] = useState('followers');
  
  // Mock data - replace with actual API calls
  const followers = [];
  const following = [];

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

        <div className="followers-list">
          {activeTab === 'followers' ? (
            followers.length > 0 ? (
              followers.map((follower, index) => (
                <div key={index} className="follower-card">
                  <div className="follower-avatar">
                    {follower.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="follower-info">
                    <h3>{follower.username}</h3>
                    <p>{follower.skills || 'No skills listed'}</p>
                  </div>
                  <button className="action-btn">View Profile</button>
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
              following.map((user, index) => (
                <div key={index} className="follower-card">
                  <div className="follower-avatar">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="follower-info">
                    <h3>{user.username}</h3>
                    <p>{user.skills || 'No skills listed'}</p>
                  </div>
                  <button className="action-btn unfollow">Unfollow</button>
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
      </div>
    </div>
  );
};

export default Followers;
