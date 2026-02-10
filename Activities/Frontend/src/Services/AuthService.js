// src/services/AuthService.js

// Base URL for your backend API (adjust to your server, e.g., 'http://localhost:5000' or 'https://your-api.com')
const API_BASE_URL = '/api';  // Or import from env: process.env.REACT_APP_API_URL

export const authService = {
  async register(credentials) {
    // credentials = { email, password, username, etc. }
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const data = await response.json();
    // Assume backend returns { user, token }
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
    return data.user;
  },

  async login(credentials) {
    // credentials = { email, password }
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    // Assume backend returns { user, token }
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
    return data.user;
  },

  async logout() {
    // Optional: Call backend logout if needed (e.g., invalidate token)
    // await fetch(`${API_BASE_URL}/logout`, { method: 'POST', headers: { Authorization: `Bearer ${this.getToken()}` } });

    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken() {
    return localStorage.getItem('token');
  },

  isAuthenticated() {
    return !!this.getToken();
  },
};
