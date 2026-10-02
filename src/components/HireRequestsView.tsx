import React from 'react';
import { ClipboardList, ArrowLeft, Phone, Calendar, Clock, MapPin } from 'lucide-react';
import { HireRequest } from '../types';

interface HireRequestsViewProps {
  requests: HireRequest[];
  onBackToAll: () => void;
}

export const HireRequestsView: React.FC<HireRequestsViewProps> = ({
  requests,
  onBackToAll
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <button
            onClick={onBackToAll}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-emerald-700 hover:text-emerald-800 font-semibold mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>সকল কর্মীতে ফিরে যান</span>
          </button>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-emerald-700" />
            <span>আপনার প্রেরিত কাজের আবেদনসমূহ</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            উপজেলা ডিরেক্টরি থেকে বিভিন্ন কর্মীকে কাজের অনুরোধ পাঠানোর হিস্ট্রি
          </p>
        </div>

        <span className="text-sm font-semibold text-slate-600 font-mono">
          মোট: {requests.length}টি
        </span>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <ClipboardList className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            এখনও কোনো কাজের আবেদন পাঠানো হয়নি
          </h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            যেকোনো কর্মীর প্রোফাইল থেকে "কাজে বুক করুন" বাটনে ক্লিক করে কাজের অনুরোধ পাঠাতে পারেন।
          </p>
          <button
            onClick={onBackToAll}
            className="px-5 py-2.5 bg-slate-900 text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-colors"
          >
            কর্মী তালিকা দেখুন
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    কর্মী: {req.workerName}
                  </h3>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                      req.urgency === 'emergency'
                        ? 'bg-red-100 text-red-800'
                        : req.urgency === 'urgent'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {req.urgency === 'emergency'
                      ? 'জরুরি বিপদ'
                      : req.urgency === 'urgent'
                      ? 'আজকের জরুরি কাজ'
                      : 'সাধারণ কাজ'}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    তারিখ: {req.createdAt}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <strong className="text-slate-900">কাজের বিবরণ:</strong> {req.workDescription}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>ঠিকানা: {req.clientAddress}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>কাঙ্ক্ষিত তারিখ: {req.preferredDate}</span>
                  </span>
                  <span>·</span>
                  <span>আবেদনকারী: {req.clientName} ({req.clientPhone})</span>
                </div>
              </div>

              {/* Action column */}
              <div className="flex flex-row md:flex-col items-center justify-center gap-2 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-4">
                <a
                  href={`tel:${req.workerPhone}`}
                  className="w-full py-2 px-4 bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 hover:bg-slate-800"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>কর্মীকে কল দিন</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
