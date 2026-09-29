'use client';

import React, { useState, useMemo, Suspense, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FEATURED_PRODUCTS } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import {
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
  Filter,
  X,
  Check,
  RotateCcw,
} from 'lucide-react';

interface EditorialMeta {
  title: string;
  italicTitle?: string;
  tagline: string;
  description: string;
}

const OCCASION_EDITORIALS: Record<string, EditorialMeta> = {
  haldi: {
    title: 'Haldi Sunshine',
    italicTitle: 'Curations',
    tagline: 'MARIGOLD, LEMON & WARM FESTIVE TONES',
    description:
      'Sun-drenched marigold lehengas, pure lemon organza sarees, and breezy tiered sharara sets handcrafted for vibrant haldi mornings.',
  },
  mehendi: {
    title: 'Mehendi & Sangeet',
    italicTitle: 'Celebrations',
    tagline: 'EMERALD GREENS, TWIRL KALIS & MIRRORWORK',
    description:
      'Twirl-ready kalidar anarkalis, emerald silks, and vibrant Jaipur mirror-work ensembled for nights of song, rhythm, and henna.',
  },
  wedding: {
    title: 'Royal Wedding Guest',
    italicTitle: 'Heirlooms',
    tagline: 'BRIDAL BROCADES, ZARDOZI & REGAL SILKS',
    description:
      'Heirloom Chanderi lehengas, rich brocade shararas, and gilded zardozi embroideries crafted for grand Indian wedding celebrations.',
  },
  festive: {
    title: 'Festive Puja & Diwali',
    italicTitle: 'Edits',
    tagline: 'AUSPICIOUS REDS, PURE CHANDERI & GAJJI SILK',
    description:
      'Timeless Indian silks woven with sacred zari borders and delicate handwork, honoring auspicious festive rituals and gatherings.',
  },
  reception: {
    title: 'Cocktail & Reception',
    italicTitle: 'Soirée',
    tagline: 'ROSE GOLD, SHEER ORGANZA & CONTEMPORARY LUXE',
    description:
      'Sculptural organza silk drapes, rose gold antique work, and sophisticated evening silhouettes with understated modern grace.',
  },
};

const CRAFT_EDITORIALS: Record<string, EditorialMeta> = {
  mirror: {
    title: 'Authentic Shisha',
    italicTitle: 'Mirror Work',
    tagline: 'CENTURIES-OLD RAJASTHANI REFLECTIONS',
    description:
      'Round glass mirrors framed with gold thread, sequins, and metallic zardozi cords that capture natural candlelight.',
  },
  zari: {
    title: 'Heirloom Zari',
    italicTitle: '& Zardozi',
    tagline: 'GILDED METALLIC NEEDLECRAFT',
    description:
      'Pure metallic threads meticulously hand-couched onto rich Chanderi and Gajji silks by master Jaipuri artisans.',
  },
  gota: {
    title: 'Jaipuri Gota Patti',
    italicTitle: 'Heritage',
    tagline: 'RIBBON APPLIQUE WITH SCULPTURAL BORDERS',
    description:
      'Hand-cut gold ribbons folded into intricate floral and leaf motifs, sewn onto lightweight ceremonial ensembles.',
  },
  chikankari: {
    title: 'Lucknowi Shadow',
    italicTitle: 'Chikankari',
    tagline: 'TIMELESS FLORAL NEEDLEWORK',
    description:
      'Featherweight needlepoint textures inspired by Mughal architecture, bringing airy softness to celebratory ensembles.',
  },
  sequin: {
    title: 'Gilded Sequin',
    italicTitle: 'Handwork',
    tagline: 'HAND-SEWN METALLIC SHIMMER',
    description:
      'Delicate micro-sequins placed individually by hand onto gossamer organza and chiffon crepe for a royal celestial glow.',
  },
};

