// Realistic Indian Agricultural Dataset for Smart Agriculture Consultant

export const INITIAL_FARMER_PROFILE = {
  id: "farmer-01",
  name: "Gajananrao Deshmukh (गजाननराव देशमुख)",
  phone: "+91 98223 45678",
  village: "Bhatkuli (भातकुली)",
  district: "Amravati (अमरावती), Maharashtra",
  landSize: 8.5,
  crops: ["cotton", "soybean"],
  soilType: "Medium Black Cotton Soil (काळी कसदार जमीन)",
  irrigation: "Drip Irrigation + Rainfed (ठिबक व कोरडवाहू)",
  avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80"
};

export const CONSULTANT_PROFILE = {
  id: "agronomist-01",
  name: "Dr. Ramesh Patil (डॉ. रमेश पाटील)",
  degree: "M.Sc. (Agri) Entomology, Ph.D.",
  institution: "Dr. Panjabrao Deshmukh Krishi Vidyapeeth (PDKV), Akola",
  experience: "16+ years in Vidarbha Cotton & Oilseed Ecosystem",
  registrationNo: "MH-AGRI-EXP-2008-4102",
  avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",
  rating: 4.9,
  casesResolved: 1842
};

export const CROPS_DATA = [
  {
    id: "cotton",
    nameEn: "Cotton",
    nameMr: "कापूस",
    nameHi: "कपास",
    season: "Kharif",
    icon: "🌾",
    commonDiseases: ["Pink Bollworm (गुलाबी बोंडअळी)", "Whitefly (पांढरी माशी)", "Leaf Curl (चुरडा)", "Damping off"],
    stages: ["Vegetative (वाढ)", "Square & Flowering (फुलधारणा)", "Boll Development (बोंड भरणे)", "Harvest (वेचणी)"]
  },
  {
    id: "soybean",
    nameEn: "Soybean",
    nameMr: "सोयाबीन",
    nameHi: "सोयाबीन",
    season: "Kharif",
    icon: "🌱",
    commonDiseases: ["Yellow Mosaic Virus (पिवळा मोजॅक)", "Stem Fly (खोडमाशी)", "Girdle Beetle (चक्री भुंगा)", "Rust"],
    stages: ["Seedling (अंकुरण)", "Vegetative (शाकीय वाढ)", "Pod Setting (शेंगा भरणे)", "Maturity (पक्वता)"]
  },
  {
    id: "chana",
    nameEn: "Gram / Chickpea",
    nameMr: "हरभरा / चना",
    nameHi: "चना",
    season: "Rabi",
    icon: "🌿",
    commonDiseases: ["Pod Borer (घाटे अळी)", "Fusarium Wilt (उकठा / मर रोग)", "Collar Rot"],
    stages: ["Branching (फांद्या फुटणे)", "Flowering (फुलोरा)", "Pod Filling (घाटे भरणे)"]
  },
  {
    id: "wheat",
    nameEn: "Wheat",
    nameMr: "गहू",
    nameHi: "गेहूं",
    season: "Rabi",
    icon: "🌾",
    commonDiseases: ["Rust (तांबेरा)", "Termites (वाळवी)", "Loose Smut"],
    stages: ["Tillering (फुटवे)", "Booting (पोटरी)", "Earhead (लोंबी)", "Grain Filling"]
  }
];

