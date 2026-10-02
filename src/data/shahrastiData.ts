export interface ShahrastiUnion {
  id: string;
  name: string;
  type: 'pourashava' | 'union';
  famousMarkets: string[];
  villages: string[];
  description: string;
}

export const SHAHRASHTI_AREAS: ShahrastiUnion[] = [
  {
    id: 'pourashava',
    name: 'শাহরাস্তি পৌরসভা',
    type: 'pourashava',
    famousMarkets: ['ঠাকুরবাজার', 'নিজমেহের বাজার', 'মেহের কালীবাড়ি মোড়', 'উপজেলা গেইট'],
    villages: ['নিজমেহের', 'শ্রীপুর', 'উপলতা', 'কাঁকৈরতলা', 'নোয়াগাঁও', 'হোসনাবাদ'],
    description: 'উপজেলা প্রশাসনিক সদর দপ্তর, পৌর মার্কেট ও প্রধান বাণিজ্যিক কেন্দ্র'
  },
  {
    id: 'meher_north',
    name: 'মেহের উত্তর ইউনিয়ন',
    type: 'union',
    famousMarkets: ['সুন্দ্রা বাজার', 'মেহের রেলওয়ে স্টেশন বাজার', 'দোয়াভাঙ্গা মোড়'],
    villages: ['সুন্দ্রা', 'দেপাড়া', 'বানিয়াচোঁ', 'খিলাপাড়া', 'শুকদেবপুর'],
    description: 'চাঁদপুর-কুমিল্লা মহাসড়ক ও মেহের স্টেশন সংলগ্ন ব্যস্ত এলাকা'
  },
  {
    id: 'meher_south',
    name: 'মেহের দক্ষিণ ইউনিয়ন',
    type: 'union',
    famousMarkets: ['কালিয়ারচোঁ বাজার', 'লতিফগঞ্জ বাজার'],
    villages: ['কালিয়ারচোঁ', 'ভুলতি', 'নাহাড়া', 'কান্দিরপাড়', 'দাদপুর'],
    description: 'কালিয়ারচোঁ বাজার ও দক্ষিণাঞ্চলের গুরুত্বপূর্ণ ব্যবসায়িক সংযোগ'
  },
  {
    id: 'chitoshi_east',
    name: 'চিতোষী পূর্ব ইউনিয়ন',
    type: 'union',
    famousMarkets: ['চিতোষী বাজার', 'চিতোষী রেলওয়ে স্টেশন রোড', 'পাড়াগাঁও মোড়'],
    villages: ['চিতোষী', 'পাড়াগাঁও', 'মনিপুর', 'নুরপুর', 'পুকুরিয়া'],
    description: 'ঐতিহ্যবাহী চিতোষী বাজার ও চাঁদপুর-লাকসাম রেলওয়ে জংশন রুট'
  },
  {
    id: 'chitoshi_west',
    name: 'চিতোষী পশ্চিম ইউনিয়ন',
    type: 'union',
    famousMarkets: ['উঘারিয়া বাজার', 'খেয়াঘাট বাজার', 'আয়নাতলী বাজার'],
    villages: ['উঘারিয়া', 'আয়নাতলী', 'খেয়াঘাট', 'ধামরা', 'রাখালিয়া'],
    description: 'উঘারিয়া ও পশ্চিম সীমান্ত অঞ্চলের কৃষি ও কারিগরি কেন্দ্র'
  },
  {
    id: 'suchipara_north',
    name: 'সূচীপাড়া উত্তর ইউনিয়ন',
    type: 'union',
    famousMarkets: ['শোল্লা বাজার', 'সূচীপাড়া বাজার'],
    villages: ['শোল্লা', 'সূচীপাড়া', 'চেড়িয়ারা', 'নরিংপুর', 'দহশ্রী'],
    description: 'শোল্লা বহুমুখী হাইস্কুল ও সূচীপাড়া বাজার এলাকা'
  },
  {
    id: 'suchipara_south',
    name: 'সূচীপাড়া দক্ষিণ ইউনিয়ন',
    type: 'union',
    famousMarkets: ['খিলপাড়া বাজার', 'রাঘবপুর মোড়'],
    villages: ['খিলপাড়া', 'রাঘবপুর', 'ফেরুয়া', 'বসতপুর'],
    description: 'দক্ষিণাঞ্চলের ঐতিহ্যবাহী গ্রাম ও কারিগর অধ্যুষিত এলাকা'
  },
  {
    id: 'rayshree_north',
    name: 'রায়শ্রী উত্তর ইউনিয়ন',
    type: 'union',
    famousMarkets: ['রায়শ্রী বাজার', 'পঞ্চগ্রাম মোড়'],
    villages: ['রায়শ্রী', 'পঞ্চগ্রাম', 'শ্রীনগর', 'মাটিপাড়া'],
    description: 'উত্তর রায়শ্রীর ঘনবসতিপূর্ণ ও কৃষি প্রধান এলাকা'
  },
  {
    id: 'rayshree_south',
    name: 'রায়শ্রী দক্ষিণ ইউনিয়ন',
    type: 'union',
    famousMarkets: ['খিলা বাজার', 'নুরপুর মোড়'],
    villages: ['খিলা', 'নুরপুর', 'আলমগীর বাজার', 'রামপুর'],
    description: 'খিলা বাজার কেন্দ্রিক দক্ষিণ রায়শ্রীর গ্রামীণ জনপদ'
  },
  {
    id: 'tamta_north',
    name: 'টামটা উত্তর ইউনিয়ন',
    type: 'union',
    famousMarkets: ['ওয়ারুক বাজার', 'টামটা বাজার'],
    villages: ['ওয়ারুক', 'টামটা', 'বলশীদ', 'ইছাপুরা'],
    description: 'ওয়ারুক স্টেশন ও উত্তর শাহরাস্তির প্রধান সড়ক সংযোগ'
  },
  {
    id: 'tamta_south',
    name: 'টামটা দক্ষিণ ইউনিয়ন',
    type: 'union',
    famousMarkets: ['কালিবাড়ি বাজার', 'ধোপল্লা মোড়'],
    villages: ['ধোপল্লা', 'দক্ষিণ টামটা', 'জগতপুর', 'আলিপুর'],
    description: 'শান্ত ও সমৃদ্ধ কৃষি ও কুটির শিল্পের জনপদ'
  }
];

