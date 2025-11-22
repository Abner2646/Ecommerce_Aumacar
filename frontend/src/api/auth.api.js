// src/api/auth.api.js
import { ENDPOINTS } from './endpoints';

export const authApi = {
  /**
   * Login de usuario
   * @param {Object} credentials - { email, password }
   * @returns {Promise} - { token, usuario }
   */
  login: async (credentials) => {
    const response = await fetch(ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error en el login');
    }

    return await response.json();
  },

  /**
   * Verificar token
   * @param {string} token - JWT token
   * @returns {Promise} - { autenticado, usuario }
   */
  verificarToken: async (token) => {
    const response = await fetch(ENDPOINTS.AUTH.VERIFICAR, {
      headers: {
        'Authorization': token.startsWith('Bearer') ? token : `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Token inválido');
    }

    return await response.json();
  },

  /**
   * Obtener perfil del usuario
   * @param {string} token - JWT token
   * @returns {Promise} - { usuario }
   */
  obtenerPerfil: async (token) => {
    const response = await fetch(ENDPOINTS.AUTH.PERFIL, {
      headers: {
        'Authorization': token.startsWith('Bearer') ? token : `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener perfil');
    }

    return await response.json();
  },
};