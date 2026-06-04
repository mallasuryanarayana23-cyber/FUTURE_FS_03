import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// Core Components
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import ParticlesBg from './components/ParticlesBg';
import Navbar from './components/Navbar';
import WhatsAppButton from './components/WhatsAppButton';

// Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Programs from './sections/Programs';
import Pricing from './sections/Pricing';
import Trainers from './sections/Trainers';
import BMICalculator from './sections/BMICalculator';
import Gallery from './sections/Gallery';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Cinematic Load Screen */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Loader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main App Content - rendered in dark premium theme */}
      {!isLoading && (
        <div className="relative min-h-screen bg-dark-bg text-white overflow-x-hidden selection:bg-neon-red selection:text-white">
          
          {/* Futuristic Interactive Background Elements */}
          <ParticlesBg />
          <CustomCursor />
          
          {/* Header Sticky Navbar */}
          <Navbar />

          {/* Landing Sections */}
          <main>
            <Hero />
            <About />
            <Programs />
            <Pricing />
            <Trainers />
            <BMICalculator />
            <Gallery />
            <Testimonials />
            <Contact />
          </main>

          {/* Footer Component */}
          <Footer />

          {/* Floating WhatsApp Action Button */}
          <WhatsAppButton />

        </div>
      )}
    </>
  );
}
