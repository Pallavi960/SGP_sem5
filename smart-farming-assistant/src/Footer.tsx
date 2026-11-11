import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Leaf, Mail, Phone, MapPin, Github, Twitter, Linkedin, ArrowUpRight } from 'lucide-react'
import { useLanguage } from './context/LanguageContext'

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
    { label: lang === 'hi' ? 'होम' : lang === 'mr' ? 'मुख्य पृष्ठ' : 'Home', to: '/' },
    { label: lang === 'hi' ? 'सुविधाएं' : lang === 'mr' ? 'वैशिष्ट्ये' : 'Features', to: '/features' },
    { label: lang === 'hi' ? 'एआई सहायक' : lang === 'mr' ? 'एआय सहाय्यक' : 'AI Assistant', to: '/ai-assistant' },
    { label: lang === 'hi' ? 'रोग पहचान' : lang === 'mr' ? 'रोग ओळख' : 'Disease Detection', to: '/disease-detection' },
    { label: lang === 'hi' ? 'फसल अनुशंसा' : lang === 'mr' ? 'पीक शिफारस' : 'Crop Recommendation', to: '/crop-recommendation' },
    { label: lang === 'hi' ? 'मौसम' : lang === 'mr' ? 'हवामान' : 'Weather', to: '/weather' },
  ]

  const moreLinks = [
    { label: lang === 'hi' ? 'उपयोग कैसे करें' : lang === 'mr' ? 'कसे वापरावे' : 'How to Use', to: '/how-to-use' },
    { label: lang === 'hi' ? 'सरकारी योजनाएं' : lang === 'mr' ? 'सरकारी योजना' : 'Govt. Schemes', to: '/government-schemes' },
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
              {lang === 'hi' ? 'आज ही स्मार्ट खेती शुरू करें।' : lang === 'mr' ? 'आजच स्मार्ट शेती सुरू करा.' : 'Start farming smarter today.'}
            </h3>
            <p className="text-green-100 text-sm mt-1">
              {lang === 'hi' ? 'उपयोग के लिए निःशुल्क। क्रेडिट कार्ड की आवश्यकता नहीं।' : lang === 'mr' ? 'वापरण्यासाठी पूर्णपणे मोफत. क्रेडिट कार्डची गरज नाही.' : 'Free to use. No credit card required.'}
            </p>
          </div>
          <Link
            to="/how-to-use"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3 bg-white text-[#2E7D32] text-sm font-bold rounded-xl hover:bg-[#E8F5E9] active:scale-95 transition-all duration-200 shadow-lg"
          >
            {lang === 'hi' ? 'निःशुल्क शुरुआत करें' : lang === 'mr' ? 'मोफत सुरुवात करा' : 'Get Started Free'} <ArrowUpRight size={15} />
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
              {lang === 'hi'
                ? 'एआई-संचालित स्मार्ट कृषि सहायक जो हर मौसम में किसानों को डेटा-आधारित निर्णय लेने में मदद करता है।'
                : lang === 'mr'
                ? 'एआय-आधारित स्मार्ट शेती सहाय्यक जो प्रत्येक हंगामात शेतकऱ्यांना माहितीपूर्ण निर्णय घेण्यास मदत करतो.'
                : 'AI-powered smart farming assistant helping farmers make data-driven decisions every season.'}
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
              {lang === 'hi' ? 'त्वरित लिंक' : lang === 'mr' ? 'महत्त्वाचे दुवे' : 'Quick Links'}
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
              {lang === 'hi' ? 'अधिक जानकारी' : lang === 'mr' ? 'अधिक माहिती' : 'Resources'}
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
              {lang === 'hi' ? 'संपर्क' : lang === 'mr' ? 'संपर्क' : 'Contact'}
            </p>
            <ul className="flex flex-col gap-3.5">
              {[
                { icon: Mail, text: 'contact@smartfarm.ai' },
                { icon: Phone, text: '+91 91726 59010' },
                { icon: MapPin, text: lang === 'hi' ? 'पुणे, महाराष्ट्र, भारत' : lang === 'mr' ? 'पुणे, महाराष्ट्र, भारत' : 'Pune, Maharashtra, India' },
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
            © {new Date().getFullYear()} SmartFarm AI — {lang === 'hi' ? 'स्मार्ट कृषि सहायक। सर्वाधिकार सुरक्षित।' : lang === 'mr' ? 'स्मार्ट कृषी सहाय्यक. सर्व हक्क राखीव.' : 'Smart Farming Assistant. All rights reserved.'}
          </span>
          <div className="flex items-center gap-4">
            <span className="hover:text-gray-300 cursor-pointer transition-colors duration-200">
              {lang === 'hi' ? 'गोपनीयता नीति' : lang === 'mr' ? 'गोपनीयता धोरण' : 'Privacy Policy'}
            </span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors duration-200">
              {lang === 'hi' ? 'सेवा की शर्तें' : lang === 'mr' ? 'सेवा अटी' : 'Terms of Service'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
