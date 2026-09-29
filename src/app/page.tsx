'use client';

import React, { useState, useMemo } from 'react';
import HeroBanner from '@/components/home/HeroBanner';
import CraftMarquee from '@/components/home/CraftMarquee';
import CollectionsSection from '@/components/home/CollectionsSection';
import CategorySection from '@/components/home/CategorySection';
import ShopByOccasion from '@/components/home/ShopByOccasion';
import TrustHighlights from '@/components/home/TrustHighlights';
import ArtisanStory from '@/components/home/ArtisanStory';
import ProductCard from '@/components/product/ProductCard';
import QuickViewModal from '@/components/product/QuickViewModal';
import { FEATURED_PRODUCTS } from '@/data/products';
import { Product } from '@/types/product';
import { SlidersHorizontal, Sparkles, Star, Quote, CheckCircle } from 'lucide-react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCraft, setSelectedCraft] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Available craft technique filters extracted from real products
  const CRAFT_FILTERS = [
    { label: 'All Ensembles', value: 'all' },
    { label: 'Mirror Work', value: 'mirror' },
    { label: 'Pure Chanderi', value: 'chanderi' },
    { label: 'Zari & Brocade', value: 'brocade' },
    { label: 'Organza Silk', value: 'organza' },
    { label: 'Sequin Handwork', value: 'sequin' },
    { label: 'Maslin Silk', value: 'maslin' },
  ];

  // Collection filter handler
  const handleCollectionFilter = (id: string) => {
    if (id === 'sarees' || id === 'anarkalis' || id === 'shararas') {
      setSelectedCategory(id);
      setSelectedCraft('all');
      setSearchQuery('');
    } else if (id === 'festive-edit') {
      setSelectedCategory('all');
      setSelectedCraft('all');
      setSearchQuery('festive');
    } else {
      setSelectedCategory('all');
      setSelectedCraft('all');
      setSearchQuery('');
    }
    const element = document.getElementById('collections');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // Occasion filter handler
  const handleOccasionFilter = (tag: string) => {
    setSelectedCategory('all');
    setSelectedCraft('all');
    setSearchQuery(tag);
    const element = document.getElementById('collections');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // Filtered & sorted real products
  const filteredProducts = useMemo(() => {
    let list = [...FEATURED_PRODUCTS];

    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (selectedCraft !== 'all') {
      list = list.filter((p) =>
        p.craftTechnique.toLowerCase().includes(selectedCraft.toLowerCase()) ||
        p.fabric.toLowerCase().includes(selectedCraft.toLowerCase()) ||
        p.description.toLowerCase().includes(selectedCraft.toLowerCase())
      );
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.craftTechnique.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.colorName.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, selectedCraft, searchQuery, sortBy]);

  return (
    <div>
      {/* 1. Full-Screen Edge-to-Edge Text-Free Hero Slider */}
      <HeroBanner />

      {/* 2. Infinite Craft Marquee Strip */}
      <CraftMarquee />

      {/* 3. Fully Animated "Explore Our Collections" Editorial Section */}
      <CollectionsSection onSelectCollection={handleCollectionFilter} />

      {/* 4. Trust Highlights & Quality Guarantees */}
      <TrustHighlights />

      {/* 5. Aachho-Style Story Circles (Shop by Category) */}
      <CategorySection
        selectedCategory={selectedCategory}
        onSelectCategory={(catId) => {
          setSelectedCategory(selectedCategory === catId ? 'all' : catId);
          setSearchQuery('');
        }}
      />

      {/* 6. Shop By Occasion Curation (Haldi, Mehendi, Diwali, Wedding) */}
      <ShopByOccasion onFilterOccasion={handleOccasionFilter} />

      {/* 7. Main Catalog & Shopping Grid with Structured Categories & Real Vipasi Outfits */}
      <section id="collections" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 text-vipasi-wine text-xs uppercase tracking-[0.28em] font-sans font-semibold mb-2">
            <Sparkles size={13} className="text-vipasi-champagne" />
            <span>THE VIPASI ATELIER</span>
            <Sparkles size={13} className="text-vipasi-champagne" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-vipasi-charcoal tracking-tight">
            Handcrafted <span className="italic font-normal text-vipasi-wine">Royal Ensembles</span>
          </h2>
          <p className="text-xs sm:text-sm text-vipasi-muted mt-2 font-sans max-w-lg mx-auto leading-relaxed">
            Discover our complete repertoire of pure handloom silks, authentic mirror-work, and regal Kalidar silhouettes hand-finished in Jaipur.
          </p>
        </div>

        {/* ========================================================
            CATEGORY SELECTION TABS (Structured Silhouette Discovery)
           ======================================================== */}
        <div className="w-full overflow-x-auto py-2 mb-8 no-scrollbar scroll-smooth">
          <div className="flex items-center justify-start md:justify-center min-w-max px-4 sm:px-6 mx-auto gap-2 sm:gap-3">
            {[
              { id: 'all', label: 'All Ensembles', count: 22 },
              { id: 'anarkalis', label: 'Anarkalis', count: 9 },
              { id: 'shararas', label: 'Sharara Sets', count: 5 },
              { id: 'sarees', label: 'Handloom Sarees', count: 5 },
              { id: 'suit-sets', label: 'Suit Sets', count: 1 },
              { id: 'co-ords', label: 'Co-ords', count: 1 },
              { id: 'lehengas', label: 'Festive Lehengas', count: 1 },
            ].map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSearchQuery('');
                  }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-sans uppercase tracking-[0.15em] transition-all duration-200 whitespace-nowrap cursor-pointer shadow-xs ${
                    isActive
                      ? 'bg-vipasi-wine text-vipasi-champagne font-bold shadow-md scale-105'
                      : 'bg-white hover:bg-vipasi-sand text-vipasi-charcoal/80 border border-vipasi-border/80'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? 'bg-vipasi-champagne text-vipasi-wine font-bold'
                        : 'bg-vipasi-sand text-vipasi-charcoal/70'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            TOOLBAR: CRAFT FILTER PILLS & SORT DROPDOWN
           ======================================================== */}
        <div className="bg-[#FAF4E8]/90 rounded-2xl p-3 sm:p-4 border border-vipasi-border mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
          
          {/* Craft Filter Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto max-w-full pb-1 md:pb-0 no-scrollbar w-full md:w-auto">
            <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-vipasi-muted whitespace-nowrap mr-1 hidden sm:inline">
              Craft:
            </span>
            {CRAFT_FILTERS.map((craft) => (
              <button
                key={craft.value}
                onClick={() => {
                  setSelectedCraft(craft.value);
                  setSearchQuery('');
                }}
                className={`px-3 py-1 rounded-full text-xs font-sans whitespace-nowrap transition-all ${
                  selectedCraft === craft.value
                    ? 'bg-vipasi-wine text-vipasi-sand font-semibold shadow-xs'
                    : 'bg-white hover:bg-vipasi-sand/80 text-vipasi-charcoal/85 border border-vipasi-border/60'
                }`}
              >
                {craft.label}
              </button>
            ))}
          </div>

          {/* Right Controls: Count & Sort */}
          <div className="flex items-center justify-between w-full md:w-auto space-x-4">
            <span className="text-xs text-vipasi-muted font-sans font-medium whitespace-nowrap">
              Showing <strong className="text-vipasi-wine">{filteredProducts.length}</strong> creations
            </span>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 bg-white px-3.5 py-1.5 rounded-full border border-vipasi-border text-xs shadow-xs">
              <SlidersHorizontal size={13} className="text-vipasi-wine flex-shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-vipasi-charcoal focus:outline-none cursor-pointer font-medium font-sans"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Customer Rated (5.0★)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Search / Occasion filter notice */}
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between bg-vipasi-sand/80 px-4 py-2.5 rounded-xl border border-vipasi-champagne/40 text-xs text-vipasi-wine font-sans">
            <span>
              Showing results for: <strong>"{searchQuery}"</strong> ({filteredProducts.length} outfits found)
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold underline hover:text-vipasi-wine-light"
            >
              Clear Filter
            </button>
          </div>
        )}

        {/* ========================================================
            PRODUCT GRID (Responsive 4-column luxury layout)
           ======================================================== */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-vipasi-border p-8">
            <Sparkles size={28} className="mx-auto text-vipasi-champagne mb-3" />
            <p className="font-serif text-xl font-bold text-vipasi-charcoal">No silhouettes found matching your selection</p>
            <p className="text-xs text-vipasi-muted font-sans mt-1">Try switching categories or clearing active craft filters.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedCraft('all');
                setSearchQuery('');
              }}
              className="mt-5 bg-vipasi-wine text-vipasi-sand text-xs px-6 py-2.5 rounded-full uppercase tracking-wider font-semibold hover:bg-vipasi-wine-light transition-colors shadow-sm"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        )}
      </section>

      {/* 8. Artisan Heritage & Slow Fashion Ethos */}
      <ArtisanStory />

      {/* 9. Customer Love & Styling Testimonials */}
      <section id="reviews" className="py-16 bg-white border-b border-vipasi-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-vipasi-wine font-semibold mb-1">
              Patron Diaries
            </p>
            <h2 className="font-serif text-3xl font-bold text-vipasi-charcoal">
              Loved Across 35,000+ Celebrations
            </h2>
            <div className="w-12 h-0.5 bg-vipasi-champagne mx-auto mt-2.5 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-vipasi-sand/40 p-6 rounded-2xl border border-vipasi-border space-y-3">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="currentColor" />)}
              </div>
              <p className="text-xs text-vipasi-charcoal/85 leading-relaxed italic">
                “Wore the Mastaani Ivory Chanderi Anarkali for my cousin’s mehendi. The 9-metre flare is breathtaking when you twirl, and the fabric is pure luxury!”
              </p>
              <div className="pt-2 border-t border-vipasi-border/60 flex items-center justify-between">
                <div>
                  <h5 className="font-serif text-xs font-bold text-vipasi-charcoal">Dr. Ananya Roy</h5>
                  <p className="text-[10px] text-vipasi-muted">Kolkata • Verified Buyer</p>
                </div>
                <CheckCircle size={14} className="text-emerald-700" />
              </div>
            </div>

            <div className="bg-vipasi-sand/40 p-6 rounded-2xl border border-vipasi-border space-y-3">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="currentColor" />)}
              </div>
              <p className="text-xs text-vipasi-charcoal/85 leading-relaxed italic">
                “The Sitara Ivory Georgette Sharara Set mirror work is all hand-done with fine zari. You can tell this is pure artisan work, not cheap machine work.”
              </p>
              <div className="pt-2 border-t border-vipasi-border/60 flex items-center justify-between">
                <div>
                  <h5 className="font-serif text-xs font-bold text-vipasi-charcoal">Meera Singhania</h5>
                  <p className="text-[10px] text-vipasi-muted">Mumbai • Verified Buyer</p>
                </div>
                <CheckCircle size={14} className="text-emerald-700" />
              </div>
            </div>

            <div className="bg-vipasi-sand/40 p-6 rounded-2xl border border-vipasi-border space-y-3">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="currentColor" />)}
              </div>
              <p className="text-xs text-vipasi-charcoal/85 leading-relaxed italic">
                “The Kumudini White Chanderi Lehenga gave me royal Aachho vibes at such an authentic price point. Received my parcel in 3 days in Delhi with lovely packaging.”
              </p>
              <div className="pt-2 border-t border-vipasi-border/60 flex items-center justify-between">
                <div>
                  <h5 className="font-serif text-xs font-bold text-vipasi-charcoal">Pooja Sharma</h5>
                  <p className="text-[10px] text-vipasi-muted">New Delhi • Verified Buyer</p>
                </div>
                <CheckCircle size={14} className="text-emerald-700" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
