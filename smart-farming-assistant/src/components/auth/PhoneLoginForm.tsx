import { useState } from 'react'
import { Phone, ArrowRight, Loader2, AlertCircle, ShieldCheck, User } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import { tr, pickLang } from '../../lib/i18n'

interface PhoneLoginFormProps {
  onOtpSent: (fullPhoneNumber: string, name: string) => void
}

const COUNTRY_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳', length: 10, pattern: /^[6-9]\d{9}$/ },
  { code: '+1', country: 'USA / Canada', flag: '🇺🇸', length: 10, pattern: /^\d{10}$/ },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧', length: 10, pattern: /^\d{10}$/ },
  { code: '+971', country: 'UAE', flag: '🇦🇪', length: 9, pattern: /^\d{9}$/ },
  { code: '+61', country: 'Australia', flag: '🇦🇺', length: 9, pattern: /^\d{9}$/ },
]

export default function PhoneLoginForm({ onOtpSent }: PhoneLoginFormProps) {
  const { signInWithOtp } = useAuth()
  const { lang } = useLanguage()
  const [fullName, setFullName] = useState('')
  const [countryCode, setCountryCode] = useState('+91')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const selectedCountry = COUNTRY_CODES.find((c) => c.code === countryCode) || COUNTRY_CODES[0]

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numeric digits
    const val = e.target.value.replace(/\D/g, '')
    if (val.length <= selectedCountry.length) {
      setPhoneNumber(val)
      setError(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const trimmedName = fullName.trim()
    if (!trimmedName) {
      setError(
        tr(lang, 'Please enter your full name.', 'कृपया अपना पूरा नाम दर्ज करें।', 'कृपया तुमचे पूर्ण नाव प्रविष्ट करा.')
      )
      return
    }

    if (trimmedName.length < 2) {
      setError(
        tr(lang, 'Please enter a valid name (at least 2 characters).', 'कृपया मान्य नाम दर्ज करें (कम से कम 2 अक्षर)।', 'कृपया वैध नाव प्रविष्ट करा (किमान २ अक्षरे).')
      )
      return
    }

    const cleanNumber = phoneNumber.trim().replace(/^0+/, '') // strip leading zeros

    if (!cleanNumber) {
      setError(
        tr(lang, 'Please enter your mobile phone number.', 'कृपया अपना मोबाइल नंबर दर्ज करें।', 'कृपया तुमचा मोबाईल नंबर प्रविष्ट करा.')
      )
      return
    }

    if (cleanNumber.length !== selectedCountry.length) {
      setError(
        pickLang(lang, {
          hi: `कृपया ${selectedCountry.country} के लिए मान्य ${selectedCountry.length}-अंकीय मोबाइल नंबर दर्ज करें।`,
          mr: `कृपया ${selectedCountry.country} साठी वैध ${selectedCountry.length}-अंकी मोबाईल नंबर प्रविष्ट करा.`,
          gu: `કૃપા કરીને ${selectedCountry.country} માટે માન્ય ${selectedCountry.length}-અંકનો મોબાઇલ નંબર દાખલ કરો.`,
          pa: `ਕਿਰਪਾ ਕਰਕੇ ${selectedCountry.country} ਲਈ ਸਹੀ ${selectedCountry.length}-ਅੰਕਾਂ ਦਾ ਮੋਬਾਈਲ ਨੰਬਰ ਦਰਜ ਕਰੋ।`,
          ta: `${selectedCountry.country} நாட்டிற்கான சரியான ${selectedCountry.length}-இலக்க மொபைல் எண்ணை உள்ளிடவும்.`,
          te: `దయచేసి ${selectedCountry.country} కోసం చెల్లుబాటు అయ్యే ${selectedCountry.length}-అంకెల మొబైల్ నంబర్‌ను నమోదు చేయండి.`,
          en: `Please enter a valid ${selectedCountry.length}-digit mobile number for ${selectedCountry.country}.`,
        })
      )
      return
    }

    if (selectedCountry.code === '+91' && !selectedCountry.pattern.test(cleanNumber)) {
      setError(
        tr(lang, 'Please enter a valid Indian mobile number starting with 6, 7, 8, or 9.', 'कृपया 6, 7, 8 या 9 से शुरू होने वाला मान्य भारतीय मोबाइल नंबर दर्ज करें।', 'कृपया 6, 7, 8 किंवा 9 ने सुरू होणारा वैध भारतीय मोबाईल नंबर प्रविष्ट करा.')
      )
      return
    }

    // Convert to strict E.164 format: +<countryCode><digits>
    const e164PhoneNumber = `${selectedCountry.code}${cleanNumber}`
    setLoading(true)

    try {
      const { error: authError } = await signInWithOtp(e164PhoneNumber, trimmedName)
      if (authError) {
        const msg = authError.message.toLowerCase()
        if (msg.includes('rate limit') || msg.includes('over_email_send_rate_limit')) {
          setError(
            tr(lang, 'Too many OTP attempts. For security, please wait 60 seconds before trying again.', 'अत्यधिक ओटीपी प्रयास। सुरक्षा के लिए, कृपया पुनः प्रयास करने से पहले 60 सेकंड प्रतीक्षा करें।', 'अतिप्रमाणित ओटीपी प्रयत्न. सुरक्षेसाठी, कृपया पुन्हा प्रयत्न करण्यापूर्वी ६० सेकंद प्रतीक्षा करा.')
          )
        } else if (msg.includes('sms provider') || msg.includes('phone provider')) {
          setError(
            tr(lang, 'SMS provider is not configured in Supabase. Please configure Vonage or Twilio in your Supabase Auth settings.')
          )
        } else {
          setError(
            authError.message ||
            (tr(lang, 'Unable to send SMS OTP. Please check your phone number and try again.', 'एसएमएस ओटीपी भेजने में असमर्थ। कृपया अपने फ़ोन नंबर की जांच करें।', 'एसएमएस ओटीपी पाठवणे शक्य झाले नाही. कृपया आपला फोन नंबर तपासा.'))
          )
        }
      } else {
        onOtpSent(e164PhoneNumber, trimmedName)
      }
    } catch {
      setError(
        tr(lang, 'An unexpected error occurred while contacting the SMS gateway.', 'एसएमएस गेटवे से संपर्क करते समय त्रुटि हुई।', 'एसएमएस गेटवेशी संपर्क साधताना त्रुटी आढळली.')
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <span className="leading-snug">{error}</span>
        </div>
      )}

      {/* Name Input */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1.5">
          {tr(lang, 'Your Full Name', 'आपका पूरा नाम', 'तुमचे पूर्ण नाव')}
        </label>
        <div className="flex rounded-xl shadow-sm border border-gray-300 focus-within:border-[#087f3e] focus-within:ring-2 focus-within:ring-[#087f3e]/20 transition-all bg-white overflow-hidden px-3.5">
          <User className="w-4 h-4 text-gray-400 mr-2.5 shrink-0 my-auto" />
          <input
            id="fullName"
            type="text"
            placeholder={tr(lang, 'e.g. Ramesh Patel', 'उदा. रमेश पटेल', 'उदा. रमेश पाटील')}
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value)
              setError(null)
            }}
            className="w-full py-3 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
            autoFocus
            disabled={loading}
          />
        </div>
      </div>

      {/* Phone Number Input */}
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1.5">
          {tr(lang, 'Mobile Phone Number', 'मोबाइल फ़ोन नंबर', 'मोबाईल फोन नंबर')}
        </label>
        <div className="flex rounded-xl shadow-sm border border-gray-300 focus-within:border-[#087f3e] focus-within:ring-2 focus-within:ring-[#087f3e]/20 transition-all bg-white overflow-hidden">
          {/* Country Code Dropdown */}
          <div className="relative border-r border-gray-200 bg-gray-50 flex items-center shrink-0">
            <select
              value={countryCode}
              onChange={(e) => {
                setCountryCode(e.target.value)
                setPhoneNumber('')
                setError(null)
              }}
              className="appearance-none bg-transparent py-3 pl-3 pr-7 text-sm font-medium text-gray-700 focus:outline-none cursor-pointer"
              aria-label={tr(lang, 'Country Code')}
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-2 text-gray-400 text-xs">▼</div>
          </div>

          {/* Number Input */}
          <div className="flex-1 flex items-center px-3.5">
            <Phone className="w-4 h-4 text-gray-400 mr-2.5 shrink-0" />
            <input
              id="phoneNumber"
              type="tel"
              inputMode="numeric"
              placeholder={`${tr(lang, 'e.g.')} ${selectedCountry.length === 10 ? '9876543210' : '123456789'}`}
              value={phoneNumber}
              onChange={handlePhoneChange}
              className="w-full py-3 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none tracking-wide"
              disabled={loading}
            />
          </div>
        </div>
        <p className="text-[11px] text-gray-500 mt-1.5 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#087f3e]" />
          {tr(lang, 'A real 6-digit SMS verification code will be sent to your phone.', 'आपके फ़ोन पर 6-अंकीय वास्तविक एसएमएस सत्यापन कोड भेजा जाएगा।', 'तुमच्या फोनवर 6-अंकी खरा एसएमएस पडताळणी कोड पाठवला जाईल.')}
        </p>
      </div>

      <button
        type="submit"
        disabled={loading || !fullName.trim() || phoneNumber.length < selectedCountry.length}
        className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#087f3e] hover:bg-[#066832] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 mt-1"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>{tr(lang, 'Sending SMS OTP...', 'एसएमएस ओटीपी भेजा जा रहा है...', 'एसएमएस ओटीपी पाठवत आहे...')}</span>
          </>
        ) : (
          <>
            <span>{tr(lang, 'Send OTP', 'ओटीपी भेजें', 'ओटीपी पाठवा')}</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  )
}
