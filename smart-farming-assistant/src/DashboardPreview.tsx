import { motion } from 'framer-motion'
import {
  Cloud, Sun, Wind, Droplets, Thermometer,
  Sprout, ShieldAlert, Activity, TrendingUp,
  ArrowUpRight, ArrowDownRight, CheckCircle2,
  AlertTriangle, Info, Leaf,
} from 'lucide-react'

/* ── helpers ── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut', delay } },
})

function CardShell({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={fadeUp(0)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -4, boxShadow: '0 20px 40px -12px rgba(46,125,50,0.12)' }}
      transition={{ duration: 0.2 }}
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  )
}

function CardHeader({ icon, title, badge }: { icon: React.ReactNode; title: string; badge?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-5 pt-5 pb-3">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32]">
          {icon}
        </div>
        <span className="text-sm font-semibold text-[#1F2937]">{title}</span>
      </div>
      {badge}
    </div>
  )
}

/* ── Weather Card ── */
function WeatherCard() {
  const hourly = [
    { time: '6AM', icon: <Sun size={14} />, temp: 22 },
    { time: '9AM', icon: <Cloud size={14} />, temp: 25 },
    { time: '12PM', icon: <Sun size={14} />, temp: 31 },
    { time: '3PM', icon: <Cloud size={14} />, temp: 29 },
    { time: '6PM', icon: <Wind size={14} />, temp: 26 },
  ]
  return (
    <CardShell>
      <CardHeader
        icon={<Sun size={16} />}
        title="Weather Today"
        badge={
          <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">
            Pune, MH
          </span>
        }
      />
      <div className="px-5 pb-2">
        <div className="flex items-end gap-3">
          <span className="text-5xl font-bold text-[#1F2937]">31°</span>
          <div className="mb-1.5">
            <p className="text-sm font-medium text-[#2E7D32]">Partly Cloudy</p>
            <p className="text-xs text-gray-400">Feels like 34°C</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4 mb-4">
          {[
            { icon: <Droplets size={13} />, label: 'Humidity', val: '72%' },
            { icon: <Wind size={13} />, label: 'Wind', val: '14 km/h' },
            { icon: <Thermometer size={13} />, label: 'UV Index', val: 'High' },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 bg-[#F9FBF9] rounded-xl py-2.5">
              <span className="text-[#4CAF50]">{s.icon}</span>
              <span className="text-xs font-bold text-[#1F2937]">{s.val}</span>
              <span className="text-[10px] text-gray-400">{s.label}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between border-t border-gray-50 pt-3 pb-1">
          {hourly.map((h) => (
            <div key={h.time} className="flex flex-col items-center gap-1">
              <span className="text-[10px] text-gray-400">{h.time}</span>
              <span className="text-[#4CAF50]">{h.icon}</span>
              <span className="text-xs font-semibold text-[#1F2937]">{h.temp}°</span>
            </div>
          ))}
        </div>
      </div>
    </CardShell>
  )
}

/* ── Crop Recommendation Card ── */
function CropCard() {
  const crops = [
    { name: 'Wheat', match: 94, color: '#FDD835', season: 'Rabi' },
    { name: 'Tomato', match: 88, color: '#EF5350', season: 'Kharif' },
    { name: 'Soybean', match: 81, color: '#66BB6A', season: 'Kharif' },
    { name: 'Maize', match: 76, color: '#FFA726', season: 'Rabi' },
  ]
  return (
    <CardShell>
      <CardHeader
        icon={<Sprout size={16} />}
        title="Crop Recommendation"
        badge={
          <span className="text-[10px] font-semibold text-[#2E7D32] bg-[#E8F5E9] px-2.5 py-1 rounded-full">
            AI Suggested
          </span>
        }
      />
      <div className="px-5 pb-5 flex flex-col gap-3">
        <p className="text-xs text-gray-400">Based on soil pH 6.8 · Loamy · Pune region</p>
        {crops.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: c.color + '22' }}>
              <Leaf size={14} style={{ color: c.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between mb-1">
                <span className="text-xs font-semibold text-[#1F2937]">{c.name}</span>
                <span className="text-xs font-bold text-[#2E7D32]">{c.match}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${c.match}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ background: c.color }}
                />
              </div>
            </div>
            <span className="text-[10px] text-gray-400 shrink-0">{c.season}</span>
          </motion.div>
        ))}
      </div>
    </CardShell>
  )
}