export const SAMPLE_PRESETS = [
  {
    id: "pink-bollworm",
    titleEn: "Cotton Pink Bollworm Damage",
    titleMr: "कापूस गुलाबी बोंडअळी प्रादुर्भाव",
    titleHi: "कपास गुलाबी सुंडी प्रकोप",
    crop: "cotton",
    stage: "Boll / Pod Formation",
    symptoms: ["symBollDamage", "symYellowing"],
    description: "बोंडावर बारीक छिद्रे दिसत आहेत आणि आतून गुलाबी रंगाची अळी बोंड पोखरत आहे. फुले व लहान कैऱ्यांची गळ होत आहे.",
    imageUrl: "https://images.unsplash.com/photo-1598512752271-33f913a5af13?w=800&auto=format&fit=crop&q=80",
    aiDiagnosis: {
      diseaseNameEn: "Pink Bollworm (Pectinophora gossypiella)",
      diseaseNameMr: "गुलाबी बोंडअळी (Pink Bollworm)",
      diseaseNameHi: "गुलाबी सुंडी (Pink Bollworm)",
      confidence: 94,
      urgency: "high",
      immediateAdviceEn: "Install 5-8 Pheromone traps/acre with Gossyplure lure today. Collect and destroy perforated rosetted flowers. Avoid spraying excessive synthetic pyrethroids.",
      immediateAdviceMr: "तातडीने एकरी ५ कामगंध सापळे (Pheromone Traps) लावा. प्रादुर्भावग्रस्त फुले व बोंडे तोडून नष्ट करा. अनावश्यक रसायनांचा अतिवापर टाळा.",
      immediateAdviceHi: "तुरंत प्रति एकड़ 5 फेरोमोन ट्रैप लगाएं। ग्रसित फूलों व टिंडों को तोड़कर नष्ट करें। अनावश्यक रासायनिक छिड़काव से बचें।"
    }
  },
  {
    id: "soybean-ymv",
    titleEn: "Soybean Yellow Mosaic Virus",
    titleMr: "सोयाबीन पिवळा मोझॅक व्हायरस",
    titleHi: "सोयाबीन पीला मोजेक वायरस",
    crop: "soybean",
    stage: "Flowering Stage",
    symptoms: ["symYellowing", "symLeafCurl"],
    description: "सोयाबीनच्या पानाच्या शिरा पिवळ्या पडत असून संपूर्ण पान पिवळे-हिरवे चट्टेदार दिसत आहे. झाडांची वाढ खुंटली आहे.",
    imageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d6910985b?w=800&auto=format&fit=crop&q=80",
    aiDiagnosis: {
      diseaseNameEn: "Yellow Mosaic Virus (YMV) transmitted by Whitefly",
      diseaseNameMr: "सोयाबीन पिवळा मोझॅक (पांढऱ्या माशीमुळे प्रसार)",
      diseaseNameHi: "सोयाबीन पीला मोजेक (सफेद मक्खी जनित)",
      confidence: 91,
      urgency: "high",
      immediateAdviceEn: "Rogue out and bury severely infected plants immediately. Spray Neem formulation (10,000 ppm) or systemic insecticide to control the whitefly vector.",
      immediateAdviceMr: "तीव्र प्रादुर्भाव झालेली रोपे उपटून खड्ड्यात गाडून नष्ट करा. पांढरी माशी नियंत्रणासाठी निंबोळी अर्क १०,००० PPM किंवा आंतरप्रवाही कीटकनाशक फवारा.",
      immediateAdviceHi: "ज्यादा ग्रसित पौधों को उखाड़कर जमीन में गाड़ दें। सफेद मक्खी को रोकने के लिए नीम अर्क 10,000 PPM या अनुशंसित कीटनाशक का छिड़काव करें।"
    }
  },
  {
    id: "cotton-whitefly",
    titleEn: "Cotton Whitefly Infestation",
    titleMr: "कापूस पांढरी माशी व चुरडा",
    titleHi: "कपास सफेद मक्खी प्रकोप",
    crop: "cotton",
    stage: "Vegetative / Growth",
    symptoms: ["symWhitefly", "symLeafCurl"],
    description: "कापसाच्या पानाच्या मागच्या बाजूस लहान पांढऱ्या माश्या उडत आहेत आणि पानांवर चिकटा (हनीड्यू) तयार होऊन काळी बुरशी दिसत आहे.",
    imageUrl: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=800&auto=format&fit=crop&q=80",
    aiDiagnosis: {
      diseaseNameEn: "Cotton Whitefly (Bemisia tabaci)",
      diseaseNameMr: "पांढरी माशी व काजळी रोग",
      diseaseNameHi: "सफेद मक्खी और कालिया रोग",
      confidence: 88,
      urgency: "medium",
      immediateAdviceEn: "Install yellow sticky traps (10-15 per acre) at crop canopy level. Spray Diafenthiuron or Flonicamid as per recommended dosage.",
      immediateAdviceMr: "एकरी १० ते १५ पिवळे चिकट सापळे (Yellow Sticky Traps) लावा. प्रादुर्भाव वाढल्यास डायफेन्थियुरॉन किंवा फ्लोनिकॅमिडचा योग्य मात्रेत वापर करा.",
      immediateAdviceHi: "प्रति एकड़ 10-15 पीले चिपचिपे कार्ड लगाएं। प्रकोप अधिक होने पर डायफेंथियूरॉन का छिड़काव करें।"
    }
  }
];

