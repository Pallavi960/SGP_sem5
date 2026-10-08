import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bot,
  Send,
  X,
  RotateCcw,
  User,
  Loader2,
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { t, tArr } from '../lib/i18n'

interface Message {
  role: 'user' | 'assistant'
  text: string
}

export default function FloatingAIAssistant() {
  const { lang } = useLanguage()

  // Derive welcome message from current language
  const welcomeMsg = (): Message => ({
    role: 'assistant',
    text: t(lang, 'ai_welcome'),
  })

  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([welcomeMsg()])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // When language changes, reset chat so welcome message updates
  const prevLangRef = useRef(lang)
  useEffect(() => {
    if (prevLangRef.current !== lang) {
      prevLangRef.current = lang
      setMessages([welcomeMsg()])
      setInput('')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  // Auto scroll to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, loading, isOpen])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 150)
    }
  }, [isOpen])

  const sendMessage = async (textToSend?: string) => {
    const query = (textToSend ?? input).trim()
    if (!query || loading) return

    const userMsg: Message = { role: 'user', text: query }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    // Build history excluding the welcome message
    const history = updatedMessages
      .slice(1, -1)
      .map((m) => ({ role: m.role, text: m.text }))

    // Inject language instruction as a system-level prefix in the message
    const langInstruction = t(lang, 'ai_system_lang_instruction')
    const messageWithLang = `[${langInstruction}]\n\n${query}`

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'}/api/ai/chat`,
        {
          message: messageWithLang,
          history,
        }
      )
      setMessages((prev) => [...prev, { role: 'assistant', text: res.data.reply }])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text:
            lang === 'hi'
              ? 'माफ करें, सर्वर से जुड़ नहीं पाए। कृपया बाद में पुनः प्रयास करें।'
              : lang === 'mr'
              ? 'माफ करा, सर्व्हरशी संपर्क होऊ शकला नाही. कृपया पुन्हा प्रयत्न करा.'
              : 'Sorry, I could not connect to the assistant server. Please check your backend connection and try again.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      sendMessage()
    }
  }

  const resetChat = () => {
    setMessages([welcomeMsg()])
    setInput('')
  }

  const suggestions = tArr(lang, 'ai_suggestions')

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {/* ── Chat Widget Window ────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed sm:absolute bottom-20 right-4 left-4 sm:left-auto sm:right-0 w-auto sm:w-[380px] h-[520px] max-h-[calc(100vh-110px)] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden z-50"
            style={{
              boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)',
            }}
          >
            {/* Header */}
            <div className="bg-[#087f3e] text-white p-3.5 px-4 flex items-center justify-between shrink-0 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/15 border border-white/20 flex items-center justify-center">
                  <Bot size={17} className="text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 leading-none">
                    <h3 className="text-sm font-bold text-white leading-none">Krishi Mitra</h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  </div>
                  <span className="text-[11px] text-white/80 font-medium leading-none block mt-1">
                    AI Farming Assistant
                  </span>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={resetChat}
                  className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  title={t(lang, 'ai_new_chat')}
                  aria-label={t(lang, 'ai_new_chat')}
                >
                  <RotateCcw size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  title="Close Krishi Mitra"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#fbfdfb]">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-[#E8F5E9] border border-[#c8e6c9] flex items-center justify-center shrink-0 mt-0.5">
                      <Bot size={13} className="text-[#087f3e]" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-[#087f3e] text-white rounded-br-xs shadow-xs font-medium'
                        : 'bg-white text-gray-800 rounded-bl-xs border border-gray-100 shadow-xs'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-[#087f3e] flex items-center justify-center shrink-0 mt-0.5 text-white">
                      <User size={12} />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="flex gap-2.5 justify-start items-center">
                  <div className="w-6 h-6 rounded-full bg-[#E8F5E9] border border-[#c8e6c9] flex items-center justify-center shrink-0">
                    <Bot size={13} className="text-[#087f3e]" />
                  </div>
                  <div className="bg-white border border-gray-100 px-3.5 py-2 rounded-2xl rounded-bl-xs shadow-xs flex items-center gap-1.5">
                    <Loader2 size={13} className="text-[#087f3e] animate-spin" />
                    <span className="text-xs text-gray-400 font-medium">
                      {t(lang, 'ai_typing')}
                    </span>
                  </div>
                </div>
              )}

              {/* Quick suggestion chips (shown when on initial welcome message) */}
              {messages.length === 1 && !loading && (
                <div className="pt-2">
                  <p className="text-[11px] font-semibold text-gray-400 mb-2 ml-8">
                    {lang === 'hi' ? 'सुझाए गए प्रश्न:' : lang === 'mr' ? 'सुचवलेले प्रश्न:' : 'Suggested Questions:'}
                  </p>
                  <div className="flex flex-col gap-1.5 ml-8">
                    {suggestions.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => sendMessage(s)}
                        className="text-left text-xs px-3 py-1.5 rounded-xl border border-[#c8e6c9] bg-white hover:bg-[#f0faf2] text-[#087f3e] font-medium transition-colors duration-150 shadow-2xs"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Box */}
            <div className="p-3 bg-white border-t border-gray-100">
              <div className="flex items-center gap-1.5 bg-[#f5f7f5] border border-gray-200 rounded-xl px-3 py-1.5 focus-within:border-[#087f3e] focus-within:ring-1 focus-within:ring-[#087f3e] transition-all">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t(lang, 'ai_input_placeholder')}
                  className="w-full bg-transparent text-xs text-gray-800 placeholder-gray-400 focus:outline-none py-1"
                />
                <button
                  type="button"
                  onClick={() => sendMessage()}
                  disabled={loading || !input.trim()}
                  className="w-7 h-7 rounded-lg bg-[#087f3e] hover:bg-[#066832] disabled:opacity-40 disabled:hover:bg-[#087f3e] text-white flex items-center justify-center shrink-0 transition-colors"
                  title="Send message"
                  aria-label="Send"
                >
                  <Send size={13} />
                </button>
              </div>
              <p className="text-center text-[10px] text-gray-400 mt-1.5 font-medium">
                {t(lang, 'ai_disclaimer')}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Launcher Button ──────────────────────────────── */}
      <div className="relative flex items-center justify-end">
        {/* Hover Tooltip */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.15 }}
              className="absolute right-14 bg-gray-900 text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
            >
              {t(lang, 'ai_tooltip')}
              <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen((prev) => !prev)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          aria-label="Ask Krishi Mitra AI Assistant"
          className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 cursor-pointer ${
            isOpen
              ? 'bg-gray-800 text-white shadow-md'
              : 'bg-[#087f3e] text-white shadow-emerald-700/30 hover:shadow-xl hover:bg-[#066832]'
          }`}
          style={{
            boxShadow: isOpen
              ? '0 4px 12px rgba(0,0,0,0.2)'
              : '0 8px 20px rgba(8, 127, 62, 0.35)',
          }}
        >
          {isOpen ? (
            <X size={20} />
          ) : (
            <>
              <Bot size={22} className="text-white" />
              {/* Subtle online badge */}
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />
            </>
          )}
        </motion.button>
      </div>
    </div>
  )
}
