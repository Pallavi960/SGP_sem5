import { motion } from 'framer-motion'
import {
  Cloud, Sun, Wind, Droplets, Thermometer,
  Sprout, ShieldAlert, Activity, TrendingUp,
  ArrowUpRight, ArrowDownRight, CheckCircle2,
  AlertTriangle, Info, Leaf,
} from 'lucide-react'
import { useLanguage, type LangCode } from './context/LanguageContext'
import { tr } from './lib/i18n'

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
function WeatherCard({ lang }: { lang: LangCode }) {
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
        title={tr(lang, 'Weather Today', 'आज का मौसम', 'आजचे हवामान')}
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
            <p className="text-sm font-medium text-[#2E7D32]">
              {tr(lang, 'Partly Cloudy', 'आंशिक बादल', 'अंशतः ढगाळ')}
            </p>
            <p className="text-xs text-gray-400">
              {tr(lang, 'Feels like 34°C', 'अनुभव 34°C जैसा', 'भास 34°C सारखा')}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4 mb-4">
          {[
            { icon: <Droplets size={13} />, label: tr(lang, 'Humidity', 'आर्द्रता', 'आर्द्रता'), val: '72%' },
            { icon: <Wind size={13} />, label: tr(lang, 'Wind', 'हवा', 'वारा'), val: '14 km/h' },
            { icon: <Thermometer size={13} />, label: tr(lang, 'UV Index', 'यूवी इंडेक्स', 'यूव्ही निर्देशांक'), val: tr(lang, 'High', 'उच्च', 'जास्त') },
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
function CropCard({ lang }: { lang: LangCode }) {
  const crops = [
    {
      name: tr(lang, 'Wheat', 'गेहूं', 'गहू'),
      match: 94,
      color: '#FDD835',
      season: tr(lang, 'Rabi', 'रबी', 'रब्बी'),
    },
    {
      name: tr(lang, 'Tomato', 'टमाटर', 'टोमॅटो'),
      match: 88,
      color: '#EF5350',
      season: tr(lang, 'Kharif', 'खरीफ', 'खरीप'),
    },
    {
      name: tr(lang, 'Soybean', 'सोयाबीन', 'सोयाबीन'),
      match: 81,
      color: '#66BB6A',
      season: tr(lang, 'Kharif', 'खरीफ', 'खरीप'),
    },
    {
      name: tr(lang, 'Maize', 'मक्का', 'मका'),
      match: 76,
      color: '#FFA726',
      season: tr(lang, 'Rabi', 'रबी', 'रब्बी'),
    },
  ]
  return (
    <CardShell>
      <CardHeader
        icon={<Sprout size={16} />}
        title={tr(lang, 'Crop Recommendation', 'फसल अनुशंसा', 'पीक शिफारस')}
        badge={
          <span className="text-[10px] font-semibold text-[#2E7D32] bg-[#E8F5E9] px-2.5 py-1 rounded-full">
            {tr(lang, 'AI Suggested', 'एआई सुझाव', 'एआय शिफारस')}
          </span>
        }
      />
      <div className="px-5 pb-5 flex flex-col gap-3">
        <p className="text-xs text-gray-400">
          {tr(lang, 'Based on soil pH 6.8 · Loamy · Pune region', 'मिट्टी pH 6.8 · दोमट · पुणे क्षेत्र', 'माती सामू 6.8 · गाळाची माती · पुणे परिसर')}
        </p>
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
function DiseaseCard({ lang }: { lang: LangCode }) {
  const alerts = [
    {
      crop: tr(lang, 'Tomato', 'टमाटर', 'टोमॅटो'),
      disease: tr(lang, 'Early Blight', 'अगेती झुलसा', 'लवकर येणारा करपा'),
      severity: tr(lang, 'High', 'उच्च', 'तीव्र'),
      color: '#EF5350',
      icon: <AlertTriangle size={13} />,
    },
    {
      crop: tr(lang, 'Wheat', 'गेहूं', 'गहू'),
      disease: tr(lang, 'Rust Fungus', 'रतुआ फफूंद', 'तांबेरा बुरशी'),
      severity: tr(lang, 'Medium', 'मध्यम', 'मध्यम'),
      color: '#FFA726',
      icon: <AlertTriangle size={13} />,
    },
    {
      crop: tr(lang, 'Maize', 'मक्का', 'मका'),
      disease: tr(lang, 'Leaf Spot', 'पत्ती धब्बा', 'पानांवरील ठिपके'),
      severity: tr(lang, 'Low', 'कम', 'कमी'),
      color: '#66BB6A',
      icon: <Info size={13} />,
    },
  ]
  return (
    <CardShell>
      <CardHeader
        icon={<ShieldAlert size={16} />}
        title={tr(lang, 'Disease Detection', 'रोग पहचान', 'रोग ओळख')}
        badge={
          <span className="flex items-center gap-1 text-[10px] font-semibold text-red-500 bg-red-50 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            {tr(lang, '1 Critical', '1 गंभीर अलर्ट', '1 गंभीर चेतावणी')}
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
          {tr(lang, 'Scan New Image →', 'नई पत्ती स्कैन करें →', 'नवीन पान स्कॅन करा →')}
        </button>
      </div>
    </CardShell>
  )
}

/* ── Market Prices Card ── */
function MarketCard({ lang }: { lang: LangCode }) {
  const prices = [
    { crop: tr(lang, 'Wheat', 'गेहूं', 'गहू'), price: '₹2,150', unit: '/qtl', change: '+2.4%', up: true },
    { crop: tr(lang, 'Rice', 'चावल', 'तांदूळ'), price: '₹3,400', unit: '/qtl', change: '-1.1%', up: false },
    { crop: tr(lang, 'Soybean', 'सोयाबीन', 'सोयाबीन'), price: '₹4,800', unit: '/qtl', change: '+5.2%', up: true },
    { crop: tr(lang, 'Maize', 'मक्का', 'मका'), price: '₹1,890', unit: '/qtl', change: '+0.8%', up: true },
    { crop: tr(lang, 'Cotton', 'कपास', 'कापूस'), price: '₹6,200', unit: '/qtl', change: '-2.3%', up: false },
  ]
  return (
    <CardShell>
      <CardHeader
        icon={<TrendingUp size={16} />}
        title={tr(lang, 'Market Prices', 'मंडी भाव', 'बाजारभाव')}
        badge={
          <span className="text-[10px] text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full font-medium">
            {tr(lang, 'Live MSP', 'ताजा MSP', 'थेट हमीभाव')}
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
function ActivityCard({ lang }: { lang: LangCode }) {
  const activities = [
    {
      icon: <CheckCircle2 size={14} />,
      color: '#4CAF50',
      text: tr(lang, 'Soil test report uploaded', 'मिट्टी जांच रिपोर्ट अपलोड की गई', 'माती परीक्षण अहवाल अपलोड केला'),
      time: tr(lang, '2 min ago', '2 मिनट पहले', '२ मिनिटांपूर्वी'),
    },
    {
      icon: <ShieldAlert size={14} />,
      color: '#EF5350',
      text: tr(lang, 'Disease alert: Early Blight on Tomato', 'रोग अलर्ट: टमाटर में अगेती झुलसा', 'रोग चेतावणी: टोमॅटोवर लवकर येणारा करपा'),
      time: tr(lang, '18 min ago', '18 मिनट पहले', '१८ मिनिटांपूर्वी'),
    },
    {
      icon: <Sprout size={14} />,
      color: '#2E7D32',
      text: tr(lang, 'Crop recommendation updated for Rabi season', 'रबी मौसम के लिए फसल अनुशंसा अपडेट', 'रब्बी हंगामासाठी पीक शिफारस अद्यतनित'),
      time: tr(lang, '1 hr ago', '1 घंटा पहले', '१ तासापूर्वी'),
    },
    {
      icon: <Cloud size={14} />,
      color: '#42A5F5',
      text: tr(lang, 'Rain forecast: 12mm expected tomorrow', 'बारिश का पूर्वानुमान: कल 12mm वर्षा संभव', 'पाऊस अंदाज: उद्या १२ मिमी पाऊस अपेक्षित'),
      time: tr(lang, '3 hr ago', '3 घंटे पहले', '३ तासांपूर्वी'),
    },
    {
      icon: <TrendingUp size={14} />,
      color: '#FFA726',
      text: tr(lang, 'Wheat MSP increased by ₹150/qtl', 'गेहूं के MSP में ₹150/क्विंटल की वृद्धि', 'गव्हाच्या हमीभावात ₹१५०/क्विंटल वाढ'),
      time: tr(lang, '5 hr ago', '5 घंटे पहले', '५ तासांपूर्वी'),
    },
    {
      icon: <Info size={14} />,
      color: '#AB47BC',
      text: tr(lang, 'New govt. scheme: PM-KISAN installment released', 'सरकारी योजना: PM-KISAN की किस्त जारी', 'शासकीय योजना: PM-KISAN चा हप्ता जमा'),
      time: tr(lang, '1 day ago', '1 दिन पहले', '१ दिवसापूर्वी'),
    },
  ]
  return (
    <CardShell className="lg:col-span-2">
      <CardHeader
        icon={<Activity size={16} />}
        title={tr(lang, 'Recent Activity', 'हालिया गतिविधियां', 'अलीकडील घडामोडी')}
        badge={
          <span className="text-[10px] font-medium text-gray-400">
            {tr(lang, 'Today', 'आज', 'आज')}
          </span>
        }
      />
      <div className="px-5 pb-5">
        <div className="relative flex flex-col gap-0">
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
  const { lang } = useLanguage()

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
            {tr(lang, 'Live Dashboard Preview', 'लाइव डैशबोर्ड पूर्वावलोकन', 'थेट डॅशबोर्ड पूर्वावलोकन')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] tracking-tight">
            {tr(lang, 'Everything at a ', 'सब कुछ एक ', 'सर्वकाही एकाच ')}
            <span className="text-[#2E7D32]">
              {tr(lang, 'Glance', 'नज़र में', 'दृष्टिक्षेपात')}
            </span>
          </h2>
          <p className="mt-3 text-gray-500 text-base max-w-xl mx-auto">
            {tr(lang, 'A unified dashboard giving farmers real-time insights on weather, crops, diseases, and markets.', 'एक एकीकृत डैशबोर्ड जो किसानों को मौसम, फसल, रोग और मंडी की रीयल-टाइम जानकारी देता है।', 'एक एकात्मिक डॅशबोर्ड जो शेतकऱ्यांना हवामान, पीक, रोग आणि बाजाराची रिअल-टाइम माहिती देतो.')}
          </p>
        </motion.div>

        {/* Dashboard grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <WeatherCard lang={lang} />
          <CropCard lang={lang} />
          <DiseaseCard lang={lang} />
          <MarketCard lang={lang} />
          <ActivityCard lang={lang} />
        </div>
      </div>
    </section>
  )
}
