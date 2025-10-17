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
import VideoAnalysisPage from "@/pages/VideoAnalysisPage";
import DocumentAnalysis from "@/pages/DocumentAnalysis";

export default function App() {
  const { isSignedIn } = useUser();
  const [isLoading, setIsLoading] = React.useState(true);

  const handleLoadingFinish = () => {
    setIsLoading(false);
  };

  const PrivateRoute = ({ children }) => {
    if (isLoading) return <LoadingScreen onFinish={handleLoadingFinish} />;
    return isSignedIn ? children : <Navigate to="/" replace />;
  };

  return (
    <Router>
      {isLoading ? (
        <LoadingScreen onFinish={handleLoadingFinish} />
      ) : (
        <>
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
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="security" element={<SecurityPage />} />
			  <Route path="video" element={<VideoAnalysisPage />} />
			  <Route path="document" element={<DocumentAnalysis />} />
            </Route>

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster />
        </>
      )}
    </Router>
  );
}