const FABRIC_EDITORIALS: Record<string, EditorialMeta> = {
  chanderi: {
    title: 'Pure Handloom',
    italicTitle: 'Chanderi Silk',
    tagline: 'FEATHERLIGHT SHEER WITH GOLD WEAVES',
    description:
      'Woven with high-twist silk yarns and pure cotton threads, producing an ethereal shimmer ideal for grand Indian climates.',
  },
  brocade: {
    title: 'Banarasi Katan',
    italicTitle: '& Brocade',
    tagline: 'HEIRLOOM METALLIC EMBOSSING',
    description:
      'Regal metallic floral jaal weaves crafted on traditional pit-looms, celebrating the glorious legacy of Indian textile arts.',
  },
  organza: {
    title: 'Gossamer Raw Silk',
    italicTitle: 'Organza',
    tagline: 'SCULPTURAL SHEEN & WEIGHTLESS DRAPE',
    description:
      'Crisp yet ethereal organza drapes that hold regal shape while remaining light as mountain breeze.',
  },
};

function CollectionsContent() {
  const searchParams = useSearchParams();

  const paramCategory = searchParams.get('category') || 'all';
  const paramCraft = searchParams.get('craft') || 'all';
  const paramFabric = searchParams.get('fabric') || 'all';
  const paramOccasion = searchParams.get('occasion') || 'all';
  const paramFilter = searchParams.get('filter') || 'all';
  const paramBadge = searchParams.get('badge') || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(paramCategory);
  const [selectedCraft, setSelectedCraft] = useState<string>(paramCraft);
  const [selectedFabric, setSelectedFabric] = useState<string>(paramFabric);
  const [selectedOccasion, setSelectedOccasion] = useState<string>(paramOccasion);
  const [selectedPriceMax, setSelectedPriceMax] = useState<number>(15000);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Sync state if URL query changes
  useEffect(() => {
    if (paramCategory) setSelectedCategory(paramCategory);
    if (paramCraft) setSelectedCraft(paramCraft);
    if (paramFabric) setSelectedFabric(paramFabric);
    if (paramOccasion) setSelectedOccasion(paramOccasion);
  }, [paramCategory, paramCraft, paramFabric, paramOccasion]);

  // Extract unique fabrics & crafts
  const FABRICS = ['all', 'Chanderi', 'Georgette', 'Organza Silk', 'Brocade', 'Maslin', 'Upada Silk'];
  const CRAFTS = ['all', 'Mirror work', 'Zari', 'Sequin work', 'Gota patti', 'Tie and dye', 'Antique Work'];
  const OCCASIONS = ['all', 'haldi', 'mehendi', 'wedding', 'festive', 'reception'];

  // Calculate dynamic editorial header based on active filters
  const currentEditorial: EditorialMeta = useMemo(() => {
    if (selectedOccasion !== 'all' && OCCASION_EDITORIALS[selectedOccasion]) {
      return OCCASION_EDITORIALS[selectedOccasion];
    }
    if (selectedCraft !== 'all') {
      const craftKey = selectedCraft.toLowerCase().includes('mirror')
        ? 'mirror'
        : selectedCraft.toLowerCase().includes('zari')
        ? 'zari'
        : selectedCraft.toLowerCase().includes('gota')
        ? 'gota'
        : selectedCraft.toLowerCase().includes('sequin')
        ? 'sequin'
        : selectedCraft.toLowerCase();
      if (CRAFT_EDITORIALS[craftKey]) return CRAFT_EDITORIALS[craftKey];
    }
    if (selectedFabric !== 'all') {
      const fabKey = selectedFabric.toLowerCase().includes('chanderi')
        ? 'chanderi'
        : selectedFabric.toLowerCase().includes('brocade')
        ? 'brocade'
        : selectedFabric.toLowerCase().includes('organza')
        ? 'organza'
        : selectedFabric.toLowerCase();
      if (FABRIC_EDITORIALS[fabKey]) return FABRIC_EDITORIALS[fabKey];
    }
    if (paramFilter === 'new' || paramFilter === 'just-in') {
      return {
        title: 'New In The Atelier',
        italicTitle: 'Creations',
        tagline: 'FRESHLY FINISHED BY RAJASTHAN KARIGARS',
        description:
          'Discover our latest artisanal releases, featuring delicate hand-cut mirror frames and pure handloom silks.',
      };
    }
    if (paramFilter === 'bestseller') {
      return {
        title: 'Bestseller',
        italicTitle: 'Icons',
        tagline: 'MOST-LOVED SILHOUETTES & CUSTOMER FAVOURITES',
        description:
          'The most cherished silhouettes from the VIPASI repertoire, celebrated across India for their royal fit and finish.',
      };
    }
    return {
      title: 'The VIPASI',
      italicTitle: 'Collections',
      tagline: 'ROYAL RAJASTHANI ATELIERS',
      description:
        'Pure mulberry silks, hand-worked zari brocades, and festive kalidars brought to life by Rajasthan’s master karigars.',
    };
  }, [selectedOccasion, selectedCraft, selectedFabric, paramFilter]);

  // High precision filtering matching user's exact occasion & metadata rules
  const filteredProducts = useMemo(() => {
    let list = [...FEATURED_PRODUCTS];

    // 1. Occasion filter
    if (selectedOccasion !== 'all') {
      const occ = selectedOccasion.toLowerCase();
      if (occ === 'haldi') {
        // Haldi prioritizes yellow, mustard, marigold, lemon, peach, pink
        list = list.filter(
          (p) =>
            p.occasions?.includes('haldi') ||
            p.colorName.toLowerCase().includes('yellow') ||
            p.colorName.toLowerCase().includes('lemon') ||
            p.colorName.toLowerCase().includes('marigold') ||
            p.colorName.toLowerCase().includes('peach') ||
            p.colorName.toLowerCase().includes('lime')
        );
      } else if (occ === 'mehendi') {
        // Mehendi prioritizes green, olive, emerald, pink, twirl kalis & mirror-work
        list = list.filter(
          (p) =>
            p.occasions?.includes('mehendi') ||
            p.colorName.toLowerCase().includes('green') ||
            p.colorName.toLowerCase().includes('emerald') ||
            p.colorName.toLowerCase().includes('lime') ||
            p.colorName.toLowerCase().includes('pink')
        );
      } else if (occ === 'wedding') {
        // Wedding prioritizes heavy silks, brocade, zardozi, crimson, red, lehengas
        list = list.filter(
          (p) =>
            p.occasions?.includes('wedding') ||
            p.weightLevel === 'heavy' ||
            p.category === 'lehengas' ||
            p.colorName.toLowerCase().includes('red') ||
            p.colorName.toLowerCase().includes('crimson') ||
            p.fabric.toLowerCase().includes('brocade')
        );
      } else if (occ === 'reception') {
        // Reception prioritizes elegant organza drapes, rose gold, powder blue, co-ords
        list = list.filter(
          (p) =>
            p.occasions?.includes('reception') ||
            p.colorName.toLowerCase().includes('rose gold') ||
            p.colorName.toLowerCase().includes('powder blue') ||
            p.category === 'co-ords' ||
            p.fabric.toLowerCase().includes('organza')
        );
      } else if (occ === 'festive') {
        list = list.filter(
          (p) =>
            p.occasions?.includes('festive') ||
            p.collection.toLowerCase().includes('festive') ||
            p.badge === 'Bestseller'
        );
      }
    }

    // 2. Category filter
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'festive') {
        list = list.filter((p) => p.collection.toLowerCase().includes('festive') || p.badge === 'Bestseller');
      } else if (selectedCategory === 'new') {
        list = list.filter((p) => p.badge === 'New Drop' || p.badge === 'Handcrafted');
      } else {
        list = list.filter((p) => p.category === selectedCategory);
      }
    }

    // 3. Fabric filter
    if (selectedFabric !== 'all') {
      list = list.filter((p) => p.fabric.toLowerCase().includes(selectedFabric.toLowerCase()));
    }

    // 4. Craft filter
    if (selectedCraft !== 'all') {
      list = list.filter((p) =>
        p.craftTechnique.toLowerCase().includes(selectedCraft.toLowerCase()) ||
        p.description.toLowerCase().includes(selectedCraft.toLowerCase())
      );
    }

    // 5. Special Filter / Badge params
    if (paramFilter === 'new' || paramFilter === 'just-in') {
      list = list.filter((p) => p.badge === 'New Drop' || p.badge === 'Handcrafted');
    } else if (paramFilter === 'bestseller') {
      list = list.filter((p) => p.badge === 'Bestseller' || p.rating >= 4.8);
    } else if (paramFilter === 'limited') {
      list = list.filter((p) => p.badge === 'Limited Edition' || p.price >= 8500);
    }

    if (paramBadge !== 'all') {
      list = list.filter((p) => p.badge?.toLowerCase().replace(' ', '-') === paramBadge.toLowerCase());
    }

    // 6. Price filter
    list = list.filter((p) => p.price <= selectedPriceMax);

    // 7. Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [
    selectedCategory,
    selectedCraft,
    selectedFabric,
    selectedOccasion,
    selectedPriceMax,
    sortBy,
    paramFilter,
    paramBadge,
  ]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedCraft('all');
    setSelectedFabric('all');
    setSelectedOccasion('all');
    setSelectedPriceMax(15000);
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen bg-vipasi-ivory pt-24 pb-20 overflow-x-hidden">
      
      {/* ========================================================
          1. BREADCRUMBS
         ======================================================== */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center space-x-2 text-xs font-sans text-vipasi-muted uppercase tracking-wider">
        <Link href="/" className="hover:text-vipasi-wine transition-colors">
          Home
        </Link>
        <ChevronRight size={12} />
        <Link href="/collections" className="hover:text-vipasi-wine transition-colors">
          Collections
        </Link>
        {selectedCategory !== 'all' && (
          <>
            <ChevronRight size={12} />
            <span className="text-vipasi-wine font-semibold capitalize">
              {selectedCategory.replace('-', ' ')}
            </span>
          </>
        )}
        {selectedOccasion !== 'all' && (
          <>
            <ChevronRight size={12} />
            <span className="text-vipasi-wine font-semibold capitalize">
              {selectedOccasion}
            </span>
          </>
        )}
      </nav>

      {/* ========================================================
          2. DYNAMIC EDITORIAL COLLECTION HEADER
         ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-6 text-center">
        <div className="inline-flex items-center space-x-2 text-vipasi-wine text-xs uppercase tracking-[0.28em] font-sans font-semibold mb-2">
          <Sparkles size={13} className="text-vipasi-champagne" />
          <span>{currentEditorial.tagline}</span>
          <Sparkles size={13} className="text-vipasi-champagne" />
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-vipasi-charcoal tracking-tight">
          {currentEditorial.title}{' '}
          {currentEditorial.italicTitle && (
            <span className="italic font-normal text-vipasi-wine">
              {currentEditorial.italicTitle}
            </span>
          )}
        </h1>
        <p className="text-xs sm:text-sm text-vipasi-muted mt-2 font-sans max-w-xl mx-auto leading-relaxed">
          {currentEditorial.description}
        </p>

        {/* ========================================================
            FIXED HORIZONTAL CATEGORY TABS (NEVER CLIPPED)
           ======================================================== */}
        <div className="w-full overflow-x-auto py-4 mt-2 no-scrollbar scroll-smooth">
          <div className="flex items-center justify-start md:justify-center min-w-max px-4 sm:px-6 mx-auto gap-2 sm:gap-3">
            {[
              { id: 'all', label: 'All Ensembles' },
              { id: 'anarkalis', label: 'Anarkalis' },
              { id: 'shararas', label: 'Shararas' },
              { id: 'sarees', label: 'Handloom Sarees' },
              { id: 'suit-sets', label: 'Suit Sets' },
              { id: 'co-ords', label: 'Co-ords' },
              { id: 'lehengas', label: 'Lehengas' },
              { id: 'festive', label: 'Festive Edit' },
              { id: 'new', label: 'New Arrivals' },
            ].map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-sans uppercase tracking-[0.15em] transition-all whitespace-nowrap cursor-pointer shadow-xs ${
                    isActive
                      ? 'bg-vipasi-wine text-vipasi-champagne font-bold shadow-md scale-105'
                      : 'bg-white hover:bg-vipasi-sand text-vipasi-charcoal/80 border border-vipasi-border/80'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          3. FILTER & SORT TOOLBAR
         ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-[#FAF4E8]/90 rounded-2xl p-3 sm:p-4 border border-vipasi-border flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
          
          {/* Left: Quick Craft Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto max-w-full pb-1 md:pb-0 no-scrollbar w-full md:w-auto">
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-vipasi-muted whitespace-nowrap hidden sm:inline">
              Craft:
            </span>
            {[
              { id: 'all', label: 'All Crafts' },
              { id: 'Mirror work', label: 'Mirror Work' },
              { id: 'Zari', label: 'Zari & Brocade' },
              { id: 'Sequin work', label: 'Sequin Work' },
              { id: 'Gota patti', label: 'Gota Patti' },
              { id: 'Tie and dye', label: 'Tie & Dye' },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCraft(c.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans whitespace-nowrap transition-all cursor-pointer ${
                  selectedCraft === c.id
                    ? 'bg-vipasi-wine text-vipasi-sand font-bold shadow-xs'
                    : 'bg-white hover:bg-vipasi-sand text-vipasi-charcoal/80 border border-vipasi-border/70'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Right: Results Count & Sort Dropdown */}
          <div className="flex items-center justify-between w-full md:w-auto space-x-4">
            <span className="text-xs text-vipasi-muted font-sans font-medium whitespace-nowrap">
              Showing <strong className="text-vipasi-wine">{filteredProducts.length}</strong> creations
            </span>

            <div className="flex items-center space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-vipasi-border text-vipasi-charcoal rounded-xl text-xs font-sans px-3 py-2 focus:outline-none focus:border-vipasi-wine cursor-pointer shadow-xs"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated (4.8+ ★)</option>
              </select>

              {/* Mobile Filter Toggle Button */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="flex items-center space-x-1 px-3 py-2 bg-vipasi-wine text-vipasi-sand rounded-xl text-xs font-sans font-bold uppercase tracking-wider shadow-xs hover:bg-vipasi-wine-light transition-colors"
              >
                <Filter size={13} />
                <span>Filters</span>
              </button>
            </div>
          </div>

        </div>

        {/* Active Filter Indicators */}
        {(selectedCategory !== 'all' ||
          selectedCraft !== 'all' ||
          selectedFabric !== 'all' ||
          selectedOccasion !== 'all' ||
          selectedPriceMax < 15000) && (
          <div className="flex items-center flex-wrap gap-2 pt-3">
            <span className="text-[11px] font-sans text-vipasi-muted uppercase tracking-wider">
              Active Filters:
            </span>
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-vipasi-wine/10 text-vipasi-wine text-xs font-sans">
                <span>Category: {selectedCategory}</span>
                <X size={12} className="cursor-pointer" onClick={() => setSelectedCategory('all')} />
              </span>
            )}
            {selectedOccasion !== 'all' && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-vipasi-wine/10 text-vipasi-wine text-xs font-sans">
                <span>Occasion: {selectedOccasion}</span>
                <X size={12} className="cursor-pointer" onClick={() => setSelectedOccasion('all')} />
              </span>
            )}
            {selectedCraft !== 'all' && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-vipasi-wine/10 text-vipasi-wine text-xs font-sans">
                <span>Craft: {selectedCraft}</span>
                <X size={12} className="cursor-pointer" onClick={() => setSelectedCraft('all')} />
              </span>
            )}
            {selectedFabric !== 'all' && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-vipasi-wine/10 text-vipasi-wine text-xs font-sans">
                <span>Fabric: {selectedFabric}</span>
                <X size={12} className="cursor-pointer" onClick={() => setSelectedFabric('all')} />
              </span>
            )}
            {selectedPriceMax < 15000 && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-vipasi-wine/10 text-vipasi-wine text-xs font-sans">
                <span>Under ₹{selectedPriceMax.toLocaleString('en-IN')}</span>
                <X size={12} className="cursor-pointer" onClick={() => setSelectedPriceMax(15000)} />
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-xs font-sans text-vipasi-wine hover:underline font-semibold ml-2 flex items-center space-x-1"
            >
              <RotateCcw size={11} />
              <span>Reset All</span>
            </button>
          </div>
        )}
      </section>

      {/* ========================================================
          4. MAIN 4-COLUMN PRODUCT GRID
         ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-white/70 rounded-3xl border border-vipasi-border p-8 max-w-lg mx-auto space-y-4">
            <Sparkles size={36} className="mx-auto text-vipasi-gold" />
            <h3 className="font-serif text-2xl font-bold text-vipasi-charcoal">
              No matching creations found
            </h3>
            <p className="text-xs sm:text-sm text-vipasi-muted font-sans leading-relaxed">
              We couldn't find ensembles matching all chosen filters. Try relaxing your fabric or occasion criteria to explore more Jaipur creations.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-vipasi-wine text-vipasi-sand rounded-xl text-xs font-sans font-bold uppercase tracking-wider hover:bg-vipasi-wine-light transition-colors"
            >
              Reset Filters & Show All Outfits
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* ========================================================
          5. SLIDE-OVER FILTER DRAWER (Mobile & Desktop)
         ======================================================== */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-vipasi-charcoal/60 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />

          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-vipasi-border">
                <div className="flex items-center space-x-2">
                  <SlidersHorizontal size={18} className="text-vipasi-wine" />
                  <h3 className="font-serif text-xl font-bold text-vipasi-charcoal">
                    Refine Creations
                  </h3>
                </div>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-full text-vipasi-charcoal hover:bg-vipasi-sand"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Filter 1: Occasion */}
              <div>
                <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-vipasi-charcoal mb-3">
                  Celebration Occasion
                </h4>
                <div className="flex flex-wrap gap-2">
                  {OCCASIONS.map((occ) => (
                    <button
                      key={occ}
                      onClick={() => setSelectedOccasion(occ)}
                      className={`px-3 py-1.5 rounded-full text-xs font-sans capitalize transition-colors ${
                        selectedOccasion === occ
                          ? 'bg-vipasi-wine text-vipasi-sand font-bold'
                          : 'bg-vipasi-sand/50 text-vipasi-charcoal hover:bg-vipasi-sand'
                      }`}
                    >
                      {occ === 'all' ? 'All Occasions' : occ}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter 2: Fabric */}
              <div>
                <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-vipasi-charcoal mb-3">
                  Handloom Fabric
                </h4>
                <div className="flex flex-wrap gap-2">
                  {FABRICS.map((fabric) => (
                    <button
                      key={fabric}
                      onClick={() => setSelectedFabric(fabric)}
                      className={`px-3 py-1.5 rounded-full text-xs font-sans transition-colors ${
                        selectedFabric === fabric
                          ? 'bg-vipasi-wine text-vipasi-sand font-bold'
                          : 'bg-vipasi-sand/50 text-vipasi-charcoal hover:bg-vipasi-sand'
                      }`}
                    >
                      {fabric === 'all' ? 'All Fabrics' : fabric}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter 3: Craft Technique */}
              <div>
                <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-vipasi-charcoal mb-3">
                  Artisan Technique
                </h4>
                <div className="flex flex-wrap gap-2">
                  {CRAFTS.map((craft) => (
                    <button
                      key={craft}
                      onClick={() => setSelectedCraft(craft)}
                      className={`px-3 py-1.5 rounded-full text-xs font-sans transition-colors ${
                        selectedCraft === craft
                          ? 'bg-vipasi-wine text-vipasi-sand font-bold'
                          : 'bg-vipasi-sand/50 text-vipasi-charcoal hover:bg-vipasi-sand'
                      }`}
                    >
                      {craft === 'all' ? 'All Crafts' : craft}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter 4: Max Price Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-vipasi-charcoal">
                    Maximum Budget
                  </h4>
                  <span className="text-xs font-bold text-vipasi-wine">
                    ₹{selectedPriceMax.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min={5000}
                  max={15000}
                  step={500}
                  value={selectedPriceMax}
                  onChange={(e) => setSelectedPriceMax(Number(e.target.value))}
                  className="w-full accent-vipasi-wine"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-vipasi-border flex gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 py-3 text-xs font-sans font-bold uppercase tracking-wider border border-vipasi-border rounded-xl text-vipasi-charcoal"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 text-xs font-sans font-bold uppercase tracking-wider bg-vipasi-wine text-vipasi-sand rounded-xl shadow-md"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center bg-vipasi-ivory">
          <div className="w-8 h-8 border-2 border-vipasi-wine border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CollectionsContent />
    </Suspense>
  );
}
