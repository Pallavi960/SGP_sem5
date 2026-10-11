import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight, ChevronDown, Bot, Microscope, Sprout, CloudSun,
  TrendingUp, BookOpen, Wheat, CheckCircle2,
  FlaskConical, CalendarRange, Users, Target, Lightbulb, ShieldCheck,
} from 'lucide-react'
import FarmingIllustration from './FarmingIllustration'
import DashboardPreview from './DashboardPreview'
import WhySmartFarming from './WhySmartFarming'
import { useLanguage } from './context/LanguageContext'

const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
}
const heroItem = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

export default function Home() {
  const { lang } = useLanguage()

  const stats = [
    { value: '10K+', label: lang === 'hi' ? 'किसान लाभान्वित' : lang === 'mr' ? 'शेतकरी लाभान्वित' : 'Farmers Helped' },
    { value: '95%', label: lang === 'hi' ? 'सटीकता दर' : lang === 'mr' ? 'अचूकता दर' : 'Accuracy Rate' },
    { value: '50+', label: lang === 'hi' ? 'फसल किस्में' : lang === 'mr' ? 'पिकांच्या जाती' : 'Crop Varieties' },
    { value: '24/7', label: lang === 'hi' ? 'एआई सहायता' : lang === 'mr' ? 'एआय मदत' : 'AI Support' },
  ]

  const howToSteps = [
    {
      step: 1,
      icon: Wheat,
      title: lang === 'hi' ? 'अपनी फसल चुनें' : lang === 'mr' ? 'आपले पीक निवडा' : 'Select Your Crop',
      desc: lang === 'hi' ? 'फसल अनुशंसा पेज से अपनी फसल का चयन करें।' : lang === 'mr' ? 'पीक शिफारस पृष्ठावरून आपल्या पिकाची निवड करा.' : 'Choose your crop from the Crop Recommendation page.',
      color: 'text-green-700',
      bg: 'bg-green-50',
      border: 'border-green-200',
      dot: 'bg-green-500',
    },
    {
      step: 2,
      icon: CloudSun,
      title: lang === 'hi' ? 'मौसम की जांच करें' : lang === 'mr' ? 'हवामान तपासा' : 'Check Your Weather',
      desc: lang === 'hi' ? 'अपने खेत के स्थान के अनुसार वर्तमान मौसम देखें।' : lang === 'mr' ? 'आपल्या शेताच्या स्थानानुसार सध्याचे हवामान पहा.' : 'See current weather conditions for your farm location.',
      color: 'text-sky-700',
      bg: 'bg-sky-50',
      border: 'border-sky-200',
      dot: 'bg-sky-500',
    },
    {
      step: 3,
      icon: Sprout,
      title: lang === 'hi' ? 'सटीक सलाह प्राप्त करें' : lang === 'mr' ? 'अचूक सल्ला मिळवा' : 'Get Recommendations',
      desc: lang === 'hi' ? 'अपने खेत के अनुकूल फसल और खाद की सिफारिशें पाएं।' : lang === 'mr' ? 'आपल्या शेतासाठी अनुकूल पीक आणि खतांच्या शिफारसी मिळवा.' : 'Receive crop and fertilizer advice tailored to your field.',
      color: 'text-emerald-700',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      dot: 'bg-emerald-500',
    },
    {
      step: 4,
      icon: Bot,
      title: lang === 'hi' ? 'कृषि कार्य योजना बनाएं' : lang === 'mr' ? 'शेती कामांचे नियोजन करा' : 'Plan Farm Tasks',
      desc: lang === 'hi' ? 'अपनी खेती का कार्यक्रम तैयार करने के लिए फार्म प्लानर का उपयोग करें।' : lang === 'mr' ? 'शेतीचे वेळापत्रक तयार करण्यासाठी फार्म प्लॅनर वापरा.' : 'Use the Farm Planner to create your farming schedule.',
      color: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      dot: 'bg-amber-500',
    },
    {
      step: 5,
      icon: CheckCircle2,
      title: lang === 'hi' ? 'कार्यों को ट्रैक करें' : lang === 'mr' ? 'कामांचा मागोवा घ्या' : 'Track Your Tasks',
      desc: lang === 'hi' ? 'दिन-प्रतिदिन पूरे किए गए कार्यों को मार्क करें।' : lang === 'mr' ? 'दररोज पूर्ण झालेली कामे पूर्ण म्हणून नोंदवा.' : 'Mark tasks done as you complete them day by day.',
      color: 'text-teal-700',
      bg: 'bg-teal-50',
      border: 'border-teal-200',
      dot: 'bg-teal-500',
    },
  ]

  const featureItems = [
    { icon: Bot, label: lang === 'hi' ? 'एआई सहायक' : lang === 'mr' ? 'एआय सहाय्यक' : 'AI Assistant', to: '/ai-assistant' },
    { icon: Microscope, label: lang === 'hi' ? 'रोग पहचान' : lang === 'mr' ? 'रोग ओळख' : 'Disease Detection', to: '/disease-detection' },
    { icon: Sprout, label: lang === 'hi' ? 'फसल अनुशंसा' : lang === 'mr' ? 'पीक शिफारस' : 'Crop Recommendation', to: '/crop-recommendation' },
    { icon: CloudSun, label: lang === 'hi' ? 'मौसम अपडेट' : lang === 'mr' ? 'हवामान अंदाज' : 'Weather Updates', to: '/weather' },
    { icon: TrendingUp, label: lang === 'hi' ? 'मंडी भाव' : lang === 'mr' ? 'बाजारभाव' : 'Market Prices', to: '/features' },
    { icon: BookOpen, label: lang === 'hi' ? 'सरकारी योजनाएं' : lang === 'mr' ? 'सरकारी योजना' : 'Govt. Schemes', to: '/government-schemes' },
  ]

  const aboutFeatures = [
    { icon: Microscope, label: lang === 'hi' ? 'रोग पहचान' : lang === 'mr' ? 'रोग ओळख' : 'Disease Detection', route: '/disease-detection', desc: lang === 'hi' ? 'पत्ती की फोटो अपलोड कर तुरंत बीमारी और उपचार जानें।' : lang === 'mr' ? 'पानाचा फोटो अपलोड करून रोग व उपाय त्वरित जाणून घ्या.' : 'Upload a crop photo to identify diseases and get treatment advice instantly.' },
    { icon: Sprout, label: lang === 'hi' ? 'फसल अनुशंसा' : lang === 'mr' ? 'पीक शिफारस' : 'Crop Recommendation', route: '/crop-recommendation', desc: lang === 'hi' ? 'मिट्टी, मौसम और क्षेत्र के अनुसार अनुकूल फसल सुझाव।' : lang === 'mr' ? 'माती, हंगाम आणि क्षेत्रानुसार योग्य पिकांचे मार्गदर्शन.' : 'Get crop suggestions matched to your soil, season, and location.' },
    { icon: CloudSun, label: lang === 'hi' ? 'मौसम पूर्वानुमान' : lang === 'mr' ? 'हवामान अंदाज' : 'Weather Forecast', route: '/weather', desc: lang === 'hi' ? 'खेत जाने से पहले सटीक मौसम स्थिति देखें।' : lang === 'mr' ? 'शेतात जाण्यापूर्वी अचूक हवामान स्थिती तपासा.' : 'Check real-time weather conditions before going to the field.' },
    { icon: FlaskConical, label: lang === 'hi' ? 'खाद सलाहकार' : lang === 'mr' ? 'खत सल्लागार' : 'Fertilizer Advisor', route: '/fertilizer-advisor', desc: lang === 'hi' ? 'मिट्टी विवरण दर्ज करें और खाद का सही संतुलन पाएं।' : lang === 'mr' ? 'मातीची माहिती भरा आणि खतांचा योग्य डोस मिळवा.' : 'Enter your soil details and get the right fertilizer guidance.' },
    { icon: CalendarRange, label: lang === 'hi' ? 'खेती योजनाकार' : lang === 'mr' ? 'शेती नियोजक' : 'Farm Planner', route: '/farm-planner', desc: lang === 'hi' ? 'बुवाई से कटाई तक हर कृषि गतिविधि की योजना बनाएं।' : lang === 'mr' ? 'पेरणीपासून कापणीपर्यंत प्रत्येक शेती कामाचे नियोजन करा.' : 'Plan and track every farm activity from sowing to harvest.' },
    { icon: BookOpen, label: lang === 'hi' ? 'सरकारी योजनाएं' : lang === 'mr' ? 'सरकारी योजना' : 'Govt. Schemes', route: '/government-schemes', desc: lang === 'hi' ? 'किसानों के लिए उपलब्ध सरकारी योजनाओं की जानकारी।' : lang === 'mr' ? 'शेतकऱ्यांसाठी उपलब्ध शासकीय योजनांची माहिती.' : 'Explore government schemes and agricultural support available for farmers.' },
    { icon: Bot, label: lang === 'hi' ? 'एआई सहायक' : lang === 'mr' ? 'एआय सहाय्यक' : 'AI Assistant', route: '/ai-assistant', desc: lang === 'hi' ? 'अपनी भाषा में कोई भी कृषि प्रश्न पूछें और मार्गदर्शन पाएं।' : lang === 'mr' ? 'आपल्या भाषेत कोणताही शेती प्रश्न विचारा आणि सल्ला मिळवा.' : 'Ask any farming question in your language and get practical guidance.' },
  ]
  return (
    <div className="bg-white overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative min-h-[calc(100vh-64px)] flex items-center overflow-hidden">

        {/* Ambient blobs */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#E8F5E9] blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-24 -right-24 w-[500px] h-[500px] rounded-full bg-[#F1F8E9] blur-3xl pointer-events-none"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left */}
            <motion.div
              variants={heroContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-6"
            >
              {/* Badge */}
              <motion.div variants={heroItem} className="self-start">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F5E9] border border-[#A5D6A7] text-[#2E7D32] text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#4CAF50] animate-pulse" />
                  {lang === 'hi' ? 'एआई-संचालित कृषि मंच' : lang === 'mr' ? 'एआय-संचालित कृषी मंच' : 'AI-Powered Agriculture Platform'}
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                variants={heroItem}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1F2937] leading-[1.1] tracking-tight"
              >
                {lang === 'hi' ? 'एआई-आधारित ' : lang === 'mr' ? 'एआय-आधारित ' : 'AI-Based '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#2E7D32]">
                    {lang === 'hi' ? 'स्मार्ट कृषि' : lang === 'mr' ? 'स्मार्ट शेती' : 'Smart Farming'}
                  </span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute bottom-1 left-0 right-0 h-3 bg-[#E8F5E9] -z-0 origin-left rounded-sm"
                  />
                </span>{' '}
                {lang === 'hi' ? 'सहायक' : lang === 'mr' ? 'सहाय्यक' : 'Assistant'}
              </motion.h1>

              {/* Subtitle */}
              <motion.p variants={heroItem} className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-lg">
                {lang === 'hi' ? (
                  <>
                    <span className="text-[#2E7D32] font-semibold">कृत्रिम बुद्धिमत्ता (AI)</span> की सहायता से किसानों को बेहतर कृषि निर्णय लेने में सक्षम बनाना। फसल स्वास्थ्य से लेकर मौसम पूर्वानुमान तक — सब कुछ एक ही स्थान पर।
                  </>
                ) : lang === 'mr' ? (
                  <>
                    <span className="text-[#2E7D32] font-semibold">कृत्रिम बुद्धिमत्ता (AI)</span> च्या मदतीने शेतकऱ्यांना अधिक सक्षम शेती निर्णय घेण्यास मदत. पिकांच्या आरोग्यापासून हवामानाच्या अंदाजापर्यंत — सर्व एकाच ठिकाणी.
                  </>
                ) : (
                  <>
                    Helping farmers make smarter farming decisions using{' '}
                    <span className="text-[#2E7D32] font-semibold">Artificial Intelligence</span>.
                    From crop health to weather forecasts — all in one place.
                  </>
                )}
              </motion.p>

              {/* Buttons */}
              <motion.div variants={heroItem} className="flex flex-wrap gap-4">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/features"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#2E7D32] text-white text-sm font-semibold rounded-xl shadow-lg shadow-green-900/20 hover:bg-[#1B5E20] hover:shadow-xl hover:shadow-green-900/25 transition-all duration-200"
                  >
                    {lang === 'hi' ? 'सुविधाएं देखें' : lang === 'mr' ? 'वैशिष्ट्ये पहा' : 'Explore Features'} <ArrowRight size={16} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <a
                    href="#about"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#2E7D32] text-sm font-semibold rounded-xl border-2 border-[#A5D6A7] hover:bg-[#E8F5E9] hover:border-[#2E7D32] transition-all duration-200"
                  >
                    {lang === 'hi' ? 'अधिक जानें' : lang === 'mr' ? 'अधिक जाणून घ्या' : 'Learn More'}
                  </a>
                </motion.div>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={heroItem}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-100"
              >
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                    className="flex flex-col gap-0.5"
                  >
                    <span className="text-2xl font-extrabold text-[#2E7D32]">{s.value}</span>
                    <span className="text-xs text-gray-400 font-medium">{s.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="w-full"
            >
              <FarmingIllustration />
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-300 select-none"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase font-medium">
            {lang === 'hi' ? 'नीचे देखें' : lang === 'mr' ? 'खाली पहा' : 'Scroll'}
          </span>
          <ChevronDown size={17} />
        </motion.div>
      </section>

      {/* ── Dashboard Preview ── */}
      <DashboardPreview />

      {/* ── Why Smart Farming ── */}
      <WhySmartFarming />

      {/* ── Features Strip ── */}
      <section className="bg-[#F9FBF9] border-y border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-10"
          >
            {lang === 'hi' ? 'आधुनिक किसान की हर आवश्यकता' : lang === 'mr' ? 'आधुनिक शेतकऱ्यांची प्रत्येक गरज' : 'Everything a modern farmer needs'}
          </motion.p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {featureItems.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  whileHover={{ y: -5, scale: 1.03, transition: { duration: 0.18 } }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    to={item.to}
                    className="flex flex-col items-center gap-3 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#A5D6A7] transition-all duration-200 cursor-pointer group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#E8F5E9] flex items-center justify-center group-hover:bg-[#2E7D32] transition-colors duration-200">
                      <Icon size={20} className="text-[#2E7D32] group-hover:text-white transition-colors duration-200" />
                    </div>
                    <span className="text-xs font-semibold text-gray-600 text-center group-hover:text-[#2E7D32] transition-colors duration-200">
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
      {/* ── About SmartFarm AI ── */}
      <section id="about" className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          {/* ── What is SmartFarm AI ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="grid lg:grid-cols-2 gap-10 items-center"
          >
            <div className="space-y-4">
              <span className="inline-block text-xs font-bold text-[#15803D] uppercase tracking-[0.18em]">
                {lang === 'hi' ? 'SmartFarm AI के बारे में' : lang === 'mr' ? 'SmartFarm AI बद्दल' : 'About SmartFarm AI'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                {lang === 'hi' ? 'SmartFarm AI क्या है?' : lang === 'mr' ? 'SmartFarm AI काय आहे?' : 'What is SmartFarm AI?'}
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                {lang === 'hi'
                  ? 'SmartFarm AI भारतीय किसानों के लिए विकसित एक कृत्रिम बुद्धिमत्ता (AI) डिजिटल सहायक है। यह फसल रोग पहचान, मौसम पूर्वानुमान, खाद सलाह, कृषि नियोजन और सरकारी योजनाओं को एक मंच पर लाता है।'
                  : lang === 'mr'
                  ? 'SmartFarm AI हे भारतीय शेतकऱ्यांसाठी तयार केलेले एआय-चालित डिजिटल सहाय्यक आहे. हे पीक रोग निदान, हवामान अंदाज, खत सल्ला, शेती नियोजन आणि शासकीय योजना एकाच सोप्या व्यासपीठावर आणते.'
                  : 'SmartFarm AI is an AI-powered digital assistant built for Indian farmers. It brings together crop health detection, weather forecasts, fertilizer advice, farm planning, and government scheme information into one simple, easy-to-use platform.'}
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                {lang === 'hi'
                  ? 'चाहे आप छोटे किसान हों या बड़े खेत का प्रबंधन कर रहे हों, SmartFarm AI आपको सही समय पर सटीक जानकारी — आपकी अपनी भाषा में उपलब्ध कराता है।'
                  : lang === 'mr'
                  ? 'तुम्ही अल्पभूधारक शेतकरी असा किंवा मोठ्या शेतीचे व्यवस्थापन करत असा, SmartFarm AI तुम्हाला योग्य वेळी योग्य माहिती — तुमच्या स्वतःच्या भाषेत देते.'
                  : 'Whether you are a smallholder farmer or managing a large farm, SmartFarm AI gives you the right information at the right time — in your own language.'}
              </p>
            </div>

            {/* Problem → Solution */}
            <div className="space-y-3">
              {[
                {
                  icon: Target,
                  color: 'text-red-600',
                  bg: 'bg-red-50',
                  border: 'border-red-100',
                  label: lang === 'hi' ? 'समस्या' : lang === 'mr' ? 'समस्या' : 'The Problem',
                  text: lang === 'hi'
                    ? 'किसानों को अक्सर विशेषज्ञ सलाह, रीयल-टाइम मौसम डेटा या फसल स्वास्थ्य जानकारी के अभाव में महत्वपूर्ण निर्णय लेने पड़ते हैं।'
                    : lang === 'mr'
                    ? 'शेतकऱ्यांना तज्ज्ञ सल्ला, रिअल-टाइम हवामान किंवा पीक आरोग्याच्या माहितीशिवाय महत्त्वाचे निर्णय घ्यावे लागतात.'
                    : 'Farmers make critical decisions without access to expert advice, real-time weather data, or crop health information.',
                },
                {
                  icon: Lightbulb,
                  color: 'text-amber-600',
                  bg: 'bg-amber-50',
                  border: 'border-amber-100',
                  label: lang === 'hi' ? 'समाधान' : lang === 'mr' ? 'उपाय' : 'The Solution',
                  text: lang === 'hi'
                    ? 'SmartFarm AI सीधे हर किसान के मोबाइल पर एआई-संचालित मार्गदर्शन लाता है — सरल, निःशुल्क और हमेशा उपलब्ध।'
                    : lang === 'mr'
                    ? 'SmartFarm AI थेट प्रत्येक शेतकऱ्याच्या मोबाईलवर एआय मार्गदर्शन पुरवते — सोपे, मोफत आणि सदैव उपलब्ध.'
                    : "SmartFarm AI brings AI-powered guidance directly to every farmer's phone — simple, free, and available anytime.",
                },
                {
                  icon: ShieldCheck,
                  color: 'text-green-700',
                  bg: 'bg-green-50',
                  border: 'border-green-100',
                  label: lang === 'hi' ? 'परिणाम' : lang === 'mr' ? 'परिणाम' : 'The Result',
                  text: lang === 'hi'
                    ? 'फसलों का बेहतर स्वास्थ्य, नुकसान में भारी कमी, संसाधनों का कुशल उपयोग और प्रत्येक मौसम में लाभप्रद निर्णय।'
                    : lang === 'mr'
                    ? 'उत्तम पीक आरोग्य, नुकसानीत मोठी घट, साधनांचा कार्यक्षम वापर आणि प्रत्येक हंगामात अधिक नफा.'
                    : 'Better crop health, reduced losses, smarter resource use, and more informed farming decisions every season.',
                },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className={`flex gap-3 p-4 rounded-xl border ${item.bg} ${item.border}`}>
                    <div className={`shrink-0 mt-0.5 ${item.color}`}><Icon size={18} strokeWidth={2} /></div>
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-wide ${item.color} mb-0.5`}>{item.label}</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* ── Features overview ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <span className="inline-block text-xs font-bold text-[#15803D] uppercase tracking-[0.18em] mb-2">
                {lang === 'hi' ? 'सुविधाएं' : lang === 'mr' ? 'वैशिष्ट्ये' : 'Features'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                {lang === 'hi' ? 'आपके खेत के लिए आवश्यक सब कुछ' : lang === 'mr' ? 'तुमच्या शेतासाठी आवश्यक सर्वकाही' : 'Everything your farm needs'}
              </h2>
              <p className="text-base text-gray-500 mt-2 max-w-xl mx-auto">
                {lang === 'hi'
                  ? 'SmartFarm AI सात शक्तिशाली कृषि टूल्स को एक सरल प्लेटफॉर्म में जोड़ता है।'
                  : lang === 'mr'
                  ? 'SmartFarm AI सात शक्तिशाली कृषी साधनांना एका सोप्या व्यासपीठावर एकत्र आणते.'
                  : 'SmartFarm AI combines seven powerful tools into one simple platform.'}
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {aboutFeatures.map((f, i) => {
                const Icon = f.icon
                return (
                  <motion.div
                    key={f.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                  >
                    <Link
                      to={f.route}
                      className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-200 hover:border-[#A5D6A7] hover:shadow-md transition-all duration-200 group h-full"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] flex items-center justify-center shrink-0 group-hover:bg-[#2E7D32] transition-colors duration-200">
                        <Icon size={18} className="text-[#2E7D32] group-hover:text-white transition-colors duration-200" strokeWidth={1.8} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13.5px] font-bold text-gray-900 group-hover:text-[#2E7D32] transition-colors leading-snug">{f.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{f.desc}</p>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* ── Who built this ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#f7faf5] border border-green-100 rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] border border-[#c8e6c9] flex items-center justify-center shrink-0">
              <Users size={22} className="text-[#15803D]" strokeWidth={1.8} />
            </div>
            <div className="flex-1">
              <h3 className="text-[15px] font-bold text-gray-900 mb-1">
                {lang === 'hi' ? 'भारतीय किसानों के लिए निर्मित' : lang === 'mr' ? 'भारतीय शेतकऱ्यांसाठी विकसित' : 'Built for Indian Farmers'}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {lang === 'hi'
                  ? 'SmartFarm AI एक विशेष छात्र परियोजना (SGP — Smart Farming Group Project) है जो भारतीय किसानों को एआई-संचालित कृषि मार्गदर्शन उपलब्ध कराने हेतु विकसित की गई है। यह प्लेटफ़ॉर्म बहुभाषी है और मोबाइल तथा कंप्यूटर दोनों पर सुगमता से कार्य करता है।'
                  : lang === 'mr'
                  ? 'SmartFarm AI हा एक विशेष विद्यार्थी प्रकल्प (SGP — Smart Farming Group Project) आहे, जो भारतीय शेतकऱ्यांना एआय-आधारित कृषी मार्गदर्शन मिळवून देण्यासाठी विकसित केला गेला आहे. हे व्यासपीठ बहुभाषिक असून मोबाईल व संगणकावर सहज वापरता येते.'
                  : 'SmartFarm AI is a student project (SGP — Smart Farming Group Project) developed to help Indian farmers access AI-powered agricultural guidance. The platform supports multiple languages, works on mobile and desktop, and is designed to be simple enough for every farmer.'}
              </p>
            </div>
            <Link
              to="/how-to-use"
              className="shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-sm font-semibold transition-colors"
            >
              {lang === 'hi' ? 'आरंभ करें' : lang === 'mr' ? 'सुरू करा' : 'Get Started'} <ArrowRight size={14} />
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ── How to Use ── */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="inline-block text-xs font-bold text-[#15803D] uppercase tracking-[0.18em] mb-3">
              {lang === 'hi' ? 'शुरुआत कैसे करें' : lang === 'mr' ? 'सुरुवात कशी करावी' : 'Getting Started'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              {lang === 'hi' ? 'SmartFarm AI का उपयोग कैसे करें' : lang === 'mr' ? 'SmartFarm AI कसे वापरावे' : 'How to Use SmartFarm AI'}
            </h2>
            <p className="text-base text-gray-500 mt-3 max-w-xl mx-auto">
              {lang === 'hi'
                ? 'आपका सरल कृषि सहायक — हर सुविधा का सर्वोत्तम लाभ उठाने के लिए इन चरणों का पालन करें।'
                : lang === 'mr'
                ? 'आपला सोपा शेती सहाय्यक — प्रत्येक वैशिष्ट्याचा पूर्ण फायदा घेण्यासाठी या पायऱ्यांचे अनुसरण करा.'
                : 'Your simple farming assistant — follow these five steps to get the most out of every feature.'}
            </p>
          </motion.div>

          {/* Steps */}
          <div className="relative flex flex-col gap-0">
            <div
              className="absolute left-[27px] top-10 bottom-10 w-px bg-gray-100 hidden sm:block"
              aria-hidden="true"
            />

            {howToSteps.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: i * 0.09 }}
                  className="relative flex items-start gap-5 py-5"
                >
                  {/* Step number + icon circle */}
                  <div className={`relative z-10 w-14 h-14 shrink-0 rounded-2xl border-2 ${s.border} ${s.bg} flex flex-col items-center justify-center gap-0.5`}>
                    <Icon size={20} className={s.color} strokeWidth={1.8} />
                    <span className={`text-[10px] font-bold ${s.color}`}>{s.step}</span>
                  </div>

                  {/* Text */}
                  <div className="flex-1 pt-1 min-w-0">
                    <h3 className="text-[15px] font-bold text-gray-900 leading-snug">{s.title}</h3>
                    <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{s.desc}</p>
                  </div>

                  {/* Connector dot (desktop only) */}
                  {i < howToSteps.length - 1 && (
                    <span
                      className={`absolute left-[26px] -bottom-1 w-2 h-2 rounded-full ${s.dot} hidden sm:block z-10`}
                      aria-hidden="true"
                    />
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="mt-10 flex justify-center"
          >
            <Link
              to="/crop-recommendation"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#15803D] hover:bg-[#166534] text-white text-sm font-semibold rounded-xl shadow-md shadow-green-900/15 transition-colors"
            >
              {lang === 'hi' ? 'आरंभ करें' : lang === 'mr' ? 'सुरू करा' : 'Get Started'} <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
