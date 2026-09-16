import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sprout, User, Loader2, RotateCcw } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  text: string
}

const WELCOME: Message = {
  role: 'assistant',
  text: "Namaste! 🌱 I'm Krishi Mitra, your AI farming assistant.\n\nAsk me anything about crops, diseases, soil, weather, government schemes, or mandi prices — in Hindi, Marathi, or English.",
}

const SUGGESTIONS = [
  'Which crop should I grow this Kharif season?',
  'My tomato leaves have yellow spots. What to do?',
  'What is PM-KISAN scheme?',
  'How much water does wheat need?',
]

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const isNearBottomRef = useRef(true)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

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
    isNearBottomRef.current = true // Force auto-scroll on new user message

    // Build history excluding the welcome message
    const history = updatedMessages
      .slice(1, -1) // exclude welcome + current message
      .map((m) => ({ role: m.role, text: m.text }))

    try {
      const res = await axios.post('http://localhost:8000/api/ai/chat', {
        message: trimmed,
        history,
      })
      setMessages((prev) => [...prev, { role: 'assistant', text: res.data.reply }])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: 'Sorry, I could not connect to the server. Please try again.' },
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
    setMessages([WELCOME])
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
                <span className="text-xs text-gray-400">AI Farming Assistant</span>
              </div>
            </div>
          </div>
          <button
            onClick={resetChat}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#2E7D32] px-3 py-1.5 rounded-lg hover:bg-[#E8F5E9] transition-all duration-200"
          >
            <RotateCcw size={13} /> New Chat
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
                <span className="text-sm text-gray-400">Krishi Mitra is thinking...</span>
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
              <p className="text-xs text-gray-400 mb-2 ml-9">Try asking:</p>
              <div className="flex flex-wrap gap-2 ml-9">
                {SUGGESTIONS.map((s) => (
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
            placeholder="Ask about crops, diseases, weather, schemes..."
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
        <p className="text-center text-[10px] text-gray-300 mt-2">
          Krishi Mitra can make mistakes. Verify important advice with your local KVK.
        </p>
      </div>
    </div>
  )
}
