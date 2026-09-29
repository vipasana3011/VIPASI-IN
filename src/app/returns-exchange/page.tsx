'use client';

import React from 'react';
import Link from 'next/link';
import { RefreshCw, ChevronRight, CheckCircle2, AlertCircle, MessageCircle } from 'lucide-react';

export default function ReturnsExchangePage() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen text-vipasi-charcoal select-none py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb */}
        <nav className="text-xs font-sans text-vipasi-muted flex items-center space-x-2">
          <Link href="/" className="hover:text-vipasi-wine transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-vipasi-wine font-semibold">Returns & Exchange</span>
        </nav>

        {/* Header */}
        <div className="border-b border-vipasi-border pb-6">
          <div className="inline-flex items-center space-x-2 text-vipasi-wine text-xs uppercase tracking-widest font-sans font-bold mb-2">
            <RefreshCw size={14} className="text-vipasi-wine" />
            <span>HASSLE-FREE DOORSTEP SERVICE</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-vipasi-charcoal">
            7-Day Exchange Policy
          </h1>
          <p className="text-xs text-vipasi-muted font-sans mt-2">
            We want your royal ensemble to fit like a dream • VIPASI Jaipur Ateliers
          </p>
        </div>

        {/* Highlights Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-vipasi-border text-center space-y-1">
            <RefreshCw size={20} className="text-vipasi-wine mx-auto" />
            <h4 className="font-serif text-sm font-bold text-vipasi-charcoal">7-Day Window</h4>
            <p className="text-[11px] text-vipasi-muted font-sans">From the day of parcel delivery</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-vipasi-border text-center space-y-1">
            <CheckCircle2 size={20} className="text-vipasi-wine mx-auto" />
            <h4 className="font-serif text-sm font-bold text-vipasi-charcoal">Free Doorstep Pickup</h4>
            <p className="text-[11px] text-vipasi-muted font-sans">Arranged right at your doorstep</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-vipasi-border text-center space-y-1">
            <MessageCircle size={20} className="text-emerald-700 mx-auto" />
            <h4 className="font-serif text-sm font-bold text-vipasi-charcoal">1-Tap WhatsApp Request</h4>
            <p className="text-[11px] text-vipasi-muted font-sans">Instant exchange coordination</p>
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E9E1D6] shadow-xs space-y-6 text-xs sm:text-sm font-sans text-vipasi-charcoal/85 leading-relaxed">
          
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-vipasi-wine">1. Eligibility for Exchange</h2>
            <p>
              We gladly accept exchange requests for alternate sizes, colorways, or store credit within <strong>7 days</strong> from the date of delivery.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Garments must remain unworn, unwashed, and un-altered.</li>
              <li>Original VIPASI security tags, handloom certificates, and packaging must be intact.</li>
              <li>Ensembles with stains or perfume sprays cannot be exchanged.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-vipasi-wine">2. Simple 3-Step Exchange Process</h2>
            <ol className="list-decimal pl-5 space-y-1.5">
              <li>
                <strong>Initiate Request:</strong> Message our WhatsApp concierge at <strong>+91 97994 44663</strong> or email <strong>admin@vipasi.in</strong> with your Order ID and preferred size.
              </li>
              <li>
                <strong>Reverse Pickup:</strong> Our logistics partner will pick up the package from your address within 24 to 48 hours.
              </li>
              <li>
                <strong>Replacement Dispatch:</strong> As soon as the garment arrives back at our Jaipur atelier, the replacement outfit is dispatched with priority courier.
              </li>
            </ol>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-vipasi-wine">3. Cancellation & Refunds</h2>
            <p>
              Orders may be cancelled before atelier dispatch for an immediate 100% refund. In case of returned items where an exchange is not desired, patrons receive a full store credit voucher valid for 12 months with no expiration restrictions.
            </p>
          </section>

          {/* Direct WhatsApp Callout */}
          <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-vipasi-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <strong className="block font-serif text-base text-vipasi-charcoal">Need an immediate size exchange?</strong>
              <p className="text-xs text-vipasi-muted">Our Jaipur concierge team is online Monday to Saturday (10 AM - 7:30 PM).</p>
            </div>
            <a
              href="https://wa.me/919799444663?text=Hi%20VIPASI,%20I%20would%20like%20to%20request%20a%20size%20exchange%20for%20my%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-xs transition-colors whitespace-nowrap"
            >
              Chat on WhatsApp
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
