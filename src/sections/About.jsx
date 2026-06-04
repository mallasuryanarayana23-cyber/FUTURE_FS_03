import React from 'react';
import { motion } from 'framer-motion';
import { FaAward, FaTrophy, FaUsers, FaCheckCircle } from 'react-icons/fa';
import Counter from '../components/Counter';
import { aboutContent } from '../data/gymContent';

export default function About() {
  const { tagline, titleLine1, titleLine2, description, features, stats, images } = aboutContent;

  const statIcons = [<FaAward />, <FaTrophy />, <FaUsers />];

  const textVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const imageContainerVariants = {
    hidden: { opacity: 0, x: -40, scale: 0.96 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section 
      id="about" 
      className="relative min-h-screen py-24 md:py-32 flex items-center justify-center overflow-hidden bg-[#070707]"
    >
      {/* Background Glow */}
      <div className="absolute right-0 bottom-1/4 w-[500px] h-[500px] bg-neon-orange/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute left-0 top-1/4 w-[400px] h-[400px] bg-neon-red/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full relative z-10">
        
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          
          {/* Left Column: Stacked Images */}
          <motion.div 
            variants={imageContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 relative flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-[4/5]">
              <div className="absolute -inset-3 rounded-2xl border border-neon-red/20 pointer-events-none" />
              
              {/* Primary Image */}
              <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent opacity-40 z-10" />
                <img 
                  src={images.primary} 
                  alt="FitZone strength gym floor" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Overlapping Secondary Image */}
              <motion.div 
                className="absolute -bottom-8 -right-4 sm:-right-10 w-1/2 sm:w-2/3 aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#070707] shadow-2xl z-20 group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                <img 
                  src={images.secondary} 
                  alt="FitZone personal conditioning zone" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>

              {/* Luxury Badge */}
              <div className="absolute -top-6 -left-6 glass-panel border border-neon-red/30 p-4 rounded-2xl shadow-xl hidden sm:flex items-center gap-3 max-w-[160px] animate-pulse">
                <FaTrophy className="text-2xl text-neon-orange flex-shrink-0" />
                <p className="font-orbitron text-[10px] font-black uppercase text-white tracking-wider leading-snug">
                  PREMIUM QUALITY
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Copy Details */}
          <motion.div 
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 text-left flex flex-col justify-center"
          >
            {/* Tagline */}
            <span className="font-orbitron text-xs font-bold uppercase tracking-widest text-neon-red mb-2 block">
              {tagline}
            </span>

            {/* Heading */}
            <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-wide text-white leading-none mb-6">
              {titleLine1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-red to-neon-orange text-glow-red">
                {titleLine2}
              </span>
            </h2>

            {/* Description */}
            <p className="font-inter text-sm sm:text-base text-gray-text leading-relaxed mb-8">
              {description}
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {features.map((feat, index) => (
                <div key={index} className="flex items-start gap-3">
                  <FaCheckCircle className="text-neon-orange text-sm flex-shrink-0 mt-1" />
                  <span className="font-inter text-xs sm:text-sm text-gray-300 font-medium">
                    {feat}
                  </span>
                </div>
              ))}
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-white/10">
              {stats.map((stat, i) => (
                <div 
                  key={i} 
                  className="glass-panel bg-white/5 border border-white/5 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-lg hover:border-neon-red/30 transition-colors duration-300"
                >
                  <div className="text-neon-red text-lg mb-2">
                    {statIcons[i % statIcons.length]}
                  </div>
                  <h3 className="font-orbitron text-lg sm:text-2xl font-black text-white leading-none mb-1">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </h3>
                  <p className="font-inter text-[9px] sm:text-[10px] text-gray-text uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

          </motion.div>
          
        </div>

      </div>
    </section>
  );
}
