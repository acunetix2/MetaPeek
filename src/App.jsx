import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import LandingPage from "@/pages/LandingPage";
import DashboardLayout from "@/components/DashboardLayout";
import HomePage from "@/pages/Home";
import About from "@/pages/About";
import Docs from "@/pages/Docs";
import PrivacyPage from "@/pages/Policy";
import TermsPage from "@/pages/Terms";
import SecurityPage from "@/pages/Security";
import LoadingScreen from "@/pages/LoadingScreen";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  const { isSignedIn } = useUser();
  const [showLoading, setShowLoading] = React.useState(true);

  // Always show loading for 2 seconds on first load
  React.useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Private Route Wrapper
  const PrivateRoute = ({ children }) => {
    if (showLoading) return <LoadingScreen />;
    return isSignedIn ? children : <Navigate to="/" replace />;
  };

  return (
    <Router>
      <Routes>
        {/* Public landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Public pages */}
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/security" element={<SecurityPage />} />

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

          {/* Private versions of the info pages */}
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="security" element={<SecurityPage />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </Router>
  );
}
