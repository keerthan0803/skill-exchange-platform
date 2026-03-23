import React, { useState, useEffect, useRef } from 'react';
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
  const [showRequestsPanel, setShowRequestsPanel] = useState(false);
  const [activeRequestTab, setActiveRequestTab] = useState('sent');
  const requestsDropdownRef = useRef(null);

  const incomingRequests = [
    { id: 201, name: 'Nora Blake', wantsToLearn: 'React', offers: 'Figma', avatar: '🧠' },
    { id: 202, name: 'Ibrahim Khan', wantsToLearn: 'Node.js', offers: 'Docker', avatar: '🛠️' },
  ];

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!showRequestsPanel) {
        return;
      }

      if (requestsDropdownRef.current && !requestsDropdownRef.current.contains(event.target)) {
        setShowRequestsPanel(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showRequestsPanel]);

  const handleSendRequest = (userId) => {
    // Add the user ID to the set of sent requests
    setRequestsSent(prev => new Set(prev).add(userId));
    console.log(`Connection request sent to user ${userId}`);
  };

  const isSkillMatched = (desiredSkill) => {
    return currentUserSkills.includes(desiredSkill);
  };

  const sentRequests = MOCK_USERS.filter((user) => requestsSent.has(user.id));

  return (
    <div className="exchange-skill-page">
      <NavigationBar />
      
      <main className="exchange-content">
        <div className="search-header-container">
          <div className="search-header-top-row">
            <h1 className="page-title">Exchange a Skill</h1>
            <div className="requests-dropdown-wrap" ref={requestsDropdownRef}>
              <button
                className="requests-trigger-btn"
                onClick={() => setShowRequestsPanel((prev) => !prev)}
                aria-expanded={showRequestsPanel}
                aria-controls="requests-panel"
              >
                Requests
                <span className="requests-pill">{sentRequests.length + incomingRequests.length}</span>
              </button>

              {showRequestsPanel && (
                <div className="requests-panel glass-panel" id="requests-panel">
                  <div className="requests-panel-header">
                    <h3>Skill Exchange Requests</h3>
                    <button
                      className="requests-close-btn"
                      onClick={() => setShowRequestsPanel(false)}
                      aria-label="Close requests"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="requests-tabs" role="tablist" aria-label="Request categories">
                    <button
                      className={`requests-tab ${activeRequestTab === 'sent' ? 'active' : ''}`}
                      onClick={() => setActiveRequestTab('sent')}
                      role="tab"
                      aria-selected={activeRequestTab === 'sent'}
                    >
                      Requests Sent ({sentRequests.length})
                    </button>
                    <button
                      className={`requests-tab ${activeRequestTab === 'received' ? 'active' : ''}`}
                      onClick={() => setActiveRequestTab('received')}
                      role="tab"
                      aria-selected={activeRequestTab === 'received'}
                    >
                      Requests Came ({incomingRequests.length})
                    </button>
                  </div>

                  {activeRequestTab === 'sent' ? (
                    <div className="requests-list">
                      {sentRequests.length > 0 ? (
                        sentRequests.map((user) => (
                          <article key={user.id} className="request-item">
                            <div className="request-main">
                              <span className="request-avatar">{user.avatar}</span>
                              <div>
                                <h4>{user.name}</h4>
                                <p>You requested to learn {user.offeredSkill}</p>
                              </div>
                            </div>
                            <span className="request-status pending">Pending</span>
                          </article>
                        ))
                      ) : (
                        <p className="requests-empty">No sent requests yet. Send your first request from the cards below.</p>
                      )}
                    </div>
                  ) : (
                    <div className="requests-list">
                      {incomingRequests.map((request) => (
                        <article key={request.id} className="request-item">
                          <div className="request-main">
                            <span className="request-avatar">{request.avatar}</span>
                            <div>
                              <h4>{request.name}</h4>
                              <p>Wants to learn {request.wantsToLearn} and offers {request.offers}</p>
                            </div>
                          </div>
                          <div className="request-actions">
                            <button className="btn btn-sm btn-accept">Accept</button>
                            <button className="btn btn-sm btn-decline">Decline</button>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
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
