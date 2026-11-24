import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, User, MapPin, Sprout, Save } from 'lucide-react';

export default function FarmerProfileModal() {
  const { 
    showProfileModal, 
    setShowProfileModal, 
    farmerProfile, 
    setFarmerProfile, 
    t, 
    lang, 
    showToast 
  } = useApp();

  const [form, setForm] = useState({
    name: farmerProfile.name,
    phone: farmerProfile.phone,
    village: farmerProfile.village,
    district: farmerProfile.district,
    landSize: farmerProfile.landSize,
    crops: farmerProfile.crops,
    soilType: farmerProfile.soilType,
    irrigation: farmerProfile.irrigation
  });

  if (!showProfileModal) return null;

  const handleCropToggle = (cropKey) => {
    setForm(prev => {
      const exists = prev.crops.includes(cropKey);
      if (exists) {
        return { ...prev, crops: prev.crops.filter(c => c !== cropKey) };
      } else {
        return { ...prev, crops: [...prev.crops, cropKey] };
      }
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setFarmerProfile(prev => ({
      ...prev,
      ...form
    }));
    setShowProfileModal(false);
    showToast(
      lang === 'mr' ? "शेतकरी प्रोफाइल यशस्वीरित्या जतन केली!" :
      lang === 'hi' ? "किसान प्रोफाइल सफलतापूर्वक सहेजी गई!" :
      "Farmer profile updated successfully!",
      "success"
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-agri-700 to-agri-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <User className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{t.farmerProfile}</h3>
              <p className="text-xs text-emerald-200">सल्ला व बाजार सेवांसाठी शेती तपशील</p>
            </div>
          </div>
          <button 
            onClick={() => setShowProfileModal(false)}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t.farmerName}
            </label>
            <input 
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-agri-500 font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.village}
              </label>
              <input 
                type="text"
                required
                value={form.village}
                onChange={(e) => setForm({ ...form, village: e.target.value })}
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-agri-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.taluka}
              </label>
              <input 
                type="text"
                required
                value={form.district}
                onChange={(e) => setForm({ ...form, district: e.target.value })}
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-agri-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.landSize}
              </label>
              <input 
                type="number"
                step="0.5"
                min="0.5"
                required
                value={form.landSize}
                onChange={(e) => setForm({ ...form, landSize: parseFloat(e.target.value) || 0 })}
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-agri-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                सिंचन प्रकार (Irrigation)
              </label>
              <select
                value={form.irrigation}
                onChange={(e) => setForm({ ...form, irrigation: e.target.value })}
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-agri-500 bg-white"
              >
                <option value="Drip Irrigation + Rainfed (ठिबक व कोरडवाहू)">ठिबक व कोरडवाहू (Drip + Rainfed)</option>
                <option value="Flood Irrigation (पाट पाणी)">पाट पाणी (Flood)</option>
                <option value="Rainfed Only (केवळ कोरडवाहू)">केवळ कोरडवाहू (Rainfed Only)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {t.primaryCrops}
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { key: 'cotton', label: t.cotton },
                { key: 'soybean', label: t.soybean },
                { key: 'chana', label: t.chana },
                { key: 'wheat', label: t.wheat }
              ].map(crop => {
                const isSelected = form.crops.includes(crop.key);
                return (
                  <button
                    type="button"
                    key={crop.key}
                    onClick={() => handleCropToggle(crop.key)}
                    className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                      isSelected 
                        ? 'border-agri-600 bg-agri-50 text-agri-900 font-semibold' 
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{crop.label}</span>
                    {isSelected && <span className="text-agri-600 font-bold">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex gap-3">
            <button
              type="button"
              onClick={() => setShowProfileModal(false)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
            >
              {t.close}
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-xl bg-agri-600 hover:bg-agri-700 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{t.saveProfile}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
