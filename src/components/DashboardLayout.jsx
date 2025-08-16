import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import Footer from "@/components/Footer";
import { SignedIn, SignedOut, RedirectToSignIn, UserButton } from "@clerk/clerk-react";
import logo from "@/assets/logo.png";

export default function DashboardLayout() {
  const [isDark, setIsDark] = React.useState(false);
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

  return (
    <SignedIn>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-green-700 dark:text-green-300 flex flex-col">
        <header className="bg-white dark:bg-gray-800 shadow px-4 sm:px-6 py-8 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={logo}
                alt="Metapeek Logo"
                className="w-10 h-10 rounded-full shadow-md"
              />
              <h1 className="text-2xl font-bold text-green-600 dark:text-green-400">
                METAPEEK
              </h1>
            </div>
            <nav className="hidden md:flex gap-4">
              {["Home", "About", "Docs"].map((label) => {
                const path = `/app/${label.toLowerCase() === "home" ? "" : label.toLowerCase()}`;
                const isActive = location.pathname === path;
                return (
                  <Link
                    key={label}
                    to={path}
                    className={`px-4 py-2 rounded-xl font-medium transition ${
                      isActive
                        ? "bg-green-300 dark:bg-green-800 text-green-900 dark:text-green-100"
                        : "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-green-200 dark:bg-green-700 hover:bg-green-300 dark:hover:bg-green-600 transition"
                aria-label="Toggle Dark Mode"
              >
                {isDark ? <Sun className="w-5 h-5 text-green-100" /> : <Moon className="w-5 h-5 text-green-900" />}
              </button>
              <UserButton />
            </div>
          </div>
        </header>

        <div className="ticker-bar bg-gradient-to-r from-green-600 via-blue-500 to-pink-500 text-white dark:from-green-800 dark:via-blue-700 dark:to-pink-700 h-4 overflow-hidden flex items-center sticky top-[72px] z-40">
          <div className="ticker-content whitespace-nowrap text-xs animate-[ticker-scroll_15s_linear_infinite] px-4">
            <span>Trusted</span>
			<span className="mx-6">•</span>
			<span>Secure Metadata Extraction</span>
			<span className="mx-6">•</span>
			<span>Powered by Iddy</span>
			<span className="mx-6">•</span>
			<span>Works Everywhere</span>
          </div>
        </div>

        <main className="flex-grow px-4 py-8 md:px-10 max-w-7xl mx-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </SignedIn>
  );
}
