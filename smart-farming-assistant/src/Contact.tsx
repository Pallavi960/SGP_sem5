import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react'
import { useLanguage } from './context/LanguageContext'

export default function Contact() {
  const { lang } = useLanguage()
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.phone.trim()) return
    setSubmitted(true)
  }

  return (
    <div className="bg-white min-h-[calc(100vh-68px)]">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#F1F8E9] to-white py-14 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5E9] border border-[#A5D6A7] text-[#2E7D32] text-xs font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] animate-pulse" />
            {lang === 'hi' ? 'सहायता एवं संपर्क' : lang === 'mr' ? 'मदत व संपर्क' : 'Help & Contact'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937]">
            {lang === 'hi' ? 'हमसे संपर्क करें' : lang === 'mr' ? 'आमच्याशी संपर्क साधा' : 'Get in Touch'}
          </h1>
          <p className="mt-3 text-base text-gray-600 max-w-xl mx-auto">
            {lang === 'hi'
              ? 'कृषि परामर्श, ऐप में किसी तकनीकी समस्या या सुझाव के लिए हमसे संपर्क करें।'
              : lang === 'mr'
              ? 'शेती सल्ला, अॅपमधील तांत्रिक अडचण किंवा सूचनांसाठी आमच्याशी संपर्क साधा.'
              : 'Have questions, suggestions, or need technical assistance with SmartFarm AI? Reach out anytime.'}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Details Cards */}
          <div className="flex flex-col gap-4">
            <div className="p-6 rounded-2xl bg-[#F9FBF9] border border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] flex items-center justify-center mb-3">
                <Phone size={20} className="text-[#2E7D32]" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">
                {lang === 'hi' ? 'किसान कॉल सेंटर' : lang === 'mr' ? 'किसान कॉल सेंटर' : 'Kisan Call Center'}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {lang === 'hi' ? 'टोल-फ्री राष्ट्रीय हेल्पलाइन (24x7)' : lang === 'mr' ? 'टोल-फ्री राष्ट्रीय हेल्पलाइन (24x7)' : 'Toll-free national helpline (24x7)'}
              </p>
              <a href="tel:18001801551" className="inline-block mt-3 text-base font-bold text-[#2E7D32] hover:underline">
                1800-180-1551
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-[#F9FBF9] border border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] flex items-center justify-center mb-3">
                <MessageSquare size={20} className="text-[#2E7D32]" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">
                {lang === 'hi' ? 'व्हाट्सएप किसान सहायता' : lang === 'mr' ? 'व्हॉट्सअॅप शेतकरी मदत' : 'WhatsApp Farmer Help'}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {lang === 'hi' ? 'त्वरित चैट सहायता' : lang === 'mr' ? 'त्वरित चॅट मदत' : 'Instant chat assistance'}
              </p>
              <p className="mt-3 text-sm font-semibold text-gray-800">+91 91726 59109</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F9FBF9] border border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] flex items-center justify-center mb-3">
                <MapPin size={20} className="text-[#2E7D32]" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">
                {lang === 'hi' ? 'स्थान' : lang === 'mr' ? 'पत्ता' : 'Location'}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {lang === 'hi'
                  ? 'गुजरात / महाराष्ट्र, भारत'
                  : lang === 'mr'
                  ? 'महाराष्ट्र / गुजरात, भारत'
                  : 'Gujarat / Maharashtra, India'}
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 p-8 rounded-3xl bg-white border border-gray-200 shadow-sm">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#E8F5E9] flex items-center justify-center mb-4">
                  <CheckCircle2 size={36} className="text-[#2E7D32]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {lang === 'hi'
                    ? 'संदेश सफलतापूर्वक भेजा गया!'
                    : lang === 'mr'
                    ? 'संदेश यशस्वीरित्या पाठवला गेला!'
                    : 'Message Sent Successfully!'}
                </h3>
                <p className="text-sm text-gray-500 mt-2 max-w-md">
                  {lang === 'hi'
                    ? 'धन्यवाद! हमारी कृषि तकनीकी टीम जल्द ही आपसे संपर्क करेगी।'
                    : lang === 'mr'
                    ? 'धन्यवाद! आमची कृषी तंत्रज्ञान टीम लवकरच आपल्याशी संपर्क करेल.'
                    : 'Thank you! Our agricultural tech team will get back to you shortly.'}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({ name: '', phone: '', message: '' })
                  }}
                  className="mt-6 px-5 py-2.5 rounded-xl bg-[#E8F5E9] text-[#2E7D32] text-sm font-semibold hover:bg-[#C8E6C9] transition-colors"
                >
                  {lang === 'hi' ? 'अन्य संदेश भेजें' : lang === 'mr' ? 'दुसरा संदेश पाठवा' : 'Send Another Message'}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {lang === 'hi' ? 'हमें संदेश भेजें' : lang === 'mr' ? 'आम्हाला संदेश पाठवा' : 'Send Us a Message'}
                </h2>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    {lang === 'hi' ? 'आपका नाम *' : lang === 'mr' ? 'आपले नाव *' : 'Your Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={lang === 'hi' ? 'उदा. रमेश पाटिल' : lang === 'mr' ? 'उदा. रमेश पाटील' : 'e.g. Ramesh Patil'}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    {lang === 'hi' ? 'मोबाइल नंबर *' : lang === 'mr' ? 'मोबाईल नंबर *' : 'Phone Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="9876543210"
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    {lang === 'hi' ? 'संदेश या समस्या' : lang === 'mr' ? 'संदेश किंवा समस्या' : 'Message or Query'}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      lang === 'hi'
                        ? 'अपनी फसल, समस्या या प्रश्न के बारे में बताएं...'
                        : lang === 'mr'
                        ? 'आपले पीक, समस्या किंवा प्रश्नाबद्दल सांगा...'
                        : 'Describe your query, crop issue, or feedback...'
                    }
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CAF50] resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-sm font-semibold rounded-xl shadow-md transition-colors"
                >
                  <Send size={16} />
                  {lang === 'hi' ? 'संदेश भेजें' : lang === 'mr' ? 'संदेश पाठवा' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