/* ── Disease Detection Card ── */
function DiseaseCard() {
  const alerts = [
    { crop: 'Tomato', disease: 'Early Blight', severity: 'High', color: '#EF5350', icon: <AlertTriangle size={13} /> },
    { crop: 'Wheat', disease: 'Rust Fungus', severity: 'Medium', color: '#FFA726', icon: <AlertTriangle size={13} /> },
    { crop: 'Maize', disease: 'Leaf Spot', severity: 'Low', color: '#66BB6A', icon: <Info size={13} /> },
  ]
  return (
    <CardShell>
      <CardHeader
        icon={<ShieldAlert size={16} />}
        title="Disease Detection"
        badge={
          <span className="flex items-center gap-1 text-[10px] font-semibold text-red-500 bg-red-50 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            1 Critical
          </span>
        }
      />
      <div className="px-5 pb-5 flex flex-col gap-2.5">
        {alerts.map((a) => (
          <div
            key={a.disease}
            className="flex items-center gap-3 p-3 rounded-xl border"
            style={{ borderColor: a.color + '33', background: a.color + '0A' }}
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: a.color + '22', color: a.color }}>
              {a.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#1F2937] truncate">{a.disease}</p>
              <p className="text-[10px] text-gray-400">{a.crop}</p>
            </div>
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
              style={{ color: a.color, background: a.color + '22' }}
            >
              {a.severity}
            </span>
          </div>
        ))}
        <button className="mt-1 w-full text-xs font-semibold text-[#2E7D32] bg-[#E8F5E9] hover:bg-[#C8E6C9] py-2.5 rounded-xl transition-colors duration-200">
          Scan New Image →
        </button>
      </div>
    </CardShell>
  )
}

/* ── Market Prices Card ── */
function MarketCard() {
  const prices = [
    { crop: 'Wheat', price: '₹2,150', unit: '/qtl', change: '+2.4%', up: true },
    { crop: 'Rice', price: '₹3,400', unit: '/qtl', change: '-1.1%', up: false },
    { crop: 'Soybean', price: '₹4,800', unit: '/qtl', change: '+5.2%', up: true },
    { crop: 'Maize', price: '₹1,890', unit: '/qtl', change: '+0.8%', up: true },
    { crop: 'Cotton', price: '₹6,200', unit: '/qtl', change: '-2.3%', up: false },
  ]
  return (
    <CardShell>
      <CardHeader
        icon={<TrendingUp size={16} />}
        title="Market Prices"
        badge={
          <span className="text-[10px] text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full font-medium">
            Live MSP
          </span>
        }
      />
      <div className="px-5 pb-5">
        <div className="flex flex-col divide-y divide-gray-50">
          {prices.map((p) => (
            <div key={p.crop} className="flex items-center justify-between py-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#E8F5E9] flex items-center justify-center">
                  <Leaf size={12} className="text-[#2E7D32]" />
                </div>
                <span className="text-xs font-semibold text-[#1F2937]">{p.crop}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-[#1F2937]">
                  {p.price}<span className="text-gray-400 font-normal">{p.unit}</span>
                </span>
                <span className={`flex items-center gap-0.5 text-[10px] font-bold ${p.up ? 'text-[#2E7D32]' : 'text-red-500'}`}>
                  {p.up ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                  {p.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CardShell>
  )
}

/* ── Recent Activity Card ── */
function ActivityCard() {
  const activities = [
    { icon: <CheckCircle2 size={14} />, color: '#4CAF50', text: 'Soil test report uploaded', time: '2 min ago' },
    { icon: <ShieldAlert size={14} />, color: '#EF5350', text: 'Disease alert: Early Blight on Tomato', time: '18 min ago' },
    { icon: <Sprout size={14} />, color: '#2E7D32', text: 'Crop recommendation updated for Rabi season', time: '1 hr ago' },
    { icon: <Cloud size={14} />, color: '#42A5F5', text: 'Rain forecast: 12mm expected tomorrow', time: '3 hr ago' },
    { icon: <TrendingUp size={14} />, color: '#FFA726', text: 'Wheat MSP increased by ₹150/qtl', time: '5 hr ago' },
    { icon: <Info size={14} />, color: '#AB47BC', text: 'New govt. scheme: PM-KISAN installment released', time: '1 day ago' },
  ]
  return (
    <CardShell className="lg:col-span-2">
      <CardHeader
        icon={<Activity size={16} />}
        title="Recent Activity"
        badge={
          <span className="text-[10px] font-medium text-gray-400">Today</span>
        }
      />
      <div className="px-5 pb-5">
        <div className="relative flex flex-col gap-0">
          {/* vertical line */}
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gray-100" />
          {activities.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="flex items-start gap-3 py-2.5 relative"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 border-2 border-white"
                style={{ background: a.color + '22', color: a.color }}
              >
                {a.icon}
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <p className="text-xs font-medium text-[#1F2937] leading-snug">{a.text}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{a.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </CardShell>
  )
}

/* ── Main Export ── */
export default function DashboardPreview() {
  return (
    <section className="bg-[#F9FBF9] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F5E9] border border-[#A5D6A7] text-[#2E7D32] text-xs font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] animate-pulse" />
            Live Dashboard Preview
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] tracking-tight">
            Everything at a <span className="text-[#2E7D32]">Glance</span>
          </h2>
          <p className="mt-3 text-gray-400 text-base max-w-xl mx-auto">
            A unified dashboard giving farmers real-time insights on weather, crops, diseases, and markets.
          </p>
        </motion.div>

        {/* Dashboard grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <WeatherCard />
          <CropCard />
          <DiseaseCard />
          <MarketCard />
          <ActivityCard />
        </div>
      </div>
    </section>
  )
}
