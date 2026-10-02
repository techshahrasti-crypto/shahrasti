import React, { useState, useMemo } from 'react';
import {
  Store,
  Search,
  MapPin,
  Sparkles,
  Truck,
  CheckCircle2,
  Plus,
  RotateCcw,
  AlertCircle,
  Filter,
  Building,
  Star,
  ChevronRight
} from 'lucide-react';
import { ShopProfile } from '../types';
import { SHOP_CATEGORIES } from '../data/shopCategories';
import { SHAHRASHTI_AREAS } from '../data/shahrastiData';
import { ShopCard } from './ShopCard';

interface ShopsViewProps {
  shops: ShopProfile[];
  bookmarkedShopIds: string[];
  onToggleBookmark: (shopId: string) => void;
  onViewShopDetails: (shop: ShopProfile) => void;
  onOpenAddShop: () => void;
  selectedUnionFilter?: string;
  onSelectUnion?: (union: string) => void;
}

export const ShopsView: React.FC<ShopsViewProps> = ({
  shops,
  bookmarkedShopIds,
  onToggleBookmark,
  onViewShopDetails,
  onOpenAddShop,
  selectedUnionFilter = 'all',
  onSelectUnion
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnion, setSelectedUnion] = useState<string>(selectedUnionFilter);
  const [selectedMarket, setSelectedMarket] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [deliveryOnly, setDeliveryOnly] = useState(false);
  const [offersOnly, setOffersOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'established'>('rating');

  // Sync external union filter if changed
  React.useEffect(() => {
    if (selectedUnionFilter) {
      setSelectedUnion(selectedUnionFilter);
    }
  }, [selectedUnionFilter]);

  // Extract all famous markets from Shahrasti areas
  const allMarkets = useMemo(() => {
    const set = new Set<string>();
    SHAHRASHTI_AREAS.forEach((area) => {
      area.famousMarkets.forEach((m) => set.add(m));
    });
    return Array.from(set);
  }, []);

  // Filtered and sorted shops
  const filteredShops = useMemo(() => {
    return shops
      .filter((shop) => {
        // Union filter
        if (selectedUnion !== 'all' && shop.unionOrArea !== selectedUnion) {
          return false;
        }

        // Market filter
        if (selectedMarket !== 'all' && shop.marketName !== selectedMarket) {
          return false;
        }

        // Category filter
        if (selectedCategory !== 'all' && shop.category !== selectedCategory) {
          return false;
        }

        // Delivery only
        if (deliveryOnly && !shop.homeDelivery) {
          return false;
        }

        // Offers only
        if (offersOnly && !shop.discountOffer) {
          return false;
        }

        // Verified only
        if (verifiedOnly && !shop.isVerified) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesName = shop.name.toLowerCase().includes(q);
          const matchesTagline = shop.tagline.toLowerCase().includes(q);
          const matchesOwner = shop.ownerName.toLowerCase().includes(q);
          const matchesMarket = shop.marketName.toLowerCase().includes(q);
          const matchesUnion = shop.unionOrArea.toLowerCase().includes(q);
          const matchesAddress = shop.fullAddress.toLowerCase().includes(q);
          const matchesOffer = (shop.discountOffer || '').toLowerCase().includes(q);
          const matchesPhone = shop.phone.replace(/[^0-9]/g, '').includes(q.replace(/[^0-9]/g, ''));
          const matchesProducts = shop.featuredProducts.some((p) =>
            p.name.toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q)
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
        if (sortBy === 'rating') {
          return b.rating - a.rating || b.reviewCount - a.reviewCount;
        }
        if (sortBy === 'reviews') {
          return b.reviewCount - a.reviewCount;
        }
        if (sortBy === 'established') {
          return (a.yearEstablished || 2026) - (b.yearEstablished || 2026);
        }
        return 0;
      });
  }, [
    shops,
    selectedUnion,
    selectedMarket,
    selectedCategory,
    deliveryOnly,
    offersOnly,
    verifiedOnly,
    searchQuery,
    sortBy
  ]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedUnion('all');
    setSelectedMarket('all');
    setSelectedCategory('all');
    setDeliveryOnly(false);
    setOffersOnly(false);
    setVerifiedOnly(false);
    setSortBy('rating');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Section for Shops & Businesses */}
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-emerald-300 text-xs font-semibold">
              <Store className="w-3.5 h-3.5" />
              <span>শাহরাস্তি বাণিজ্যিক ডিরেক্টরি</span>
              <span aria-hidden="true">·</span>
              <span>ব্যবসার প্রসার ও গ্রাহক সংযোগ</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              শাহরাস্তির সকল দোকান ও ব্যবসা প্রতিষ্ঠান
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              ঠাকুরবাজার, চিতোষী, ওয়ারুক, কালিয়ারচোঁ কিংবা শোল্লা—শাহরাস্তির যেকোনো বাজারের দোকান ও ব্যবসা প্রতিষ্ঠানের সঠিক ঠিকানা, পণ্য, চলমান অফার ও সরাসরি ফোন/হোয়াটসঅ্যাপে যোগাযোগ করুন।
            </p>

            {/* Top Action & Search Bar */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="দোকানের নাম, পণ্য (যেমন: রড, সিমেন্ট, ওষুধ, চাল) বা বাজার খুঁজুন..."
                  className="w-full pl-10 pr-20 py-3 bg-white text-slate-900 rounded-xl text-xs sm:text-sm placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 shadow-lg"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 text-xs text-slate-500 hover:text-slate-800 bg-slate-100 rounded"
                  >
                    মুছুন
                  </button>
                )}
              </div>

              {/* Add Shop CTA button */}
              <button
                onClick={onOpenAddShop}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md active:scale-98 whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>আমার দোকান / ব্যবসা যুক্ত করুন</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Business Category Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {SHOP_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Comprehensive Filter Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            {/* Union Selector */}
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <select
                value={selectedUnion}
                onChange={(e) => {
                  setSelectedUnion(e.target.value);
                  if (onSelectUnion) onSelectUnion(e.target.value);
                }}
                className="text-xs py-1.5 px-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium focus:ring-1 focus:ring-emerald-500"
              >
                <option value="all">সকল ইউনিয়ন (সমগ্র শাহরাস্তি)</option>
                {SHAHRASHTI_AREAS.map((a) => (
                  <option key={a.id} value={a.name}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Market Selector */}
            <div className="flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <select
                value={selectedMarket}
                onChange={(e) => setSelectedMarket(e.target.value)}
                className="text-xs py-1.5 px-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium focus:ring-1 focus:ring-emerald-500"
              >
                <option value="all">শাহরাস্তির সকল বাজার</option>
                {allMarkets.map((mkt) => (
                  <option key={mkt} value={mkt}>
                    {mkt}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 ml-auto">
              <span className="text-xs text-slate-500">ক্রমানুসার:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs py-1.5 px-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium focus:ring-1 focus:ring-emerald-500"
              >
                <option value="rating">সর্বোচ্চ রেটিং</option>
                <option value="reviews">সর্বাধিক রিভিউ</option>
                <option value="established">পুরাতন ও অভিজ্ঞ প্রতিষ্ঠান</option>
              </select>
            </div>
          </div>

          {/* Quick Toggles Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs text-slate-700">
            <div className="flex flex-wrap items-center gap-4">
              <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={deliveryOnly}
                  onChange={(e) => setDeliveryOnly(e.target.checked)}
                  className="w-3.5 h-3.5 text-emerald-600 rounded"
                />
                <span className="flex items-center gap-1 font-medium">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>হোম ডেলিভারি সুবিধা</span>
                </span>
              </label>

              <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={offersOnly}
                  onChange={(e) => setOffersOnly(e.target.checked)}
                  className="w-3.5 h-3.5 text-amber-600 rounded"
                />
                <span className="flex items-center gap-1 font-medium text-amber-900">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>চলমান বিশেষ ছাড় ও অফার</span>
                </span>
              </label>

              <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="w-3.5 h-3.5 text-blue-600 rounded"
                />
                <span className="flex items-center gap-1 font-medium text-blue-900">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>যাচাইকৃত প্রতিষ্ঠান</span>
                </span>
              </label>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 font-mono">
                {filteredShops.length}টি প্রতিষ্ঠান পাওয়া গেছে
              </span>

              {(selectedUnion !== 'all' ||
                selectedMarket !== 'all' ||
                selectedCategory !== 'all' ||
                deliveryOnly ||
                offersOnly ||
                verifiedOnly ||
                searchQuery) && (
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-red-600 font-medium transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>ফিল্টার মুছুন</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Shops Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredShops.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 max-w-xl mx-auto my-6">
            <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800">
              কোনো দোকান বা ব্যবসা খুঁজে পাওয়া যায়নি
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              আপনার ফিল্টারে শাহরাস্তির কোনো দোকান পাওয়া যায়নি। আপনি ফিল্টার পরিবর্তন করতে পারেন অথবা আপনার নিজের ব্যবসা প্রতিষ্ঠানটি এখানে যুক্ত করতে পারেন।
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 text-xs sm:text-sm font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                সব ফিল্টার মুছুন
              </button>
              <button
                onClick={onOpenAddShop}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>আমার দোকান যুক্ত করুন</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShops.map((shop) => (
              <ShopCard
                key={shop.id}
                shop={shop}
                isBookmarked={bookmarkedShopIds.includes(shop.id)}
                onToggleBookmark={onToggleBookmark}
                onViewDetails={onViewShopDetails}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Business Promotion Callout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-white p-6 sm:p-8 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>দোকানদার ও প্রতিষ্ঠান মালিকদের জন্য বিশেষ সুবিধা</span>
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              আপনার ব্যবসার প্রসার ঘটাতে চান?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
              'আমার শাহরাস্তি' অ্যাপে আপনার দোকান তালিকাভুক্ত করুন। গ্রাহকরা আপনার পণ্য, দোকানের সঠিক লোকেশন, নিয়মিত অফার ও সরাসরি যোগাযোগের নম্বর পেয়ে সহজেই আপনার কাছে আসবেন।
            </p>
          </div>

          <button
            onClick={onOpenAddShop}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition-all whitespace-nowrap"
          >
            <Store className="w-4 h-4" />
            <span>এখনই দোকান যুক্ত করুন</span>
          </button>
        </div>
      </div>
    </div>
  );
};
