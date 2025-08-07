import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-green-400 border-t border-gray-800 mt-20">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col items-center gap-4 text-sm sm:text-base">
        
        {/* Nav Links */}
        <nav className="flex flex-wrap justify-center gap-8 font-medium">
          <Link
            to="/"
            className="hover:text-green-300 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-green-300 transition-colors"
          >
            About
          </Link>
          <Link
            to="/docs"
            className="hover:text-green-300 transition-colors"
          >
            Docs
          </Link>
        </nav>

        {/* Copyright */}
        <p className="text-center font-medium">
          &copy; {new Date().getFullYear()} <span className="font-semibold">MetaPeek</span> | All rights reserved.
        </p>
      </div>
    </footer>
  );
}
