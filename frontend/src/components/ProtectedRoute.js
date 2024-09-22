import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const ProtectedRoute = ({ component: Component, role }) => {
  const { auth } = useContext(AuthContext);

  if (!auth.isLoggedIn) {
    return <Navigate to="/signin" />;
  }

  if (role === "admin" && !auth.isAdmin) {
    return <Navigate to="/signin" />;
  }

  if (role === "user" && auth.isAdmin) {
    return <Navigate to="/signin" />;
  }

  return <Component />;
};

export default ProtectedRoute;
