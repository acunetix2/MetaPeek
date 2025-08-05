import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ClerkProvider, RedirectToSignIn } from "@clerk/clerk-react";

import HomePage from "@/pages/Home";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import ProfilePage from "@/pages/Profile";

import { Toaster } from "@/components/ui/sonner";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export default function App() {
  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      navigate={(to) => window.history.pushState(null, '', to)}
    >
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login/sso-callback" element={<RedirectToSignIn />} />
          </Routes>
        </div>
        <Toaster />
      </Router>
    </ClerkProvider>
  );
}
