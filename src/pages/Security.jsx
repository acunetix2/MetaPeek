import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function SecurityPolicy() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    // Fade out page content before navigating
    const page = document.getElementById("page-content");
    if (page) {
      page.classList.add("opacity-0", "transition-opacity", "duration-500");
    }
    setTimeout(() => navigate("/app"), 500); // 500ms delay
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
          MetaPeek Security Policy
        </h1>

        {/* Intro Paragraph */}
        <p className="text-gray-300 text-lg md:text-xl text-center max-w-3xl mx-auto">
          At MetaPeek, we prioritize the protection of your data. This Security Policy outlines the measures we take to keep your information safe and secure.
        </p>

        {/* Security Sections */}
        <div className="space-y-8">
          {[
            { title: "1. Data Encryption", desc: "All sensitive data is encrypted in transit using SSL/TLS and at rest with industry-standard algorithms." },
            { title: "2. Access Control", desc: "Access to personal and sensitive data is restricted to authorized personnel only. Role-based access controls and authentication prevent unauthorized access." },
            { title: "3. Authentication & Account Security", desc: "We recommend strong passwords and provide two-factor authentication (2FA) to enhance account security. Users must safeguard their login credentials." },
            { title: "4. Network & Infrastructure Security", desc: "MetaPeek employs firewalls, intrusion detection systems, and continuous network monitoring to protect our infrastructure." },
            { title: "5. Regular Security Audits", desc: "Periodic security audits, vulnerability assessments, and penetration testing help us identify and fix potential risks." },
            { title: "6. Data Backup & Recovery", desc: "Regular backups ensure data recovery in case of accidental loss, system failure, or disaster." },
            { title: "7. User Responsibilities", desc: "Users should protect their accounts, avoid sharing passwords, and report suspicious activity to MetaPeek support immediately." },
            { title: "8. Incident Response", desc: "In the event of a security incident, we follow a documented response plan to contain, investigate, and mitigate impacts, notifying affected users as required." },
            { title: "9. Continuous Improvement", desc: "Security is an ongoing process. We continuously review and improve our policies, practices, and technologies." },
            { title: "10. Contact Us", desc: <>For security-related concerns, contact us at <a href="mailto:security@metapeek.com" className="text-green-400 underline hover:text-green-300 transition">security@metapeek.com</a>.</> }
          ].map((item, index) => (
            <section
              key={index}
              className="bg-gray-800 rounded-xl shadow-md p-6 md:p-8 hover:shadow-lg transition"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-green-500 mb-3">{item.title}</h2>
              <p className="text-gray-300 text-base md:text-lg">{item.desc}</p>
            </section>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700 py-6 text-center text-gray-400 mt-6">
        <p>&copy; {new Date().getFullYear()} MetaPeek. All rights reserved.</p>
        <p>— The MetaPeek Team</p>
      </footer>
    </div>
  );
}
