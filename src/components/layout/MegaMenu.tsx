'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Scissors, Compass } from 'lucide-react';
import { occasionsConfig } from '@/config/occasions';

export type MenuTab = 'NEW' | 'SHOP' | 'CRAFT' | 'OCCASION' | 'OUR STORY';

interface MegaMenuProps {
  activeTab: MenuTab | null;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function MegaMenu({ activeTab, onClose, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  if (!activeTab) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{ backgroundColor: '#FAF5EC' }}
        className="absolute top-full left-0 w-full border-b border-vipasi-gold/40 shadow-[0_20px_50px_rgba(62,11,16,0.14)] z-40 overflow-hidden text-vipasi-charcoal"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          
          {/* =========================================================
              1. NEW DROPDOWN
             ========================================================= */}
          {activeTab === 'NEW' && (
            <div className="grid grid-cols-12 gap-8 items-stretch">
              <div className="col-span-8 space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-vipasi-border/70">
                  <div>
                    <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-vipasi-wine font-bold">
                      Latest Creations
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-vipasi-charcoal mt-0.5">
                      New In The Atelier
                    </h3>
                  </div>
                  <Link
                    href="/collections?filter=new"
                    onClick={onClose}
                    className="text-xs font-sans font-bold uppercase tracking-wider text-vipasi-wine hover:underline flex items-center space-x-1"
                  >
                    <span>View All New Releases</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      title: 'New Arrivals',
                      desc: 'Discover the latest additions to the VIPASI atelier.',
                      href: '/collections?filter=new',
                      badge: 'New',
                    },
                    {
                      title: 'Just In',
                      desc: 'Newly crafted pieces, freshly added to the collection.',
                      href: '/collections?filter=just-in',
                    },
                    {
                      title: 'Bestseller Edit',
                      desc: 'Most-loved silhouettes and customer favourites.',
                      href: '/collections?filter=bestseller',
                      badge: 'Popular',
                    },
                    {
                      title: 'Limited Drops',
                      desc: 'Select pieces available in limited quantities.',
                      href: '/collections?filter=limited',
                      badge: 'Rare',
                    },
                    {
                      title: 'Trending Now',
                      desc: 'Current styles and silhouettes from the latest edit.',
                      href: '/collections?filter=trending',
                    },
                  ].map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={onClose}
                      className="group p-3.5 rounded-2xl bg-white/70 hover:bg-white border border-vipasi-border/60 hover:border-vipasi-gold/60 transition-all hover:shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-base font-bold text-vipasi-charcoal group-hover:text-vipasi-wine transition-colors">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-vipasi-wine text-vipasi-champagne">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-vipasi-muted font-sans mt-1 line-clamp-1">
                        {item.desc}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Visual Card: New Arrivals */}
              <div className="col-span-4">
                <Link
                  href="/collections?filter=new"
                  onClick={onClose}
                  className="group relative block h-full rounded-2xl overflow-hidden shadow-luxury border border-vipasi-gold/40"
                >
                  <img
                    src="/images/products/1uY6GVfDtXanel3cZNDzsy74AXZyq5YeP.jpg"
                    alt="New Arrivals"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 min-h-[220px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-vipasi-wine/90 via-vipasi-wine/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white space-y-2">
                    <span className="text-[9px] uppercase tracking-[0.25em] text-vipasi-champagne font-bold">
                      Curated Edit
                    </span>
                    <h4 className="font-serif text-xl font-bold">New Arrivals</h4>
                    <p className="text-xs text-white/80 font-sans">
                      Freshly hand-worked zari kalidars & mirror-work sets.
                    </p>
                    <div className="pt-2 flex items-center space-x-1.5 text-xs uppercase tracking-wider font-bold text-vipasi-champagne">
                      <span>Explore New Arrivals</span>
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          )}

          {/* =========================================================
              2. SHOP DROPDOWN
             ========================================================= */}
          {activeTab === 'SHOP' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-vipasi-border/70">
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-vipasi-wine font-bold">
                    The Complete Repertoire
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-vipasi-charcoal mt-0.5">
                    Shop VIPASI
                  </h3>
                </div>
                <Link
                  href="/collections"
                  onClick={onClose}
                  className="text-xs font-sans font-bold uppercase tracking-wider text-vipasi-wine hover:underline flex items-center space-x-1"
                >
                  <span>Explore All Ensembles</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              <div className="grid grid-cols-12 gap-8">
                {/* Column 1: SHOP BY CATEGORY */}
                <div className="col-span-4 bg-white/60 p-5 rounded-2xl border border-vipasi-border/60">
                  <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-vipasi-wine block mb-3 pb-2 border-b border-vipasi-border/40">
                    Shop by Category
                  </span>
                  <ul className="space-y-2 font-serif text-sm">
                    {[
                      { name: 'Sarees', href: '/collections?category=sarees' },
                      { name: 'Anarkalis', href: '/collections?category=anarkalis' },
                      { name: 'Sharara Sets', href: '/collections?category=shararas' },
                      { name: 'Suit Sets', href: '/collections?category=suit-sets' },
                      { name: 'Lehengas', href: '/collections?category=lehengas' },
                      { name: 'Co-ords', href: '/collections?category=co-ords' },
                      { name: 'Dupattas', href: '/collections?category=sarees' },
                    ].map((cat, i) => (
                      <li key={i}>
                        <Link
                          href={cat.href}
                          onClick={onClose}
                          className="flex items-center justify-between py-1 text-vipasi-charcoal hover:text-vipasi-wine transition-colors group"
                        >
                          <span className="font-serif text-base group-hover:translate-x-1 transition-transform">
                            {cat.name}
                          </span>
                          <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 text-vipasi-wine transition-opacity" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 2: SHOP BY FABRIC */}
                <div className="col-span-4 bg-white/60 p-5 rounded-2xl border border-vipasi-border/60">
                  <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-vipasi-wine block mb-3 pb-2 border-b border-vipasi-border/40">
                    Shop by Fabric
                  </span>
                  <ul className="space-y-2 font-serif text-sm">
                    {[
                      { name: 'Pure Chanderi Silk', href: '/collections?fabric=chanderi', note: 'Ethereal sheer & light' },
                      { name: 'Banarasi Katan', href: '/collections?fabric=brocade', note: 'Heirloom metallic weave' },
                      { name: 'Mulmul Cotton', href: '/collections?fabric=maslin', note: 'Featherlight Jaipur drape' },
                      { name: 'Raw Silk Organza', href: '/collections?fabric=organza', note: 'Sculptural sheen & grace' },
                    ].map((fab, i) => (
                      <li key={i}>
                        <Link
                          href={fab.href}
                          onClick={onClose}
                          className="block py-1 text-vipasi-charcoal hover:text-vipasi-wine transition-colors group"
                        >
                          <span className="font-serif text-base font-medium group-hover:translate-x-1 transition-transform block">
                            {fab.name}
                          </span>
                          <span className="text-[10px] text-vipasi-muted font-sans block">
                            {fab.note}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 3: SHOP BY CRAFT */}
                <div className="col-span-4 bg-white/60 p-5 rounded-2xl border border-vipasi-border/60">
                  <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-vipasi-wine block mb-3 pb-2 border-b border-vipasi-border/40">
                    Shop by Craft
                  </span>
                  <div className="grid grid-cols-1 gap-1.5 font-serif text-sm">
                    {[
                      { name: 'Mirror Work', href: '/collections?craft=mirror' },
                      { name: 'Zardozi', href: '/collections?craft=zari' },
                      { name: 'Gota Patti', href: '/collections?craft=gota' },
                      { name: 'Chikankari', href: '/collections?craft=chikankari' },
                      { name: 'Aari Needlework', href: '/collections?craft=aari' },
                      { name: 'Dabu Handblock', href: '/collections?craft=dabu' },
                      { name: 'Sequin Handwork', href: '/collections?craft=sequin' },
                    ].map((craft, i) => (
                      <Link
                        key={i}
                        href={craft.href}
                        onClick={onClose}
                        className="flex items-center justify-between py-1 text-vipasi-charcoal hover:text-vipasi-wine transition-colors group"
                      >
                        <span className="font-serif text-sm group-hover:translate-x-1 transition-transform">
                          {craft.name}
                        </span>
                        <ArrowRight size={11} className="opacity-0 group-hover:opacity-100 text-vipasi-wine transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              3. CRAFT DROPDOWN
             ========================================================= */}
          {activeTab === 'CRAFT' && (
            <div className="grid grid-cols-12 gap-8 items-stretch">
              <div className="col-span-8 space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-vipasi-border/70">
                  <div>
                    <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-vipasi-wine font-bold">
                      Master Karigar Heritage
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-vipasi-charcoal mt-0.5">
                      Authentic Indian Craftsmanship
                    </h3>
                  </div>
                  <Link
                    href="/about#craft"
                    onClick={onClose}
                    className="text-xs font-sans font-bold uppercase tracking-wider text-vipasi-wine hover:underline flex items-center space-x-1"
                  >
                    <span>Read Atelier Manifesto</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      name: 'Zardozi',
                      desc: 'Gilded metallic embroidery and traditional hand-finished detailing.',
                      href: '/collections?craft=zari',
                    },
                    {
                      name: 'Gota Patti',
                      desc: 'Rajasthani ribbon applique with intricate embossed borders.',
                      href: '/collections?craft=gota',
                    },
                    {
                      name: 'Chikankari',
                      desc: 'Delicate hand embroidery inspired by timeless floral motifs.',
                      href: '/collections?craft=chikankari',
                    },
                    {
                      name: 'Aari Needlework',
                      desc: 'Fine hook embroidery creating detailed floral patterns.',
                      href: '/collections?craft=aari',
                    },
                    {
                      name: 'Mirror Work',
                      desc: 'Traditional reflective embellishment with a contemporary finish.',
                      href: '/collections?craft=mirror',
                    },
                    {
                      name: 'Dabu Handblock',
                      desc: 'Traditional mud-resist hand-block printing from Bagru.',
                      href: '/collections?craft=dabu',
                    },
                  ].map((craft, i) => (
                    <Link
                      key={i}
                      href={craft.href}
                      onClick={onClose}
                      className="group p-3.5 rounded-2xl bg-white/70 hover:bg-white border border-vipasi-border/60 hover:border-vipasi-gold/60 transition-all hover:shadow-xs"
                    >
                      <h4 className="font-serif text-base font-bold text-vipasi-charcoal group-hover:text-vipasi-wine transition-colors">
                        {craft.name}
                      </h4>
                      <p className="text-xs text-vipasi-muted font-sans mt-1 leading-relaxed">
                        {craft.desc}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Visual Card: The Art of the Karigar */}
              <div className="col-span-4">
                <Link
                  href="/collections?filter=craft"
                  onClick={onClose}
                  className="group relative block h-full rounded-2xl overflow-hidden shadow-luxury border border-vipasi-gold/40"
                >
                  <img
                    src="/images/collections/collection-01.webp"
                    alt="The Art of the Karigar"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 min-h-[240px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-vipasi-wine/95 via-vipasi-wine/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white space-y-2">
                    <span className="text-[9px] uppercase tracking-[0.25em] text-vipasi-champagne font-bold">
                      Rajasthan Ateliers
                    </span>
                    <h4 className="font-serif text-xl font-bold">THE ART OF THE KARIGAR</h4>
                    <p className="text-xs text-white/80 font-sans">
                      Preserving century-old embroidery traditions with fair artisan wages.
                    </p>
                    <div className="pt-2 flex items-center space-x-1.5 text-xs uppercase tracking-wider font-bold text-vipasi-champagne">
                      <span>Explore Craft</span>
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          )}

          {/* =========================================================
              4. OCCASION DROPDOWN (USES EXACT EXISTING OCCASION DATA & IMAGES)
             ========================================================= */}
          {activeTab === 'OCCASION' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-vipasi-border/70">
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-vipasi-wine font-bold">
                    Celebration Curations
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-vipasi-charcoal mt-0.5">
                    Shop by Occasion
                  </h3>
                </div>
                <Link
                  href="/collections"
                  onClick={onClose}
                  className="text-xs font-sans font-bold uppercase tracking-wider text-vipasi-wine hover:underline flex items-center space-x-1"
                >
                  <span>Explore All Celebrations</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              {/* Exact Occasion Cards from occasionsConfig */}
              <div className="grid grid-cols-4 gap-6">
                {occasionsConfig.map((item) => (
                  <Link
                    key={item.id}
                    href={`/collections?occasion=${item.tag.toLowerCase()}`}
                    onClick={onClose}
                    className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-luxury border border-vipasi-border/80 bg-vipasi-sand"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-vipasi-wine/90 via-vipasi-wine/30 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                      <span className="text-[9px] uppercase tracking-[0.25em] text-vipasi-champagne font-bold block mb-1">
                        {item.count}
                      </span>
                      <h4 className="font-serif text-lg font-bold leading-tight group-hover:text-vipasi-champagne transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-white/80 font-sans mt-0.5 line-clamp-1">
                        {item.tagline}
                      </p>
                      <div className="mt-2 pt-2 border-t border-white/20 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-vipasi-champagne">
                        <span>Explore Curate</span>
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================
              5. OUR STORY DROPDOWN
             ========================================================= */}
          {activeTab === 'OUR STORY' && (
            <div className="grid grid-cols-12 gap-8 items-stretch">
              <div className="col-span-8 space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-vipasi-border/70">
                  <div>
                    <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-vipasi-wine font-bold">
                      Jaipur Legacy
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-vipasi-charcoal mt-0.5">
                      The VIPASI Narrative
                    </h3>
                  </div>
                  <Link
                    href="/about"
                    onClick={onClose}
                    className="text-xs font-sans font-bold uppercase tracking-wider text-vipasi-wine hover:underline flex items-center space-x-1"
                  >
                    <span>Read Full Story</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      title: 'The VIPASI Atelier',
                      desc: 'Our design house rooted in Jaipur, blending royal silken heritage with modern silhouettes.',
                      href: '/about#atelier',
                    },
                    {
                      title: 'Our Craft',
                      desc: 'Pure mulberry silks, authentic mirror-work frames, and zardozi needlecraft.',
                      href: '/about#craft',
                    },
                    {
                      title: 'The Karigar Story',
                      desc: 'Honoring multi-generational artisan families with fair trade and slow fashion.',
                      href: '/about#karigar',
                    },
                    {
                      title: 'Jaipur Heritage',
                      desc: 'Inspired by the terracotta walls, haveli arches, and regal drapes of Rajasthan.',
                      href: '/about#jaipur',
                    },
                    {
                      title: 'Contact Us',
                      desc: 'Visit our flagship atelier at Sector 7 Rd, Malviya Nagar, Jaipur, or chat with styling concierge.',
                      href: '/contact',
                    },
                  ].map((story, i) => (
                    <Link
                      key={i}
                      href={story.href}
                      onClick={onClose}
                      className="group p-4 rounded-2xl bg-white/70 hover:bg-white border border-vipasi-border/60 hover:border-vipasi-gold/60 transition-all hover:shadow-xs"
                    >
                      <h4 className="font-serif text-base font-bold text-vipasi-charcoal group-hover:text-vipasi-wine transition-colors">
                        {story.title}
                      </h4>
                      <p className="text-xs text-vipasi-muted font-sans mt-1 leading-relaxed">
                        {story.desc}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Visual Card: Jaipur Atelier */}
              <div className="col-span-4">
                <div className="relative h-full rounded-2xl overflow-hidden shadow-luxury border border-vipasi-gold/40 p-6 bg-vipasi-wine text-vipasi-cream flex flex-col justify-between">
                  <div className="space-y-3">
                    <img src="/brand/logo-gold.png" alt="VIPASI" className="h-9 w-auto object-contain" />
                    <h4 className="font-serif text-xl font-bold">Jaipur Karigar Sanctuary</h4>
                    <p className="text-xs text-vipasi-cream/80 font-sans leading-relaxed">
                      "Every fold holds a tale, every mirror reflects a lineage of Indian mastery."
                    </p>
                  </div>
                  <div className="pt-4 border-t border-vipasi-champagne/20 space-y-1 text-xs font-sans text-vipasi-champagne">
                    <p className="font-bold">6/7, Sector 7 Rd, Ramji Pura</p>
                    <p>Malviya Nagar, Jaipur, Rajasthan 302017</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
