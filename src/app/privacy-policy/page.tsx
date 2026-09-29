'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ChevronRight } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen text-vipasi-charcoal select-none py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb */}
        <nav className="text-xs font-sans text-vipasi-muted flex items-center space-x-2">
          <Link href="/" className="hover:text-vipasi-wine transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-vipasi-wine font-semibold">Privacy Policy</span>
        </nav>

        {/* Header */}
        <div className="border-b border-vipasi-border pb-6">
          <div className="inline-flex items-center space-x-2 text-vipasi-wine text-xs uppercase tracking-widest font-sans font-bold mb-2">
            <ShieldCheck size={14} className="text-vipasi-wine" />
            <span>DATA INTEGRITY & TRUST</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-vipasi-charcoal">
            Privacy Policy
          </h1>
          <p className="text-xs text-vipasi-muted font-sans mt-2">
            Last Updated: January 2026 • VIPASI Handcrafted Heritage
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E9E1D6] shadow-xs space-y-6 text-xs sm:text-sm font-sans text-vipasi-charcoal/85 leading-relaxed">
          
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-vipasi-wine">1. Introduction</h2>
            <p>
              VIPASI ("we", "us", or "our") respects the privacy of our patrons and is committed to protecting your personal information. This Privacy Policy details how we collect, use, and safeguard personal information obtained when you browse our website (vipasi.in) or place orders for our handcrafted ethnic ensembles.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-vipasi-wine">2. Information We Collect</h2>
            <p>We collect information necessary to provide seamless shopping and delivery services:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Contact Information:</strong> Full name, shipping address, billing address, phone number, and email address.</li>
              <li><strong>Order History:</strong> Ensembles purchased, custom sizing notes, and transaction values.</li>
              <li><strong>Technical Identifiers:</strong> IP address, device type, browser session cookies used to preserve cart and wishlist preferences.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-vipasi-wine">3. Payment Information Security</h2>
            <p>
              We do not store your full debit/credit card numbers or UPI PINs on our servers. All digital payments are processed through PCI-DSS compliant, encrypted payment gateways.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-vipasi-wine">4. How We Use Your Information</h2>
            <p>
              Your data is utilized solely for processing and delivering your orders, dispatching real-time courier tracking SMS/WhatsApp alerts, providing customer support, and notifying you of new festive drops (only if opted-in).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-vipasi-wine">5. Third-Party Disclosures</h2>
            <p>
              We share minimal necessary contact information with trusted logistics partners (e.g. BlueDart, Delhivery) strictly to fulfill doorstep delivery and reverse pickup services. We do not sell or rent patron data to third-party marketers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-vipasi-wine">6. Data Rights & Atelier Contact</h2>
            <p>
              Patrons have the right to request access to or deletion of their personal records. For any privacy queries, please write to our Data Grievance Officer at <strong>admin@vipasi.in</strong> or mail our flagship atelier at <strong>6/7, Sector 7 Rd, Ramji Pura, Malviya Nagar, Jaipur, Rajasthan 302017</strong>.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
