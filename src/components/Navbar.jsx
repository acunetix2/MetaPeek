import React from "react";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function Navbar() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-green-600 dark:text-green-400">
          MetaPeek
        </Link>

        <nav className="space-x-2 hidden sm:block">
          <Link
            to="/"
            className="px-3 py-1 rounded-md bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-800 dark:text-white dark:hover:bg-green-700 text-sm font-medium transition"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="px-3 py-1 rounded-md bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-800 dark:text-white dark:hover:bg-green-700 text-sm font-medium transition"
          >
            About
          </Link>
          <Link
            to="/docs"
            className="px-3 py-1 rounded-md bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-800 dark:text-white dark:hover:bg-green-700 text-sm font-medium transition"
          >
            Docs
          </Link>
        </nav>

        <button
          onClick={toggleTheme}
          className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          title="Toggle Theme"
        >
          {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-800" />}
        </button>
      </div>
    </header>
  );
}
