import React, { useState } from 'react';
import {
  Bookmark,
  Briefcase,
  Plus,
  Users,
  ClipboardList,
  MapPin,
  PhoneCall,
  User,
  LogIn,
  Store,
  Menu,
  X,
  ShieldAlert,
  Columns
} from 'lucide-react';
import { UserSession } from '../types';

interface HeaderProps {
  activeTab: 'all' | 'shops' | 'unions' | 'categories' | 'bookmarks' | 'requests';
  setActiveTab: (tab: 'all' | 'shops' | 'unions' | 'categories' | 'bookmarks' | 'requests') => void;
  bookmarkCount: number;
  requestCount: number;
  currentUser: UserSession | null;
  onOpenAddWorker: () => void;
  onOpenAddShop: () => void;
  onOpenEmergency: () => void;
  onOpenAdmin: () => void;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  bookmarkCount,
  requestCount,
  currentUser,
  onOpenAddWorker,
  onOpenAddShop,
  onOpenEmergency,
  onOpenAdmin,
  onOpenAuth,
  onOpenProfile
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [joinDropdownOpen, setJoinDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setActiveTab('all');
              setMobileMenuOpen(false);
            }}
            className="text-left font-extrabold text-xl sm:text-2xl tracking-tight text-emerald-800 hover:text-emerald-950 transition-colors whitespace-nowrap flex items-center gap-1.5"
          >
            <span>আমার শাহরাস্তি</span>
          </button>
        </div>

        {/* Zone 2: Desktop clean single-line nav links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap ${
              activeTab === 'all'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            <Columns className="w-4 h-4 text-emerald-600" />
            <span>দোকান ও কারিগর (দ্বৈত ভিউ)</span>
          </button>

          {/* Dedicated Shops & Businesses Tab */}
          <button
            onClick={() => setActiveTab('shops')}
            className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap ${
              activeTab === 'shops'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>দোকান ও ব্যবসা</span>
          </button>

          <button
            onClick={() => setActiveTab('unions')}
            className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap ${
              activeTab === 'unions'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>ইউনিয়নসমূহ</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap ${
              activeTab === 'categories'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>পেশাসমূহ</span>
          </button>

          <button
            onClick={onOpenEmergency}
            className="flex items-center gap-1.5 py-1 text-red-600 hover:text-red-700 font-medium transition-colors whitespace-nowrap"
          >
            <PhoneCall className="w-4 h-4" />
            <span>জরুরি হেল্পলাইন</span>
          </button>

          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap ${
              activeTab === 'bookmarks'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>বুকমার্ক</span>
            {bookmarkCount > 0 && (
              <span className="text-xs bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded-full font-mono tabular-nums">
                {bookmarkCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap ${
              activeTab === 'requests'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>কাজের আবেদন</span>
            {requestCount > 0 && (
              <span className="text-xs bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-mono tabular-nums">
                {requestCount}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: Primary Action, Member Auth & SuperAdmin Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* SuperAdmin Access Button */}
          <button
            onClick={onOpenAdmin}
            className="p-2 text-slate-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            title="সুপারএডমিন কন্ট্রোল প্যানেল"
          >
            <ShieldAlert className="w-4 h-4 text-red-500" />
          </button>

          {/* Mobile Emergency Button */}
          <button
            onClick={onOpenEmergency}
            className="lg:hidden p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="শাহরাস্তি জরুরি নম্বর"
          >
            <PhoneCall className="w-4 h-4" />
          </button>

          {/* Member Authentication State */}
          {currentUser ? (
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2 p-1.5 pr-2.5 sm:pr-3 bg-slate-100 hover:bg-emerald-50 rounded-full border border-slate-200 hover:border-emerald-300 transition-all text-left"
              title="আমার প্রোফাইল ও তথ্য আপডেট করুন"
            >
              <div className="w-7 h-7 rounded-full overflow-hidden border border-emerald-600 shrink-0">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:block text-xs font-semibold text-slate-800 truncate max-w-[100px]">
                {currentUser.name}
              </div>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-emerald-800 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap"
            >
              <LogIn className="w-4 h-4 text-emerald-700" />
              <span>লগইন / যুক্ত হোন</span>
            </button>
          )}

          {/* Quick Add Dropdown (Worker vs Shop) */}
          <div className="relative">
            <button
              onClick={() => setJoinDropdownOpen(!joinDropdownOpen)}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 active:scale-95 transition-all shadow-xs whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>{currentUser ? 'প্রোফাইল আপডেট' : 'যুক্ত হোন'}</span>
            </button>

            {joinDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onClick={() => setJoinDropdownOpen(false)}
              >
                {currentUser ? (
                  <>
                    <button
                      onClick={onOpenProfile}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-emerald-50 flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-emerald-700" />
                      <span>আমার প্রোফাইল ও তথ্য আপডেট</span>
                    </button>
                    <button
                      onClick={onOpenAddShop}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-emerald-50 flex items-center gap-2 border-t border-slate-100"
                    >
                      <Store className="w-4 h-4 text-emerald-700" />
                      <span>দোকান বা ব্যবসা প্রতিষ্ঠান যুক্ত করুন</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={onOpenAuth}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-emerald-50 flex items-center gap-2"
                    >
                      <Users className="w-4 h-4 text-emerald-700" />
                      <span>কর্মী হিসেবে যোগ দিন (গুগল দিয়ে)</span>
                    </button>
                    <button
                      onClick={onOpenAddShop}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-emerald-50 flex items-center gap-2 border-t border-slate-100"
                    >
                      <Store className="w-4 h-4 text-emerald-700" />
                      <span>দোকান বা ব্যবসা প্রতিষ্ঠান যুক্ত করুন</span>
                    </button>
                  </>
                )}
                <div className="border-t border-slate-100 mt-1 pt-1">
                  <button
                    onClick={onOpenAdmin}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>সুপারএডমিন কন্ট্রোল প্যানেল</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            title="মেনু"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-2 shadow-lg animate-in slide-in-from-top-1">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button
              onClick={() => {
                setActiveTab('all');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg flex items-center gap-2 text-left ${
                activeTab === 'all' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-slate-50 text-slate-700'
              }`}
            >
              <Columns className="w-4 h-4 text-emerald-600" />
              <span>দোকান ও কারিগর</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('shops');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg flex items-center gap-2 text-left ${
                activeTab === 'shops' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-slate-50 text-slate-700'
              }`}
            >
              <Store className="w-4 h-4 text-emerald-600" />
              <span>দোকান ও ব্যবসা</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('unions');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg flex items-center gap-2 text-left ${
                activeTab === 'unions' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-slate-50 text-slate-700'
              }`}
            >
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>ইউনিয়নসমূহ</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('categories');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg flex items-center gap-2 text-left ${
                activeTab === 'categories' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-slate-50 text-slate-700'
              }`}
            >
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <span>পেশাসমূহ</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('bookmarks');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg flex items-center gap-2 text-left ${
                activeTab === 'bookmarks' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-slate-50 text-slate-700'
              }`}
            >
              <Bookmark className="w-4 h-4 text-amber-500" />
              <span>বুকমার্ক ({bookmarkCount})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('requests');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg flex items-center gap-2 text-left ${
                activeTab === 'requests' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-slate-50 text-slate-700'
              }`}
            >
              <ClipboardList className="w-4 h-4 text-emerald-600" />
              <span>কাজের আবেদন ({requestCount})</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <button
              onClick={() => {
                onOpenEmergency();
                setMobileMenuOpen(false);
              }}
              className="text-red-600 font-semibold flex items-center gap-1.5 py-1"
            >
              <PhoneCall className="w-4 h-4" />
              <span>জরুরি সেবা</span>
            </button>

            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="text-red-600 font-semibold flex items-center gap-1 py-1"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>এডমিন প্যানেল</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
