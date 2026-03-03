import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../store/LanguageContext'
import KineticClock from './KineticClock'
const Fireflies = () => {
    const fireflies = Array.from({ length: 44 });
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%', 
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: 0,
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
            perspective: 1000
        }}>
            {fireflies.map((_, i) => {
                const isMedium = Math.random() > 0.8; 
                const size = isMedium
                    ? Math.floor(Math.random() * 2) + 3 
                    : Math.floor(Math.random() * 2) + 1; 
                const baseOpacity = 0.6 + Math.random() * 0.4; 
                return (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: baseOpacity,
                            x: Math.random() * 100 + 'vw',
                            y: Math.random() * 100 + 'vh',
                            z: 0
                        }}
                        animate={{
                            x: [
                                (Math.random() * 100) + 'vw',
                                (Math.random() * 100) + 'vw',
                                (Math.random() * 100) + 'vw'
                            ],
                            y: [
                                (Math.random() * 100) + 'vh',
                                (Math.random() * 100) + 'vh',
                                (Math.random() * 100) + 'vh'
                            ],
                            z: [0, 0, 0]
                        }}
                        transition={{
                            duration: Math.random() * 40 + 90, 
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            position: 'absolute',
                            width: `${size}px`,
                            height: `${size}px`,
                            borderRadius: '50%',
                            background: '#D4FF00', 
                            boxShadow: '0 0 10px rgba(212, 255, 0, 0.4)', 
                            filter: 'drop-shadow(0 0 5px rgba(212, 255, 0, 0.95))', 
                            pointerEvents: 'none',
                            willChange: 'transform, opacity',
                            backfaceVisibility: 'hidden',
                            perspective: 1000
                        }}
                    />
                );
            })}
        </div>
    );
};
export default function Hero() {
    const { t } = useLanguage()
    const [isLoaded, setIsLoaded] = React.useState(false)
    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 400);
        return () => clearTimeout(timer);
    }, [])
    return (
        <section id="hero" style={{
            width: '100%',
            height: '90vh', 
            position: 'relative',
            background: 'var(--color-bg)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 2rem',
            transition: 'background-color 0.4s ease, color 0.4s ease',
            overflow: 'hidden'
        }}>
            {}
            <div className={`skeleton-reveal ${isLoaded ? 'skeleton-hidden' : ''}`} style={{ zIndex: 5 }}></div>
            <Fireflies />
            <div style={{
                zIndex: 10, 
                width: '100%',
                maxWidth: '1200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2rem'
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 150 }}
                    animate={{ opacity: 1, y: '5vh' }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 'clamp(2.52rem, 7.56vw, 7.56rem)',
                        width: '100%',
                        flexWrap: 'wrap',
                        flexDirection: window.innerWidth <= 768 ? 'column' : 'row'
                    }}
                >
                    <div style={{
                        maxWidth: 'none',
                        filter: 'drop-shadow(rgba(0, 0, 0, 0.5) 0px 4px 15px) drop-shadow(rgba(196, 216, 46, 0.3) 0px 0px 20px)',
                        transition: 'filter 0.3s'
                    }}>
                        <img
                            src={`${import.meta.env.BASE_URL}logo.png`}
                            alt="LA FIL Logo"
                            fetchPriority="high"
                            style={{
                                height: window.innerWidth <= 768 ? 'clamp(140px, 30vw, 220px)' : 'clamp(198px, 27.5vw, 308px)',
                                width: 'auto',
                                objectFit: 'contain'
                            }}
                        />
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1.1 }}
                        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transform: 'scale(1.1)'
                        }}
                    >
                        <KineticClock />
                    </motion.div>
                </motion.div>
                <motion.p
                    className="hero-mantra-text"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        maxWidth: 'none',
                        margin: window.innerWidth <= 768 ? '3.2rem auto -4rem' : '6.5rem auto -6rem',
                        fontSize: 'clamp(0.94rem, 1.25vw, 1.15rem)',
                        lineHeight: 1.2,
                        fontWeight: '400',
                        color: '#555555',
                        textAlign: 'center',
                        letterSpacing: '0.05em',
                        padding: '0 1rem',
                        transition: 'color 0.4s ease',
                        whiteSpace: window.innerWidth <= 768 ? 'normal' : 'nowrap',
                        width: '100%',
                        zIndex: 20
                    }}
                >
                    {t.hero.mantra}
                </motion.p>
            </div>
        </section>
    )
}
