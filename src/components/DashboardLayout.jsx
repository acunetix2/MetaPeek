import React from "react";
import { Sun, Moon } from "lucide-react";
import Footer from "@/components/Footer";

export default function DashboardLayout({ children }) {
  const [isDark, setIsDark] = React.useState(false);

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

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Navbar */}
      <header className="bg-white dark:bg-gray-800 shadow px-4 sm:px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand */}
          <h1 className="text-2xl font-bold text-orange-600 dark:text-orange-400">MetaPeek</h1>

          {/* Nav Buttons */}
          <nav className="hidden md:flex gap-4">
            <a
              href="/"
              className="px-4 py-2 rounded-xl bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-800 transition font-medium"
            >
              Home
            </a>
            <a
              href="/about"
              className="px-4 py-2 rounded-xl bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-800 transition font-medium"
            >
              About
            </a>
            <a
              href="/docs"
              className="px-4 py-2 rounded-xl bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-800 transition font-medium"
            >
              Docs
            </a>
          </nav>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-800" />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-8 md:px-10 max-w-7xl mx-auto">
        {children}
      </main>
	  <Footer />
    </div>
  );
}
