import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, adminOnly, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if user is authenticated
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Check if user is admin

  if (adminOnly && !isAdmin) {
    // Redirect to home if admin access is required but user is not admin
    return <Navigate to="/" />;
  }

  if (!isAuthenticated) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" />;
  }

  // Render the protected route if authenticated
  return <Route {...rest} element={element} />;
};

export default ProtectedRoute;
