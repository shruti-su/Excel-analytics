import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust path if you renamed index.jsx
// import {} from '@/pages'

const ProtectedRoute = ({ redirectPath = '/auth/sign-in' }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect them to the sign-in page if not authenticated
    // You can also pass state here to redirect back after login:
    // return <Navigate to={redirectPath} state={{ from: location }} replace />;
    return <Navigate to={redirectPath} replace />;
  }

  // If authenticated, render the child routes/components
  return <Outlet />;
};

export default ProtectedRoute;