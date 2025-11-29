// src/api/endpoints.js
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: `${API_URL}/auth/login`,
    REGISTER: `${API_URL}/auth/register`,
    PERFIL: `${API_URL}/auth/perfil`,
    VERIFICAR: `${API_URL}/auth/verificar`,
  },
};