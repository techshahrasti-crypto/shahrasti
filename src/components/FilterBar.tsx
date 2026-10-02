import React from 'react';
import { Filter, MapPin, CheckCircle, RotateCcw } from 'lucide-react';
import { SHAHRASHTI_AREAS } from '../data/shahrastiData';

interface FilterBarProps {
  selectedUnion: string;
  setSelectedUnion: (union: string) => void;
  availableOnly: boolean;
  setAvailableOnly: (avail: boolean) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (ver: boolean) => void;
  sortBy: 'rating' | 'experience' | 'jobs' | 'newest';
  setSortBy: (sort: 'rating' | 'experience' | 'jobs' | 'newest') => void;
  onReset: () => void;
  filteredCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedUnion,
  setSelectedUnion,
  availableOnly,
  setAvailableOnly,
  verifiedOnly,
  setVerifiedOnly,
  sortBy,
  setSortBy,
  onReset,
  filteredCount
}) => {
  const quickUnionShortcuts = [
    { label: 'সমগ্র শাহরাস্তি', value: 'all' },
    { label: 'পৌরসভা (ঠাকুরবাজার)', value: 'শাহরাস্তি পৌরসভা' },
    { label: 'চিতোষী পূর্ব', value: 'চিতোষী পূর্ব ইউনিয়ন' },
    { label: 'চিতোষী পশ্চিম', value: 'চিতোষী পশ্চিম ইউনিয়ন' },
    { label: 'মেহের উত্তর (সুন্দ্রা)', value: 'মেহের উত্তর ইউনিয়ন' },
    { label: 'মেহের দক্ষিণ (কালিয়ারচোঁ)', value: 'মেহের দক্ষিণ ইউনিয়ন' },
    { label: 'সূচীপাড়া উত্তর', value: 'সূচীপাড়া উত্তর ইউনিয়ন' },
    { label: 'রায়শ্রী দক্ষিণ', value: 'রায়শ্রী দক্ষিণ ইউনিয়ন' },
    { label: 'টামটা উত্তর', value: 'টামটা উত্তর ইউনিয়ন' }
  ];

  return (
    <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 space-y-3">
        {/* Row 1: Union/Area Filter Dropdown & Quick Badges */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 shrink-0">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>ইউনিয়ন নির্বাচন:</span>
          </div>

          {/* Union Selector */}
          <select
            value={selectedUnion}
            onChange={(e) => setSelectedUnion(e.target.value)}
            className="text-xs sm:text-sm py-1.5 px-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-medium"
          >
            <option value="all">সমগ্র শাহরাস্তি উপজেলা (সকল ইউনিয়ন)</option>
            {SHAHRASHTI_AREAS.map((area) => (
              <option key={area.id} value={area.name}>
                {area.name}
              </option>
            ))}
          </select>

          {/* Quick Select Buttons for Unions */}
          <div className="hidden xl:flex items-center gap-1.5 ml-2 border-l border-slate-200 pl-3">
            <span className="text-xs text-slate-400">এলাকা:</span>
            {quickUnionShortcuts.slice(0, 5).map((shortcut) => (
              <button
                key={shortcut.value}
                onClick={() => setSelectedUnion(shortcut.value)}
                className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                  selectedUnion === shortcut.value
                    ? 'bg-emerald-700 text-white font-medium'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {shortcut.label}
              </button>
            ))}
          </div>

          {/* Reset Filters button */}
          {(selectedUnion !== 'all' || availableOnly || verifiedOnly) && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-red-600 ml-auto transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ফিল্টার রিসেট</span>
            </button>
          )}
        </div>

        {/* Row 2: Secondary Controls (Availability, Verified, Sort, Count) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-100 text-xs sm:text-sm">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            {/* Availability Toggle */}
            <label className="inline-flex items-center gap-1.5 cursor-pointer text-slate-700 select-none">
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={(e) => setAvailableOnly(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
              />
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>বর্তমানে কাজের জন্য প্রস্তুত</span>
              </span>
            </label>

            {/* Verified Only Toggle */}
            <label className="inline-flex items-center gap-1.5 cursor-pointer text-slate-700 select-none">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
              />
              <span className="inline-flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                <span>NID যাচাইকৃত কর্মী</span>
              </span>
            </label>
          </div>

          {/* Sort By & Count */}
          <div className="flex items-center gap-3 ml-auto">
            <div className="flex items-center gap-1.5 text-slate-600 text-xs">
              <Filter className="w-3.5 h-3.5" />
              <span>সাজান:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs py-1 px-2 bg-slate-50 border border-slate-300 rounded-md text-slate-800 focus:outline-hidden font-medium"
              >
                <option value="rating">সেরা রেটিং</option>
                <option value="experience">কাজের অভিজ্ঞতা</option>
                <option value="jobs">সম্পন্ন কাজের সংখ্যা</option>
                <option value="newest">নতুন তালিকাভুক্ত</option>
              </select>
            </div>

            <div className="text-xs text-slate-500 font-mono tabular-nums">
              মোট: <span className="font-semibold text-slate-900">{filteredCount}</span> জন কর্মী
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
