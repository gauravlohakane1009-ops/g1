import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileCheck, 
  Send, 
  Printer, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Camera, 
  Mic, 
  ShieldCheck, 
  AlertTriangle,
  ArrowRight,
  Scale,
  MapPin,
  Stethoscope
} from 'lucide-react';

export default function ConsultationThread() {
  const { 
    t, 
    lang, 
    cases, 
    selectedCaseId, 
    setSelectedCaseId, 
    addCaseMessage, 
    role, 
    consultantProfile, 
    farmerProfile,
    setSelectedProductId,
    setActiveTab,
    showToast
  } = useApp();

  const [followupText, setFollowupText] = useState('');
  const currentCase = cases.find(c => c.id === selectedCaseId) || cases[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!followupText.trim() || !currentCase) return;

    addCaseMessage(currentCase.id, followupText.trim());
    setFollowupText('');
    showToast("संदेश पाठवला!", "success");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCompareMedicine = () => {
    setSelectedProductId('prod-01');
    setActiveTab('prices');
  };

  if (!currentCase) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center text-slate-500 border border-slate-200">
        कोणतेही प्रकरण उपलब्ध नाही.
      </div>
    );
  }

  const isResolved = currentCase.status === 'resolved';

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 md:pb-12">
      
      {/* Case Selector Tabs */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex items-center justify-between overflow-x-auto no-scrollbar gap-2">
        <div className="flex items-center gap-2">
          {cases.map((c) => {
            const isSelected = c.id === currentCase.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCaseId(c.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  isSelected 
                    ? 'bg-green-700 text-white border-green-700 shadow-xs' 
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{c.cropNameEn} #{c.id}</span>
                {c.status === 'resolved' && (
                  <span className="ml-1.5 text-[10px] bg-emerald-400 text-slate-950 px-1 py-0.2 rounded font-bold">
                    Rx ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setActiveTab('report')}
          className="px-3 py-1.5 rounded-xl text-xs font-bold text-green-700 bg-green-50 border border-green-200 hover:bg-green-100 whitespace-nowrap"
        >
          + नवीन समस्या नोंदवा
        </button>
      </div>

      {/* Case Header Details Banner */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-agri-800 bg-agri-100 px-2.5 py-0.5 rounded border border-agri-300">
                {t.caseId}: #{currentCase.id}
              </span>
              <span className="text-xs text-slate-500">
                {t.reportedOn}: {currentCase.reportedAt}
              </span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              {currentCase.cropNameEn} - {currentCase.stage}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-2 mt-0.5">
              <span>बाधित क्षेत्र: <strong>{currentCase.areaAffected}</strong></span>
              <span>•</span>
              <span>शेतकरी: {currentCase.farmerName} ({currentCase.village})</span>
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            {isResolved ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-sm">
                <CheckCircle2 className="w-4 h-4" /> {t.statusResolved}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                <Clock className="w-4 h-4" /> {t.statusReview}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Official Agronomist Prescription Card (Rx Slip) */}
      {currentCase.prescription && (
        <div className="bg-gradient-to-br from-emerald-50 via-white to-agri-50 rounded-2xl p-5 sm:p-6 border-2 border-emerald-500 shadow-md relative overflow-hidden print:border-black">
          
          {/* Rx Watermark & Print controls */}
          <div className="flex items-start justify-between border-b border-emerald-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
                ℞
              </div>
              <div>
                <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                  अधिकृत कृषी सल्ला व डिजिटल पर्चा (Official Digital Rx)
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {currentCase.prescription.consultantName}
                </h3>
                <p className="text-xs text-slate-500">
                  {currentCase.prescription.institution} • Rx ID: {currentCase.prescription.rxId}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg border border-emerald-300 bg-white text-emerald-800 text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-50 transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.downloadRx}</span>
            </button>
          </div>

          {/* Rx Prescription Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 text-xs">
            
            <div className="space-y-3 bg-white/80 p-4 rounded-xl border border-emerald-200">
              <div>
                <span className="font-semibold text-slate-500 block mb-0.5">
                  तज्ज्ञांचे अंतिम निदान (Official Diagnosis):
                </span>
                <span className="font-bold text-slate-900 text-sm">
                  {currentCase.prescription.officialDiagnosis}
                </span>
              </div>

              <div>
                <span className="font-semibold text-slate-500 block mb-0.5">
                  {t.recommendedMedicine}:
                </span>
                <span className="font-bold text-emerald-800 text-sm bg-emerald-100/70 px-2 py-0.5 rounded border border-emerald-300 inline-block">
                  {currentCase.prescription.recommendedProduct}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <span className="font-semibold text-slate-500 block">{t.dosagePerPump}:</span>
                  <span className="font-bold text-slate-900">{currentCase.prescription.dosagePer15L}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-500 block">{t.safetyPeriod}:</span>
                  <span className="font-bold text-rose-700">{currentCase.prescription.safetyPeriodDays} दिवस (Days)</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 bg-white/80 p-4 rounded-xl border border-emerald-200 flex flex-col justify-between">
              <div>
                <span className="font-semibold text-slate-500 block mb-0.5">{t.applicationTime}:</span>
                <p className="text-slate-800 leading-relaxed font-medium">
                  {currentCase.prescription.sprayMethod}
                </p>
              </div>

              <div>
                <span className="font-semibold text-slate-500 block mb-0.5">सेंद्रिय उपाय व खबरदारी:</span>
                <p className="text-slate-700 leading-relaxed">
                  {currentCase.prescription.notes}
                </p>
              </div>

              <div className="pt-2 border-t border-emerald-100 flex items-center justify-between">
                <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> शासकीय CIB मार्गदर्शक तत्त्वांनुसार
                </span>
                <button
                  type="button"
                  onClick={handleCompareMedicine}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-colors"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>या औषधाचे भाव तपासा</span>
                </button>
              </div>
            </div>

          </div>

          <div className="text-[11px] text-slate-400 text-right">
            प्रिस्क्रिप्शन जारी तारीख: {currentCase.prescription.prescribedAt}
          </div>

        </div>
      )}

      {/* AI Preliminary Triage Card (Clean Green & White Context View) */}
      {currentCase.aiTriage && (
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-green-200 shadow-xs text-xs space-y-1">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-green-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>AI प्राथमिक विश्लेषण संदर्भ (AI Context):</span>
            </span>
            <span className="text-[10px] font-bold text-green-800 bg-green-50 px-2 py-0.5 rounded border border-green-200">
              {currentCase.aiTriage.confidence}% Confidence
            </span>
          </div>
          <div className="text-sm font-bold text-slate-900">
            {currentCase.aiTriage.diagnosis}
          </div>
          <p className="text-slate-600 leading-relaxed">
            तात्काळ प्रथमोपचार: {currentCase.aiTriage.firstAid}
          </p>
        </div>
      )}

      {/* Consultation Chat Thread */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-700 uppercase tracking-wider flex items-center gap-2">
          <span>चर्चा व प्रश्नोत्तरे (Consultation Conversation)</span>
        </div>

        <div className="p-4 sm:p-6 space-y-4 max-h-[500px] overflow-y-auto">
          {currentCase.thread?.map((msg, index) => {
            const isFarmer = msg.sender === 'farmer';
            const isDoctor = msg.sender === 'consultant';
            const isSystem = msg.sender === 'system';

            if (isSystem) {
              return (
                <div key={index} className="flex justify-center my-2">
                  <div className="bg-slate-100 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-agri-600" />
                    <span>{msg.message}</span>
                  </div>
                </div>
              );
            }

            return (
              <div 
                key={index} 
                className={`flex gap-3 ${isFarmer ? 'justify-end' : 'justify-start'}`}
              >
                {!isFarmer && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 border border-blue-200">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                )}

                <div 
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs space-y-1 ${
                    isFarmer 
                      ? 'bg-agri-600 text-white rounded-tr-none shadow-sm' 
                      : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
                  }`}
                >
                  <div className={`font-bold flex items-center justify-between gap-3 text-[11px] ${isFarmer ? 'text-agri-100' : 'text-slate-500'}`}>
                    <span>{msg.senderName}</span>
                    <span className="text-[10px] opacity-80">{msg.time}</span>
                  </div>

                  <p className="leading-relaxed whitespace-pre-line text-xs sm:text-sm">
                    {msg.message}
                  </p>

                  {/* Attachment indicators */}
                  {msg.hasVoice && (
                    <div className={`mt-2 p-2 rounded-lg flex items-center gap-2 font-semibold text-[11px] ${
                      isFarmer ? 'bg-white/15 text-white' : 'bg-white text-slate-800 border border-slate-200'
                    }`}>
                      <Mic className="w-3.5 h-3.5 text-rose-400" />
                      <span>व्हॉइस मेसेज समाविष्ट (Voice attached)</span>
                    </div>
                  )}

                  {msg.hasRx && (
                    <div className="mt-2 p-2 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-300 font-bold text-[11px] flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4 text-emerald-700" />
                      <span>अधिकृत डिजिटल प्रिस्क्रिप्शन जारी केले आहे. वर पहा.</span>
                    </div>
                  )}
                </div>

                {isFarmer && (
                  <div className="w-8 h-8 rounded-full bg-agri-100 text-agri-800 flex items-center justify-center font-bold text-xs shrink-0 border border-agri-200">
                    🌾
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Reply Box */}
        <form onSubmit={handleSendMessage} className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex gap-2">
          <input
            type="text"
            value={followupText}
            onChange={(e) => setFollowupText(e.target.value)}
            placeholder={role === 'consultant' ? "शेतकऱ्याला सूचना किंवा उत्तर लिहा..." : "तज्ज्ञांना शंका किंवा पूरक प्रश्न विचारा..."}
            className="flex-1 text-xs sm:text-sm px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-agri-500 bg-white"
          />
          <button
            type="submit"
            className="px-5 py-3 rounded-xl bg-agri-600 hover:bg-agri-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-colors shrink-0"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">{t.sendQuestion}</span>
          </button>
        </form>

      </div>

    </div>
  );
}
