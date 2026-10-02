import React, { useState } from 'react';
import {
  Phone,
  MessageSquare,
  MapPin,
  Star,
  CheckCircle2,
  Bookmark,
  Store,
  Clock,
  Truck,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { ShopProfile } from '../types';

interface ShopCardProps {
  shop: ShopProfile;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onViewDetails: (shop: ShopProfile) => void;
}

export const ShopCard: React.FC<ShopCardProps> = ({
  shop,
  isBookmarked,
  onToggleBookmark,
  onViewDetails
}) => {
  const [imageError, setImageError] = useState(false);

  const whatsappText = encodeURIComponent(
    `আসসালামু আলাইকুম, আমার শাহরাস্তি অ্যাপ থেকে আপনার '${shop.name}' দোকানের পণ্য ও সেবার বিষয়ে জানতে যোগাযোগ করছি।`
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden">
      <div>
        {/* Storefront Image with Discount Offer Ribbon */}
        <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
          {!imageError && shop.photo ? (
            <img
              src={shop.photo}
              alt={shop.name}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-100 to-slate-200 text-slate-700">
              <Store className="w-10 h-10 text-emerald-700 mb-1" />
              <span className="text-xs font-semibold">{shop.name}</span>
            </div>
          )}

          {/* Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Bookmark Button */}
          <button
            onClick={() => onToggleBookmark(shop.id)}
            className="absolute top-2.5 right-2.5 p-1.5 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-xs transition-colors"
            title={isBookmarked ? 'সংরক্ষণ থেকে সরান' : 'দোকান সেভ করুন'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : 'text-white'}`} />
          </button>

          {/* Verified Badge */}
          {shop.isVerified && (
            <div className="absolute top-2.5 left-2.5 bg-blue-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
              <CheckCircle2 className="w-3 h-3" />
              <span>যাচাইকৃত প্রতিষ্ঠান</span>
            </div>
          )}

          {/* Market & Union on bottom of photo */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
            <span className="flex items-center gap-1 font-semibold truncate drop-shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{shop.marketName}</span>
              <span aria-hidden="true" className="text-white/60">·</span>
              <span className="text-white/90">{shop.unionOrArea}</span>
            </span>

            {shop.homeDelivery && (
              <span className="bg-emerald-600/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 shrink-0">
                <Truck className="w-3 h-3" />
                <span>হোম ডেলিভারি</span>
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 space-y-3">
          {/* Shop Title & Tagline */}
          <div>
            <h3
              onClick={() => onViewDetails(shop)}
              className="font-bold text-base sm:text-lg text-slate-900 hover:text-emerald-700 cursor-pointer transition-colors line-clamp-1"
              title={shop.name}
            >
              {shop.name}
            </h3>
            <p className="text-xs text-slate-500 font-medium line-clamp-1 mt-0.5">
              {shop.tagline}
            </p>
          </div>

          {/* Active Discount / Promotion Highlight */}
          {shop.discountOffer && (
            <div className="p-2.5 bg-amber-50/80 border border-amber-200/80 rounded-lg text-xs text-amber-900 flex items-start gap-1.5 leading-relaxed">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-amber-950">অফার: </strong>
                <span>{shop.discountOffer}</span>
              </div>
            </div>
          )}

          {/* Featured Products Snippet */}
          {shop.featuredProducts && shop.featuredProducts.length > 0 && (
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-slate-500">প্রধান পণ্য ও সেবা:</span>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {shop.featuredProducts.slice(0, 3).map((p, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded text-slate-700 text-[11px]"
                  >
                    {p.name}
                  </span>
                ))}
                {shop.featuredProducts.length > 3 && (
                  <span className="text-[11px] text-slate-400 py-0.5">
                    +{shop.featuredProducts.length - 3} আরও
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Rating, Owner & Hours */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-1.5 font-mono">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-900">{shop.rating.toFixed(1)}</span>
              <span className="text-slate-400">({shop.reviewCount} রিভিউ)</span>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-slate-500">
              <Clock className="w-3 h-3 text-slate-400" />
              <span className="truncate max-w-[130px]">{shop.openingHours.split('(')[0]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 grid grid-cols-3 gap-2">
        {/* Direct Call Button */}
        <a
          href={`tel:${shop.phone}`}
          className="inline-flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 active:scale-95 transition-all text-center whitespace-nowrap"
          title={`${shop.name} এ কল করুন`}
        >
          <Phone className="w-3.5 h-3.5" />
          <span>কল করুন</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${shop.whatsapp}?text=${whatsappText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 rounded-lg hover:bg-emerald-100 active:scale-95 transition-all text-center whitespace-nowrap"
          title="হোয়াটসঅ্যাপে পণ্য জানুন"
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
          <span>হোয়াটসঅ্যাপ</span>
        </a>

        {/* View Details Button */}
        <button
          onClick={() => onViewDetails(shop)}
          className="inline-flex items-center justify-center gap-1 py-2 px-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 active:scale-95 transition-all text-center whitespace-nowrap"
        >
          <span>দোকান তথ্য</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
