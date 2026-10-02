import { ProfessionCategory } from '../types';

export const PROFESSION_CATEGORIES: ProfessionCategory[] = [
  {
    id: 'all',
    name: 'সকল পেশা',
    nameEn: 'All Professions',
    iconName: 'LayoutGrid',
    description: 'শাহরাস্তির সকল দক্ষ কারিগর, টেকনিশিয়ান ও মেহনতি মানুষ'
  },
  // ১. গৃহনির্মাণ ও মেরামত
  {
    id: 'electrician',
    name: 'ইলেকট্রিশিয়ান ও ওয়্যারিং',
    nameEn: 'Electrician & Wiring',
    iconName: 'Zap',
    group: 'নির্মাণ ও গৃহ মেরামত',
    description: 'হাউস ওয়্যারিং, ডিবি বোর্ড, শর্ট সার্কিট ও বিদ্যুৎ মেরামত'
  },
  {
    id: 'plumber',
    name: 'প্লাম্বার ও স্যানিটারি মিস্ত্রি',
    nameEn: 'Plumber & Sanitary',
    iconName: 'Wrench',
    group: 'নির্মাণ ও গৃহ মেরামত',
    description: 'পাইপ ফিটিংস, পানির পাম্প, কমোড, বেসিন ও বাথরুম সামগ্রী'
  },
  {
    id: 'carpenter',
    name: 'কাঠমিস্ত্রি ও ফার্নিচার কারিগর',
    nameEn: 'Carpenter & Furniture',
    iconName: 'Hammer',
    group: 'নির্মাণ ও গৃহ মেরামত',
    description: 'খাট, ওয়ারড্রব, কিচেন কেবিনেট, দরজা-জানালা ও কাঠের নকশা'
  },
  {
    id: 'mason',
    name: 'রাজমিস্ত্রি ও গাঁথুনি মিস্ত্রি',
    nameEn: 'Mason & Construction',
    iconName: 'BrickWall',
    group: 'নির্মাণ ও গৃহ মেরামত',
    description: 'দালান নির্মাণ, কলাম, ছাদ ঢালাই, ইট গাঁথুনি ও প্লাস্টার'
  },
  {
    id: 'tiles_marble',
    name: 'টাইলস ও মার্বেল মিস্ত্রি',
    nameEn: 'Tiles & Marble',
    iconName: 'Grid',
    group: 'নির্মাণ ও গৃহ মেরামত',
    description: 'ফ্লোর ও ওয়াল টাইলস, গ্রানাইট, মোজাইক ও মার্বেল ফিটিংস'
  },
  {
    id: 'painter',
    name: 'রঙ ও পুটিং মিস্ত্রি',
    nameEn: 'Painter & Polisher',
    iconName: 'Paintbrush',
    group: 'নির্মাণ ও গৃহ মেরামত',
    description: 'ইন্টেরিয়র ও এক্সটেরিয়র কালার, পুটিং, ওয়েদারকোট ও বার্নিশ'
  },
  {
    id: 'thai_glass',
    name: 'থাই অ্যালুমিনিয়াম ও গ্লাস',
    nameEn: 'Thai Aluminium & Glass',
    iconName: 'Square',
    group: 'নির্মাণ ও গৃহ মেরামত',
    description: 'স্লাইডিং গ্লাস, থাই জানালা, পার্টিশন ও বাথরুম ডোর'
  },
  {
    id: 'welder',
    name: 'ওয়েল্ডিং ও গ্রিল মিস্ত্রি',
    nameEn: 'Welder & Grill/Gate',
    iconName: 'Flame',
    group: 'নির্মাণ ও গৃহ মেরামত',
    description: 'লোহার গ্রিল, মেইন গেট, ছাদের ট্রাস, রেলিং ও এসএস কাজ'
  },
  {
    id: 'rod_binder',
    name: 'রড বাইন্ডার ও ছাদ ঢালাই',
    nameEn: 'Rod Binder & Shuttering',
    iconName: 'HardHat',
    group: 'নির্মাণ ও গৃহ মেরামত',
    description: 'ছাদ ও বিমের রড বাইন্ডিং, শাটারিং ও ঢালাই ভাইব্রেটর'
  },
  {
    id: 'laborer',
    name: 'দিনমজুর ও জোগালি শ্রমিক',
    nameEn: 'Day Laborer & Helper',
    iconName: 'Users',
    group: 'নির্মাণ ও গৃহ মেরামত',
    description: 'রাজমিস্ত্রির জোগালি, মালামাল পরিবহন ও দৈনিক মজুরির কাজ'
  },
  {
    id: 'earth_worker',
    name: 'মাটি কাটা ও ভরাট শ্রমিক',
    nameEn: 'Earth Excavator',
    iconName: 'Shovel',
    group: 'নির্মাণ ও গৃহ মেরামত',
    description: 'ভিটি তৈরি, মাটি কাটা, পুকুর খনন ও জমি ভরাট সেবা'
  },

  // ২. ইলেকট্রনিক্স ও যন্ত্রপাতি মেরামত
  {
    id: 'technician',
    name: 'এসি ও রেফ্রিজারেটর টেকনিশিয়ান',
    nameEn: 'AC & Fridge Tech',
    iconName: 'Snowflake',
    group: 'ইলেকট্রনিক্স ও যন্ত্রপাতি',
    description: 'ইনভার্টার এসি ও ডিপ ফ্রিজ সার্ভিসিং, গ্যাস চার্জ ও মেরামত'
  },
  {
    id: 'water_pump',
    name: 'পানির মোটর ও পাম্প মেকানিক',
    nameEn: 'Water Pump Mechanic',
    iconName: 'Droplet',
    group: 'ইলেকট্রনিক্স ও যন্ত্রপাতি',
    description: 'সাবমার্সিবল মোটর ওয়্যারিং, পাম্প রিওয়াইন্ডিং ও প্রেসার ট্যাংক'
  },
  {
    id: 'solar_ips',
    name: 'সোলার ও আইপিএস টেকনিশিয়ান',
    nameEn: 'Solar & IPS Tech',
    iconName: 'Sun',
    group: 'ইলেকট্রনিক্স ও যন্ত্রপাতি',
    description: 'সৌরবিদ্যুৎ প্যানেল ইনস্টলেশন, আইপিএস ও ব্যাটারি মেরামত'
  },
  {
    id: 'tv_sound',
    name: 'টিভি ও সাউন্ড সিস্টেম টেকনিশিয়ান',
    nameEn: 'TV & Audio Tech',
    iconName: 'Tv',
    group: 'ইলেকট্রনিক্স ও যন্ত্রপাতি',
    description: 'স্মার্ট এলইডি টিভি, প্যানেল সমস্যা, অডিও স্পিকার ও সাউন্ড বক্স'
  },
  {
    id: 'stove_gas',
    name: 'গ্যাস স্টোভ ও কুকার মেকানিক',
    nameEn: 'Gas Stove Repair',
    iconName: 'Flame',
    group: 'ইলেকট্রনিক্স ও যন্ত্রপাতি',
    description: 'এলপিজি গ্যাস চুলা, বার্নার ক্লিনিং ও প্রেশার কুকার মেরামত'
  },
  {
    id: 'fan_appliance',
    name: 'ফ্যান, ব্লেন্ডার ও ওভেন টেকনিশিয়ান',
    nameEn: 'Small Home Appliances',
    iconName: 'Cog',
    group: 'ইলেকট্রনিক্স ও যন্ত্রপাতি',
    description: 'সিলিং ফ্যান কয়েল, রাইস কুকার, ওভেন ও ব্লেন্ডার মেরামত'
  },

  // ৩. যানবাহন ও ট্রান্সপোর্ট
  {
    id: 'driver',
    name: 'প্রাইভেট কার ও হাইয়েস চালক',
    nameEn: 'Car & Microbus Driver',
    iconName: 'Car',
    group: 'যানবাহন ও চালক',
    description: 'ঢাকা এয়ারপোর্ট ট্রিপ, ফ্যামিলি ট্যুর ও দূরপাল্লার অভিজ্ঞ ড্রাইভার'
  },
  {
    id: 'mechanic',
    name: 'মোটরসাইকেল ও স্কুটার মেকানিক',
    nameEn: 'Motorcycle Mechanic',
    iconName: 'Bike',
    group: 'যানবাহন ও চালক',
    description: 'বাইক ইঞ্জিন ওভারহোলিং, কার্বুরেটর টিউনিং ও ডিস্ক ব্রেক মেরামত'
  },
  {
    id: 'cng_auto',
    name: 'সিএনজি ও অটোরিকশা মেকানিক',
    nameEn: 'CNG Auto Mechanic',
    iconName: 'Cog',
    group: 'যানবাহন ও চালক',
    description: 'সিএনজি অটোরিকশা ইঞ্জিন, গিয়ার ও ইলেকট্রিক সংযোগ মেরামত'
  },
  {
    id: 'easy_bike',
    name: 'ইজিবাইক ও ব্যাটারি রিকশা টেকনিশিয়ান',
    nameEn: 'Easy Bike & Battery Rickshaw',
    iconName: 'BatteryCharging',
    group: 'যানবাহন ও চালক',
    description: 'ব্যাটারিচালিত অটো ও ইজিবাইকের মোটর, কন্ট্রোলার ও চার্জার মেরামত'
  },
  {
    id: 'truck_driver',
    name: 'পিকআপ, ট্রাক ও ট্রলি চালক',
    nameEn: 'Truck & Pickup Driver',
    iconName: 'Truck',
    group: 'যানবাহন ও চালক',
    description: 'মালামাল পরিবহন, বাসা বদল ও কৃষিপণ্য পরিবহনের গাড়ি চালক'
  },
  {
    id: 'bicycle_mechanic',
    name: 'সাইকেল ও ভ্যান মেকানিক',
    nameEn: 'Bicycle Mechanic',
    iconName: 'Wrench',
    group: 'যানবাহন ও চালক',
    description: 'বাইসাইকেল ফিটিংস, বল-বিয়ারিং, রিম সোজা ও চেইন মেরামত'
  },
  {
    id: 'tire_puncture',
    name: 'টায়ার ভলকানাইজিং ও হাওয়া মিস্ত্রি',
    nameEn: 'Tire Vulcanizing',
    iconName: 'Disc',
    group: 'যানবাহন ও চালক',
    description: 'টিউবলেস টায়ার পাংচার ঠিক করা ও ভলকানাইজিং হিটিং সেবা'
  },

  // ৪. তথ্যপ্রযুক্তি ও ডিজিটাল সেবা
  {
    id: 'mobile_servicing',
    name: 'মোবাইল ফোন সার্ভিসিং টেকনিশিয়ান',
    nameEn: 'Mobile Phone Repair',
    iconName: 'Smartphone',
    group: 'তথ্যপ্রযুক্তি ও ডিজিটাল',
    description: 'টাচ ডিসপ্লে চেঞ্জ, চার্জিং পোর্ট, ডেড মাদারবোর্ড ও সফটওয়্যার'
  },
  {
    id: 'cctv_it',
    name: 'সিসিটিভি ক্যামেরা ও সিকিউরিটি',
    nameEn: 'CCTV & Security Camera',
    iconName: 'Camera',
    group: 'তথ্যপ্রযুক্তি ও ডিজিটাল',
    description: 'নাইট ভিশন আইপি ক্যামেরা, ডিভিআর এবং মোবাইলে লাইভ দেখার সেটআপ'
  },
  {
    id: 'computer_laptop',
    name: 'কম্পিউটার ও ল্যাপটপ টেকনিশিয়ান',
    nameEn: 'Computer & Laptop Tech',
    iconName: 'Monitor',
    group: 'তথ্যপ্রযুক্তি ও ডিজিটাল',
    description: 'উইন্ডোজ সেটআপ, হার্ডওয়্যার আপগ্রেড, ভাইরাস রিমুভ ও ডাটা রিকভারি'
  },
  {
    id: 'printer_copier',
    name: 'প্রিন্টার ও ফটোকপিয়ার সার্ভিসিং',
    nameEn: 'Printer & Copier Repair',
    iconName: 'Printer',
    group: 'তথ্যপ্রযুক্তি ও ডিজিটাল',
    description: 'এপসন ও ক্যানন ইঙ্কট্যাঙ্ক প্রিন্টার, কার্টিজ রিফিল ও ফটোকপি মেরামত'
  },
  {
    id: 'graphic_design',
    name: 'গ্রাফিক্স ডিজাইন ও কম্পোজ সেবা',
    nameEn: 'Graphic Design & Compose',
    iconName: 'PenTool',
    group: 'তথ্যপ্রযুক্তি ও ডিজিটাল',
    description: 'দোকানের সাইনবোর্ড, ফ্লেক্সো, বিয়ের কার্ড ও অফিসিয়াল কম্পোজ'
  },
  {
    id: 'internet_isp',
    name: 'ওয়াইফাই ও ব্রডব্যান্ড লাইনম্যান',
    nameEn: 'WiFi & Internet Tech',
    iconName: 'Wifi',
    group: 'তথ্যপ্রযুক্তি ও ডিজিটাল',
    description: 'রাউটার কনফিগারেশন, অপটিক্যাল ফাইবার স্প্লাইসিং ও নেটওয়ার্ক'
  },

  // ৫. শিক্ষা, জমি ও ধর্মীয় সেবা
  {
    id: 'tutor',
    name: 'গৃহশিক্ষক ও প্রাইভেট টিউটর',
    nameEn: 'Home Tutor',
    iconName: 'BookOpen',
    group: 'শিক্ষা ও পরামর্শ',
    description: 'গণিত, বিজ্ঞান ও ইংরেজি বিষয়ের বিশ্বস্ত স্কুল-কলেজ প্রাইভেট শিক্ষক'
  },
  {
    id: 'quran_teacher',
    name: 'কুরআন শিক্ষক ও ক্বারী সাহেব',
    nameEn: 'Quran & Arabic Tutor',
    iconName: 'BookCheck',
    group: 'শিক্ষা ও পরামর্শ',
    description: 'বিশুদ্ধ তাজবীদ সহ কুরআন শিক্ষা, নূরানী কায়দা ও ইসলামী শিক্ষা'
  },
  {
    id: 'land_surveyor',
    name: 'জমি পরিমাপক (আমিন) ও দলিল লেখক',
    nameEn: 'Land Surveyor (Amin)',
    iconName: 'Compass',
    group: 'শিক্ষা ও পরামর্শ',
    description: 'ডিজিটাল সীমানা পরিমাপ, দাগ বণ্টন, নামজারি পরামর্শ ও দলিল লিখন'
  },
  {
    id: 'imam_khatib',
    name: 'ইমাম, খতিব ও দোয়া সেবা',
    nameEn: 'Imam & Khatib',
    iconName: 'HeartHandshake',
    group: 'শিক্ষা ও পরামর্শ',
    description: 'মিলাদ, দোয়া মাহফিল, জানাজা পরিচালনা ও ইসলামী পরামর্শ'
  },

  // ৬. স্বাস্থ্য ও সেবা
  {
    id: 'village_doctor',
    name: 'পল্লী চিকিৎসক ও ফার্মেসি প্র্যাকটিশনার',
    nameEn: 'Village Doctor & Paramedic',
    iconName: 'Stethoscope',
    group: 'স্বাস্থ্য ও পরিচর্যা',
    description: 'প্রাথমিক চিকিৎসা, রক্তচাপ ও ডায়াবেটিস পরীক্ষা ও জরুরি প্রাথমিক সেবা'
  },
  {
    id: 'nurse_caregiver',
    name: 'হোম নার্সিং ও রোগী সেবাকারী',
    nameEn: 'Home Nursing & Caregiver',
    iconName: 'HeartPulse',
    group: 'স্বাস্থ্য ও পরিচর্যা',
    description: 'স্যালাইন পুশ, ইনজেকশন, ড্রেসিং, বয়স্ক ও অসুস্থ রোগীর সার্বক্ষণিক সেবা'
  },
  {
    id: 'physiotherapist',
    name: 'ফিজিওথেরাপিস্ট ও মালিশ থেরাপি',
    nameEn: 'Physiotherapist',
    iconName: 'Activity',
    group: 'স্বাস্থ্য ও পরিচর্যা',
    description: 'কোমর ও হাঁটুর ব্যথা, প্যারালাইসিস রোগীর এক্সারসাইজ ও রিহ্যাব'
  },

  // ৭. ব্যক্তিগত কারুশিল্প ও ছোট পেশা
  {
    id: 'tailor',
    name: 'দর্জি ও কাটিং মাস্টার',
    nameEn: 'Tailor & Master Cutter',
    iconName: 'Scissors',
    group: 'হস্তশিল্প ও ব্যক্তিগত সেবা',
    description: 'শার্ট, প্যান্ট, পায়জামা, পাঞ্জাবি, বোরকা ও লেডিস পোশাক কাটিং'
  },
  {
    id: 'barber',
    name: 'নাপিত ও হেয়ার ড্রেসার',
    nameEn: 'Barber & Stylist',
    iconName: 'Sparkles',
    group: 'হস্তশিল্প ও ব্যক্তিগত সেবা',
    description: 'চুল কাটিং, সেভ, ফেসিয়াল ও বিয়ে বা খতনার স্পেশাল হোম সার্ভিস'
  },
  {
    id: 'beautician',
    name: 'বিউটিশিয়ান ও মেহেদি আর্টিস্ট',
    nameEn: 'Beautician & Mehendi',
    iconName: 'Palette',
    group: 'হস্তশিল্প ও ব্যক্তিগত সেবা',
    description: 'বউ সাজানো, ব্রাইডাল মেকআপ, মেহেদি ডিজাইন ও স্কিন কেয়ার'
  },
  {
    id: 'laundry',
    name: 'লন্ড্রি ও ড্রাইওয়াশ কারিগর',
    nameEn: 'Laundry & Ironing',
    iconName: 'Shirt',
    group: 'হস্তশিল্প ও ব্যক্তিগত সেবা',
    description: 'সুটের ড্রাইওয়াশ, সুতি ও সিল্ক শাড়ি রোলার পলিশ ও ইস্ত্রি'
  },
  {
    id: 'cobbler',
    name: 'জুতা সেলাই ও ব্যাগ মেরামত',
    nameEn: 'Cobbler & Shoe Repair',
    iconName: 'Footprints',
    group: 'হস্তশিল্প ও ব্যক্তিগত সেবা',
    description: 'চামড়ার জুতা সেলাই, সোল পরিবর্তন, ট্রাভেল ব্যাগ ও চেইন মেরামত'
  },
  {
    id: 'locksmith',
    name: 'চাবি তৈরি ও তালা মিস্ত্রি',
    nameEn: 'Locksmith & Key Maker',
    iconName: 'Key',
    group: 'হস্তশিল্প ও ব্যক্তিগত সেবা',
    description: 'ডুপ্লিকেট চাবি তৈরি, আলমারি ও দরজার জ্যাম তালা খোলা ও পরিবর্তন'
  },
  {
    id: 'goldsmith',
    name: 'স্বর্ণকার ও অলঙ্কার মেরামত',
    nameEn: 'Goldsmith & Jewelry',
    iconName: 'Award',
    group: 'হস্তশিল্প ও ব্যক্তিগত সেবা',
    description: 'সোনার গহনা জোড়া লাগানো, পালিশ করা ও রূপার কাজ'
  },
  {
    id: 'mattress_quilt',
    name: 'লেপ-তোশক ও জাজিম কারিগর',
    nameEn: 'Mattress & Quilt Maker',
    iconName: 'Layers',
    group: 'হস্তশিল্প ও ব্যক্তিগত সেবা',
    description: 'শিমুল তুলা ধুনাই, আরামদায়ক জাজিম, বালিশ ও শীতের লেপ তৈরি'
  },

  // ৮. কৃষি, বাগান ও প্রাণিসম্পদ
  {
    id: 'gardener_agri',
    name: 'কৃষি ও ফসল পরামর্শক',
    nameEn: 'Agriculture Specialist',
    iconName: 'Sprout',
    group: 'কৃষি ও খামার',
    description: 'ধান, শাকসবজি চাষের রোগবালাই দমন, কীটনাশক ও সার প্রয়োগ পরামর্শ'
  },
  {
    id: 'gardener',
    name: 'ফলগাছের কলম ও বাগান মালী',
    nameEn: 'Gardener & Grafter',
    iconName: 'Flower2',
    group: 'কৃষি ও খামার',
    description: 'আম, লিচু গাছের উন্নত কলম বাঁধা, ফলগাছ ছাঁটাই ও ছাদবাগান তৈরি'
  },
  {
    id: 'livestock_vet',
    name: 'গবাদিপশু ও কৃত্রিম প্রজনন সহকারী',
    nameEn: 'Livestock & Artificial Inseminator',
    iconName: 'ShieldAlert',
    group: 'কৃষি ও খামার',
    description: 'গরু-ছাগলের টিকা, কৃমির ওষুধ প্রদান ও গাভীর উন্নত জাতের প্রজনন'
  },
  {
    id: 'poultry_fish',
    name: 'মাছ চাষ ও পোল্ট্রি পরামর্শক',
    nameEn: 'Fishery & Poultry Consultant',
    iconName: 'Fish',
    group: 'কৃষি ও খামার',
    description: 'পুকুরে মাছের পোনা ছাড়া, পানির পিএইচ পরীক্ষা ও মুরগির খামার সেবা'
  },
  {
    id: 'tree_cutter',
    name: 'গাছ কাটার অভিজ্ঞ কাঠুরিয়া',
    nameEn: 'Tree Cutter / Logger',
    iconName: 'Axe',
    group: 'কৃষি ও খামার',
    description: 'বসতভিটার ঝুঁকিপূর্ণ বড় গাছ নিরাপদে কাটা, ডাল ছাঁটাই ও চেরাই'
  },

  // ৯. খাবার, ক্যাটারিং ও অনুষ্ঠান
  {
    id: 'chef',
    name: 'বিয়ে ও অনুষ্ঠানের প্রধান বাবুর্চি',
    nameEn: 'Wedding & Event Chef',
    iconName: 'UtensilsCrossed',
    group: 'খাবার ও অনুষ্ঠান',
    description: 'কাচ্চি বিরিয়ানি, শাহী রোস্ট, মেজবানি মাংস ও ঘরোয়া অনুষ্ঠানের রান্না'
  },
  {
    id: 'sweet_baker',
    name: 'মিষ্টি ও বেকারি কারিগর',
    nameEn: 'Sweet & Baker',
    iconName: 'Cake',
    group: 'খাবার ও অনুষ্ঠান',
    description: 'ছানার রসগোল্লা, চমচম, ক্ষীরতোষা ও হোমমেড জন্মদিনের কেক'
  },
  {
    id: 'event_decor',
    name: 'ডেকোরেশন ও সাউন্ড সিস্টেম',
    nameEn: 'Stage Decor & Sound',
    iconName: 'Music',
    group: 'খাবার ও অনুষ্ঠান',
    description: 'গেট ও স্টেজ সাজানো, সামিয়ানা, লাইটিং এবং কোয়ালিটি সাউন্ড বক্স'
  },
  {
    id: 'photographer',
    name: 'ফটোগ্রাফার ও ভিডিওগ্রাফার',
    nameEn: 'Photographer & Videographer',
    iconName: 'Video',
    group: 'খাবার ও অনুষ্ঠান',
    description: 'বিয়ে, গায়ে হলুদ ও পারিবারিক অনুষ্ঠানের ড্রোন ভিডিও ও ফটোশুট'
  },

  // ১০. অন্যান্য দৈনন্দিন সেবা
  {
    id: 'delivery_rider',
    name: 'ডেলিভারি ম্যান ও পার্সেল রাইডার',
    nameEn: 'Delivery Rider',
    iconName: 'Package',
    group: 'অন্যান্য দৈনন্দিন সেবা',
    description: 'উপজেলার যেকোনো প্রান্তে দ্রুত পার্সেল, খাবার ও ওষুধ হোম ডেলিভারি'
  },
  {
    id: 'house_cleaner',
    name: 'বাসা-বাড়ি ও পানির ট্যাংক ক্লিনার',
    nameEn: 'House & Tank Cleaner',
    iconName: 'Brush',
    group: 'অন্যান্য দৈনন্দিন সেবা',
    description: 'বিল্ডিংয়ের আন্ডারগ্রাউন্ড ও ছাদের পানির ট্যাংক ব্লিচিং ওয়াশ ও ক্লিনিং'
  },
  {
    id: 'security_guard',
    name: 'সিকিউরিটি গার্ড ও নৈশপ্রহরী',
    nameEn: 'Security Guard & Watchman',
    iconName: 'Shield',
    group: 'অন্যান্য দৈনন্দিন সেবা',
    description: 'মার্কেট, ব্যাংক, প্রতিষ্ঠান ও বাসার বিশ্বস্ত দিবা/রাত্রি নিরাপত্তা প্রহরী'
  },
  {
    id: 'other',
    name: 'অন্যান্য দক্ষ কারিগর ও মেহনতি মানুষ',
    nameEn: 'Other Skilled Trades',
    iconName: 'Briefcase',
    group: 'অন্যান্য দৈনন্দিন সেবা',
    description: 'শাহরাস্তির সকল ক্ষুদ্র ও বৃহৎ মেহনতি কারিগর ও সেবাদাতা'
  }
];

export const CATEGORY_GROUPS = [
  'নির্মাণ ও গৃহ মেরামত',
  'ইলেকট্রনিক্স ও যন্ত্রপাতি',
  'যানবাহন ও চালক',
  'তথ্যপ্রযুক্তি ও ডিজিটাল',
  'শিক্ষা ও পরামর্শ',
  'স্বাস্থ্য ও পরিচর্যা',
  'হস্তশিল্প ও ব্যক্তিগত সেবা',
  'কৃষি ও খামার',
  'খাবার ও অনুষ্ঠান',
  'অন্যান্য দৈনন্দিন সেবা'
];
