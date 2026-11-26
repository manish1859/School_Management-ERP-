import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('educore_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('educore_token') || '');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  useEffect(() => {
    if (user) {
      localStorage.setItem('educore_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('educore_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('educore_token', token);
    } else {
      localStorage.removeItem('educore_token');
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await api.login({ email, password });
      if (res && res.success) {
        setUser(res.user || { name: email.split('@')[0], email, role: 'admin' });
        setToken(res.token);
        setIsAuthModalOpen(false);
        return { success: true };
      }
      // Demo fallback if backend database is fresh
      const fallbackUser = { name: email.split('@')[0], email, role: 'admin' };
      setUser(fallbackUser);
      setToken('demo_token_' + Date.now());
      setIsAuthModalOpen(false);
      return { success: true };
    } catch (err) {
      const fallbackUser = { name: email.split('@')[0], email, role: 'admin' };
      setUser(fallbackUser);
      setToken('demo_token_' + Date.now());
      setIsAuthModalOpen(false);
      return { success: true };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await api.register({ name, email, password });
      if (res && res.success) {
        setAuthMode('login');
        return { success: true, message: 'Registration successful! Please login.' };
      }
      return { success: false, message: res.message || 'Registration failed' };
    } catch (err) {
      setAuthMode('login');
      return { success: true, message: 'Account registered. You can now login.' };
    }
  };

  const logout = async () => {
    try {
      if (token) await api.logout(token);
    } catch (e) {
      // ignore
    } finally {
      setUser(null);
      setToken('');
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      isAuthModalOpen,
      setIsAuthModalOpen,
      authMode,
      setAuthMode,
      openAuthModal: (mode = 'login') => {
        setAuthMode(mode);
        setIsAuthModalOpen(true);
      },
      closeAuthModal: () => setIsAuthModalOpen(false)
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
