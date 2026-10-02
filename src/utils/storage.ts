import {
  HireRequest,
  Review,
  ShopProfile,
  SystemSettings,
  UserSession,
  WorkerProfile
} from '../types';
import { INITIAL_WORKERS } from '../data/initialWorkers';
import { INITIAL_SHOPS } from '../data/initialShops';
import { EmergencyContact, SHAHRASHTI_EMERGENCY_CONTACTS } from '../data/shahrastiData';

const WORKERS_KEY = 'shahrasti_workers_db_v4';
const SHOPS_KEY = 'shahrasti_shops_db_v1';
const BOOKMARKS_KEY = 'shahrasti_bookmarked_ids';
const SHOP_BOOKMARKS_KEY = 'shahrasti_shop_bookmarked_ids';
const REQUESTS_KEY = 'shahrasti_hire_requests_db';
const USER_KEY = 'shahrasti_current_user_v1';
const EMERGENCY_KEY = 'shahrasti_emergency_contacts_v1';
const SETTINGS_KEY = 'shahrasti_system_settings_v1';

export const DEFAULT_SETTINGS: SystemSettings = {
  announcementText: 'শাহরাস্তির প্রিয় নাগরিকবৃন্দ: আপনার প্রয়োজনীয় দক্ষ কারিগর ও স্থানীয় নির্ভরযোগ্য দোকানের সন্ধান পেতে কল বা হোয়াটসঅ্যাপে যোগাযোগ করুন।',
  isAnnouncementActive: true,
  adminPasscode: 'shahrasti2026',
  allowPublicRegistrations: true,
  emergencyHelplineOpen: true
};

// Workers storage
export function getStoredWorkers(): WorkerProfile[] {
  try {
    const data = localStorage.getItem(WORKERS_KEY);
    if (!data) {
      localStorage.setItem(WORKERS_KEY, JSON.stringify(INITIAL_WORKERS));
      return INITIAL_WORKERS;
    }
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(WORKERS_KEY, JSON.stringify(INITIAL_WORKERS));
      return INITIAL_WORKERS;
    }
    return parsed;
  } catch (e) {
    console.error('Failed to load workers from storage', e);
    return INITIAL_WORKERS;
  }
}

export function saveWorkersToStorage(workers: WorkerProfile[]): void {
  try {
    localStorage.setItem(WORKERS_KEY, JSON.stringify(workers));
  } catch (e) {
    console.error('Failed to save workers to storage', e);
  }
}

export function addNewWorker(newWorker: WorkerProfile): WorkerProfile[] {
  const current = getStoredWorkers();
  const existsIndex = current.findIndex(w => w.id === newWorker.id);
  let updated: WorkerProfile[];
  if (existsIndex >= 0) {
    updated = [...current];
    updated[existsIndex] = newWorker;
  } else {
    updated = [newWorker, ...current];
  }
  saveWorkersToStorage(updated);
  return updated;
}

export function deleteWorker(id: string): WorkerProfile[] {
  const current = getStoredWorkers();
  const updated = current.filter(w => w.id !== id);
  saveWorkersToStorage(updated);
  return updated;
}

export function toggleWorkerVerification(id: string): WorkerProfile[] {
  const current = getStoredWorkers();
  const updated = current.map(w => (w.id === id ? { ...w, isVerified: !w.isVerified } : w));
  saveWorkersToStorage(updated);
  return updated;
}

export function addReview(workerId: string, review: Review): WorkerProfile[] {
  const current = getStoredWorkers();
  const updated = current.map(w => {
    if (w.id === workerId) {
      const reviews = [review, ...w.reviews];
      const newReviewCount = reviews.length;
      const totalScore = reviews.reduce((sum, r) => sum + r.rating, 0);
      const newRating = Number((totalScore / newReviewCount).toFixed(1));
      return {
        ...w,
        reviews,
        reviewCount: newReviewCount,
        rating: newRating
      };
    }
    return w;
  });
  saveWorkersToStorage(updated);
  return updated;
}

// Shops & Businesses Storage
export function getStoredShops(): ShopProfile[] {
  try {
    const data = localStorage.getItem(SHOPS_KEY);
    if (!data) {
      localStorage.setItem(SHOPS_KEY, JSON.stringify(INITIAL_SHOPS));
      return INITIAL_SHOPS;
    }
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(SHOPS_KEY, JSON.stringify(INITIAL_SHOPS));
      return INITIAL_SHOPS;
    }
    return parsed;
  } catch (e) {
    console.error('Failed to load shops from storage', e);
    return INITIAL_SHOPS;
  }
}

export function saveShopsToStorage(shops: ShopProfile[]): void {
  try {
    localStorage.setItem(SHOPS_KEY, JSON.stringify(shops));
  } catch (e) {
    console.error('Failed to save shops to storage', e);
  }
}

export function addNewShop(newShop: ShopProfile): ShopProfile[] {
  const current = getStoredShops();
  const existsIndex = current.findIndex(s => s.id === newShop.id);
  let updated: ShopProfile[];
  if (existsIndex >= 0) {
    updated = [...current];
    updated[existsIndex] = newShop;
  } else {
    updated = [newShop, ...current];
  }
  saveShopsToStorage(updated);
  return updated;
}

export function deleteShop(id: string): ShopProfile[] {
  const current = getStoredShops();
  const updated = current.filter(s => s.id !== id);
  saveShopsToStorage(updated);
  return updated;
}

export function toggleShopVerification(id: string): ShopProfile[] {
  const current = getStoredShops();
  const updated = current.map(s => (s.id === id ? { ...s, isVerified: !s.isVerified } : s));
  saveShopsToStorage(updated);
  return updated;
}

