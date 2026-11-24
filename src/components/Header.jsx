import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sprout, 
  Sparkles, 
  AlertCircle, 
  ClipboardList, 
  ShieldCheck, 
  Scale, 
  BarChart3, 
  LogOut, 
  User,
  Stethoscope
} from 'lucide-react';

export default function Header() {
  const { 
    lang, 
    setLang, 
    t, 
    currentUser, 
    role, 
    activeTab, 
    setActiveTab, 
    logout,
    cases 
  } = useApp();

  if (!currentUser) return null;

  // Navigation items per role
  const farmerNav = [
    { id: 'home', label: t.navHome },
    { id: 'ai', label: t.navAi, isAi: true },
    { id: 'report', label: t.navReport },
    { id: 'cases', label: t.navCases, badge: cases.filter(c => c.status === 'resolved').length },
    { id: 'products', label: t.navProducts },
    { id: 'prices', label: t.navPrices },
  ];

  const consultantNav = [
    { id: 'cases', label: "केस कतार (Case Queue)", badge: cases.filter(c => c.status !== 'resolved').length },
    { id: 'products', label: t.navProducts },
    { id: 'prices', label: t.navPrices },
  ];

  const adminNav = [
    { id: 'admin', label: t.navAdmin },
    { id: 'products', label: t.navProducts },
    { id: 'prices', label: t.navPrices },
  ];

  const currentNavItems = role === 'consultant' 
    ? consultantNav 
    : role === 'admin' 
    ? adminNav 
    : farmerNav;

  return (
    <header className="bg-white border-b border-green-100 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab(role === 'consultant' ? 'cases' : role === 'admin' ? 'admin' : 'home')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-green-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                {t.appName}
              </h1>
              <p className="text-[11px] text-green-700 font-semibold hidden md:block">
                {t.appTagline}
              </p>
            </div>
          </div>

          {/* Desktop Minimal Navigation Links for Active Role */}
          <nav className="hidden lg:flex items-center space-x-1">
            {currentNavItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-green-100 text-green-900'
                      : 'text-slate-600 hover:text-green-800 hover:bg-green-50'
                  }`}
                >
                  {item.isAi && <Sparkles className="w-3.5 h-3.5 text-amber-500" />}
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-extrabold bg-green-600 text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Language Switcher, User Pill, Logout */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setLang('mr')}
                className={`px-2 py-1 font-bold rounded-md transition-all ${
                  lang === 'mr' ? 'bg-green-600 text-white shadow-xs' : 'text-slate-600 hover:text-green-800'
                }`}
                title="मराठी"
              >
                मराठी
              </button>
              <button
                type="button"
                onClick={() => setLang('hi')}
                className={`px-2 py-1 font-bold rounded-md transition-all ${
                  lang === 'hi' ? 'bg-green-600 text-white shadow-xs' : 'text-slate-600 hover:text-green-800'
                }`}
                title="हिंदी"
              >
                हिंदी
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2 py-1 font-bold rounded-md transition-all ${
                  lang === 'en' ? 'bg-green-600 text-white shadow-xs' : 'text-slate-600 hover:text-green-800'
                }`}
                title="English"
              >
                EN
              </button>
            </div>

            {/* Active User Pill */}
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200">
              <img
                src={currentUser.avatar}
                alt="Profile"
                className="w-6 h-6 rounded-full object-cover border border-green-300"
              />
              <div className="hidden sm:block text-left text-xs">
                <div className="font-bold text-slate-800 truncate max-w-[120px]">
                  {currentUser.name?.split(' ')[0]}
                </div>
                <div className="text-[10px] text-green-700 font-semibold uppercase">
                  {role === 'farmer' ? t.roleFarmer : role === 'consultant' ? t.roleConsultant : t.roleAdmin}
                </div>
              </div>
            </div>

            {/* Prominent Working Logout Button */}
            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50/70 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors"
              title={t.logout}
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.logout}</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
