// /src/api/vehiculos.api.js 

import { apiClient, apiClientFormData } from '../api/cliente';

export const vehiculosApi = {
  // GET /api/vehiculos (con filtros)
  /*getAll: async (filters = {}) => {
    const queryString = new URLSearchParams(filters).toString();
    return apiClient(`/vehiculos${queryString ? `?${queryString}` : ''}`);
  },*/
  getAll: async (filters = {}) => {
    // Filtrar parámetros vacíos
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
    );
    
    const queryString = new URLSearchParams(cleanFilters).toString();
    return apiClient(`/vehiculos${queryString ? `?${queryString}` : ''}`);
  },

  // GET /api/vehiculos/:id
  getById: async (id) => {
    return apiClient(`/vehiculos/${id}`);
  },

  // GET /api/vehiculos/slug/:slug
  getBySlug: async (slug) => {
    return apiClient(`/vehiculos/slug/${slug}`);
  },

  // POST /api/vehiculos
  create: async (data) => {
    return apiClient('/vehiculos', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  // PUT /api/vehiculos/:id
  update: async (id, data) => {
    return apiClient(`/vehiculos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  // DELETE /api/vehiculos/:id
  delete: async (id) => {
    return apiClient(`/vehiculos/${id}`, { method: 'DELETE' });
  },

  // POST /api/vehiculos/:id/imagenes
  addImages: async (vehiculoId, images, options = {}) => {
    const formData = new FormData();
    
    images.forEach(image => {
      formData.append('imagenes', image);
    });
    
    if (options.esPrincipal !== undefined) {
      formData.append('esPrincipal', options.esPrincipal);
    }
    if (options.orden !== undefined) {
      formData.append('orden', options.orden);
    }

    return apiClientFormData(`/vehiculos/${vehiculoId}/imagenes`, formData);
  },

  // DELETE /api/vehiculos/imagenes/:imagenId
  deleteImage: async (imagenId) => {
    return apiClient(`/vehiculos/imagenes/${imagenId}`, { method: 'DELETE' });
  },

  // POST /api/vehiculos/:id/videos
  addVideo: async (vehiculoId, video, metadata = {}) => {
    const formData = new FormData();
    formData.append('video', video);
    
    if (metadata.titulo) formData.append('titulo', metadata.titulo);
    if (metadata.descripcion) formData.append('descripcion', metadata.descripcion);
    if (metadata.esPrincipal !== undefined) {
      formData.append('esPrincipal', metadata.esPrincipal);
    }
    if (metadata.orden !== undefined) {
      formData.append('orden', metadata.orden);
    }

    return apiClientFormData(`/vehiculos/${vehiculoId}/videos`, formData);
  },

  // DELETE /api/vehiculos/videos/:videoId
  deleteVideo: async (videoId) => {
    return apiClient(`/vehiculos/videos/${videoId}`, { method: 'DELETE' });
  },

  // POST /api/vehiculos/:id/caracteristicas
  assignCaracteristicas: async (vehiculoId, caracteristicasIds) => {
    return apiClient(`/vehiculos/${vehiculoId}/caracteristicas`, {
      method: 'POST',
      body: JSON.stringify({ caracteristicasIds })
    });
  },

  updatePartial: async (id, data) => {
  return apiClient(`/vehiculos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  });
}
};