export interface EmergencyContact {
  id: string;
  serviceName: string;
  department: string;
  phone: string;
  address: string;
  is24Hours: boolean;
}

export const SHAHRASHTI_EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'em-1',
    serviceName: 'শাহরাস্তি উপজেলা স্বাস্থ্য কমপ্লেক্স (হাসপাতাল)',
    department: 'জরুরি বিভাগ ও এম্বুলেন্স',
    phone: '01730-324831',
    address: 'ঠাকুরবাজার সংলগ্ন, শাহরাস্তি পৌরসভা',
    is24Hours: true
  },
  {
    id: 'em-2',
    serviceName: 'শাহরাস্তি থানা পুলিশ (ওসি ডিউটি অফিসার)',
    department: 'আইনশৃঙ্খলা ও জরুরি সেবা',
    phone: '01320-116238',
    address: 'শাহরাস্তি গেইট রোড, শাহরাস্তি',
    is24Hours: true
  },
  {
    id: 'em-3',
    serviceName: 'শাহরাস্তি ফায়ার সার্ভিস ও সিভিল ডিফেন্স',
    department: 'অগ্নি নির্বাপণ ও উদ্ধার',
    phone: '01710-291771',
    address: 'উপজেলা পরিষদ রোড, শাহরাস্তি',
    is24Hours: true
  },
  {
    id: 'em-4',
    serviceName: 'চাঁদপুর পল্লী বিদ্যুৎ সমিতি-১ (শাহরাস্তি জোনাল অফিস)',
    department: 'বিদ্যুৎ বিভ্রাট ও অভিযোগ কেন্দ্র',
    phone: '01769-400870',
    address: 'মেহের রোড, শাহরাস্তি',
    is24Hours: true
  },
  {
    id: 'em-5',
    serviceName: 'জরুরি অক্সিজেন ও অ্যাম্বুলেন্স সেবা',
    department: 'শাহরাস্তি রেড ক্রিসেন্ট ও স্বেচ্ছাসেবী টিম',
    phone: '01819-374829',
    address: 'ঠাকুরবাজার, শাহরাস্তি',
    is24Hours: true
  }
];
