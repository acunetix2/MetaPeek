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
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Hero */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-800">
              <BookOpenIcon className="w-8 h-8 text-green-600 dark:text-green-300" />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-green-700 dark:text-green-400 mb-4">
            MetaPeek Documentation
          </h1>
          <p className="text-lg max-w-1xl mx-auto text-gray-600 dark:text-gray-400">
            Everything you need to know about using <span className="font-semibold">MetaPeek</span> — 
            a lightweight, privacy-first image metadata inspector.
          </p>
        </div>

        {/* What is MetaPeek */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-1xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-3 text-green-700 dark:text-green-300">
            What is MetaPeek?
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>MetaPeek</strong> is a browser-based tool that extracts and
            displays metadata from image files. It supports standard EXIF tags,
            including:
          </p>
          <ul className="list-disc ml-6 mt-3 space-y-1 text-gray-700 dark:text-gray-300">
            <li>Camera make & model</li>
            <li>Date and time the photo was taken</li>
            <li>GPS coordinates (if available)</li>
            <li>Exposure, ISO, focal length, and more</li>
			<span className="font-semibold text-green-600 dark:text-green-400">
              And many more. Try it out...
            </span>.
          </ul>
        </section>

        {/* How to Use */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-3 text-green-700 dark:text-green-300">
            How to Use
          </h2>
          <ol className="list-decimal ml-6 mt-3 space-y-2 text-gray-700 dark:text-gray-300">
		    <li>Drag and drop an image or browse to add an imgage (You can also insert image link) </li>
            <li>Click the <strong>“Upload Image”</strong> button.</li>
			<li>After the image is previewed, click on <strong>"Scan"</strong> to extract image info</li>
            <li>Wait a few seconds while MetaPeek extracts the metadata.</li>
            <li>Explore details both in tabular readable and Json format.</li>
			<li>Lastly, Copy the details and click <strong>"Clear Image"</strong> when done.</li>
			<span className="font-semibold text-green-600 dark:text-green-400">
              Enjoy MetaPeek....
            </span>
          </ol>
        </section>

        {/* Privacy */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-3 text-green-700 dark:text-green-300">
            Privacy by Design
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            MetaPeek runs entirely in your browser. Your image files are{" "}
            <strong>never uploaded or stored</strong> on any server. All EXIF
            data is processed locally ensuring{" "}
            <span className="font-semibold text-green-600 dark:text-green-400">
              100% privacy stay safe always.
            </span>.
          </p>
        </section>

        {/* Supported File Types */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-3 text-green-700 dark:text-green-300">
            Supported File Types
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-gray-700 dark:text-gray-300">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-2 px-3 font-medium">Format</th>
                  <th className="py-2 px-3 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2 px-3">JPEG (.jpg, .jpeg)</td>
                  <td className="py-2 px-3">Full metadata support</td>
				  <td className="py-2 px-3">TIFF (.tif, .tiff)</td>
				  <td className="py-2 px-3">WebP (.webp)</td>
                  <td className="py-2 px-3">GIF (.gif, metadata limited)</td>
                  <td className="py-2 px-3">BMP (.bmp, limited support)</td>
				  <td className="py-2 px-3">PNG (.png, metadata support) </td>
                </tr>
                <tr>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Roadmap */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-3 text-green-700 dark:text-green-300">
            Coming Soon
          </h2>
          <ul className="list-disc ml-6 mt-3 space-y-1 text-gray-700 dark:text-gray-300">
            <li>HEIC and RAW file format support</li>
            <li>Batch image analysis</li>
            <li>Exportable metadata reports</li>
          </ul>
        </section>

        {/* Footer note */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          📘 Last updated: {today}
		  <p>@MetaPeek Team</p>
        </div>
      </div>
    </div>
  );
}