export const INITIAL_CASES = [
  {
    id: "SAC-2026-104",
    farmerId: "farmer-01",
    farmerName: "Gajananrao Deshmukh",
    village: "Bhatkuli, Amravati",
    crop: "cotton",
    cropNameEn: "Cotton (कापूस)",
    stage: "Boll Formation",
    areaAffected: "3.5 Acres",
    reportedAt: "2026-11-21 09:30 AM",
    status: "resolved", // new | triaged | in_review | resolved
    urgency: "high",
    symptoms: ["Boll perforation", "Square drop", "Larvae inside boll"],
    description: "कापसाच्या बोंडावर बारीक छिद्रे पडली आहेत. बोंड उघडून पाहिले असता आत गुलाबी रंगाची अळी आढळली. सुमारे ३.५ एकर क्षेत्रात हा प्रादुर्भाव पसरला आहे.",
    imageUrl: "https://images.unsplash.com/photo-1598512752271-33f913a5af13?w=800&auto=format&fit=crop&q=80",
    audioDuration: "0:24 sec",
    aiTriage: {
      diagnosis: "Pink Bollworm (गुलाबी बोंडअळी - Pectinophora gossypiella)",
      confidence: 94,
      firstAid: "तातडीने एकरी ५ फेरोमोन ट्रॅप लावा. अळीग्रस्त फुले व बोंडे नष्ट करा."
    },
    prescription: {
      consultantName: "Dr. Ramesh Patil (डॉ. रमेश पाटील)",
      institution: "PDKV Krishi Vigyan Kendra, Akola",
      prescribedAt: "2026-11-21 11:15 AM",
      rxId: "RX-PDKV-8941",
      officialDiagnosis: "Pink Bollworm severe ETL (Economic Threshold Level > 10% rosette flowers). Immediate targeted action required.",
      recommendedProduct: "Profenofos 40% + Cypermethrin 4% EC (प्रोफेक्स सुपर) OR Emamectin Benzoate 5% SG",
      dosagePer15L: "30-35 ml in 15 Litres water pump (किंवा इमामेक्टिन बेन्झोएट १० ग्रॅम/पंप)",
      sprayMethod: "सकाळी ८ ते ११ दरम्यान पूर्ण झाड भिजेल अशी फवारणी करावी. पाठीमागील बाजूस नोझल धरावा.",
      safetyPeriodDays: 14,
      nonChemicalMeasures: "एकरी ५ कामगंध सापळे (Pheromone Traps) लावून नर पतंग पकडावेत. कीड नियंत्रणाचा खर्च कमी होईल.",
      notes: "फवारणी करताना तोंडाला रुमाल किंवा मास्क अवश्य लावावा. फवारणीनंतर साबणाने हात धुवावेत."
    },
    thread: [
      {
        sender: "farmer",
        senderName: "Gajananrao Deshmukh",
        time: "21 Nov, 09:30 AM",
        message: "नमस्कार डॉक्टर साहेब, माझ्या कापसावर बोंडअळीचा प्रादुर्भाव खूप वाढला आहे. फोटो आणि आवाज पाठवला आहे. मार्गदर्शन करावे.",
        hasVoice: true
      },
      {
        sender: "system",
        senderName: "AI Assistant (कृषी AI)",
        time: "21 Nov, 09:31 AM",
        message: "प्राथमिक विश्लेषण: ९४% खात्रीसह 'गुलाबी बोंडअळी'. तुमची केस डॉ. रमेश पाटील यांच्याकडे प्राधान्याने पाठवली आहे."
      },
      {
        sender: "consultant",
        senderName: "Dr. Ramesh Patil (कृषी तज्ज्ञ)",
        time: "21 Nov, 11:15 AM",
        message: "गजाननराव, तुमच्या शेतातील फोटो पाहिला. हा गुलाबी बोंडअळीचा प्रादुर्भाव आर्थिक नुकसान पातळी (ETL) ओलांडणारा आहे. मी खालीलप्रमाणे अधिकृत प्रिस्क्रिप्शन दिले आहे. सोबत ५ कामगंध सापळे तातडीने लावा.",
        hasRx: true
      },
      {
        sender: "farmer",
        senderName: "Gajananrao Deshmukh",
        time: "21 Nov, 02:40 PM",
        message: "धन्यवाद डॉक्टर! आजच कृषी केंद्रातून औषध आणून फवारणीचे नियोजन करतो."
      }
    ]
  },
  {
    id: "SAC-2026-105",
    farmerId: "farmer-02",
    farmerName: "Dnyaneshwar Mankar (ज्ञानेश्वर मानकर)",
    village: "Ner Parsopant, Yavatmal",
    crop: "soybean",
    cropNameEn: "Soybean (सोयाबीन)",
    stage: "Pod Setting",
    areaAffected: "4 Acres",
    reportedAt: "2026-11-22 04:15 PM",
    status: "in_review", // Waiting in consultant queue
    urgency: "high",
    symptoms: ["symYellowing", "symLeafCurl"],
    description: "सोयाबीनच्या पानांवर पिवळे पट्टे पडत असून नवीन शेंगा व्यवस्थित भरत नाहीत. झाडे पिवळी पडून शेंगा बारीक राहत आहेत.",
    imageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d6910985b?w=800&auto=format&fit=crop&q=80",
    audioDuration: "0:38 sec",
    aiTriage: {
      diagnosis: "Soybean Yellow Mosaic Virus (सोयाबीन पिवळा मोझॅक)",
      confidence: 91,
      firstAid: "पांढरी माशीच्या नियंत्रणासाठी निंबोळी अर्क किंवा आंतरप्रवाही कीटकनाशकाचा तात्काळ वापर करा."
    },
    thread: [
      {
        sender: "farmer",
        senderName: "Dnyaneshwar Mankar",
        time: "22 Nov, 04:15 PM",
        message: "डॉक्टर साहेब, सोयाबीनमध्ये पिवळा मोझॅक वेगाने पसरत आहे. काय औषध फवारावे?",
        hasVoice: true
      },
      {
        sender: "system",
        senderName: "AI Assistant",
        time: "22 Nov, 04:16 PM",
        message: "AI प्राथमिक तपासणी: ९१% खात्रीसह 'सोयाबीन पिवळा मोजॅक (YMV)'. ही केस कृषी तज्ज्ञांच्या कतारमध्ये समाविष्ट झाली आहे."
      }
    ]
  },
  {
    id: "SAC-2026-106",
    farmerId: "farmer-03",
    farmerName: "Sambhaji Kadam (संभाजी कदम)",
    village: "Barshitakli, Akola",
    crop: "cotton",
    cropNameEn: "Cotton (कापूस)",
    stage: "Square & Flowering",
    areaAffected: "2 Acres",
    reportedAt: "2026-11-23 07:45 AM",
    status: "new",
    urgency: "medium",
    symptoms: ["symWhitefly", "symLeafCurl"],
    description: "पानाच्या मागच्या बाजूस भरपूर पांढरी माशी बसलेली दिसते आणि पाने वरच्या बाजूने आकसलेली आहेत.",
    imageUrl: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=800&auto=format&fit=crop&q=80",
    audioDuration: "0:15 sec",
    aiTriage: {
      diagnosis: "Cotton Whitefly (Bemisia tabaci) Infestation",
      confidence: 88,
      firstAid: "पिवळे चिकट सापळे एकरी १० लावावेत."
    },
    thread: [
      {
        sender: "farmer",
        senderName: "Sambhaji Kadam",
        time: "23 Nov, 07:45 AM",
        message: "पांढऱ्या माशीचा उपद्रव वाढला आहे. योग्य सल्ला मिळावा.",
        hasVoice: false
      }
    ]
  }
];

