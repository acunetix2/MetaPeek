import React from "react";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Information We Collect",
      content: (
        <ul className="list-disc ml-5 mt-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
          <li>Personal Information: name, email, and account credentials.</li>
          <li>Usage Data: pages visited, time spent, and interactions.</li>
          <li>Device Information: IP address, browser type, and OS details.</li>
          <li>Cookies and similar technologies for better user experience.</li>
        </ul>
      ),
    },
    {
      title: "How We Use Your Information",
      content: (
        <ul className="list-disc ml-5 mt-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
          <li>Provide and enhance our services.</li>
          <li>Send important updates or notifications (if opted in).</li>
          <li>Personalize your experience on MetaPeek.</li>
          <li>Detect, prevent, and respond to fraud or abuse.</li>
        </ul>
      ),
    },
    {
      title: "Sharing of Information",
      content: (
        <>
          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            We do not sell your personal information. We may share it only:
          </p>
          <ul className="list-disc ml-5 mt-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            <li>With trusted service providers that help us operate MetaPeek.</li>
            <li>To comply with legal obligations or valid law enforcement requests.</li>
            <li>During business transfers, mergers, or acquisitions.</li>
          </ul>
        </>
      ),
    },
    {
      title: "Data Retention",
      content: (
        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
          We retain your personal data only as long as necessary to provide our
          services or as required by law.
        </p>
      ),
    },
    {
      title: "Your Privacy Rights",
      content: (
        <ul className="list-disc ml-5 mt-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
          <li>Access or update your personal information.</li>
          <li>Request deletion of your data or account.</li>
          <li>Opt out of marketing communications.</li>
        </ul>
      ),
    },
    {
      title: "Security of Data",
      content: (
        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
          We implement reasonable measures to protect your data against
          unauthorized access, disclosure, or loss. For more details, see our
          Security Policy.
        </p>
      ),
    },
    {
      title: "Changes to This Policy",
      content: (
        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
          We may update this Privacy Policy from time to time. Continued use of
          MetaPeek means you accept the revised policy. Please review it
          periodically.
        </p>
      ),
    },
    {
      title: "Contact Us",
      content: (
        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
          For any questions about this Privacy Policy, contact us at{" "}
          <a
            href="mailto:support@metapeek.com"
            className="text-green-600 dark:text-green-400 underline hover:text-green-500 dark:hover:text-green-300 transition"
          >
            support@metapeek.com
          </a>
          .
        </p>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-100 flex flex-col transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10 flex-1">
        {/* Page Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-green-700 dark:text-green-400 mb-4">
          MetaPeek Privacy Policy
        </h1>

        {/* Intro Paragraph */}
        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base text-center max-w-2xl mx-auto">
          At MetaPeek, your privacy matters. This policy explains how we collect,
          use, and protect your information when using our services.
        </p>

        {/* Policy Sections */}
        <div className="space-y-6 sm:space-y-8">
          {sections.map((section, index) => (
            <section
              key={index}
              className="bg-white dark:bg-gray-800 p-5 sm:p-7 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg sm:text-xl font-semibold text-green-700 dark:text-green-400 mb-2">
                {section.title}
              </h2>
              {section.content}
            </section>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-center py-5 text-xs sm:text-sm mt-auto border-t border-gray-200 dark:border-gray-700">
        <p>&copy; {new Date().getFullYear()} MetaPeek. All rights reserved.</p>
        <p className="text-gray-600 dark:text-gray-300 mt-1">The MetaPeek Team</p>
      </footer>
    </div>
  );
}
