import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExpand, FaTimes } from 'react-icons/fa';
import { galleryContent } from '../data/gymContent';

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState(null);
  const { tagline, title, images } = galleryContent;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section 
      id="gallery" 
      className="relative min-h-screen py-24 md:py-32 flex flex-col justify-center overflow-hidden bg-[#050505]"
    >
      {/* Background Neon Blobs */}
      <div className="absolute right-0 bottom-1/4 w-[400px] h-[400px] bg-neon-orange/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-0 top-1/4 w-[400px] h-[400px] bg-neon-red/5 rounded-full blur-[120px] pointer-events-none" />

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

        {/* Masonry Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="masonry-grid"
        >
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              onClick={() => setSelectedImg(img)}
              className={`group relative rounded-3xl overflow-hidden border border-white/5 shadow-2xl cursor-pointer ${img.layout}`}
            >
              {/* Image */}
              <img 
                src={img.src} 
                alt={img.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />

              {/* Dark Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left" />

              {/* Hover Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-3 group-hover:translate-y-0 pointer-events-none">
                <div className="self-end w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white">
                  <FaExpand className="text-xs" />
                </div>
                
                <div className="text-left">
                  <span className="font-orbitron text-[9px] font-bold uppercase tracking-widest text-neon-red px-2 py-0.5 border border-neon-red/30 bg-neon-red/10 rounded-md block w-fit mb-2">
                    {img.category}
                  </span>
                  <h4 className="font-orbitron text-base font-extrabold text-white uppercase tracking-wider">
                    {img.title}
                  </h4>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 w-full h-full bg-black/95 z-50 flex items-center justify-center p-6 md:p-12 cursor-zoom-out"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center text-xl border border-white/10 transition-colors cursor-pointer"
              aria-label="Close image"
            >
              <FaTimes />
            </button>

            {/* Photo Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()} // prevent closing on click
              className="relative max-w-5xl max-h-[80vh] rounded-3xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl cursor-default"
            >
              <img 
                src={selectedImg.src} 
                alt={selectedImg.title} 
                className="w-full h-full max-h-[80vh] object-contain"
              />
              
              {/* Bottom tag details */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 text-left flex justify-between items-end flex-wrap gap-4">
                <div>
                  <span className="font-orbitron text-[9px] font-bold uppercase tracking-widest text-neon-red px-2.5 py-1 border border-neon-red/30 bg-neon-red/10 rounded-md inline-block mb-2">
                    {selectedImg.category}
                  </span>
                  <h3 className="font-orbitron text-lg sm:text-xl font-black text-white uppercase tracking-wider">
                    {selectedImg.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedImg(null)}
                  className="font-orbitron text-xs font-bold uppercase tracking-wider px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/10 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