export const VERIFIED_PRODUCTS = [
  {
    id: "prod-01",
    tradeNameEn: "Profex Super (Profenofos 40% + Cypermethrin 4% EC)",
    tradeNameMr: "प्रोफेक्स सुपर (प्रोफेनोफॉस + सायपरमेथ्रिन)",
    category: "catInsecticide",
    categoryLabel: "Insecticide (कीटकनाशक)",
    manufacturer: "Nagarjuna Agrichem / Meghmani",
    activeIngredient: "Profenofos 40% + Cypermethrin 4% EC",
    cibRegNo: "CIR-38,421/2002-Profenofos+Cypermethrin-298",
    cibApproved: true,
    targetPests: "Pink bollworm, Spotted bollworm, Spodoptera litura",
    targetCrops: "Cotton (कापूस), Soybean (सोयाबीन)",
    standardDosage: "30-35 ml per 15L Knapsack Pump (400-500 ml/Acre)",
    toxicityBand: "Blue (Moderately Toxic - मध्यम विषारी)",
    toxicityColor: "bg-blue-600 text-white",
    packSize: "1 Litre Bottle",
    mrp: 980,
    bestMarketPrice: 790,
    savingsAvg: 190,
    ecoFriendly: false,
    rating: 4.8,
    reviewsCount: 342,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "prod-02",
    tradeNameEn: "Pink Bollworm Pheromone Trap Kit (Trap + 5 Gossyplure Lures)",
    tradeNameMr: "गुलाबी बोंडअळी कामगंध सापळा किट (सापळा + ५ ल्यूर)",
    category: "catBio",
    categoryLabel: "Bio-Organic / Trap (जैविक व सापळा)",
    manufacturer: "PCI Pest Control / Krishi Mitra Bio",
    activeIngredient: "Gossyplure Pheromone 98% pure attractant",
    cibRegNo: "CIB-BIO-TRAP-2019-842",
    cibApproved: true,
    targetPests: "Adult Male Pink Bollworm (Pectinophora gossypiella)",
    targetCrops: "Cotton (कापूस)",
    standardDosage: "5 to 8 Traps per Acre (1.5 ft above crop canopy)",
    toxicityBand: "Green (Non-Toxic Eco-Friendly - पर्यावरणपूरक)",
    toxicityColor: "bg-green-600 text-white",
    packSize: "Set of 5 Funnel Traps + 5 Lures",
    mrp: 450,
    bestMarketPrice: 310,
    savingsAvg: 140,
    ecoFriendly: true,
    rating: 4.9,
    reviewsCount: 521,
    image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "prod-03",
    tradeNameEn: "Neem Baan 10,000 PPM (Azadirachtin 1% EC)",
    tradeNameMr: "निम बाण १०,००० PPM (अझाडिराक्टिन १%)",
    category: "catBio",
    categoryLabel: "Bio-Pesticide (जैविक कीटकनाशक)",
    manufacturer: "Ozone Biotech / Agri Life",
    activeIngredient: "Pure Cold-Pressed Neem Seed Kernel Extract (Azadirachtin 1%)",
    cibRegNo: "CIR-52,890/2007-Azadirachtin-112",
    cibApproved: true,
    targetPests: "Whitefly nymphs, Aphids, Jassids, Early instar caterpillars",
    targetCrops: "Soybean, Cotton, Vegetables, Pulses",
    standardDosage: "25-30 ml per 15L Pump (300 ml/Acre)",
    toxicityBand: "Green (Organic Safe - सेंद्रिय सुरक्षित)",
    toxicityColor: "bg-green-600 text-white",
    packSize: "1 Litre Canister",
    mrp: 850,
    bestMarketPrice: 660,
    savingsAvg: 190,
    ecoFriendly: true,
    rating: 4.7,
    reviewsCount: 289,
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "prod-04",
    tradeNameEn: "Pegasus 50 WP (Diafenthiuron 50% WP)",
    tradeNameMr: "पेगासस ५० WP (डायफेन्थियुरॉन ५०%)",
    category: "catInsecticide",
    categoryLabel: "Insecticide & Acaricide (माशी व कोळी नियंत्रक)",
    manufacturer: "Syngenta India Ltd.",
    activeIngredient: "Diafenthiuron 50% WP",
    cibRegNo: "CIR-31,200/1999-Diafenthiuron-44",
    cibApproved: true,
    targetPests: "Whitefly, Mites, Thrips, Jassids",
    targetCrops: "Cotton (कापूस), Chilli",
    standardDosage: "20-25 gm per 15L Pump (250 gm/Acre)",
    toxicityBand: "Blue (Moderately Toxic)",
    toxicityColor: "bg-blue-600 text-white",
    packSize: "250 gm Pouch",
    mrp: 1450,
    bestMarketPrice: 1190,
    savingsAvg: 260,
    ecoFriendly: false,
    rating: 4.8,
    reviewsCount: 412,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "prod-05",
    tradeNameEn: "Amistar Top (Azoxystrobin 18.2% + Difenoconazole 11.4% SC)",
    tradeNameMr: "अमिस्टार टॉप (अझोक्सीस्ट्रोबिन + डायफेनोकोनॅझोल)",
    category: "catFungicide",
    categoryLabel: "Systemic Fungicide (बुरशीनाशक)",
    manufacturer: "Syngenta India Ltd.",
    activeIngredient: "Azoxystrobin 18.2% + Difenoconazole 11.4% SC",
    cibRegNo: "CIR-108,712/2013-Azoxystrobin-81",
    cibApproved: true,
    targetPests: "Anthracnose, Leaf Spot, Rust, Powdery Mildew",
    targetCrops: "Soybean (सोयाबीन), Cotton, Tomato, Chilli",
    standardDosage: "15 ml per 15L Pump (200 ml/Acre)",
    toxicityBand: "Blue (Moderately Toxic)",
    toxicityColor: "bg-blue-600 text-white",
    packSize: "200 ml Bottle",
    mrp: 920,
    bestMarketPrice: 760,
    savingsAvg: 160,
    ecoFriendly: false,
    rating: 4.9,
    reviewsCount: 308,
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "prod-06",
    tradeNameEn: "Mahadhan 00:52:34 (Monopotassium Phosphate 100% Soluble)",
    tradeNameMr: "महाधन ००:५२:३४ (फॉस्फरस व पोटॅश खत)",
    category: "catFertilizer",
    categoryLabel: "Water Soluble Fertilizer (विरघळणारे खत)",
    manufacturer: "Deepak Fertilisers & Petrochemicals",
    activeIngredient: "P2O5: 52%, K2O: 34% (100% Water Soluble)",
    cibRegNo: "FCO Grade-Fertilizer Control Order 1985",
    cibApproved: true,
    targetPests: "Flower drop prevention, boll/pod size enhancement",
    targetCrops: "Cotton, Soybean, Gram, Tur, Fruits",
    standardDosage: "75-100 gm per 15L Pump (1 kg/Acre)",
    toxicityBand: "Green (Plant Nutrient)",
    toxicityColor: "bg-green-600 text-white",
    packSize: "1 kg Sealed Foil Bag",
    mrp: 240,
    bestMarketPrice: 175,
    savingsAvg: 65,
    ecoFriendly: true,
    rating: 4.9,
    reviewsCount: 680,
    image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=400&auto=format&fit=crop&q=80"
  }
];

