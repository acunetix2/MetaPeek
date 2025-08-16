import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import logo from "@/assets/logo.png";

export default function Navbar() {
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinkClasses = (path) =>
    [
      "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
      isActive(path)
        ? "bg-green-600 text-white dark:bg-green-500 shadow-md"
        : "text-gray-700 hover:text-green-700 hover:bg-green-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-green-700",
    ].join(" ");

  return (
    <header className="sticky top-0 z-50">
      {/* First layer - Main Navbar */}
      <div className="bg-white dark:bg-gray-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo with circle image + text */}
            <Link to="/" className="flex items-center space-x-2">
              <img
                src={logo}
                alt="Metapeek Logo"
                className="w-8 h-8 rounded-full shadow-md"
              />
              <span className="text-2xl font-bold text-green-600 dark:text-green-400 tracking-wide">
                METAPEEK
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-2">
              <Link to="/" className={navLinkClasses("/")}>
                Home
              </Link>
              <Link to="/about" className={navLinkClasses("/about")}>
                About
              </Link>
              <Link to="/docs" className={navLinkClasses("/docs")}>
                Docs
              </Link>
            </nav>

            {/* Right side controls */}
            <div className="flex items-center space-x-3">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                title="Toggle Theme"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-800" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          {menuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className={navLinkClasses("/")}
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className={navLinkClasses("/about")}
              >
                About
              </Link>
              <Link
                to="/docs"
                onClick={() => setMenuOpen(false)}
                className={navLinkClasses("/docs")}
              >
                Docs
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Second Layer - Animated Gradient Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 animate-gradientMove"></div>

      {/* Scoped CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradientMove {
          background-size: 200% 200%;
          animation: gradientMove 6s ease infinite;
        }
      `}</style>
    </header>
  );
}
