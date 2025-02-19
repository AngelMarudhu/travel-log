import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, authRequired, role }) => {
  // console.log(authRequired);
  const { token, user } = useSelector((state) => state.auth);
  // console.log(user);
  const location = useLocation();

  // console.log(location);

  if (!authRequired && token) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/home"} replace />;
  }

  if (authRequired && !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (authRequired && token && role && user.role !== role) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/home"} replace />;
  }

  //// If none of the conditions are met, render the children (the protected component)
  return children;
};

export default ProtectedRoute;
