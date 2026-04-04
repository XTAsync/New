import { create } from 'zustand';
import api from '../services/api.js';

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isDemoMode: false,
  isLoading: true,

  login: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    const isDemoMode =
      data.user.id.startsWith('demo-') || data.user.id.startsWith('admin-');
    sessionStorage.setItem('gc_tokens', JSON.stringify(data.tokens));
    set({ user: data.user, isAuthenticated: true, isDemoMode });
    return data;
  },

  register: async (fullName, email, phone, password) => {
    const { data } = await api.post('/auth/register', {
      fullName,
      email,
      phone,
      password,
    });
    sessionStorage.setItem('gc_tokens', JSON.stringify(data.tokens));
    set({ user: data.user, isAuthenticated: true, isDemoMode: false });
    return data;
  },

  logout: () => {
    sessionStorage.removeItem('gc_tokens');
    set({ user: null, isAuthenticated: false, isDemoMode: false });
  },

  loadMe: async () => {
    try {
      const tokens = JSON.parse(
        sessionStorage.getItem('gc_tokens') || 'null'
      );
      if (!tokens?.access) {
        set({ isLoading: false });
        return;
      }
      const { data } = await api.get('/auth/me');
      const isDemoMode =
        data.user.id.startsWith('demo-') || data.user.id.startsWith('admin-');
      set({ user: data.user, isAuthenticated: true, isDemoMode, isLoading: false });
    } catch {
      sessionStorage.removeItem('gc_tokens');
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore;
