'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { occasionsConfig } from '@/config/occasions';

interface OccasionProps {
  onFilterOccasion: (tag: string) => void;
}

export default function ShopByOccasion({ onFilterOccasion }: OccasionProps) {
  return (
    <section className="py-14 bg-vipasi-sand/30 border-b border-vipasi-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-vipasi-border/60 gap-4">
          <div>
            <div className="flex items-center space-x-1.5 text-vipasi-wine text-xs uppercase tracking-[0.25em] font-semibold mb-1">
              <Sparkles size={14} className="text-vipasi-wine" />
              <span>Festive Curations</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-vipasi-charcoal">
              Shop by Occasion
            </h2>
          </div>
          <Link
            href="/occasions"
            className="text-xs font-bold text-vipasi-wine uppercase tracking-[0.18em] flex items-center space-x-1 hover:text-vipasi-wine-light transition-colors"
          >
            <span>Explore All 22 Handcrafted Outfits</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 4 Occasion Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {occasionsConfig.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onFilterOccasion(item.tag)}
              className="group cursor-pointer relative aspect-[3/4] rounded-2xl overflow-hidden shadow-luxury hover:shadow-luxury-hover transition-all duration-500 bg-vipasi-sand border border-vipasi-border/80"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-vipasi-wine/90 via-vipasi-wine/25 to-transparent transition-opacity" />

              {/* Text Meta at Bottom */}
              <div className="absolute inset-x-0 bottom-0 p-5 text-white flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-[0.25em] text-vipasi-champagne font-bold mb-1">
                  {item.count}
                </span>
                <h3 className="font-serif text-xl font-bold leading-tight group-hover:text-vipasi-champagne transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-white/80 mt-1 font-sans">
                  {item.tagline}
                </p>
                
                <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-vipasi-champagne">
                  <span>Explore Edit</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
