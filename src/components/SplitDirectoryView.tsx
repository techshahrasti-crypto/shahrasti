import React, { useState, useMemo } from 'react';
import {
  Store,
  Users,
  Wrench,
  Search,
  MapPin,
  Sparkles,
  Truck,
  CheckCircle2,
  RotateCcw,
  AlertCircle,
  Filter,
  Plus,
  Briefcase,
  ChevronDown,
  Layers,
  Columns,
  ShieldCheck,
  Check,
  Star
} from 'lucide-react';
import { WorkerProfile, ShopProfile } from '../types';
import { SHAHRASHTI_AREAS } from '../data/shahrastiData';
import { PROFESSION_CATEGORIES, CATEGORY_GROUPS } from '../data/categories';
import { SHOP_CATEGORIES } from '../data/shopCategories';
import { WorkerCard } from './WorkerCard';
import { ShopCard } from './ShopCard';

interface SplitDirectoryViewProps {
  workers: WorkerProfile[];
  shops: ShopProfile[];
  bookmarkedIds: string[];
  bookmarkedShopIds: string[];
  onToggleBookmark: (workerId: string) => void;
  onToggleShopBookmark: (shopId: string) => void;
  onViewWorkerDetails: (worker: WorkerProfile) => void;
  onViewShopDetails: (shop: ShopProfile) => void;
  onHireWorker: (worker: WorkerProfile) => void;
  onOpenAddWorker: () => void;
  onOpenAddShop: () => void;
  selectedUnion: string;
  setSelectedUnion: (union: string) => void;
  onSelectCategory?: (category: string) => void;
}

