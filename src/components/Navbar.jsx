import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import logo from "@/assets/logo.png";

export default function Sidebar() {
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path) => location.pathname === path;
  const navLinkClasses = (path) =>
    [
      "flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 w-full",
      isActive(path)
        ? "bg-green-600 text-white shadow-md"
        : "text-gray-700 hover:text-green-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-green-700",
    ].join(" ");

  return (
    <>
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-64 h-screen bg-white dark:bg-gray-900 shadow-lg fixed top-0 left-0 z-50">
        <div className="flex items-center justify-center h-20 border-b border-gray-200 dark:border-gray-700">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Neuroscan Logo" className="w-10 h-10 rounded-full shadow-md" />
            <span className="text-xl font-bold text-green-600 dark:text-green-400 tracking-wide">
              NeuroScan
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 flex flex-col space-y-2">
          <Link to="/" className={navLinkClasses("/")}>Home</Link>
          <Link to="/about" className={navLinkClasses("/about")}>About</Link>
          <Link to="/docs" className={navLinkClasses("/docs")}>Docs</Link>
        </nav>

        <div className="px-4 py-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-800" />}
            <span className="ml-2 text-sm font-medium">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>
      </aside>

      {/* Hamburger menu for mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg z-40 transform transition-transform duration-300 md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-20 px-4 border-b border-gray-200 dark:border-gray-700">
          <Link to="/" className="flex items-center space-x-2" onClick={() => setSidebarOpen(false)}>
            <img src={logo} alt="Metapeek Logo" className="w-10 h-10 rounded-full shadow-md" />
            <span className="text-xl font-bold text-green-600 dark:text-green-400 tracking-wide">
              METAPEEK
            </span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="px-4 py-6 flex flex-col space-y-2">
          <Link to="/" className={navLinkClasses("/")} onClick={() => setSidebarOpen(false)}>Home</Link>
          <Link to="/about" className={navLinkClasses("/about")} onClick={() => setSidebarOpen(false)}>About</Link>
          <Link to="/docs" className={navLinkClasses("/docs")} onClick={() => setSidebarOpen(false)}>Docs</Link>

          <button
            onClick={toggleTheme}
            className="mt-4 flex items-center justify-center w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-800" />}
            <span className="ml-2 text-sm font-medium">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"></div>}
    </>
  );
}
