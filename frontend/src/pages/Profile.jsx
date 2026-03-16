import React, { useState } from 'react';
import NavigationBar from '../components/Dashboard/NavigationBar';
import './Profile.css';

const Profile = () => {
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: username || '',
    email: email || '',
    bio: '',
    skills: '',
    interests: '',
    location: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSave = () => {
    // TODO: Implement API call to save profile
    setIsEditing(false);
    console.log('Saving profile:', profileData);
  };

  return (
    <div className="profile-container">
      <NavigationBar />
      
      <div className="profile-content">
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {username ? username.charAt(0).toUpperCase() : 'U'}
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
              >
                {isEditing ? 'Save' : 'Edit'}
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
