import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CROPS_DATA, SAMPLE_PRESETS } from '../data/mockData';
import { 
  Camera, 
  Mic, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Play, 
  Square, 
  RotateCcw, 
  FileText, 
  ArrowRight,
  ShieldAlert,
  Info
} from 'lucide-react';

export default function ProblemReporting() {
  const { t, lang, addNewCase, setActiveTab } = useApp();

  // Form State
  const [selectedCrop, setSelectedCrop] = useState('cotton');
  const [cropStage, setCropStage] = useState('Boll / Pod Formation');
  const [affectedArea, setAffectedArea] = useState('2.5');
  const [selectedSymptoms, setSelectedSymptoms] = useState(['symBollDamage']);
  const [description, setDescription] = useState('');
  
  // Photo State
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1598512752271-33f913a5af13?w=800&auto=format&fit=crop&q=80');
  const [photoLabel, setPhotoLabel] = useState('Cotton Pink Bollworm Sample');

  // Voice Note State
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [hasVoiceNote, setHasVoiceNote] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Simulated AI preliminary diagnosis card state
  const [aiTriage, setAiTriage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Symptoms options
  const symptomOptions = [
    { id: 'symBollDamage', label: t.symBollDamage },
    { id: 'symYellowing', label: t.symYellowing },
    { id: 'symWhitefly', label: t.symWhitefly },
    { id: 'symWilt', label: t.symWilt },
    { id: 'symLeafCurl', label: t.symLeafCurl },
  ];

  // Voice recording timer effect
  useEffect(() => {
    let interval = null;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Run AI diagnosis simulation automatically or when symptoms/presets change
  const computeAiDiagnosis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      if (selectedCrop === 'cotton' && selectedSymptoms.includes('symBollDamage')) {
        setAiTriage({
          diagnosis: lang === 'mr' ? "गुलाबी बोंडअळी (Pink Bollworm - Pectinophora gossypiella)" :
                     lang === 'hi' ? "गुलाबी सुंडी (Pink Bollworm)" :
                     "Pink Bollworm (Pectinophora gossypiella)",
          confidence: 94,
          urgency: "high",
          firstAid: lang === 'mr' ? "तातडीने एकरी ५ कामगंध सापळे (Pheromone Traps) लावा. प्रादुर्भावग्रस्त रोसेट फुले व किडकी बोंडे तोडून नष्ट करा. अनावश्यक कॉकटेल फवारणी टाळा." :
                    lang === 'hi' ? "तुरंत प्रति एकड़ 5 फेरोमोन ट्रैप लगाएं। प्रभावित फूलों व टिंडों को तोड़कर नष्ट करें।" :
                    "Install 5-8 Gossyplure pheromone traps per acre immediately. Hand-pick and destroy rosetted flowers.",
          safetyWarning: lang === 'mr' ? "आर्थिक नुकसान पातळी (ETL) ओलांडल्यास त्वरित खाली दिलेल्या प्रमाणित औषधांचाच वापर करावा." :
                         lang === 'hi' ? "आर्थिक नुकसान सीमा पार होने पर केवल अनुशंसित कीटनाशक ही छिड़कें।" :
                         "If damage exceeds Economic Threshold Level (ETL > 10%), use approved systemic remedies."
        });
      } else if (selectedCrop === 'soybean' || selectedSymptoms.includes('symYellowing')) {
        setAiTriage({
          diagnosis: lang === 'mr' ? "सोयाबीन पिवळा मोझॅक व्हायरस (Yellow Mosaic Virus)" :
                     lang === 'hi' ? "सोयाबीन पीला मोजेक वायरस (YMV)" :
                     "Soybean Yellow Mosaic Virus (transmitted by Whitefly)",
          confidence: 91,
          urgency: "high",
          firstAid: lang === 'mr' ? "प्रादुर्भावग्रस्त पिवळी रोपे उपटून जमिनीत गाडून टाका. पांढरी माशीच्या नियंत्रणासाठी निंबोळी अर्क १०,००० PPM फवारा." :
                    lang === 'hi' ? "रोगी पौधों को उखाड़कर गाड़ दें तथा सफेद मक्खी रोकने हेतु नीम तेल 10,000 PPM छिड़कें।" :
                    "Rogue out and destroy infected plants. Spray 10,000 PPM Neem formulation to curb whitefly vector.",
          safetyWarning: lang === 'mr' ? "हा रोग विषाणूजन्य असल्याने केवळ पांढरी माशी नियंत्रणच प्रभावी ठरते." :
                         lang === 'hi' ? "यह विषाणु जनित रोग है, केवल वाहक कीट का नियंत्रण करें।" :
                         "Viral infection cannot be cured by fungicides; controlling the insect vector is paramount."
        });
      } else {
        setAiTriage({
          diagnosis: lang === 'mr' ? "कापूस रसशोषक कीड (पांढरी माशी व तुडतुडे)" :
                     lang === 'hi' ? "कपास रस चूसक कीट (सफेद मक्खी)" :
                     "Sucking Pest Infestation (Whitefly & Jassids)",
          confidence: 88,
          urgency: "medium",
          firstAid: lang === 'mr' ? "एकरी १० पिवळे चिकट सापळे लावा. पानांच्या खालच्या बाजूने व्यवस्थित फवारणी करा." :
                    lang === 'hi' ? "प्रति एकड़ 10 पीले चिपचिपे ट्रैप लगाएं। पत्तियों के नीचे छिड़काव करें।" :
                    "Deploy 10 yellow sticky traps per acre. Ensure spraying reaches the underside of foliage.",
          safetyWarning: lang === 'mr' ? "सकाळच्या शांत हवेत फवारणी करावी." :
                         lang === 'hi' ? "सुबह शांत हवा में ही छिड़काव करें।" :
                         "Apply early in the morning when wind drift is minimal."
        });
      }
      setIsAnalyzing(false);
    }, 600);
  };

  useEffect(() => {
    computeAiDiagnosis();
  }, [selectedCrop, selectedSymptoms, lang]);

  // Handle preset selection
  const handleSelectPreset = (preset) => {
    setSelectedCrop(preset.crop);
    setCropStage(preset.stage);
    setSelectedSymptoms(preset.symptoms);
    setDescription(preset.description);
    setPhotoUrl(preset.imageUrl);
    setPhotoLabel(lang === 'mr' ? preset.titleMr : lang === 'hi' ? preset.titleHi : preset.titleEn);
  };

  // Toggle symptom chip
  const toggleSymptom = (symId) => {
    setSelectedSymptoms(prev => 
      prev.includes(symId) 
        ? prev.filter(s => s !== symId) 
        : [...prev, symId]
    );
  };

  // Voice recording toggle
  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordSeconds(0);
      setHasVoiceNote(false);
    } else {
      setIsRecording(false);
      setHasVoiceNote(true);
    }
  };

  // Submit report to agronomist queue
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const cropObj = CROPS_DATA.find(c => c.id === selectedCrop);

    setTimeout(() => {
      addNewCase({
        crop: selectedCrop,
        cropNameEn: cropObj ? cropObj.nameEn : selectedCrop,
        stage: cropStage,
        areaAffected: `${affectedArea} एकर`,
        urgency: aiTriage?.urgency || 'high',
        symptoms: selectedSymptoms,
        description: description || "शेतकऱ्याने पिकावरील रोगाची तक्रार नोंदवली आहे.",
        imageUrl: photoUrl,
        audioDuration: hasVoiceNote ? `0:${recordSeconds < 10 ? '0' : ''}${recordSeconds} sec` : null,
        aiTriage: {
          diagnosis: aiTriage?.diagnosis || "पीक रोग",
          confidence: aiTriage?.confidence || 90,
          firstAid: aiTriage?.firstAid || ""
        }
      });
      setIsSubmitting(false);
      setActiveTab('cases');
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-12">
      
      {/* Page Title */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <span className="p-2 rounded-xl bg-agri-100 text-agri-700">
                <FileText className="w-5 h-5" />
              </span>
              <span>{t.reportTitle}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              फोटो, व्हॉइस किंवा मजकुराद्वारे समस्या नोंदवा - तात्काळ AI विश्लेषण व तज्ज्ञांचे मार्गदर्शन
            </p>
          </div>

          <span className="self-start sm:self-center px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold flex items-center gap-1.5 border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" /> AI Triage Active
          </span>
        </div>
      </div>

      {/* Realistic Sample Presets Bar for Instant One-Click Testing */}
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4">
        <div className="text-xs font-bold text-emerald-900 mb-2 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-emerald-700" />
          <span>{t.orSelectSample}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {SAMPLE_PRESETS.map((preset) => (
            <button
              type="button"
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className="text-left p-2.5 rounded-xl bg-white border border-emerald-200 hover:border-emerald-500 hover:shadow-sm transition-all flex items-center gap-2 text-xs font-semibold text-slate-800"
            >
              <img 
                src={preset.imageUrl} 
                alt="" 
                className="w-9 h-9 rounded-lg object-cover shrink-0 border border-slate-200"
              />
              <span className="line-clamp-2">
                {lang === 'mr' ? preset.titleMr : lang === 'hi' ? preset.titleHi : preset.titleEn}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Reporting Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Step 1: Crop Selection & Stage */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <span className="w-6 h-6 rounded-full bg-agri-600 text-white flex items-center justify-center text-xs font-bold">1</span>
            <span>{t.step1Crop}</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CROPS_DATA.map((crop) => {
              const isSelected = selectedCrop === crop.id;
              return (
                <button
                  type="button"
                  key={crop.id}
                  onClick={() => setSelectedCrop(crop.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    isSelected 
                      ? 'border-agri-600 bg-agri-50 ring-2 ring-agri-600/20' 
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-2xl mb-1">{crop.icon}</span>
                  <div>
                    <div className="font-bold text-sm text-slate-900">
                      {lang === 'mr' ? crop.nameMr : lang === 'hi' ? crop.nameHi : crop.nameEn}
                    </div>
                    <div className="text-[11px] text-slate-500">{crop.nameEn}</div>
                  </div>
                  {isSelected && (
                    <span className="mt-2 text-[10px] font-bold text-agri-700 bg-agri-100 px-2 py-0.5 rounded self-start">
                      निवडले ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.cropStage}
              </label>
              <select
                value={cropStage}
                onChange={(e) => setCropStage(e.target.value)}
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-agri-500 bg-white font-medium"
              >
                <option value="Vegetative / Growth">{t.stageSowing}</option>
                <option value="Flowering Stage">{t.stageFlowering}</option>
                <option value="Boll / Pod Formation">{t.stageBollPod}</option>
                <option value="Maturity / Harvest">{t.stageHarvest}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.affectedArea} (एकर)
              </label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                value={affectedArea}
                onChange={(e) => setAffectedArea(e.target.value)}
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-agri-500"
                placeholder="उदा. २.५ एकर"
              />
            </div>
          </div>
        </div>

        {/* Step 2: Symptoms & Description */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <span className="w-6 h-6 rounded-full bg-agri-600 text-white flex items-center justify-center text-xs font-bold">2</span>
            <span>{t.step2Problem}</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              {t.selectSymptoms}
            </label>
            <div className="flex flex-wrap gap-2">
              {symptomOptions.map(sym => {
                const isSelected = selectedSymptoms.includes(sym.id);
                return (
                  <button
                    type="button"
                    key={sym.id}
                    onClick={() => toggleSymptom(sym.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                      isSelected
                        ? 'bg-rose-50 border-rose-400 text-rose-800 ring-1 ring-rose-300'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}{sym.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t.describeProblem}
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.describePlaceholder}
              className="w-full text-sm p-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-agri-500"
            />
          </div>
        </div>

        {/* Step 3: Photo Upload & Simulated Voice Recorder */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <span className="w-6 h-6 rounded-full bg-agri-600 text-white flex items-center justify-center text-xs font-bold">3</span>
            <span>{t.step3Media}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Photo Section */}
            <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50">
              <label className="block text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-agri-600" />
                <span>{t.photoEvidence}</span>
              </label>

              {photoUrl ? (
                <div className="relative rounded-xl overflow-hidden border border-slate-300 bg-white">
                  <img 
                    src={photoUrl} 
                    alt="Uploaded crop" 
                    className="w-full h-44 object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-xs text-white p-2 text-xs flex items-center justify-between">
                    <span className="truncate">{photoLabel}</span>
                    <button
                      type="button"
                      onClick={() => setPhotoUrl('')}
                      className="text-[11px] underline text-rose-300 hover:text-white"
                    >
                      बदला
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-100 transition-colors cursor-pointer">
                  <Camera className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-600 font-medium">
                    {t.uploadPhoto}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">PNG, JPG कमाल 10MB</p>
                </div>
              )}
            </div>

            {/* Voice Note Simulator */}
            <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50 flex flex-col justify-between">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                  <Mic className="w-4 h-4 text-rose-600" />
                  <span>{t.voiceNoteTitle}</span>
                </label>
                <p className="text-[11px] text-slate-500 mb-3">
                  टाइप करणे कठीण वाटल्यास समस्येचे वर्णन आवाजात रेकॉर्ड करा.
                </p>
              </div>

              {/* Recorder UI Box */}
              <div className="bg-white rounded-xl p-4 border border-slate-200 text-center space-y-3">
                {isRecording ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-1 h-8">
                      <span className="w-1 bg-rose-500 rounded-full animate-wave-1"></span>
                      <span className="w-1 bg-rose-500 rounded-full animate-wave-2"></span>
                      <span className="w-1 bg-rose-500 rounded-full animate-wave-3"></span>
                      <span className="w-1 bg-rose-500 rounded-full animate-wave-4"></span>
                      <span className="w-1 bg-rose-500 rounded-full animate-wave-5"></span>
                    </div>
                    <div className="text-xs font-bold text-rose-600">
                      रेकॉर्डिंग चालू: 0:{recordSeconds < 10 ? '0' : ''}{recordSeconds}
                    </div>
                    <button
                      type="button"
                      onClick={toggleRecording}
                      className="px-4 py-1.5 rounded-full bg-rose-600 text-white text-xs font-bold flex items-center gap-1.5 mx-auto hover:bg-rose-700 transition-colors shadow-sm"
                    >
                      <Square className="w-3.5 h-3.5" />
                      <span>{t.stopRecording}</span>
                    </button>
                  </div>
                ) : hasVoiceNote ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-700">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>व्हॉइस नोट तयार (0:{recordSeconds < 10 ? '0' : ''}{recordSeconds} sec)</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 hover:bg-emerald-700 transition-colors"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>{isPlayingAudio ? "थांबवा" : t.playAudio}</span>
                      </button>
                      <button
                        type="button"
                        onClick={toggleRecording}
                        className="p-1.5 rounded-lg border border-slate-300 text-slate-600 text-xs hover:bg-slate-100"
                        title="पुन्हा रेकॉर्ड करा"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={toggleRecording}
                    className="w-full py-3 rounded-xl border border-dashed border-rose-300 bg-rose-50/50 hover:bg-rose-50 text-rose-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping"></div>
                    <Mic className="w-4 h-4 text-rose-600" />
                    <span>{t.startRecording} (Tap to Speak)</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Step 4: Simulated AI Preliminary Diagnosis Card (Clean Green & White) */}
        {aiTriage && (
          <div className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-green-300 shadow-xs space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-green-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-green-100 text-green-800">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </span>
                <h4 className="font-bold text-base text-slate-900">
                  {t.aiDiagnosisTitle}
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">{t.aiConfidence}:</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-green-100 text-green-800 border border-green-200">
                  {aiTriage.confidence}% खात्री
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-7 space-y-2">
                <div className="text-xs uppercase tracking-wider text-green-800 font-bold">
                  {t.possibleIssue}:
                </div>
                <div className="text-lg font-bold text-slate-900">
                  {aiTriage.diagnosis}
                </div>
                
                <div className="bg-green-50/70 rounded-xl p-3 text-xs space-y-1 border border-green-200">
                  <div className="font-bold text-green-900 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                    <span>{t.immediateAction}:</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {aiTriage.firstAid}
                  </p>
                </div>
              </div>

              <div className="md:col-span-5 bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 space-y-1.5">
                <div className="font-bold flex items-center gap-1.5 text-amber-800">
                  <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600" />
                  <span>तज्ज्ञ पडताळणी आवश्यक</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {t.urgentWarning}
                </p>
              </div>
            </div>

          </div>
        )}

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs transition-all"
          >
            {isSubmitting ? (
              <span>{t.submitting}</span>
            ) : (
              <>
                <span>{t.submitToExpert}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
}
