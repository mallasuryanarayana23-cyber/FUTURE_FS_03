import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu as MenuIcon, FiX as CloseIcon } from 'react-icons/fi';
import { footerContent } from '../data/gymContent';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  const { quickLinks: navItems } = footerContent;

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const scrollPosition = window.scrollY + 120;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const handleClick = (e, id) => {
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
      setIsOpen(false);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled 
          ? 'glass-panel-heavy py-4 shadow-lg border-b border-white/5' 
          : 'bg-transparent py-6'
      }`}>
        {/* Scroll Progress line */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-white/5">
          <motion.div 
            className="h-full bg-gradient-to-r from-neon-red to-neon-orange shadow-[0_0_8px_#ff2a2a]"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleClick(e, 'home')}
            className="font-orbitron text-2xl font-black tracking-wider flex items-center gap-1 group cursor-pointer"
          >
            <span className="text-white group-hover:text-neon-red transition-colors duration-300">FIT</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-red to-neon-orange text-glow-red">ZONE</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`font-orbitron text-xs font-semibold uppercase tracking-wider relative py-1 transition-colors duration-300 cursor-pointer ${
                  activeSection === item.id 
                    ? 'text-neon-red text-glow-red' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div 
                    layoutId="activeDot"
                    className="absolute -bottom-1.5 left-0 right-0 mx-auto w-1 h-1 rounded-full bg-neon-red shadow-[0_0_6px_#ff2a2a]"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleClick(e, 'contact')}
              className="font-orbitron text-xs font-bold uppercase tracking-wider px-5 py-2.5 bg-gradient-to-r from-neon-red to-neon-orange rounded-full text-white shadow-lg hover:shadow-neon-red/30 transform hover:-translate-y-0.5 hover:scale-105 transition-all duration-300 border border-white/10 cursor-pointer"
            >
              Join Now
            </a>
          </div>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white hover:text-neon-red text-2xl focus:outline-none transition-colors duration-300 z-50 p-2 cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 right-0 w-full md:w-80 h-full glass-panel-heavy z-30 shadow-2xl flex flex-col p-8 pt-24 border-l border-white/5"
          >
            <div className="flex flex-col space-y-6 text-left">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={`font-orbitron text-lg font-bold uppercase tracking-wider transition-colors duration-300 cursor-pointer ${
                    activeSection === item.id 
                      ? 'text-neon-red text-glow-red border-l-2 border-neon-red pl-4' 
                      : 'text-gray-300 hover:text-white pl-4'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleClick(e, 'contact')}
                className="font-orbitron text-sm font-bold uppercase text-center tracking-wider py-4 bg-gradient-to-r from-neon-red to-neon-orange rounded-md text-white shadow-lg border border-white/10 hover:shadow-neon-red/30 transition-all duration-300 cursor-pointer"
              >
                Join Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
