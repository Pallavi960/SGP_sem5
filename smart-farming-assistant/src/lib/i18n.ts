import type { LangCode } from '../context/LanguageContext'
import { GU_PHRASES } from './locales/gu'
import { PA_PHRASES } from './locales/pa'
import { TA_PHRASES } from './locales/ta'
import { TE_PHRASES } from './locales/te'
import { COMMON_DOMAIN_PHRASES, type ExtraLang, type MultiLangDict } from './locales/commonDomain'
import { PLANNER_AND_DISEASE_PHRASES } from './locales/plannerAndDisease'
import { DISEASE_AND_RECOMMEND_PHRASES } from './locales/diseaseDetailsPhrases'
import { DISEASE_EXTRA_PHRASES } from './locales/diseaseExtraPhrases'
import { FERTILIZER_SERVICE_PHRASES } from './locales/fertilizerServicePhrases'
import { CROP_EXTRA_PHRASES } from './locales/cropExtraPhrases'

export interface Translations {
  // Navigation & Sidebar
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
  nav_how_to_use: string

  // Sidebar labels
  sec_overview: string
  sec_tools: string
  sec_main: string
  sec_farm_tools: string
  sec_information: string
  brand_tagline: string
  brand_sub: string
  my_account: string

  // Help panel in navbar
  help_how_to_use: string
  help_panel_title: string

  // Floating AI Assistant
  ai_welcome: string
  ai_suggestions: string[]
  ai_input_placeholder: string
  ai_typing: string
  ai_disclaimer: string
  ai_new_chat: string
  ai_tooltip: string
  ai_system_lang_instruction: string

  // Common UI
  search_placeholder: string
  loading_text: string
  back_to_home: string

  // ─── Disease Detection Page ──────────────────────────────
  dd_badge: string
  dd_title_prefix: string
  dd_title_highlight: string
  dd_subtitle: string
  dd_tab_upload: string
  dd_tab_camera: string
  dd_tab_samples: string
  dd_drop_title: string
  dd_drop_sub: string
  dd_select_btn: string
  dd_diagnose_btn: string
  dd_analyzing_btn: string
  dd_change_photo: string
  dd_awaiting_title: string
  dd_awaiting_desc: string
  dd_sample_blight: string
  dd_sample_curl: string
  dd_sample_wilt: string
  dd_sample_healthy: string
  dd_camera_start: string
  dd_camera_capture: string
  dd_camera_stop: string
  dd_diagnosis_result: string
  dd_confidence: string
  dd_severity: string
  dd_detected_disease: string
  dd_symptoms: string
  dd_immediate_actions: string
  dd_chemical_control: string
  dd_organic_control: string
  dd_prevention: string
  dd_scan_another: string
  dd_pipeline_title: string
  dd_healthy_title: string
  dd_healthy_desc: string

  // ─── Dashboard Page ──────────────────────────────────────
  db_welcome: string
  db_authenticated: string
  db_sms_verified: string
  db_phone_label: string
  db_sign_out: string
  db_tools_title: string
  db_open_tool: string
  db_ai_title: string
  db_ai_desc: string
  db_crop_title: string
  db_crop_desc: string
  db_disease_title: string
  db_disease_desc: string
  db_weather_title: string
  db_weather_desc: string
  db_schemes_title: string
  db_schemes_desc: string
  db_prediction_title: string
  db_prediction_desc: string
  db_weather_today: string
  db_crop_matches: string
  db_health_alerts: string
  db_scan_leaf_btn: string
  db_ai_suggested: string
  db_early_blight_risk: string
  db_early_blight_sub: string
  db_rust_fungus_risk: string
  db_rust_fungus_sub: string
  db_humidity: string
  db_wind: string
  db_uv_index: string

  // ─── Weather Page ────────────────────────────────────────
  w_title: string
  w_subtitle: string
  w_today: string
  w_forecast_7day: string
  w_temp: string
  w_humidity: string
  w_wind: string
  w_precipitation: string
  w_farming_advisory: string

  // ─── Prediction Page ─────────────────────────────────────
  pred_title: string
  pred_subtitle: string
  pred_upload_title: string
  pred_select_sample: string
  pred_diagnose: string
  pred_result_title: string

  // ─── Fertilizer Advisor Page ─────────────────────────────
  fa_title: string
  fa_subtitle: string
  fa_soil_type: string
  fa_crop_type: string
  fa_calculate: string
  fa_recommendation: string

  // ─── Farm Planner Page ───────────────────────────────────
  fp_title: string
  fp_subtitle: string
  fp_seasonal_schedule: string
  fp_add_activity: string

  // ─── Government Schemes Page ─────────────────────────────
  gs_title: string
  gs_subtitle: string
  gs_search: string
  gs_all_schemes: string
  gs_subsidies: string
  gs_insurance: string
  gs_financial_support: string
  gs_apply_now: string
  gs_eligibility: string
  gs_benefits: string

  // ─── How To Use Page ─────────────────────────────────────
  htu_title: string
  htu_subtitle: string
  htu_quick_steps: string

  // ─── Login Page ──────────────────────────────────────────
  login_title: string
  login_subtitle: string
  login_step1: string
  login_step2: string
  login_step1_sub: string
  login_step2_sub: string
  login_full_name: string
  login_phone: string
  login_send_otp: string
  login_verify_otp: string
  login_resend_otp: string
}

