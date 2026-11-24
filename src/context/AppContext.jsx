import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';
import { 
  INITIAL_FARMER_PROFILE, 
  CONSULTANT_PROFILE, 
  INITIAL_CASES, 
  VERIFIED_PRODUCTS, 
  PRICE_COMPARISONS, 
  MANDI_RATES, 
  REGIONAL_ALERTS,
  DEMO_USERS,
  AI_KNOWLEDGE_BASE
} from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Primary language: 'mr' (मराठी), 'hi' (हिंदी), 'en' (English)
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('smart_agri_lang') || 'mr';
  });

  // Current authenticated user (persisted in localStorage)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('smart_agri_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Active navigation tab
  const [activeTab, setActiveTab] = useState(() => {
    if (!currentUser) return 'home';
    if (currentUser.role === 'consultant') return 'cases';
    if (currentUser.role === 'admin') return 'admin';
    return 'home';
  });

  // Farmer Profile
  const [farmerProfile, setFarmerProfile] = useState(() => {
    if (currentUser?.role === 'farmer') {
      return { ...INITIAL_FARMER_PROFILE, ...currentUser };
    }
    return INITIAL_FARMER_PROFILE;
  });

  // Cases state
  const [cases, setCases] = useState(INITIAL_CASES);
  const [selectedCaseId, setSelectedCaseId] = useState("SAC-2026-104");

  // Price comparison selected product
  const [selectedProductId, setSelectedProductId] = useState("prod-01");

  // Notifications
  const [notifications, setNotifications] = useState([
    {
      id: "notif-1",
      titleEn: "Prescription Issued!",
      titleMr: "नवीन सल्ला व प्रिस्क्रिप्शन उपलब्ध!",
      titleHi: "नया पर्चा जारी किया गया!",
      descEn: "Dr. Ramesh Patil responded to Cotton Pink Bollworm case #SAC-2026-104",
      descMr: "डॉ. रमेश पाटील यांनी कापूस बोंडअळी केस #SAC-2026-104 साठी औषध शिफारस दिली आहे.",
      descHi: "डॉ. रमेश पाटिल ने कपास गुलाबी सुंडी केस #SAC-2026-104 के लिए पर्चा दिया है।",
      time: "10 mins ago",
      caseId: "SAC-2026-104",
      unread: true
    }
  ]);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  // Toast notification
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // AI Assistant Chat State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiChatMessages, setAiChatMessages] = useState([
    {
      id: "ai-welcome",
      sender: "ai",
      time: "Just now",
      text: lang === 'mr' ? "रामराम! मी आपला स्मार्ट कृषी AI सहाय्यक आहे. कापूस, सोयाबीन व इतर पिकांवरील रोग, खते किंवा कीड याबद्दल काहीही विचारा किंवा पिकाचा फोटो जोडा." :
            lang === 'hi' ? "नमस्ते! मैं आपका स्मार्ट कृषि AI सहायक हूँ। कपास, सोयाबीन या अन्य फसलों के रोग, कीट, खाद या छिड़काव के बारे में पूछें।" :
            "Hello! I am your Smart Agriculture AI Assistant. Ask any question about cotton, soybean pests, fertilizers, or attach a crop photo."
    }
  ]);

  // Save language changes
  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem('smart_agri_lang', newLang);
  };

  // Login handler
  const login = (role, customData = {}) => {
    const demoBase = DEMO_USERS[role] || DEMO_USERS.farmer;
    const user = {
      ...demoBase,
      ...customData,
      role: role
    };

    setCurrentUser(user);
    localStorage.setItem('smart_agri_user', JSON.stringify(user));

    if (role === 'farmer') {
      setFarmerProfile(prev => ({ ...prev, ...user }));
      setActiveTab('home');
    } else if (role === 'consultant') {
      setActiveTab('cases');
    } else if (role === 'admin') {
      setActiveTab('admin');
    }

    const welcomeMsg = lang === 'mr' ? `${user.name} लॉगिन यशस्वी!` :
                       lang === 'hi' ? `${user.name} लॉगिन सफल!` :
                       `Welcome, ${user.name}!`;
    showToast(welcomeMsg, 'success');
  };

  // Logout handler
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('smart_agri_user');
    setActiveTab('home');
    setIsAiModalOpen(false);
    showToast(translations[lang]?.logoutSuccess || "Logged out successfully", 'info');
  };

  // Translation accessor
  const t = translations[lang] || translations.en;
  const currentRole = currentUser?.role || 'farmer';

  // Add new case (from farmer reporting or AI escalation)
  const addNewCase = (newCaseData) => {
    const caseId = `SAC-2026-${Math.floor(100 + Math.random() * 900)}`;
    const fullCase = {
      id: caseId,
      farmerId: farmerProfile.id || "farmer-01",
      farmerName: farmerProfile.name,
      village: `${farmerProfile.village}, ${farmerProfile.district}`,
      reportedAt: new Date().toLocaleDateString('en-GB') + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "triaged",
      thread: [
        {
          sender: "farmer",
          senderName: farmerProfile.name,
          time: "Just now",
          message: newCaseData.description || "पिकाची समस्या नोंदवली.",
          hasVoice: !!newCaseData.audioBlob || !!newCaseData.audioDuration
        },
        {
          sender: "system",
          senderName: "AI Assistant (कृषी AI)",
          time: "Just now",
          message: `AI प्राथमिक तपासणी पूर्ण: ${newCaseData.aiTriage?.confidence || 92}% खात्रीसह '${newCaseData.aiTriage?.diagnosis || "पीक रोग"}'. केस कृषी तज्ज्ञांच्या कतारमध्ये समाविष्ट करण्यात आली आहे.`
        }
      ],
      ...newCaseData
    };

    setCases(prev => [fullCase, ...prev]);
    setSelectedCaseId(caseId);
    
    showToast(
      lang === 'mr' ? `केस #${caseId} यशस्वीरित्या नोंदवली! तज्ज्ञांकडे पाठवली.` :
      lang === 'hi' ? `केस #${caseId} दर्ज किया गया!` :
      `Case #${caseId} submitted to Consultant Queue!`,
      'success'
    );

    return caseId;
  };

  // Agronomist issues official prescription
  const issuePrescription = (caseId, prescriptionData) => {
    setCases(prevCases => prevCases.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          status: "resolved",
          prescription: {
            consultantName: CONSULTANT_PROFILE.name,
            institution: CONSULTANT_PROFILE.institution,
            prescribedAt: new Date().toLocaleDateString('en-GB') + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            rxId: `RX-PDKV-${Math.floor(1000 + Math.random() * 9000)}`,
            ...prescriptionData
          },
          thread: [
            ...c.thread,
            {
              sender: "consultant",
              senderName: CONSULTANT_PROFILE.name,
              time: "Just now",
              message: `नमस्कार, मी आपल्या पिकाची तपासणी करून अधिकृत प्रिस्क्रिप्शन जारी केले आहे. खालीलप्रमाणे प्रमाण वापरावे.`,
              hasRx: true
            }
          ]
        };
      }
      return c;
    }));

    showToast(
      lang === 'mr' ? `केस #${caseId} साठी प्रिस्क्रिप्शन जारी केले!` :
      lang === 'hi' ? `केस #${caseId} के लिए पर्चा जारी कर दिया गया!` :
      `Prescription issued for Case #${caseId}!`,
      'success'
    );
  };

  // Add message in consultation thread
  const addCaseMessage = (caseId, text) => {
    setCases(prevCases => prevCases.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          thread: [
            ...c.thread,
            {
              sender: currentRole === 'consultant' ? 'consultant' : 'farmer',
              senderName: currentRole === 'consultant' ? CONSULTANT_PROFILE.name : farmerProfile.name,
              time: "Just now",
              message: text
            }
          ]
        };
      }
      return c;
    }));
  };

  // AI Assistant Query Handler
  const sendAiMessage = (userText, attachedImage = null) => {
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: userText,
      image: attachedImage
    };

    setAiChatMessages(prev => [...prev, userMsg]);

    // Match smart query
    const lower = (userText || "").toLowerCase();
    let matched = AI_KNOWLEDGE_BASE.find(kb => 
      kb.keywords.some(kw => lower.includes(kw.toLowerCase()))
    );

    // If attached image has bollworm / mosaic indicators
    if (!matched && attachedImage) {
      matched = AI_KNOWLEDGE_BASE[0]; // Pink bollworm default
    }

    setTimeout(() => {
      let aiText = "";
      let productSuggestion = null;

      if (matched) {
        aiText = lang === 'mr' ? matched.replyMr :
                 lang === 'hi' ? matched.replyHi :
                 matched.replyEn;
        
        if (matched.suggestedProductId) {
          productSuggestion = VERIFIED_PRODUCTS.find(p => p.id === matched.suggestedProductId);
        }
      } else {
        aiText = lang === 'mr' ? "🌱 **AI प्राथमिक सल्ला**: आपल्या समस्येची नोंद झाली आहे. लक्षणे पाहता योग्य जैविक किंवा आंतरप्रवाही फवारणी करावी. अधिक खात्रीशीर निदानासाठी खालील 'मानवी कृषी तज्ज्ञांकडे पाठवा' बटण दाबावे." :
                 lang === 'hi' ? "🌱 **AI प्रारंभिक सलाह**: आपके प्रश्न की जांच की गई है। सटीक निदान व पर्चे के लिए नीचे दिए गए 'विशेषज्ञ को भेजें' बटन का उपयोग करें।" :
                 "🌱 **AI Preliminary Advice**: To get an official laboratory-tested chemical prescription, tap 'Escalate to Human Consultant' below.";
      }

      const aiResponse = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: aiText,
        productSuggestion: productSuggestion,
        canEscalate: true,
        sourceQuery: userText,
        sourceImage: attachedImage
      };

      setAiChatMessages(prev => [...prev, aiResponse]);
    }, 600);
  };

  // Escalate directly from AI Assistant to Human Consultant
  const escalateAiToConsultant = (aiMsg) => {
    const cropId = aiMsg?.sourceQuery?.toLowerCase().includes("soybean") || aiMsg?.sourceQuery?.toLowerCase().includes("सोयाबीन") 
      ? "soybean" 
      : "cotton";

    const caseId = addNewCase({
      crop: cropId,
      cropNameEn: cropId === "soybean" ? "Soybean (सोयाबीन)" : "Cotton (कापूस)",
      stage: "Boll / Pod Formation",
      areaAffected: "2.0 एकर",
      urgency: "high",
      symptoms: ["symYellowing", "symBollDamage"],
      description: `[AI Chat Escalation]: ${aiMsg?.sourceQuery || "शेतकऱ्याने AI चॅटमधून थेट तज्ज्ञांकडे विचारणा केली."}`,
      imageUrl: aiMsg?.sourceImage || "https://images.unsplash.com/photo-1598512752271-33f913a5af13?w=800&auto=format&fit=crop&q=80",
      aiTriage: {
        diagnosis: "AI Triage Escalated Issue (तज्ज्ञ तपासणी आवश्यक)",
        confidence: 93,
        firstAid: "एकरी ५ कामगंध सापळे लावा व अनावश्यक रासायनिक कॉकटेल टाळा."
      }
    });

    setIsAiModalOpen(false);
    setActiveTab('cases');
    setSelectedCaseId(caseId);
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang: changeLanguage,
        t,
        currentUser,
        role: currentRole,
        login,
        logout,
        activeTab,
        setActiveTab,
        farmerProfile,
        setFarmerProfile,
        consultantProfile: CONSULTANT_PROFILE,
        cases,
        selectedCaseId,
        setSelectedCaseId,
        selectedProductId,
        setSelectedProductId,
        products: VERIFIED_PRODUCTS,
        priceComparisons: PRICE_COMPARISONS,
        mandiRates: MANDI_RATES,
        regionalAlerts: REGIONAL_ALERTS,
        notifications,
        toast,
        showToast,
        addNewCase,
        issuePrescription,
        addCaseMessage,
        // AI Assistant
        isAiModalOpen,
        setIsAiModalOpen,
        aiChatMessages,
        sendAiMessage,
        escalateAiToConsultant
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
