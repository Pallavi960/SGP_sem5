import type { LangCode } from '../context/LanguageContext'

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
    default:
      return 'English'
  }
}

export const LANG_OPTIONS: { code: LangCode; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
  { code: 'mr', label: 'मराठी', flag: '🇮🇳' },
]

export default translations
