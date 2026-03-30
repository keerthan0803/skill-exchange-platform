import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout';
import { Heart, Users, Zap, TrendingUp, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    followers: 0,
    following: 0,
    matches: 0,
    exchanges: 0,
  });
  const user = JSON.parse(localStorage.getItem('user')) || {};

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Replace with actual API calls
        setStats({
          followers: 12,
          following: 8,
          matches: 5,
          exchanges: 3,
        });
      } catch (err) {
        console.error('Failed to load stats:', err);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className={`card bg-gradient-to-br ${color} text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-90">{label}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <Icon size={40} className="opacity-50" />
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="section-title">Welcome back, {user.username}!</h1>
          <p className="section-subtitle">Your skill exchange hub at a glance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Users}
            label="Followers"
            value={stats.followers}
            color="from-slate-600 to-slate-700"
          />
          <StatCard
            icon={Users}
            label="Following"
            value={stats.following}
            color="from-cyan-500 to-cyan-600"
          />
          <StatCard
            icon={Heart}
            label="Matches"
            value={stats.matches}
            color="from-emerald-500 to-emerald-600"
          />
          <StatCard
            icon={Zap}
            label="Exchanges"
            value={stats.exchanges}
            color="from-red-500 to-red-600"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <p className="text-gray-600 text-sm mt-1">Your latest interactions</p>
              </div>
              <TrendingUp className="text-blue-600" size={24} />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">New match found</p>
                  <p className="text-sm text-gray-600">2 hours ago</p>
                </div>
                <ArrowRight className="text-gray-400" size={20} />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900">New follower</p>
                  <p className="text-sm text-slate-600">5 hours ago</p>
                </div>
                <ArrowRight className="text-slate-400" size={20} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Getting Started</h3>
                <p className="text-slate-600 text-sm mt-1">Complete your profile</p>
              </div>
              <Zap className="text-cyan-600" size={24} />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-cyan-600 rounded-full"></div>
                <p className="text-sm text-slate-700">Add profile picture</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                <p className="text-sm text-slate-700">Add your skills</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                <p className="text-sm text-slate-700">Find your first match</p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Section */}
        <div className="card bg-gradient-to-r from-cyan-50 to-slate-50 border-2 border-cyan-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Ready to exchange your first skill?</h3>
              <p className="text-slate-600 mt-2">Find someone who wants to learn what you know</p>
            </div>
            <button className="btn-primary flex items-center gap-2">
              Find Matches
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
