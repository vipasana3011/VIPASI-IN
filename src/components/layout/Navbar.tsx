'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Phone,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import MegaMenu, { MenuTab } from './MegaMenu';
import SearchOverlay from './SearchOverlay';
import MobileTabBar from './MobileTabBar';

const ANNOUNCEMENT_MESSAGES = [
  'Welcome Gift: Flat ₹500 off your first handcrafted order with code VIPASI500',
  'Complimentary Express Pan-India Delivery on orders above ₹1,999',
  'Artisan Heritage: Pure Silk & Handloom Weaves direct from Jaipur ateliers',
];

export default function Navbar() {
  const { cartCount, setIsCartOpen, wishlist } = useCart();
  const { user, isLoggedIn, openAuthModal } = useAuth();

  // Active mega menu tab
  const [activeTab, setActiveTab] = useState<MenuTab | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  // Scroll visibility
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Announcement index
  const [announcementIdx, setAnnouncementIdx] = useState(0);

  // Hover intent debounce timer
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const headerContainerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (currentScrollY > 150) {
        if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 6) {
          setVisible(false);
          setActiveTab(null);
        } else if (lastScrollY.current - currentScrollY > 6) {
          setVisible(true);
        }
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Announcement auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIdx((prev) => (prev + 1) % ANNOUNCEMENT_MESSAGES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Keyboard and outside click handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveTab(null);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (headerContainerRef.current && !headerContainerRef.current.contains(e.target as Node)) {
        setActiveTab(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Desktop Hover Handlers with safe debounce buffer
  const handleTriggerEnter = (tab: MenuTab) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActiveTab(tab);
  };

  const handleTriggerLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveTab(null);
    }, 280); // 280ms cushion allows smooth cursor travel into mega menu
  };

  const handleMenuEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  const handleMenuLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveTab(null);
    }, 280);
  };

  const handleTriggerClick = (tab: MenuTab) => {
    setActiveTab((prev) => (prev === tab ? null : tab));
  };

  const primaryNavItems: { label: MenuTab; badge?: string; isFestive?: boolean }[] = [
    { label: 'NEW', badge: 'New' },
    { label: 'SHOP' },
    { label: 'CRAFT' },
    { label: 'OCCASION', badge: 'Festive', isFestive: true },
    { label: 'OUR STORY' },
  ];

  return (
    <>
      <header
        ref={headerContainerRef}
        className={`sticky top-0 z-40 w-full transition-transform duration-300 ${
          visible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* ========================================================
            LAYER 1: SLIM WINE ANNOUNCEMENT BAR
           ======================================================== */}
        <div className="bg-vipasi-wine text-vipasi-sand py-2 px-4 border-b border-vipasi-champagne/20 overflow-hidden select-none">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs tracking-wider">
            {/* Left Tag */}
            <div className="hidden lg:flex items-center space-x-2 text-[10.5px] uppercase tracking-[0.25em] text-vipasi-champagne font-sans font-medium">
              <span>VIPASI</span>
              <span className="text-vipasi-champagne/60">★</span>
              <span>Jaipur Ateliers</span>
            </div>

            {/* Center Rotating Message */}
            <div className="flex-1 flex items-center justify-center space-x-3 text-center px-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={announcementIdx}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.28 }}
                  className="flex items-center space-x-2 text-[11px] sm:text-xs text-vipasi-cream font-sans"
                >
                  <Sparkles size={12} className="text-vipasi-champagne flex-shrink-0" />
                  <span>{ANNOUNCEMENT_MESSAGES[announcementIdx]}</span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Help Link */}
            <div className="hidden lg:flex items-center space-x-4 text-[11px] text-vipasi-champagne font-sans font-medium">
              <Link href="/contact" className="hover:underline flex items-center space-x-1">
                <Phone size={11} />
                <span>Atelier Concierge</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ========================================================
            LAYER 2: MAIN LUXURY HEADER BAR (76px Height)
           ======================================================== */}
        <div
          className={`w-full bg-[#FAF5EC]/95 backdrop-blur-md border-b border-vipasi-gold/30 transition-shadow duration-300 ${
            scrolled ? 'shadow-[0_4px_25px_rgba(62,11,16,0.08)]' : ''
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-[72px] sm:h-[76px] gap-4">
              
              {/* ==========================================
                  ZONE 1 (FAR LEFT): BRAND LOGO (DESKTOP)
                  MOBILE: HAMBURGER BUTTON
                 ========================================== */}
              <div className="flex items-center">
                {/* Mobile Hamburger Button */}
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden p-2 -ml-2 text-vipasi-charcoal hover:text-vipasi-wine transition-colors"
                  aria-label="Open mobile navigation"
                >
                  <Menu size={24} />
                </button>

                {/* Desktop Brand Logo */}
                <Link href="/" className="hidden lg:flex items-center space-x-3 group">
                  <div className="h-11 flex items-center justify-center">
                    <img
                      src="/brand/logo.png"
                      alt="VIPASI Atelier"
                      className="h-full w-auto object-contain transition-transform group-hover:scale-105 duration-300"
                    />
                  </div>
                  <div className="flex flex-col border-l border-vipasi-gold/50 pl-3">
                    <span className="text-[9px] uppercase tracking-[0.3em] font-sans font-semibold text-vipasi-wine leading-tight">
                      Royal Jaipur
                    </span>
                    <span className="text-[7.5px] uppercase tracking-[0.2em] font-sans text-vipasi-muted leading-tight">
                      Atelier Heritage
                    </span>
                  </div>
                </Link>
              </div>

              {/* ==========================================
                  ZONE 2 (CENTER): PRIMARY NAVIGATION (DESKTOP)
                  MOBILE: CENTERED LOGO
                 ========================================== */}
              <div className="flex items-center justify-center">
                {/* Desktop Primary Nav Items */}
                <nav
                  className="hidden lg:flex items-center space-x-1"
                  onMouseLeave={handleTriggerLeave}
                >
                  {primaryNavItems.map((item) => {
                    const isActive = activeTab === item.label;
                    return (
                      <div
                        key={item.label}
                        onMouseEnter={() => handleTriggerEnter(item.label)}
                        className="relative"
                      >
                        <button
                          type="button"
                          aria-expanded={isActive}
                          aria-haspopup="true"
                          onClick={() => handleTriggerClick(item.label)}
                          className={`relative flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans uppercase tracking-[0.18em] transition-all duration-200 cursor-pointer ${
                            isActive
                              ? 'bg-vipasi-wine text-vipasi-cream font-semibold shadow-sm'
                              : 'text-vipasi-charcoal/85 hover:text-vipasi-wine'
                          }`}
                        >
                          <span>{item.label}</span>

                          {item.badge && (
                            <span
                              className={`text-[8.5px] uppercase font-bold tracking-widest px-1.5 py-0.2 rounded-full ${
                                item.isFestive
                                  ? 'bg-vipasi-champagne text-vipasi-wine'
                                  : 'bg-vipasi-wine-light text-vipasi-cream'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}

                          <ChevronDown
                            size={12}
                            className={`transition-transform duration-200 ${
                              isActive ? 'rotate-180 text-vipasi-champagne' : 'text-vipasi-muted'
                            }`}
                          />
                        </button>
                      </div>
                    );
                  })}
                </nav>

                {/* Mobile Centered Logo */}
                <Link href="/" className="lg:hidden flex flex-col items-center group">
                  <div className="h-8 flex items-center justify-center">
                    <img
                      src="/brand/logo.png"
                      alt="VIPASI"
                      className="h-full w-auto object-contain"
                    />
                  </div>
                  <span className="text-[7px] uppercase tracking-[0.34em] text-vipasi-wine/80 font-sans font-medium -mt-0.5">
                    Handcrafted Heritage
                  </span>
                </Link>
              </div>

              {/* ==========================================
                  ZONE 3 (RIGHT): STRUCTURED SEARCH BAR + ICONS
                 ========================================== */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                {/* Desktop Structured Search Input Bar */}
                <div
                  onClick={() => setIsSearchOpen(true)}
                  className="hidden md:flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white/80 border border-vipasi-border hover:border-vipasi-gold/70 text-vipasi-muted hover:text-vipasi-charcoal cursor-pointer transition-all w-44 lg:w-56 shadow-xs"
                >
                  <Search size={14} className="text-vipasi-wine flex-shrink-0" />
                  <span className="text-xs font-sans tracking-wide truncate">
                    Search silks, crafts...
                  </span>
                  <span className="text-[10px] font-sans font-bold px-1.5 py-0.5 bg-vipasi-sand/80 text-vipasi-charcoal/70 rounded ml-auto">
                    ⌘K
                  </span>
                </div>

                {/* Mobile Search Icon Trigger */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="md:hidden p-1.5 text-vipasi-charcoal hover:text-vipasi-wine transition-colors"
                  aria-label="Search collection"
                >
                  <Search size={20} />
                </button>

                {/* Wishlist Button with Counter */}
                <Link
                  href="/wishlist"
                  className="hidden sm:inline-flex relative p-1.5 text-vipasi-charcoal hover:text-vipasi-wine transition-colors"
                  aria-label="Wishlist"
                >
                  <Heart size={20} />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-4 h-4 rounded-full bg-vipasi-wine text-vipasi-sand text-[9px] font-sans font-bold flex items-center justify-center px-1">
                      {wishlist.length}
                    </span>
                  )}
                </Link>

                {/* Customer Account Button with Status Indicator */}
                <button
                  type="button"
                  onClick={() => {
                    if (isLoggedIn) {
                      window.location.href = '/account';
                    } else {
                      openAuthModal('login');
                    }
                  }}
                  className="relative p-1.5 text-vipasi-charcoal hover:text-vipasi-wine transition-colors"
                  aria-label="Customer Account"
                >
                  <User size={20} />
                  {isLoggedIn && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-white" />
                  )}
                </button>

                {/* Shopping Bag Button with Total Badge */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-1.5 text-vipasi-wine hover:text-vipasi-charcoal transition-colors group"
                  aria-label={`Cart with ${cartCount} items`}
                >
                  <ShoppingBag size={21} className="transition-transform group-hover:scale-110" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-4 h-4 rounded-full bg-vipasi-wine text-vipasi-champagne text-[9px] font-sans font-bold flex items-center justify-center px-1 shadow-sm border border-vipasi-champagne/40 animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mega Menu Dropdown with safe hover listeners */}
        <MegaMenu
          activeTab={activeTab}
          onClose={() => setActiveTab(null)}
          onMouseEnter={handleMenuEnter}
          onMouseLeave={handleMenuLeave}
        />
      </header>

      {/* Full-Screen Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Fixed Bottom Mobile Tab Bar */}
      <MobileTabBar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* ========================================================
          MOBILE FULL-SCREEN MENU DRAWER (Wine Background)
         ======================================================== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-vipasi-wine text-vipasi-sand flex flex-col overflow-y-auto lg:hidden"
          >
            {/* Mobile Header with Real Logo and Close */}
            <div className="flex items-center justify-between p-6 border-b border-vipasi-champagne/20">
              <img src="/brand/logo-gold.png" alt="VIPASI" className="h-10 w-auto object-contain" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full text-vipasi-champagne hover:bg-white/10"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Accordion Links List */}
            <div className="flex-1 px-6 py-6 space-y-4">
              
              {/* Accordion 1: NEW */}
              <div className="border-b border-vipasi-champagne/15 pb-4">
                <button
                  onClick={() => setMobileAccordion(mobileAccordion === 'new' ? null : 'new')}
                  className="w-full flex items-center justify-between font-serif text-2xl text-vipasi-cream py-2"
                >
                  <span>New In</span>
                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-300 text-vipasi-champagne ${
                      mobileAccordion === 'new' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {mobileAccordion === 'new' && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden space-y-2.5 pt-2 pl-3 text-sm font-sans text-vipasi-sand/85"
                    >
                      {[
                        { title: 'New Arrivals', href: '/collections?filter=new' },
                        { title: 'Just In', href: '/collections?filter=just-in' },
                        { title: 'Bestseller Edit', href: '/collections?filter=bestseller' },
                        { title: 'Limited Drops', href: '/collections?filter=limited' },
                        { title: 'Trending Now', href: '/collections?filter=trending' },
                      ].map((item) => (
                        <li key={item.title}>
                          <Link
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-1 hover:text-vipasi-champagne"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion 2: SHOP */}
              <div className="border-b border-vipasi-champagne/15 pb-4">
                <button
                  onClick={() => setMobileAccordion(mobileAccordion === 'shop' ? null : 'shop')}
                  className="w-full flex items-center justify-between font-serif text-2xl text-vipasi-cream py-2"
                >
                  <span>Shop Creations</span>
                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-300 text-vipasi-champagne ${
                      mobileAccordion === 'shop' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {mobileAccordion === 'shop' && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden space-y-2.5 pt-2 pl-3 text-sm font-sans text-vipasi-sand/85"
                    >
                      {[
                        { title: 'All Handcrafted Collections', href: '/collections' },
                        { title: 'Handloom Sarees', href: '/collections?category=sarees' },
                        { title: 'Flared Anarkalis', href: '/collections?category=anarkalis' },
                        { title: 'Festive Sharara Sets', href: '/collections?category=shararas' },
                        { title: 'Classic Suit Sets', href: '/collections?category=suit-sets' },
                        { title: 'Heirloom Lehengas', href: '/collections?category=lehengas' },
                        { title: 'Artisanal Co-ords', href: '/collections?category=co-ords' },
                      ].map((item) => (
                        <li key={item.title}>
                          <Link
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-1 hover:text-vipasi-champagne"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion 3: CRAFT */}
              <div className="border-b border-vipasi-champagne/15 pb-4">
                <button
                  onClick={() => setMobileAccordion(mobileAccordion === 'craft' ? null : 'craft')}
                  className="w-full flex items-center justify-between font-serif text-2xl text-vipasi-cream py-2"
                >
                  <span>Karigar Crafts</span>
                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-300 text-vipasi-champagne ${
                      mobileAccordion === 'craft' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {mobileAccordion === 'craft' && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden space-y-2.5 pt-2 pl-3 text-sm font-sans text-vipasi-sand/85"
                    >
                      {[
                        { title: 'Mirror Work Embellishment', href: '/collections?craft=mirror' },
                        { title: 'Zardozi Metallic Needlework', href: '/collections?craft=zari' },
                        { title: 'Jaipuri Gota Patti Applique', href: '/collections?craft=gota' },
                        { title: 'Lucknowi Chikankari', href: '/collections?craft=chikankari' },
                        { title: 'Aari Fine Hook Needlework', href: '/collections?craft=aari' },
                        { title: 'Dabu Handblock Printing', href: '/collections?craft=dabu' },
                        { title: 'Sequin Handwork', href: '/collections?craft=sequin' },
                      ].map((item) => (
                        <li key={item.title}>
                          <Link
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-1 hover:text-vipasi-champagne"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion 4: OCCASION */}
              <div className="border-b border-vipasi-champagne/15 pb-4">
                <button
                  onClick={() => setMobileAccordion(mobileAccordion === 'occasion' ? null : 'occasion')}
                  className="w-full flex items-center justify-between font-serif text-2xl text-vipasi-cream py-2"
                >
                  <span>Shop by Occasion</span>
                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-300 text-vipasi-champagne ${
                      mobileAccordion === 'occasion' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {mobileAccordion === 'occasion' && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden space-y-2.5 pt-2 pl-3 text-sm font-sans text-vipasi-sand/85"
                    >
                      {[
                        { title: 'Haldi Sunshine (Yellows & Lemons)', href: '/collections?occasion=haldi' },
                        { title: 'Mehendi & Sangeet (Greens & Pinks)', href: '/collections?occasion=mehendi' },
                        { title: 'Royal Wedding Guest (Heirloom Silks)', href: '/collections?occasion=wedding' },
                        { title: 'Festive Puja & Diwali (Rich Silks)', href: '/collections?occasion=festive' },
                        { title: 'Cocktail & Reception (Organza Drapes)', href: '/collections?occasion=reception' },
                      ].map((item) => (
                        <li key={item.title}>
                          <Link
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-1 hover:text-vipasi-champagne"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              {/* Direct Link: OUR STORY */}
              <div className="border-b border-vipasi-champagne/15 pb-4">
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-serif text-2xl text-vipasi-cream py-2 hover:text-vipasi-champagne"
                >
                  Our Story & Heritage
                </Link>
              </div>

              {/* Direct Link: ACCOUNT PORTAL */}
              <div className="border-b border-vipasi-champagne/15 pb-4">
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between font-serif text-2xl text-vipasi-cream py-2 hover:text-vipasi-champagne"
                >
                  <span>{isLoggedIn ? `My Account (${user?.fullName})` : 'Sign In / Register'}</span>
                  <ArrowRight size={18} className="text-vipasi-champagne" />
                </Link>
              </div>

            </div>

            {/* Mobile Drawer Footer */}
            <div className="p-6 bg-vipasi-wine-light/30 border-t border-vipasi-champagne/20 space-y-3 text-xs font-sans text-vipasi-sand/80">
              <div className="flex items-center space-x-2">
                <Phone size={14} className="text-vipasi-champagne" />
                <span>Jaipur Atelier: +91 97994 44663</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck size={14} className="text-vipasi-champagne" />
                <span>6/7, Sector 7 Rd, Malviya Nagar, Jaipur</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
