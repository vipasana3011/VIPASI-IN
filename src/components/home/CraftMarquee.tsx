'use client';

import React from 'react';
import { motion } from 'framer-motion';

const CRAFTS = [
  'Zardozi Handwork',
  'Gota Patti',
  'Chikankari',
  'Kashmiri Aari',
  'Handblock Dabu',
  'Pure Chanderi Silk',
  'Kadwa Banarasi',
  'Mukaish Shimmer',
  'Gajji Silk',
];

export default function CraftMarquee() {
  return (
    <div className="py-4 bg-vipasi-wine text-vipasi-champagne overflow-hidden border-y border-vipasi-champagne/30 select-none">
      <div className="flex w-max animate-marquee space-x-8">
        {[...CRAFTS, ...CRAFTS, ...CRAFTS].map((craft, idx) => (
          <div key={idx} className="flex items-center space-x-6 text-xs sm:text-sm uppercase tracking-[0.25em] font-sans font-medium whitespace-nowrap">
            <span>{craft}</span>
            <span className="text-vipasi-champagne-light text-base">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
