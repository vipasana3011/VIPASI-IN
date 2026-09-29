'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, ChevronRight, Clock, ShieldCheck, MapPin } from 'lucide-react';

export default function ShippingPolicyPage() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen text-vipasi-charcoal select-none py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb */}
        <nav className="text-xs font-sans text-vipasi-muted flex items-center space-x-2">
          <Link href="/" className="hover:text-vipasi-wine transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-vipasi-wine font-semibold">Shipping Policy</span>
        </nav>

        {/* Header */}
        <div className="border-b border-vipasi-border pb-6">
          <div className="inline-flex items-center space-x-2 text-vipasi-wine text-xs uppercase tracking-widest font-sans font-bold mb-2">
            <Truck size={14} className="text-vipasi-wine" />
            <span>EXPRESS PAN-INDIA DELIVERY</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-vipasi-charcoal">
            Shipping & Dispatch Policy
          </h1>
          <p className="text-xs text-vipasi-muted font-sans mt-2">
            Updated: January 2026 • VIPASI Master Ateliers
          </p>
        </div>

        {/* Highlights Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-vipasi-border text-center space-y-1">
            <Truck size={20} className="text-vipasi-wine mx-auto" />
            <h4 className="font-serif text-sm font-bold text-vipasi-charcoal">Complimentary Shipping</h4>
            <p className="text-[11px] text-vipasi-muted font-sans">On all orders above ₹1,999</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-vipasi-border text-center space-y-1">
            <Clock size={20} className="text-vipasi-wine mx-auto" />
            <h4 className="font-serif text-sm font-bold text-vipasi-charcoal">3–5 Business Days</h4>
            <p className="text-[11px] text-vipasi-muted font-sans">Metro delivery timeline</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-vipasi-border text-center space-y-1">
            <ShieldCheck size={20} className="text-vipasi-wine mx-auto" />
            <h4 className="font-serif text-sm font-bold text-vipasi-charcoal">Inspected Packaging</h4>
            <p className="text-[11px] text-vipasi-muted font-sans">Muslin protected luxury box</p>
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E9E1D6] shadow-xs space-y-6 text-xs sm:text-sm font-sans text-vipasi-charcoal/85 leading-relaxed">
          
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-vipasi-wine">1. Atelier Dispatch Timelines</h2>
            <p>
              Each VIPASI outfit undergoes meticulous quality verification, thread trimming, and steam pressing at our Jaipur atelier prior to boxing.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Ready-to-Ship Ensembles:</strong> Dispatched within 24 to 48 business hours.</li>
              <li><strong>Hand-Embroidered / Kalidar Customizations:</strong> Dispatched within 3 to 5 business days.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-vipasi-wine">2. Domestic Shipping Rates</h2>
            <p>
              We provide <strong>Complimentary Express Shipping</strong> for all prepaid and Cash-on-Delivery orders totaling ₹1,999 or more across India. For orders below ₹1,999, a nominal flat express shipping charge of ₹150 is applied at checkout.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-vipasi-wine">3. Real-Time Tracking</h2>
            <p>
              As soon as your parcel is collected by our express logistics partners (BlueDart, Delhivery, or Xpressbees), an automated dispatch notification with an active tracking link is dispatched to your registered WhatsApp number and email.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-vipasi-wine">4. Safe Transit Guarantee</h2>
            <p>
              All shipments are insured during transit. In the unlikely circumstance of transit damage or package tampering, please photograph the parcel and notify our concierge within 24 hours at <strong>admin@vipasi.in</strong> or WhatsApp <strong>+91 97994 44663</strong>.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
