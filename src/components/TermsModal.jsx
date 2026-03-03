import React, { useEffect, useState } from 'react'
import { X, Mail } from 'lucide-react'
import { useLanguage } from '../store/LanguageContext'
export default function TermsModal({ isOpen, onClose }) {
    const { t } = useLanguage()
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) {
            window.addEventListener('keydown', handleEsc)
            document.body.style.overflow = 'hidden'
        }
        return () => {
            window.removeEventListener('keydown', handleEsc)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        })
    }
    if (!isOpen) return null
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            animation: 'fadeIn 0.4s ease-out'
        }}
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                onMouseMove={handleMouseMove}
                style={{
                    background: 'var(--color-modal-bg)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    width: 'min(90%, 480px)', 
                    maxWidth: '480px',
                    padding: '3rem 1.5rem', 
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
                    position: 'relative',
                    color: 'var(--color-text)',
                    animation: 'elasticScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    overflow: 'hidden',
                    border: '1px solid rgba(196, 216, 46, 0.3)'
                }}
            >
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(196, 216, 46, 0.15), transparent 40%)`,
                    pointerEvents: 'none',
                    transition: 'opacity 0.3s'
                }} />
                <button
                    onClick={onClose}
                    className="close-btn"
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'rgba(255, 255, 255, 0.5)',
                        border: '1px solid rgba(0,0,0,0.1)',
                        borderRadius: '50%',
                        width: '44px',
                        height: '44px',
                        color: '#1A1A1A',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        zIndex: 10
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'rotate(90deg) scale(1.1)'
                        e.currentTarget.style.boxShadow = '0 0 15px rgba(196, 216, 46, 0.6)'
                        e.currentTarget.style.borderColor = '#C4D82E'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'rotate(0deg) scale(1)'
                        e.currentTarget.style.boxShadow = 'none'
                        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'
                    }}
                >
                    <X size={18} />
                </button>
                <div style={{ position: 'relative', zIndex: 5, textAlign: 'center' }}>
                    <h2 style={{
                        fontFamily: 'var(--font-title)',
                        fontSize: '1.8rem',
                        fontWeight: '800',
                        color: 'var(--color-text)',
                        marginBottom: '1.5rem',
                        letterSpacing: '-0.02em',
                        background: 'linear-gradient(45deg, var(--color-text), #4a4a4a)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        {t.footer.terms_modal.title}
                    </h2>
                    <p style={{
                        fontSize: '1.05rem',
                        lineHeight: '1.7',
                        color: '#444',
                        marginBottom: '2.5rem',
                        fontFamily: 'var(--font-body)',
                        fontWeight: '400'
                    }}>
                        {t.footer.terms_modal.body}
                    </p>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                        <span style={{
                            fontSize: '0.9rem',
                            color: '#888',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            {t.footer.terms_modal.contact_intro}
                        </span>
                        <a
                            href={`mailto:${t.footer.terms_modal.contact_email}`}
                            style={{
                                color: '#1A1A1A',
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                fontWeight: '700',
                                fontSize: '1.1rem',
                                padding: '0.5rem 1.2rem',
                                borderRadius: '50px',
                                background: 'rgba(196, 216, 46, 0.1)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#C4D82E'
                                e.currentTarget.style.transform = 'translateY(-2px)'
                                e.currentTarget.style.boxShadow = '0 5px 15px rgba(196, 216, 46, 0.3)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(196, 216, 46, 0.1)'
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.boxShadow = 'none'
                            }}
                        >
                            <Mail size={18} />
                            {t.footer.terms_modal.contact_email}
                        </a>
                    </div>
                </div>
                <style>{`
                    @keyframes fadeIn {
                        from { opacity: 0; backdrop-filter: blur(0px); }
                        to { opacity: 1; backdrop-filter: blur(8px); }
                    }
                    @keyframes elasticScale {
                        0% { transform: scale(0.8); opacity: 0; }
                        100% { transform: scale(1); opacity: 1; }
                    }
                `}</style>
            </div>
        </div>
    )
}