export const PRICE_COMPARISONS = {
  "prod-01": [
    {
      dealerId: "d-01",
      name: "Shivaji Krishi Seva Kendra (शिवाजी कृषी सेवा केंद्र)",
      location: "Cotton Market Road, Amravati",
      distance: "6.2 km",
      channelType: "typeLocal",
      licenseNo: "MH-AMR-RET-49102",
      isVerified: true,
      price: 820,
      mrp: 980,
      discount: "16.3%",
      inStock: true,
      stockCount: "38 units",
      phone: "+91 94228 11204",
      paymentOptions: "Cash, UPI, KCC accepted",
      badge: "Nearest Licensed Shop"
    },
    {
      dealerId: "d-02",
      name: "Bhatkuli Taluka Sahakari Kharedi Vikri Sangh (सहकारी संस्था)",
      location: "APMC Market Yard, Bhatkuli",
      distance: "2.1 km",
      channelType: "typeCoop",
      licenseNo: "MH-COOP-BHT-108",
      isVerified: true,
      price: 790,
      mrp: 980,
      discount: "19.4%",
      inStock: true,
      stockCount: "120 units",
      phone: "+91 721 245012",
      paymentOptions: "Co-op Credit, Cash, UPI",
      badge: "Lowest Local Price"
    },
    {
      dealerId: "d-03",
      name: "Amravati Shetkari FPO Agro Hub (शेतकरी उत्पादक कंपनी)",
      location: "MIDC Agri Complex, Amravati",
      distance: "11.5 km",
      channelType: "typeFpo",
      licenseNo: "MH-FPO-AMR-2021-09",
      isVerified: true,
      price: 780,
      mrp: 980,
      discount: "20.4%",
      inStock: true,
      stockCount: "45 units",
      phone: "+91 98812 77412",
      paymentOptions: "Member Rebate, UPI",
      badge: "Best Member Price"
    },
    {
      dealerId: "d-04",
      name: "AgroStar / DeHaat Express Delivery",
      location: "Hub Warehouse (Delivered in 24 hrs to farm gate)",
      distance: "Home Delivery",
      channelType: "typeOnline",
      licenseNo: "IN-ECOM-AGRI-883",
      isVerified: true,
      price: 840,
      mrp: 980,
      discount: "14.3%",
      inStock: true,
      stockCount: "Available",
      phone: "1800-120-3232",
      paymentOptions: "Cash on Delivery, UPI",
      badge: "Doorstep Delivery"
    }
  ],
  "prod-02": [
    {
      dealerId: "d-02",
      name: "Bhatkuli Taluka Sahakari Kharedi Vikri Sangh",
      location: "APMC Market Yard, Bhatkuli",
      distance: "2.1 km",
      channelType: "typeCoop",
      licenseNo: "MH-COOP-BHT-108",
      isVerified: true,
      price: 310,
      mrp: 450,
      discount: "31.1%",
      inStock: true,
      stockCount: "85 sets",
      phone: "+91 721 245012",
      paymentOptions: "Cash, UPI",
      badge: "Subsidized Co-op Stock"
    },
    {
      dealerId: "d-01",
      name: "Shivaji Krishi Seva Kendra",
      location: "Cotton Market Road, Amravati",
      distance: "6.2 km",
      channelType: "typeLocal",
      licenseNo: "MH-AMR-RET-49102",
      isVerified: true,
      price: 340,
      mrp: 450,
      discount: "24.4%",
      inStock: true,
      stockCount: "25 sets",
      phone: "+91 94228 11204",
      paymentOptions: "Cash, UPI",
      badge: "In Stock"
    },
    {
      dealerId: "d-04",
      name: "AgroStar Farmer App",
      location: "Farm gate delivery in 48 hrs",
      distance: "Home Delivery",
      channelType: "typeOnline",
      licenseNo: "IN-ECOM-AGRI-883",
      isVerified: true,
      price: 360,
      mrp: 450,
      discount: "20.0%",
      inStock: true,
      stockCount: "Unlimited",
      phone: "1800-120-3232",
      paymentOptions: "COD Available",
      badge: "Free Delivery on 2+ sets"
    }
  ],
  "prod-03": [
    {
      dealerId: "d-03",
      name: "Amravati Shetkari FPO Agro Hub",
      location: "MIDC Agri Complex, Amravati",
      distance: "11.5 km",
      channelType: "typeFpo",
      licenseNo: "MH-FPO-AMR-2021-09",
      isVerified: true,
      price: 660,
      mrp: 850,
      discount: "22.3%",
      inStock: true,
      stockCount: "50 cans",
      phone: "+91 98812 77412",
      paymentOptions: "UPI, Cash",
      badge: "Certified Bio-Input"
    },
    {
      dealerId: "d-01",
      name: "Shivaji Krishi Seva Kendra",
      location: "Cotton Market Road, Amravati",
      distance: "6.2 km",
      channelType: "typeLocal",
      licenseNo: "MH-AMR-RET-49102",
      isVerified: true,
      price: 720,
      mrp: 850,
      discount: "15.3%",
      inStock: true,
      stockCount: "14 cans",
      phone: "+91 94228 11204",
      paymentOptions: "Cash, UPI",
      badge: "Ready Stock"
    }
  ],
  "prod-04": [
    {
      dealerId: "d-02",
      name: "Bhatkuli Taluka Sahakari Kharedi Vikri Sangh",
      location: "APMC Market Yard, Bhatkuli",
      distance: "2.1 km",
      channelType: "typeCoop",
      licenseNo: "MH-COOP-BHT-108",
      isVerified: true,
      price: 1190,
      mrp: 1450,
      discount: "17.9%",
      inStock: true,
      stockCount: "40 pouches",
      phone: "+91 721 245012",
      paymentOptions: "Cash, UPI",
      badge: "Best Rate"
    },
    {
      dealerId: "d-01",
      name: "Shivaji Krishi Seva Kendra",
      location: "Cotton Market Road, Amravati",
      distance: "6.2 km",
      channelType: "typeLocal",
      licenseNo: "MH-AMR-RET-49102",
      isVerified: true,
      price: 1250,
      mrp: 1450,
      discount: "13.8%",
      inStock: true,
      stockCount: "18 pouches",
      phone: "+91 94228 11204",
      paymentOptions: "Cash, UPI",
      badge: "Authorized Syngenta Dealer"
    }
  ],
  "prod-05": [
    {
      dealerId: "d-01",
      name: "Shivaji Krishi Seva Kendra",
      location: "Cotton Market Road, Amravati",
      distance: "6.2 km",
      channelType: "typeLocal",
      licenseNo: "MH-AMR-RET-49102",
      isVerified: true,
      price: 760,
      mrp: 920,
      discount: "17.4%",
      inStock: true,
      stockCount: "30 bottles",
      phone: "+91 94228 11204",
      paymentOptions: "Cash, UPI",
      badge: "Original Batch Guarantee"
    }
  ],
  "prod-06": [
    {
      dealerId: "d-02",
      name: "Bhatkuli Taluka Sahakari Kharedi Vikri Sangh",
      location: "APMC Market Yard, Bhatkuli",
      distance: "2.1 km",
      channelType: "typeCoop",
      licenseNo: "MH-COOP-BHT-108",
      isVerified: true,
      price: 175,
      mrp: 240,
      discount: "27.1%",
      inStock: true,
      stockCount: "350 kg",
      phone: "+91 721 245012",
      paymentOptions: "Cash, UPI",
      badge: "Lowest Rate"
    },
    {
      dealerId: "d-01",
      name: "Shivaji Krishi Seva Kendra",
      location: "Cotton Market Road, Amravati",
      distance: "6.2 km",
      channelType: "typeLocal",
      licenseNo: "MH-AMR-RET-49102",
      isVerified: true,
      price: 195,
      mrp: 240,
      discount: "18.7%",
      inStock: true,
      stockCount: "90 kg",
      phone: "+91 94228 11204",
      paymentOptions: "Cash, UPI",
      badge: "Mahadhan Direct"
    }
  ]
};

