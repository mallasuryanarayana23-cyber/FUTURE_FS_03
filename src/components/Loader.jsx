import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["FOCUS", "STRENGTH", "DISCIPLINE", "POWER", "FITZONE"];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Random incremental steps
        const step = Math.floor(Math.random() * 12) + 6;
        return Math.min(prev + step, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 100) {
      const stepSize = 100 / words.length;
      const idx = Math.min(Math.floor(progress / stepSize), words.length - 1);
      setWordIndex(idx);
    } else {
      setWordIndex(words.length - 1);
      const timeout = setTimeout(() => {
        onComplete();
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete, words.length]);

  return (
    <motion.div
      className="fixed inset-0 w-full h-full bg-[#050505] flex flex-col items-center justify-center z-[99999]"
      exit={{ opacity: 0, y: -40, scale: 0.98 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background Radial Glow */}
      <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-neon-red/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative flex flex-col items-center justify-center p-6 text-center">
        {/* Word Display with transition */}
        <div className="h-16 md:h-24 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={wordIndex}
              initial={{ opacity: 0, y: 15, scale: 0.9, letterSpacing: "12px" }}
              animate={{ opacity: 1, y: 0, scale: 1, letterSpacing: "6px" }}
              exit={{ opacity: 0, y: -15, scale: 1.05, letterSpacing: "2px" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`font-orbitron text-3xl md:text-6xl font-black ${
                wordIndex === words.length - 1 
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-neon-red to-neon-orange text-glow-red" 
                  : "text-white"
              }`}
            >
              {words[wordIndex]}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Progress Bar Container */}
        <div className="mt-8 w-56 md:w-80 h-[3px] bg-white/10 rounded-full overflow-hidden relative">
          <motion.div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-neon-red to-neon-orange"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut" }}
          />
        </div>

        {/* Percentage Counter */}
        <motion.p
          className="mt-4 font-orbitron text-xs text-gray-text tracking-widest"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        >
          {progress}% UNLOCKING PERFORMANCE
        </motion.p>
      </div>
    </motion.div>
  );
}
