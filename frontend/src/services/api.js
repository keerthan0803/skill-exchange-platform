import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://skill-exchange-platform-ixdk.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  signup: async (userData) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put('/auth/profile', profileData);
    return response.data;
  },

  deleteAccount: async () => {
    const response = await api.delete('/auth/profile');
    return response.data;
  },
};

export const userService = {
  searchUsers: async (query) => {
    const response = await api.get('/users/search', {
      params: { q: query }
    });
    return response.data;
  },

  getUserProfile: async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  getFollowers: async (userId) => {
    const response = await api.get(`/users/${userId}/followers`);
    return response.data;
  },

  getFollowing: async (userId) => {
    const response = await api.get(`/users/${userId}/following`);
    return response.data;
  },

  followUser: async (userId) => {
    const response = await api.post(`/users/${userId}/follow`);
    return response.data;
  },

  unfollowUser: async (userId) => {
    const response = await api.delete(`/users/${userId}/follow`);
    return response.data;
  },

  getMatches: async (skillToOffer, skillToLearn) => {
    const response = await api.get('/users/matches', {
      params: {
        skillToOffer,
        skillToLearn
      }
    });
    return response.data;
  },
};

export const skillRequestService = {
  createRequest: async (requestData) => {
    const response = await api.post('/requests', requestData);
    return response.data;
  },

  getSentRequests: async () => {
    const response = await api.get('/requests/sent');
    return response.data;
  },

  getReceivedRequests: async () => {
    const response = await api.get('/requests/received');
    return response.data;
  },

  updateStatus: async (requestId, status) => {
    const response = await api.put(`/requests/${requestId}/status`, { status });
    return response.data;
  },
};

export default api;