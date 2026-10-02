import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, User, Mail } from 'lucide-react';
import { UserSession } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserSession) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [authStep, setAuthStep] = useState<'choose' | 'custom_google'>('choose');
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  // Handle Quick Google Sign-In with Default or detected account
  const handleQuickGoogleSignIn = (name: string, email: string, avatarUrl: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      const newUser: UserSession = {
        id: `user-google-${Date.now()}`,
        name: name || 'শাহরাস্তি মেম্বার',
        email: email || 'user@shahrasti.bd',
        avatar: avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
        provider: 'google',
        hasCompletedProfile: false,
        joinedAt: new Date().toLocaleDateString('bn-BD', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      };

      onLoginSuccess(newUser);
      setIsProcessing(false);
      onClose();
    }, 600);
  };

  // Handle Facebook Sign-In
  const handleFacebookSignIn = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const newUser: UserSession = {
        id: `user-fb-${Date.now()}`,
        name: 'শাহরাস্তি ফেসবুক সদস্য',
        email: 'facebook.member@shahrasti.bd',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80',
        provider: 'facebook',
        hasCompletedProfile: false,
        joinedAt: new Date().toLocaleDateString('bn-BD', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      };

      onLoginSuccess(newUser);
      setIsProcessing(false);
      onClose();
    }, 600);
  };

  // Handle Custom Google Account Input
  const handleCustomGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || !customEmail.trim()) return;

    handleQuickGoogleSignIn(
      customName.trim(),
      customEmail.trim(),
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <h3 className="font-bold text-slate-900 text-base sm:text-lg">
              আমার শাহরাস্তিতে যুক্ত হোন
            </h3>
            <p className="text-xs text-slate-600">
              সোশ্যাল মিডিয়া বা গুগল একাউন্ট দিয়ে ১ ক্লিকে যুক্ত হোন
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {authStep === 'choose' ? (
            <div className="space-y-3">
              {/* Quick Google Account Shortcut (using Tech.shahrasti@gmail.com) */}
              <button
                onClick={() =>
                  handleQuickGoogleSignIn(
                    'শাহরাস্তি টেক ইউজার',
                    'Tech.shahrasti@gmail.com',
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
                  )
                }
                disabled={isProcessing}
                className="w-full flex items-center justify-between p-3.5 bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-400 rounded-xl transition-all shadow-xs group text-left"
              >
                <div className="flex items-center gap-3">
                  {/* Google SVG G-Icon */}
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <div>
                    <div className="font-bold text-sm text-slate-800 group-hover:text-slate-900">
                      Google দিয়ে প্রবেশ করুন
                    </div>
                    <div className="text-xs text-slate-500 font-mono">
                      Tech.shahrasti@gmail.com
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                  ১-ক্লিক লগইন
                </span>
              </button>

              {/* Other Google Account Option */}
              <button
                onClick={() => setAuthStep('custom_google')}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 p-3 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 transition-colors"
              >
                <Mail className="w-4 h-4 text-slate-500" />
                <span>অন্য কোনো গুগল / জিমেইল একাউন্ট দিয়ে লগইন</span>
              </button>

              {/* Facebook Sign In */}
              <button
                onClick={handleFacebookSignIn}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2.5 p-3.5 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-xl text-sm font-semibold transition-all shadow-xs"
              >
                {/* Facebook SVG Logo */}
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Facebook দিয়ে যুক্ত হোন</span>
              </button>

              {/* Trust markers */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500 text-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>আপনার তথ্য সম্পূর্ণ নিরাপদ ও সুরক্ষিত থাকবে</span>
              </div>

              <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-900 leading-relaxed">
                💡 <strong>লগইন করার পর কী হবে?</strong>
                <p className="mt-1 text-emerald-800">
                  যুক্ত হওয়ার সাথে সাথে আপনি আপনার পেশা, অভিজ্ঞতা, ইউনিয়ন ও গ্রামসহ প্রয়োজনীয় সকল তথ্য দিয়ে নিজের কর্মী প্রোফাইল আপডেট বা প্রকাশ করতে পারবেন।
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleCustomGoogleSubmit} className="space-y-3.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-bold text-slate-800">গুগল একাউন্ট বিবরণ দিন</span>
                <button
                  type="button"
                  onClick={() => setAuthStep('choose')}
                  className="text-xs text-emerald-700 hover:underline"
                >
                  ফিরে যান
                </button>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  আপনার নাম *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="যেমন: তারেক মাহমুদ"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  গুগল জিমেইল অ্যাড্রেস *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAuthStep('choose')}
                  className="px-3 py-2 text-slate-600 hover:text-slate-900"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold transition-colors"
                >
                  {isProcessing ? 'লগইন হচ্ছে...' : 'যুক্ত হোন ও প্রোফাইল আপডেট করুন'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
