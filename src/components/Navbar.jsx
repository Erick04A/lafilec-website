import React, { useState } from 'react'
import { useLanguage } from '../store/LanguageContext'
import { Menu, X } from 'lucide-react'
import ResonantSeal from './NavbarLogo'

export default function Navbar() {
  const { t, lang, switchLang } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


  const links = [
    { key: 'curations', label: t.nav?.curations || 'Eventos' },
    { key: 'about', label: t.nav?.about || 'Nosotros' },
    { key: 'fuel', label: t.nav?.fuel || 'Apoyo' },
    { key: 'contact', label: t.nav?.contact || 'Repertorio', url: 'https://lafilec.github.io/Temas/', external: true }
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
              <a
                href={link.external ? link.url : `#${link.key}`}
                style={{
                  textDecoration: 'none',
                  color: 'var(--color-text)',
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>


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


      {mobileMenuOpen && window.innerWidth <= 768 && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: 0,
          width: '100%',
          height: '100vh',
          background: 'rgba(18, 18, 18, 0.95)',
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
          padding: '6rem 2rem 2rem',
          zIndex: 98,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <ul style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            width: '100%',
            maxWidth: '400px',
            alignItems: 'center'
          }}>
            {links.map((link, index) => (
              <li key={link.key} style={{ width: '100%', textAlign: 'center' }}>
                <a
                  href={link.external ? link.url : `#${link.key}`}
                  onClick={handleLinkClick}
                  style={{
                    textDecoration: 'none',
                    color: '#FFF', // White text for dark bg
                    fontWeight: '600',
                    fontSize: '1.5rem', // Larger for mobile
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    display: 'block',
                    padding: '0.5rem 0',
                    opacity: 0,
                    animation: `fadeInUp 0.4s ease forwards ${index * 0.1}s`
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>


          <div style={{
            display: 'flex',
            gap: '1.5rem',
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            width: '100%',
            maxWidth: '300px',
            justifyContent: 'center',
            opacity: 0,
            animation: 'fadeInUp 0.4s ease forwards 0.5s'
          }}>
            {['es', 'en', 'fr'].map((l) => (
              <button
                key={l}
                onClick={() => {
                  switchLang(l)
                  setMobileMenuOpen(false)
                }}
                style={{
                  background: lang === l ? 'rgba(196, 216, 46, 0.2)' : 'transparent',
                  border: `1px solid ${lang === l ? '#C4D82E' : 'rgba(255,255,255,0.3)'}`,
                  color: lang === l ? '#C4D82E' : '#FFF',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  padding: '0.8rem 0',
                  width: '60px',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s'
                }}
              >
                {l}
              </button>
            ))}
          </div>

          <style>{`
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      )}
    </nav>
  )
}
