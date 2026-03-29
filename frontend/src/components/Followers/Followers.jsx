import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout';
import { Users, UserCheck, UserPlus } from 'lucide-react';
import { userService, authService } from '../../services/api';

const Followers = () => {
  const [activeTab, setActiveTab] = useState('followers');
  const [followers, setFollowers] = useState([
    { id: 1, username: 'alice_chen', fullName: 'Alice Chen', bio: 'Python enthusiast' },
    { id: 2, username: 'bob_smith', fullName: 'Bob Smith', bio: 'Web developer' },
  ]);
  const [following, setFollowing] = useState([
    { id: 3, username: 'charlie_d', fullName: 'Charlie Davis', bio: 'React expert' },
    { id: 4, username: 'diana_p', fullName: 'Diana Prince', bio: 'Designer & developer' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUnfollow = (userId) => {
    setFollowing(prev => prev.filter(u => u.id !== userId));
  };

  const handleRemoveFollower = (userId) => {
    setFollowers(prev => prev.filter(u => u.id !== userId));
  };

  const UserCard = ({ user, isFollowed, onAction, actionLabel, icon: Icon }) => (
    <div className="card">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
          {user.username?.charAt(0).toUpperCase() || 'U'}
        </div>
        <span className={isFollowed ? 'badge-success' : 'badge'}>{isFollowed ? 'Following' : 'Follower'}</span>
      </div>

      <h3 className="font-semibold text-gray-900">{user.fullName}</h3>
      <p className="text-sm text-gray-600">@{user.username}</p>
      <p className="text-sm text-gray-600 mt-2">{user.bio || 'No bio yet'}</p>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <button
          onClick={() => onAction(user.id)}
          className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg font-medium transition-all ${
            isFollowed
              ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
          }`}
        >
          <Icon size={18} />
          {actionLabel}
        </button>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="section-title">Your Network</h1>
          <p className="section-subtitle">Manage your followers and following</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('followers')}
            className={`pb-4 px-4 font-medium border-b-2 transition-all ${
              activeTab === 'followers'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users size={20} />
              Followers ({followers.length})
            </div>
          </button>
          <button
            onClick={() => setActiveTab('following')}
            className={`pb-4 px-4 font-medium border-b-2 transition-all ${
              activeTab === 'following'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <UserCheck size={20} />
              Following ({following.length})
            </div>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Tab Content */}
        {activeTab === 'followers' ? (
          <div>
            {followers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {followers.map(follower => (
                  <UserCard
                    key={follower.id}
                    user={follower}
                    isFollowed={false}
                    onAction={handleRemoveFollower}
                    actionLabel="Remove"
                    icon={UserPlus}
                  />
                ))}
              </div>
            ) : (
              <div className="card text-center py-12">
                <Users className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-gray-600 text-lg">No followers yet</p>
                <p className="text-gray-500 text-sm mt-2">Share your profile to gain followers!</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            {following.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {following.map(user => (
                  <UserCard
                    key={user.id}
                    user={user}
                    isFollowed={true}
                    onAction={handleUnfollow}
                    actionLabel="Unfollow"
                    icon={UserCheck}
                  />
                ))}
              </div>
            ) : (
              <div className="card text-center py-12">
                <UserCheck className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-gray-600 text-lg">Not following anyone yet</p>
                <p className="text-gray-500 text-sm mt-2">Start following users to grow your network!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Followers;