import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFire, FaHeartbeat, FaPlay, FaChevronDown } from 'react-icons/fa';
import Counter from '../components/Counter';
import { heroContent } from '../data/gymContent';

export default function Hero() {
  const { tagline, titleLine1, titleLine2, description, bgImage, ctaPrimary, ctaSecondary, stats, liveTracker } = heroContent;

  const [heartRate, setHeartRate] = useState(liveTracker.initialHeartRate);
  const [calories, setCalories] = useState(liveTracker.initialCalories);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Smooth interval-training simulation (climb for 60s, cool down for 60s)
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Heart rate cycles smoothly using a sine wave between 128 and 142 bpm
    const cycleDuration = 120; // 2 minute cycle
    const cycleTime = elapsedSeconds % cycleDuration;
    let targetHr;

    if (cycleTime < 60) {
      // Climbing intensity phase
      targetHr = Math.round(128 + (cycleTime / 60) * 14);
    } else {
      // Cool-down recovery phase
      targetHr = Math.round(142 - ((cycleTime - 60) / 60) * 10);
    }
    setHeartRate(targetHr);

    // Realistic calories burned rate: ~10 kcal per minute (1 kcal every 6 seconds)
    const extraCalories = Math.floor(elapsedSeconds / 6);
    setCalories(liveTracker.initialCalories + extraCalories);
  }, [elapsedSeconds, liveTracker.initialCalories]);

  const handleExploreClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 40, scale: 0.96 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 90, damping: 18, delay: 0.4 },
    },
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden"
    >
      {/* Background Image with Deep Overlays */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: `url('${bgImage}')`,
        }}
      >
        <div className="absolute inset-0 bg-black/65 z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/35 to-black/20 z-0" />
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-neon-red/5 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* Hero Content Grid */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 py-12 md:py-20">
        
        {/* Left column: Info details */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center text-left"
        >
          {/* Subtitle tag */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 border border-neon-red/30 bg-neon-red/10 px-4 py-1.5 rounded-full w-fit mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-neon-red animate-ping" />
            <span className="font-orbitron text-[10px] md:text-xs font-bold uppercase tracking-widest text-neon-red">
              {tagline}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            variants={itemVariants}
            className="font-orbitron text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight leading-none text-white mb-6"
          >
            {titleLine1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-red to-neon-orange text-glow-red">
              {titleLine2}
            </span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p 
            variants={itemVariants}
            className="font-inter text-sm sm:text-base md:text-lg text-gray-text leading-relaxed max-w-xl mb-10"
          >
            {description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4 mb-14"
          >
            <a 
              href={ctaPrimary.link}
              onClick={(e) => handleExploreClick(e, ctaPrimary.link.replace('#', ''))}
              className="px-8 py-4 bg-gradient-to-r from-neon-red to-neon-orange rounded-full text-white font-orbitron text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-neon-red/40 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 border border-white/10 flex items-center gap-2 group cursor-pointer"
            >
              <span>{ctaPrimary.label}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-150 transition-transform duration-300" />
            </a>

            <a 
              href={ctaSecondary.link}
              onClick={(e) => handleExploreClick(e, ctaSecondary.link.replace('#', ''))}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-orbitron text-xs font-bold uppercase tracking-wider rounded-full border border-white/10 hover:border-neon-red/50 shadow-md transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <span>{ctaSecondary.label}</span>
              <FaPlay className="text-[10px] text-neon-orange" />
            </a>
          </motion.div>

          {/* Statistics Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/10 pt-8"
          >
            {stats.map((stat, sIdx) => (
              <div key={sIdx}>
                <p className="font-orbitron text-2xl sm:text-3xl font-extrabold text-white">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-[10px] sm:text-xs text-gray-text uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right column: Realistic Live Workout card */}
        <motion.div 
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-sm">
            <div className="absolute -inset-2 bg-gradient-to-r from-neon-red to-neon-orange rounded-3xl blur-xl opacity-20 pointer-events-none" />

            {/* Main Interactive Card */}
            <div className="relative glass-panel rounded-3xl p-6 border border-white/10 shadow-2xl flex flex-col gap-6">
              
              {/* Card Header */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                    <img 
                      src={liveTracker.memberAvatar} 
                      alt={liveTracker.memberName}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="text-left">
                    <h4 className="font-orbitron text-xs sm:text-sm font-bold text-white uppercase tracking-wider">{liveTracker.memberName}</h4>
                    <p className="text-[9px] text-gray-text uppercase tracking-widest">{liveTracker.memberRole}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-400 font-orbitron text-[9px] font-bold rounded-full tracking-widest animate-pulse">
                  LIVE WORKOUT
                </span>
              </div>

              {/* Heartbeat Display */}
              <div className="glass-panel bg-black/40 rounded-2xl p-4 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-neon-red/10 border border-neon-red/20 flex items-center justify-center text-neon-red">
                    <FaHeartbeat className="text-xl animate-beat" style={{ animation: 'beat 0.82s infinite' }} />
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-text uppercase tracking-wider">Heart Rate</p>
                    <h5 className="font-orbitron text-lg sm:text-xl font-bold text-white">{heartRate} <span className="text-xs text-neon-red">BPM</span></h5>
                  </div>
                </div>
                {/* Simulated HR Waveform graph */}
                <div className="flex items-end gap-[3px] h-8">
                  {[4, 10, 6, 15, 28, 12, 5, 18, 8, 12, 4].map((h, i) => (
                    <motion.div
                      key={i}
                      className="w-[3px] bg-neon-red rounded-full animate-pulse"
                      style={{ height: h }}
                    />
                  ))}
                </div>
              </div>

              {/* Calorie Burn Counter */}
              <div className="glass-panel bg-black/40 rounded-2xl p-4 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-neon-orange/10 border border-neon-orange/20 flex items-center justify-center text-neon-orange">
                    <FaFire className="text-xl" />
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-text uppercase tracking-wider">Energy Expended</p>
                    <h5 className="font-orbitron text-lg sm:text-xl font-bold text-white">{calories} <span className="text-xs text-neon-orange">KCAL</span></h5>
                  </div>
                </div>
                {/* Mini Circle progress bar */}
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-white/10"
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <motion.path
                      className="text-neon-orange"
                      strokeWidth="3"
                      strokeDasharray={`${Math.min(((calories - liveTracker.initialCalories) / 280) * 100 + 40, 100)}, 100`}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute text-[9px] font-orbitron font-bold text-white">
                    {Math.min(Math.round(((calories - liveTracker.initialCalories) / 280) * 100 + 40), 100)}%
                  </span>
                </div>
              </div>

              {/* Workout Duration & Progress */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-text uppercase tracking-wider text-[9px]">Today's Progress</span>
                  <span className="font-orbitron font-bold text-white">
                    {Math.min(liveTracker.currentDuration + Math.floor(elapsedSeconds / 60), liveTracker.targetDuration)} / {liveTracker.targetDuration} Min
                  </span>
                </div>
                <div className="w-full h-2 bg-white/5 border border-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-neon-red to-neon-orange" 
                    style={{ 
                      width: `${Math.min(((liveTracker.currentDuration + (elapsedSeconds / 60)) / liveTracker.targetDuration) * 100, 100)}%` 
                    }}
                  />
                </div>
              </div>

              {/* Stat card extra badge */}
              <div className="absolute -bottom-6 -right-6 glass-panel border border-white/10 px-4 py-3 rounded-2xl flex items-center gap-2.5 shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <div className="text-left">
                  <p className="font-orbitron text-[10px] font-bold text-white uppercase tracking-wider">{liveTracker.cardioDistance}</p>
                  <p className="text-[8px] text-gray-text uppercase tracking-widest">Cardio Completed</p>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>

      {/* Down arrow indicator */}
      <motion.div 
        className="absolute bottom-8 left-0 right-0 mx-auto w-fit z-10 hidden sm:flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        onClick={(e) => handleExploreClick(e, 'about')}
      >
        <span className="font-orbitron text-[9px] uppercase tracking-widest text-white">Scroll Down</span>
        <FaChevronDown className="text-neon-red text-sm" />
      </motion.div>

      <style>{`
        @keyframes beat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.12); }
          40% { transform: scale(1.05); }
          60% { transform: scale(1.18); }
        }
      `}</style>
    </section>
  );
}
