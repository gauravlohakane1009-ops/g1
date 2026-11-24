import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart3, 
  Users, 
  Clock, 
  AlertTriangle, 
  Send, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Megaphone,
  TrendingUp
} from 'lucide-react';

export default function AdminDashboard() {
  const { t, lang, cases, regionalAlerts, showToast } = useApp();

  const [broadcastMessage, setBroadcastMessage] = useState(
    'हवामान इशारा: पुढील २४ ते ४८ तासांत अमरावती व यवतमाळ पट्ट्यात हलक्या पावसाचा अंदाज आहे. शेतकऱ्यांनी कोणत्याही रासायनिक औषधांची फवारणी तात्पुरती पुढे ढकलावी.'
  );
  const [isSending, setIsSending] = useState(false);
  const [broadcastSent, setBroadcastSent] = useState(false);

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setBroadcastSent(true);
      showToast(t.broadcastSuccess, "success");
      setTimeout(() => setBroadcastSent(false), 5000);
    }, 800);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-12 font-sans">
      
      {/* Admin Title Header (Clean Green & White) */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-green-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center">
              <BarChart3 className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-green-800 bg-green-50 px-2.5 py-0.5 rounded-full border border-green-200">
                {t.roleAdmin} • विभागीय नियंत्रण कक्ष
              </span>
              <h2 className="text-xl sm:text-2xl font-bold mt-1 text-slate-900">
                {t.adminDashboardTitle}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                विदर्भ व मध्य भारत पीक संरक्षण आणि कृषी इनपुट भाव देखरेख
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-600"></span>
            </span>
            <span className="text-xs font-bold text-green-800 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
              Live Monitoring Active
            </span>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase">{t.totalFarmers}</span>
            <Users className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            ६,४५०
          </div>
          <span className="text-[11px] font-semibold text-green-600 flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> +२४० या आठवड्यात
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase">{t.totalCases}</span>
            <BarChart3 className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            १,८४२
          </div>
          <span className="text-[11px] font-semibold text-slate-500 mt-1 block">
            {cases.filter(c => c.status === 'resolved').length} सोडवलेले सल्ले
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase">सरासरी प्रतिसाद वेळ</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            २८ मिनिटे
          </div>
          <span className="text-[11px] font-semibold text-slate-500 mt-1 block">
            AI Triage + PDKV Agronomist
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase">परवानाधारक दुकाने</span>
            <ShieldCheck className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            ४८ केंद्रे
          </div>
          <span className="text-[11px] font-semibold text-green-600 mt-1 block">
            १००% भाव पडताळणी पूर्ण
          </span>
        </div>

      </div>

      {/* Outbreak Hotspots & Regional Broadcast */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Outbreak Hotspots */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>{t.activePestHotspots}</span>
              </h3>
              <p className="text-xs text-slate-500">{t.recentOutbreaks}</p>
            </div>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
              ४ जिल्हे अलर्टवर
            </span>
          </div>

          <div className="space-y-3">
            {[
              {
                district: "अमरावती (भातकुली, चांदूर बाजार, दर्यापूर)",
                crop: "कापूस (Cotton)",
                pest: "गुलाबी बोंडअळी (Pink Bollworm)",
                badge: "अतितातडीचा अलर्ट",
                measure: "एकरी ५ फेरोमोन ट्रॅप मोहीम सुरू"
              },
              {
                district: "यवतमाळ (नेर, दारव्हा, पुसद)",
                crop: "सोयाबीन (Soybean)",
                pest: "पिवळा मोझॅक (Yellow Mosaic Virus)",
                badge: "प्रसार रोखा",
                measure: "पांढरी माशी नियंत्रणासाठी निंबोळी अर्क मोहीम"
              },
              {
                district: "अकोला (बार्शीटाकळी, बाळापूर)",
                crop: "कापूस (Cotton)",
                pest: "पांढरी माशी व चुरडा",
                badge: "मध्यम",
                measure: "पिवळे चिकट सापळे वाटप"
              }
            ].map((spot, idx) => (
              <div 
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="font-bold text-sm text-slate-900">
                    {spot.pest} • <span className="font-semibold text-slate-600">{spot.crop}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{spot.district}</span>
                  </div>
                  <div className="text-[11px] text-green-800 font-medium mt-1">
                    सल्ला: <strong>{spot.measure}</strong>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white text-slate-800 shadow-xs border border-slate-200 shrink-0 self-start sm:self-center">
                  {spot.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Broadcast Tool (Clean White & Green) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-green-200 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Megaphone className="w-5 h-5 text-green-700" />
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                {t.broadcastAlert}
              </h3>
              <p className="text-[11px] text-slate-500">
                नोंदणीकृत ६,४५० शेतकऱ्यांच्या मोबाईलवर थेट एसएमएस
              </p>
            </div>
          </div>

          <form onSubmit={handleSendBroadcast} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                संदेश मजकूर (मराठी/हिंदी):
              </label>
              <textarea
                rows={4}
                required
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                placeholder={t.broadcastPlaceholder}
                className="w-full text-xs p-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>लक्षित क्षेत्र: विदर्भ विभाग</span>
              <span>कमाल १६० अक्षरे</span>
            </div>

            {broadcastSent && (
              <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                <span>{t.broadcastSuccess}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSending}
              className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              {isSending ? (
                <span>प्रसारित होत आहे...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{t.sendBroadcast} (Broadcast to 6,450 Farmers)</span>
                </>
              )}
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
