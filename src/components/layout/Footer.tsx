'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Sparkles,
  Award,
  Truck,
  RefreshCw,
  Mail,
  CheckCircle2,
  Phone,
  Instagram,
  Facebook,
  Youtube,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  MapPin,
} from 'lucide-react';
import { footerSceneConfig } from '@/config/footerScene';
import KarigarParticles from '@/components/footer/KarigarParticles';
import KarigarSkyOverlays from '@/components/footer/KarigarSkyOverlays';
import HotspotDot from '@/components/footer/HotspotDot';
import BackToTopButton from '@/components/footer/BackToTopButton';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const sceneContainerRef = useRef<HTMLDivElement | null>(null);

  // Parallax scroll hooks
  const { scrollYProgress } = useScroll({
    target: sceneContainerRef,
    offset: ['start end', 'end end'],
  });

  // Parallax transforms
  const sunY = useTransform(scrollYProgress, [0, 1], [40, -15]);
  const imageParallaxY = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const giantLogoOpacity = useTransform(scrollYProgress, [0.35, 0.95], [0.18, 0.55]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 6, y: y * 4 });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <footer id="karigar-footer" className="relative w-full overflow-hidden bg-[#F5CBAE] text-vipasi-charcoal select-none">

      {/* ========================================================
          1. WINE NEWSLETTER STRIP
         ======================================================== */}
      <section className="relative bg-vipasi-wine text-vipasi-sand overflow-hidden border-b border-vipasi-champagne/30 pt-3.5 pb-12 sm:pb-14">
        {/* Scrolling Star Marquee along top edge */}
        <div className="w-full overflow-hidden border-b border-vipasi-champagne/15 pb-2.5 mb-8 select-none">
          <div className="flex w-[200%] animate-marquee space-x-8 text-[11px] font-sans uppercase tracking-[0.28em] text-vipasi-champagne/80 font-medium">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="flex items-center space-x-6 whitespace-nowrap">
                <span>The Living Karigar Heritage</span>
                <span className="text-vipasi-champagne">✦</span>
                <span>Handcrafted In Jaipur</span>
                <span className="text-vipasi-champagne">✦</span>
                <span>Pure Zari & Mulberry Silk</span>
                <span className="text-vipasi-champagne">✦</span>
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center space-x-2 text-[10px] sm:text-xs font-sans uppercase tracking-[0.3em] text-vipasi-champagne font-bold mb-2">
            <Sparkles size={12} className="text-vipasi-champagne" />
            <span>VIPASI Circle Invitation</span>
            <Sparkles size={12} className="text-vipasi-champagne" />
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-vipasi-cream font-medium tracking-wide">
            Join the VIPASI <span className="italic font-normal text-vipasi-champagne">circle</span>
          </h2>

          <p className="mt-2.5 text-xs sm:text-sm text-vipasi-cream/80 max-w-lg mx-auto font-sans leading-relaxed">
            Flat Rs 500 off your first order. Code: <strong className="text-vipasi-champagne tracking-widest font-semibold">VIPASI500</strong>
          </p>

          <form onSubmit={handleSubscribe} className="mt-6 max-w-md mx-auto relative">
            <div className="flex items-center rounded-full bg-vipasi-wine-dark/85 border border-vipasi-champagne/45 p-1.5 shadow-2xl focus-within:border-vipasi-champagne transition-all">
              <Mail size={16} className="text-vipasi-champagne/60 ml-3.5 flex-shrink-0" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for private drop invites..."
                className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-vipasi-cream placeholder:text-vipasi-cream/40 focus:outline-none font-sans"
              />
              <button
                type="submit"
                className="relative overflow-hidden group rounded-full bg-vipasi-champagne text-vipasi-wine px-5 py-2.5 text-xs font-sans font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-lg active:scale-95 flex-shrink-0"
              >
                <span className="relative z-10 flex items-center space-x-1.5">
                  {subscribed ? (
                    <>
                      <CheckCircle2 size={14} className="text-vipasi-wine" />
                      <span>Code Sent</span>
                    </>
                  ) : (
                    <>
                      <span>Join Now</span>
                      <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </span>
                <span className="absolute inset-0 bg-vipasi-cream translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </button>
            </div>
            {subscribed && (
              <p className="text-[11px] text-vipasi-champagne mt-2.5 font-sans animate-fadeIn">
                Welcome to the circle! Use code <strong>VIPASI500</strong> at checkout.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* ========================================================
          2. BLUSH-PEACH LINK AREA (Seamless Top Tone: #F5CBAE)
         ======================================================== */}
      <section className="relative bg-[#F5CBAE] text-vipasi-charcoal pt-14 pb-10 overflow-hidden">
        {/* Subtle jaali pattern overlay at 5% */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#3E0B10 1px, transparent 1px), radial-gradient(#3E0B10 1px, #F5CBAE 1px)`,
            backgroundSize: '28px 28px',
            backgroundPosition: '0 0, 14px 14px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Main Grid: Left Brand Block + 4 Link Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-vipasi-wine/15">

            {/* Left Block: Logo + Brand Story + Socials + Contact */}
            <div className="lg:col-span-4 space-y-4">
              <Link href="/" className="inline-block group">
                <img
                  src="/brand/logo.png"
                  alt="VIPASI"
                  className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              <p className="text-xs sm:text-sm text-vipasi-charcoal/80 font-sans leading-relaxed max-w-sm">
                Handcrafted Indian ethnic wear, made by master karigars. Each silhouette carries centuries of royal Rajasthani heritage.
              </p>

              {/* Social Icons */}
              <div className="flex items-center space-x-3 pt-1">
                {[
                  { icon: Instagram, href: 'https://www.instagram.com/vipasi_?stkn=NGU3aGRwMDBkZmlh&utm_source=qr', label: 'Instagram' },
                  { icon: Facebook, href: 'https://www.facebook.com/share/1NA9wMbYJK/?mibextid=wwXIfr', label: 'Facebook' },
                  { icon: Youtube, href: 'https://youtube.com/@vipasi-in?si=DK3j5Z7YYeGBJrzx', label: 'YouTube' },
                  {
                    icon: () => (
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0a12 12 0 0 0-4.37 23.18c-.07-.98-.13-2.48.03-3.55.14-.98.93-3.95.93-3.95s-.24-.48-.24-1.18c0-1.11.64-1.94 1.44-1.94.68 0 1 .51 1 1.12 0 .68-.43 1.7-.66 2.65-.19.79.4 1.44 1.18 1.44 1.42 0 2.51-1.5 2.51-3.66 0-1.91-1.37-3.25-3.34-3.25-2.44 0-3.87 1.83-3.87 3.72 0 .74.28 1.53.64 1.96.07.09.08.17.06.26-.06.27-.21.86-.24.98-.04.16-.13.19-.3.12-1.13-.53-1.84-2.18-1.84-3.51 0-2.86 2.08-5.49 6-5.49 3.15 0 5.6 2.25 5.6 5.25 0 3.13-1.97 5.65-4.71 5.65-.92 0-1.78-.48-2.08-1.04l-.57 2.16c-.2 0.79-.76 1.77-1.13 2.37A12 12 0 1 0 12 0z" />
                      </svg>
                    ),
                    href: 'https://pin.it/7pNLDbxJp',
                    label: 'Pinterest',
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={idx}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="w-8 h-8 rounded-full bg-white/70 border border-vipasi-wine/20 flex items-center justify-center text-vipasi-charcoal hover:bg-vipasi-wine hover:text-vipasi-champagne hover:border-vipasi-wine hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                    >
                      <Icon size={15} />
                    </a>
                  );
                })}
              </div>

              {/* Direct Concierge Contact & Atelier Address */}
              <div className="pt-2">
                <div className="bg-white/70 rounded-xl p-3.5 border border-vipasi-wine/15 space-y-2.5 max-w-sm shadow-xs">
                  {/* WhatsApp Direct Action Button */}
                  <a
                    href="https://wa.me/919799444663?text=Hi%20VIPASI,%20I%20would%20like%20to%20know%20more%20about%20your%20handcrafted%20collections."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-lg text-xs font-sans font-medium transition-all shadow-xs group"
                  >
                    <div className="flex items-center space-x-2">
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                      <span>WhatsApp</span>
                    </div>
                    <span className="text-[11px] font-bold tracking-wider text-emerald-100 group-hover:translate-x-0.5 transition-transform">+91 97994 44663</span>
                  </a>

                  {/* Atelier Address Requested by User */}
                  <div className="flex items-start space-x-2 text-[11px] text-vipasi-charcoal/90 pt-1 border-t border-vipasi-wine/10">
                    <MapPin size={14} className="text-vipasi-wine flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-vipasi-wine font-serif text-xs">Address:</strong>
                      <p className="leading-snug text-vipasi-charcoal/80">
                        6/7, Sector 7 Rd, Ramji Pura, Malviya Nagar, Jaipur, Rajasthan 302017
                      </p>
                    </div>
                  </div>

                  {/* Email Support */}
                  <div className="flex items-center space-x-2 text-[11px] text-vipasi-charcoal/90 pt-0.5">
                    <Mail size={13} className="text-vipasi-wine flex-shrink-0" />
                    <span>Email:</span>
                    <a
                      href="mailto:admin@vipasi.in"
                      className="font-semibold text-vipasi-wine hover:underline"
                    >
                      admin@vipasi.in
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 5 Link Columns: Shop, Craft, Occasion, Help & Account, Legal */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-6">

              {/* Col 1: Shop */}
              <div className="space-y-3">
                <h4 className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-vipasi-wine border-b border-vipasi-wine/20 pb-1.5">
                  Shop
                </h4>
                <ul className="space-y-1.5 text-xs font-sans text-vipasi-charcoal/85">
                  {[
                    { label: 'New Arrivals', href: '/collections?filter=new' },
                    { label: 'Bestsellers', href: '/collections?filter=bestseller' },
                    { label: 'Collections', href: '/collections' },
                    { label: 'Sarees', href: '/collections?category=sarees' },
                    { label: 'Anarkalis', href: '/collections?category=anarkalis' },
                    { label: 'Sharara Sets', href: '/collections?category=shararas' },
                    { label: 'Suit Sets', href: '/collections?category=suit-sets' },
                    { label: 'Lehengas', href: '/collections?category=lehengas' },
                  ].map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="relative group inline-block py-0.5 hover:text-vipasi-wine transition-colors">
                        {item.label}
                        <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-vipasi-wine transition-all duration-300 group-hover:w-full" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 2: Craft */}
              <div className="space-y-3">
                <h4 className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-vipasi-wine border-b border-vipasi-wine/20 pb-1.5">
                  Craft
                </h4>
                <ul className="space-y-1.5 text-xs font-sans text-vipasi-charcoal/85">
                  {[
                    { label: 'Mirror Work', href: '/collections?craft=mirror' },
                    { label: 'Zardozi', href: '/collections?craft=zari' },
                    { label: 'Gota Patti', href: '/collections?craft=gota' },
                    { label: 'Chikankari', href: '/collections?craft=chikankari' },
                    { label: 'Aari', href: '/collections?craft=aari' },
                    { label: 'Dabu', href: '/collections?craft=dabu' },
                  ].map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="relative group inline-block py-0.5 hover:text-vipasi-wine transition-colors">
                        {item.label}
                        <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-vipasi-wine transition-all duration-300 group-hover:w-full" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 3: Occasion */}
              <div className="space-y-3">
                <h4 className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-vipasi-wine border-b border-vipasi-wine/20 pb-1.5">
                  Occasion
                </h4>
                <ul className="space-y-1.5 text-xs font-sans text-vipasi-charcoal/85">
                  {[
                    { label: 'Wedding', href: '/collections?occasion=wedding' },
                    { label: 'Haldi', href: '/collections?occasion=haldi' },
                    { label: 'Mehendi', href: '/collections?occasion=mehendi' },
                    { label: 'Festive', href: '/collections?occasion=festive' },
                    { label: 'Reception', href: '/collections?occasion=reception' },
                  ].map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="relative group inline-block py-0.5 hover:text-vipasi-wine transition-colors">
                        {item.label}
                        <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-vipasi-wine transition-all duration-300 group-hover:w-full" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 4: Help & Account */}
              <div className="space-y-3">
                <h4 className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-vipasi-wine border-b border-vipasi-wine/20 pb-1.5">
                  Account
                </h4>
                <ul className="space-y-1.5 text-xs font-sans text-vipasi-charcoal/85">
                  {[
                    { label: 'My Account', href: '/account' },
                    { label: 'Login', href: '/account' },
                    { label: 'Create Account', href: '/account' },
                    { label: 'Wishlist', href: '/wishlist' },
                    { label: 'Orders', href: '/account' },
                    { label: 'Contact', href: '/contact' },
                  ].map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="relative group inline-block py-0.5 hover:text-vipasi-wine transition-colors">
                        {item.label}
                        <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-vipasi-wine transition-all duration-300 group-hover:w-full" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 5: Legal & Policies */}
              <div className="space-y-3">
                <h4 className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-vipasi-wine border-b border-vipasi-wine/20 pb-1.5">
                  Legal
                </h4>
                <ul className="space-y-1.5 text-xs font-sans text-vipasi-charcoal/85">
                  {[
                    { label: 'Privacy Policy', href: '/privacy-policy' },
                    { label: 'Terms & Conditions', href: '/terms-and-conditions' },
                    { label: 'Shipping Policy', href: '/shipping-policy' },
                    { label: 'Exchange & Returns', href: '/returns-exchange' },
                  ].map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="relative group inline-block py-0.5 hover:text-vipasi-wine transition-colors">
                        {item.label}
                        <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-vipasi-wine transition-all duration-300 group-hover:w-full" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* Trust Row */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: Sparkles, title: '100% Handcrafted', desc: 'Authentic master karigars' },
              { icon: Award, title: 'Silk Mark Certified', desc: 'Guaranteed pure natural silks' },
              { icon: Truck, title: 'Free Express Shipping', desc: 'Complimentary above Rs 1,999' },
              { icon: RefreshCw, title: '7-Day Exchange', desc: 'Doorstep size exchange' },
            ].map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div key={i} className="flex flex-col items-center p-2 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-white/70 flex items-center justify-center text-vipasi-wine mb-1.5 shadow-xs border border-vipasi-wine/10">
                    <Icon size={16} />
                  </div>
                  <h5 className="font-serif text-xs sm:text-sm font-bold text-vipasi-charcoal">{pillar.title}</h5>
                  <p className="text-[10.5px] text-vipasi-charcoal/70 font-sans mt-0.5">{pillar.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================
          3. LIVING SCENE: THE FINISHED PANORAMIC ILLUSTRATION
             (Full-bleed, 100vw, seamless gradient blend at top)
         ======================================================== */}
      <section
        ref={sceneContainerRef}
        onMouseMove={handleMouseMove}
        className="relative w-full overflow-hidden select-none bg-[#F5CBAE]"
      >
        {/* Seamless Top Blend Mask: soft gradient from #F5CBAE into image */}
        <div className="absolute top-0 inset-x-0 h-16 sm:h-24 bg-gradient-to-b from-[#F5CBAE] via-[#F5CBAE]/60 to-transparent z-20 pointer-events-none" />

        {/* Lightweight Canvas Particles (Gold dust + falling marigold petals, max 40, paused off-screen) */}
        <KarigarParticles count={footerSceneConfig.particles.count} />

        {/* Desktop Living Scene Wrapper (100vw, height from 3:1 aspect ratio) */}
        <div className="hidden sm:block relative w-full overflow-hidden">

          {/* Animated Sky Overlays (Rising Sun, Clouds, Birds, Kites, Stars, Garland, Diya) */}
          <KarigarSkyOverlays sunY={sunY} isMobile={false} />

          {/* Panoramic Master Illustration with subtle Parallax and Mouse Shift */}
          <motion.div
            style={{
              y: imageParallaxY,
              x: mousePos.x,
            }}
            className="relative w-full"
          >
            {/* Shimmer Light Sweep across artwork every 6s */}
            <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
              <motion.div
                animate={{ x: ['-120%', '240%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
                className="w-1/3 h-full bg-gradient-to-r from-transparent via-white/18 to-transparent -skew-x-12"
              />
            </div>

            {/* The Untouched Panoramic Illustration (Native Aspect Ratio 1024 / 341) */}
            <img
              src={footerSceneConfig.desktopImage}
              alt="VIPASI The Karigar's World"
              className="w-full h-auto object-cover object-top block"
              draggable={false}
            />

            {/* 6 Pulsing Hotspots (Percentage coordinates locked to artwork) */}
            {footerSceneConfig.hotspots.map((hotspot) => (
              <HotspotDot key={hotspot.id} hotspot={hotspot} isMobile={false} />
            ))}
          </motion.div>
        </div>

        {/* Mobile Living Scene Wrapper (Uses Vertical Mobile Image footer-scene-m.png) */}
        <div className="block sm:hidden relative w-full overflow-hidden">
          <KarigarSkyOverlays sunY={sunY} isMobile={true} />

          <div className="relative w-full">
            <img
              src={footerSceneConfig.mobileImage}
              alt="VIPASI The Karigar's World"
              className="w-full h-auto object-cover object-top block"
              draggable={false}
            />

            {/* Mobile Hotspots */}
            {footerSceneConfig.hotspots.map((hotspot) => (
              <HotspotDot key={hotspot.id} hotspot={hotspot} isMobile={true} />
            ))}
          </div>
        </div>

        {/* Rotating Circular Badge: "HANDCRAFTED HERITAGE • MADE IN INDIA •" */}
        {footerSceneConfig.rotatingBadge.show && (
          <div className="absolute top-6 right-6 sm:top-8 sm:right-10 z-30 select-none pointer-events-none">
            <div className="relative w-20 h-20 sm:w-26 sm:h-26 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 w-full h-full"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <path
                      id="circlePathFooter"
                      d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                    />
                  </defs>
                  <text className="text-[7px] uppercase font-sans font-bold fill-vipasi-wine tracking-[0.24em]">
                    <textPath href="#circlePathFooter" startOffset="0%">
                      {footerSceneConfig.rotatingBadge.text}
                    </textPath>
                  </text>
                </svg>
              </motion.div>
              <div className="w-7 h-7 rounded-full bg-vipasi-wine flex items-center justify-center text-vipasi-champagne shadow-md">
                <Sparkles size={12} />
              </div>
            </div>
          </div>
        )}

        {/* =====================================================
            4. SEAMLESS DUNE OVERLAP (Directly touching illustration with ZERO gap)
           ===================================================== */}
        <div className="relative w-full z-25 -mt-8 sm:-mt-16 md:-mt-24 pointer-events-none">
          {/* Bottom Wave Transition: Elegantly overlaps onto the illustration's bottom sand dunes */}
          <div className="w-full">
            <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-12 sm:h-20 md:h-24 block">
              <path
                d="M 0 100 L 0 45 Q 360 85 720 25 T 1440 50 L 1440 100 Z"
                fill="#3E0B10"
              />
            </svg>
          </div>
        </div>

      </section>

      {/* ========================================================
          5. BOTTOM BAR (Dark Wine Finale with Needle-Thread Button)
         ======================================================== */}
      <section className="relative bg-vipasi-wine text-vipasi-sand py-7 px-4 sm:px-6 lg:px-8 border-t border-vipasi-champagne/25 z-40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">

          {/* Copyright & Legal links */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs text-vipasi-sand/75 font-sans">
            <p>© 2026 VIPASI. All rights reserved. Handcrafted Heritage.</p>
            <div className="flex items-center space-x-4">
              <Link href="/privacy-policy" className="hover:text-vipasi-champagne transition-colors">Privacy Policy</Link>
              <span>•</span>
              <Link href="/terms-and-conditions" className="hover:text-vipasi-champagne transition-colors">Terms & Conditions</Link>
              <span>•</span>
              <Link href="/shipping-policy" className="hover:text-vipasi-champagne transition-colors">Shipping Policy</Link>
              <span>•</span>
              <Link href="/returns-exchange" className="hover:text-vipasi-champagne transition-colors">7-Day Exchange</Link>
            </div>
          </div>

          {/* Payment Trust Badges */}
          <div className="flex items-center space-x-3 text-vipasi-champagne/80 text-[11px] font-sans">
            <div className="flex items-center space-x-1.5 bg-vipasi-wine-dark/80 px-3 py-1.5 rounded-full border border-vipasi-champagne/20">
              <ShieldCheck size={14} className="text-vipasi-champagne" />
              <span>100% Secure Checkout</span>
            </div>
            <div className="flex items-center space-x-1 bg-vipasi-wine-dark/80 px-3 py-1.5 rounded-full border border-vipasi-champagne/20">
              <CreditCard size={14} className="text-vipasi-champagne" />
              <span>UPI • Cards • NetBanking</span>
            </div>
          </div>

          {/* Stitch-to-Top Needle Button */}
          <div className="flex items-center space-x-3">
            <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest text-vipasi-champagne/70 font-sans">
              Stitch to Top
            </span>
            <BackToTopButton />
          </div>
        </div>
      </section>

    </footer>
  );
}
