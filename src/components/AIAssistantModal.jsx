import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Send, 
  Mic, 
  Camera, 
  X, 
  ArrowRight, 
  UserCheck, 
  ShieldAlert, 
  CheckCircle2, 
  Image as ImageIcon,
  Scale,
  RefreshCw
} from 'lucide-react';
import { SAMPLE_PRESETS } from '../data/mockData';

export default function AIAssistantModal({ isFullscreen = false, onClose }) {
  const { 
    lang, 
    t, 
    aiChatMessages, 
    sendAiMessage, 
    escalateAiToConsultant,
    setSelectedProductId,
    setActiveTab,
    isAiModalOpen,
    setIsAiModalOpen
  } = useApp();

  const [inputPrompt, setInputPrompt] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [showPhotoPicker, setShowPhotoPicker] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiChatMessages]);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputPrompt.trim() && !selectedPhoto) return;

    sendAiMessage(inputPrompt.trim(), selectedPhoto);
    setInputPrompt('');
    setSelectedPhoto(null);
    setShowPhotoPicker(false);
  };

  // Voice Input (Web Speech API or simulated speech recognition)
  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = lang === 'mr' ? 'mr-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
        recognition.interimResults = false;
        
        setIsListening(true);

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInputPrompt(transcript);
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
          // Fallback simulation
          simulateVoice();
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
      } catch (err) {
        simulateVoice();
      }
    } else {
      simulateVoice();
    }
  };

  const simulateVoice = () => {
    setIsListening(true);
    setTimeout(() => {
      const mockQuestions = {
        mr: "कापूस बोंडअळी नियंत्रणासाठी काय फवारावे आणि सापळे कसे लावावेत?",
        hi: "कपास में गुलाबी सुंडी नियंत्रण के लिए क्या छिड़कें और फेरोमोन ट्रैप कैसे लगाएं?",
        en: "What should I spray for pink bollworm in cotton and how to install pheromone traps?"
      };
      setInputPrompt(mockQuestions[lang] || mockQuestions.en);
      setIsListening(false);
    }, 1200);
  };

  const handlePresetQuestion = (text) => {
    setInputPrompt(text);
    sendAiMessage(text, null);
  };

  const handleSelectSamplePhoto = (sampleUrl, title) => {
    setSelectedPhoto(sampleUrl);
    setShowPhotoPicker(false);
    if (!inputPrompt) {
      setInputPrompt(title);
    }
  };

  return (
    <div className={`flex flex-col bg-white overflow-hidden ${
      isFullscreen 
        ? 'h-[calc(100vh-140px)] rounded-2xl border border-green-200 shadow-sm' 
        : 'fixed inset-4 sm:inset-auto sm:right-6 sm:bottom-20 sm:w-[480px] sm:h-[620px] rounded-3xl border border-green-200 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150'
    }`}>
      
      {/* Modal / Card Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-800 text-white p-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-amber-300">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white leading-tight">
              {t.aiAssistantTitle}
            </h3>
            <p className="text-[11px] text-green-100">
              {t.aiAssistantSubtitle}
            </p>
          </div>
        </div>

        {!isFullscreen && (
          <button
            type="button"
            onClick={() => {
              setIsAiModalOpen(false);
              if (onClose) onClose();
            }}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Quick Prompts Bar */}
      <div className="bg-green-50/70 border-b border-green-100 px-3 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 text-xs">
        <span className="text-[11px] font-bold text-green-900 shrink-0">
          प्रश्न:
        </span>
        {[
          { text: t.promptBollworm },
          { text: t.promptYmv },
          { text: t.promptFertilizer },
          { text: t.promptWhitefly }
        ].map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handlePresetQuestion(p.text)}
            className="px-2.5 py-1 bg-white hover:bg-green-100 text-green-800 border border-green-200 rounded-full font-medium whitespace-nowrap text-[11px] transition-colors"
          >
            {p.text}
          </button>
        ))}
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
        {aiChatMessages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-end gap-2 max-w-[90%] sm:max-w-[85%]">
                {!isUser && (
                  <div className="w-7 h-7 rounded-lg bg-green-600 text-white flex items-center justify-center shrink-0 mb-1">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}

                <div className={`rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-green-600 text-white rounded-br-none shadow-sm font-medium'
                    : 'bg-white text-slate-800 rounded-bl-none border border-slate-200 shadow-xs'
                }`}>
                  {msg.image && (
                    <img 
                      src={msg.image} 
                      alt="Crop condition"
                      className="w-full max-h-48 object-cover rounded-xl mb-2 border border-slate-200" 
                    />
                  )}

                  <div className="whitespace-pre-line">
                    {msg.text}
                  </div>

                  {/* Product Suggestion Card inside AI Chat */}
                  {msg.productSuggestion && (
                    <div className="mt-3 p-2.5 bg-green-50 rounded-xl border border-green-200 text-xs text-slate-800 space-y-1">
                      <div className="font-bold text-green-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                        <span>शिफारस केलेले औषध: {msg.productSuggestion.tradeNameMr || msg.productSuggestion.tradeNameEn}</span>
                      </div>
                      <div className="text-[11px] text-slate-600">
                        डोस: {msg.productSuggestion.standardDosage}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedProductId(msg.productSuggestion.id);
                          setActiveTab('prices');
                          setIsAiModalOpen(false);
                        }}
                        className="text-[11px] font-bold text-green-700 hover:underline flex items-center gap-1 pt-1"
                      >
                        <Scale className="w-3 h-3" />
                        <span>दुकानदारांचे भाव तपासा (Compare Prices) →</span>
                      </button>
                    </div>
                  )}

                  {/* One-Click Escalate to Human Agronomist */}
                  {msg.canEscalate && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                      <span className="text-[10px] text-slate-400">
                        अचूक प्रयोगशाळा निदानासाठी:
                      </span>
                      <button
                        type="button"
                        onClick={() => escalateAiToConsultant(msg)}
                        className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-lg flex items-center gap-1 transition-colors shadow-sm"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>{t.escalateToConsultant}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <span className="text-[10px] text-slate-400 mt-1 px-1">
                {msg.time}
              </span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Photo Picker Drawer (if open) */}
      {showPhotoPicker && (
        <div className="bg-white border-t border-green-200 p-3 space-y-2 shrink-0 animate-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>नमुना शेती फोटो निवडा (Select Sample Photo):</span>
            <button 
              type="button" 
              onClick={() => setShowPhotoPicker(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {SAMPLE_PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSelectSamplePhoto(p.imageUrl, p.titleMr || p.titleEn)}
                className="text-left p-1.5 rounded-lg border border-slate-200 hover:border-green-600 transition-colors flex flex-col gap-1 text-[11px]"
              >
                <img src={p.imageUrl} alt="" className="w-full h-12 object-cover rounded" />
                <span className="font-semibold text-slate-800 line-clamp-1">
                  {p.titleMr || p.titleEn}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected Photo Chip Preview */}
      {selectedPhoto && (
        <div className="bg-green-50 px-3 py-1.5 border-t border-green-200 flex items-center justify-between text-xs text-green-900 shrink-0">
          <div className="flex items-center gap-2">
            <img src={selectedPhoto} alt="" className="w-6 h-6 object-cover rounded" />
            <span className="font-semibold text-[11px]">फोटो जोडला आहे (Photo Attached)</span>
          </div>
          <button 
            type="button" 
            onClick={() => setSelectedPhoto(null)}
            className="text-rose-600 font-bold hover:underline"
          >
            काढून टाका
          </button>
        </div>
      )}

      {/* Input Box & Action Controls */}
      <div className="p-3 bg-white border-t border-slate-200 shrink-0 space-y-2">
        <form onSubmit={handleSend} className="flex items-center gap-1.5">
          
          {/* Photo upload trigger */}
          <button
            type="button"
            onClick={() => setShowPhotoPicker(!showPhotoPicker)}
            className="p-2.5 rounded-xl border border-slate-200 hover:border-green-400 text-slate-600 hover:text-green-700 hover:bg-green-50 transition-colors"
            title={t.attachCropPhoto}
          >
            <Camera className="w-4 h-4" />
          </button>

          {/* Voice Input Mic trigger */}
          <button
            type="button"
            onClick={handleVoiceInput}
            className={`p-2.5 rounded-xl border transition-colors ${
              isListening
                ? 'bg-rose-500 text-white border-rose-500 animate-pulse'
                : 'border-slate-200 hover:border-green-400 text-slate-600 hover:text-green-700 hover:bg-green-50'
            }`}
            title={t.voicePromptHelp}
          >
            <Mic className="w-4 h-4" />
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder={isListening ? t.voiceListening : t.askAiPlaceholder}
            className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-600"
          />

          {/* Send Button */}
          <button
            type="submit"
            className="p-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors shadow-sm disabled:opacity-50"
            disabled={!inputPrompt.trim() && !selectedPhoto}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Disclaimer */}
        <p className="text-[10px] text-slate-400 text-center leading-tight">
          {t.aiDisclaimer}
        </p>
      </div>

    </div>
  );
}
