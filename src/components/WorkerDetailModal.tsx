import React, { useState } from 'react';
import {
  X,
  Phone,
  MessageSquare,
  MapPin,
  Star,
  CheckCircle2,
  Briefcase,
  Wrench,
  Calendar,
  Share2,
  Bookmark,
  Send,
  User,
  ShieldCheck,
  Check
} from 'lucide-react';
import { Review, WorkerProfile } from '../types';

interface WorkerDetailModalProps {
  worker: WorkerProfile | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onOpenHireModal: (worker: WorkerProfile) => void;
  onAddReview: (workerId: string, review: Review) => void;
}

export const WorkerDetailModal: React.FC<WorkerDetailModalProps> = ({
  worker,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onOpenHireModal,
  onAddReview
}) => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newLocation, setNewLocation] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  if (!worker) return null;

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(worker.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${worker.name} - ${worker.profession}`,
        text: `উপজেলা কর্মী ডিরেক্টরিতে ${worker.name} (${worker.profession}, ${worker.upazila}) এর প্রোফাইল দেখুন। মোবাইল: ${worker.phone}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('প্রোফাইল লিংক কপি করা হয়েছে!');
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    setSubmittingReview(true);
    const review: Review = {
      id: `rev-${Date.now()}`,
      authorName: newAuthor.trim(),
      rating: newRating,
      comment: newComment.trim(),
      location: newLocation.trim() || worker.upazila,
      date: 'আজকে'
    };

    onAddReview(worker.id, review);
    setSubmittingReview(false);
    setReviewSuccess(true);
    setNewAuthor('');
    setNewComment('');
    setTimeout(() => setReviewSuccess(false), 3000);
  };

  const whatsappText = encodeURIComponent(
    `আসসালামু আলাইকুম ${worker.name} ভাই, আমার শাহরাস্তি ডিরেক্টরি থেকে আপনার বিস্তারিত প্রোফাইল দেখে কাজের বিষয়ে কথা বলতে চাচ্ছিলাম। আপনি কি ফ্রি আছেন?`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
              কর্মী প্রোফাইল
            </span>
            <span className="text-xs text-slate-500">আইডি: {worker.id}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(worker.id)}
              className="p-1.5 text-slate-500 hover:text-amber-500 rounded-lg hover:bg-slate-200/60 transition-colors"
              title="বুকমার্ক করুন"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200/60 transition-colors"
              title="প্রোফাইল শেয়ার করুন"
            >
              <Share2 className="w-4 h-4" />
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
          {/* Header Card: Photo, Info, and Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden bg-slate-100 border-2 border-slate-200 shrink-0">
              <img
                src={worker.photo}
                alt={worker.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80';
                }}
                className="w-full h-full object-cover object-top"
              />
              {worker.isVerified && (
                <div className="absolute top-2 right-2 bg-blue-600 text-white p-1 rounded-full shadow-md" title="যাচাইকৃত কারিগর">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {worker.name}
                </h2>
                {worker.isVerified && (
                  <span className="inline-flex items-center gap-1 text-xs text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    জাতীয় পরিচয়পত্র যাচাইকৃত
                  </span>
                )}
              </div>

              <p className="text-sm sm:text-base font-semibold text-emerald-800">
                {worker.profession}
              </p>

              {/* Location */}
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-600">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-900">{worker.unionOrArea}</span>
                {worker.village && (
                  <>
                    <span>·</span>
                    <span className="text-slate-700">{worker.village}</span>
                  </>
                )}
                <span>·</span>
                <span className="text-slate-500">শাহরাস্তি, চাঁদপুর</span>
              </div>

              {/* Stats Bar */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-600">
                <div className="flex items-center gap-1 text-amber-600 font-bold font-mono">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{worker.rating.toFixed(1)}</span>
                  <span className="font-normal text-slate-500">({worker.reviewCount} রিভিউ)</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4 text-slate-400" />
                  <span>{worker.experienceYears} বছরের অভিজ্ঞতা</span>
                </div>
                <span>·</span>
                <div>
                  <span className="font-mono tabular-nums font-semibold text-slate-800">{worker.completedJobs}টি</span> কাজ সম্পন্ন
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Contact Strip */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Direct Dial Call */}
            <a
              href={`tel:${worker.phone}`}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 text-white rounded-lg font-semibold text-sm hover:bg-slate-800 transition-colors shadow-xs"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>সরাসরি কল ({worker.phone})</span>
            </a>

            {/* Direct WhatsApp */}
            <a
              href={`https://wa.me/${worker.whatsapp}?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 bg-emerald-700 text-white rounded-lg font-semibold text-sm hover:bg-emerald-800 transition-colors shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>হোয়াটসঅ্যাপ মেসেজ</span>
            </a>

            {/* Book / Hire Request */}
            <button
              onClick={() => onOpenHireModal(worker)}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-white text-emerald-800 border border-emerald-300 rounded-lg font-semibold text-sm hover:bg-emerald-50 transition-colors"
            >
              <Calendar className="w-4 h-4 text-emerald-700" />
              <span>কাজে বুক করুন</span>
            </button>
          </div>

          {/* Rate Card & Terms */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                পারিশ্রমিক ও ভিজিট রেট
              </h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">দৈনিক / চুক্তিভিত্তিক হাজিরা:</span>
                  <span className="font-bold text-slate-900">{worker.dailyRate}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-600">প্রাথমিক ভিজিট / পরিদর্শন ফি:</span>
                  <span className="font-bold text-slate-900">{worker.callOutFee}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                যোগাযোগের তথ্য
              </h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-600">মোবাইল নম্বর:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold text-slate-900">{worker.phone}</span>
                    <button
                      onClick={handleCopyPhone}
                      className="text-xs text-emerald-700 hover:underline"
                    >
                      {copiedPhone ? 'কপি হয়েছে!' : 'কপি'}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-600">যোগদানের সময়:</span>
                  <span className="text-slate-800">{worker.joinedDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* About & Bio */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900">
              অভিজ্ঞতা ও বিস্তারিত বিবরণ
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              {worker.bio}
            </p>
          </div>

          {/* Key Specialties */}
          {worker.specialties && worker.specialties.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-slate-900">
                বিশেষ দক্ষতা ও কাজের ক্ষেত্র
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                {worker.specialties.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-slate-800">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tools & Equipment */}
          {worker.toolsOwned && worker.toolsOwned.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-slate-500" />
                <span>ব্যবহৃত নিজস্ব সরঞ্জাম ও আধুনিক যন্ত্রপাতি</span>
              </h4>
              <div className="flex flex-wrap gap-2 text-xs">
                {worker.toolsOwned.map((tool, i) => (
                  <span
                    key={i}
                    className="bg-slate-100 border border-slate-200 px-3 py-1 rounded-md text-slate-700"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Work Portfolio / Sample Work Photos */}
          {worker.portfolioImages && worker.portfolioImages.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-slate-900">
                পূর্বের সম্পন্ন কাজের নমুনা ছবি
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {worker.portfolioImages.map((img, i) => (
                  <div key={i} className="aspect-4/3 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                    <img
                      src={img}
                      alt={`কাজের নমুনা ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Client Reviews Section */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>গ্রাহক মতামত ও রিভিউ</span>
                <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-mono">
                  {worker.reviews.length}
                </span>
              </h4>

              <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{worker.rating.toFixed(1)} / ৫.০</span>
              </div>
            </div>

            {/* Existing Reviews List */}
            <div className="space-y-3">
              {worker.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs">
                        {rev.authorName.charAt(0)}
                      </div>
                      <span className="font-semibold text-slate-900">{rev.authorName}</span>
                      <span className="text-slate-400">({rev.location})</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <div className="flex text-amber-400">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            className={`w-3 h-3 ${
                              idx < rev.rating ? 'fill-amber-400' : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] text-slate-400 ml-1">{rev.date}</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-8">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>

            {/* Add Review Form */}
            <div className="p-4 bg-slate-100/70 rounded-xl border border-slate-200 space-y-3">
              <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                কাজের পর আপনার মতামত বা রেটিং দিন
              </h5>

              {reviewSuccess ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>ধন্যবাদ! আপনার মূল্যবান মতামত যুক্ত করা হয়েছে।</span>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block text-slate-600 mb-1">আপনার নাম *</label>
                      <input
                        type="text"
                        required
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        placeholder="যেমন: তারেক মাহমুদ"
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1">আপনার এলাকা / উপজেলা</label>
                      <input
                        type="text"
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        placeholder="যেমন: শাহরাস্তি বাজার"
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-600 mb-1">কাজের মান রেটিং দিন</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= newRating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs text-slate-600 ml-2 font-semibold">
                        ({newRating} স্টার)
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-600 mb-1">আপনার রিভিউ বা মন্তব্য *</label>
                    <textarea
                      required
                      rows={2}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="কাজের সময়ানুবর্তিতা, ফিনিশিং ও ব্যবহার কেমন ছিল লিখুন..."
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-slate-900 text-xs sm:text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>রিভিউ জমা দিন</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            জরুরি প্রয়োজনে সরাসরি কল করুন
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
