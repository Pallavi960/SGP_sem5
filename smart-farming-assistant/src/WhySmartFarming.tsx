import { motion } from 'framer-motion'
import { Brain, Microscope, BarChart3, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const cards = [
  {
    icon: Brain,
    accent: '#2E7D32',
    lightBg: '#E8F5E9',
    tag: 'Artificial Intelligence',
    title: 'AI That Thinks Like an Agronomist',
    description:
      'Our AI engine analyzes soil data, climate patterns, and historical yield records to deliver hyper-personalized recommendations — the same insights a seasoned agronomist would provide, available instantly on any device.',
    points: ['Soil & climate analysis', 'Yield prediction models', 'Personalized crop plans'],
    link: '/ai-assistant',
  },
  {
    icon: Microscope,
    accent: '#1565C0',
    lightBg: '#E3F2FD',
    tag: 'Plant Health Monitoring',
    title: 'Detect Disease Before It Spreads',
    description:
      'Upload a photo of any leaf and our vision model identifies diseases, pests, and nutrient deficiencies within seconds — giving you a treatment plan before the problem escalates across your field.',
    points: ['Image-based diagnosis', 'Early warning alerts', 'Treatment recommendations'],
    link: '/disease-detection',
  },
  {
    icon: BarChart3,
    accent: '#E65100',
    lightBg: '#FFF3E0',
    tag: 'Better Farming Decisions',
    title: 'Data-Driven Decisions, Every Season',
    description:
      'From choosing the right crop for your soil to timing your harvest with market peaks — SGP turns complex agricultural data into clear, actionable steps that improve yield and profitability season after season.',
    points: ['Market price forecasting', 'Harvest timing insights', 'Government scheme alerts'],
    link: '/crop-recommendation',
  },
]

export default function WhySmartFarming() {
  return (
    <section className="bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F5E9] border border-[#A5D6A7] text-[#2E7D32] text-xs font-semibold mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] animate-pulse" />
            The SGP Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F2937] tracking-tight">
            Why{' '}
            <span className="text-[#2E7D32]">Smart Farming?</span>
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Traditional farming relies on guesswork. SGP replaces uncertainty with intelligence —
            giving every farmer the tools once reserved for large agribusinesses.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.tag}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.12 }}
                whileHover={{ y: -6, transition: { duration: 0.22 } }}
                className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300 overflow-hidden"
              >
                {/* Top accent bar */}
                <div
                  className="h-1 w-full"
                  style={{ background: `linear-gradient(90deg, ${card.accent}, ${card.accent}88)` }}
                />

                <div className="flex flex-col flex-1 p-7 gap-5">

                  {/* Icon + tag */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: card.lightBg }}
                    >
                      <Icon size={22} style={{ color: card.accent }} />
                    </div>
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ color: card.accent, background: card.lightBg }}
                    >
                      {card.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#1F2937] leading-snug">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 leading-relaxed flex-1">
                    {card.description}
                  </p>

                  {/* Bullet points */}
                  <ul className="flex flex-col gap-2">
                    {card.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2.5 text-sm text-gray-600">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: card.lightBg }}
                        >
                          <svg viewBox="0 0 12 12" className="w-3 h-3" style={{ color: card.accent }}>
                            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {pt}
                      </li>
                    ))}
                  </ul>

                  {/* CTA link */}
                  <Link
                    to={card.link}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold mt-1 transition-colors duration-200"
                    style={{ color: card.accent }}
                  >
                    Learn more
                    <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 rounded-2xl bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Ready to farm smarter?
            </h3>
            <p className="text-green-100 text-sm mt-1">
              Join 10,000+ farmers already using SGP to grow more with less.
            </p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#2E7D32] text-sm font-bold rounded-xl hover:bg-[#E8F5E9] active:scale-95 transition-all duration-200 shadow-md"
          >
            Get Started Free
            <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
