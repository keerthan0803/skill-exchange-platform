import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { Send, Clock, CheckCircle, XCircle } from 'lucide-react';

const ExchangeSkill = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      from: 'Alice Chen',
      offering: 'Python',
      learning: 'React',
      status: 'pending',
      date: '2 hours ago'
    },
    {
      id: 2,
      from: 'Bob Smith',
      offering: 'Java',
      learning: 'Python',
      status: 'accepted',
      date: '1 day ago'
    },
  ]);

  const handleAccept = (id) => {
    setRequests(prev =>
      prev.map(req => req.id === id ? { ...req, status: 'accepted' } : req)
    );
  };

  const handleReject = (id) => {
    setRequests(prev =>
      prev.map(req => req.id === id ? { ...req, status: 'rejected' } : req)
    );
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const acceptedRequests = requests.filter(r => r.status === 'accepted');
  const rejectedRequests = requests.filter(r => r.status === 'rejected');

  const RequestCard = ({ request, showActions }) => (
    <div className="card">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">{request.from}</h3>
          <p className="text-sm text-gray-600">{request.date}</p>
        </div>
        {request.status === 'accepted' && (
          <span className="badge-success">Accepted</span>
        )}
        {request.status === 'rejected' && (
          <span className="badge-danger">Rejected</span>
        )}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Offers:</span>
          <span className="badge">{request.offering}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Wants:</span>
          <span className="badge-success">{request.learning}</span>
        </div>
      </div>

      {showActions && request.status === 'pending' && (
        <div className="flex gap-2">
          <button
            onClick={() => handleAccept(request.id)}
            className="flex-1 btn-primary flex items-center justify-center gap-2"
          >
            <CheckCircle size={18} />
            Accept
          </button>
          <button
            onClick={() => handleReject(request.id)}
            className="flex-1 btn-danger flex items-center justify-center gap-2"
          >
            <XCircle size={18} />
            Reject
          </button>
        </div>
      )}
    </div>
  );

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="section-title">Skill Exchanges</h1>
          <p className="section-subtitle">Manage your skill exchange requests and connections</p>
        </div>

        {/* Tabs Content */}
        <div className="space-y-6">
          {/* Pending Requests */}
          {pendingRequests.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="text-yellow-600" size={24} />
                Pending Requests ({pendingRequests.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pendingRequests.map(req => (
                  <RequestCard key={req.id} request={req} showActions={true} />
                ))}
              </div>
            </div>
          )}

          {/* Accepted Requests */}
          {acceptedRequests.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-600" size={24} />
                Active Exchanges ({acceptedRequests.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {acceptedRequests.map(req => (
                  <RequestCard key={req.id} request={req} showActions={false} />
                ))}
              </div>
            </div>
          )}

          {/* No Requests */}
          {requests.length === 0 && (
            <div className="card text-center py-12">
              <Send className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-600 text-lg">No exchange requests yet</p>
              <p className="text-gray-500 text-sm mt-2">Go Find Matches to start exchanging skills!</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ExchangeSkill;
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
