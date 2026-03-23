import React, { useEffect, useState } from 'react';
import NavigationBar from '../components/Dashboard/NavigationBar';
import { authService } from '../services/api';
import './Profile.css';

const Profile = () => {
  const usernameFromStorage = localStorage.getItem('username');
  const emailFromStorage = localStorage.getItem('email');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    username: usernameFromStorage || '',
    fullName: '',
    email: emailFromStorage || '',
    bio: '',
    skills: '',
    interests: '',
    location: '',
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await authService.getProfile();
        setProfileData({
          username: profile.username || usernameFromStorage || '',
          fullName: profile.fullName || '',
          email: profile.email || emailFromStorage || '',
          bio: profile.bio || '',
          skills: profile.skills || '',
          interests: profile.interests || '',
          location: profile.location || '',
        });

        if (profile.username) {
          localStorage.setItem('username', profile.username);
        }
        if (profile.email) {
          localStorage.setItem('email', profile.email);
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [emailFromStorage, usernameFromStorage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const updated = await authService.updateProfile({
        email: profileData.email,
        fullName: profileData.fullName,
        bio: profileData.bio,
        location: profileData.location,
        skills: profileData.skills,
        interests: profileData.interests,
      });

      setProfileData((prev) => ({
        ...prev,
        username: updated.username || prev.username,
        fullName: updated.fullName || '',
        email: updated.email || prev.email,
        bio: updated.bio || '',
        location: updated.location || '',
        skills: updated.skills || '',
        interests: updated.interests || '',
      }));

      if (updated.username) {
        localStorage.setItem('username', updated.username);
      }
      if (updated.email) {
        localStorage.setItem('email', updated.email);
      }

      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      const message = error?.response?.data || 'Failed to update profile';
      alert(message);
    } finally {
      setIsSaving(false);
    }
  };

  const displayName = profileData.fullName || profileData.username;

  if (isLoading) {
    return (
      <div className="profile-container">
        <NavigationBar />
        <div className="profile-content">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <NavigationBar />
      
      <div className="profile-content">
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {displayName ? displayName.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
          <h1>My Profile</h1>
        </div>

        <div className="profile-card">
          <div className="profile-section">
            <div className="section-header">
              <h2>Personal Information</h2>
              <button 
                className="edit-btn" 
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                disabled={isSaving}
              >
                {isEditing ? (isSaving ? 'Saving...' : 'Save') : 'Edit'}
              </button>
            </div>

            <div className="profile-fields">
              <div className="field-group">
                <label>Username</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="username"
                    value={profileData.username}
                    onChange={handleInputChange}
                    disabled
                  />
                ) : (
                  <p>{profileData.username}</p>
                )}
              </div>

              <div className="field-group">
                <label>Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                  />
                ) : (
                  <p>{profileData.fullName || 'Not specified'}</p>
                )}
              </div>

              <div className="field-group">
                <label>Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{profileData.email}</p>
                )}
              </div>

              <div className="field-group">
                <label>Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleInputChange}
                    placeholder="Enter your location"
                  />
                ) : (
                  <p>{profileData.location || 'Not specified'}</p>
                )}
              </div>

              <div className="field-group full-width">
                <label>Bio</label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself"
                    rows="4"
                  />
                ) : (
                  <p>{profileData.bio || 'No bio added yet'}</p>
                )}
              </div>

              <div className="field-group full-width">
                <label>Skills</label>
                {isEditing ? (
                  <textarea
                    name="skills"
                    value={profileData.skills}
                    onChange={handleInputChange}
                    placeholder="List your skills (comma separated)"
                    rows="3"
                  />
                ) : (
                  <p>{profileData.skills || 'No skills added yet'}</p>
                )}
              </div>

              <div className="field-group full-width">
                <label>Interests</label>
                {isEditing ? (
                  <textarea
                    name="interests"
                    value={profileData.interests}
                    onChange={handleInputChange}
                    placeholder="What do you want to learn?"
                    rows="3"
                  />
                ) : (
                  <p>{profileData.interests || 'No interests added yet'}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
