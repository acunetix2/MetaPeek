import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  const sections = [
    {
      title: "1. Information We Collect",
      content: (
        <ul className="list-disc ml-6 mt-2 text-gray-300">
          <li>Personal Information: name, email, account credentials.</li>
          <li>Usage Data: pages visited, time spent, interactions with services.</li>
          <li>Device Information: IP address, browser type, operating system.</li>
          <li>Cookies and Similar Technologies to improve user experience.</li>
        </ul>
      ),
    },
    {
      title: "2. How We Use Your Information",
      content: (
        <ul className="list-disc ml-6 mt-2 text-gray-300">
          <li>Provide and improve our services.</li>
          <li>Communicate updates, notifications, and marketing (if opted-in).</li>
          <li>Personalize your experience on MetaPeek.</li>
          <li>Ensure security and detect fraud or abuse.</li>
        </ul>
      ),
    },
    {
      title: "3. Sharing of Information",
      content: (
        <>
          <p className="text-gray-300">
            We do not sell your personal information. We may share information in the following cases:
          </p>
          <ul className="list-disc ml-6 mt-2 text-gray-300">
            <li>With service providers who help us operate MetaPeek.</li>
            <li>To comply with legal obligations or law enforcement requests.</li>
            <li>During business transfers, mergers, or acquisitions.</li>
          </ul>
        </>
      ),
    },
    {
      title: "4. Data Retention",
      content: (
        <p className="text-gray-300">
          We retain your personal information only as long as necessary to provide our services or as required by law.
        </p>
      ),
    },
    {
      title: "5. Your Privacy Rights",
      content: (
        <ul className="list-disc ml-6 mt-2 text-gray-300">
          <li>Access or update your personal information.</li>
          <li>Request deletion of your data.</li>
          <li>Opt-out of marketing communications.</li>
        </ul>
      ),
    },
    {
      title: "6. Security of Data",
      content: (
        <p className="text-gray-300">
          We implement reasonable technical and organizational measures to protect your data from unauthorized access, disclosure, or loss. For more details, see our Security Policy.
        </p>
      ),
    },
    {
      title: "7. Changes to Privacy Policy",
      content: (
        <p className="text-gray-300">
          We may update this Privacy Policy periodically. Continued use of MetaPeek constitutes acceptance of any changes. We encourage users to review this page regularly.
        </p>
      ),
    },
    {
      title: "8. Contact Us",
      content: (
        <p className="text-gray-300">
          For questions about this Privacy Policy, contact us at{" "}
          <a
            href="mailto:support@metapeek.com"
            className="text-green-400 underline hover:text-green-300 transition"
          >
            support@metapeek.com
          </a>
          .
        </p>
      ),
    },
  ];

  const handleNavigate = () => {
    const page = document.getElementById("page-content");
    if (page) {
      page.classList.add("opacity-0", "transition-opacity", "duration-500");
    }
    setTimeout(() => navigate("/app"), 500); // 500ms fade-out delay
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
      <div id="page-content" className="max-w-5xl mx-auto px-6 py-12 space-y-12 flex-1 transition-opacity duration-500">

        {/* Home Button */}
        <div className="flex justify-start mb-6">
          <button
            onClick={handleNavigate}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-gray-900 font-semibold rounded-lg shadow hover:bg-green-600 transition"
          >
            <FaArrowLeft className="animate-bounce" />
            Back
          </button>
        </div>

        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-500 text-center">
          MetaPeek Privacy Policy
        </h1>

        {/* Intro Paragraph */}
        <p className="text-gray-300 text-lg md:text-xl text-center max-w-3xl mx-auto">
          At MetaPeek, your privacy is important. This Privacy Policy explains how we collect, use, and protect your information when you use our services.
        </p>

        {/* Policy Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <section
              key={index}
              className="bg-gray-800 rounded-xl shadow-md p-6 md:p-8 hover:shadow-lg transition"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-green-500 mb-3">
                {section.title}
              </h2>
              {section.content}
            </section>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 text-center py-6 mt-auto">
        <p className="mb-2">&copy; {new Date().getFullYear()} MetaPeek | All rights reserved.</p>
        <p className="font-semibold text-gray-200">— The MetaPeek Team</p>
      </footer>
    </div>
  );
}
