import React, { useState } from 'react';
import {
  X,
  Upload,
  Plus,
  CheckCircle2,
  Store,
  Phone,
  MapPin,
  Sparkles,
  ShoppingBag,
  Clock,
  Truck,
  AlertCircle
} from 'lucide-react';
import { FeaturedProduct, ShopProfile } from '../types';
import { SHOP_CATEGORIES } from '../data/shopCategories';
import { SHAHRASHTI_AREAS } from '../data/shahrastiData';

interface AddShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShopAdded: (newShop: ShopProfile) => void;
}

const PRESET_SHOP_PHOTOS = [
  'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80'
];

export const AddShopModal: React.FC<AddShopModalProps> = ({
  isOpen,
  onClose,
  onShopAdded
}) => {
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState('hardware_sanitary');
  const [ownerName, setOwnerName] = useState('');
  const [unionOrArea, setUnionOrArea] = useState('শাহরাস্তি পৌরসভা');
  const [marketName, setMarketName] = useState('ঠাকুরবাজার');
  const [fullAddress, setFullAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [photo, setPhoto] = useState(PRESET_SHOP_PHOTOS[0]);
  const [description, setDescription] = useState('');
  const [discountOffer, setDiscountOffer] = useState('');
  const [openingHours, setOpeningHours] = useState('সকাল ৮:৩০ - রাত ৯:৩০');
  const [homeDelivery, setHomeDelivery] = useState(true);
  const [yearEstablished, setYearEstablished] = useState<number>(2018);

  // Featured Products (up to 3)
  const [prod1Name, setProd1Name] = useState('');
  const [prod1Price, setProd1Price] = useState('');
  const [prod2Name, setProd2Name] = useState('');
  const [prod2Price, setProd2Price] = useState('');
  const [prod3Name, setProd3Name] = useState('');
  const [prod3Price, setProd3Price] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const selectedAreaObj = SHAHRASHTI_AREAS.find((a) => a.name === unionOrArea);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !phone.trim() || !ownerName.trim()) {
      setErrorMessage('অনুগ্রহ করে প্রতিষ্ঠানের নাম, মালিকের নাম এবং মোবাইল নম্বর সঠিকভাবে পূরণ করুন।');
      return;
    }

    setIsSubmitting(true);

    const featuredProducts: FeaturedProduct[] = [];
    if (prod1Name.trim()) {
      featuredProducts.push({ name: prod1Name.trim(), price: prod1Price.trim() || undefined });
    }
    if (prod2Name.trim()) {
      featuredProducts.push({ name: prod2Name.trim(), price: prod2Price.trim() || undefined });
    }
    if (prod3Name.trim()) {
      featuredProducts.push({ name: prod3Name.trim(), price: prod3Price.trim() || undefined });
    }

    const cleanWhatsapp = whatsapp.trim() || phone.trim().replace(/[^0-9]/g, '');

    const newShop: ShopProfile = {
      id: `shop-shahrasti-${Date.now()}`,
      name: name.trim(),
      tagline: tagline.trim() || `${unionOrArea}-র নির্ভরযোগ্য বাণিজ্যিক প্রতিষ্ঠান`,
      category,
      ownerName: ownerName.trim(),
      unionOrArea,
      marketName: marketName.trim() || 'প্রধান বাজার',
      fullAddress: fullAddress.trim() || `${marketName}, ${unionOrArea}, শাহরাস্তি`,
      phone: phone.trim(),
      whatsapp: cleanWhatsapp.startsWith('880') ? cleanWhatsapp : `880${cleanWhatsapp.replace(/^0/, '')}`,
      photo: photo || PRESET_SHOP_PHOTOS[0],
      description: description.trim() || `${name} শাহরাস্তি উপজেলার ${marketName} এ অবস্থিত একটি প্রতিষ্ঠিত দোকান ও ব্যবসা প্রতিষ্ঠান।`,
      featuredProducts: featuredProducts.length > 0 ? featuredProducts : [
        { name: 'গুণগত মানের পণ্য সামগ্রী', price: 'ন্যায্য মূল্য' }
      ],
      discountOffer: discountOffer.trim() || undefined,
      openingHours: openingHours.trim() || 'সকাল ৮:০০ - রাত ৯:০০',
      homeDelivery,
      isVerified: true,
      rating: 5.0,
      reviewCount: 1,
      yearEstablished: Number(yearEstablished) || 2020,
      joinedDate: 'আজকে যুক্ত',
      reviews: [
        {
          id: `srev-init-${Date.now()}`,
          authorName: 'আমার শাহরাস্তি এডমিন',
          rating: 5,
          comment: 'দোকান ও ব্যবসা প্রতিষ্ঠানের মালিকের তথ্য নিশ্চিত করা হয়েছে। ব্যবসার সার্বিক উন্নতি কামনা করি।',
          date: 'আজকে',
          location: unionOrArea
        }
      ]
    };

    setTimeout(() => {
      onShopAdded(newShop);
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1800);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                দোকান বা ব্যবসা প্রতিষ্ঠান যুক্ত করুন
              </h3>
              <p className="text-xs text-slate-500">
                শাহরাস্তির ক্রেতাদের কাছে আপনার ব্যবসার প্রসার ঘটাতে তালিকাভুক্ত হোন
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
        <div className="overflow-y-auto p-5 sm:p-6 space-y-5">
          {isSuccess ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">
                অভিনন্দন! আপনার দোকান সফলভাবে যুক্ত হয়েছে
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                শাহরাস্তির সকল ক্রেতা এখন অ্যাপের মাধ্যমে আপনার দোকানের পণ্য, যোগাযোগের নম্বর ও বিশেষ অফার দেখতে পাবেন।
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* 1. Basic Info */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-emerald-800 tracking-wider uppercase flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5" />
                  <span>১. দোকানের সাধারণ তথ্য</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      দোকান / প্রতিষ্ঠানের নাম <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="যেমন: হাজী হার্ডওয়্যার অ্যান্ড স্যানিটারি"
                      className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      মালিক / পরিচালকের নাম <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder="যেমন: আলহাজ্ব মোঃ কামাল হোসেন"
                      className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      ব্যবসার ধরন / ক্যাটাগরি <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-medium"
                    >
                      {SHOP_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      ট্যাগলাইন বা স্লোগান (সংক্ষিপ্ত আকর্ষণ)
                    </label>
                    <input
                      type="text"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      placeholder="যেমন: ১০০% খাঁটি পণ্য ও ন্যায্য দামের নিশ্চয়তা"
                      className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Location in Shahrasti */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <h4 className="text-xs font-bold text-emerald-800 tracking-wider uppercase flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>২. অবস্থান ও বাজারের ঠিকানা (শাহরাস্তি)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      ইউনিয়ন / পৌরসভা (নং ছাড়া) <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={unionOrArea}
                      onChange={(e) => {
                        setUnionOrArea(e.target.value);
                        const area = SHAHRASHTI_AREAS.find((a) => a.name === e.target.value);
                        if (area && area.famousMarkets.length > 0) {
                          setMarketName(area.famousMarkets[0]);
                        }
                      }}
                      className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-medium"
                    >
                      {SHAHRASHTI_AREAS.map((area) => (
                        <option key={area.id} value={area.name}>
                          {area.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      বাজারের নাম <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={marketName}
                      onChange={(e) => setMarketName(e.target.value)}
                      placeholder="যেমন: ঠাকুরবাজার / চিতোষী বাজার"
                      className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-medium"
                    />
                    {selectedAreaObj && selectedAreaObj.famousMarkets.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1 text-[11px] text-slate-500">
                        <span>বাজার সাজেস্ট:</span>
                        {selectedAreaObj.famousMarkets.map((mkt) => (
                          <button
                            type="button"
                            key={mkt}
                            onClick={() => setMarketName(mkt)}
                            className="text-emerald-700 hover:underline"
                          >
                            {mkt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    দোকানের পূর্ণ ঠিকানা / মার্কেট ফ্লোর
                  </label>
                  <input
                    type="text"
                    value={fullAddress}
                    onChange={(e) => setFullAddress(e.target.value)}
                    placeholder="যেমন: পৌর প্লাজা মার্কেট (গ্রাউন্ড ফ্লোর), দোকান নং-১২, ঠাকুরবাজার"
                    className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* 3. Contact Numbers */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <h4 className="text-xs font-bold text-emerald-800 tracking-wider uppercase flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  <span>৩. যোগাযোগ নম্বর (সরাসরি কল ও হোয়াটসঅ্যাপ)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      মোবাইল নম্বর <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="01712-XXXXXX"
                      className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      হোয়াটসঅ্যাপ নম্বর (পণ্য ছবি আদান-প্রদানের জন্য)
                    </label>
                    <input
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="8801712XXXXXX"
                      className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Business Expansion Features (Offers & Delivery) */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <h4 className="text-xs font-bold text-emerald-800 tracking-wider uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>৪. ব্যবসার প্রসার ও বিশেষ অফার (বিক্রি বাড়ানোর জন্য)</span>
                </h4>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    চলমান বিশেষ অফার বা ডিসকাউন্ট (যদি থাকে)
                  </label>
                  <input
                    type="text"
                    value={discountOffer}
                    onChange={(e) => setDiscountOffer(e.target.value)}
                    placeholder="যেমন: নতুন বাড়ি নির্মাণে রড ও সিমেন্টে বিশেষ ছাড় এবং ফ্রি সাইট ডেলিভারি!"
                    className="w-full text-xs sm:text-sm p-2.5 bg-amber-50/60 border border-amber-200 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    টিপস: অফার দিলে ক্রেতাদের মনোযোগ বেশি আকৃষ্ট হয় ও বিক্রি বৃদ্ধি পায়।
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      খোলা থাকার সময়সূচি
                    </label>
                    <input
                      type="text"
                      value={openingHours}
                      onChange={(e) => setOpeningHours(e.target.value)}
                      placeholder="যেমন: প্রতিদিন সকাল ৮:০০ - রাত ৯:৩০"
                      className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      কত সালে ব্যবসা প্রতিষ্ঠিত
                    </label>
                    <input
                      type="number"
                      value={yearEstablished}
                      onChange={(e) => setYearEstablished(Number(e.target.value))}
                      placeholder="2015"
                      className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-mono"
                    />
                  </div>
                </div>

                {/* Home delivery toggle */}
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-700" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        হোম ডেলিভারি সুবিধা প্রদান করেন?
                      </span>
                      <span className="text-[11px] text-slate-500">
                        শাহরাস্তির আশেপাশের গ্রামে মালামাল পৌঁছে দেওয়ার সুবিধা
                      </span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={homeDelivery}
                    onChange={(e) => setHomeDelivery(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                </div>
              </div>

              {/* 5. Featured Products */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <h4 className="text-xs font-bold text-emerald-800 tracking-wider uppercase flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>৫. প্রধান পণ্য বা সেবাসমূহ (সর্বোচ্চ ৩টি)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <input
                    type="text"
                    value={prod1Name}
                    onChange={(e) => setProd1Name(e.target.value)}
                    placeholder="পণ্য ১: যেমন বিএসআরএম ৫০০ ডব্লিউ রড"
                    className="p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  />
                  <input
                    type="text"
                    value={prod1Price}
                    onChange={(e) => setProd1Price(e.target.value)}
                    placeholder="মূল্য বা রেট (যেমন: কোম্পানি রেট)"
                    className="p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <input
                    type="text"
                    value={prod2Name}
                    onChange={(e) => setProd2Name(e.target.value)}
                    placeholder="পণ্য ২: যেমন শাহ সিমেন্ট স্পেশাল"
                    className="p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  />
                  <input
                    type="text"
                    value={prod2Price}
                    onChange={(e) => setProd2Price(e.target.value)}
                    placeholder="মূল্য বা রেট (যেমন: ৳৫৩০ / ব্যাগ)"
                    className="p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <input
                    type="text"
                    value={prod3Name}
                    onChange={(e) => setProd3Name(e.target.value)}
                    placeholder="পণ্য ৩: যেমন বার্জার ওয়েদারকোট পেইন্ট"
                    className="p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  />
                  <input
                    type="text"
                    value={prod3Price}
                    onChange={(e) => setProd3Price(e.target.value)}
                    placeholder="মূল্য বা রেট (যেমন: পাইকারি রেট)"
                    className="p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              {/* 6. Description & Store Photo */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    দোকানের বিস্তারিত বর্ণনা ও বিশেষত্ব
                  </label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="আপনার দোকানের পণ্যের মান, কোম্পানির ডিলারশিপ, নিজস্ব পরিবহন বা বিশেষ সুবিধা সম্পর্কে লিখুন..."
                    className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    দোকানের সাইনবোর্ড বা সম্মুখ ছবি
                  </label>
                  <div className="flex items-center gap-3">
                    <img
                      src={photo}
                      alt="দোকানের প্রিভিউ"
                      className="w-16 h-12 rounded-lg object-cover border border-slate-300"
                    />
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg border border-slate-300 transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>গ্যালারি থেকে আপলোড করুন</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-98 rounded-lg shadow-sm transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isSubmitting ? 'সংরক্ষণ হচ্ছে...' : 'দোকান তালিকাভুক্ত করুন'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
