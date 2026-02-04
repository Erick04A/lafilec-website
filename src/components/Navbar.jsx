import React, { useState } from 'react'
import { useLanguage } from '../store/LanguageContext'
import { Menu, X } from 'lucide-react'
import ResonantSeal from './NavbarLogo'

export default function Navbar() {
  const { t, lang, switchLang } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Dynamic links key access
  const links = [
    { key: 'curations', label: t.nav.curations },
    { key: 'about', label: t.nav.about },
    { key: 'fuel', label: t.nav.fuel },
    { key: 'contact', label: t.nav.contact }
  ]

  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      padding: '1.5rem 3rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 100,
      boxSizing: 'border-box',
      background: window.innerWidth <= 768 ? 'rgba(255, 254, 242, 0.95)' : 'transparent',
      backdropFilter: window.innerWidth <= 768 ? 'blur(10px)' : 'none'
    }}>
      <ResonantSeal />

      {/* Desktop Navigation */}
      <div style={{ display: window.innerWidth > 768 ? 'flex' : 'none', alignItems: 'center', gap: '3rem' }}>
        <ul style={{
          display: 'flex',
          gap: '2rem',
          listStyle: 'none',
          margin: 0,
          padding: 0
        }}>
          {links.map((link) => (
            <li key={link.key}>
              <a href={`#${link.key}`} style={{
                textDecoration: 'none',
                color: 'var(--color-text)',
                fontWeight: '600',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Language Selector */}
        <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 'bold' }}>
          {['es', 'en', 'fr'].map((l) => (
            <button
              key={l}
              onClick={() => switchLang(l)}
              style={{
                background: 'transparent',
                border: 'none',
                color: lang === l ? 'var(--color-primary)' : 'var(--color-text)',
                cursor: 'pointer',
                textTransform: 'uppercase',
                padding: '0 0.2rem',
                opacity: lang === l ? 1 : 0.5
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        style={{
          display: window.innerWidth <= 768 ? 'flex' : 'none',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '0.5rem',
          color: 'var(--color-text)'
        }}
      >
        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && window.innerWidth <= 768 && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: 0,
          width: '100%',
          background: 'rgba(255, 254, 242, 0.98)',
          backdropFilter: 'blur(10px)',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          zIndex: 99
        }}>
          <ul style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            {links.map((link) => (
              <li key={link.key}>
                <a
                  href={`#${link.key}`}
                  onClick={handleLinkClick}
                  style={{
                    textDecoration: 'none',
                    color: 'var(--color-text)',
                    fontWeight: '600',
                    fontSize: '1.1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    display: 'block',
                    padding: '0.5rem 0',
                    minHeight: '44px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Language Selector Mobile */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid #ddd'
          }}>
            {['es', 'en', 'fr'].map((l) => (
              <button
                key={l}
                onClick={() => {
                  switchLang(l)
                  setMobileMenuOpen(false)
                }}
                style={{
                  background: lang === l ? 'var(--color-primary)' : 'transparent',
                  border: '2px solid var(--color-primary)',
                  color: lang === l ? '#000' : 'var(--color-text)',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  padding: '0.75rem 1.5rem',
                  fontWeight: 'bold',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  minHeight: '44px',
                  minWidth: '60px'
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
