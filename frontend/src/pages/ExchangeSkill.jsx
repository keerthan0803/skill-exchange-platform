import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/Dashboard/NavigationBar';
import './ExchangeSkill.css';

// Mock data representing the bidirectional skill matching logic since backend doesn't exist yet
const MOCK_USERS = [
  { id: 1, name: 'Alice Chen', offeredSkill: 'Python', desiredSkill: 'React', avatar: '👩‍💻', points: 120 },
  { id: 2, name: 'Bob Smith', offeredSkill: 'Java', desiredSkill: 'Python', avatar: '👨‍💻', points: 95 },
  { id: 3, name: 'Charlie Davis', offeredSkill: 'React', desiredSkill: 'Node.js', avatar: '🧑‍💻', points: 200 },
  { id: 4, name: 'Diana Prince', offeredSkill: 'Python', desiredSkill: 'AWS', avatar: '👩‍🚀', points: 155 },
  { id: 5, name: 'Evan Wright', offeredSkill: 'Machine Learning', desiredSkill: 'Django', avatar: '🕵️‍♂️', points: 80 },
  { id: 6, name: 'Fiona Gallagher', offeredSkill: 'UI/UX Design', desiredSkill: 'React', avatar: '🎨', points: 210 },
  { id: 7, name: 'George Miller', offeredSkill: 'Node.js', desiredSkill: 'Python', avatar: '🚀', points: 130 },
];

const ExchangeSkill = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [requestsSent, setRequestsSent] = useState(new Set());

  // Current logged in user's mock skills
  const currentUserSkills = ['React', 'Node.js', 'UI/UX Design'];

  useEffect(() => {
    // If search is empty, show everyone to populate the screen initially
    if (!searchQuery.trim()) {
      setResults(MOCK_USERS);
      setHasSearched(false);
      return;
    }

    // Filter logic: Find users who offer the skill being searched
    const filtered = MOCK_USERS.filter(user => 
      user.offeredSkill.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setResults(filtered);
    setHasSearched(true);
  }, [searchQuery]);

  const handleSendRequest = (userId) => {
    // Add the user ID to the set of sent requests
    setRequestsSent(prev => new Set(prev).add(userId));
    console.log(`Connection request sent to user ${userId}`);
  };

  const isSkillMatched = (desiredSkill) => {
    return currentUserSkills.includes(desiredSkill);
  };

  return (
    <div className="exchange-skill-page">
      <NavigationBar />
      
      <main className="exchange-content">
        <div className="search-header-container">
          <h1 className="page-title">Exchange a Skill</h1>
          <p className="page-subtitle">Search for the skill you want to learn, and find users who want to learn what you know.</p>
          
          <div className="search-bar-wrapper">
            <input
              type="text"
              className="skill-search-input"
              placeholder="What do you want to learn? (e.g. Python)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="search-icon">🔍</div>
          </div>
        </div>

        <div className="results-section">
          <h2 className="results-count">
            {hasSearched ? `Found ${results.length} matched users for "${searchQuery}"` : 'Suggested Skill Exchanges'}
          </h2>
          
          {results.length > 0 ? (
            <div className="user-grid">
              {results.map((user) => {
                const matchFound = isSkillMatched(user.desiredSkill);
                
                return (
                  <div key={user.id} className="user-card glass-panel">
                    <div className="card-header">
                      <div className="avatar-bubble">{user.avatar}</div>
                      <div className="user-info">
                        <h3>{user.name}</h3>
                        <span className="points">⭐ {user.points} XP</span>
                      </div>
                    </div>
                    
                    <div className="skills-bidirectional">
                      <div className="skill-box offer">
                        <span className="label">They Teach</span>
                        <span className="skill-name">{user.offeredSkill}</span>
                      </div>
                      
                      <div className="exchange-arrows">
                         ⟷ 
                      </div>
                      
                      <div className={`skill-box want ${matchFound ? 'match' : ''}`}>
                        <span className="label">They Want</span>
                        <span className="skill-name">{user.desiredSkill}</span>
                        {matchFound && <span className="match-badge">You know this!</span>}
                      </div>
                    </div>
                    
                    <button 
                      className={`btn ${requestsSent.has(user.id) ? 'btn-success' : 'btn-primary'}`}
                      style={{ width: '100%', marginTop: '1.5rem' }}
                      onClick={() => handleSendRequest(user.id)}
                      disabled={requestsSent.has(user.id)}
                    >
                      {requestsSent.has(user.id) ? 'Request Sent ✓' : 'Send Request'}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🤷</div>
              <h3>No match found</h3>
              <p>Try searching for a different skill, or check back later!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ExchangeSkill;
