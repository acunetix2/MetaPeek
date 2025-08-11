import React from "react";
import { InfoIcon } from "lucide-react";

export default function About() {
  const developer = {
    name: "Iddy K. Chesire",
    role: "CyberSecurity Analyst & MERN Stack Developer",
    bio: "Iddy is passionate about building secure, user-friendly tools that empower users through privacy-respecting technologies. He led the development of MetaPeek, ensuring seamless metadata extraction, intuitive UI, and airtight security from browser to storage.",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=Iddy%20Chesire",
  };

  return (
    <div className="relative min-h-screen px-6 py-20 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-tr from-green-100 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Blurred decorative blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-green-300 dark:bg-green-900 opacity-20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-orange-200 dark:bg-orange-800 opacity-20 rounded-full blur-3xl animate-pulse" />

      {/* About MetaPeek */}
      <div className="max-w-3xl w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl backdrop-blur-sm p-8 mb-12 z-10">
        <div className="flex items-center gap-3 mb-6">
          <InfoIcon className="w-6 h-6 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">About MetaPeek</h1>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          <strong className="text-green-700 dark:text-green-400">MetaPeek</strong> is a powerful
          tool designed to help you easily analyze metadata embedded in your image files. Whether
          you're a photographer, investigator, or just curious, MetaPeek reveals valuable image
          details at a glance.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Upload an image, and MetaPeek will extract and display EXIF metadata — camera settings,
          GPS location (if available), and more. All processing is done locally in your browser to
          ensure your data remains private.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          MetaPeek is built with modern technologies like React, Tailwind CSS, and Leaflet.js. It’s
          fast, intuitive, and mobile-friendly — perfect for anyone who wants instant access to
          hidden image data.
        </p>
      </div>

      {/* Developer Profile */}
      <div className="max-w-xl w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl backdrop-blur-sm p-8 text-center z-10">
        <img
          src={developer.image}
          alt={developer.name}
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-orange-400 dark:border-green-500"
        />
        <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">{developer.name}</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">{developer.role}</p>
        <p className="text-gray-600 dark:text-gray-400">{developer.bio}</p>
      </div>
    </div>
  );
}
