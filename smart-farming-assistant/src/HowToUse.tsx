import { Link } from 'react-router-dom'
import {
  MapPin, Sprout, Microscope, CloudSun, FlaskConical,
  CalendarRange, BookOpen, Bot, CheckCircle2, ArrowDown,
  ArrowRight, Lightbulb,
} from 'lucide-react'
import { useLanguage } from './context/LanguageContext'
import { tr, pickLang } from './lib/i18n'

export default function HowToUse() {
  const { lang } = useLanguage()

  const phases = [
    {
      phase: tr(lang, 'DISCOVER', 'खोजें', 'शोध'),
      emoji: '🌱',
      color: { bg: 'bg-green-50', border: 'border-green-200', badge: 'bg-green-600', text: 'text-green-700', line: 'bg-green-200' },
      steps: [
        {
          num: 1,
          icon: MapPin,
          emoji: '📍',
          title: tr(lang, 'Set Your Location', 'स्थान चुनें', 'स्थान निवडा'),
          desc: tr(lang, 'Choose your location so SmartFarm AI can give you useful local information.', 'अपने स्थान का चयन करें ताकि SmartFarm AI स्थानीय जानकारी दे सके।', 'स्थान निवडा जेणेकरून SmartFarm AI स्थानिक माहिती देऊ शकेल.'),
          route: '/weather',
          linkLabel: tr(lang, 'Check Weather →', 'मौसम देखें →', 'हवामान तपासा →'),
        },
        {
          num: 2,
          icon: Sprout,
          emoji: '🌱',
          title: tr(lang, 'Know Your Crop', 'अपनी फसल जानें', 'आपले पीक जाणून घ्या'),
          desc: tr(lang, 'Select your crop to get advice and recommendations for your farming needs.', 'खेती की जरूरतों के लिए उपयुक्त सलाह और सिफारिशें प्राप्त करें।', 'शेतीच्या गरजांसाठी योग्य सल्ला आणि शिफारसी मिळवा.'),
          route: '/crop-recommendation',
          linkLabel: tr(lang, 'Crop Recommendation →', 'फसल अनुशंसा →', 'पीक शिफारस →'),
        },
      ],
    },
    {
      phase: tr(lang, 'UNDERSTAND', 'समझें', 'समजून घ्या'),
      emoji: '🔍',
      color: { bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-600', text: 'text-blue-700', line: 'bg-blue-200' },
      steps: [
        {
          num: 3,
          icon: Microscope,
          emoji: '🩺',
          title: tr(lang, 'Check Crop Health', 'फसल स्वास्थ्य जांचें', 'पीक आरोग्य तपासा'),
          desc: tr(lang, 'Upload a photo of your crop leaves to check for diseases.', 'रोगों की जांच के लिए फसल की पत्तियों की फोटो अपलोड करें।', 'रोगांच्या तपासणीसाठी पिकांच्या पानांचा फोटो अपलोड करा.'),
          route: '/disease-detection',
          linkLabel: tr(lang, 'Disease Detection →', 'रोग पहचान →', 'रोग ओळख →'),
        },
        {
          num: 4,
          icon: CloudSun,
          emoji: '🌦️',
          title: tr(lang, 'Check the Weather', 'मौसम की जानकारी', 'हवामानाचा अंदाज घ्या'),
          desc: tr(lang, "See today's weather and upcoming conditions before going to the field.", 'खेत जाने से पहले आज का मौसम और आगामी परिस्थितियां देखें।', 'शेतात जाण्यापूर्वी आजचे हवामान आणि आगामी परिस्थिती पहा.'),
          route: '/weather',
          linkLabel: tr(lang, 'Weather →', 'मौसम →', 'हवामान →'),
        },
      ],
    },
    {
      phase: tr(lang, 'PLAN', 'योजना बनाएं', 'नियोजन करा'),
      emoji: '📅',
      color: { bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-600', text: 'text-amber-700', line: 'bg-amber-200' },
      steps: [
        {
          num: 5,
          icon: FlaskConical,
          emoji: '🧪',
          title: tr(lang, 'Check Fertilizer Needs', 'खाद की आवश्यकता', 'खतांची गरज तपासा'),
          desc: tr(lang, 'Enter your soil and crop details to get the right fertilizer advice.', 'सही खाद सलाह पाने के लिए अपनी मिट्टी और फसल विवरण दर्ज करें।', 'योग्य खतांचा सल्ला मिळवण्यासाठी माती व पिकाचा तपशील प्रविष्ट करा.'),
          route: '/fertilizer-advisor',
          linkLabel: tr(lang, 'Fertilizer Advisor →', 'खाद सलाहकार →', 'खत सल्लागार →'),
        },
        {
          num: 6,
          icon: CalendarRange,
          emoji: '📅',
          title: tr(lang, 'Plan Your Farm Work', 'खेती के काम की योजना', 'शेती कामाचे नियोजन'),
          desc: tr(lang, 'Follow your crop schedule and see which task needs to be done next.', 'फसल कार्यक्रम का पालन करें और देखें कि आगे क्या करना है।', 'पीक वेळापत्रकाचे पालन करा आणि पुढील काम तपासा.'),
          route: '/farm-planner',
          linkLabel: tr(lang, 'Farm Planner →', 'खेती योजनाकार →', 'शेती नियोजक →'),
        },
      ],
    },
    {
      phase: tr(lang, 'SUPPORT', 'सहायता', 'मदत व पाठबळ'),
      emoji: '🏛️',
      color: { bg: 'bg-purple-50', border: 'border-purple-200', badge: 'bg-purple-600', text: 'text-purple-700', line: 'bg-purple-200' },
      steps: [
        {
          num: 7,
          icon: BookOpen,
          emoji: '🏛️',
          title: tr(lang, 'Find Government Support', 'सरकारी सहायता खोजें', 'सरकारी मदत शोधा'),
          desc: tr(lang, 'Explore government schemes and agricultural support available for farmers.', 'किसानों के लिए उपलब्ध सरकारी योजनाओं और अनुदानों की जानकारी लें।', 'शेतकऱ्यांसाठी उपलब्ध शासकीय योजना व अनुदानांची माहिती मिळवा.'),
          route: '/government-schemes',
          linkLabel: tr(lang, 'Govt. Schemes →', 'सरकारी योजनाएं →', 'सरकारी योजना →'),
        },
        {
          num: 8,
          icon: Bot,
          emoji: '🤖',
          title: tr(lang, 'Ask SmartFarm AI', 'SmartFarm AI से पूछें', 'SmartFarm AI ला विचारा'),
          desc: tr(lang, 'Ask any farming question and get simple, practical guidance instantly.', 'खेती का कोई भी सवाल पूछें और तुरंत सरल मार्गदर्शन पाएं।', 'शेतीचा कोणताही प्रश्न विचारा आणि त्वरित मार्गदर्शन मिळवा.'),
          route: '/ai-assistant',
          linkLabel: tr(lang, 'AI Assistant →', 'एआई सहायक →', 'एआय सहाय्यक →'),
        },
      ],
    },
  ]

  const situations = [
    {
      emoji: '🌦️',
      title: tr(lang, 'Before farm work', 'खेत के काम से पहले', 'शेतात काम करण्यापूर्वी'),
      tip: tr(lang, 'Check the weather before going to the field.', 'खेत में जाने से पहले मौसम जरूर देखें।', 'शेतात जाण्यापूर्वी हवामान नक्की तपासा.'),
      route: '/weather',
      label: tr(lang, 'Open Weather', 'मौसम खोलें', 'हवामान उघडा'),
    },
    {
      emoji: '🩺',
      title: tr(lang, 'Crop looks unhealthy', 'फसल अस्वस्थ दिख रही है', 'पीक आजारी दिसत असल्यास'),
      tip: tr(lang, 'Use Disease Detection to check your crop.', 'फसल की जांच के लिए रोग पहचान टूल का उपयोग करें।', 'रोगांच्या तपासणीसाठी रोग ओळख वापरा.'),
      route: '/disease-detection',
      label: tr(lang, 'Open Disease Detection', 'रोग पहचान खोलें', 'रोग ओळख उघडा'),
    },
    {
      emoji: '🧪',
      title: tr(lang, 'Not sure about fertilizer', 'खाद के बारे में अनिश्चित हैं', 'खताबद्दल साशंक आहात'),
      tip: tr(lang, 'Open Fertilizer Advisor and enter your soil details.', 'खाद सलाहकार खोलें और मिट्टी का विवरण दर्ज करें।', 'खत सल्लागार उघडा आणि मातीची माहिती भरा.'),
      route: '/fertilizer-advisor',
      label: tr(lang, 'Open Fertilizer Advisor', 'खाद सलाहकार खोलें', 'खत सल्लागार उघडा'),
    },
    {
      emoji: '📅',
      title: tr(lang, 'Want your next task?', 'अगला कृषि कार्य जानना है?', 'पुढील काम जाणून घ्यायचे आहे?'),
      tip: tr(lang, 'Open Farm Planner and check your crop schedule.', 'खेती योजनाकार खोलें और फसल अनुसूची देखें।', 'शेती नियोजक उघडा आणि वेळापत्रक तपासा.'),
      route: '/farm-planner',
      label: tr(lang, 'Open Farm Planner', 'खेती योजनाकार खोलें', 'शेती नियोजक उघडा'),
    },
    {
      emoji: '🤔',
      title: tr(lang, 'Have a farming question?', 'खेती संबंधी सवाल है?', 'शेतीचा काही प्रश्न आहे?'),
      tip: tr(lang, 'Ask SmartFarm AI — it answers in your language.', 'SmartFarm AI से अपनी भाषा में तुरंत पूछें।', 'SmartFarm AI ला आपल्या भाषेत विचारा.'),
      route: '/ai-assistant',
      label: tr(lang, 'Ask AI', 'एआई से पूछें', 'एआयला विचारा'),
    },
  ]

  return (
    <div className="min-h-screen bg-[#f7faf5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-14">

        {/* ════ Header ════════════════════════════════════════════════════ */}
        <div className="text-center space-y-2">
          <p className="text-xs font-bold text-[#15803D] uppercase tracking-[0.18em]">
            {tr(lang, 'Guide', 'मार्गदर्शिका', 'मार्गदर्शिका')}
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            {tr(lang, 'How to Use SmartFarm AI', 'SmartFarm AI का उपयोग कैसे करें', 'SmartFarm AI कसे वापरावे')}
          </h1>
          <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            {tr(lang, 'Your simple guide to using SmartFarm AI for better farming decisions.', 'बेहतर कृषि निर्णयों के लिए SmartFarm AI का उपयोग करने की सरल मार्गदर्शिका।', 'चांगल्या शेती निर्णयांसाठी SmartFarm AI वापरण्याची सोपी मार्गदर्शिका.')}
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
              {tr(lang, '✅ ACT', '✅ कदम उठाएं', '✅ कृती करा')}
            </span>
          </div>
        </div>

        {/* ════ Main flowchart ════════════════════════════════════════════ */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-8 text-center">
            {tr(lang, '🌾 Your Smart Farming Journey', '🌾 आपकी स्मार्ट खेती यात्रा', '🌾 आपला स्मार्ट शेती प्रवास')}
          </h2>

          {/* START node */}
          <div className="flex flex-col items-center mb-2">
            <div className="w-20 h-20 rounded-full bg-[#15803D] flex flex-col items-center justify-center shadow-md">
              <span className="text-2xl">🌾</span>
              <span className="text-[10px] font-bold text-white tracking-wide mt-0.5">
                {tr(lang, 'START', 'आरंभ', 'सुरुवात')}
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
                              {pickLang(lang, {
                                en: `Step ${step.num}`,
                                hi: `चरण ${step.num}`,
                                mr: `टप्पा ${step.num}`,
                                gu: `પગલું ${step.num}`,
                                pa: `ਕਦਮ ${step.num}`,
                                ta: `படி ${step.num}`,
                                te: `దశ ${step.num}`,
                              })}
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
                {tr(lang, 'TAKE ACTION', 'कदम उठाएं', 'कृती करा')}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-3 text-center max-w-xs">
              {tr(lang, "Use what you've learned to make the best decisions for your farm.", 'अपने खेत के लिए सर्वोत्तम निर्णय लेने के लिए सीखी गई बातों का उपयोग करें।', 'आपल्या शेतीसाठी सर्वोत्तम निर्णय घेण्यासाठी मिळालेल्या ज्ञानाचा वापर करा.')}
            </p>
          </div>
        </section>

        {/* ════ What should I do? ═════════════════════════════════════════ */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {tr(lang, 'What should I do?', 'मुझे क्या करना चाहिए?', 'मी काय करावे?')}
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            {tr(lang, 'Find your situation below and open the right feature.', 'नीचे अपनी स्थिति देखें और उपयुक्त सुविधा का उपयोग करें।', 'खाली आपली परिस्थिती निवडा आणि योग्य साधन वापरा.')}
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
                {tr(lang, '💡 Smart Farming Tip', '💡 स्मार्ट कृषि सलाह', '💡 स्मार्ट शेती टीप')}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {tr(lang, 'Check your crop regularly, watch the weather, follow your farm plan, and use the right fertilizer at the right stage. Small actions done at the right time make a big difference.', 'अपनी फसल की नियमित जांच करें, मौसम पर नज़र रखें, खेत की योजना का पालन करें और सही अवस्था में उचित खाद डालें। सही समय पर किए गए छोटे कदम बड़ा बदलाव लाते हैं।', 'आपल्या पिकाची नियमित तपासणी करा, हवामानावर लक्ष ठेवा, शेती योजनेचे पालन करा आणि योग्य टप्प्यावर योग्य खत वापरा. योग्य वेळी केलेली छोटी कृती मोठा बदल घडवून आणते.')}
              </p>
            </div>
          </div>
        </section>

        {/* ════ Quick-start CTA ════════════════════════════════════════════ */}
        <section className="text-center pb-4">
          <p className="text-sm text-gray-500 mb-4">
            {tr(lang, 'Ready to start? Begin with your crop.', 'शुरुआत के लिए तैयार हैं? अपनी फसल से शुरुआत करें।', 'सुरू करण्यास तयार आहात? आपल्या पिकापासून सुरुवात करा.')}
          </p>
          <Link
            to="/crop-recommendation"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-sm font-semibold transition-colors"
          >
            <Sprout size={16} />
            {tr(lang, 'Start with Crop Recommendation', 'फसल अनुशंसा से शुरुआत करें', 'पीक शिफारसीपासून सुरुवात करा')}
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
