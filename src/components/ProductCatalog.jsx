import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Scale, 
  Leaf, 
  Info, 
  Sparkles,
  ArrowRight,
  ExternalLink,
  Award
} from 'lucide-react';

export default function ProductCatalog() {
  const { 
    t, 
    lang, 
    products, 
    setSelectedProductId, 
    setActiveTab 
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      p.tradeNameEn.toLowerCase().includes(searchLower) ||
      p.tradeNameMr.toLowerCase().includes(searchLower) ||
      p.activeIngredient.toLowerCase().includes(searchLower) ||
      p.targetPests.toLowerCase().includes(searchLower) ||
      p.targetCrops.toLowerCase().includes(searchLower);

    return matchesCategory && matchesSearch;
  });

  const handleCompare = (productId) => {
    setSelectedProductId(productId);
    setActiveTab('prices');
  };

  return (
    <div className="space-y-6 pb-20 md:pb-12">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {t.productsTitle}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t.productsSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>१००% अधिकृत व परवानाधारक</span>
            </span>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.searchProducts}
              className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
            {[
              { id: 'all', label: t.catAll },
              { id: 'catBio', label: t.catBio },
              { id: 'catInsecticide', label: t.catInsecticide },
              { id: 'catFungicide', label: t.catFungicide },
              { id: 'catFertilizer', label: t.catFertilizer },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-2 rounded-xl font-semibold whitespace-nowrap transition-colors border ${
                  selectedCategory === cat.id
                    ? 'bg-green-600 text-white border-green-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map(product => {
          return (
            <div 
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-green-400 transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Product Image & Badges */}
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img 
                    src={product.image} 
                    alt={product.tradeNameEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-600 text-white shadow-xs flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> CIB Approved
                    </span>
                    {product.ecoFriendly && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500 text-white shadow-xs flex items-center gap-1">
                        <Leaf className="w-3 h-3" /> सेंद्रिय / Bio
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-2.5 right-2.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs ${product.toxicityColor}`}>
                      {product.toxicityBand.split('(')[0]}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 space-y-3 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {product.categoryLabel} • {product.manufacturer}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm mt-0.5 group-hover:text-green-700 transition-colors line-clamp-1">
                      {lang === 'mr' ? product.tradeNameMr : product.tradeNameEn}
                    </h3>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-1">
                    <div className="text-slate-600">
                      <strong className="text-slate-800">घटक:</strong> {product.activeIngredient}
                    </div>
                    <div className="text-slate-600">
                      <strong className="text-slate-800">लक्ष्य कीड:</strong> {product.targetPests}
                    </div>
                    <div className="text-slate-600">
                      <strong className="text-slate-800">शिफारस पिके:</strong> {product.targetCrops}
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-2 text-[11px] text-slate-500">
                    <strong className="text-slate-700">{t.standardDosage}:</strong> {product.standardDosage}
                  </div>
                </div>
              </div>

              {/* Footer: Price & Direct Compare Action */}
              <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="text-[10px] text-slate-400">
                    MRP: <del>₹{product.mrp}</del>
                  </div>
                  <div className="font-extrabold text-sm text-green-700">
                    ₹{product.bestMarketPrice}
                    <span className="text-[10px] text-slate-500 font-normal ml-1">/{product.packSize}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCompare(product.id)}
                  className="px-3 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>{t.compareDealers}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
