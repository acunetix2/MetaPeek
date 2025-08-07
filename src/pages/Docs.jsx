import React from "react";
import { BookOpenIcon } from "lucide-react";

export default function Docs() {
  const today = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-950 px-6 py-16 text-gray-800 dark:text-gray-100">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <BookOpenIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-green-700 dark:text-green-400 mb-4">
            MetaPeek Documentation
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Learn how to use MetaPeek to inspect, interpret, and visualize metadata embedded in your images.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-green-700 dark:text-green-300">What is MetaPeek?</h2>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>MetaPeek</strong> is a browser-based tool that extracts and displays metadata
            from image files. It supports standard EXIF tags, including:
          </p>
          <ul className="list-disc ml-6 mt-2 text-gray-700 dark:text-gray-300">
            <li>Camera make & model</li>
            <li>Date and time the photo was taken</li>
            <li>GPS coordinates (if available)</li>
            <li>Exposure, ISO, focal length, and more</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-green-700 dark:text-green-300">How to Use</h2>
          <ol className="list-decimal ml-6 mt-2 text-gray-700 dark:text-gray-300 space-y-1">
            <li>Click on the “Upload Image” button.</li>
            <li>Select a JPEG or PNG file from your device.</li>
            <li>Wait a few seconds while MetaPeek extracts the metadata.</li>
            <li>View camera details and GPS location (if available) on the map.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-green-700 dark:text-green-300">Privacy by Design</h2>
          <p className="text-gray-700 dark:text-gray-300">
            MetaPeek runs entirely in your browser. Your image files are never uploaded or stored on any server. The EXIF data is processed locally using JavaScript — ensuring 100% privacy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-green-700 dark:text-green-300">Supported File Types</h2>
          <p className="text-gray-700 dark:text-gray-300">
            MetaPeek currently supports:
          </p>
          <ul className="list-disc ml-6 mt-2 text-gray-700 dark:text-gray-300">
            <li>JPEG (.jpg, .jpeg)</li>
            <li>PNG (metadata limited)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-green-700 dark:text-green-300">Coming Soon</h2>
          <p className="text-gray-700 dark:text-gray-300">
            We plan to add support for:
          </p>
          <ul className="list-disc ml-6 mt-2 text-gray-700 dark:text-gray-300">
            <li>HEIC and RAW file formats</li>
            <li>Batch image analysis</li>
            <li>Downloadable metadata reports</li>
          </ul>
        </section>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Last updated: {today}
        </div>
      </div>
    </div>
  );
}
