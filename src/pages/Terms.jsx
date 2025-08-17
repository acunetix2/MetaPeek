import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function TermsAndConditions() {
  const navigate = useNavigate();

  const sections = [
    { title: "1. Acceptance of Terms", content: "By using MetaPeek, you agree to comply with these terms. If you do not agree, please do not use our services." },
    { title: "2. Use of Services", content: "You may use our services only for lawful purposes and in accordance with these terms. Unauthorized use may result in termination of access." },
    { title: "3. Account Responsibilities", content: "If you create an account, you are responsible for maintaining the confidentiality of your login credentials and for all activity under your account. Notify us immediately if you suspect any unauthorized use." },
    { title: "4. User Content", content: "You are responsible for any content you submit or share through MetaPeek. By submitting content, you grant us a non-exclusive license to use, display, and distribute it for the purpose of providing our services." },
    { title: "5. Intellectual Property", content: "All content, features, and functionality of MetaPeek, including but not limited to text, graphics, logos, and software, are our intellectual property. You may not copy, modify, or distribute any part of the service without our express permission." },
    { title: "6. Privacy", content: "Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect information." },
    { title: "7. Limitation of Liability", content: "MetaPeek is provided “as is” without warranties of any kind. We are not liable for any direct, indirect, incidental, or consequential damages arising from the use of our services." },
    { title: "8. Indemnification", content: "You agree to indemnify and hold MetaPeek, its affiliates, and employees harmless from any claim, liability, loss, or expense arising from your use of our services or violation of these terms." },
    { title: "9. Termination", content: "We may suspend or terminate your access to MetaPeek at our discretion, including for violations of these terms. Termination does not limit any legal remedies available to us." },
    { title: "10. Governing Law", content: "These terms are governed by the laws of the jurisdiction where MetaPeek is based, without regard to conflict of law principles." },
    { title: "11. Dispute Resolution", content: "Any disputes arising from these terms or the use of MetaPeek shall first be attempted to be resolved through informal negotiation. If unresolved, disputes may be submitted to binding arbitration or the appropriate courts." },
    { title: "12. Changes to Terms", content: "We may update these terms from time to time. Continued use of our services constitutes acceptance of the updated terms. We encourage users to review the terms periodically." },
    { title: "13. Contact Us", content: <>If you have questions about these Terms and Conditions, please contact us at <a href="mailto:support@metapeek.com" className="text-green-400 underline hover:text-green-300 transition">support@metapeek.com</a>.</> },
  ];

  const handleNavigate = () => {
    const page = document.getElementById("page-content");
    if (page) {
      page.classList.add("opacity-0", "transition-opacity", "duration-500");
    }
    setTimeout(() => navigate("/app"), 500); // 500ms fade-out
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
          MetaPeek Terms & Conditions
        </h1>

        {/* Intro Paragraph */}
        <p className="text-gray-300 text-lg md:text-xl text-center max-w-3xl mx-auto">
          Welcome to MetaPeek. By accessing or using our services, you agree to comply with these terms and conditions. Please read them carefully.
        </p>

        {/* Terms Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <section
              key={index}
              className="bg-gray-800 rounded-xl shadow-md p-6 md:p-8 hover:shadow-lg transition"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-green-500 mb-3">
                {section.title}
              </h2>
              <div className="text-gray-300 text-base md:text-lg">{section.content}</div>
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
