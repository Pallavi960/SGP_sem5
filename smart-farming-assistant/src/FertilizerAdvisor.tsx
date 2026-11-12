import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  FlaskConical,
  Layers,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Info,
  HelpCircle,
  Leaf,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react'
import {
  calculateFertilizerRecommendation,
  type CropType,
  type GrowthStage,
  type SoilType,
  type NutrientLevel,
  type AreaUnit,
  type FertilizerInput,
} from './services/fertilizerService'
import { useLanguage } from './context/LanguageContext'
import { tr, trFormat, pickLang } from './lib/i18n'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] },
  }),
}

const CROPS: CropType[] = [
  'Wheat',
  'Rice / Paddy',
  'Cotton',
  'Sugarcane',
  'Maize',
  'Tomato',
  'Potato',
  'Mustard',
  'Soybean',
  'Groundnut',
  'Pulses / Gram',
  'Onion',
  'Chili / Pepper',
]

const STAGES: GrowthStage[] = [
  'Basal / Land Prep',
  'Vegetative / Tillering',
  'Flowering / Panicle / Squaring',
  'Fruit / Grain / Tuber Bulking',
  'Maturity / Pre-Harvest',
]

const SOILS: SoilType[] = [
  'Alluvial Soil',
  'Black Cotton Soil',
  'Red & Yellow Soil',
  'Sandy Loam',
  'Clay Loam',
  'Laterite Soil',
]

const NUTRIENT_LEVELS: NutrientLevel[] = ['Low', 'Medium', 'High']
const AREA_UNITS: AreaUnit[] = ['Acres', 'Hectares', 'Bigha', 'Guntha']

