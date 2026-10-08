import { Link, useLocation } from 'react-router-dom'
import {
  Home, Microscope, Sprout, CloudSun, BookOpen,
  LayoutDashboard, User, LogOut, CalendarRange, FlaskConical, ScanLine, BookOpenCheck,
} from 'lucide-react'
import logo from './assets/logo.png'
import { useAuth } from './context/AuthContext'
import { useLanguage } from './context/LanguageContext'
import { t } from './lib/i18n'
import type { LangCode } from './context/LanguageContext'

// ── Nav definition (routes / icons unchanged) ────────────────────────────────
const NAV_LINKS_BASE = [
  { key: 'nav_home'                as const, to: '/',                    icon: Home },
  { key: 'nav_disease_detection'   as const, to: '/disease-detection',   icon: Microscope },
  { key: 'nav_crop_recommendation' as const, to: '/crop-recommendation', icon: Sprout },
  { key: 'nav_weather'             as const, to: '/weather',             icon: CloudSun },
  { key: 'nav_farm_planner'        as const, to: '/farm-planner',        icon: CalendarRange },
  { key: 'nav_fertilizer_advisor'  as const, to: '/fertilizer-advisor',  icon: FlaskConical },
  { key: 'nav_prediction'          as const, to: '/prediction',          icon: ScanLine },
  { key: 'nav_govt_schemes'        as const, to: '/government-schemes',  icon: BookOpen },
  { key: 'nav_how_to_use'          as const, to: '/how-to-use',          icon: BookOpenCheck },
]

function getNavLinks(lang: LangCode) {
  return NAV_LINKS_BASE.map((l) => ({ label: t(lang, l.key), to: l.to, icon: l.icon }))
}

// ── Grouped nav for logged-out view ─────────────────────────────────────────
// Groups are purely visual; routes are unchanged.
const GROUPS = [
  {
    label: 'Main',
    keys: ['/', '/crop-recommendation', '/weather'],
  },
  {
    label: 'Farm Tools',
    keys: ['/disease-detection', '/fertilizer-advisor', '/farm-planner', '/prediction'],
  },
  {
    label: 'Information',
    keys: ['/government-schemes', '/how-to-use'],
  },
]

