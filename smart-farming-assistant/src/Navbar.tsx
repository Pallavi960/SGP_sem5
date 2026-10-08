import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Globe, ChevronDown, User, LogOut } from 'lucide-react'
import logo from './assets/logo.png'
import { useWeather, getWeatherIcon } from './hooks/useWeather'
import { useAuth } from './context/AuthContext'
import { useLanguage } from './context/LanguageContext'
import { t, LANG_OPTIONS } from './lib/i18n'
import type { LangCode } from './context/LanguageContext'

function getNavLinks(lang: LangCode) {
  return [
    { label: t(lang, 'nav_home'),                to: '/' },
    { label: t(lang, 'nav_disease_detection'),   to: '/disease-detection' },
    { label: t(lang, 'nav_crop_recommendation'), to: '/crop-recommendation' },
    { label: t(lang, 'nav_weather'),             to: '/weather' },
    { label: t(lang, 'nav_farm_planner'),        to: '/farm-planner' },
    { label: t(lang, 'nav_fertilizer_advisor'),  to: '/fertilizer-advisor' },
    { label: t(lang, 'nav_govt_schemes'),        to: '/government-schemes' },
    { label: t(lang, 'nav_about_us'),            to: '/about' },
  ]
}

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
  const [open, setOpen] = useState(false)
  const { lang, setLang } = useLanguage()

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!(e.target as Element).closest('[data-lang-selector]')) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const selected = LANG_OPTIONS.find((o) => o.code === lang) ?? LANG_OPTIONS[0]

  return (
    <div className="relative" data-lang-selector="">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 px-[10px] py-[9px] text-[13px] font-medium text-[#4b5563] hover:text-gray-900 hover:bg-[#f5f7f5] rounded-[8px] transition-all duration-200 select-none"
      >
        <Globe size={14} className="text-gray-400 shrink-0" />
        <span className="whitespace-nowrap">{selected.flag} {selected.label}</span>
        <ChevronDown
          size={12}
          className={`text-gray-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+6px)] w-40 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 z-50">
          {LANG_OPTIONS.map((opt) => (
            <button
              key={opt.code}
              onClick={() => { setLang(opt.code); setOpen(false) }}
              className={`w-full text-left px-4 py-2 text-[13px] transition-colors duration-100 rounded-none first:rounded-t-xl last:rounded-b-xl ${
                lang === opt.code
                  ? 'text-[#087f3e] bg-[#087f3e]/10 font-semibold'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {opt.flag} {opt.label}
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
  const { user, userPhone, userName, signOut } = useAuth()
  const { lang } = useLanguage()

  const displayName = userName || userPhone || 'My Account'

  const baseNavLinks = getNavLinks(lang)
  const navLinks = user
    ? [{ label: t(lang, 'nav_dashboard'), to: '/dashboard' }, ...baseNavLinks]
    : baseNavLinks

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
      className={`sticky top-0 z-50 bg-[#ffffff] transition-all duration-200 w-full xl:border-b-0 border-b border-[#e5e7eb] ${
        scrolled
          ? 'shadow-[0_2px_12px_rgba(0,0,0,0.05)]'
          : 'shadow-none'
      }`}
    >
      {/* ── Desktop top bar (xl+): utilities only — sidebar handles nav ── */}
      <div className="hidden xl:flex items-center justify-between h-[52px] px-6 w-full border-b border-[#f0f0f0] bg-white">
        {/* Left: breadcrumb — current page label */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-[0.08em] select-none">
            SmartFarm AI
          </span>
          <span className="text-[#d1d5db] text-[11px] select-none">/</span>
          <span className="text-[13px] font-semibold text-[#374151] select-none">
            {navLinks.find((l) => isActive(l.to))?.label ?? 'Home'}
          </span>
        </div>

        {/* Right: weather + language + auth */}
        <div className="flex items-center gap-2.5">
          <WeatherWidget />

          {/* Divider */}
          <div className="w-px h-5 bg-gray-200 mx-0.5 shrink-0" />

          <LanguageSelector />

          {/* Divider */}
          <div className="w-px h-5 bg-gray-200 mx-0.5 shrink-0" />

          {user ? (
            <div className="flex items-center gap-1.5">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-3 h-[34px] bg-[#f0faf2] hover:bg-[#d4edda] border border-[#c8e6c9] rounded-[8px] text-[12.5px] font-semibold text-[#087f3e] transition-all duration-150"
                title="Go to Dashboard"
              >
                <User size={13} strokeWidth={2.2} />
                <span className="max-w-[110px] truncate">{displayName}</span>
              </Link>
              <button
                onClick={() => signOut()}
                className="flex items-center justify-center w-[34px] h-[34px] text-gray-400 hover:text-red-500 hover:bg-red-50 border border-gray-200 hover:border-red-200 rounded-[8px] transition-all duration-150"
                title="Log Out"
                aria-label="Log Out"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-4 h-[34px] text-[12.5px] font-semibold text-white bg-[#087f3e] rounded-[8px] hover:bg-[#066832] transition-all duration-150 whitespace-nowrap"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* ── Mobile / Tablet bar (below xl): unchanged ── */}
      <div className="xl:hidden w-full px-[32px]">
        <div className="flex justify-between items-center h-[64px] sm:h-[68px]">

          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-[10px] shrink-0 group"
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

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="ml-auto p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-150"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer: unchanged ── */}
      {menuOpen && (
        <div className="xl:hidden border-t border-gray-100 bg-white">
          <div className="w-full px-[32px] py-3 flex flex-col gap-1">
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

            <div className="mt-2 pt-3 border-t border-gray-100 flex flex-col gap-2.5">
              <div className="flex items-center justify-between gap-3">
                <WeatherWidget />
                <LanguageSelector />
              </div>

              {user ? (
                <div className="flex flex-col gap-2 pt-1">
                  <div className="flex items-center justify-between p-2.5 bg-[#E8F5E9] rounded-[9px] border border-[#A5D6A7]">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-[#087f3e]" />
                      <span className="text-xs font-semibold text-gray-800">{displayName}</span>
                    </div>
                    <Link to="/dashboard" className="text-xs font-bold text-[#087f3e] hover:underline">
                      Dashboard
                    </Link>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-[14px] font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-[9px] transition-colors"
                  >
                    <LogOut size={16} />
                    <span>Log Out</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="block text-center px-4 py-2.5 text-[14px] font-semibold text-white bg-[#087f3e] rounded-[9px] hover:bg-[#066832] transition-colors duration-150"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
