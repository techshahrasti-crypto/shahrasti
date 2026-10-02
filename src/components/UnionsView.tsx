import React from 'react';
import { MapPin, ArrowRight, Building, Landmark } from 'lucide-react';
import { SHAHRASHTI_AREAS } from '../data/shahrastiData';

interface UnionsViewProps {
  onSelectUnion: (unionName: string) => void;
  workerCountsByUnion: Record<string, number>;
}

export const UnionsView: React.FC<UnionsViewProps> = ({
  onSelectUnion,
  workerCountsByUnion
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-emerald-700 text-xs font-semibold mb-1">
          <Landmark className="w-4 h-4" />
          <span>শাহরাস্তি উপজেলা প্রশাসনিক এলাকা</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          শাহরাস্তির পৌরসভা ও ১০টি ইউনিয়ন
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          আপনার নিজস্ব ইউনিয়ন বা এলাকা নির্বাচন করে সেখানকার কাছের মিস্ত্রি ও কারিগরদের খুঁজুন
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SHAHRASHTI_AREAS.map((area) => {
          const count = workerCountsByUnion[area.name] || 0;
          const isPourashava = area.type === 'pourashava';

          return (
            <div
              key={area.id}
              onClick={() => onSelectUnion(area.name)}
              className={`group p-5 bg-white rounded-xl border hover:shadow-md cursor-pointer transition-all flex flex-col justify-between ${
                isPourashava
                  ? 'border-emerald-300 ring-1 ring-emerald-200/60 bg-gradient-to-br from-emerald-50/30 to-white'
                  : 'border-slate-200 hover:border-emerald-600'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
                      isPourashava
                        ? 'bg-emerald-700 text-white'
                        : 'bg-slate-100 group-hover:bg-emerald-100 text-slate-700 group-hover:text-emerald-700 transition-colors'
                    }`}
                  >
                    {isPourashava ? (
                      <Building className="w-5 h-5" />
                    ) : (
                      <MapPin className="w-5 h-5 text-emerald-700" />
                    )}
                  </div>

                  <span className="text-xs font-semibold font-mono tabular-nums bg-slate-100 group-hover:bg-emerald-50 text-slate-700 group-hover:text-emerald-800 px-2.5 py-1 rounded-full transition-colors">
                    {count} জন কর্মী
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {area.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {area.description}
                  </p>
                </div>

                {/* Prominent Markets */}
                <div className="space-y-1 pt-1">
                  <span className="text-[11px] font-semibold text-slate-600">
                    প্রধান বাজার ও কেন্দ্র:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {area.famousMarkets.map((mkt, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded text-slate-700"
                      >
                        {mkt}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">শাহরাস্তি, চাঁদপুর</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>কর্মী দেখুন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
