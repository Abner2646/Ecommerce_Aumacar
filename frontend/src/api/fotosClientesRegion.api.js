// src/api/fotosClientesRegion.api.js

import { apiClient, apiClientFormData } from './cliente';

export const fotosClientesRegionApi = {
  // Obtener todas las fotos (admin)
  getAll: async () => {
    return apiClient('/fotos-clientes-region');
  },

  // Obtener foto por ID
  getById: async (id) => {
    return apiClient(`/fotos-clientes-region/${id}`);
  },

  // Obtener fotos por ciudad
  getByCiudad: async (ciudad) => {
    return apiClient(`/fotos-clientes-region/ciudad/${ciudad}`);
  },

  // Obtener fotos por coordenadas (público)
  getByCoordenadas: async (latitud, longitud, radio = 100) => {
    return apiClient(`/fotos-clientes-region/coordenadas?latitud=${latitud}&longitud=${longitud}&radio=${radio}`);
  },

  // Obtener ciudades disponibles (público)
  getCiudadesDisponibles: async () => {
    return apiClient('/fotos-clientes-region/ciudades');
  },

  // Crear nueva foto
  create: async (formData) => {
    return apiClientFormData('/fotos-clientes-region', formData);
  },

  // Actualizar foto
  update: async (id, formData) => {
    return apiClientFormData(`/fotos-clientes-region/${id}`, formData, {
      method: 'PUT'
    });
  },

  // Eliminar foto
  delete: async (id) => {
    return apiClient(`/fotos-clientes-region/${id}`, {
      method: 'DELETE'
    });
  },

  // Reordenar fotos de una ciudad
  reordenar: async (ciudad, ordenes) => {
    return apiClient(`/fotos-clientes-region/ciudad/${ciudad}/reordenar`, {
      method: 'PUT',
      body: JSON.stringify({ ordenes })
    });
  }
};