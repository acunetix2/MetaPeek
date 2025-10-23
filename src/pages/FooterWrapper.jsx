import React, { useState } from "react";
import Footer from "@components/Footer";
import PrivacyPolicy from "./Policy";
import TermsAndConditions from "./Terms";
import SecurityPolicy from "./Security";

export default function FooterWrapper() {
  const [activePage, setActivePage] = useState(null);

  const handleFooterClick = (e) => {
    const target = e.target.closest("a"); 
    if (!target) return;

    const href = target.getAttribute("href");
    if (href === "/app/privacy" || href === "app/terms" || href === "app/security") {
      e.preventDefault(); 
      if (href === "/app/privacy") setActivePage("privacy");
      else if (href === "/app/terms") setActivePage("terms");
      else if (href === "/app/security") setActivePage("security");
      window.scrollTo({ top: 0, behavior: "smooth" }); 
    }
  };

  return (
    <div onClick={handleFooterClick}>
      {/* Show selected content above footer */}
      <div className="max-w-7xl mx-auto p-6">
        {activePage === "privacy" && <PrivacyPolicy />}
        {activePage === "terms" && <TermsAndConditions />}
        {activePage === "security" && <SecurityPolicy />}
      </div>

      {/* Original footer remains unchanged */}
      
    </div>
  );
}
