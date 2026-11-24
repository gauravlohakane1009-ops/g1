import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Home, 
  Sparkles, 
  AlertCircle, 
  ClipboardList, 
  ShieldCheck, 
  Scale, 
  BarChart3,
  Stethoscope
} from 'lucide-react';

export default function Navigation() {
  const { activeTab, setActiveTab, t, role, cases, currentUser } = useApp();

  if (!currentUser) return null;

  // Active cases badge for farmer / pending queue for consultant
  const pendingCount = cases.filter(c => c.status !== 'resolved').length;
  const resolvedCount = cases.filter(c => c.status === 'resolved').length;

  const farmerItems = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'ai', label: t.navAi, icon: Sparkles, badge: 'AI' },
    { id: 'report', label: t.navReport, icon: AlertCircle },
    { id: 'cases', label: t.navCases, icon: ClipboardList, badge: resolvedCount > 0 ? `${resolvedCount}` : null },
    { id: 'prices', label: t.navPrices, icon: Scale },
  ];

  const consultantItems = [
    { id: 'cases', label: "केस कतार", icon: Stethoscope, badge: pendingCount > 0 ? `${pendingCount}` : null },
    { id: 'products', label: t.navProducts, icon: ShieldCheck },
    { id: 'prices', label: t.navPrices, icon: Scale },
  ];

  const adminItems = [
    { id: 'admin', label: t.navAdmin, icon: BarChart3 },
    { id: 'products', label: t.navProducts, icon: ShieldCheck },
    { id: 'prices', label: t.navPrices, icon: Scale },
  ];

  const items = role === 'consultant' 
    ? consultantItems 
    : role === 'admin' 
    ? adminItems 
    : farmerItems;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-green-100 shadow-lg safe-area-pb">
      <div className={`grid gap-1 p-1.5 ${items.length === 5 ? 'grid-cols-5' : 'grid-cols-3'}`}>
        {items.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all relative ${
                isActive
                  ? 'text-green-700 font-bold bg-green-50'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-green-600 scale-110' : 'text-slate-400'}`} />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 px-1 py-0.2 rounded-full text-[9px] font-extrabold bg-green-600 text-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 truncate max-w-full">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
