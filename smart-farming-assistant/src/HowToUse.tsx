import { Link } from 'react-router-dom'
import {
  MapPin, Sprout, Microscope, CloudSun, FlaskConical,
  CalendarRange, BookOpen, Bot, CheckCircle2, ArrowDown,
  ArrowRight, Lightbulb,
} from 'lucide-react'

// ─── Journey data ────────────────────────────────────────────────────────────

const PHASES = [
  {
    phase: 'DISCOVER',
    emoji: '🌱',
    color: { bg: 'bg-green-50', border: 'border-green-200', badge: 'bg-green-600', text: 'text-green-700', line: 'bg-green-200' },
    steps: [
      {
        num: 1,
        icon: MapPin,
        emoji: '📍',
        title: 'Set Your Location',
        desc: 'Choose your location so SmartFarm AI can give you useful local information.',
        route: '/weather',
        linkLabel: 'Check Weather →',
      },
      {
        num: 2,
        icon: Sprout,
        emoji: '🌱',
        title: 'Know Your Crop',
        desc: 'Select your crop to get advice and recommendations for your farming needs.',
        route: '/crop-recommendation',
        linkLabel: 'Crop Recommendation →',
      },
    ],
  },
  {
    phase: 'UNDERSTAND',
    emoji: '🔍',
    color: { bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-600', text: 'text-blue-700', line: 'bg-blue-200' },
    steps: [
      {
        num: 3,
        icon: Microscope,
        emoji: '🩺',
        title: 'Check Crop Health',
        desc: 'Upload a photo of your crop leaves to check for diseases.',
        route: '/disease-detection',
        linkLabel: 'Disease Detection →',
      },
      {
        num: 4,
        icon: CloudSun,
        emoji: '🌦️',
        title: 'Check the Weather',
        desc: 'See today\'s weather and upcoming conditions before going to the field.',
        route: '/weather',
        linkLabel: 'Weather →',
      },
    ],
  },
  {
    phase: 'PLAN',
    emoji: '📅',
    color: { bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-600', text: 'text-amber-700', line: 'bg-amber-200' },
    steps: [
      {
        num: 5,
        icon: FlaskConical,
        emoji: '🧪',
        title: 'Check Fertilizer Needs',
        desc: 'Enter your soil and crop details to get the right fertilizer advice.',
        route: '/fertilizer-advisor',
        linkLabel: 'Fertilizer Advisor →',
      },
      {
        num: 6,
        icon: CalendarRange,
        emoji: '📅',
        title: 'Plan Your Farm Work',
        desc: 'Follow your crop schedule and see which task needs to be done next.',
        route: '/farm-planner',
        linkLabel: 'Farm Planner →',
      },
    ],
  },
  {
    phase: 'SUPPORT',
    emoji: '🏛️',
    color: { bg: 'bg-purple-50', border: 'border-purple-200', badge: 'bg-purple-600', text: 'text-purple-700', line: 'bg-purple-200' },
    steps: [
      {
        num: 7,
        icon: BookOpen,
        emoji: '🏛️',
        title: 'Find Government Support',
        desc: 'Explore government schemes and agricultural support available for farmers.',
        route: '/government-schemes',
        linkLabel: 'Govt. Schemes →',
      },
      {
        num: 8,
        icon: Bot,
        emoji: '🤖',
        title: 'Ask SmartFarm AI',
        desc: 'Ask any farming question and get simple, practical guidance instantly.',
        route: '/ai-assistant',
        linkLabel: 'AI Assistant →',
      },
    ],
  },
]

const SITUATIONS = [
  { emoji: '🌦️', title: 'Before farm work',         tip: 'Check the weather before going to the field.',           route: '/weather',             label: 'Open Weather' },
  { emoji: '🩺', title: 'Crop looks unhealthy',      tip: 'Use Disease Detection to check your crop.',              route: '/disease-detection',   label: 'Open Disease Detection' },
  { emoji: '🧪', title: 'Not sure about fertilizer', tip: 'Open Fertilizer Advisor and enter your soil details.',    route: '/fertilizer-advisor',  label: 'Open Fertilizer Advisor' },
  { emoji: '📅', title: 'Want your next task?',       tip: 'Open Farm Planner and check your crop schedule.',        route: '/farm-planner',        label: 'Open Farm Planner' },
  { emoji: '🤔', title: 'Have a farming question?',   tip: 'Ask SmartFarm AI — it answers in your language.',        route: '/ai-assistant',        label: 'Ask AI' },
]

// ─── Component ───────────────────────────────────────────────────────────────

export default function HowToUse() {
  return (
    <div className="min-h-screen bg-[#f7faf5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-14">

        {/* ════ Header ════════════════════════════════════════════════════ */}
        <div className="text-center space-y-2">
          <p className="text-xs font-bold text-[#15803D] uppercase tracking-[0.18em]">Guide</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            How to Use SmartFarm AI
          </h1>
          <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            Your simple guide to using SmartFarm AI for better farming decisions.
          </p>
        </div>

        {/* ════ Phase legend strip ════════════════════════════════════════ */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          {PHASES.map((p, i) => (
            <div key={p.phase} className="flex items-center gap-1.5">
              <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${p.color.bg} ${p.color.text} border ${p.color.border}`}>
                {p.emoji} {p.phase}
              </span>
              {i < PHASES.length - 1 && (
                <ArrowRight size={13} className="text-gray-300 hidden sm:block" />
              )}
            </div>
          ))}
          <div className="flex items-center gap-1.5">
            <ArrowRight size={13} className="text-gray-300 hidden sm:block" />
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
              ✅ ACT
            </span>
          </div>
        </div>

        {/* ════ Main flowchart ════════════════════════════════════════════ */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-8 text-center">
            🌾 Your Smart Farming Journey
          </h2>

          {/* START node */}
          <div className="flex flex-col items-center mb-2">
            <div className="w-20 h-20 rounded-full bg-[#15803D] flex flex-col items-center justify-center shadow-md">
              <span className="text-2xl">🌾</span>
              <span className="text-[10px] font-bold text-white tracking-wide mt-0.5">START</span>
            </div>
            <DownArrow />
          </div>

          {/* Phases */}
          {PHASES.map((phase, phaseIdx) => (
            <div key={phase.phase}>
              {/* Phase label */}
              <div className="flex flex-col items-center mb-4">
                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wide ${phase.color.bg} ${phase.color.text} ${phase.color.border}`}>
                  <span>{phase.emoji}</span> {phase.phase}
                </div>
              </div>

              {/* Two-column step cards for this phase */}
              <div className="relative grid sm:grid-cols-2 gap-4 mb-2">
                {/* Horizontal connector (desktop only) */}
                <div className="hidden sm:block absolute top-8 left-1/2 -translate-x-1/2 w-px h-4 -mt-4" />

                {phase.steps.map((step) => {
                  const Icon = step.icon
                  return (
                    <div
                      key={step.num}
                      className={`relative bg-white rounded-2xl border ${phase.color.border} p-5 flex flex-col gap-3`}
                    >
                      {/* Step number bubble */}
                      <div className="flex items-start gap-3">
                        <div className={`w-9 h-9 rounded-xl ${phase.color.badge} flex items-center justify-center shrink-0`}>
                          <Icon size={17} color="white" strokeWidth={2} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className={`text-[10px] font-bold ${phase.color.text} uppercase tracking-wide`}>
                              Step {step.num}
                            </span>
                          </div>
                          <h3 className="text-[15px] font-bold text-gray-900 leading-snug">
                            {step.emoji} {step.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                      <Link
                        to={step.route}
                        className={`self-start text-xs font-semibold ${phase.color.text} hover:underline`}
                      >
                        {step.linkLabel}
                      </Link>
                    </div>
                  )
                })}
              </div>

              {/* Down arrow between phases */}
              {phaseIdx < PHASES.length - 1 && (
                <div className="flex flex-col items-center my-2">
                  <DownArrow />
                </div>
              )}
            </div>
          ))}

          {/* Arrow to ACT */}
          <div className="flex flex-col items-center mt-2">
            <DownArrow />
            {/* ACT node */}
            <div className="w-24 h-24 rounded-full bg-gray-900 flex flex-col items-center justify-center shadow-md mt-0">
              <CheckCircle2 size={28} color="white" strokeWidth={1.8} />
              <span className="text-[11px] font-bold text-white tracking-wide mt-1">TAKE ACTION</span>
            </div>
            <p className="text-sm text-gray-500 mt-3 text-center max-w-xs">
              Use what you've learned to make the best decisions for your farm.
            </p>
          </div>
        </section>

        {/* ════ What should I do? ═════════════════════════════════════════ */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">What should I do?</h2>
          <p className="text-sm text-gray-500 mb-6">Find your situation below and open the right feature.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SITUATIONS.map((s) => (
              <div
                key={s.title}
                className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col gap-2 hover:border-[#15803D] hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{s.emoji}</span>
                  <span className="text-[13px] font-bold text-gray-800">{s.title}</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{s.tip}</p>
                <Link
                  to={s.route}
                  className="self-start mt-auto text-xs font-semibold text-[#15803D] hover:underline"
                >
                  {s.label} →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ════ Farmer tip ════════════════════════════════════════════════ */}
        <section>
          <div className="bg-[#EAF7EC] border border-green-200 rounded-2xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#15803D] flex items-center justify-center shrink-0">
              <Lightbulb size={18} color="white" strokeWidth={2} />
            </div>
            <div>
              <p className="text-sm font-bold text-[#15803D] mb-1">💡 Smart Farming Tip</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Check your crop regularly, watch the weather, follow your farm plan,
                and use the right fertilizer at the right stage. Small actions done at
                the right time make a big difference.
              </p>
            </div>
          </div>
        </section>

        {/* ════ Quick-start CTA ════════════════════════════════════════════ */}
        <section className="text-center pb-4">
          <p className="text-sm text-gray-500 mb-4">Ready to start? Begin with your crop.</p>
          <Link
            to="/crop-recommendation"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-sm font-semibold transition-colors"
          >
            <Sprout size={16} />
            Start with Crop Recommendation
          </Link>
        </section>

      </div>
    </div>
  )
}

// ─── Small reusable arrow ─────────────────────────────────────────────────────
function DownArrow() {
  return (
    <div className="flex flex-col items-center py-1" aria-hidden="true">
      <div className="w-px h-5 bg-gray-200" />
      <ArrowDown size={14} className="text-gray-300 -mt-0.5" />
    </div>
  )
}
