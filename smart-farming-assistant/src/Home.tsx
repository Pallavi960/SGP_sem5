import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown, Bot, Microscope, Sprout, CloudSun, TrendingUp, BookOpen } from 'lucide-react'
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

const features = [
  { icon: Bot, label: 'AI Assistant', to: '/ai-assistant' },
  { icon: Microscope, label: 'Disease Detection', to: '/disease-detection' },
  { icon: Sprout, label: 'Crop Recommendation', to: '/crop-recommendation' },
  { icon: CloudSun, label: 'Weather Updates', to: '/weather' },
  { icon: TrendingUp, label: 'Market Prices', to: '/features' },
  { icon: BookOpen, label: 'Govt. Schemes', to: '/government-schemes' },
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
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#2E7D32] text-sm font-semibold rounded-xl border-2 border-[#A5D6A7] hover:bg-[#E8F5E9] hover:border-[#2E7D32] transition-all duration-200"
                  >
                    Learn More
                  </Link>
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
    </div>
  )
}
