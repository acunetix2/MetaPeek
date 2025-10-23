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
  const [desktopOpen, setDesktopOpen] = useState(true); // desktop collapse toggle
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
    { id: "/app/video", label: "Video Analysis", icon: <Video size={18} /> },
    { id: "/app/document", label: "Document Analysis", icon: <BookOpen size={18} /> },
    { id: "/app/about", label: "NeuroScan", icon: <Info size={18} /> },
    { id: "/app/docs", label: "Documentation", icon: <BookOpen size={18} /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <SignedIn>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-green-300">
        {/*  Desktop Sidebar */}
        <motion.aside
          animate={{ width: desktopOpen ? 256 : 72 }}
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
          className={`hidden md:flex fixed top-0 left-0 h-screen 
            bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
            shadow-lg flex-col justify-between pt-6 z-40 overflow-hidden`}
        >
          {/* Branding */}
          <div className="flex flex-col items-center px-4 mb-6">
		  { /*<img
              src={logo}
              alt="NeuroScan Logo"
              className="w-12 h-12 rounded-full shadow-md mb-2"
		  /> */}
            {desktopOpen && (
              <>
                <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-green-300 to-green-700 tracking-tight select-none [font-family:'Phosire',sans-serif] animate-bounceGlow">
                  NeuroScan
                </h1>
                <p className="text-xs text-green-600 dark:text-blue-500">
                  Trusted • Secure • Metadata
                </p>
              </>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-2">
            {navItems.map((item) => (
              <Link key={item.id} to={item.id}>
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  className="relative group"
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
                    {desktopOpen && <span>{item.label}</span>}
                  </Button>

                  {/* Tooltip on collapse */}
                  {!desktopOpen && (
                    <span
                      className="absolute left-14 top-1/2 -translate-y-1/2 text-sm 
                      px-2 py-1 rounded-md bg-gray-800 text-white opacity-0 group-hover:opacity-100 
                      transition whitespace-nowrap z-50"
                    >
                      {item.label}
                    </span>
                  )}
                </motion.div>
              </Link>
            ))}
          </nav>

          {/* Footer Section */}
          <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700 flex flex-col gap-2">
            <div className="flex items-center justify-center">
              <UserButton />
            </div>

            {/* Toggle theme */}
            <button
              onClick={toggleTheme}
              className={`flex items-center justify-center gap-2 py-2 rounded-lg 
                ${desktopOpen ? "bg-green-200 dark:bg-green-700 hover:bg-green-300 dark:hover:bg-green-600 px-3" : ""}
                transition`}
            >
              {isDark ? (
                <FiSun className="text-yellow-400" size={18} />
              ) : (
                <FiMoon className="text-blue-300" size={18} />
              )}
              {desktopOpen && (
                <span className="text-sm">{isDark ? "Light Mode" : "Dark Mode"}</span>
              )}
            </button>
          </div>

          {/* Collapse/Expand Toggle */}
          <button
            onClick={() => setDesktopOpen(!desktopOpen)}
            className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-green-500 transition md:block hidden"
            title={desktopOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {desktopOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
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
                  alt="NeuroScan Logo"
                  className="w-14 h-14 rounded-full shadow-md mb-2"
                />
                <h1 className="text-xl font-bold text-green-600 dark:text-green-400 tracking-tight">
                  NeuroScan
                </h1>
              </div>

              <nav className="flex-1 px-3 py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.id}
                    onClick={() => setMobileOpen(false)}
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
                  </Link>
                ))}
                <UserButton className="mt-4" />
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ${
            desktopOpen ? "md:ml-64" : "md:ml-[72px]"
          } min-h-screen`}
        >
          {/* Mobile Navbar */}
          <header className="md:hidden flex items-center justify-between bg-white dark:bg-gray-800 shadow px-4 py-3 fixed top-0 left-0 right-0 z-50">
            <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </Button>
            <h1 className="text-white font-semibold text-lg tracking-wide">NeuroScan</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-300 hover:text-white transition"
              title="Toggle Theme"
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </Button>
          </header>

          {/* Main Content Area */}
          <main className="flex-grow px-4 py-6 md:px-8 lg:px-10 max-w-7xl mx-auto mt-16 md:mt-0">
            <Outlet />
          </main>

          {/* Footer */}
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
