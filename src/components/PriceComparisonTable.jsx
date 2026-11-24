import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Scale, 
  TrendingDown, 
  MapPin, 
  PhoneCall, 
  ShieldCheck, 
  CheckCircle2, 
  Store, 
  Truck, 
  Plus, 
  Calculator,
  ChevronDown
} from 'lucide-react';

export default function PriceComparisonTable() {
  const { 
    t, 
    lang, 
    products, 
    selectedProductId, 
    setSelectedProductId, 
    priceComparisons,
    showToast 
  } = useApp();

  // Multiplier / Quantity for farm savings calculator
  const [quantity, setQuantity] = useState(3);

  // Manual price entry form modal
  const [showAddQuote, setShowAddQuote] = useState(false);
  const [newDealerName, setNewDealerName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newType, setNewType] = useState('typeLocal');

  const currentProduct = products.find(p => p.id === selectedProductId) || products[0];
  const dealerQuotes = priceComparisons[currentProduct.id] || [];

  // Lowest offered price
  const lowestPrice = dealerQuotes.length > 0 
    ? Math.min(...dealerQuotes.map(d => d.price)) 
    : currentProduct.bestMarketPrice;
  
  const unitSaving = currentProduct.mrp - lowestPrice;
  const totalSaving = unitSaving * quantity;

  const handleAddManualQuote = (e) => {
    e.preventDefault();
    if (!newDealerName || !newPrice) return;

    dealerQuotes.unshift({
      dealerId: `d-${Date.now()}`,
      name: newDealerName,
      location: newLocation || "स्थानिक बाजार",
      distance: "२.५ किमी",
      channelType: newType,
      licenseNo: "MH-SUB-NEW-88",
      isVerified: true,
      price: parseInt(newPrice),
      mrp: currentProduct.mrp,
      discount: `${Math.round(((currentProduct.mrp - parseInt(newPrice)) / currentProduct.mrp) * 100)}%`,
      inStock: true,
      stockCount: "उपलब्ध",
      phone: "+91 98000 00000",
      paymentOptions: "Cash, UPI",
      badge: "शेतकऱ्याने जोडलेला भाव"
    });

    setShowAddQuote(false);
    setNewDealerName('');
    setNewPrice('');
    setNewLocation('');
    showToast("दुकानदाराचा भाव यशस्वीरित्या जोडला!", "success");
  };

  return (
    <div className="space-y-6 pb-20 md:pb-12">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-100 text-blue-800">
                <Scale className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {t.priceComparisonTitle}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t.priceComparisonSubtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddQuote(true)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors self-start sm:self-center"
          >
            <Plus className="w-4 h-4" />
            <span>+ दुकानदाराचा भाव नोंदवा (Add Price)</span>
          </button>
        </div>
      </div>

      {/* Product Selector Dropdown & Quick Glance */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
        <label className="block text-xs font-bold text-slate-700 mb-2">
          {t.selectProductToCompare}:
        </label>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-6">
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full text-sm sm:text-base font-bold text-slate-900 px-4 py-3 rounded-xl border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {products.map(p => (
                <option key={p.id} value={p.id}>
                  {lang === 'mr' ? p.tradeNameMr : p.tradeNameEn} (MRP: ₹{p.mrp})
                </option>
              ))}
            </select>
          </div>

          {/* Savings Calculation Gauge */}
          <div className="md:col-span-6 bg-emerald-50 rounded-xl p-3.5 border border-emerald-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-700" />
              <div>
                <div className="text-slate-500 font-semibold">नग संख्या निवडा:</div>
                <div className="flex items-center gap-1 mt-0.5">
                  {[1, 3, 5, 8].map(qty => (
                    <button
                      key={qty}
                      type="button"
                      onClick={() => setQuantity(qty)}
                      className={`px-2 py-0.5 rounded text-xs font-bold ${
                        quantity === qty 
                          ? 'bg-emerald-700 text-white' 
                          : 'bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                      }`}
                    >
                      {qty}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-slate-500 block">संभाव्य एकूण बचत:</span>
              <span className="text-base sm:text-lg font-extrabold text-emerald-800">
                ₹{totalSaving} ({quantity} नगांवर)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm text-center">
          <span className="text-xs text-slate-500 font-semibold">{t.mrp}</span>
          <div className="text-xl sm:text-2xl font-bold text-slate-800 mt-1">
            ₹{currentProduct.mrp}
          </div>
          <span className="text-[10px] text-slate-400">कमाल छापील किंमत</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm text-center">
          <span className="text-xs text-slate-500 font-semibold">{t.avgMarketPrice}</span>
          <div className="text-xl sm:text-2xl font-bold text-blue-700 mt-1">
            ₹{Math.round(currentProduct.mrp * 0.88)}
          </div>
          <span className="text-[10px] text-blue-600 font-medium">स्थानिक सरासरी दर</span>
        </div>

        <div className="bg-gradient-to-br from-emerald-600 to-agri-700 text-white rounded-2xl p-4 shadow-sm text-center">
          <span className="text-xs text-emerald-100 font-semibold">सर्वात कमी दर (Best Offer)</span>
          <div className="text-xl sm:text-2xl font-black mt-1">
            ₹{lowestPrice}
          </div>
          <span className="text-[11px] text-emerald-200 font-bold">
            प्रति नग ₹{unitSaving} बचत!
          </span>
        </div>
      </div>

      {/* Dealers Price Comparison Matrix Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-800">
            विक्रेते व कृषी केंद्रांचे थेट दर (Real-time Dealer Quotes)
          </h3>
          <span className="text-xs text-slate-500">
            {dealerQuotes.length} विक्रेते उपलब्ध
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100/80 text-slate-600 uppercase text-[11px] font-bold tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3.5 sm:p-4">{t.dealerName}</th>
                <th className="p-3.5 sm:p-4">{t.dealerType}</th>
                <th className="p-3.5 sm:p-4 text-center">{t.priceOffered}</th>
                <th className="p-3.5 sm:p-4 text-center">{t.discountPercent}</th>
                <th className="p-3.5 sm:p-4">{t.distanceAvailability}</th>
                <th className="p-3.5 sm:p-4 text-right">{t.contactDealer}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dealerQuotes.map((dealer) => {
                const isBest = dealer.price === lowestPrice;

                return (
                  <tr 
                    key={dealer.dealerId}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isBest ? 'bg-emerald-50/30' : ''
                    }`}
                  >
                    {/* Dealer Name & Location */}
                    <td className="p-3.5 sm:p-4">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{dealer.name}</span>
                        {dealer.isVerified && (
                          <span title={t.verifiedDealer}>
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{dealer.location}</span>
                      </div>
                      {dealer.badge && (
                        <span className="inline-block mt-1 text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-200">
                          {dealer.badge}
                        </span>
                      )}
                    </td>

                    {/* Channel Type */}
                    <td className="p-3.5 sm:p-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                        dealer.channelType === 'typeCoop' 
                          ? 'bg-purple-100 text-purple-800' 
                          : dealer.channelType === 'typeFpo'
                          ? 'bg-emerald-100 text-emerald-800'
                          : dealer.channelType === 'typeOnline'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        {t[dealer.channelType] || dealer.channelType}
                      </span>
                    </td>

                    {/* Price Offered */}
                    <td className="p-3.5 sm:p-4 text-center">
                      <div className="font-extrabold text-base text-slate-900">
                        ₹{dealer.price}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        MRP: <del>₹{dealer.mrp}</del>
                      </div>
                    </td>

                    {/* Discount */}
                    <td className="p-3.5 sm:p-4 text-center">
                      <span className="px-2 py-0.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800">
                        {dealer.discount} सूट
                      </span>
                    </td>

                    {/* Availability & Distance */}
                    <td className="p-3.5 sm:p-4">
                      <div className="font-medium text-slate-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{dealer.stockCount}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        अंतरावर: <strong>{dealer.distance}</strong>
                      </div>
                    </td>

                    {/* Contact Action */}
                    <td className="p-3.5 sm:p-4 text-right whitespace-nowrap">
                      <a
                        href={`tel:${dealer.phone}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-colors shadow-sm"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{dealer.phone.split(' ')[1] || dealer.phone}</span>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Price Addition Modal */}
      {showAddQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              नवीन कृषी केंद्र दर जोडा (Add Retailer Quote)
            </h3>

            <form onSubmit={handleAddManualQuote} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  दुकान / कृषी केंद्राचे नाव
                </label>
                <input
                  type="text"
                  required
                  value={newDealerName}
                  onChange={(e) => setNewDealerName(e.target.value)}
                  placeholder="उदा. किसान कृषी सेवा केंद्र, दर्यापूर"
                  className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  दुकान प्रकार
                </label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-600 bg-white"
                >
                  <option value="typeLocal">स्थानिक कृषी केंद्र (Local Krishi Kendra)</option>
                  <option value="typeCoop">सहकारी संस्था (Cooperative)</option>
                  <option value="typeFpo">FPO शेतकरी कंपनी (FPO Store)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    देकार किंमत (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="उदा. ७९०"
                    className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-600 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    पत्ता / गाव
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="उदा. दर्यापूर चौक"
                    className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddQuote(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  रद्द करा
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold"
                >
                  जतन करा
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
