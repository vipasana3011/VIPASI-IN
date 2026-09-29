'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Search, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

interface MobileTabBarProps {
  onOpenSearch: () => void;
}

export default function MobileTabBar({ onOpenSearch }: MobileTabBarProps) {
  const pathname = usePathname();
  const { cartCount, setIsCartOpen, wishlist } = useCart();

  const tabs = [
    { id: 'home', label: 'Home', icon: Home, href: '/' },
    { id: 'shop', label: 'Shop', icon: Compass, href: '/collections' },
    { id: 'search', label: 'Search', icon: Search, onClick: onOpenSearch },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, href: '/wishlist', badge: wishlist.length },
    { id: 'bag', label: 'Bag', icon: ShoppingBag, onClick: () => setIsCartOpen(true), badge: cartCount },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-vipasi-cream/95 backdrop-blur-xl border-t border-vipasi-border/80 px-2 py-1.5 shadow-[0_-4px_20px_rgba(62,11,16,0.08)]">
      <nav className="flex items-center justify-around max-w-md mx-auto relative">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.href ? pathname === tab.href : false;

          const content = (
            <div className="flex flex-col items-center justify-center py-1 px-3 relative group">
              <div className="relative">
                <Icon
                  size={19}
                  className={`transition-colors duration-200 ${
                    isActive ? 'text-vipasi-wine' : 'text-vipasi-charcoal/70 group-hover:text-vipasi-wine'
                  }`}
                />
                {tab.badge !== undefined && tab.badge > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-2 min-w-4 h-4 rounded-full bg-vipasi-wine text-vipasi-sand text-[9px] font-sans font-bold flex items-center justify-center px-1"
                  >
                    {tab.badge}
                  </motion.span>
                )}
              </div>
              <span
                className={`text-[9px] font-sans uppercase tracking-wider mt-1 transition-colors ${
                  isActive ? 'text-vipasi-wine font-bold' : 'text-vipasi-muted'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="mobileActiveTabPill"
                  className="absolute bottom-0 w-8 h-0.5 bg-vipasi-wine rounded-full"
                />
              )}
            </div>
          );

          if (tab.onClick) {
            return (
              <button key={tab.id} onClick={tab.onClick} className="focus:outline-none">
                {content}
              </button>
            );
          }

          return (
            <Link key={tab.id} href={tab.href!} className="focus:outline-none">
              {content}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
