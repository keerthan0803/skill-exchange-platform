import React, { useState } from 'react';
import NavigationBar from '../Dashboard/NavigationBar';
import { useTheme } from '../../context/ThemeContext';
import './Settings.css';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    visibility: 'public'
  });

  const handleToggle = (setting) => {
    setSettings({ ...settings, [setting]: !settings[setting] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleSave = () => {
    // Save settings logic here
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-container">
      <NavigationBar />
      
      <div className="settings-content">
        <div className="settings-header">
          <h1>⚙️ Settings</h1>
          <p>Manage your account preferences and settings</p>
        </div>

        <div className="settings-card">
          <div className="settings-section">
            <h2>Notifications</h2>
            <div className="setting-item">
              <div className="setting-info">
                <h3>Email Notifications</h3>
                <p>Receive updates via email</p>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings.emailNotifications}
                  onChange={() => handleToggle('emailNotifications')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>Push Notifications</h3>
                <p>Receive push notifications in browser</p>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings.pushNotifications}
                  onChange={() => handleToggle('pushNotifications')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h2>Privacy</h2>
            <div className="setting-item">
              <div className="setting-info">
                <h3>Profile Visibility</h3>
                <p>Control who can see your profile</p>
              </div>
              <select 
                name="visibility" 
                value={settings.visibility} 
                onChange={handleChange}
                className="setting-select"
              >
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>

          <div className="settings-section">
            <h2>Appearance</h2>
            <div className="setting-item">
              <div className="setting-info">
                <h3>Theme</h3>
                <p>Choose your preferred theme</p>
              </div>
              <select 
                name="theme" 
                value={theme} 
                onChange={(e) => setTheme(e.target.value)}
                className="setting-select"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>

          <div className="settings-actions">
            <button className="save-btn" onClick={handleSave}>
              Save Changes
            </button>
            <button className="cancel-btn" onClick={() => window.history.back()}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
