import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { testimonialsContent } from '../data/gymContent';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const { tagline, title, list } = testimonialsContent;

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [index, list.length]);

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? list.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev === list.length - 1 ? 0 : prev + 1));
  };

  // Direction-aware sliding animations
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.96
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
    },
    exit: (dir) => ({
      x: dir < 0 ? 120 : -120,
      opacity: 0,
      scale: 0.96,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <section 
      id="testimonials" 
      className="relative min-h-screen py-24 md:py-32 flex flex-col justify-center overflow-hidden bg-[#070707]"
    >
      {/* Background Neon Glow Blobs */}
      <div className="absolute left-0 bottom-1/4 w-[400px] h-[400px] bg-neon-red/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-neon-orange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-8 w-full relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="font-orbitron text-xs font-bold uppercase tracking-widest text-neon-red mb-2 block">
            {tagline}
          </span>
          <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-wide text-white leading-none">
            {title.split(' ')[0]} {title.split(' ')[1]} <span className="text-gradient-neon">{title.split(' ').slice(2).join(' ')}</span>
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-neon-red to-neon-orange mt-6" />
        </div>

        {/* Carousel Slider */}
        <div className="relative w-full min-h-[350px] sm:min-h-[280px] flex items-center justify-center">
          
          {/* Main Card Container */}
          <div className="w-full relative overflow-hidden p-2">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="glass-panel rounded-3xl p-8 sm:p-10 border border-white/5 shadow-2xl flex flex-col md:flex-row gap-8 items-center text-left"
              >
                {/* Client Avatar */}
                <div className="relative flex-shrink-0 w-24 h-24 rounded-full p-1 border-2 border-neon-red/40 bg-black/40">
                  <img 
                    src={list[index].image} 
                    alt={list[index].name} 
                    className="w-full h-full object-cover rounded-full" 
                  />
                  <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-neon-red to-neon-orange flex items-center justify-center text-white text-[10px] shadow-lg border border-white/10">
                    <FaQuoteLeft />
                  </div>
                </div>

                {/* Review Text */}
                <div className="flex flex-col gap-4 w-full">
                  
                  {/* Star Rating */}
                  <div className="flex gap-1 text-neon-orange">
                    {[...Array(list[index].rating)].map((_, i) => (
                      <FaStar key={i} className="text-sm" />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="font-inter text-sm sm:text-base text-gray-200 leading-relaxed italic">
                    "{list[index].text}"
                  </p>

                  {/* Author Details */}
                  <div className="mt-2">
                    <h4 className="font-orbitron text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                      {list[index].name}
                    </h4>
                    <p className="text-[10px] sm:text-xs font-orbitron font-bold uppercase tracking-widest text-neon-red mt-0.5">
                      {list[index].role}
                    </p>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Carousel Navigation Controls */}
        <div className="flex items-center gap-6 mt-10">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center text-base transition-all cursor-pointer hover:border-neon-red/50 hover:shadow-neon-red/10 active:scale-95"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft />
          </button>
          
          {/* Slide Indicator dots */}
          <div className="flex gap-2">
            {list.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => {
                  setDirection(dotIdx > index ? 1 : -1);
                  setIndex(dotIdx);
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  dotIdx === index ? 'w-6 bg-neon-red' : 'w-2 bg-white/20'
                }`}
                aria-label={`Go to slide ${dotIdx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center text-base transition-all cursor-pointer hover:border-neon-orange/50 hover:shadow-neon-orange/10 active:scale-95"
            aria-label="Next testimonial"
          >
            <FaChevronRight />
          </button>
        </div>

      </div>
    </section>
  );
}
