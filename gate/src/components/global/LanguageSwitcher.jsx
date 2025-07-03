'use client'// components/LanguageSwitcher.js
import { useTranslation } from '@/hooks/useTranslation'

export default function LanguageSwitcher() {
  const { language, changeLanguage } = useTranslation()
  
  console.log('Current language in switcher:', language)
  
  return (
    <div style={{ display: 'flex', gap: '10px', padding: '10px' }}>
      <button 
        onClick={() => {
          console.log('Clicked English button')
          changeLanguage('en')
        }}
        style={{
          padding: '8px 16px',
          backgroundColor: language === 'en' ? '#007bff' : '#f8f9fa',
          color: language === 'en' ? 'white' : '#333',
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        English
      </button>
      <button 
        onClick={() => {
          console.log('Clicked Portuguese button')
          changeLanguage('pt')
        }}
        style={{
          padding: '8px 16px',
          backgroundColor: language === 'pt' ? '#007bff' : '#f8f9fa',
          color: language === 'pt' ? 'white' : '#333',
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Português
      </button>
      <div style={{ marginLeft: '10px', fontSize: '12px', color: '#666' }}>
        Current: {language}
      </div>
    </div>
  )
}