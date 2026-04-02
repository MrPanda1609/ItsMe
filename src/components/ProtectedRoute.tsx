import type { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../state';
import type { Role } from '../types';

interface ProtectedRouteProps {
  children: ReactElement;
  requireRole?: Role;
}

export function ProtectedRoute({ children, requireRole }: ProtectedRouteProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (requireRole && user.role !== requireRole) {
    return <Navigate to="/builder" replace />;
  }

  return children;
}
