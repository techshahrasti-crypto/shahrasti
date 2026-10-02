import { ShopCategory } from '../types';

export const SHOP_CATEGORIES: ShopCategory[] = [
  {
    id: 'all',
    name: 'সকল দোকান ও ব্যবসা',
    nameEn: 'All Shops & Businesses',
    iconName: 'Store',
    description: 'শাহরাস্তির সকল প্রকার বাণিজ্যিক প্রতিষ্ঠান ও খুচরা/পাইকারি দোকান'
  },
  {
    id: 'hardware_sanitary',
    name: 'হার্ডওয়্যার, স্যানিটারি ও রড-সিমেন্ট',
    nameEn: 'Hardware & Sanitary',
    iconName: 'Wrench',
    description: 'নির্মাণ সামগ্রী, রড, সিমেন্ট, পাইপ, ফিটিংস, টাইলস ও রঙ'
  },
  {
    id: 'pharmacy',
    name: 'ফার্মেসি ও ড্রাগ হাউস',
    nameEn: 'Pharmacy & Drug House',
    iconName: 'Stethoscope',
    description: 'অরিজিনাল ওষুধ, ভেটেরিনারি ড্রাগস, প্রেসার/সুগার টেস্ট ও প্রাথমিক সেবা'
  },
  {
    id: 'grocery_super',
    name: 'গ্রোসারি, মুদি ও ডিপার্টমেন্টাল শপ',
    nameEn: 'Grocery & Super Shop',
    iconName: 'ShoppingBag',
    description: 'নিত্যপ্রয়োজনীয় চাল, ডাল, তেল, মসলা ও প্যাকেটজাত ভোগ্যপণ্য'
  },
  {
    id: 'clothing_textile',
    name: 'বস্ত্রালয় ও কাপড়ের দোকান',
    nameEn: 'Clothing & Textile',
    iconName: 'Shirt',
    description: 'শাড়ি, থ্রি-পিস, শার্ট-প্যান্ট পিস, রেডিমেড পোশাক ও থান কাপড়'
  },
  {
    id: 'electronics_mobile',
    name: 'মোবাইল শোরুম ও ইলেকট্রনিক্স',
    nameEn: 'Mobile & Electronics',
    iconName: 'Smartphone',
    description: 'স্মার্টফোন, টিভি, ফ্রিজ, ফ্যান, মাইক্রোওভেন ও এক্সেসরিজ'
  },
  {
    id: 'bike_parts',
    name: 'মোটরসাইকেল শোরুম ও পার্টস',
    nameEn: 'Bike Showroom & Parts',
    iconName: 'Bike',
    description: 'নতুন/পুরাতন বাইক ক্রয়-বিক্রয়, অরিজিনাল ইঞ্জিন পার্টস ও লুব্রিকেন্ট'
  },
  {
    id: 'furniture_sawmill',
    name: 'ফার্নিচার শোরুম ও স-মিল',
    nameEn: 'Furniture & Sawmill',
    iconName: 'Armchair',
    description: 'সেগুন কাঠের আধুনিক খাট, আলমারি, ডাইনিং টেবিল ও সাইজ কাঠ'
  },
  {
    id: 'restaurant_hotel',
    name: 'রেস্টুরেন্ট, হোটেল ও মিষ্টান্ন ভান্ডার',
    nameEn: 'Restaurant & Sweets',
    iconName: 'Utensils',
    description: 'ঐতিহ্যবাহী মিষ্টি, কাচ্চি, চাইনিজ, ফাস্টফুড ও ঘরোয়া খাবার'
  },
  {
    id: 'agri_fertilizer',
    name: 'কৃষি বীজ, সার ও বালাইনাশক',
    nameEn: 'Agri Seeds & Fertilizer',
    iconName: 'Sprout',
    description: 'উন্নত জাতের ধানের বীজ, সুষম সার, কীটনাশক ও স্প্রে মেশিন'
  },
  {
    id: 'feed_poultry',
    name: 'পোল্ট্রি, ফিশ ফিড ও ডেইরি সাপ্লাই',
    nameEn: 'Feed & Livestock Supply',
    iconName: 'Fish',
    description: 'ব্রয়লার/লেয়ার খাদ্য, মাছের ফিড ও গাভীর দানাদার পুষ্টি উপাদান'
  },
  {
    id: 'jewelry_gold',
    name: 'জুয়েলার্স ও স্বর্ণশিল্প',
    nameEn: 'Jewelers & Gold Crafts',
    iconName: 'Gem',
    description: 'হলমার্ক করা সোনার অলঙ্কার, রুপার গহনা ও অর্ডার অনুযায়ী তৈরি'
  },
  {
    id: 'books_stationery',
    name: 'বইয়ের লাইব্রেরি ও স্টেশনারি',
    nameEn: 'Books & Stationery',
    iconName: 'BookOpen',
    description: 'স্কুল-কলেজ পাঠ্যবই, খাতা, কলম, অফিস স্টেশনারি ও ফটোকপি'
  },
  {
    id: 'diagnostic_clinic',
    name: 'ডায়াগনস্টিক সেন্টার ও ডেন্টাল কেয়ার',
    nameEn: 'Diagnostic Center & Clinic',
    iconName: 'Activity',
    description: 'ডিজিটাল এক্স-রে, আল্ট্রাসনোগ্রাম, প্যাথলজি টেস্ট ও ডেন্টাল চিকিৎসা'
  },
  {
    id: 'decor_event',
    name: 'ডেকোরেটর ও ইভেন্ট সামগ্রী',
    nameEn: 'Event Decor & Sound',
    iconName: 'Music',
    description: 'বিয়ে, মাহফিল ও অনুষ্ঠানের গেট, সামিয়ানা, চেয়ার ও সাউন্ড সিস্টেম ভাড়া'
  },
  {
    id: 'other_business',
    name: 'অন্যান্য বাণিজ্যিক প্রতিষ্ঠান',
    nameEn: 'Other Commercial Enterprises',
    iconName: 'Building2',
    description: 'শাহরাস্তির সকল ক্ষুদ্র, মাঝারি ও বৃহৎ ব্যবসা প্রতিষ্ঠান'
  }
];