export default function Sidebar() {
  const location = useLocation()
  const { user, userName, userPhone, signOut } = useAuth()
  const { lang } = useLanguage()

  const displayName = userName || userPhone || 'My Account'

  const baseNavLinks = getNavLinks(lang)

  // When logged in, prepend Dashboard and render ungrouped (same as before)
  const navLinks = user
    ? [{ label: t(lang, 'nav_dashboard'), to: '/dashboard', icon: LayoutDashboard }, ...baseNavLinks]
    : baseNavLinks

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <aside className="hidden xl:flex flex-col w-[248px] shrink-0 h-screen sticky top-0 z-40 bg-white border-r border-gray-100">

      {/* ══ Branding ════════════════════════════════════════════════════════ */}
      <div className="px-5 pt-5 pb-4 border-b border-gray-100 shrink-0">
        <Link to="/" className="flex items-center gap-3 group" style={{ textDecoration: 'none' }}>
          {/* Logo box */}
          <div className="w-9 h-9 rounded-xl bg-[#EAF7EC] border border-[#c8e6c9] flex items-center justify-center shrink-0">
            <img src={logo} alt="SmartFarm AI" className="w-5 h-5 object-contain" />
          </div>
          {/* Brand text */}
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[14px] font-bold text-gray-900 leading-tight group-hover:text-[#15803D] transition-colors">
              SmartFarm AI
            </span>
            <span className="text-[10px] font-semibold text-[#15803D] tracking-wide uppercase leading-tight">
              Smart Farming Assistant
            </span>
          </div>
        </Link>
      </div>

      {/* ══ Navigation ══════════════════════════════════════════════════════ */}
      <nav className="sidebar-scroll flex-1 overflow-y-auto py-3 px-3 flex flex-col gap-0.5">

        {/* ── Logged-in: Dashboard + flat Tools section ─────────────────── */}
        {user && (
          <>
            <SectionLabel>Overview</SectionLabel>
            <NavItem
              to="/dashboard"
              label={t(lang, 'nav_dashboard')}
              Icon={LayoutDashboard}
              active={isActive('/dashboard')}
            />
            <SectionLabel>Tools</SectionLabel>
            {baseNavLinks.map(({ label, to, icon: Icon }) => (
              <NavItem key={to} to={to} label={label} Icon={Icon} active={isActive(to)} />
            ))}
          </>
        )}

        {/* ── Logged-out: grouped view ───────────────────────────────────── */}
        {!user && GROUPS.map((group) => {
          const items = navLinks.filter((l) => group.keys.includes(l.to))
          if (items.length === 0) return null
          return (
            <div key={group.label} className="mt-1 first:mt-0">
              <SectionLabel>{group.label}</SectionLabel>
              {items.map(({ label, to, icon: Icon }) => (
                <NavItem key={to} to={to} label={label} Icon={Icon} active={isActive(to)} />
              ))}
            </div>
          )
        })}
      </nav>

      {/* ══ Footer / Sign-in area ════════════════════════════════════════════ */}
      <div className="shrink-0 border-t border-gray-100 px-3 pt-3 pb-4 flex flex-col gap-2">

        {user ? (
          <>
            {/* User chip */}
            <Link
              to="/dashboard"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#F7FBF7] border border-[#e2f0e4] hover:bg-[#EAF7EC] hover:border-[#c8e6c9] transition-colors"
              style={{ textDecoration: 'none' }}
            >
              <div className="w-7 h-7 rounded-lg bg-[#EAF7EC] border border-[#A5D6A7] flex items-center justify-center shrink-0">
                <User size={13} color="#15803D" />
              </div>
              <span className="text-[12.5px] font-semibold text-gray-800 truncate flex-1">
                {displayName}
              </span>
            </Link>

            {/* Sign out */}
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-[12.5px] font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors w-full text-left"
            >
              <LogOut size={13} />
              <span>{t(lang, 'nav_log_out')}</span>
            </button>
          </>
        ) : (
          /* Sign In button */
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-[13px] font-semibold transition-colors"
            style={{ textDecoration: 'none' }}
          >
            <User size={14} />
            {t(lang, 'nav_sign_in')}
          </Link>
        )}

        {/* Brand footer */}
        <div className="mt-1 px-1 flex flex-col gap-1">
          {/* Tiny farm illustration */}
          <svg
            viewBox="0 0 220 36"
            className="w-full opacity-20"
            aria-hidden="true"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Rolling hills */}
            <path d="M0 36 Q30 14 60 24 Q90 34 120 18 Q150 4 180 20 Q200 30 220 22 L220 36 Z" fill="#15803D" />
            {/* Crops left */}
            <line x1="20" y1="28" x2="20" y2="22" stroke="#15803D" strokeWidth="1.2" />
            <path d="M17 22 Q20 18 23 22" fill="#15803D" />
            <line x1="30" y1="30" x2="30" y2="24" stroke="#15803D" strokeWidth="1.2" />
            <path d="M27 24 Q30 20 33 24" fill="#15803D" />
            {/* Crops mid */}
            <line x1="110" y1="22" x2="110" y2="16" stroke="#15803D" strokeWidth="1.2" />
            <path d="M107 16 Q110 12 113 16" fill="#15803D" />
            <line x1="120" y1="22" x2="120" y2="16" stroke="#15803D" strokeWidth="1.2" />
            <path d="M117 16 Q120 12 123 16" fill="#15803D" />
            {/* Small sun */}
            <circle cx="196" cy="10" r="4" fill="#15803D" />
            <line x1="196" y1="4"  x2="196" y2="2"  stroke="#15803D" strokeWidth="1" />
            <line x1="196" y1="16" x2="196" y2="18" stroke="#15803D" strokeWidth="1" />
            <line x1="190" y1="10" x2="188" y2="10" stroke="#15803D" strokeWidth="1" />
            <line x1="202" y1="10" x2="204" y2="10" stroke="#15803D" strokeWidth="1" />
          </svg>

          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-[#15803D] opacity-60">SmartFarm AI</span>
            <span className="text-[9.5px] text-gray-300 tracking-wide">SGP · v1.0</span>
          </div>
          <span className="text-[9.5px] text-gray-300 leading-tight">Your simple farming assistant</span>
        </div>
      </div>
    </aside>
  )
}

// ── Section label ─────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.08em] px-2 pt-2.5 pb-1.5 select-none">
      {children}
    </span>
  )
}

// ── Nav item ──────────────────────────────────────────────────────────────────
function NavItem({
  to,
  label,
  Icon,
  active,
}: {
  to: string
  label: string
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>
  active: boolean
}) {
  return (
    <Link
      to={to}
      style={{ textDecoration: 'none' }}
      className={[
        'relative flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-[13px] transition-colors duration-150',
        active
          ? 'bg-[#EAF7EC] text-[#15803D] font-semibold'
          : 'text-gray-500 font-medium hover:bg-gray-50 hover:text-gray-800',
      ].join(' ')}
    >
      {/* Green left bar for active item */}
      {active && (
        <span className="absolute left-0 top-[20%] h-[60%] w-[3px] rounded-r-full bg-[#15803D]" />
      )}

      <Icon
        size={15}
        strokeWidth={active ? 2.2 : 1.8}
        color={active ? '#15803D' : '#9ca3af'}
      />
      <span className="truncate flex-1 min-w-0 leading-snug">{label}</span>
    </Link>
  )
}