export default function FertilizerAdvisor() {
  const { lang } = useLanguage()
  // Input form state
  const [crop, setCrop] = useState<CropType>('Wheat')
  const [stage, setStage] = useState<GrowthStage>('Vegetative / Tillering')
  const [soilType, setSoilType] = useState<SoilType>('Alluvial Soil')
  const [soilPh, setSoilPh] = useState<number>(6.8)
  const [nitrogenLevel, setNitrogenLevel] = useState<NutrientLevel>('Low')
  const [phosphorusLevel, setPhosphorusLevel] = useState<NutrientLevel>('Medium')
  const [potassiumLevel, setPotassiumLevel] = useState<NutrientLevel>('High')
  const [area, setArea] = useState<number>(2.5)
  const [areaUnit, setAreaUnit] = useState<AreaUnit>('Acres')
  const [organicMode, setOrganicMode] = useState<boolean>(false)

  const DEFAULT_INPUT: FertilizerInput = {
    crop: 'Wheat',
    stage: 'Vegetative / Tillering',
    soilType: 'Alluvial Soil',
    soilPh: 6.8,
    nitrogenLevel: 'Low',
    phosphorusLevel: 'Medium',
    potassiumLevel: 'High',
    area: 2.5,
    areaUnit: 'Acres',
    organicMode: false,
  }

  // Submitted input drives reactive localized result
  const [submittedInput, setSubmittedInput] = useState<FertilizerInput>(DEFAULT_INPUT)
  const result = useMemo(
    () => calculateFertilizerRecommendation(submittedInput, lang),
    [submittedInput, lang]
  )

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setSubmittedInput({
      crop,
      stage,
      soilType,
      soilPh: Number(soilPh) || 7.0,
      nitrogenLevel,
      phosphorusLevel,
      potassiumLevel,
      area: Number(area) || 1,
      areaUnit,
      organicMode,
    })
  }

  const handleReset = () => {
    setCrop('Wheat')
    setStage('Vegetative / Tillering')
    setSoilType('Alluvial Soil')
    setSoilPh(6.8)
    setNitrogenLevel('Low')
    setPhosphorusLevel('Medium')
    setPotassiumLevel('High')
    setArea(2.5)
    setAreaUnit('Acres')
    setOrganicMode(false)
    setSubmittedInput(DEFAULT_INPUT)
  }

  const getNutrientLabel = (lvl: NutrientLevel) => {
    if (lvl === 'Low') return tr(lang, 'Low', 'कम', 'कमी')
    if (lvl === 'Medium') return tr(lang, 'Medium', 'मध्यम', 'मध्यम')
    return tr(lang, 'High', 'अधिक', 'जास्त')
  }

  const buildGoogleAiUrl = (query: string) =>
    `https://www.google.com/search?q=${encodeURIComponent(query)}&udm=50`

  const buildPhAiUrl = (phVal: number, cropLabel: string, soilLabel: string) =>
    buildGoogleAiUrl(
      trFormat(
        lang,
        'What is Soil pH (currently {ph}) for {crop} in {soil}? Explain in simple words for a farmer how pH affects crop growth and how to balance acidic or alkaline soil.',
        { ph: phVal, crop: cropLabel, soil: soilLabel }
      )
    )

  const buildNutrientAiUrl = (nutrientLabel: string, cropLabel: string, levelLabel: string) =>
    buildGoogleAiUrl(
      trFormat(
        lang,
        'What is {nutrient} in soil for {crop} farming? Explain in simple words for a farmer what happens when {nutrient} is {level}, how to read it on a Soil Health Card, and which fertilizers improve it.',
        { nutrient: nutrientLabel, crop: cropLabel, level: levelLabel }
      )
    )

  const buildFertilizerAiUrl = (
    fertName: string,
    grade: string,
    cropLabel: string,
    stageLabel: string
  ) =>
    buildGoogleAiUrl(
      trFormat(
        lang,
        'Explain what {fertilizer} ({grade}) fertilizer is, why it is used for {crop} at {stage} stage, and how a farmer should apply it safely.',
        { fertilizer: fertName, grade, crop: cropLabel, stage: stageLabel }
      )
    )

  const soilTestNutrients = [
    {
      key: 'N',
      label: tr(lang, 'Nitrogen (N)', 'नाइट्रोजन (N)', 'नत्र (N)'),
      dotClass: 'bg-blue-500',
      activeClass: 'bg-blue-50 border-blue-300 text-blue-700 font-bold shadow-xs',
      value: nitrogenLevel,
      setter: setNitrogenLevel,
    },
    {
      key: 'P',
      label: tr(lang, 'Phosphorus (P)', 'फास्फोरस (P)', 'स्फुरद (P)'),
      dotClass: 'bg-amber-500',
      activeClass: 'bg-amber-50 border-amber-300 text-amber-700 font-bold shadow-xs',
      value: phosphorusLevel,
      setter: setPhosphorusLevel,
    },
    {
      key: 'K',
      label: tr(lang, 'Potassium (K)', 'पोटेशियम (K)', 'पालाश (K)'),
      dotClass: 'bg-purple-500',
      activeClass: 'bg-purple-50 border-purple-300 text-purple-700 font-bold shadow-xs',
      value: potassiumLevel,
      setter: setPotassiumLevel,
    },
  ] as const

  return (
    <div className="bg-[#f9fbf9] min-h-screen py-6 px-4 sm:px-6 sm:py-8 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* ── Page Header ────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] border border-[#A5D6A7] flex items-center justify-center shrink-0">
                <FlaskConical className="w-6 h-6 text-[#087f3e]" aria-hidden="true" />
              </div>
              <div>
                <span className="text-sm font-semibold text-[#087f3e]">
                  {tr(lang, 'Soil nutrition', 'मृदा पोषण', 'माती पोषण')}
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                  {tr(lang, 'Fertilizer recommendation', 'उर्वरक एवं खाद सलाहकार', 'खत सल्लागार आणि शिफारस')}
                </h1>
                <p className="text-base text-gray-600 mt-2 max-w-2xl leading-relaxed">
                  {tr(lang, 'Tell us about your crop and soil to get a clear fertilizer plan for your field.', 'अपने खेत के लिए सटीक उर्वरक योजना प्राप्त करने हेतु फसल और मिट्टी की जानकारी दें।', 'आपल्या शेतासाठी अचूक खत नियोजन मिळवण्यासाठी पीक आणि मातीची माहिती द्या.')}
                </p>
              </div>
            </div>

            {/* Reset Button */}
            <div className="self-start md:self-auto shrink-0">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex min-h-11 items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"
              >
                <RotateCcw size={16} aria-hidden="true" />
                <span>{tr(lang, 'Reset Form', 'फॉर्म रीसेट करें', 'फॉर्म रीसेट करा')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Main Workspace Grid ────────────────────────────────── */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column: Form Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <form
              onSubmit={handleCalculate}
              className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-xs space-y-6"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#087f3e]" aria-hidden="true" />
                  <h2 className="text-lg font-bold text-gray-900">
                    {tr(lang, 'Tell us about your crop and soil', 'फसल और मिट्टी का विवरण भरें', 'पीक आणि मातीचा तपशील भरा')}
                  </h2>
                </div>
              </div>

              {/* Crop Selection */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-gray-900">
                  {tr(lang, '1. Your crop', '१. आपकी फसल', '१. तुमचे पीक')}
                </h3>
                <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {tr(lang, 'Crop', 'फसल', 'पीक')}
                </label>
                <select
                  value={crop}
                  onChange={(e) => setCrop(e.target.value as CropType)}
                  className="w-full min-h-12 px-3.5 py-3 text-base bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A5D6A7] focus:border-[#2E7D32]"
                >
                  {CROPS.map((c) => (
                    <option key={c} value={c}>
                      🌾 {tr(lang, c)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Crop Growth Stage */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {tr(lang, 'Growth stage', 'वृद्धि चरण', 'वाढीची अवस्था')}
                </label>
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value as GrowthStage)}
                  className="w-full min-h-12 px-3.5 py-3 text-base bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A5D6A7] focus:border-[#2E7D32]"
                >
                  {STAGES.map((s) => (
                    <option key={s} value={s}>
                      🌱 {tr(lang, s)}
                    </option>
                  ))}
                </select>
              </div>
              </div>

              {/* Soil Type */}
              <div className="space-y-4 border-t border-gray-100 pt-5">
                <h3 className="text-base font-bold text-gray-900">
                  {tr(lang, '2. Your soil', '२. आपकी मिट्टी', '२. तुमची माती')}
                </h3>
                <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {tr(lang, 'Soil type', 'मिट्टी का प्रकार', 'मातीचा प्रकार')}
                </label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value as SoilType)}
                  className="w-full min-h-12 px-3.5 py-3 text-base bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A5D6A7] focus:border-[#2E7D32]"
                >
                  {SOILS.map((st) => (
                    <option key={st} value={st}>
                      🧪 {tr(lang, st)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Soil pH */}
              <div>
                <div className="flex flex-wrap items-center justify-between mb-2 gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="text-sm font-semibold text-gray-700">
                      {tr(lang, 'Soil pH:', 'मृदा pH मान:', 'मातीचा सामू (pH):')} <span className="text-[#087f3e] font-bold">{soilPh}</span>
                    </label>
                    <a
                      href={buildPhAiUrl(soilPh, tr(lang, crop), tr(lang, soilType))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-[#087f3e] border border-emerald-200 hover:bg-emerald-100 transition-colors"
                    >
                      <Sparkles size={11} aria-hidden="true" />
                      <span>{tr(lang, 'More info · Google AI')}</span>
                      <ExternalLink size={10} aria-hidden="true" />
                    </a>
                  </div>
                  <span className="text-sm text-gray-600">
                    {soilPh < 6.0
                      ? (tr(lang, 'Acidic 🔴', 'अम्लीय 🔴', 'आम्लयुक्त 🔴'))
                      : soilPh > 7.8
                      ? (tr(lang, 'Alkaline 🔵', 'क्षारीय 🔵', 'अल्कधर्मी 🔵'))
                      : (tr(lang, 'Optimal 🟢', 'अनुकूल 🟢', 'योग्य 🟢'))}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="4.5"
                    max="9.0"
                    step="0.1"
                    value={soilPh}
                    onChange={(e) => setSoilPh(parseFloat(e.target.value))}
                    className="w-full accent-[#087f3e]"
                  />
                  <input
                    type="number"
                    min="4.0"
                    max="10.0"
                    step="0.1"
                    value={soilPh}
                    onChange={(e) => setSoilPh(parseFloat(e.target.value) || 7.0)}
                    className="w-20 min-h-11 px-2 py-2 text-sm text-center border border-gray-200 rounded-lg"
                  />
                </div>
              </div>
              </div>

              {/* NPK Soil Status Ratings */}
              <div className="space-y-4 pt-5 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-gray-900">
                    {tr(lang, '3. Your soil test', '३. मृदा परीक्षण रिपोर्ट', '३. माती चाचणी अहवाल')}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {tr(lang, 'Use your Soil Health Card', 'सॉइल हेल्थ कार्ड का उपयोग करें', 'मृदा आरोग्य पत्रिकेचा वापर करा')}
                  </span>
                </div>

                {soilTestNutrients.map((row) => (
                  <div
                    key={row.key}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${row.dotClass}`} />
                        {row.label}
                      </span>
                      <a
                        href={buildNutrientAiUrl(row.label, tr(lang, crop), getNutrientLabel(row.value))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-[#087f3e] border border-emerald-200 hover:bg-emerald-100 transition-colors"
                      >
                        <Sparkles size={11} aria-hidden="true" />
                        <span>{tr(lang, 'More info · Google AI')}</span>
                        <ExternalLink size={10} aria-hidden="true" />
                      </a>
                    </div>
                    <div className="grid grid-cols-3 gap-2 shrink-0">
                      {NUTRIENT_LEVELS.map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => row.setter(lvl)}
                          className={`min-h-10 px-3 py-2 text-sm font-medium rounded-lg border transition-all ${
                            row.value === lvl
                              ? row.activeClass
                              : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {getNutrientLabel(lvl)}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Field Size & Unit */}
              <div className="pt-5 border-t border-gray-100">
                <h3 className="text-base font-bold text-gray-900 mb-3">
                  {tr(lang, '4. Your field size', '४. खेत का आकार', '४. शेताचा आकार')}
                </h3>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {tr(lang, 'How much land do you have?', 'आपके पास कितनी जमीन है?', 'तुमच्याकडे किती जमीन आहे?')}
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0.1"
                    max="1000"
                    step="0.1"
                    value={area}
                    onChange={(e) => setArea(parseFloat(e.target.value) || 1)}
                    placeholder={tr(lang, 'Area')}
                    className="flex-1 min-h-12 min-w-0 px-3.5 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A5D6A7] focus:border-[#2E7D32]"
                  />
                  <select
                    value={areaUnit}
                    onChange={(e) => setAreaUnit(e.target.value as AreaUnit)}
                    className="w-32 min-h-12 px-3 py-3 text-base bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A5D6A7]"
                  >
                    {AREA_UNITS.map((u) => (
                      <option key={u} value={u}>
                        {tr(lang, u)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full min-h-14 py-3 px-4 rounded-xl bg-[#087f3e] hover:bg-[#066832] text-white text-base font-bold flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Sparkles size={18} aria-hidden="true" />
                <span>
                  {tr(lang, 'Calculate Fertilizer Recommendation', 'खाद की अनुशंसित मात्रा की गणना करें', 'खतांच्या शिफारसीची गणना करा')}
                </span>
              </button>
            </form>
          </div>

          {/* Right Column: Recommendations & Advice (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* ── Summary Card ─────────────────────────────────────── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-7 shadow-xs space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-5">
                <div>
                  <span className="text-sm font-bold text-[#087f3e] uppercase tracking-wide">
                    {tr(lang, 'Your fertilizer recommendation', 'आपकी उर्वरक अनुशंसा', 'तुमची खत शिफारस')}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                    🌾 {result.crop}
                  </h2>
                  <p className="text-base text-gray-600 mt-1">{result.stage}</p>
                </div>
                <div className="px-4 py-2.5 rounded-xl bg-[#f0faf2] border border-[#c8e6c9] text-sm font-semibold text-[#087f3e]">
                  {pickLang(lang, {
                    en: `For your field: ${submittedInput.area} ${tr(lang, submittedInput.areaUnit)}`,
                    hi: `खेत के लिए: ${submittedInput.area} ${tr(lang, submittedInput.areaUnit)}`,
                    mr: `शेतासाठी: ${submittedInput.area} ${tr(lang, submittedInput.areaUnit)}`,
                    gu: `તમારા ખેતર માટે: ${submittedInput.area} ${tr(lang, submittedInput.areaUnit)}`,
                    pa: `ਤੁਹਾਡੇ ਖੇਤ ਲਈ: ${submittedInput.area} ${tr(lang, submittedInput.areaUnit)}`,
                    ta: `உங்கள் வயலுக்கு: ${submittedInput.area} ${tr(lang, submittedInput.areaUnit)}`,
                    te: `మీ పొలం కోసం: ${submittedInput.area} ${tr(lang, submittedInput.areaUnit)}`,
                  })}
                </div>
              </div>

              {/* Soil Overview */}
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <span className="text-sm text-gray-500 block">
                    {tr(lang, 'Soil type', 'मिट्टी का प्रकार', 'मातीचा प्रकार')}
                  </span>
                  <span className="text-base font-semibold text-gray-900">{result.soilType}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500 block">
                    {tr(lang, 'Soil pH', 'मृदा pH मान', 'मातीचा सामू (pH)')}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base font-semibold text-gray-900">
                      {result.soilPh} ({result.phCategory})
                    </span>
                    <a
                      href={buildPhAiUrl(result.soilPh, result.crop, result.soilType)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-[#087f3e] border border-emerald-200 hover:bg-emerald-100 transition-colors"
                    >
                      <Sparkles size={11} aria-hidden="true" />
                      <span>{tr(lang, 'Ask Google AI')}</span>
                      <ExternalLink size={10} aria-hidden="true" />
                    </a>
                  </div>
                </div>
                <div className="sm:col-span-2 border-t border-gray-100 pt-4">
                  <span className="text-sm font-semibold text-gray-700 block mb-3">
                    {tr(lang, 'Soil nutrients', 'मृदा पोषक तत्व', 'मातीतील पोषक घटक')}
                  </span>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {result.nutrientItems.map((item) => {
                      const levelColor =
                        item.rawLevel === 'Low'
                          ? 'text-amber-700 bg-amber-50'
                          : item.rawLevel === 'High'
                          ? 'text-emerald-700 bg-emerald-50'
                          : 'text-blue-700 bg-blue-50'
                      return (
                        <div
                          key={item.key}
                          className="bg-gray-50/70 border border-gray-100 rounded-xl px-3 py-2.5 flex flex-col gap-1.5"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm text-gray-700 font-medium">{item.label}</span>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${levelColor}`}>
                              {item.levelLabel}
                            </span>
                          </div>
                          <a
                            href={buildNutrientAiUrl(item.label, result.crop, item.levelLabel)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#087f3e] hover:underline self-start"
                          >
                            <Sparkles size={11} aria-hidden="true" />
                            <span>{tr(lang, 'Ask Google AI')}</span>
                            <ExternalLink size={10} aria-hidden="true" />
                          </a>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* pH Insight Alert if needed */}
              {result.soilPh < 6.2 || result.soilPh > 7.8 ? (
                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 flex items-start gap-3">
                  <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-sm text-amber-900 leading-relaxed">
                    {result.phStatusSummary}
                  </p>
                </div>
              ) : null}
            </motion.div>

            {/* ── Primary Fertilizer Dosages ──────────────────────── */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-[#087f3e]" aria-hidden="true" />
              <h3 className="text-lg font-bold text-gray-900">
                {tr(lang, 'What fertilizer to use', 'कौन सा उर्वरक और कितनी मात्रा', 'कोणते खत आणि किती प्रमाण')}
                </h3>
              </div>

              {result.primaryFertilizers.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center text-gray-600">
                  <p className="text-base font-medium">
                    {tr(lang, 'No chemical fertilizers required at this pre-harvest / maturity stage.', 'इस परिपक्वता अवस्था में किसी रासायनिक उर्वरक की आवश्यकता नहीं है।', 'या परिपक्व अवस्थेत कोणत्याही रासायनिक खतांची गरज नाही.')}
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {result.primaryFertilizers.map((fert, idx) => (
                    <motion.div
                      key={idx}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      custom={idx}
                      className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-xs hover:border-gray-200 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="space-y-1 flex-1">
                          <span className="text-lg sm:text-xl font-bold text-gray-900 block">{fert.name}</span>
                          <p className="text-sm text-gray-700 mt-4 leading-relaxed">
                            <strong className="text-gray-900 block mb-1">
                              {tr(lang, 'When and how to apply', 'कब और कैसे प्रयोग करें', 'केव्हा आणि कसे वापरावे')}
                            </strong>
                            {fert.timingAndMethod}
                          </p>
                        </div>

                        {/* Quantity Pill */}
                        <div className="bg-[#E8F5E9] border border-[#A5D6A7] rounded-xl p-4 sm:min-w-44 text-left sm:text-right shrink-0">
                          <span className="text-sm text-gray-700 font-semibold block">
                            {pickLang(lang, {
                              en: `Total for ${submittedInput.area} ${tr(lang, submittedInput.areaUnit)}`,
                              hi: `कुल (${submittedInput.area} ${tr(lang, submittedInput.areaUnit)})`,
                              mr: `एकूण (${submittedInput.area} ${tr(lang, submittedInput.areaUnit)})`,
                              gu: `કુલ (${submittedInput.area} ${tr(lang, submittedInput.areaUnit)})`,
                              pa: `ਕੁੱਲ (${submittedInput.area} ${tr(lang, submittedInput.areaUnit)})`,
                              ta: `மொத்தம் (${submittedInput.area} ${tr(lang, submittedInput.areaUnit)})`,
                              te: `మొత్తం (${submittedInput.area} ${tr(lang, submittedInput.areaUnit)})`,
                            })}
                          </span>
                          <span className="text-2xl sm:text-3xl font-extrabold text-[#087f3e] block mt-1">
                            {fert.totalQuantity}
                          </span>
                          <span className="text-sm text-gray-700 block mt-1">
                            {fert.quantityPerUnit}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 border-t border-gray-100 pt-3 flex flex-wrap items-start justify-between gap-3">
                        <details className="flex-1 min-w-44">
                          <summary className="cursor-pointer text-sm font-semibold text-[#087f3e]">
                            {tr(lang, 'More details', 'और अधिक जानकारी', 'अधिक तपशील')}
                          </summary>
                          <div className="mt-3 space-y-1 text-sm text-gray-600">
                            <p>{fert.commercialName}</p>
                            <p>{tr(lang, 'Nutrient composition:', 'पोषक संरचना:', 'घटक रचना:')} {fert.nutrientGrade}</p>
                          </div>
                        </details>
                        <a
                          href={buildFertilizerAiUrl(fert.name, fert.nutrientGrade, result.crop, result.stage)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#f0faf2] text-[#087f3e] border border-[#c8e6c9] hover:bg-[#E8F5E9] transition-colors shrink-0"
                        >
                          <Sparkles size={13} aria-hidden="true" />
                          <span>{tr(lang, 'Explain in Google AI')}</span>
                          <ExternalLink size={12} aria-hidden="true" />
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* ── Why This Recommendation? ────────────────────────── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-xs space-y-4"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#087f3e]" aria-hidden="true" />
                <h3 className="text-lg font-bold text-gray-900">
                  {tr(lang, 'Why this fertilizer?', 'यह उर्वरक क्यों अनुशंसित है?', 'हेच खत का वापरावे?')}
                </h3>
              </div>
              <p className="text-base text-gray-700 leading-relaxed">
                {result.whyRecommendation}
              </p>

              {/* Recommended Action Bullet Points */}
              <div className="space-y-3 pt-2">
                <span className="text-base font-bold text-gray-900">
                  {tr(lang, 'What you should do', 'आपको क्या करना चाहिए', 'तुम्ही काय करावे')}
                </span>
                <ul className="space-y-3">
                  {result.recommendedAction.map((act, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-gray-700 leading-relaxed">
                      <CheckCircle2 size={18} className="text-[#087f3e] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* ── Micronutrients & Organic Options ────────────────── */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Micronutrient Card */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-[#087f3e]">
                  <Sparkles size={18} aria-hidden="true" />
                  <h4 className="text-base font-bold text-gray-900">
                    {tr(lang, 'Micronutrient Booster', 'सूक्ष्म पोषक तत्व बूस्टर', 'सूक्ष्म पोषक घटक')}
                  </h4>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {result.micronutrientAdvice}
                </p>
              </div>

              {/* Organic Supplement Card */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-emerald-700">
                  <Leaf size={18} aria-hidden="true" />
                  <h4 className="text-base font-bold text-gray-900">
                    {tr(lang, 'Improve soil health', 'मिट्टी के स्वास्थ्य में सुधार', 'मातीचे आरोग्य सुधारा')}
                  </h4>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {tr(lang, 'Supplement with 4-5 tonnes FYM or 1.5 tonnes Vermicompost + Azotobacter/PSB seed inoculation to enhance soil organic carbon and microbial vitality.', 'मृदा जैविक कार्बन और सूक्ष्मजीव स्वास्थ्य को बढ़ाने के लिए 4-5 टन गोबर खाद (FYM) या 1.5 टन वर्मीकम्पोस्ट का प्रयोग करें।', 'मातीतील सेंद्रिय कर्ब आणि सूक्ष्मजीव वाढवण्यासाठी ४-५ टन शेणखत किंवा १.५ टन गांडूळ खत वापरा.')}
                </p>
              </div>
            </div>

            {/* ── Best Practices & Precautions ────────────────────── */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-gray-700">
                <ShieldCheck size={18} className="text-[#087f3e]" aria-hidden="true" />
                <h4 className="text-base font-bold text-gray-900">
                  {tr(lang, 'Safe application', 'सुरक्षित प्रयोग के नियम', 'सुरक्षित वापराचे नियम')}
                </h4>
              </div>
              <ul className="grid sm:grid-cols-2 gap-3">
                {result.precautions.map((prec, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2 leading-relaxed">
                    <span className="text-[#087f3e] font-bold">•</span>
                    <span>{prec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Disclaimer Banner ───────────────────────────────── */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3">
              <Info size={20} className="text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-amber-900 leading-relaxed">
                {result.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
