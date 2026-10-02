import React, { useState } from 'react';
import {
  ShieldCheck,
  Heart,
  PhoneCall,
  Store,
  Users,
  MapPin,
  Mail,
  Code2,
  ShieldAlert,
  UserCheck
} from 'lucide-react';
import { SHAHRASHTI_AREAS } from '../data/shahrastiData';

interface FooterProps {
  onSelectCategory: (catId: string) => void;
  onSelectUnion: (unionName: string) => void;
  onOpenAddWorker: () => void;
  onOpenAddShop?: () => void;
  onNavigateShops?: () => void;
  onNavigateWorkers?: () => void;
  onOpenEmergency: () => void;
  onOpenAdmin?: () => void;
  onResetData: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onSelectUnion,
  onOpenAddWorker,
  onOpenAddShop,
  onNavigateShops,
  onNavigateWorkers,
  onOpenEmergency,
  onOpenAdmin,
  onResetData
}) => {
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Wordmark & Purpose */}
          <div className="space-y-4 md:col-span-1">
            <h3 className="text-xl font-bold text-white tracking-tight text-emerald-400">
              আমার শাহরাস্তি
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              শাহরাস্তি উপজেলার ১০টি ইউনিয়ন ও ১টি পৌরসভার সাধারণ দক্ষ কারিগর, টেকনিশিয়ান ও স্থানীয় দোকান-ব্যবসা প্রতিষ্ঠানের সাথে সাধারণ জনগণের সরাসরি সংযোগের প্ল্যাটফর্ম।
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>নিরাপদ ও সরাসরি স্থানীয় যোগাযোগ</span>
            </div>
          </div>

          {/* Col 2: Shahrasti Unions Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              শাহরাস্তির ইউনিয়নসমূহ
            </h4>
            <ul className="grid grid-cols-1 gap-1.5 text-xs text-slate-400">
              {SHAHRASHTI_AREAS.slice(0, 6).map((area) => (
                <li key={area.id}>
                  <button
                    onClick={() => onSelectUnion(area.name)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {area.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Popular Categories & Businesses */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              জনপ্রিয় সেবা ও ব্যবসা
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {onNavigateWorkers && (
                <li>
                  <button
                    onClick={onNavigateWorkers}
                    className="hover:text-white transition-colors flex items-center gap-1.5 text-emerald-400"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>দক্ষ কারিগর ডিরেক্টরি</span>
                  </button>
                </li>
              )}
              {onNavigateShops && (
                <li>
                  <button
                    onClick={onNavigateShops}
                    className="hover:text-white transition-colors flex items-center gap-1.5 text-emerald-400"
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>দোকান ও ব্যবসা ডিরেক্টরি</span>
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={() => onSelectCategory('electrician')}
                  className="hover:text-white transition-colors"
                >
                  ইলেকট্রিশিয়ান ও ওয়্যারিং
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('plumber')}
                  className="hover:text-white transition-colors"
                >
                  প্লাম্বার ও স্যানিটারি মিস্ত্রি
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('carpenter')}
                  className="hover:text-white transition-colors"
                >
                  কাঠমিস্ত্রি ও ফার্নিচার
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Citizen Emergency & Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              নাগরিক সেবা ও যোগাযোগ
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={onOpenEmergency}
                  className="text-red-400 hover:text-red-300 transition-colors font-semibold flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>জরুরি হেল্পলাইন নম্বর</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAddWorker}
                  className="hover:text-white transition-colors text-emerald-400 font-medium"
                >
                  + কর্মী নিবন্ধন করুন
                </button>
              </li>
              {onOpenAddShop && (
                <li>
                  <button
                    onClick={onOpenAddShop}
                    className="hover:text-white transition-colors text-emerald-400 font-medium"
                  >
                    + দোকান বা ব্যবসা যুক্ত করুন
                  </button>
                </li>
              )}
              {onOpenAdmin && (
                <li>
                  <button
                    onClick={onOpenAdmin}
                    className="hover:text-white transition-colors text-slate-400 flex items-center gap-1 text-xs"
                  >
                    <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                    <span>সুপারএডমিন প্যানেল</span>
                  </button>
                </li>
              )}
              <li className="pt-2">
                {resetConfirmOpen ? (
                  <div className="bg-slate-800 p-2 rounded text-[11px] space-y-1.5">
                    <p className="text-slate-300">ডিফল্ট ডাটা রিলোড করবেন?</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onResetData();
                          setResetConfirmOpen(false);
                        }}
                        className="px-2 py-0.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold"
                      >
                        হ্যাঁ
                      </button>
                      <button
                        onClick={() => setResetConfirmOpen(false)}
                        className="px-2 py-0.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded text-[10px]"
                      >
                        না
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setResetConfirmOpen(true)}
                    className="text-slate-500 hover:text-slate-300 underline text-[11px]"
                  >
                    ডিফল্ট ডাটা রিলোড করুন
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* Creator / Developer Small Profile Card in Footer */}
        <div className="mt-10 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-950/70 p-4 sm:p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-center md:text-left">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0">
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <span className="text-[11px] text-slate-400 font-medium">অ্যাপটি তৈরি করেছেন:</span>
                  <span className="text-sm font-bold text-white tracking-wide">
                    টেক শাহরাস্তি (Tech Shahrasti)
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.2 rounded-full border border-emerald-500/30">
                    কারিগরি টিম
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  শাহরাস্তি উপজেলার গ্রামীণ ও পৌর এলাকার শ্রমজীবী, কারিগর এবং স্থানীয় ব্যবসা প্রসারে নিবেদিত ডিজিটাল প্ল্যাটফর্ম।
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400 shrink-0">
              <a
                href="mailto:Tech.shahrasti@gmail.com"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span className="font-mono text-[11px]">Tech.shahrasti@gmail.com</span>
              </a>

              <span className="text-slate-500 hidden sm:inline">·</span>
              <span className="text-slate-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                <span>শাহরাস্তি, চাঁদপুর</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} আমার শাহরাস্তি — শাহরাস্তি উপজেলা কর্মী ও ব্যবসা ডিরেক্টরি। সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="flex items-center gap-1">
            <span>শাহরাস্তির প্রিয় জনগণের কল্যাণে নিবেদিত</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
