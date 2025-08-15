import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

export default function ProtectedRoute({ children }) {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return null; // wait for auth to load
  if (!isSignedIn) return <Navigate to="/" replace />;

  return children;
}
