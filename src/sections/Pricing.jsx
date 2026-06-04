import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes, FaCrown } from 'react-icons/fa';
import { pricingContent } from '../data/gymContent';

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const { tagline, title, description, plans } = pricingContent;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const handlePriceClick = (e, id) => {
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

  return (
    <section 
      id="pricing" 
      className="relative min-h-screen py-12 md:py-16 flex flex-col justify-center overflow-hidden bg-[#070707]"
    >
      {/* Background Neon Blobs */}
      <div className="absolute right-0 bottom-1/4 w-[350px] h-[350px] bg-neon-red/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute left-0 top-1/4 w-[350px] h-[350px] bg-neon-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full relative z-10">
        
        {/* Section Header with reduced margin */}
        <div className="text-center mb-6 flex flex-col items-center">
          <span className="font-orbitron text-xs font-bold uppercase tracking-widest text-neon-red mb-1.5 block">
            {tagline}
          </span>
          <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-wide text-white leading-none">
            {title.split(' ')[0]} {title.split(' ')[1]} <span className="text-gradient-neon">{title.split(' ').slice(2).join(' ')}</span>
          </h2>
          <p className="font-inter text-xs text-gray-text max-w-md mt-2">
            {description}
          </p>
        </div>

        {/* Monthly / Yearly Toggle with reduced margin */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className={`font-orbitron text-[10px] uppercase tracking-wider transition-colors duration-300 ${!isYearly ? 'text-white font-bold' : 'text-gray-text'}`}>
            Monthly
          </span>
          <button 
            onClick={() => setIsYearly(!isYearly)}
            className="w-12 h-7 bg-white/5 border border-white/10 rounded-full p-0.5 relative focus:outline-none cursor-pointer flex items-center"
            aria-label="Toggle billing interval"
          >
            <motion.div 
              className="w-5 h-5 rounded-full bg-gradient-to-br from-neon-red to-neon-orange shadow-md"
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              style={{ x: isYearly ? '20px' : '0px' }}
            />
          </button>
          <span className={`font-orbitron text-[10px] uppercase tracking-wider transition-colors duration-300 flex items-center gap-1.5 ${isYearly ? 'text-white font-bold' : 'text-gray-text'}`}>
            <span>Yearly</span>
            <span className="px-1.5 py-0.5 bg-neon-red/10 border border-neon-red/30 text-neon-red font-orbitron text-[8px] font-black rounded-md tracking-wider">
              SAVE 20%
            </span>
          </span>
        </div>

        {/* Pricing Cards Grid with reduced gap and paddings */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
        >
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ 
                scale: plan.highlighted ? 1.025 : 1.01,
                y: -4,
                transition: { duration: 0.3 }
              }}
              className={`group relative rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 ${
                plan.highlighted 
                  ? 'glass-panel-heavy border-2 border-neon-red shadow-[0_0_20px_rgba(255,42,42,0.1)] z-20 md:-translate-y-2' 
                  : 'glass-panel border border-white/5 shadow-xl z-10'
              }`}
            >
              
              {/* Highlight Tag */}
              {plan.tag && (
                <div className={`absolute -top-3.5 left-0 right-0 mx-auto w-fit px-3 py-1 rounded-full font-orbitron text-[9px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1 border border-white/10 ${
                  plan.highlighted 
                    ? 'bg-gradient-to-r from-neon-red to-neon-orange text-white' 
                    : 'bg-white/10 text-white'
                }`}>
                  {plan.highlighted && <FaCrown className="text-[10px]" />}
                  <span>{plan.tag}</span>
                </div>
              )}

              {/* Card Body with compressed vertical spacings */}
              <div className="text-left">
                {/* Plan Title */}
                <h3 className={`font-orbitron text-base font-bold uppercase tracking-wider mb-1 ${
                  plan.name.includes("Elite") ? 'text-neon-orange text-glow-orange' : 'text-white'
                }`}>
                  {plan.name}
                </h3>
                
                {/* Description */}
                <p className="font-inter text-[11px] text-gray-text leading-snug mb-4">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="font-orbitron text-3xl sm:text-4xl font-black text-white">
                    ${isYearly ? plan.priceYearly : plan.priceMonthly}
                  </span>
                  <span className="font-inter text-[10px] text-gray-text uppercase tracking-wider">
                    / {isYearly ? 'yr' : 'mo'}
                  </span>
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-white/10 mb-4" />

                {/* Features Checklist with tight vertical spaces */}
                <ul className="flex flex-col gap-2.5 mb-6 text-left">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2">
                      {feat.available ? (
                        <span className={`w-4.5 h-4.5 rounded-full flex items-center justify-center text-[8px] border border-white/10 bg-white/5 ${
                          plan.highlighted ? 'text-neon-red' : 'text-neon-orange'
                        }`}>
                          <FaCheck />
                        </span>
                      ) : (
                        <span className="w-4.5 h-4.5 rounded-full flex items-center justify-center text-[8px] border border-white/5 bg-transparent text-gray-700">
                          <FaTimes />
                        </span>
                      )}
                      <span className={`font-inter text-xs ${
                        feat.available ? 'text-gray-200' : 'text-gray-600 line-through'
                      }`}>
                        {feat.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <a
                href="#contact"
                onClick={(e) => handlePriceClick(e, 'contact')}
                className={`w-full font-orbitron text-[10px] font-bold uppercase text-center tracking-wider py-3.5 rounded-lg shadow-lg transition-all duration-300 border cursor-pointer ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-neon-red to-neon-orange text-white border-white/20 hover:shadow-neon-red/40 transform hover:scale-102'
                    : 'bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-neon-orange/40 hover:shadow-neon-orange/10'
                }`}
              >
                {plan.buttonText}
              </a>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
