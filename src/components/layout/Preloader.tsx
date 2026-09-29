'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if already shown in this session
    const hasLoaded = sessionStorage.getItem('vipasi_preloaded');
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem('vipasi_preloaded', 'true');
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: [0.77, 0, 0.175, 1] },
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-vipasi-wine overflow-hidden"
        >
          {/* Left Curtain */}
          <motion.div
            initial={{ x: '0%' }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
            className="absolute inset-y-0 left-0 w-1/2 bg-vipasi-wine border-r border-vipasi-champagne/30"
          />

          {/* Right Curtain */}
          <motion.div
            initial={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
            className="absolute inset-y-0 right-0 w-1/2 bg-vipasi-wine border-l border-vipasi-champagne/30"
          />

          {/* Center Brand Identity */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center justify-center p-6 text-center"
          >
            {/* Rotating Gold Star */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'linear' }}
              className="text-vipasi-champagne text-2xl mb-3"
            >
              ✦
            </motion.div>

            {/* Real Logo Image */}
            <div className="w-56 sm:w-72 max-w-xs mb-3">
              <img
                src="/brand/logo-gold.png"
                alt="VIPASI"
                className="w-full h-auto object-contain"
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-[10px] uppercase tracking-[0.35em] text-vipasi-champagne font-sans font-medium"
            >
              Handcrafted Heritage
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
