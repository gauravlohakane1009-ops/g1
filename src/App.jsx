import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Navigation from './components/Navigation';
import AuthPortal from './components/AuthPortal';
import FarmerDashboard from './components/FarmerDashboard';
import ProblemReporting from './components/ProblemReporting';
import ConsultantQueue from './components/ConsultantQueue';
import ConsultationThread from './components/ConsultationThread';
import ProductCatalog from './components/ProductCatalog';
import PriceComparisonTable from './components/PriceComparisonTable';
import AdminDashboard from './components/AdminDashboard';
import AIAssistantModal from './components/AIAssistantModal';
import FloatingAiButton from './components/FloatingAiButton';
import { CheckCircle2, PhoneCall, Sparkles } from 'lucide-react';

function AppContent() {
  const { 
    currentUser, 
    activeTab, 
    role, 
    toast, 
    t, 
    isAiModalOpen, 
    setIsAiModalOpen 
  } = useApp();

  // If no user is logged in, show AuthPortal selection & login flow
  if (!currentUser) {
    return <AuthPortal />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      
      {/* Clean Single Top Navigation Bar */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'home' && <FarmerDashboard />}
        
        {/* Dedicated Full Page AI Assistant Tab */}
        {activeTab === 'ai' && <AIAssistantModal isFullscreen={true} />}
        
        {activeTab === 'report' && <ProblemReporting />}
        
        {activeTab === 'cases' && (
          role === 'consultant' ? <ConsultantQueue /> : <ConsultationThread />
        )}
        
        {activeTab === 'products' && <ProductCatalog />}
        {activeTab === 'prices' && <PriceComparisonTable />}
        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Floating Bottom Navigation for Mobile */}
      <Navigation />

      {/* Floating "Ask AI" Button (bottom-right) */}
      <FloatingAiButton />

      {/* Floating AI Assistant Chat Modal (when opened via floating button) */}
      {isAiModalOpen && activeTab !== 'ai' && (
        <AIAssistantModal onClose={() => setIsAiModalOpen(false)} />
      )}

      {/* Global Toast Alert */}
      {toast && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 duration-200">
          <div className={`px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs sm:text-sm font-bold text-white ${
            toast.type === 'error' ? 'bg-rose-600' : 'bg-green-700 border border-green-500'
          }`}>
            <CheckCircle2 className="w-4 h-4 text-green-300 shrink-0" />
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Clean Minimal Footer */}
      <footer className="bg-white border-t border-green-100 text-xs text-slate-500 py-6 mb-16 lg:mb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">
              🌾 {t.appName}
            </span>
            <span className="text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-semibold">
              CIB-RC & PDKV Akola
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-600">
            <a 
              href="tel:18001801551" 
              className="flex items-center gap-1 font-semibold text-green-700 hover:underline"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>किसान कॉल सेंटर: १८००-१८०-१५५१</span>
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
