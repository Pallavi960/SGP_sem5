import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sprout, ShieldCheck, Sparkles, CloudRain, Cpu, ArrowLeft } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import PhoneLoginForm from '../components/auth/PhoneLoginForm'
import OTPVerification from '../components/auth/OTPVerification'
import logo from '../assets/logo.png'

export default function Login() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [fullName, setFullName] = useState('')
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Where to redirect after login (default /dashboard)
  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/dashboard'

  // If already logged in, redirect immediately
  useEffect(() => {
    if (!loading && user) {
      navigate(from, { replace: true })
    }
  }, [user, loading, navigate, from])

  const handleOtpSent = (fullPhone: string, name: string) => {
    setPhoneNumber(fullPhone)
    setFullName(name)
    setStep('otp')
  }

  const handleAuthSuccess = () => {
    navigate(from, { replace: true })
  }

  return (
    <div className="min-h-[calc(100vh-68px)] bg-gradient-to-br from-[#F5FBF6] via-white to-[#E8F5E9] py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Branding & Value Props */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-6 flex flex-col gap-6"
        >
          <div className="flex items-center gap-3">
            <img src={logo} alt="SmartFarm AI" className="w-12 h-12 object-contain" />
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">SmartFarm AI</h1>
              <p className="text-xs font-semibold text-[#087f3e] tracking-wider uppercase">Smart Farming Assistant</p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Welcome to the Future of <span className="text-[#087f3e]">Smart Agriculture</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-3">
              Log in with your name and mobile number to access personalized farming insights, AI crop recommendations, disease diagnosis, and subsidy alerts.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              { icon: <Cpu className="w-4 h-4 text-[#087f3e]" />, title: 'AI Assistant', desc: 'Instant farming queries in your language' },
              { icon: <Sprout className="w-4 h-4 text-[#087f3e]" />, title: 'Crop Advisory', desc: 'Optimized for your soil & season' },
              { icon: <CloudRain className="w-4 h-4 text-[#087f3e]" />, title: 'Weather Forecast', desc: 'Precision 7-day agricultural radar' },
              { icon: <ShieldCheck className="w-4 h-4 text-[#087f3e]" />, title: 'Govt Schemes', desc: 'Direct access to latest subsidies' },
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/80 border border-[#b8e5c1]/60 shadow-xs">
                <div className="p-1.5 rounded-lg bg-[#E8F5E9] shrink-0 mt-0.5">{f.icon}</div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">{f.title}</h4>
                  <p className="text-[11px] text-gray-500 leading-snug">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Sparkles className="w-4 h-4 text-[#087f3e]" />
            <span>Trusted by over 10,000+ farmers across India</span>
          </div>
        </motion.div>

        {/* Right Side: Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-6"
        >
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 relative overflow-hidden">
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#087f3e] via-[#4CAF50] to-[#81C784]" />

            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[#087f3e] uppercase tracking-wider bg-[#E8F5E9] px-2.5 py-1 rounded-full">
                  {step === 'phone' ? 'Step 1 of 2' : 'Step 2 of 2'}
                </span>
                <Link
                  to="/"
                  className="flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-gray-700 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Home</span>
                </Link>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                {step === 'phone' ? 'Login with Mobile Number' : 'Enter Verification Code'}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {step === 'phone'
                  ? 'Enter your name and phone number to receive a one-time login OTP.'
                  : `Please enter the 6-digit code sent to ${phoneNumber}.`}
              </p>
            </div>

            {/* Interactive Form Switcher */}
            <AnimatePresence mode="wait">
              {step === 'phone' ? (
                <motion.div
                  key="phone-step"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <PhoneLoginForm onOtpSent={handleOtpSent} />
                </motion.div>
              ) : (
                <motion.div
                  key="otp-step"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <OTPVerification
                    phoneNumber={phoneNumber}
                    fullName={fullName}
                    onBack={() => setStep('phone')}
                    onSuccess={handleAuthSuccess}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer Notice */}
            <p className="text-[11px] text-gray-400 text-center mt-6 leading-relaxed">
              By continuing, you agree to SmartFarm AI's{' '}
              <span className="text-[#087f3e] hover:underline cursor-pointer">Terms of Service</span> and{' '}
              <span className="text-[#087f3e] hover:underline cursor-pointer">Privacy Policy</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
