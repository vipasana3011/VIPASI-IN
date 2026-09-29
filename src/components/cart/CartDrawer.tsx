'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Plus, Minus, ShoppingBag, Trash2, Tag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    freeShippingThreshold,
    discount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isCartOpen) return null;

  const distanceToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const finalTotal = Math.max(0, subtotal - discount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponSuccess(`Coupon ${couponInput.toUpperCase()} applied!`);
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon. Try code "VIPASI10"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-vipasi-charcoal/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-vipasi-cream shadow-2xl flex flex-col border-l border-vipasi-border">
          
          {/* Header */}
          <div className="p-5 border-b border-vipasi-border flex items-center justify-between bg-white/60">
            <div className="flex items-center space-x-2">
              <ShoppingBag size={18} className="text-vipasi-maroon" />
              <h2 className="text-sm font-serif tracking-[0.2em] uppercase font-bold text-vipasi-charcoal">
                Your Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-vipasi-muted hover:text-vipasi-maroon p-1"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-vipasi-sand/80 px-5 py-3 border-b border-vipasi-border/60 text-xs">
            {distanceToFreeShipping > 0 ? (
              <p className="text-vipasi-charcoal/80 mb-2">
                Add <span className="font-bold text-vipasi-maroon">₹{distanceToFreeShipping.toLocaleString('en-IN')}</span> more for <span className="text-vipasi-gold font-semibold">Free Express Shipping</span>
              </p>
            ) : (
              <p className="text-emerald-800 font-semibold mb-2 flex items-center space-x-1">
                <span>🎉</span> <span>You unlocked Complimentary Express Pan-India Shipping!</span>
              </p>
            )}
            <div className="w-full bg-vipasi-border h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-vipasi-gold h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <ShoppingBag size={48} className="mx-auto text-vipasi-gold/40" />
                <p className="font-serif text-lg text-vipasi-charcoal">Your bag is empty</p>
                <p className="text-xs text-vipasi-muted max-w-xs mx-auto">
                  Explore our handcrafted festive edit and heirloom weaves.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-vipasi-maroon text-vipasi-cream px-6 py-2.5 rounded-full text-xs font-medium tracking-widest uppercase hover:bg-vipasi-ruby transition-colors"
                >
                  Shop Now
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="flex space-x-4 bg-white p-3 rounded-lg border border-vipasi-border/80 shadow-sm"
                >
                  {/* Image */}
                  <div className="relative w-20 h-28 flex-shrink-0 bg-vipasi-sand rounded overflow-hidden">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-serif font-bold text-vipasi-charcoal line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                          className="text-vipasi-muted hover:text-red-600 transition-colors p-1"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="text-[11px] text-vipasi-gold font-medium mt-0.5">
                        {item.product.craftTechnique}
                      </p>
                      <p className="text-[11px] text-vipasi-muted">
                        Size: <span className="font-semibold text-vipasi-charcoal">{item.selectedSize}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-vipasi-sand">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-vipasi-border rounded">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                          className="p-1 hover:bg-vipasi-sand text-vipasi-charcoal transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-xs font-semibold text-vipasi-charcoal">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                          className="p-1 hover:bg-vipasi-sand text-vipasi-charcoal transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-vipasi-maroon">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer & Checkout */}
          {cart.length > 0 && (
            <div className="border-t border-vipasi-border p-5 bg-white space-y-3">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Tag size={13} className="absolute left-3 top-3 text-vipasi-muted" />
                    <input
                      type="text"
                      placeholder="Coupon Code (try VIPASI10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs border border-vipasi-border rounded uppercase placeholder:normal-case focus:outline-none focus:border-vipasi-gold"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-vipasi-sand hover:bg-vipasi-border text-vipasi-charcoal px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}
                {couponSuccess && <p className="text-[11px] text-emerald-700 font-medium">{couponSuccess}</p>}
                {appliedCoupon && (
                  <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 p-2 rounded border border-emerald-200">
                    <span>Applied: <strong>{appliedCoupon}</strong></span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-vipasi-charcoal/80 pt-2 border-t border-vipasi-sand">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-vipasi-charcoal">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Festive Discount</span>
                    <span>-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Pan-India Shipping</span>
                  <span className="text-emerald-700 font-medium">
                    {subtotal >= freeShippingThreshold ? 'FREE' : '₹150'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-vipasi-maroon pt-2 border-t border-vipasi-sand">
                  <span>Estimated Total</span>
                  <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => alert(`Proceeding to Razorpay Secure Gateway for ₹${finalTotal.toLocaleString('en-IN')}...`)}
                className="w-full bg-vipasi-maroon hover:bg-vipasi-ruby text-vipasi-cream py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center space-x-2 transition-all shadow-md group"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-vipasi-muted pt-1">
                <ShieldCheck size={12} className="text-emerald-600" />
                <span>UPI, Cards, NetBanking, COD Verified • 100% Authentic Handcraft</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
