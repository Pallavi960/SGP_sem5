import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Bot, Microscope, Sprout, CloudSun,
  TrendingUp, BookOpen, ArrowRight, CheckCircle2,
} from 'lucide-react'

const features = [
  {
    icon: Bot,
    title: 'AI Assistant',
    tagline: 'Your 24/7 farming advisor',
    description:
      'Ask anything about farming — soil health, irrigation schedules, pest control, or crop selection. Our AI assistant delivers expert-level answers instantly, in your language.',
    bullets: ['Natural language Q&A', 'Multilingual support', 'Context-aware advice'],
    accent: '#2E7D32',
    light: '#E8F5E9',
    to: '/ai-assistant',
    gradient: 'from-[#E8F5E9] to-[#F1F8E9]',
  },
  {
    icon: Microscope,
    title: 'Plant Disease Detection',
    tagline: 'Diagnose before damage spreads',
    description:
      'Upload a photo of any leaf or plant and our computer vision model identifies diseases, nutrient deficiencies, and pest infestations within seconds with a full treatment plan.',
    bullets: ['Image-based diagnosis', 'Early warning system', 'Treatment recommendations'],
    accent: '#1565C0',
    light: '#E3F2FD',
    to: '/disease-detection',
    gradient: 'from-[#E3F2FD] to-[#EDE7F6]',
  },
  {
    icon: Sprout,
    title: 'Crop Recommendation',
    tagline: 'Right crop, right season',
    description:
      'Input your soil type, region, and season — our AI cross-references thousands of data points to recommend the most profitable and suitable crops for your land.',
    bullets: ['Soil & climate matching', 'Yield prediction', 'Seasonal planning'],
    accent: '#2E7D32',
    light: '#E8F5E9',
    to: '/crop-recommendation',
    gradient: 'from-[#E8F5E9] to-[#F9FBE7]',
  },
  {
    icon: CloudSun,
    title: 'Weather Updates',
    tagline: 'Hyper-local farm forecasts',
    description:
      'Get precise, farm-level weather forecasts including rainfall predictions, temperature trends, humidity levels, and storm alerts — all tailored to your exact location.',
    bullets: ['7-day forecasts', 'Rain & frost alerts', 'Irrigation scheduling'],
    accent: '#0277BD',
    light: '#E1F5FE',
    to: '/weather',
    gradient: 'from-[#E1F5FE] to-[#E8F5E9]',
  },
  {
    icon: TrendingUp,
    title: 'Market Prices',
    tagline: 'Sell at the right time',
    description:
      'Track live MSP rates, mandi prices, and market trends for 50+ crops. Know when to sell, where to sell, and how to maximize your profit every harvest season.',
    bullets: ['Live MSP & mandi rates', 'Price trend charts', 'Best market suggestions'],
    accent: '#E65100',
    light: '#FFF3E0',
    to: '/features',
    gradient: 'from-[#FFF3E0] to-[#FFF8E1]',
  },
  {
    icon: BookOpen,
    title: 'Government Schemes',
    tagline: 'Never miss a benefit',
    description:
      'Stay updated on PM-KISAN, crop insurance, subsidies, and state-level schemes. We filter schemes relevant to your crop, region, and farmer profile automatically.',
    bullets: ['Scheme eligibility check', 'Application guidance', 'Deadline reminders'],
    accent: '#6A1B9A',
    light: '#F3E5F5',
    to: '/features',
    gradient: 'from-[#F3E5F5] to-[#EDE7F6]',
  },
]

const brandLabelColor = '#2E7D32'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function Features() {
  return (
    <div className="bg-white">

      {/* ── Page Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F1F8E9] to-white pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#E8F5E9] blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full bg-[#F1F8E9] blur-3xl opacity-70 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-3xl mx-auto text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F5E9] border border-[#A5D6A7] text-[#2E7D32] text-xs font-semibold mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] animate-pulse" />
            Platform Features
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1F2937] tracking-tight leading-[1.1]"
          >
            Our{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#2E7D32]">Features</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-1 left-0 right-0 h-3 bg-[#E8F5E9] -z-0 origin-left rounded-sm"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-5 text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto"
          >
            Everything a modern farmer needs — powered by AI, designed for simplicity,
            and built to work in the field.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Feature Cards Grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((f) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.title}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.22, ease: 'easeOut' } }}
                className="group relative flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] hover:border-gray-200 transition-all duration-300 overflow-hidden"
              >
                {/* Gradient icon area */}
                <div className={`relative bg-gradient-to-br ${f.gradient} px-7 pt-8 pb-6 overflow-hidden`}>
                  {/* Blurred decorative blob — replaces plain solid circle */}
                  <div
                    className="absolute -top-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-30 pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${f.accent}, transparent 70%)` }}
                  />
                  <div
                    className="absolute bottom-0 right-8 w-14 h-14 rounded-full blur-xl opacity-20 pointer-events-none"
                    style={{ background: f.accent }}
                  />
                  {/* Icon box — consistent size, stroke, shadow */}
                  <motion.div
                    whileHover={{ rotate: [0, -6, 6, 0], transition: { duration: 0.35 } }}
                    className="relative w-[52px] h-[52px] rounded-2xl flex items-center justify-center shadow-sm"
                    style={{ background: f.light }}
                  >
                    <Icon size={24} strokeWidth={1.5} style={{ color: f.accent }} />
                  </motion.div>
                  {/* Tagline — consistent style: colored left border pill */}
                  <div className="mt-4 flex items-center gap-2">
                    <span
                      className="inline-block w-1 h-3.5 rounded-full opacity-80"
                      style={{ background: brandLabelColor }}
                    />
                    <p
                      className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#2E7D32] opacity-90"
                      style={{ color: brandLabelColor }}
                    >
                      {f.tagline}
                    </p>
                  </div>
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 px-7 py-7 gap-5">
                  <h3 className="text-lg sm:text-xl font-bold text-[#111827] leading-7 group-hover:text-[#2E7D32] transition-colors duration-200">
                    {f.title}
                  </h3>

                  <p className="text-base text-gray-500 leading-7 flex-1">
                    {f.description}
                  </p>

                  {/* Bullets */}
                  <ul className="flex flex-col gap-2.5">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2.5 text-sm leading-6 text-gray-600">
                        <CheckCircle2 size={14} strokeWidth={1.5} style={{ color: f.accent }} className="shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    to={f.to}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold mt-1 w-fit transition-all duration-200 group/link"
                    style={{ color: f.accent }}
                  >
                    Explore
                    <motion.span
                      className="inline-flex"
                      animate={{ x: 0 }}
                      whileHover={{ x: 3 }}
                    >
                      <ArrowRight size={14} strokeWidth={1.5} className="transition-transform duration-200 group-hover/link:translate-x-1" />
                    </motion.span>
                  </Link>
                </div>

                {/* Bottom accent line — grows on hover */}
                <div
                  className="h-0.5 w-0 group-hover:w-full transition-all duration-500 ease-out"
                  style={{ background: `linear-gradient(90deg, ${f.accent}, ${f.accent}44)` }}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#4CAF50] p-10 sm:p-14 flex flex-col sm:flex-row items-center justify-between gap-8 overflow-hidden relative"
        >
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-8 right-32 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />

          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
              Ready to transform your farm?
            </h2>
            <p className="text-green-100 text-sm mt-2 max-w-md">
              Join 10,000+ farmers using SGP to grow smarter every season.
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="relative shrink-0"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#2E7D32] text-sm font-bold rounded-xl hover:bg-[#E8F5E9] transition-colors duration-200 shadow-xl"
            >
              Get Started Free <ArrowRight size={15} />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
