import { useState } from 'react'
import { motion } from 'framer-motion'
import { Droplets, Calendar, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react'
import { useLanguage } from './context/LanguageContext'

interface RecommendedCrop {
  name: { en: string; hi: string; mr: string }
  category: { en: string; hi: string; mr: string }
  duration: { en: string; hi: string; mr: string }
  water: { en: string; hi: string; mr: string }
  profitScore: string
  suitability: number
  reasons: { en: string[]; hi: string[]; mr: string[] }
}

const CROPS_DATABASE: Record<string, RecommendedCrop[]> = {
  'black-kharif': [
    {
      name: { en: 'Cotton (Kapas)', hi: 'कपास', mr: 'कापूस' },
      category: { en: 'Cash Crop', hi: 'नगदी फसल', mr: 'नगदी पीक' },
      duration: { en: '150 - 180 Days', hi: '150 - 180 दिन', mr: '१५० - १८० दिवस' },
      water: { en: 'Medium to High', hi: 'मध्यम से अधिक', mr: 'मध्यम ते जास्त' },
      profitScore: 'High',
      suitability: 96,
      reasons: {
        en: ['Black cotton soil holds moisture exceptionally well', 'High market demand in textile hubs', 'Optimal for warm monsoon climate'],
        hi: ['काली मिट्टी नमी को बहुत अच्छी तरह बनाए रखती है', 'कपड़ा मिलों में निरंतर उच्च मांग', 'गर्म मानसूनी जलवायु के लिए उपयुक्त'],
        mr: ['काळी कापशी जमीन ओलावा उत्तम प्रकारे टिकवून ठेवते', 'बाजारपेठेत सतत मोठी मागणी', 'उष्ण आणि मान्सून हवामानासाठी अत्यंत योग्य'],
      },
    },
    {
      name: { en: 'Soybean', hi: 'सोयाबीन', mr: 'सोयाबीन' },
      category: { en: 'Oilseed & Legume', hi: 'तिलहन व दलहन', mr: 'गळीत व कडधान्य' },
      duration: { en: '90 - 105 Days', hi: '90 - 105 दिन', mr: '९० - १०५ दिवस' },
      water: { en: 'Medium', hi: 'मध्यम', mr: 'मध्यम' },
      profitScore: 'Very High',
      suitability: 92,
      reasons: {
        en: ['Short duration cash flow for farmers', 'Fixes nitrogen in soil naturally', 'Strong MSP and processing demand'],
        hi: ['किसानों के लिए कम समय में नकदी लाभ', 'मिट्टी में प्राकृतिक रूप से नाइट्रोजन बढ़ाता है', 'मजबूत न्यूनतम समर्थन मूल्य (MSP)'],
        mr: ['कमी कालावधीत हाती येणारे नगदी पीक', 'जमिनीत नैसर्गिक नत्र स्थिरीकरण करते', 'चांगला हमीभाव आणि प्रक्रिया केंद्रांची मागणी'],
      },
    },
  ],
  'alluvial-rabi': [
    {
      name: { en: 'Wheat (Sharbati)', hi: 'गेहूं (शरबती)', mr: 'गहू (शरबती)' },
      category: { en: 'Cereal Grain', hi: 'अनाज', mr: 'अन्नधान्य' },
      duration: { en: '110 - 130 Days', hi: '110 - 130 दिन', mr: '११० - १३० दिवस' },
      water: { en: 'Medium', hi: 'मध्यम', mr: 'मध्यम' },
      profitScore: 'Stable High',
      suitability: 95,
      reasons: {
        en: ['Alluvial soil provides rich nutrients', 'Guaranteed procurement via government mandis', 'High grain quality and baking value'],
        hi: ['जलोढ़ मिट्टी प्रचुर पोषक तत्व प्रदान करती है', 'सरकारी मंडियों में सुनिश्चित खरीद', 'उच्च दाने की गुणवत्ता और बाजार मूल्य'],
        mr: ['गाळाच्या जमिनीत भरपूर पोषणद्रव्ये असतात', 'शासकीय खरेदी केंद्रांवर हमीभाव मिळतो', 'उच्च प्रतीचे दाणे आणि बाजारात मोठा खप'],
      },
    },
    {
      name: { en: 'Mustard (Sarson)', hi: 'सरसों', mr: 'मोहरी' },
      category: { en: 'Oilseed', hi: 'तिलहन', mr: 'गळीत पीक' },
      duration: { en: '100 - 120 Days', hi: '100 - 120 दिन', mr: '१०० - १२० दिवस' },
      water: { en: 'Low to Medium', hi: 'कम से मध्यम', mr: 'कमी ते मध्यम' },
      profitScore: 'High',
      suitability: 89,
      reasons: {
        en: ['Low irrigation needed compared to wheat', 'High oil content fetches premium rates', 'Improves field crop rotation cycle'],
        hi: ['गेहूं की तुलना में बहुत कम सिंचाई की आवश्यकता', 'उच्च तेल प्रतिशत से अच्छा दाम मिलता है', 'फसल चक्र सुधारने में सहायक'],
        mr: ['गव्हाच्या तुलनेत अतिशय कमी पाण्याची गरज', 'तेलाचे प्रमाण जास्त असल्याने उत्तम बाजारभाव', 'पीक फेरपालटासाठी उत्तम'],
      },
    },
  ],
  default: [
    {
      name: { en: 'Maize (Corn)', hi: 'मक्का', mr: 'मका' },
      category: { en: 'Cereal & Fodder', hi: 'अनाज व चारा', mr: 'धान्य व चारा' },
      duration: { en: '85 - 100 Days', hi: '85 - 100 दिन', mr: '८५ - १०० दिवस' },
      water: { en: 'Medium', hi: 'मध्यम', mr: 'मध्यम' },
      profitScore: 'High',
      suitability: 90,
      reasons: {
        en: ['Adaptable to varied soil types', 'Dual purpose: grain and poultry feed industry demand', 'Fast growing with low risk'],
        hi: ['विभिन्न प्रकार की मिट्टियों में आसानी से उगती है', 'दाने और पोल्ट्री फीड उद्योग में भारी मांग', 'कम जोखिम के साथ तेजी से तैयार'],
        mr: ['विविध प्रकारच्या जमिनीत सहज येणारे पीक', 'अन्नधान्य व पोल्ट्री फीड उद्योगात प्रचंड मागणी', 'कमी जोखीम आणि जलद उत्पादन'],
      },
    },
    {
      name: { en: 'Gram (Chickpea)', hi: 'चना', mr: 'हरभरा' },
      category: { en: 'Pulses', hi: 'दलहन', mr: 'कडधान्य' },
      duration: { en: '95 - 110 Days', hi: '95 - 110 दिन', mr: '९५ - ११० दिवस' },
      water: { en: 'Low', hi: 'कम पानी', mr: 'कमी पाणी' },
      profitScore: 'High',
      suitability: 88,
      reasons: {
        en: ['Thrives with residual moisture and low water', 'Enriches soil fertility with root nodules', 'High protein value and steady market price'],
        hi: ['कम पानी और अवशिष्ट नमी में भी अच्छी पैदावार', 'जड़ों की ग्रंथियों से मिट्टी की उर्वरता बढ़ाती है', 'स्थिर बाजार भाव और आसान बिक्री'],
        mr: ['कमी पाण्यावर व जमिनीतील ओलाव्यावर उत्तम येते', 'मुळांमधील गाठींमुळे जमिनीची सुपीकता वाढते', 'बाजारात सतत स्थिर आणि चांगला दर'],
      },
    },
  ],
}

export default function CropRecommendation() {
  const { lang } = useLanguage()

  const [soilType, setSoilType] = useState('black')
  const [season, setSeason] = useState('kharif')
  const [waterAccess, setWaterAccess] = useState('irrigated')
  const [calculated, setCalculated] = useState(true)

  const soilOptions = [
    { id: 'black', label: lang === 'hi' ? 'काली मिट्टी (कपास/सोयाबीन)' : lang === 'mr' ? 'काळी रेगुर जमीन (कापूस/सोयाबीन)' : 'Black Soil (Heavy Clay)' },
    { id: 'alluvial', label: lang === 'hi' ? 'जलोढ़ मिट्टी (नदी घाटी/दोमट)' : lang === 'mr' ? 'गाळाची जमीन (सुपीक दोमट)' : 'Alluvial / Loamy Soil' },
    { id: 'red', label: lang === 'hi' ? 'लाल/पीली मिट्टी' : lang === 'mr' ? 'तांबडी जमीन' : 'Red / Laterite Soil' },
    { id: 'sandy', label: lang === 'hi' ? 'बलुई/रेतीली मिट्टी' : lang === 'mr' ? 'रेतीयुक्त हलकी जमीन' : 'Sandy Soil' },
  ]

  const seasonOptions = [
    { id: 'kharif', label: lang === 'hi' ? 'खरीफ (मानसून: जून-अक्तूबर)' : lang === 'mr' ? 'खरीप (पावसाळा: जून-ऑक्टोबर)' : 'Kharif (Monsoon: Jun - Oct)' },
    { id: 'rabi', label: lang === 'hi' ? 'रबी (सर्दियां: नवंबर-मार्च)' : lang === 'mr' ? 'रब्बी (हिवाळा: नोव्हेंबर-मार्च)' : 'Rabi (Winter: Nov - Mar)' },
    { id: 'zaid', label: lang === 'hi' ? 'जायद (ग्रीष्म: मार्च-जून)' : lang === 'mr' ? 'उन्हाळी/झैद (मार्च-जून)' : 'Zaid (Summer: Mar - Jun)' },
  ]

  const waterOptions = [
    { id: 'rainfed', label: lang === 'hi' ? 'केवल वर्षा आधारित' : lang === 'mr' ? 'फक्त पावसावर आधारित' : 'Rainfed Only' },
    { id: 'irrigated', label: lang === 'hi' ? 'सिंचाई उपलब्ध (बोरवेल/नहर)' : lang === 'mr' ? 'सिंचन उपलब्ध (विहीर/कॅनॉल)' : 'Well/Canal Irrigated' },
    { id: 'drip', label: lang === 'hi' ? 'ड्रिप/स्प्रिंकलर (सूक्ष्म सिंचाई)' : lang === 'mr' ? 'ठिबक/तुषार सिंचन' : 'Drip / Micro Irrigation' },
  ]

  const key = `${soilType}-${season}`
  const recommendations = CROPS_DATABASE[key] || CROPS_DATABASE['default']

  return (
    <div className="bg-[#F8FAF9] min-h-[calc(100vh-68px)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Banner */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E8F5E9] text-[#2E7D32] border border-[#A5D6A7]">
              {lang === 'hi' ? '🌾 एआई कृषि योजना' : lang === 'mr' ? '🌾 एआय पीक सल्ला' : '🌾 AI Agronomy'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {lang === 'hi' ? 'स्मार्ट फसल अनुशंसा' : lang === 'mr' ? 'स्मार्ट पीक शिफारस' : 'Smart Crop Recommendation'}
          </h1>
          <p className="text-sm text-gray-500 mt-1 max-w-2xl">
            {lang === 'hi'
              ? 'अपनी मिट्टी का प्रकार, चालू मौसम और सिंचाई साधन चुनें। हमारा एल्गोरिदम आपकी भूमि के लिए सबसे उपयुक्त फसलें सुझाएगा।'
              : lang === 'mr'
              ? 'आपला जमिनीचा प्रकार, चालू हंगाम आणि पाण्याची उपलब्धता निवडा. आमची प्रणाली आपल्या शेतासाठी सर्वाधिक फायदेशीर पिके सुचवेल.'
              : 'Select your soil type, growing season, and water infrastructure to discover the highest-yielding and most profitable crops.'}
          </p>
        </div>

        {/* Input Controls */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                {lang === 'hi' ? '1. मिट्टी का प्रकार' : lang === 'mr' ? '१. जमिनीचा प्रकार' : '1. Soil Type'}
              </label>
              <select
                value={soilType}
                onChange={(e) => {
                  setSoilType(e.target.value)
                  setCalculated(true)
                }}
                className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
              >
                {soilOptions.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                {lang === 'hi' ? '2. बुवाई का मौसम' : lang === 'mr' ? '२. पेरणीचा हंगाम' : '2. Farming Season'}
              </label>
              <select
                value={season}
                onChange={(e) => {
                  setSeason(e.target.value)
                  setCalculated(true)
                }}
                className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
              >
                {seasonOptions.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                {lang === 'hi' ? '3. जल व सिंचाई सुविधा' : lang === 'mr' ? '३. पाण्याची उपलब्धता' : '3. Water Availability'}
              </label>
              <select
                value={waterAccess}
                onChange={(e) => {
                  setWaterAccess(e.target.value)
                  setCalculated(true)
                }}
                className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
              >
                {waterOptions.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {calculated && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Sparkles size={18} className="text-[#2E7D32]" />
                {lang === 'hi' ? 'आपके खेत के लिए अनुशंसित फसलें' : lang === 'mr' ? 'आपल्या शेतासाठी शिफारस केलेली पिके' : 'Top Recommended Crops'}
              </h2>
              <span className="text-xs text-gray-400">
                {recommendations.length} {lang === 'hi' ? 'फसल विकल्प पाए गए' : lang === 'mr' ? 'पीक पर्याय उपलब्ध' : 'options matched'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.map((crop, idx) => (
                <motion.div
                  key={crop.name.en}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all hover:border-[#A5D6A7]"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#2E7D32] bg-[#E8F5E9] px-2.5 py-1 rounded-full">
                        {crop.category[lang] || crop.category.en}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mt-2">
                        {crop.name[lang] || crop.name.en}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-[#2E7D32]">{crop.suitability}%</div>
                      <div className="text-[10px] uppercase font-bold text-gray-400">
                        {lang === 'hi' ? 'उपयुक्तता' : lang === 'mr' ? 'सुसंगतता' : 'Suitability'}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 my-5 py-3 border-y border-gray-100">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Calendar size={15} className="text-[#2E7D32] shrink-0" />
                      <span>{crop.duration[lang] || crop.duration.en}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Droplets size={15} className="text-blue-500 shrink-0" />
                      <span>{crop.water[lang] || crop.water.en}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      {lang === 'hi' ? 'मुख्य लाभ व कारण:' : lang === 'mr' ? 'महत्त्वाचे फायदे व कारणे:' : 'Why this crop fits:'}
                    </h4>
                    <ul className="space-y-1.5">
                      {(crop.reasons[lang] || crop.reasons.en).map((reason, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
                          <CheckCircle2 size={13} className="text-[#2E7D32] shrink-0 mt-0.5" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Advisory Note */}
            <div className="mt-8 p-4 rounded-xl bg-[#E8F5E9] border border-[#A5D6A7] flex items-start gap-3">
              <AlertCircle size={18} className="text-[#2E7D32] shrink-0 mt-0.5" />
              <p className="text-xs text-[#1B5E20] leading-relaxed">
                {lang === 'hi'
                  ? 'सलाह: बुवाई से पहले स्थानीय कृषि सेवा केंद्र से बीज की अनुशंसित उन्नत किस्म (Hybrid/Certified) एवं बीज उपचार की जानकारी अवश्य लें।'
                  : lang === 'mr'
                  ? 'टीप: पेरणीपूर्वी स्थानिक कृषी सेवा केंद्राकडून प्रमाणित बियाणे (हायब्रिड/सर्टिफाइड) व बीज प्रक्रियेची माहिती अवश्य घ्या.'
                  : 'Agronomist Tip: Before sowing, always check certified seed varieties and perform fungicide seed treatment for optimal germination.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
