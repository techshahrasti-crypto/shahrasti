import React from 'react';
import { X, Phone, ShieldAlert, Clock, MapPin } from 'lucide-react';
import { SHAHRASHTI_EMERGENCY_CONTACTS } from '../data/shahrastiData';

interface ShahrastiEmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShahrastiEmergencyModal: React.FC<ShahrastiEmergencyModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-red-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                শাহরাস্তি জরুরি হেল্পলাইন নম্বর
              </h3>
              <p className="text-xs text-slate-600">
                শাহরাস্তি উপজেলার সরকারি জরুরি সেবা কেন্দ্র ও হটলাইন
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-5 space-y-3 max-h-[75vh] overflow-y-auto">
          {SHAHRASHTI_EMERGENCY_CONTACTS.map((em) => (
            <div
              key={em.id}
              className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-slate-900">
                    {em.serviceName}
                  </h4>
                  {em.is24Hours && (
                    <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-medium flex items-center gap-0.5">
                      <Clock className="w-2.5 h-2.5" /> ২৪ ঘণ্টা
                    </span>
                  )}
                </div>
                <p className="text-xs text-emerald-800 font-medium">
                  {em.department}
                </p>
                <p className="text-[11px] text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{em.address}</span>
                </p>
              </div>

              <a
                href={`tel:${em.phone}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors shadow-xs shrink-0 whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{em.phone}</span>
              </a>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>জাতীয় জরুরি সেবা: ৯৯৯</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-100"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
