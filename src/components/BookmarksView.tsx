import React, { useState } from 'react';
import { Bookmark, ArrowLeft, Users, Store } from 'lucide-react';
import { ShopProfile, WorkerProfile } from '../types';
import { WorkerCard } from './WorkerCard';
import { ShopCard } from './ShopCard';

interface BookmarksViewProps {
  workers: WorkerProfile[];
  bookmarkedIds: string[];
  shops?: ShopProfile[];
  bookmarkedShopIds?: string[];
  onToggleBookmark: (id: string) => void;
  onToggleShopBookmark?: (id: string) => void;
  onViewDetails: (worker: WorkerProfile) => void;
  onViewShopDetails?: (shop: ShopProfile) => void;
  onHireNow: (worker: WorkerProfile) => void;
  onBackToAll: () => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  workers,
  bookmarkedIds,
  shops = [],
  bookmarkedShopIds = [],
  onToggleBookmark,
  onToggleShopBookmark,
  onViewDetails,
  onViewShopDetails,
  onHireNow,
  onBackToAll
}) => {
  const [bookmarkTab, setBookmarkTab] = useState<'workers' | 'shops'>('workers');

  const savedWorkers = workers.filter((w) => bookmarkedIds.includes(w.id));
  const savedShops = shops.filter((s) => bookmarkedShopIds.includes(s.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 gap-4">
        <div>
          <button
            onClick={onBackToAll}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-emerald-700 hover:text-emerald-800 font-semibold mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>মূল পাতায় ফিরে যান</span>
          </button>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-amber-500 fill-amber-500" />
            <span>সংরক্ষিত তালিকা</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            জরুরি প্রয়োজনে দ্রুত যোগাযোগের জন্য আপনার পছন্দের কারিগর ও দোকানসমূহ সংরক্ষণ করে রাখা হয়েছে
          </p>
        </div>

        {/* Tab switch between saved workers and saved shops */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl shrink-0">
          <button
            onClick={() => setBookmarkTab('workers')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              bookmarkTab === 'workers'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            <span>কর্মী ({savedWorkers.length})</span>
          </button>

          <button
            onClick={() => setBookmarkTab('shops')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              bookmarkTab === 'shops'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Store className="w-3.5 h-3.5 text-emerald-600" />
            <span>দোকান ও ব্যবসা ({savedShops.length})</span>
          </button>
        </div>
      </div>

      {/* Workers Tab Content */}
      {bookmarkTab === 'workers' && (
        <>
          {savedWorkers.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Bookmark className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                এখনও কোনো কর্মী বুকমার্ক করেননি
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                যেকোনো কর্মীর কার্ডের বুকমার্ক আইকনে ক্লিক করে তাকে এখানে সংরক্ষণ করে রাখতে পারেন।
              </p>
              <button
                onClick={onBackToAll}
                className="px-5 py-2 bg-slate-900 text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-colors"
              >
                কর্মী তালিকা দেখুন
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedWorkers.map((worker) => (
                <WorkerCard
                  key={worker.id}
                  worker={worker}
                  isBookmarked={true}
                  onToggleBookmark={onToggleBookmark}
                  onViewDetails={onViewDetails}
                  onHireNow={onHireNow}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Shops Tab Content */}
      {bookmarkTab === 'shops' && (
        <>
          {savedShops.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Store className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                এখনও কোনো দোকান বুকমার্ক করেননি
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                শাহরাস্তির দোকান ও ব্যবসা প্রতিষ্ঠান ট্যাবে গিয়ে যেকোনো দোকানের বুকমার্ক আইকনে ক্লিক করে সংরক্ষণ করতে পারেন।
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedShops.map((shop) => (
                <ShopCard
                  key={shop.id}
                  shop={shop}
                  isBookmarked={true}
                  onToggleBookmark={onToggleShopBookmark || (() => {})}
                  onViewDetails={onViewShopDetails || (() => {})}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