export const SplitDirectoryView: React.FC<SplitDirectoryViewProps> = ({
  workers,
  shops,
  bookmarkedIds,
  bookmarkedShopIds,
  onToggleBookmark,
  onToggleShopBookmark,
  onViewWorkerDetails,
  onViewShopDetails,
  onHireWorker,
  onOpenAddWorker,
  onOpenAddShop,
  selectedUnion,
  setSelectedUnion,
  onSelectCategory
}) => {
  // View mode switcher: 'split' (side-by-side dual), 'shops' (full width shops), 'workers' (full width workers)
  const [viewMode, setViewMode] = useState<'split' | 'shops' | 'workers'>('split');
  // Mobile specific pane toggle: 'both' | 'shops' | 'workers'
  const [mobileActivePane, setMobileActivePane] = useState<'both' | 'shops' | 'workers'>('both');

  // ---------- Left Pane (Shops & Businesses) States ----------
  const [shopSearch, setShopSearch] = useState('');
  const [shopCategory, setShopCategory] = useState('all');
  const [shopMarket, setShopMarket] = useState('all');
  const [shopDeliveryOnly, setShopDeliveryOnly] = useState(false);
  const [shopOffersOnly, setShopOffersOnly] = useState(false);
  const [shopVerifiedOnly, setShopVerifiedOnly] = useState(false);
  const [shopSortBy, setShopSortBy] = useState<'rating' | 'reviews' | 'established'>('rating');

  // ---------- Right Pane (Workers & Artisans) States ----------
  const [workerSearch, setWorkerSearch] = useState('');
  const [workerCategory, setWorkerCategory] = useState('all');
  const [workerAvailableOnly, setWorkerAvailableOnly] = useState(false);
  const [workerVerifiedOnly, setWorkerVerifiedOnly] = useState(false);
  const [workerSortBy, setWorkerSortBy] = useState<'rating' | 'experience' | 'jobs'>('rating');

  // All famous markets in Shahrasti
  const allMarkets = useMemo(() => {
    const set = new Set<string>();
    SHAHRASHTI_AREAS.forEach((area) => {
      area.famousMarkets.forEach((m) => set.add(m));
    });
    return Array.from(set);
  }, []);

  // Worker counts per category for the dropdown
  const workerCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    workers.forEach((w) => {
      counts[w.category] = (counts[w.category] || 0) + 1;
    });
    return counts;
  }, [workers]);

  // ---------- Filtered Shops (Left Side) ----------
  const filteredShops = useMemo(() => {
    return shops
      .filter((shop) => {
        // Shared Union filter
        if (selectedUnion !== 'all' && shop.unionOrArea !== selectedUnion) {
          return false;
        }
        // Market filter
        if (shopMarket !== 'all' && shop.marketName !== shopMarket) {
          return false;
        }
        // Category filter
        if (shopCategory !== 'all' && shop.category !== shopCategory) {
          return false;
        }
        // Delivery
        if (shopDeliveryOnly && !shop.homeDelivery) {
          return false;
        }
        // Offers
        if (shopOffersOnly && !shop.discountOffer) {
          return false;
        }
        // Verified
        if (shopVerifiedOnly && !shop.isVerified) {
          return false;
        }
        // Search
        if (shopSearch.trim()) {
          const q = shopSearch.toLowerCase().trim();
          const matchesName = shop.name.toLowerCase().includes(q);
          const matchesTagline = shop.tagline.toLowerCase().includes(q);
          const matchesOwner = shop.ownerName.toLowerCase().includes(q);
          const matchesMarket = shop.marketName.toLowerCase().includes(q);
          const matchesUnion = shop.unionOrArea.toLowerCase().includes(q);
          const matchesAddress = shop.fullAddress.toLowerCase().includes(q);
          const matchesOffer = (shop.discountOffer || '').toLowerCase().includes(q);
          const matchesPhone = shop.phone.replace(/[^0-9]/g, '').includes(q.replace(/[^0-9]/g, ''));
          const matchesProducts = shop.featuredProducts.some(
            (p) => p.name.toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q)
          );

          if (
            !matchesName &&
            !matchesTagline &&
            !matchesOwner &&
            !matchesMarket &&
            !matchesUnion &&
            !matchesAddress &&
            !matchesOffer &&
            !matchesPhone &&
            !matchesProducts
          ) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (shopSortBy === 'rating') {
          return b.rating - a.rating || b.reviewCount - a.reviewCount;
        }
        if (shopSortBy === 'reviews') {
          return b.reviewCount - a.reviewCount;
        }
        if (shopSortBy === 'established') {
          return (a.yearEstablished || 2026) - (b.yearEstablished || 2026);
        }
        return 0;
      });
  }, [
    shops,
    selectedUnion,
    shopMarket,
    shopCategory,
    shopDeliveryOnly,
    shopOffersOnly,
    shopVerifiedOnly,
    shopSearch,
    shopSortBy
  ]);

  // ---------- Filtered Workers (Right Side) ----------
  const filteredWorkers = useMemo(() => {
    return workers
      .filter((w) => {
        // Shared Union filter
        if (selectedUnion !== 'all' && w.unionOrArea !== selectedUnion) {
          return false;
        }
        // Category filter
        if (workerCategory !== 'all' && w.category !== workerCategory) {
          return false;
        }
        // Available only
        if (workerAvailableOnly && w.availability !== 'available') {
          return false;
        }
        // Verified only
        if (workerVerifiedOnly && !w.isVerified) {
          return false;
        }
        // Search
        if (workerSearch.trim()) {
          const q = workerSearch.toLowerCase().trim();
          const matchesName = w.name.toLowerCase().includes(q);
          const matchesProf = w.profession.toLowerCase().includes(q);
          const matchesBio = w.bio.toLowerCase().includes(q);
          const matchesUnion = w.unionOrArea.toLowerCase().includes(q);
          const matchesVillage = (w.village || '').toLowerCase().includes(q);
          const matchesPhone = w.phone.replace(/[^0-9]/g, '').includes(q.replace(/[^0-9]/g, ''));
          const matchesSpecialties = w.specialties.some((s) => s.toLowerCase().includes(q));

          if (
            !matchesName &&
            !matchesProf &&
            !matchesBio &&
            !matchesUnion &&
            !matchesVillage &&
            !matchesPhone &&
            !matchesSpecialties
          ) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (workerSortBy === 'rating') {
          return b.rating - a.rating || b.reviewCount - a.reviewCount;
        }
        if (workerSortBy === 'experience') {
          return b.experienceYears - a.experienceYears;
        }
        if (workerSortBy === 'jobs') {
          return b.completedJobs - a.completedJobs;
        }
        return 0;
      });
  }, [
    workers,
    selectedUnion,
    workerCategory,
    workerAvailableOnly,
    workerVerifiedOnly,
    workerSearch,
    workerSortBy
  ]);

  // Reset helpers
  const handleResetShopFilters = () => {
    setShopSearch('');
    setShopCategory('all');
    setShopMarket('all');
    setShopDeliveryOnly(false);
    setShopOffersOnly(false);
    setShopVerifiedOnly(false);
    setShopSortBy('rating');
  };

  const handleResetWorkerFilters = () => {
    setWorkerSearch('');
    setWorkerCategory('all');
    setWorkerAvailableOnly(false);
    setWorkerVerifiedOnly(false);
    setWorkerSortBy('rating');
  };

  return (
    <div className="w-full">
      {/* =========================================================================
          TOP UNIFIED CONTROL BAR: Shared Area/Union Selector & View Mode Switcher
         ========================================================================= */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* 1. Global Shahrasti Area Selector */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200 shrink-0">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>উপজেলা এলাকা:</span>
              </span>

              <select
                value={selectedUnion}
                onChange={(e) => setSelectedUnion(e.target.value)}
                className="text-xs sm:text-sm py-1.5 px-3 bg-emerald-50/70 border border-emerald-300 rounded-lg text-emerald-950 font-bold focus:ring-2 focus:ring-emerald-500 cursor-pointer shadow-2xs"
              >
                <option value="all">📍 সমগ্র শাহরাস্তি (১০টি ইউনিয়ন ও ১টি পৌরসভা)</option>
                {SHAHRASHTI_AREAS.map((a) => (
                  <option key={a.id} value={a.name}>
                    {a.name}
                  </option>
                ))}
              </select>

              {selectedUnion !== 'all' && (
                <button
                  onClick={() => setSelectedUnion('all')}
                  className="text-xs text-slate-500 hover:text-red-600 font-medium underline transition-colors"
                >
                  সমগ্র উপজেলা দেখুন
                </button>
              )}
            </div>

            {/* 2. Desktop View Switcher & Mobile Quick Switch */}
            <div className="flex items-center justify-between md:justify-end gap-2">
              {/* Mobile pane selector (hidden on lg) */}
              <div className="flex lg:hidden items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-medium w-full sm:w-auto justify-between">
                <button
                  onClick={() => setMobileActivePane('shops')}
                  className={`flex-1 sm:flex-initial px-2.5 py-1.5 rounded-md transition-all flex items-center justify-center gap-1 ${
                    mobileActivePane === 'shops'
                      ? 'bg-amber-600 text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>দোকান ({filteredShops.length})</span>
                </button>
                <button
                  onClick={() => setMobileActivePane('workers')}
                  className={`flex-1 sm:flex-initial px-2.5 py-1.5 rounded-md transition-all flex items-center justify-center gap-1 ${
                    mobileActivePane === 'workers'
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span>কারিগর ({filteredWorkers.length})</span>
                </button>
                <button
                  onClick={() => setMobileActivePane('both')}
                  className={`flex-1 sm:flex-initial px-2.5 py-1.5 rounded-md transition-all flex items-center justify-center gap-1 ${
                    mobileActivePane === 'both'
                      ? 'bg-emerald-700 text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Columns className="w-3.5 h-3.5" />
                  <span>উভয় পাশে</span>
                </button>
              </div>

              {/* Desktop layout mode toggle */}
              <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
                <button
                  onClick={() => setViewMode('split')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    viewMode === 'split'
                      ? 'bg-white text-slate-900 shadow-xs font-bold border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="দুই পাশে পাশাপাশি দোকান ও কারিগর দেখুন"
                >
                  <Columns className="w-3.5 h-3.5 text-emerald-600" />
                  <span>দ্বৈত স্প্লিট ভিউ (পাশাপাশি)</span>
                </button>

                <button
                  onClick={() => setViewMode('shops')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    viewMode === 'shops'
                      ? 'bg-amber-600 text-white shadow-xs font-bold'
                      : 'text-slate-600 hover:text-amber-900'
                  }`}
                  title="পুরো স্ক্রিন জুড়ে শুধু দোকান ও ব্যবসা প্রতিষ্ঠান"
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>শুধু দোকান ডিরেক্টরি</span>
                </button>

                <button
                  onClick={() => setViewMode('workers')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    viewMode === 'workers'
                      ? 'bg-blue-600 text-white shadow-xs font-bold'
                      : 'text-slate-600 hover:text-blue-900'
                  }`}
                  title="পুরো স্ক্রিন জুড়ে শুধু দক্ষ কারিগর ও পেশাজীবী"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span>শুধু কারিগর ডিরেক্টরি</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          THE DIVIDED PAGE: 2 Distinct Halves with 2 Different Background Colors
         ========================================================================= */}
      <div
        className={`w-full grid transition-all ${
          viewMode === 'split'
            ? 'grid-cols-1 lg:grid-cols-2 divide-y-4 lg:divide-y-0 lg:divide-x-4 divide-slate-300'
            : 'grid-cols-1'
        }`}
      >
        {/* =======================================================================
            SIDE 1 (LEFT PANE): দোকান ও ব্যবসা প্রতিষ্ঠান ডিরেক্টরি
            Distinct Warm Amber/Cream Background: #fef9f0 border-amber-200
           ======================================================================= */}
        {(viewMode === 'split' || viewMode === 'shops') &&
          (mobileActivePane === 'both' || mobileActivePane === 'shops') && (
            <section
              aria-label="দোকান ও ব্যবসা প্রতিষ্ঠান ডিরেক্টরী"
              className="bg-[#fef9f0] border-b lg:border-b-0 border-amber-200/80 p-4 sm:p-6 lg:p-7 flex flex-col transition-colors min-h-screen"
            >
              <div className="max-w-3xl mx-auto w-full space-y-5">
                {/* 1. Header Box for Shops Side */}
                <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-orange-800 text-white p-4 sm:p-5 rounded-2xl shadow-sm space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-amber-500/30 border border-amber-400/40 rounded-full text-amber-200 text-xs font-bold">
                      <Store className="w-3.5 h-3.5" />
                      <span>বাণিজ্যিক ডিরেক্টরি</span>
                    </div>

                    <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-0.5 rounded-full font-mono">
                      {filteredShops.length}টি প্রতিষ্ঠান
                    </span>
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                      <span>দোকান ও ব্যবসা প্রতিষ্ঠান ডিরেক্টরি</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-amber-100 mt-1 leading-relaxed">
                      শাহরাস্তির সকল বাজারের দোকান, পণ্য তালিকা, পাইকারি/খুচরা বাজার দর ও সরাসরি যোগাযোগ
                    </p>
                  </div>

                  {/* Add Shop CTA Button */}
                  <div className="pt-1 flex items-center justify-between">
                    <button
                      onClick={onOpenAddShop}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white text-amber-900 hover:bg-amber-50 rounded-xl text-xs sm:text-sm font-bold shadow-xs active:scale-98 transition-all"
                    >
                      <Plus className="w-4 h-4 text-amber-700" />
                      <span>+ নতুন দোকান যুক্ত করুন</span>
                    </button>
                    <span className="text-[11px] text-amber-200 font-medium">
                      বিনামূল্যে আপনার ব্যবসা যুক্ত করুন
                    </span>
                  </div>
                </div>

                {/* 2. Left Pane Filter & Search Controls */}
                <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-amber-200/90 shadow-2xs space-y-3">
                  {/* Shop Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-600" />
                    <input
                      type="text"
                      value={shopSearch}
                      onChange={(e) => setShopSearch(e.target.value)}
                      placeholder="দোকানের নাম, পণ্য (রড, সিমেন্ট, ওষুধ, চাল) বা বাজার খুঁজুন..."
                      className="w-full pl-9 pr-16 py-2.5 bg-amber-50/40 border border-amber-300 rounded-xl text-xs sm:text-sm placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:bg-white text-slate-900"
                    />
                    {shopSearch && (
                      <button
                        onClick={() => setShopSearch('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-amber-800 bg-amber-100 hover:bg-amber-200 px-2 py-0.5 rounded"
                      >
                        মুছুন
                      </button>
                    )}
                  </div>

                  {/* Shop Dropdown Filters: Market & Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {/* Market Selector */}
                    <div>
                      <label className="block text-[11px] font-bold text-amber-900 mb-1">
                        বাজার নির্বাচন করুন:
                      </label>
                      <select
                        value={shopMarket}
                        onChange={(e) => setShopMarket(e.target.value)}
                        className="w-full text-xs py-2 px-2.5 bg-amber-50/50 border border-amber-300 rounded-lg text-slate-900 font-medium focus:ring-1 focus:ring-amber-500"
                      >
                        <option value="all">শাহরাস্তির সকল বাজার</option>
                        {allMarkets.map((mkt) => (
                          <option key={mkt} value={mkt}>
                            {mkt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Shop Category */}
                    <div>
                      <label className="block text-[11px] font-bold text-amber-900 mb-1">
                        ব্যবসার ধরন:
                      </label>
                      <select
                        value={shopCategory}
                        onChange={(e) => setShopCategory(e.target.value)}
                        className="w-full text-xs py-2 px-2.5 bg-amber-50/50 border border-amber-300 rounded-lg text-slate-900 font-medium focus:ring-1 focus:ring-amber-500"
                      >
                        {SHOP_CATEGORIES.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Shop Filter Checkbox Toggles & Sort */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-amber-100 text-xs">
                    <div className="flex flex-wrap items-center gap-3">
                      <label className="inline-flex items-center gap-1 cursor-pointer text-slate-700 hover:text-amber-900 select-none">
                        <input
                          type="checkbox"
                          checked={shopDeliveryOnly}
                          onChange={(e) => setShopDeliveryOnly(e.target.checked)}
                          className="w-3.5 h-3.5 text-amber-600 rounded"
                        />
                        <span className="flex items-center gap-0.5">
                          <Truck className="w-3 h-3 text-emerald-600" />
                          <span>হোম ডেলিভারি</span>
                        </span>
                      </label>

                      <label className="inline-flex items-center gap-1 cursor-pointer text-slate-700 hover:text-amber-900 select-none">
                        <input
                          type="checkbox"
                          checked={shopOffersOnly}
                          onChange={(e) => setShopOffersOnly(e.target.checked)}
                          className="w-3.5 h-3.5 text-amber-600 rounded"
                        />
                        <span className="flex items-center gap-0.5 text-amber-900 font-semibold">
                          <Sparkles className="w-3 h-3 text-amber-600" />
                          <span>বিশেষ অফার</span>
                        </span>
                      </label>

                      <label className="inline-flex items-center gap-1 cursor-pointer text-slate-700 hover:text-amber-900 select-none">
                        <input
                          type="checkbox"
                          checked={shopVerifiedOnly}
                          onChange={(e) => setShopVerifiedOnly(e.target.checked)}
                          className="w-3.5 h-3.5 text-blue-600 rounded"
                        />
                        <span className="flex items-center gap-0.5 text-blue-900 font-semibold">
                          <CheckCircle2 className="w-3 h-3 text-blue-600" />
                          <span>যাচাইকৃত</span>
                        </span>
                      </label>
                    </div>

                    <div className="flex items-center gap-2 ml-auto">
                      <select
                        value={shopSortBy}
                        onChange={(e) => setShopSortBy(e.target.value as any)}
                        className="text-[11px] py-1 px-2 bg-white border border-amber-300 rounded text-slate-700"
                      >
                        <option value="rating">সর্বোচ্চ রেটিং</option>
                        <option value="reviews">সর্বাধিক রিভিউ</option>
                        <option value="established">পুরাতন প্রতিষ্ঠান</option>
                      </select>

                      {(shopSearch ||
                        shopCategory !== 'all' ||
                        shopMarket !== 'all' ||
                        shopDeliveryOnly ||
                        shopOffersOnly ||
                        shopVerifiedOnly) && (
                        <button
                          onClick={handleResetShopFilters}
                          className="text-[11px] text-red-600 hover:underline flex items-center gap-0.5"
                          title="দোকানের ফিল্টার মুছুন"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>রিসেট</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* 3. Left Pane Shop Cards Grid */}
                <div className="space-y-4">
                  {filteredShops.length === 0 ? (
                    <div className="bg-white/80 rounded-2xl border border-amber-200 p-8 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                        <Store className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-slate-800 text-sm sm:text-base">
                        কোনো দোকান বা ব্যবসা প্রতিষ্ঠান পাওয়া যায়নি
                      </h4>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        আপনার বর্তমান ফিল্টারে শাহরাস্তির কোনো দোকান পাওয়া যায়নি। ফিল্টার রিসেট করতে পারেন অথবা আপনার দোকানটি বিনামূল্যে যুক্ত করতে পারেন।
                      </p>
                      <div className="flex items-center justify-center gap-2 pt-2">
                        <button
                          onClick={handleResetShopFilters}
                          className="px-3 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-semibold"
                        >
                          ফিল্টার মুছুন
                        </button>
                        <button
                          onClick={onOpenAddShop}
                          className="px-3 py-1.5 bg-amber-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>দোকান যুক্ত করুন</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`grid gap-4 ${
                        viewMode === 'shops' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2'
                      }`}
                    >
                      {filteredShops.map((shop) => (
                        <ShopCard
                          key={shop.id}
                          shop={shop}
                          isBookmarked={bookmarkedShopIds.includes(shop.id)}
                          onToggleBookmark={onToggleShopBookmark}
                          onViewDetails={onViewShopDetails}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

        {/* =======================================================================
            SIDE 2 (RIGHT PANE): কারিগর ও পেশাজীবী ডিরেক্টরি
            Distinct Cool Sky Blue / Slate Background: #f0f7ff border-sky-200
           ======================================================================= */}
        {(viewMode === 'split' || viewMode === 'workers') &&
          (mobileActivePane === 'both' || mobileActivePane === 'workers') && (
            <section
              aria-label="কারিগর ও পেশাজীবী ডিরেক্টরি"
              className="bg-[#f0f7ff] border-t lg:border-t-0 border-sky-200/80 p-4 sm:p-6 lg:p-7 flex flex-col transition-colors min-h-screen"
            >
              <div className="max-w-3xl mx-auto w-full space-y-5">
                {/* 1. Header Box for Workers Side */}
                <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-950 text-white p-4 sm:p-5 rounded-2xl shadow-sm space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-blue-500/30 border border-blue-400/40 rounded-full text-blue-200 text-xs font-bold">
                      <Wrench className="w-3.5 h-3.5" />
                      <span>পেশাজীবী ডিরেক্টরি</span>
                    </div>

                    <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-0.5 rounded-full font-mono">
                      {filteredWorkers.length} জন কারিগর
                    </span>
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                      <span>দক্ষ কারিগর ও পেশাজীবী ডিরেক্টরি</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-blue-100 mt-1 leading-relaxed">
                      শাহরাস্তির প্রত্যন্ত অঞ্চলের প্রশিক্ষিত মিস্ত্রি, টেকনিশিয়ান, অভিজ্ঞতা, রেটিং ও সরাসরি যোগাযোগ
                    </p>
                  </div>

                  {/* Add Worker CTA Button */}
                  <div className="pt-1 flex items-center justify-between">
                    <button
                      onClick={onOpenAddWorker}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white text-blue-950 hover:bg-blue-50 rounded-xl text-xs sm:text-sm font-bold shadow-xs active:scale-98 transition-all"
                    >
                      <Plus className="w-4 h-4 text-blue-700" />
                      <span>+ কারিগর প্রোফাইল যুক্ত করুন</span>
                    </button>
                    <span className="text-[11px] text-blue-200 font-medium">
                      কাজের সুযোগ বৃদ্ধি করতে নিবন্ধন করুন
                    </span>
                  </div>
                </div>

                {/* 2. Right Pane Filter & Search Controls */}
                <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-sky-200/90 shadow-2xs space-y-3">
                  {/* Worker Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600" />
                    <input
                      type="text"
                      value={workerSearch}
                      onChange={(e) => setWorkerSearch(e.target.value)}
                      placeholder="কারিগর বা মিস্ত্রির নাম, পেশা (যেমন: ওয়্যারিং, এসি, খাট) বা গ্রাম খুঁজুন..."
                      className="w-full pl-9 pr-16 py-2.5 bg-sky-50/40 border border-sky-300 rounded-xl text-xs sm:text-sm placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
                    />
                    {workerSearch && (
                      <button
                        onClick={() => setWorkerSearch('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-blue-800 bg-blue-100 hover:bg-blue-200 px-2 py-0.5 rounded"
                      >
                        মুছুন
                      </button>
                    )}
                  </div>

                  {/* Worker Profession Dropdown with Optgroups */}
                  <div>
                    <label className="block text-[11px] font-bold text-sky-950 mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                        <span>পেশা নির্বাচন করুন (ড্রপডাউন মেনু):</span>
                      </span>
                      {workerCategory !== 'all' && (
                        <button
                          onClick={() => setWorkerCategory('all')}
                          className="text-[10px] text-blue-700 hover:underline"
                        >
                          সকল পেশা
                        </button>
                      )}
                    </label>
                    <select
                      value={workerCategory}
                      onChange={(e) => {
                        setWorkerCategory(e.target.value);
                        if (onSelectCategory) onSelectCategory(e.target.value);
                      }}
                      className="w-full text-xs sm:text-sm py-2 px-3 bg-sky-50/50 border-2 border-blue-400/80 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-2xs"
                    >
                      <option value="all">
                        🌟 সকল পেশা ({workers.length} জন দক্ষ কারিগর)
                      </option>
                      {CATEGORY_GROUPS.map((group) => {
                        const groupCats = PROFESSION_CATEGORIES.filter(
                          (c) => c.group === group && c.id !== 'all'
                        );
                        if (groupCats.length === 0) return null;

                        return (
                          <optgroup key={group} label={`── ${group} ──`}>
                            {groupCats.map((cat) => {
                              const count = workerCounts[cat.id] || 0;
                              return (
                                <option key={cat.id} value={cat.id}>
                                  {cat.name} {count > 0 ? `(${count} জন)` : ''}
                                </option>
                              );
                            })}
                          </optgroup>
                        );
                      })}
                    </select>
                  </div>

                  {/* Worker Filter Checkbox Toggles & Sort */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-sky-100 text-xs">
                    <div className="flex flex-wrap items-center gap-3">
                      <label className="inline-flex items-center gap-1 cursor-pointer text-slate-700 hover:text-blue-900 select-none">
                        <input
                          type="checkbox"
                          checked={workerAvailableOnly}
                          onChange={(e) => setWorkerAvailableOnly(e.target.checked)}
                          className="w-3.5 h-3.5 text-emerald-600 rounded"
                        />
                        <span className="flex items-center gap-1 font-medium text-emerald-800">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                          <span>তাৎক্ষণিক এভেইলেবল</span>
                        </span>
                      </label>

                      <label className="inline-flex items-center gap-1 cursor-pointer text-slate-700 hover:text-blue-900 select-none">
                        <input
                          type="checkbox"
                          checked={workerVerifiedOnly}
                          onChange={(e) => setWorkerVerifiedOnly(e.target.checked)}
                          className="w-3.5 h-3.5 text-blue-600 rounded"
                        />
                        <span className="flex items-center gap-1 font-semibold text-blue-900">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                          <span>যাচাইকৃত কারিগর</span>
                        </span>
                      </label>
                    </div>

                    <div className="flex items-center gap-2 ml-auto">
                      <select
                        value={workerSortBy}
                        onChange={(e) => setWorkerSortBy(e.target.value as any)}
                        className="text-[11px] py-1 px-2 bg-white border border-sky-300 rounded text-slate-700"
                      >
                        <option value="rating">সর্বোচ্চ রেটিং</option>
                        <option value="experience">বেশি অভিজ্ঞতা</option>
                        <option value="jobs">সম্পন্ন কাজ</option>
                      </select>

                      {(workerSearch ||
                        workerCategory !== 'all' ||
                        workerAvailableOnly ||
                        workerVerifiedOnly) && (
                        <button
                          onClick={handleResetWorkerFilters}
                          className="text-[11px] text-red-600 hover:underline flex items-center gap-0.5"
                          title="কারিগরের ফিল্টার মুছুন"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>রিসেট</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* 3. Right Pane Worker Cards Grid */}
                <div className="space-y-4">
                  {filteredWorkers.length === 0 ? (
                    <div className="bg-white/80 rounded-2xl border border-sky-200 p-8 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center mx-auto">
                        <Wrench className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-slate-800 text-sm sm:text-base">
                        কোনো কারিগর বা মিস্ত্রি পাওয়া যায়নি
                      </h4>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        আপনার বর্তমান ফিল্টারে শাহরাস্তির কোনো কারিগর পাওয়া যায়নি। ফিল্টার পরিবর্তন করুন অথবা আপনার পেশার তথ্য যুক্ত করুন।
                      </p>
                      <div className="flex items-center justify-center gap-2 pt-2">
                        <button
                          onClick={handleResetWorkerFilters}
                          className="px-3 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-semibold"
                        >
                          ফিল্টার মুছুন
                        </button>
                        <button
                          onClick={onOpenAddWorker}
                          className="px-3 py-1.5 bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>প্রোফাইল যুক্ত করুন</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`grid gap-4 ${
                        viewMode === 'workers' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2'
                      }`}
                    >
                      {filteredWorkers.map((worker) => (
                        <WorkerCard
                          key={worker.id}
                          worker={worker}
                          isBookmarked={bookmarkedIds.includes(worker.id)}
                          onToggleBookmark={onToggleBookmark}
                          onViewDetails={onViewWorkerDetails}
                          onHireNow={onHireWorker}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}
      </div>
    </div>
  );
};
