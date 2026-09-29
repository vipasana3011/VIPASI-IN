'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { FEATURED_PRODUCTS } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import {
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
  Filter,
  X,
} from 'lucide-react';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryCollectionsPage({ params }: CategoryPageProps) {
  // Normalize category slug
  const rawCategory = params.category.toLowerCase();
  const normalizedCategory = rawCategory.includes('anarkali')
    ? 'anarkalis'
    : rawCategory.includes('saree')
    ? 'sarees'
    : rawCategory.includes('sharara')
    ? 'shararas'
    : rawCategory.includes('suit') || rawCategory.includes('signature')
    ? 'suit-sets'
    : rawCategory.includes('festive')
    ? 'festive'
    : rawCategory;

  const [selectedCategory, setSelectedCategory] = useState<string>(normalizedCategory);
  const [selectedCraft, setSelectedCraft] = useState<string>('all');
  const [selectedFabric, setSelectedFabric] = useState<string>('all');
  const [selectedPriceMax, setSelectedPriceMax] = useState<number>(15000);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  const FABRICS = ['all', 'Georgette', 'Chanderi', 'Organza Silk', 'Maslin', 'Brocade', 'Upada Silk'];
  const CRAFTS = ['all', 'Mirror work', 'Sequin work', 'Tie and dye', 'Zari', 'Antique Work'];

  const filteredProducts = useMemo(() => {
    let list = [...FEATURED_PRODUCTS];

    if (selectedCategory !== 'all') {
      if (selectedCategory === 'festive') {
        list = list.filter((p) => p.collection.toLowerCase().includes('festive') || p.badge === 'Bestseller');
      } else {
        list = list.filter((p) => p.category === selectedCategory);
      }
    }

    if (selectedFabric !== 'all') {
      list = list.filter((p) => p.fabric.toLowerCase().includes(selectedFabric.toLowerCase()));
    }

    if (selectedCraft !== 'all') {
      list = list.filter((p) => p.craftTechnique.toLowerCase().includes(selectedCraft.toLowerCase()));
    }

    list = list.filter((p) => p.price <= selectedPriceMax);

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, selectedFabric, selectedCraft, selectedPriceMax, sortBy]);

  const categoryTitles: Record<string, { title: string; subtitle: string }> = {
    anarkalis: {
      title: 'Royal Anarkali Sets',
      subtitle: 'Dramatic 9-metre kalidar flares adorned with delicate aari needlework and pure zari.',
    },
    sarees: {
      title: 'Handloom Banarasi & Silk Sarees',
      subtitle: 'Auspicious metallic zari drapes woven by generational master karigars.',
    },
    shararas: {
      title: 'Festive Sharara & Gharara Ensembles',
      subtitle: 'Layered tiered silhouettes with artisanal mirror-work ideal for sangeet and mehendi.',
    },
    'suit-sets': {
      title: 'Signature Chanderi Suit Sets',
      subtitle: 'Lightweight handblock dabu and sequin kurtis paired with breezy silk dupattas.',
    },
    festive: {
      title: 'The Festive Noor Edit 2026',
      subtitle: 'Celebration-ready deep wines, sunshine haldi tones, and royal Jaipur craftsmanship.',
    },
  };

  const currentMeta = categoryTitles[selectedCategory] || {
    title: `${params.category.replace(/-/g, ' ').toUpperCase()} Collection`,
    subtitle: 'Handcrafted Indian ethnic silhouettes guided by generational artisan dignity.',
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-vipasi-charcoal select-none">
      
      {/* Breadcrumbs */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs font-sans text-vipasi-muted flex items-center space-x-2">
        <Link href="/" className="hover:text-vipasi-wine transition-colors">Home</Link>
        <ChevronRight size={12} />
        <Link href="/collections" className="hover:text-vipasi-wine transition-colors">Collections</Link>
        <ChevronRight size={12} />
        <span className="capitalize text-vipasi-wine font-bold">{params.category.replace(/-/g, ' ')}</span>
      </nav>

      {/* Editorial Category Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 text-center">
        <div className="inline-flex items-center space-x-2 text-vipasi-wine text-xs uppercase tracking-[0.28em] font-sans font-semibold mb-2">
          <Sparkles size={13} className="text-vipasi-champagne" />
          <span>AUTHENTIC RAJASTHANI ATELIERS</span>
          <Sparkles size={13} className="text-vipasi-champagne" />
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-vipasi-charcoal tracking-tight">
          {currentMeta.title}
        </h1>
        <p className="text-xs sm:text-sm text-vipasi-muted mt-2 font-sans max-w-xl mx-auto leading-relaxed">
          {currentMeta.subtitle}
        </p>

        {/* Category Navigation Switcher */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 mt-6 no-scrollbar gap-2 sm:gap-3">
          {[
            { id: 'all', label: 'All Ensembles', href: '/collections' },
            { id: 'anarkalis', label: 'Anarkalis', href: '/collections/anarkalis' },
            { id: 'shararas', label: 'Shararas', href: '/collections/shararas' },
            { id: 'sarees', label: 'Handloom Sarees', href: '/collections/sarees' },
            { id: 'suit-sets', label: 'Suit Sets', href: '/collections/suit-sets' },
            { id: 'festive', label: 'Festive Edit', href: '/collections/festive' },
          ].map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={`px-4 py-2 rounded-full text-xs font-sans uppercase tracking-[0.15em] transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-vipasi-wine text-vipasi-champagne font-bold shadow-md scale-105'
                    : 'bg-white hover:bg-vipasi-sand text-vipasi-charcoal/80 border border-vipasi-border/80'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Toolbar */}
        <div className="bg-white rounded-2xl p-4 border border-[#E9E1D6] mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
          <span className="text-xs text-vipasi-muted font-sans">
            Showing <strong className="text-vipasi-wine">{filteredProducts.length}</strong> master creations
          </span>

          <div className="flex items-center space-x-2 bg-[#FAF7F2] px-3.5 py-1.5 rounded-full border border-vipasi-border text-xs">
            <SlidersHorizontal size={13} className="text-vipasi-wine" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-vipasi-charcoal focus:outline-none cursor-pointer font-medium font-sans"
            >
              <option value="featured">Featured Masterpieces</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
          </div>
        </div>

        {/* 4-col Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-vipasi-border p-8">
            <p className="font-serif text-xl font-bold text-vipasi-charcoal">No ensembles found</p>
            <Link
              href="/collections"
              className="mt-4 inline-block bg-vipasi-wine text-vipasi-sand text-xs px-6 py-2.5 rounded-full uppercase tracking-wider font-bold"
            >
              View All Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
