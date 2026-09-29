'use client';

import React from 'react';
import { CRAFT_STORIES } from '@/data/products';
import { HeartHandshake, Sparkles, MapPin } from 'lucide-react';

export default function ArtisanStory() {
  return (
    <section id="artisan-story" className="py-16 md:py-24 bg-vipasi-cream border-t border-b border-vipasi-border/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-1.5 text-vipasi-gold text-xs uppercase tracking-[0.25em] font-semibold mb-2">
            <HeartHandshake size={15} />
            <span>The Vipasi Heritage</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-vipasi-charcoal">
            The Soul in Every Stitch
          </h2>
          <p className="text-sm text-vipasi-muted mt-3 font-sans leading-relaxed">
            Every Vipasi garment is a celebration of centuries-old Indian craft techniques. 
            We partner directly with traditional weaving families and women artisan clusters across Jaipur, Varanasi, and Chanderi.
          </p>
        </div>

        {/* 3 Craft Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CRAFT_STORIES.map((craft, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-2xl border border-vipasi-border shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-serif font-bold text-vipasi-maroon bg-vipasi-sand/80 px-3 py-1 rounded-full">
                    Artisan Craft 0{idx + 1}
                  </span>
                  <div className="flex items-center text-[11px] text-vipasi-gold font-medium">
                    <MapPin size={12} className="mr-1" />
                    <span>{craft.region}</span>
                  </div>
                </div>

                <h3 className="font-serif text-lg font-bold text-vipasi-charcoal mb-1">
                  {craft.title}
                </h3>
                <p className="text-xs font-serif italic text-vipasi-gold mb-3">
                  {craft.subtitle}
                </p>
                <p className="text-xs text-vipasi-muted leading-relaxed font-sans">
                  {craft.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-vipasi-sand flex items-center justify-between text-[11px] text-vipasi-charcoal font-medium">
                <span className="flex items-center space-x-1 text-vipasi-maroon">
                  <Sparkles size={12} />
                  <span>100% Hand-Guided</span>
                </span>
                <span className="text-vipasi-muted">Slow Fashion</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
