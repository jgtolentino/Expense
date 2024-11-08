import { create } from 'zustand';
import { AuthState, User, UserRole } from '../types/user';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: {
    role: UserRole.EMPLOYEE,
    // ... other properties
  },
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      // TODO: Implement actual API call
      const mockUser: User = {
        id: '1',
        email,
        name: 'John Doe',
        role: UserRole.EMPLOYEE,
      };
      set({ user: mockUser, isAuthenticated: true });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  updateUser: (userData) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...userData } : null,
    }));
  },
}));