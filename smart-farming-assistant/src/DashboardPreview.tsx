import { motion } from 'framer-motion'
import {
  Cloud, Sun, Wind, Droplets, Thermometer,
  Sprout, ShieldAlert, Activity, TrendingUp,
  ArrowUpRight, ArrowDownRight, CheckCircle2,
  AlertTriangle, Info, Leaf,
} from 'lucide-react'
import { useLanguage } from './context/LanguageContext'

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
function WeatherCard({ lang }: { lang: 'en' | 'hi' | 'mr' }) {
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
        title={lang === 'hi' ? 'आज का मौसम' : lang === 'mr' ? 'आजचे हवामान' : 'Weather Today'}
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
              {lang === 'hi' ? 'आंशिक बादल' : lang === 'mr' ? 'अंशतः ढगाळ' : 'Partly Cloudy'}
            </p>
            <p className="text-xs text-gray-400">
              {lang === 'hi' ? 'अनुभव 34°C जैसा' : lang === 'mr' ? 'भास 34°C सारखा' : 'Feels like 34°C'}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4 mb-4">
          {[
            { icon: <Droplets size={13} />, label: lang === 'hi' ? 'आर्द्रता' : lang === 'mr' ? 'आर्द्रता' : 'Humidity', val: '72%' },
            { icon: <Wind size={13} />, label: lang === 'hi' ? 'हवा' : lang === 'mr' ? 'वारा' : 'Wind', val: '14 km/h' },
            { icon: <Thermometer size={13} />, label: lang === 'hi' ? 'यूवी इंडेक्स' : lang === 'mr' ? 'यूव्ही निर्देशांक' : 'UV Index', val: lang === 'hi' ? 'उच्च' : lang === 'mr' ? 'जास्त' : 'High' },
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
function CropCard({ lang }: { lang: 'en' | 'hi' | 'mr' }) {
  const crops = [
    {
      name: lang === 'hi' ? 'गेहूं' : lang === 'mr' ? 'गहू' : 'Wheat',
      match: 94,
      color: '#FDD835',
      season: lang === 'hi' ? 'रबी' : lang === 'mr' ? 'रब्बी' : 'Rabi',
    },
    {
      name: lang === 'hi' ? 'टमाटर' : lang === 'mr' ? 'टोमॅटो' : 'Tomato',
      match: 88,
      color: '#EF5350',
      season: lang === 'hi' ? 'खरीफ' : lang === 'mr' ? 'खरीप' : 'Kharif',
    },
    {
      name: lang === 'hi' ? 'सोयाबीन' : lang === 'mr' ? 'सोयाबीन' : 'Soybean',
      match: 81,
      color: '#66BB6A',
      season: lang === 'hi' ? 'खरीफ' : lang === 'mr' ? 'खरीप' : 'Kharif',
    },
    {
      name: lang === 'hi' ? 'मक्का' : lang === 'mr' ? 'मका' : 'Maize',
      match: 76,
      color: '#FFA726',
      season: lang === 'hi' ? 'रबी' : lang === 'mr' ? 'रब्बी' : 'Rabi',
    },
  ]
  return (
    <CardShell>
      <CardHeader
        icon={<Sprout size={16} />}
        title={lang === 'hi' ? 'फसल अनुशंसा' : lang === 'mr' ? 'पीक शिफारस' : 'Crop Recommendation'}
        badge={
          <span className="text-[10px] font-semibold text-[#2E7D32] bg-[#E8F5E9] px-2.5 py-1 rounded-full">
            {lang === 'hi' ? 'एआई सुझाव' : lang === 'mr' ? 'एआय शिफारस' : 'AI Suggested'}
          </span>
        }
      />
      <div className="px-5 pb-5 flex flex-col gap-3">
        <p className="text-xs text-gray-400">
          {lang === 'hi' ? 'मिट्टी pH 6.8 · दोमट · पुणे क्षेत्र' : lang === 'mr' ? 'माती सामू 6.8 · गाळाची माती · पुणे परिसर' : 'Based on soil pH 6.8 · Loamy · Pune region'}
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
function DiseaseCard({ lang }: { lang: 'en' | 'hi' | 'mr' }) {
  const alerts = [
    {
      crop: lang === 'hi' ? 'टमाटर' : lang === 'mr' ? 'टोमॅटो' : 'Tomato',
      disease: lang === 'hi' ? 'अगेती झुलसा' : lang === 'mr' ? 'लवकर येणारा करपा' : 'Early Blight',
      severity: lang === 'hi' ? 'उच्च' : lang === 'mr' ? 'तीव्र' : 'High',
      color: '#EF5350',
      icon: <AlertTriangle size={13} />,
    },
    {
      crop: lang === 'hi' ? 'गेहूं' : lang === 'mr' ? 'गहू' : 'Wheat',
      disease: lang === 'hi' ? 'रतुआ फफूंद' : lang === 'mr' ? 'तांबेरा बुरशी' : 'Rust Fungus',
      severity: lang === 'hi' ? 'मध्यम' : lang === 'mr' ? 'मध्यम' : 'Medium',
      color: '#FFA726',
      icon: <AlertTriangle size={13} />,
    },
    {
      crop: lang === 'hi' ? 'मक्का' : lang === 'mr' ? 'मका' : 'Maize',
      disease: lang === 'hi' ? 'पत्ती धब्बा' : lang === 'mr' ? 'पानांवरील ठिपके' : 'Leaf Spot',
      severity: lang === 'hi' ? 'कम' : lang === 'mr' ? 'कमी' : 'Low',
      color: '#66BB6A',
      icon: <Info size={13} />,
    },
  ]
  return (
    <CardShell>
      <CardHeader
        icon={<ShieldAlert size={16} />}
        title={lang === 'hi' ? 'रोग पहचान' : lang === 'mr' ? 'रोग ओळख' : 'Disease Detection'}
        badge={
          <span className="flex items-center gap-1 text-[10px] font-semibold text-red-500 bg-red-50 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            {lang === 'hi' ? '1 गंभीर अलर्ट' : lang === 'mr' ? '1 गंभीर चेतावणी' : '1 Critical'}
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
          {lang === 'hi' ? 'नई पत्ती स्कैन करें →' : lang === 'mr' ? 'नवीन पान स्कॅन करा →' : 'Scan New Image →'}
        </button>
      </div>
    </CardShell>
  )
}

/* ── Market Prices Card ── */
function MarketCard({ lang }: { lang: 'en' | 'hi' | 'mr' }) {
  const prices = [
    { crop: lang === 'hi' ? 'गेहूं' : lang === 'mr' ? 'गहू' : 'Wheat', price: '₹2,150', unit: '/qtl', change: '+2.4%', up: true },
    { crop: lang === 'hi' ? 'चावल' : lang === 'mr' ? 'तांदूळ' : 'Rice', price: '₹3,400', unit: '/qtl', change: '-1.1%', up: false },
    { crop: lang === 'hi' ? 'सोयाबीन' : lang === 'mr' ? 'सोयाबीन' : 'Soybean', price: '₹4,800', unit: '/qtl', change: '+5.2%', up: true },
    { crop: lang === 'hi' ? 'मक्का' : lang === 'mr' ? 'मका' : 'Maize', price: '₹1,890', unit: '/qtl', change: '+0.8%', up: true },
    { crop: lang === 'hi' ? 'कपास' : lang === 'mr' ? 'कापूस' : 'Cotton', price: '₹6,200', unit: '/qtl', change: '-2.3%', up: false },
  ]
  return (
    <CardShell>
      <CardHeader
        icon={<TrendingUp size={16} />}
        title={lang === 'hi' ? 'मंडी भाव' : lang === 'mr' ? 'बाजारभाव' : 'Market Prices'}
        badge={
          <span className="text-[10px] text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full font-medium">
            {lang === 'hi' ? 'ताजा MSP' : lang === 'mr' ? 'थेट हमीभाव' : 'Live MSP'}
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
function ActivityCard({ lang }: { lang: 'en' | 'hi' | 'mr' }) {
  const activities = [
    {
      icon: <CheckCircle2 size={14} />,
      color: '#4CAF50',
      text: lang === 'hi' ? 'मिट्टी जांच रिपोर्ट अपलोड की गई' : lang === 'mr' ? 'माती परीक्षण अहवाल अपलोड केला' : 'Soil test report uploaded',
      time: lang === 'hi' ? '2 मिनट पहले' : lang === 'mr' ? '२ मिनिटांपूर्वी' : '2 min ago',
    },
    {
      icon: <ShieldAlert size={14} />,
      color: '#EF5350',
      text: lang === 'hi' ? 'रोग अलर्ट: टमाटर में अगेती झुलसा' : lang === 'mr' ? 'रोग चेतावणी: टोमॅटोवर लवकर येणारा करपा' : 'Disease alert: Early Blight on Tomato',
      time: lang === 'hi' ? '18 मिनट पहले' : lang === 'mr' ? '१८ मिनिटांपूर्वी' : '18 min ago',
    },
    {
      icon: <Sprout size={14} />,
      color: '#2E7D32',
      text: lang === 'hi' ? 'रबी मौसम के लिए फसल अनुशंसा अपडेट' : lang === 'mr' ? 'रब्बी हंगामासाठी पीक शिफारस अद्यतनित' : 'Crop recommendation updated for Rabi season',
      time: lang === 'hi' ? '1 घंटा पहले' : lang === 'mr' ? '१ तासापूर्वी' : '1 hr ago',
    },
    {
      icon: <Cloud size={14} />,
      color: '#42A5F5',
      text: lang === 'hi' ? 'बारिश का पूर्वानुमान: कल 12mm वर्षा संभव' : lang === 'mr' ? 'पाऊस अंदाज: उद्या १२ मिमी पाऊस अपेक्षित' : 'Rain forecast: 12mm expected tomorrow',
      time: lang === 'hi' ? '3 घंटे पहले' : lang === 'mr' ? '३ तासांपूर्वी' : '3 hr ago',
    },
    {
      icon: <TrendingUp size={14} />,
      color: '#FFA726',
      text: lang === 'hi' ? 'गेहूं के MSP में ₹150/क्विंटल की वृद्धि' : lang === 'mr' ? 'गव्हाच्या हमीभावात ₹१५०/क्विंटल वाढ' : 'Wheat MSP increased by ₹150/qtl',
      time: lang === 'hi' ? '5 घंटे पहले' : lang === 'mr' ? '५ तासांपूर्वी' : '5 hr ago',
    },
    {
      icon: <Info size={14} />,
      color: '#AB47BC',
      text: lang === 'hi' ? 'सरकारी योजना: PM-KISAN की किस्त जारी' : lang === 'mr' ? 'शासकीय योजना: PM-KISAN चा हप्ता जमा' : 'New govt. scheme: PM-KISAN installment released',
      time: lang === 'hi' ? '1 दिन पहले' : lang === 'mr' ? '१ दिवसापूर्वी' : '1 day ago',
    },
  ]
  return (
    <CardShell className="lg:col-span-2">
      <CardHeader
        icon={<Activity size={16} />}
        title={lang === 'hi' ? 'हालिया गतिविधियां' : lang === 'mr' ? 'अलीकडील घडामोडी' : 'Recent Activity'}
        badge={
          <span className="text-[10px] font-medium text-gray-400">
            {lang === 'hi' ? 'आज' : lang === 'mr' ? 'आज' : 'Today'}
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
            {lang === 'hi' ? 'लाइव डैशबोर्ड पूर्वावलोकन' : lang === 'mr' ? 'थेट डॅशबोर्ड पूर्वावलोकन' : 'Live Dashboard Preview'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] tracking-tight">
            {lang === 'hi' ? 'सब कुछ एक ' : lang === 'mr' ? 'सर्वकाही एकाच ' : 'Everything at a '}
            <span className="text-[#2E7D32]">
              {lang === 'hi' ? 'नज़र में' : lang === 'mr' ? 'दृष्टिक्षेपात' : 'Glance'}
            </span>
          </h2>
          <p className="mt-3 text-gray-500 text-base max-w-xl mx-auto">
            {lang === 'hi'
              ? 'एक एकीकृत डैशबोर्ड जो किसानों को मौसम, फसल, रोग और मंडी की रीयल-टाइम जानकारी देता है।'
              : lang === 'mr'
              ? 'एक एकात्मिक डॅशबोर्ड जो शेतकऱ्यांना हवामान, पीक, रोग आणि बाजाराची रिअल-टाइम माहिती देतो.'
              : 'A unified dashboard giving farmers real-time insights on weather, crops, diseases, and markets.'}
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
