'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  LogOut,
  Sparkles,
  ChevronRight,
  Package,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Plus,
  Trash2,
  Mail,
  Phone,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { useAuth, SavedAddress } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

export default function AccountPage() {
  const {
    user,
    isLoggedIn,
    orders,
    addresses,
    login,
    signup,
    logout,
    saveAddress,
    deleteAddress,
    updateProfile,
  } = useAuth();

  const { wishlist } = useCart();

  // Active dashboard tab
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('profile');

  // Auth form state if not logged in
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  // Login inputs
  const [loginEmailOrMobile, setLoginEmailOrMobile] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup inputs
  const [fullName, setFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupMobile, setSignupMobile] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Forgot password input
  const [forgotInput, setForgotInput] = useState('');

  // Address modal / inline add
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({
    name: '',
    mobile: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false,
    type: 'Home' as 'Home' | 'Work',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);
    const res = await login({ emailOrMobile: loginEmailOrMobile, password: loginPassword });
    setLoading(false);
    if (!res.success) {
      setErrorMsg(res.error || 'Authentication failed');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (signupPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }
    setLoading(true);
    const res = await signup({ fullName, email: signupEmail, mobile: signupMobile, password: signupPassword });
    setLoading(false);
    if (!res.success) {
      setErrorMsg(res.error || 'Could not create account');
    }
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.name || !newAddr.mobile || !newAddr.addressLine1 || !newAddr.pincode) return;
    saveAddress(newAddr);
    setIsAddingAddress(false);
    setNewAddr({
      name: '',
      mobile: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: false,
      type: 'Home',
    });
  };

  return (
    <div className="min-h-screen bg-vipasi-ivory pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs font-sans text-vipasi-muted uppercase tracking-wider mb-6">
          <Link href="/" className="hover:text-vipasi-wine">Home</Link>
          <ChevronRight size={12} />
          <span className="text-vipasi-wine font-semibold">Customer Account</span>
        </nav>

        {!user ? (
          /* ========================================================
             NOT LOGGED IN: SPLIT EDITORIAL AUTH VIEW
             ======================================================== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#FAF5EC] rounded-3xl border border-vipasi-gold/30 shadow-luxury overflow-hidden">
            
            {/* Left Column: Artisan Brand Canvas */}
            <div className="lg:col-span-5 bg-vipasi-wine text-vipasi-cream p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center space-x-2 text-vipasi-champagne text-xs uppercase tracking-[0.28em] font-sans font-semibold">
                  <Sparkles size={13} />
                  <span>VIPASI PATRON CIRCLE</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                  Welcome to Your Handcrafted Sanctuary
                </h1>
                <p className="text-xs sm:text-sm text-vipasi-cream/80 font-sans leading-relaxed">
                  Track bespoke couture orders direct from our Jaipur ateliers, curate your personal festive wishlist, and manage your royal delivery addresses.
                </p>
              </div>

              {/* Artisan Perks */}
              <div className="relative z-10 pt-8 border-t border-vipasi-champagne/20 space-y-3">
                <div className="flex items-center space-x-3 text-xs text-vipasi-cream/90 font-sans">
                  <ShieldCheck size={18} className="text-vipasi-champagne" />
                  <span>100% Handcrafted Authenticity Guaranteed</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-vipasi-cream/90 font-sans">
                  <Package size={18} className="text-vipasi-champagne" />
                  <span>Complimentary Doorstep Exchanges & Size Adjustments</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-vipasi-cream/90 font-sans">
                  <Clock size={18} className="text-vipasi-champagne" />
                  <span>Priority Access to New Festive & Bridal Drops</span>
                </div>
              </div>

              {/* Decorative Watermark */}
              <div className="absolute -bottom-10 -right-10 opacity-10 pointer-events-none">
                <img src="/brand/logo-gold.png" alt="" className="w-64 h-auto" />
              </div>
            </div>

            {/* Right Column: Auth Form */}
            <div className="lg:col-span-7 p-6 sm:p-12 flex flex-col justify-center">
              
              {/* Mode Switcher */}
              {authMode !== 'forgot' && (
                <div className="flex rounded-xl bg-vipasi-sand/50 p-1 mb-8 max-w-md border border-vipasi-border/60">
                  <button
                    onClick={() => {
                      setAuthMode('login');
                      setErrorMsg(null);
                    }}
                    className={`flex-1 py-2.5 text-xs font-sans uppercase tracking-[0.16em] font-bold rounded-lg transition-all ${
                      authMode === 'login'
                        ? 'bg-vipasi-wine text-vipasi-cream shadow-sm'
                        : 'text-vipasi-charcoal/70 hover:text-vipasi-wine'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setAuthMode('signup');
                      setErrorMsg(null);
                    }}
                    className={`flex-1 py-2.5 text-xs font-sans uppercase tracking-[0.16em] font-bold rounded-lg transition-all ${
                      authMode === 'signup'
                        ? 'bg-vipasi-wine text-vipasi-cream shadow-sm'
                        : 'text-vipasi-charcoal/70 hover:text-vipasi-wine'
                    }`}
                  >
                    Create Account
                  </button>
                </div>
              )}

              {/* Error Notification */}
              {errorMsg && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-sans">
                  {errorMsg}
                </div>
              )}

              {/* 1. SIGN IN FORM */}
              {authMode === 'login' && (
                <form onSubmit={handleLogin} className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-sans font-medium text-vipasi-charcoal mb-1.5">
                      Email or Mobile Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. patron@vipasi.in or 9799444663"
                        value={loginEmailOrMobile}
                        onChange={(e) => setLoginEmailOrMobile(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-vipasi-border bg-white text-sm font-sans focus:outline-none focus:border-vipasi-wine"
                      />
                      <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-vipasi-muted" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-sans font-medium text-vipasi-charcoal">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setAuthMode('forgot')}
                        className="text-xs font-sans text-vipasi-wine hover:underline font-semibold"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        placeholder="Enter password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-vipasi-border bg-white text-sm font-sans focus:outline-none focus:border-vipasi-wine"
                      />
                      <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-vipasi-muted" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-vipasi-wine text-vipasi-sand hover:bg-vipasi-wine-light font-sans font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer mt-4"
                  >
                    <span>{loading ? 'Authenticating...' : 'Sign In to VIPASI'}</span>
                    {!loading && <ArrowRight size={15} />}
                  </button>

                  <div className="pt-4 text-xs font-sans text-vipasi-muted">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('signup')}
                      className="text-vipasi-wine font-bold hover:underline"
                    >
                      Create one here
                    </button>
                  </div>
                </form>
              )}

              {/* 2. SIGN UP FORM */}
              {authMode === 'signup' && (
                <form onSubmit={handleSignup} className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-sans font-medium text-vipasi-charcoal mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-vipasi-border bg-white text-sm font-sans focus:outline-none focus:border-vipasi-wine"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-sans font-medium text-vipasi-charcoal mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="patron@vipasi.in"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-vipasi-border bg-white text-xs font-sans focus:outline-none focus:border-vipasi-wine"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans font-medium text-vipasi-charcoal mb-1">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 97994 44663"
                        value={signupMobile}
                        onChange={(e) => setSignupMobile(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-vipasi-border bg-white text-xs font-sans focus:outline-none focus:border-vipasi-wine"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-sans font-medium text-vipasi-charcoal mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="Min 6 characters"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-vipasi-border bg-white text-xs font-sans focus:outline-none focus:border-vipasi-wine"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans font-medium text-vipasi-charcoal mb-1">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-vipasi-border bg-white text-xs font-sans focus:outline-none focus:border-vipasi-wine"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-vipasi-wine text-vipasi-sand hover:bg-vipasi-wine-light font-sans font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer mt-4"
                  >
                    <span>{loading ? 'Registering...' : 'Create VIPASI Account'}</span>
                    {!loading && <ArrowRight size={15} />}
                  </button>

                  <div className="pt-4 text-xs font-sans text-vipasi-muted">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      className="text-vipasi-wine font-bold hover:underline"
                    >
                      Sign in here
                    </button>
                  </div>
                </form>
              )}

              {/* 3. FORGOT PASSWORD */}
              {authMode === 'forgot' && (
                <div className="max-w-md space-y-4">
                  <h2 className="font-serif text-2xl font-bold text-vipasi-charcoal">
                    Password Recovery
                  </h2>
                  <p className="text-xs text-vipasi-muted font-sans leading-relaxed">
                    Enter the email address or phone number associated with your VIPASI account to receive a secure recovery code.
                  </p>

                  {forgotSent ? (
                    <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                      <CheckCircle2 size={36} className="mx-auto text-emerald-600" />
                      <p className="text-sm font-semibold text-emerald-900">
                        Recovery instructions dispatched to {forgotInput}
                      </p>
                      <button
                        onClick={() => {
                          setForgotSent(false);
                          setAuthMode('login');
                        }}
                        className="px-6 py-2 bg-vipasi-wine text-vipasi-sand text-xs font-sans font-bold uppercase tracking-wider rounded-xl"
                      >
                        Return to Sign In
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (forgotInput) setForgotSent(true);
                      }}
                      className="space-y-4"
                    >
                      <input
                        type="text"
                        required
                        placeholder="Registered email or phone"
                        value={forgotInput}
                        onChange={(e) => setForgotInput(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-vipasi-border bg-white text-sm font-sans focus:outline-none focus:border-vipasi-wine"
                      />
                      <button
                        type="submit"
                        className="w-full py-3.5 bg-vipasi-wine text-vipasi-sand text-xs font-sans font-bold uppercase tracking-[0.2em] rounded-xl shadow-md"
                      >
                        Dispatch Reset Token
                      </button>
                      <div className="text-center pt-2">
                        <button
                          type="button"
                          onClick={() => setAuthMode('login')}
                          className="text-xs font-sans text-vipasi-charcoal/70 hover:text-vipasi-wine underline"
                        >
                          Cancel and return to Sign In
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* Guest shopping */}
              <div className="mt-8 pt-6 border-t border-vipasi-border max-w-md flex items-center justify-between text-xs font-sans text-vipasi-muted">
                <span>Just browsing royal pieces?</span>
                <Link href="/collections" className="text-vipasi-wine font-semibold hover:underline">
                  Explore Collections →
                </Link>
              </div>

            </div>

          </div>
        ) : (
          /* ========================================================
             LOGGED IN: COMPLETE PATRON DASHBOARD
             ======================================================== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Sidebar Navigation */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-vipasi-border shadow-xs h-fit space-y-6">
              <div className="flex items-center space-x-4 pb-6 border-b border-vipasi-border">
                <div className="w-14 h-14 rounded-full bg-vipasi-wine text-vipasi-champagne flex items-center justify-center font-serif text-xl font-bold border-2 border-vipasi-gold">
                  {user.fullName.charAt(0)}
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-vipasi-charcoal">
                    {user.fullName}
                  </h2>
                  <p className="text-xs text-vipasi-muted font-sans">{user.email}</p>
                  <span className="inline-block mt-1 text-[10px] uppercase tracking-wider text-vipasi-wine font-bold px-2 py-0.5 rounded-full bg-vipasi-sand">
                    Patron Member
                  </span>
                </div>
              </div>

              {/* Tab Navigation */}
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-sans uppercase tracking-wider font-semibold transition-all ${
                    activeTab === 'profile'
                      ? 'bg-vipasi-wine text-vipasi-cream'
                      : 'text-vipasi-charcoal/80 hover:bg-vipasi-sand/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <User size={16} />
                    <span>My Profile</span>
                  </div>
                  <ChevronRight size={14} />
                </button>

                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-sans uppercase tracking-wider font-semibold transition-all ${
                    activeTab === 'orders'
                      ? 'bg-vipasi-wine text-vipasi-cream'
                      : 'text-vipasi-charcoal/80 hover:bg-vipasi-sand/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <ShoppingBag size={16} />
                    <span>My Orders ({orders.length})</span>
                  </div>
                  <ChevronRight size={14} />
                </button>

                <Link
                  href="/wishlist"
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-sans uppercase tracking-wider font-semibold text-vipasi-charcoal/80 hover:bg-vipasi-sand/50 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <Heart size={16} />
                    <span>Wishlist ({wishlist.length})</span>
                  </div>
                  <ChevronRight size={14} />
                </Link>

                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-sans uppercase tracking-wider font-semibold transition-all ${
                    activeTab === 'addresses'
                      ? 'bg-vipasi-wine text-vipasi-cream'
                      : 'text-vipasi-charcoal/80 hover:bg-vipasi-sand/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <MapPin size={16} />
                    <span>Saved Addresses ({addresses.length})</span>
                  </div>
                  <ChevronRight size={14} />
                </button>
              </nav>

              {/* Logout Button */}
              <div className="pt-4 border-t border-vipasi-border">
                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl text-xs font-sans uppercase tracking-wider font-bold text-red-700 bg-red-50 hover:bg-red-100 transition-colors"
                >
                  <LogOut size={15} />
                  <span>Logout from Session</span>
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* TAB 1: PROFILE */}
              {activeTab === 'profile' && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-vipasi-border shadow-xs space-y-6">
                  <div className="border-b border-vipasi-border pb-4">
                    <h3 className="font-serif text-2xl font-bold text-vipasi-charcoal">
                      Personal Profile
                    </h3>
                    <p className="text-xs text-vipasi-muted font-sans">
                      Your VIPASI Patron membership details and communication preferences.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <span className="block text-xs font-sans text-vipasi-muted mb-1">Full Name</span>
                      <p className="text-sm font-sans font-semibold text-vipasi-charcoal bg-vipasi-sand/30 p-3 rounded-xl border border-vipasi-border/60">
                        {user.fullName}
                      </p>
                    </div>

                    <div>
                      <span className="block text-xs font-sans text-vipasi-muted mb-1">Email Address</span>
                      <p className="text-sm font-sans font-semibold text-vipasi-charcoal bg-vipasi-sand/30 p-3 rounded-xl border border-vipasi-border/60">
                        {user.email}
                      </p>
                    </div>

                    <div>
                      <span className="block text-xs font-sans text-vipasi-muted mb-1">Mobile Contact</span>
                      <p className="text-sm font-sans font-semibold text-vipasi-charcoal bg-vipasi-sand/30 p-3 rounded-xl border border-vipasi-border/60">
                        {user.mobile}
                      </p>
                    </div>

                    <div>
                      <span className="block text-xs font-sans text-vipasi-muted mb-1">Patron Since</span>
                      <p className="text-sm font-sans font-semibold text-vipasi-charcoal bg-vipasi-sand/30 p-3 rounded-xl border border-vipasi-border/60">
                        {user.joinedDate}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-vipasi-border flex items-center justify-between">
                    <p className="text-xs text-vipasi-muted font-sans">
                      Need custom styling or size alteration? Contact our Jaipur Karigars anytime.
                    </p>
                    <a
                      href="https://wa.me/919799444663"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-sans font-bold uppercase tracking-wider hover:bg-emerald-800 transition-colors"
                    >
                      WhatsApp Concierge
                    </a>
                  </div>
                </div>
              )}

              {/* TAB 2: MY ORDERS */}
              {activeTab === 'orders' && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-vipasi-border shadow-xs space-y-6">
                  <div className="border-b border-vipasi-border pb-4">
                    <h3 className="font-serif text-2xl font-bold text-vipasi-charcoal">
                      Order History
                    </h3>
                    <p className="text-xs text-vipasi-muted font-sans">
                      Real-time crafting and dispatch status of your handcrafted garments.
                    </p>
                  </div>

                  {orders.length === 0 ? (
                    <div className="text-center py-12 space-y-3">
                      <ShoppingBag size={36} className="mx-auto text-vipasi-muted/60" />
                      <p className="text-sm font-sans text-vipasi-muted">No orders placed yet.</p>
                      <Link
                        href="/collections"
                        className="inline-block px-6 py-2.5 bg-vipasi-wine text-vipasi-sand text-xs font-sans font-bold uppercase tracking-wider rounded-xl"
                      >
                        Discover Collections
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((ord) => (
                        <div
                          key={ord.id}
                          className="rounded-2xl border border-vipasi-border bg-[#FAF6EE] p-5 space-y-4"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-vipasi-border/60">
                            <div>
                              <span className="text-[10px] font-sans uppercase tracking-wider text-vipasi-muted">
                                Order Reference
                              </span>
                              <p className="text-sm font-sans font-bold text-vipasi-charcoal">
                                {ord.orderNumber}
                              </p>
                            </div>
                            <div>
                              <span className="text-[10px] font-sans uppercase tracking-wider text-vipasi-muted">
                                Placed On
                              </span>
                              <p className="text-xs font-sans font-medium text-vipasi-charcoal">
                                {ord.orderDate}
                              </p>
                            </div>
                            <div>
                              <span className="text-[10px] font-sans uppercase tracking-wider text-vipasi-muted">
                                Atelier Status
                              </span>
                              <span className="block text-xs font-sans font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                                {ord.status}
                              </span>
                            </div>
                          </div>

                          {/* Order Items */}
                          {ord.items.map((item, idx) => (
                            <div key={idx} className="flex items-center space-x-4">
                              <img
                                src={item.productImage}
                                alt={item.productName}
                                className="w-16 h-20 object-cover rounded-xl border border-vipasi-border/80"
                              />
                              <div className="flex-1">
                                <h4 className="font-serif text-base font-bold text-vipasi-charcoal">
                                  {item.productName}
                                </h4>
                                <p className="text-xs font-sans text-vipasi-muted mt-0.5">
                                  Size: <span className="font-semibold text-vipasi-charcoal">{item.size}</span> | Qty: {item.quantity}
                                </p>
                                <p className="text-xs font-sans font-bold text-vipasi-wine mt-1">
                                  ₹{item.price.toLocaleString('en-IN')}
                                </p>
                              </div>
                            </div>
                          ))}

                          <div className="pt-3 border-t border-vipasi-border/60 flex items-center justify-between text-xs font-sans">
                            <span className="text-vipasi-muted">
                              Tracking ID: <strong className="text-vipasi-charcoal">{ord.trackingNumber}</strong>
                            </span>
                            <span className="font-bold text-vipasi-charcoal text-sm">
                              Total: ₹{ord.totalAmount.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: SAVED ADDRESSES */}
              {activeTab === 'addresses' && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-vipasi-border shadow-xs space-y-6">
                  <div className="flex items-center justify-between border-b border-vipasi-border pb-4">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-vipasi-charcoal">
                        Saved Addresses
                      </h3>
                      <p className="text-xs text-vipasi-muted font-sans">
                        Manage your residential and ceremonial delivery destinations.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsAddingAddress(!isAddingAddress)}
                      className="px-4 py-2 bg-vipasi-wine text-vipasi-sand text-xs font-sans font-bold uppercase tracking-wider rounded-xl flex items-center space-x-1.5"
                    >
                      <Plus size={14} />
                      <span>Add New</span>
                    </button>
                  </div>

                  {/* Add Address Form */}
                  {isAddingAddress && (
                    <form
                      onSubmit={handleSaveAddress}
                      className="p-5 rounded-2xl bg-[#FAF5EC] border border-vipasi-gold/50 space-y-3"
                    >
                      <h4 className="font-serif text-base font-bold text-vipasi-charcoal">
                        New Address Details
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Recipient Name"
                          value={newAddr.name}
                          onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                          className="px-3 py-2 rounded-xl border border-vipasi-border bg-white text-xs font-sans"
                        />
                        <input
                          type="tel"
                          required
                          placeholder="Mobile Number"
                          value={newAddr.mobile}
                          onChange={(e) => setNewAddr({ ...newAddr, mobile: e.target.value })}
                          className="px-3 py-2 rounded-xl border border-vipasi-border bg-white text-xs font-sans"
                        />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="Street Address, Flat / Villa No."
                        value={newAddr.addressLine1}
                        onChange={(e) => setNewAddr({ ...newAddr, addressLine1: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-vipasi-border bg-white text-xs font-sans"
                      />
                      <div className="grid grid-cols-3 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="City (e.g. Jaipur)"
                          value={newAddr.city}
                          onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                          className="px-3 py-2 rounded-xl border border-vipasi-border bg-white text-xs font-sans"
                        />
                        <input
                          type="text"
                          required
                          placeholder="State"
                          value={newAddr.state}
                          onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                          className="px-3 py-2 rounded-xl border border-vipasi-border bg-white text-xs font-sans"
                        />
                        <input
                          type="text"
                          required
                          placeholder="Pincode"
                          value={newAddr.pincode}
                          onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                          className="px-3 py-2 rounded-xl border border-vipasi-border bg-white text-xs font-sans"
                        />
                      </div>
                      <div className="flex justify-end space-x-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingAddress(false)}
                          className="px-4 py-2 border border-vipasi-border rounded-xl text-xs font-sans font-semibold text-vipasi-charcoal"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-vipasi-wine text-vipasi-sand rounded-xl text-xs font-sans font-bold uppercase tracking-wider"
                        >
                          Save Address
                        </button>
                      </div>
                    </form>
                  )}

                  {/* List of addresses */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className="rounded-2xl border border-vipasi-border p-4 bg-[#FAF7F0] relative space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-vipasi-wine bg-vipasi-wine/10 px-2 py-0.5 rounded-full">
                            {addr.type}
                          </span>
                          <button
                            onClick={() => deleteAddress(addr.id)}
                            className="text-vipasi-muted hover:text-red-700"
                            aria-label="Delete address"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <h4 className="font-serif text-base font-bold text-vipasi-charcoal">
                          {addr.name}
                        </h4>
                        <p className="text-xs font-sans text-vipasi-muted leading-relaxed">
                          {addr.addressLine1}
                          {addr.addressLine2 && `, ${addr.addressLine2}`}
                          <br />
                          {addr.city}, {addr.state} — {addr.pincode}
                        </p>
                        <p className="text-xs font-sans text-vipasi-charcoal/80 pt-1">
                          Phone: {addr.mobile}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
