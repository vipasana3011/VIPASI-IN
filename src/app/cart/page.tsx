'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Lock,
  CheckCircle2,
} from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartCount, cartTotal, clearCart } = useCart();
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: 'Rajasthan',
    pincode: '',
    paymentMethod: 'cod',
  });

  const freeShippingThreshold = 1999;
  const shippingFee = cartTotal >= freeShippingThreshold || cartTotal === 0 ? 0 : 150;
  const grandTotal = cartTotal + shippingFee;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address || !formData.pincode) {
      alert('Please fill all mandatory shipping details.');
      return;
    }
    setCheckoutStep('success');
    clearCart();
  };

  if (checkoutStep === 'success') {
    return (
      <div className="bg-[#FAF7F2] min-h-screen py-20 px-4 text-center select-none">
        <div className="max-w-md mx-auto bg-white p-8 sm:p-10 rounded-3xl border border-[#E9E1D6] shadow-luxury space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 size={36} />
          </div>
          <h1 className="font-serif text-3xl font-bold text-vipasi-charcoal">
            Order Confirmed!
          </h1>
          <p className="text-xs sm:text-sm text-vipasi-muted font-sans leading-relaxed">
            Thank you for ordering with VIPASI. Our Jaipur ateliers will hand-inspect and pack your royal ensemble with care.
          </p>
          <div className="bg-[#FAF7F2] p-4 rounded-xl text-left text-xs font-sans space-y-1.5 border border-vipasi-border">
            <p><strong>Deliver To:</strong> {formData.fullName}</p>
            <p><strong>Address:</strong> {formData.address}, {formData.city} - {formData.pincode}</p>
            <p><strong>Contact:</strong> +91 {formData.phone}</p>
            <p><strong>Payment Mode:</strong> {formData.paymentMethod === 'cod' ? 'Cash on Delivery (Verified)' : 'Online UPI / Card'}</p>
          </div>
          <Link
            href="/collections"
            className="inline-flex items-center space-x-2 bg-vipasi-wine text-vipasi-champagne text-xs uppercase tracking-[0.2em] font-bold px-6 py-3.5 rounded-full shadow-md hover:bg-vipasi-wine-light transition-all"
          >
            <span>Continue Shopping</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-vipasi-charcoal select-none py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-vipasi-border pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-vipasi-wine text-xs uppercase tracking-[0.25em] font-sans font-semibold mb-1">
              <ShoppingBag size={14} className="text-vipasi-champagne" />
              <span>YOUR ARTISAN SELECTIONS</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-vipasi-charcoal">
              Shopping <span className="italic font-normal text-vipasi-wine">Bag</span>
            </h1>
          </div>
          <p className="text-xs text-vipasi-muted font-sans">
            {cartCount} {cartCount === 1 ? 'Handcrafted Item' : 'Handcrafted Items'}
          </p>
        </div>

        {/* Empty State */}
        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#E9E1D6] p-8 max-w-xl mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-full bg-[#FAF7F2] flex items-center justify-center mx-auto mb-4 text-vipasi-wine">
              <ShoppingBag size={28} />
            </div>
            <h2 className="font-serif text-2xl font-bold text-vipasi-charcoal">
              Your Bag is Empty
            </h2>
            <p className="text-xs sm:text-sm text-vipasi-muted font-sans mt-2 max-w-md mx-auto leading-relaxed">
              Explore our handcrafted collections of royal anarkalis, festive lehengas, and handloom sarees crafted by master karigars.
            </p>
            <Link
              href="/collections"
              className="mt-6 inline-flex items-center space-x-2 bg-vipasi-wine hover:bg-vipasi-wine-light text-vipasi-champagne text-xs uppercase tracking-[0.2em] font-bold px-6 py-3 rounded-full transition-all shadow-md"
            >
              <span>Explore Collections</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Cart Items (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E9E1D6] flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between shadow-xs"
                >
                  <div className="flex items-center space-x-4">
                    {/* Thumbnail */}
                    <div className="w-20 sm:w-24 aspect-[3/4] rounded-xl overflow-hidden bg-[#F5EFE6] flex-shrink-0 border border-vipasi-border">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    {/* Meta */}
                    <div>
                      <span className="text-[10px] font-sans uppercase tracking-wider text-vipasi-wine font-semibold">
                        {item.product.fabric}
                      </span>
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="block font-serif text-base font-bold text-vipasi-charcoal hover:text-vipasi-wine transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-vipasi-muted font-sans mt-0.5">
                        Size: <strong className="text-vipasi-charcoal">{item.selectedSize}</strong>
                      </p>
                      <p className="text-sm font-bold text-vipasi-wine font-sans mt-2">
                        ₹{item.product.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  {/* Quantity & Delete */}
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-vipasi-border w-full">
                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-2 bg-[#FAF7F2] px-2.5 py-1 rounded-lg border border-vipasi-border">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                        className="p-1 text-vipasi-charcoal hover:text-vipasi-wine"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs font-bold font-sans px-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                        className="p-1 text-vipasi-charcoal hover:text-vipasi-wine"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <span className="text-sm font-bold text-vipasi-charcoal font-sans min-w-[70px] text-right">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                      className="p-2 text-vipasi-muted hover:text-rose-600 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Free shipping bar */}
              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 flex items-center space-x-3 text-xs font-sans text-emerald-900">
                <Truck size={18} className="text-emerald-700 flex-shrink-0" />
                <span>
                  {cartTotal >= freeShippingThreshold
                    ? '🎉 Congratulations! You have unlocked Complimentary Express Shipping across India.'
                    : `Add ₹${(freeShippingThreshold - cartTotal).toLocaleString('en-IN')} more to unlock Complimentary Express Shipping.`}
                </span>
              </div>
            </div>

            {/* Right Column: Order Summary & Checkout Form (4 cols) */}
            <div className="lg:col-span-4 space-y-5">
              <div className="bg-white rounded-3xl p-6 border border-[#E9E1D6] shadow-luxury space-y-4">
                <h3 className="font-serif text-xl font-bold text-vipasi-wine border-b border-vipasi-border pb-3">
                  Order Summary
                </h3>

                <div className="space-y-2 text-xs font-sans">
                  <div className="flex justify-between text-vipasi-charcoal/80">
                    <span>Bag Total ({cartCount} items)</span>
                    <span className="font-semibold">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-vipasi-charcoal/80">
                    <span>Estimated Shipping</span>
                    <span className="font-semibold text-emerald-700">
                      {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-vipasi-charcoal/80">
                    <span>Tax & Duties</span>
                    <span className="font-semibold">Included</span>
                  </div>
                  <div className="border-t border-vipasi-border pt-3 flex justify-between text-sm font-bold text-vipasi-charcoal">
                    <span>Grand Total</span>
                    <span className="text-vipasi-wine text-base">₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {checkoutStep === 'cart' ? (
                  <button
                    onClick={() => setCheckoutStep('checkout')}
                    className="w-full bg-vipasi-wine hover:bg-vipasi-wine-light text-vipasi-champagne py-3.5 px-4 rounded-xl text-xs font-sans font-bold uppercase tracking-[0.2em] shadow-md transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight size={14} />
                  </button>
                ) : (
                  <form onSubmit={handleCheckoutSubmit} className="space-y-3 pt-2">
                    <p className="text-xs font-sans font-bold uppercase tracking-wider text-vipasi-wine">
                      Delivery Address
                    </p>
                    <input
                      type="text"
                      placeholder="Full Name *"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 text-xs font-sans border border-vipasi-border rounded-lg bg-[#FAF7F2] focus:outline-none focus:border-vipasi-wine"
                    />
                    <input
                      type="tel"
                      placeholder="Phone (10-digit) *"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs font-sans border border-vipasi-border rounded-lg bg-[#FAF7F2] focus:outline-none focus:border-vipasi-wine"
                    />
                    <input
                      type="text"
                      placeholder="Street Address & Flat/House *"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3 py-2 text-xs font-sans border border-vipasi-border rounded-lg bg-[#FAF7F2] focus:outline-none focus:border-vipasi-wine"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="City *"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="px-3 py-2 text-xs font-sans border border-vipasi-border rounded-lg bg-[#FAF7F2] focus:outline-none focus:border-vipasi-wine"
                      />
                      <input
                        type="text"
                        placeholder="PIN Code *"
                        maxLength={6}
                        required
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className="px-3 py-2 text-xs font-sans border border-vipasi-border rounded-lg bg-[#FAF7F2] focus:outline-none focus:border-vipasi-wine"
                      />
                    </div>

                    <div className="pt-2">
                      <label className="text-[11px] font-sans font-bold text-vipasi-charcoal block mb-1">
                        Select Payment Mode
                      </label>
                      <select
                        value={formData.paymentMethod}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="w-full px-3 py-2 text-xs font-sans border border-vipasi-border rounded-lg bg-[#FAF7F2] focus:outline-none"
                      >
                        <option value="cod">Cash on Delivery (Doorstep Verification)</option>
                        <option value="upi">UPI / Google Pay / PhonePe (Gateway Integration Ready)</option>
                        <option value="card">Credit / Debit Card</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3.5 px-4 rounded-xl text-xs font-sans font-bold uppercase tracking-[0.2em] shadow-md transition-all flex items-center justify-center space-x-2"
                    >
                      <Lock size={14} />
                      <span>Confirm & Place Order</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('cart')}
                      className="w-full text-[11px] text-vipasi-muted hover:underline text-center block pt-1"
                    >
                      ← Back to Bag Items
                    </button>
                  </form>
                )}

                <div className="pt-2 border-t border-vipasi-border text-[11px] font-sans text-vipasi-muted space-y-1">
                  <div className="flex items-center space-x-1.5">
                    <ShieldCheck size={13} className="text-vipasi-wine" />
                    <span>256-bit encrypted checkout</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Sparkles size={13} className="text-vipasi-champagne" />
                    <span>Direct from Jaipur Karigar Ateliers</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
