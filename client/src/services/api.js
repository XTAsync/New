import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const tokens = JSON.parse(sessionStorage.getItem('gc_tokens') || 'null');
  if (tokens?.access) {
    config.headers.Authorization = `Bearer ${tokens.access}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (
      error.response?.status === 401 &&
      error.response?.data?.code === 'TOKEN_EXPIRED' &&
      !original._retry
    ) {
      original._retry = true;
      try {
        const tokens = JSON.parse(sessionStorage.getItem('gc_tokens'));
        const { data } = await axios.post('/api/auth/refresh', {
          refreshToken: tokens.refresh,
        });
        tokens.access = data.accessToken;
        sessionStorage.setItem('gc_tokens', JSON.stringify(tokens));
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(original);
      } catch {
        sessionStorage.removeItem('gc_tokens');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
