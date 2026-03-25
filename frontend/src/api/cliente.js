// src/api/cliente.js 

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

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

    // ✅ FIX: Leer el body UNA SOLA VEZ como texto
    const text = await response.text();

    // Si hay error, intentar parsear como JSON o usar texto plano
    if (!response.ok) {
      try {
        const errorData = JSON.parse(text);
        throw new Error(errorData.error || errorData.message || 'Error en la petición');
      } catch (jsonErr) {
        // Si no es JSON válido, usar el texto plano
        throw new Error(text || `Error ${response.status}: ${response.statusText}`);
      }
    }

    // Si es exitoso, parsear como JSON
    try {
      return JSON.parse(text);
    } catch (jsonErr) {
      // Si la respuesta exitosa no es JSON válido
      throw new Error('Respuesta no es JSON válido: ' + text);
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

    // ✅ FIX: Leer el body UNA SOLA VEZ
    const text = await response.text();

    if (!response.ok) {
      try {
        const errorData = JSON.parse(text);
        throw new Error(errorData.error || errorData.message || 'Error en la petición');
      } catch (jsonErr) {
        throw new Error(text || `Error ${response.status}: ${response.statusText}`);
      }
    }

    try {
      return JSON.parse(text);
    } catch (jsonErr) {
      throw new Error('Respuesta no es JSON válido: ' + text);
    }
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

