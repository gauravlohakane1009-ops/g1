import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  AlertCircle, 
  Scale, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  ChevronRight,
  TrendingUp,
  Camera,
  Mic,
  PhoneCall
} from 'lucide-react';

export default function FarmerDashboard() {
  const { 
    t, 
    lang, 
    farmerProfile, 
    setActiveTab, 
    cases, 
    setSelectedCaseId, 
    setIsAiModalOpen,
    products, 
    setSelectedProductId,
    mandiRates
  } = useApp();

  const activeCases = cases.slice(0, 3);

  return (
    <div className="space-y-6 pb-20 md:pb-10 font-sans">
      
      {/* Clean Greeting Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-green-100 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img 
              src={farmerProfile.avatar} 
              alt="Farmer Profile"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-green-500 shadow-xs"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-green-800 bg-green-50 px-2.5 py-0.5 rounded-full border border-green-200">
                  {t.roleFarmer}
                </span>
                <span className="text-xs text-slate-400">
                  📍 {farmerProfile.village}, {farmerProfile.district}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                {t.greeting}{farmerProfile.name?.split('(')[0]}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                एकूण शेतजमीन: <strong>{farmerProfile.landSize} एकर</strong> • मुख्य पीक: <strong>कापूस व सोयाबीन</strong>
              </p>
            </div>
          </div>

          {/* Quick Mandi Glance Chip */}
          <div className="flex items-center gap-2 bg-green-50/80 px-3.5 py-2 rounded-xl border border-green-200 self-start sm:self-center text-xs">
            <span className="font-bold text-green-900">कापूस भाव:</span>
            <span className="font-extrabold text-green-700">₹७,४८० / क्विंटल</span>
            <span className="text-[10px] text-green-600 font-bold bg-white px-1.5 py-0.5 rounded border border-green-200">+₹१२०</span>
          </div>
        </div>
      </div>

      {/* Main Services Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-slate-400">
          {t.quickActions}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Card 1: Interactive AI Crop Assistant */}
          <div 
            onClick={() => setActiveTab('ai')}
            className="group cursor-pointer bg-white rounded-2xl p-5 border-2 border-green-200 hover:border-green-600 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Sparkles className="w-6 h-6 text-amber-500" />
                </div>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-200">
                  तात्काळ सल्ला
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900 group-hover:text-green-700 transition-colors">
                {t.aiAssistantTitle}
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                बोंडअळी, पिवळा मोझॅक किंवा खतांबद्दल प्रश्न विचारा, आवाज रेकॉर्ड करा किंवा फोटो तपासा.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-green-700">
              <span className="flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5" /> आवाज व फोटो
              </span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                सुरू करा <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 2: Report Problem to Doctor */}
          <div 
            onClick={() => setActiveTab('report')}
            className="group cursor-pointer bg-white rounded-2xl p-5 border border-slate-200 hover:border-green-600 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-green-50 text-green-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <AlertCircle className="w-6 h-6 text-green-700" />
                </div>
                <span className="text-[10px] font-bold bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                  PDKV तज्ज्ञ
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900 group-hover:text-green-700 transition-colors">
                {t.reportIssueNow}
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {t.reportIssueDesc}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-green-700">
              <span>तक्रार नोंदवा</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                नोंदवा <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 3: Price Matrix & Comparison */}
          <div 
            onClick={() => setActiveTab('prices')}
            className="group cursor-pointer bg-white rounded-2xl p-5 border border-slate-200 hover:border-green-600 hover:shadow-md transition-all sm:col-span-2 lg:col-span-1 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-green-50 text-green-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Scale className="w-6 h-6 text-green-700" />
                </div>
                <span className="text-[10px] font-bold bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                  २०% पर्यंत बचत
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900 group-hover:text-green-700 transition-colors">
                {t.comparePricesQuick}
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                स्थानिक कृषी केंद्र, सहकारी संस्था व ऑनलाइन मंचावरील औषध भावांची थेट तुलना करा.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-green-700">
              <span>स्थानिक दर तपासा</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                तुलना करा <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Active Consultations & Prescriptions */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {t.activeConsultations}
            </h3>
            <p className="text-xs text-slate-500">
              कृषी तज्ज्ञांकडील चालू प्रकरणे व अधिकृत डिजिटल प्रिस्क्रिप्शन
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('cases')}
            className="text-xs font-bold text-green-700 hover:underline flex items-center gap-1"
          >
            <span>{t.viewAllCases}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {activeCases.map((item) => {
            const isResolved = item.status === 'resolved';

            return (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedCaseId(item.id);
                  setActiveTab('cases');
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  isResolved 
                    ? 'bg-green-50/50 border-green-200 hover:border-green-400' 
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.imageUrl}
                    alt={item.crop}
                    className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">
                        {item.cropNameEn}
                      </span>
                      <span className="text-xs text-slate-400">#{item.id}</span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium mt-0.5 line-clamp-1">
                      {item.prescription?.officialDiagnosis || item.aiTriage?.diagnosis || item.description}
                    </p>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {item.reportedAt} • बाधित क्षेत्र: {item.areaAffected}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  {isResolved ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-green-600 text-white shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" /> प्रिस्क्रिप्शन तयार ✓
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                      <Clock className="w-3.5 h-3.5" /> तज्ज्ञ तपासत आहेत
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
