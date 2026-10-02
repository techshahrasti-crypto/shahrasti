import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  Store,
  ClipboardList,
  Settings,
  Download,
  Upload,
  CheckCircle2,
  Trash2,
  Edit,
  Phone,
  MessageSquare,
  Search,
  X,
  Plus,
  RefreshCw,
  AlertTriangle,
  Bell,
  Eye,
  Lock,
  PhoneCall,
  Save,
  Check
} from 'lucide-react';
import {
  HireRequest,
  ShopProfile,
  SystemSettings,
  WorkerProfile
} from '../types';
import { EmergencyContact } from '../data/shahrastiData';
import { SHAHRASHTI_AREAS } from '../data/shahrastiData';
import { exportAllDatabase, importDatabase } from '../utils/storage';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  workers: WorkerProfile[];
  shops: ShopProfile[];
  hireRequests: HireRequest[];
  emergencyContacts: EmergencyContact[];
  systemSettings: SystemSettings;
  onUpdateWorkers: (updated: WorkerProfile[]) => void;
  onUpdateShops: (updated: ShopProfile[]) => void;
  onUpdateHireRequests: (updated: HireRequest[]) => void;
  onUpdateEmergencyContacts: (updated: EmergencyContact[]) => void;
  onUpdateSystemSettings: (updated: SystemSettings) => void;
  onResetAllData: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  workers,
  shops,
  hireRequests,
  emergencyContacts,
  systemSettings,
  onUpdateWorkers,
  onUpdateShops,
  onUpdateHireRequests,
  onUpdateEmergencyContacts,
  onUpdateSystemSettings,
  onResetAllData
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'workers' | 'shops' | 'requests' | 'emergency' | 'settings'>('overview');
  const [workerSearch, setWorkerSearch] = useState('');
  const [shopSearch, setShopSearch] = useState('');
  const [selectedUnionFilter, setSelectedUnionFilter] = useState('all');

  // Announcement local state
  const [announcementText, setAnnouncementText] = useState(systemSettings.announcementText);
  const [isAnnouncementActive, setIsAnnouncementActive] = useState(systemSettings.isAnnouncementActive);
  const [announcementSaved, setAnnouncementSaved] = useState(false);

  // Emergency contact editing
  const [editingEmergency, setEditingEmergency] = useState<EmergencyContact | null>(null);

  // Status message
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const showFeedback = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(null), 3000);
  };

  // Worker Actions
  const handleToggleWorkerVerify = (workerId: string) => {
    const updated = workers.map((w) =>
      w.id === workerId ? { ...w, isVerified: !w.isVerified } : w
    );
    onUpdateWorkers(updated);
    showFeedback('কর্মীর ভেরিফিকেশন স্ট্যাটাস পরিবর্তন করা হয়েছে।');
  };

  const handleDeleteWorker = (workerId: string) => {
    const updated = workers.filter((w) => w.id !== workerId);
    onUpdateWorkers(updated);
    showFeedback('কর্মী প্রোফাইলটি ডাটাবেজ থেকে মুছে ফেলা হয়েছে।');
  };

  // Shop Actions
  const handleToggleShopVerify = (shopId: string) => {
    const updated = shops.map((s) =>
      s.id === shopId ? { ...s, isVerified: !s.isVerified } : s
    );
    onUpdateShops(updated);
    showFeedback('দোকানের ভেরিফিকেশন স্ট্যাটাস পরিবর্তন করা হয়েছে।');
  };

  const handleDeleteShop = (shopId: string) => {
    const updated = shops.filter((s) => s.id !== shopId);
    onUpdateShops(updated);
    showFeedback('দোকান প্রোফাইলটি মুছে ফেলা হয়েছে।');
  };

  // Hire Request Actions
  const handleUpdateReqStatus = (reqId: string, status: HireRequest['status']) => {
    const updated = hireRequests.map((r) =>
      r.id === reqId ? { ...r, status } : r
    );
    onUpdateHireRequests(updated);
    showFeedback('কাজের আবেদনের অবস্থা পরিবর্তন করা হয়েছে।');
  };

  const handleDeleteReq = (reqId: string) => {
    const updated = hireRequests.filter((r) => r.id !== reqId);
    onUpdateHireRequests(updated);
    showFeedback('আবেদনটি তালিকা থেকে মুছে ফেলা হয়েছে।');
  };

  // Save Announcement
  const handleSaveAnnouncement = () => {
    const updated = {
      ...systemSettings,
      announcementText,
      isAnnouncementActive
    };
    onUpdateSystemSettings(updated);
    setAnnouncementSaved(true);
    setTimeout(() => setAnnouncementSaved(false), 2500);
    showFeedback('নোটিশ ও ঘোষণা সফলভাবে সেভ করা হয়েছে।');
  };

  // Emergency contact save
  const handleSaveEmergencyContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEmergency) return;

    const exists = emergencyContacts.some((c) => c.id === editingEmergency.id);
    let updated: EmergencyContact[];
    if (exists) {
      updated = emergencyContacts.map((c) =>
        c.id === editingEmergency.id ? editingEmergency : c
      );
    } else {
      updated = [...emergencyContacts, editingEmergency];
    }
    onUpdateEmergencyContacts(updated);
    setEditingEmergency(null);
    showFeedback('জরুরি নম্বর আপডেট করা হয়েছে।');
  };

  // Export DB
  const handleExportDB = () => {
    const json = exportAllDatabase();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `amar-shahrasti-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showFeedback('ডাটাবেজ ব্যাকআপ সফলভাবে ডাউনলোড হয়েছে!');
  };

  // Import DB
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          const ok = importDatabase(content);
          if (ok) {
            showFeedback('ডাটাবেজ সফলভাবে রিস্টোর করা হয়েছে! পেজটি রিফ্রেশ হবে।');
            setTimeout(() => window.location.reload(), 1500);
          } else {
            alert('ভুল ফাইল ফরম্যাট। অনুগ্রহ করে বৈধ ব্যাকআপ ফাইল নির্বাচন করুন।');
          }
        }
      };
      reader.readAsText(file);
    }
  };

  // Filtered workers
  const filteredWorkers = workers.filter((w) => {
    if (selectedUnionFilter !== 'all' && w.unionOrArea !== selectedUnionFilter) return false;
    if (workerSearch.trim()) {
      const q = workerSearch.toLowerCase().trim();
      return (
        w.name.toLowerCase().includes(q) ||
        w.profession.toLowerCase().includes(q) ||
        w.phone.includes(q) ||
        (w.village || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Filtered shops
  const filteredShops = shops.filter((s) => {
    if (shopSearch.trim()) {
      const q = shopSearch.toLowerCase().trim();
      return (
        s.name.toLowerCase().includes(q) ||
        s.ownerName.toLowerCase().includes(q) ||
        s.marketName.toLowerCase().includes(q) ||
        s.phone.includes(q)
      );
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto">
      <div className="relative bg-white w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[96vh] flex flex-col border border-slate-300">
        {/* Top SuperAdmin Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/90 text-white flex items-center justify-center shadow-xs">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold tracking-tight">
                  সুপারএডমিন কন্ট্রোল প্যানেল
                </h2>
                <span className="text-[10px] bg-red-600 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  SuperAdmin Active
                </span>
              </div>
              <p className="text-xs text-slate-400">
                আমার শাহরাস্তি · সকল কর্মী, দোকান, আবেদন ও সিস্টেম সেটিং মনিটরিং
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportDB}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-lg border border-slate-700 transition-colors"
              title="সম্পূর্ণ ডাটাবেজ ব্যাকআপ নিন"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ব্যাকআপ ডাউনলোড</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              title="এডমিন প্যানেল বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Feedback Alert Banner */}
        {actionSuccess && (
          <div className="bg-emerald-600 text-white px-4 py-2 text-xs font-semibold flex items-center justify-between animate-in fade-in">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>{actionSuccess}</span>
            </span>
            <button onClick={() => setActionSuccess(null)}>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 border-b border-slate-200 bg-slate-100 px-4 pt-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'overview'
                ? 'border-red-600 text-red-600 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>📊 ওভারভিউ ও পরিসংখ্যান</span>
          </button>

          <button
            onClick={() => setActiveTab('workers')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'workers'
                ? 'border-red-600 text-red-600 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>কর্মী ব্যবস্থাপনা ({workers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('shops')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'shops'
                ? 'border-red-600 text-red-600 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>দোকান ব্যবস্থাপনা ({shops.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'requests'
                ? 'border-red-600 text-red-600 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>কাজের আবেদন ({hireRequests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('emergency')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'emergency'
                ? 'border-red-600 text-red-600 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <PhoneCall className="w-4 h-4 text-red-600" />
            <span>জরুরি নম্বর সেটিং</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'settings'
                ? 'border-red-600 text-red-600 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>সিস্টেম ও ব্যাকআপ</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6 flex-1">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Analytics Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>মোট কারিগর / কর্মী</span>
                    <Users className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 font-mono">
                    {workers.length} জন
                  </div>
                  <div className="text-[11px] text-emerald-700">
                    {workers.filter((w) => w.isVerified).length} জন যাচাইকৃত
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>দোকান ও ব্যবসা</span>
                    <Store className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 font-mono">
                    {shops.length}টি
                  </div>
                  <div className="text-[11px] text-blue-700">
                    {shops.filter((s) => s.homeDelivery).length}টি হোম ডেলিভারি
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>কাজের আবেদন</span>
                    <ClipboardList className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 font-mono">
                    {hireRequests.length}টি
                  </div>
                  <div className="text-[11px] text-amber-700">
                    {hireRequests.filter((r) => r.status === 'pending').length}টি অপেক্ষমাণ
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>শাহরাস্তি ইউনিয়ন</span>
                    <ShieldAlert className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 font-mono">
                    ১০+১
                  </div>
                  <div className="text-[11px] text-slate-500">
                    ১০ ইউনিয়ন ও ১ পৌরসভা
                  </div>
                </div>
              </div>

              {/* Announcement / Broadcast Banner Control */}
              <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-amber-600" />
                    <div>
                      <h4 className="text-sm font-bold text-amber-950">
                        অ্যাপের শীর্ষে নোটিশ ও লাইভ ঘোষণা
                      </h4>
                      <p className="text-xs text-slate-600">
                        শাহরাস্তির সকল ব্যবহারকারী অ্যাপে ঢুকলে এই নোটিশটি দেখতে পাবেন
                      </p>
                    </div>
                  </div>

                  <label className="flex items-center gap-2 text-xs font-bold text-amber-900 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAnnouncementActive}
                      onChange={(e) => setIsAnnouncementActive(e.target.checked)}
                      className="w-4 h-4 text-amber-600 rounded"
                    />
                    <span>নোটিশ চালু রাখুন</span>
                  </label>
                </div>

                <textarea
                  rows={2}
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  placeholder="যেমন: শাহরাস্তি উপজেলার সম্মানিত নাগরিকদের জন্য জরুরি সেবা নম্বর আপডেট করা হয়েছে..."
                  className="w-full p-2.5 bg-white border border-amber-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />

                <div className="flex items-center justify-end">
                  <button
                    onClick={handleSaveAnnouncement}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{announcementSaved ? 'সংরক্ষিত হয়েছে!' : 'নোটিশ সংরক্ষণ করুন'}</span>
                  </button>
                </div>
              </div>

              {/* Recent Pending Requests */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-slate-900 flex items-center justify-between">
                  <span>সাম্প্রতিক কাজের আবেদনসমূহ</span>
                  <button
                    onClick={() => setActiveTab('requests')}
                    className="text-xs text-emerald-700 hover:underline"
                  >
                    সকল আবেদন দেখুন →
                  </button>
                </h4>

                {hireRequests.slice(0, 3).map((req) => (
                  <div
                    key={req.id}
                    className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900">
                        {req.clientName} ({req.clientPhone})
                      </div>
                      <div className="text-slate-600">
                        কর্মী: {req.workerName} · ঠিকানা: {req.clientAddress}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                        কাজের বিবরণ: {req.workDescription}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                        {req.status === 'pending' ? 'অপেক্ষমাণ' : req.status}
                      </span>
                      <a
                        href={`tel:${req.clientPhone}`}
                        className="p-1.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
                        title="ক্লায়েন্টকে কল করুন"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: WORKER MANAGEMENT */}
          {activeTab === 'workers' && (
            <div className="space-y-4">
              {/* Controls */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={workerSearch}
                    onChange={(e) => setWorkerSearch(e.target.value)}
                    placeholder="নাম, পেশা, মোবাইল বা গ্রাম খুঁজুন..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={selectedUnionFilter}
                    onChange={(e) => setSelectedUnionFilter(e.target.value)}
                    className="text-xs p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium"
                  >
                    <option value="all">সকল ইউনিয়ন</option>
                    {SHAHRASHTI_AREAS.map((a) => (
                      <option key={a.id} value={a.name}>
                        {a.name}
                      </option>
                    ))}
                  </select>

                  <span className="text-xs font-mono text-slate-500 whitespace-nowrap">
                    ({filteredWorkers.length} জন)
                  </span>
                </div>
              </div>

              {/* Workers Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">কর্মী</th>
                        <th className="p-3">পেশা ও বিভাগ</th>
                        <th className="p-3">এলাকা / ইউনিয়ন</th>
                        <th className="p-3">যোগাযোগ</th>
                        <th className="p-3">ভেরিফিকেশন</th>
                        <th className="p-3 text-right">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredWorkers.map((worker) => (
                        <tr key={worker.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <img
                                src={worker.photo}
                                alt={worker.name}
                                className="w-8 h-8 rounded-full object-cover border border-slate-300"
                              />
                              <div>
                                <div className="font-bold text-slate-900">{worker.name}</div>
                                <div className="text-[10px] text-slate-400 font-mono">আইডি: {worker.id}</div>
                              </div>
                            </div>
                          </td>

                          <td className="p-3">
                            <div className="font-semibold text-slate-800">{worker.profession}</div>
                            <div className="text-[10px] text-slate-500">{worker.dailyRate}</div>
                          </td>

                          <td className="p-3">
                            <div className="font-medium text-slate-800">{worker.unionOrArea}</div>
                            <div className="text-[10px] text-slate-500">{worker.village || 'শাহরাস্তি'}</div>
                          </td>

                          <td className="p-3 font-mono">
                            <div>{worker.phone}</div>
                            <div className="text-[10px] text-emerald-600">WA: {worker.whatsapp}</div>
                          </td>

                          <td className="p-3">
                            <button
                              onClick={() => handleToggleWorkerVerify(worker.id)}
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors ${
                                worker.isVerified
                                  ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                                  : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                              }`}
                            >
                              {worker.isVerified ? '✓ যাচাইকৃত' : 'যাচাই বাকি'}
                            </button>
                          </td>

                          <td className="p-3 text-right space-x-1">
                            <a
                              href={`tel:${worker.phone}`}
                              className="p-1.5 inline-block text-slate-600 hover:text-slate-900 bg-slate-100 rounded"
                              title="কল করুন"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                            <button
                              onClick={() => {
                                if (confirm(`আপনি কি সত্যিই '${worker.name}' এর প্রোফাইলটি মুছে ফেলতে চান?`)) {
                                  handleDeleteWorker(worker.id);
                                }
                              }}
                              className="p-1.5 inline-block text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="প্রোফাইল মুছুন"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SHOP MANAGEMENT */}
          {activeTab === 'shops' && (
            <div className="space-y-4">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={shopSearch}
                  onChange={(e) => setShopSearch(e.target.value)}
                  placeholder="দোকানের নাম, মালিক বা বাজার খুঁজুন..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">দোকান / প্রতিষ্ঠান</th>
                        <th className="p-3">বাজার ও ইউনিয়ন</th>
                        <th className="p-3">মালিক ও যোগাযোগ</th>
                        <th className="p-3">চলমান অফার</th>
                        <th className="p-3">ভেরিফিকেশন</th>
                        <th className="p-3 text-right">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredShops.map((shop) => (
                        <tr key={shop.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3">
                            <div className="font-bold text-slate-900">{shop.name}</div>
                            <div className="text-[10px] text-slate-500 line-clamp-1">{shop.tagline}</div>
                          </td>

                          <td className="p-3">
                            <div className="font-semibold text-slate-800">{shop.marketName}</div>
                            <div className="text-[10px] text-slate-500">{shop.unionOrArea}</div>
                          </td>

                          <td className="p-3">
                            <div className="font-medium text-slate-800">{shop.ownerName}</div>
                            <div className="text-[10px] text-slate-500 font-mono">{shop.phone}</div>
                          </td>

                          <td className="p-3 max-w-[200px]">
                            {shop.discountOffer ? (
                              <span className="text-[11px] text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 line-clamp-1">
                                {shop.discountOffer}
                              </span>
                            ) : (
                              <span className="text-slate-400 text-[10px]">অফার নেই</span>
                            )}
                          </td>

                          <td className="p-3">
                            <button
                              onClick={() => handleToggleShopVerify(shop.id)}
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors ${
                                shop.isVerified
                                  ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                                  : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                              }`}
                            >
                              {shop.isVerified ? '✓ যাচাইকৃত' : 'যাচাই বাকি'}
                            </button>
                          </td>

                          <td className="p-3 text-right space-x-1">
                            <button
                              onClick={() => {
                                if (confirm(`আপনি কি সত্যিই '${shop.name}' দোকানটি মুছে ফেলতে চান?`)) {
                                  handleDeleteShop(shop.id);
                                }
                              }}
                              className="p-1.5 inline-block text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="দোকান মুছুন"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: HIRE REQUESTS */}
          {activeTab === 'requests' && (
            <div className="space-y-4">
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">ক্লায়েন্ট</th>
                        <th className="p-3">অনুরোধকৃত কর্মী</th>
                        <th className="p-3">কাজের বিবরণ</th>
                        <th className="p-3">স্ট্যাটাস</th>
                        <th className="p-3 text-right">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {hireRequests.map((req) => (
                        <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3">
                            <div className="font-bold text-slate-900">{req.clientName}</div>
                            <div className="text-[11px] font-mono text-slate-600">{req.clientPhone}</div>
                            <div className="text-[10px] text-slate-400">{req.clientAddress}</div>
                          </td>

                          <td className="p-3">
                            <div className="font-semibold text-slate-800">{req.workerName}</div>
                            <div className="text-[10px] text-slate-500 font-mono">{req.workerPhone}</div>
                          </td>

                          <td className="p-3 max-w-[250px]">
                            <div className="text-slate-800 line-clamp-2">{req.workDescription}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">তারিখ: {req.preferredDate}</div>
                          </td>

                          <td className="p-3">
                            <select
                              value={req.status}
                              onChange={(e) => handleUpdateReqStatus(req.id, e.target.value as any)}
                              className="text-xs p-1 bg-white border border-slate-300 rounded font-medium text-slate-800"
                            >
                              <option value="pending">অপেক্ষমাণ (Pending)</option>
                              <option value="contacted">যোগাযোগ সম্পন্ন (Contacted)</option>
                              <option value="completed">কাজ শেষ (Completed)</option>
                              <option value="cancelled">বাতিল (Cancelled)</option>
                            </select>
                          </td>

                          <td className="p-3 text-right space-x-1">
                            <a
                              href={`tel:${req.clientPhone}`}
                              className="p-1.5 inline-block text-slate-600 hover:text-slate-900 bg-slate-100 rounded"
                              title="কল করুন"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                            <button
                              onClick={() => handleDeleteReq(req.id)}
                              className="p-1.5 inline-block text-red-600 hover:bg-red-50 rounded"
                              title="আবেদন মুছুন"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: EMERGENCY CONTACTS */}
          {activeTab === 'emergency' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">
                    শাহরাস্তি উপজেলার জরুরি হটলাইন সেবা নম্বর
                  </h4>
                  <p className="text-xs text-slate-500">
                    হাসপাতাল, থানা পুলিশ, ফায়ার সার্ভিস ও পল্লী বিদ্যুতের যোগাযোগ নম্বর পরিচালনা করুন
                  </p>
                </div>

                <button
                  onClick={() =>
                    setEditingEmergency({
                      id: `em-new-${Date.now()}`,
                      serviceName: '',
                      department: '',
                      phone: '',
                      address: '',
                      is24Hours: true
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>নতুন জরুরি নম্বর যুক্ত করুন</span>
                </button>
              </div>

              {/* Editing Form if selected */}
              {editingEmergency && (
                <form
                  onSubmit={handleSaveEmergencyContact}
                  className="p-4 bg-red-50/60 border border-red-200 rounded-xl space-y-3"
                >
                  <h5 className="font-bold text-xs text-red-900">জরুরি সেবার তথ্য সম্পাদনা:</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="সেবার নাম (যেমন: শাহরাস্তি থানা পুলিশ)"
                      value={editingEmergency.serviceName}
                      onChange={(e) => setEditingEmergency({ ...editingEmergency, serviceName: e.target.value })}
                      className="p-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                    />
                    <input
                      type="text"
                      required
                      placeholder="বিভাগ (যেমন: জরুরি কল সেন্টার)"
                      value={editingEmergency.department}
                      onChange={(e) => setEditingEmergency({ ...editingEmergency, department: e.target.value })}
                      className="p-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="ফোন নম্বর (যেমন: 01320-116238)"
                      value={editingEmergency.phone}
                      onChange={(e) => setEditingEmergency({ ...editingEmergency, phone: e.target.value })}
                      className="p-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 font-mono"
                    />
                    <input
                      type="text"
                      placeholder="ঠিকানা / অবস্থান"
                      value={editingEmergency.address}
                      onChange={(e) => setEditingEmergency({ ...editingEmergency, address: e.target.value })}
                      className="p-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setEditingEmergency(null)}
                      className="px-3 py-1.5 text-xs text-slate-600 bg-white border border-slate-300 rounded-lg"
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs font-bold text-white bg-red-700 rounded-lg"
                    >
                      সেভ করুন
                    </button>
                  </div>
                </form>
              )}

              {/* List of Contacts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {emergencyContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900">{contact.serviceName}</div>
                      <div className="text-slate-600 font-medium">{contact.department}</div>
                      <div className="text-slate-500 font-mono mt-0.5">{contact.phone}</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setEditingEmergency(contact)}
                        className="p-1.5 text-slate-600 hover:text-slate-900 bg-white border border-slate-300 rounded-lg"
                        title="সম্পাদনা"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SYSTEM & BACKUP */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Download className="w-4 h-4 text-emerald-700" />
                  <span>ডাটা ব্যাকআপ ও রিস্টোর (Data Backup & Restore)</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  আপনার অ্যাপের সকল কর্মী, দোকান, কাজের আবেদন ও সেটিংসের একটি নিরাপদ ব্যাকআপ ফাইল (JSON) ডাউনলোড করে নিরাপদে সংরক্ষণ করতে পারেন।
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={handleExportDB}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>ব্যাকআপ ফাইল ডাউনলোড করুন (JSON)</span>
                  </button>

                  <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold cursor-pointer transition-colors">
                    <Upload className="w-4 h-4 text-slate-600" />
                    <span>ব্যাকআপ ফাইল আপলোড করে রিস্টোর করুন</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportFile}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="p-5 bg-red-50/70 border border-red-200 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>ডেভেলপার ও সিস্টেম রিসেট (Danger Zone)</span>
                </div>
                <p className="text-xs text-red-700 leading-relaxed">
                  আপনি যদি পরীক্ষামূলক ডাটা পরিষ্কার করে পুনরায় শাহরাস্তির প্রাথমিক যাচাইকৃত কর্মী ও দোকানের ডিফল্ট ডাটাবেজে ফিরে যেতে চান, তবে নিচের বাটনটি চাপুন।
                </p>

                <button
                  onClick={() => {
                    if (confirm('আপনি কি সত্যিই প্রাথমিক ডিফল্ট ডাটায় রিসেট করতে চান?')) {
                      onResetAllData();
                      showFeedback('সকল ডাটা সফলভাবে ডিফল্ট সেটিংসে রিসেট করা হয়েছে।');
                    }
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  ডিফল্ট ডাটা রিলোড করুন
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span className="font-mono">আমার শাহরাস্তি · SuperAdmin v2.4</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors"
          >
            কন্ট্রোল প্যানেল থেকে বের হন
          </button>
        </div>
      </div>
    </div>
  );
};
