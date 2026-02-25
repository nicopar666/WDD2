import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../Services/AuthService';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return authService.register({ email, password }).then(user => {
      setCurrentUser(user);
      return user;
    });
  }

  function login(email, password) {
    return authService.login({ email, password }).then(user => {
      setCurrentUser(user);
      return user;
    });
  }

  function logout() {
    authService.logout();
    setCurrentUser(null);
  }

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      setCurrentUser(JSON.parse(user));
    }

    setLoading(false);
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
