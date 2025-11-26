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
    const formData = new FormData();
    formData.append('nombre', data.nombre);
    formData.append('slug', data.slug);
    formData.append('descripcion', data.descripcion || '');
    formData.append('activa', data.activa);
    formData.append('orden', data.orden || 0);
    
    if (data.colorPrimario) formData.append('colorPrimario', data.colorPrimario);
    if (data.colorSecundario) formData.append('colorSecundario', data.colorSecundario);
    if (data.logo) formData.append('logo', data.logo);

    return apiClientFormData('/marcas', formData);
  },

  // PUT /api/marcas/:id
  update: async (id, data) => {
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