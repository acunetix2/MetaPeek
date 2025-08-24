import React, { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { Sun, Moon, Menu, X, Home, Info, BookOpen, Shield, FileText, Lock } from "lucide-react";
import Footer from "@/components/Footer";
import { SignedIn, SignedOut, RedirectToSignIn, UserButton } from "@clerk/clerk-react";
import logo from "@/assets/logo.png";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

export default function DashboardLayout() {
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
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

  const navLinks = ["Home", "About", "Docs", "Privacy", "Terms", "Security"];

  const navIcons = {
    Home: <Home className="w-6 h-6 mb-1 text-green-600 dark:text-green-400" />,
    About: <Info className="w-6 h-6 mb-1 text-green-600 dark:text-green-400" />,
    Docs: <BookOpen className="w-6 h-6 mb-1 text-green-600 dark:text-green-400" />,
    Privacy: <Shield className="w-6 h-6 mb-1 text-green-600 dark:text-green-400" />,
    Terms: <FileText className="w-6 h-6 mb-1 text-green-600 dark:text-green-400" />,
    Security: <Lock className="w-6 h-6 mb-1 text-green-600 dark:text-green-400" />,
  };

  return (
    <SignedIn>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-white-700 dark:text-green-300 flex flex-col">
        <div className="h-2 bg-gradient-to-r from-green-700 via-blue-500 to-pink-600 dark:from-green-900 dark:via-blue-700 dark:to-green-800" />

        <header className="bg-white dark:bg-gray-800 shadow px-4 sm:px-6 py-2 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo and title */}
            <div className="flex items-center gap-2 flex-wrap">
              <img
                src={logo}
                alt="MetaPeek Logo"
                className="w-8 h-8 sm:w-12 sm:h-12 md:w-20 md:h-20 rounded-full shadow-md transform transition-transform duration-300 ease-in-out hover:scale-110"
              />
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400 flex items-center">
                METAPEEK
                <sup>
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-gray-400 dark:border-gray-600 text-[8px] font-bold ml-1">
                    ™
                  </span>
                </sup>
              </h1>
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex text-gray-100 gap-6 items-center">
              {navLinks.map((label) => {
                const path = `/app/${label.toLowerCase() === "home" ? "" : label.toLowerCase()}`;
                const isActive = location.pathname === path;
                return (
                  <Link
                    key={label}
                    to={path}
                    className={`flex flex-col items-center text-sm sm:text-base transition ${
                      isActive
                        ? "text-green-800 dark:text-green-200"
                        : "text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
                    }`}
                  >
                    {navIcons[label]}
                    <span className="font-medium">{label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Theme + User + Mobile menu button */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-green-200 dark:bg-green-700 hover:bg-green-300 dark:hover:bg-green-600 transition"
                aria-label="Toggle Dark Mode"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-green-100" />
                ) : (
                  <Moon className="w-5 h-5 text-green-900" />
                )}
              </button>

              {/* Hide UserButton on mobile, will move inside mobile menu */}
              <div className="hidden md:block">
                <UserButton />
              </div>

              {/* Mobile menu toggle */}
              <button
                className="md:hidden p-2 rounded-full bg-green-200 dark:bg-green-700 hover:bg-green-300 dark:hover:bg-green-600 transition"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-green-900 dark:text-green-100" />
                ) : (
                  <Menu className="w-5 h-5 text-green-900 dark:text-green-100" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile nav */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-2 flex flex-col gap-2 bg-green-50 dark:bg-gray-800 rounded-xl p-2">
              {navLinks.map((label) => {
                const path = `/app/${label.toLowerCase() === "home" ? "" : label.toLowerCase()}`;
                const isActive = location.pathname === path;
                return (
                  <Link
                    key={label}
                    to={path}
                    className={`flex flex-col items-center text-base transition ${
                      isActive
                        ? "text-green-800 dark:text-green-200"
                        : "text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {navIcons[label]}
                    <span className="font-medium">{label}</span>
                  </Link>
                );
              })}

              {/* Add UserButton inside mobile menu */}
              <div className="flex justify-center mt-2">
                <UserButton />
              </div>
            </nav>
          )}
        </header>

        <div className="ticker-bar bg-gradient-to-r from-green-600 via-blue-500 to-pink-500 text-white dark:from-green-800 dark:via-blue-700 dark:to-pink-700 h-6 sm:h-5 overflow-hidden flex items-center sticky top-[72px] z-40">
          <div className="ticker-content whitespace-nowrap text-xs sm:text-sm animate-[ticker-scroll_15s_linear_infinite] px-4 flex gap-6">
            <span>Trusted</span>
            <span>•</span>
            <span>Secure Metadata Extraction</span>
            <span>•</span>
            <span>Powered by MetaPeek</span>
            <span>•</span>
            <span>See beyond just graphics</span>
          </div>
        </div>

        <main className="flex-grow px-4 py-6 md:px-8 lg:px-10 max-w-7xl mx-auto">
          <Outlet />
        </main>

        <Footer />
        <Analytics />
        <SpeedInsights />
      </div>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </SignedIn>
  );
}
