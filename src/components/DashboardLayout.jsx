import React, { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import Footer from "@/components/Footer";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  UserButton,
} from "@clerk/clerk-react";
import logo from "@/assets/logo.png";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import {
  Home,
  Info,
  BookOpen,
  Shield,
  FileText,
  Lock,
  Video,
  Image,
} from "lucide-react";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout() {
  const [isDark, setIsDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = stored === "dark" || (!stored && prefersDark);
    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const navItems = [
    { id: "/app", label: "Image Analysis", icon: <Image size={18} /> },
	{ id: "/app/video", label: "Video Analysis", icon: <Video size={18} />  },
	{ id: "/app/document", label: "Document Analysis", icon: <BookOpen size={18} /> },
    { id: "/app/about", label: "About", icon: <Info size={18} /> },
    { id: "/app/docs", label: "Documentation", icon: <BookOpen size={18} /> },
    { id: "/app/privacy", label: "Privacy", icon: <Shield size={18} /> },
    { id: "/app/terms", label: "Terms", icon: <FileText size={18} /> },
    { id: "/app/security", label: "Security", icon: <Lock size={18} /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <SignedIn>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-green-300">
        {/* Desktop Sidebar */}
        <motion.aside
          className="hidden md:flex fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg flex-col justify-between pt-6 z-40"
        >
          {/* Branding */}
          <div className="flex flex-col items-center px-6 mb-6">
            <img
              src={logo}
              alt="MetaPeek Logo"
              className="w-14 h-14 rounded-full shadow-md mb-2"
            />
            <h1 className="text-xl font-bold text-green-600 dark:text-green-400 tracking-tight">
              MetaPeek
            </h1>
            <p className="text-xs text-green-600 dark:text-blue-500">
              Trusted • Secure • Metadata
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-2">
            {navItems.map((item) => (
              <Link key={item.id} to={item.id}>
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                >
                  <Button
                    variant="ghost"
                    className={`w-full justify-start flex items-center gap-3 rounded-lg px-3 py-2 transition
                      ${
                        isActive(item.id)
                          ? "bg-green-600 text-white shadow-md"
                          : "text-blue-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-blue-700 hover:text-green-800 dark:hover:text-green-200"
                      }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Button>
                </motion.div>
              </Link>
            ))}
          </nav>

          {/* Footer Section */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex flex-col gap-2">
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center gap-2 py-2 rounded-lg bg-green-200 dark:bg-green-700 hover:bg-green-300 dark:hover:bg-green-600 transition"
            >
              {isDark ? (
                <FiSun className="text-yellow-400" size={18} />
              ) : (
                <FiMoon className="text-blue-300" size={18} />
              )}
              <span className="text-sm">
                {isDark ? "Light Mode" : "Dark Mode"}
              </span>
            </button>
            <UserButton />
          </div>
        </motion.aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: "spring", stiffness: 90, damping: 18 }}
              className="fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg flex flex-col justify-between pt-20 z-50 md:hidden"
            >
              <div className="flex flex-col items-center px-6 mb-6">
                <img
                  src={logo}
                  alt="MetaPeek Logo"
                  className="w-14 h-14 rounded-full shadow-md mb-2"
                />
                <h1 className="text-xl font-bold text-green-600 dark:text-green-400 tracking-tight">
                  MetaPeek
                </h1>
              </div>

              <nav className="flex-1 px-3 py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.id}
                    onClick={() => setMobileOpen(false)}
                  >
                    <motion.div
                      whileHover={{ x: 6 }}
                      transition={{ type: "spring", stiffness: 200, damping: 12 }}
                    >
                      <Button
                        variant="ghost"
                        className={`w-full justify-start flex items-center gap-3 rounded-lg px-3 py-2 transition
                          ${
                            isActive(item.id)
                              ? "bg-green-600 text-white shadow-md"
                              : "text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-700 hover:text-green-800 dark:hover:text-green-200"
                          }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Button>
                    </motion.div>
                  </Link>
                ))}
                <UserButton className="mt-4" />
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 flex flex-col md:ml-64 min-h-screen">
          {/* Mobile top navbar */}
          <header className="md:hidden flex items-center justify-between bg-white dark:bg-gray-800 shadow px-4 py-3 fixed top-0 left-0 right-0 z-50">
            <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </Button>
            <h1 className="text-white font-semibold text-lg tracking-wide">MetaPeek</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-300 hover:text-white transition"
              title="Toggle Theme"
            >
              {isDark ? (
                <FiSun className="text-yellow-400" size={20} />
              ) : (
                <FiMoon className="text-blue-300" size={20} />
              )}
            </Button>
          </header>

          {/* Main Content Area */}
          <main className="flex-grow px-4 py-6 md:px-8 lg:px-10 max-w-7xl mx-auto mt-16 md:mt-0">
            <Outlet />
          </main>

          {/* Sticky Footer */}
          <footer className="mt-auto">
            <Footer />
          </footer>

          <Analytics />
          <SpeedInsights />
        </div>
      </div>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </SignedIn>
  );
}
