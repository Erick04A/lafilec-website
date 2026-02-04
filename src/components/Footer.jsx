import React, { useState, useEffect, useRef } from 'react'
import { Mail, Instagram, Phone, MapPin } from 'lucide-react'
import { useLanguage } from '../store/LanguageContext'

export default function Footer() {
    const { t } = useLanguage()
    const [hoveredLink, setHoveredLink] = useState(null)
    const [logoHovered, setLogoHovered] = useState(false)
    const [pulseIntensity, setPulseIntensity] = useState(6)
    const animationRef = useRef(null)

    useEffect(() => {
        let time = 0
        const animate = () => {
            time += 0.02
            const basePulse = 6 + Math.sin(time) * 2
            setPulseIntensity(logoHovered ? 16 : basePulse)
            animationRef.current = requestAnimationFrame(animate)
        }
        animate()
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current)
        }
    }, [logoHovered])

    const socialLinks = [
        {
            icon: <Instagram size={18} />,
            label: '@lafil.ec',
            href: 'https://www.instagram.com/lafil.ec?igsh=MTc1MzY4MjdsYXZhYg%3D%3D',
            external: true
        },
        {
            icon: <Mail size={18} />,
            label: 'lafilec01@gmail.com',
            href: 'mailto:lafilec01@gmail.com',
            external: false
        },
        {
            icon: <Phone size={18} />,
            label: '+593 998770378',
            href: 'https://wa.me/593998770378',
            external: true
        }
    ]

    const legalLinks = [
        { label: 'Repertorio', href: 'https://lafilec.github.io/Temas/' },
        { label: 'Términos y Condiciones', href: 'https://lafilec.github.io/T-rminos-y-Condiciones-de-Uso/' }
    ]

    const linkStyle = (index) => ({
        color: hoveredLink === index ? '#C4D82E' : '#ccc',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontSize: '0.95rem',
        transition: 'all 0.3s ease',
        position: 'relative',
        paddingBottom: '0.25rem',
        filter: hoveredLink === index ? 'drop-shadow(0 0 6px rgba(196, 216, 46, 0.8))' : 'none'
    })

    return (
        <footer
            id="contact"
            style={{
                background: 'linear-gradient(to bottom, rgba(26, 26, 26, 0.95), #1A1A1A)',
                color: '#fff',
                padding: '5rem 3rem 3rem',
                position: 'relative'
            }}
        >
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr 1fr' : '1fr',
                gap: '4rem',
                marginBottom: '4rem'
            }}>
                {/* Brand Block */}
                <div>
                    <div
                        onMouseEnter={() => setLogoHovered(true)}
                        onMouseLeave={() => setLogoHovered(false)}
                        style={{
                            cursor: 'pointer',
                            transition: 'transform 0.3s ease',
                            transform: logoHovered ? 'scale(1.05)' : 'scale(1)'
                        }}
                    >
                        <img
                            src={`${import.meta.env.BASE_URL}logo.png`}
                            alt="LA FIL"
                            style={{
                                height: '90px',
                                width: 'auto',
                                marginBottom: '1.5rem',
                                filter: `drop-shadow(0 0 ${pulseIntensity}px rgba(196, 216, 46, 0.6))`,
                                transition: 'filter 0.3s ease'
                            }}
                        />
                    </div>
                    <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '1rem',
                        fontWeight: '200',
                        letterSpacing: '0.2em',
                        color: '#999',
                        marginTop: '1rem',
                        textTransform: 'uppercase'
                    }}>
                        Vive la música
                    </p>
                </div>

                {/* Conecta */}
                <div>
                    <h3 style={{
                        fontFamily: 'var(--font-title)',
                        fontSize: '1rem',
                        fontWeight: '700',
                        marginBottom: '1.5rem',
                        color: '#C4D82E',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em'
                    }}>
                        Conecta
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {socialLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                target={link.external ? "_blank" : "_self"}
                                rel={link.external ? "noopener noreferrer" : undefined}
                                style={linkStyle(index)}
                                onMouseEnter={() => setHoveredLink(index)}
                                onMouseLeave={() => setHoveredLink(null)}
                            >
                                {link.icon}
                                <span>{link.label}</span>
                            </a>
                        ))}

                        {/* Location */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            color: '#999',
                            marginTop: '0.5rem',
                            fontSize: '0.9rem'
                        }}>
                            <MapPin size={16} />
                            <span>Quito - Ecuador</span>
                        </div>
                    </div>
                </div>

                {/* Explora */}
                <div>
                    <h3 style={{
                        fontFamily: 'var(--font-title)',
                        fontSize: '1rem',
                        fontWeight: '700',
                        marginBottom: '1.5rem',
                        color: '#C4D82E',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em'
                    }}>
                        Explora
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {legalLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                target="_self"
                                style={{
                                    color: '#ccc',
                                    textDecoration: 'none',
                                    fontSize: '0.95rem',
                                    transition: 'color 0.3s ease'
                                }}
                                onMouseEnter={(e) => e.target.style.color = '#888'}
                                onMouseLeave={(e) => e.target.style.color = '#ccc'}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Copyright Only */}
            <div style={{
                borderTop: '1px solid rgba(196, 216, 46, 0.2)',
                paddingTop: '2rem',
                textAlign: 'center',
                fontSize: '0.85rem',
                color: '#666',
                letterSpacing: '0.05em'
            }}>
                © 2026 LA FIL. Todos los derechos reservados.
            </div>
        </footer>
    )
}
