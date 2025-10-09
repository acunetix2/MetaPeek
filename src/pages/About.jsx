import React from "react";
import { InfoIcon } from "lucide-react";

export default function About() {
  const owner = {
    name: "Iddy Chesire",
    role: "Cybersecurity Enthusiast & Developer",
    bio: "Focused on building privacy-respecting open-source intelligence tools.",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=Iddy%20Chesire",
  };

  return (
    <div className="relative min-h-screen px-6 py-20 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-tr from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background glow effects */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-green-300 dark:bg-green-900 opacity-20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-orange-200 dark:bg-orange-800 opacity-20 rounded-full blur-3xl animate-pulse" />

      {/* About MetaPeek Section */}
      <div className="max-w-3xl w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl backdrop-blur-sm p-8 mb-12 z-10">
        <div className="flex items-center gap-3 mb-6">
          <InfoIcon className="w-6 h-6 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            About MetaPeek
          </h1>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          <strong className="text-green-700 dark:text-green-400">MetaPeek</strong> 
          is a browser-based metadata analysis tool that allows users to extract and interpret hidden data within image files — such as camera details, timestamps, and GPS coordinates — without uploading files to external servers.
        </p>

        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Designed with privacy and transparency in mind, MetaPeek helps users
          understand the unseen information contained in their digital photos.
          Whether you’re a photographer, digital forensics analyst, or simply
          curious, MetaPeek provides clear and actionable insights.
        </p>

        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed font-semibold">
          Core Features:
        </p>
        <ul className="list-disc ml-6 mb-4 text-gray-700 dark:text-gray-300 space-y-1">
          <li>Displays key metadata such as camera model, date, and resolution.</li>
          <li>Maps photo locations using embedded GPS information.</li>
          <li>Processes multiple files directly in the browser — no uploads.</li>
          <li>Provides privacy-first analysis suitable for investigations.</li>
          <li>Helps verify image authenticity and detect tampering.</li>
        </ul>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          MetaPeek continues to evolve with planned enhancements like batch
          analysis, exportable reports, and deeper metadata visualization tools.
          Our mission is to make digital transparency accessible and secure for
          everyone.
        </p>
      </div>

      {/* Owner Section */}
      <div className="max-w-xl w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl backdrop-blur-sm p-8 text-center z-10">
        <img
          src={owner.image}
          alt={owner.name}
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-green-500 dark:border-green-400"
        />
        <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
          {owner.name}
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
          {owner.role}
        </p>
        <p className="text-gray-600 dark:text-gray-400">{owner.bio}</p>
      </div>
    </div>
  );
}
