import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t dark:border-gray-700 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6 text-base">
        <p className="text-center md:text-left font-medium">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-green-600 dark:text-green-400">
            MetaPeek
          </span>{" "}
          · All rights reserved.
        </p>

        <nav className="flex flex-wrap gap-8 text-base font-medium">
          <Link
            to="/"
            className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
          >
            About
          </Link>
          <Link
            to="/docs"
            className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
          >
            Docs
          </Link>
        </nav>
      </div>
    </footer>
  );
}
