import { createContext, useContext, useState, useEffect } from 'react';
import { login as loginService, register as registerService, logout as logoutService, getCurrentUser, isAuthenticated } from '../services/authServices';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated()) {
      setCurrentUser(getCurrentUser());
    }
    setLoading(false);
  }, []);

  async function login(email, password) {
    const user = await loginService({ email, password });
    setCurrentUser(user);
    return user;
  }

  async function signup(email, password) {
    const user = await registerService({ email, password, password_confirmation: password });
    setCurrentUser(user);
    return user;
  }

  function logout() {
    logoutService();
    setCurrentUser(null);
  }

  const value = {
    currentUser,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
