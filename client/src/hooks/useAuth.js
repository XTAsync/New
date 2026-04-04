import useAuthStore from '../store/useAuthStore.js';

export function useAuth() {
  const {
    user,
    isAuthenticated,
    isDemoMode,
    isLoading,
    login,
    register,
    logout,
    loadMe,
  } = useAuthStore();

  const hasRole = (...roles) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  const isAdmin = hasRole('admin', 'compliance', 'auditor');
  const isInvestor = hasRole('investor');

  return {
    user,
    isAuthenticated,
    isDemoMode,
    isLoading,
    login,
    register,
    logout,
    loadMe,
    hasRole,
    isAdmin,
    isInvestor,
  };
}

export default useAuth;
