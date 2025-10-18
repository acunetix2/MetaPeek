import React from "react";

export default function TermsAndConditions() {
  const sections = [
    { title: "Acceptance of Terms", content: "By using NeuroScan, you agree to comply with these terms. If you do not agree, please do not use our services." },
    { title: "Use of Services", content: "You may use our services only for lawful purposes and in accordance with these terms. Unauthorized use may result in lawful issues. NeuroScan will not be accountable for such matters." },
    { title: "Account Responsibilities", content: "If you create an account, you are responsible for maintaining the confidentiality of your login credentials and for all activity under your account. Notify us immediately if you suspect any unauthorized access to your account." },
    { title: "User Content", content: "You are responsible for any content you submit or share through NeuroScan. By submitting content, you grant us a non-exclusive license to use, display, and distribute it for the purpose of providing our services." },
    { title: "Intellectual Property", content: "All content, features, and functionality of NeuroScan, including text, graphics, logos, and software, are the owner’s intellectual property. You may not copy, modify, or distribute any part of the service without our express permission." },
    { title: "Privacy", content: "Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect information." },
    { title: "Limitation of Liability", content: "NeuroScan is provided “as is” without warranties of any kind. We are not liable for any direct, indirect, incidental, or consequential damages arising from the use of our services." },
    { title: "Indemnification", content: "You agree to indemnify and hold NeuroScan, its affiliates, and employees harmless from any claim, liability, loss, or expense arising from your use of our services or violation of these terms." },
    { title: "Termination", content: "We may suspend or terminate your access to NeuroScan at our discretion, including for violations of these terms. Termination does not limit any legal remedies available to us." },
    { title: "Governing Law", content: "These terms are governed by the laws of the jurisdiction where NeuroScan is based, without regard to conflict of law principles." },
    { title: "Dispute Resolution", content: "Any disputes arising from these terms or the use of NeuroScan shall first be attempted to be resolved through informal negotiation. If unresolved, disputes may be submitted to binding arbitration or the appropriate courts." },
    { title: "Changes to Terms", content: "We may update these terms from time to time. Continued use of our services constitutes acceptance of the updated terms. We encourage users to review the terms periodically." },
    { title: "Contact Us", content: <>If you have questions about these Terms and Conditions, please contact us at <a href="mailto:support@neuroscan.com" className="text-green-500 underline hover:text-green-400 transition">support@neuroscan.com</a>.</> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 transition-colors duration-300">
      <div id="page-content" className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 flex-1">
        
        {/* Page Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-green-600 dark:text-green-400 tracking-tight">
          Terms & Conditions
        </h1>

        {/* Intro Paragraph */}
        <p className="text-base sm:text-lg text-center max-w-2xl mx-auto text-gray-700 dark:text-gray-300 leading-relaxed">
          Welcome to NeuroScan. By accessing or using our services, you agree to comply with these terms and conditions. Please read them carefully.
        </p>

        {/* Terms Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <section
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300"
            >
              <h2 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">
                {section.title}
              </h2>
              <div className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-center py-5 mt-auto border-t border-gray-300 dark:border-gray-700">
        <p>&copy; {new Date().getFullYear()} <span className="font-semibold text-green-600 dark:text-green-400">NeuroScan</span> | All rights reserved.</p>
        <p className="font-medium text-gray-800 dark:text-gray-200">@NeuroScan Team</p>
      </footer>
    </div>
  );
}
