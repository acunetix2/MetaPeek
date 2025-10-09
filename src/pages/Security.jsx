import React from "react";

export default function SecurityPolicy() {
  const sections = [
    {
      title: "Data Encryption",
      desc: "All sensitive data is encrypted in transit using SSL/TLS and at rest with industry-standard algorithms.",
    },
    {
      title: "Access Control",
      desc: "Access to personal and sensitive data is restricted to authorized personnel only. Role-based access controls and authentication prevent unauthorized access.",
    },
    {
      title: "Authentication & Account Security",
      desc: "We recommend strong passwords and provide two-factor authentication (2FA) to enhance account security. Users must safeguard their login credentials.",
    },
    {
      title: "Network & Infrastructure Security",
      desc: "MetaPeek employs firewalls, intrusion detection systems, and continuous network monitoring to protect our infrastructure.",
    },
    {
      title: "Regular Security Audits",
      desc: "Periodic security audits, vulnerability assessments, and penetration testing help us identify and fix potential risks.",
    },
    {
      title: "Data Backup & Recovery",
      desc: "Regular backups ensure data recovery in case of accidental loss, system failure, or disaster.",
    },
    {
      title: "User Responsibilities",
      desc: "Users should protect their accounts, avoid sharing passwords, and report suspicious activity to MetaPeek support immediately.",
    },
    {
      title: "Incident Response",
      desc: "In the event of a security incident, we follow a documented response plan to contain, investigate, and mitigate impacts, notifying affected users as required.",
    },
    {
      title: "Continuous Improvement",
      desc: "Security is an ongoing process. We continuously review and improve our policies, practices, and technologies.",
    },
    {
      title: "Contact Us",
      desc: (
        <>
          For security-related concerns, contact us at{" "}
          <a
            href="mailto:security@metapeek.com"
            className="text-green-600 dark:text-green-400 underline hover:text-green-500 dark:hover:text-green-300 transition"
          >
            security@metapeek.com
          </a>
          .
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-100 flex flex-col transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10 flex-1">
        {/* Page Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-green-700 dark:text-green-400 mb-4">
          MetaPeek Security Policy
        </h1>

        {/* Intro Paragraph */}
        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base text-center max-w-2xl mx-auto">
          At MetaPeek, we prioritize the protection of your data. This Security Policy outlines
          the measures we take to keep your information safe and secure.
        </p>

        {/* Policy Sections */}
        <div className="space-y-6 sm:space-y-8">
          {sections.map((item, index) => (
            <section
              key={index}
              className="bg-white dark:bg-gray-800 p-5 sm:p-7 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg sm:text-xl font-semibold text-green-700 dark:text-green-400 mb-2">
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
        <p>&copy; {new Date().getFullYear()} MetaPeek. All rights reserved.</p>
        <p className="text-gray-600 dark:text-gray-300 mt-1">The MetaPeek Team</p>
      </footer>
    </div>
  );
}