const translations: Record<LangCode, Translations> = {
  en: {
    // Nav
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
    nav_how_to_use: 'How to Use',

    sec_overview: 'Overview',
    sec_tools: 'Tools',
    sec_main: 'Main',
    sec_farm_tools: 'Farm Tools',
    sec_information: 'Information',
    brand_tagline: 'Smart Farming Assistant',
    brand_sub: 'Your simple farming assistant',
    my_account: 'My Account',

    help_how_to_use: 'How to Use',
    help_panel_title: 'How to Use SmartFarm AI',

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
    loading_text: 'Loading...',
    back_to_home: 'Back to Home',

    // Disease Detection
    dd_badge: 'AI Plant Pathology • MobileNetV3 Architecture',
    dd_title_prefix: 'Plant Leaf',
    dd_title_highlight: 'Disease Detection',
    dd_subtitle:
      'Instantly scan crop leaves to identify Bacterial Blight, Leaf Curl Virus, and Fusarium Wilt. Get agricultural remedies, dosage charts, and scientific treatment protocols.',
    dd_tab_upload: 'Upload Photo',
    dd_tab_camera: 'Live Camera',
    dd_tab_samples: 'Demo Samples',
    dd_drop_title: 'Click to upload or drag & drop leaf photo',
    dd_drop_sub: 'JPG, PNG, WebP up to 10MB (Single leaf in focus)',
    dd_select_btn: 'Select Leaf Image',
    dd_diagnose_btn: 'Diagnose Plant Disease',
    dd_analyzing_btn: 'Analyzing Leaf...',
    dd_change_photo: 'Change Photo',
    dd_awaiting_title: 'Awaiting Leaf Inspection',
    dd_awaiting_desc:
      'Upload an image from your device, take a live snapshot with the camera, or choose a demo leaf sample to view real-time disease classification and treatment recommendations.',
    dd_sample_blight: 'Bacterial Blight',
    dd_sample_curl: 'Leaf Curl Virus',
    dd_sample_wilt: 'Fusarium Wilt',
    dd_sample_healthy: 'Healthy Leaf',
    dd_camera_start: 'Start Camera',
    dd_camera_capture: 'Capture Snapshot',
    dd_camera_stop: 'Stop Camera',
    dd_diagnosis_result: 'Diagnosis Result',
    dd_confidence: 'Confidence Score',
    dd_severity: 'Severity Level',
    dd_detected_disease: 'Identified Disease',
    dd_symptoms: 'Identified Symptoms',
    dd_immediate_actions: 'Immediate Farmer Actions',
    dd_chemical_control: 'Chemical Controls & Dosages',
    dd_organic_control: 'Organic & Biological Remedies',
    dd_prevention: 'Long-term Prevention',
    dd_scan_another: 'Scan Another Leaf',
    dd_pipeline_title: 'Model Architecture & Pipeline',
    dd_healthy_title: 'Healthy Crop — No Disease Detected',
    dd_healthy_desc: 'Your leaf exhibits optimal chlorophyll health and no active pathogen infestation.',

    // Dashboard
    db_welcome: 'Welcome',
    db_authenticated: 'Authenticated',
    db_sms_verified: 'SMS Verified',
    db_phone_label: 'Phone',
    db_sign_out: 'Sign Out',
    db_tools_title: 'Smart Farming Tools & Services',
    db_open_tool: 'Open Tool →',
    db_ai_title: 'AI Farming Assistant',
    db_ai_desc: 'Ask any farming query, pest problem, or fertilizer tip in your language',
    db_crop_title: 'Crop Recommendation',
    db_crop_desc: 'Get data-backed crop suggestions for your soil type and season',
    db_disease_title: 'Disease Detection',
    db_disease_desc: 'Upload crop leaf photos to instantly detect diseases & remedies',
    db_weather_title: 'Weather Advisory',
    db_weather_desc: 'Live 7-day temperature, rainfall, and wind forecast for your farm',
    db_schemes_title: 'Government Schemes',
    db_schemes_desc: 'Explore available subsidies, financial grants, and PM-KISAN updates',
    db_prediction_title: 'Potato Harvest Prediction',
    db_prediction_desc: 'Detect Early & Late Blight in potato crops with harvest advisory',
    db_weather_today: 'Weather Today',
    db_crop_matches: 'Crop Matches',
    db_health_alerts: 'Health Alerts',
    db_scan_leaf_btn: 'Scan Leaf with Camera →',
    db_ai_suggested: 'AI Suggested',
    db_early_blight_risk: 'Early Blight Risk',
    db_early_blight_sub: 'Tomato Crop • Wet humidity',
    db_rust_fungus_risk: 'Rust Fungus Warning',
    db_rust_fungus_sub: 'Wheat Crop • Moderate',
    db_humidity: 'Humidity',
    db_wind: 'Wind',
    db_uv_index: 'UV Index',

    // Weather
    w_title: 'Agricultural Weather Radar',
    w_subtitle: 'Hyperlocal 7-day meteorological forecast tailored for Indian farming operations.',
    w_today: "Today's Farm Weather",
    w_forecast_7day: '7-Day Agronomic Forecast',
    w_temp: 'Temperature',
    w_humidity: 'Air Humidity',
    w_wind: 'Wind Velocity',
    w_precipitation: 'Rainfall Precipitation',
    w_farming_advisory: 'Agricultural Advisory for Today',

    // Prediction
    pred_title: 'Potato Crop Disease & Yield Prediction',
    pred_subtitle: 'Deep Learning pipeline specialized for potato foliage pathology & harvest safety.',
    pred_upload_title: 'Upload Potato Leaf',
    pred_select_sample: 'Select Demo Sample',
    pred_diagnose: 'Predict Disease & Yield Impact',
    pred_result_title: 'Diagnostic Prediction Output',

    // Fertilizer
    fa_title: 'Smart Fertilizer Dosage Advisor',
    fa_subtitle: 'Scientific N-P-K nutrient balancing based on soil deficiency and crop lifecycle.',
    fa_soil_type: 'Soil Type',
    fa_crop_type: 'Target Crop',
    fa_calculate: 'Calculate Optimum Fertilizer Mix',
    fa_recommendation: 'Fertilizer Recommendation Plan',

    // Planner
    fp_title: 'Farm Activity & Schedule Planner',
    fp_subtitle: 'Plan sowing, irrigation, fertilization, and harvesting with precision.',
    fp_seasonal_schedule: 'Seasonal Farming Schedule',
    fp_add_activity: 'Add Farm Activity',

    // Schemes
    gs_title: 'Government Agricultural Schemes & Subsidies',
    gs_subtitle: 'Discover central and state government farmer support programs, grants, and credit facilities.',
    gs_search: 'Search schemes by keyword...',
    gs_all_schemes: 'All Schemes',
    gs_subsidies: 'Subsidies & Equipment',
    gs_insurance: 'Crop Insurance',
    gs_financial_support: 'Financial Support',
    gs_apply_now: 'Official Portal / Apply →',
    gs_eligibility: 'Eligibility Criteria',
    gs_benefits: 'Direct Benefits',

    // How to Use
    htu_title: 'How to Use SmartFarm AI',
    htu_subtitle: 'A complete step-by-step visual roadmap for farmers to maximize agricultural yield.',
    htu_quick_steps: 'Farm Workflow Guide',

    // Login
    login_title: 'Sign In with Phone Number',
    login_subtitle: 'Enter your mobile number to receive a secure SMS OTP via Twilio. No password or email needed.',
    login_step1: 'Step 1 of 2',
    login_step2: 'Step 2 of 2',
    login_step1_sub: 'Enter your name and phone number to receive an SMS OTP.',
    login_step2_sub: 'Please enter the 6-digit code sent to your phone.',
    login_full_name: 'Your Full Name',
    login_phone: 'Mobile Phone Number',
    login_send_otp: 'Send OTP',
    login_verify_otp: 'Verify & Sign In',
    login_resend_otp: 'Resend OTP',
  },

  hi: {
    // Nav
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
    nav_how_to_use: 'उपयोग निर्देश',

    sec_overview: 'अवलोकन',
    sec_tools: 'उपकरण',
    sec_main: 'मुख्य',
    sec_farm_tools: 'कृषि उपकरण',
    sec_information: 'जानकारी',
    brand_tagline: 'स्मार्ट कृषि सहायक',
    brand_sub: 'आपका सरल खेती सहायक',
    my_account: 'मेरा खाता',

    help_how_to_use: 'उपयोग निर्देश',
    help_panel_title: 'स्मार्टफार्म AI का उपयोग कैसे करें',

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
    loading_text: 'लोड हो रहा है...',
    back_to_home: 'होम पर वापस जाएं',

    // Disease Detection
    dd_badge: 'एआई पादप रोग विज्ञान • MobileNetV3 आर्किटेक्चर',
    dd_title_prefix: 'पौधों के पत्तों की',
    dd_title_highlight: 'रोग पहचान',
    dd_subtitle:
      'जीवाणु झुलसा (Bacterial Blight), लीफ कर्ल वायरस और फ्यूजेरियम विल्ट की तुरंत पहचान के लिए पत्तियों को स्कैन करें। सटीक कृषि उपाय, कीटनाशक मात्रा और वैज्ञानिक उपचार पाएं।',
    dd_tab_upload: 'फोटो अपलोड करें',
    dd_tab_camera: 'लाइव कैमरा',
    dd_tab_samples: 'डेमो नमूने',
    dd_drop_title: 'पत्ती की फोटो अपलोड करें या खींचकर लाएं',
    dd_drop_sub: 'JPG, PNG, WebP अधिकतम 10MB (एक पत्ती स्पष्ट रूप से केंद्रित हो)',
    dd_select_btn: 'पत्ती की फोटो चुनें',
    dd_diagnose_btn: 'रोग की जांच करें',
    dd_analyzing_btn: 'पत्ती का विश्लेषण जारी है...',
    dd_change_photo: 'फोटो बदलें',
    dd_awaiting_title: 'पत्ती की जांच की प्रतीक्षा है',
    dd_awaiting_desc:
      'अपनी डिवाइस से फोटो अपलोड करें, कैमरे से लाइव फोटो लें, या डेमो नमूना चुनकर तुरंत रोग पहचान और उपचार सलाह प्राप्त करें।',
    dd_sample_blight: 'बैक्टीरियल ब्लाइट',
    dd_sample_curl: 'लीफ कर्ल वायरस',
    dd_sample_wilt: 'फ्यूजेरियम विल्ट',
    dd_sample_healthy: 'स्वस्थ पत्ती',
    dd_camera_start: 'कैमरा चालू करें',
    dd_camera_capture: 'फोटो खींचें',
    dd_camera_stop: 'कैमरा बंद करें',
    dd_diagnosis_result: 'जांच परिणाम',
    dd_confidence: 'सटीकता दर',
    dd_severity: 'गंभीरता का स्तर',
    dd_detected_disease: 'पहचाना गया रोग',
    dd_symptoms: 'रोग के लक्षण',
    dd_immediate_actions: 'तत्काल जरूरी कदम',
    dd_chemical_control: 'रासायनिक नियंत्रण और कीटनाशक खुराक',
    dd_organic_control: 'जैविक व प्राकृतिक उपचार',
    dd_prevention: 'भविष्य में बचाव के उपाय',
    dd_scan_another: 'दूसरी पत्ती स्कैन करें',
    dd_pipeline_title: 'मॉडल आर्किटेक्चर और पाइपलाइन',
    dd_healthy_title: 'स्वस्थ पौधा — कोई रोग नहीं मिला',
    dd_healthy_desc: 'पत्ती पूरी तरह स्वस्थ है और इसमें किसी प्रकार के रोग या संक्रमण के लक्षण नहीं हैं।',

    // Dashboard
    db_welcome: 'नमस्ते',
    db_authenticated: 'सत्यापित किसान',
    db_sms_verified: 'एसएमएस सत्यापित',
    db_phone_label: 'फ़ोन',
    db_sign_out: 'लॉग आउट',
    db_tools_title: 'स्मार्ट कृषि उपकरण और सेवाएं',
    db_open_tool: 'उपकरण खोलें →',
    db_ai_title: 'एआई कृषि सहायक',
    db_ai_desc: 'अपनी भाषा में खेती, कीट समस्या या खाद की सलाह पूछें',
    db_crop_title: 'फसल सुझाव',
    db_crop_desc: 'अपनी मिट्टी और मौसम के अनुसार सर्वोत्तम फसलों के सुझाव पाएं',
    db_disease_title: 'रोग पहचान',
    db_disease_desc: 'पत्तियों की फोटो अपलोड करके तुरंत रोग और उपचार जानें',
    db_weather_title: 'मौसम पूर्वानुमान',
    db_weather_desc: 'अपने खेत के लिए 7 दिनों का तापमान, बारिश और हवा का सटीक पूर्वानुमान',
    db_schemes_title: 'सरकारी योजनाएं',
    db_schemes_desc: 'उपलब्ध सब्सिडी, आर्थिक सहायता और पीएम-किसान की जानकारी देखें',
    db_prediction_title: 'आलू पैदावार व रोग अनुमान',
    db_prediction_desc: 'आलू की फसल में अगेती व पछेती झुलसा पहचानें और पैदावार सलाह पाएं',
    db_weather_today: 'आज का मौसम',
    db_crop_matches: 'उपयुक्त फसलें',
    db_health_alerts: 'स्वास्थ्य अलर्ट',
    db_scan_leaf_btn: 'कैमरे से पत्ती स्कैन करें →',
    db_ai_suggested: 'एआई अनुशंसित',
    db_early_blight_risk: 'अगेती झुलसा (Early Blight) का जोखिम',
    db_early_blight_sub: 'टमाटर फसल • उच्च आर्द्रता',
    db_rust_fungus_risk: 'गेरुई (Rust) फफूंद चेतावनी',
    db_rust_fungus_sub: 'गेहूं की फसल • मध्यम खतरा',
    db_humidity: 'नमी (आर्द्रता)',
    db_wind: 'हवा की गति',
    db_uv_index: 'यूवी इंडेक्स',

    // Weather
    w_title: 'कृषि मौसम रडार',
    w_subtitle: 'भारतीय खेती के लिए विशेष रूप से तैयार 7-दिवसीय मौसम पूर्वानुमान।',
    w_today: 'आज खेत का मौसम',
    w_forecast_7day: '7 दिनों का कृषि पूर्वानुमान',
    w_temp: 'तापमान',
    w_humidity: 'हवा में नमी',
    w_wind: 'हवा की गति',
    w_precipitation: 'बारिश की संभावना',
    w_farming_advisory: 'आज के लिए कृषि सलाह',

    // Prediction
    pred_title: 'आलू की फसल रोग व पैदावार अनुमान',
    pred_subtitle: 'आलू की पत्तियों के रोगों की पहचान और फसल सुरक्षा के लिए डीप लर्निंग सिस्टम।',
    pred_upload_title: 'आलू की पत्ती अपलोड करें',
    pred_select_sample: 'डेमो पत्ती चुनें',
    pred_diagnose: 'रोग व पैदावार असर का अनुमान लगाएं',
    pred_result_title: 'निदान परिणाम',

    // Fertilizer
    fa_title: 'स्मार्ट खाद व उर्वरक सलाहकार',
    fa_subtitle: 'मिट्टी की पोषक तत्व कमी और फसल चरण के आधार पर वैज्ञानिक N-P-K खाद मात्रा।',
    fa_soil_type: 'मिट्टी का प्रकार',
    fa_crop_type: 'फसल का नाम',
    fa_calculate: 'खाद की सही मात्रा की गणना करें',
    fa_recommendation: 'खाद उपयोग योजना व सिफारिशें',

    // Planner
    fp_title: 'कृषि कार्य व समय योजनाकार',
    fp_subtitle: 'बुवाई, सिंचाई, खाद और कटाई के कार्यों को समय पर पूरा करने की योजना बनाएं।',
    fp_seasonal_schedule: 'मौसमी कृषि समय-सारिणी',
    fp_add_activity: 'नया कृषि कार्य जोड़ें',

    // Schemes
    gs_title: 'सरकारी कृषि योजनाएं और सब्सिडी',
    gs_subtitle: 'केंद्र और राज्य सरकार की किसान कल्याणकारी योजनाएं, अनुदान और फसल बीमा।',
    gs_search: 'कीवर्ड से योजना खोजें...',
    gs_all_schemes: 'सभी योजनाएं',
    gs_subsidies: 'सब्सिडी व कृषि यंत्र',
    gs_insurance: 'फसल बीमा',
    gs_financial_support: 'वित्तीय सहायता',
    gs_apply_now: 'आधिकारिक पोर्टल / आवेदन करें →',
    gs_eligibility: 'पात्रता शर्तें',
    gs_benefits: 'योजना के लाभ',

    // How to Use
    htu_title: 'स्मार्टफार्म AI का उपयोग कैसे करें',
    htu_subtitle: 'किसानों के लिए फसल उत्पादन बढ़ाने और समस्याओं के समाधान की सरल मार्गदर्शिका।',
    htu_quick_steps: 'कदम-दर-कदम उपयोग गाइड',

    // Login
    login_title: 'मोबाइल नंबर से लॉग इन करें',
    login_subtitle: 'Twilio द्वारा सुरक्षित SMS OTP पाने के लिए मोबाइल नंबर दर्ज करें। पासवर्ड या ईमेल की जरूरत नहीं।',
    login_step1: 'चरण 1 / 2',
    login_step2: 'चरण 2 / 2',
    login_step1_sub: 'SMS OTP प्राप्त करने के लिए अपना नाम और फ़ोन नंबर दर्ज करें।',
    login_step2_sub: 'कृपया अपने फ़ोन पर आया हुआ 6-अंकों का OTP कोड दर्ज करें।',
    login_full_name: 'आपका पूरा नाम',
    login_phone: 'मोबाइल फ़ोन नंबर',
    login_send_otp: 'ओटीपी भेजें',
    login_verify_otp: 'सत्यापित करें और लॉग इन करें',
    login_resend_otp: 'ओटीपी पुनः भेजें',
  },

  mr: {
    // Nav
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
    nav_how_to_use: 'वापर कसा करावा',

    sec_overview: 'आढावा',
    sec_tools: 'साधने',
    sec_main: 'मुख्य',
    sec_farm_tools: 'शेती साधने',
    sec_information: 'माहिती',
    brand_tagline: 'स्मार्ट शेती सहाय्यक',
    brand_sub: 'तुमचा साधा सोपा शेती मित्र',
    my_account: 'माझे खाते',

    help_how_to_use: 'वापर कसा करावा',
    help_panel_title: 'स्मार्टफार्म AI कसे वापरावे',

    ai_welcome:
      'नमस्कार! 🌱 मी कृषी मित्र आहे, तुमचा AI शेती सहाय्यक।\n\nपीक, कीड, माती, खत, हवामान किंवा शासकीय योजनांबद्दल काहीही विचारा।',
    ai_suggestions: [
      '🌾 खरीप हंगामासाठी पीक सुचवा',
      '🐛 पाने पिवळी होत आहेत, काय करावे?',
      '🧪 गव्हासाठी सर्वोत्तम खत',
      '🌦️ शेतीसाठी पावसाचा अंदाज',
    ],
    ai_input_placeholder: 'कृषी मित्राला काहीही विचारा...',
    ai_typing: 'कृषी मित्र उत्तर तयार करत आहे...',
    ai_disclaimer: 'AI चुका करू शकतो. महत्त्वाच्या सल्ल्यासाठी स्थानिक कृषी तज्ञांशी संपर्क करा.',
    ai_new_chat: 'नवीन संभाषण',
    ai_tooltip: 'कृषी मित्राला विचारा 🤖',
    ai_system_lang_instruction:
      'कृपया मराठीत उत्तर द्या. शेतकरी-मित्र भाषेत, सोप्या आणि व्यावहारिक पद्धतीने।',

    search_placeholder: 'योजना शोधा...',
    loading_text: 'लोड होत आहे...',
    back_to_home: 'मुख्यपृष्ठावर परत जा',

    // Disease Detection
    dd_badge: 'एआय वनस्पती रोगशास्त्र • MobileNetV3 आर्किटेक्चर',
    dd_title_prefix: 'झाडांच्या पानांवरील',
    dd_title_highlight: 'रोग ओळख',
    dd_subtitle:
      'बॅक्टेरियल ब्लाइट, लीफ कर्ल व्हायरस आणि फ्युसेरियम विल्ट त्वरित ओळखण्यासाठी पिकांच्या पानांचे स्कॅन करा. शास्त्रोक्त औषधोपचार, खत फवारणी आणि उपाययोजना मिळवा.',
    dd_tab_upload: 'फोटो अपलोड करा',
    dd_tab_camera: 'थेट कॅमेरा',
    dd_tab_samples: 'डेमो नमुने',
    dd_drop_title: 'पानाचा फोटो अपलोड करण्यासाठी क्लिक करा किंवा ड्रॅग करा',
    dd_drop_sub: 'JPG, PNG, WebP कमाल 10MB (एकच पान स्पष्ट असावे)',
    dd_select_btn: 'पानाचा फोटो निवडा',
    dd_diagnose_btn: 'वनस्पती रोगाचे निदान करा',
    dd_analyzing_btn: 'पानाची तपासणी सुरू आहे...',
    dd_change_photo: 'फोटो बदला',
    dd_awaiting_title: 'पानाच्या तपासणीची प्रतीक्षा आहे',
    dd_awaiting_desc:
      'डिव्हाइसवरून फोटो अपलोड करा, कॅमेऱ्याने थेट फोटो घ्या किंवा डेमो नमुना निवडून त्वरित रोग ओळख आणि उपाययोजना पहा.',
    dd_sample_blight: 'बॅक्टेरियल ब्लाइट',
    dd_sample_curl: 'लीफ कर्ल व्हायरस',
    dd_sample_wilt: 'फ्युसेरियम विल्ट',
    dd_sample_healthy: 'निरोगी पान',
    dd_camera_start: 'कॅमेरा सुरू करा',
    dd_camera_capture: 'फोटो काढा',
    dd_camera_stop: 'कॅमेरा बंद करा',
    dd_diagnosis_result: 'निदान निकाल',
    dd_confidence: 'अचूकता दर',
    dd_severity: 'तीव्रतेची पातळी',
    dd_detected_disease: 'आढळलेला रोग',
    dd_symptoms: 'रोगाची लक्षणे',
    dd_immediate_actions: 'शेतकऱ्यांसाठी तातडीची पावले',
    dd_chemical_control: 'रासायनिक फवारणी व औषध प्रमाण',
    dd_organic_control: 'सेंद्रिय व जैविक उपाय',
    dd_prevention: 'भविष्यातील प्रतिबंधात्मक काळजी',
    dd_scan_another: 'दुसरे पान तपासा',
    dd_pipeline_title: 'मॉडेल आर्किटेक्चर आणि पाइपलाइन',
    dd_healthy_title: 'निरोगी पीक — कोणताही रोग आढळला नाही',
    dd_healthy_desc: 'आपले पान पूर्णपणे निरोगी असून त्यावर कोणत्याही बुरशी किंवा किडीचा प्रादुर्भाव नाही.',

    // Dashboard
    db_welcome: 'स्वागत आहे',
    db_authenticated: 'प्रमाणित शेतकरी',
    db_sms_verified: 'एसएमएस पडताळणीकृत',
    db_phone_label: 'फोन',
    db_sign_out: 'लॉग आउट',
    db_tools_title: 'स्मार्ट शेती साधने आणि सेवा',
    db_open_tool: 'साधन उघडा →',
    db_ai_title: 'एआय शेती सहाय्यक',
    db_ai_desc: 'आपल्या भाषेत पीक, कीड किंवा खतांचा सल्ला विचारा',
    db_crop_title: 'पीक सल्ला',
    db_crop_desc: 'आपल्या माती आणि हंगामानुसार योग्य पिकांची शिफारस मिळवा',
    db_disease_title: 'रोग ओळख',
    db_disease_desc: 'पानांचा फोटो अपलोड करून त्वरित रोग व उपाय शोधा',
    db_weather_title: 'हवामान सल्ला',
    db_weather_desc: 'शेतासाठी 7 दिवसांचे तापमान, पाऊस आणि वाऱ्याचा थेट अंदाज',
    db_schemes_title: 'शासकीय योजना',
    db_schemes_desc: 'उपलब्ध अनुदान, आर्थिक मदत आणि पीएम-किसानची माहिती पहा',
    db_prediction_title: 'बटाटा रोग व उत्पादन अंदाज',
    db_prediction_desc: 'बटाटा पिकातील करपा रोग ओळखा आणि काढणी सल्ला मिळवा',
    db_weather_today: 'आजचे हवामान',
    db_crop_matches: 'योग्य पिके',
    db_health_alerts: 'आरोग्य सूचना',
    db_scan_leaf_btn: 'कॅमेऱ्याने पान स्कॅन करा →',
    db_ai_suggested: 'एआय द्वारे सुचवलेले',
    db_early_blight_risk: 'लवकर येणाऱ्या करप्याचा धोका (Early Blight)',
    db_early_blight_sub: 'टोमॅटो पीक • जास्त आर्द्रता',
    db_rust_fungus_risk: 'तांबेरा बुरशी इशारा (Rust Fungus)',
    db_rust_fungus_sub: 'गहू पीक • मध्यम धोका',
    db_humidity: 'हवेतील आर्द्रता',
    db_wind: 'वाऱ्याचा वेग',
    db_uv_index: 'अतिनील निर्देशांक (UV)',

    // Weather
    w_title: 'शेती हवामान रडार',
    w_subtitle: 'शेतकऱ्यांसाठी अचूक 7 दिवसांचे कृषी हवामान अंदाज.',
    w_today: 'आजचे शेतातील हवामान',
    w_forecast_7day: '7 दिवसांचा कृषी अंदाज',
    w_temp: 'तापमान',
    w_humidity: 'हवेतील आर्द्रता',
    w_wind: 'वाऱ्याचा वेग',
    w_precipitation: 'पावसाची शक्यता',
    w_farming_advisory: 'आजचा कृषी सल्ला',

    // Prediction
    pred_title: 'बटाटा पीक रोग व उत्पादन अंदाज',
    pred_subtitle: 'बटाटा पिकावरील रोग ओळखण्यासाठी आणि उत्पादनाचे नुकसान टाळण्यासाठी प्रगत प्रणाली.',
    pred_upload_title: 'बटाटा पानाचा फोटो अपलोड करा',
    pred_select_sample: 'डेमो नमुना निवडा',
    pred_diagnose: 'रोग व उत्पादनावरील परिणाम तपासा',
    pred_result_title: 'निदान निकाल',

    // Fertilizer
    fa_title: 'स्मार्ट खत मात्रा सल्लागार',
    fa_subtitle: 'मातीतील घटकांची कमतरता व पिकांच्या टप्प्यांनुसार शास्त्रीय N-P-K खत प्रमाण.',
    fa_soil_type: 'मातीचा प्रकार',
    fa_crop_type: 'पिकाचे नाव',
    fa_calculate: 'योग्य खत प्रमाणाची गणना करा',
    fa_recommendation: 'खत व्यवस्थापन शिफारस योजना',

    // Planner
    fp_title: 'शेती कार्य व वेळापत्रक नियोजक',
    fp_subtitle: 'पेरणी, पाणी, खते आणि काढणीचे नियोजन अचूक वेळेवर करा.',
    fp_seasonal_schedule: 'हंगामी शेती वेळापत्रक',
    fp_add_activity: 'नवीन शेती काम जोडा',

    // Schemes
    gs_title: 'शासकीय कृषी योजना आणि अनुदाने',
    gs_subtitle: 'केंद्र व राज्य शासनाच्या शेतकरी कल्याणकारी योजना, अनुदान आणि पीक विमा.',
    gs_search: 'योजना शोधा...',
    gs_all_schemes: 'सर्व योजना',
    gs_subsidies: 'अनुदान व अवजारे',
    gs_insurance: 'पीक विमा',
    gs_financial_support: 'आर्थिक सहाय्य',
    gs_apply_now: 'अधिकृत पोर्टल / अर्ज करा →',
    gs_eligibility: 'पात्रतेचे निकष',
    gs_benefits: 'योजनेचे थेट फायदे',

    // How to Use
    htu_title: 'स्मार्टफार्म AI कसे वापरावे',
    htu_subtitle: 'शेतकऱ्यांसाठी पीक उत्पादन वाढवण्यासाठी आणि मार्गदर्शन मिळवण्यासाठी संपूर्ण मार्गदर्शक.',
    htu_quick_steps: 'कदम-दर-कदम वापर मार्गदर्शक',

    // Login
    login_title: 'मोबाईल क्रमांकाने लॉगिन करा',
    login_subtitle: 'Twilio द्वारे सुरक्षित SMS OTP मिळवण्यासाठी मोबाईल नंबर टाका. पासवर्ड किंवा ईमेलची गरज नाही.',
    login_step1: 'पायरी 1 / 2',
    login_step2: 'पायरी 2 / 2',
    login_step1_sub: 'SMS OTP मिळवण्यासाठी आपले नाव आणि मोबाईल नंबर टाका.',
    login_step2_sub: 'कृपया आपल्या फोनवर आलेला 6-अंकी OTP कोड टाका.',
    login_full_name: 'आपले पूर्ण नाव',
    login_phone: 'मोबाईल फोन नंबर',
    login_send_otp: 'ओटीपी पाठवा',
    login_verify_otp: 'पडताळणी करा आणि लॉगिन व्हा',
    login_resend_otp: 'ओटीपी पुन्हा पाठवा',
  },

  gu: {
    // Nav
    nav_home: 'હોમ',
    nav_disease_detection: 'રોગ ઓળખ',
    nav_crop_recommendation: 'પાક ભલામણ',
    nav_weather: 'હવામાન',
    nav_farm_planner: 'ખેતી આયોજક',
    nav_fertilizer_advisor: 'ખાતર સલાહકાર',
    nav_govt_schemes: 'સરકારી યોજનાઓ',
    nav_about_us: 'અમારા વિશે',
    nav_sign_in: 'લૉગ ઇન',
    nav_dashboard: 'ડેશબોર્ડ',
    nav_log_out: 'લૉગ આઉટ',
    nav_prediction: 'પૂર્વાનુમાન',
    nav_how_to_use: 'કેવી રીતે વાપરવું',

    sec_overview: 'વિહંગાવલોકન',
    sec_tools: 'સાધનો',
    sec_main: 'મુખ્ય',
    sec_farm_tools: 'ખેતી સાધનો',
    sec_information: 'માહિતી',
    brand_tagline: 'સ્માર્ટ ફાર્મિંગ આસિસ્ટન્ટ',
    brand_sub: 'તમારો સરળ ખેતી સહાયક',
    my_account: 'મારું ખાતું',

    help_how_to_use: 'કેવી રીતે વાપરવું',
    help_panel_title: 'SmartFarm AI કેવી રીતે વાપરવું',

    ai_welcome:
      'નમસ્તે! 🌱 હું કૃષિ મિત્ર છું, તમારો AI ખેતી સહાયક.\n\nપાક, જીવાત, જમીન, ખાતર, હવામાન કે સરકારી યોજનાઓ વિશે કંઈપણ પૂછો.',
    ai_suggestions: [
      '🌾 ખરીફ ઋતુ માટે પાક સૂચન',
      '🐛 પાંદડા પીળા પડે છે, શું કરવું?',
      '🧪 ઘઉં માટે શ્રેષ્ઠ ખાતર',
      '🌦️ ખેતી માટે વરસાદની આગાહી',
    ],
    ai_input_placeholder: 'કૃષિ મિત્રને કંઈપણ પૂછો...',
    ai_typing: 'કૃષિ મિત્ર જવાબ લખી રહ્યો છે...',
    ai_disclaimer: 'AI ભૂલ કરી શકે છે. મહત્વપૂર્ણ સલાહ સ્થાનિક કૃષિ નિષ્ણાત પાસેથી ચકાસો.',
    ai_new_chat: 'નવી વાતચીત',
    ai_tooltip: 'કૃષિ મિત્રને પૂછો 🤖',
    ai_system_lang_instruction:
      'કૃપા કરીને ગુજરાતી ભાષામાં જવાબ આપો. ખેડૂતોને સમજાય તેવી સરળ અને વ્યવહારુ ભાષામાં લખો.',

    search_placeholder: 'યોજનાઓ શોધો...',
    loading_text: 'લોડ થઈ રહ્યું છે...',
    back_to_home: 'હોમ પર પાછા જાઓ',

    // Disease Detection
    dd_badge: 'AI વનસ્પતિ રોગવિજ્ઞાન • MobileNetV3 આર્કિટેક્ચર',
    dd_title_prefix: 'છોડના પાંદડાની',
    dd_title_highlight: 'રોગ ઓળખ',
    dd_subtitle:
      'બેક્ટેરિયલ બ્લાઇટ, લીફ કર્લ વાયરસ અને ફ્યુઝેરિયમ વિલ્ટ તરત ઓળખવા માટે પાંદડા સ્કેન કરો. કૃષિ ઉપાયો, માત્રા અને વૈજ્ઞાનિક સારવાર મેળવો.',
    dd_tab_upload: 'ફોટો અપલોડ કરો',
    dd_tab_camera: 'લાઇવ કેમેરા',
    dd_tab_samples: 'ડેમો નમૂનાઓ',
    dd_drop_title: 'પાંદડાનો ફોટો અપલોડ કરવા ક્લિક કરો અથવા અહીં ખેંચો',
    dd_drop_sub: 'JPG, PNG, WebP વધુમાં વધુ 10MB (એક પાંદડું સ્પષ્ટ દેખાય)',
    dd_select_btn: 'પાંદડાનો ફોટો પસંદ કરો',
    dd_diagnose_btn: 'છોડના રોગનું નિદાન કરો',
    dd_analyzing_btn: 'પાંદડાનું વિશ્લેષણ ચાલુ છે...',
    dd_change_photo: 'ફોટો બદલો',
    dd_awaiting_title: 'પાંદડાની તપાસની રાહ છે',
    dd_awaiting_desc:
      'તમારા ડિવાઇસમાંથી ફોટો અપલોડ કરો, કેમેરાથી લાઇવ ફોટો લો અથવા ડેમો નમૂનો પસંદ કરીને તરત રોગ ઓળખ અને સારવાર જુઓ.',
    dd_sample_blight: 'બેક્ટેરિયલ બ્લાઇટ',
    dd_sample_curl: 'લીફ કર્લ વાયરસ',
    dd_sample_wilt: 'ફ્યુઝેરિયમ વિલ્ટ',
    dd_sample_healthy: 'સ્વસ્થ પાંદડું',
    dd_camera_start: 'કેમેરા ચાલુ કરો',
    dd_camera_capture: 'ફોટો પાડો',
    dd_camera_stop: 'કેમેરા બંધ કરો',
    dd_diagnosis_result: 'નિદાન પરિણામ',
    dd_confidence: 'ચોકસાઈ દર',
    dd_severity: 'ગંભીરતા સ્તર',
    dd_detected_disease: 'ઓળખાયેલ રોગ',
    dd_symptoms: 'રોગના લક્ષણો',
    dd_immediate_actions: 'ખેડૂત માટે તાત્કાલિક પગલાં',
    dd_chemical_control: 'રાસાયણિક નિયંત્રણ અને માત્રા',
    dd_organic_control: 'જૈવિક અને કુદરતી ઉપાયો',
    dd_prevention: 'લાંબા ગાળાનું નિવારણ',
    dd_scan_another: 'બીજું પાંદડું સ્કેન કરો',
    dd_pipeline_title: 'મોડેલ આર્કિટેક્ચર અને પાઇપલાઇન',
    dd_healthy_title: 'સ્વસ્થ પાક — કોઈ રોગ મળ્યો નથી',
    dd_healthy_desc: 'તમારું પાંદડું સંપૂર્ણ સ્વસ્થ છે અને તેમાં કોઈ રોગ કે ચેપના લક્ષણો નથી.',

    // Dashboard
    db_welcome: 'નમસ્તે',
    db_authenticated: 'પ્રમાણિત',
    db_sms_verified: 'SMS ચકાસાયેલ',
    db_phone_label: 'ફોન',
    db_sign_out: 'સાઇન આઉટ',
    db_tools_title: 'સ્માર્ટ ખેતી સાધનો અને સેવાઓ',
    db_open_tool: 'સાધન ખોલો →',
    db_ai_title: 'AI ખેતી સહાયક',
    db_ai_desc: 'તમારી ભાષામાં ખેતી, જીવાત કે ખાતર વિશે કોઈપણ પ્રશ્ન પૂછો',
    db_crop_title: 'પાક ભલામણ',
    db_crop_desc: 'તમારી જમીન અને ઋતુ મુજબ શ્રેષ્ઠ પાકોના સૂચનો મેળવો',
    db_disease_title: 'રોગ ઓળખ',
    db_disease_desc: 'પાંદડાનો ફોટો અપલોડ કરી તરત રોગ અને ઉપાય જાણો',
    db_weather_title: 'હવામાન સલાહ',
    db_weather_desc: 'તમારા ખેતર માટે 7 દિવસનું તાપમાન, વરસાદ અને પવન પૂર્વાનુમાન',
    db_schemes_title: 'સરકારી યોજનાઓ',
    db_schemes_desc: 'ઉપલબ્ધ સબસિડી, આર્થિક સહાય અને PM-KISAN અપડેટ્સ જુઓ',
    db_prediction_title: 'બટાકાના પાકનું પૂર્વાનુમાન',
    db_prediction_desc: 'બટાકામાં અર્લી અને લેટ બ્લાઇટ ઓળખી લણણીની સલાહ મેળવો',
    db_weather_today: 'આજનું હવામાન',
    db_crop_matches: 'યોગ્ય પાકો',
    db_health_alerts: 'આરોગ્ય ચેતવણીઓ',
    db_scan_leaf_btn: 'કેમેરાથી પાંદડું સ્કેન કરો →',
    db_ai_suggested: 'AI સૂચિત',
    db_early_blight_risk: 'અર્લી બ્લાઇટનું જોખમ',
    db_early_blight_sub: 'ટામેટાનો પાક • વધુ ભેજ',
    db_rust_fungus_risk: 'ગેરુ (Rust) ફૂગ ચેતવણી',
    db_rust_fungus_sub: 'ઘઉંનો પાક • મધ્યમ જોખમ',
    db_humidity: 'ભેજ',
    db_wind: 'પવન',
    db_uv_index: 'UV ઇન્ડેક્સ',

    // Weather
    w_title: 'કૃષિ હવામાન રડાર',
    w_subtitle: 'ભારતીય ખેતી માટે ખાસ તૈયાર કરાયેલ 7-દિવસીય સ્થાનિક હવામાન આગાહી.',
    w_today: 'આજનું ખેતર હવામાન',
    w_forecast_7day: '7-દિવસની કૃષિ આગાહી',
    w_temp: 'તાપમાન',
    w_humidity: 'હવામાં ભેજ',
    w_wind: 'પવનની ગતિ',
    w_precipitation: 'વરસાદની શક્યતા',
    w_farming_advisory: 'આજ માટે કૃષિ સલાહ',

    // Prediction
    pred_title: 'બટાકાના પાકના રોગ અને ઉત્પાદનનું પૂર્વાનુમાન',
    pred_subtitle: 'બટાકાના પાંદડાના રોગોની ઓળખ અને પાક સુરક્ષા માટે ડીપ લર્નિંગ સિસ્ટમ.',
    pred_upload_title: 'બટાકાનું પાંદડું અપલોડ કરો',
    pred_select_sample: 'ડેમો નમૂનો પસંદ કરો',
    pred_diagnose: 'રોગ અને ઉત્પાદન અસરની આગાહી કરો',
    pred_result_title: 'નિદાન પૂર્વાનુમાન પરિણામ',

    // Fertilizer
    fa_title: 'સ્માર્ટ ખાતર માત્રા સલાહકાર',
    fa_subtitle: 'જમીનની ખામી અને પાકના તબક્કા આધારિત વૈજ્ઞાનિક N-P-K પોષક સંતુલન.',
    fa_soil_type: 'જમીનનો પ્રકાર',
    fa_crop_type: 'લક્ષ્ય પાક',
    fa_calculate: 'શ્રેષ્ઠ ખાતર મિશ્રણની ગણતરી કરો',
    fa_recommendation: 'ખાતર ભલામણ યોજના',

    // Planner
    fp_title: 'ખેતી પ્રવૃત્તિ અને સમયપત્રક આયોજક',
    fp_subtitle: 'વાવણી, સિંચાઈ, ખાતર અને લણણીનું સચોટ આયોજન કરો.',
    fp_seasonal_schedule: 'મોસમી ખેતી સમયપત્રક',
    fp_add_activity: 'ખેતી પ્રવૃત્તિ ઉમેરો',

    // Schemes
    gs_title: 'સરકારી કૃષિ યોજનાઓ અને સબસિડી',
    gs_subtitle: 'કેન્દ્ર અને રાજ્ય સરકારની ખેડૂત સહાય યોજનાઓ, ગ્રાન્ટ અને ધિરાણ સુવિધાઓ જાણો.',
    gs_search: 'કીવર્ડ દ્વારા યોજનાઓ શોધો...',
    gs_all_schemes: 'તમામ યોજનાઓ',
    gs_subsidies: 'સબસિડી અને સાધનો',
    gs_insurance: 'પાક વીમો',
    gs_financial_support: 'નાણાકીય સહાય',
    gs_apply_now: 'સત્તાવાર પોર્ટલ / અરજી કરો →',
    gs_eligibility: 'પાત્રતા માપદંડ',
    gs_benefits: 'સીધા લાભો',

    // How to Use
    htu_title: 'SmartFarm AI કેવી રીતે વાપરવું',
    htu_subtitle: 'ખેડૂતો માટે કૃષિ ઉત્પાદન વધારવા માટેનું સરળ પગલાવાર માર્ગદર્શન.',
    htu_quick_steps: 'ખેતી કાર્યપ્રવાહ માર્ગદર્શિકા',

    // Login
    login_title: 'મોબાઇલ નંબરથી સાઇન ઇન કરો',
    login_subtitle: 'Twilio દ્વારા સુરક્ષિત SMS OTP મેળવવા તમારો મોબાઇલ નંબર દાખલ કરો. પાસવર્ડ કે ઇમેઇલની જરૂર નથી.',
    login_step1: 'પગલું 1 / 2',
    login_step2: 'પગલું 2 / 2',
    login_step1_sub: 'SMS OTP મેળવવા તમારું નામ અને ફોન નંબર દાખલ કરો.',
    login_step2_sub: 'કૃપા કરીને તમારા ફોન પર આવેલો 6-અંકનો કોડ દાખલ કરો.',
    login_full_name: 'તમારું પૂરું નામ',
    login_phone: 'મોબાઇલ ફોન નંબર',
    login_send_otp: 'OTP મોકલો',
    login_verify_otp: 'ચકાસો અને સાઇન ઇન કરો',
    login_resend_otp: 'OTP ફરી મોકલો',
  },

  pa: {
    // Nav
    nav_home: 'ਹੋਮ',
    nav_disease_detection: 'ਰੋਗ ਪਛਾਣ',
    nav_crop_recommendation: 'ਫਸਲ ਸਿਫ਼ਾਰਸ਼',
    nav_weather: 'ਮੌਸਮ',
    nav_farm_planner: 'ਖੇਤੀ ਯੋਜਨਾਕਾਰ',
    nav_fertilizer_advisor: 'ਖਾਦ ਸਲਾਹਕਾਰ',
    nav_govt_schemes: 'ਸਰਕਾਰੀ ਸਕੀਮਾਂ',
    nav_about_us: 'ਸਾਡੇ ਬਾਰੇ',
    nav_sign_in: 'ਲੌਗ ਇਨ',
    nav_dashboard: 'ਡੈਸ਼ਬੋਰਡ',
    nav_log_out: 'ਲੌਗ ਆਉਟ',
    nav_prediction: 'ਭਵਿੱਖਬਾਣੀ',
    nav_how_to_use: 'ਵਰਤੋਂ ਕਿਵੇਂ ਕਰੀਏ',

    sec_overview: 'ਸੰਖੇਪ ਜਾਣਕਾਰੀ',
    sec_tools: 'ਸਾਧਨ',
    sec_main: 'ਮੁੱਖ',
    sec_farm_tools: 'ਖੇਤੀ ਸਾਧਨ',
    sec_information: 'ਜਾਣਕਾਰੀ',
    brand_tagline: 'ਸਮਾਰਟ ਖੇਤੀ ਸਹਾਇਕ',
    brand_sub: 'ਤੁਹਾਡਾ ਸੌਖਾ ਖੇਤੀ ਸਹਾਇਕ',
    my_account: 'ਮੇਰਾ ਖਾਤਾ',

    help_how_to_use: 'ਵਰਤੋਂ ਕਿਵੇਂ ਕਰੀਏ',
    help_panel_title: 'SmartFarm AI ਦੀ ਵਰਤੋਂ ਕਿਵੇਂ ਕਰੀਏ',

    ai_welcome:
      'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! 🌱 ਮੈਂ ਕ੍ਰਿਸ਼ੀ ਮਿੱਤਰ ਹਾਂ, ਤੁਹਾਡਾ AI ਖੇਤੀ ਸਹਾਇਕ।\n\nਫਸਲਾਂ, ਕੀੜਿਆਂ, ਮਿੱਟੀ, ਖਾਦ, ਮੌਸਮ ਜਾਂ ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਬਾਰੇ ਕੋਈ ਵੀ ਸਵਾਲ ਪੁੱਛੋ।',
    ai_suggestions: [
      '🌾 ਸਾਉਣੀ ਸੀਜ਼ਨ ਲਈ ਫਸਲ ਸੁਝਾਅ',
      '🐛 ਪੱਤੇ ਪੀਲੇ ਹੋ ਰਹੇ ਹਨ, ਕੀ ਕਰੀਏ?',
      '🧪 ਕਣਕ ਲਈ ਸਭ ਤੋਂ ਵਧੀਆ ਖਾਦ',
      '🌦️ ਖੇਤੀ ਲਈ ਮੀਂਹ ਦੀ ਭਵਿੱਖਬਾਣੀ',
    ],
    ai_input_placeholder: 'ਕ੍ਰਿਸ਼ੀ ਮਿੱਤਰ ਨੂੰ ਕੁਝ ਵੀ ਪੁੱਛੋ...',
    ai_typing: 'ਕ੍ਰਿਸ਼ੀ ਮਿੱਤਰ ਜਵਾਬ ਤਿਆਰ ਕਰ ਰਿਹਾ ਹੈ...',
    ai_disclaimer: 'AI ਗਲਤੀ ਕਰ ਸਕਦਾ ਹੈ। ਮਹੱਤਵਪੂਰਨ ਸਲਾਹ ਸਥਾਨਕ ਖੇਤੀ ਮਾਹਰ ਤੋਂ ਜ਼ਰੂਰ ਜਾਂਚੋ।',
    ai_new_chat: 'ਨਵੀਂ ਗੱਲਬਾਤ',
    ai_tooltip: 'ਕ੍ਰਿਸ਼ੀ ਮਿੱਤਰ ਨੂੰ ਪੁੱਛੋ 🤖',
    ai_system_lang_instruction:
      'ਕਿਰਪਾ ਕਰਕੇ ਪੰਜਾਬੀ ਭਾਸ਼ਾ ਵਿੱਚ ਜਵਾਬ ਦਿਓ। ਕਿਸਾਨ-ਪੱਖੀ, ਸੌਖੀ ਅਤੇ ਵਿਹਾਰਕ ਭਾਸ਼ਾ ਵਿੱਚ ਦੱਸੋ।',

    search_placeholder: 'ਸਕੀਮਾਂ ਖੋਜੋ...',
    loading_text: 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
    back_to_home: 'ਹੋਮ ਤੇ ਵਾਪਸ ਜਾਓ',

    // Disease Detection
    dd_badge: 'AI ਪੌਦਾ ਰੋਗ ਵਿਗਿਆਨ • MobileNetV3 ਆਰਕੀਟੈਕਚਰ',
    dd_title_prefix: 'ਪੌਦੇ ਦੇ ਪੱਤਿਆਂ ਦੀ',
    dd_title_highlight: 'ਰੋਗ ਪਛਾਣ',
    dd_subtitle:
      'ਬੈਕਟੀਰੀਅਲ ਬਲਾਈਟ, ਲੀਫ ਕਰਲ ਵਾਇਰਸ ਅਤੇ ਫਿਊਜ਼ੇਰੀਅਮ ਵਿਲਟ ਦੀ ਤੁਰੰਤ ਪਛਾਣ ਲਈ ਪੱਤਿਆਂ ਨੂੰ ਸਕੈਨ ਕਰੋ। ਖੇਤੀ ਉਪਾਅ, ਮਾਤਰਾ ਅਤੇ ਵਿਗਿਆਨਕ ਇਲਾਜ ਪਾਓ।',
    dd_tab_upload: 'ਫੋਟੋ ਅੱਪਲੋਡ ਕਰੋ',
    dd_tab_camera: 'ਲਾਈਵ ਕੈਮਰਾ',
    dd_tab_samples: 'ਡੈਮੋ ਨਮੂਨੇ',
    dd_drop_title: 'ਪੱਤੇ ਦੀ ਫੋਟੋ ਅੱਪਲੋਡ ਕਰਨ ਲਈ ਕਲਿੱਕ ਕਰੋ ਜਾਂ ਇੱਥੇ ਖਿੱਚੋ',
    dd_drop_sub: 'JPG, PNG, WebP ਵੱਧ ਤੋਂ ਵੱਧ 10MB (ਇੱਕ ਪੱਤਾ ਸਾਫ਼ ਦਿਖੇ)',
    dd_select_btn: 'ਪੱਤੇ ਦੀ ਫੋਟੋ ਚੁਣੋ',
    dd_diagnose_btn: 'ਪੌਦੇ ਦੇ ਰੋਗ ਦੀ ਜਾਂਚ ਕਰੋ',
    dd_analyzing_btn: 'ਪੱਤੇ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਜਾਰੀ ਹੈ...',
    dd_change_photo: 'ਫੋਟੋ ਬਦਲੋ',
    dd_awaiting_title: 'ਪੱਤੇ ਦੀ ਜਾਂਚ ਦੀ ਉਡੀਕ ਹੈ',
    dd_awaiting_desc:
      'ਆਪਣੀ ਡਿਵਾਈਸ ਤੋਂ ਫੋਟੋ ਅੱਪਲੋਡ ਕਰੋ, ਕੈਮਰੇ ਨਾਲ ਲਾਈਵ ਫੋਟੋ ਖਿੱਚੋ, ਜਾਂ ਡੈਮੋ ਨਮੂਨਾ ਚੁਣ ਕੇ ਤੁਰੰਤ ਰੋਗ ਪਛਾਣ ਅਤੇ ਇਲਾਜ ਦੇਖੋ।',
    dd_sample_blight: 'ਬੈਕਟੀਰੀਅਲ ਬਲਾਈਟ',
    dd_sample_curl: 'ਲੀਫ ਕਰਲ ਵਾਇਰਸ',
    dd_sample_wilt: 'ਫਿਊਜ਼ੇਰੀਅਮ ਵਿਲਟ',
    dd_sample_healthy: 'ਸਿਹਤਮੰਦ ਪੱਤਾ',
    dd_camera_start: 'ਕੈਮਰਾ ਚਾਲੂ ਕਰੋ',
    dd_camera_capture: 'ਫੋਟੋ ਖਿੱਚੋ',
    dd_camera_stop: 'ਕੈਮਰਾ ਬੰਦ ਕਰੋ',
    dd_diagnosis_result: 'ਜਾਂਚ ਨਤੀਜਾ',
    dd_confidence: 'ਸ਼ੁੱਧਤਾ ਦਰ',
    dd_severity: 'ਗੰਭੀਰਤਾ ਪੱਧਰ',
    dd_detected_disease: 'ਪਛਾਣਿਆ ਗਿਆ ਰੋਗ',
    dd_symptoms: 'ਰੋਗ ਦੇ ਲੱਛਣ',
    dd_immediate_actions: 'ਤੁਰੰਤ ਜ਼ਰੂਰੀ ਕਦਮ',
    dd_chemical_control: 'ਰਸਾਇਣਕ ਕੰਟਰੋਲ ਅਤੇ ਮਾਤਰਾ',
    dd_organic_control: 'ਜੈਵਿਕ ਅਤੇ ਕੁਦਰਤੀ ਉਪਾਅ',
    dd_prevention: 'ਲੰਬੇ ਸਮੇਂ ਦੀ ਰੋਕਥਾਮ',
    dd_scan_another: 'ਹੋਰ ਪੱਤਾ ਸਕੈਨ ਕਰੋ',
    dd_pipeline_title: 'ਮਾਡਲ ਆਰਕੀਟੈਕਚਰ ਅਤੇ ਪਾਈਪਲਾਈਨ',
    dd_healthy_title: 'ਸਿਹਤਮੰਦ ਫਸਲ — ਕੋਈ ਰੋਗ ਨਹੀਂ ਮਿਲਿਆ',
    dd_healthy_desc: 'ਤੁਹਾਡਾ ਪੱਤਾ ਪੂਰੀ ਤਰ੍ਹਾਂ ਸਿਹਤਮੰਦ ਹੈ ਅਤੇ ਇਸ ਵਿੱਚ ਕਿਸੇ ਰੋਗ ਦੇ ਲੱਛਣ ਨਹੀਂ ਹਨ।',

    // Dashboard
    db_welcome: 'ਜੀ ਆਇਆਂ ਨੂੰ',
    db_authenticated: 'ਪ੍ਰਮਾਣਿਤ',
    db_sms_verified: 'SMS ਤਸਦੀਕਸ਼ੁਦਾ',
    db_phone_label: 'ਫ਼ੋਨ',
    db_sign_out: 'ਲੌਗ ਆਉਟ',
    db_tools_title: 'ਸਮਾਰਟ ਖੇਤੀ ਸਾਧਨ ਅਤੇ ਸੇਵਾਵਾਂ',
    db_open_tool: 'ਸਾਧਨ ਖੋਲ੍ਹੋ →',
    db_ai_title: 'AI ਖੇਤੀ ਸਹਾਇਕ',
    db_ai_desc: 'ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਖੇਤੀ, ਕੀੜੇ ਜਾਂ ਖਾਦ ਬਾਰੇ ਕੋਈ ਵੀ ਸਵਾਲ ਪੁੱਛੋ',
    db_crop_title: 'ਫਸਲ ਸਿਫ਼ਾਰਸ਼',
    db_crop_desc: 'ਆਪਣੀ ਮਿੱਟੀ ਅਤੇ ਮੌਸਮ ਅਨੁਸਾਰ ਵਧੀਆ ਫਸਲਾਂ ਦੇ ਸੁਝਾਅ ਲਓ',
    db_disease_title: 'ਰੋਗ ਪਛਾਣ',
    db_disease_desc: 'ਪੱਤਿਆਂ ਦੀ ਫੋਟੋ ਅੱਪਲੋਡ ਕਰਕੇ ਤੁਰੰਤ ਰੋਗ ਅਤੇ ਇਲਾਜ ਜਾਣੋ',
    db_weather_title: 'ਮੌਸਮ ਸਲਾਹ',
    db_weather_desc: 'ਆਪਣੇ ਖੇਤ ਲਈ 7 ਦਿਨਾਂ ਦਾ ਤਾਪਮਾਨ, ਮੀਂਹ ਅਤੇ ਹਵਾ ਦਾ ਅਨੁਮਾਨ',
    db_schemes_title: 'ਸਰਕਾਰੀ ਸਕੀਮਾਂ',
    db_schemes_desc: 'ਉਪਲਬਧ ਸਬਸਿਡੀ, ਵਿੱਤੀ ਮਦਦ ਅਤੇ PM-KISAN ਅੱਪਡੇਟ ਦੇਖੋ',
    db_prediction_title: 'ਆਲੂ ਫਸਲ ਭਵਿੱਖਬਾਣੀ',
    db_prediction_desc: 'ਆਲੂ ਦੀ ਫਸਲ ਵਿੱਚ ਅਗੇਤਾ ਤੇ ਪਛੇਤਾ ਝੁਲਸ ਪਛਾਣ ਕੇ ਸਲਾਹ ਲਓ',
    db_weather_today: 'ਅੱਜ ਦਾ ਮੌਸਮ',
    db_crop_matches: 'ਢੁਕਵੀਆਂ ਫਸਲਾਂ',
    db_health_alerts: 'ਸਿਹਤ ਅਲਰਟ',
    db_scan_leaf_btn: 'ਕੈਮਰੇ ਨਾਲ ਪੱਤਾ ਸਕੈਨ ਕਰੋ →',
    db_ai_suggested: 'AI ਸੁਝਾਅ',
    db_early_blight_risk: 'ਅਗੇਤਾ ਝੁਲਸ ਦਾ ਖ਼ਤਰਾ',
    db_early_blight_sub: 'ਟਮਾਟਰ ਫਸਲ • ਵੱਧ ਨਮੀ',
    db_rust_fungus_risk: 'ਕੁੰਗੀ (Rust) ਉੱਲੀ ਚੇਤਾਵਨੀ',
    db_rust_fungus_sub: 'ਕਣਕ ਦੀ ਫਸਲ • ਦਰਮਿਆਨਾ',
    db_humidity: 'ਨਮੀ',
    db_wind: 'ਹਵਾ',
    db_uv_index: 'UV ਸੂਚਕਾਂਕ',

    // Weather
    w_title: 'ਖੇਤੀਬਾੜੀ ਮੌਸਮ ਰਾਡਾਰ',
    w_subtitle: 'ਭਾਰਤੀ ਖੇਤੀ ਲਈ ਖਾਸ ਤੌਰ ਤੇ ਤਿਆਰ ਕੀਤੀ 7-ਦਿਨਾਂ ਦੀ ਮੌਸਮ ਭਵਿੱਖਬਾਣੀ।',
    w_today: 'ਅੱਜ ਖੇਤ ਦਾ ਮੌਸਮ',
    w_forecast_7day: '7-ਦਿਨਾਂ ਦੀ ਖੇਤੀ ਭਵਿੱਖਬਾਣੀ',
    w_temp: 'ਤਾਪਮਾਨ',
    w_humidity: 'ਹਵਾ ਵਿੱਚ ਨਮੀ',
    w_wind: 'ਹਵਾ ਦੀ ਗਤੀ',
    w_precipitation: 'ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ',
    w_farming_advisory: 'ਅੱਜ ਲਈ ਖੇਤੀ ਸਲਾਹ',

    // Prediction
    pred_title: 'ਆਲੂ ਫਸਲ ਰੋਗ ਅਤੇ ਝਾੜ ਭਵਿੱਖਬਾਣੀ',
    pred_subtitle: 'ਆਲੂ ਦੇ ਪੱਤਿਆਂ ਦੇ ਰੋਗਾਂ ਦੀ ਪਛਾਣ ਅਤੇ ਫਸਲ ਸੁਰੱਖਿਆ ਲਈ ਡੀਪ ਲਰਨਿੰਗ ਸਿਸਟਮ।',
    pred_upload_title: 'ਆਲੂ ਦਾ ਪੱਤਾ ਅੱਪਲੋਡ ਕਰੋ',
    pred_select_sample: 'ਡੈਮੋ ਨਮੂਨਾ ਚੁਣੋ',
    pred_diagnose: 'ਰੋਗ ਅਤੇ ਝਾੜ ਪ੍ਰਭਾਵ ਦੀ ਭਵਿੱਖਬਾਣੀ ਕਰੋ',
    pred_result_title: 'ਜਾਂਚ ਭਵਿੱਖਬਾਣੀ ਨਤੀਜਾ',

    // Fertilizer
    fa_title: 'ਸਮਾਰਟ ਖਾਦ ਮਾਤਰਾ ਸਲਾਹਕਾਰ',
    fa_subtitle: 'ਮਿੱਟੀ ਦੀ ਕਮੀ ਅਤੇ ਫਸਲ ਦੇ ਪੜਾਅ ਅਨੁਸਾਰ ਵਿਗਿਆਨਕ N-P-K ਸੰਤੁਲਨ।',
    fa_soil_type: 'ਮਿੱਟੀ ਦੀ ਕਿਸਮ',
    fa_crop_type: 'ਮੁੱਖ ਫਸਲ',
    fa_calculate: 'ਸਹੀ ਖਾਦ ਮਿਸ਼ਰਣ ਦੀ ਗਣਨਾ ਕਰੋ',
    fa_recommendation: 'ਖਾਦ ਸਿਫ਼ਾਰਸ਼ ਯੋਜਨਾ',

    // Planner
    fp_title: 'ਖੇਤੀ ਕਾਰਜ ਅਤੇ ਸਮਾਂ ਯੋਜਨਾਕਾਰ',
    fp_subtitle: 'ਬਿਜਾਈ, ਸਿੰਚਾਈ, ਖਾਦ ਅਤੇ ਵਾਢੀ ਦੀ ਸਟੀਕ ਯੋਜਨਾ ਬਣਾਓ।',
    fp_seasonal_schedule: 'ਮੌਸਮੀ ਖੇਤੀ ਸਮਾਂ-ਸਾਰਣੀ',
    fp_add_activity: 'ਖੇਤੀ ਕੰਮ ਜੋੜੋ',

    // Schemes
    gs_title: 'ਸਰਕਾਰੀ ਖੇਤੀ ਸਕੀਮਾਂ ਅਤੇ ਸਬਸਿਡੀ',
    gs_subtitle: 'ਕੇਂਦਰ ਅਤੇ ਰਾਜ ਸਰਕਾਰ ਦੀਆਂ ਕਿਸਾਨ ਭਲਾਈ ਸਕੀਮਾਂ, ਗ੍ਰਾਂਟਾਂ ਅਤੇ ਕਰਜ਼ ਸਹੂਲਤਾਂ ਜਾਣੋ।',
    gs_search: 'ਕੀਵਰਡ ਨਾਲ ਸਕੀਮਾਂ ਖੋਜੋ...',
    gs_all_schemes: 'ਸਾਰੀਆਂ ਸਕੀਮਾਂ',
    gs_subsidies: 'ਸਬਸਿਡੀ ਅਤੇ ਸੰਦ',
    gs_insurance: 'ਫਸਲ ਬੀਮਾ',
    gs_financial_support: 'ਵਿੱਤੀ ਸਹਾਇਤਾ',
    gs_apply_now: 'ਅਧਿਕਾਰਤ ਪੋਰਟਲ / ਅਪਲਾਈ ਕਰੋ →',
    gs_eligibility: 'ਯੋਗਤਾ ਸ਼ਰਤਾਂ',
    gs_benefits: 'ਸਿੱਧੇ ਲਾਭ',

    // How to Use
    htu_title: 'SmartFarm AI ਦੀ ਵਰਤੋਂ ਕਿਵੇਂ ਕਰੀਏ',
    htu_subtitle: 'ਕਿਸਾਨਾਂ ਲਈ ਖੇਤੀ ਪੈਦਾਵਾਰ ਵਧਾਉਣ ਵਾਸਤੇ ਸੌਖੀ ਕਦਮ-ਦਰ-ਕਦਮ ਗਾਈਡ।',
    htu_quick_steps: 'ਖੇਤੀ ਕਾਰਜਪ੍ਰਣਾਲੀ ਗਾਈਡ',

    // Login
    login_title: 'ਮੋਬਾਈਲ ਨੰਬਰ ਨਾਲ ਲੌਗ ਇਨ ਕਰੋ',
    login_subtitle: 'Twilio ਰਾਹੀਂ ਸੁਰੱਖਿਅਤ SMS OTP ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਆਪਣਾ ਮੋਬਾਈਲ ਨੰਬਰ ਦਰਜ ਕਰੋ। ਪਾਸਵਰਡ ਜਾਂ ਈਮੇਲ ਦੀ ਲੋੜ ਨਹੀਂ।',
    login_step1: 'ਕਦਮ 1 / 2',
    login_step2: 'ਕਦਮ 2 / 2',
    login_step1_sub: 'SMS OTP ਲੈਣ ਲਈ ਆਪਣਾ ਨਾਮ ਅਤੇ ਫ਼ੋਨ ਨੰਬਰ ਦਰਜ ਕਰੋ।',
    login_step2_sub: 'ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਫ਼ੋਨ ਤੇ ਆਇਆ 6-ਅੰਕਾਂ ਦਾ ਕੋਡ ਦਰਜ ਕਰੋ।',
    login_full_name: 'ਤੁਹਾਡਾ ਪੂਰਾ ਨਾਮ',
    login_phone: 'ਮੋਬਾਈਲ ਫ਼ੋਨ ਨੰਬਰ',
    login_send_otp: 'OTP ਭੇਜੋ',
    login_verify_otp: 'ਤਸਦੀਕ ਕਰੋ ਅਤੇ ਲੌਗ ਇਨ ਕਰੋ',
    login_resend_otp: 'OTP ਦੁਬਾਰਾ ਭੇਜੋ',
  },

  ta: {
    // Nav
    nav_home: 'முகப்பு',
    nav_disease_detection: 'நோய் கண்டறிதல்',
    nav_crop_recommendation: 'பயிர் பரிந்துரை',
    nav_weather: 'வானிலை',
    nav_farm_planner: 'பண்ணை திட்டமிடுபவர்',
    nav_fertilizer_advisor: 'உர ஆலோசகர்',
    nav_govt_schemes: 'அரசு திட்டங்கள்',
    nav_about_us: 'எங்களைப் பற்றி',
    nav_sign_in: 'உள்நுழைக',
    nav_dashboard: 'டாஷ்போர்டு',
    nav_log_out: 'வெளியேறு',
    nav_prediction: 'கணிப்பு',
    nav_how_to_use: 'பயன்படுத்தும் முறை',

    sec_overview: 'மேலோட்டம்',
    sec_tools: 'கருவிகள்',
    sec_main: 'முதன்மை',
    sec_farm_tools: 'பண்ணை கருவிகள்',
    sec_information: 'தகவல்',
    brand_tagline: 'ஸ்மார்ட் விவசாய உதவியாளர்',
    brand_sub: 'உங்கள் எளிய விவசாய உதவியாளர்',
    my_account: 'என் கணக்கு',

    help_how_to_use: 'பயன்படுத்தும் முறை',
    help_panel_title: 'SmartFarm AI-ஐ எவ்வாறு பயன்படுத்துவது',

    ai_welcome:
      'வணக்கம்! 🌱 நான் கிருஷி மித்ரா, உங்கள் AI விவசாய உதவியாளர்.\n\nபயிர்கள், பூச்சிகள், மண், உர அளவு, வானிலை அல்லது அரசு திட்டங்கள் பற்றி எதுவும் கேளுங்கள்.',
    ai_suggestions: [
      '🌾 காரீப் பருவத்திற்கான பயிர் பரிந்துரை',
      '🐛 இலைகள் மஞ்சளாகின்றன, என்ன செய்வது?',
      '🧪 கோதுமைக்கு சிறந்த உரம் எது?',
      '🌦️ விவசாயத்திற்கான மழை முன்னறிவிப்பு',
    ],
    ai_input_placeholder: 'கிருஷி மித்ராவிடம் எதுவும் கேளுங்கள்...',
    ai_typing: 'கிருஷி மித்ரா பதில் எழுதுகிறார்...',
    ai_disclaimer: 'AI தவறுகள் செய்யலாம். முக்கிய ஆலோசனைகளை உள்ளூர் வேளாண் நிபுணர்களிடம் சரிபார்க்கவும்.',
    ai_new_chat: 'புதிய உரையாடல்',
    ai_tooltip: 'கிருஷி மித்ராவிடம் கேளுங்கள் 🤖',
    ai_system_lang_instruction:
      'தயவுசெய்து தமிழ் மொழியில் பதிலளிக்கவும். விவசாயிகளுக்குப் புரியும் எளிய, நடைமுறைத் தமிழில் எழுதவும்.',

    search_placeholder: 'திட்டங்களைத் தேடுங்கள்...',
    loading_text: 'ஏற்றப்படுகிறது...',
    back_to_home: 'முகப்பிற்குச் செல்',

    // Disease Detection
    dd_badge: 'AI தாவர நோயியல் • MobileNetV3 கட்டமைப்பு',
    dd_title_prefix: 'தாவர இலை',
    dd_title_highlight: 'நோய் கண்டறிதல்',
    dd_subtitle:
      'பாக்டீரியா கருகல், இலை சுருட்டு வைரஸ் மற்றும் வாடல் நோய்களை உடனடியாகக் கண்டறிய இலைகளை ஸ்கேன் செய்யுங்கள். சிகிச்சை முறைகள் மற்றும் அளவுகளைப் பெறுங்கள்.',
    dd_tab_upload: 'படம் பதிவேற்று',
    dd_tab_camera: 'நேரடி கேமரா',
    dd_tab_samples: 'மாதிரி படங்கள்',
    dd_drop_title: 'இலைப் படத்தைப் பதிவேற்ற கிளிக் செய்யவும் அல்லது இழுத்து விடவும்',
    dd_drop_sub: 'JPG, PNG, WebP அதிகபட்சம் 10MB (ஒரு இலை தெளிவாக இருக்க வேண்டும்)',
    dd_select_btn: 'இலைப் படத்தைத் தேர்ந்தெடு',
    dd_diagnose_btn: 'தாவர நோயைக் கண்டறி',
    dd_analyzing_btn: 'இலையை ஆய்வு செய்கிறது...',
    dd_change_photo: 'படத்தை மாற்று',
    dd_awaiting_title: 'இலை ஆய்வுக்குக் காத்திருக்கிறது',
    dd_awaiting_desc:
      'உங்கள் சாதனத்திலிருந்து படத்தைப் பதிவேற்றவும், கேமராவில் படம் எடுக்கவும் அல்லது மாதிரி இலையைத் தேர்ந்தெடுத்து உடனடி முடிவுகளைப் பார்க்கவும்.',
    dd_sample_blight: 'பாக்டீரியா கருகல்',
    dd_sample_curl: 'இலை சுருட்டு வைரஸ்',
    dd_sample_wilt: 'வாடல் நோய் (Fusarium Wilt)',
    dd_sample_healthy: 'ஆரோக்கியமான இலை',
    dd_camera_start: 'கேமரா தொடங்கு',
    dd_camera_capture: 'படம் பிடி',
    dd_camera_stop: 'கேமரா நிறுத்து',
    dd_diagnosis_result: 'ஆய்வு முடிவு',
    dd_confidence: 'நம்பகத்தன்மை',
    dd_severity: 'தீவிர நிலை',
    dd_detected_disease: 'கண்டறியப்பட்ட நோய்',
    dd_symptoms: 'அறிகுறிகள்',
    dd_immediate_actions: 'விவசாயி உடனடி நடவடிக்கைகள்',
    dd_chemical_control: 'ரசாயன கட்டுப்பாடு & அளவுகள்',
    dd_organic_control: 'இயற்கை & உயிரியல் தீர்வுகள்',
    dd_prevention: 'நீண்ட கால தடுப்பு',
    dd_scan_another: 'மற்றொரு இலையை ஸ்கேன் செய்',
    dd_pipeline_title: 'மாதிரி கட்டமைப்பு & செயல்முறை',
    dd_healthy_title: 'ஆரோக்கியமான பயிர் — நோய் இல்லை',
    dd_healthy_desc: 'உங்கள் இலை நல்ல பச்சையம் மற்றும் ஆரோக்கியத்துடன் உள்ளது; எந்த நோய்த் தொற்றும் இல்லை.',

    // Dashboard
    db_welcome: 'வரவேற்கிறோம்',
    db_authenticated: 'அங்கீகரிக்கப்பட்டது',
    db_sms_verified: 'SMS சரிபார்க்கப்பட்டது',
    db_phone_label: 'தொலைபேசி',
    db_sign_out: 'வெளியேறு',
    db_tools_title: 'ஸ்மார்ட் விவசாய கருவிகள் & சேவைகள்',
    db_open_tool: 'கருவியைத் திற →',
    db_ai_title: 'AI விவசாய உதவியாளர்',
    db_ai_desc: 'உங்கள் மொழியில் விவசாயம், பூச்சி அல்லது உரம் பற்றி எதுவும் கேளுங்கள்',
    db_crop_title: 'பயிர் பரிந்துரை',
    db_crop_desc: 'உங்கள் மண் மற்றும் பருவத்திற்கு ஏற்ற பயிர் பரிந்துரைகளைப் பெறுங்கள்',
    db_disease_title: 'நோய் கண்டறிதல்',
    db_disease_desc: 'இலைப் படத்தைப் பதிவேற்றி உடனடியாக நோயும் தீர்வும் அறியுங்கள்',
    db_weather_title: 'வானிலை ஆலோசனை',
    db_weather_desc: 'உங்கள் பண்ணைக்கான 7-நாள் வெப்பநிலை, மழை மற்றும் காற்று முன்னறிவிப்பு',
    db_schemes_title: 'அரசு திட்டங்கள்',
    db_schemes_desc: 'மானியங்கள், நிதி உதவிகள் மற்றும் PM-KISAN தகவல்களைப் பாருங்கள்',
    db_prediction_title: 'உருளைக்கிழங்கு மகசூல் கணிப்பு',
    db_prediction_desc: 'உருளைக்கிழங்கு கருகல் நோயைக் கண்டறிந்து அறுவடை ஆலோசனை பெறுங்கள்',
    db_weather_today: 'இன்றைய வானிலை',
    db_crop_matches: 'பொருத்தமான பயிர்கள்',
    db_health_alerts: 'ஆரோக்கிய எச்சரிக்கைகள்',
    db_scan_leaf_btn: 'கேமரா மூலம் இலையை ஸ்கேன் செய் →',
    db_ai_suggested: 'AI பரிந்துரை',
    db_early_blight_risk: 'ஆரம்ப கருகல் நோய் அபாயம்',
    db_early_blight_sub: 'தக்காளி பயிர் • அதிக ஈரப்பதம்',
    db_rust_fungus_risk: 'துரு பூஞ்சை எச்சரிக்கை',
    db_rust_fungus_sub: 'கோதுமை பயிர் • மிதமானது',
    db_humidity: 'ஈரப்பதம்',
    db_wind: 'காற்று',
    db_uv_index: 'UV குறியீடு',

    // Weather
    w_title: 'வேளாண் வானிலை ரேடார்',
    w_subtitle: 'இந்திய விவசாயத்திற்காக வடிவமைக்கப்பட்ட 7-நாள் உள்ளூர் வானிலை முன்னறிவிப்பு.',
    w_today: 'இன்றைய பண்ணை வானிலை',
    w_forecast_7day: '7-நாள் வேளாண் முன்னறிவிப்பு',
    w_temp: 'வெப்பநிலை',
    w_humidity: 'காற்று ஈரப்பதம்',
    w_wind: 'காற்றின் வேகம்',
    w_precipitation: 'மழைப்பொழிவு',
    w_farming_advisory: 'இன்றைய வேளாண் ஆலோசனை',

    // Prediction
    pred_title: 'உருளைக்கிழங்கு பயிர் நோய் & மகசூல் கணிப்பு',
    pred_subtitle: 'உருளைக்கிழங்கு இலை நோய்கள் மற்றும் அறுவடை பாதுகாப்பிற்கான ஆழ்ந்த கற்றல் அமைப்பு.',
    pred_upload_title: 'உருளைக்கிழங்கு இலையைப் பதிவேற்று',
    pred_select_sample: 'மாதிரி படத்தைத் தேர்ந்தெடு',
    pred_diagnose: 'நோய் & மகசூல் தாக்கத்தைக் கணி',
    pred_result_title: 'நோய் கணிப்பு முடிவு',

    // Fertilizer
    fa_title: 'ஸ்மார்ட் உர அளவு ஆலோசகர்',
    fa_subtitle: 'மண் சத்து குறைபாடு மற்றும் பயிர் நிலைக்கு ஏற்ப அறிவியல் N-P-K உரச் சமநிலை.',
    fa_soil_type: 'மண் வகை',
    fa_crop_type: 'இலக்கு பயிர்',
    fa_calculate: 'சிறந்த உரக் கலவையைக் கணக்கிடு',
    fa_recommendation: 'உரப் பரிந்துரைத் திட்டம்',

    // Planner
    fp_title: 'பண்ணை செயல்பாடு & அட்டவணை திட்டமிடுபவர்',
    fp_subtitle: 'விதைப்பு, நீர்ப்பாசனம், உரமிடுதல் மற்றும் அறுவடையை துல்லியமாகத் திட்டமிடுங்கள்.',
    fp_seasonal_schedule: 'பருவகால விவசாய அட்டவணை',
    fp_add_activity: 'பண்ணை செயல்பாடு சேர்',

    // Schemes
    gs_title: 'அரசு வேளாண் திட்டங்கள் & மானியங்கள்',
    gs_subtitle: 'மத்திய மற்றும் மாநில அரசு விவசாயி நலத் திட்டங்கள், மானியங்கள் மற்றும் கடன் வசதிகளை அறியுங்கள்.',
    gs_search: 'திட்டங்களைத் தேடுங்கள்...',
    gs_all_schemes: 'அனைத்து திட்டங்கள்',
    gs_subsidies: 'மானியங்கள் & கருவிகள்',
    gs_insurance: 'பயிர் காப்பீடு',
    gs_financial_support: 'நிதி உதவி',
    gs_apply_now: 'அதிகாரப்பூர்வ தளம் / விண்ணப்பிக்க →',
    gs_eligibility: 'தகுதி வரம்புகள்',
    gs_benefits: 'நேரடி நன்மைகள்',

    // How to Use
    htu_title: 'SmartFarm AI-ஐ எவ்வாறு பயன்படுத்துவது',
    htu_subtitle: 'விவசாயிகள் அதிக மகசூல் பெற உதவும் படிப்படியான காட்சி வழிகாட்டி.',
    htu_quick_steps: 'பண்ணை செயல்முறை வழிகாட்டி',

    // Login
    login_title: 'தொலைபேசி எண் மூலம் உள்நுழைக',
    login_subtitle: 'Twilio மூலம் பாதுகாப்பான SMS OTP பெற உங்கள் மொபைல் எண்ணை உள்ளிடவும். கடவுச்சொல் தேவையில்லை.',
    login_step1: 'படி 1 / 2',
    login_step2: 'படி 2 / 2',
    login_step1_sub: 'SMS OTP பெற உங்கள் பெயர் மற்றும் தொலைபேசி எண்ணை உள்ளிடவும்.',
    login_step2_sub: 'உங்கள் தொலைபேசிக்கு வந்த 6-இலக்க குறியீட்டை உள்ளிடவும்.',
    login_full_name: 'உங்கள் முழுப் பெயர்',
    login_phone: 'மொபைல் தொலைபேசி எண்',
    login_send_otp: 'OTP அனுப்பு',
    login_verify_otp: 'சரிபார்த்து உள்நுழைக',
    login_resend_otp: 'OTP மீண்டும் அனுப்பு',
  },

  te: {
    // Nav
    nav_home: 'హోమ్',
    nav_disease_detection: 'వ్యాధి గుర్తింపు',
    nav_crop_recommendation: 'పంట సిఫార్సు',
    nav_weather: 'వాతావరణం',
    nav_farm_planner: 'వ్యవసాయ ప్రణాళిక',
    nav_fertilizer_advisor: 'ఎరువుల సలహాదారు',
    nav_govt_schemes: 'ప్రభుత్వ పథకాలు',
    nav_about_us: 'మా గురించి',
    nav_sign_in: 'సైన్ ఇన్',
    nav_dashboard: 'డాష్‌బోర్డ్',
    nav_log_out: 'లాగ్ అవుట్',
    nav_prediction: 'అంచనా',
    nav_how_to_use: 'వాడే విధానం',

    sec_overview: 'అవలోకనం',
    sec_tools: 'సాధనాలు',
    sec_main: 'ప్రధానం',
    sec_farm_tools: 'వ్యవసాయ సాధనాలు',
    sec_information: 'సమాచారం',
    brand_tagline: 'స్మార్ట్ వ్యవసాయ సహాయకుడు',
    brand_sub: 'మీ సులభమైన వ్యవసాయ సహాయకుడు',
    my_account: 'నా ఖాతా',

    help_how_to_use: 'వాడే విధానం',
    help_panel_title: 'SmartFarm AI ని ఎలా ఉపయోగించాలి',

    ai_welcome:
      'నమస్తే! 🌱 నేను కృషి మిత్ర, మీ AI వ్యవసాయ సహాయకుడిని.\n\nపంటలు, తెగుళ్ళు, నేల, ఎరువుల మోతాదు, వాతావరణం లేదా ప్రభుత్వ పథకాల గురించి ఏదైనా అడగండి.',
    ai_suggestions: [
      '🌾 ఖరీఫ్ సీజన్ కోసం పంట సూచన',
      '🐛 ఆకులు పసుపు రంగులోకి మారుతున్నాయి, ఏం చేయాలి?',
      '🧪 గోధుమ పంటకు ఉత్తమ ఎరువు',
      '🌦️ వ్యవసాయం కోసం వర్షం అంచనా',
    ],
    ai_input_placeholder: 'కృషి మిత్రను ఏదైనా అడగండి...',
    ai_typing: 'కృషి మిత్ర సమాధానం సిద్ధం చేస్తోంది...',
    ai_disclaimer: 'AI తప్పులు చేయవచ్చు. ముఖ్యమైన సలహాలను స్థానిక వ్యవసాయ నిపుణులతో సరిచూసుకోండి.',
    ai_new_chat: 'కొత్త చాట్',
    ai_tooltip: 'కృషి మిత్రను అడగండి 🤖',
    ai_system_lang_instruction:
      'దయచేసి తెలుగు భాషలో సమాధానం ఇవ్వండి. రైతులకు అర్థమయ్యే సరళమైన, ఆచరణాత్మక తెలుగులో చెప్పండి.',

    search_placeholder: 'పథకాలను వెతకండి...',
    loading_text: 'లోడ్ అవుతోంది...',
    back_to_home: 'హోమ్‌కు తిరిగి వెళ్ళండి',

    // Disease Detection
    dd_badge: 'AI మొక్కల రోగనిర్ధారణ • MobileNetV3 ఆర్కిటెక్చర్',
    dd_title_prefix: 'మొక్క ఆకు',
    dd_title_highlight: 'వ్యాధి గుర్తింపు',
    dd_subtitle:
      'బాక్టీరియల్ బ్లైట్, ఆకు ముడత వైరస్ మరియు ఫ్యూసేరియం ఎండు తెగులును వెంటనే గుర్తించడానికి ఆకులను స్కాన్ చేయండి. నివారణ చర్యలు మరియు మోతాదులు పొందండి.',
    dd_tab_upload: 'ఫోటో అప్‌లోడ్ చేయండి',
    dd_tab_camera: 'లైవ్ కెమెరా',
    dd_tab_samples: 'డెమో నమూనాలు',
    dd_drop_title: 'ఆకు ఫోటో అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి లేదా ఇక్కడ వేయండి',
    dd_drop_sub: 'JPG, PNG, WebP గరిష్టంగా 10MB (ఒక ఆకు స్పష్టంగా కనిపించాలి)',
    dd_select_btn: 'ఆకు చిత్రాన్ని ఎంచుకోండి',
    dd_diagnose_btn: 'మొక్క వ్యాధిని నిర్ధారించండి',
    dd_analyzing_btn: 'ఆకును విశ్లేషిస్తోంది...',
    dd_change_photo: 'ఫోటో మార్చండి',
    dd_awaiting_title: 'ఆకు పరిశీలన కోసం వేచి ఉంది',
    dd_awaiting_desc:
      'మీ పరికరం నుండి ఫోటోను అప్‌లోడ్ చేయండి, కెమెరాతో లైవ్ ఫోటో తీయండి లేదా డెమో నమూనాను ఎంచుకుని తక్షణ వ్యాధి నిర్ధారణ చూడండి.',
    dd_sample_blight: 'బాక్టీరియల్ బ్లైట్',
    dd_sample_curl: 'ఆకు ముడత వైరస్',
    dd_sample_wilt: 'ఫ్యూసేరియం ఎండు తెగులు',
    dd_sample_healthy: 'ఆరోగ్యకరమైన ఆకు',
    dd_camera_start: 'కెమెరా ప్రారంభించండి',
    dd_camera_capture: 'ఫోటో తీయండి',
    dd_camera_stop: 'కెమెరా ఆపండి',
    dd_diagnosis_result: 'నిర్ధారణ ఫలితం',
    dd_confidence: 'ఖచ్చితత్వ స్కోరు',
    dd_severity: 'తీవ్రత స్థాయి',
    dd_detected_disease: 'గుర్తించిన వ్యాధి',
    dd_symptoms: 'గుర్తించిన లక్షణాలు',
    dd_immediate_actions: 'రైతు తీసుకోవలసిన తక్షణ చర్యలు',
    dd_chemical_control: 'రసాయన నియంత్రణ & మోతాదులు',
    dd_organic_control: 'సేంద్రీయ & జీవ నివారణలు',
    dd_prevention: 'దీర్ఘకాలిక నివారణ',
    dd_scan_another: 'మరొక ఆకును స్కాన్ చేయండి',
    dd_pipeline_title: 'మోడల్ ఆర్కిటెక్చర్ & పైప్‌లైన్',
    dd_healthy_title: 'ఆరోగ్యకరమైన పంట — ఏ వ్యాధి కనుగొనబడలేదు',
    dd_healthy_desc: 'మీ ఆకు పూర్తి ఆరోగ్యంగా ఉంది మరియు ఎటువంటి తెగులు లక్షణాలు లేవు.',

    // Dashboard
    db_welcome: 'స్వాగతం',
    db_authenticated: 'ధృవీకరించబడింది',
    db_sms_verified: 'SMS ధృవీకరించబడింది',
    db_phone_label: 'ఫోన్',
    db_sign_out: 'సైన్ అవుట్',
    db_tools_title: 'స్మార్ట్ వ్యవసాయ సాధనాలు & సేవలు',
    db_open_tool: 'సాధనం తెరవండి →',
    db_ai_title: 'AI వ్యవసాయ సహాయకుడు',
    db_ai_desc: 'మీ భాషలో వ్యవసాయం, తెగుళ్ళు లేదా ఎరువుల గురించి ఏదైనా అడగండి',
    db_crop_title: 'పంట సిఫార్సు',
    db_crop_desc: 'మీ నేల రకం మరియు సీజన్‌కు తగిన ఉత్తమ పంట సూచనలు పొందండి',
    db_disease_title: 'వ్యాధి గుర్తింపు',
    db_disease_desc: 'పంట ఆకు ఫోటోలను అప్‌లోడ్ చేసి వెంటనే వ్యాధులు & నివారణ తెలుసుకోండి',
    db_weather_title: 'వాతావరణ సలహా',
    db_weather_desc: 'మీ పొలం కోసం 7-రోజుల ఉష్ణోగ్రత, వర్షం మరియు గాలి అంచనా',
    db_schemes_title: 'ప్రభుత్వ పథకాలు',
    db_schemes_desc: 'అందుబాటులో ఉన్న సబ్సిడీలు, ఆర్థిక సహాయం మరియు PM-KISAN వివరాలు చూడండి',
    db_prediction_title: 'బంగాళాదుంప దిగుబడి అంచనా',
    db_prediction_desc: 'బంగాళాదుంపలో ముందస్తు & ఆలస్య ఆకుమాడు గుర్తించి కోత సలహా పొందండి',
    db_weather_today: 'నేటి వాతావరణం',
    db_crop_matches: 'తగిన పంటలు',
    db_health_alerts: 'ఆరోగ్య హెచ్చరికలు',
    db_scan_leaf_btn: 'కెమెరాతో ఆకును స్కాన్ చేయండి →',
    db_ai_suggested: 'AI సూచన',
    db_early_blight_risk: 'ముందస్తు ఆకుమాడు ప్రమాదం',
    db_early_blight_sub: 'టమాటా పంట • అధిక తేమ',
    db_rust_fungus_risk: 'తుప్పు శిలీంధ్ర హెచ్చరిక',
    db_rust_fungus_sub: 'గోధుమ పంట • మధ్యస్థం',
    db_humidity: 'తేమ',
    db_wind: 'గాలి',
    db_uv_index: 'UV సూచిక',

    // Weather
    w_title: 'వ్యవసాయ వాతావరణ రాడార్',
    w_subtitle: 'భారతీయ వ్యవసాయ పనుల కోసం రూపొందించిన 7-రోజుల స్థానిక వాతావరణ అంచనా.',
    w_today: 'నేటి పొలం వాతావరణం',
    w_forecast_7day: '7-రోజుల వ్యవసాయ అంచనా',
    w_temp: 'ఉష్ణోగ్రత',
    w_humidity: 'గాలి తేమ',
    w_wind: 'గాలి వేగం',
    w_precipitation: 'వర్షపాతం',
    w_farming_advisory: 'నేటి వ్యవసాయ సలహా',

    // Prediction
    pred_title: 'బంగాళాదుంప పంట వ్యాధి & దిగుబడి అంచనా',
    pred_subtitle: 'బంగాళాదుంప ఆకు వ్యాధులు మరియు కోత భద్రత కోసం డీప్ లెర్నింగ్ వ్యవస్థ.',
    pred_upload_title: 'బంగాళాదుంప ఆకు అప్‌లోడ్ చేయండి',
    pred_select_sample: 'డెమో నమూనా ఎంచుకోండి',
    pred_diagnose: 'వ్యాధి & దిగుబడి ప్రభావాన్ని అంచనా వేయండి',
    pred_result_title: 'నిర్ధారణ అంచనా ఫలితం',

    // Fertilizer
    fa_title: 'స్మార్ట్ ఎరువుల మోతాదు సలహాదారు',
    fa_subtitle: 'నేల పోషక లోపం మరియు పంట దశ ఆధారంగా శాస్త్రీయ N-P-K సమతుల్యత.',
    fa_soil_type: 'నేల రకం',
    fa_crop_type: 'లక్ష్య పంట',
    fa_calculate: 'సరైన ఎరువుల మిశ్రమాన్ని లెక్కించండి',
    fa_recommendation: 'ఎరువుల సిఫార్సు ప్రణాళిక',

    // Planner
    fp_title: 'పొలం పని & షెడ్యూల్ ప్రణాళిక',
    fp_subtitle: 'విత్తడం, నీటిపారుదల, ఎరువులు మరియు కోతను ఖచ్చితంగా ప్లాన్ చేయండి.',
    fp_seasonal_schedule: 'సీజనల్ వ్యవసాయ షెడ్యూల్',
    fp_add_activity: 'పొలం పని జోడించండి',

    // Schemes
    gs_title: 'ప్రభుత్వ వ్యవసాయ పథకాలు & సబ్సిడీలు',
    gs_subtitle: 'కేంద్ర మరియు రాష్ట్ర ప్రభుత్వ రైతు సహాయ పథకాలు, గ్రాంట్లు మరియు రుణ సౌకర్యాలను తెలుసుకోండి.',
    gs_search: 'కీవర్డ్ ద్వారా పథకాలను వెతకండి...',
    gs_all_schemes: 'అన్ని పథకాలు',
    gs_subsidies: 'సబ్సిడీలు & పరికరాలు',
    gs_insurance: 'పంట బీమా',
    gs_financial_support: 'ఆర్థిక సహాయం',
    gs_apply_now: 'అధికారిక పోర్టల్ / దరఖాస్తు →',
    gs_eligibility: 'అర్హత ప్రమాణాలు',
    gs_benefits: 'నేరుగా ప్రయోజనాలు',

    // How to Use
    htu_title: 'SmartFarm AI ని ఎలా ఉపయోగించాలి',
    htu_subtitle: 'రైతులు అధిక దిగుబడి సాధించడానికి దశల వారీ దృశ్య మార్గదర్శి.',
    htu_quick_steps: 'వ్యవసాయ పని విధానం గైడ్',

    // Login
    login_title: 'ఫోన్ నంబర్‌తో సైన్ ఇన్ చేయండి',
    login_subtitle: 'Twilio ద్వారా సురక్షిత SMS OTP పొందడానికి మీ మొబైల్ నంబర్‌ను నమోదు చేయండి. పాస్‌వర్డ్ అవసరం లేదు.',
    login_step1: 'దశ 1 / 2',
    login_step2: 'దశ 2 / 2',
    login_step1_sub: 'SMS OTP పొందడానికి మీ పేరు మరియు ఫోన్ నంబర్‌ను నమోదు చేయండి.',
    login_step2_sub: 'దయచేసి మీ ఫోన్‌కు పంపిన 6-అంకెల కోడ్‌ను నమోదు చేయండి.',
    login_full_name: 'మీ పూర్తి పేరు',
    login_phone: 'మొబైల్ ఫోన్ నంబర్',
    login_send_otp: 'OTP పంపండి',
    login_verify_otp: 'ధృవీకరించి సైన్ ఇన్ చేయండి',
    login_resend_otp: 'OTP మళ్ళీ పంపండి',
  },
}

