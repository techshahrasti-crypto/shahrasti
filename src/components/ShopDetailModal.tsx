import React, { useState } from 'react';
import {
  X,
  Phone,
  MessageSquare,
  MapPin,
  Star,
  CheckCircle2,
  Bookmark,
  Share2,
  Store,
  Clock,
  Truck,
  Sparkles,
  ShoppingBag,
  Send,
  User,
  Check,
  Calendar,
  Building2,
  Mail
} from 'lucide-react';
import { Review, ShopProfile } from '../types';

interface ShopDetailModalProps {
  shop: ShopProfile | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onAddReview: (shopId: string, review: Review) => void;
}

export const ShopDetailModal: React.FC<ShopDetailModalProps> = ({
  shop,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onAddReview
}) => {
  const [newRating, setNewRating] = useState(5);
  const [newAuthor, setNewAuthor] = useState('');
  const [newComment, setNewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!shop) return null;

  const handleShare = () => {
    const text = `${shop.name} - ${shop.tagline} (${shop.marketName}, ${shop.unionOrArea}, শাহরাস্তি)। মোবাইল: ${shop.phone}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    setSubmittingReview(true);

    const review: Review = {
      id: `srev-${Date.now()}`,
      authorName: newAuthor.trim(),
      rating: newRating,
      comment: newComment.trim(),
      date: 'আজকে',
      location: shop.unionOrArea
    };

    onAddReview(shop.id, review);
    setSubmittingReview(false);
    setReviewSuccess(true);
    setNewAuthor('');
    setNewComment('');
    setTimeout(() => setReviewSuccess(false), 3000);
  };

  const whatsappText = encodeURIComponent(
    `আসসালামু আলাইকুম, 'আমার শাহরাস্তি' অ্যাপের মাধ্যমে আপনার '${shop.name}' প্রতিষ্ঠানের পণ্য ও সেবার বিষয়ে জানতে যোগাযোগ করছি।`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Store className="w-3.5 h-3.5" />
              <span>দোকান ও ব্যবসা প্রোফাইল</span>
            </span>
            <span className="text-xs text-slate-500 font-mono">আইডি: {shop.id}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(shop.id)}
              className="p-1.5 text-slate-500 hover:text-amber-500 rounded-lg hover:bg-slate-200/60 transition-colors"
              title={isBookmarked ? 'বুকমার্ক থেকে সরান' : 'দোকান সেভ করুন'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200/60 transition-colors"
              title="শেয়ার করুন"
            >
              {copiedShare ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200/60 transition-colors"
              title="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Header Card: Store Photo, Info & Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <div className="relative w-full sm:w-44 h-40 sm:h-44 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
              {!imageError && shop.photo ? (
                <img
                  src={shop.photo}
                  alt={shop.name}
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-50 text-emerald-800 p-3 text-center">
                  <Store className="w-10 h-10 mb-1" />
                  <span className="text-xs font-bold">{shop.name}</span>
                </div>
              )}
              {shop.isVerified && (
                <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>যাচাইকৃত</span>
                </div>
              )}
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {shop.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium leading-relaxed">
                  {shop.tagline}
                </p>
              </div>

              {/* Location & Details */}
              <div className="space-y-1 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold text-slate-900">{shop.marketName}</span>
                  <span aria-hidden="true" className="text-slate-400">·</span>
                  <span>{shop.unionOrArea}, শাহরাস্তি</span>
                </div>
                <div className="text-xs text-slate-500 pl-5">
                  ঠিকানা: {shop.fullAddress}
                </div>
              </div>

              {/* Owner, Established & Hours */}
              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-600 pt-1">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>মালিক: <strong className="text-slate-800">{shop.ownerName}</strong></span>
                </span>

                {shop.yearEstablished && (
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>প্রতিষ্ঠিত: <strong>{shop.yearEstablished}</strong></span>
                  </span>
                )}

                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{shop.openingHours}</span>
                </span>
              </div>

              {/* Rating and Home Delivery Badge */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg text-xs font-semibold text-amber-900 font-mono">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{shop.rating.toFixed(1)}</span>
                  <span className="text-amber-700 font-normal">({shop.reviewCount} কাস্টমার রিভিউ)</span>
                </div>

                {shop.homeDelivery && (
                  <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-800 px-2.5 py-1 rounded-lg text-xs font-semibold">
                    <Truck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>হোম ডেলিভারি সুবিধা চালু</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Row: Direct Call & WhatsApp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <a
              href={`tel:${shop.phone}`}
              className="inline-flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-white bg-slate-900 rounded-xl hover:bg-slate-800 active:scale-98 transition-all shadow-xs text-center"
            >
              <Phone className="w-4 h-4" />
              <span>সরাসরি কল করুন ({shop.phone})</span>
            </a>

            <a
              href={`https://wa.me/${shop.whatsapp}?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-white bg-emerald-700 rounded-xl hover:bg-emerald-800 active:scale-98 transition-all shadow-xs text-center"
            >
              <MessageSquare className="w-4 h-4" />
              <span>হোয়াটসঅ্যাপে পণ্য ও দরদাম জানুন</span>
            </a>
          </div>

          {/* Ongoing Promotional Offer Banner (Crucial for expanding business) */}
          {shop.discountOffer && (
            <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl space-y-1">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>দোকানের চলমান বিশেষ অফার ও ছাড়:</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed pl-6">
                {shop.discountOffer}
              </p>
            </div>
          )}

          {/* Business Description */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-emerald-700" />
              <span>প্রতিষ্ঠান ও সেবার পরিচিতি</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {shop.description}
            </p>
          </div>

          {/* Featured Products & Services */}
          {shop.featuredProducts && shop.featuredProducts.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-emerald-700" />
                <span>প্রধান পণ্য ও সেবাসমূহ</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {shop.featuredProducts.map((prod, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white border border-slate-200 rounded-xl space-y-1 shadow-2xs hover:border-emerald-300 transition-colors"
                  >
                    <div className="font-semibold text-xs sm:text-sm text-slate-900">
                      {prod.name}
                    </div>
                    {prod.price && (
                      <div className="text-xs font-bold text-emerald-700 font-mono">
                        {prod.price}
                      </div>
                    )}
                    {prod.description && (
                      <p className="text-[11px] text-slate-500 leading-tight">
                        {prod.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Customer Reviews & Feedback Section */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-base text-slate-900 flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span>গ্রাহক মতামত ও রিভিউ ({shop.reviews.length})</span>
                </h4>
                <p className="text-xs text-slate-500">
                  শাহরাস্তির ক্রেতা সাধারণের বাস্তব অভিজ্ঞতা
                </p>
              </div>

              <div className="flex items-center gap-1 text-sm font-bold text-slate-900 font-mono bg-slate-100 px-3 py-1 rounded-lg">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{shop.rating.toFixed(1)} / ৫.০</span>
              </div>
            </div>

            {/* List of existing reviews */}
            <div className="space-y-3">
              {shop.reviews.map((r) => (
                <div key={r.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                        {r.authorName.charAt(0)}
                      </div>
                      <div>
                        <span className="font-semibold text-xs text-slate-800">{r.authorName}</span>
                        {r.location && (
                          <span className="text-[11px] text-slate-400 ml-1.5 font-normal">({r.location})</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 font-mono text-xs font-semibold text-amber-700">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{r.rating}.0</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-9">
                    {r.comment}
                  </p>
                  <div className="text-[10px] text-slate-400 pl-9 font-mono">
                    {r.date}
                  </div>
                </div>
              ))}
            </div>

            {/* Write a review form */}
            <form onSubmit={handleReviewSubmit} className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-3">
              <span className="font-bold text-xs sm:text-sm text-emerald-900 block">
                এই দোকান বা প্রতিষ্ঠান সম্পর্কে আপনার অভিজ্ঞতা জানান:
              </span>

              {reviewSuccess && (
                <div className="p-2 bg-emerald-100 text-emerald-800 text-xs rounded-lg flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>আপনার মূল্যবান রিভিউটি সফলভাবে যুক্ত হয়েছে! ধন্যবাদ।</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    আপনার নাম
                  </label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="যেমন: মোঃ জাহিদ হাসান"
                    className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    রেটিং নির্বাচন
                  </label>
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (৫ - অসাধারণ)</option>
                    <option value={4}>⭐⭐⭐⭐ (৪ - খুব ভালো)</option>
                    <option value={3}>⭐⭐⭐ (৩ - ভালো)</option>
                    <option value={2}>⭐⭐ (২ - চলনসই)</option>
                    <option value={1}>⭐ (১ - সন্তোষজনক নয়)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  আপনার মন্তব্য / অভিজ্ঞতা
                </label>
                <textarea
                  required
                  rows={2}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="পণ্য বা সেবার মান, দাম ও আচরণ সম্পর্কে আপনার বাস্তব মতামত লিখুন..."
                  className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={submittingReview}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>রিভিউ জমা দিন</span>
              </button>
            </form>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>আমার শাহরাস্তি · স্থানীয় ব্যবসা প্রসার নেটওয়ার্ক</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-semibold transition-colors"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
