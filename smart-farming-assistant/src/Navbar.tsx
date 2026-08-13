import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'
import logo from './assets/logo.png'
import { useWeather, getWeatherIcon } from './hooks/useWeather'

const navLinks = [
  { label: 'Home',               to: '/' },
  { label: 'AI Assistant',       to: '/ai-assistant' },
  { label: 'Disease Detection',  to: '/disease-detection' },
  { label: 'Crop Recommendation',to: '/crop-recommendation' },
  { label: 'Weather',            to: '/weather' },
  { label: 'Govt. Schemes',      to: '/government-schemes' },
  { label: 'About Us',           to: '/about' },
]

const languages = ['English', 'हिंदी', 'મરાઠી', 'ગુજરાતી']

/* ─── Weather Widget ─────────────────────────────────────────── */
function WeatherWidget() {
  const { weather, loading } = useWeather()

  if (loading) return (
    <div className="flex items-center gap-1.5 px-[13px] py-[5px] h-[42px] bg-[#238636]/[0.04] border border-[#238636]/10 rounded-[10px] text-xs text-gray-400 animate-pulse select-none">
      <span>🌡️</span>
      <span>Loading…</span>
    </div>
  )

  if (!weather) return null

  return (
    <Link
      to="/weather"
      className="flex items-center gap-2 px-[13px] py-[5px] h-[42px] bg-[#238636]/[0.04] hover:bg-[#238636]/[0.08] border border-[#238636]/10 rounded-[10px] transition-colors duration-200 group"
    >
      <span className="text-[17px] leading-none">{getWeatherIcon(weather.weathercode)}</span>
      <div className="flex flex-col justify-center leading-none gap-0.5">
        <span className="text-[13px] font-semibold text-[#087f3e] group-hover:text-[#066832]">
          {weather.temp}°C
        </span>
        <span className="text-[10px] text-gray-400 truncate max-w-[88px]">
          {weather.city}
        </span>
      </div>
    </Link>
  )
}

/* ─── Language Selector ──────────────────────────────────────── */
function LanguageSelector() {
  const [open, setOpen]       = useState(false)
  const [selected, setSelected] = useState('English')

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!(e.target as Element).closest('[data-lang-selector]')) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  return (
    <div className="relative" data-lang-selector="">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 px-[10px] py-[9px] text-[13px] font-medium text-[#4b5563] hover:text-gray-900 hover:bg-[#f5f7f5] rounded-[8px] transition-all duration-200 select-none"
      >
        <Globe size={14} className="text-gray-400 shrink-0" />
        <span className="whitespace-nowrap">{selected}</span>
        <ChevronDown
          size={12}
          className={`text-gray-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+6px)] w-36 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 z-50">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => { setSelected(lang); setOpen(false) }}
              className={`w-full text-left px-4 py-2 text-[13px] transition-colors duration-100 rounded-none first:rounded-t-xl last:rounded-b-xl ${
                selected === lang
                  ? 'text-[#087f3e] bg-[#087f3e]/10 font-semibold'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Navbar ─────────────────────────────────────────────────── */
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  return (
    <nav
      className={`sticky top-0 z-50 bg-[#ffffff] border-b border-[#e5e7eb] transition-all duration-200 w-full ${
        scrolled
          ? 'shadow-[0_2px_12px_rgba(0,0,0,0.05)]'
          : 'shadow-none'
      }`}
    >
      {/* ── Main bar ── */}
      <div className="w-full px-[32px]">
        {/* On desktop (xl), grid with 3 columns. On mobile, flex between. */}
        <div className="flex justify-between items-center xl:grid xl:grid-cols-[auto_1fr_auto] h-[64px] sm:h-[68px]">
          
          {/* ── LEFT: Brand ── */}
          <Link
            to="/"
            className="flex items-center gap-[10px] shrink-0 group xl:col-start-1"
          >
            <img
              src={logo}
              alt="SmartFarm AI"
              className="w-[34px] h-[34px] object-contain block shrink-0"
            />
            <div className="flex flex-col leading-none gap-[3px]">
              <span className="text-[17px] font-bold text-gray-900 tracking-tight leading-none group-hover:text-[#087f3e] transition-colors duration-200">
                SmartFarm AI
              </span>
              <span className="text-[9.5px] font-medium text-[#087f3e] tracking-wide leading-none uppercase">
                Smart Farming Assistant
              </span>
            </div>
          </Link>

          {/* ── CENTER: Nav links (hidden below xl) ── */}
          <div className="hidden xl:flex items-center gap-[18px] justify-center xl:col-start-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative text-[14px] font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive(link.to)
                    ? 'px-[14px] py-[9px] text-[#19853b] bg-[#f0faf2] border border-[#b8e5c1] rounded-[9px]'
                    : 'px-[6px] py-[8px] text-[#374151] hover:text-[#19853b] hover:bg-[rgba(25,133,59,0.06)] rounded-[7px] border border-transparent'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ── RIGHT: Actions (hidden below xl) ── */}
          <div className="hidden xl:flex items-center gap-[12px] xl:col-start-3 justify-end shrink-0">
            <WeatherWidget />
            <LanguageSelector />
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-[20px] py-[10px] h-[40px] text-[14px] font-semibold text-white bg-[#087f3e] rounded-[9px] hover:bg-[#066832] hover:shadow-md hover:-translate-y-[1px] active:translate-y-0 transition-all duration-200 whitespace-nowrap"
            >
              Login
            </Link>
          </div>

          {/* ── Hamburger (below xl) ── */}
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="xl:hidden ml-auto p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-150"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile / Tablet drawer ── */}
      {menuOpen && (
        <div className="xl:hidden border-t border-gray-100 bg-white">
          <div className="w-full px-[32px] py-3 flex flex-col gap-1">
            {/* Nav links */}
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2.5 rounded-lg text-[14px] font-medium transition-colors duration-150 border ${
                  isActive(link.to)
                    ? 'text-[#19853b] bg-[#f0faf2] border-[#b8e5c1]'
                    : 'text-[#374151] hover:text-[#19853b] hover:bg-[rgba(25,133,59,0.06)] border-transparent'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Bottom utility row */}
            <div className="mt-2 pt-3 border-t border-gray-100 flex flex-col gap-2.5">
              <div className="flex items-center justify-between gap-3">
                <WeatherWidget />
                <LanguageSelector />
              </div>
              <Link
                to="/contact"
                className="block text-center px-4 py-2.5 text-[14px] font-semibold text-white bg-[#087f3e] rounded-[9px] hover:bg-[#066832] transition-colors duration-150"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
