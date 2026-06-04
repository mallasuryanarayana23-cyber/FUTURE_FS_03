import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/15555555555" // simulated WhatsApp business link
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25d366] rounded-full flex items-center justify-center text-white text-3xl shadow-2xl hover:bg-[#20ba5a] hover:scale-110 active:scale-95 transition-all duration-300 group border border-white/10"
      aria-label="Chat on WhatsApp"
    >
      {/* Pulse Rings */}
      <span className="absolute -inset-1 rounded-full bg-[#25d366] opacity-40 animate-ping group-hover:animate-none pointer-events-none" />
      <span className="absolute -inset-2 rounded-full bg-[#25d366] opacity-10 animate-pulse pointer-events-none" />
      
      <FaWhatsapp className="relative z-10" />
    </a>
  );
}
