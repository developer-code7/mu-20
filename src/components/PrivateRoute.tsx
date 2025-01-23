import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAppSelector((state) => state.auth);

  if (user) {
    return <>{children}</>;
  }

  // If the user is not authenticated, redirect to the login page
  return <Navigate to="/" replace />;
};

export default PrivateRoute;