function extractLangDict(dict: MultiLangDict, lang: ExtraLang): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(dict)) {
    if (v[lang]) out[k] = v[lang]
  }
  return out
}

function buildDomainLocale(lang: ExtraLang): Record<string, string> {
  return {
    ...extractLangDict(COMMON_DOMAIN_PHRASES, lang),
    ...extractLangDict(PLANNER_AND_DISEASE_PHRASES, lang),
    ...extractLangDict(DISEASE_AND_RECOMMEND_PHRASES, lang),
    ...extractLangDict(DISEASE_EXTRA_PHRASES, lang),
    ...extractLangDict(FERTILIZER_SERVICE_PHRASES, lang),
    ...extractLangDict(CROP_EXTRA_PHRASES, lang),
  }
}

const LOCALE_PHRASES: Partial<Record<LangCode, Record<string, string>>> = {
  hi: buildDomainLocale('hi'),
  mr: buildDomainLocale('mr'),
  gu: { ...GU_PHRASES, ...buildDomainLocale('gu') },
  pa: { ...PA_PHRASES, ...buildDomainLocale('pa') },
  ta: { ...TA_PHRASES, ...buildDomainLocale('ta') },
  te: { ...TE_PHRASES, ...buildDomainLocale('te') },
}

export function tr(lang: LangCode, enText: string, hiText?: string, mrText?: string): string {
  if (lang === 'en') return enText
  if (lang === 'hi') return hiText ?? LOCALE_PHRASES.hi?.[enText] ?? enText
  if (lang === 'mr') return mrText ?? LOCALE_PHRASES.mr?.[enText] ?? enText
  return LOCALE_PHRASES[lang]?.[enText] ?? enText
}

