// /src/api/caracteristicas.api.js

import { apiClient } from '../api/cliente';

export const caracteristicasApi = {
  // GET /api/caracteristicas
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiClient(`/caracteristicas${queryString ? `?${queryString}` : ''}`);
  },

  // GET /api/caracteristicas/:id
  getById: async (id) => {
    return apiClient(`/caracteristicas/${id}`);
  },

  // POST /api/caracteristicas
  create: async (data) => {
    return apiClient('/caracteristicas', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  // PUT /api/caracteristicas/:id
  update: async (id, data) => {
    return apiClient(`/caracteristicas/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  // DELETE /api/caracteristicas/:id
  delete: async (id) => {
    return apiClient(`/caracteristicas/${id}`, { 
      method: 'DELETE' 
    });
  }
};