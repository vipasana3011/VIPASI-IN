'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { FEATURED_PRODUCTS } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import { Heart, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist } = useCart();

  const wishlistedProducts = FEATURED_PRODUCTS.filter((p) =>
    wishlist.includes(p.id)
  );

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-vipasi-charcoal select-none py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-vipasi-wine text-xs uppercase tracking-[0.25em] font-sans font-semibold mb-2">
            <Heart size={14} className="fill-vipasi-wine text-vipasi-wine" />
            <span>MY CURATED FAVORITES</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-vipasi-charcoal">
            Your Royal <span className="italic font-normal text-vipasi-wine">Wishlist</span>
          </h1>
          <p className="text-xs sm:text-sm text-vipasi-muted mt-2 font-sans">
            {wishlistedProducts.length === 1
              ? '1 handcrafted ensemble saved for your upcoming festivities'
              : `${wishlistedProducts.length} handcrafted ensembles saved for your upcoming festivities`}
          </p>
        </div>

        {/* Content */}
        {wishlistedProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#E9E1D6] p-8 max-w-xl mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-full bg-[#FAF7F2] flex items-center justify-center mx-auto mb-4 text-vipasi-wine">
              <Heart size={28} />
            </div>
            <h2 className="font-serif text-2xl font-bold text-vipasi-charcoal">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs sm:text-sm text-vipasi-muted font-sans mt-2 max-w-md mx-auto leading-relaxed">
              Explore our master karigar collections of pure Chanderi suits, Banarasi sarees, and royal anarkalis to save your favorite ensembles.
            </p>
            <Link
              href="/collections"
              className="mt-6 inline-flex items-center space-x-2 bg-vipasi-wine hover:bg-vipasi-wine-light text-vipasi-champagne text-xs uppercase tracking-[0.2em] font-bold px-6 py-3 rounded-full transition-all shadow-md"
            >
              <span>Explore Collections</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
            {wishlistedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
