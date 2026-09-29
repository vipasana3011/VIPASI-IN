'use client';

import React from 'react';
import { Sparkles, Scissors, ShieldCheck, RefreshCw, Truck } from 'lucide-react';

export default function TrustHighlights() {
  const PILLARS = [
    {
      icon: Sparkles,
      title: 'Artisan Handcrafted',
      desc: 'Authentic Zardozi, Gota Patti & Handloom weaves directly from master karigars.',
    },
    {
      icon: Scissors,
      title: 'Custom Tailoring',
      desc: 'Personalized fit option available on all Anarkalis, suits and lehengas.',
    },
    {
      icon: Truck,
      title: 'Free Pan-India Delivery',
      desc: 'Complimentary insured shipping on all orders over ₹1,999.',
    },
    {
      icon: RefreshCw,
      title: '7-Day Easy Exchange',
      desc: 'Stress-free doorstep size exchanges and dedicated WhatsApp support.',
    },
  ];

  return (
    <section className="py-10 bg-vipasi-sand/60 border-t border-b border-vipasi-border/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-start space-x-3.5 p-3">
                <div className="p-2.5 bg-white text-vipasi-maroon rounded-xl shadow-xs border border-vipasi-border/60 flex-shrink-0">
                  <Icon size={20} className="text-vipasi-gold" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-vipasi-charcoal">{item.title}</h4>
                  <p className="text-xs text-vipasi-muted mt-0.5 leading-snug">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
