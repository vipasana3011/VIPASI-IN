'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface KarigarLineArtProps {
  side: 'left' | 'right';
  className?: string;
}

export default function KarigarLineArt({ side, className = '' }: KarigarLineArtProps) {
  if (side === 'left') {
    return (
      <div className={`flex flex-col items-center justify-around space-y-12 select-none pointer-events-none ${className}`}>
        {/* 1. Embroidery Hoop with Stitching Needle */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
            {/* Outer wooden hoop ring */}
            <circle cx="60" cy="60" r="46" fill="none" stroke="#C5A059" strokeWidth="3" opacity="0.85" />
            <circle cx="60" cy="60" r="49" fill="none" stroke="#A78035" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
            {/* Tightening screw clamp */}
            <rect x="56" y="6" width="8" height="6" rx="1.5" fill="#C5A059" />
            <line x1="53" y1="9" x2="67" y2="9" stroke="#876020" strokeWidth="2" />

            {/* Inner stretched sheer cloth texture */}
            <circle cx="60" cy="60" r="44" fill="#FAF4E8" fillOpacity="0.4" />

            {/* Floral Motif being actively stitched (stroke-dashoffset loop) */}
            <motion.path
              d="M 60 40 C 66 48, 74 54, 80 60 C 74 66, 66 72, 60 80 C 54 72, 46 66, 40 60 C 46 54, 54 48, 60 40 Z M 60 52 C 63 56, 68 58, 60 68 C 52 58, 57 56, 60 52 Z"
              fill="none"
              stroke="#8B2635"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="200"
              initial={{ strokeDashoffset: 200 }}
              animate={{ strokeDashoffset: [200, 0, 0, 200] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Animated Needle */}
            <motion.g
              animate={{
                x: [0, 8, -4, 6, 0],
                y: [0, -6, 8, -2, 0],
                rotate: [0, 15, -10, 12, 0],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Needle Body */}
              <line x1="72" y1="52" x2="88" y2="40" stroke="#DFC19B" strokeWidth="2" strokeLinecap="round" />
              {/* Gold Thread from Needle Eye */}
              <path d="M 88 40 Q 94 36 98 42 T 104 38" fill="none" stroke="#C5A059" strokeWidth="1.2" strokeDasharray="2 2" />
            </motion.g>
          </svg>
          <span className="absolute -bottom-5 text-[9px] uppercase tracking-[0.25em] text-vipasi-wine/60 font-sans font-medium whitespace-nowrap">
            Aari & Zari Needlework
          </span>
        </div>

        {/* 2. Loom Shuttle sliding back and forth */}
        <div className="relative w-44 h-16 flex items-center justify-center">
          <svg viewBox="0 0 180 50" className="w-full h-full">
            {/* Warp threads guiding line */}
            <line x1="10" y1="25" x2="170" y2="25" stroke="#C5A059" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
            
            {/* Gliding Wooden Shuttle */}
            <motion.g
              animate={{
                x: [-28, 28, -28],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* Shuttle boat body */}
              <path
                d="M 60 25 C 70 18, 110 18, 120 25 C 110 32, 70 32, 60 25 Z"
                fill="#C5A059"
                fillOpacity="0.85"
                stroke="#8C6527"
                strokeWidth="1.5"
              />
              {/* Bobbin opening */}
              <ellipse cx="90" cy="25" rx="16" ry="4" fill="#FAF4E8" />
              {/* Silk pirn bobbin */}
              <ellipse cx="90" cy="25" rx="12" ry="2.5" fill="#8B2635" />
              {/* Thread trailing out */}
              <path d="M 90 25 Q 75 14 55 20" fill="none" stroke="#C5A059" strokeWidth="1.2" />
            </motion.g>
          </svg>
          <span className="absolute -bottom-4 text-[9px] uppercase tracking-[0.25em] text-vipasi-wine/60 font-sans font-medium whitespace-nowrap">
            Handloom Pit-Loom Shuttle
          </span>
        </div>
      </div>
    );
  }

  // Right Side: Spool unwinding thread + Fluttering Dupatta
  return (
    <div className={`flex flex-col items-center justify-around space-y-12 select-none pointer-events-none ${className}`}>
      {/* 3. Spool with silk thread unwinding */}
      <div className="relative w-36 h-36 flex items-center justify-center">
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-sm">
          {/* Spool Flanges */}
          <rect x="36" y="24" width="48" height="8" rx="3" fill="#C5A059" opacity="0.85" />
          <rect x="36" y="88" width="48" height="8" rx="3" fill="#C5A059" opacity="0.85" />
          <line x1="60" y1="18" x2="60" y2="102" stroke="#8C6527" strokeWidth="2.5" strokeLinecap="round" />

          {/* Wound Gold Silk Thread Body */}
          <rect x="42" y="32" width="36" height="56" rx="2" fill="#8B2635" />
          {/* Shimmer thread lines */}
          <line x1="42" y1="42" x2="78" y2="42" stroke="#C5A059" strokeWidth="1" opacity="0.7" />
          <line x1="42" y1="52" x2="78" y2="52" stroke="#DFC19B" strokeWidth="1" opacity="0.9" />
          <line x1="42" y1="62" x2="78" y2="62" stroke="#C5A059" strokeWidth="1" opacity="0.7" />
          <line x1="42" y1="72" x2="78" y2="72" stroke="#DFC19B" strokeWidth="1" opacity="0.9" />

          {/* Unwinding flowing thread wave */}
          <motion.path
            d="M 78 72 C 92 70, 95 86, 110 82 C 120 78, 125 90, 135 88"
            fill="none"
            stroke="#C5A059"
            strokeWidth="1.8"
            strokeLinecap="round"
            animate={{
              d: [
                'M 78 72 C 92 70, 95 86, 110 82 C 120 78, 125 90, 135 88',
                'M 78 72 C 96 76, 92 68, 108 76 C 118 84, 128 82, 135 88',
                'M 78 72 C 92 70, 95 86, 110 82 C 120 78, 125 90, 135 88',
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
        <span className="absolute -bottom-5 text-[9px] uppercase tracking-[0.25em] text-vipasi-wine/60 font-sans font-medium whitespace-nowrap">
          Varanasi Katan Silk Yarn
        </span>
      </div>

      {/* 4. Fluttering Chanderi Dupatta */}
      <div className="relative w-44 h-24 flex items-center justify-center">
        <svg viewBox="0 0 160 80" className="w-full h-full">
          {/* Sinuous fluttering sheer scarf / dupatta */}
          <motion.path
            d="M 15 25 Q 45 10 75 35 T 145 20 L 140 45 Q 110 30 80 55 T 10 40 Z"
            fill="url(#dupattaGoldGrad)"
            fillOpacity="0.45"
            stroke="#C5A059"
            strokeWidth="1.2"
            animate={{
              d: [
                'M 15 25 Q 45 10 75 35 T 145 20 L 140 45 Q 110 30 80 55 T 10 40 Z',
                'M 15 32 Q 45 45 75 22 T 145 35 L 140 60 Q 110 45 80 38 T 10 52 Z',
                'M 15 25 Q 45 10 75 35 T 145 20 L 140 45 Q 110 30 80 55 T 10 40 Z',
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Subtle Gota patti borders on dupatta */}
          <motion.path
            d="M 15 25 Q 45 10 75 35 T 145 20"
            fill="none"
            stroke="#C5A059"
            strokeWidth="1.8"
            strokeDasharray="4 2"
            animate={{
              d: [
                'M 15 25 Q 45 10 75 35 T 145 20',
                'M 15 32 Q 45 45 75 22 T 145 35',
                'M 15 25 Q 45 10 75 35 T 145 20',
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <defs>
            <linearGradient id="dupattaGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DFC19B" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#F5EAD4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#C5A059" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute -bottom-4 text-[9px] uppercase tracking-[0.25em] text-vipasi-wine/60 font-sans font-medium whitespace-nowrap">
          Gossamer Chanderi Drape
        </span>
      </div>
    </div>
  );
}
