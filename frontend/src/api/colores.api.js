// /src/api/colores.api.js

import { apiClient } from './cliente';

export const coloresApi = {
  // GET /api/colores - Obtener todos los colores globales
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiClient(`/colores${queryString ? `?${queryString}` : ''}`);
  },

  // GET /api/colores/:id
  getById: async (id) => {
    return apiClient(`/colores/${id}`);
  },

  // POST /api/colores - Crear color (admin)
  create: async (data) => {
    return apiClient('/colores', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  // PUT /api/colores/:id - Actualizar color (admin)
  update: async (id, data) => {
    return apiClient(`/colores/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  // DELETE /api/colores/:id - Eliminar color (admin)
  delete: async (id) => {
    return apiClient(`/colores/${id}`, { method: 'DELETE' });
  },

  // ==========================================
  // Colores por Vehículo
  // ==========================================

  // GET /api/vehiculos/:vehiculoId/colores
  getByVehiculo: async (vehiculoId) => {
    return apiClient(`/vehiculos/${vehiculoId}/colores`);
  },

  // POST /api/vehiculos/:vehiculoId/colores - Asignar colores
  assignToVehiculo: async (vehiculoId, colorIds) => {
    return apiClient(`/vehiculos/${vehiculoId}/colores`, {
      method: 'POST',
      body: JSON.stringify({ colorIds })
    });
  },

  // DELETE /api/vehiculos/:vehiculoId/colores/:colorId - Quitar color
  removeFromVehiculo: async (vehiculoId, colorId) => {
    return apiClient(`/vehiculos/${vehiculoId}/colores/${colorId}`, {
      method: 'DELETE'
    });
  }
};