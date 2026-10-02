import React, { useState, useEffect } from 'react';
import {
  X,
  Upload,
  CheckCircle2,
  User,
  Phone,
  MapPin,
  Briefcase,
  Wrench,
  Camera,
  Eye,
  LogOut,
  Sparkles,
  Store,
  ShoppingBag,
  Clock,
  Truck,
  AlertCircle
} from 'lucide-react';
import { FeaturedProduct, ShopProfile, UserSession, WorkerProfile } from '../types';
import { PROFESSION_CATEGORIES, CATEGORY_GROUPS } from '../data/categories';
import { SHOP_CATEGORIES } from '../data/shopCategories';
import { SHAHRASHTI_AREAS } from '../data/shahrastiData';

interface MemberProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserSession | null;
  existingWorker: WorkerProfile | null;
  existingShop?: ShopProfile | null;
  onSaveProfile: (updatedWorker: WorkerProfile) => void;
  onSaveShopProfile?: (updatedShop: ShopProfile) => void;
  onLogout: () => void;
  onViewLiveProfile?: (worker: WorkerProfile) => void;
  onViewLiveShop?: (shop: ShopProfile) => void;
}

export const MemberProfileModal: React.FC<MemberProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  existingWorker,
  existingShop,
  onSaveProfile,
  onSaveShopProfile,
  onLogout,
  onViewLiveProfile,
  onViewLiveShop
}) => {
  const [activeProfileTab, setActiveProfileTab] = useState<'worker' | 'shop'>('worker');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Worker Profile States
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [category, setCategory] = useState('electrician');
  const [unionOrArea, setUnionOrArea] = useState('শাহরাস্তি পৌরসভা');
  const [village, setVillage] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [photo, setPhoto] = useState('');
  const [experienceYears, setExperienceYears] = useState(5);
  const [dailyRate, setDailyRate] = useState('৳৮৫০ / দিন');
  const [callOutFee, setCallOutFee] = useState('৳২০০');
  const [bio, setBio] = useState('');
  const [specialtiesInput, setSpecialtiesInput] = useState('');
  const [toolsInput, setToolsInput] = useState('');
  const [portfolioImages, setPortfolioImages] = useState<string[]>([]);
  const [availability, setAvailability] = useState<'available' | 'busy'>('available');

  // Shop Profile States
  const [shopName, setShopName] = useState('');
  const [shopTagline, setShopTagline] = useState('');
  const [shopCategory, setShopCategory] = useState('hardware_sanitary');
  const [shopOwnerName, setShopOwnerName] = useState('');
  const [shopUnion, setShopUnion] = useState('শাহরাস্তি পৌরসভা');
  const [shopMarket, setShopMarket] = useState('ঠাকুরবাজার');
  const [shopAddress, setShopAddress] = useState('');
  const [shopPhone, setShopPhone] = useState('');
  const [shopWhatsapp, setShopWhatsapp] = useState('');
  const [shopPhoto, setShopPhoto] = useState('');
  const [shopDescription, setShopDescription] = useState('');
  const [shopDiscount, setShopDiscount] = useState('');
  const [shopHours, setShopHours] = useState('সকাল ৮:০০ - রাত ৯:০০');
  const [shopDelivery, setShopDelivery] = useState(true);
  const [shopYear, setShopYear] = useState(2018);
  const [shopProd1, setShopProd1] = useState('');
  const [shopProd1Price, setShopProd1Price] = useState('');
  const [shopProd2, setShopProd2] = useState('');
  const [shopProd2Price, setShopProd2Price] = useState('');

  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [shopSaveSuccess, setShopSaveSuccess] = useState(false);

  // Initialize Worker form
  useEffect(() => {
    if (existingWorker) {
      setName(existingWorker.name || '');
      setProfession(existingWorker.profession || '');
      setCategory(existingWorker.category || 'electrician');
      setUnionOrArea(existingWorker.unionOrArea || 'শাহরাস্তি পৌরসভা');
      setVillage(existingWorker.village || '');
      setPhone(existingWorker.phone || '');
      setWhatsapp(existingWorker.whatsapp ? existingWorker.whatsapp.replace(/^88/, '') : '');
      setPhoto(existingWorker.photo || currentUser?.avatar || '');
      setExperienceYears(existingWorker.experienceYears || 5);
      setDailyRate(existingWorker.dailyRate || '৳৮৫০ / দিন');
      setCallOutFee(existingWorker.callOutFee || '৳২০০');
      setBio(existingWorker.bio || '');
      setSpecialtiesInput(existingWorker.specialties ? existingWorker.specialties.join(', ') : '');
      setToolsInput(existingWorker.toolsOwned ? existingWorker.toolsOwned.join(', ') : '');
      setPortfolioImages(existingWorker.portfolioImages || []);
      setAvailability(existingWorker.availability === 'busy' ? 'busy' : 'available');
    } else if (currentUser) {
      setName(currentUser.name || '');
      setPhoto(currentUser.avatar || '');
      setProfession('');
      setCategory('electrician');
      setUnionOrArea('শাহরাস্তি পৌরসভা');
      setVillage('');
      setPhone('');
      setWhatsapp('');
      setExperienceYears(3);
      setDailyRate('৳৮০০ / দিন');
      setCallOutFee('৳২০০');
      setBio('');
      setSpecialtiesInput('');
      setToolsInput('');
      setPortfolioImages([]);
      setAvailability('available');
    }

    // Initialize Shop form
    if (existingShop) {
      setShopName(existingShop.name || '');
      setShopTagline(existingShop.tagline || '');
      setShopCategory(existingShop.category || 'hardware_sanitary');
      setShopOwnerName(existingShop.ownerName || currentUser?.name || '');
      setShopUnion(existingShop.unionOrArea || 'শাহরাস্তি পৌরসভা');
      setShopMarket(existingShop.marketName || 'ঠাকুরবাজার');
      setShopAddress(existingShop.fullAddress || '');
      setShopPhone(existingShop.phone || '');
      setShopWhatsapp(existingShop.whatsapp ? existingShop.whatsapp.replace(/^88/, '') : '');
      setShopPhoto(existingShop.photo || '');
      setShopDescription(existingShop.description || '');
      setShopDiscount(existingShop.discountOffer || '');
      setShopHours(existingShop.openingHours || 'সকাল ৮:০০ - রাত ৯:০০');
      setShopDelivery(existingShop.homeDelivery ?? true);
      setShopYear(existingShop.yearEstablished || 2018);
      if (existingShop.featuredProducts?.[0]) {
        setShopProd1(existingShop.featuredProducts[0].name);
        setShopProd1Price(existingShop.featuredProducts[0].price || '');
      }
      if (existingShop.featuredProducts?.[1]) {
        setShopProd2(existingShop.featuredProducts[1].name);
        setShopProd2Price(existingShop.featuredProducts[1].price || '');
      }
    } else if (currentUser) {
      setShopOwnerName(currentUser.name || '');
      setShopUnion('শাহরাস্তি পৌরসভা');
      setShopMarket('ঠাকুরবাজার');
      setShopPhoto('https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=800&auto=format&fit=crop&q=80');
    }
  }, [existingWorker, existingShop, currentUser, isOpen]);

  if (!isOpen || !currentUser) return null;

  const selectedAreaObj = SHAHRASHTI_AREAS.find((a) => a.name === unionOrArea);
  const selectedShopAreaObj = SHAHRASHTI_AREAS.find((a) => a.name === shopUnion);

  // Handle Photo Upload
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

  // Handle Shop Photo Upload
  const handleShopPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setShopPhoto(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Worker Profile
  const handleSubmitWorker = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim() || !profession.trim() || !phone.trim()) {
      setFormError('অনুগ্রহ করে নাম, পেশা এবং মোবাইল নম্বর সঠিকভাবে পূরণ করুন।');
      return;
    }

    setIsSubmitting(true);

    const specialtiesList = specialtiesInput
      ? specialtiesInput.split(',').map((s) => s.trim()).filter(Boolean)
      : ['কাজের সাধারণ অভিজ্ঞতা'];

    const toolsList = toolsInput
      ? toolsInput.split(',').map((t) => t.trim()).filter(Boolean)
      : ['উন্নত কাজের যন্ত্রপাতি'];

    const cleanWhatsapp = whatsapp.trim() || phone.trim().replace(/[^0-9]/g, '');
    const workerId = existingWorker?.id || `worker-user-${currentUser.id}`;

    const updatedProfile: WorkerProfile = {
      id: workerId,
      userId: currentUser.id,
      name: name.trim(),
      profession: profession.trim(),
      category,
      division: 'চট্টগ্রাম',
      district: 'চাঁদপুর',
      upazila: 'শাহরাস্তি',
      unionOrArea,
      village: village.trim(),
      phone: phone.trim(),
      whatsapp: cleanWhatsapp.startsWith('880') ? cleanWhatsapp : `880${cleanWhatsapp.replace(/^0/, '')}`,
      photo: photo || currentUser.avatar,
      experienceYears: Number(experienceYears) || 3,
      dailyRate: dailyRate.trim() || '৳৮৫০ / দিন',
      callOutFee: callOutFee.trim() || '৳২০০',
      bio: bio.trim() || `${name} শাহরাস্তি উপজেলার একজন নিবন্ধিত দক্ষ কারিগর।`,
      specialties: specialtiesList,
      toolsOwned: toolsList,
      portfolioImages: portfolioImages.length > 0 ? portfolioImages : [photo || currentUser.avatar],
      rating: existingWorker?.rating || 5.0,
      reviewCount: existingWorker?.reviewCount || 1,
      completedJobs: existingWorker?.completedJobs || 1,
      isVerified: true,
      nidVerified: true,
      availability,
      joinedDate: existingWorker?.joinedDate || 'আজকে আপডেট',
      reviews: existingWorker?.reviews || [
        {
          id: `rev-initial-${Date.now()}`,
          authorName: 'আমার শাহরাস্তি সদস্য ভেরিফিকেশন',
          rating: 5,
          comment: 'সদস্য একাউন্ট ও মোবাইল নম্বর সফলভাবে নিশ্চিত করা হয়েছে।',
          date: 'আজকে',
          location: unionOrArea
        }
      ]
    };

    onSaveProfile(updatedProfile);
    setIsSubmitting(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  // Submit Shop Profile
  const handleSubmitShop = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!shopName.trim() || !shopPhone.trim() || !shopOwnerName.trim()) {
      setFormError('অনুগ্রহ করে প্রতিষ্ঠানের নাম, মালিকের নাম এবং মোবাইল নম্বর সঠিকভাবে পূরণ করুন।');
      return;
    }

    if (!onSaveShopProfile) return;

    setIsSubmitting(true);

    const featuredProducts: FeaturedProduct[] = [];
    if (shopProd1.trim()) {
      featuredProducts.push({ name: shopProd1.trim(), price: shopProd1Price.trim() || undefined });
    }
    if (shopProd2.trim()) {
      featuredProducts.push({ name: shopProd2.trim(), price: shopProd2Price.trim() || undefined });
    }

    const cleanWhatsapp = shopWhatsapp.trim() || shopPhone.trim().replace(/[^0-9]/g, '');
    const shopId = existingShop?.id || `shop-user-${currentUser.id}`;

    const updatedShop: ShopProfile = {
      id: shopId,
      userId: currentUser.id,
      name: shopName.trim(),
      tagline: shopTagline.trim() || `${shopUnion}-র বিশ্বস্ত দোকান ও বাণিজ্যিক প্রতিষ্ঠান`,
      category: shopCategory,
      ownerName: shopOwnerName.trim(),
      unionOrArea: shopUnion,
      marketName: shopMarket.trim() || 'প্রধান বাজার',
      fullAddress: shopAddress.trim() || `${shopMarket}, ${shopUnion}, শাহরাস্তি`,
      phone: shopPhone.trim(),
      whatsapp: cleanWhatsapp.startsWith('880') ? cleanWhatsapp : `880${cleanWhatsapp.replace(/^0/, '')}`,
      photo: shopPhoto || 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=800&auto=format&fit=crop&q=80',
      description: shopDescription.trim() || `${shopName} শাহরাস্তির ${shopMarket} এ অবস্থিত একটি প্রতিষ্ঠিত ব্যবসায়িক প্রতিষ্ঠান।`,
      featuredProducts: featuredProducts.length > 0 ? featuredProducts : [
        { name: 'গুণগত মানের পণ্য সামগ্রী', price: 'ন্যায্য মূল্য' }
      ],
      discountOffer: shopDiscount.trim() || undefined,
      openingHours: shopHours.trim() || 'সকাল ৮:০০ - রাত ৯:০০',
      homeDelivery: shopDelivery,
      isVerified: true,
      rating: existingShop?.rating || 5.0,
      reviewCount: existingShop?.reviewCount || 1,
      yearEstablished: Number(shopYear) || 2020,
      joinedDate: existingShop?.joinedDate || 'আজকে যুক্ত',
      reviews: existingShop?.reviews || [
        {
          id: `srev-init-${Date.now()}`,
          authorName: 'আমার শাহরাস্তি সদস্য ভেরিফিকেশন',
          rating: 5,
          comment: 'দোকান মালিকের তথ্য ও অবস্থান নিশ্চিত করা হয়েছে।',
          date: 'আজকে',
          location: shopUnion
        }
      ]
    };

    onSaveShopProfile(updatedShop);
    setIsSubmitting(false);
    setShopSaveSuccess(true);
    setTimeout(() => setShopSaveSuccess(false), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-emerald-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-600 shrink-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                  সদস্য প্রোফাইল ও তথ্য হালনাগাদ
                </h3>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                  {currentUser.provider === 'google' ? 'Google কানেক্টেড' : 'Facebook কানেক্টেড'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono">
                {currentUser.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {showLogoutConfirm ? (
              <div className="flex items-center gap-1.5 bg-red-50 p-1 rounded-lg border border-red-200 text-xs">
                <span className="text-red-700 text-[11px] font-semibold pl-1">লগআউট করবেন?</span>
                <button
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="px-2 py-0.5 bg-red-600 text-white rounded text-[11px] font-bold hover:bg-red-700"
                >
                  হ্যাঁ
                </button>
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded text-[11px] hover:bg-slate-300"
                >
                  না
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="p-1.5 text-slate-500 hover:text-red-600 rounded-lg hover:bg-slate-200/60 transition-colors"
                title="লগআউট"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200/60 transition-colors"
              title="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher between Worker Profile & Shop Profile */}
        <div className="flex items-center border-b border-slate-200 bg-slate-50 px-5 pt-2">
          <button
            onClick={() => {
              setActiveProfileTab('worker');
              setFormError('');
            }}
            className={`flex items-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeProfileTab === 'worker'
                ? 'border-emerald-600 text-emerald-800 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4 text-emerald-600" />
            <span>আমার কারিগর / পেশাজীবী প্রোফাইল</span>
            {existingWorker && (
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            )}
          </button>

          <button
            onClick={() => {
              setActiveProfileTab('shop');
              setFormError('');
            }}
            className={`flex items-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeProfileTab === 'shop'
                ? 'border-emerald-600 text-emerald-800 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Store className="w-4 h-4 text-emerald-600" />
            <span>আমার দোকান / ব্যবসা প্রতিষ্ঠান</span>
            {existingShop && (
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            )}
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          {formError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{formError}</span>
            </div>
          )}

          {/* TAB 1: WORKER PROFILE */}
          {activeProfileTab === 'worker' && (
            <>
              {saveSuccess && (
                <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl flex items-center justify-between text-xs text-emerald-900">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                    <span>আপনার পেশাগত কর্মী প্রোফাইল সফলভাবে আপডেট করা হয়েছে!</span>
                  </div>
                  {existingWorker && onViewLiveProfile && (
                    <button
                      onClick={() => onViewLiveProfile(existingWorker)}
                      className="inline-flex items-center gap-1 font-bold underline hover:text-emerald-950"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>লাইভ দেখুন</span>
                    </button>
                  )}
                </div>
              )}

              <form onSubmit={handleSubmitWorker} className="space-y-5">
                {/* 1. Basic Info */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-emerald-800 tracking-wider uppercase flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span>১. সাধারণ তথ্য ও ছবি</span>
                  </h4>

                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <div className="flex flex-col items-center gap-2 shrink-0">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 border-2 border-emerald-500">
                        <img
                          src={photo || currentUser.avatar}
                          alt={name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <label className="cursor-pointer inline-flex items-center gap-1 px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold rounded border border-slate-300">
                        <Camera className="w-3 h-3" />
                        <span>ছবি বদলান</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="flex-1 w-full space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          আপনার পূর্ণ নাম <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="যেমন: মোঃ কবির হোসেন"
                          className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-medium"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            পেশার ক্যাটাগরি <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full text-xs sm:text-sm p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-medium"
                          >
                            {CATEGORY_GROUPS.map((group) => {
                              const groupCats = PROFESSION_CATEGORIES.filter(
                                (c) => c.group === group && c.id !== 'all'
                              );
                              if (groupCats.length === 0) return null;
                              return (
                                <optgroup key={group} label={group}>
                                  {groupCats.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                      {cat.name}
                                    </option>
                                  ))}
                                </optgroup>
                              );
                            })}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            আপনার কাজের সুনির্দিষ্ট পদবি <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                            placeholder="যেমন: সিনিয়র হাউস ওয়্যারিং মিস্ত্রি"
                            className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Shahrasti Location */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-emerald-800 tracking-wider uppercase flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>২. শাহরাস্তিতে আপনার ইউনিয়ন ও ঠিকানা</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        ইউনিয়ন / পৌরসভা (নং ছাড়া) <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={unionOrArea}
                        onChange={(e) => setUnionOrArea(e.target.value)}
                        className="w-full text-xs sm:text-sm p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-medium"
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
                        গ্রাম বা পাড়ার নাম
                      </label>
                      <input
                        type="text"
                        value={village}
                        onChange={(e) => setVillage(e.target.value)}
                        placeholder="যেমন: সুন্দ্রা, খিলা, শোল্লা ইত্যাদি"
                        className="w-full text-xs sm:text-sm p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Phone & WhatsApp */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-emerald-800 tracking-wider uppercase flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" />
                    <span>৩. যোগাযোগের নম্বর</span>
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
                        className="w-full text-xs sm:text-sm p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        হোয়াটসঅ্যাপ নম্বর
                      </label>
                      <input
                        type="tel"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="8801712XXXXXX"
                        className="w-full text-xs sm:text-sm p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Rates & Experience */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-emerald-800 tracking-wider uppercase flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>৪. কাজের অভিজ্ঞতা ও পারিশ্রমিক</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        অভিজ্ঞতা (বছর)
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={45}
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(Number(e.target.value))}
                        className="w-full text-xs sm:text-sm p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        দৈনিক হাজিরা / পারিশ্রমিক
                      </label>
                      <input
                        type="text"
                        value={dailyRate}
                        onChange={(e) => setDailyRate(e.target.value)}
                        placeholder="যেমন: ৳৮৫০ / দিন"
                        className="w-full text-xs sm:text-sm p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        ভিজিট / কল আউট ফি
                      </label>
                      <input
                        type="text"
                        value={callOutFee}
                        onChange={(e) => setCallOutFee(e.target.value)}
                        placeholder="যেমন: ৳২০০"
                        className="w-full text-xs sm:text-sm p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      কাজের বিশেষ দক্ষতা (কমা দিয়ে আলাদা করুন)
                    </label>
                    <input
                      type="text"
                      value={specialtiesInput}
                      onChange={(e) => setSpecialtiesInput(e.target.value)}
                      placeholder="যেমন: হাউস ওয়্যারিং, শর্ট সার্কিট ফল্ট ফাইন্ডিং, মোটর কন্ট্রোল"
                      className="w-full text-xs sm:text-sm p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      আপনার কাজের সংক্ষিপ্ত পরিচিতি ও বিবরণ
                    </label>
                    <textarea
                      rows={2}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="আপনার কাজের সততা, কাজের এলাকা ও গ্রাহকদের সুবিধার বিষয়ে লিখুন..."
                      className="w-full text-xs sm:text-sm p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-slate-700">বর্তমান কাজের অবস্থা:</span>
                    <label className="inline-flex items-center gap-1.5 text-xs font-medium cursor-pointer">
                      <input
                        type="radio"
                        name="avail"
                        checked={availability === 'available'}
                        onChange={() => setAvailability('available')}
                        className="text-emerald-600"
                      />
                      <span>কাজের জন্য ফ্রি আছেন</span>
                    </label>
                    <label className="inline-flex items-center gap-1.5 text-xs font-medium cursor-pointer">
                      <input
                        type="radio"
                        name="avail"
                        checked={availability === 'busy'}
                        onChange={() => setAvailability('busy')}
                        className="text-emerald-600"
                      />
                      <span>বর্তমানে ব্যস্ত</span>
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    বন্ধ করুন
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 text-xs sm:text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm"
                  >
                    {isSubmitting ? 'আপডেট হচ্ছে...' : 'কর্মী প্রোফাইল সংরক্ষণ করুন'}
                  </button>
                </div>
              </form>
            </>
          )}

          {/* TAB 2: SHOP / BUSINESS PROFILE */}
          {activeProfileTab === 'shop' && (
            <>
              {shopSaveSuccess && (
                <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl flex items-center justify-between text-xs text-emerald-900">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                    <span>আপনার দোকান ও ব্যবসায়িক তথ্য সফলভাবে আপডেট হয়েছে!</span>
                  </div>
                  {existingShop && onViewLiveShop && (
                    <button
                      onClick={() => onViewLiveShop(existingShop)}
                      className="inline-flex items-center gap-1 font-bold underline hover:text-emerald-950"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>দোকান লাইভ দেখুন</span>
                    </button>
                  )}
                </div>
              )}

              <form onSubmit={handleSubmitShop} className="space-y-5">
                <div className="p-3.5 bg-gradient-to-r from-amber-50 to-emerald-50 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
                  <strong className="font-bold flex items-center gap-1.5 text-amber-900">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>ব্যবসার প্রসার ও স্থানীয় বাজার প্রচার:</span>
                  </strong>
                  <p className="text-slate-700 leading-relaxed">
                    আপনার দোকান বা বাণিজ্যিক প্রতিষ্ঠানের সঠিক মার্কেট লোকেশন, পণ্য ও অফার যুক্ত রাখুন যেন শাহরাস্তির যেকোনো প্রান্ত থেকে গ্রাহকরা সরাসরি আপনার সাথে ব্যবসা করতে পারেন।
                  </p>
                </div>

                {/* 1. Shop Info */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-emerald-800 tracking-wider uppercase flex items-center gap-1.5">
                    <Store className="w-3.5 h-3.5" />
                    <span>১. প্রতিষ্ঠানের বিবরণ</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        দোকান / প্রতিষ্ঠানের নাম <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={shopName}
                        onChange={(e) => setShopName(e.target.value)}
                        placeholder="যেমন: মেসার্স হাজী হার্ডওয়্যার অ্যান্ড স্যানিটারি"
                        className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        মালিক / পরিচালকের নাম <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={shopOwnerName}
                        onChange={(e) => setShopOwnerName(e.target.value)}
                        placeholder="যেমন: আলহাজ্ব মোঃ কামাল হোসেন"
                        className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        ব্যবসার ক্যাটাগরি <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={shopCategory}
                        onChange={(e) => setShopCategory(e.target.value)}
                        className="w-full text-xs sm:text-sm p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium"
                      >
                        {SHOP_CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        ট্যাগলাইন বা স্লোগান
                      </label>
                      <input
                        type="text"
                        value={shopTagline}
                        onChange={(e) => setShopTagline(e.target.value)}
                        placeholder="যেমন: রড, সিমেন্ট ও রঙের পাইকারি কেন্দ্র"
                        className="w-full text-xs sm:text-sm p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Shop Location & Market */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-emerald-800 tracking-wider uppercase flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>২. বাজারের নাম ও ঠিকানা (শাহরাস্তি)</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        ইউনিয়ন / এলাকা (নং ছাড়া) <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={shopUnion}
                        onChange={(e) => setShopUnion(e.target.value)}
                        className="w-full text-xs sm:text-sm p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium"
                      >
                        {SHAHRASHTI_AREAS.map((a) => (
                          <option key={a.id} value={a.name}>
                            {a.name}
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
                        value={shopMarket}
                        onChange={(e) => setShopMarket(e.target.value)}
                        placeholder="যেমন: ঠাকুরবাজার / চিতোষী বাজার"
                        className="w-full text-xs sm:text-sm p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      দোকানের সঠিক মার্কেট ঠিকানা
                    </label>
                    <input
                      type="text"
                      value={shopAddress}
                      onChange={(e) => setShopAddress(e.target.value)}
                      placeholder="যেমন: পৌর প্লাজা মার্কেট (গ্রাউন্ড ফ্লোর), ঠাকুরবাজার"
                      className="w-full text-xs sm:text-sm p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>
                </div>

                {/* 3. Shop Contact */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-emerald-800 tracking-wider uppercase flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" />
                    <span>৩. যোগাযোগের নম্বর</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        মোবাইল নম্বর <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={shopPhone}
                        onChange={(e) => setShopPhone(e.target.value)}
                        placeholder="01712-XXXXXX"
                        className="w-full text-xs sm:text-sm p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        হোয়াটসঅ্যাপ নম্বর
                      </label>
                      <input
                        type="tel"
                        value={shopWhatsapp}
                        onChange={(e) => setShopWhatsapp(e.target.value)}
                        placeholder="8801712XXXXXX"
                        className="w-full text-xs sm:text-sm p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Special Offers & Expansion */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-emerald-800 tracking-wider uppercase flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>৪. চলমান বিশেষ অফার ও গ্রাহক সুবিধা</span>
                  </h4>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      বিশেষ ছাড় বা প্রমোশনাল অফার (যদি থাকে)
                    </label>
                    <input
                      type="text"
                      value={shopDiscount}
                      onChange={(e) => setShopDiscount(e.target.value)}
                      placeholder="যেমন: বাড়ি নির্মাণে সম্পূর্ণ অর্ডারে বিশেষ ছাড় ও ফ্রি পরিবহন!"
                      className="w-full text-xs sm:text-sm p-2.5 bg-amber-50/60 border border-amber-200 rounded-lg text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        খোলা থাকার সময়সূচি
                      </label>
                      <input
                        type="text"
                        value={shopHours}
                        onChange={(e) => setShopHours(e.target.value)}
                        placeholder="সকাল ৮:০০ - রাত ৯:৩০"
                        className="w-full text-xs sm:text-sm p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>

                    <div className="flex items-center pt-5">
                      <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                        <input
                          type="checkbox"
                          checked={shopDelivery}
                          onChange={(e) => setShopDelivery(e.target.checked)}
                          className="w-4 h-4 text-emerald-600 rounded"
                        />
                        <Truck className="w-4 h-4 text-emerald-700" />
                        <span>হোম ডেলিভারি সুবিধা আছে</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    বন্ধ করুন
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 text-xs sm:text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm"
                  >
                    {isSubmitting ? 'আপডেট হচ্ছে...' : 'দোকান তথ্য সংরক্ষণ করুন'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
