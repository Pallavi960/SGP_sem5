import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  UploadCloud, Camera, RefreshCw, CheckCircle2, AlertTriangle,
  ShieldAlert, Info, Leaf, Droplets, Bug, Pill, ChevronDown, ChevronUp,
} from 'lucide-react'
import axios from 'axios'
import { useLanguage } from './context/LanguageContext'
import { t } from './lib/i18n'

const API_BASE = `${import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'}/api/prediction`

// ── Types ────────────────────────────────────────────────────────────────────
interface ControlMeasure {
  product?: string
  treatment?: string
  dosage: string
  application?: string
  timing?: string
}

interface DiseaseDetails {
  id: string
  name: string
  vernacular_name: string
  pathogen: string
  severity: string
  description: string
  symptoms: string[]
  immediate_actions: string[]
  chemical_control: ControlMeasure[]
  organic_control: ControlMeasure[]
  prevention: string[]
}

interface Top3 {
  class_name: string
  probability: number
}

interface PredictionResponse {
  status: string
  predicted_class: string
  confidence: number
  top3: Top3[]
  engine: string
  details: DiseaseDetails
  ai_prompt: string
}

// ── Helpers ──────────────────────────────────────────────────────────────────
const SEVERITY_STYLE: Record<string, { bg: string; text: string; border: string }> = {
  Normal:   { bg: 'bg-green-50',  text: 'text-green-700',  border: 'border-green-200' },
  Moderate: { bg: 'bg-amber-50',  text: 'text-amber-700',  border: 'border-amber-200' },
  High:     { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  Critical: { bg: 'bg-red-50',    text: 'text-red-700',    border: 'border-red-200' },
}

const CLASS_LABEL: Record<string, string> = {
  Early_blight: '🍂 Early Blight',
  Late_blight:  '🌧️ Late Blight',
  Healthy:      '🌿 Healthy',
}

const CLASS_COLOR: Record<string, { bar: string; bg: string; text: string }> = {
  Early_blight: { bar: 'bg-amber-400',  bg: 'bg-amber-50',  text: 'text-amber-700' },
  Late_blight:  { bar: 'bg-red-500',    bg: 'bg-red-50',    text: 'text-red-700' },
  Healthy:      { bar: 'bg-green-500',  bg: 'bg-green-50',  text: 'text-green-700' },
}

// ── Component ────────────────────────────────────────────────────────────────
export default function Prediction() {
  const { lang } = useLanguage()
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile]       = useState<File | null>(null)
  const [result, setResult]             = useState<PredictionResponse | null>(null)
  const [loading, setLoading]           = useState(false)
  const [error, setError]               = useState<string | null>(null)
  const [showCamera, setShowCamera]     = useState(false)
  const [openSection, setOpenSection]   = useState<string | null>('immediate')

  const fileInputRef  = useRef<HTMLInputElement>(null)
  const videoRef      = useRef<HTMLVideoElement>(null)
  const canvasRef     = useRef<HTMLCanvasElement>(null)
  const streamRef     = useRef<MediaStream | null>(null)

  // ── File select ──────────────────────────────────────────────────────────
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setResult(null)
    setError(null)
    const reader = new FileReader()
    reader.onload = (ev) => setImagePreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (!file || !file.type.startsWith('image/')) return
    setImageFile(file)
    setResult(null)
    setError(null)
    const reader = new FileReader()
    reader.onload = (ev) => setImagePreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }, [])

  // ── Camera ───────────────────────────────────────────────────────────────
  const startCamera = async () => {
    setShowCamera(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      streamRef.current = stream
      if (videoRef.current) videoRef.current.srcObject = stream
    } catch {
      setError(
        lang === 'hi'
          ? 'कैमरा एक्सेस नहीं हो सका। कृपया फोटो अपलोड करें।'
          : lang === 'mr'
          ? 'कॅमेरा सुरू करता आला नाही. कृपया फोटो अपलोड करा.'
          : 'Cannot access camera. Please upload an image instead.'
      )
      setShowCamera(false)
    }
  }

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return
    const video  = videoRef.current
    const canvas = canvasRef.current
    canvas.width  = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d')!.drawImage(video, 0, 0)
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9)
    setImagePreview(dataUrl)
    setImageFile(null)
    setResult(null)
    setError(null)
    stopCamera()
  }

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    setShowCamera(false)
  }

  // ── Predict ──────────────────────────────────────────────────────────────
  const handlePredict = async () => {
    if (!imagePreview) return
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      let response

      if (imageFile) {
        const form = new FormData()
        form.append('file', imageFile)
        response = await axios.post<PredictionResponse>(`${API_BASE}/predict`, form, {
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 30000,
        })
      } else {
        // camera capture — send as base64
        response = await axios.post<PredictionResponse>(`${API_BASE}/predict-base64`, {
          image_base64: imagePreview,
        }, { timeout: 30000 })
      }

      setResult(response.data)
      setOpenSection('immediate')
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ??
        err?.message ??
        (lang === 'hi'
          ? 'निदान विफल हुआ। सुनिश्चित करें कि बैकएंड चालू है।'
          : lang === 'mr'
          ? 'निदान अयशस्वी झाले. बॅकएंड चालू असल्याची खात्री करा.'
          : 'Prediction failed. Check the backend is running.')
      )
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setImagePreview(null)
    setImageFile(null)
    setResult(null)
    setError(null)
    stopCamera()
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // ── Accordion section toggle ─────────────────────────────────────────────
  const toggle = (key: string) => setOpenSection((prev) => (prev === key ? null : key))

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f7faf5]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* ─── Header ────────────────────────────────────────────────── */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {lang === 'hi' ? '🥔 आलू पत्ती रोग पहचान' : lang === 'mr' ? '🥔 बटाटा पान रोग निदान' : '🥔 Potato Leaf Prediction'}
          </h1>
          <p className="text-gray-500 mt-1 text-base">
            {lang === 'hi'
              ? 'अगेती झुलसा, पछेती झुलसा का पता लगाने या स्वस्थ फसल की पुष्टि के लिए आलू की पत्ती की फोटो अपलोड करें।'
              : lang === 'mr'
              ? 'करपा (Early Blight), तांबेरा (Late Blight) किंवा निरोगी पीक तपासण्यासाठी बटाट्याच्या पानाचा फोटो अपलोड करा.'
              : "Upload or take a photo of a potato leaf to detect Early Blight, Late Blight, or confirm it's Healthy."}
          </p>
        </div>

        {/* ─── Image Input Area ──────────────────────────────────────── */}
        {!showCamera && (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => !imagePreview && fileInputRef.current?.click()}
            className={`relative bg-white rounded-2xl border-2 border-dashed transition-colors cursor-pointer
              ${imagePreview ? 'border-green-400 cursor-default' : 'border-gray-300 hover:border-green-400'}`}
          >
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Leaf preview"
                  className="w-full max-h-72 object-contain rounded-2xl"
                />
                <button
                  onClick={(e) => { e.stopPropagation(); handleReset() }}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                  title="Remove image"
                >
                  <RefreshCw size={16} className="text-gray-500" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-14 gap-3 text-gray-400">
                <UploadCloud size={40} className="text-green-400" />
                <p className="text-base font-semibold text-gray-600">
                  {lang === 'hi' ? 'पत्ती का फोटो यहाँ डालें' : lang === 'mr' ? 'इथे पानाचा फोटो टाका' : 'Drop a leaf photo here'}
                </p>
                <p className="text-sm">
                  {lang === 'hi' ? 'या ब्राउज़ करने के लिए क्लिक करें' : lang === 'mr' ? 'किंवा निवडण्यासाठी क्लिक करा' : 'or click to browse'}
                </p>
                <p className="text-xs text-gray-400">
                  {lang === 'hi' ? 'JPG, PNG, WEBP — अधिकतम 10 MB' : lang === 'mr' ? 'JPG, PNG, WEBP — कमाल 10 MB' : 'JPG, PNG, WEBP — max 10 MB'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* ─── Camera view ───────────────────────────────────────────── */}
        {showCamera && (
          <div className="bg-black rounded-2xl overflow-hidden relative">
            <video ref={videoRef} autoPlay playsInline className="w-full rounded-2xl max-h-72 object-cover" />
            <canvas ref={canvasRef} className="hidden" />
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-3">
              <button
                onClick={capturePhoto}
                className="px-6 py-2.5 bg-white text-gray-900 font-bold rounded-xl shadow"
              >
                {lang === 'hi' ? '📸 फोटो खींचें' : lang === 'mr' ? '📸 फोटो काढा' : '📸 Capture'}
              </button>
              <button
                onClick={stopCamera}
                className="px-4 py-2.5 bg-white/30 text-white font-semibold rounded-xl"
              >
                {lang === 'hi' ? 'रद्द करें' : lang === 'mr' ? 'रद्द करा' : 'Cancel'}
              </button>
            </div>
          </div>
        )}

        {/* ─── Hidden file input + action buttons ────────────────────── */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {!showCamera && (
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <UploadCloud size={16} />
              {lang === 'hi' ? 'फोटो अपलोड करें' : lang === 'mr' ? 'फोटो अपलोड करा' : 'Upload Photo'}
            </button>
            <button
              onClick={startCamera}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Camera size={16} />
              {lang === 'hi' ? 'कैमरा शुरू करें' : lang === 'mr' ? 'कॅमेरा सुरू करा' : 'Take Photo'}
            </button>
            {imagePreview && (
              <button
                onClick={handlePredict}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-bold transition-colors disabled:opacity-60"
              >
                {loading ? (
                  <><RefreshCw size={15} className="animate-spin" /> {lang === 'hi' ? 'विश्लेषण जारी है…' : lang === 'mr' ? 'विश्लेषण सुरू आहे…' : 'Analysing…'}</>
                ) : (
                  <><Leaf size={15} /> {lang === 'hi' ? 'रोग का पता लगाएं' : lang === 'mr' ? 'रोग निदान करा' : 'Predict Disease'}</>
                )}
              </button>
            )}
            {(imagePreview || result) && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
              >
                <RefreshCw size={15} />
                {lang === 'hi' ? 'रीसेट करें' : lang === 'mr' ? 'रीसेट करा' : 'Reset'}
              </button>
            )}
          </div>
        )}

        {/* ─── Error ─────────────────────────────────────────────────── */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* ─── Results ───────────────────────────────────────────────── */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-4"
            >
              {/* Diagnosis card */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                      {lang === 'hi' ? 'निदान' : lang === 'mr' ? 'निदान' : 'Diagnosis'}
                    </p>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {CLASS_LABEL[result.predicted_class] ?? result.predicted_class}
                    </h2>
                    <p className="text-sm text-gray-500 mt-0.5">{result.details.vernacular_name}</p>

                    {/* Severity badge */}
                    {(() => {
                      const s = SEVERITY_STYLE[result.details.severity] ?? SEVERITY_STYLE.Normal
                      const SevIcon = result.details.severity === 'Normal'
                        ? CheckCircle2
                        : result.details.severity === 'Moderate'
                        ? Info
                        : result.details.severity === 'High'
                        ? AlertTriangle
                        : ShieldAlert
                      return (
                        <span className={`inline-flex items-center gap-1.5 mt-2 text-xs font-bold px-2.5 py-1 rounded-full border ${s.bg} ${s.text} ${s.border}`}>
                          <SevIcon size={12} /> {result.details.severity}
                        </span>
                      )
                    })()}

                    <p className="text-sm text-gray-600 mt-3 leading-relaxed">{result.details.description}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      🔬 {result.details.pathogen}
                    </p>
                  </div>

                  {/* Confidence donut */}
                  <div className="shrink-0 flex flex-col items-center">
                    <svg width="90" height="90" viewBox="0 0 90 90">
                      <circle cx="45" cy="45" r="38" fill="none" stroke="#e5e7eb" strokeWidth="9" />
                      <circle
                        cx="45" cy="45" r="38"
                        fill="none"
                        stroke={result.confidence >= 80 ? '#16a34a' : result.confidence >= 60 ? '#f59e0b' : '#ef4444'}
                        strokeWidth="9"
                        strokeDasharray={`${(result.confidence / 100) * 238.76} 238.76`}
                        strokeLinecap="round"
                        transform="rotate(-90 45 45)"
                        style={{ transition: 'stroke-dasharray 0.8s ease' }}
                      />
                      <text x="45" y="45" textAnchor="middle" dominantBaseline="central" className="text-base font-bold" style={{ fontSize: 16, fontWeight: 700, fill: '#111827' }}>
                        {result.confidence.toFixed(0)}%
                      </text>
                    </svg>
                    <p className="text-xs text-gray-500 mt-1 font-semibold">
                      {t(lang, 'dd_confidence')}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{result.engine}</p>
                  </div>
                </div>

                {/* Top-3 bar chart */}
                <div className="mt-5 space-y-2">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                    {lang === 'hi' ? 'शीर्ष पूर्वानुमान' : lang === 'mr' ? 'प्रमुख अंदाज' : 'Top Predictions'}
                  </p>
                  {result.top3.map((p) => {
                    const c = CLASS_COLOR[p.class_name] ?? { bar: 'bg-gray-400', bg: 'bg-gray-50', text: 'text-gray-700' }
                    return (
                      <div key={p.class_name} className="flex items-center gap-3">
                        <span className={`text-xs font-semibold w-28 ${c.text}`}>
                          {CLASS_LABEL[p.class_name] ?? p.class_name}
                        </span>
                        <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${c.bar} transition-all duration-700`}
                            style={{ width: `${p.probability}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-gray-700 w-12 text-right">{p.probability.toFixed(1)}%</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Accordion sections */}
              {[
                {
                  key: 'immediate',
                  icon: <AlertTriangle size={16} className="text-amber-600" />,
                  title: lang === 'hi' ? 'तत्काल क्या करें' : lang === 'mr' ? 'तातडीने काय करावे' : 'What to do right now',
                  items: result.details.immediate_actions,
                  color: 'text-amber-700',
                },
                {
                  key: 'symptoms',
                  icon: <Bug size={16} className="text-red-500" />,
                  title: lang === 'hi' ? 'प्रमुख लक्षण' : lang === 'mr' ? 'लक्षणे' : 'Symptoms to watch',
                  items: result.details.symptoms,
                  color: 'text-red-700',
                },
                {
                  key: 'chemical',
                  icon: <Pill size={16} className="text-purple-600" />,
                  title: lang === 'hi' ? 'रासायनिक उपचार' : lang === 'mr' ? 'रासायनिक उपचार' : 'Chemical Treatment',
                  measures: result.details.chemical_control,
                  color: 'text-purple-700',
                },
                {
                  key: 'organic',
                  icon: <Leaf size={16} className="text-green-600" />,
                  title: lang === 'hi' ? 'जैविक / प्राकृतिक उपचार' : lang === 'mr' ? 'सेंद्रिय / नैसर्गिक उपचार' : 'Organic / Natural Treatment',
                  measures: result.details.organic_control,
                  color: 'text-green-700',
                },
                {
                  key: 'prevention',
                  icon: <Droplets size={16} className="text-blue-600" />,
                  title: lang === 'hi' ? 'रोकथाम के उपाय' : lang === 'mr' ? 'प्रतिबंधात्मक उपाय' : 'How to Prevent',
                  items: result.details.prevention,
                  color: 'text-blue-700',
                },
              ].map((sec) => {
                const isOpen = openSection === sec.key
                const hasContent = (sec.items?.length ?? 0) > 0 || (sec.measures?.length ?? 0) > 0
                if (!hasContent) return null
                return (
                  <div key={sec.key} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <button
                      onClick={() => toggle(sec.key)}
                      className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <span className={`flex items-center gap-2 text-sm font-bold ${sec.color}`}>
                        {sec.icon} {sec.title}
                      </span>
                      {isOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 space-y-2">
                            {sec.items?.map((item, i) => (
                              <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-green-500" />
                                {item}
                              </div>
                            ))}
                            {sec.measures?.map((m, i) => (
                              <div key={i} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                                <p className="text-sm font-semibold text-gray-800">
                                  {m.product ?? m.treatment}
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  <span className="font-semibold">{lang === 'hi' ? 'खुराक:' : lang === 'mr' ? 'मात्रा:' : 'Dosage:'}</span> {m.dosage}
                                </p>
                                {(m.application ?? m.timing) && (
                                  <p className="text-xs text-gray-500 mt-0.5">
                                    <span className="font-semibold">{lang === 'hi' ? 'विधि:' : lang === 'mr' ? 'पद्धत:' : 'How:'}</span> {m.application ?? m.timing}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}

              {/* Ask AI chip */}
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-start gap-3">
                <Info size={18} className="text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-green-700">
                    {lang === 'hi' ? 'विस्तृत सलाह चाहिए?' : lang === 'mr' ? 'सविस्तर सल्ला हवा आहे?' : 'Want more detailed advice?'}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {lang === 'hi'
                      ? 'कृषि मित्र AI चैट (नीचे-दाएं बटन) का उपयोग करें और नीचे दिया गया प्रश्न पूछें:'
                      : lang === 'mr'
                      ? 'कृषी मित्र AI चॅट (खालील उजवे बटण) वापरा आणि खालील प्रश्न विचारा:'
                      : 'Use the Krishi Mitra AI chat (bottom-right button) and paste the suggested question below:'}
                  </p>
                  <p className="text-xs bg-white border border-green-200 rounded-lg p-2 mt-2 text-gray-700 leading-relaxed select-all">
                    {result.ai_prompt}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
