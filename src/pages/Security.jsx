import React from "react";

export default function SecurityPolicy() {
  const sections = [
    {
      title: "Data Encryption",
      desc: "All sensitive data is encrypted in transit if any using SSL/TLS and at rest with industry-standard encryption algorithms to ensure confidentiality and integrity.",
    },
    {
      title: "Access Control",
      desc: "Access to personal and sensitive data if any is restricted to authorized personnel only. Role-based access controls and authentication mechanisms prevent unauthorized access.",
    },
    {
      title: "Authentication & Account Security",
      desc: "We enforce strong password policies and support two-factor authentication (2FA) to enhance account security. Users are responsible for safeguarding their login credentials.",
    },
    {
      title: "Regular Security Audits",
      desc: "Routine security audits, vulnerability assessments, and penetration tests help us identify and remediate potential threats proactively.",
    },
    {
      title: "Data Backup & Recovery",
      desc: "We perform regular encrypted backups to ensure data recovery if any in case of accidental loss, corruption, or system failure.",
    },
    {
      title: "User Responsibilities",
      desc: "Users must protect their accounts, avoid sharing credentials, and promptly report suspicious activities to our support team.",
    },
    {
      title: "Incident Response",
      desc: "In the event of a security incident, we follow a documented response plan to contain, investigate, and mitigate the issue, notifying affected users as required by law.",
    },
    {
      title: "Continuous Improvement",
      desc: "Our security framework evolves continuously. We review and upgrade our policies, technologies, and best practices regularly to maintain a high level of protection.",
    },
    {
      title: "Contact Us",
      desc: (
        <>
          For security-related inquiries or incident reports, please contact us at{" "}
          <a
            href="mailto:security@neuroscan.com"
            className="text-green-600 dark:text-green-400 underline hover:text-green-500 dark:hover:text-green-300 transition-colors duration-200"
          >
            security@neuroscan.com
          </a>
          .
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-100 flex flex-col transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10 flex-1">
        
        {/* Page Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-green-700 dark:text-green-400 tracking-tight">
          NeuroScan Security Policy
        </h1>

        {/* Intro Paragraph */}
        <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg text-center max-w-2xl mx-auto leading-relaxed">
          At NeuroScan, we prioritize your data security. This Security Policy outlines our
          technical and organizational measures to protect user information and maintain trust.
        </p>

        {/* Policy Sections */}
        <div className="space-y-6 sm:space-y-8">
          {sections.map((item, index) => (
            <section
              key={index}
              className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300"
            >
              <h2 className="text-lg sm:text-xl font-semibold text-green-700 dark:text-green-400 mb-3">
                {item.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                {item.desc}
              </p>
            </section>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-center py-5 text-xs sm:text-sm mt-auto border-t border-gray-200 dark:border-gray-700">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-green-600 dark:text-green-400">NeuroScan</span>. All
          rights reserved.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mt-1">@NeuroScan Team</p>
      </footer>
    </div>
  );
}
