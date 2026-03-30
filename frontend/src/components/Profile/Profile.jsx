import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { Edit, Mail, MapPin, Award } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const [formData, setFormData] = useState({
    fullName: user.fullName || '',
    bio: user.bio || '',
    email: user.email || '',
    location: user.location || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsEditing(false);
    // API call to save profile
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="section-title">Your Profile</h1>
            <p className="section-subtitle">Manage your public profile and settings</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn-primary flex items-center gap-2"
          >
            <Edit size={20} />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {/* Profile Header Card */}
        <div className="card">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            {/* Avatar */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gradient-to-r from-slate-700 to-cyan-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                {user.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <p className="mt-4 text-slate-600 text-center text-sm">@{user.username}</p>
            </div>

            {/* User Info */}
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows="3"
                      className="input-field"
                      placeholder="Tell others about yourself..."
                    />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={handleSave} className="btn-primary">Save Changes</button>
                    <button onClick={() => setIsEditing(false)} className="btn-secondary">Cancel</button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{formData.fullName || user.username}</h2>
                  <p className="text-slate-600 mt-2">{formData.bio || 'No bio yet'}</p>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Mail size={18} />
                      <span className="text-sm">{formData.email}</span>
                    </div>
                    {formData.location && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin size={18} />
                        <span className="text-sm">{formData.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Award className="text-cyan-600" size={24} />
            <h3 className="text-lg font-semibold text-slate-900">My Skills</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border-2 border-dashed border-slate-300 rounded-lg text-center text-slate-600">
              <p>No skills added yet</p>
              <button className="text-cyan-600 font-medium mt-2 hover:text-cyan-700">+ Add Skill</button>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <p className="text-slate-600 text-sm mb-1">Followers</p>
            <p className="text-3xl font-bold text-slate-900">12</p>
          </div>
          <div className="card">
            <p className="text-slate-600 text-sm mb-1">Following</p>
            <p className="text-3xl font-bold text-slate-900">8</p>
          </div>
          <div className="card">
            <p className="text-slate-600 text-sm mb-1">Member Since</p>
            <p className="text-lg font-bold text-slate-900">Mar 2024</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;