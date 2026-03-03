import React from 'react'
import { useNavigate } from 'react-router-dom'
import ResonantSeal from './NavbarLogo'
export default function NotFound() {
    const navigate = useNavigate()
    const handleGoHome = () => {
        navigate('/')
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #FFFEF2 0%, #F5F5DC 100%)',
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {}
            <div style={{
                position: 'absolute',
                top: '10%',
                left: '5%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(196, 216, 46, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(60px)',
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '15%',
                right: '10%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(88, 101, 242, 0.08) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(80px)',
                pointerEvents: 'none'
            }} />
            {}
            <div style={{
                maxWidth: '600px',
                textAlign: 'center',
                zIndex: 2,
                animation: 'fadeInUp 0.6s ease-out'
            }}>
                {}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '2rem',
                    transform: 'scale(1.5)'
                }}>
                    <ResonantSeal />
                </div>
                {}
                <h1 style={{
                    fontSize: 'clamp(4rem, 15vw, 8rem)',
                    fontWeight: '900',
                    fontFamily: 'var(--font-title)',
                    background: 'linear-gradient(135deg, #C4D82E 0%, #5865F2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '1rem',
                    letterSpacing: '-0.02em',
                    lineHeight: 1
                }}>
                    404
                </h1>
                {}
                <h2 style={{
                    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                    fontFamily: 'var(--font-title)',
                    color: '#1A1A1A',
                    marginBottom: '1rem',
                    fontWeight: '700'
                }}>
                    Parece que el ritmo se detuvo aquí...
                </h2>
                <p style={{
                    fontSize: '1.1rem',
                    color: '#666',
                    marginBottom: '3rem',
                    lineHeight: '1.6',
                    maxWidth: '450px',
                    margin: '0 auto 3rem'
                }}>
                    La página que buscas no existe o fue movida. Volvamos a la sinfonía principal.
                </p>
                {}
                <button
                    onClick={handleGoHome}
                    style={{
                        padding: '1rem 2.5rem',
                        fontSize: '1rem',
                        fontWeight: '700',
                        fontFamily: 'var(--font-title)',
                        color: '#1A1A1A',
                        background: '#C4D82E',
                        border: '2px solid #C4D82E',
                        borderRadius: '50px',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '0 0 20px rgba(196, 216, 46, 0.4), 0 4px 12px rgba(0, 0, 0, 0.1)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#AAE82E'
                        e.currentTarget.style.boxShadow = '0 0 30px rgba(170, 255, 0, 0.6), 0 6px 16px rgba(0, 0, 0, 0.15)'
                        e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#C4D82E'
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(196, 216, 46, 0.4), 0 4px 12px rgba(0, 0, 0, 0.1)'
                        e.currentTarget.style.transform = 'translateY(0) scale(1)'
                    }}
                    onMouseDown={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(0.98)'
                    }}
                    onMouseUp={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)'
                    }}
                >
                    ← Volver al Inicio
                </button>
            </div>
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    )
}
