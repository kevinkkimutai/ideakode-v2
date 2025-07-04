// context/TranslationContext.js
"use client"
import { createContext, useContext, useState, useEffect } from 'react'

// Import your JSON files directly
import enTranslations from '/locales/en.json'
import ptTranslations from '/locales/pt.json'

const translations = {
  en: enTranslations,
  pt: ptTranslations
}

const TranslationContext = createContext()

export function TranslationProvider({ children }) {
  const [language, setLanguage] = useState('en')
  
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language') || 'en'
      console.log('Loading saved language:', savedLang)
      setLanguage(savedLang)
    }
  }, [])
  
  const changeLanguage = (newLang) => {
    console.log('Changing language to:', newLang)
    setLanguage(newLang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLang)
    }
  }
  
  const t = (key) => {
    console.log('Getting translation for key:', key, 'in language:', language)
    const currentTranslations = translations[language] || translations.en
    
    // Handle nested keys like 'homepage.title.start'
    const keys = key.split('.')
    let value = currentTranslations
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        console.log('Key not found:', key)
        return key // Return the key if not found
      }
    }
    
    return value || key
  }
  
  return (
    <TranslationContext.Provider value={{ language, changeLanguage, t, loading: false }}>
      {children}
    </TranslationContext.Provider>
  )
}

export const useTranslation = () => {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}