'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { FooterHotspot } from '@/config/footerScene';

interface HotspotDotProps {
  hotspot: FooterHotspot;
  isMobile?: boolean;
}

export default function HotspotDot({ hotspot, isMobile = false }: HotspotDotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const coords = isMobile ? hotspot.mobile : hotspot.desktop;

  return (
    <div
      className="absolute z-30 select-none"
      style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
      onMouseEnter={() => !isMobile && setIsOpen(true)}
      onMouseLeave={() => !isMobile && setIsOpen(false)}
    >
      {/* Outer Pulsing Golden Ripple Rings */}
      <div className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer">
        <motion.div
          animate={{ scale: [1, 2.3, 1], opacity: [0.75, 0, 0.75] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-8 h-8 rounded-full bg-vipasi-champagne/45 pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.6, 1], opacity: [0.95, 0.25, 0.95] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          className="absolute w-5 h-5 rounded-full bg-vipasi-champagne/65 pointer-events-none"
        />

        {/* Center Golden Jewel Pin Dot */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={`Learn about ${hotspot.name}`}
          className="relative w-4 h-4 rounded-full bg-gradient-to-tr from-vipasi-wine to-vipasi-wine-light border-2 border-vipasi-champagne shadow-xl flex items-center justify-center hover:scale-125 transition-transform"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-vipasi-champagne shadow-xs" />
        </button>
      </div>

      {/* Luxury Ivory Tooltip Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-3.5 w-60 sm:w-68 bg-[#FAF4E8]/98 backdrop-blur-md border border-vipasi-champagne/70 rounded-xl p-3.5 shadow-[0_15px_35px_rgba(62,11,16,0.22)] text-left pointer-events-auto"
          >
            {/* Top Eyebrow */}
            <div className="flex items-center space-x-1.5 mb-1">
              <Sparkles size={11} className="text-vipasi-wine flex-shrink-0" />
              <span className="text-[9px] uppercase tracking-[0.22em] text-vipasi-wine/80 font-bold font-sans">
                {hotspot.tagline}
              </span>
            </div>

            {/* Title */}
            <h4 className="font-serif text-sm font-semibold text-vipasi-charcoal tracking-wide">
              {hotspot.name}
            </h4>

            {/* Description */}
            <p className="text-[11px] text-vipasi-muted font-sans mt-1 leading-snug">
              {hotspot.description}
            </p>

            {/* Shop Craft Link */}
            <div className="mt-2.5 pt-2 border-t border-vipasi-champagne/30 flex items-center justify-between">
              <Link
                href={hotspot.link}
                className="inline-flex items-center space-x-1 text-[10px] font-sans font-semibold uppercase tracking-wider text-vipasi-wine hover:text-vipasi-terracotta transition-colors group"
              >
                <span>Shop the craft</span>
                <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <span className="text-[8px] uppercase tracking-widest text-vipasi-wine/50 font-bold">VIPASI</span>
            </div>

            {/* Pointing triangle below card */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2.5 h-2.5 bg-[#FAF4E8] rotate-45 border-r border-b border-vipasi-champagne/70" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
