'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FEATURED_PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  'Silk Sarees',
  'Anarkali Sets',
  'Zardozi',
  'Gota Patti',
  'Chanderi Silk',
  'Sharara Sets',
  'Festive Edit',
];

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  const filteredProducts = query.trim()
    ? FEATURED_PRODUCTS.filter((p) => {
        const q = query.toLowerCase().trim();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.craftTechnique.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q) ||
          p.colorName.toLowerCase().includes(q) ||
          (p.occasions && p.occasions.some((occ) => occ.toLowerCase().includes(q)))
        );
      }).slice(0, 8)
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 bg-[#FAF4E8]/96 backdrop-blur-2xl flex flex-col overflow-y-auto"
        >
          {/* Top Bar with Close Button */}
          <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 flex items-center justify-between border-b border-vipasi-border/70">
            <div className="flex items-center space-x-3">
              <img src="/brand/logo.png" alt="VIPASI" className="h-8 w-auto object-contain" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-vipasi-muted font-sans font-medium">
                Artisan Search
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-vipasi-sand text-vipasi-charcoal transition-colors"
              aria-label="Close search"
            >
              <X size={22} />
            </button>
          </div>

          {/* Search Input Section */}
          <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 pt-10 pb-6">
            <div className="relative flex items-center border-b-2 border-vipasi-wine pb-4">
              <Search size={28} className="text-vipasi-wine/60 mr-4 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sarees, suit sets, anarkalis, crafts..."
                className="w-full bg-transparent font-serif text-2xl sm:text-4xl text-vipasi-charcoal placeholder:text-vipasi-muted/40 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-xs uppercase tracking-widest text-vipasi-wine hover:underline p-1"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Popular Search Chips */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-xs font-sans uppercase tracking-wider text-vipasi-muted mr-2">
                Popular:
              </span>
              {POPULAR_SEARCHES.map((chip) => (
                <button
                  key={chip}
                  onClick={() => setQuery(chip)}
                  className="text-xs font-sans px-3.5 py-1.5 rounded-full bg-white border border-vipasi-border hover:border-vipasi-wine hover:bg-vipasi-sand text-vipasi-charcoal transition-all"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Live Search Results */}
          <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 flex-1">
            {query.trim() ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-lg text-vipasi-charcoal">
                    Matching Creations ({filteredProducts.length})
                  </h3>
                  <span className="text-xs text-vipasi-muted">
                    Showing artisan pieces for &ldquo;{query}&rdquo;
                  </span>
                </div>

                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="group bg-white rounded-2xl p-3 border border-vipasi-border/80 hover:shadow-xl transition-all duration-300 flex space-x-3.5"
                      >
                        <Link
                          href={`/product/${product.slug}`}
                          onClick={onClose}
                          className="relative w-24 h-32 rounded-xl overflow-hidden bg-vipasi-sand flex-shrink-0 block"
                        >
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </Link>

                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div>
                            <span className="text-[10px] font-sans uppercase tracking-wider text-vipasi-wine font-semibold">
                              {product.craftTechnique.split('•')[0]}
                            </span>
                            <Link
                              href={`/product/${product.slug}`}
                              onClick={onClose}
                              className="font-serif text-sm font-semibold text-vipasi-charcoal hover:text-vipasi-wine line-clamp-2 mt-0.5 block transition-colors"
                            >
                              {product.name}
                            </Link>
                          </div>

                          <div className="pt-2 border-t border-vipasi-border/50 flex items-center justify-between">
                            <span className="font-serif text-sm font-bold text-vipasi-wine">
                              ₹{product.price.toLocaleString('en-IN')}
                            </span>
                            <button
                              onClick={() => {
                                addToCart(product, product.sizes[0] || 'M');
                                onClose();
                              }}
                              className="text-[10px] font-sans font-bold uppercase tracking-wider text-vipasi-wine hover:underline"
                            >
                              Add to Bag
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 space-y-2">
                    <p className="font-serif text-2xl font-bold text-vipasi-charcoal">
                      Nothing matched your search
                    </p>
                    <p className="text-xs sm:text-sm text-vipasi-muted font-sans max-w-sm mx-auto">
                      Try another craft, fabric or collection, or explore our handcrafted festive ensembles.
                    </p>
                    <div className="pt-3">
                      <Link
                        href="/collections"
                        onClick={onClose}
                        className="inline-block px-5 py-2 bg-vipasi-wine text-vipasi-sand rounded-xl text-xs font-sans font-bold uppercase tracking-wider hover:bg-vipasi-wine-light transition-colors"
                      >
                        Browse All Collections
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Curated suggestions when empty query */
              <div className="pt-4">
                <span className="text-xs uppercase tracking-[0.2em] text-vipasi-wine font-bold block mb-4">
                  Curated For You
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {FEATURED_PRODUCTS.slice(0, 4).map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onClose();
                      }}
                      className="group cursor-pointer bg-white rounded-xl p-2.5 border border-vipasi-border/60 hover:shadow-lg transition-all"
                    >
                      <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-vipasi-sand mb-2">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <p className="font-serif text-xs font-semibold text-vipasi-charcoal line-clamp-1">
                        {product.name}
                      </p>
                      <p className="text-[11px] font-serif font-bold text-vipasi-wine mt-0.5">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
