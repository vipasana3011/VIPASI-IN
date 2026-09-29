'use client';

import React from 'react';
import { Instagram, ShoppingBag, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const LOOKS = [
  {
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80',
    patron: '@ananya_roy',
    occasion: 'Udaipur Palace Wedding',
    outfit: 'Gul-e-Bahar Zardozi Set',
    price: '₹6,850',
  },
  {
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=700&q=80',
    patron: '@tanya_mehra',
    occasion: 'Mehendi & Sangeet Twirls',
    outfit: 'Raas Leela Gota Sharara',
    price: '₹7,990',
  },
  {
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=700&q=80',
    patron: '@priya_deshmukh',
    occasion: 'Diwali Puja Morning',
    outfit: 'Kadwa Banarasi Silk Saree',
    price: '₹12,400',
  },
  {
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=700&q=80',
    patron: '@sneha.kapoor',
    occasion: 'Haldi Ceremony Glow',
    outfit: 'Noor-e-Kashmir Aari Set',
    price: '₹5,490',
  },
];

export default function InstagramLookbook() {
  const { setIsCartOpen } = useCart();

  return (
    <section id="lookbook" className="py-16 md:py-20 bg-vipasi-sand/30 border-b border-vipasi-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 text-vipasi-wine text-xs uppercase tracking-[0.25em] font-semibold mb-2">
            <Instagram size={15} className="text-vipasi-wine" />
            <span>#SpottedInVipasi</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-vipasi-charcoal">
            Styled by You, Cherished Forever
          </h2>
          <p className="text-xs text-vipasi-muted mt-2 font-sans">
            Tag <a href="https://instagram.com" className="font-bold text-vipasi-wine hover:underline">@vipasi.in</a> on Instagram to be featured on our royal gallery.
          </p>
          <div className="w-12 h-0.5 bg-vipasi-champagne mx-auto mt-3 rounded-full" />
        </div>

        {/* 4 Image Lookbook Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {LOOKS.map((item, idx) => (
            <div
              key={idx}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-luxury border border-vipasi-border/80 cursor-pointer bg-vipasi-sand"
            >
              <img
                src={item.image}
                alt={item.outfit}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Instagram Badge Top Left */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold text-vipasi-wine flex items-center space-x-1 shadow-sm">
                <Instagram size={11} />
                <span>{item.patron}</span>
              </div>

              {/* Hover Overlay with Shop The Look */}
              <div className="absolute inset-0 bg-gradient-to-t from-vipasi-wine/90 via-vipasi-wine/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <p className="text-[10px] uppercase tracking-widest text-vipasi-champagne font-medium">
                  {item.occasion}
                </p>
                <h4 className="font-serif text-sm font-bold leading-tight mt-0.5">
                  {item.outfit}
                </h4>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20">
                  <span className="text-xs font-bold text-vipasi-champagne">{item.price}</span>
                  <a
                    href="#collections"
                    className="inline-flex items-center space-x-1 text-[10px] bg-white text-vipasi-wine font-bold px-2.5 py-1 rounded-full uppercase tracking-wider hover:bg-vipasi-champagne transition-colors"
                  >
                    <ShoppingBag size={10} />
                    <span>Shop Look</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
