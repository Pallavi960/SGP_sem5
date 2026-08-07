import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import logo from './assets/logo.png'
import { useWeather, getWeatherIcon } from './hooks/useWeather'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Features', to: '/features' },
  { label: 'AI Assistant', to: '/ai-assistant' },
  { label: 'Disease Detection', to: '/disease-detection' },
  { label: 'Crop Recommendation', to: '/crop-recommendation' },
  { label: 'Weather', to: '/weather' },
  { label: 'Govt. Schemes', to: '/government-schemes' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

function WeatherWidget() {
  const { weather, loading } = useWeather()

  if (loading) return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F1F8E9] rounded-xl text-xs text-gray-400 animate-pulse">
      <span>🌡️</span><span>Loading...</span>
    </div>
  )

  if (!weather) return null

  return (
    <Link to="/weather" className="flex items-center gap-2 px-3 py-1.5 bg-[#F1F8E9] hover:bg-[#E8F5E9] rounded-xl transition-colors duration-200 group">
      <span className="text-lg leading-none">{getWeatherIcon(weather.weathercode)}</span>
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-semibold text-[#2E7D32]">{weather.temp}°C</span>
        <span className="text-[10px] text-gray-500 truncate max-w-[90px]">{weather.city}</span>
      </div>
      <div className="flex flex-col leading-tight text-[10px] text-gray-400 border-l border-gray-200 pl-2">
        <span>💧 {weather.humidity}%</span>
        <span>💨 {weather.windspeed} km/h</span>
      </div>
    </Link>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  return (
    <nav
      className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      } border-b border-gray-100`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">

          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <motion.img
              src={logo}
              alt="SGP Logo"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="h-9 sm:h-12 w-auto object-contain block"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${
                  isActive(link.to)
                    ? 'text-[#2E7D32] bg-[#E8F5E9]'
                    : 'text-gray-600 hover:text-[#2E7D32] hover:bg-[#F1F8E9]'
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#2E7D32]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <WeatherWidget />
            <Link
              to="/contact"
              className="px-5 py-2 text-sm font-semibold text-white bg-[#2E7D32] rounded-xl shadow-sm hover:bg-[#1B5E20] hover:shadow-md active:scale-95 transition-all duration-200"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-[#2E7D32] hover:bg-[#E8F5E9] transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden border-t border-gray-100 bg-white"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    to={link.to}
                    className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive(link.to)
                        ? 'text-[#2E7D32] bg-[#E8F5E9]'
                        : 'text-gray-600 hover:text-[#2E7D32] hover:bg-[#F1F8E9]'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-2 pb-1">
                <Link
                  to="/contact"
                  className="block text-center px-4 py-2.5 text-sm font-semibold text-white bg-[#2E7D32] rounded-xl hover:bg-[#1B5E20] transition-colors duration-200"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
