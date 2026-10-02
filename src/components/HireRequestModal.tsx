import React, { useState } from 'react';
import { X, Calendar, Phone, CheckCircle2, Clock, MapPin, Send } from 'lucide-react';
import { HireRequest, WorkerProfile } from '../types';

interface HireRequestModalProps {
  worker: WorkerProfile | null;
  onClose: () => void;
  onSubmitRequest: (req: HireRequest) => void;
}

export const HireRequestModal: React.FC<HireRequestModalProps> = ({
  worker,
  onClose,
  onSubmitRequest
}) => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [workDescription, setWorkDescription] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [urgency, setUrgency] = useState<'regular' | 'urgent' | 'emergency'>('regular');
  const [submitted, setSubmitted] = useState(false);

  if (!worker) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim() || !workDescription.trim()) {
      alert('অনুগ্রহ করে নাম, মোবাইল নম্বর এবং কাজের বিবরণ প্রদান করুন।');
      return;
    }

    const req: HireRequest = {
      id: `req-${Date.now()}`,
      workerId: worker.id,
      workerName: worker.name,
      workerPhone: worker.phone,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientAddress: clientAddress.trim() || worker.upazila,
      workDescription: workDescription.trim(),
      preferredDate: preferredDate || 'যত দ্রুত সম্ভব',
      urgency,
      status: 'pending',
      createdAt: new Date().toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

    onSubmitRequest(req);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <h3 className="font-bold text-slate-900 text-base sm:text-lg">
              কাজে ডাকার আবেদন পাঠান
            </h3>
            <p className="text-xs text-slate-600">
              কর্মী: <strong className="text-emerald-800">{worker.name}</strong> ({worker.profession})
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h4 className="text-xl font-bold text-slate-900">
              কাজের আবেদন সফলভাবে তৈরি হয়েছে!
            </h4>

            <p className="text-sm text-slate-600 leading-relaxed">
              আপনার কাজের অনুরোধটি তালিকায় সংরক্ষিত হয়েছে। দ্রুত সাড়ার জন্য আপনি এখনই সরাসরি <strong>{worker.name}</strong> ভাইকে ফোন করতে পারেন।
            </p>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-1">
              <p><strong className="text-slate-800">কর্মীর নম্বর:</strong> {worker.phone}</p>
              <p><strong className="text-slate-800">এলাকা:</strong> {worker.upazila}, {worker.district}</p>
              <p><strong className="text-slate-800">প্রাথমিক ফি:</strong> {worker.callOutFee}</p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <a
                href={`tel:${worker.phone}`}
                className="flex-1 py-2.5 px-4 bg-slate-900 text-white rounded-lg font-semibold text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>সরাসরি কল করুন</span>
              </a>

              <button
                onClick={onClose}
                className="py-2.5 px-4 bg-slate-100 text-slate-700 rounded-lg font-semibold text-xs sm:text-sm hover:bg-slate-200"
              >
                ঠিক আছে, বন্ধ করুন
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                আপনার নাম *
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="যেমন: মোঃ জহিরুল ইসলাম"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  আপনার মোবাইল নম্বর *
                </label>
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  কাজের সম্ভাব্য তারিখ
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                কাজের স্থান / সম্পূর্ণ ঠিকানা
              </label>
              <input
                type="text"
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
                placeholder="যেমন: চিতোষী পশ্চিম, স্টেশন বাজার সংলগ্ন"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                কাজের জরুরি মাত্রা
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setUrgency('regular')}
                  className={`py-2 px-2 text-center rounded-lg border font-medium text-xs ${
                    urgency === 'regular'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  সাধারণ কাজ
                </button>
                <button
                  type="button"
                  onClick={() => setUrgency('urgent')}
                  className={`py-2 px-2 text-center rounded-lg border font-medium text-xs ${
                    urgency === 'urgent'
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  আজই জরুরি
                </button>
                <button
                  type="button"
                  onClick={() => setUrgency('emergency')}
                  className={`py-2 px-2 text-center rounded-lg border font-medium text-xs ${
                    urgency === 'emergency'
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  তাৎক্ষণিক বিপদ
                </button>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                কী কাজ করাতে চান বিস্তারিত লিখুন *
              </label>
              <textarea
                required
                rows={3}
                value={workDescription}
                onChange={(e) => setWorkDescription(e.target.value)}
                placeholder="যেমন: বাথরুমের পানির লাইন লিক করছে এবং মোটর সুইচ কাজ করছে না..."
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white text-xs sm:text-sm"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-slate-600 hover:text-slate-900"
              >
                বাতিল
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-emerald-700 text-white rounded-lg font-bold hover:bg-emerald-800 transition-colors shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>আবেদন জমা দিন</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
