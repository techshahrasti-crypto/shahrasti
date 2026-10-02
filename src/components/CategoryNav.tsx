import React, { useState } from 'react';
import {
  Briefcase,
  Search,
  X,
  ChevronDown,
  Check,
  Sparkles,
  Zap,
  Wrench,
  Hammer,
  Snowflake,
  BrickWall,
  Car
} from 'lucide-react';
import { PROFESSION_CATEGORIES, CATEGORY_GROUPS } from '../data/categories';
import { ProfessionCategory } from '../types';

interface CategoryNavProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  workerCounts: Record<string, number>;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
  workerCounts
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  const currentCategory = PROFESSION_CATEGORIES.find((c) => c.id === selectedCategory) || PROFESSION_CATEGORIES[0];
  const totalWorkers = Object.values(workerCounts).reduce((a, b) => a + b, 0);

  // Filtered categories for popup search
  const filteredCategories = React.useMemo(() => {
    if (!searchFilter.trim()) return PROFESSION_CATEGORIES;
    const q = searchFilter.toLowerCase().trim();
    return PROFESSION_CATEGORIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.nameEn.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        (c.group && c.group.toLowerCase().includes(q))
    );
  }, [searchFilter]);

  // Quick popular shortcuts
  const popularShortcuts = [
    { id: 'all', name: 'সকল পেশা', icon: Sparkles },
    { id: 'electrician', name: 'ইলেকট্রিশিয়ান', icon: Zap },
    { id: 'plumber', name: 'প্লাম্বার', icon: Wrench },
    { id: 'carpenter', name: 'কাঠমিস্ত্রি', icon: Hammer },
    { id: 'technician', name: 'এসি ও ফ্রিজ', icon: Snowflake },
    { id: 'mason', name: 'রাজমিস্ত্রি', icon: BrickWall },
    { id: 'driver', name: 'ড্রাইভার', icon: Car }
  ];

  return (
    <div className="bg-white border-b border-slate-200 py-3 relative z-25 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        {/* Main Dropdown & Search Bar Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Dropdown Selector Area */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 shrink-0">
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <span>পেশা নির্বাচন করুন:</span>
            </div>

            {/* Standard Dropdown with Optgroups (Bulletproof on all devices) */}
            <div className="relative inline-block w-full sm:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => onSelectCategory(e.target.value)}
                className="w-full sm:w-72 text-xs sm:text-sm py-2 pl-3 pr-8 bg-slate-50 hover:bg-slate-100 border-2 border-emerald-600/70 rounded-xl text-slate-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-emerald-500 cursor-pointer transition-all shadow-xs"
              >
                <option value="all">
                  🌟 সকল পেশা (মোট {totalWorkers} জন দক্ষ কর্মী)
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

            {/* Interactive Search Modal / Dropdown Opener */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="inline-flex items-center gap-1 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-semibold transition-colors"
                title="পেশা সার্চ করুন"
              >
                <Search className="w-3.5 h-3.5 text-emerald-700" />
                <span>পেশা খুঁজুন</span>
                <ChevronDown className="w-3 h-3 text-emerald-700 ml-0.5" />
              </button>

              {/* Popup Search Dropdown */}
              {dropdownOpen && (
                <div className="absolute left-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-900">
                      সকল পেশার তালিকা ({PROFESSION_CATEGORIES.length - 1}টি)
                    </span>
                    <button
                      onClick={() => setDropdownOpen(false)}
                      className="p-1 text-slate-400 hover:text-slate-700 rounded-md"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Search inside popup */}
                  <div className="relative my-2">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      autoFocus
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      placeholder="পেশার নাম লিখুন (যেমন: ইলেকট্রিশিয়ান, দর্জি, ওয়েল্ডিং)..."
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Filtered List */}
                  <div className="max-h-64 overflow-y-auto space-y-1 scrollbar-thin pt-1">
                    {filteredCategories.map((cat) => {
                      const isSelected = selectedCategory === cat.id;
                      const count =
                        cat.id === 'all'
                          ? totalWorkers
                          : workerCounts[cat.id] || 0;

                      return (
                        <button
                          key={cat.id}
                          onClick={() => {
                            onSelectCategory(cat.id);
                            setDropdownOpen(false);
                            setSearchFilter('');
                          }}
                          className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                            isSelected
                              ? 'bg-emerald-700 text-white font-bold'
                              : 'hover:bg-slate-50 text-slate-800'
                          }`}
                        >
                          <div>
                            <div className="font-semibold">{cat.name}</div>
                            {cat.group && (
                              <div
                                className={`text-[10px] ${
                                  isSelected ? 'text-emerald-200' : 'text-slate-400'
                                }`}
                              >
                                {cat.group}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {count > 0 && (
                              <span
                                className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                                  isSelected
                                    ? 'bg-emerald-800 text-emerald-100'
                                    : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                {count} জন
                              </span>
                            )}
                            {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Reset button if a category is selected */}
            {selectedCategory !== 'all' && (
              <button
                onClick={() => onSelectCategory('all')}
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-red-600 font-semibold transition-colors"
                title="সকল পেশা রিসেট করুন"
              >
                <X className="w-3.5 h-3.5" />
                <span>সব পেশা</span>
              </button>
            )}
          </div>

          {/* Quick Popular Trade Shortcuts */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
            <span className="text-slate-400 shrink-0 font-medium hidden md:inline">জনপ্রিয়:</span>
            {popularShortcuts.map((s) => {
              const Icon = s.icon;
              const isSelected = selectedCategory === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => onSelectCategory(s.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
                    isSelected
                      ? 'bg-slate-900 text-white font-bold shadow-2xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{s.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Selected Profession Banner (shows trade info clearly) */}
        {selectedCategory !== 'all' && (
          <div className="p-2.5 bg-emerald-50/80 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-950 animate-in fade-in">
            <div className="flex items-center gap-2">
              <span className="font-bold text-emerald-900">
                নির্বাচিত পেশা: {currentCategory.name}
              </span>
              <span aria-hidden="true" className="text-emerald-300">·</span>
              <span className="text-slate-600 hidden sm:inline">
                {currentCategory.description}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="font-mono text-emerald-800 font-bold bg-white px-2 py-0.5 rounded border border-emerald-200">
                {workerCounts[selectedCategory] || 0} জন কারিগর
              </span>
              <button
                onClick={() => onSelectCategory('all')}
                className="text-xs text-emerald-800 hover:text-red-600 font-bold underline"
              >
                সকল পেশা দেখুন
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
