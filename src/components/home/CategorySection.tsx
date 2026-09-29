'use client';

import React from 'react';
import { CATEGORIES } from '@/data/products';
import { Sparkles, ArrowRight } from 'lucide-react';

interface CategorySectionProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategorySection({
  selectedCategory,
  onSelectCategory,
}: CategorySectionProps) {
  return (
    <section className="py-12 bg-white border-b border-vipasi-border/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center space-x-1.5 text-vipasi-wine text-xs uppercase tracking-[0.25em] font-semibold mb-1">
            <Sparkles size={13} className="text-vipasi-wine" />
            <span>Curated Silhouettes</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-vipasi-charcoal">
            Shop by Category & Craft
          </h2>
          <div className="w-12 h-0.5 bg-vipasi-champagne mx-auto mt-2 rounded-full" />
        </div>

        {/* Categories Grid (Aachho + Bunai style luxury circular story bubbles) */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="group cursor-pointer flex flex-col items-center text-center transition-all duration-300"
              >
                {/* Circular Image with Aachho Gold Ring */}
                <div
                  className={`relative aspect-square w-20 sm:w-28 md:w-32 rounded-full p-1 transition-all duration-500 shadow-md ${
                    isSelected
                      ? 'ring-3 ring-vipasi-wine scale-105 bg-vipasi-sand'
                      : 'hover:ring-2 hover:ring-vipasi-champagne group-hover:scale-105 bg-vipasi-cream'
                  }`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden border border-vipasi-border">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover object-top group-hover:scale-115 transition-transform duration-700"
                    />
                  </div>
                </div>

                {/* Title */}
                <h3
                  className={`font-serif text-xs sm:text-sm font-bold mt-3 transition-colors ${
                    isSelected ? 'text-vipasi-wine font-extrabold' : 'text-vipasi-charcoal group-hover:text-vipasi-wine'
                  }`}
                >
                  {cat.name}
                </h3>
                <p className="text-[10px] text-vipasi-muted hidden sm:block mt-0.5 font-sans">
                  {cat.tagline}
                </p>
              </div>
            );
          })}
        </div>

        {/* View All Button if filter active */}
        {selectedCategory !== 'all' && (
          <div className="text-center mt-6">
            <button
              onClick={() => onSelectCategory('all')}
              className="text-xs text-vipasi-wine font-bold uppercase tracking-wider underline hover:text-vipasi-wine-light"
            >
              Showing filtered category • Reset to View All Collections
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
