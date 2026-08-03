import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Leaf, Mail, Phone, MapPin, Github, Twitter, Linkedin, ArrowUpRight } from 'lucide-react'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Features', to: '/features' },
  { label: 'AI Assistant', to: '/ai-assistant' },
  { label: 'Disease Detection', to: '/disease-detection' },
  { label: 'Crop Recommendation', to: '/crop-recommendation' },
  { label: 'Weather', to: '/weather' },
]

const moreLinks = [
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const socials = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
]

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Footer() {
  return (
    <footer className="bg-[#1F2937] text-gray-300">
      {/* Top CTA strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] px-4 sm:px-6 lg:px-8 py-10"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">Start farming smarter today.</h3>
            <p className="text-green-100 text-sm mt-1">Free to use. No credit card required.</p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3 bg-white text-[#2E7D32] text-sm font-bold rounded-xl hover:bg-[#E8F5E9] active:scale-95 transition-all duration-200 shadow-lg"
          >
            Get Started Free <ArrowUpRight size={15} />
          </Link>
        </div>
      </motion.div>

      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {/* Brand */}
          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-[#2E7D32] flex items-center justify-center shadow-md group-hover:bg-[#4CAF50] transition-colors duration-300">
                <Leaf size={17} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                S<span className="text-[#4CAF50]">G</span>P
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              AI-powered smart farming assistant helping farmers make data-driven decisions every season.
            </p>
            <div className="flex items-center gap-3 mt-1">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#2E7D32] hover:border-[#2E7D32] transition-colors duration-200"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeUp}>
            <p className="text-sm font-semibold text-white uppercase tracking-widest mb-5">Quick Links</p>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="group inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#4CAF50] transition-colors duration-200"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#4CAF50] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* More */}
          <motion.div variants={fadeUp}>
            <p className="text-sm font-semibold text-white uppercase tracking-widest mb-5">Company</p>
            <ul className="flex flex-col gap-2.5">
              {moreLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="group inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#4CAF50] transition-colors duration-200"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#4CAF50] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeUp}>
            <p className="text-sm font-semibold text-white uppercase tracking-widest mb-5">Contact</p>
            <ul className="flex flex-col gap-3.5">
              {[
                { icon: Mail, text: 'contact@sgp.ai' },
                { icon: Phone, text: '+91 00000 00000' },
                { icon: MapPin, text: 'Pune, Maharashtra, India' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-sm text-gray-400">
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={13} className="text-[#4CAF50]" />
                  </div>
                  {text}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} SGP — Smart Farming Assistant. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span className="hover:text-gray-300 cursor-pointer transition-colors duration-200">Privacy Policy</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors duration-200">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
