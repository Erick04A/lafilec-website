import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Sparkles, Float } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useLanguage } from '../store/LanguageContext'
import KineticClock from './KineticClock'

function BackgroundEffects() {
    return (
        <>
            <Sparkles count={100} scale={10} size={2} speed={0.4} opacity={0.5} color="#C4D82E" />
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
                {/* Subtle abstract glass shape could go here, but keeping it clean for now as requested */}
            </Float>
        </>
    )
}

export default function Hero() {
    const { t } = useLanguage()

    return (
        <section id="hero" style={{
            width: '100%',
            height: '100vh',
            position: 'relative',
            background: 'var(--color-bg)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 2rem'
        }}>
            {/* 3D Background Layer */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                <Canvas camera={{ position: [0, 0, 5] }}>
                    <BackgroundEffects />
                    <ambientLight intensity={1} />
                </Canvas>
            </div>

            {/* Content Layer */}
            <div style={{
                zIndex: 1,
                width: '100%',
                maxWidth: '1200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '3rem'
            }}>
                {/* Logo and Clock Container */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 'clamp(2rem, 6vw, 6rem)',
                        width: '100%',
                        flexWrap: 'wrap',
                        flexDirection: window.innerWidth <= 768 ? 'column' : 'row'
                    }}
                >
                    {/* Logo */}
                    <div style={{
                        filter: 'drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 20px rgba(196, 216, 46, 0.3))',
                        transition: 'filter 0.3s ease',
                        maxWidth: window.innerWidth <= 768 ? '280px' : 'none'
                    }}>
                        <img
                            src="/logo.png"
                            alt="LA FIL Logo"
                            style={{
                                height: window.innerWidth <= 768 ? 'clamp(140px, 30vw, 220px)' : 'clamp(180px, 25vw, 280px)',
                                width: 'auto',
                                objectFit: 'contain'
                            }}
                        />
                    </div>

                    {/* Kinetic Clock */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <KineticClock />
                    </motion.div>
                </motion.div>

                {/* Mantra Below */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    style={{
                        maxWidth: '700px',
                        margin: window.innerWidth <= 768 ? '2rem auto 0' : '0 auto',
                        fontSize: 'clamp(0.95rem, 2vw, 1.3rem)',
                        lineHeight: 1.6,
                        fontWeight: '400',
                        color: 'var(--color-text)',
                        textAlign: 'center',
                        letterSpacing: '0.01em',
                        padding: '0 1rem'
                    }}
                >
                    {t.hero.mantra}
                </motion.p>
            </div>
        </section>
    )
}
