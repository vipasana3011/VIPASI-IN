'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FEATURED_PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import RelatedProducts from '@/components/product/RelatedProducts';
import {
  Heart,
  ShoppingBag,
  Star,
  Sparkles,
  Truck,
  RefreshCw,
  ShieldCheck,
  Ruler,
  Check,
  ChevronRight,
  Info,
  MapPin,
} from 'lucide-react';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const product = FEATURED_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const { addToCart, wishlist, toggleWishlist, setIsCartOpen } = useCart();
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [pincode, setPincode] = useState<string>('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  const isWishlisted = wishlist.includes(product.id);
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize);
    setIsCartOpen(true);
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus('Available for Complimentary Express Delivery (3–5 days)');
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian PIN code');
    }
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-vipasi-charcoal select-none">
      
      {/* ========================================================
          BREADCRUMBS
         ======================================================== */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs font-sans text-vipasi-muted flex items-center space-x-2">
        <Link href="/" className="hover:text-vipasi-wine transition-colors">Home</Link>
        <ChevronRight size={12} />
        <Link href="/collections" className="hover:text-vipasi-wine transition-colors">Collections</Link>
        <ChevronRight size={12} />
        <Link href={`/collections?category=${product.category}`} className="hover:text-vipasi-wine capitalize transition-colors">
          {product.category}
        </Link>
        <ChevronRight size={12} />
        <span className="text-vipasi-wine font-medium truncate max-w-[200px] sm:max-w-none">
          {product.name}
        </span>
      </nav>

      {/* ========================================================
          MAIN PDP SHOWCASE (Left: Gallery, Right: Details)
         ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ----------------------------------------------------
              LEFT COLUMN: PRODUCT IMAGE GALLERY (7 COLS)
             ---------------------------------------------------- */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 items-start">
            
            {/* Thumbnail Strip */}
            <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto w-full md:w-20 lg:w-24 flex-shrink-0 no-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 w-16 md:w-full ${
                    selectedImage === idx
                      ? 'border-vipasi-wine shadow-md scale-95'
                      : 'border-transparent hover:border-vipasi-champagne opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))}
            </div>

            {/* Main High-Res Image Stage */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-white shadow-luxury border border-[#E9E1D6]">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
              />

              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badge && (
                  <span className="bg-vipasi-wine text-vipasi-champagne text-[10px] font-sans font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm border border-vipasi-champagne/30">
                    {product.badge}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="bg-white/95 text-vipasi-wine border border-vipasi-champagne/60 text-[10px] font-sans font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Wishlist Button on Image */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md shadow-md transition-all ${
                  isWishlisted
                    ? 'bg-vipasi-wine text-vipasi-champagne'
                    : 'bg-white/85 hover:bg-white text-vipasi-charcoal hover:text-vipasi-wine'
                }`}
                aria-label="Toggle Wishlist"
              >
                <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>

          {/* ----------------------------------------------------
              RIGHT COLUMN: PRODUCT DETAILS & BUYING ACTIONS (5 COLS)
             ---------------------------------------------------- */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Title & Reviews */}
            <div>
              <div className="flex items-center space-x-2 text-xs font-sans uppercase tracking-[0.2em] text-vipasi-wine font-semibold mb-2">
                <span>{product.craftTechnique.split('•')[0]}</span>
                <span>•</span>
                <span>{product.fabric}</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-vipasi-charcoal leading-tight">
                {product.name}
              </h1>

              {/* Ratings */}
              <div className="flex items-center space-x-3 mt-3">
                <div className="flex items-center text-amber-500 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.floor(product.rating) ? 'fill-amber-500 text-amber-500' : 'text-amber-300'}
                    />
                  ))}
                  <span className="ml-1.5 font-bold text-vipasi-charcoal font-sans text-xs">
                    {product.rating}
                  </span>
                </div>
                <span className="text-vipasi-muted text-xs font-sans">
                  ({product.reviewsCount} Masterpiece Reviews)
                </span>
                <span className="text-emerald-700 text-xs font-sans font-medium flex items-center space-x-1">
                  <Check size={12} />
                  <span>In Stock</span>
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-white p-4 rounded-xl border border-vipasi-border/80 shadow-xs">
              <div className="flex items-baseline space-x-3">
                <span className="font-sans text-2xl sm:text-3xl font-bold text-vipasi-wine">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <span className="font-sans text-base text-vipasi-muted line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-sans">
                    Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} ({discountPercent}% OFF)
                  </span>
                )}
              </div>
              <p className="text-[11px] text-vipasi-muted font-sans mt-1">
                Inclusive of all taxes. Free express shipping across India on orders above ₹1,999.
              </p>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-vipasi-charcoal/85 font-sans leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-vipasi-charcoal">
                  Select Size (Chest Inches)
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="inline-flex items-center space-x-1 text-xs font-sans font-semibold text-vipasi-wine hover:underline"
                >
                  <Ruler size={13} />
                  <span>Size Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2.5 rounded-xl text-xs font-sans font-bold transition-all border ${
                      selectedSize === size
                        ? 'bg-vipasi-wine text-vipasi-champagne border-vipasi-wine shadow-sm scale-102'
                        : 'bg-white text-vipasi-charcoal hover:border-vipasi-wine border-vipasi-border/80'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs: Add to Bag + Buy Now */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full bg-vipasi-wine hover:bg-vipasi-wine-light text-vipasi-champagne py-3.5 px-6 rounded-xl font-sans text-xs uppercase tracking-[0.2em] font-bold shadow-luxury flex items-center justify-center space-x-2 transition-all"
              >
                <ShoppingBag size={16} />
                <span>{addedSuccess ? 'Added to Bag!' : 'Add to Bag'}</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full bg-[#E8DFD3] hover:bg-[#DFC19B] text-vipasi-wine py-3.5 px-6 rounded-xl font-sans text-xs uppercase tracking-[0.2em] font-bold border border-vipasi-champagne/60 flex items-center justify-center space-x-2 transition-all shadow-xs"
              >
                <Sparkles size={16} />
                <span>Instant Checkout</span>
              </button>
            </div>

            {/* Pincode Delivery Estimator */}
            <div className="bg-white p-4 rounded-xl border border-vipasi-border/80 space-y-2">
              <span className="text-xs font-sans font-bold text-vipasi-charcoal flex items-center space-x-1.5">
                <MapPin size={14} className="text-vipasi-wine" />
                <span>Check Delivery & Cash on Delivery</span>
              </span>
              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter 6-digit PIN"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs font-sans border border-vipasi-border rounded-lg focus:outline-none focus:border-vipasi-wine bg-[#FAF7F2]"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-vipasi-wine text-vipasi-sand text-xs font-sans font-bold rounded-lg hover:bg-vipasi-wine-light transition-colors"
                >
                  Verify
                </button>
              </form>
              {pincodeStatus && (
                <p className={`text-[11px] font-sans ${pincodeStatus.includes('Available') ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {pincodeStatus}
                </p>
              )}
            </div>

            {/* Trust Highlights Strip */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-sans text-vipasi-charcoal/85">
              <div className="flex items-center space-x-2 bg-white p-3 rounded-lg border border-vipasi-border/60">
                <ShieldCheck size={16} className="text-vipasi-wine flex-shrink-0" />
                <span>100% Handcrafted Silk Mark</span>
              </div>
              <div className="flex items-center space-x-2 bg-white p-3 rounded-lg border border-vipasi-border/60">
                <RefreshCw size={16} className="text-vipasi-wine flex-shrink-0" />
                <span>7-Day Doorstep Exchange</span>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================
            DETAILED TABS: SPECIFICATIONS, CRAFT & CARE
           ======================================================== */}
        <div className="mt-16 bg-white rounded-2xl p-6 sm:p-10 border border-[#E9E1D6] shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Col 1: Specifications */}
            <div className="space-y-3">
              <h3 className="font-serif text-lg font-bold text-vipasi-wine border-b border-vipasi-border pb-2">
                Ensemble Specifications
              </h3>
              <ul className="space-y-2 text-xs font-sans text-vipasi-charcoal/85">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-vipasi-champagne font-bold">✦</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 2: Karigar Craft Story */}
            <div className="space-y-3">
              <h3 className="font-serif text-lg font-bold text-vipasi-wine border-b border-vipasi-border pb-2">
                Artisan Provenance
              </h3>
              <p className="text-xs font-sans leading-relaxed text-vipasi-charcoal/85">
                {product.craftStory}
              </p>
              <div className="bg-[#FAF7F2] p-3 rounded-xl border border-vipasi-border/60 text-[11px] font-sans space-y-1">
                <p><strong>Primary Technique:</strong> {product.craftTechnique}</p>
                <p><strong>Weave Origin:</strong> Master ateliers in Jaipur, Rajasthan</p>
                <p><strong>Quality Assurance:</strong> Verified under Silk Mark guidelines</p>
              </div>
            </div>

            {/* Col 3: Care & Maintenance */}
            <div className="space-y-3">
              <h3 className="font-serif text-lg font-bold text-vipasi-wine border-b border-vipasi-border pb-2">
                Care Instructions
              </h3>
              <ul className="space-y-2 text-xs font-sans text-vipasi-charcoal/85">
                {product.careInstructions.map((care, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-vipasi-champagne font-bold">•</span>
                    <span>{care}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

      </section>

      {/* ========================================================
          RELATED PRODUCTS (Interconnected Flow)
         ======================================================== */}
      <RelatedProducts currentProduct={product} />

      {/* ========================================================
          SIZE GUIDE MODAL
         ======================================================== */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 border border-vipasi-border shadow-2xl">
            <div className="flex items-center justify-between border-b border-vipasi-border pb-3">
              <h3 className="font-serif text-xl font-bold text-vipasi-wine">
                VIPASI Size Guide (Standard Indian Fit)
              </h3>
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="text-vipasi-charcoal hover:text-vipasi-wine font-bold text-sm"
              >
                ✕
              </button>
            </div>
            
            <p className="text-xs text-vipasi-muted font-sans">
              All dimensions are garment measurements in inches with 2-inch margins for tailoring adjustments.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs font-sans text-center border-collapse">
                <thead>
                  <tr className="bg-vipasi-wine text-vipasi-sand">
                    <th className="p-2 border border-vipasi-champagne/30">Size</th>
                    <th className="p-2 border border-vipasi-champagne/30">Chest (Inches)</th>
                    <th className="p-2 border border-vipasi-champagne/30">Waist (Inches)</th>
                    <th className="p-2 border border-vipasi-champagne/30">Hip (Inches)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-vipasi-border">
                  <tr><td className="p-2 font-bold">XS</td><td>34</td><td>28</td><td>38</td></tr>
                  <tr><td className="p-2 font-bold">S</td><td>36</td><td>30</td><td>40</td></tr>
                  <tr><td className="p-2 font-bold">M</td><td>38</td><td>32</td><td>42</td></tr>
                  <tr><td className="p-2 font-bold">L</td><td>40</td><td>34</td><td>44</td></tr>
                  <tr><td className="p-2 font-bold">XL</td><td>42</td><td>36</td><td>46</td></tr>
                  <tr><td className="p-2 font-bold">XXL</td><td>44</td><td>38</td><td>48</td></tr>
                </tbody>
              </table>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="bg-vipasi-wine text-vipasi-sand text-xs px-6 py-2 rounded-full font-bold uppercase tracking-wider"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
