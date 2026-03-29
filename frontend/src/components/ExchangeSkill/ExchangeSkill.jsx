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