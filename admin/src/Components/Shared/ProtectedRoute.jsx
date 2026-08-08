// FILE: admin/src/Components/Shared/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingScreen from './LoadingScreen';

export default function ProtectedRoute({ children, redirectTo = '/admin' }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <LoadingScreen />;
  if (!isAuthenticated) return <Navigate to={redirectTo} state={{ from: location }} replace />;
  return children;
}