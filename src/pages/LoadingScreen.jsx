import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 text-white z-50">
      {/* Logo with pulse */}
      <motion.img
        src={logo}
        alt="MetaPeek Logo"
        className="w-20 h-20 mb-6 rounded-full shadow-lg"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      />

      {/* Loading text */}
      <motion.h2
        className="text-xl font-semibold text-green-500 mb-6 tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      >
        Loading MetaPeek...
      </motion.h2>

      {/* Animated progress bar */}
      <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-green-500"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
