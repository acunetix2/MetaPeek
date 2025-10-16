import React, { useEffect, useState } from "react";

export default function Loading({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [visible, setVisible] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date()); 

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 10));
    }, 50);

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => setFadeOut(true), 500);
      setTimeout(() => {
        setVisible(false);
        if (onFinish) onFinish();
      }, 1500);
    }

    return () => clearInterval(interval);
  }, [progress, onFinish]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  const timeString = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const dateString = currentTime.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className={`relative w-full h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-cyan-950 overflow-hidden flex flex-col items-center justify-center transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* --- REAL-TIME CLOCK --- */}
      <div className="absolute top-2 sm:top-4 text-orange-500 font-mono text-[10px] sm:text-xs tracking-widest">
        Time: {timeString} | {dateString}
      </div>

      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-40 sm:w-64 h-40 sm:h-64 bg-blue-500 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Geometric patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
        <div
          className="absolute top-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      {/* Main layout */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-5xl sm:max-w-6xl px-4 sm:px-6 space-y-6 md:space-y-0">
        {/* Left side - Circular HUD */}
        <div className="relative w-48 sm:w-64 sm:h-64 md:w-80 md:h-80 h-48">
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: "8s" }}>
            <svg className="w-full h-full" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="95"
                fill="none"
                stroke="rgba(34, 211, 238, 0.3)"
                strokeWidth="0.5"
                strokeDasharray="5,5"
              />
              <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="1" />
            </svg>
          </div>
          <div
            className="absolute inset-6 sm:inset-8 animate-spin"
            style={{ animationDuration: "6s", animationDirection: "reverse" }}
          >
            <svg className="w-full h-full" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="0.5" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <line
                  key={i}
                  x1="100"
                  y1="100"
                  x2={100 + 80 * Math.cos((angle * Math.PI) / 180)}
                  y2={100 + 80 * Math.sin((angle * Math.PI) / 180)}
                  stroke="rgba(34, 211, 238, 0.3)"
                  strokeWidth="0.5"
                />
              ))}
            </svg>
          </div>

          <div className="absolute inset-12 sm:inset-16 rounded-full border border-cyan-400 bg-gradient-to-br from-cyan-950/50 to-blue-950/50 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center">
              <div className="text-green-400 text-bold text-[8px] sm:text-xs mb-1 sm:mb-2 tracking-widest opacity-70">
                INITIALIZING METAPEEK
              </div>
              <div className="text-green-500 text-2xl sm:text-4xl font-bold">{progress}%</div>
              <div className="text-green-400 text-[8px] sm:text-xs mt-1 sm:mt-2 tracking-widest opacity-70">
                {progress <= 100 ? "INITIALIZING" : "COMPLETE"}
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Panels */}
        <div className="flex flex-col space-y-4 md:space-y-6 w-full md:w-96 max-w-md">
          {/* Data transmission panel */}
          <div className="border border-cyan-400/30 bg-slate-900/40 backdrop-blur-sm p-3 sm:p-4 rounded">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="text-green-500 text-[8px] sm:text-xs tracking-widest">
                METAPEEK FORENSIC TOOL 
              </div>
              <div className="flex space-x-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  ></div>
                ))}
              </div>
            </div>
            <div className="space-y-1 sm:space-y-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center space-x-1 sm:space-x-2">
                  <div
                    className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  ></div>
                  <div className="flex-1 h-1 bg-slate-700 rounded overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
                      style={{ width: `${(progress + i * 15) % 100}%` }}
                    ></div>
                  </div>
                  <div className="text-green-400 text-[6px] sm:text-xs font-mono">
                    {((progress + i * 10) % 100).toString().padStart(2, "0")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Circular indicator */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="relative w-16 sm:w-20 h-16 sm:h-20">
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: "3s" }}>
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(34, 211, 238, 0.3)"
                    strokeWidth="1"
                    strokeDasharray="10,5"
                  />
                </svg>
              </div>
              <div className="absolute inset-1 sm:inset-2 rounded-full border border-cyan-400 bg-slate-900/60 flex items-center justify-center">
                <div className="text-red-500 text-[8px] sm:text-xs font-bold">{progress}%</div>
              </div>
            </div>
            <div className="flex-1 space-y-1 sm:space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center space-x-1">
                  <div className="flex-1 h-1 bg-slate-700 rounded overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 via-blue-500 to-green-500 transition-all duration-500"
                      style={{
                        width: `${Math.abs(Math.sin((progress + i * 30) * 0.05)) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech grid panel */}
          <div className="border border-cyan-400/30 bg-slate-900/40 backdrop-blur-sm p-3 sm:p-4 rounded">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border border-cyan-500/20 p-2 sm:p-2 text-center">
                  <div
                    className="text-green-400 text-[8px] sm:text-xs font-mono animate-pulse"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  >
                    {Math.floor(Math.random() * 999)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom loading bar */}
      <div className="absolute bottom-0 left-0 w-full">
        <div className="flex items-center justify-center mb-2 sm:mb-4">
          <div className="text-green-500 text-[8px] sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] font-bold">
            LOADING
          </div>
        </div>
        <div className="h-1 bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-red-500 via-blue-500 to-green-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Corner brackets */}
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 w-6 sm:w-8 h-6 sm:h-8 border-t-2 border-l-2 border-cyan-400/50"></div>
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-6 sm:w-8 h-6 sm:h-8 border-t-2 border-r-2 border-cyan-400/50"></div>
      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 w-6 sm:w-8 h-6 sm:h-8 border-b-2 border-l-2 border-cyan-400/50"></div>
      <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-6 sm:w-8 h-6 sm:h-8 border-b-2 border-r-2 border-cyan-400/50"></div>
    </div>
  );
}
