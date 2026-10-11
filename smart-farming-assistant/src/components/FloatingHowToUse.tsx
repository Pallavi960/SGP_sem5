import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { X, ArrowRight, BookOpenCheck } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function FloatingHowToUse() {
  const { lang } = useLanguage()
  const [open, setOpen]               = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const wrapperRef                    = useRef<HTMLDivElement>(null)

  const steps = [
    {
      emoji: '🌱',
      title: lang === 'hi' ? 'अपनी फसल चुनें' : lang === 'mr' ? 'आपले पीक निवडा' : 'Choose Your Crop',
      desc: lang === 'hi' ? 'अपनी आवश्यकताओं के अनुसार कृषि सलाह प्राप्त करें।' : lang === 'mr' ? 'शेतीच्या गरजांसाठी योग्य सल्ला मिळवा.' : 'Select your crop to get advice for your farming needs.',
      route: '/crop-recommendation'
    },
    {
      emoji: '📍',
      title: lang === 'hi' ? 'स्थान निर्धारित करें' : lang === 'mr' ? 'स्थान निश्चित करा' : 'Set Your Location',
      desc: lang === 'hi' ? 'स्थानीय जानकारी के लिए अपना स्थान चुनें।' : lang === 'mr' ? 'स्थानिक माहितीसाठी आपले स्थान निवडा.' : 'Choose your location for more useful local information.',
      route: '/weather'
    },
    {
      emoji: '🌦️',
      title: lang === 'hi' ? 'मौसम जांचें' : lang === 'mr' ? 'हवामान तपासा' : 'Check the Weather',
      desc: lang === 'hi' ? 'महत्वपूर्ण कृषि कार्यों से पहले मौसम देखें।' : lang === 'mr' ? 'महत्त्वाच्या कामांपूर्वी हवामान तपासा.' : 'Check weather conditions before important farm work.',
      route: '/weather'
    },
    {
      emoji: '🩺',
      title: lang === 'hi' ? 'रोग पहचानें' : lang === 'mr' ? 'रोग ओळखा' : 'Check Crop Health',
      desc: lang === 'hi' ? 'संभावित रोगों की जांच हेतु पत्ती की फोटो अपलोड करें।' : lang === 'mr' ? 'संभाव्य रोगांच्या तपासणीसाठी पानाचा फोटो अपलोड करा.' : 'Upload a crop photo to check for possible diseases.',
      route: '/disease-detection'
    },
    {
      emoji: '🧪',
      title: lang === 'hi' ? 'खाद सलाह' : lang === 'mr' ? 'खत सल्ला' : 'Check Fertilizer',
      desc: lang === 'hi' ? 'मिट्टी और फसल के अनुसार सही खाद की मात्रा जानें।' : lang === 'mr' ? 'माती व पिकाच्या आधारे योग्य खत प्रमाण जाणून घ्या.' : 'Get fertilizer guidance based on your soil and crop.',
      route: '/fertilizer-advisor'
    },
    {
      emoji: '📅',
      title: lang === 'hi' ? 'खेती योजना' : lang === 'mr' ? 'शेती नियोजन' : 'Plan Farm Work',
      desc: lang === 'hi' ? 'देखें कि आपके खेत में कब क्या काम करना है।' : lang === 'mr' ? 'आपल्या शेतात कधी काय काम करायचे ते पहा.' : 'See what needs to be done and when on your farm.',
      route: '/farm-planner'
    },
    {
      emoji: '🏛️',
      title: lang === 'hi' ? 'सरकारी योजनाएं' : lang === 'mr' ? 'सरकारी योजना' : 'Find Govt. Schemes',
      desc: lang === 'hi' ? 'किसानों के लिए उपलब्ध सरकारी लाभ और सहायता खोजें।' : lang === 'mr' ? 'शेतकऱ्यांसाठी शासकीय लाभ व योजना शोधा.' : 'Explore government support and schemes for farmers.',
      route: '/government-schemes'
    },
    {
      emoji: '🤖',
      title: lang === 'hi' ? 'एआई से पूछें' : lang === 'mr' ? 'एआयला विचारा' : 'Ask SmartFarm AI',
      desc: lang === 'hi' ? 'खेती का कोई भी सवाल पूछें और समाधान पाएं।' : lang === 'mr' ? 'शेतीचा कोणताही प्रश्न विचारा आणि मार्गदर्शन मिळवा.' : 'Ask any farming question and get simple guidance.',
      route: '/ai-assistant'
    },
    {
      emoji: '✅',
      title: lang === 'hi' ? 'कदम उठाएं' : lang === 'mr' ? 'कृती करा' : 'Take Action',
      desc: lang === 'hi' ? 'सीखे गए ज्ञान से बेहतर कृषि निर्णय लें।' : lang === 'mr' ? 'मिळालेल्या माहितीवरून योग्य शेती निर्णय घ्या.' : "Use what you've learned to make better farm decisions.",
      route: null
    },
  ]

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
            {lang === 'hi' ? 'कैसे उपयोग करें' : lang === 'mr' ? 'कसे वापरावे' : 'How to Use'}
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
              <span className="text-[13px] font-bold text-gray-900">
                {lang === 'hi' ? 'SmartFarm AI कैसे उपयोग करें' : lang === 'mr' ? 'SmartFarm AI कसे वापरावे' : 'How to Use SmartFarm AI'}
              </span>
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
            <p className="text-[11.5px] text-gray-400">
              {lang === 'hi'
                ? 'SmartFarm AI का सर्वोत्तम लाभ उठाने के लिए इन चरणों का पालन करें।'
                : lang === 'mr'
                ? 'SmartFarm AI चा पूर्ण लाभ घेण्यासाठी या सोप्या पायऱ्यांचे अनुसरण करा.'
                : 'Follow these simple steps to get the most from SmartFarm AI.'}
            </p>
          </div>

          {/* Steps — scrollable */}
          <div className="overflow-y-auto max-h-[min(68vh,420px)] px-3 pb-2">
            {steps.map((step, i) => (
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
                {i < steps.length - 1 && (
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
              {lang === 'hi' ? 'पूरी मार्गदर्शिका देखें' : lang === 'mr' ? 'संपूर्ण मार्गदर्शिका पहा' : 'View Full Guide'}
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
