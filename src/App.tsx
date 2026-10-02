import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryNav } from './components/CategoryNav';
import { FilterBar } from './components/FilterBar';
import { WorkerCard } from './components/WorkerCard';
import { WorkerDetailModal } from './components/WorkerDetailModal';
import { AddWorkerModal } from './components/AddWorkerModal';
import { MemberProfileModal } from './components/MemberProfileModal';
import { AuthModal } from './components/AuthModal';
import { HireRequestModal } from './components/HireRequestModal';
import { BookmarksView } from './components/BookmarksView';
import { HireRequestsView } from './components/HireRequestsView';
import { CategoriesView } from './components/CategoriesView';
import { UnionsView } from './components/UnionsView';
import { ShopsView } from './components/ShopsView';
import { SplitDirectoryView } from './components/SplitDirectoryView';
import { ShopDetailModal } from './components/ShopDetailModal';
import { AddShopModal } from './components/AddShopModal';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLoginModal } from './components/AdminLoginModal';
import { ShahrastiEmergencyModal } from './components/ShahrastiEmergencyModal';
import { Footer } from './components/Footer';
import {
  getStoredWorkers,
  addNewWorker,
  addReview,
  getBookmarks,
  toggleBookmarkStorage,
  getStoredHireRequests,
  saveHireRequest,
  resetDefaultData,
  getCurrentUser,
  saveCurrentUser,
  logoutUser,
  getStoredShops,
  addNewShop,
  addShopReview,
  getShopBookmarks,
  toggleShopBookmarkStorage,
  resetDefaultShops,
  getStoredEmergencyContacts,
  saveEmergencyContacts,
  getSystemSettings,
  saveSystemSettings,
  DEFAULT_SETTINGS
} from './utils/storage';
import { HireRequest, Review, ShopProfile, SystemSettings, UserSession, WorkerProfile } from './types';
import { EmergencyContact } from './data/shahrastiData';
import { AlertCircle, Bell, Plus, Sparkles, Store, Users, X, ShieldAlert } from 'lucide-react';

