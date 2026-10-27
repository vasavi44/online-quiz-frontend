import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('quiz_auth_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('quiz_auth_token');
      const storedUser = localStorage.getItem('quiz_auth_user');

      if (storedToken && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          // Optionally refresh user info from backend
          const me = await authApi.getMe();
          setUser(me);
          localStorage.setItem('quiz_auth_user', JSON.stringify(me));
        } catch (err) {
          console.warn('Session expired or backend unreachable');
          // If token expired, clear
          if (err.response?.status === 401) {
            logout();
          }
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    const data = await authApi.login(email, password);
    setToken(data.token);
    const userInfo = { id: data.id, name: data.name, email: data.email };
    setUser(userInfo);
    localStorage.setItem('quiz_auth_token', data.token);
    localStorage.setItem('quiz_auth_user', JSON.stringify(userInfo));
    return data;
  };

  const register = async (name, email, password) => {
    const data = await authApi.register(name, email, password);
    setToken(data.token);
    const userInfo = { id: data.id, name: data.name, email: data.email };
    setUser(userInfo);
    localStorage.setItem('quiz_auth_token', data.token);
    localStorage.setItem('quiz_auth_user', JSON.stringify(userInfo));
    return data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('quiz_auth_token');
    localStorage.removeItem('quiz_auth_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
