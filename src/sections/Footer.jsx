import React, { useState } from 'react';
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaPaperPlane, FaCheckCircle, FaArrowUp } from 'react-icons/fa';
import { footerContent, contactContent } from '../data/gymContent';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const { brandDescription, quickLinks } = footerContent;
  const { socialLinks } = contactContent;

  const handleSubscribe = (e) => {
    e.preventDefault();
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    } else if (!emailRegex.test(email)) {
      setError('Please enter a valid email.');
      return;
    }

    setSuccess(true);
    setEmail('');
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleLinkClick = (e, id) => {
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
    <footer className="relative bg-[#030303] border-t border-white/5 pt-16 pb-8 overflow-hidden">
      
      {/* Background Neon Glow Blob */}
      <div className="absolute right-1/4 bottom-0 w-[300px] h-[300px] bg-neon-red/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12 text-left">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <a 
              href="#home" 
              onClick={(e) => handleLinkClick(e, 'home')}
              className="font-orbitron text-2xl font-black tracking-wider flex items-center gap-1 w-fit cursor-pointer"
            >
              <span className="text-white">FIT</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-red to-neon-orange text-glow-red">ZONE</span>
            </a>
            <p className="font-inter text-xs sm:text-sm text-gray-text leading-relaxed max-w-sm">
              {brandDescription}
            </p>
            <div className="flex gap-3 mt-2">
              {[
                { icon: <FaInstagram />, href: socialLinks.instagram },
                { icon: <FaFacebookF />, href: socialLinks.facebook },
                { icon: <FaTwitter />, href: socialLinks.twitter },
                { icon: <FaYoutube />, href: socialLinks.youtube }
              ].map((social, sIdx) => (
                <a
                  key={sIdx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/10 bg-white/5 hover:bg-neon-red text-white flex items-center justify-center text-xs transition-colors duration-300 cursor-pointer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-orbitron text-xs font-bold uppercase tracking-wider text-white mb-4 border-l-2 border-neon-red pl-2.5">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link, lIdx) => (
                <li key={lIdx}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    className="font-inter text-xs sm:text-sm text-gray-text hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Short Programs */}
          <div className="lg:col-span-2">
            <h4 className="font-orbitron text-xs font-bold uppercase tracking-wider text-white mb-4 border-l-2 border-neon-orange pl-2.5">
              Programs
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                'Strength & Hypertrophy',
                'Metabolic Conditioning',
                'Cardiovascular Stamina',
                'Yoga & Flexibility',
                'Personal Coaching',
                'Elite CrossFit'
              ].map((prog, pIdx) => (
                <li key={pIdx}>
                  <a
                    href="#programs"
                    onClick={(e) => handleLinkClick(e, 'programs')}
                    className="font-inter text-xs sm:text-sm text-gray-text hover:text-white transition-colors cursor-pointer"
                  >
                    {prog}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter Sign-up */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h4 className="font-orbitron text-xs font-bold uppercase tracking-wider text-white border-l-2 border-neon-red pl-2.5">
              Newsletter
            </h4>
            <p className="font-inter text-xs sm:text-sm text-gray-text leading-relaxed">
              Subscribe to receive weekly training guides, nutrition insights, and exclusive club announcements.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="flex bg-white/5 rounded-xl border border-white/10 p-1 focus-within:border-neon-red transition-all">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 bg-transparent px-3.5 py-2 font-inter text-white text-xs focus:outline-none placeholder-gray-600"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-neon-red to-neon-orange rounded-lg text-white font-orbitron text-[10px] font-bold uppercase tracking-wider hover:opacity-95 transition-opacity flex items-center justify-center cursor-pointer"
                  aria-label="Subscribe"
                >
                  <FaPaperPlane />
                </button>
              </div>
              {error && <span className="text-red-500 text-[10px] font-bold tracking-wide mt-1">{error}</span>}
              {success && (
                <div className="flex items-center gap-1.5 text-green-400 text-[10px] font-bold mt-1">
                  <FaCheckCircle />
                  <span>Subscribed successfully! Welcome to FitZone.</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-white/5 mb-8" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          
          {/* Copyright details */}
          <div className="flex flex-col md:flex-row items-center gap-1.5 md:gap-4">
            <p className="font-inter text-[10px] sm:text-xs text-gray-text">
              &copy; {new Date().getFullYear()} FitZone Gym. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="font-inter text-[10px] sm:text-xs text-gray-text hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="font-inter text-[10px] sm:text-xs text-gray-text hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={handleScrollToTop}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-neon-red/40 hover:bg-white/10 text-white flex items-center justify-center text-sm transition-all duration-300 shadow-md cursor-pointer hover:-translate-y-1 active:scale-95"
            aria-label="Scroll to top"
          >
            <FaArrowUp />
          </button>

        </div>

      </div>
    </footer>
  );
}
