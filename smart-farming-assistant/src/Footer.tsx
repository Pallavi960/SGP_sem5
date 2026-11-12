import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Leaf, Mail, Phone, MapPin, Github, Twitter, Linkedin, ArrowUpRight } from 'lucide-react'
import { useLanguage } from './context/LanguageContext'
import { tr } from './lib/i18n'

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
  const { lang } = useLanguage()

  const quickLinks = [
    { label: tr(lang, 'Home', 'होम', 'मुख्य पृष्ठ'), to: '/' },
    { label: tr(lang, 'Features', 'सुविधाएं', 'वैशिष्ट्ये'), to: '/features' },
    { label: tr(lang, 'AI Assistant', 'एआई सहायक', 'एआय सहाय्यक'), to: '/ai-assistant' },
    { label: tr(lang, 'Disease Detection', 'रोग पहचान', 'रोग ओळख'), to: '/disease-detection' },
    { label: tr(lang, 'Crop Recommendation', 'फसल अनुशंसा', 'पीक शिफारस'), to: '/crop-recommendation' },
    { label: tr(lang, 'Weather', 'मौसम', 'हवामान'), to: '/weather' },
  ]

  const moreLinks = [
    { label: tr(lang, 'How to Use', 'उपयोग कैसे करें', 'कसे वापरावे'), to: '/how-to-use' },
    { label: tr(lang, 'Govt. Schemes', 'सरकारी योजनाएं', 'सरकारी योजना'), to: '/government-schemes' },
  ]

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
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {tr(lang, 'Start farming smarter today.', 'आज ही स्मार्ट खेती शुरू करें।', 'आजच स्मार्ट शेती सुरू करा.')}
            </h3>
            <p className="text-green-100 text-sm mt-1">
              {tr(lang, 'Free to use. No credit card required.', 'उपयोग के लिए निःशुल्क। क्रेडिट कार्ड की आवश्यकता नहीं।', 'वापरण्यासाठी पूर्णपणे मोफत. क्रेडिट कार्डची गरज नाही.')}
            </p>
          </div>
          <Link
            to="/how-to-use"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3 bg-white text-[#2E7D32] text-sm font-bold rounded-xl hover:bg-[#E8F5E9] active:scale-95 transition-all duration-200 shadow-lg"
          >
            {tr(lang, 'Get Started Free', 'निःशुल्क शुरुआत करें', 'मोफत सुरुवात करा')} <ArrowUpRight size={15} />
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
                SmartFarm AI
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              {tr(lang, 'AI-powered smart farming assistant helping farmers make data-driven decisions every season.', 'एआई-संचालित स्मार्ट कृषि सहायक जो हर मौसम में किसानों को डेटा-आधारित निर्णय लेने में मदद करता है।', 'एआय-आधारित स्मार्ट शेती सहाय्यक जो प्रत्येक हंगामात शेतकऱ्यांना माहितीपूर्ण निर्णय घेण्यास मदत करतो.')}
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
            <p className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
              {tr(lang, 'Quick Links', 'त्वरित लिंक', 'महत्त्वाचे दुवे')}
            </p>
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
            <p className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
              {tr(lang, 'Resources', 'अधिक जानकारी', 'अधिक माहिती')}
            </p>
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
            <p className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
              {tr(lang, 'Contact', 'संपर्क', 'संपर्क')}
            </p>
            <ul className="flex flex-col gap-3.5">
              {[
                { icon: Mail, text: 'contact@smartfarm.ai' },
                { icon: Phone, text: '+91 91726 59010' },
                { icon: MapPin, text: tr(lang, 'Pune, Maharashtra, India', 'पुणे, महाराष्ट्र, भारत', 'पुणे, महाराष्ट्र, भारत') },
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
          <span>
            © {new Date().getFullYear()} SmartFarm AI — {tr(lang, 'Smart Farming Assistant. All rights reserved.', 'स्मार्ट कृषि सहायक। सर्वाधिकार सुरक्षित।', 'स्मार्ट कृषी सहाय्यक. सर्व हक्क राखीव.')}
          </span>
          <div className="flex items-center gap-4">
            <span className="hover:text-gray-300 cursor-pointer transition-colors duration-200">
              {tr(lang, 'Privacy Policy', 'गोपनीयता नीति', 'गोपनीयता धोरण')}
            </span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors duration-200">
              {tr(lang, 'Terms of Service', 'सेवा की शर्तें', 'सेवा अटी')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
