import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { Heart, Check, X, Sparkles } from 'lucide-react';
import { userService } from '../../services/api';

const GetMatched = () => {
  const [formData, setFormData] = useState({
    skillToOffer: '',
    skillToLearn: '',
    experienceLevel: 'intermediate',
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
        const result = await userService.getMatches(formData);
        setMatches(result || []);
        setShowMatches(true);
      } catch (err) {
        setError('Failed to find matches. Please try again.');
      } finally {
        setIsSearching(false);
      }
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="section-title">Find Your Perfect Match</h1>
          <p className="section-subtitle">Get matched with users who want to learn what you know</p>
        </div>

        {!showMatches ? (
          <form onSubmit={handleSubmit} className="card max-w-2xl">
            <div className="space-y-6">
              {/* Skill to Offer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What skill can you teach?
                </label>
                <input
                  type="text"
                  name="skillToOffer"
                  value={formData.skillToOffer}
                  onChange={handleInputChange}
                  placeholder="e.g., Python, Graphic Design, Marketing"
                  className="input-field"
                  required
                />
              </div>

              {/* Skill to Learn */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What skill do you want to learn?
                </label>
                <input
                  type="text"
                  name="skillToLearn"
                  value={formData.skillToLearn}
                  onChange={handleInputChange}
                  placeholder="e.g., Web Development, Singing, Photography"
                  className="input-field"
                  required
                />
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your experience level
                </label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>

              {/* Preferred Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred learning method
                </label>
                <select
                  name="preferredMethod"
                  value={formData.preferredMethod}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="online">Online</option>
                  <option value="inperson">In-Person</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              {/* Error */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSearching}
                className="w-full btn-primary flex items-center justify-center gap-2 py-3"
              >
                <Sparkles size={20} />
                {isSearching ? 'Finding matches...' : 'Find Matches'}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <button
              onClick={() => setShowMatches(false)}
              className="btn-secondary"
            >
              ← New Search
            </button>

            {matches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {matches.map((match) => (
                  <div key={match.id} className="card">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                        {match.username?.charAt(0).toUpperCase() || 'M'}
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 bg-green-50 hover:bg-green-100 rounded-lg text-green-600 transition-colors">
                          <Check size={20} />
                        </button>
                        <button className="p-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-600 transition-colors">
                          <X size={20} />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-semibold text-gray-900">{match.fullName || match.username}</h3>
                    <p className="text-sm text-gray-600">@{match.username}</p>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="badge">Offers: {match.offeringSkill || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="badge-success">Wants: {match.learningSkill || 'N/A'}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button className="w-full btn-primary">Send Match Request</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 card">
                <Heart className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-gray-600 text-lg">No matches found. Try different skills.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default GetMatched;