export function addShopReview(shopId: string, review: Review): ShopProfile[] {
  const current = getStoredShops();
  const updated = current.map(s => {
    if (s.id === shopId) {
      const reviews = [review, ...s.reviews];
      const newReviewCount = reviews.length;
      const totalScore = reviews.reduce((sum, r) => sum + r.rating, 0);
      const newRating = Number((totalScore / newReviewCount).toFixed(1));
      return {
        ...s,
        reviews,
        reviewCount: newReviewCount,
        rating: newRating
      };
    }
    return s;
  });
  saveShopsToStorage(updated);
  return updated;
}

export function resetDefaultShops(): ShopProfile[] {
  localStorage.setItem(SHOPS_KEY, JSON.stringify(INITIAL_SHOPS));
  return INITIAL_SHOPS;
}

// Bookmarks
export function getBookmarks(): string[] {
  try {
    const data = localStorage.getItem(BOOKMARKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function toggleBookmarkStorage(id: string): string[] {
  const current = getBookmarks();
  let updated: string[];
  if (current.includes(id)) {
    updated = current.filter(item => item !== id);
  } else {
    updated = [...current, id];
  }
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save bookmarks', e);
  }
  return updated;
}

export function getShopBookmarks(): string[] {
  try {
    const data = localStorage.getItem(SHOP_BOOKMARKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function toggleShopBookmarkStorage(id: string): string[] {
  const current = getShopBookmarks();
  let updated: string[];
  if (current.includes(id)) {
    updated = current.filter(item => item !== id);
  } else {
    updated = [...current, id];
  }
  try {
    localStorage.setItem(SHOP_BOOKMARKS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save shop bookmarks', e);
  }
  return updated;
}

// Hire requests
export function getStoredHireRequests(): HireRequest[] {
  try {
    const data = localStorage.getItem(REQUESTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveHireRequest(req: HireRequest): HireRequest[] {
  const current = getStoredHireRequests();
  const updated = [req, ...current];
  try {
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save hire request', e);
  }
  return updated;
}

export function updateHireRequestStatus(requestId: string, status: HireRequest['status']): HireRequest[] {
  const current = getStoredHireRequests();
  const updated = current.map(r => (r.id === requestId ? { ...r, status } : r));
  try {
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update request', e);
  }
  return updated;
}

export function deleteHireRequest(requestId: string): HireRequest[] {
  const current = getStoredHireRequests();
  const updated = current.filter(r => r.id !== requestId);
  try {
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete request', e);
  }
  return updated;
}

// Emergency Contacts Storage
export function getStoredEmergencyContacts(): EmergencyContact[] {
  try {
    const data = localStorage.getItem(EMERGENCY_KEY);
    if (!data) {
      localStorage.setItem(EMERGENCY_KEY, JSON.stringify(SHAHRASHTI_EMERGENCY_CONTACTS));
      return SHAHRASHTI_EMERGENCY_CONTACTS;
    }
    return JSON.parse(data);
  } catch {
    return SHAHRASHTI_EMERGENCY_CONTACTS;
  }
}

export function saveEmergencyContacts(contacts: EmergencyContact[]): void {
  try {
    localStorage.setItem(EMERGENCY_KEY, JSON.stringify(contacts));
  } catch (e) {
    console.error('Failed to save emergency contacts', e);
  }
}

// System Settings Storage
export function getSystemSettings(): SystemSettings {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSystemSettings(settings: SystemSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save system settings', e);
  }
}

// Reset Default Data
export function resetDefaultData(): WorkerProfile[] {
  localStorage.setItem(WORKERS_KEY, JSON.stringify(INITIAL_WORKERS));
  resetDefaultShops();
  localStorage.setItem(EMERGENCY_KEY, JSON.stringify(SHAHRASHTI_EMERGENCY_CONTACTS));
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
  return INITIAL_WORKERS;
}

// User Authentication and Session Storage
export function getCurrentUser(): UserSession | null {
  try {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function saveCurrentUser(user: UserSession | null): void {
  try {
    if (!user) {
      localStorage.removeItem(USER_KEY);
    } else {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  } catch (e) {
    console.error('Failed to save user session', e);
  }
}

export function logoutUser(): void {
  try {
    localStorage.removeItem(USER_KEY);
  } catch (e) {
    console.error('Failed to logout', e);
  }
}

// Full Database Export / Import (SuperAdmin backup)
export function exportAllDatabase(): string {
  const data = {
    exportedAt: new Date().toISOString(),
    workers: getStoredWorkers(),
    shops: getStoredShops(),
    hireRequests: getStoredHireRequests(),
    emergencyContacts: getStoredEmergencyContacts(),
    settings: getSystemSettings()
  };
  return JSON.stringify(data, null, 2);
}

export function importDatabase(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.workers && Array.isArray(parsed.workers)) {
      saveWorkersToStorage(parsed.workers);
    }
    if (parsed.shops && Array.isArray(parsed.shops)) {
      saveShopsToStorage(parsed.shops);
    }
    if (parsed.hireRequests && Array.isArray(parsed.hireRequests)) {
      localStorage.setItem(REQUESTS_KEY, JSON.stringify(parsed.hireRequests));
    }
    if (parsed.emergencyContacts && Array.isArray(parsed.emergencyContacts)) {
      saveEmergencyContacts(parsed.emergencyContacts);
    }
    if (parsed.settings && typeof parsed.settings === 'object') {
      saveSystemSettings(parsed.settings);
    }
    return true;
  } catch (e) {
    console.error('Import database failed', e);
    return false;
  }
}
