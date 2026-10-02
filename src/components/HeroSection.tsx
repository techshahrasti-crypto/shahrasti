import React from 'react';
import { Search, ShieldCheck, PhoneCall, MapPin, CheckCircle2, Building } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedUnion: string;
  onClearFilters: () => void;
  totalWorkers: number;
  onSelectUnion: (union: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  selectedUnion,
  onClearFilters,
  totalWorkers,
  onSelectUnion
}) => {
  const quickAreas = ['শাহরাস্তি পৌরসভা', 'চিতোষী বাজার', 'সুন্দ্রা', 'কালিয়ারচোঁ', 'শোল্লা', 'ওয়ারুক'];

  return (
    <div className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background Image with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_upazila_workers_1790957927303.jpg"
          alt="শাহরাস্তির দক্ষ কারিগর ও মেহনতি মানুষ"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity filter saturate-150"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/95 to-slate-900/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-3xl space-y-6">
          {/* Trust Subtitle in Hero */}
          <div className="flex items-center gap-2 text-emerald-400 text-xs sm:text-sm font-semibold tracking-wide">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>শাহরাস্তি উপজেলা সেবা প্ল্যাটফর্ম</span>
            <span aria-hidden="true">·</span>
            <span>চাঁদপুর জেলা</span>
            <span aria-hidden="true">·</span>
            <span>১০টি ইউনিয়ন ও ১টি পৌরসভা</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight text-balance">
            আমার শাহরাস্তি — উপজেলার দোকান, ব্যবসা ও দক্ষ কারিগর ডিরেক্টরি
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            শাহরাস্তির সকল বাজারের বিশ্বস্ত দোকান, পণ্যসামগ্রী এবং আপনার নিজ এলাকার দক্ষ কারিগর ও টেকনিশিয়ান—একই সাথে দুই পাশে দেখুন এবং সরাসরি ফোন বা হোয়াটসঅ্যাপে যোগাযোগ করুন।
          </p>

          {/* Quick Search Input */}
          <div className="pt-2">
            <div className="relative max-w-xl flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="নাম, পেশা (যেমন: ওয়্যারিং, এসি, খাট) বা গ্রাম (যেমন: সুন্দ্রা, চিতোষী) খুঁজুন..."
                className="w-full pl-11 pr-24 py-3.5 bg-white text-slate-900 rounded-xl text-sm sm:text-base placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 shadow-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 px-2 py-1 text-xs text-slate-500 hover:text-slate-900 bg-slate-100 rounded-md"
                >
                  মুছুন
                </button>
              )}
            </div>

            {/* Quick Union/Area shortcuts */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-slate-300">
              <span className="text-slate-400">শাহরাস্তির জনপ্রিয় এলাকা:</span>
              {quickAreas.map((area) => (
                <button
                  key={area}
                  onClick={() => {
                    if (area === 'শাহরাস্তি পৌরসভা') {
                      onSelectUnion('শাহরাস্তি পৌরসভা');
                    } else {
                      setSearchQuery(area);
                    }
                  }}
                  className="px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60 transition-colors"
                >
                  {area}
                </button>
              ))}
            </div>

            {/* Selected Union Status */}
            {selectedUnion && selectedUnion !== 'all' && (
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>নির্বাচিত এলাকা: <strong className="text-white">{selectedUnion}</strong></span>
                <span aria-hidden="true">·</span>
                <button
                  onClick={onClearFilters}
                  className="text-emerald-400 hover:underline"
                >
                  সমগ্র শাহরাস্তি দেখুন
                </button>
              </div>
            )}
          </div>

          {/* Quantitative Proof Grid */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-800/80 text-xs sm:text-sm">
            <div>
              <p className="text-slate-400">শাহরাস্তির সক্রিয় কর্মী</p>
              <p className="text-lg font-bold text-white font-mono tabular-nums">{totalWorkers}+ জন</p>
            </div>
            <div>
              <p className="text-slate-400">এলাকা কভারেজ</p>
              <p className="text-lg font-bold text-emerald-400 flex items-center gap-1">
                <Building className="w-4 h-4 inline" /> ১০ ইউনিয়ন + পৌরসভা
              </p>
            </div>
            <div>
              <p className="text-slate-400">পরিচয় নিশ্চিতকরণ</p>
              <p className="text-lg font-bold text-white flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 inline text-blue-400" /> NID যাচাইকৃত
              </p>
            </div>
            <div>
              <p className="text-slate-400">সরাসরি যোগাযোগ</p>
              <p className="text-lg font-bold text-white flex items-center gap-1">
                <PhoneCall className="w-4 h-4 inline text-emerald-400" /> ১০০% ফ্রি কল
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