export function trFormat(
  lang: LangCode,
  templateEn: string,
  vars: Record<string, string | number>,
  hiTemplate?: string,
  mrTemplate?: string
): string {
  let out = tr(lang, templateEn, hiTemplate, mrTemplate)
  for (const [key, val] of Object.entries(vars)) {
    out = out.split(`{${key}}`).join(String(val))
  }
  return out
}

export function getDateLocale(lang: LangCode): string {
  switch (lang) {
    case 'hi':
      return 'hi-IN'
    case 'mr':
      return 'mr-IN'
    case 'gu':
      return 'gu-IN'
    case 'pa':
      return 'pa-IN'
    case 'ta':
      return 'ta-IN'
    case 'te':
      return 'te-IN'
    default:
      return 'en-IN'
  }
}

export function pickLang<T>(lang: LangCode, map: Partial<Record<LangCode, T>> & { en: T }): T {
  return map[lang] ?? map.en
}

export function t(lang: LangCode, key: keyof Translations): string {
  const currentLang = translations[lang] || translations.en
  const val = currentLang[key] ?? translations.en[key]
  if (typeof val === 'string') return val
  return String(val)
}

export function tArr(lang: LangCode, key: keyof Translations): string[] {
  const currentLang = translations[lang] || translations.en
  const val = currentLang[key] ?? translations.en[key]
  if (Array.isArray(val)) return val
  return []
}

export function getTranslations(lang: LangCode): Translations {
  return translations[lang] || translations.en
}

export function getLangLabel(lang: LangCode): string {
  switch (lang) {
    case 'hi':
      return 'हिंदी'
    case 'mr':
      return 'मराठी'
    case 'gu':
      return 'ગુજરાતી'
    case 'pa':
      return 'ਪੰਜਾਬੀ'
    case 'ta':
      return 'தமிழ்'
    case 'te':
      return 'తెలుగు'
    default:
      return 'English'
  }
}

export const LANG_OPTIONS: { code: LangCode; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'Hindi (हिंदी)', flag: '🇮🇳' },
  { code: 'mr', label: 'Marathi (मराठी)', flag: '🇮🇳' },
  { code: 'gu', label: 'Gujarati (ગુજરાતી)', flag: '🇮🇳' },
  { code: 'pa', label: 'Punjabi (ਪੰਜਾਬੀ)', flag: '🇮🇳' },
  { code: 'ta', label: 'Tamil (தமிழ்)', flag: '🇮🇳' },
  { code: 'te', label: 'Telugu (తెలుగు)', flag: '🇮🇳' },
]

export default translations
