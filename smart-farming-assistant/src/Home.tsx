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

const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
}
const heroItem = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

const stats = [
  { value: '10K+', label: 'Farmers Helped' },
  { value: '95%', label: 'Accuracy Rate' },
  { value: '50+', label: 'Crop Varieties' },
  { value: '24/7', label: 'AI Support' },
]

const HOW_TO_STEPS = [
  {
    step: 1,
    icon: Wheat,
    title: 'Select Your Crop',
    desc: 'Choose your crop from the Crop Recommendation page.',
    color: 'text-green-700',
    bg: 'bg-green-50',
    border: 'border-green-200',
    dot: 'bg-green-500',
  },
  {
    step: 2,
    icon: CloudSun,
    title: 'Check Your Weather',
    desc: 'See current weather conditions for your farm location.',
    color: 'text-sky-700',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    dot: 'bg-sky-500',
  },
  {
    step: 3,
    icon: Sprout,
    title: 'Get Recommendations',
    desc: 'Receive crop and fertilizer advice tailored to your field.',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    dot: 'bg-emerald-500',
  },
  {
    step: 4,
    icon: Bot,
    title: 'Plan Farm Tasks',
    desc: 'Use the Farm Planner to create your farming schedule.',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
  },
  {
    step: 5,
    icon: CheckCircle2,
    title: 'Track Your Tasks',
    desc: 'Mark tasks done as you complete them day by day.',
    color: 'text-teal-700',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    dot: 'bg-teal-500',
  },
]

const features = [
  { icon: Bot, label: 'AI Assistant', to: '/ai-assistant' },
  { icon: Microscope, label: 'Disease Detection', to: '/disease-detection' },
  { icon: Sprout, label: 'Crop Recommendation', to: '/crop-recommendation' },
  { icon: CloudSun, label: 'Weather Updates', to: '/weather' },
  { icon: TrendingUp, label: 'Market Prices', to: '/features' },
  { icon: BookOpen, label: 'Govt. Schemes', to: '/government-schemes' },
]

const ABOUT_FEATURES = [
  { icon: Microscope,    label: 'Disease Detection',    route: '/disease-detection',   desc: 'Upload a crop photo to identify diseases and get treatment advice instantly.' },
  { icon: Sprout,        label: 'Crop Recommendation',  route: '/crop-recommendation',  desc: 'Get crop suggestions matched to your soil, season, and location.' },
  { icon: CloudSun,      label: 'Weather Forecast',     route: '/weather',              desc: 'Check real-time weather conditions before going to the field.' },
  { icon: FlaskConical,  label: 'Fertilizer Advisor',   route: '/fertilizer-advisor',   desc: 'Enter your soil details and get the right fertilizer guidance.' },
  { icon: CalendarRange, label: 'Farm Planner',         route: '/farm-planner',         desc: 'Plan and track every farm activity from sowing to harvest.' },
  { icon: BookOpen,      label: 'Govt. Schemes',        route: '/government-schemes',   desc: 'Explore government schemes and agricultural support available for farmers.' },
  { icon: Bot,           label: 'AI Assistant',         route: '/ai-assistant',         desc: 'Ask any farming question in your language and get practical guidance.' },
]

export default function Home() {
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
                  AI-Powered Agriculture Platform
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                variants={heroItem}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1F2937] leading-[1.1] tracking-tight"
              >
                AI-Based{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#2E7D32]">Smart Farming</span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute bottom-1 left-0 right-0 h-3 bg-[#E8F5E9] -z-0 origin-left rounded-sm"
                  />
                </span>{' '}
                Assistant
              </motion.h1>

              {/* Subtitle */}
              <motion.p variants={heroItem} className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-lg">
                Helping farmers make smarter farming decisions using{' '}
                <span className="text-[#2E7D32] font-semibold">Artificial Intelligence</span>.
                From crop health to weather forecasts — all in one place.
              </motion.p>

              {/* Buttons */}
              <motion.div variants={heroItem} className="flex flex-wrap gap-4">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/features"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#2E7D32] text-white text-sm font-semibold rounded-xl shadow-lg shadow-green-900/20 hover:bg-[#1B5E20] hover:shadow-xl hover:shadow-green-900/25 transition-all duration-200"
                  >
                    Explore Features <ArrowRight size={16} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <a
                    href="#about"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#2E7D32] text-sm font-semibold rounded-xl border-2 border-[#A5D6A7] hover:bg-[#E8F5E9] hover:border-[#2E7D32] transition-all duration-200"
                  >
                    Learn More
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
          <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
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
            Everything a modern farmer needs
          </motion.p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {features.map((item, i) => {
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
              <span className="inline-block text-xs font-bold text-[#15803D] uppercase tracking-[0.18em]">About SmartFarm AI</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                What is SmartFarm AI?
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                SmartFarm AI is an AI-powered digital assistant built for Indian farmers. It brings together
                crop health detection, weather forecasts, fertilizer advice, farm planning, and government
                scheme information into one simple, easy-to-use platform.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Whether you are a smallholder farmer or managing a large farm, SmartFarm AI gives you the
                right information at the right time — in your own language.
              </p>
            </div>

            {/* Problem → Solution */}
            <div className="space-y-3">
              {[
                { icon: Target,    color: 'text-red-600',   bg: 'bg-red-50',   border: 'border-red-100',   label: 'The Problem', text: 'Farmers make critical decisions without access to expert advice, real-time weather data, or crop health information.' },
                { icon: Lightbulb, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', label: 'The Solution', text: 'SmartFarm AI brings AI-powered guidance directly to every farmer\'s phone — simple, free, and available anytime.' },
                { icon: ShieldCheck, color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-100', label: 'The Result', text: 'Better crop health, reduced losses, smarter resource use, and more informed farming decisions every season.' },
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
              <span className="inline-block text-xs font-bold text-[#15803D] uppercase tracking-[0.18em] mb-2">Features</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Everything your farm needs</h2>
              <p className="text-base text-gray-500 mt-2 max-w-xl mx-auto">
                SmartFarm AI combines seven powerful tools into one simple platform.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ABOUT_FEATURES.map((f, i) => {
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
              <h3 className="text-[15px] font-bold text-gray-900 mb-1">Built for Indian Farmers</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                SmartFarm AI is a student project (SGP — Smart Farming Group Project) developed to help
                Indian farmers access AI-powered agricultural guidance. The platform supports multiple
                languages, works on mobile and desktop, and is designed to be simple enough for every farmer.
              </p>
            </div>
            <Link
              to="/how-to-use"
              className="shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-sm font-semibold transition-colors"
            >
              Get Started <ArrowRight size={14} />
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
              Getting Started
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              How to Use SmartFarm AI
            </h2>
            <p className="text-base text-gray-500 mt-3 max-w-xl mx-auto">
              Your simple farming assistant — follow these five steps to get the most out of every feature.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="relative flex flex-col gap-0">

            {/* Connecting line behind the steps */}
            <div
              className="absolute left-[27px] top-10 bottom-10 w-px bg-gray-100 hidden sm:block"
              aria-hidden="true"
            />

            {HOW_TO_STEPS.map((s, i) => {
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
                  {i < HOW_TO_STEPS.length - 1 && (
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
              Get Started <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
