import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('a') || 
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.classList.contains('interactive');
      
      setHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);

    // Apply class to hide default cursor on desktop screens
    document.documentElement.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [cursorX, cursorY, visible]);

  if (!visible) return null;

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-2.5 h-2.5 bg-neon-red rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: hovered ? 1.5 : 1,
          backgroundColor: hovered ? '#ff6a00' : '#ff2a2a',
        }}
        transition={{ duration: 0.15 }}
      />
      {/* Outer Glow Ring */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 rounded-full border border-neon-red/40 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          width: hovered ? 56 : 32,
          height: hovered ? 56 : 32,
        }}
        animate={{
          borderColor: hovered ? 'rgba(255, 106, 0, 0.6)' : 'rgba(255, 42, 42, 0.4)',
          backgroundColor: hovered ? 'rgba(255, 106, 0, 0.05)' : 'rgba(255, 42, 42, 0)',
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 180 }}
      />
    </>
  );
}