export const MANDI_RATES = [
  { crop: "Cotton (मध्यम धागा कापूस)", mandi: "Amravati APMC", modalPrice: "₹7,480", change: "+₹120", trend: "up" },
  { crop: "Soybean (पिवळे सोयाबीन)", mandi: "Akola APMC", modalPrice: "₹4,650", change: "+₹45", trend: "up" },
  { crop: "Gram / Chana (चना)", mandi: "Nagpur APMC", modalPrice: "₹5,850", change: "-₹20", trend: "down" },
  { crop: "Tur / Arhar (लाल तूर)", mandi: "Yavatmal APMC", modalPrice: "₹9,800", change: "+₹150", trend: "up" }
];

export const REGIONAL_ALERTS = [
  {
    id: "alert-1",
    district: "Amravati & Yavatmal",
    severity: "high",
    pest: "Pink Bollworm (गुलाबी बोंडअळी)",
    advisoryEn: "Rosette flowers observed > 8% in late sown Bt cotton. Install pheromone traps and monitor daily moth catch.",
    advisoryMr: "उशिरा पेरणी केलेल्या बीटी कापसात बोंडअळीचा प्रादुर्भाव वाढू लागला आहे. तातडीने कामगंध सापळे लावावेत.",
    date: "23 Nov 2026"
  },
  {
    id: "alert-2",
    district: "Akola & Washim",
    severity: "medium",
    pest: "Soybean Yellow Mosaic (पिवळा मोजॅक)",
    advisoryEn: "Whitefly activity detected in pod-stage soybean. Spray recommended systemic repellant if vector population exceeds threshold.",
    advisoryMr: "सोयाबीन शेंगा अवस्थेत पांढरी माशीचा प्रादुर्भाव. नियंत्रणासाठी निंबोळी अर्क किंवा शिफारशीत कीटकनाशक वापरावे.",
    date: "22 Nov 2026"
  }
];

