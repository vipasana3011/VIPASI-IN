'use client';

import React, { useState } from 'react';
import { Product } from '@/types/product';
import { X, Star, Truck, ShieldCheck, Heart, Sparkles, Ruler } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart, wishlist, toggleWishlist, setIsCartOpen } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  if (!product) return null;

  const isWishlisted = wishlist.includes(product.id);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeStatus(`Verified: Delivery to ${pincode} by ${new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}.`);
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian pincode.');
    }
  };

  const handleAddToBag = () => {
    addToCart(product, selectedSize, quantity);
    onClose();
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
    onClose();
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-vipasi-charcoal/70 backdrop-blur-sm" onClick={onClose} />

      <div className="min-h-screen px-4 text-center flex items-center justify-center py-8">
        <div className="relative bg-vipasi-cream rounded-2xl max-w-4xl w-full text-left overflow-hidden shadow-2xl border border-vipasi-border my-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-white/80 hover:bg-white text-vipasi-charcoal p-2 rounded-full transition-colors shadow-sm"
          >
            <X size={20} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Left: Gallery */}
            <div className="p-6 bg-vipasi-sand/30 flex flex-col justify-between">
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-vipasi-sand shadow-inner">
                <img
                  src={product.images[selectedImage] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-top"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-vipasi-wine text-vipasi-champagne text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded shadow border border-vipasi-champagne/30">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2.5 mt-4 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative w-16 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${
                        selectedImage === idx ? 'border-vipasi-wine scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product & Craft Info */}
            <div className="p-6 sm:p-8 flex flex-col justify-between bg-white overflow-y-auto max-h-[85vh]">
              <div>
                {/* Craft Pill */}
                <div className="flex items-center space-x-2 text-vipasi-wine text-xs font-semibold uppercase tracking-widest mb-1.5">
                  <Sparkles size={13} className="text-vipasi-wine" />
                  <span>{product.craftTechnique}</span>
                </div>

                <h2 className="font-serif text-2xl font-bold text-vipasi-charcoal leading-snug">
                  {product.name}
                </h2>
                <p className="text-xs text-vipasi-muted mt-1">{product.subtitle}</p>

                {/* Rating */}
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-vipasi-charcoal">{product.rating}</span>
                  <span className="text-xs text-vipasi-muted">({product.reviewsCount} verified reviews)</span>
                </div>

                {/* Pricing */}
                <div className="mt-4 flex items-baseline space-x-3 pb-4 border-b border-vipasi-sand">
                  <span className="text-2xl font-bold text-vipasi-wine">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-vipasi-muted line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Inclusive of all taxes
                  </span>
                </div>

                {/* Fabric & Story */}
                <div className="py-3 text-xs text-vipasi-charcoal/85 space-y-2">
                  <p><strong className="text-vipasi-charcoal">Fabric:</strong> {product.fabric}</p>
                  <p className="italic text-vipasi-wine bg-vipasi-cream p-3 rounded-lg border border-vipasi-border/80">
                    "{product.craftStory}"
                  </p>
                </div>

                {/* Size Selector */}
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-vipasi-charcoal">
                      Select Size:
                    </span>
                    <button
                      onClick={() => setShowSizeGuide(!showSizeGuide)}
                      className="text-xs text-vipasi-wine hover:text-vipasi-wine-light flex items-center space-x-1 font-semibold underline"
                    >
                      <Ruler size={13} />
                      <span>Indian Size Chart</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-all ${
                          selectedSize === size
                            ? 'bg-vipasi-wine text-vipasi-champagne border-vipasi-wine shadow-sm'
                            : 'bg-vipasi-cream text-vipasi-charcoal border-vipasi-border hover:border-vipasi-wine'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Chart Modal Inline */}
                {showSizeGuide && (
                  <div className="mt-3 p-3 bg-vipasi-sand/50 rounded-lg text-[11px] border border-vipasi-border animate-fadeIn">
                    <div className="font-bold text-vipasi-charcoal mb-1">Standard Measurements (in Inches):</div>
                    <div className="grid grid-cols-5 text-center gap-1 font-mono text-[10px]">
                      <span className="font-bold">Size</span>
                      <span className="font-bold">Bust</span>
                      <span className="font-bold">Waist</span>
                      <span className="font-bold">Hip</span>
                      <span className="font-bold">Length</span>
                      
                      <span>S</span><span>36</span><span>30</span><span>40</span><span>46</span>
                      <span>M</span><span>38</span><span>32</span><span>42</span><span>47</span>
                      <span>L</span><span>40</span><span>34</span><span>44</span><span>47</span>
                      <span>XL</span><span>42</span><span>36</span><span>46</span><span>48</span>
                      <span>XXL</span><span>44</span><span>38</span><span>48</span><span>48</span>
                    </div>
                  </div>
                )}

                {/* Pincode Estimator */}
                <div className="mt-4 pt-4 border-t border-vipasi-sand">
                  <p className="text-xs font-medium text-vipasi-charcoal flex items-center space-x-1 mb-1.5">
                    <Truck size={14} className="text-vipasi-wine" />
                    <span>Check Estimated Dispatch & COD:</span>
                  </p>
                  <form onSubmit={handlePincodeCheck} className="flex space-x-2">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="Enter 6-digit Pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                      className="border border-vipasi-border rounded px-3 py-1.5 text-xs w-44 focus:outline-none focus:border-vipasi-wine"
                    />
                    <button
                      type="submit"
                      className="bg-vipasi-wine text-vipasi-champagne px-3.5 py-1.5 text-xs font-semibold rounded hover:bg-vipasi-wine-light transition-colors"
                    >
                      Check
                    </button>
                  </form>
                  {pincodeStatus && (
                    <p className="text-[11px] mt-1 text-emerald-800 font-medium">{pincodeStatus}</p>
                  )}
                </div>

              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-vipasi-sand space-y-2.5">
                <div className="flex space-x-3">
                  <button
                    onClick={handleAddToBag}
                    className="flex-1 bg-vipasi-sand text-vipasi-wine border-2 border-vipasi-wine hover:bg-vipasi-wine hover:text-vipasi-champagne py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-xs"
                  >
                    Add to Bag
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-vipasi-wine hover:bg-vipasi-wine-light text-vipasi-champagne py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-md transition-all border border-vipasi-champagne/30"
                  >
                    Buy It Now
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3 rounded-full border border-vipasi-border transition-colors ${
                      isWishlisted ? 'bg-vipasi-wine text-white border-vipasi-wine' : 'hover:border-vipasi-wine'
                    }`}
                  >
                    <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <div className="flex items-center justify-center space-x-3 text-[11px] text-vipasi-muted pt-1">
                  <span className="flex items-center space-x-1">
                    <ShieldCheck size={13} className="text-emerald-700" />
                    <span>Silk Mark / Authentic Handcraft</span>
                  </span>
                  <span>•</span>
                  <span>7-Day Easy Doorstep Exchange</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
