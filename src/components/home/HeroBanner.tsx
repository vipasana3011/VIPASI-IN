'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { heroSlides } from '@/config/hero';
import { ChevronDown, ArrowRight } from 'lucide-react';

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const slide = heroSlides[currentSlide];

  const scrollToCollections = () => {
    const el = document.getElementById('explore-collections') || document.getElementById('collections');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative w-screen h-screen h-[100svh] overflow-hidden bg-vipasi-wine -mt-20 z-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Full-Bleed Edge-to-Edge Image Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, clipPath: 'inset(0% 100% 0% 0%)' }}
          animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ opacity: 0, clipPath: 'inset(0% 0% 0% 100%)' }}
          transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Slow Ken Burns Zoom Effect */}
          <motion.div
            initial={{ scale: 1.0 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 7, ease: 'easeOut' }}
            className="relative w-full h-full"
          >
            {/* Desktop Image */}
            <img
              src={slide.desktopImage}
              alt={slide.alt}
              className="hidden sm:block w-full h-full object-cover object-top"
            />
            {/* Mobile Image */}
            <img
              src={slide.mobileImage}
              alt={slide.alt}
              className="block sm:hidden w-full h-full object-cover object-top"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Subtle Bottom Vignette for UI Indicators only */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/50 via-black/20 to-transparent pointer-events-none" />

      {/* Slide Progress Indicators (Top/Bottom) */}
      <div className="absolute top-28 sm:top-24 right-6 sm:right-10 z-20 flex items-center space-x-2">
        {heroSlides.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlide(idx)}
            className="group py-2 focus:outline-none"
            aria-label={`Go to slide ${idx + 1}`}
          >
            <div className="relative w-8 sm:w-12 h-1 bg-white/30 rounded-full overflow-hidden transition-all duration-300 group-hover:bg-white/50">
              {currentSlide === idx && (
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                  className="absolute inset-y-0 left-0 bg-vipasi-champagne rounded-full"
                />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Brand Editorial Overlay & Dual CTAs at Bottom-Center */}
      <div className="absolute bottom-10 sm:bottom-12 inset-x-0 z-20 flex flex-col items-center justify-center text-center px-4 space-y-3 sm:space-y-4">
        
        {/* Short Brand Headline */}
        <div className="space-y-1 max-w-xl">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-sans font-semibold text-vipasi-champagne drop-shadow-md">
            The Living Karigar Heritage
          </p>
          <h2 className="font-serif text-2xl sm:text-4xl text-white font-bold tracking-wide drop-shadow-md">
            Royal Silks & Handcrafted Kalidars
          </h2>
        </div>

        {/* Dual CTAs: Primary "Explore Collection" & Secondary "Shop New Arrivals" */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <Link
            href="/collections"
            className="group inline-flex items-center space-x-2 bg-vipasi-wine hover:bg-vipasi-wine-light text-vipasi-champagne px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-[11px] font-sans font-bold uppercase tracking-[0.22em] shadow-2xl border border-vipasi-champagne/40 backdrop-blur-md transition-all duration-300 hover:scale-105"
          >
            <span>Explore Collection</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/collections?category=new"
            className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/35 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-[11px] font-sans font-semibold uppercase tracking-[0.22em] shadow-lg border border-white/40 backdrop-blur-md transition-all duration-300 hover:scale-105"
          >
            <span>Shop New Arrivals</span>
          </Link>
        </div>

        {/* Thin Scroll Down Indicator */}
        <button
          onClick={scrollToCollections}
          className="hidden sm:flex flex-col items-center text-white/70 hover:text-white transition-colors cursor-pointer pt-1"
          aria-label="Scroll to collections"
        >
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <ChevronDown size={14} className="text-vipasi-champagne" />
          </motion.div>
        </button>
      </div>
    </section>
  );
}
