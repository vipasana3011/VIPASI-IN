'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function BackToTopButton() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-vipasi-wine text-vipasi-champagne hover:scale-105 active:scale-95 transition-transform duration-300 shadow-xl border border-vipasi-champagne/40"
    >
      {/* SVG Circular Progress Ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 52 52">
        <circle
          cx="26"
          cy="26"
          r={radius}
          fill="none"
          stroke="rgba(223, 193, 155, 0.2)"
          strokeWidth="2.5"
        />
        <motion.circle
          cx="26"
          cy="26"
          r={radius}
          fill="none"
          stroke="#DFC19B"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset }}
          transition={{ ease: 'easeOut', duration: 0.2 }}
        />
      </svg>

      {/* Needle & Stitch Thread Icon */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Needle pointing up */}
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center"
        >
          {/* Needle Eye */}
          <div className="w-1.5 h-3 border border-vipasi-champagne rounded-full bg-vipasi-wine flex items-center justify-center">
            <div className="w-0.5 h-1.5 bg-vipasi-champagne/70 rounded-full" />
          </div>
          {/* Needle Body */}
          <div className="w-0.5 h-4 bg-gradient-to-b from-vipasi-champagne via-vipasi-cream to-vipasi-champagne" />
          {/* Needle Point */}
          <div className="w-0 h-0 border-l-[1.5px] border-l-transparent border-r-[1.5px] border-r-transparent border-t-[3px] border-t-vipasi-champagne" />
        </motion.div>

        {/* Dynamic thread stitching upward */}
        <span className="text-[8px] font-sans font-bold tracking-widest text-vipasi-sand uppercase mt-0.5 group-hover:text-vipasi-champagne transition-colors">
          Top
        </span>
      </div>
    </button>
  );
}
