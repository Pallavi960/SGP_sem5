import { useState, useMemo, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  CalendarDays, Sprout, Droplets, FlaskConical, Bug, Wheat,
  CheckCircle2, Circle, Plus, RotateCcw, Printer, Calendar,
  MapPin, Check, Edit3, Info, ChevronDown, ChevronUp,
} from 'lucide-react'
import {
  CROP_TEMPLATES, INDIAN_STATES, computeActivityDate, generateCustomPlan, translatePlannerText,
  type FarmActivity, type CropTemplate,
} from './services/farmPlannerService'
import { useLanguage } from './context/LanguageContext'
import { tr, pickLang } from './lib/i18n'

// ─── Stage icon map (unchanged) ────────────────────────────────────────────
const STAGE_ICONS: Record<string, any> = {
  Sowing: Sprout,
  Irrigation: Droplets,
  Fertilization: FlaskConical,
  'Pest Monitoring': Bug,
  Harvest: Wheat,
  Custom: CalendarDays,
}

// ─── Stage colour map (unchanged) ──────────────────────────────────────────
const STAGE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Sowing:            { bg: 'bg-emerald-50',  text: 'text-emerald-700',  border: 'border-emerald-200' },
  Irrigation:        { bg: 'bg-blue-50',     text: 'text-blue-700',     border: 'border-blue-200' },
  Fertilization:     { bg: 'bg-purple-50',   text: 'text-purple-700',   border: 'border-purple-200' },
  'Pest Monitoring': { bg: 'bg-amber-50',    text: 'text-amber-700',    border: 'border-amber-200' },
  Harvest:           { bg: 'bg-orange-50',   text: 'text-orange-700',   border: 'border-orange-200' },
  Custom:            { bg: 'bg-teal-50',     text: 'text-teal-700',     border: 'border-teal-200' },
}

// Human-readable stage labels
const STAGE_LABEL: Record<string, string> = {
  Sowing: '🌱 Sowing',
  Irrigation: '💧 Irrigation',
  Fertilization: '🌿 Fertilizer',
  'Pest Monitoring': '🐛 Pest Check',
  Harvest: '🌾 Harvest',
  Custom: '📌 Custom',
}

