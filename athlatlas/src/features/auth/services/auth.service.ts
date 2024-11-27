import api from '@/services/api';
import { ENDPOINTS } from '@/services/endpoints';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

// Fonction utilitaire en dehors de l'objet
const handleError = (error: any): Error => {
  if (error.response) {
    const message = error.response.data.message || 'An error occurred';
    return new Error(message);
  }
  return new Error('Network error');
};

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const { data } = await api.post<AuthResponse>(ENDPOINTS.AUTH.LOGIN, credentials);
      localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      throw handleError(error);
    }
  },

  logout(): void {
    localStorage.removeItem('token');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}; 