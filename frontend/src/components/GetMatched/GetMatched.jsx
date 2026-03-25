import React, { useState } from 'react';
import NavigationBar from '../Dashboard/NavigationBar';
import { userService } from '../../services/api';
import './GetMatched.css';

const GetMatched = () => {
  const [formData, setFormData] = useState({
    skillToOffer: '',
    skillToLearn: '',
    experienceLevel: 'intermediate',
    availability: '',
    preferredMethod: 'online'
  });

  const [matches, setMatches] = useState([]);
  const [showMatches, setShowMatches] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.skillToOffer && formData.skillToLearn) {
      setIsSearching(true);
      try {
        const results = await userService.getMatches(formData.skillToOffer, formData.skillToLearn);
        setMatches(results);
        setShowMatches(true);
      } catch (err) {
        setError('Failed to find matches. Please try again.');
        console.error('Match search error:', err);
        setMatches([]);
      } finally {
        setIsSearching(false);
      }
    }
  };

  const handleConnect = (userId) => {
    alert(`Connection request sent to user ${userId}`);
  };

  return (
    <div className="get-matched-container">
      <NavigationBar />
      
      <div className="get-matched-content">
        <div className="get-matched-header">
          <h1>🎯 Get Matched</h1>
          <p>Find the perfect skill exchange partner</p>
        </div>

        <div className="matching-form-card">
          <form onSubmit={handleSubmit} className="matching-form">
            <div className="form-row">
              <div className="form-field">
                <label>
                  <span className="label-icon">📚</span>
                  What skill can you offer?
                </label>
                <input
                  type="text"
                  name="skillToOffer"
                  value={formData.skillToOffer}
                  onChange={handleInputChange}
                  placeholder="e.g., JavaScript, React, Python..."
                  required
                />
              </div>

              <div className="form-field">
                <label>
                  <span className="label-icon">🎯</span>
                  What skill do you want to learn?
                </label>
                <input
                  type="text"
                  name="skillToLearn"
                  value={formData.skillToLearn}
                  onChange={handleInputChange}
                  placeholder="e.g., Python, Machine Learning..."
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label>
                  <span className="label-icon">⭐</span>
                  Your Experience Level
                </label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleInputChange}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>

              <div className="form-field">
                <label>
                  <span className="label-icon">🌐</span>
                  Preferred Method
                </label>
                <select
                  name="preferredMethod"
                  value={formData.preferredMethod}
                  onChange={handleInputChange}
                >
                  <option value="online">Online</option>
                  <option value="in-person">In-Person</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>

            <div className="form-field full-width">
              <label>
                <span className="label-icon">📅</span>
                Your Availability
              </label>
              <textarea
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
                placeholder="e.g., Weekday evenings, Weekend mornings..."
                rows="3"
              />
            </div>

            <button type="submit" className="find-matches-btn" disabled={isSearching}>
              {isSearching ? 'Finding Matches...' : '🔍 Find Matches'}
            </button>
          </form>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {isSearching && (
          <div className="searching-indicator">
            <div className="spinner-large"></div>
            <p>Finding your perfect matches...</p>
          </div>
        )}

        {showMatches && !isSearching && (
          <div className="matches-section">
            <h2>✨ Your Top Matches {matches.length > 0 ? `(${matches.length})` : ''}</h2>
            {matches.length > 0 ? (
              <div className="matches-list">
                {matches.map(match => (
                  <div key={match.id} className="match-card">
                    <div className="match-header">
                      <div className="match-avatar">
                        {match.username.charAt(0).toUpperCase()}
                      </div>
                      <div className="match-info">
                        <h3>{match.username}</h3>
                        {match.fullName && <p className="match-fullname">{match.fullName}</p>}
                        <p className="match-location">📍 {match.location || 'N/A'}</p>
                      </div>
                      <div className="match-score">
                        <div className="score-circle">{match.matchPercentage}%</div>
                        <p>Match</p>
                      </div>
                    </div>
                    
                    <div className="match-details">
                      <div className="match-detail-item">
                        <span className="detail-icon">💡</span>
                        <div>
                          <strong>Can teach:</strong>
                          <p>{match.skills || 'N/A'}</p>
                        </div>
                      </div>
                      <div className="match-detail-item">
                        <span className="detail-icon">🎓</span>
                        <div>
                          <strong>Wants to learn:</strong>
                          <p>{match.interests || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      className="match-connect-btn"
                      onClick={() => handleConnect(match.id)}
                    >
                      Send Connection Request
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-matches">
                <p>No matches found. Try adjusting your skills.</p>
              </div>
            )}
          </div>
        )}
        )}

        {showMatches && !isSearching && (
          <div className="matches-section">
            <h2>✨ Your Top Matches</h2>
            <div className="matches-list">
              {matches.map(match => (
                <div key={match.id} className="match-card">
                  <div className="match-header">
                    <div className="match-avatar">
                      {match.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="match-info">
                      <h3>{match.username}</h3>
                      <p className="match-location">📍 {match.location}</p>
                    </div>
                    <div className="match-score">
                      <div className="score-circle">{match.match}%</div>
                      <p>Match</p>
                    </div>
                  </div>
                  
                  <div className="match-details">
                    <div className="match-detail-item">
                      <span className="detail-icon">💡</span>
                      <div>
                        <strong>Can teach:</strong>
                        <p>{match.skill}</p>
                      </div>
                    </div>
                    <div className="match-detail-item">
                      <span className="detail-icon">🎓</span>
                      <div>
                        <strong>Wants to learn:</strong>
                        <p>{match.wants}</p>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    className="match-connect-btn"
                    onClick={() => handleConnect(match.id)}
                  >
                    Send Connection Request
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetMatched;
