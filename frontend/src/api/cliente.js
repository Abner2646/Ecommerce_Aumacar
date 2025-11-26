// src/api/client.js
/*import axios from 'axios';
import { API_URL } from '../config';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Interceptor: Agregar token automáticamente
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ⭐ PÁGINAS PÚBLICAS que NO deben redirigir al login
const PUBLIC_PATHS = ['/', '/login', '/register', '/auth-success'];

// Interceptor: Manejar errores de autenticación
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      
      // ⭐ SOLO redirigir si NO estamos en una página pública
      const currentPath = window.location.pathname;
      const isPublicPage = PUBLIC_PATHS.includes(currentPath);
      
      if (!isPublicPage) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;*/

// /src/api/client.js

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

/**
 * Cliente HTTP con configuración base
 * SIEMPRE incluye Authorization header si hay token
 */
export const apiClient = async (endpoint, options = {}) => {
  // Obtener token de localStorage
  const token = localStorage.getItem('token');
  
  // Configurar headers por defecto
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  // SIEMPRE agregar Authorization si existe token
  if (token) {
    headers['Authorization'] = token.startsWith('Bearer') ? token : `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers
    });

    // Si es 401, token inválido - hacer logout
    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/admin/login';
      throw new Error('Sesión expirada');
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error en la petición');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Cliente para FormData (uploads)
 */
export const apiClientFormData = async (endpoint, formData, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    ...options.headers
  };
  
  // NO establecer Content-Type para FormData (el browser lo hace automáticamente)
  
  // SIEMPRE agregar Authorization si existe token
  if (token) {
    headers['Authorization'] = token.startsWith('Bearer') ? token : `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
      ...options
    });

    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/admin/login';
      throw new Error('Sesión expirada');
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error en la petición');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};