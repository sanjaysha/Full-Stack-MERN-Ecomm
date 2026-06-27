import React from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ element, adminOnly = false }) {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading) return <Loader />;
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return element;
}

export default ProtectedRoute;
