import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../services/api';
import './NavigationBar.css';

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const profileMenuRef = useRef(null);

  const username = localStorage.getItem('username') || 'User';
  const email = localStorage.getItem('email') || 'No email available';

  const localUser = useMemo(() => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }, []);

  const displayName = localUser?.fullName || username;
  const profilePhoto =
    localUser?.profilePhoto ||
    localUser?.avatarUrl ||
    localUser?.photoUrl ||
    localUser?.imageUrl ||
    null;
  const avatarInitial = (displayName || 'U').charAt(0).toUpperCase();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await authService.logout();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('role');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Clear local storage even if API call fails
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('role');
      navigate('/login');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirmed) {
      try {
        setIsLoggingOut(true);
        await authService.deleteAccount();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        navigate('/login');
      } catch (error) {
        console.error('Delete account error:', error);
        alert('Failed to delete account. Please try again.');
      } finally {
        setIsLoggingOut(false);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!showProfileMenu) {
        return;
      }

      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileMenu]);

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
          
          <Link to="/chat" className={isActive('/chat')}>
            Messages
          </Link>
          
          <Link to="/exchange-skill" className={isActive('/exchange-skill')}>
            Exchange Skill
          </Link>

          <Link to="/calendar" className={isActive('/calendar')}>
            Calendar
          </Link>
          
          <Link to="/settings" className={isActive('/settings')}>
            Settings
          </Link>
        </div>

        <div className="nav-user">
          <div className="profile-dropdown-wrap" ref={profileMenuRef}>
            <button
              className="profile-trigger-btn"
              onClick={() => setShowProfileMenu((prev) => !prev)}
              aria-expanded={showProfileMenu}
              aria-controls="profile-dropdown"
            >
              {profilePhoto ? (
                <img src={profilePhoto} alt="Profile" className="profile-avatar-image" />
              ) : (
                <span className="profile-avatar-fallback">{avatarInitial}</span>
              )}
            </button>

            {showProfileMenu && (
              <div className="profile-dropdown" id="profile-dropdown">
                <div className="profile-dropdown-header">
                  <div className="profile-dropdown-avatar">
                    {profilePhoto ? (
                      <img src={profilePhoto} alt="Profile" className="profile-avatar-image" />
                    ) : (
                      <span className="profile-avatar-fallback">{avatarInitial}</span>
                    )}
                  </div>
                  <div className="profile-dropdown-meta">
                    <h4>{displayName}</h4>
                    <p>{email}</p>
                  </div>
                </div>

                <div className="profile-dropdown-actions">
                  <Link
                    to="/profile"
                    className="profile-menu-link"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    My Profile
                  </Link>
                  <button 
                    className="logout-btn" 
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                  >
                    {isLoggingOut ? 'Logging out...' : 'Logout'}
                  </button>
                  <button 
                    className="delete-account-btn" 
                    onClick={handleDeleteAccount}
                    disabled={isLoggingOut}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
