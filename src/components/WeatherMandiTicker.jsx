import React from 'react';
import { useApp } from '../context/AppContext';
import { CloudSun, Droplets, Wind, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function WeatherMandiTicker() {
  const { t, lang, mandiRates } = useApp();

  return (
    <div className="bg-gradient-to-r from-agri-900 via-agri-800 to-agri-950 text-white shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Weather & Spraying Condition Box */}
          <div className="md:col-span-6 flex flex-wrap items-center gap-3 sm:gap-4 text-xs">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
              <CloudSun className="w-5 h-5 text-amber-300" />
              <div>
                <span className="font-bold text-sm">31°C</span>
                <span className="text-slate-300 ml-1.5 hidden sm:inline">अमरावती (Amravati)</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-300">
              <div className="flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-sky-400" />
                <span>६२% आर्द्रता</span>
              </div>
              <div className="flex items-center gap-1">
                <Wind className="w-3.5 h-3.5 text-teal-400" />
                <span>९ किमी/तास</span>
              </div>
            </div>

            {/* Spraying feasibility badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-md text-emerald-300 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.sprayOptimal}</span>
            </div>
          </div>

          {/* Live APMC Mandi Ticker */}
          <div className="md:col-span-6 flex items-center overflow-x-auto no-scrollbar gap-2 py-0.5 text-xs">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-300 whitespace-nowrap flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              {t.mandiTicker}:
            </span>

            <div className="flex items-center gap-2">
              {mandiRates.map((m, idx) => (
                <div 
                  key={idx}
                  className="bg-black/25 px-2.5 py-1 rounded border border-white/10 whitespace-nowrap flex items-center gap-1.5 hover:bg-black/40 transition-colors"
                >
                  <span className="text-slate-200">{m.crop}:</span>
                  <span className="font-bold text-amber-300">{m.modalPrice}</span>
                  <span className={`text-[10px] font-semibold ${m.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {m.change}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
