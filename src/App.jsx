import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import LandingPage from "@/pages/LandingPage";
import DashboardLayout from "@/components/DashboardLayout";
import HomePage from "@/pages/Home";
import About from "@/pages/About";
import Docs from "@/pages/Docs";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  const { isSignedIn, isLoaded } = useUser();

  // Private Route Wrapper
  const PrivateRoute = ({ children }) => {
    if (!isLoaded) return null; // wait for user state
    return isSignedIn ? children : <Navigate to="/" replace />;
  };

  return (
    <Router>
      <Routes>
        {/* Public landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Protected dashboard routes */}
        <Route
          path="/app"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="about" element={<About />} />
          <Route path="docs" element={<Docs />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </Router>
  );
}
