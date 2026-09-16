import { useState } from 'react'
import { Phone, ArrowRight, Loader2, AlertCircle, ShieldCheck, User } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

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
      setError('Please enter your full name.')
      return
    }

    if (trimmedName.length < 2) {
      setError('Please enter a valid name (at least 2 characters).')
      return
    }

    const cleanNumber = phoneNumber.trim().replace(/^0+/, '') // strip leading zeros

    if (!cleanNumber) {
      setError('Please enter your mobile phone number.')
      return
    }

    if (cleanNumber.length !== selectedCountry.length) {
      setError(`Please enter a valid ${selectedCountry.length}-digit mobile number for ${selectedCountry.country}.`)
      return
    }

    if (selectedCountry.code === '+91' && !selectedCountry.pattern.test(cleanNumber)) {
      setError('Please enter a valid Indian mobile number starting with 6, 7, 8, or 9.')
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
          setError('Too many OTP attempts. For security, please wait 60 seconds before trying again.')
        } else if (msg.includes('sms provider') || msg.includes('phone provider')) {
          setError('SMS provider is not configured in Supabase. Please configure Vonage or Twilio in your Supabase Auth settings.')
        } else {
          setError(authError.message || 'Unable to send SMS OTP. Please check your phone number and try again.')
        }
      } else {
        onOtpSent(e164PhoneNumber, trimmedName)
      }
    } catch (err) {
      setError('An unexpected error occurred while contacting the SMS gateway.')
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
          Your Full Name
        </label>
        <div className="flex rounded-xl shadow-sm border border-gray-300 focus-within:border-[#087f3e] focus-within:ring-2 focus-within:ring-[#087f3e]/20 transition-all bg-white overflow-hidden px-3.5">
          <User className="w-4 h-4 text-gray-400 mr-2.5 shrink-0 my-auto" />
          <input
            id="fullName"
            type="text"
            placeholder="e.g. Ramesh Patel"
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
          Mobile Phone Number
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
              aria-label="Country Code"
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
              placeholder={`e.g. ${selectedCountry.length === 10 ? '9876543210' : '123456789'}`}
              value={phoneNumber}
              onChange={handlePhoneChange}
              className="w-full py-3 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none tracking-wide"
              disabled={loading}
            />
          </div>
        </div>
        <p className="text-[11px] text-gray-500 mt-1.5 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#087f3e]" />
          A real 6-digit SMS verification code will be sent to your phone.
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
            <span>Sending SMS OTP...</span>
          </>
        ) : (
          <>
            <span>Send OTP</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  )
}
