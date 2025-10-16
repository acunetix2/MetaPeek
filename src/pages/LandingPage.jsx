import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import LoadingScreen from "@/pages/LoadingScreen";
import {
  FileSearch,
  ShieldCheck,
  Zap,
  Lock,
  BarChart3,
  ServerCog,
} from "lucide-react";

// Import screenshots
import Screenshot1 from "@/assets/screenshot1.png";
import Screenshot2 from "@/assets/screenshot2.png";
import Screenshot3 from "@/assets/screenshot3.png";
import Screenshot4 from "@/assets/screenshot4.png";

export default function LandingPage() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Control loading screen after signin
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      setShowLoading(true);
      const timer = setTimeout(() => {
        navigate("/app");
      }, 3000); //loading screen before redirect..
      return () => clearTimeout(timer);
    }
  }, [isSignedIn, navigate]);

  const screenshots = [Screenshot1, Screenshot2, Screenshot3, Screenshot4];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % screenshots.length),
      3000
    );
    return () => clearInterval(interval);
  }, [screenshots.length]);
  if (showLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="bg-gray-900 text-white font-sans">
      {/* Navbar */}
		  <header className="flex justify-between items-center px-8 py-2 border-b border-gray-800 shadow-md bg-gray-900 sticky top-0 z-50">
      {/* Left */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Metapeek Logo"
            className="w-2 h-2 md:w-8 md:h-8 rounded-full shadow-md transform transition-transform duration-300 ease-in-out hover:scale-110"
          />
          <h1 className="text-2xl font-bold text-green-600 dark:text-green-400">
            MetaPeek
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-3 font-sans tracking-wide text-white text-1xl  md:text-base">
          <a
            href="#screenshots"
            className="hover:text-green-400 transition-colors duration-300 "
          >
            Demo
          </a>
          <a
            href="#features"
            className="hover:text-green-400 transition-colors duration-300 "
          >
            Features
          </a>
          <a
            href="#howitworks"
            className="hover:text-green-400 transition-colors duration-300 "
          >
            Workflow
          </a>
        </nav>
      </div>

      {/* Right (desktop only) */}
      <div className="hidden md:flex items-center gap-4">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-blue-500 text-gray-900 font-semibold px-2 py-2 rounded-lg shadow-md hover:bg-green-600 hover:scale-105 transition-transform transition-colors duration-300">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="absolute top-24 left-0 w-full bg-gray-900 border-t border-gray-800 flex flex-col items-center gap-6 py-4 md:hidden">
          <a
            href="#screenshots"
            onClick={() => setIsOpen(false)}
            className="hover:text-green-400 transition-colors duration-300 text-1xl"
          >
            Demo
          </a>
          <button
            href="#features"
            onClick={() => setIsOpen(false)}
            className="hover:text-green-400 transition-colors duration-300  text-1xl"
          >
            Features
          </button>
          <a
            href="#howitworks"
            onClick={() => setIsOpen(false)}
            className="hover:text-green-400 transition-colors duration-300 text-1xl"
          >
            Workflow
          </a>

          {/* Button inside hamburger */}
          <div className="mt-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-green-500 text-gray-900 font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-green-600 hover:scale-105 transition-transform transition-colors duration-300">
                  Get Started
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </nav>
      )}
    </header>

      {/* Hero Section */}
      <section className=" py-12 px-6">
        <h2 className="text-3xl text-left md:text-3xl font-extrabold mb-3">
           Your window into the hidden data of every image.
        </h2>
        <p className=" text-white-400 text-left max-w-3xl mx-auto mb-6">
          A professional simplified image forensics tool, it extract information in images from basic metadata to technical information. 
          It is a browser-based metadata analysis tool that allows users to extract and interpret hidden data within image files such as camera details, timestamps, and GPS coordinates without uploading files to external servers.
        </p>
        <div className="flex gap-2 justify-center">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="border border-green-500 px-3 py-1 text-sm rounded hover:bg-green-500 hover:text-white transition">
                Get Started
              </button>
            </SignInButton>
          </SignedOut>
          <a
            href="#features"
            className="border border-green-500 px-3 py-1 text-sm rounded hover:bg-blue-700 hover:text-white transition"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Right content*/}
      <section id="screenshots" className="py-8 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="text-left">
            <h3 className="text-1xl font-bold text-white-500 mb-3">
              User Experience
            </h3>
            <p className="text-white-500 mb-3 text-1xl ">
              Experience real-time visual forensics and metadata parsing.
              MetaPeek detects hidden edits, flags anomalies, and surfaces the
              facts so you can act with confidence.
            </p>
            <p className="text-white-500 text-1xl">
              From compliance reviews to investigative workflows, MetaPeek
              translates raw image data into reliable insights and shareable
              reports.
            </p>
            <div className="flex gap-2 mt-4">
              <SignedIn>
                <Link
                  to="/app"
                  className="bg-green-500 px-3 py-1 text-sm rounded hover:bg-green-600 transition"
                >
                  Go to Dashboard
                </Link>
              </SignedIn>
            </div>
          </div>

          {/* Right Screenshot Slider */}
          <div className="bg-gray-800 p-2 rounded-lg shadow-lg">
            <div className="aspect-video rounded-lg overflow-hidden relative">
              <AnimatePresence>
                <motion.img
                  key={index}
                  src={screenshots[index]}
                  alt={`Screenshot ${index + 1}`}
                  className="object-cover w-full h-full absolute"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.8 }}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 px-8 bg-gray-800">
        <h3 className="text-2xl font-bold text-center mb-10">
          Why Choose MetaPeek?
        </h3>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: "Deep Metadata Parsing",
              desc: "Image EXIF profile, camera/lens details, time, GPS, and edit traces among other details.",
              Icon: FileSearch,
            },
            {
              title: "Tamper & Anomaly Checks",
              desc: "Spot suspicious patterns using error-level cues and structural inconsistencies.",
              Icon: ShieldCheck,
            },
            {
              title: "Fast",
              desc: "Process single files with responsive performance at scale.",
              Icon: Zap,
            },
            {
              title: "Privacy by Design",
              desc: "On-device analysis options and strict handling—your data stays yours.",
              Icon: Lock,
            },
            {
              title: "Insightful Reporting",
              desc: "Export clean summaries to PDF with key fields.",
              Icon: BarChart3,
            },
          ].map(({ title, desc, Icon }, i) => (
            <div
              key={i}
              className="p-6 bg-gray-900 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center justify-center rounded-lg bg-green-900/40 p-2">
                  <Icon className="w-5 h-5 text-green-500" />
                </span>
                <h4 className="text-lg font-semibold text-green-400">{title}</h4>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="howitworks" className="py-16 px-8 bg-gray-800">
        <h3 className="text-2xl font-bold text-center mb-10">
          How MetaPeek Works
        </h3>
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
          {[
            {
              step: "1",
              title: "Upload",
              points: [
                "Drag & drop images or select from device.",
                "Supports common formats (JPEG, PNG, TIFF, WebP).",
              ],
            },
            {
              step: "2",
              title: "Sanitize & Hash",
              points: [
                "Validate file type & integrity.",
                "Securely stage for local analysis.",
              ],
            },
            {
              step: "3",
              title: "Analyze",
              points: [
                "Parse EXIF/IPTC/XMP & ICC profiles.",
                "Run anomaly/tamper heuristics.",
                "Highlight edits, GPS, and time shifts.",
              ],
            },
            {
              step: "4",
              title: "Report & Export",
              points: [
                "Review a structured summary.",
                "Export PDF/CSV; copy key findings.",
                "Share or archive with timestamps.",
              ],
            },
          ].map(({ step, title, points }, i) => (
            <div
              key={i}
              className="bg-gray-900 rounded-lg p-6 shadow hover:shadow-lg transition"
            >
              <div className="w-8 h-8 rounded-full bg-green-900/50 flex items-center justify-center text-green-400 font-bold mb-3">
                {step}
              </div>
              <h4 className="text-lg font-semibold text-green-400 mb-2">
                {title}
              </h4>
              <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                {points.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-10 px-8 bg-green-900">
        <h3 className="text-3xl font-bold mb-3 text-white">
          Ready to Elevate Your Image Analysis?
        </h3>
        <p className="text-gray-200 mb-4 max-w-2xl mx-auto">
          Try MetaPeek for faster reviews, defensible
          findings, and clean reports.
        </p>
        <div className="flex justify-center gap-2">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-green-700 px-3 py-1 text-sm rounded hover:bg-green-800 transition">
                Get Started Now
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link
              to="/app"
              className="bg-green-700 px-3 py-1 text-sm rounded hover:bg-green-800 transition"
            >
              Go to Dashboard
            </Link>
          </SignedIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 mt-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 text-left">
          {/* Logo + CTA */}
          <div>
            <h1 className="text-1xl font-bold text-green-500 mb-4">MetaPeek</h1>
            <p className="mb-6">
              Uncover hidden details, detect anomalies, and gain actionable
              insights from images.
            </p>  
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="hover:text-green-500 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/team" className="hover:text-green-500 transition">
                  Team
                </a>
              </li>
              <li>
                <a href="/careers" className="hover:text-green-500 transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-green-500 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Knowledge Center */}
          <div>
            <h4 className="text-white font-bold mb-4">Knowledge Center</h4>
            <ul className="space-y-2">
              <li>
                <a href="/features" className="hover:text-green-500 transition">
                  Capabilities
                </a>
              </li>
              <li>
                <a href="/docs" className="hover:text-green-500 transition">
                  Documentation
                </a>
              </li>
              <li>
                <a href="/tutorials" className="hover:text-green-500 transition">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-green-500 transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Resources + Socials */}
          <div>
            <h4 className="text-white font-bold mb-4">Resources</h4>
            <ul className="space-y-2 mb-6">
              <li>
                <a href="/blog" className="hover:text-green-500 transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="/newsletter" className="hover:text-green-500 transition">
                  Newsletter
                </a>
              </li>
              <li>
                <a href="/support" className="hover:text-green-500 transition">
                  Support
                </a>
              </li>
              <li>
                <a href="/community" className="hover:text-green-500 transition">
                  Community
                </a>
              </li>
            </ul>
            <div className="flex gap-4 text-2xl">
              <a
                href="https://x.com/MONTER34865"
                target="_blank"
                className="hover:text-green-500 transition"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.linkedin.com/in/metapeek-inc-3a7b2237b/"
                target="_blank"
                className="hover:text-green-500 transition"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/acunetix2/metapeek"
                target="_blank"
                className="hover:text-green-500 transition"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 px-6 md:px-12 lg:px-24">
          <div className="flex gap-6 mb-2 md:mb-0">
            <a
              href="/privacy"
              rel="noopener noreferrer"
              className="hover:text-green-500 transition"
            >
              Privacy
            </a>
            <a
              href="/terms"
              rel="noopener noreferrer"
              className="hover:text-green-500 transition"
            >
              Terms
            </a>
            <a
              href="/security"
              rel="noopener noreferrer"
              className="hover:text-green-500 transition"
            >
              Security
            </a>
          </div>
          <p className="text-center md:text-right">
            &copy; {new Date().getFullYear()} MetaPeek | All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
