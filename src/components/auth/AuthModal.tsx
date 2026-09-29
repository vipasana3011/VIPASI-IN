'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function AuthModal() {
  const { isAuthModalOpen, authModalMode, closeAuthModal, openAuthModal, login, signup } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(authModalMode);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [forgotSent, setForgotSent] = useState(false);

  // Form states
  const [loginEmailOrMobile, setLoginEmailOrMobile] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [fullName, setFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupMobile, setSignupMobile] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [forgotInput, setForgotInput] = useState('');

  // Keep modal mode in sync with authModalMode
  React.useEffect(() => {
    setMode(authModalMode);
    setErrorMsg(null);
    setForgotSent(false);
  }, [authModalMode, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const res = await login({
      emailOrMobile: loginEmailOrMobile,
      password: loginPassword,
    });

    setLoading(false);
    if (!res.success) {
      setErrorMsg(res.error || 'Invalid credentials');
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (signupPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please re-check.');
      return;
    }

    setLoading(true);
    const res = await signup({
      fullName,
      email: signupEmail,
      mobile: signupMobile,
      password: signupPassword,
    });

    setLoading(false);
    if (!res.success) {
      setErrorMsg(res.error || 'Registration failed');
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotInput) {
      setErrorMsg('Please enter your registered email or mobile number.');
      return;
    }
    setErrorMsg(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setForgotSent(true);
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="absolute inset-0 bg-vipasi-charcoal/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-[#FAF5EC] rounded-3xl shadow-2xl border border-vipasi-gold/40 overflow-hidden z-10"
        >
          {/* Top Brand Banner */}
          <div className="bg-vipasi-wine text-vipasi-cream px-6 py-5 flex items-center justify-between relative overflow-hidden">
            <div className="flex items-center space-x-3">
              <img src="/brand/logo-gold.png" alt="VIPASI" className="h-8 w-auto object-contain" />
              <div className="h-4 w-px bg-vipasi-champagne/40" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-vipasi-champagne font-medium">
                Jaipur Atelier
              </span>
            </div>
            <button
              onClick={closeAuthModal}
              className="p-1.5 rounded-full text-vipasi-cream/80 hover:text-vipasi-cream hover:bg-white/10 transition-colors"
              aria-label="Close authentication modal"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {/* Mode Tabs */}
            {mode !== 'forgot' && (
              <div className="flex rounded-xl bg-vipasi-sand/60 p-1 mb-6 border border-vipasi-border/60">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMsg(null);
                  }}
                  className={`flex-1 py-2 text-xs font-sans uppercase tracking-[0.16em] font-bold rounded-lg transition-all ${
                    mode === 'login'
                      ? 'bg-vipasi-wine text-vipasi-cream shadow-sm'
                      : 'text-vipasi-charcoal/70 hover:text-vipasi-wine'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setErrorMsg(null);
                  }}
                  className={`flex-1 py-2 text-xs font-sans uppercase tracking-[0.16em] font-bold rounded-lg transition-all ${
                    mode === 'signup'
                      ? 'bg-vipasi-wine text-vipasi-cream shadow-sm'
                      : 'text-vipasi-charcoal/70 hover:text-vipasi-wine'
                  }`}
                >
                  Create Account
                </button>
              </div>
            )}

            {/* Error Message */}
            {errorMsg && (
              <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-sans flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* 1. LOGIN FORM */}
            {mode === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-sans font-medium text-vipasi-charcoal mb-1.5">
                    Email Address or Mobile Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. priya@vipasi.in or 9876543210"
                      value={loginEmailOrMobile}
                      onChange={(e) => setLoginEmailOrMobile(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-vipasi-border bg-white text-sm font-sans focus:outline-none focus:border-vipasi-wine focus:ring-1 focus:ring-vipasi-wine transition-all"
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
                      onClick={() => setMode('forgot')}
                      className="text-[11px] font-sans text-vipasi-wine hover:underline font-semibold"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-vipasi-border bg-white text-sm font-sans focus:outline-none focus:border-vipasi-wine focus:ring-1 focus:ring-vipasi-wine transition-all"
                    />
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-vipasi-muted" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-vipasi-muted hover:text-vipasi-wine"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-vipasi-wine text-vipasi-sand hover:bg-vipasi-wine-light font-sans font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 mt-2"
                >
                  <span>{loading ? 'Authenticating...' : 'Sign In to VIPASI'}</span>
                  {!loading && <ArrowRight size={15} />}
                </button>

                <div className="pt-2 text-center text-xs font-sans text-vipasi-muted">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="text-vipasi-wine font-bold hover:underline"
                  >
                    Create one here
                  </button>
                </div>
              </form>
            )}

            {/* 2. SIGN UP FORM */}
            {mode === 'signup' && (
              <form onSubmit={handleSignupSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-sans font-medium text-vipasi-charcoal mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-xl border border-vipasi-border bg-white text-sm font-sans focus:outline-none focus:border-vipasi-wine"
                    />
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-vipasi-muted" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-sans font-medium text-vipasi-charcoal mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="radhika@example.com"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-vipasi-border bg-white text-xs font-sans focus:outline-none focus:border-vipasi-wine"
                      />
                      <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-vipasi-muted" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-medium text-vipasi-charcoal mb-1">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={signupMobile}
                        onChange={(e) => setSignupMobile(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-vipasi-border bg-white text-xs font-sans focus:outline-none focus:border-vipasi-wine"
                      />
                      <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-vipasi-muted" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-sans font-medium text-vipasi-charcoal mb-1">
                      Create Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        placeholder="Min 6 characters"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-vipasi-border bg-white text-xs font-sans focus:outline-none focus:border-vipasi-wine"
                      />
                      <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-vipasi-muted" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-medium text-vipasi-charcoal mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        placeholder="Re-enter password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-vipasi-border bg-white text-xs font-sans focus:outline-none focus:border-vipasi-wine"
                      />
                      <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-vipasi-muted" />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-vipasi-wine text-vipasi-sand hover:bg-vipasi-wine-light font-sans font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 mt-2"
                >
                  <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
                  {!loading && <ArrowRight size={15} />}
                </button>

                <div className="pt-2 text-center text-xs font-sans text-vipasi-muted">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-vipasi-wine font-bold hover:underline"
                  >
                    Sign in here
                  </button>
                </div>
              </form>
            )}

            {/* 3. FORGOT PASSWORD FORM */}
            {mode === 'forgot' && (
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <h3 className="font-serif text-xl font-bold text-vipasi-charcoal">
                    Reset Your Password
                  </h3>
                  <p className="text-xs text-vipasi-muted mt-1 font-sans">
                    Enter your email or phone number and we’ll send you a secure OTP or reset link.
                  </p>
                </div>

                {forgotSent ? (
                  <div className="text-center py-6 space-y-3">
                    <CheckCircle2 size={42} className="mx-auto text-emerald-600" />
                    <p className="text-sm font-sans font-semibold text-vipasi-charcoal">
                      Recovery Instructions Dispatched
                    </p>
                    <p className="text-xs text-vipasi-muted max-w-xs mx-auto">
                      We’ve sent a password reset token to <strong>{forgotInput}</strong>. Please check your inbox or SMS.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setForgotSent(false);
                        setMode('login');
                      }}
                      className="mt-4 px-6 py-2 bg-vipasi-wine text-vipasi-sand text-xs font-sans font-bold uppercase tracking-wider rounded-xl"
                    >
                      Return to Sign In
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleForgotSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-sans font-medium text-vipasi-charcoal mb-1.5">
                        Registered Email or Phone
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. priya@vipasi.in"
                        value={forgotInput}
                        onChange={(e) => setForgotInput(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-vipasi-border bg-white text-sm font-sans focus:outline-none focus:border-vipasi-wine"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 bg-vipasi-wine text-vipasi-sand hover:bg-vipasi-wine-light font-sans font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50"
                    >
                      {loading ? 'Sending Code...' : 'Send Reset Link'}
                    </button>

                    <div className="text-center pt-2">
                      <button
                        type="button"
                        onClick={() => setMode('login')}
                        className="text-xs font-sans text-vipasi-charcoal/70 hover:text-vipasi-wine underline"
                      >
                        Back to Login
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* Guest / Account Page Direct Link */}
            <div className="mt-6 pt-4 border-t border-vipasi-border flex items-center justify-between text-xs font-sans text-vipasi-muted">
              <button
                type="button"
                onClick={closeAuthModal}
                className="hover:text-vipasi-wine underline"
              >
                Continue as Guest
              </button>
              <Link
                href="/account"
                onClick={closeAuthModal}
                className="text-vipasi-wine font-semibold hover:underline flex items-center space-x-1"
              >
                <span>Full Account Portal</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
