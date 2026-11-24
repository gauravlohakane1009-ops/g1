import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Stethoscope, 
  Filter, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Camera, 
  Mic, 
  Send, 
  FileCheck, 
  MapPin, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function ConsultantQueue() {
  const { 
    t, 
    lang, 
    cases, 
    consultantProfile, 
    selectedCaseId, 
    setSelectedCaseId, 
    issuePrescription, 
    products, 
    setActiveTab 
  } = useApp();

  // Filters
  const [filterCrop, setFilterCrop] = useState('all');
  const [filterUrgency, setFilterUrgency] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Currently opened case in queue
  const currentCase = cases.find(c => c.id === selectedCaseId) || cases[0];

  // Prescription Form State
  const [selectedProduct, setSelectedProduct] = useState(products[0]?.tradeNameEn || '');
  const [dosage, setDosage] = useState('30-35 ml प्रति १५ लिटर पंप');
  const [sprayMethod, setSprayMethod] = useState('सकाळी ८ ते ११ दरम्यान पूर्ण झाड भिजेल अशी फवारणी करावी.');
  const [safetyPeriod, setSafetyPeriod] = useState(14);
  const [expertRemarks, setExpertRemarks] = useState('प्रादुर्भाव रोखण्यासाठी सोबत ५ कामगंध सापळे तातडीने लावा. फवारणी करताना तोंडाला मास्क वापरावा.');

  // Filter cases
  const filteredCases = cases.filter(c => {
    if (filterCrop !== 'all' && c.crop !== filterCrop) return false;
    if (filterUrgency !== 'all' && c.urgency !== filterUrgency) return false;
    if (filterStatus === 'pending' && c.status === 'resolved') return false;
    if (filterStatus === 'resolved' && c.status !== 'resolved') return false;
    return true;
  });

  const handleProductChange = (prodName) => {
    setSelectedProduct(prodName);
    const prodObj = products.find(p => p.tradeNameEn === prodName || p.tradeNameMr === prodName);
    if (prodObj) {
      setDosage(prodObj.standardDosage);
    }
  };

  const handleDispatch = (e) => {
    e.preventDefault();
    if (!currentCase) return;

    issuePrescription(currentCase.id, {
      officialDiagnosis: currentCase.aiTriage?.diagnosis || "पीक कीड व रोग प्रादुर्भाव",
      recommendedProduct: selectedProduct,
      dosagePer15L: dosage,
      sprayMethod: sprayMethod,
      safetyPeriodDays: parseInt(safetyPeriod) || 14,
      notes: expertRemarks
    });
  };

  return (
    <div className="space-y-6 pb-20 md:pb-12 font-sans">
      
      {/* Clean White & Green Consultant Profile Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-green-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img 
              src={consultantProfile.avatar} 
              alt="Consultant"
              className="w-14 h-14 rounded-2xl object-cover border-2 border-green-500 shadow-xs"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-green-800 bg-green-50 px-2.5 py-0.5 rounded-full border border-green-200">
                  {t.roleConsultant}
                </span>
                <span className="text-xs text-slate-400">Reg: {consultantProfile.registrationNo}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mt-1 text-slate-900">
                {consultantProfile.name}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {consultantProfile.degree} • {consultantProfile.institution}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-green-50 px-4 py-2.5 rounded-2xl border border-green-200 self-start sm:self-center text-xs">
            <div>
              <div className="text-slate-500">सोडवलेले सल्ले</div>
              <div className="font-extrabold text-base text-green-800">{consultantProfile.casesResolved}+</div>
            </div>
            <div className="border-l border-green-200 pl-4">
              <div className="text-slate-500">रेटिंग</div>
              <div className="font-extrabold text-base text-amber-600">★ {consultantProfile.rating} / 5</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl p-3.5 shadow-xs border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-slate-700 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-green-600" /> {t.filterByCrop}:
          </span>

          <select
            value={filterCrop}
            onChange={(e) => setFilterCrop(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-medium"
          >
            <option value="all">{t.allCrops}</option>
            <option value="cotton">{t.cotton}</option>
            <option value="soybean">{t.soybean}</option>
          </select>

          <select
            value={filterUrgency}
            onChange={(e) => setFilterUrgency(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-medium"
          >
            <option value="all">{t.allUrgency}</option>
            <option value="high">{t.highUrgency}</option>
            <option value="medium">{t.mediumUrgency}</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-medium"
          >
            <option value="all">सर्व स्थिती (All Status)</option>
            <option value="pending">प्रलंबित (Pending)</option>
            <option value="resolved">पूर्ण (Prescribed)</option>
          </select>
        </div>

        <div className="text-slate-500 font-medium">
          दाखवत आहे: <strong className="text-slate-900">{filteredCases.length}</strong> प्रकरणे
        </div>
      </div>

      {/* Queue Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Cases Queue List */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-sm font-bold text-slate-900">
            {t.pendingCases}
          </h3>

          <div className="space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
            {filteredCases.map((c) => {
              const isSelected = currentCase?.id === c.id;
              const isResolved = c.status === 'resolved';

              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCaseId(c.id)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-green-600 bg-green-50/70 shadow-xs ring-1 ring-green-600' 
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">
                        {c.cropNameEn}
                      </span>
                      <span className="text-xs text-slate-400">#{c.id}</span>
                    </div>

                    {isResolved ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-green-600" /> पूर्ण
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-amber-600" /> तपासा
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-slate-700 font-medium mt-1 line-clamp-1">
                    {c.aiTriage?.diagnosis || c.description}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-100">
                    <span>👤 {c.farmerName?.split(' ')[0]} ({c.village?.split(',')[0]})</span>
                    <span>{c.reportedAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Case Inspection & Prescription Form */}
        <div className="lg:col-span-7 space-y-5">
          {currentCase ? (
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-slate-200 space-y-5">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-green-800 bg-green-50 px-2.5 py-0.5 rounded">
                      केस #{currentCase.id}
                    </span>
                    <span className="text-xs text-slate-400">{currentCase.reportedAt}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    {currentCase.cropNameEn} - {currentCase.stage}
                  </h3>
                  <p className="text-xs text-slate-600 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{currentCase.farmerName} • {currentCase.village} • क्षेत्र: <strong>{currentCase.areaAffected}</strong></span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('cases')}
                  className="text-xs font-bold text-green-700 hover:underline flex items-center gap-1 self-start sm:self-center"
                >
                  <span>थ्रेड पहा</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Photo & Farmer description */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5 text-green-600" /> शेतातील फोटो
                  </div>
                  <img 
                    src={currentCase.imageUrl} 
                    alt="Pest condition"
                    className="w-full h-44 object-cover rounded-xl border border-slate-200"
                  />
                </div>

                <div className="space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-700 mb-1">शेतकऱ्याने दिलेले वर्णन:</div>
                    <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                      "{currentCase.description}"
                    </p>
                  </div>

                  {/* AI Triage Card preview */}
                  {currentCase.aiTriage && (
                    <div className="bg-green-50/70 border border-green-200 rounded-xl p-3 text-xs space-y-1">
                      <div className="font-bold text-green-900 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>AI प्राथमिक अंदाज ({currentCase.aiTriage.confidence}% खात्री):</span>
                      </div>
                      <div className="font-semibold text-slate-800">
                        {currentCase.aiTriage.diagnosis}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Official Agronomist Prescription Builder */}
              <div className="border-t border-slate-200 pt-4">
                <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-green-600" />
                  <span>{t.writePrescription} (Dr. Ramesh Patil Rx)</span>
                </h4>

                <form onSubmit={handleDispatch} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.selectProduct} (CIB Approved)
                    </label>
                    <select
                      value={selectedProduct}
                      onChange={(e) => handleProductChange(e.target.value)}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-600 bg-white font-medium"
                    >
                      {products.map(p => (
                        <option key={p.id} value={p.tradeNameEn}>
                          {lang === 'mr' ? p.tradeNameMr : p.tradeNameEn} ({p.categoryLabel})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {t.dosagePerPump}
                      </label>
                      <input
                        type="text"
                        required
                        value={dosage}
                        onChange={(e) => setDosage(e.target.value)}
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-600 font-medium"
                        placeholder="उदा. ३० मिली / १५ लिटर पंप"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {t.safetyPeriod} (दिवस)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="60"
                        value={safetyPeriod}
                        onChange={(e) => setSafetyPeriod(e.target.value)}
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                        placeholder="उदा. १४ दिवस"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.applicationTime}
                    </label>
                    <input
                      type="text"
                      value={sprayMethod}
                      onChange={(e) => setSprayMethod(e.target.value)}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.expertNotes} (सेंद्रिय उपाय / खबरदारी)
                    </label>
                    <textarea
                      rows={2}
                      value={expertRemarks}
                      onChange={(e) => setExpertRemarks(e.target.value)}
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      <span>{t.dispatchPrescription}</span>
                    </button>
                  </div>
                </form>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center text-slate-400 border border-slate-200">
              कतारमधून कोणतीही केस निवडा.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
