import { useNavigate } from 'react-router-dom';
import { setUser, setLoading, setError } from '@/features/auth/authSlice';
import { authService, LoginCredentials } from '@/features/auth/services/auth.service';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isLoading, error } = useAppSelector((state) => state.auth);

  const login = async (credentials: LoginCredentials) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      const response = await authService.login(credentials);
      dispatch(setUser(response.user));
      navigate('/dashboard');
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const logout = () => {
    authService.logout();
    dispatch(setUser(null));
    navigate('/login');
  };

  return {
    user,
    isLoading,
    error,
    login,
    logout,
    isAuthenticated: authService.isAuthenticated(),
  };
};
