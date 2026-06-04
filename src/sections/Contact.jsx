import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaCheckCircle, FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';
import { contactContent } from '../data/gymContent';

export default function Contact() {
  const { tagline, title, headquarters, socialLinks, mapEmbedUrl } = contactContent;

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setIsSuccess(false);
      }, 6000);
    }, 2000);
  };

  return (
    <section 
      id="contact" 
      className="relative min-h-screen py-24 md:py-32 flex flex-col justify-center overflow-hidden bg-[#050505]"
    >
      {/* Background blobs */}
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

        {/* Contact Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Details & Map */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col gap-8 text-left"
          >
            {/* Quick Details Card */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/5 shadow-2xl flex flex-col gap-6">
              
              <h3 className="font-orbitron text-lg font-bold uppercase tracking-wider text-white border-l-2 border-neon-red pl-3">
                {headquarters.name}
              </h3>

              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-neon-red/10 border border-neon-red/20 flex items-center justify-center text-neon-red flex-shrink-0 mt-0.5">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h5 className="font-orbitron text-xs font-bold uppercase tracking-wider text-white">Location</h5>
                    <p className="font-inter text-xs sm:text-sm text-gray-text mt-1">
                      {headquarters.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-neon-orange/10 border border-neon-orange/20 flex items-center justify-center text-neon-orange flex-shrink-0 mt-0.5">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <h5 className="font-orbitron text-xs font-bold uppercase tracking-wider text-white">Phone Support</h5>
                    <p className="font-inter text-xs sm:text-sm text-gray-text mt-1">
                      {headquarters.phoneDirect} <br />
                      {headquarters.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-neon-red/10 border border-neon-red/20 flex items-center justify-center text-neon-red flex-shrink-0 mt-0.5">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h5 className="font-orbitron text-xs font-bold uppercase tracking-wider text-white">Email Contact</h5>
                    <p className="font-inter text-xs sm:text-sm text-gray-text mt-1">
                      {headquarters.emailSales} <br />
                      {headquarters.emailSupport}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-neon-orange/10 border border-neon-orange/20 flex items-center justify-center text-neon-orange flex-shrink-0 mt-0.5">
                    <FaClock />
                  </div>
                  <div>
                    <h5 className="font-orbitron text-xs font-bold uppercase tracking-wider text-white">Club Hours</h5>
                    <p className="font-inter text-xs sm:text-sm text-gray-text mt-1">
                      {headquarters.hoursWeekdays} <br />
                      {headquarters.hoursWeekends}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="flex gap-3 pt-4 border-t border-white/5">
                {[
                  { icon: <FaInstagram />, href: socialLinks.instagram, color: "hover:bg-neon-red hover:shadow-neon-red/30" },
                  { icon: <FaFacebookF />, href: socialLinks.facebook, color: "hover:bg-neon-orange hover:shadow-neon-orange/30" },
                  { icon: <FaTwitter />, href: socialLinks.twitter, color: "hover:bg-neon-red hover:shadow-neon-red/30" },
                  { icon: <FaYoutube />, href: socialLinks.youtube, color: "hover:bg-neon-orange hover:shadow-neon-orange/30" }
                ].map((social, sIdx) => (
                  <a
                    key={sIdx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white text-sm transition-all duration-300 ${social.color} cursor-pointer`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Embedded Google Map (Futuristic Dark filter applied) */}
            <div className="relative rounded-3xl overflow-hidden border border-white/5 shadow-2xl h-60 w-full bg-white/5">
              <iframe
                title="FitZone Gym Location Map"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "invert(90%) hue-rotate(180deg) grayscale(25%) contrast(120%) opacity(80%)"
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/5 shadow-2xl h-full flex flex-col justify-center text-left">
              
              <h3 className="font-orbitron text-xl font-bold uppercase tracking-wider text-white mb-6">
                Send Us a Message
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                
                {/* Name Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-orbitron text-xs uppercase tracking-wider text-gray-300">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 font-inter text-white text-sm focus:outline-none focus:bg-white/10 transition-all ${
                      errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-neon-red'
                    }`}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-[10px] font-semibold tracking-wide">{errors.name}</span>
                  )}
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-orbitron text-xs uppercase tracking-wider text-gray-300">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 font-inter text-white text-sm focus:outline-none focus:bg-white/10 transition-all ${
                      errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-neon-orange'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-[10px] font-semibold tracking-wide">{errors.email}</span>
                  )}
                </div>

                {/* Message Textarea */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="font-orbitron text-xs uppercase tracking-wider text-gray-300">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your fitness goals or inquiry..."
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 font-inter text-white text-sm focus:outline-none focus:bg-white/10 transition-all resize-none ${
                      errors.message ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-neon-red'
                    }`}
                  />
                  {errors.message && (
                    <span className="text-red-500 text-[10px] font-semibold tracking-wide">{errors.message}</span>
                  )}
                </div>

                {/* Submit Indicator */}
                <div className="mt-4">
                  <AnimatePresence mode="wait">
                    {isSuccess ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 p-4 rounded-xl text-green-400 text-sm font-medium animate-pulse"
                      >
                        <FaCheckCircle className="text-lg flex-shrink-0" />
                        <span>Message sent successfully! Our membership team will contact you shortly.</span>
                      </motion.div>
                    ) : (
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full font-orbitron text-xs font-bold uppercase tracking-wider py-4 bg-gradient-to-r from-neon-red to-neon-orange rounded-xl text-white shadow-lg border border-white/10 hover:shadow-neon-red/30 cursor-pointer flex items-center justify-center gap-2.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <FaPaperPlane className="text-[10px]" />
                          </>
                        )}
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>

              </form>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
