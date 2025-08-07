import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import DashboardLayout from "@/components/DashboardLayout";
import HomePage from "@/pages/Home";
import About from "@/pages/About";
import Docs from "@/pages/Docs";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<About />} />
          <Route path="docs" element={<Docs />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}
