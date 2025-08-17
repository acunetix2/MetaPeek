import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      {/* Use Cases Section */}
      <section className="bg-gray-50 py-12 border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <h2 className="text-gray-700 font-semibold text-lg mb-8">
            Use Cases
          </h2>

          <div className="grid gap-8 md:grid-cols-3 text-left">
            <div className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition">
              <h3 className="text-green-600 font-bold mb-2">Cybersecurity & Forensics</h3>
              <p className="text-gray-600 text-sm">
                Detect doctored images, hidden metadata, and verify digital evidence integrity for investigations.
              </p>
            </div>

            <div className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition">
              <h3 className="text-green-600 font-bold mb-2">Media & Fact-Checking</h3>
              <p className="text-gray-600 text-sm">
                Verify image authenticity for newsrooms, publishers, and fact-checking organizations to fight misinformation.
              </p>
            </div>

            <div className="p-6 bg-white shadow-md rounded-xl hover:shadow-lg transition">
              <h3 className="text-green-600 font-bold mb-2">Enterprises & Compliance</h3>
              <p className="text-gray-600 text-sm">
                Ensure product photos, claims, and documents meet compliance standards and prevent fraud.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 mt-0 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 text-left">
          
          {/* Logo + Description */}
          <div>
            <h1 className="text-2xl font-bold text-green-500 mb-4">MetaPeek</h1>
            <p>
              Uncover hidden details, detect anomalies, and gain actionable insights from images.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-green-500 transition">About Us</a></li>
              <li><a href="/team" className="hover:text-green-500 transition">Team</a></li>
              <li><a href="/careers" className="hover:text-green-500 transition">Careers</a></li>
              <li><a href="/contact" className="hover:text-green-500 transition">Contact</a></li>
            </ul>
          </div>

          {/* Knowledge Center */}
          <div>
            <h4 className="text-white font-bold mb-4">Knowledge Center</h4>
            <ul className="space-y-2">
              <li><a href="/features" className="hover:text-green-500 transition">Capabilities</a></li>
              <li><a href="/docs" className="hover:text-green-500 transition">Documentation</a></li>
              <li><a href="/tutorials" className="hover:text-green-500 transition">Tutorials</a></li>
              <li><a href="/faq" className="hover:text-green-500 transition">FAQ</a></li>
            </ul>
          </div>

          {/* Resources + Socials */}
          <div>
            <h4 className="text-white font-bold mb-4">Resources</h4>
            <ul className="space-y-2 mb-6">
              <li><a href="/blog" className="hover:text-green-500 transition">Blog</a></li>
              <li><a href="/newsletter" className="hover:text-green-500 transition">Newsletter</a></li>
              <li><a href="/support" className="hover:text-green-500 transition">Support</a></li>
              <li><a href="/community" className="hover:text-green-500 transition">Community</a></li>
            </ul>
            <div className="flex gap-4 text-2xl">
              <a
                href="https://twitter.com/metapeek"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-500 transition"
              >
                <FaTwitter />
              </a>
              <a
                href="https://linkedin.com/company/metapeek"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-500 transition"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/acunetix2/metapeek"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-500 transition"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t-2 border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 px-6 md:px-12 lg:px-24">
		  <div className="flex gap-6 mb-2 md:mb-0">
			<a href="/privacy" className="hover:text-green-500 transition">Privacy</a>
			<a href="/terms" className="hover:text-green-500 transition">Terms</a>
			<a href="/security" className="hover:text-green-500 transition">Security</a>
		  </div>
		  <p className="text-center md:text-right text-green-600">
			Copyright &copy; {new Date().getFullYear()} MetaPeek | All rights reserved.
		  </p>
		</div>
      </footer>
    </>
  );
}
