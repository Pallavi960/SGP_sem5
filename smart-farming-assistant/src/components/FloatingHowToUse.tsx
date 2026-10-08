import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { X, ArrowRight, BookOpenCheck } from 'lucide-react'

// ── Step data ─────────────────────────────────────────────────────────────────
const STEPS = [
  { emoji: '🌱', title: 'Choose Your Crop',        desc: 'Select your crop to get advice for your farming needs.',           route: '/crop-recommendation' },
  { emoji: '📍', title: 'Set Your Location',        desc: 'Choose your location for more useful local information.',          route: '/weather' },
  { emoji: '🌦️', title: 'Check the Weather',        desc: 'Check weather conditions before important farm work.',            route: '/weather' },
  { emoji: '🩺', title: 'Check Crop Health',         desc: 'Upload a crop photo to check for possible diseases.',             route: '/disease-detection' },
  { emoji: '🧪', title: 'Check Fertilizer',          desc: 'Get fertilizer guidance based on your soil and crop.',           route: '/fertilizer-advisor' },
  { emoji: '📅', title: 'Plan Farm Work',            desc: 'See what needs to be done and when on your farm.',               route: '/farm-planner' },
  { emoji: '🏛️', title: 'Find Govt. Schemes',        desc: 'Explore government support and schemes for farmers.',            route: '/government-schemes' },
  { emoji: '🤖', title: 'Ask SmartFarm AI',          desc: 'Ask any farming question and get simple guidance.',              route: '/ai-assistant' },
  { emoji: '✅', title: 'Take Action',               desc: "Use what you've learned to make better farm decisions.",          route: null },
]

// ── Component ─────────────────────────────────────────────────────────────────
export default function FloatingHowToUse() {
  const [open, setOpen]               = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const wrapperRef                    = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  return (
    <div ref={wrapperRef} className="fixed top-[72px] right-5 z-[60] flex flex-col items-end gap-2">

      {/* ── Floating trigger button ─────────────────────────────────────── */}
      <div className="relative flex items-center justify-end">
        {/* Tooltip */}
        {showTooltip && !open && (
          <div className="absolute right-14 bg-gray-900 text-white text-[11px] font-semibold py-1.5 px-2.5 rounded-lg shadow-lg whitespace-nowrap pointer-events-none select-none">
            How to Use
            <span className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
          </div>
        )}

        <button
          onClick={() => setOpen((p) => !p)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          aria-label="How to Use SmartFarm AI"
          aria-expanded={open}
          className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
            open
              ? 'bg-gray-800 text-white'
              : 'bg-[#15803D] hover:bg-[#166534] text-white'
          }`}
          style={{
            boxShadow: open
              ? '0 4px 12px rgba(0,0,0,0.2)'
              : '0 6px 18px rgba(21,128,61,0.35)',
          }}
        >
          {open ? <X size={18} /> : <BookOpenCheck size={18} strokeWidth={2} />}
        </button>
      </div>

      {/* ── Help panel ──────────────────────────────────────────────────── */}
      {open && (
        <div
          role="dialog"
          aria-label="How to Use SmartFarm AI"
          className="w-[min(320px,calc(100vw-40px))] bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden"
          style={{ boxShadow: '0 20px 40px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)' }}
        >
          {/* Panel header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#f7faf5] border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-base leading-none">🌾</span>
              <span className="text-[13px] font-bold text-gray-900">How to Use SmartFarm AI</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X size={14} />
            </button>
          </div>

          {/* Subtitle */}
          <div className="px-4 pt-3 pb-1">
            <p className="text-[11.5px] text-gray-400">Follow these simple steps to get the most from SmartFarm AI.</p>
          </div>

          {/* Steps — scrollable */}
          <div className="overflow-y-auto max-h-[min(68vh,420px)] px-3 pb-2">
            {STEPS.map((step, i) => (
              <div key={i}>
                {step.route ? (
                  <Link
                    to={step.route}
                    onClick={() => setOpen(false)}
                    className="flex items-start gap-2.5 px-2 py-2.5 rounded-xl hover:bg-[#f0faf2] group transition-colors"
                  >
                    <span className="text-[15px] shrink-0 mt-0.5 leading-none">{step.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 leading-snug">
                        <span className="text-[12.5px] font-semibold text-gray-800 group-hover:text-[#15803D] transition-colors">
                          {i + 1}. {step.title}
                        </span>
                        <ArrowRight size={10} className="text-gray-300 group-hover:text-[#15803D] shrink-0 transition-colors" />
                      </div>
                      <p className="text-[11px] text-gray-500 leading-snug mt-0.5">{step.desc}</p>
                    </div>
                  </Link>
                ) : (
                  <div className="flex items-start gap-2.5 px-2 py-2.5 rounded-xl">
                    <span className="text-[15px] shrink-0 mt-0.5 leading-none">{step.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <span className="text-[12.5px] font-semibold text-gray-800 leading-snug">
                        {i + 1}. {step.title}
                      </span>
                      <p className="text-[11px] text-gray-500 leading-snug mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                )}

                {/* Connector line between steps */}
                {i < STEPS.length - 1 && (
                  <div className="pl-[18px] py-0.5" aria-hidden="true">
                    <div className="w-px h-2.5 bg-gray-100" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer — link to full guide */}
          <div className="px-3 py-2.5 border-t border-gray-100 bg-[#f7faf5]">
            <Link
              to="/how-to-use"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-white hover:bg-[#EAF7EC] border border-gray-200 hover:border-[#c8e6c9] text-[12px] font-semibold text-[#15803D] transition-colors"
            >
              View Full Guide
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
