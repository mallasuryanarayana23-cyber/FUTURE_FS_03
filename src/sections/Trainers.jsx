import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter, FaFacebookF, FaEnvelope } from 'react-icons/fa';
import { trainersContent } from '../data/gymContent';

export default function Trainers() {
  const { tagline, title, list } = trainersContent;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section 
      id="trainers" 
      className="relative min-h-screen py-24 md:py-32 flex flex-col justify-center overflow-hidden bg-[#050505]"
    >
      {/* Background Neon Glow Blobs */}
      <div className="absolute left-0 bottom-1/4 w-[400px] h-[400px] bg-neon-orange/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-neon-red/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <span className="font-orbitron text-xs font-bold uppercase tracking-widest text-neon-red mb-2 block">
            {tagline}
          </span>
          <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-wide text-white leading-none">
            {title.split(' ')[0]} {title.split(' ')[1]} <span className="text-gradient-neon">{title.split(' ').slice(2).join(' ')}</span>
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-neon-red to-neon-orange mt-6" />
        </div>

        {/* Trainers Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {list.map((trainer, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="group relative rounded-3xl overflow-hidden glass-panel border border-white/5 shadow-2xl flex flex-col justify-between"
            >
              {/* Photo Box */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img 
                  src={trainer.image} 
                  alt={trainer.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85" />

                {/* Sliding Social Icons Overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                  <motion.a 
                    href={trainer.socials.instagram}
                    whileHover={{ scale: 1.15, backgroundColor: "#ff2a2a" }}
                    className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white text-base transition-colors duration-300 cursor-pointer"
                    aria-label={`${trainer.name} Instagram`}
                  >
                    <FaInstagram />
                  </motion.a>
                  <motion.a 
                    href={trainer.socials.twitter}
                    whileHover={{ scale: 1.15, backgroundColor: "#ff6a00" }}
                    className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white text-base transition-colors duration-300 cursor-pointer"
                    aria-label={`${trainer.name} Twitter`}
                  >
                    <FaTwitter />
                  </motion.a>
                  <motion.a 
                    href={trainer.socials.facebook}
                    whileHover={{ scale: 1.15, backgroundColor: "#ff2a2a" }}
                    className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white text-base transition-colors duration-300 cursor-pointer"
                    aria-label={`${trainer.name} Facebook`}
                  >
                    <FaFacebookF />
                  </motion.a>
                  <motion.a 
                    href={`mailto:${trainer.socials.email}`}
                    whileHover={{ scale: 1.15, backgroundColor: "#ff6a00" }}
                    className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white text-base transition-colors duration-300 cursor-pointer"
                    aria-label={`${trainer.name} Email`}
                  >
                    <FaEnvelope />
                  </motion.a>
                </div>
              </div>

              {/* Details footer */}
              <div className="p-6 text-left relative bg-black/20 border-t border-white/5">
                <span className="text-[10px] font-orbitron font-bold uppercase tracking-widest text-neon-red mb-1 block">
                  {trainer.specialty}
                </span>

                <h4 className="font-orbitron text-lg font-extrabold text-white mb-4">
                  {trainer.name}
                </h4>

                {/* Skill Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {trainer.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="px-2 py-0.5 border border-white/5 bg-white/5 rounded-md font-inter text-[9px] font-semibold text-gray-text uppercase tracking-wider"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
