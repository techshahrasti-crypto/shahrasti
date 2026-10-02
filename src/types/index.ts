export type AvailabilityStatus = 'available' | 'busy' | 'away';

export interface Review {
  id: string;
  authorName: string;
  authorPhone?: string;
  rating: number;
  comment: string;
  date: string;
  location: string;
}

export interface WorkerProfile {
  id: string;
  userId?: string; // Linked user session account
  name: string;
  profession: string; // Detailed title e.g. "হাউস ওয়্যারিং ও মোটর মেকানিক"
  category: string; // Key category id
  division: string;
  district: string;
  upazila: string;
  unionOrArea: string;
  village?: string;
  phone: string;
  whatsapp: string;
  photo: string;
  experienceYears: number;
  dailyRate: string; // e.g. "৳৮০০ - ১,০০০"
  callOutFee: string; // e.g. "৳২০০"
  bio: string;
  specialties: string[];
  portfolioImages: string[];
  rating: number;
  reviewCount: number;
  completedJobs: number;
  isVerified: boolean;
  availability: AvailabilityStatus;
  joinedDate: string;
  toolsOwned: string[];
  reviews: Review[];
  nidVerified?: boolean;
}

export interface FeaturedProduct {
  name: string;
  price?: string;
  description?: string;
}

export interface ShopProfile {
  id: string;
  userId?: string;
  name: string;
  tagline: string;
  category: string;
  ownerName: string;
  unionOrArea: string;
  marketName: string;
  fullAddress: string;
  phone: string;
  whatsapp: string;
  email?: string;
  photo: string;
  description: string;
  featuredProducts: FeaturedProduct[];
  discountOffer?: string; // e.g. "চলমান বিশেষ ছাড় বা ক্যাশব্যাক"
  openingHours: string;
  homeDelivery: boolean;
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  yearEstablished?: number;
  reviews: Review[];
  joinedDate: string;
}

export interface ShopCategory {
  id: string;
  name: string;
  nameEn: string;
  iconName: string;
  description: string;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: 'google' | 'facebook';
  workerId?: string; // If the member has created a worker profile
  shopId?: string; // If the member has created a shop/business profile
  hasCompletedProfile: boolean;
  joinedAt: string;
  isAdmin?: boolean;
}

export interface ProfessionCategory {
  id: string;
  name: string;
  nameEn: string;
  iconName: string;
  description: string;
  group?: string;
}

export interface HireRequest {
  id: string;
  workerId: string;
  workerName: string;
  workerPhone: string;
  clientName: string;
  clientPhone: string;
  clientAddress: string;
  workDescription: string;
  preferredDate: string;
  urgency: 'regular' | 'urgent' | 'emergency';
  status: 'pending' | 'contacted' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface UpazilaOption {
  name: string;
  nameEn: string;
  district: string;
  division: string;
  unions?: string[];
}

export interface SystemSettings {
  announcementText: string;
  isAnnouncementActive: boolean;
  adminPasscode: string;
  allowPublicRegistrations: boolean;
  emergencyHelplineOpen: boolean;
}
