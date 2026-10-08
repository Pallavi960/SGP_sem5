import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search, Filter, Shield, Banknote, Tractor, Leaf,
  Calendar, CheckCircle, ChevronRight, Info, Phone,
  MapPin, Tag, Users
} from 'lucide-react'
import {
  getAllSchemes,
  getSchemesByCategory,
  getSchemesByState,
  searchSchemes,
} from './services/GovernmentSchemeService'
import type { GovernmentScheme } from './services/GovernmentSchemeService'
// using static data with official links — no backend needed

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

const quickAccess = [
  { icon: Shield, label: 'Crop Insurance', desc: 'Protect your harvest', color: 'bg-blue-50 text-blue-600 border-blue-100' },
  { icon: Tag, label: 'Subsidies', desc: 'Input cost reduction', color: 'bg-amber-50 text-amber-600 border-amber-100' },
  { icon: Banknote, label: 'Agricultural Loans', desc: 'Easy credit access', color: 'bg-purple-50 text-purple-600 border-purple-100' },
  { icon: Tractor, label: 'Equipment Assistance', desc: 'Modern farm tools', color: 'bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]' },
]

const states = ['All India', 'Maharashtra', 'Punjab', 'Uttar Pradesh', 'Karnataka', 'Rajasthan']
const categories = ['All', 'Financial Support', 'Crop Insurance', 'Subsidies', 'Agricultural Loans']
const eligibilities = ['All Farmers', 'Small & Marginal', 'Registered Farmers', 'Land Record Holders']

