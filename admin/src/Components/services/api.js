// FILE: admin/src/Components/services/api.js
import axios from 'axios';

export const USE_MOCK = true;
export const BASE_URL = USE_MOCK ? '/data' : (import.meta.env.VITE_API_BASE_URL || '/api');

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('bix_admin_token');
  if (token && !USE_MOCK) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('[API ERROR]', err?.response?.status, err?.message);
    return Promise.reject(err);
  }
);

export default api;