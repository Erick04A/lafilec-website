import React, { createContext, useContext, useState } from 'react'
import { translations } from '../i18n/translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState('es') // Default to Spanish
    const [isLoading, setIsLoading] = useState(false)

    const t = translations[lang]

    const switchLang = (newLang) => {
        if (translations[newLang] && newLang !== lang) {
            setIsLoading(true)
            setTimeout(() => {
                setLang(newLang)
                setIsLoading(false)
            }, 600) // 0.6s loading simulation
        }
    }

    return (
        <LanguageContext.Provider value={{ lang, switchLang, t, isLoading }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}
