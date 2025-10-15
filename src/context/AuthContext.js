import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, setAuthToken, getAuthToken, setUser, getUser, logout } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getAuthToken();
      const savedUser = getUser();
      
      if (token && savedUser) {
        setUserState(savedUser);
        try {
          // Verify token is still valid
          const response = await authAPI.getCurrentUser();
          setUserState(response.data.user);
          setUser(response.data.user);
        } catch (error) {
          console.error('Token verification failed:', error);
          logout();
          setUserState(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const register = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await authAPI.register(userData);
      const { token, user } = response.data;
      
      setAuthToken(token);
      setUser(user);
      setUserState(user);
      
      return { success: true, user };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await authAPI.login(credentials);
      const { token, user } = response.data;
      
      setAuthToken(token);
      setUser(user);
      setUserState(user);
      
      return { success: true, user };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await authAPI.updateProfile(profileData);
      const { user } = response.data;
      
      setUser(user);
      setUserState(user);
      
      return { success: true, user };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Profile update failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    logout();
    setUserState(null);
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    register,
    login,
    updateProfile,
    logout: logoutUser,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};