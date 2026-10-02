import React, { useState } from 'react';
import {
  Phone,
  MessageSquare,
  MapPin,
  Star,
  CheckCircle2,
  Bookmark,
  Briefcase,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { WorkerProfile } from '../types';

export interface VerifiedBadgeProps {
  size?: 'xs' | 'sm' | 'md';
  className?: string;
  showText?: boolean;
}

/**
 * VerifiedBadge Component:
 * Conditionally displayed based on worker.isVerified to visually distinguish
 * professional, vetted workers from standard listings.
 */
export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({
  size = 'sm',
  className = '',
  showText = true
}) => {
  return (
    <span
      className={`inline-flex items-center gap-1 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-800 font-bold rounded-full shadow-2xs select-none ${
        size === 'xs'
          ? 'px-1.5 py-0.2 text-[9px]'
          : size === 'sm'
          ? 'px-2 py-0.5 text-[10px]'
          : 'px-2.5 py-1 text-xs'
      } ${className}`}
      title="এনআইডি ও পেশাগত দক্ষতা যাচাইকৃত বিশ্বস্ত কারিগর"
    >
      <CheckCircle2
        className={`${
          size === 'xs' ? 'w-2.5 h-2.5' : size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'
        } text-blue-600 fill-blue-100 shrink-0`}
      />
      {showText && <span>যাচাইকৃত কারিগর</span>}
    </span>
  );
};

interface WorkerCardProps {
  worker: WorkerProfile;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onViewDetails: (worker: WorkerProfile) => void;
  onHireNow: (worker: WorkerProfile) => void;
}

export const WorkerCard: React.FC<WorkerCardProps> = ({
  worker,
  isBookmarked,
  onToggleBookmark,
  onViewDetails,
  onHireNow
}) => {
  const [imageError, setImageError] = useState(false);

  // Bengali message for WhatsApp
  const whatsappText = encodeURIComponent(
    `আসসালামু আলাইকুম ${worker.name} ভাই, আমার শাহরাস্তি থেকে আপনার প্রোফাইল দেখে কাজের বিষয়ে কথা বলতে চাচ্ছিলাম। আপনি কি ফ্রি আছেন?`
  );

  return (
    <div
      className={`bg-white rounded-xl transition-all flex flex-col justify-between overflow-hidden ${
        worker.isVerified
          ? 'border border-blue-200/90 hover:border-blue-400 hover:shadow-md ring-1 ring-blue-500/10'
          : 'border border-slate-200/90 hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      <div>
        {/* Top Header / Profile Info */}
        <div className="p-4 sm:p-5 flex gap-4">
          {/* Worker Photo Slot with Fallback Container */}
          <div className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
            {!imageError && worker.photo ? (
              <img
                src={worker.photo}
                alt={worker.name}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-100 to-slate-200 text-slate-700">
                <span className="text-xl sm:text-2xl font-bold">
                  {worker.name.charAt(0) || 'ক'}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">ছবি নেই</span>
              </div>
            )}

            {/* Verified badge floating on top of photo for instant visual distinction */}
            {worker.isVerified && (
              <div
                className="absolute top-1 left-1 bg-blue-600/95 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs flex items-center gap-0.5 z-10 backdrop-blur-2xs"
                title="আমার শাহরাস্তি কর্তৃক এনআইডি ও দক্ষতা যাচাইকৃত"
              >
                <CheckCircle2 className="w-2.5 h-2.5" />
                <span>যাচাইকৃত</span>
              </div>
            )}

            {/* Availability Dot & Status Indicator */}
            <div className="absolute bottom-1 right-1 bg-white/95 px-1 py-0.5 rounded text-[10px] font-medium flex items-center gap-1 shadow-xs">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  worker.availability === 'available'
                    ? 'bg-emerald-500'
                    : worker.availability === 'busy'
                    ? 'bg-amber-500'
                    : 'bg-slate-400'
                }`}
              />
              <span className="text-slate-700 text-[9px]">
                {worker.availability === 'available'
                  ? 'প্রস্তুত'
                  : worker.availability === 'busy'
                  ? 'ব্যস্ত'
                  : 'অনুপস্থিত'}
              </span>
            </div>
          </div>

          {/* Profile Basic Info */}
          <div className="flex-1 min-w-0">
            {/* Title & Bookmark Button */}
            <div className="flex items-start justify-between gap-1">
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3
                    onClick={() => onViewDetails(worker)}
                    className="font-bold text-base sm:text-lg text-slate-900 hover:text-emerald-700 cursor-pointer transition-colors truncate"
                    title={worker.name}
                  >
                    {worker.name}
                  </h3>
                  {/* Verified Badge conditionally displayed */}
                  {worker.isVerified && <VerifiedBadge size="sm" />}
                </div>

                <p className="text-xs sm:text-sm text-emerald-800 font-medium line-clamp-1 mt-0.5">
                  {worker.profession}
                </p>
              </div>

              <button
                onClick={() => onToggleBookmark(worker.id)}
                className="p-1 text-slate-400 hover:text-amber-500 active:scale-90 transition-transform shrink-0"
                title={isBookmarked ? 'বুকমার্ক থেকে সরান' : 'বুকমার্কে রাখুন'}
                aria-label={isBookmarked ? 'বুকমার্ক থেকে সরান' : 'বুকমার্কে রাখুন'}
              >
                <Bookmark
                  className={`w-4 h-4 ${
                    isBookmarked ? 'fill-amber-500 text-amber-500' : 'text-slate-400'
                  }`}
                />
              </button>
            </div>

            {/* Location Metadata (Clean Unboxed Text with Separators - Zero Pill Rule) */}
            <div className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-600 truncate">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="font-semibold text-slate-900">{worker.unionOrArea}</span>
              {worker.village && (
                <>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="text-slate-600 truncate">{worker.village}</span>
                </>
              )}
            </div>

            {/* Experience & Trust Badges */}
            <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Briefcase className="w-3 h-3 text-slate-400" />
                <span>{worker.experienceYears} বছরের অভিজ্ঞতা</span>
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              {worker.isVerified ? (
                <span className="inline-flex items-center gap-1 text-blue-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>ভেরিফায়েড প্রোফাইল</span>
                </span>
              ) : (
                <span className="text-slate-400">সাধারণ তালিকাভুক্তি</span>
              )}
            </div>
          </div>
        </div>

        {/* Bio Snippet */}
        <div className="px-4 sm:px-5 pb-3">
          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {worker.bio}
          </p>
        </div>

        {/* Key Specialties / Skills (Unboxed Clean List) */}
        {worker.specialties && worker.specialties.length > 0 && (
          <div className="px-4 sm:px-5 pb-3 flex flex-wrap gap-1.5 text-[11px] text-slate-600">
            {worker.specialties.slice(0, 3).map((spec, i) => (
              <span
                key={i}
                className="bg-slate-50 border border-slate-200/80 px-2 py-0.5 rounded text-slate-700"
              >
                {spec}
              </span>
            ))}
            {worker.specialties.length > 3 && (
              <span className="text-slate-400 py-0.5">
                +{worker.specialties.length - 3} আরও
              </span>
            )}
          </div>
        )}

        {/* Rating and Rate Card Strip */}
        <div className="px-4 sm:px-5 py-2.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs">
          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center text-amber-500 font-bold font-mono">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-0.5" />
              <span>{worker.rating.toFixed(1)}</span>
            </div>
            <span className="text-slate-400">({worker.reviewCount} রিভিউ)</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-slate-600 font-mono tabular-nums">{worker.completedJobs} কাজ</span>
          </div>

          {/* Rate */}
          <div className="text-right">
            <span className="text-[11px] text-slate-500">মজুরি: </span>
            <span className="font-semibold text-slate-900">{worker.dailyRate}</span>
          </div>
        </div>
      </div>

      {/* Action Footer: Call, WhatsApp, View Details */}
      <div className="p-3 sm:p-4 bg-white border-t border-slate-200 grid grid-cols-3 gap-2">
        {/* Direct Call Button */}
        <a
          href={`tel:${worker.phone}`}
          className="inline-flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 active:scale-95 transition-all text-center whitespace-nowrap"
          title={`${worker.name}কে কল করুন`}
        >
          <Phone className="w-3.5 h-3.5" />
          <span>কল করুন</span>
        </a>

        {/* WhatsApp Chat Button */}
        <a
          href={`https://wa.me/${worker.whatsapp}?text=${whatsappText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 rounded-lg hover:bg-emerald-100 active:scale-95 transition-all text-center whitespace-nowrap"
          title="হোয়াটসঅ্যাপে কথা বলুন"
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
          <span>হোয়াটসঅ্যাপ</span>
        </a>

        {/* View Profile & Book */}
        <button
          onClick={() => onViewDetails(worker)}
          className="inline-flex items-center justify-center gap-1 py-2 px-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 active:scale-95 transition-all text-center whitespace-nowrap"
        >
          <span>প্রোফাইল</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