// ─── Component ─────────────────────────────────────────────────────────────
export default function FarmPlanner() {
  const { lang } = useLanguage()
  // ── All state variables preserved exactly ──────────────────────────────
  const [selectedCropId, setSelectedCropId] = useState<string>('wheat')
  const [customCropName, setCustomCropName] = useState<string>('')
  const [location, setLocation] = useState<string>('Maharashtra')
  const [season, setSeason] = useState<'Kharif' | 'Rabi' | 'Zaid'>('Rabi')
  const [sowingDate, setSowingDate] = useState<string>(() => new Date().toISOString().slice(0, 10))
  const [activities, setActivities] = useState<FarmActivity[]>([])
  const [currentPlanMeta, setCurrentPlanMeta] = useState<{
    cropName: string; durationDays: number; season: string; location: string
  } | null>(null)
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'completed' | 'upcoming7'>('all')
  const [editingDateId, setEditingDateId] = useState<string | null>(null)
  const [tempCustomDate, setTempCustomDate] = useState<string>('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [newStage, setNewStage] = useState<FarmActivity['stage']>('Irrigation')
  const [newDayOffset, setNewDayOffset] = useState<number>(10)
  const [expandedTips, setExpandedTips] = useState<Record<string, boolean>>({})

  // ── All effects / handlers preserved exactly ───────────────────────────
  useEffect(() => {
    const saved = localStorage.getItem('smartfarm_active_farm_plan')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setActivities(parsed.activities || [])
        setCurrentPlanMeta(parsed.meta || null)
        if (parsed.meta) {
          setSowingDate(parsed.meta.sowingDate || new Date().toISOString().slice(0, 10))
          setLocation(parsed.meta.location || 'Maharashtra')
          setSeason(parsed.meta.season || 'Rabi')
        }
        return
      } catch (e) { console.error('Failed to parse saved plan', e) }
    }
    handleGeneratePlan('wheat')
  }, [])

  useEffect(() => {
    if (activities.length > 0 && currentPlanMeta) {
      localStorage.setItem('smartfarm_active_farm_plan', JSON.stringify({
        activities, meta: { ...currentPlanMeta, sowingDate },
      }))
    }
  }, [activities, currentPlanMeta, sowingDate])

  const handleGeneratePlan = (cropIdToUse = selectedCropId) => {
    let template: CropTemplate | undefined
    if (cropIdToUse === 'custom') {
      const name = customCropName.trim() || 'Custom Crop'
      template = generateCustomPlan(name, season)
    } else {
      template = CROP_TEMPLATES.find((c) => c.id === cropIdToUse) || CROP_TEMPLATES[0]
    }
    const generatedActivities: FarmActivity[] = template.activities.map((act, index) => ({
      ...act, id: `act-${Date.now()}-${index}`, completed: false,
    }))
    setActivities(generatedActivities)
    setCurrentPlanMeta({ cropName: template.name, durationDays: template.durationDays, season, location })
  }

  const handleResetPlan = () => {
    localStorage.removeItem('smartfarm_active_farm_plan')
    setSelectedCropId('wheat')
    setCustomCropName('')
    setSeason('Rabi')
    setLocation('Maharashtra')
    setSowingDate(new Date().toISOString().slice(0, 10))
    handleGeneratePlan('wheat')
  }

  const toggleActivityComplete = (id: string) => {
    setActivities((prev) => prev.map((act) => act.id === id ? { ...act, completed: !act.completed } : act))
  }

  const saveCustomDate = (id: string) => {
    if (!tempCustomDate) return
    setActivities((prev) => prev.map((act) => act.id === id ? { ...act, customDate: tempCustomDate } : act))
    setEditingDateId(null)
    setTempCustomDate('')
  }

  const handleAddCustomActivity = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return
    const newAct: FarmActivity = {
      id: `act-custom-${Date.now()}`,
      stage: newStage,
      title: newTitle.trim(),
      description: newDesc.trim() || 'Task scheduled for your farm.',
      recommendation: 'Scheduled as per field requirement.',
      dayOffset: Number(newDayOffset) || 0,
      durationDays: 1,
      completed: false,
      iconType: 'general',
    }
    setActivities((prev) => [...prev, newAct].sort((a, b) => a.dayOffset - b.dayOffset))
    setNewTitle('')
    setNewDesc('')
    setShowAddModal(false)
  }

  // ── Derived values (unchanged) ──────────────────────────────────────────
  const totalCount     = activities.length
  const completedCount = activities.filter((a) => a.completed).length
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  const filteredActivities = useMemo(() => {
    return activities.filter((act) => {
      const dateInfo = computeActivityDate(sowingDate, act.dayOffset, act.customDate, lang)
      if (activeFilter === 'pending')   return !act.completed
      if (activeFilter === 'completed') return act.completed
      if (activeFilter === 'upcoming7') return !act.completed && dateInfo.daysRemaining >= 0 && dateInfo.daysRemaining <= 7
      return true
    })
  }, [activities, activeFilter, sowingDate, lang])

  const nextActivity = activities.find((a) => !a.completed)
  const nextDateInfo = nextActivity ? computeActivityDate(sowingDate, nextActivity.dayOffset, nextActivity.customDate, lang) : null

  const toggleTip = (id: string) => setExpandedTips((prev) => ({ ...prev, [id]: !prev[id] }))

  // ── Filter button config ────────────────────────────────────────────────
  const filterButtons = [
    { key: 'all'       as const, label: `${tr(lang, 'All', 'सभी', 'सर्व')} (${totalCount})` },
    { key: 'upcoming7' as const, label: tr(lang, 'Next 7 Days', 'अगले 7 दिन', 'पुढील ७ दिवस') },
    { key: 'pending'   as const, label: `${tr(lang, 'Pending', 'शेष', 'शिल्लक')} (${totalCount - completedCount})` },
    { key: 'completed' as const, label: `${tr(lang, 'Completed', 'पूर्ण', 'पूर्ण')} (${completedCount})` },
  ]

  // ───────────────────────────────────────────────────────────────────────
  // RENDER
  // ───────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f7faf5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* ════════════════════════════════════════════════════
            PAGE HEADER
        ════════════════════════════════════════════════════ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {tr(lang, '🌾 Farm Planner', '🌾 कृषि योजनाकार', '🌾 शेती नियोजक')}
            </h1>
            <p className="text-base text-gray-500 mt-1">
              {tr(lang, 'Plan your farm activities easily.', 'अपनी कृषि गतिविधियों की आसान योजना बनाएं।', 'आपल्या शेतीकामांचे सहज नियोजन करा.')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-600 bg-white hover:bg-gray-50 transition-colors"
            >
              <Printer size={15} /> {tr(lang, 'Print', 'प्रिंट', 'प्रिंट')}
            </button>
            <button
              onClick={handleResetPlan}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-600 bg-white hover:text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors"
            >
              <RotateCcw size={15} /> {tr(lang, 'Reset', 'रीसेट', 'रीसेट')}
            </button>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════
            SET UP YOUR FARM PLAN
        ════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-5">
            {tr(lang, 'Set Up Your Farm Plan', 'अपनी कृषि योजना तैयार करें', 'आपले शेती नियोजन तयार करा')}
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Crop */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                {tr(lang, 'Crop', 'फसल', 'पीक')}
              </label>
              <select
                value={selectedCropId}
                onChange={(e) => {
                  const val = e.target.value
                  setSelectedCropId(val)
                  if (val !== 'custom') {
                    const found = CROP_TEMPLATES.find((c) => c.id === val)
                    if (found) setSeason(found.defaultSeason)
                  }
                }}
                className="w-full px-4 py-3 text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500"
              >
                {CROP_TEMPLATES.map((crop) => (
                  <option key={crop.id} value={crop.id}>{tr(lang, crop.name)}</option>
                ))}
                <option value="custom">
                  {tr(lang, '➕ Other / Custom Crop', '➕ अन्य / कस्टम फसल', '➕ इतर / स्वतःचे पीक')}
                </option>
              </select>
            </div>

            {/* Region */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                {tr(lang, 'Region', 'राज्य / क्षेत्र', 'राज्य / विभाग')}
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500"
                >
                  {INDIAN_STATES.map((st) => <option key={st} value={st}>{tr(lang, st)}</option>)}
                </select>
              </div>
            </div>

            {/* Season */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                {tr(lang, 'Season', 'मौसम', 'हंगाम')}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Kharif', 'Rabi', 'Zaid'] as const).map((s) => (
                  <button
                    key={s} type="button" onClick={() => setSeason(s)}
                    className={`py-3 text-sm font-bold rounded-xl border transition-all ${
                      season === s
                        ? 'bg-green-600 text-white border-green-600'
                        : 'bg-white text-gray-600 border-gray-300 hover:bg-green-50 hover:border-green-400'
                    }`}
                  >
                    {s === 'Kharif' ? (tr(lang, 'Kharif', 'खरीफ', 'खरीप')) : s === 'Rabi' ? (tr(lang, 'Rabi', 'रबी', 'रब्बी')) : (tr(lang, 'Zaid', 'जायद', 'उन्हाळी'))}
                    <span className="block text-xs font-normal mt-0.5 opacity-75">
                      {s === 'Kharif' ? (tr(lang, 'Monsoon', 'मानसून', 'पावसाळी')) : s === 'Rabi' ? (tr(lang, 'Winter', 'सर्दी', 'हिवाळी')) : (tr(lang, 'Summer', 'गर्मी', 'उन्हाळा'))}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sowing Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                {tr(lang, 'Sowing Date', 'बुवाई की तारीख', 'पेरणीची तारीख')}
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="date" value={sowingDate}
                  onChange={(e) => setSowingDate(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500"
                />
              </div>
            </div>
          </div>

          {/* Custom crop name field */}
          {selectedCropId === 'custom' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4"
            >
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                {tr(lang, 'Crop Name', 'फसल का नाम', 'पिकाचे नाव')}
              </label>
              <input
                type="text"
                value={customCropName}
                onChange={(e) => setCustomCropName(e.target.value)}
                placeholder={tr(lang, 'e.g., Watermelon, Sunflower', 'उदा. तरबूज, सूरजमुखी', 'उदा. कलिंगड, सूर्यफूल')}
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </motion.div>
          )}

          <button
            type="button"
            onClick={() => handleGeneratePlan()}
            className="mt-5 w-full sm:w-auto px-8 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white text-base font-bold transition-colors"
          >
            {tr(lang, 'Create Plan', 'योजना बनाएं', 'नियोजन तयार करा')}
          </button>
        </div>

        {/* ════════════════════════════════════════════════════
            CURRENT CROP SUMMARY (only when plan exists)
        ════════════════════════════════════════════════════ */}
        {currentPlanMeta && (
          <div className="bg-green-700 rounded-2xl px-6 py-5 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-green-200 text-sm font-medium mb-0.5">
                  {tr(lang, 'Current Plan', 'सक्रिय योजना', 'सध्याचे नियोजन')}
                </p>
                <h2 className="text-2xl font-bold">{tr(lang, currentPlanMeta.cropName)}</h2>
                <p className="text-green-200 text-sm mt-1">
                  📍 {tr(lang, currentPlanMeta.location)} &nbsp;·&nbsp; {tr(lang, currentPlanMeta.season)} {tr(lang, 'Season', 'सीजन', 'हंगाम')} &nbsp;·&nbsp; ~{currentPlanMeta.durationDays} {tr(lang, 'days', 'दिन', 'दिवस')}
                </p>
              </div>
              {/* Progress */}
              <div className="bg-white/15 rounded-xl px-5 py-4 min-w-[160px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-green-100">
                    {tr(lang, 'Progress', 'प्रगति', 'प्रगती')}
                  </span>
                  <span className="text-lg font-bold">{progressPercent}%</span>
                </div>
                <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-white h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-green-200 text-xs mt-2">
                  {pickLang(lang, {
                    en: `${completedCount} of ${totalCount} tasks done`,
                    hi: `${completedCount} / ${totalCount} कार्य पूरे हुए`,
                    mr: `${completedCount} / ${totalCount} कामे पूर्ण`,
                    gu: `${completedCount} / ${totalCount} કાર્યો પૂર્ણ થયા`,
                    pa: `${completedCount} / ${totalCount} ਕੰਮ ਪੂਰੇ ਹੋਏ`,
                    ta: `${completedCount} / ${totalCount} பணிகள் முடிந்தன`,
                    te: `${completedCount} / ${totalCount} పనులు పూర్తయ్యాయి`,
                  })}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════
            NEXT TASK HIGHLIGHT
        ════════════════════════════════════════════════════ */}
        {nextActivity && nextDateInfo && (
          <div className="bg-white rounded-2xl border-2 border-green-400 p-5">
            <p className="text-xs font-bold text-green-700 uppercase tracking-widest mb-3">
              {tr(lang, 'Your Next Task', 'आपका अगला कार्य', 'तुमचे पुढील काम')}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                  {tr(lang, STAGE_LABEL[nextActivity.stage] || nextActivity.stage)}
                </p>
                <h3 className="text-xl font-bold text-gray-900">{translatePlannerText(lang, nextActivity.title)}</h3>
                <p className="text-base font-semibold text-green-700 mt-1">{nextDateInfo.displayStr}</p>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{translatePlannerText(lang, nextActivity.description)}</p>
                {nextActivity.recommendation && (
                  <div className="mt-3 p-3 bg-green-50 rounded-xl border border-green-200">
                    <p className="text-xs font-bold text-green-700 mb-0.5">
                      💡 {tr(lang, 'Tip', 'सलाह', 'सल्ला')}
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">{translatePlannerText(lang, nextActivity.recommendation)}</p>
                  </div>
                )}
              </div>
              <button
                onClick={() => toggleActivityComplete(nextActivity.id)}
                className="shrink-0 px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-base font-bold rounded-xl transition-colors"
              >
                {tr(lang, '✓ Mark Done', '✓ पूर्ण हुआ', '✓ पूर्ण झाले')}
              </button>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════
            TASK LIST
        ════════════════════════════════════════════════════ */}
        {currentPlanMeta && (
          <div className="space-y-4">

            {/* ── List header: title + filters + add button ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-gray-900">
                {tr(lang, 'Your Farm Tasks', 'आपके कृषि कार्य', 'तुमची शेतीची कामे')}
              </h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-sm font-bold text-white transition-colors"
              >
                <Plus size={14} />
                {tr(lang, 'Add Task', 'नया कार्य जोड़ें', 'नवीन काम जोडा')}
              </button>
            </div>

            {/* ── Filter chips ── */}
            <div className="flex flex-wrap gap-2">
              {filterButtons.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                    activeFilter === key
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-green-50 hover:border-green-400'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* ── Task cards ── */}
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {filteredActivities.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="bg-white rounded-2xl border border-gray-200 p-12 text-center"
                  >
                    <p className="text-base font-semibold text-gray-500">
                      {tr(lang, 'No tasks match this filter.', 'इस फिल्टर के तहत कोई कार्य नहीं मिला।', 'या फिल्टरमध्ये कोणतीही कामे आढळली नाहीत.')}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      {tr(lang, 'Try switching to "All".', '"सभी" पर स्विच करने का प्रयास करें।', '"सर्व" वर स्विच करण्याचा प्रयत्न करा.')}
                    </p>
                  </motion.div>
                ) : (
                  filteredActivities.map((act, index) => {
                    const dateInfo = computeActivityDate(sowingDate, act.dayOffset, act.customDate, lang)
                    const cfg  = STAGE_COLORS[act.stage] || STAGE_COLORS.Custom
                    const Icon = STAGE_ICONS[act.stage]  || CalendarDays
                    const tipOpen = expandedTips[act.id]

                    return (
                      <motion.div
                        key={act.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.25, delay: index * 0.03 }}
                        className={`bg-white rounded-2xl border-2 p-5 transition-colors ${
                          act.completed
                            ? 'border-gray-100 opacity-60'
                            : dateInfo.isToday
                            ? 'border-green-500'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          {/* Stage icon */}
                          <div className={`p-2.5 rounded-xl ${cfg.bg} ${cfg.text} shrink-0 mt-0.5`}>
                            <Icon size={20} />
                          </div>

                          {/* Main content */}
                          <div className="flex-1 min-w-0">
                            {/* Stage label + TODAY badge */}
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                                {tr(lang, STAGE_LABEL[act.stage] || act.stage)}
                              </span>
                              {dateInfo.isToday && (
                                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                                  {tr(lang, 'TODAY', 'आज', 'आज')}
                                </span>
                              )}
                              {!act.completed && dateInfo.daysRemaining > 0 && dateInfo.daysRemaining <= 7 && (
                                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                                  {pickLang(lang, {
                                    en: `In ${dateInfo.daysRemaining} days`,
                                    hi: `${dateInfo.daysRemaining} दिनों में`,
                                    mr: `${dateInfo.daysRemaining} दिवसांत`,
                                    gu: `${dateInfo.daysRemaining} દિવસમાં`,
                                    pa: `${dateInfo.daysRemaining} ਦਿਨਾਂ ਵਿੱਚ`,
                                    ta: `${dateInfo.daysRemaining} நாட்களில்`,
                                    te: `${dateInfo.daysRemaining} రోజుల్లో`,
                                  })}
                                </span>
                              )}
                            </div>

                            {/* Task title */}
                            <h3 className={`text-lg font-bold text-gray-900 leading-snug ${act.completed ? 'line-through text-gray-400' : ''}`}>
                              {translatePlannerText(lang, act.title)}
                            </h3>

                            {/* Date row */}
                            <div className="flex items-center gap-1.5 mt-1.5">
                              {editingDateId === act.id ? (
                                <div className="flex items-center gap-2">
                                  <input
                                    type="date"
                                    value={tempCustomDate || dateInfo.dateStr}
                                    onChange={(e) => setTempCustomDate(e.target.value)}
                                    className="text-sm px-2 py-1 border border-gray-300 rounded-lg"
                                  />
                                  <button
                                    onClick={() => saveCustomDate(act.id)}
                                    className="p-1.5 bg-green-600 text-white rounded-lg"
                                  >
                                    <Check size={13} />
                                  </button>
                                  <button
                                    onClick={() => setEditingDateId(null)}
                                    className="p-1.5 text-gray-400 hover:text-gray-600"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ) : (
                                <>
                                  <Calendar size={14} className="text-green-600 shrink-0" />
                                  <span className="text-base font-semibold text-green-700">{dateInfo.displayStr}</span>
                                  <button
                                    onClick={() => { setEditingDateId(act.id); setTempCustomDate(dateInfo.dateStr) }}
                                    className="ml-1 text-xs text-gray-400 hover:text-green-600 flex items-center gap-1"
                                  >
                                    <Edit3 size={11} />
                                    {tr(lang, 'Change', 'बदलें', 'बदला')}
                                  </button>
                                </>
                              )}
                            </div>

                            {/* Description */}
                            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{translatePlannerText(lang, act.description)}</p>

                            {/* Farming Tip — collapsible */}
                            {act.recommendation && (
                              <div className="mt-3">
                                <button
                                  onClick={() => toggleTip(act.id)}
                                  className="flex items-center gap-1.5 text-sm font-semibold text-green-700 hover:text-green-800"
                                >
                                  <Info size={14} />
                                  {tr(lang, 'Farming Tip', 'कृषि सलाह', 'शेती सल्ला')}
                                  {tipOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                                </button>
                                {tipOpen && (
                                  <div className="mt-2 p-3 bg-green-50 rounded-xl border border-green-200">
                                    <p className="text-sm text-gray-700 leading-relaxed">{translatePlannerText(lang, act.recommendation)}</p>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Status label */}
                            <div className="mt-3">
                              {act.completed ? (
                                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-600">
                                  <CheckCircle2 size={16} /> ✓ {tr(lang, 'Completed', 'पूर्ण', 'पूर्ण')}
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-400">
                                  <Circle size={16} /> ○ {tr(lang, 'Pending', 'लंबित', 'प्रलंबित')}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Mark done / undo button */}
                          <div className="shrink-0 mt-0.5">
                            {act.completed ? (
                              <button
                                onClick={() => toggleActivityComplete(act.id)}
                                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
                              >
                                {tr(lang, 'Undo', 'पूर्ववत करें', 'पूर्ववत करा')}
                              </button>
                            ) : (
                              <button
                                onClick={() => toggleActivityComplete(act.id)}
                                className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-bold transition-colors"
                              >
                                {tr(lang, 'Mark Done', 'पूर्ण करें', 'पूर्ण करा')}
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {/* ════════════════════════════════════════════════════
          ADD CUSTOM TASK MODAL (functionality unchanged)
      ════════════════════════════════════════════════════ */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-gray-900">
                {tr(lang, 'Add a Farm Task', 'कृषि कार्य जोड़ें', 'शेतीचे काम जोडा')}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
            </div>

            <form onSubmit={handleAddCustomActivity} className="space-y-4">
              {/* Task name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  {tr(lang, 'Task Name *', 'कार्य का नाम *', 'कामाचे नाव *')}
                </label>
                <input
                  type="text" required
                  placeholder={tr(lang, 'e.g., Foliar Zinc Spray', 'उदा. जिंक का पर्णीय छिड़काव', 'उदा. झिंक फवारणी')}
                  value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              {/* Stage */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  {tr(lang, 'Stage', 'चरण', 'टप्पा')}
                </label>
                <select
                  value={newStage}
                  onChange={(e) => setNewStage(e.target.value as FarmActivity['stage'])}
                  className="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <option value="Sowing">🌱 {tr(lang, 'Sowing', 'बुवाई', 'पेरणी')}</option>
                  <option value="Irrigation">💧 {tr(lang, 'Irrigation', 'सिंचाई', 'सिंचन')}</option>
                  <option value="Fertilization">🌿 {tr(lang, 'Fertilizer', 'उर्वरक', 'खत')}</option>
                  <option value="Pest Monitoring">🐛 {tr(lang, 'Pest Check', 'कीट नियंत्रण', 'कीटक तपासणी')}</option>
                  <option value="Harvest">🌾 {tr(lang, 'Harvest', 'कटाई', 'कापणी')}</option>
                  <option value="Custom">📌 {tr(lang, 'Custom Task', 'कस्टम कार्य', 'इतर काम')}</option>
                </select>
              </div>

              {/* Days after sowing */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  {tr(lang, 'Days After Sowing', 'बुवाई के कितने दिन बाद', 'पेरणीनंतर किती दिवसांनी')}
                </label>
                <input
                  type="number" min="0" max="365"
                  value={newDayOffset}
                  onChange={(e) => setNewDayOffset(Number(e.target.value))}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  {tr(lang, 'Notes', 'विवरण या खुराक', 'तपशील किंवा सूचना')}
                </label>
                <textarea
                  rows={2}
                  placeholder={tr(lang, 'Any details or dosage notes...', 'विवरण या खुराक संबंधी नोट्स...', 'काही सूचना किंवा मात्रा...')}
                  value={newDesc} onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button" onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  {tr(lang, 'Cancel', 'रद्द करें', 'रद्द करा')}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 text-sm font-bold text-white bg-green-600 hover:bg-green-700 rounded-xl transition-colors"
                >
                  {tr(lang, 'Add Task', 'कार्य जोड़ें', 'काम जोडा')}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
