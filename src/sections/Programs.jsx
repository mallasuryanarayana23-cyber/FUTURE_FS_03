import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDumbbell, FaFire, FaRunning, FaSpa, FaUserCheck, FaBolt, FaArrowRight, FaTimes } from 'react-icons/fa';
import { programsContent } from '../data/gymContent';

export default function Programs() {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const { tagline, title, list } = programsContent;

  const programDetails = [
    { 
      icon: <FaDumbbell />, 
      color: "from-neon-red to-red-500", 
      accent: "rgba(255, 42, 42, 0.15)",
      intensity: "High (4/5)",
      duration: "60 Mins",
      target: "Muscle Growth & Strength",
      coach: "Marcus Steele",
      schedule: "Mon, Wed, Fri at 8:00 AM & 6:00 PM"
    },
    { 
      icon: <FaFire />, 
      color: "from-neon-orange to-amber-500", 
      accent: "rgba(255, 106, 0, 0.15)",
      intensity: "Max (5/5)",
      duration: "45 Mins",
      target: "Fat Burn & VO2 Max Boost",
      coach: "Viktor Vance",
      schedule: "Tue, Thu, Sat at 7:00 AM & 5:00 PM"
    },
    { 
      icon: <FaRunning />, 
      color: "from-blue-500 to-cyan-500", 
      accent: "rgba(59, 130, 246, 0.15)",
      intensity: "Medium (3/5)",
      duration: "50 Mins",
      target: "Stamina & Aerobic Limits",
      coach: "Viktor Vance",
      schedule: "Mon, Wed, Sat at 9:00 AM"
    },
    { 
      icon: <FaSpa />, 
      color: "from-emerald-500 to-teal-500", 
      accent: "rgba(16, 185, 129, 0.15)",
      intensity: "Low (2/5)",
      duration: "60 Mins",
      target: "Functional Range & Alignment",
      coach: "Elena Rostova",
      schedule: "Tue, Thu, Sun at 9:00 AM & 4:00 PM"
    },
    { 
      icon: <FaUserCheck />, 
      color: "from-purple-500 to-indigo-500", 
      accent: "rgba(139, 92, 246, 0.15)",
      intensity: "Bespoke / Variable",
      duration: "60 Mins",
      target: "Personal Targets & Biometrics",
      coach: "Sarah Jenkins & Marcus Steele",
      schedule: "By Appointment Only (Flexible)"
    },
    { 
      icon: <FaBolt />, 
      color: "from-neon-red to-neon-orange", 
      accent: "rgba(255, 42, 42, 0.2)",
      intensity: "Maximum (5/5)",
      duration: "60 Mins",
      target: "Gymnastics & Heavy Lifting Speed",
      coach: "Viktor Vance",
      schedule: "Mon to Sat at 7:00 PM"
    }
  ];

  const programsList = list.map((item, idx) => ({
    ...item,
    ...programDetails[idx % programDetails.length]
  }));

  const handleInquiry = (programName) => {
    setSelectedProgram(null);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = contactEl.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setTimeout(() => {
        const messageInput = document.getElementById('message');
        if (messageInput) {
          messageInput.value = `Hi, I am interested in inquiring about the "${programName}" training program. Please send me class scheduling and trainer availability details.`;
          messageInput.dispatchEvent(new Event('input', { bubbles: true }));
          messageInput.dispatchEvent(new Event('change', { bubbles: true }));
          messageInput.focus();
        }
      }, 750);
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section 
      id="programs" 
      className="relative min-h-screen py-10 md:py-14 flex flex-col justify-center overflow-hidden bg-[#050505]"
    >
      {/* Background Blobs */}
      <div className="absolute left-1/4 bottom-1/4 w-[350px] h-[350px] bg-neon-red/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute right-1/4 top-1/4 w-[350px] h-[350px] bg-neon-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full relative z-10">
        
        {/* Section Header with compressed margin */}
        <div className="text-center mb-8 flex flex-col items-center">
          <span className="font-orbitron text-xs font-bold uppercase tracking-widest text-neon-red mb-1.5 block">
            {tagline}
          </span>
          <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-wide text-white leading-none">
            {title.split(' ')[0]} {title.split(' ')[1]} <span className="text-gradient-neon">{title.split(' ').slice(2).join(' ')}</span>
          </h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-neon-red to-neon-orange mt-4" />
        </div>

        {/* Programs Grid - aspect-video removed, gap reduced to 5 */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {programsList.map((program, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              onClick={() => setSelectedProgram(program)}
              whileHover={{ 
                y: -6,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="group relative glass-panel rounded-2xl p-5 sm:p-6 border border-white/5 shadow-xl hover:border-neon-red/40 hover:shadow-neon-red/10 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              {/* Hover Radial Background */}
              <div 
                className="absolute -inset-full group-hover:inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ 
                  background: `radial-gradient(circle at 10% 20%, ${program.accent} 0%, transparent 50%)`
                }}
              />

              <div className="relative z-10 text-left">
                {/* Icon Box - reduced size */}
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${program.color} flex items-center justify-center text-white text-xl shadow-md mb-4 group-hover:scale-105 transition-transform duration-300 border border-white/10`}>
                  {program.icon}
                </div>

                {/* Title - reduced size */}
                <h3 className="font-orbitron text-sm sm:text-base font-bold uppercase tracking-wider text-white group-hover:text-neon-orange transition-colors duration-300 mb-2">
                  {program.title}
                </h3>

                {/* Description - reduced size & tighter line height */}
                <p className="font-inter text-[11px] sm:text-xs text-gray-text leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {program.description}
                </p>
              </div>

              {/* Action Link - reduced margin */}
              <button 
                type="button"
                className="relative z-10 mt-4 flex items-center gap-2 text-neon-red group-hover:text-neon-orange font-orbitron text-[9px] font-bold uppercase tracking-wider transition-colors duration-300 bg-transparent border-0 cursor-pointer p-0 text-left"
              >
                <span>Learn More</span>
                <FaArrowRight className="transform group-hover:translate-x-2 transition-transform duration-300" />
              </button>

            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Detailed Program Modal Overlay */}
      <AnimatePresence>
        {selectedProgram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProgram(null)}
            className="fixed inset-0 w-full h-full bg-black/90 z-50 flex items-center justify-center p-6 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()} 
              className="relative max-w-md w-full glass-panel-heavy rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl cursor-default text-left flex flex-col gap-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProgram(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center text-sm border border-white/10 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <FaTimes />
              </button>

              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedProgram.color} flex items-center justify-center text-white text-xl shadow-lg border border-white/5`}>
                  {selectedProgram.icon}
                </div>
                <div>
                  <span className="font-orbitron text-[9px] font-bold uppercase tracking-widest text-neon-red px-2 py-0.5 border border-neon-red/30 bg-neon-red/10 rounded-md block w-fit mb-1">
                    {selectedProgram.category}
                  </span>
                  <h3 className="font-orbitron text-lg sm:text-xl font-black text-white uppercase tracking-wider">
                    {selectedProgram.title}
                  </h3>
                </div>
              </div>

              <p className="font-inter text-xs sm:text-sm text-gray-300 leading-relaxed">
                {selectedProgram.description}
              </p>

              <div className="flex flex-col gap-3.5 bg-black/30 border border-white/5 rounded-2xl p-4 sm:p-5">
                <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2.5">
                  <span className="text-gray-text uppercase tracking-wider font-semibold text-[9px]">Class Intensity</span>
                  <span className="font-orbitron font-bold text-neon-orange">{selectedProgram.intensity}</span>
                </div>
                <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2.5">
                  <span className="text-gray-text uppercase tracking-wider font-semibold text-[9px]">Session Duration</span>
                  <span className="font-orbitron font-bold text-white">{selectedProgram.duration}</span>
                </div>
                <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2.5">
                  <span className="text-gray-text uppercase tracking-wider font-semibold text-[9px]">Training Focus</span>
                  <span className="font-orbitron font-bold text-white">{selectedProgram.target}</span>
                </div>
                <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2.5">
                  <span className="text-gray-text uppercase tracking-wider font-semibold text-[9px]">Class Coach</span>
                  <span className="font-orbitron font-bold text-white">{selectedProgram.coach}</span>
                </div>
                <div className="flex flex-col gap-1 text-xs pt-1">
                  <span className="text-gray-text uppercase tracking-wider font-semibold text-[9px] mb-1">Weekly Schedule</span>
                  <span className="font-inter text-xs text-gray-200">{selectedProgram.schedule}</span>
                </div>
              </div>

              <button
                onClick={() => handleInquiry(selectedProgram.title)}
                className="w-full font-orbitron text-xs font-bold uppercase tracking-wider py-4 bg-gradient-to-r from-neon-red to-neon-orange rounded-xl text-white shadow-lg border border-white/10 hover:shadow-neon-red/30 cursor-pointer flex items-center justify-center gap-2.5 transition-all duration-300"
              >
                <span>Inquire About Class</span>
                <FaArrowRight className="text-[10px]" />
              </button>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
