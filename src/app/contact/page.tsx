'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock, CheckCircle2, Sparkles, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Order Enquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all required fields.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-vipasi-charcoal select-none py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 text-vipasi-wine text-xs uppercase tracking-[0.25em] font-sans font-semibold">
            <Sparkles size={13} className="text-vipasi-champagne" />
            <span>VIPASI CONCIERGE</span>
            <Sparkles size={13} className="text-vipasi-champagne" />
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-vipasi-charcoal">
            Connect With Our <span className="italic font-normal text-vipasi-wine">Jaipur Atelier</span>
          </h1>
          <p className="text-xs sm:text-sm text-vipasi-muted font-sans leading-relaxed">
            Whether you need sizing advice for a wedding, customization details, or shipping updates, our styling concierge is here to assist you.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Atelier Information (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Atelier Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9E1D6] shadow-xs space-y-6">
              <h3 className="font-serif text-xl font-bold text-vipasi-wine border-b border-vipasi-border pb-3">
                Flagship Studio & Atelier
              </h3>

              {/* Physical Address */}
              <div className="flex items-start space-x-3 text-xs font-sans">
                <MapPin size={18} className="text-vipasi-wine flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-vipasi-charcoal font-semibold mb-0.5">Jaipur Atelier:</strong>
                  <p className="text-vipasi-charcoal/80 leading-relaxed">
                    6/7, Sector 7 Rd, Ramji Pura, Malviya Nagar, Jaipur, Rajasthan 302017
                  </p>
                </div>
              </div>

              {/* WhatsApp Concierge */}
              <div className="flex items-start space-x-3 text-xs font-sans">
                <MessageCircle size={18} className="text-emerald-700 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-vipasi-charcoal font-semibold mb-0.5">WhatsApp Concierge:</strong>
                  <a
                    href="https://wa.me/919799444663?text=Hello%20VIPASI%20team,%20I%20have%20an%20enquiry%20regarding%20an%20order."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-700 hover:underline"
                  >
                    +91 97994 44663
                  </a>
                  <p className="text-[11px] text-vipasi-muted mt-0.5">Instant styling & sizing support</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-3 text-xs font-sans">
                <Mail size={18} className="text-vipasi-wine flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-vipasi-charcoal font-semibold mb-0.5">Email Support:</strong>
                  <a
                    href="mailto:admin@vipasi.in"
                    className="font-bold text-vipasi-wine hover:underline"
                  >
                    admin@vipasi.in
                  </a>
                  <p className="text-[11px] text-vipasi-muted mt-0.5">Response within 24 business hours</p>
                </div>
              </div>

              {/* Atelier Hours */}
              <div className="flex items-start space-x-3 text-xs font-sans">
                <Clock size={18} className="text-vipasi-wine flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-vipasi-charcoal font-semibold mb-0.5">Operational Hours:</strong>
                  <p className="text-vipasi-charcoal/80 leading-relaxed">
                    Monday to Saturday: 10:00 AM – 7:30 PM IST<br />
                    Sunday: Closed (Atelier resting)
                  </p>
                </div>
              </div>

              {/* Quick WhatsApp Action Button */}
              <a
                href="https://wa.me/919799444663?text=Hello%20VIPASI,%20I%20would%20like%20to%20connect%20with%20your%20stylist."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3 px-4 rounded-xl text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xs transition-colors"
              >
                <MessageCircle size={16} />
                <span>Chat Directly on WhatsApp</span>
              </a>

            </div>

          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#E9E1D6] shadow-xs">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-vipasi-charcoal">
                  Message Dispatched!
                </h3>
                <p className="text-xs sm:text-sm text-vipasi-muted font-sans max-w-md mx-auto leading-relaxed">
                  Thank you, {formData.name}. Our styling concierge in Jaipur will review your enquiry and get back to you at {formData.email}.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-vipasi-wine text-vipasi-sand text-xs px-6 py-2.5 rounded-full font-bold uppercase tracking-wider mt-4"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif text-2xl font-bold text-vipasi-charcoal mb-4">
                  Send Us a Direct Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans font-bold text-vipasi-charcoal mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Mehra"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs font-sans border border-vipasi-border rounded-xl bg-[#FAF7F2] focus:outline-none focus:border-vipasi-wine"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-bold text-vipasi-charcoal mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. radhika@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs font-sans border border-vipasi-border rounded-xl bg-[#FAF7F2] focus:outline-none focus:border-vipasi-wine"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans font-bold text-vipasi-charcoal mb-1">
                      Contact Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="10-digit mobile"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs font-sans border border-vipasi-border rounded-xl bg-[#FAF7F2] focus:outline-none focus:border-vipasi-wine"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-bold text-vipasi-charcoal mb-1">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs font-sans border border-vipasi-border rounded-xl bg-[#FAF7F2] focus:outline-none focus:border-vipasi-wine"
                    >
                      <option value="Order Enquiry">Order Status / Tracking</option>
                      <option value="Custom Sizing">Custom Sizing & Fitting</option>
                      <option value="Exchange">7-Day Doorstep Exchange</option>
                      <option value="Bridal Consultation">Bridal & Bulk Trousseau</option>
                      <option value="Other">General Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sans font-bold text-vipasi-charcoal mb-1">
                    Your Message / Query *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us about the ensemble or query you need help with..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 text-xs font-sans border border-vipasi-border rounded-xl bg-[#FAF7F2] focus:outline-none focus:border-vipasi-wine resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-vipasi-wine hover:bg-vipasi-wine-light text-vipasi-champagne text-xs uppercase tracking-[0.2em] font-bold px-8 py-3.5 rounded-xl shadow-md transition-all flex items-center space-x-2"
                >
                  <Send size={14} />
                  <span>Transmit Enquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
