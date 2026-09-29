'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Award, Heart, ShieldCheck, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen text-vipasi-charcoal select-none py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 text-vipasi-wine text-xs uppercase tracking-[0.28em] font-sans font-semibold">
            <Sparkles size={13} className="text-vipasi-champagne" />
            <span>THE VIPASI MANIFESTO</span>
            <Sparkles size={13} className="text-vipasi-champagne" />
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-vipasi-charcoal tracking-tight">
            Preserving Rajasthan’s <span className="italic font-normal text-vipasi-wine">Karigar Heritage</span>
          </h1>
          <p className="text-xs sm:text-sm text-vipasi-muted font-sans leading-relaxed max-w-2xl mx-auto">
            VIPASI was born with a single noble purpose: to bring India’s most regal handloom silks and intricate needlecraft directly from master artisan ateliers in Jaipur to the contemporary woman’s wardrobe.
          </p>
        </div>

        {/* Brand Story Imagery & Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-3xl overflow-hidden border border-[#E9E1D6] shadow-luxury aspect-[4/3] bg-white">
            <img
              src="/images/footer/footer-scene.png"
              alt="VIPASI Karigar Atelier"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-vipasi-wine font-bold font-sans">
                Authentic Craftsmanship
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-vipasi-charcoal">
                Slow Fashion Guided by Human Hands
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-vipasi-charcoal/85 font-sans leading-relaxed">
              Every VIPASI ensemble is an artistic dialogue between heritage loom masters and modern silhouettes. Our artisans spend weeks hand-setting micro-mirrors, threading pure metallic zari, and cutting flared Kalidar tiers that float effortlessly during celebrations.
            </p>
            <p className="text-xs sm:text-sm text-vipasi-charcoal/85 font-sans leading-relaxed">
              We reject mass factory production in favor of small artisan batches where every hem, motif, and seam is inspected for heirloom longevity.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-4 rounded-xl border border-vipasi-border">
                <Award size={20} className="text-vipasi-wine mb-2" />
                <h4 className="font-serif text-sm font-bold text-vipasi-charcoal">Silk Mark Certified</h4>
                <p className="text-[11px] text-vipasi-muted font-sans mt-0.5">Guaranteed 100% natural pure silks.</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-vipasi-border">
                <Heart size={20} className="text-vipasi-wine mb-2" />
                <h4 className="font-serif text-sm font-bold text-vipasi-charcoal">Direct Karigar Dignity</h4>
                <p className="text-[11px] text-vipasi-muted font-sans mt-0.5">Fair wages and heritage atelier empowerment.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Master Craft Repertoire */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E9E1D6] shadow-xs space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-vipasi-charcoal">
              Our 5 Pillars of Textile Mastery
            </h3>
            <div className="w-12 h-0.5 bg-vipasi-champagne mx-auto mt-2 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-center">
            {[
              { name: 'Zardozi', desc: 'Hand-sewn gold dabka bullion work for royal ceremonial opulence.' },
              { name: 'Gota Patti', desc: 'Embossed Rajasthani ribbon applique creating sunlit festive borders.' },
              { name: 'Chanderi Weaves', desc: 'Featherweight silk-cotton drapes from historic Madhya Pradesh looms.' },
              { name: 'Mirror Work', desc: 'Hand-tacked reflective mirrors capturing light across every festive twirl.' },
              { name: 'Dabu Print', desc: 'Mud-resist mud bath handblock patterns celebrating Rajasthan flora.' },
            ].map((craft) => (
              <div key={craft.name} className="p-4 rounded-2xl bg-[#FAF7F2] border border-vipasi-border/60 space-y-2">
                <h4 className="font-serif text-base font-bold text-vipasi-wine">{craft.name}</h4>
                <p className="text-[11px] text-vipasi-charcoal/80 font-sans leading-relaxed">{craft.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-6">
          <Link
            href="/collections"
            className="inline-flex items-center space-x-2 bg-vipasi-wine hover:bg-vipasi-wine-light text-vipasi-champagne text-xs uppercase tracking-[0.2em] font-bold px-8 py-4 rounded-full shadow-luxury transition-all"
          >
            <span>Explore The Heirloom Repertoire</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
}
