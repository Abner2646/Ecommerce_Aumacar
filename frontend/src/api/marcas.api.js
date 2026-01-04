// /src/api/marcas.api.js 

import { apiClient, apiClientFormData } from './cliente';

export const marcasApi = {
  // GET /api/marcas
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiClient(`/marcas${queryString ? `?${queryString}` : ''}`);
  },

  // GET /api/marcas/:id
  getById: async (id) => {
    return apiClient(`/marcas/${id}`);
  },

  // GET /api/marcas/slug/:slug
  getBySlug: async (slug) => {
    return apiClient(`/marcas/slug/${slug}`);
  },

  // POST /api/marcas (con logo)
  create: async (data) => {
    // Si ya es FormData, lo enviamos tal cual
    if (data instanceof FormData) {
      return apiClientFormData('/marcas', data);
    }
    // Si es objeto plano, lo convertimos
    const formData = new FormData();
    if (data.nombre) formData.append('nombre', data.nombre);
    if (data.slug) formData.append('slug', data.slug);
    formData.append('descripcion', data.descripcion || '');
    formData.append('activa', data.activa);
    formData.append('orden', data.orden || 0);
    if (data.colorPrimario) formData.append('colorPrimario', data.colorPrimario);
    if (data.colorSecundario) formData.append('colorSecundario', data.colorSecundario);
    if (data.logo) formData.append('logo', data.logo);
    if (data.fotoPresentacion) formData.append('fotoPresentacion', data.fotoPresentacion);
    if (data.videoPresentacion) formData.append('videoPresentacion', data.videoPresentacion);
    if (data.videoPortada) formData.append('videoPortada', data.videoPortada);
    if (data.plantilla) formData.append('plantilla', data.plantilla);
    return apiClientFormData('/marcas', formData);
  },

  // PUT /api/marcas/:id
  update: async (id, data) => {
    // Si ya es FormData, lo enviamos directamente
    if (data instanceof FormData) {
      return apiClientFormData(`/marcas/${id}`, data, { method: 'PUT' });
    }
    
    // Si no es FormData, lo convertimos (aunque no debería pasar)
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });

    return apiClientFormData(`/marcas/${id}`, formData, { method: 'PUT' });
  },

  // DELETE /api/marcas/:id
  delete: async (id) => {
    return apiClient(`/marcas/${id}`, { method: 'DELETE' });
  }
};