export default function GovernmentSchemes() {
  const [schemes, setSchemes] = useState<GovernmentScheme[]>([])
  const [search, setSearch] = useState('')
  const [selectedState, setSelectedState] = useState('All India')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedEligibility, setSelectedEligibility] = useState('All Farmers')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadSchemes = async () => {
      try {
        setLoading(true)
        setError('')
        let data: GovernmentScheme[] = []
        if (search.trim()) {
          data = await searchSchemes(search.trim())
        } else if (selectedCategory !== 'All') {
          data = await getSchemesByCategory(selectedCategory)
        } else if (selectedState !== 'All India') {
          data = await getSchemesByState(selectedState)
        } else {
          data = await getAllSchemes()
        }
        setSchemes(data)
      } catch (err) {
        setError('Unable to load government schemes right now. Please try again later.')
        setSchemes([])
      } finally {
        setLoading(false)
      }
    }

    loadSchemes()
  }, [search, selectedCategory, selectedState])

  const filtered = useMemo(() => {
    return schemes.filter((s) => {
      const title = String(s.title || (s as any).name || '')
      const description = String(s.description || '')
      const category = String(s.category || '')
      const state = String(s.state || '')
      const eligibility = String(s.eligibility || '')
      const matchSearch = !search || title.toLowerCase().includes(search.toLowerCase()) || description.toLowerCase().includes(search.toLowerCase())
      const matchCategory = selectedCategory === 'All' || category === selectedCategory
      const matchState = selectedState === 'All India' || state === selectedState || state === 'All India'
      const matchEligibility = selectedEligibility === 'All Farmers' || eligibility.toLowerCase().includes(selectedEligibility.toLowerCase())
      return matchSearch && matchCategory && matchState && matchEligibility
    })
  }, [schemes, search, selectedCategory, selectedState, selectedEligibility])

  return (
    <div className="bg-white overflow-x-hidden">

      {/* ── Search & Filters ── */}
      <section className="sticky top-[68px] z-30 bg-white border-b border-gray-100 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search schemes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A5D6A7] focus:border-[#2E7D32] transition-all"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
              <FilterSelect icon={<MapPin size={13} />} value={selectedState} onChange={setSelectedState} options={states} />
              <FilterSelect icon={<Filter size={13} />} value={selectedCategory} onChange={setSelectedCategory} options={categories} />
              <FilterSelect icon={<Users size={13} />} value={selectedEligibility} onChange={setSelectedEligibility} options={eligibilities} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Scheme Cards ── */}
      <section className="py-16 bg-[#F9FBF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {loading ? (
              <motion.div variants={fadeUp} className="col-span-full flex flex-col items-center gap-3 py-20 text-gray-400">
                <Search size={40} className="opacity-30" />
                <p className="text-sm font-medium">Loading schemes...</p>
              </motion.div>
            ) : error ? (
              <motion.div variants={fadeUp} className="col-span-full flex flex-col items-center gap-3 py-20 text-red-500">
                <Info size={40} className="opacity-30" />
                <p className="text-sm font-medium">{error}</p>
              </motion.div>
            ) : filtered.length > 0 ? filtered.map((scheme, i) => (
              <SchemeCard key={scheme.id} scheme={scheme} index={i} />
            )) : (
              <motion.div variants={fadeUp} className="col-span-full flex flex-col items-center gap-3 py-20 text-gray-400">
                <Search size={40} className="opacity-30" />
                <p className="text-sm font-medium">No schemes found. Try a different search.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Quick Access ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeUp} className="text-center mb-10">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Quick Access</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937]">Browse by Category</h2>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {quickAccess.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.label}
                    custom={i}
                    variants={fadeUp}
                    whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.18 } }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex flex-col items-center gap-4 p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${item.color}`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white/70 flex items-center justify-center shadow-sm">
                      <Icon size={26} />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-sm">{item.label}</p>
                      <p className="text-xs opacity-70 mt-0.5">{item.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Important Notice ── */}
      <section className="py-10 bg-[#F9FBF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 bg-amber-50 border border-amber-200 rounded-2xl"
          >
            <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
              <Info size={22} className="text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-amber-800 text-base">Need Help Applying?</p>
              <p className="text-amber-700 text-sm mt-0.5">
                Visit your nearest agriculture office or CSC center for assistance with scheme applications and documentation.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-white text-sm font-semibold rounded-xl hover:bg-amber-600 transition-colors shrink-0"
            >
              <Phone size={14} /> Find Center
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] p-10 sm:p-14 text-center"
          >
            {/* Decorative circles */}
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white text-sm font-medium border border-white/20">
                <Leaf size={14} /> We're here to help
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Didn't find your scheme?
              </h2>
              <p className="text-green-200 text-base max-w-md">
                Our agriculture officers can help you discover and apply for the right government schemes for your needs.
              </p>
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 20px 40px rgba(0,0,0,0.25)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#2E7D32] text-sm font-bold rounded-xl shadow-lg hover:bg-[#F1F8E9] transition-all duration-200"
              >
                <Phone size={16} /> Contact Agriculture Officer
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

/* ── Sub-components ── */

function FilterSelect({
  icon, value, onChange, options,
}: {
  icon: React.ReactNode
  value: string
  onChange: (v: string) => void
  options: string[]
}) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">{icon}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-8 pr-8 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#A5D6A7] focus:border-[#2E7D32] appearance-none cursor-pointer transition-all"
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  )
}

function SchemeCard({ scheme, index }: { scheme: any; index: number }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      whileHover={{ y: -5, transition: { duration: 0.18 } }}
      className="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#A5D6A7] transition-all duration-200 overflow-hidden group"
    >
      {/* Top accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#2E7D32] to-[#66BB6A]" />

      <div className="flex flex-col gap-4 p-6 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] flex items-center justify-center shrink-0 group-hover:bg-[#2E7D32] transition-colors duration-200">
            <Leaf size={18} className="text-[#2E7D32] group-hover:text-white transition-colors duration-200" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold">
            <CheckCircle size={11} /> {scheme.status}
          </span>
        </div>

        <div>
          <h3 className="font-bold text-[#1F2937] text-base leading-snug">{scheme.title || scheme.name}</h3>
          <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">{scheme.description}</p>
        </div>

        {/* Benefits & Eligibility */}
        <div className="flex flex-col gap-2">
          <InfoRow icon={<Banknote size={13} className="text-[#2E7D32]" />} label="Benefits" value={scheme.benefits || 'View details'} />
          <InfoRow icon={<Users size={13} className="text-[#2E7D32]" />} label="Eligibility" value={scheme.eligibility || 'Check official source'} />
          <InfoRow icon={<Calendar size={13} className="text-gray-400" />} label="Category" value={scheme.category || 'Government Scheme'} muted />
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-5">
        <motion.a
          href={scheme.officialLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#E8F5E9] text-[#2E7D32] text-sm font-semibold rounded-xl hover:bg-[#2E7D32] hover:text-white transition-all duration-200"
        >
          Visit Official Site <ChevronRight size={15} />
        </motion.a>
      </div>
    </motion.div>
  )
}

function InfoRow({ icon, label, value, muted = false }: { icon: React.ReactNode; label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div className="flex flex-col">
        <span className={`text-xs font-medium ${muted ? 'text-gray-400' : 'text-gray-500'}`}>{label}</span>
        <span className={`text-xs font-semibold ${muted ? 'text-gray-400' : 'text-[#1F2937]'}`}>{value}</span>
      </div>
    </div>
  )
}
