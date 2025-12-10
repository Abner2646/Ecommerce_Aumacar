// src/api/cliente.js

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
      let errorText = '';
      try {
        const error = await response.json();
        throw new Error(error.error || 'Error en la petición');
      } catch (jsonErr) {
        // Si no es JSON válido, devolver texto plano
        errorText = await response.text();
        throw new Error(errorText || 'Error en la petición (no JSON)');
      }
    }

    try {
      return await response.json();
    } catch (jsonErr) {
      // Si la respuesta no es JSON válida
      const text = await response.text();
      throw new Error(text || 'Respuesta no es JSON válido');
    }
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