import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FlaskConical,
  Sprout,
  Layers,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Info,
  HelpCircle,
  Leaf,
  ShieldCheck,
} from 'lucide-react'
import {
  calculateFertilizerRecommendation,
  type CropType,
  type GrowthStage,
  type SoilType,
  type NutrientLevel,
  type AreaUnit,
  type FertilizerInput,
  type FertilizerRecommendationResult,
} from './services/fertilizerService'

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

  // Result state
  const [result, setResult] = useState<FertilizerRecommendationResult>(() =>
    calculateFertilizerRecommendation({
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
    })
  )
  const soilNutrients = result.soilStatusSummary.split(' • ')

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const input: FertilizerInput = {
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
    }
    const res = calculateFertilizerRecommendation(input)
    setResult(res)
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
    const defaultRes = calculateFertilizerRecommendation({
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
    })
    setResult(defaultRes)
  }

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
                <span className="text-sm font-semibold text-[#087f3e]">Soil nutrition</span>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                  Fertilizer recommendation
                </h1>
                <p className="text-base text-gray-600 mt-2 max-w-2xl leading-relaxed">
                  Tell us about your crop and soil to get a clear fertilizer plan for your field.
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
                <span>Reset Form</span>
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
                    Tell us about your crop and soil
                  </h2>
                </div>
              </div>

              {/* Crop Selection */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-gray-900">1. Your crop</h3>
                <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Crop
                </label>
                <select
                  value={crop}
                  onChange={(e) => setCrop(e.target.value as CropType)}
                  className="w-full min-h-12 px-3.5 py-3 text-base bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A5D6A7] focus:border-[#2E7D32]"
                >
                  {CROPS.map((c) => (
                    <option key={c} value={c}>
                      🌾 {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Crop Growth Stage */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Growth stage
                </label>
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value as GrowthStage)}
                  className="w-full min-h-12 px-3.5 py-3 text-base bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A5D6A7] focus:border-[#2E7D32]"
                >
                  {STAGES.map((s) => (
                    <option key={s} value={s}>
                      🌱 {s}
                    </option>
                  ))}
                </select>
              </div>
              </div>

              {/* Soil Type */}
              <div className="space-y-4 border-t border-gray-100 pt-5">
                <h3 className="text-base font-bold text-gray-900">2. Your soil</h3>
                <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Soil type
                </label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value as SoilType)}
                  className="w-full min-h-12 px-3.5 py-3 text-base bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A5D6A7] focus:border-[#2E7D32]"
                >
                  {SOILS.map((st) => (
                    <option key={st} value={st}>
                      🧪 {st}
                    </option>
                  ))}
                </select>
              </div>

              {/* Soil pH */}
              <div>
                <div className="flex items-center justify-between mb-2 gap-3">
                  <label className="text-sm font-semibold text-gray-700">
                    Soil pH: <span className="text-[#087f3e] font-bold">{soilPh}</span>
                  </label>
                  <span className="text-sm text-gray-600">
                    {soilPh < 6.0 ? 'Acidic 🔴' : soilPh > 7.8 ? 'Alkaline 🔵' : 'Optimal 🟢'}
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
                  <h3 className="text-base font-bold text-gray-900">3. Your soil test</h3>
                  <span className="text-xs text-gray-500">Use your Soil Health Card</span>
                </div>

                {/* Nitrogen */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    Nitrogen (N)
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {NUTRIENT_LEVELS.map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setNitrogenLevel(lvl)}
                        className={`min-h-10 px-3 py-2 text-sm font-medium rounded-lg border transition-all ${
                          nitrogenLevel === lvl
                            ? 'bg-blue-50 border-blue-300 text-blue-700 font-bold shadow-xs'
                            : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Phosphorus */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Phosphorus (P)
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {NUTRIENT_LEVELS.map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setPhosphorusLevel(lvl)}
                        className={`min-h-10 px-3 py-2 text-sm font-medium rounded-lg border transition-all ${
                          phosphorusLevel === lvl
                            ? 'bg-amber-50 border-amber-300 text-amber-700 font-bold shadow-xs'
                            : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Potassium */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    Potassium (K)
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {NUTRIENT_LEVELS.map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setPotassiumLevel(lvl)}
                        className={`min-h-10 px-3 py-2 text-sm font-medium rounded-lg border transition-all ${
                          potassiumLevel === lvl
                            ? 'bg-purple-50 border-purple-300 text-purple-700 font-bold shadow-xs'
                            : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Field Size & Unit */}
              <div className="pt-5 border-t border-gray-100">
                <h3 className="text-base font-bold text-gray-900 mb-3">4. Your field size</h3>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  How much land do you have?
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0.1"
                    max="1000"
                    step="0.1"
                    value={area}
                    onChange={(e) => setArea(parseFloat(e.target.value) || 1)}
                    placeholder="Area"
                    className="flex-1 min-h-12 min-w-0 px-3.5 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A5D6A7] focus:border-[#2E7D32]"
                  />
                  <select
                    value={areaUnit}
                    onChange={(e) => setAreaUnit(e.target.value as AreaUnit)}
                    className="w-32 min-h-12 px-3 py-3 text-base bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A5D6A7]"
                  >
                    {AREA_UNITS.map((u) => (
                      <option key={u} value={u}>
                        {u}
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
                <span>Calculate Fertilizer Recommendation</span>
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
                    Your fertilizer recommendation
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                    🌾 {result.crop}
                  </h2>
                  <p className="text-base text-gray-600 mt-1">{result.stage}</p>
                </div>
                <div className="px-4 py-2.5 rounded-xl bg-[#f0faf2] border border-[#c8e6c9] text-sm font-semibold text-[#087f3e]">
                  For your field: {area} {areaUnit}
                </div>
              </div>

              {/* Soil Overview */}
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <span className="text-sm text-gray-500 block">Soil type</span>
                  <span className="text-base font-semibold text-gray-900">{result.soilType}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500 block">Soil pH</span>
                  <span className="text-base font-semibold text-gray-900">
                    {result.soilPh} ({result.phCategory})
                  </span>
                </div>
                <div className="sm:col-span-2 border-t border-gray-100 pt-4">
                  <span className="text-sm font-semibold text-gray-700 block mb-3">Soil nutrients</span>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {soilNutrients.map((nutrient) => {
                      const [name, level] = nutrient.split(': ')
                      const levelColor = level === 'Low'
                        ? 'text-amber-700 bg-amber-50'
                        : level === 'High'
                        ? 'text-emerald-700 bg-emerald-50'
                        : 'text-blue-700 bg-blue-50'
                      return (
                        <div key={name} className="flex items-center justify-between gap-2">
                          <span className="text-sm text-gray-700">{name}</span>
                          <span className={`px-2.5 py-1 rounded-full text-sm font-semibold ${levelColor}`}>
                            {level}
                          </span>
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
                What fertilizer to use
                </h3>
              </div>

              {result.primaryFertilizers.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center text-gray-600">
                  <p className="text-base font-medium">
                    No chemical fertilizers required at this pre-harvest / maturity stage.
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
                            <strong className="text-gray-900 block mb-1">When and how to apply</strong>
                            {fert.timingAndMethod}
                          </p>
                        </div>

                        {/* Quantity Pill */}
                        <div className="bg-[#E8F5E9] border border-[#A5D6A7] rounded-xl p-4 sm:min-w-44 text-left sm:text-right shrink-0">
                          <span className="text-sm text-gray-700 font-semibold block">
                            Total for {area} {areaUnit}
                          </span>
                          <span className="text-2xl sm:text-3xl font-extrabold text-[#087f3e] block mt-1">
                            {fert.totalQuantity}
                          </span>
                          <span className="text-sm text-gray-700 block mt-1">
                            {fert.quantityPerUnit}
                          </span>
                        </div>
                      </div>
                      <details className="mt-4 border-t border-gray-100 pt-3">
                        <summary className="cursor-pointer text-sm font-semibold text-[#087f3e]">
                          More details
                        </summary>
                        <div className="mt-3 space-y-1 text-sm text-gray-600">
                          <p>{fert.commercialName}</p>
                          <p>Nutrient composition: {fert.nutrientGrade}</p>
                        </div>
                      </details>
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
                  Why this fertilizer?
                </h3>
              </div>
              <p className="text-base text-gray-700 leading-relaxed">
                {result.whyRecommendation}
              </p>

              {/* Recommended Action Bullet Points */}
              <div className="space-y-3 pt-2">
                <span className="text-base font-bold text-gray-900">What you should do</span>
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
                    Micronutrient Booster
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
                    Improve soil health
                  </h4>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Supplement with 4-5 tonnes FYM or 1.5 tonnes Vermicompost + Azotobacter/PSB seed inoculation to enhance soil organic carbon and microbial vitality.
                </p>
              </div>
            </div>

            {/* ── Best Practices & Precautions ────────────────────── */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-gray-700">
                <ShieldCheck size={18} className="text-[#087f3e]" aria-hidden="true" />
                <h4 className="text-base font-bold text-gray-900">
                  Safe application
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
