'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { collections } from '@/config/collections';
import CollectionCard from './CollectionCard';
import { ArrowRight } from 'lucide-react';

interface CollectionsSectionProps {
  onSelectCollection?: (id: string) => void;
}

export default function CollectionsSection({ onSelectCollection }: CollectionsSectionProps) {
  return (
    <section
      id="explore-collections"
      className="relative bg-vipasi-cream py-24 sm:py-32 lg:py-40 overflow-hidden border-b border-vipasi-border/80"
    >
      {/* Subtle luxury paper / linen texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#C59A3F_1px,transparent_1px)] [background-size:28px_28px]"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 lg:mb-20 gap-6">
          <div className="max-w-2xl space-y-3">
            
            {/* Eyebrow Label with Gold Star ✦ */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 text-vipasi-wine text-xs uppercase tracking-[0.3em] font-sans font-semibold"
            >
              <span className="text-vipasi-champagne">✦</span>
              <span>THE VIPASI EDIT</span>
              <span className="text-vipasi-champagne">✦</span>
            </motion.div>

            {/* Large Serif Heading with Mixed Italic + Hand-drawn Gold Underline */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative"
            >
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-vipasi-charcoal font-bold tracking-tight leading-[1.12]">
                Explore our{' '}
                <span className="relative inline-block text-vipasi-wine italic font-normal">
                  Collections
                  {/* SVG Hand-drawn Gold Underline that draws on scroll */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-vipasi-champagne overflow-visible"
                    viewBox="0 0 100 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.path
                      d="M2 8C25 3 75 11 98 4"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </svg>
                </span>
              </h2>
            </motion.div>

            {/* Supporting Text (Under 15 words) */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs sm:text-sm text-vipasi-muted font-sans max-w-md leading-relaxed pt-1"
            >
              Handcrafted design narratives celebrating centuries of royal Indian textile mastery and artisan dignity.
            </motion.p>
          </div>

          {/* Right: "View all" with animated gold underline on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden md:flex items-center"
          >
            <a
              href="#collections"
              className="group relative inline-flex items-center space-x-2 text-xs uppercase tracking-[0.22em] font-sans font-semibold text-vipasi-wine hover:text-vipasi-wine-light py-2"
            >
              <span>View all collections</span>
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1.5 transition-transform duration-300"
              />
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-vipasi-champagne group-hover:w-full transition-all duration-300 rounded-full" />
            </a>
          </motion.div>
        </div>

        {/* 4 Cards Grid */}
        {/* Desktop: 4 cards in 1 row (with cards 2 & 4 staggered), Tablet: 2 cols, Mobile: 2 cols with 12px gap */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-7 pb-4">
          {collections.map((item, idx) => (
            <CollectionCard
              key={item.id}
              collection={item}
              index={idx}
              onSelect={onSelectCollection}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
