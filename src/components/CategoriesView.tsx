import React, { useState, useMemo } from 'react';
import {
  LayoutGrid,
  Zap,
  Wrench,
  Hammer,
  BrickWall,
  Paintbrush,
  Snowflake,
  Flame,
  Cog,
  Camera,
  BookOpen,
  Car,
  UtensilsCrossed,
  Scissors,
  Sprout,
  Smartphone,
  Monitor,
  Tv,
  Wifi,
  BatteryCharging,
  Sun,
  Truck,
  Bike,
  HardHat,
  Stethoscope,
  HeartPulse,
  Activity,
  Sparkles,
  Key,
  Compass,
  Shirt,
  Video,
  Package,
  Brush,
  Shield,
  Music,
  Droplet,
  Award,
  Layers,
  Users,
  Printer,
  Palette,
  HeartHandshake,
  BookCheck,
  Square,
  Grid,
  Briefcase,
  Search,
  ArrowRight
} from 'lucide-react';
import { PROFESSION_CATEGORIES, CATEGORY_GROUPS } from '../data/categories';

interface CategoriesViewProps {
  onSelectCategory: (categoryId: string) => void;
  workerCounts: Record<string, number>;
}

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutGrid,
  Zap,
  Wrench,
  Hammer,
  BrickWall,
  Grid,
  Paintbrush,
  Square,
  Flame,
  HardHat,
  Users,
  Snowflake,
  Droplet,
  Sun,
  Tv,
  Cog,
  Car,
  Bike,
  BatteryCharging,
  Truck,
  Smartphone,
  Camera,
  Monitor,
  Printer,
  Wifi,
  BookOpen,
  BookCheck,
  Compass,
  HeartHandshake,
  Stethoscope,
  HeartPulse,
  Activity,
  Scissors,
  Sparkles,
  Palette,
  Shirt,
  Key,
  Award,
  Layers,
  Sprout,
  UtensilsCrossed,
  Music,
  Video,
  Package,
  Brush,
  Shield,
  Briefcase
};

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  onSelectCategory,
  workerCounts
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeGroup, setActiveGroup] = useState('all');

  // Filtered categories
  const filteredCategories = useMemo(() => {
    return PROFESSION_CATEGORIES.filter((c) => {
      if (c.id === 'all') return false;
      if (activeGroup !== 'all' && c.group !== activeGroup) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        return (
          c.name.toLowerCase().includes(q) ||
          c.nameEn.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          (c.group && c.group.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [searchTerm, activeGroup]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header & Search */}
      <div className="border-b border-slate-200 pb-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              শাহরাস্তির সকল ছোট ও বড় পেশাসমূহ
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              নির্মাণ, টেকনিশিয়ান, পরিবহন, আইটি, স্বাস্থ্য, হস্তশিল্প, শিক্ষা ও কৃষি—উপজেলার যেকোনো কাজের কারিগর খুঁজুন
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="পেশা বা কাজের নাম খুঁজুন..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Group Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setActiveGroup('all')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeGroup === 'all'
                ? 'bg-slate-900 text-white font-medium shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            সকল পেশা ({PROFESSION_CATEGORIES.length - 1})
          </button>
          {CATEGORY_GROUPS.map((grp) => (
            <button
              key={grp}
              onClick={() => setActiveGroup(grp)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                activeGroup === grp
                  ? 'bg-slate-900 text-white font-medium shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {grp}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Categories */}
      {filteredCategories.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
          আপনার সার্চ অনুযায়ী কোনো পেশা পাওয়া যায়নি। অনুগ্রহ করে অন্য নাম লিখে খুঁজুন।
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCategories.map((cat) => {
            const Icon = ICON_MAP[cat.iconName] || Briefcase;
            const count = workerCounts[cat.id] || 0;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="group p-4 bg-white rounded-xl border border-slate-200 hover:border-emerald-600 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-emerald-100 text-slate-700 group-hover:text-emerald-700 flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    {cat.group && (
                      <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                        {cat.group}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 font-mono tabular-nums">
                    {count} জন কর্মী
                  </span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>কর্মী দেখুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
