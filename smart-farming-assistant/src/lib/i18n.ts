import type { LangCode } from '../context/LanguageContext'

export interface Translations {
  // Navigation
  nav_home: string
  nav_disease_detection: string
  nav_crop_recommendation: string
  nav_weather: string
  nav_farm_planner: string
  nav_fertilizer_advisor: string
  nav_govt_schemes: string
  nav_about_us: string
  nav_sign_in: string
  nav_dashboard: string
  nav_log_out: string
  nav_prediction: string

  // Floating AI Assistant
  ai_welcome: string
  ai_suggestions: string[]
  ai_input_placeholder: string
  ai_typing: string
  ai_disclaimer: string
  ai_new_chat: string
  ai_tooltip: string
  // System language instruction injected into AI requests
  ai_system_lang_instruction: string

  // Common UI
  search_placeholder: string
}

const translations: Record<LangCode, Translations> = {
  en: {
    nav_home: 'Home',
    nav_disease_detection: 'Disease Detection',
    nav_crop_recommendation: 'Crop Recommendation',
    nav_weather: 'Weather',
    nav_farm_planner: 'Farm Planner',
    nav_fertilizer_advisor: 'Fertilizer Advisor',
    nav_govt_schemes: 'Govt. Schemes',
    nav_about_us: 'About Us',
    nav_sign_in: 'Sign In',
    nav_dashboard: 'Dashboard',
    nav_log_out: 'Log Out',
    nav_prediction: 'Prediction',

    ai_welcome:
      "Namaste! 🌱 I'm Krishi Mitra, your AI farming assistant.\n\nAsk me anything about crops, pests, soil, fertilizer dosage, weather, or government schemes.",
    ai_suggestions: [
      '🌾 Crop suggestion for Kharif',
      '🐛 Leaf yellowing & pest control',
      '🧪 Best fertilizer for Wheat',
      '🌦️ Rain forecast for farming',
    ],
    ai_input_placeholder: 'Ask Krishi Mitra anything...',
    ai_typing: 'Krishi Mitra is typing...',
    ai_disclaimer: 'AI can make mistakes. Verify critical advice with local experts.',
    ai_new_chat: 'New Chat',
    ai_tooltip: 'Ask Krishi Mitra 🤖',
    ai_system_lang_instruction: 'Please respond in English.',

    search_placeholder: 'Search schemes...',
  },

  hi: {
    nav_home: 'होम',
    nav_disease_detection: 'रोग पहचान',
    nav_crop_recommendation: 'फसल सुझाव',
    nav_weather: 'मौसम',
    nav_farm_planner: 'खेती योजनाकार',
    nav_fertilizer_advisor: 'खाद सलाहकार',
    nav_govt_schemes: 'सरकारी योजनाएं',
    nav_about_us: 'हमारे बारे में',
    nav_sign_in: 'लॉग इन',
    nav_dashboard: 'डैशबोर्ड',
    nav_log_out: 'लॉग आउट',
    nav_prediction: 'पूर्वानुमान',

    ai_welcome:
      'नमस्ते! 🌱 मैं कृषि मित्र हूँ, आपका AI खेती सहायक।\n\nफसल, कीट, मिट्टी, खाद, मौसम या सरकारी योजनाओं से जुड़ा कोई भी सवाल पूछें।',
    ai_suggestions: [
      '🌾 खरीफ सीजन के लिए फसल सुझाव',
      '🐛 पत्तियाँ पीली हो रही हैं, क्या करें?',
      '🧪 गेहूं के लिए सबसे अच्छी खाद',
      '🌦️ खेती के लिए बारिश का अनुमान',
    ],
    ai_input_placeholder: 'कृषि मित्र से कुछ भी पूछें...',
    ai_typing: 'कृषि मित्र जवाब तैयार कर रहा है...',
    ai_disclaimer: 'AI गलती कर सकता है। महत्वपूर्ण सलाह स्थानीय कृषि विशेषज्ञ से जरूर जांचें।',
    ai_new_chat: 'नई बात',
    ai_tooltip: 'कृषि मित्र से पूछें 🤖',
    ai_system_lang_instruction:
      'कृपया हिंदी में जवाब दें। किसान-मित्र भाषा में, सरल और व्यावहारिक रूप से।',

    search_placeholder: 'योजनाएं खोजें...',
  },

  mr: {
    nav_home: 'मुख्यपृष्ठ',
    nav_disease_detection: 'रोग ओळख',
    nav_crop_recommendation: 'पीक सल्ला',
    nav_weather: 'हवामान',
    nav_farm_planner: 'शेती नियोजक',
    nav_fertilizer_advisor: 'खत सल्लागार',
    nav_govt_schemes: 'शासकीय योजना',
    nav_about_us: 'आमच्याबद्दल',
    nav_sign_in: 'साइन इन',
    nav_dashboard: 'डॅशबोर्ड',
    nav_log_out: 'लॉग आउट',
    nav_prediction: 'अंदाज',

    ai_welcome:
      'नमस्कार! 🌱 मी कृषी मित्र आहे, तुमचा AI शेती सहाय्यक।\n\nपीक, कीड, माती, खत, हवामान किंवा शासकीय योजनांबद्दल काहीही विचारा।',
    ai_suggestions: [
      '🌾 खरीप हंगामासाठी पीक सुचवा',
      '🐛 पाने पिवळी होत आहेत, काय करावे?',
      '🧪 गव्हासाठी सर्वोत्तम खत',
      '🌦️ शेतीसाठी पावसाचा अंदाज',
    ],
    ai_input_placeholder: 'कृषी मित्राला काहीही विचारा...',
    ai_typing: 'कृषी मित्र उत्तर देत आहे...',
    ai_disclaimer: 'AI चुका करू शकतो. महत्त्वाच्या सल्ल्यासाठी स्थानिक कृषी तज्ञांशी संपर्क करा.',
    ai_new_chat: 'नवीन संभाषण',
    ai_tooltip: 'कृषी मित्राला विचारा 🤖',
    ai_system_lang_instruction:
      'कृपया मराठीत उत्तर द्या. शेतकरी-मित्र भाषेत, सोप्या आणि व्यावहारिक पद्धतीने।',

    search_placeholder: 'योजना शोधा...',
  },
}

export function t(lang: LangCode, key: keyof Translations): string {
  const val = translations[lang][key]
  if (typeof val === 'string') return val
  return String(val)
}

export function tArr(lang: LangCode, key: keyof Translations): string[] {
  const val = translations[lang][key]
  if (Array.isArray(val)) return val
  return []
}

export function getLangLabel(lang: LangCode): string {
  switch (lang) {
    case 'hi': return 'हिंदी'
    case 'mr': return 'मराठी'
    default:   return 'English'
  }
}

export const LANG_OPTIONS: { code: LangCode; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'हिंदी',   flag: '🇮🇳' },
  { code: 'mr', label: 'मराठी',   flag: '🇮🇳' },
]

export default translations
