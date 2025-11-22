// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import { authApi } from '../api/auth.api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar token al cargar
    if (token) {
      verifyToken();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  const verifyToken = async () => {
    try {
      const data = await authApi.verificarToken(token);
      setUser(data.usuario);
    } catch (error) {
      console.error('Error verificando token:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const data = await authApi.login({ email, password });
      const tokenWithBearer = `Bearer ${data.token}`;
      
      setToken(tokenWithBearer);
      setUser(data.usuario);
      localStorage.setItem('token', tokenWithBearer);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const value = {
    token,
    user,
    isAuthenticated: !!token,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};