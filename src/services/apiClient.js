import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const persistRoot = localStorage.getItem('persist:root');
    if (persistRoot) {
      try {
        const rootState = JSON.parse(persistRoot);
        if (rootState.auth) {
          const authState = JSON.parse(rootState.auth);
          if (authState.token) {
            config.headers.Authorization = `Bearer ${authState.token}`;
          }
        }
      } catch (e) {
        console.error('Error parsing persist root token in apiClient', e);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        console.warn('Authentication token expired or invalid (401 Unauthorized)');
      } else if (status === 403) {
        console.error('Access forbidden (403 Forbidden)');
      } else if (status >= 500) {
        console.error(`Server Error (${status}):`, error.response.data);
      }
    } else if (error.request) {
      console.error('Network Error - No response received from server:', error.request);
    } else {
      console.error('Request Setup Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
