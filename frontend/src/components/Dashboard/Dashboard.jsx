import React from 'react';
import NavigationBar from './NavigationBar';
import './Dashboard.css';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="dashboard-container">
      <NavigationBar />
      
      <div className="dashboard-content">
        <div className="welcome-section">
          <h1>Welcome to Your Dashboard, {user?.username || 'User'}!</h1>
          <p>Manage your skills, connect with others, and grow your network.</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-icon">📚</div>
            <h3>My Skills</h3>
            <p className="card-number">0</p>
            <p className="card-description">Skills you can teach</p>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">🎯</div>
            <h3>Learning</h3>
            <p className="card-number">0</p>
            <p className="card-description">Skills you want to learn</p>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">👥</div>
            <h3>Connections</h3>
            <p className="card-number">0</p>
            <p className="card-description">Your network</p>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">💬</div>
            <h3>Messages</h3>
            <p className="card-number">0</p>
            <p className="card-description">Unread messages</p>
          </div>
        </div>

        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-item empty">
              <p>No recent activity yet. Start connecting with others!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