export const DEMO_USERS = {
  farmer: {
    role: "farmer",
    name: "Gajananrao Deshmukh (गजाननराव देशमुख)",
    phone: "9822345678",
    otp: "1234",
    village: "Bhatkuli (भातकुली)",
    district: "Amravati (अमरावती)",
    landSize: 8.5,
    crop: "cotton",
    avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80"
  },
  consultant: {
    role: "consultant",
    name: "Dr. Ramesh Patil (डॉ. रमेश पाटील)",
    email: "dr.patil@agri.univ.in",
    password: "doctor123",
    degree: "Ph.D. Entomology, PDKV Akola",
    registrationNo: "MH-AGRI-EXP-2008-4102",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"
  },
  admin: {
    role: "admin",
    name: "Shri A. K. Joshi (Director, Agri Surveillance)",
    email: "admin@krishi.gov.in",
    password: "admin2026",
    department: "Maharashtra State Agriculture Dept.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  }
};

export const AI_KNOWLEDGE_BASE = [
  {
    keywords: ["bollworm", "pink bollworm", "बोंडअळी", "गुलाबी", "सुंडी", "hole in boll", "छिद्र"],
    crop: "cotton",
    titleEn: "Cotton Pink Bollworm (Pectinophora gossypiella)",
    titleMr: "कापूस गुलाबी बोंडअळी प्रादुर्भाव",
    titleHi: "कपास गुलाबी सुंडी प्रकोप",
    replyMr: `🌱 **गुलाबी बोंडअळी विश्लेषण**:
१. **लक्षणे**: बोंडावर बारीक छिद्र, आत गुलाबी रंगाची अळी, रोसेट फुले (गुलाब कळीसारखी फुले).
२. **तातडीचे जैविक उपाय**: एकरी ५ कामगंध सापळे (Pheromone Traps) पीक पातळीच्या १.५ फूट वर लावा.
३. **रासायनिक शिफारस (ETL ओलांडल्यास)**: प्रोफेक्स सुपर (Profenofos + Cypermethrin) ३०-३५ मिली प्रति १५ लिटर पंप.
४. **खबरदारी**: फवारणी सकाळी शांत हवेत करा व प्रतीक्षा कालावधी १४ दिवस पाळा.`,
    replyHi: `🌱 **गुलाबी सुंडी विश्लेषण**:
1. **लक्षण**: टिंडों में छेद, अंदर गुलाबी इल्ली, फूल कलियों का मुड़ना।
2. **तत्काल उपाय**: प्रति एकड़ 5 फेरोमोन ट्रैप फसल स्तर से 1.5 फीट ऊपर लगाएं।
3. **रासायनिक दवा**: प्रोफेक्स सुपर 30-35 मिली प्रति 15 लीटर पंप छिड़कें।
4. **सावधानी**: सुबह के समय छिड़काव करें और 14 दिन प्रतीक्षा अवधि रखें।`,
    replyEn: `🌱 **Pink Bollworm Diagnosis**:
1. **Symptoms**: Perforated bolls, rosetted flowers, pink larvae inside bolls.
2. **Immediate IPM Measure**: Deploy 5-8 Gossyplure pheromone traps per acre at canopy level.
3. **Chemical Measure (if ETL > 10%)**: Profex Super (Profenofos 40% + Cypermethrin 4% EC) at 30-35 ml per 15L spray pump.
4. **Precaution**: Spray early morning; observe 14 days pre-harvest waiting period.`,
    suggestedProductId: "prod-02"
  },
  {
    keywords: ["yellow", "mosaic", "ymv", "पिवळा", "मोझॅक", "पीला", "मोजेक", "सोयाबीन पिवळे"],
    crop: "soybean",
    titleEn: "Soybean Yellow Mosaic Virus (YMV)",
    titleMr: "सोयाबीन पिवळा मोझॅक व्हायरस",
    titleHi: "सोयाबीन पीला मोजेक वायरस",
    replyMr: `🌱 **सोयाबीन पिवळा मोझॅक विश्लेषण**:
१. **लक्षणे**: पानाच्या शिरा पिवळ्या पडणे, पानावर पिवळे-हिरवे चट्टे, शेंगा बारीक राहणे.
२. **कारण**: हा रोग पांढऱ्या माशीमुळे (Whitefly Vector) वेगाने पसरतो.
३. **उपाय**: बाधित रोपे त्वरित उपटून जमिनीत गाडा. पांढरी माशी रोखण्यासाठी निंबोळी अर्क (Neem Baan 10,000 PPM) २५-३० मिली प्रति पंप फवारा.
४. **टीप**: बुरशीनाशक फवारू नका; केवळ पांढरी माशी नियंत्रणच प्रभावी ठरते.`,
    replyHi: `🌱 **सोयाबीन पीला मोजेक विश्लेषण**:
1. **लक्षण**: पत्तियों की नसें पीली पड़ना, पत्तियों पर धब्बे, पौधों का बौनापन।
2. **कारण**: यह विषाणु सफेद मक्खी द्वारा फैलता है।
3. **रोकथाम**: रोगी पौधे उखाड़कर गाड़ दें। नीम तेल 10,000 PPM (25-30 मिली/पंप) छिड़कें।
4. **नोट**: केवल रस चूसक कीट का नियंत्रण ही एकमात्र समाधान है।`,
    replyEn: `🌱 **Soybean Yellow Mosaic Virus (YMV) Diagnosis**:
1. **Symptoms**: Bright yellow discoloration along leaf veins, stunted pods.
2. **Vector**: Transmitted actively by whiteflies.
3. **Control**: Rogue out infected plants. Spray Neem Extract (10,000 PPM) at 25-30 ml/15L pump to control vector.
4. **Note**: Do not waste money on fungicides; vector control is essential.`,
    suggestedProductId: "prod-03"
  },
  {
    keywords: ["whitefly", "sucking", "माशी", "पांढरी", "मक्खी", "तेला", "तुडतुडे", "चुरडा"],
    crop: "cotton",
    titleEn: "Whitefly & Sucking Pests",
    titleMr: "पांढरी माशी व रसशोषक कीड",
    titleHi: "सफेद मक्खी और रस चूसक कीट",
    replyMr: `🌱 **पांढरी माशी व चुरडा विश्लेषण**:
१. **लक्षणे**: पानाच्या मागच्या बाजूस बारीक पांढऱ्या माश्या, पानांवर चिकटा (Honeydew), पाने मुरडणे.
२. **सेंद्रिय उपाय**: एकरी १०-१५ पिवळे चिकट सापळे (Yellow Sticky Traps) लावा.
३. **औषध**: पेगासस ५० WP (Diafenthiuron) २०-२५ ग्रॅम प्रति १५ लिटर पंप फवारा.`,
    replyHi: `🌱 **सफेद मक्खी विश्लेषण**:
1. **लक्षण**: पत्तों के नीचे सफेद मक्खियां, चिपचिपा पदार्थ, पत्तों का मुड़ना।
2. **जैविक उपाय**: प्रति एकड़ 10-15 पीले चिपचिपे कार्ड लगाएं।
3. **दवा**: पेगासस 50 WP (डायफेंथियूरॉन) 20-25 ग्राम प्रति 15 लीटर पंप छिड़कें।`,
    replyEn: `🌱 **Whitefly Infestation Diagnosis**:
1. **Symptoms**: Whitefly swarms under leaves, sooty honeydew mold, curling.
2. **Eco Measure**: Set 10-15 yellow sticky traps per acre at crop height.
3. **Prescription**: Pegasus 50 WP (Diafenthiuron) at 20-25 gm per 15L pump.`,
    suggestedProductId: "prod-04"
  },
  {
    keywords: ["fertilizer", "00:52:34", "19:19:19", "खत", "फूल", "flower drop", "गळ"],
    crop: "all",
    titleEn: "Water Soluble Fertilizer & Flower Retention",
    titleMr: "विद्राव्य खते व फुलगळ प्रतिबंधक उपाय",
    titleHi: "घुलनशील खाद और फूल-फल भराव",
    replyMr: `🌱 **विद्राव्य खत सल्ला**:
१. **फुलधारणा अवस्थेत**: महाधन ००:५२:३४ (Monopotassium Phosphate) ७५-१०० ग्रॅम प्रति १५ लिटर पंप फवारा.
२. **फायदे**: फुलगळ थांबते, बोंडे व शेंगांचा आकार एकसारखा मोठा होतो.
३. **टीप**: कडक उन्हात फवारू नका; सकाळी किंवा संध्याकाळी फवारावे.`,
    replyHi: `🌱 **घुलनशील खाद सलाह**:
1. **फूल आने पर**: महाधन 00:52:34 खाद 75-100 ग्राम प्रति 15 लीटर पंप छिड़कें।
2. **लाभ**: फूल झड़ने से रोकता है तथा फलियों और टिंडों का भराव अच्छा होता है।
3. **समय**: तेज धूप में छिड़काव न करें; सुबह 8-10 बजे अनुकूल रहता है।`,
    replyEn: `🌱 **Fertilizer Advisory**:
1. **At Flowering / Pod stage**: Spray Mahadhan 00:52:34 at 75-100 gm per 15L pump.
2. **Benefits**: Prevents premature flower shedding and improves boll/pod weight.
3. **Timing**: Spray in calm morning hours (8 AM - 10:30 AM).`,
    suggestedProductId: "prod-06"
  }
];
