export interface DivisionData {
  id: string;
  name: string;
  districts: {
    id: string;
    name: string;
    upazilas: {
      name: string;
      unions?: string[];
    }[];
  }[];
}

export const BANGLADESH_GEO_DATA: DivisionData[] = [
  {
    id: 'chittagong',
    name: 'চট্টগ্রাম',
    districts: [
      {
        id: 'chandpur',
        name: 'চাঁদপুর',
        upazilas: [
          {
            name: 'শাহরাস্তি',
            unions: [
              'শাহরাস্তি পৌরসভা',
              'মেহের উত্তর',
              'মেহের দক্ষিণ',
              'রায়শ্রী উত্তর',
              'রায়শ্রী দক্ষিণ',
              'সুচিপাড়া উত্তর',
              'সুচিপাড়া দক্ষিণ',
              'চিতোষী পূর্ব',
              'চিতোষী পশ্চিম',
              'টামটা উত্তর',
              'টামটা দক্ষিণ'
            ]
          },
          {
            name: 'হাজীগঞ্জ',
            unions: ['হাজীগঞ্জ পৌরসভা', 'রাজারগাঁও', 'বাকিলা', 'কালচোঁ', 'হাটিলা', 'গন্ধর্ব্যপুর', 'বড়কুল']
          },
          {
            name: 'চাঁদপুর সদর',
            unions: ['চাঁদপুর পৌরসভা', 'বিষ্ণুপুর', 'আশিকাটি', 'কল্যাণপুর', 'মৈশাদী', 'তরপুরচণ্ডী', 'বাগাদী']
          },
          {
            name: 'ফরিদগঞ্জ',
            unions: ['ফরিদগঞ্জ পৌরসভা', 'বালিথুবা', 'সুবিদপুর', 'গুপ্টি', 'পাইকপাড়া', 'গোবিন্দপুর', 'রূপসা']
          },
          {
            name: 'কচুয়া',
            unions: ['কচুয়া পৌরসভা', 'সাচার', 'পাথৈর', 'বিতারা', 'সহদেবপুর', 'কড়ইয়া']
          },
          {
            name: 'মতলব উত্তর',
            unions: ['ছেংগারচর পৌরসভা', 'ষাটনল', 'বাগানবাড়ী', 'সাদুল্লাপুর', 'দূর্গাপুর']
          },
          {
            name: 'মতলব দক্ষিণ',
            unions: ['মতলব পৌরসভা', 'নায়েরগাঁও', 'খাদেরগাঁও', 'নারায়ণপুর', 'উপাদী']
          },
          {
            name: 'হাইমচর',
            unions: ['গাজীপুর', 'আলগী দুর্গাপুর উত্তর', 'আলগী দুর্গাপুর দক্ষিণ', 'নীলকমল']
          }
        ]
      },
      {
        id: 'comilla',
        name: 'কুমিল্লা',
        upazilas: [
          { name: 'লাকসাম', unions: ['লাকসাম পৌরসভা', 'বাকই', 'মুদাফরগঞ্জ', 'কান্দিরপাড়', 'গোবিন্দপুর'] },
          { name: 'কুমিল্লা আদর্শ সদর', unions: ['কুমিল্লা সিটি', 'কালিরবাজার', 'দুর্গাপুর', 'আমড়াতলী'] },
          { name: 'চৌদ্দগ্রাম', unions: ['চৌদ্দগ্রাম পৌরসভা', 'কাশিনগর', 'উজিরপুর', 'কনকাপৈত'] },
          { name: 'বরুড়া', unions: ['বরুড়া পৌরসভা', 'আগলসার', 'ভবানীপুর', 'পয়ালগাছা'] },
          { name: 'দাউদকান্দি', unions: ['দাউদকান্দি পৌরসভা', 'গৌরীপুর', 'পেন্নাই', 'ইলিয়টগঞ্জ'] },
          { name: 'দেবিদ্বার', unions: ['দেবিদ্বার পৌরসভা', 'রসুলপুর', 'ইউসুফপুর', 'গুনাইঘর'] }
        ]
      },
      {
        id: 'chittagong_dist',
        name: 'চট্টগ্রাম',
        upazilas: [
          { name: 'হাটহাজারী' },
          { name: 'পটিয়া' },
          { name: 'রাউজান' },
          { name: 'ফটিকছড়ি' },
          { name: 'সীতাকুণ্ড' },
          { name: 'মিরসরাই' },
          { name: 'আনোয়ারা' },
          { name: 'বোয়ালখালী' }
        ]
      },
      {
        id: 'noakhali',
        name: 'নোয়াখালী',
        upazilas: [
          { name: 'নোয়াখালী সদর' },
          { name: 'বেগমগঞ্জ' },
          { name: 'চাটখিল' },
          { name: 'সেনবাগ' },
          { name: 'কোম্পানীগঞ্জ' },
          { name: 'সোনাইমুড়ী' }
        ]
      },
      {
        id: 'feni',
        name: 'ফেনী',
        upazilas: [
          { name: 'ফেনী সদর' },
          { name: 'দাগনভূঞা' },
          { name: 'সোনাগাজী' },
          { name: 'ছাগলনাইয়া' },
          { name: 'পরশুরাম' }
        ]
      },
      {
        id: 'brahmanbaria',
        name: 'ব্রাহ্মণবাড়িয়া',
        upazilas: [
          { name: 'ব্রাহ্মণবাড়িয়া সদর' },
          { name: 'নবীনগর' },
          { name: 'বাঞ্ছারামপুর' },
          { name: 'কসবা' },
          { name: 'আখাউড়া' }
        ]
      }
    ]
  },
  {
    id: 'dhaka',
    name: 'ঢাকা',
    districts: [
      {
        id: 'dhaka_dist',
        name: 'ঢাকা',
        upazilas: [
          { name: 'সাভার' },
          { name: 'ধামরাই' },
          { name: 'কেরানীগঞ্জ' },
          { name: 'নবাবগঞ্জ' },
          { name: 'দোহার' },
          { name: 'মিরপুর অঞ্চল' },
          { name: 'উত্তরা অঞ্চল' },
          { name: 'মোহাম্মদপুর অঞ্চল' },
          { name: 'ধানমন্ডি অঞ্চল' }
        ]
      },
      {
        id: 'gazipur',
        name: 'গাজীপুর',
        upazilas: [
          { name: 'গাজীপুর সদর' },
          { name: 'শ্রীপুর' },
          { name: 'কালিয়াকৈর' },
          { name: 'কাপাসিয়া' },
          { name: 'কালীগঞ্জ' }
        ]
      },
      {
        id: 'narayanganj',
        name: 'নারায়ণগঞ্জ',
        upazilas: [
          { name: 'নারায়ণগঞ্জ সদর' },
          { name: 'সোনারগাঁও' },
          { name: 'রূপগঞ্জ' },
          { name: 'আড়াইহাজার' },
          { name: 'বন্দর' }
        ]
      },
      {
        id: 'tangail',
        name: 'টাঙ্গাইল',
        upazilas: [
          { name: 'টাঙ্গাইল সদর' },
          { name: 'মির্জাপুর' },
          { name: 'কালিহাতী' },
          { name: 'ঘাটাইল' },
          { name: 'মধুপুর' }
        ]
      },
      {
        id: 'faridpur',
        name: 'ফরিদপুর',
        upazilas: [
          { name: 'ফরিদপুর সদর' },
          { name: 'বোয়ালমারী' },
          { name: 'ভাঙ্গা' },
          { name: 'মধুখালী' }
        ]
      }
    ]
  },
  {
    id: 'sylhet',
    name: 'সিলেট',
    districts: [
      {
        id: 'sylhet_dist',
        name: 'সিলেট',
        upazilas: [
          { name: 'সিলেট সদর' },
          { name: 'বিয়ানীবাজার' },
          { name: 'গোলাপগঞ্জ' },
          { name: 'বিশ্বনাথ' },
          { name: 'জৈন্তাপুর' },
          { name: 'বালাগঞ্জ' }
        ]
      },
      {
        id: 'moulvibazar',
        name: 'মৌলভীবাজার',
        upazilas: [
          { name: 'মৌলভীবাজার সদর' },
          { name: 'শ্রীমঙ্গল' },
          { name: 'কমলগঞ্জ' },
          { name: 'কুলাউড়া' }
        ]
      },
      {
        id: 'habiganj',
        name: 'হবিগঞ্জ',
        upazilas: [
          { name: 'হবিগঞ্জ সদর' },
          { name: 'মাধবপুর' },
          { name: 'চুনারুঘাট' },
          { name: 'নবীগঞ্জ' }
        ]
      }
    ]
  },
  {
    id: 'rajshahi',
    name: 'রাজশাহী',
    districts: [
      {
        id: 'rajshahi_dist',
        name: 'রাজশাহী',
        upazilas: [
          { name: 'রাজশাহী সদর' },
          { name: 'পবা' },
          { name: 'গোদাগাড়ী' },
          { name: 'বাগমারা' },
          { name: 'চারঘাট' }
        ]
      },
      {
        id: 'bogura',
        name: 'বগুড়া',
        upazilas: [
          { name: 'বগুড়া সদর' },
          { name: 'শেরপুর' },
          { name: 'শিবগঞ্জ' },
          { name: 'ধুনট' },
          { name: 'সারিয়াকান্দি' }
        ]
      },
      {
        id: 'pabna',
        name: 'পাবনা',
        upazilas: [
          { name: 'পাবনা সদর' },
          { name: 'ঈশ্বরদী' },
          { name: 'সুজানগর' },
          { name: 'সাঁথিয়া' }
        ]
      }
    ]
  },
  {
    id: 'khulna',
    name: 'খুলনা',
    districts: [
      {
        id: 'khulna_dist',
        name: 'খুলনা',
        upazilas: [
          { name: 'খুলনা সদর' },
          { name: 'ডুমুরিয়া' },
          { name: 'বটিয়াঘাটা' },
          { name: 'রূপসা' },
          { name: 'পাইকগাছা' }
        ]
      },
      {
        id: 'jashore',
        name: 'যশোর',
        upazilas: [
          { name: 'যশোর সদর' },
          { name: 'ঝিকরগাছা' },
          { name: 'মণিরামপুর' },
          { name: 'অভয়নগর' }
        ]
      },
      {
        id: 'kushtia',
        name: 'কুষ্টিয়া',
        upazilas: [
          { name: 'কুষ্টিয়া সদর' },
          { name: 'কুমারখালী' },
          { name: 'ভেড়ামারা' },
          { name: 'মিরপুর' }
        ]
      }
    ]
  },
  {
    id: 'barisal',
    name: 'বরিশাল',
    districts: [
      {
        id: 'barisal_dist',
        name: 'বরিশাল',
        upazilas: [
          { name: 'বরিশাল সদর' },
          { name: 'বাবুগঞ্জ' },
          { name: 'গৌরনদী' },
          { name: 'মুলাদী' },
          { name: 'বানারীপাড়া' }
        ]
      },
      {
        id: 'bhola',
        name: 'ভোলা',
        upazilas: [
          { name: 'ভোলা সদর' },
          { name: 'চরফ্যাশন' },
          { name: 'বোরহানউদ্দিন' },
          { name: 'লালমোহন' }
        ]
      }
    ]
  },
  {
    id: 'rangpur',
    name: 'রংপুর',
    districts: [
      {
        id: 'rangpur_dist',
        name: 'রংপুর',
        upazilas: [
          { name: 'রংপুর সদর' },
          { name: 'বদরগঞ্জ' },
          { name: 'পীরগঞ্জ' },
          { name: 'মিঠাপুকুর' }
        ]
      },
      {
        id: 'dinajpur',
        name: 'দিনাজপুর',
        upazilas: [
          { name: 'দিনাজপুর সদর' },
          { name: 'বীরগঞ্জ' },
          { name: 'ফুলবাড়ী' },
          { name: 'পার্বতীপুর' }
        ]
      }
    ]
  },
  {
    id: 'mymensingh',
    name: 'ময়মনসিংহ',
    districts: [
      {
        id: 'mymensingh_dist',
        name: 'ময়মনসিংহ',
        upazilas: [
          { name: 'ময়মনসিংহ সদর' },
          { name: 'মুক্তাগাছা' },
          { name: 'ত্রিশাল' },
          { name: 'ভালুকা' },
          { name: 'গফরগাঁও' }
        ]
      },
      {
        id: 'jamalpur',
        name: 'জামালপুর',
        upazilas: [
          { name: 'জামালপুর সদর' },
          { name: 'মেলান্দহ' },
          { name: 'সরিষাবাড়ী' },
          { name: 'ইসলামপুর' }
        ]
      }
    ]
  }
];

// Helper to get all districts
export function getAllDistricts() {
  const districts: { id: string; name: string; divisionName: string }[] = [];
  BANGLADESH_GEO_DATA.forEach(div => {
    div.districts.forEach(dist => {
      districts.push({
        id: dist.id,
        name: dist.name,
        divisionName: div.name
      });
    });
  });
  return districts;
}

// Helper to get upazilas by district name
export function getUpazilasByDistrict(districtName: string) {
  for (const div of BANGLADESH_GEO_DATA) {
    for (const dist of div.districts) {
      if (dist.name === districtName) {
        return dist.upazilas;
      }
    }
  }
  return [];
}
