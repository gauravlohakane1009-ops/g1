import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sprout, 
  Stethoscope, 
  ShieldCheck, 
  ArrowRight, 
  Phone, 
  Lock, 
  User, 
  MapPin, 
  Sparkles,
  CheckCircle2,
  KeyRound,
  ArrowLeft
} from 'lucide-react';
import { DEMO_USERS } from '../data/mockData';

export default function AuthPortal() {
  const { lang, setLang, t, login } = useApp();

  // Active view: 'select' | 'farmer' | 'consultant' | 'admin'
  const [activePortal, setActivePortal] = useState('select');

  // Farmer Tab: 'login' | 'register'
  const [farmerTab, setFarmerTab] = useState('login');

  // Farmer form state
  const [farmerPhone, setFarmerPhone] = useState('');
  const [farmerOtp, setFarmerOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Farmer register state
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regVillage, setRegVillage] = useState('Bhatkuli, Amravati');
  const [regCrop, setRegCrop] = useState('cotton');
  const [regLand, setRegLand] = useState('5.0');

  // Consultant form state
  const [consultantId, setConsultantId] = useState('');
  const [consultantPass, setConsultantPass] = useState('');

  // Admin form state
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPass, setAdminPass] = useState('');

  // 1-Click Demo Fill Handlers
  const handleFillDemoFarmer = () => {
    setFarmerPhone(DEMO_USERS.farmer.phone);
    setFarmerOtp(DEMO_USERS.farmer.otp);
    setOtpSent(true);
  };

  const handleFillDemoConsultant = () => {
    setConsultantId(DEMO_USERS.consultant.email);
    setConsultantPass(DEMO_USERS.consultant.password);
  };

  const handleFillDemoAdmin = () => {
    setAdminUsername(DEMO_USERS.admin.email);
    setAdminPass(DEMO_USERS.admin.password);
  };

  // Submit Handlers
  const handleFarmerLogin = (e) => {
    e.preventDefault();
    login('farmer', {
      phone: farmerPhone || DEMO_USERS.farmer.phone
    });
  };

  const handleFarmerRegister = (e) => {
    e.preventDefault();
    login('farmer', {
      name: regName || "नवीन शेतकरी (New Farmer)",
      phone: regPhone || "9800011222",
      village: regVillage,
      district: "Maharashtra",
      landSize: parseFloat(regLand) || 4.0,
      crop: regCrop
    });
  };

  const handleConsultantLogin = (e) => {
    e.preventDefault();
    login('consultant', {
      email: consultantId || DEMO_USERS.consultant.email
    });
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    login('admin', {
      email: adminUsername || DEMO_USERS.admin.email
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">
      
      {/* Top Header with Brand & Language Switcher */}
      <header className="bg-white border-b border-green-100 py-4 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center text-white shadow-sm">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {t.appName}
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">
                {t.appTagline}
              </p>
            </div>
          </div>

          {/* Prominent Language Switcher */}
          <div className="flex items-center bg-green-50 p-1 rounded-xl border border-green-200">
            <button
              type="button"
              onClick={() => setLang('mr')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                lang === 'mr'
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'text-slate-700 hover:text-green-800'
              }`}
            >
              मराठी
            </button>
            <button
              type="button"
              onClick={() => setLang('hi')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                lang === 'hi'
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'text-slate-700 hover:text-green-800'
              }`}
            >
              हिंदी
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                lang === 'en'
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'text-slate-700 hover:text-green-800'
              }`}
            >
              EN
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 sm:py-12 flex flex-col justify-center">
        
        {/* VIEW 1: Portal Selection Landing */}
        {activePortal === 'select' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full border border-green-200">
                🌱 डिजिटल कृषी सेवा मंच (Digital Agri Platform)
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {t.portalSelectTitle}
              </h2>
              <p className="text-sm text-slate-600">
                {t.portalSelectSubtitle}
              </p>
            </div>

            {/* Three Clear Portal Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Portal 1: Farmer */}
              <div 
                onClick={() => setActivePortal('farmer')}
                className="bg-white rounded-2xl p-6 border-2 border-green-200 hover:border-green-600 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Sprout className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-green-700 transition-colors">
                    {t.farmerPortalTitle}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {t.farmerPortalDesc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-green-700">
                  <span>प्रवेश करा (Enter)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Portal 2: Agri Consultant */}
              <div 
                onClick={() => setActivePortal('consultant')}
                className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-green-600 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Stethoscope className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-green-700 transition-colors">
                    {t.consultantPortalTitle}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {t.consultantPortalDesc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                  <span>प्रवेश करा (Enter)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Portal 3: Admin */}
              <div 
                onClick={() => setActivePortal('admin')}
                className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-green-600 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-green-700 transition-colors">
                    {t.adminPortalTitle}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {t.adminPortalDesc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>प्रवेश करा (Enter)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </div>

          </div>
        )}

        {/* VIEW 2: Farmer Login & Register */}
        {activePortal === 'farmer' && (
          <div className="max-w-md mx-auto w-full bg-white rounded-3xl p-6 sm:p-8 border border-green-200 shadow-sm animate-in fade-in duration-200 space-y-6">
            
            <button
              type="button"
              onClick={() => setActivePortal('select')}
              className="text-xs font-bold text-slate-500 hover:text-green-700 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.backToPortals}</span>
            </button>

            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center mx-auto">
                <Sprout className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                {t.farmerPortalTitle}
              </h2>
              <p className="text-xs text-slate-500">
                मोबाईल नंबर किंवा नवीन शेतकरी नोंदणी
              </p>
            </div>

            {/* Tabs: Login vs Register */}
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setFarmerTab('login')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  farmerTab === 'login' ? 'bg-white text-green-800 shadow-sm' : 'text-slate-600'
                }`}
              >
                {t.loginTab}
              </button>
              <button
                type="button"
                onClick={() => setFarmerTab('register')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  farmerTab === 'register' ? 'bg-white text-green-800 shadow-sm' : 'text-slate-600'
                }`}
              >
                {t.registerTab}
              </button>
            </div>

            {/* Quick Demo Credentials Button */}
            <button
              type="button"
              onClick={handleFillDemoFarmer}
              className="w-full py-2 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.fillDemoFarmer} (Gajananrao - 9822345678)</span>
            </button>

            {/* Login Form */}
            {farmerTab === 'login' ? (
              <form onSubmit={handleFarmerLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.mobileNumber}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 text-xs text-slate-500 font-bold">+91</span>
                    <input
                      type="tel"
                      required
                      value={farmerPhone}
                      onChange={(e) => setFarmerPhone(e.target.value)}
                      placeholder="98223 45678"
                      className="w-full text-sm font-semibold pl-12 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      {t.enterOtp}
                    </label>
                    <button
                      type="button"
                      onClick={() => setOtpSent(true)}
                      className="text-[11px] font-bold text-green-700 hover:underline"
                    >
                      {otpSent ? "OTP पुन्हा पाठवला ✓" : t.getOtp}
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    value={farmerOtp}
                    onChange={(e) => setFarmerOtp(e.target.value)}
                    placeholder="उदा. 1234"
                    className="w-full text-sm font-bold tracking-widest px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-bold shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  <span>{t.verifyAndLogin}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              /* Register Form */
              <form onSubmit={handleFarmerRegister} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.farmerName}
                  </label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="उदा. रमेश देशमुख"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t.mobileNumber}
                    </label>
                    <input
                      type="tel"
                      required
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="98220 00000"
                      className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t.landSize}
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      value={regLand}
                      onChange={(e) => setRegLand(e.target.value)}
                      className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t.village}
                    </label>
                    <input
                      type="text"
                      required
                      value={regVillage}
                      onChange={(e) => setRegVillage(e.target.value)}
                      className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t.primaryCrops}
                    </label>
                    <select
                      value={regCrop}
                      onChange={(e) => setRegCrop(e.target.value)}
                      className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-600 bg-white"
                    >
                      <option value="cotton">कापूस (Cotton)</option>
                      <option value="soybean">सोयाबीन (Soybean)</option>
                      <option value="chana">हरभरा (Gram)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-bold shadow-sm transition-colors mt-2"
                >
                  नोंदणी करा व प्रवेश करा (Register & Login)
                </button>
              </form>
            )}

          </div>
        )}

        {/* VIEW 3: Consultant Login */}
        {activePortal === 'consultant' && (
          <div className="max-w-md mx-auto w-full bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm animate-in fade-in duration-200 space-y-6">
            
            <button
              type="button"
              onClick={() => setActivePortal('select')}
              className="text-xs font-bold text-slate-500 hover:text-green-700 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.backToPortals}</span>
            </button>

            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                {t.consultantPortalTitle}
              </h2>
              <p className="text-xs text-slate-500">
                डॉ. पंजाबराव देशमुख कृषी विद्यापीठ (PDKV) व कृषी तज्ज्ञ
              </p>
            </div>

            {/* Quick Demo Fill Button */}
            <button
              type="button"
              onClick={handleFillDemoConsultant}
              className="w-full py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.fillDemoConsultant} (Dr. Ramesh Patil)</span>
            </button>

            <form onSubmit={handleConsultantLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.consultantId}
                </label>
                <input
                  type="text"
                  required
                  value={consultantId}
                  onChange={(e) => setConsultantId(e.target.value)}
                  placeholder="dr.patil@agri.univ.in"
                  className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.password}
                </label>
                <input
                  type="password"
                  required
                  value={consultantPass}
                  onChange={(e) => setConsultantPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-bold shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <span>केस कतारमध्ये प्रवेश करा (Login to Queue)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

          </div>
        )}

        {/* VIEW 4: Admin Login */}
        {activePortal === 'admin' && (
          <div className="max-w-md mx-auto w-full bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm animate-in fade-in duration-200 space-y-6">
            
            <button
              type="button"
              onClick={() => setActivePortal('select')}
              className="text-xs font-bold text-slate-500 hover:text-green-700 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.backToPortals}</span>
            </button>

            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-slate-100 text-slate-800 rounded-2xl flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                {t.adminPortalTitle}
              </h2>
              <p className="text-xs text-slate-500">
                विभागीय कृषी नियंत्रण व कीड प्रादुर्भाव कक्ष
              </p>
            </div>

            {/* Quick Demo Fill Button */}
            <button
              type="button"
              onClick={handleFillDemoAdmin}
              className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-600" />
              <span>{t.fillDemoAdmin} (admin@krishi.gov.in)</span>
            </button>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.adminUsername}
                </label>
                <input
                  type="text"
                  required
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  placeholder="admin@krishi.gov.in"
                  className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-700 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.password}
                </label>
                <input
                  type="password"
                  required
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-slate-900 hover:bg-black text-white rounded-xl text-sm font-bold shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <span>नियंत्रण कक्षात प्रवेश करा (Login Admin)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

          </div>
        )}

      </main>

      {/* Clean Footer */}
      <footer className="text-center py-4 text-xs text-slate-400 border-t border-slate-100">
        स्मार्ट कृषी सल्लागार • शेतकरी, तज्ज्ञ व प्रशासकीय एकात्मिक व्यासपीठ
      </footer>

    </div>
  );
}
