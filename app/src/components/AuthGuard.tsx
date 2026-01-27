import { useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user, loading, hasChecked, checkAuth } = useAuthStore();

  useEffect(() => {
    // Only check auth if we haven't checked yet
    if (!hasChecked) {
      checkAuth();
    }
  }, [hasChecked, checkAuth]);

  // Show loading spinner while checking authentication
  if (loading || !hasChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // If we've checked and there's no user, the checkAuth function
  // will handle the redirect to /api/auth/login
  // This state should be brief as the redirect happens immediately
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // User is authenticated, render protected content
  return <>{children}</>;
};
