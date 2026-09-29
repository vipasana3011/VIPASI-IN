'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, ChevronRight } from 'lucide-react';

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen text-vipasi-charcoal select-none py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb */}
        <nav className="text-xs font-sans text-vipasi-muted flex items-center space-x-2">
          <Link href="/" className="hover:text-vipasi-wine transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-vipasi-wine font-semibold">Terms & Conditions</span>
        </nav>

        {/* Header */}
        <div className="border-b border-vipasi-border pb-6">
          <div className="inline-flex items-center space-x-2 text-vipasi-wine text-xs uppercase tracking-widest font-sans font-bold mb-2">
            <FileText size={14} className="text-vipasi-wine" />
            <span>COMMERCIAL AGREEMENT</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-vipasi-charcoal">
            Terms & Conditions
          </h1>
          <p className="text-xs text-vipasi-muted font-sans mt-2">
            Effective Date: January 2026 • VIPASI Handcrafted Heritage
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E9E1D6] shadow-xs space-y-6 text-xs sm:text-sm font-sans text-vipasi-charcoal/85 leading-relaxed">
          
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-vipasi-wine">1. General Overview</h2>
            <p>
              By visiting our website and/or purchasing from VIPASI, you engage in our "Service" and agree to be bound by the following terms and conditions. These terms govern all orders placed through the website.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-vipasi-wine">2. Handcrafted Textile Variations</h2>
            <p>
              All VIPASI garments feature genuine handloom weaving, hand-block printing, and hand-embroidered aari/zardozi techniques. Because these are crafted by human hands, slight variations in weave texture, tie-dye pattern placement, and metallic zari reflection are hallmarks of authentic handcraft rather than defects.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-vipasi-wine">3. Pricing & Taxes</h2>
            <p>
              All prices listed on the website are in Indian Rupees (INR) and inclusive of all applicable Goods and Services Tax (GST). We reserve the right to revise product prices without prior notice; however, orders already confirmed will be honored at the purchased rate.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-vipasi-wine">4. Order Acceptance & Atelier Dispatch</h2>
            <p>
              Upon receiving your order, our Jaipur atelier conducts quality inspection before dispatching. In the rare event an item is out of stock or fails quality standards, we will notify you and provide a full prompt refund or alternate craft selection.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-vipasi-wine">5. Intellectual Property</h2>
            <p>
              All designs, bespoke illustrations, photographs, brand logos, and textual content on this website are the intellectual property of VIPASI. Unauthorized reproduction or commercial use is strictly prohibited.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-vipasi-wine">6. Jurisdiction</h2>
            <p>
              Any disputes arising from transactions on this website shall be subject to the exclusive jurisdiction of the competent courts in Jaipur, Rajasthan, India.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
