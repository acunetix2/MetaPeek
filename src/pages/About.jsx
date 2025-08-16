import React from "react";
import { InfoIcon } from "lucide-react";

export default function About() {
  const owner = {
    name: "Iddy Chesire",
    role: "Cybersecurity Analyst & Developer",
    bio: "Iddy Chesire is dedicated to building secure, user-friendly tools that empower individuals to understand and manage their data. He leads MetaPeek, ensuring it is intuitive, reliable, and respects user privacy.",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=Iddy%20Chesire",
  };

  return (
    <div className="relative min-h-screen px-6 py-20 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-tr from-green-100 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-green-300 dark:bg-green-900 opacity-20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-orange-200 dark:bg-orange-800 opacity-20 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-3xl w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl backdrop-blur-sm p-8 mb-12 z-10">
        <div className="flex items-center gap-3 mb-6">
          <InfoIcon className="w-6 h-6 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">About MetaPeek</h1>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          <strong className="text-green-700 dark:text-green-400">MetaPeek</strong> is a versatile tool designed to help you explore metadata embedded in image files. It provides clear insights into hidden details, such as camera settings, photo location, and timestamps.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          MetaPeek operates entirely in your browser, ensuring your files remain private. No data is uploaded or stored externally. Its interface is designed for anyone, from casual users to professionals, to easily inspect images.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Key benefits include:
        </p>
        <ul className="list-disc ml-6 mb-4 text-gray-700 dark:text-gray-300">
          <li>Instantly view camera details, timestamps, and image dimensions</li>
          <li>Locate photos on a map if GPS metadata is available</li>
          <li>Analyze multiple images efficiently without compromising privacy</li>
          <li>Easy to use for photographers, investigators, and hobbyists</li>
          <li>Helps validate authenticity and trace origin of images</li>
        </ul>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          MetaPeek is continually evolving. Upcoming features include enhanced batch processing, downloadable reports, and additional metadata insights to further empower users in understanding their digital imagery.
        </p>
      </div>

      <div className="max-w-xl w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl backdrop-blur-sm p-8 text-center z-10">
        <img
          src={owner.image}
          alt={owner.name}
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-orange-400 dark:border-green-500"
        />
        <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">{owner.name}</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">{owner.role}</p>
        <p className="text-gray-600 dark:text-gray-400">{owner.bio}</p>
      </div>
    </div>
  );
}
