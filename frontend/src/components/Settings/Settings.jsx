import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { Bell, Shield, Save, LogOut, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    matchNotifications: true,
    profileVisibility: 'public',
    allowMessages: true,
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleToggle = (setting) => {
    setSettings({ ...settings, [setting]: !settings[setting] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleSave = () => {
    // API call to save settings
    alert('Settings saved successfully!');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleDeleteAccount = async () => {
    try {
      // API call to delete account
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.clear();
      navigate('/login');
    } catch (err) {
      alert('Failed to delete account');
    }
  };

  const SettingToggle = ({ label, description, setting, onChange }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0">
      <div>
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <button
        onClick={() => onChange(setting)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          settings[setting] ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            settings[setting] ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <Layout>
      <div className="space-y-8 max-w-3xl">
        {/* Header */}
        <div>
          <h1 className="section-title">Settings</h1>
          <p className="section-subtitle">Manage your account preferences</p>
        </div>

        {/* Notification Settings */}
        <div className="card">
          <div className="flex items-center gap-2 mb-6">
            <Bell className="text-blue-600" size={24} />
            <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
          </div>

          <SettingToggle
            label="Email Notifications"
            description="Receive notifications via email"
            setting="emailNotifications"
            onChange={handleToggle}
          />
          <SettingToggle
            label="Push Notifications"
            description="Receive browser push notifications"
            setting="pushNotifications"
            onChange={handleToggle}
          />
          <SettingToggle
            label="Match Notifications"
            description="Get notified when you have a new match"
            setting="matchNotifications"
            onChange={handleToggle}
          />
        </div>

        {/* Privacy Settings */}
        <div className="card">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="text-green-600" size={24} />
            <h2 className="text-xl font-bold text-gray-900">Privacy</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
              <select
                name="profileVisibility"
                value={settings.profileVisibility}
                onChange={handleChange}
                className="input-field"
              >
                <option value="public">Public - Everyone can see my profile</option>
                <option value="friends">Friends Only - Only people I follow</option>
                <option value="private">Private - Nobody can see my profile</option>
              </select>
            </div>

            <SettingToggle
              label="Allow Direct Messages"
              description="Allow other users to send you messages"
              setting="allowMessages"
              onChange={handleToggle}
            />
          </div>
        </div>

        {/* Account Actions */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Account</h2>

          <div className="space-y-3">
            <button
              onClick={handleSave}
              className="w-full btn-primary flex items-center justify-center gap-2 py-3"
            >
              <Save size={20} />
              Save Changes
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium rounded-lg transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>

            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-lg transition-colors border border-red-200"
            >
              <Trash2 size={20} />
              Delete Account
            </button>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Account</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete your account? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="card bg-blue-50 border border-blue-200">
          <p className="text-blue-900 text-sm">
            💡 <strong>Tip:</strong> Keep your email address up to date so you don't miss important notifications about skill exchanges and messages from other users.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
