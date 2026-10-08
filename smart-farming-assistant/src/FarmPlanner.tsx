import { useState, useMemo, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  CalendarDays, Sprout, Droplets, FlaskConical, Bug, Wheat,
  CheckCircle2, Circle, Plus, RotateCcw, Printer, Calendar,
  MapPin, Check, Edit3, Info, ChevronDown, ChevronUp,
} from 'lucide-react'
import {
  CROP_TEMPLATES, INDIAN_STATES, computeActivityDate, generateCustomPlan,
  type FarmActivity, type CropTemplate,
} from './services/farmPlannerService'

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
      const dateInfo = computeActivityDate(sowingDate, act.dayOffset, act.customDate)
      if (activeFilter === 'pending')   return !act.completed
      if (activeFilter === 'completed') return act.completed
      if (activeFilter === 'upcoming7') return !act.completed && dateInfo.daysRemaining >= 0 && dateInfo.daysRemaining <= 7
      return true
    })
  }, [activities, activeFilter, sowingDate])

  const nextActivity = activities.find((a) => !a.completed)
  const nextDateInfo = nextActivity ? computeActivityDate(sowingDate, nextActivity.dayOffset, nextActivity.customDate) : null

  const toggleTip = (id: string) => setExpandedTips((prev) => ({ ...prev, [id]: !prev[id] }))

  // ── Filter button config ────────────────────────────────────────────────
  const filterButtons = [
    { key: 'all'       as const, label: `All (${totalCount})` },
    { key: 'upcoming7' as const, label: 'Next 7 Days' },
    { key: 'pending'   as const, label: `Pending (${totalCount - completedCount})` },
    { key: 'completed' as const, label: `Completed (${completedCount})` },
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
            <h1 className="text-3xl font-bold text-gray-900">🌾 Farm Planner</h1>
            <p className="text-base text-gray-500 mt-1">Plan your farm activities easily.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-600 bg-white hover:bg-gray-50 transition-colors"
            >
              <Printer size={15} /> Print
            </button>
            <button
              onClick={handleResetPlan}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-600 bg-white hover:text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors"
            >
              <RotateCcw size={15} /> Reset
            </button>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════
            SET UP YOUR FARM PLAN
        ════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Set Up Your Farm Plan</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Crop */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Crop</label>
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
                  <option key={crop.id} value={crop.id}>{crop.name}</option>
                ))}
                <option value="custom">➕ Other / Custom Crop</option>
              </select>
            </div>

            {/* Region */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Region</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500"
                >
                  {INDIAN_STATES.map((st) => <option key={st} value={st}>{st}</option>)}
                </select>
              </div>
            </div>

            {/* Season */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Season</label>
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
                    {s}
                    <span className="block text-xs font-normal mt-0.5 opacity-75">
                      {s === 'Kharif' ? 'Monsoon' : s === 'Rabi' ? 'Winter' : 'Summer'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sowing Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Sowing Date</label>
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
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Crop Name</label>
              <input
                type="text"
                value={customCropName}
                onChange={(e) => setCustomCropName(e.target.value)}
                placeholder="e.g., Watermelon, Sunflower"
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </motion.div>
          )}

          <button
            type="button"
            onClick={() => handleGeneratePlan()}
            className="mt-5 w-full sm:w-auto px-8 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white text-base font-bold transition-colors"
          >
            Create Plan
          </button>
        </div>

        {/* ════════════════════════════════════════════════════
            CURRENT CROP SUMMARY (only when plan exists)
        ════════════════════════════════════════════════════ */}
        {currentPlanMeta && (
          <div className="bg-green-700 rounded-2xl px-6 py-5 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-green-200 text-sm font-medium mb-0.5">Current Plan</p>
                <h2 className="text-2xl font-bold">{currentPlanMeta.cropName}</h2>
                <p className="text-green-200 text-sm mt-1">
                  📍 {currentPlanMeta.location} &nbsp;·&nbsp; {currentPlanMeta.season} Season &nbsp;·&nbsp; ~{currentPlanMeta.durationDays} days
                </p>
              </div>
              {/* Progress */}
              <div className="bg-white/15 rounded-xl px-5 py-4 min-w-[160px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-green-100">Progress</span>
                  <span className="text-lg font-bold">{progressPercent}%</span>
                </div>
                <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-white h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-green-200 text-xs mt-2">{completedCount} of {totalCount} tasks done</p>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════
            NEXT TASK HIGHLIGHT
        ════════════════════════════════════════════════════ */}
        {nextActivity && nextDateInfo && (
          <div className="bg-white rounded-2xl border-2 border-green-400 p-5">
            <p className="text-xs font-bold text-green-700 uppercase tracking-widest mb-3">Your Next Task</p>
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                  {STAGE_LABEL[nextActivity.stage] || nextActivity.stage}
                </p>
                <h3 className="text-xl font-bold text-gray-900">{nextActivity.title}</h3>
                <p className="text-base font-semibold text-green-700 mt-1">{nextDateInfo.displayStr}</p>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{nextActivity.description}</p>
                {nextActivity.recommendation && (
                  <div className="mt-3 p-3 bg-green-50 rounded-xl border border-green-200">
                    <p className="text-xs font-bold text-green-700 mb-0.5">💡 Tip</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{nextActivity.recommendation}</p>
                  </div>
                )}
              </div>
              <button
                onClick={() => toggleActivityComplete(nextActivity.id)}
                className="shrink-0 px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-base font-bold rounded-xl transition-colors"
              >
                ✓ Mark Done
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
              <h2 className="text-xl font-bold text-gray-900">Your Farm Tasks</h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-sm font-bold text-white transition-colors"
              >
                <Plus size={14} /> Add Task
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
                    <p className="text-base font-semibold text-gray-500">No tasks match this filter.</p>
                    <p className="text-sm text-gray-400 mt-1">Try switching to "All".</p>
                  </motion.div>
                ) : (
                  filteredActivities.map((act, index) => {
                    const dateInfo = computeActivityDate(sowingDate, act.dayOffset, act.customDate)
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
                                {STAGE_LABEL[act.stage] || act.stage}
                              </span>
                              {dateInfo.isToday && (
                                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">TODAY</span>
                              )}
                              {!act.completed && dateInfo.daysRemaining > 0 && dateInfo.daysRemaining <= 7 && (
                                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                                  In {dateInfo.daysRemaining} days
                                </span>
                              )}
                            </div>

                            {/* Task title */}
                            <h3 className={`text-lg font-bold text-gray-900 leading-snug ${act.completed ? 'line-through text-gray-400' : ''}`}>
                              {act.title}
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
                                    <Edit3 size={11} /> Change
                                  </button>
                                </>
                              )}
                            </div>

                            {/* Description */}
                            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{act.description}</p>

                            {/* Farming Tip — collapsible */}
                            {act.recommendation && (
                              <div className="mt-3">
                                <button
                                  onClick={() => toggleTip(act.id)}
                                  className="flex items-center gap-1.5 text-sm font-semibold text-green-700 hover:text-green-800"
                                >
                                  <Info size={14} />
                                  Farming Tip
                                  {tipOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                                </button>
                                {tipOpen && (
                                  <div className="mt-2 p-3 bg-green-50 rounded-xl border border-green-200">
                                    <p className="text-sm text-gray-700 leading-relaxed">{act.recommendation}</p>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Status label */}
                            <div className="mt-3">
                              {act.completed ? (
                                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-600">
                                  <CheckCircle2 size={16} /> ✓ Completed
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-400">
                                  <Circle size={16} /> ○ Pending
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
                                Undo
                              </button>
                            ) : (
                              <button
                                onClick={() => toggleActivityComplete(act.id)}
                                className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-bold transition-colors"
                              >
                                Mark Done
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
              <h3 className="text-lg font-bold text-gray-900">Add a Farm Task</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
            </div>

            <form onSubmit={handleAddCustomActivity} className="space-y-4">
              {/* Task name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Task Name *</label>
                <input
                  type="text" required placeholder="e.g., Foliar Zinc Spray"
                  value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              {/* Stage */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Stage</label>
                <select
                  value={newStage}
                  onChange={(e) => setNewStage(e.target.value as FarmActivity['stage'])}
                  className="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <option value="Sowing">🌱 Sowing</option>
                  <option value="Irrigation">💧 Irrigation</option>
                  <option value="Fertilization">🌿 Fertilizer</option>
                  <option value="Pest Monitoring">🐛 Pest Check</option>
                  <option value="Harvest">🌾 Harvest</option>
                  <option value="Custom">📌 Custom Task</option>
                </select>
              </div>

              {/* Days after sowing */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Days After Sowing</label>
                <input
                  type="number" min="0" max="365"
                  value={newDayOffset}
                  onChange={(e) => setNewDayOffset(Number(e.target.value))}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Notes</label>
                <textarea
                  rows={2} placeholder="Any details or dosage notes..."
                  value={newDesc} onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button" onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 text-sm font-bold text-white bg-green-600 hover:bg-green-700 rounded-xl transition-colors"
                >
                  Add Task
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
