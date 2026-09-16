import { useState, useEffect, useRef } from 'react'
import { CheckCircle2, ArrowLeft, Loader2, AlertCircle, RefreshCw, Edit2, ShieldAlert, User } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

interface OTPVerificationProps {
  phoneNumber: string
  fullName?: string
  onBack: () => void
  onSuccess: () => void
}

/**
 * Mask the phone number for privacy, e.g. +919876543210 -> +91 ******3210
 */
function maskPhoneNumber(phone: string): string {
  if (!phone || phone.length < 6) return phone
  const match = phone.match(/^(\+\d{1,3})(\d+)$/)
  if (match) {
    const [, cc, digits] = match
    if (digits.length >= 4) {
      const maskedPart = '*'.repeat(digits.length - 4)
      const lastFour = digits.slice(-4)
      return `${cc} ${maskedPart}${lastFour}`
    }
  }
  const lastFour = phone.slice(-4)
  const masked = '*'.repeat(Math.max(phone.length - 4, 2))
  return `${masked}${lastFour}`
}

export default function OTPVerification({ phoneNumber, fullName, onBack, onSuccess }: OTPVerificationProps) {
  const { verifyOtp, signInWithOtp } = useAuth()
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [timer, setTimer] = useState(60)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Countdown timer for Resend OTP
  useEffect(() => {
    if (timer <= 0) return
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [timer])

  // Focus the first empty input on initial mount
  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const handleOtpChange = (index: number, value: string) => {
    const cleanVal = value.replace(/\D/g, '')
    if (!cleanVal) {
      const newOtp = [...otp]
      newOtp[index] = ''
      setOtp(newOtp)
      return
    }

    if (cleanVal.length > 1) {
      const newOtp = [...otp]
      const chars = cleanVal.slice(0, 6).split('')
      chars.forEach((c, i) => {
        if (index + i < 6) {
          newOtp[index + i] = c
        }
      })
      setOtp(newOtp)
      const nextIndex = Math.min(index + chars.length, 5)
      inputRefs.current[nextIndex]?.focus()
      return
    }

    const newOtp = [...otp]
    newOtp[index] = cleanVal
    setOtp(newOtp)
    setError(null)

    if (cleanVal && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pastedData) {
      const newOtp = [...otp]
      pastedData.split('').forEach((char, idx) => {
        if (idx < 6) newOtp[idx] = char
      })
      setOtp(newOtp)
      const targetFocus = Math.min(pastedData.length, 5)
      inputRefs.current[targetFocus]?.focus()
    }
  }

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const fullOtp = otp.join('')
    if (fullOtp.length !== 6) {
      setError('Please enter all 6 digits of the OTP.')
      return
    }

    setError(null)
    setLoading(true)

    try {
      const { session, error: verifyError } = await verifyOtp(phoneNumber, fullOtp, fullName)
      if (verifyError) {
        const msg = verifyError.message.toLowerCase()
        if (msg.includes('expired') || msg.includes('token has expired')) {
          setError('The verification code has expired. Please click "Resend OTP" below.')
        } else if (msg.includes('invalid') || msg.includes('token is invalid') || msg.includes('incorrect')) {
          setError('Invalid OTP. Please check the code received on your phone and try again.')
        } else if (msg.includes('too many') || msg.includes('rate limit')) {
          setError('Too many failed attempts. Please wait a moment before trying again.')
        } else {
          setError(verifyError.message || 'Invalid OTP. Please try again.')
        }
      } else if (session) {
        onSuccess()
      } else {
        setError('Verification failed. Please request a new OTP.')
      }
    } catch (err) {
      setError('An unexpected error occurred during verification.')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (timer > 0 || resending) return
    setResending(true)
    setError(null)

    try {
      const { error: resendError } = await signInWithOtp(phoneNumber, fullName)
      if (resendError) {
        const msg = resendError.message.toLowerCase()
        if (msg.includes('rate limit') || msg.includes('60 seconds')) {
          setError('For security purposes, you can only request a new SMS OTP once every 60 seconds.')
        } else {
          setError(resendError.message || 'Failed to resend SMS OTP. Please try again.')
        }
      } else {
        setTimer(60)
        setOtp(['', '', '', '', '', ''])
        inputRefs.current[0]?.focus()
      }
    } catch (err) {
      setError('Failed to resend verification code.')
    } finally {
      setResending(false)
    }
  }

  const isOtpComplete = otp.every((digit) => digit !== '')

  return (
    <div className="flex flex-col gap-5">
      {/* Phone number badge with change button and masked display */}
      <div className="flex items-center justify-between p-3.5 bg-[#E8F5E9]/70 border border-[#A5D6A7]/60 rounded-xl">
        <div className="flex flex-col">
          {fullName && (
            <span className="text-xs font-bold text-[#087f3e] flex items-center gap-1 mb-0.5">
              <User className="w-3.5 h-3.5" />
              {fullName}
            </span>
          )}
          <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">SMS OTP sent to</span>
          <span className="text-sm font-bold text-gray-900 font-mono tracking-wide">
            {maskPhoneNumber(phoneNumber)}
          </span>
        </div>
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="flex items-center gap-1 text-xs font-semibold text-[#087f3e] hover:text-[#066832] hover:underline transition-colors"
        >
          <Edit2 className="w-3.5 h-3.5" />
          <span>Change</span>
        </button>
      </div>

      {error && (
        <div className="flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <span className="leading-snug">{error}</span>
        </div>
      )}

      {/* 6 Digit Inputs */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
          Enter 6-Digit SMS Verification Code
        </label>
        <div className="flex justify-between gap-2 sm:gap-3" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              disabled={loading}
              className={`w-11 h-13 sm:w-13 sm:h-14 text-center text-xl font-bold rounded-xl border transition-all duration-200 ${
                digit
                  ? 'border-[#087f3e] bg-[#f0faf2] text-gray-900 shadow-sm'
                  : 'border-gray-300 bg-white text-gray-800 focus:border-[#087f3e] focus:ring-2 focus:ring-[#087f3e]/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Verify Button */}
      <button
        type="button"
        onClick={() => handleVerify()}
        disabled={loading || !isOtpComplete}
        className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#087f3e] hover:bg-[#066832] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Verifying SMS OTP...</span>
          </>
        ) : (
          <>
            <CheckCircle2 className="w-5 h-5" />
            <span>Verify & Log In</span>
          </>
        )}
      </button>

      {/* Resend OTP / Timer */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="flex items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        {timer > 0 ? (
          <span className="text-gray-400 font-medium">
            Resend SMS in <span className="text-[#087f3e] font-semibold">{timer}s</span>
          </span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={resending || loading}
            className="flex items-center gap-1 font-semibold text-[#087f3e] hover:text-[#066832] hover:underline transition-colors"
          >
            {resending ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Sending new SMS...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Resend SMS OTP</span>
              </>
            )}
          </button>
        )}
      </div>

      <div className="flex items-center gap-1.5 justify-center text-[11px] text-gray-400">
        <ShieldAlert className="w-3.5 h-3.5 text-gray-400" />
        <span>Never share your SMS verification code with anyone.</span>
      </div>
    </div>
  )
}
