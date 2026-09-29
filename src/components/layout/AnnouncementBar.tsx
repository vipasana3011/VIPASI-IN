'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronLeft, ChevronRight, Truck, Gift } from 'lucide-react';

const MESSAGES = [
  {
    text: 'Festive Launch: Enjoy Flat 10% Off on your first order with code VIPASI10',
    icon: Gift,
  },
  {
    text: 'Complimentary Pan-India Delivery on orders above ₹1,999',
    icon: Truck,
  },
  {
    text: 'Handcrafted with Love by Women Karigars • Worldwide Express Shipping',
    icon: Sparkles,
  },
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = MESSAGES[index];
  const IconComponent = current.icon;

  return (
    <div className="bg-vipasi-wine text-vipasi-sand py-2 px-4 text-xs tracking-wider transition-all duration-500 border-b border-vipasi-champagne/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center space-x-2 text-[11px] uppercase tracking-widest font-sans text-vipasi-champagne/90">
          <span>VIPASI</span>
          <span>•</span>
          <span>Jaipur Ateliers</span>
        </div>

        <div className="flex-1 flex items-center justify-center space-x-3 text-center">
          <button
            onClick={() => setIndex((prev) => (prev - 1 + MESSAGES.length) % MESSAGES.length)}
            aria-label="Previous announcement"
            className="text-vipasi-champagne/70 hover:text-vipasi-champagne transition-colors p-1"
          >
            <ChevronLeft size={14} />
          </button>

          <div className="flex items-center space-x-2 animate-fadeIn transition-opacity duration-300">
            <IconComponent size={13} className="text-vipasi-champagne flex-shrink-0" />
            <span className="font-medium tracking-wide text-vipasi-cream">{current.text}</span>
          </div>

          <button
            onClick={() => setIndex((prev) => (prev + 1) % MESSAGES.length)}
            aria-label="Next announcement"
            className="text-vipasi-champagne/70 hover:text-vipasi-champagne transition-colors p-1"
          >
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-4 text-[11px] font-sans">
          <span className="text-vipasi-champagne font-semibold">₹ INR</span>
          <span className="opacity-30">|</span>
          <a href="#artisan-story" className="text-vipasi-sand/80 hover:text-vipasi-champagne transition-colors">Our Karigars</a>
        </div>
      </div>
    </div>
  );
}
