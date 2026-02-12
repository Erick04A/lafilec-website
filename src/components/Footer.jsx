import React, { useState, useEffect, useRef } from 'react'
import { Mail, Instagram, Phone, MapPin } from 'lucide-react'
import { useLanguage } from '../store/LanguageContext'

import TermsModal from './TermsModal'

export default function Footer() {
    const { t } = useLanguage()
    const [hoveredLink, setHoveredLink] = useState(null)
    const [logoGroupHovered, setLogoGroupHovered] = useState(false) // Unified state
    const [pulseIntensity, setPulseIntensity] = useState(6)
    const [isTermsOpen, setIsTermsOpen] = useState(false)
    const animationRef = useRef(null)

    useEffect(() => {
        let time = 0
        const animate = () => {
            time += 0.02
            const basePulse = 6 + Math.sin(time) * 2
            setPulseIntensity(logoGroupHovered ? 16 : basePulse)
            animationRef.current = requestAnimationFrame(animate)
        }
        animate()
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current)
        }
    }, [logoGroupHovered])

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
        {
            label: t.footer.legal_repertoire,
            href: 'https://lafilec.github.io/Temas/',
            action: null
        },
        {
            label: t.footer.legal_terms,
            href: '#',
            action: () => setIsTermsOpen(true)
        }
    ]

    const linkStyle = (index) => ({
        color: hoveredLink === index ? '#C4D82E' : '#FFFFFF', // Pure White default, Neon hover
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
                background: '#2C2C2C', // Semi-Dark Premium Charcoal
                color: '#FFFFFF', // Pure White text base
                padding: '5rem 3rem 3rem',
                position: 'relative',
                borderTop: '1px solid rgba(255, 255, 255, 0.2)' // Clean White Divider (0.2 opacity)
            }}
        >
            <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />

            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr 1fr' : '1fr',
                gap: '4rem',
                marginBottom: '4rem'
            }}>

                {/* Unified Logo Group Container */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        cursor: 'pointer',
                        transition: 'all 0.4s ease'
                    }}
                    onMouseEnter={() => setLogoGroupHovered(true)}
                    onMouseLeave={() => setLogoGroupHovered(false)}
                >
                    <div
                        style={{
                            transition: 'transform 0.4s ease',
                            transform: logoGroupHovered ? 'scale(1.05)' : 'scale(1)',
                            marginLeft: '-10px',
                            filter: logoGroupHovered ? 'drop-shadow(0 0 15px rgba(196, 216, 46, 0.4))' : 'none' // Shared glow on container hover
                        }}
                    >
                        <img
                            src={`${import.meta.env.BASE_URL}logo.png`}
                            alt="LA FIL"
                            style={{
                                height: '90px',
                                width: 'auto',
                                marginBottom: '1.0rem', // Reduced gap for tighter lockup
                                filter: `drop-shadow(0 0 ${pulseIntensity}px rgba(196, 216, 46, 0.6))`,
                                transition: 'filter 0.3s ease'
                            }}
                        />
                    </div>
                    <p
                        style={{
                            fontFamily: '"La Belle Aurore", cursive', // Signature/Annotation style
                            fontSize: '1.5rem', // Larger for the thin signature look
                            fontWeight: '400', // Light weight as requested
                            letterSpacing: logoGroupHovered ? '0.1em' : '0.05em', // Tighter for signature feel
                            color: 'var(--color-neon-green)', // Neon Green Vibrante
                            opacity: logoGroupHovered ? 1 : 0.9,
                            marginTop: '0.2rem',
                            textTransform: 'none',
                            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            textShadow: logoGroupHovered ? '0 0 12px rgba(196, 216, 46, 0.8)' : 'none',
                            filter: logoGroupHovered ? 'brightness(1.2)' : 'brightness(1)',
                            cursor: 'default',
                            transform: 'translateX(-35px) rotate(-4deg)',
                            userSelect: 'none' // Protected
                        }}>
                        {t.footer.motto}
                    </p>
                </div>


                <div>
                    <h3 style={{
                        fontFamily: 'var(--font-title)',
                        fontSize: '1rem',
                        fontWeight: '700',
                        marginBottom: '1.5rem',
                        color: '#C4D82E', // Neon Green Title (Original Identity)
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em'
                    }}>
                        {t.footer.connect}
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


                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            color: '#FFFFFF', // White Icon Text
                            marginTop: '0.5rem',
                            fontSize: '0.9rem'
                        }}>
                            <MapPin size={16} />
                            <span>{t.footer.location}</span>
                        </div>
                    </div>
                </div>


                <div>
                    <h3 style={{
                        fontFamily: 'var(--font-title)',
                        fontSize: '1rem',
                        fontWeight: '700',
                        marginBottom: '1.5rem',
                        color: '#C4D82E', // Neon Green Title (Original Identity)
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em'
                    }}>
                        {t.footer.explore}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {legalLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                target={link.href === '#' ? undefined : "_self"}
                                onClick={(e) => {
                                    if (link.action) {
                                        e.preventDefault()
                                        link.action()
                                    }
                                }}
                                style={{
                                    color: '#FFFFFF', // Pure White links
                                    textDecoration: 'none',
                                    fontSize: '0.95rem',
                                    transition: 'color 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => e.target.style.color = '#C4D82E'}
                                onMouseLeave={(e) => e.target.style.color = '#FFFFFF'}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>


            {/* Neon Divider Line */}
            <div style={{
                height: '1px',
                width: '100%',
                background: 'rgba(46, 91, 255, 0.4)', // Solid but translucent core
                boxShadow: '0 0 8px rgba(0, 102, 255, 0.6)', // Electric blue glow
                border: 'none',
                marginBottom: '2rem',
                marginTop: '0rem'
            }} />

            {/* Copyright Text */}
            <div style={{
                textAlign: 'center',
                fontSize: '0.85rem',
                color: '#FFFFFF',
                letterSpacing: '0.05em',
                opacity: 0.8
            }}>
                <span>© 2026 LA FIL. {t.footer.rights}</span>
            </div>
        </footer >
    )
}
