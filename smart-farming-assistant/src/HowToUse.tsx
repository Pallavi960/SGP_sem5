import { Link } from 'react-router-dom'
import {
  MapPin, Sprout, Microscope, CloudSun, FlaskConical,
  CalendarRange, BookOpen, Bot, CheckCircle2, ArrowDown,
  ArrowRight, Lightbulb,
} from 'lucide-react'
import { useLanguage } from './context/LanguageContext'

export default function HowToUse() {
  const { lang } = useLanguage()

  const phases = [
    {
      phase: lang === 'hi' ? 'खोजें' : lang === 'mr' ? 'शोध' : 'DISCOVER',
      emoji: '🌱',
      color: { bg: 'bg-green-50', border: 'border-green-200', badge: 'bg-green-600', text: 'text-green-700', line: 'bg-green-200' },
      steps: [
        {
          num: 1,
          icon: MapPin,
          emoji: '📍',
          title: lang === 'hi' ? 'स्थान चुनें' : lang === 'mr' ? 'स्थान निवडा' : 'Set Your Location',
          desc: lang === 'hi'
            ? 'अपने स्थान का चयन करें ताकि SmartFarm AI स्थानीय जानकारी दे सके।'
            : lang === 'mr'
            ? 'स्थान निवडा जेणेकरून SmartFarm AI स्थानिक माहिती देऊ शकेल.'
            : 'Choose your location so SmartFarm AI can give you useful local information.',
          route: '/weather',
          linkLabel: lang === 'hi' ? 'मौसम देखें →' : lang === 'mr' ? 'हवामान तपासा →' : 'Check Weather →',
        },
        {
          num: 2,
          icon: Sprout,
          emoji: '🌱',
          title: lang === 'hi' ? 'अपनी फसल जानें' : lang === 'mr' ? 'आपले पीक जाणून घ्या' : 'Know Your Crop',
          desc: lang === 'hi'
            ? 'खेती की जरूरतों के लिए उपयुक्त सलाह और सिफारिशें प्राप्त करें।'
            : lang === 'mr'
            ? 'शेतीच्या गरजांसाठी योग्य सल्ला आणि शिफारसी मिळवा.'
            : 'Select your crop to get advice and recommendations for your farming needs.',
          route: '/crop-recommendation',
          linkLabel: lang === 'hi' ? 'फसल अनुशंसा →' : lang === 'mr' ? 'पीक शिफारस →' : 'Crop Recommendation →',
        },
      ],
    },
    {
      phase: lang === 'hi' ? 'समझें' : lang === 'mr' ? 'समजून घ्या' : 'UNDERSTAND',
      emoji: '🔍',
      color: { bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-600', text: 'text-blue-700', line: 'bg-blue-200' },
      steps: [
        {
          num: 3,
          icon: Microscope,
          emoji: '🩺',
          title: lang === 'hi' ? 'फसल स्वास्थ्य जांचें' : lang === 'mr' ? 'पीक आरोग्य तपासा' : 'Check Crop Health',
          desc: lang === 'hi'
            ? 'रोगों की जांच के लिए फसल की पत्तियों की फोटो अपलोड करें।'
            : lang === 'mr'
            ? 'रोगांच्या तपासणीसाठी पिकांच्या पानांचा फोटो अपलोड करा.'
            : 'Upload a photo of your crop leaves to check for diseases.',
          route: '/disease-detection',
          linkLabel: lang === 'hi' ? 'रोग पहचान →' : lang === 'mr' ? 'रोग ओळख →' : 'Disease Detection →',
        },
        {
          num: 4,
          icon: CloudSun,
          emoji: '🌦️',
          title: lang === 'hi' ? 'मौसम की जानकारी' : lang === 'mr' ? 'हवामानाचा अंदाज घ्या' : 'Check the Weather',
          desc: lang === 'hi'
            ? 'खेत जाने से पहले आज का मौसम और आगामी परिस्थितियां देखें।'
            : lang === 'mr'
            ? 'शेतात जाण्यापूर्वी आजचे हवामान आणि आगामी परिस्थिती पहा.'
            : "See today's weather and upcoming conditions before going to the field.",
          route: '/weather',
          linkLabel: lang === 'hi' ? 'मौसम →' : lang === 'mr' ? 'हवामान →' : 'Weather →',
        },
      ],
    },
    {
      phase: lang === 'hi' ? 'योजना बनाएं' : lang === 'mr' ? 'नियोजन करा' : 'PLAN',
      emoji: '📅',
      color: { bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-600', text: 'text-amber-700', line: 'bg-amber-200' },
      steps: [
        {
          num: 5,
          icon: FlaskConical,
          emoji: '🧪',
          title: lang === 'hi' ? 'खाद की आवश्यकता' : lang === 'mr' ? 'खतांची गरज तपासा' : 'Check Fertilizer Needs',
          desc: lang === 'hi'
            ? 'सही खाद सलाह पाने के लिए अपनी मिट्टी और फसल विवरण दर्ज करें।'
            : lang === 'mr'
            ? 'योग्य खतांचा सल्ला मिळवण्यासाठी माती व पिकाचा तपशील प्रविष्ट करा.'
            : 'Enter your soil and crop details to get the right fertilizer advice.',
          route: '/fertilizer-advisor',
          linkLabel: lang === 'hi' ? 'खाद सलाहकार →' : lang === 'mr' ? 'खत सल्लागार →' : 'Fertilizer Advisor →',
        },
        {
          num: 6,
          icon: CalendarRange,
          emoji: '📅',
          title: lang === 'hi' ? 'खेती के काम की योजना' : lang === 'mr' ? 'शेती कामाचे नियोजन' : 'Plan Your Farm Work',
          desc: lang === 'hi'
            ? 'फसल कार्यक्रम का पालन करें और देखें कि आगे क्या करना है।'
            : lang === 'mr'
            ? 'पीक वेळापत्रकाचे पालन करा आणि पुढील काम तपासा.'
            : 'Follow your crop schedule and see which task needs to be done next.',
          route: '/farm-planner',
          linkLabel: lang === 'hi' ? 'खेती योजनाकार →' : lang === 'mr' ? 'शेती नियोजक →' : 'Farm Planner →',
        },
      ],
    },
    {
      phase: lang === 'hi' ? 'सहायता' : lang === 'mr' ? 'मदत व पाठबळ' : 'SUPPORT',
      emoji: '🏛️',
      color: { bg: 'bg-purple-50', border: 'border-purple-200', badge: 'bg-purple-600', text: 'text-purple-700', line: 'bg-purple-200' },
      steps: [
        {
          num: 7,
          icon: BookOpen,
          emoji: '🏛️',
          title: lang === 'hi' ? 'सरकारी सहायता खोजें' : lang === 'mr' ? 'सरकारी मदत शोधा' : 'Find Government Support',
          desc: lang === 'hi'
            ? 'किसानों के लिए उपलब्ध सरकारी योजनाओं और अनुदानों की जानकारी लें।'
            : lang === 'mr'
            ? 'शेतकऱ्यांसाठी उपलब्ध शासकीय योजना व अनुदानांची माहिती मिळवा.'
            : 'Explore government schemes and agricultural support available for farmers.',
          route: '/government-schemes',
          linkLabel: lang === 'hi' ? 'सरकारी योजनाएं →' : lang === 'mr' ? 'सरकारी योजना →' : 'Govt. Schemes →',
        },
        {
          num: 8,
          icon: Bot,
          emoji: '🤖',
          title: lang === 'hi' ? 'SmartFarm AI से पूछें' : lang === 'mr' ? 'SmartFarm AI ला विचारा' : 'Ask SmartFarm AI',
          desc: lang === 'hi'
            ? 'खेती का कोई भी सवाल पूछें और तुरंत सरल मार्गदर्शन पाएं।'
            : lang === 'mr'
            ? 'शेतीचा कोणताही प्रश्न विचारा आणि त्वरित मार्गदर्शन मिळवा.'
            : 'Ask any farming question and get simple, practical guidance instantly.',
          route: '/ai-assistant',
          linkLabel: lang === 'hi' ? 'एआई सहायक →' : lang === 'mr' ? 'एआय सहाय्यक →' : 'AI Assistant →',
        },
      ],
    },
  ]

  const situations = [
    {
      emoji: '🌦️',
      title: lang === 'hi' ? 'खेत के काम से पहले' : lang === 'mr' ? 'शेतात काम करण्यापूर्वी' : 'Before farm work',
      tip: lang === 'hi' ? 'खेत में जाने से पहले मौसम जरूर देखें।' : lang === 'mr' ? 'शेतात जाण्यापूर्वी हवामान नक्की तपासा.' : 'Check the weather before going to the field.',
      route: '/weather',
      label: lang === 'hi' ? 'मौसम खोलें' : lang === 'mr' ? 'हवामान उघडा' : 'Open Weather',
    },
    {
      emoji: '🩺',
      title: lang === 'hi' ? 'फसल अस्वस्थ दिख रही है' : lang === 'mr' ? 'पीक आजारी दिसत असल्यास' : 'Crop looks unhealthy',
      tip: lang === 'hi' ? 'फसल की जांच के लिए रोग पहचान टूल का उपयोग करें।' : lang === 'mr' ? 'रोगांच्या तपासणीसाठी रोग ओळख वापरा.' : 'Use Disease Detection to check your crop.',
      route: '/disease-detection',
      label: lang === 'hi' ? 'रोग पहचान खोलें' : lang === 'mr' ? 'रोग ओळख उघडा' : 'Open Disease Detection',
    },
    {
      emoji: '🧪',
      title: lang === 'hi' ? 'खाद के बारे में अनिश्चित हैं' : lang === 'mr' ? 'खताबद्दल साशंक आहात' : 'Not sure about fertilizer',
      tip: lang === 'hi' ? 'खाद सलाहकार खोलें और मिट्टी का विवरण दर्ज करें।' : lang === 'mr' ? 'खत सल्लागार उघडा आणि मातीची माहिती भरा.' : 'Open Fertilizer Advisor and enter your soil details.',
      route: '/fertilizer-advisor',
      label: lang === 'hi' ? 'खाद सलाहकार खोलें' : lang === 'mr' ? 'खत सल्लागार उघडा' : 'Open Fertilizer Advisor',
    },
    {
      emoji: '📅',
      title: lang === 'hi' ? 'अगला कृषि कार्य जानना है?' : lang === 'mr' ? 'पुढील काम जाणून घ्यायचे आहे?' : 'Want your next task?',
      tip: lang === 'hi' ? 'खेती योजनाकार खोलें और फसल अनुसूची देखें।' : lang === 'mr' ? 'शेती नियोजक उघडा आणि वेळापत्रक तपासा.' : 'Open Farm Planner and check your crop schedule.',
      route: '/farm-planner',
      label: lang === 'hi' ? 'खेती योजनाकार खोलें' : lang === 'mr' ? 'शेती नियोजक उघडा' : 'Open Farm Planner',
    },
    {
      emoji: '🤔',
      title: lang === 'hi' ? 'खेती संबंधी सवाल है?' : lang === 'mr' ? 'शेतीचा काही प्रश्न आहे?' : 'Have a farming question?',
      tip: lang === 'hi' ? 'SmartFarm AI से अपनी भाषा में तुरंत पूछें।' : lang === 'mr' ? 'SmartFarm AI ला आपल्या भाषेत विचारा.' : 'Ask SmartFarm AI — it answers in your language.',
      route: '/ai-assistant',
      label: lang === 'hi' ? 'एआई से पूछें' : lang === 'mr' ? 'एआयला विचारा' : 'Ask AI',
    },
  ]

  return (
    <div className="min-h-screen bg-[#f7faf5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-14">

        {/* ════ Header ════════════════════════════════════════════════════ */}
        <div className="text-center space-y-2">
          <p className="text-xs font-bold text-[#15803D] uppercase tracking-[0.18em]">
            {lang === 'hi' ? 'मार्गदर्शिका' : lang === 'mr' ? 'मार्गदर्शिका' : 'Guide'}
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            {lang === 'hi' ? 'SmartFarm AI का उपयोग कैसे करें' : lang === 'mr' ? 'SmartFarm AI कसे वापरावे' : 'How to Use SmartFarm AI'}
          </h1>
          <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'बेहतर कृषि निर्णयों के लिए SmartFarm AI का उपयोग करने की सरल मार्गदर्शिका।'
              : lang === 'mr'
              ? 'चांगल्या शेती निर्णयांसाठी SmartFarm AI वापरण्याची सोपी मार्गदर्शिका.'
              : 'Your simple guide to using SmartFarm AI for better farming decisions.'}
          </p>
        </div>

        {/* ════ Phase legend strip ════════════════════════════════════════ */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          {phases.map((p, i) => (
            <div key={p.phase} className="flex items-center gap-1.5">
              <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${p.color.bg} ${p.color.text} border ${p.color.border}`}>
                {p.emoji} {p.phase}
              </span>
              {i < phases.length - 1 && (
                <ArrowRight size={13} className="text-gray-300 hidden sm:block" />
              )}
            </div>
          ))}
          <div className="flex items-center gap-1.5">
            <ArrowRight size={13} className="text-gray-300 hidden sm:block" />
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
              {lang === 'hi' ? '✅ कदम उठाएं' : lang === 'mr' ? '✅ कृती करा' : '✅ ACT'}
            </span>
          </div>
        </div>

        {/* ════ Main flowchart ════════════════════════════════════════════ */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-8 text-center">
            {lang === 'hi' ? '🌾 आपकी स्मार्ट खेती यात्रा' : lang === 'mr' ? '🌾 आपला स्मार्ट शेती प्रवास' : '🌾 Your Smart Farming Journey'}
          </h2>

          {/* START node */}
          <div className="flex flex-col items-center mb-2">
            <div className="w-20 h-20 rounded-full bg-[#15803D] flex flex-col items-center justify-center shadow-md">
              <span className="text-2xl">🌾</span>
              <span className="text-[10px] font-bold text-white tracking-wide mt-0.5">
                {lang === 'hi' ? 'आरंभ' : lang === 'mr' ? 'सुरुवात' : 'START'}
              </span>
            </div>
            <DownArrow />
          </div>

          {/* Phases */}
          {phases.map((phase, phaseIdx) => (
            <div key={phase.phase}>
              {/* Phase label */}
              <div className="flex flex-col items-center mb-4">
                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wide ${phase.color.bg} ${phase.color.text} ${phase.color.border}`}>
                  <span>{phase.emoji}</span> {phase.phase}
                </div>
              </div>

              {/* Two-column step cards for this phase */}
              <div className="relative grid sm:grid-cols-2 gap-4 mb-2">
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
                              {lang === 'hi' ? `चरण ${step.num}` : lang === 'mr' ? `टप्पा ${step.num}` : `Step ${step.num}`}
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
              {phaseIdx < phases.length - 1 && (
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
              <span className="text-[11px] font-bold text-white tracking-wide mt-1">
                {lang === 'hi' ? 'कदम उठाएं' : lang === 'mr' ? 'कृती करा' : 'TAKE ACTION'}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-3 text-center max-w-xs">
              {lang === 'hi'
                ? 'अपने खेत के लिए सर्वोत्तम निर्णय लेने के लिए सीखी गई बातों का उपयोग करें।'
                : lang === 'mr'
                ? 'आपल्या शेतीसाठी सर्वोत्तम निर्णय घेण्यासाठी मिळालेल्या ज्ञानाचा वापर करा.'
                : "Use what you've learned to make the best decisions for your farm."}
            </p>
          </div>
        </section>

        {/* ════ What should I do? ═════════════════════════════════════════ */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {lang === 'hi' ? 'मुझे क्या करना चाहिए?' : lang === 'mr' ? 'मी काय करावे?' : 'What should I do?'}
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            {lang === 'hi'
              ? 'नीचे अपनी स्थिति देखें और उपयुक्त सुविधा का उपयोग करें।'
              : lang === 'mr'
              ? 'खाली आपली परिस्थिती निवडा आणि योग्य साधन वापरा.'
              : 'Find your situation below and open the right feature.'}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {situations.map((s) => (
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
              <p className="text-sm font-bold text-[#15803D] mb-1">
                {lang === 'hi' ? '💡 स्मार्ट कृषि सलाह' : lang === 'mr' ? '💡 स्मार्ट शेती टीप' : '💡 Smart Farming Tip'}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {lang === 'hi'
                  ? 'अपनी फसल की नियमित जांच करें, मौसम पर नज़र रखें, खेत की योजना का पालन करें और सही अवस्था में उचित खाद डालें। सही समय पर किए गए छोटे कदम बड़ा बदलाव लाते हैं।'
                  : lang === 'mr'
                  ? 'आपल्या पिकाची नियमित तपासणी करा, हवामानावर लक्ष ठेवा, शेती योजनेचे पालन करा आणि योग्य टप्प्यावर योग्य खत वापरा. योग्य वेळी केलेली छोटी कृती मोठा बदल घडवून आणते.'
                  : 'Check your crop regularly, watch the weather, follow your farm plan, and use the right fertilizer at the right stage. Small actions done at the right time make a big difference.'}
              </p>
            </div>
          </div>
        </section>

        {/* ════ Quick-start CTA ════════════════════════════════════════════ */}
        <section className="text-center pb-4">
          <p className="text-sm text-gray-500 mb-4">
            {lang === 'hi' ? 'शुरुआत के लिए तैयार हैं? अपनी फसल से शुरुआत करें।' : lang === 'mr' ? 'सुरू करण्यास तयार आहात? आपल्या पिकापासून सुरुवात करा.' : 'Ready to start? Begin with your crop.'}
          </p>
          <Link
            to="/crop-recommendation"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-sm font-semibold transition-colors"
          >
            <Sprout size={16} />
            {lang === 'hi' ? 'फसल अनुशंसा से शुरुआत करें' : lang === 'mr' ? 'पीक शिफारसीपासून सुरुवात करा' : 'Start with Crop Recommendation'}
          </Link>
        </section>

      </div>
    </div>
  )
}

function DownArrow() {
  return (
    <div className="flex flex-col items-center py-1" aria-hidden="true">
      <div className="w-px h-5 bg-gray-200" />
      <ArrowDown size={14} className="text-gray-300 -mt-0.5" />
    </div>
  )
}