export default function App() {
  const [workers, setWorkers] = useState<WorkerProfile[]>([]);
  const [shops, setShops] = useState<ShopProfile[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [bookmarkedShopIds, setBookmarkedShopIds] = useState<string[]>([]);
  const [hireRequests, setHireRequests] = useState<HireRequest[]>([]);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [systemSettings, setSystemSettings] = useState<SystemSettings>(DEFAULT_SETTINGS);
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [dismissAnnouncement, setDismissAnnouncement] = useState<boolean>(false);

  // Navigation tab
  const [activeTab, setActiveTab] = useState<'all' | 'shops' | 'unions' | 'categories' | 'bookmarks' | 'requests'>('all');

  // Filters tailored for Shahrasti (No 'নং' prefixes)
  const [selectedUnion, setSelectedUnion] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [availableOnly, setAvailableOnly] = useState<boolean>(false);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'jobs' | 'newest'>('rating');

  // Modals
  const [selectedWorkerForDetail, setSelectedWorkerForDetail] = useState<WorkerProfile | null>(null);
  const [selectedWorkerForHire, setSelectedWorkerForHire] = useState<WorkerProfile | null>(null);
  const [selectedShopForDetail, setSelectedShopForDetail] = useState<ShopProfile | null>(null);
  const [isAddWorkerOpen, setIsAddWorkerOpen] = useState<boolean>(false);
  const [isAddShopOpen, setIsAddShopOpen] = useState<boolean>(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);

  // Load initial data from storage
  useEffect(() => {
    setWorkers(getStoredWorkers());
    setShops(getStoredShops());
    setBookmarkedIds(getBookmarks());
    setBookmarkedShopIds(getShopBookmarks());
    setHireRequests(getStoredHireRequests());
    setEmergencyContacts(getStoredEmergencyContacts());
    setSystemSettings(getSystemSettings());
    setCurrentUser(getCurrentUser());
  }, []);

  // Find existing worker profile for currently logged in user
  const loggedInWorkerProfile = useMemo(() => {
    if (!currentUser) return null;
    return workers.find((w) => w.userId === currentUser.id || w.id === currentUser.workerId) || null;
  }, [currentUser, workers]);

  // Find existing shop profile for currently logged in user
  const loggedInShopProfile = useMemo(() => {
    if (!currentUser) return null;
    return shops.find((s) => s.userId === currentUser.id || s.id === currentUser.shopId) || null;
  }, [currentUser, shops]);

  // Worker counts per category
  const workerCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    workers.forEach((w) => {
      counts[w.category] = (counts[w.category] || 0) + 1;
    });
    return counts;
  }, [workers]);

  // Worker counts per Shahrasti Union
  const workerCountsByUnion = useMemo(() => {
    const counts: Record<string, number> = {};
    workers.forEach((w) => {
      counts[w.unionOrArea] = (counts[w.unionOrArea] || 0) + 1;
    });
    return counts;
  }, [workers]);

  // Bookmarks toggles
  const handleToggleBookmark = (id: string) => {
    const updated = toggleBookmarkStorage(id);
    setBookmarkedIds(updated);
  };

  const handleToggleShopBookmark = (id: string) => {
    const updated = toggleShopBookmarkStorage(id);
    setBookmarkedShopIds(updated);
  };

  // Add or update worker
  const handleWorkerAdded = (newWorker: WorkerProfile) => {
    const updated = addNewWorker(newWorker);
    setWorkers(updated);
  };

  // Add or update shop
  const handleShopAdded = (newShop: ShopProfile) => {
    const updated = addNewShop(newShop);
    setShops(updated);
  };

  // Save profile from MemberProfileModal
  const handleSaveMemberProfile = (updatedProfile: WorkerProfile) => {
    const updated = addNewWorker(updatedProfile);
    setWorkers(updated);

    if (currentUser) {
      const updatedUser: UserSession = {
        ...currentUser,
        workerId: updatedProfile.id,
        hasCompletedProfile: true
      };
      setCurrentUser(updatedUser);
      saveCurrentUser(updatedUser);
    }
  };

  // Save shop from MemberProfileModal
  const handleSaveMemberShop = (updatedShop: ShopProfile) => {
    const updated = addNewShop(updatedShop);
    setShops(updated);

    if (currentUser) {
      const updatedUser: UserSession = {
        ...currentUser,
        shopId: updatedShop.id,
        hasCompletedProfile: true
      };
      setCurrentUser(updatedUser);
      saveCurrentUser(updatedUser);
    }
  };

  // Login success handler
  const handleLoginSuccess = (user: UserSession) => {
    const isTechAdmin = user.email.toLowerCase() === 'tech.shahrasti@gmail.com';
    const enhancedUser = { ...user, isAdmin: isTechAdmin };
    setCurrentUser(enhancedUser);
    saveCurrentUser(enhancedUser);

    setTimeout(() => {
      setIsProfileModalOpen(true);
    }, 400);
  };

  // Logout handler
  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  // Add worker review
  const handleAddReview = (workerId: string, review: Review) => {
    const updated = addReview(workerId, review);
    setWorkers(updated);
    if (selectedWorkerForDetail && selectedWorkerForDetail.id === workerId) {
      const refreshed = updated.find((w) => w.id === workerId) || null;
      setSelectedWorkerForDetail(refreshed);
    }
  };

  // Add shop review
  const handleAddShopReview = (shopId: string, review: Review) => {
    const updated = addShopReview(shopId, review);
    setShops(updated);
    if (selectedShopForDetail && selectedShopForDetail.id === shopId) {
      const refreshed = updated.find((s) => s.id === shopId) || null;
      setSelectedShopForDetail(refreshed);
    }
  };

  // Submit hire request
  const handleSubmitHireRequest = (req: HireRequest) => {
    const updated = saveHireRequest(req);
    setHireRequests(updated);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedUnion('all');
    setSelectedCategory('all');
    setSearchQuery('');
    setAvailableOnly(false);
    setVerifiedOnly(false);
    setSortBy('rating');
  };

  // Reset to default data
  const handleResetData = () => {
    const defWorkers = resetDefaultData();
    const defShops = resetDefaultShops();
    setWorkers(defWorkers);
    setShops(defShops);
    setEmergencyContacts(getStoredEmergencyContacts());
    setSystemSettings(getSystemSettings());
    handleResetFilters();
  };

  // SuperAdmin Access handler
  const handleOpenAdmin = () => {
    if (currentUser?.email.toLowerCase() === 'tech.shahrasti@gmail.com') {
      setIsAdminOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  // Filtered and sorted workers list for Shahrasti
  const filteredWorkers = useMemo(() => {
    return workers
      .filter((w) => {
        // Union filter
        if (selectedUnion !== 'all' && w.unionOrArea !== selectedUnion) {
          return false;
        }

        // Category filter
        if (selectedCategory !== 'all' && w.category !== selectedCategory) {
          return false;
        }

        // Availability filter
        if (availableOnly && w.availability !== 'available') {
          return false;
        }

        // Verified filter
        if (verifiedOnly && !w.isVerified) {
          return false;
        }

        // Search Query filter (matches in name, profession, bio, union, village, specialties, phone)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesName = w.name.toLowerCase().includes(q);
          const matchesProf = w.profession.toLowerCase().includes(q);
          const matchesBio = w.bio.toLowerCase().includes(q);
          const matchesUnion = w.unionOrArea.toLowerCase().includes(q);
          const matchesVillage = (w.village || '').toLowerCase().includes(q);
          const matchesPhone = w.phone.replace(/[^0-9]/g, '').includes(q.replace(/[^0-9]/g, ''));
          const matchesSpecialties = w.specialties.some((s) => s.toLowerCase().includes(q));

          if (
            !matchesName &&
            !matchesProf &&
            !matchesBio &&
            !matchesUnion &&
            !matchesVillage &&
            !matchesPhone &&
            !matchesSpecialties
          ) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') {
          return b.rating - a.rating || b.reviewCount - a.reviewCount;
        }
        if (sortBy === 'experience') {
          return b.experienceYears - a.experienceYears;
        }
        if (sortBy === 'jobs') {
          return b.completedJobs - a.completedJobs;
        }
        return 0;
      });
  }, [
    workers,
    selectedUnion,
    selectedCategory,
    availableOnly,
    verifiedOnly,
    searchQuery,
    sortBy
  ]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Top Live Announcement / Notice Banner (Controlled by SuperAdmin) */}
      {systemSettings.isAnnouncementActive && systemSettings.announcementText && !dismissAnnouncement && (
        <aside aria-label="জরুরি নোটিশ" className="bg-gradient-to-r from-amber-600 to-emerald-700 text-white px-4 py-2 text-xs font-semibold shadow-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 truncate">
              <span className="p-1 bg-white/20 rounded-md shrink-0">
                <Bell className="w-3.5 h-3.5 text-white" />
              </span>
              <span className="truncate">{systemSettings.announcementText}</span>
            </div>
            <button
              onClick={() => setDismissAnnouncement(true)}
              className="p-1 hover:bg-white/20 rounded text-white/80 hover:text-white shrink-0"
              title="নোটিশ বন্ধ করুন"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      )}

      {/* 3-Zone Header Contract for 'আমার শাহরাস্তি' */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookmarkCount={bookmarkedIds.length + bookmarkedShopIds.length}
        requestCount={hireRequests.length}
        currentUser={currentUser}
        onOpenAddWorker={() => {
          if (currentUser) {
            setIsProfileModalOpen(true);
          } else {
            setIsAuthModalOpen(true);
          }
        }}
        onOpenAddShop={() => setIsAddShopOpen(true)}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenAdmin={handleOpenAdmin}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
      />

      {/* Member Banner if signed in but hasn't completed worker/shop profile */}
      {currentUser && !loggedInWorkerProfile && !loggedInShopProfile && (
        <aside aria-label="প্রোফাইল পূরণ বার্তা" className="bg-emerald-700 text-white px-4 py-2.5 text-xs sm:text-sm font-medium">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-200 shrink-0" />
              <span>
                স্বাগতম, <strong>{currentUser.name}</strong>! আপনি এখনো আপনার পেশাগত তথ্য বা দোকানের তথ্য যুক্ত করেননি।
              </span>
            </div>
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="px-3 py-1 bg-white text-emerald-900 rounded font-bold text-xs hover:bg-emerald-50 transition-colors whitespace-nowrap"
            >
              এখনই প্রোফাইল হালনাগাদ করুন
            </button>
          </div>
        </aside>
      )}

      {/* Main Content Area based on Tab */}
      <main className="flex-1">
        {/* TAB: SHOPS & BUSINESSES */}
        {activeTab === 'shops' && (
          <ShopsView
            shops={shops}
            bookmarkedShopIds={bookmarkedShopIds}
            onToggleBookmark={handleToggleShopBookmark}
            onViewShopDetails={(s) => setSelectedShopForDetail(s)}
            onOpenAddShop={() => setIsAddShopOpen(true)}
            selectedUnionFilter={selectedUnion}
            onSelectUnion={(u) => setSelectedUnion(u)}
          />
        )}

        {/* TAB: BOOKMARKS */}
        {activeTab === 'bookmarks' && (
          <BookmarksView
            workers={workers}
            bookmarkedIds={bookmarkedIds}
            shops={shops}
            bookmarkedShopIds={bookmarkedShopIds}
            onToggleBookmark={handleToggleBookmark}
            onToggleShopBookmark={handleToggleShopBookmark}
            onViewDetails={(w) => setSelectedWorkerForDetail(w)}
            onViewShopDetails={(s) => setSelectedShopForDetail(s)}
            onHireNow={(w) => setSelectedWorkerForHire(w)}
            onBackToAll={() => setActiveTab('all')}
          />
        )}

        {/* TAB: HIRE REQUESTS */}
        {activeTab === 'requests' && (
          <HireRequestsView
            requests={hireRequests}
            onBackToAll={() => setActiveTab('all')}
          />
        )}

        {/* TAB: UNIONS */}
        {activeTab === 'unions' && (
          <UnionsView
            workerCountsByUnion={workerCountsByUnion}
            onSelectUnion={(unionName) => {
              setSelectedUnion(unionName);
              setActiveTab('all');
            }}
          />
        )}

        {/* TAB: CATEGORIES */}
        {activeTab === 'categories' && (
          <CategoriesView
            workerCounts={workerCounts}
            onSelectCategory={(catId) => {
              setSelectedCategory(catId);
              setActiveTab('all');
            }}
          />
        )}

        {/* TAB: ALL DIRECTORY (Divided Split View: Left Shops, Right Artisans, Different Background Colors) */}
        {activeTab === 'all' && (
          <div>
            {/* Hero Section for Shahrasti */}
            <HeroSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedUnion={selectedUnion}
              onClearFilters={handleResetFilters}
              totalWorkers={workers.length}
              onSelectUnion={(u) => setSelectedUnion(u)}
            />

            {/* Split Page: One side Shops & Businesses, other side Artisans/Workers with 2 different background colors */}
            <SplitDirectoryView
              workers={workers}
              shops={shops}
              bookmarkedIds={bookmarkedIds}
              bookmarkedShopIds={bookmarkedShopIds}
              onToggleBookmark={handleToggleBookmark}
              onToggleShopBookmark={handleToggleShopBookmark}
              onViewWorkerDetails={(w) => setSelectedWorkerForDetail(w)}
              onViewShopDetails={(s) => setSelectedShopForDetail(s)}
              onHireWorker={(w) => setSelectedWorkerForHire(w)}
              onOpenAddWorker={() => {
                if (currentUser) {
                  setIsProfileModalOpen(true);
                } else {
                  setIsAuthModalOpen(true);
                }
              }}
              onOpenAddShop={() => setIsAddShopOpen(true)}
              selectedUnion={selectedUnion}
              setSelectedUnion={setSelectedUnion}
              onSelectCategory={(catId) => setSelectedCategory(catId)}
            />
          </div>
        )}
      </main>

      {/* Footer with Creator Profile */}
      <Footer
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          setActiveTab('all');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectUnion={(uName) => {
          setSelectedUnion(uName);
          setActiveTab('all');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAddWorker={() => {
          if (currentUser) {
            setIsProfileModalOpen(true);
          } else {
            setIsAuthModalOpen(true);
          }
        }}
        onOpenAddShop={() => setIsAddShopOpen(true)}
        onNavigateShops={() => {
          setActiveTab('shops');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateWorkers={() => {
          setActiveTab('all');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenAdmin={handleOpenAdmin}
        onResetData={handleResetData}
      />

      {/* Modals */}
      <WorkerDetailModal
        worker={selectedWorkerForDetail}
        onClose={() => setSelectedWorkerForDetail(null)}
        isBookmarked={selectedWorkerForDetail ? bookmarkedIds.includes(selectedWorkerForDetail.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onOpenHireModal={(w) => {
          setSelectedWorkerForDetail(null);
          setSelectedWorkerForHire(w);
        }}
        onAddReview={handleAddReview}
      />

      <ShopDetailModal
        shop={selectedShopForDetail}
        onClose={() => setSelectedShopForDetail(null)}
        isBookmarked={selectedShopForDetail ? bookmarkedShopIds.includes(selectedShopForDetail.id) : false}
        onToggleBookmark={handleToggleShopBookmark}
        onAddReview={handleAddShopReview}
      />

      <HireRequestModal
        worker={selectedWorkerForHire}
        onClose={() => setSelectedWorkerForHire(null)}
        onSubmitRequest={handleSubmitHireRequest}
      />

      <AddWorkerModal
        isOpen={isAddWorkerOpen}
        onClose={() => setIsAddWorkerOpen(false)}
        onWorkerAdded={handleWorkerAdded}
      />

      <AddShopModal
        isOpen={isAddShopOpen}
        onClose={() => setIsAddShopOpen(false)}
        onShopAdded={handleShopAdded}
      />

      {/* Social / Google Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Logged-In Member Profile & Info Update Modal */}
      <MemberProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentUser={currentUser}
        existingWorker={loggedInWorkerProfile}
        existingShop={loggedInShopProfile}
        onSaveProfile={handleSaveMemberProfile}
        onSaveShopProfile={handleSaveMemberShop}
        onLogout={handleLogout}
        onViewLiveProfile={(worker) => setSelectedWorkerForDetail(worker)}
        onViewLiveShop={(shop) => setSelectedShopForDetail(shop)}
      />

      {/* SuperAdmin Control Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        workers={workers}
        shops={shops}
        hireRequests={hireRequests}
        emergencyContacts={emergencyContacts}
        systemSettings={systemSettings}
        onUpdateWorkers={(updated) => {
          setWorkers(updated);
          localStorage.setItem('shahrasti_workers_db_v4', JSON.stringify(updated));
        }}
        onUpdateShops={(updated) => {
          setShops(updated);
          localStorage.setItem('shahrasti_shops_db_v1', JSON.stringify(updated));
        }}
        onUpdateHireRequests={(updated) => {
          setHireRequests(updated);
          localStorage.setItem('shahrasti_hire_requests_db', JSON.stringify(updated));
        }}
        onUpdateEmergencyContacts={(updated) => {
          setEmergencyContacts(updated);
          saveEmergencyContacts(updated);
        }}
        onUpdateSystemSettings={(updated) => {
          setSystemSettings(updated);
          saveSystemSettings(updated);
        }}
        onResetAllData={handleResetData}
      />

      {/* SuperAdmin Passcode Gatekeeper */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={() => {
          setIsAdminLoginOpen(false);
          setIsAdminOpen(true);
        }}
        correctPasscode={systemSettings.adminPasscode}
      />

      {/* Emergency Helpline Modal */}
      <ShahrastiEmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />
    </div>
  );
}
