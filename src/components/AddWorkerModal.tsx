import React, { useState } from 'react';
import { X, Upload, Plus, CheckCircle2, User, Phone, MapPin } from 'lucide-react';
import { WorkerProfile } from '../types';
import { PROFESSION_CATEGORIES, CATEGORY_GROUPS } from '../data/categories';
import { SHAHRASHTI_AREAS } from '../data/shahrastiData';

interface AddWorkerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWorkerAdded: (newWorker: WorkerProfile) => void;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'
];

export const AddWorkerModal: React.FC<AddWorkerModalProps> = ({
  isOpen,
  onClose,
  onWorkerAdded
}) => {
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [category, setCategory] = useState('electrician');
  const [unionOrArea, setUnionOrArea] = useState('শাহরাস্তি পৌরসভা');
  const [village, setVillage] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [photo, setPhoto] = useState(PRESET_AVATARS[0]);
  const [experienceYears, setExperienceYears] = useState(5);
  const [dailyRate, setDailyRate] = useState('৳৮৫০ / দিন');
  const [callOutFee, setCallOutFee] = useState('৳২০০');
  const [bio, setBio] = useState('');
  const [specialtiesInput, setSpecialtiesInput] = useState('');
  const [toolsInput, setToolsInput] = useState('');
  const [portfolioImages, setPortfolioImages] = useState<string[]>([]);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  // Selected union details for quick village/market suggestions
  const selectedAreaObj = SHAHRASHTI_AREAS.find((a) => a.name === unionOrArea);

  // Handle Photo Upload via base64
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPhoto(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Portfolio Upload via base64
  const handlePortfolioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setPortfolioImages((prev) => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim() || !phone.trim() || !profession.trim()) {
      setFormError('অনুগ্রহ করে নাম, পেশা এবং মোবাইল নম্বর সঠিকভাবে পূরণ করুন।');
      return;
    }

    setIsSubmitting(true);

    const specialtiesList = specialtiesInput
      ? specialtiesInput.split(',').map((s) => s.trim()).filter(Boolean)
      : ['কাজের সাধারণ দক্ষতা ও বিশ্বস্ত সেবা'];

    const toolsList = toolsInput
      ? toolsInput.split(',').map((t) => t.trim()).filter(Boolean)
      : ['প্রয়োজনীয় উন্নত টুলবক্স'];

    const cleanWhatsapp = whatsapp.trim() || phone.trim().replace(/[^0-9]/g, '');

    const newWorker: WorkerProfile = {
      id: `worker-shahrasti-${Date.now()}`,
      name: name.trim(),
      profession: profession.trim(),
      category,
      division: 'চট্টগ্রাম',
      district: 'চাঁদপুর',
      upazila: 'শাহরাস্তি',
      unionOrArea: unionOrArea,
      village: village.trim(),
      phone: phone.trim(),
      whatsapp: cleanWhatsapp.startsWith('880') ? cleanWhatsapp : `880${cleanWhatsapp.replace(/^0/, '')}`,
      photo: photo || PRESET_AVATARS[0],
      experienceYears: Number(experienceYears) || 3,
      dailyRate: dailyRate.trim() || '৳৮৫০ / দিন',
      callOutFee: callOutFee.trim() || '৳২০০',
      bio: bio.trim() || `${name} শাহরাস্তি উপজেলার একজন বিশ্বস্ত কারিগর যিনি সততা ও দক্ষতার সাথে কাজ করে থাকেন।`,
      specialties: specialtiesList,
      toolsOwned: toolsList,
      portfolioImages: portfolioImages.length > 0 ? portfolioImages : [photo],
      rating: 5.0,
      reviewCount: 1,
      completedJobs: 1,
      isVerified: true,
      nidVerified: true,
      availability: 'available',
      joinedDate: 'আজকে যুক্ত',
      reviews: [
        {
          id: `rev-initial-${Date.now()}`,
          authorName: 'আমার শাহরাস্তি এডমিন',
          rating: 5,
          comment: 'শাহরাস্তি উপজেলা নাগরিক ডাটাবেজে সফলভাবে ভেরিফাই করা হয়েছে।',
          date: 'আজকে',
          location: unionOrArea
        }
      ]
    };

    onWorkerAdded(newWorker);
    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-emerald-50/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                আমার শাহরাস্তি — নতুন কর্মী নিবন্ধন
              </h3>
              <p className="text-xs text-slate-600">
                শাহরাস্তি উপজেলার যেকোনো পেশার কারিগর বা কর্মী হিসেবে যুক্ত হোন
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isSuccess ? (
          <div className="p-10 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">
              অভিনন্দন! সফলভাবে যুক্ত হয়েছে!
            </h4>
            <p className="text-sm text-slate-600 max-w-sm">
              কর্মী প্রোফাইলটি 'আমার শাহরাস্তি' ডাটাবেজে অন্তর্ভুক্ত হয়েছে। উপজেলার যেকেউ এখন সরাসরি কাজের প্রয়োজনে কল করতে পারবে।
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-6 space-y-5">
            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
                {formError}
              </div>
            )}
            {/* 1. Basic Info */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-600" />
                <span>ব্যক্তিগত ও পেশাগত তথ্য</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    কর্মীর পূর্ণ নাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="যেমন: মোঃ জসিম উদ্দিন"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    পেশার প্রধান ক্যাটাগরি *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white text-xs sm:text-sm font-medium"
                  >
                    {CATEGORY_GROUPS.map((grp) => (
                      <optgroup key={grp} label={`--- ${grp} ---`}>
                        {PROFESSION_CATEGORIES.filter((c) => c.group === grp).map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1 text-xs sm:text-sm">
                  পেশার বিস্তারিত পদবী / স্পেশালিটি *
                </label>
                <input
                  type="text"
                  required
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  placeholder="যেমন: সিনিয়র ইলেকট্রিশিয়ান ও মোটর ওয়্যারিং স্পেশালিস্ট"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* 2. Photo Upload or Choose Avatar */}
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <label className="block font-semibold text-slate-700 text-xs sm:text-sm">
                কর্মীর ছবি (আপলোড করুন বা নির্বাচন করুন)
              </label>

              <div className="flex flex-wrap items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border-2 border-emerald-500 shrink-0">
                  <img
                    src={photo}
                    alt="প্রিভিউ"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-[200px]">
                  <label className="inline-flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer border border-slate-300 transition-colors">
                    <Upload className="w-4 h-4 text-emerald-600" />
                    <span>ডিভাইস থেকে ছবি আপলোড</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-[11px] text-slate-400 mt-1">
                    মোবাইল ক্যামেরা বা গ্যালারি থেকে ছবি দিতে পারেন
                  </p>
                </div>
              </div>

              {/* Preset Avatar shortcuts */}
              <div className="pt-1">
                <span className="text-[11px] text-slate-500">অথবা প্রস্তুত ছবি বেছে নিন:</span>
                <div className="flex items-center gap-2 mt-1">
                  {PRESET_AVATARS.map((av, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPhoto(av)}
                      className={`w-9 h-9 rounded-lg overflow-hidden border-2 transition-all ${
                        photo === av ? 'border-emerald-600 scale-105' : 'border-transparent opacity-70'
                      }`}
                    >
                      <img src={av} alt="Avatar" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Location inside Shahrasti (Union -> Village/Market) */}
            <div className="space-y-3 pt-2 border-t border-slate-200">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>শাহরাস্তি উপজেলার এলাকা ও ঠিকানা</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    ইউনিয়ন বা পৌরসভা *
                  </label>
                  <select
                    value={unionOrArea}
                    onChange={(e) => setUnionOrArea(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold text-emerald-800"
                  >
                    {SHAHRASHTI_AREAS.map((area) => (
                      <option key={area.id} value={area.name}>
                        {area.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    গ্রাম / বাজার / মহল্লা / রোড
                  </label>
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    placeholder="যেমন: সুন্দ্রা, ঠাকুরবাজার বা চিতোষী স্টেশন"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              {/* Suggestions based on selected area */}
              {selectedAreaObj && (
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                  <span className="text-slate-500">এই ইউনিয়নের পরিচিত স্থান: </span>
                  <span className="text-slate-800 font-medium">
                    {selectedAreaObj.famousMarkets.concat(selectedAreaObj.villages.slice(0, 3)).join(', ')}
                  </span>
                </div>
              )}
            </div>

            {/* 4. Contact & Rates */}
            <div className="space-y-3 pt-2 border-t border-slate-200">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>যোগাযোগ ও পারিশ্রমিক</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    মোবাইল নম্বর (সরাসরি কল) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01712-XXXXXX"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    হোয়াটসঅ্যাপ নম্বর (ঐচ্ছিক)
                  </label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="018XXXXXXXX"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    কাজের অভিজ্ঞতা (বছর)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    দৈনিক মজুরি / হাজিরা
                  </label>
                  <input
                    type="text"
                    value={dailyRate}
                    onChange={(e) => setDailyRate(e.target.value)}
                    placeholder="৳৮৫০ / দিন"
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    ভিজিট ফি
                  </label>
                  <input
                    type="text"
                    value={callOutFee}
                    onChange={(e) => setCallOutFee(e.target.value)}
                    placeholder="৳২০০"
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* 5. Bio and Specialties */}
            <div className="space-y-3 pt-2 border-t border-slate-200">
              <div>
                <label className="block font-semibold text-slate-700 mb-1 text-xs sm:text-sm">
                  কাজের অভিজ্ঞতা ও বিস্তারিত বিবরণ
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="পূর্বে কোন কোন কাজ করেছেন, কী ধরনের কাজে পারদর্শী বিস্তারিত লিখুন..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div>
                  <label className="block text-slate-600 mb-1">
                    বিশেষ দক্ষতা (কমা দিয়ে লিখুন)
                  </label>
                  <input
                    type="text"
                    value={specialtiesInput}
                    onChange={(e) => setSpecialtiesInput(e.target.value)}
                    placeholder="যেমন: ডিবি বোর্ড, শর্ট সার্কিট, মোটর"
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 mb-1">
                    ব্যবহৃত নিজস্ব টুলস (কমা দিয়ে লিখুন)
                  </label>
                  <input
                    type="text"
                    value={toolsInput}
                    onChange={(e) => setToolsInput(e.target.value)}
                    placeholder="যেমন: ড্রিল মেশিন, টেস্টার, মিটার"
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              {/* Sample portfolio works upload */}
              <div>
                <label className="block text-slate-600 mb-1 text-xs">
                  কাজের নমুনা ছবি যুক্ত করুন (ঐচ্ছিক)
                </label>
                <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer border border-slate-300">
                  <Upload className="w-3.5 h-3.5 text-emerald-600" />
                  <span>কাজের ছবি যুক্ত করুন</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePortfolioUpload}
                    className="hidden"
                  />
                </label>
                {portfolioImages.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {portfolioImages.map((img, i) => (
                      <div key={i} className="w-12 h-12 rounded border overflow-hidden">
                        <img src={img} alt="work" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100"
              >
                বাতিল
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 text-xs sm:text-sm font-bold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 shadow-md transition-colors"
              >
                {isSubmitting ? 'সংরক্ষণ হচ্ছে...' : 'আমার শাহরাস্তিতে প্রোফাইল প্রকাশ করুন'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
