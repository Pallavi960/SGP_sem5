import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Sprout,
  ShieldAlert,
  Bot,
  CloudRain,
  Landmark,
  User,
  LogOut,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Sun,
  Droplets,
  Wind,
  Thermometer,
  Leaf,
  CheckCircle2,
  AlertTriangle,
  Info,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user, userPhone, userName, signOut } = useAuth()

  const quickActions = [
    {
      title: 'AI Farming Assistant',
      desc: 'Ask any farming query, pest problem, or fertilizer tip in your language',
      icon: <Bot className="w-6 h-6 text-white" />,
      color: 'from-emerald-500 to-green-600',
      to: '/ai-assistant',
      badge: 'Cohere AI',
    },
    {
      title: 'Crop Recommendation',
      desc: 'Get data-backed crop suggestions for your soil type and season',
      icon: <Sprout className="w-6 h-6 text-white" />,
      color: 'from-green-600 to-teal-700',
      to: '/crop-recommendation',
      badge: 'Soil & Climate',
    },
    {
      title: 'Disease Detection',
      desc: 'Upload crop leaf photos to instantly detect diseases & remedies',
      icon: <ShieldAlert className="w-6 h-6 text-white" />,
      color: 'from-amber-500 to-orange-600',
      to: '/disease-detection',
      badge: 'Scan Leaf',
    },
    {
      title: 'Weather Advisory',
      desc: 'Live 7-day temperature, rainfall, and wind forecast for your farm',
      icon: <CloudRain className="w-6 h-6 text-white" />,
      color: 'from-blue-500 to-cyan-600',
      to: '/weather',
      badge: 'Live Radar',
    },
    {
      title: 'Government Schemes',
      desc: 'Explore available subsidies, financial grants, and PM-KISAN updates',
      icon: <Landmark className="w-6 h-6 text-white" />,
      color: 'from-purple-500 to-indigo-600',
      to: '/government-schemes',
      badge: 'Subsidies',
    },
  ]

  const hourly = [
    { time: '6AM', icon: <Sun size={14} />, temp: 22 },
    { time: '9AM', icon: <Sun size={14} />, temp: 25 },
    { time: '12PM', icon: <Sun size={14} />, temp: 31 },
    { time: '3PM', icon: <CloudRain size={14} />, temp: 29 },
    { time: '6PM', icon: <Wind size={14} />, temp: 26 },
  ]

  const crops = [
    { name: 'Wheat', match: 94, color: '#FDD835', season: 'Rabi' },
    { name: 'Tomato', match: 88, color: '#EF5350', season: 'Kharif' },
    { name: 'Soybean', match: 81, color: '#66BB6A', season: 'Kharif' },
    { name: 'Maize', match: 76, color: '#FFA726', season: 'Rabi' },
  ]

  const prices = [
    { crop: 'Wheat', price: '₹2,150', unit: '/qtl', change: '+2.4%', up: true },
    { crop: 'Rice', price: '₹3,400', unit: '/qtl', change: '-1.1%', up: false },
    { crop: 'Soybean', price: '₹4,800', unit: '/qtl', change: '+5.2%', up: true },
    { crop: 'Maize', price: '₹1,890', unit: '/qtl', change: '+0.8%', up: true },
  ]

  return (
    <div className="min-h-screen bg-[#F8FAF8] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Top Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#087f3e] via-[#4CAF50] to-[#81C784]" />

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#E8F5E9] border border-[#A5D6A7] flex items-center justify-center text-[#087f3e] shrink-0 shadow-xs">
              <User className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  Welcome, <span className="text-[#087f3e]">{userName || 'Farmer'}</span>! 👋
                </h1>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#087f3e] bg-[#E8F5E9] border border-[#b8e5c1] px-2.5 py-0.5 rounded-full">
                  <Sparkles className="w-3 h-3" />
                  Authenticated
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Connected Mobile: <span className="font-semibold text-gray-800 font-mono">{userPhone || user?.id || 'Active User'}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-all duration-200 shrink-0"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </motion.div>

        {/* Quick Action Navigation Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#087f3e]" />
              Smart Farming Tools & Services
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {quickActions.map((action, i) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Link
                  to={action.to}
                  className="group flex flex-col justify-between h-full bg-white p-5 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md hover:border-[#b8e5c1] hover:-translate-y-1 transition-all duration-200"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}>
                        {action.icon}
                      </div>
                      <span className="text-[10px] font-semibold text-[#087f3e] bg-[#E8F5E9] px-2 py-0.5 rounded-full">
                        {action.badge}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#087f3e] transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {action.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-semibold text-[#087f3e] mt-4 pt-3 border-t border-gray-50 group-hover:underline">
                    <span>Open Tool</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Live Farm Analytics & Widget Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Weather Widget */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-50">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#E8F5E9] flex items-center justify-center text-[#087f3e]">
                    <Sun size={16} />
                  </div>
                  <span className="text-sm font-semibold text-gray-900">Weather Today</span>
                </div>
                <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">Pune, MH</span>
              </div>

              <div className="mt-4 flex items-end gap-3">
                <span className="text-4xl font-black text-gray-900">31°</span>
                <div className="mb-1">
                  <p className="text-xs font-semibold text-[#087f3e]">Partly Cloudy</p>
                  <p className="text-[10px] text-gray-400">Feels like 34°C</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4">
                {[
                  { icon: <Droplets size={13} />, label: 'Humidity', val: '72%' },
                  { icon: <Wind size={13} />, label: 'Wind', val: '14 km/h' },
                  { icon: <Thermometer size={13} />, label: 'UV Index', val: 'High' },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col items-center gap-1 bg-[#F9FBF9] rounded-xl py-2">
                    <span className="text-[#087f3e]">{s.icon}</span>
                    <span className="text-xs font-bold text-gray-900">{s.val}</span>
                    <span className="text-[10px] text-gray-400">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between border-t border-gray-50 pt-3 mt-4">
              {hourly.map((h) => (
                <div key={h.time} className="flex flex-col items-center gap-0.5">
                  <span className="text-[10px] text-gray-400">{h.time}</span>
                  <span className="text-[#087f3e]">{h.icon}</span>
                  <span className="text-xs font-semibold text-gray-900">{h.temp}°</span>
                </div>
              ))}
            </div>
          </div>

          {/* Crop Recommendation Summary */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#E8F5E9] flex items-center justify-center text-[#087f3e]">
                  <Sprout size={16} />
                </div>
                <span className="text-sm font-semibold text-gray-900">Crop Matches</span>
              </div>
              <span className="text-[10px] font-semibold text-[#087f3e] bg-[#E8F5E9] px-2.5 py-1 rounded-full">AI Suggested</span>
            </div>

            <div className="mt-3 flex flex-col gap-3">
              <p className="text-xs text-gray-400">Based on soil pH 6.8 · Loamy · Western Ghats</p>
              {crops.map((c) => (
                <div key={c.name} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: c.color + '22' }}>
                    <Leaf size={14} style={{ color: c.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-semibold text-gray-900">{c.name}</span>
                      <span className="text-xs font-bold text-[#087f3e]">{c.match}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${c.match}%`, background: c.color }} />
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400 shrink-0">{c.season}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Disease Alerts & Health Scan */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-50">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
                    <ShieldAlert size={16} />
                  </div>
                  <span className="text-sm font-semibold text-gray-900">Health Alerts</span>
                </div>
                <span className="text-[10px] font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded-full">1 Alert</span>
              </div>

              <div className="mt-3 flex flex-col gap-2.5">
                <div className="flex items-center gap-3 p-3 rounded-xl border border-red-200/60 bg-red-50/40">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-red-100 text-red-600">
                    <AlertTriangle size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 truncate">Early Blight Risk</p>
                    <p className="text-[10px] text-gray-500">Tomato Crop · Wet humidity</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-red-700 bg-red-100 shrink-0">High</span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl border border-amber-200/60 bg-amber-50/40">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-amber-100 text-amber-600">
                    <Info size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 truncate">Rust Fungus Warning</p>
                    <p className="text-[10px] text-gray-500">Wheat Crop · Moderate</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-amber-700 bg-amber-100 shrink-0">Medium</span>
                </div>
              </div>
            </div>

            <Link
              to="/disease-detection"
              className="mt-4 w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-[#087f3e] bg-[#E8F5E9] hover:bg-[#C8E6C9] py-2.5 rounded-xl transition-colors duration-200"
            >
              <span>Scan Leaf with Camera</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Live MSP Market Rates & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Market Rates */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#E8F5E9] flex items-center justify-center text-[#087f3e]">
                  <TrendingUp size={16} />
                </div>
                <span className="text-sm font-semibold text-gray-900">Live MSP Rates</span>
              </div>
              <span className="text-[10px] text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full font-medium">Govt. Mandi</span>
            </div>

            <div className="mt-2 flex flex-col divide-y divide-gray-50">
              {prices.map((p) => (
                <div key={p.crop} className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-2">
                    <Leaf size={12} className="text-[#087f3e]" />
                    <span className="text-xs font-semibold text-gray-900">{p.crop}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-900">
                      {p.price}<span className="text-gray-400 font-normal text-[10px]">{p.unit}</span>
                    </span>
                    <span className={`flex items-center gap-0.5 text-[10px] font-bold ${p.up ? 'text-[#087f3e]' : 'text-red-500'}`}>
                      {p.up ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                      {p.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Timeline */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-xs p-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#E8F5E9] flex items-center justify-center text-[#087f3e]">
                  <Activity size={16} />
                </div>
                <span className="text-sm font-semibold text-gray-900">Recent Farm Activity</span>
              </div>
              <span className="text-[10px] text-gray-400">Live Feed</span>
            </div>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: <CheckCircle2 size={14} />, color: '#087f3e', text: 'Authenticated session started', time: 'Just now' },
                { icon: <ShieldAlert size={14} />, color: '#EF5350', text: 'Disease alert: Early Blight on Tomato', time: '18 min ago' },
                { icon: <Sprout size={14} />, color: '#087f3e', text: 'Crop recommendation updated for Rabi season', time: '1 hr ago' },
                { icon: <CloudRain size={14} />, color: '#42A5F5', text: 'Rain forecast: 12mm expected tomorrow', time: '3 hr ago' },
              ].map((a, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50/70 border border-gray-100">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: a.color + '22', color: a.color }}
                  >
                    {a.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">{a.text}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
