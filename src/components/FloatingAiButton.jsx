import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, MessageSquare } from 'lucide-react';

export default function FloatingAiButton() {
  const { isAiModalOpen, setIsAiModalOpen, t, currentUser } = useApp();

  // If user is not logged in or modal is already open, hide floating trigger
  if (!currentUser || isAiModalOpen) return null;

  return (
    <button
      type="button"
      onClick={() => setIsAiModalOpen(true)}
      className="fixed bottom-20 md:bottom-6 right-6 z-40 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2.5 border-2 border-white/40 group"
      title={t.askAi}
    >
      <div className="relative">
        <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400"></span>
      </div>
      <span className="font-bold text-xs sm:text-sm tracking-wide">
        {t.askAi}
      </span>
    </button>
  );
}
