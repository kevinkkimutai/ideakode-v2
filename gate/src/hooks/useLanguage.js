import { useState, useEffect } from 'react'

export function useLanguage() {
  const [language, setLanguage] = useState('en')
  
  useEffect(() => {
    // Check localStorage or cookies for saved preference
    const savedLang = localStorage.getItem('language') || 'en'
    setLanguage(savedLang)
  }, [])
  
  const changeLanguage = (newLang) => {
    setLanguage(newLang)
    localStorage.setItem('language', newLang)
  }
  
  return { language, changeLanguage }
}