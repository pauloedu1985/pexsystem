import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
  } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (email: string, password: string) => {
    // In a real app, this would make an API call
    if (email && password) {
      set({
        isAuthenticated: true,
        user: {
          name: 'Admin User',
          email,
        },
      });
    }
  },
  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
    });
  },
}));