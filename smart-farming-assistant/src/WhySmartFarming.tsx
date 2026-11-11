import { motion } from 'framer-motion'
import { Brain, Microscope, BarChart3, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from './context/LanguageContext'

export default function WhySmartFarming() {
  const { lang } = useLanguage()

  const cards = [
    {
      icon: Brain,
      accent: '#2E7D32',
      lightBg: '#E8F5E9',
      tag: lang === 'hi' ? 'कृत्रिम बुद्धिमत्ता' : lang === 'mr' ? 'कृत्रिम बुद्धिमत्ता' : 'Artificial Intelligence',
      title: lang === 'hi'
        ? 'कृषि वैज्ञानिक की तरह सोचने वाला एआई'
        : lang === 'mr'
        ? 'कृषी तज्ज्ञाप्रमाणे विचार करणारे एआय'
        : 'AI That Thinks Like an Agronomist',
      description: lang === 'hi'
        ? 'हमारा एआई इंजन मिट्टी का विश्लेषण, जलवायु पैटर्न और पिछले रिकॉर्ड का अध्ययन करके व्यक्तिगत सिफारिशें प्रदान करता है।'
        : lang === 'mr'
        ? 'आमचे एआय इंजिन मातीचे विश्लेषण, हवामानाचे नमुने आणि मागील नोंदींचा अभ्यास करून वैयक्तिकृत शिफारसी पुरवते.'
        : 'Our AI engine analyzes soil data, climate patterns, and historical yield records to deliver hyper-personalized recommendations — the same insights a seasoned agronomist would provide, available instantly on any device.',
      points: [
        lang === 'hi' ? 'मिट्टी और जलवायु विश्लेषण' : lang === 'mr' ? 'माती व हवामान विश्लेषण' : 'Soil & climate analysis',
        lang === 'hi' ? 'उपज भविष्यवाणी मॉडल' : lang === 'mr' ? 'उत्पादन अंदाज मॉडेल्स' : 'Yield prediction models',
        lang === 'hi' ? 'व्यक्तिगत फसल योजनाएं' : lang === 'mr' ? 'वैयक्तिक पीक नियोजन' : 'Personalized crop plans',
      ],
      link: '/ai-assistant',
    },
    {
      icon: Microscope,
      accent: '#1565C0',
      lightBg: '#E3F2FD',
      tag: lang === 'hi' ? 'पादप स्वास्थ्य निगरानी' : lang === 'mr' ? 'पीक आरोग्य निरीक्षण' : 'Plant Health Monitoring',
      title: lang === 'hi'
        ? 'फैलने से पहले बीमारी की पहचान'
        : lang === 'mr'
        ? 'रोग पसरण्यापूर्वी त्याचे निदान'
        : 'Detect Disease Before It Spreads',
      description: lang === 'hi'
        ? 'किसी भी पत्ती की फोटो अपलोड करें और हमारा विज़न मॉडल सेकंडों में रोग और कीटों की पहचान कर उपचार योजना देता है।'
        : lang === 'mr'
        ? 'कोणत्याही पानाचा फोटो अपलोड करा आणि आमचे व्हिजन मॉडेल काही सेकंदात रोगाचे निदान करून उपचार योजना देते.'
        : 'Upload a photo of any leaf and our vision model identifies diseases, pests, and nutrient deficiencies within seconds — giving you a treatment plan before the problem escalates across your field.',
      points: [
        lang === 'hi' ? 'चित्र-आधारित निदान' : lang === 'mr' ? 'प्रतिमा-आधारित निदान' : 'Image-based diagnosis',
        lang === 'hi' ? 'शीघ्र चेतावनी अलर्ट' : lang === 'mr' ? 'पूर्वसूचना व सतर्कता' : 'Early warning alerts',
        lang === 'hi' ? 'उपचार और रोकथाम सिफारिशें' : lang === 'mr' ? 'उपचार व प्रतिबंधक उपाय' : 'Treatment recommendations',
      ],
      link: '/disease-detection',
    },
    {
      icon: BarChart3,
      accent: '#E65100',
      lightBg: '#FFF3E0',
      tag: lang === 'hi' ? 'बेहतर कृषि निर्णय' : lang === 'mr' ? 'उत्तम शेती निर्णय' : 'Better Farming Decisions',
      title: lang === 'hi'
        ? 'डेटा-संचालित सटीक निर्णय'
        : lang === 'mr'
        ? 'डेटावर आधारित अचूक निर्णय'
        : 'Data-Driven Decisions, Every Season',
      description: lang === 'hi'
        ? 'मिट्टी के अनुकूल फसल चुनने से लेकर बाजार भाव तक — जटिल कृषि डेटा को व्यावहारिक कदमों में बदलें।'
        : lang === 'mr'
        ? 'मातीनुसार योग्य पीक निवडण्यापासून ते बाजारभावापर्यंत — कृषी माहितीचे रूपांतर प्रत्यक्ष फायदेशीर कृतीत करा.'
        : 'From choosing the right crop for your soil to timing your harvest with market peaks — SGP turns complex agricultural data into clear, actionable steps that improve yield and profitability season after season.',
      points: [
        lang === 'hi' ? 'मंडी भाव व रुझान' : lang === 'mr' ? 'बाजारभाव व अंदाज' : 'Market price forecasting',
        lang === 'hi' ? 'कटाई समय की जानकारी' : lang === 'mr' ? 'कापणीच्या योग्य वेळेची माहिती' : 'Harvest timing insights',
        lang === 'hi' ? 'सरकारी योजना अलर्ट' : lang === 'mr' ? 'सरकारी योजनांचे अलर्ट' : 'Government scheme alerts',
      ],
      link: '/crop-recommendation',
    },
  ]

  return (
    <section className="bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F5E9] border border-[#A5D6A7] text-[#2E7D32] text-xs font-semibold mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] animate-pulse" />
            {lang === 'hi' ? 'स्मार्टफार्म की विशेषता' : lang === 'mr' ? 'स्मार्टफार्मचे वैशिष्ट्य' : 'The SGP Advantage'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F2937] tracking-tight">
            {lang === 'hi' ? 'क्यों चुनें ' : lang === 'mr' ? 'का निवडावी ' : 'Why '}
            <span className="text-[#2E7D32]">
              {lang === 'hi' ? 'स्मार्ट खेती?' : lang === 'mr' ? 'स्मार्ट शेती?' : 'Smart Farming?'}
            </span>
          </h2>
          <p className="mt-4 text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'पारंपरिक खेती केवल अनुमान पर निर्भर करती है। SmartFarm AI अनिश्चितता को बुद्धिमत्ता से बदलता है — हर किसान को आधुनिक उपकरण प्रदान करता है।'
              : lang === 'mr'
              ? 'पारंपारिक शेती केवळ अंदाजावर चालते. SmartFarm AI अनिश्चिततेची जागा बुद्धिमत्तेने घेते — प्रत्येक शेतकऱ्याला आधुनिक तंत्रज्ञान उपलब्ध करून देते.'
              : 'Traditional farming relies on guesswork. SGP replaces uncertainty with intelligence — giving every farmer the tools once reserved for large agribusinesses.'}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.tag}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.12 }}
                whileHover={{ y: -6, transition: { duration: 0.22 } }}
                className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300 overflow-hidden"
              >
                {/* Top accent bar */}
                <div
                  className="h-1 w-full"
                  style={{ background: `linear-gradient(90deg, ${card.accent}, ${card.accent}88)` }}
                />

                <div className="flex flex-col flex-1 p-7 gap-5">

                  {/* Icon + tag */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: card.lightBg }}
                    >
                      <Icon size={22} style={{ color: card.accent }} />
                    </div>
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ color: card.accent, background: card.lightBg }}
                    >
                      {card.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#1F2937] leading-snug">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">
                    {card.description}
                  </p>

                  {/* Bullet points */}
                  <ul className="flex flex-col gap-2">
                    {card.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2.5 text-sm text-gray-600">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: card.lightBg }}
                        >
                          <svg viewBox="0 0 12 12" className="w-3 h-3" style={{ color: card.accent }}>
                            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {pt}
                      </li>
                    ))}
                  </ul>

                  {/* CTA link */}
                  <Link
                    to={card.link}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold mt-1 transition-colors duration-200"
                    style={{ color: card.accent }}
                  >
                    {lang === 'hi' ? 'अधिक जानें' : lang === 'mr' ? 'अधिक जाणून घ्या' : 'Learn more'}
                    <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 rounded-2xl bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {lang === 'hi' ? 'स्मार्ट खेती शुरू करने के लिए तैयार हैं?' : lang === 'mr' ? 'स्मार्ट शेती सुरू करण्यास तयार आहात?' : 'Ready to farm smarter?'}
            </h3>
            <p className="text-green-100 text-sm mt-1">
              {lang === 'hi'
                ? 'कम लागत में अधिक उत्पादन प्राप्त करने के लिए 10,000+ किसानों से जुड़ें।'
                : lang === 'mr'
                ? 'कमी खर्चात अधिक उत्पादन मिळवण्यासाठी १०,०००+ शेतकऱ्यांसोबत सामील व्हा.'
                : 'Join 10,000+ farmers already using SGP to grow more with less.'}
            </p>
          </div>
          <Link
            to="/how-to-use"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#2E7D32] text-sm font-bold rounded-xl hover:bg-[#E8F5E9] active:scale-95 transition-all duration-200 shadow-md"
          >
            {lang === 'hi' ? 'निःशुल्क शुरू करें' : lang === 'mr' ? 'मोफत सुरुवात करा' : 'Get Started Free'}
            <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
