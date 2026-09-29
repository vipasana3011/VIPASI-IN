'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types/product';
import { Heart, Eye, Star, Check, ShoppingBag, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [imgError, setImgError] = useState(false);

  const isWishlisted = wishlist.includes(product.id);
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );
  const savingsAmount = product.originalPrice - product.price;

  const handleQuickAdd = (size: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSize(size);
    addToCart(product, size);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2200);
  };

  const primaryImg = imgError || !product.images[0]
    ? '/images/collections/collection-01.webp'
    : product.images[0];
  const secondaryImg = product.images[1] || primaryImg;

  return (
    <div
      className="group relative bg-[#FCFBF8] rounded-2xl overflow-hidden border border-[#E9E1D6] hover:border-vipasi-champagne/80 hover:shadow-[0_16px_36px_rgba(62,11,16,0.10)] transition-all duration-300 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ========================================================
          1. PRODUCT IMAGE STAGE (Links to Product Detail Page)
         ======================================================== */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F5EFE6]">
        <Link
          href={`/product/${product.slug}`}
          className="block w-full h-full cursor-pointer relative"
          aria-label={`View ${product.name}`}
        >
          {/* Main Editorial Image */}
          <img
            src={primaryImg}
            alt={product.name}
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover object-top transition-all duration-700 ease-out ${
              isHovered && secondaryImg !== primaryImg
                ? 'opacity-0 scale-105'
                : 'opacity-100 scale-100'
            }`}
            loading="lazy"
          />

          {/* Alternate Angle Image on Hover */}
          {secondaryImg && secondaryImg !== primaryImg && (
            <img
              src={secondaryImg}
              alt={`${product.name} alternate angle`}
              className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
              loading="lazy"
            />
          )}
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.badge && (
            <span className="inline-flex items-center space-x-1 bg-vipasi-wine text-vipasi-champagne text-[9px] font-sans font-bold tracking-[0.16em] uppercase px-2.5 py-0.5 rounded-full shadow-sm border border-vipasi-champagne/30">
              <Sparkles size={8} className="text-vipasi-champagne" />
              <span>{product.badge}</span>
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-[#FAF4E8]/95 text-vipasi-wine border border-vipasi-champagne/50 text-[9px] font-sans font-bold px-2 py-0.5 rounded-full shadow-xs backdrop-blur-xs">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-20 shadow-sm ${
            isWishlisted
              ? 'bg-vipasi-wine text-vipasi-champagne scale-110'
              : 'bg-white/85 hover:bg-white text-vipasi-charcoal/70 hover:text-vipasi-wine hover:scale-105'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={15} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Quick View Button (Desktop only) */}
        {onQuickView && (
          <div className="absolute inset-x-3 bottom-14 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 hidden sm:block">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              className="w-full bg-[#FAF4E8]/95 hover:bg-white text-vipasi-charcoal hover:text-vipasi-wine py-2 px-3 rounded-xl text-xs font-sans font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md border border-vipasi-champagne/40 backdrop-blur-md transition-all"
            >
              <Eye size={14} className="text-vipasi-wine" />
              <span>Quick View</span>
            </button>
          </div>
        )}

        {/* Quick Size Add Drawer on Hover */}
        <div className="absolute inset-x-0 bottom-0 bg-[#FAF4E8]/95 backdrop-blur-md p-2.5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-vipasi-border/80 z-20">
          <p className="text-[9.5px] uppercase tracking-[0.2em] text-center text-vipasi-muted font-sans font-semibold mb-1.5">
            Quick Add Size
          </p>
          <div className="flex justify-center items-center gap-1.5 flex-wrap">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={(e) => handleQuickAdd(size, e)}
                className="px-2.5 py-0.5 text-[11px] font-sans font-bold rounded-md bg-white hover:bg-vipasi-wine hover:text-vipasi-champagne text-vipasi-charcoal border border-vipasi-border/80 hover:border-vipasi-wine transition-colors shadow-xs"
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================
          2. PRODUCT CONTENT & DETAILS
         ======================================================== */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-white/70">
        <div>
          {/* Craft Technique & Reviews Row */}
          <div className="flex items-center justify-between text-[10.5px] font-sans font-semibold mb-1.5 tracking-wider uppercase">
            <span className="text-vipasi-wine truncate max-w-[65%]">
              {product.craftTechnique ? product.craftTechnique.split('•')[0].trim() : product.fabric}
            </span>
            <div className="flex items-center text-vipasi-charcoal/80 text-[10.5px]">
              <Star size={11} className="text-amber-500 fill-amber-500 mr-0.5" />
              <span className="font-bold">{product.rating}</span>
              <span className="text-vipasi-muted ml-0.5 text-[9.5px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title (Direct Link to PDP) */}
          <Link
            href={`/product/${product.slug}`}
            className="block font-serif text-[15px] sm:text-base font-bold text-vipasi-charcoal hover:text-vipasi-wine transition-colors leading-snug line-clamp-1"
          >
            {product.name}
          </Link>

          {/* Subtitle */}
          <p className="text-xs text-vipasi-muted line-clamp-1 mt-0.5 font-sans">
            {product.subtitle || `${product.fabric} • Handcrafted`}
          </p>
        </div>

        {/* Price & Action Footer */}
        <div className="mt-3 pt-2.5 border-t border-[#EFE8DD] flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline space-x-2">
              <span className="text-sm sm:text-[15px] font-bold text-vipasi-wine font-sans">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-vipasi-muted line-through font-sans">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            {savingsAmount > 0 && (
              <span className="text-[10px] text-emerald-800 font-sans font-medium">
                Save ₹{savingsAmount.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Action Trigger */}
          {addedSuccess ? (
            <span className="text-[11px] text-emerald-700 font-bold flex items-center space-x-1 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
              <Check size={12} />
              <span>Added!</span>
            </span>
          ) : (
            <Link
              href={`/product/${product.slug}`}
              className="inline-flex items-center space-x-1 text-xs font-sans font-bold text-vipasi-wine hover:text-vipasi-wine-light py-1 px-2.5 rounded-lg bg-vipasi-sand/40 hover:bg-vipasi-sand/80 border border-vipasi-champagne/40 transition-colors"
            >
              <ShoppingBag size={12} />
              <span>Details</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
