import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sprout, ShieldCheck, Cpu, Users, ArrowRight } from 'lucide-react'
import { useLanguage } from './context/LanguageContext'
import { tr } from './lib/i18n'

export default function About() {
  const { lang } = useLanguage()

  const values = [
    {
      icon: Cpu,
      title: tr(lang, 'AI-Driven Innovation', 'एआई तकनीक', 'एआय तंत्रज्ञान'),
      desc:
        tr(lang, 'High-precision crop pathology and weather prediction powered by modern neural networks.', 'कंप्यूटर विज़न और मशीन लर्निंग द्वारा फसलों के रोगों का त्वरित और सटीक विश्लेषण।', 'संगणक दृष्टी आणि मशीन लर्निंगद्वारे पिकांच्या रोगांचे जलद आणि अचूक विश्लेषण.'),
    },
    {
      icon: Users,
      title: tr(lang, 'Farmer-First Design', 'किसान-प्रथम दृष्टिकोण', 'शेतकरी-प्रथम दृष्टिकोन'),
      desc:
        tr(lang, 'Designed for accessibility with regional language support and clear visual indicators.', 'भारतीय किसानों के लिए उनकी अपनी भाषा (हिंदी, मराठी, अंग्रेजी) में सरल और सुलभ मंच।', 'भारतीय शेतकऱ्यांसाठी त्यांच्या स्वतःच्या भाषेत (मराठी, हिंदी, इंग्रजी) सोपा आणि सुलभ मंच.'),
    },
    {
      icon: ShieldCheck,
      title: tr(lang, 'Verified & Trusted', 'सटीक और विश्वसनीय', 'अचूक आणि विश्वासार्ह'),
      desc:
        tr(lang, 'Treatment recommendations aligned with official agricultural university standards.', 'कृषि विज्ञान केंद्रों और विश्वविद्यालयों द्वारा अनुमोदित उपचार और खुराक मानक।', 'कृषी विज्ञान केंद्र व कृषी विद्यापीठांनी प्रमाणित केलेले उपचार आणि खत प्रमाण.'),
    },
    {
      icon: Sprout,
      title: tr(lang, 'Sustainable Agriculture', 'सतत कृषि विकास', 'शाश्वत शेती विकास'),
      desc:
        tr(lang, 'Promoting optimal fertilizer dosages, soil preservation, and integrated pest management.', 'रासायनिक खादों का संतुलित उपयोग और जैविक उपचारों को प्रोत्साहन।', 'रासायनिक खतांचा संतुलित वापर आणि सेंद्रिय उपायांना प्रोत्साहन देणे.'),
    },
  ]

  return (
    <div className="bg-white min-h-[calc(100vh-68px)]">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#F1F8E9] to-white py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5E9] border border-[#A5D6A7] text-[#2E7D32] text-xs font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] animate-pulse" />
            {tr(lang, 'About SmartFarm AI', 'स्मार्टफार्म एआई के बारे में', 'स्मार्टफार्म एआय बद्दल')}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937]">
            {tr(lang, 'Empowering Indian Agriculture with Intelligence', 'भारतीय कृषि को आधुनिक तकनीक से सशक्त बनाना', 'भारतीय शेतीला आधुनिक तंत्रज्ञानाने सक्षम करणे')}
          </h1>
          <p className="mt-4 text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {tr(lang, 'SmartFarm AI bridges the gap between deep agricultural science and practical field execution, giving farmers timely, actionable advice directly on their devices.', 'स्मार्टफार्म एआई एक एकीकृत कृषि मंच है जो छोटे और मध्यम किसानों को रोग पहचान, मौसम पूर्वानुमान, खाद योजना और सरकारी योजनाओं का सीधा लाभ पहुंचाता है।', 'स्मार्टफार्म एआय हा एकात्मिक कृषी मंच आहे जो अल्पभूधारक व मध्यम शेतकऱ्यांना रोग निदान, हवामान अंदाज, खत नियोजन आणि शासकीय योजनांचा थेट लाभ देतो.')}
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((v) => {
            const Icon = v.icon
            return (
              <motion.div
                key={v.title}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#A5D6A7] transition-all duration-200 flex gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] flex items-center justify-center shrink-0">
                  <Icon size={24} className="text-[#2E7D32]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{v.title}</h3>
                  <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link
            to="/disease-detection"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-sm font-semibold rounded-xl shadow-md transition-colors"
          >
            {tr(lang, 'Try Disease Detection', 'रोग पहचान आज़माएं', 'रोग निदान वापरून पहा')}{' '}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
