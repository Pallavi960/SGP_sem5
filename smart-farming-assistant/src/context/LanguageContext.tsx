import { createContext, useContext, useState, type ReactNode } from 'react'

export type LangCode = 'en' | 'hi' | 'mr'

export interface LanguageContextType {
  lang: LangCode
  setLang: (lang: LangCode) => void
}

const STORAGE_KEY = 'smartfarm_language'

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'hi' || saved === 'mr') return saved
    return 'en'
  })

  const setLang = (newLang: LangCode) => {
    setLangState(newLang)
    localStorage.setItem(STORAGE_KEY, newLang)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
