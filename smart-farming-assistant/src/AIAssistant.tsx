import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sprout, User, Loader2, RotateCcw } from 'lucide-react'
import { useLanguage } from './context/LanguageContext'
import { t } from './lib/i18n'

interface Message {
  role: 'user' | 'assistant'
  text: string
}

export default function AIAssistant() {
  const { lang } = useLanguage()
  const location = useLocation()

  const welcomeText =
    lang === 'hi'
      ? 'नमस्ते! 🌱 मैं कृषि मित्र हूँ, आपका एआई कृषि सहायक।\n\nमुझसे फसलों, बीमारियों, खाद, मौसम, सरकारी योजनाओं या मंडी भाव के बारे में कुछ भी पूछें — हिंदी, मराठी या अंग्रेजी में।'
      : lang === 'mr'
      ? 'नमस्कार! 🌱 मी कृषी मित्र आहे, तुमचा एआय शेती सहाय्यक.\n\nमला पिके, रोग, खते, हवामान, शासकीय योजना किंवा बाजारभावाविषयी काहीही विचारा — मराठी, हिंदी किंवा इंग्रजीत.'
      : "Namaste! 🌱 I'm Krishi Mitra, your AI farming assistant.\n\nAsk me anything about crops, diseases, soil, weather, government schemes, or mandi prices — in Hindi, Marathi, or English."

  const suggestions = [
    lang === 'hi' ? 'इस खरीफ मौसम में कौन सी फसल बोनी चाहिए?' : lang === 'mr' ? 'या खरीप हंगामात कोणते पीक घ्यावे?' : 'Which crop should I grow this Kharif season?',
    lang === 'hi' ? 'मेरे टमाटर के पत्तों पर पीले धब्बे हैं। क्या करें?' : lang === 'mr' ? 'माझ्या टोमॅटोच्या पानांवर पिवळे ठिपके आहेत. काय करावे?' : 'My tomato leaves have yellow spots. What to do?',
    lang === 'hi' ? 'प्रधानमंत्री किसान सम्मान निधि योजना क्या है?' : lang === 'mr' ? 'पीएम-किसान सन्मान निधी योजना काय आहे?' : 'What is PM-KISAN scheme?',
    lang === 'hi' ? 'गेहूं की फसल को कितने पानी की आवश्यकता होती है?' : lang === 'mr' ? 'गव्हाच्या पिकाला किती पाणी लागते?' : 'How much water does wheat need?',
  ]

  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', text: welcomeText }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const isNearBottomRef = useRef(true)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // When language changes, update welcome message if it's the only one
  const prevLangRef = useRef(lang)
  useEffect(() => {
    if (prevLangRef.current !== lang) {
      prevLangRef.current = lang
      setMessages([{ role: 'assistant', text: welcomeText }])
      setInput('')
    }
  }, [lang, welcomeText])

  useEffect(() => {
    const initialQuery = (location.state as { initialQuery?: string })?.initialQuery
    if (initialQuery) {
      setInput(initialQuery)
      textareaRef.current?.focus()
    }
  }, [location.state])

  const handleScroll = () => {
    const container = messagesContainerRef.current
    if (!container) return
    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100
    isNearBottomRef.current = isNearBottom
  }

  useEffect(() => {
    if (isNearBottomRef.current && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [messages, loading])

  const sendMessage = async (text?: string) => {
    const trimmed = (text ?? input).trim()
    if (!trimmed || loading) return

    const userMsg: Message = { role: 'user', text: trimmed }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)
    isNearBottomRef.current = true

    // Build history excluding the welcome message
    const history = updatedMessages
      .slice(1, -1)
      .map((m) => ({ role: m.role, text: m.text }))

    const langInstruction = t(lang, 'ai_system_lang_instruction')
    const messageWithLang = `[${langInstruction}]\n\n${trimmed}`

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'}/api/ai/chat`, {
        message: messageWithLang,
        history,
      })
      setMessages((prev) => [...prev, { role: 'assistant', text: res.data.reply }])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text:
            lang === 'hi'
              ? 'माफ करें, सर्वर से संपर्क नहीं हो पाया। कृपया पुनः प्रयास करें।'
              : lang === 'mr'
              ? 'माफ करा, सर्व्हरशी संपर्क होऊ शकला नाही. कृपया पुन्हा प्रयत्न करा.'
              : 'Sorry, I could not connect to the server. Please try again.',
        },
      ])
    } finally {
      setLoading(false)
      textareaRef.current?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const resetChat = () => {
    setMessages([{ role: 'assistant', text: welcomeText }])
    setInput('')
    isNearBottomRef.current = true
  }

  const showSuggestions = messages.length === 1

  return (
    <div className="h-[calc(100dvh-68px)] bg-gradient-to-b from-[#F1F8E9] to-white overflow-hidden">
      <div className="max-w-3xl w-full mx-auto px-4 py-4 flex flex-col h-full">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2E7D32] flex items-center justify-center shadow-md">
              <Sprout size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#1F2937]">Krishi Mitra</h1>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#4CAF50] animate-pulse" />
                <span className="text-xs text-gray-400">
                  {lang === 'hi' ? 'एआई कृषि सहायक' : lang === 'mr' ? 'एआय शेती सहाय्यक' : 'AI Farming Assistant'}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={resetChat}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#2E7D32] px-3 py-1.5 rounded-lg hover:bg-[#E8F5E9] transition-all duration-200"
          >
            <RotateCcw size={13} /> {lang === 'hi' ? 'नई चैट' : lang === 'mr' ? 'नवीन संभाषण' : 'New Chat'}
          </button>
        </div>

        {/* Messages */}
        <div 
          ref={messagesContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto rounded-2xl bg-white border border-gray-100 shadow-sm p-4 flex flex-col gap-3"
        >
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-[#E8F5E9] flex items-center justify-center shrink-0 mt-1">
                    <Sprout size={14} className="text-[#2E7D32]" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-[#2E7D32] text-white rounded-br-none'
                      : 'bg-[#F9FBF9] text-[#1F2937] rounded-bl-none border border-gray-100'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-[#2E7D32] flex items-center justify-center shrink-0 mt-1">
                    <User size={14} className="text-white" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-2.5 justify-start"
            >
              <div className="w-7 h-7 rounded-full bg-[#E8F5E9] flex items-center justify-center shrink-0">
                <Sprout size={14} className="text-[#2E7D32]" />
              </div>
              <div className="bg-[#F9FBF9] border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1.5">
                <Loader2 size={14} className="text-[#2E7D32] animate-spin" />
                <span className="text-sm text-gray-400">
                  {lang === 'hi' ? 'कृषि मित्र सोच रहा है...' : lang === 'mr' ? 'कृषी मित्र विचार करत आहे...' : 'Krishi Mitra is thinking...'}
                </span>
              </div>
            </motion.div>
          )}

          {/* Suggestion chips */}
          {showSuggestions && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-2"
            >
              <p className="text-xs text-gray-400 mb-2 ml-9">
                {lang === 'hi' ? 'पूछ कर देखें:' : lang === 'mr' ? 'विचारून पहा:' : 'Try asking:'}
              </p>
              <div className="flex flex-wrap gap-2 ml-9">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-xs px-3 py-1.5 rounded-full border border-[#A5D6A7] text-[#2E7D32] bg-[#E8F5E9] hover:bg-[#C8E6C9] transition-colors duration-200"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Input */}
        <div className="mt-3 flex gap-2 items-end">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              lang === 'hi'
                ? 'फसल, रोग, मौसम, योजनाओं के बारे में पूछें...'
                : lang === 'mr'
                ? 'पिके, रोग, हवामान, योजनांबद्दल विचारा...'
                : 'Ask about crops, diseases, weather, schemes...'
            }
            className="flex-1 resize-none border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent shadow-sm"
            style={{ maxHeight: 120 }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            className="bg-[#2E7D32] hover:bg-[#1B5E20] disabled:opacity-40 disabled:cursor-not-allowed text-white p-3 rounded-xl shadow-md transition-colors duration-200"
          >
            <Send size={18} />
          </motion.button>
        </div>
        <p className="text-center text-[10px] text-gray-400 mt-2">
          {lang === 'hi'
            ? 'कृषि मित्र से त्रुटियां हो सकती हैं। महत्वपूर्ण सलाह अपने स्थानीय केवीके (KVK) से सत्यापित करें।'
            : lang === 'mr'
            ? 'कृषी मित्राकडून त्रुटी होऊ शकतात. महत्त्वाच्या सल्ल्याची स्थानिक कृषी विज्ञान केंद्राकडून खात्री करा.'
            : 'Krishi Mitra can make mistakes. Verify important advice with your local KVK.'}
        </p>
      </div>
    </div>
  )
}
