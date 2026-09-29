'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ChevronRight, Check } from 'lucide-react';
import { occasionsConfig } from '@/config/occasions';
import { FEATURED_PRODUCTS } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';

export default function OccasionsPage() {
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Filtered outfits matching selected occasion
  const displayedProducts = React.useMemo(() => {
    if (selectedTag === 'all') return FEATURED_PRODUCTS;
    const tag = selectedTag.toLowerCase();
    if (tag === 'haldi') {
      return FEATURED_PRODUCTS.filter(
        (p) =>
          p.occasions?.includes('haldi') ||
          p.colorName.toLowerCase().includes('yellow') ||
          p.colorName.toLowerCase().includes('lemon') ||
          p.colorName.toLowerCase().includes('marigold') ||
          p.colorName.toLowerCase().includes('peach')
      );
    }
    if (tag === 'mehendi') {
      return FEATURED_PRODUCTS.filter(
        (p) =>
          p.occasions?.includes('mehendi') ||
          p.colorName.toLowerCase().includes('green') ||
          p.colorName.toLowerCase().includes('emerald') ||
          p.colorName.toLowerCase().includes('lime')
      );
    }
    if (tag === 'wedding') {
      return FEATURED_PRODUCTS.filter(
        (p) =>
          p.occasions?.includes('wedding') ||
          p.weightLevel === 'heavy' ||
          p.category === 'lehengas' ||
          p.colorName.toLowerCase().includes('red') ||
          p.colorName.toLowerCase().includes('crimson')
      );
    }
    if (tag === 'festive') {
      return FEATURED_PRODUCTS.filter(
        (p) =>
          p.occasions?.includes('festive') ||
          p.collection.toLowerCase().includes('festive') ||
          p.badge === 'Bestseller'
      );
    }
    return FEATURED_PRODUCTS;
  }, [selectedTag]);

  return (
    <div className="min-h-screen bg-vipasi-ivory pt-24 pb-20 overflow-x-hidden">
      
      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center space-x-2 text-xs font-sans text-vipasi-muted uppercase tracking-wider">
        <Link href="/" className="hover:text-vipasi-wine transition-colors">
          Home
        </Link>
        <ChevronRight size={12} />
        <span className="text-vipasi-wine font-semibold">Festive Occasions</span>
      </nav>

      {/* Editorial Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-10 text-center">
        <div className="inline-flex items-center space-x-2 text-vipasi-wine text-xs uppercase tracking-[0.28em] font-sans font-semibold mb-2">
          <Sparkles size={13} className="text-vipasi-champagne" />
          <span>FESTIVE CURATIONS</span>
          <Sparkles size={13} className="text-vipasi-champagne" />
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-vipasi-charcoal tracking-tight">
          Shop by <span className="italic font-normal text-vipasi-wine">Occasion</span>
        </h1>
        <p className="text-xs sm:text-sm text-vipasi-muted mt-2 font-sans max-w-xl mx-auto leading-relaxed">
          From sunlit marigold Haldi mornings to majestic evening Wedding vows, explore authentic handcrafted ensembles styled for every ceremonial celebration.
        </p>
      </section>

      {/* 4 Dedicated Occasion Hero Cards from occasionsConfig */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {occasionsConfig.map((item) => {
            const isSelected = selectedTag.toLowerCase() === item.tag.toLowerCase();
            return (
              <div
                key={item.id}
                onClick={() => setSelectedTag(isSelected ? 'all' : item.tag.toLowerCase())}
                className={`group cursor-pointer relative aspect-[3/4] rounded-2xl overflow-hidden shadow-luxury transition-all duration-500 bg-vipasi-sand border ${
                  isSelected
                    ? 'ring-4 ring-vipasi-wine border-vipasi-wine scale-[1.02]'
                    : 'border-vipasi-border/80 hover:shadow-luxury-hover'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />

                {/* Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-vipasi-wine/90 via-vipasi-wine/25 to-transparent transition-opacity" />

                {/* Selected Pill */}
                {isSelected && (
                  <div className="absolute top-4 right-4 bg-vipasi-champagne text-vipasi-wine px-2.5 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider flex items-center space-x-1 shadow-md">
                    <Check size={12} />
                    <span>Viewing Curate</span>
                  </div>
                )}

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
                    <span>{isSelected ? 'Showing Products Below' : 'Filter Outfits'}</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Occasion Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-4 border-b border-vipasi-border mb-8">
          <div>
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-vipasi-wine font-bold">
              {selectedTag === 'all' ? 'All Handcrafted Creations' : `${selectedTag.toUpperCase()} EDIT`}
            </span>
            <h2 className="font-serif text-2xl font-bold text-vipasi-charcoal mt-0.5">
              {selectedTag === 'all'
                ? 'Curated Royal Repertoire'
                : `${selectedTag.charAt(0).toUpperCase() + selectedTag.slice(1)} Outfits (${displayedProducts.length})`}
            </h2>
          </div>

          {selectedTag !== 'all' && (
            <button
              onClick={() => setSelectedTag('all')}
              className="text-xs font-sans text-vipasi-wine hover:underline font-semibold"
            >
              Show All Creations
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

    </div>
  );
}
