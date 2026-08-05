import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const lang = localStorage.getItem('lang') || 'fr';
  config.headers['Accept-Language'] = lang;
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

function clearSession() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const isAdminRoute =
      window.location.pathname.startsWith('/admin') &&
      window.location.pathname !== '/admin/login';

    if (status === 401) {
      // Expired or invalid Sanctum token.
      clearSession();
      if (isAdminRoute) {
        window.location.href = '/admin/login';
      }
    } else if (status === 403) {
      // Authenticated but not authorized (role check).
      if (isAdminRoute) {
        clearSession();
        window.location.href = '/admin/login';
      }
    } else if (status === 419) {
      // CSRF token mismatch — retry once by reloading the page state.
      clearSession();
      window.location.reload();
    }

    return Promise.reject(error);
  }
);

export default api;
