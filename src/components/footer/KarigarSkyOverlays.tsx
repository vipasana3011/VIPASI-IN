'use client';

import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import { footerSceneConfig } from '@/config/footerScene';

interface SkyOverlaysProps {
  sunY: MotionValue<number>;
  isMobile?: boolean;
}

export default function KarigarSkyOverlays({ sunY, isMobile = false }: SkyOverlaysProps) {
  const sunConfig = isMobile ? footerSceneConfig.sun.mobile : footerSceneConfig.sun.desktop;
  const diyaConfig = isMobile ? footerSceneConfig.diyaGlow.mobile : footerSceneConfig.diyaGlow.desktop;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10">
      


      {/* ========================================================
          2. SOFT DRIFTING CLOUDS (Top 30% Sky)
         ======================================================== */}
      {footerSceneConfig.clouds.show && (
        <>
          {/* Cloud 1 - High slow drift */}
          <motion.div
            initial={{ x: '-20vw' }}
            animate={{ x: '110vw' }}
            transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
            className="absolute top-[5%] opacity-35"
          >
            <svg width="220" height="60" viewBox="0 0 220 60" fill="#FAF4E8">
              <path d="M 30 50 Q 50 20 80 30 Q 110 10 140 25 Q 170 15 190 35 Q 210 45 200 50 Z" />
            </svg>
          </motion.div>

          {/* Cloud 2 - Mid altitude drift */}
          <motion.div
            initial={{ x: '110vw' }}
            animate={{ x: '-30vw' }}
            transition={{ duration: 65, repeat: Infinity, ease: 'linear' }}
            className="absolute top-[12%] opacity-30"
          >
            <svg width="260" height="70" viewBox="0 0 260 70" fill="#FFF2E2">
              <path d="M 40 60 Q 70 25 110 35 Q 150 15 190 30 Q 230 25 240 60 Z" />
            </svg>
          </motion.div>

          {/* Cloud 3 - Lower subtle drift */}
          {!isMobile && (
            <motion.div
              initial={{ x: '-15vw' }}
              animate={{ x: '105vw' }}
              transition={{ duration: 42, repeat: Infinity, ease: 'linear', delay: 15 }}
              className="absolute top-[20%] opacity-25"
            >
              <svg width="180" height="50" viewBox="0 0 180 50" fill="#FAF4E8">
                <path d="M 20 40 Q 50 15 80 25 Q 110 10 140 25 Q 165 30 170 40 Z" />
              </svg>
            </motion.div>
          )}
        </>
      )}

      {/* ========================================================
          3. GLIDING BIRDS WITH WING FLAP
         ======================================================== */}
      {footerSceneConfig.birds.show && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Bird Flock 1 (Left to Right) */}
          <motion.div
            animate={{
              x: ['-5vw', '105vw'],
              y: [0, -14, 8, -6, 0],
            }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
            className="absolute top-[8%] flex items-center space-x-6 text-vipasi-wine/60"
          >
            <motion.svg
              animate={{ scaleY: [1, 0.45, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
              width="22"
              height="11"
              viewBox="0 0 24 12"
              fill="currentColor"
            >
              <path d="M0 6 Q6 0 12 6 Q18 0 24 6 Q18 4 12 8 Q6 4 0 6 Z" />
            </motion.svg>
            <motion.svg
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 0.55, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
              width="18"
              height="9"
              viewBox="0 0 24 12"
              fill="currentColor"
              className="translate-y-2"
            >
              <path d="M0 6 Q6 0 12 6 Q18 0 24 6 Q18 4 12 8 Q6 4 0 6 Z" />
            </motion.svg>
            <motion.svg
              animate={{ scaleY: [1, 0.45, 1] }}
              transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              width="15"
              height="8"
              viewBox="0 0 24 12"
              fill="currentColor"
              className="-translate-y-1"
            >
              <path d="M0 6 Q6 0 12 6 Q18 0 24 6 Q18 4 12 8 Q6 4 0 6 Z" />
            </motion.svg>
          </motion.div>

          {/* Bird Solo 2 (Right to Left across the sky) */}
          {!isMobile && (
            <motion.div
              animate={{
                x: ['105vw', '-10vw'],
                y: [0, -18, 5, -10, 0],
              }}
              transition={{ duration: 32, repeat: Infinity, ease: 'linear', delay: 8 }}
              className="absolute top-[16%] text-vipasi-wine/45"
            >
              <motion.svg
                animate={{ scaleY: [1, 0.45, 1] }}
                transition={{ duration: 0.65, repeat: Infinity, ease: 'easeInOut' }}
                width="16"
                height="8"
                viewBox="0 0 24 12"
                fill="currentColor"
              >
                <path d="M24 6 Q18 0 12 6 Q6 0 0 6 Q6 4 12 8 Q18 4 24 6 Z" />
              </motion.svg>
            </motion.div>
          )}
        </div>
      )}

      {/* ========================================================
          4. SWAYING KITES (PATANG) ON THIN STRINGS
         ======================================================== */}
      {footerSceneConfig.kites.show && !isMobile && (
        <>
          {/* Kite 1 (Left Sky) */}
          <motion.div
            animate={{
              y: [0, -12, 4, -8, 0],
              rotate: [-5, 6, -5],
            }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-[16%] top-[10%] opacity-80"
          >
            <svg width="42" height="90" viewBox="0 0 42 90">
              {/* Diamond Kite Body */}
              <polygon points="21,2 38,20 21,38 4,20" fill="#C86D51" stroke="#DFC19B" strokeWidth="1" />
              <line x1="21" y1="2" x2="21" y2="38" stroke="#3E0B10" strokeWidth="0.8" />
              <line x1="4" y1="20" x2="38" y2="20" stroke="#3E0B10" strokeWidth="0.8" />
              {/* Kite Tail & String */}
              <polygon points="21,38 24,44 18,44" fill="#DFC19B" />
              <path d="M 21 44 Q 28 58 16 72 T 26 90" fill="none" stroke="#C5A059" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
            </svg>
          </motion.div>

          {/* Kite 2 (Far Right Sky) */}
          <motion.div
            animate={{
              y: [0, 10, -8, 4, 0],
              rotate: [4, -7, 4],
            }}
            transition={{ duration: 7.2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            className="absolute right-[18%] top-[8%] opacity-75"
          >
            <svg width="36" height="80" viewBox="0 0 36 80">
              <polygon points="18,2 33,18 18,34 3,18" fill="#3E0B10" stroke="#DFC19B" strokeWidth="1" />
              <polygon points="18,2 25,18 18,34 11,18" fill="#DFC19B" opacity="0.6" />
              <polygon points="18,34 21,39 15,39" fill="#C86D51" />
              <path d="M 18 39 Q 10 52 24 64 T 14 80" fill="none" stroke="#C5A059" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
            </svg>
          </motion.div>
        </>
      )}

      {/* ========================================================
          5. TWINKLING GOLD SPARKLES (✦) IN UPPER SKY
         ======================================================== */}
      {footerSceneConfig.sparkles.show && (
        <div className="absolute inset-0 pointer-events-none">
          {[
            { x: 12, y: 7, size: 14, delay: 0 },
            { x: 28, y: 14, size: 10, delay: 1.2 },
            { x: 38, y: 6, size: 12, delay: 0.6 },
            { x: 58, y: 9, size: 14, delay: 1.8 },
            { x: 67, y: 16, size: 11, delay: 0.9 },
            { x: 82, y: 8, size: 13, delay: 2.1 },
            { x: 92, y: 18, size: 10, delay: 1.5 },
            { x: 22, y: 22, size: 9, delay: 2.4 },
            { x: 78, y: 22, size: 9, delay: 0.3 },
          ].map((sparkle, i) => (
            <motion.span
              key={i}
              style={{ left: `${sparkle.x}%`, top: `${sparkle.y}%`, fontSize: `${sparkle.size}px` }}
              animate={{ opacity: [0.15, 0.9, 0.15], scale: [0.85, 1.2, 0.85] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: sparkle.delay }}
              className="absolute text-vipasi-champagne drop-shadow-[0_0_6px_rgba(223,193,155,0.7)]"
            >
              ✦
            </motion.span>
          ))}
        </div>
      )}

      {/* ========================================================
          6. HANGING MARIGOLD GARLAND & DIYAS ACROSS TOP EDGE
         ======================================================== */}
      {footerSceneConfig.garland.show && (
        <div className="absolute top-0 inset-x-0 w-full overflow-hidden pointer-events-none z-20">
          <motion.div
            animate={{ y: [0, 2, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full flex justify-around"
          >
            <svg viewBox="0 0 1200 45" className="w-full h-8 sm:h-11 preserve-3d" preserveAspectRatio="none">
              {/* Festoon Scallop Rope */}
              <path
                d="M 0 5 Q 150 30 300 5 Q 450 30 600 5 Q 750 30 900 5 Q 1050 30 1200 5"
                fill="none"
                stroke="#C5A059"
                strokeWidth="1.2"
                opacity="0.7"
              />
              {/* Auspicious Marigold Florets along the rope */}
              {Array.from({ length: 25 }).map((_, gIdx) => {
                const cx = (gIdx * 1200) / 24;
                const isEven = gIdx % 2 === 0;
                return (
                  <g key={gIdx}>
                    <circle cx={cx} cy={isEven ? 18 : 12} r={isEven ? 6.5 : 5} fill={isEven ? '#F08E2B' : '#FFC107'} />
                    <circle cx={cx} cy={isEven ? 18 : 12} r={isEven ? 3.5 : 2.5} fill="#FAF4E8" opacity="0.6" />
                  </g>
                );
              })}
            </svg>
          </motion.div>
        </div>
      )}

      {/* ========================================================
          7. PULSATING DIYA FLAME GLOW
         ======================================================== */}
      {footerSceneConfig.diyaGlow.show && (
        <div
          className="absolute z-20 pointer-events-none"
          style={{ left: `${diyaConfig.x}%`, top: `${diyaConfig.y}%` }}
        >
          <motion.div
            animate={{
              scale: [0.9, 1.25, 0.9],
              opacity: [0.55, 0.95, 0.55],
            }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-300 to-transparent blur-sm"
          />
          {/* Flame core */}
          <div className="absolute w-2 h-3.5 -translate-x-1/2 -translate-y-full bg-gradient-to-t from-orange-500 via-yellow-200 to-white rounded-full blur-[0.5px]" />
        </div>
      )}

    </div>
  );
}
