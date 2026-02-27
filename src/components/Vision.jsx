import React, { useMemo, useState } from 'react'
import { useLanguage } from '../store/LanguageContext'
import { motion, AnimatePresence } from 'framer-motion'

// --- Official Manifesto Specs ---
const NEON_GREEN = '#D4FF00'
const MYSTIC_CREAM = '#fdfbf7'
const DARK_GOLD = '#B8860B'
const GRAPHITE = '#4A4A4A'

const HOUSES = [
    {
        id: "gryffindor",
        name: "GRYFFINDOR",
        color: "#740001",
        glow: "rgba(116, 0, 1, 0.4)",
        message: "Eres Gryffindor. Valor y corazón revelados."
    },
    {
        id: "hufflepuff",
        name: "HUFFLEPUFF",
        color: "#ecb939",
        glow: "rgba(236, 185, 57, 0.4)",
        message: "Eres Hufflepuff. Lealtad y paciencia encontradas."
    },
    {
        id: "ravenclaw",
        name: "RAVENCLAW",
        color: "#0e1a40",
        glow: "rgba(14, 26, 64, 0.4)",
        message: "Eres Ravenclaw. Sabiduría e intelecto florecen."
    },
    {
        id: "slytherin",
        name: "SLYTHERIN",
        color: "#1a472a",
        glow: "rgba(26, 71, 42, 0.4)",
        message: "Eres Slytherin. Ambición y astucia reveladas."
    }
]

const Vision = () => {
    const { t } = useLanguage()
    const [selectedHouse, setSelectedHouse] = useState(null)
    const [isSorting, setIsSorting] = useState(false)

    const manifestoLines = useMemo(() => t.about?.lines || [], [t.about?.lines])
    const manifestoTitle = useMemo(() => t.about?.title || 'Acerca de Nosotros', [t.about?.title])

    const handleSort = () => {
        setIsSorting(true)
        setTimeout(() => {
            const randomHouse = HOUSES[Math.floor(Math.random() * HOUSES.length)]
            setSelectedHouse(randomHouse)
            setIsSorting(false)
        }, 1500)
    }

    return (
        <section
            id="about"
            className="vision-section relative overflow-hidden bg-[#fdfbf7] w-full"
            style={{
                marginTop: '-1px',
                maxWidth: '100vw',
                padding: '2rem 2rem'
            }}
        >
            {/* HARMONY STYLE INJECTION (IMMUNE CENTERING) */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .vision-layout-lock {
                    display: flex !important;
                    flex-direction: row !important;
                    flex-wrap: nowrap !important;
                    align-items: center !important;
                    justify-content: center !important;
                    gap: 5.5rem !important; 
                    width: 100% !important;
                    max-width: 1200px !important;
                    margin: 0 auto !important;
                }
                .vision-column-mass {
                    width: 45% !important;
                    flex: 0 0 45% !important;
                    box-sizing: border-box !important;
                }
                .manifesto-centering-lock {
                    text-align: center !important; 
                    display: flex !important;
                    flex-direction: column !important;
                    align-items: center !important;
                    justify-content: center !important;
                }
                .closure-highlight {
                    position: relative;
                    display: inline-block;
                }
                .closure-highlight::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 100%;
                    height: 1px;
                    background: ${DARK_GOLD};
                    box-shadow: 0 0 10px #B8860B44; 
                    opacity: 0.8;
                }
                @media (max-width: 992px) {
                    .vision-layout-lock {
                        gap: 3rem !important;
                    }
                }
                @media (max-width: 768px) {
                    .vision-layout-lock {
                        flex-direction: column !important;
                        gap: 5rem !important;
                    }
                    .vision-column-mass {
                        width: 100% !important;
                        flex: 0 0 100% !important;
                    }
                }
            `}} />

            <div className="container relative z-20 mx-auto vision-layout-lock">

                {/* COLUMN 1: MANIFESTO (CENTERED HARMONY) */}
                <div className="vision-column-mass flex flex-col justify-center items-center">
                    <div className="max-w-[480px] manifesto-centering-lock">
                        <h3 className="font-bold mb-8" style={{ color: '#B8860B', fontSize: 'clamp(1rem, 1.8vw, 1.15rem)', letterSpacing: '0.05em' }}>
                            {manifestoTitle}
                        </h3>

                        <div className="flex flex-col gap-6 w-full items-center">
                            {manifestoLines.map((line, index) => {
                                const isLast = index === manifestoLines.length - 1;
                                return (
                                    <p
                                        key={index}
                                        className={`font-body ${isLast ? 'closure-highlight' : ''}`}
                                        style={{
                                            fontSize: 'clamp(1.0rem, 1.5vw, 1.125rem)',
                                            lineHeight: 3.45,
                                            fontWeight: isLast ? '500' : '400',
                                            letterSpacing: '0.01em',
                                            margin: 0,
                                            opacity: isLast ? 1 : 0.85,
                                            color: isLast ? '#B8860B' : '#4A4A4A'
                                        }}
                                    >
                                        {line}
                                    </p>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* COLUMN 2: SORTING HAT (SMOKE CALLIGRAPHY & CHROMATIC AURA) */}
                <div className="vision-column-mass flex flex-col items-center justify-center relative min-h-[380px]">
                    <motion.div
                        animate={{
                            background: selectedHouse
                                ? `radial-gradient(circle at center, ${selectedHouse.glow} 0%, transparent 85%)`
                                : `radial-gradient(circle at center, rgba(255, 191, 0, 0.08) 0%, transparent 70%)`,
                            opacity: selectedHouse ? 1 : 0.4
                        }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-x-0 bottom-0 top-1/2 z-0 pointer-events-none"
                    />

                    <div className="relative z-10 flex flex-col items-center w-full max-w-[350px]">
                        <motion.div
                            animate={{
                                y: [0, -12, 0],
                                transition: {
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }
                            }}
                            whileHover={{
                                rotate: -3,
                                scale: 1.02,
                                transition: { duration: 0.5 }
                            }}
                            className="relative w-full flex justify-center"
                        >
                            <motion.img
                                id="hat"
                                src="https://cdn2.hubspot.net/hubfs/678613/Projects/CodePen/Harry%20Potter%20Sorting%20Hat/Sorting%20Hat.png"
                                alt="Sorting Hat"
                                onClick={!selectedHouse && !isSorting ? handleSort : undefined}
                                animate={isSorting ? {
                                    x: [-3, 3, -3, 3, 0],
                                    rotate: [-1, 1, -1, 1, 0],
                                    scale: [1, 1.05, 1],
                                    filter: [
                                        "drop-shadow(0 20px 30px rgba(0,0,0,0.15)) drop-shadow(0 0 15px rgba(255,191,0,0.2))",
                                        "drop-shadow(0 25px 40px rgba(0,0,0,0.2)) drop-shadow(0 0 30px rgba(212,255,0,0.15))",
                                        "drop-shadow(0 20px 30px rgba(0,0,0,0.15)) drop-shadow(0 0 15px rgba(255,191,0,0.2))"
                                    ]
                                } : {
                                    filter: selectedHouse ? [
                                        `drop-shadow(0 20px 35px rgba(0,0,0,0.25)) drop-shadow(0 0 25px ${selectedHouse.glow})`,
                                        `drop-shadow(0 25px 40px rgba(0,0,0,0.3)) drop-shadow(0 0 45px ${selectedHouse.glow})`,
                                        `drop-shadow(0 20px 35px rgba(0,0,0,0.25)) drop-shadow(0 0 25px ${selectedHouse.glow})`
                                    ] : [
                                        "drop-shadow(0 15px 25px rgba(0,0,0,0.2)) drop-shadow(0 0 5px rgba(255,191,0,0.05))",
                                        "drop-shadow(0 20px 35px rgba(0,0,0,0.25)) drop-shadow(0 0 15px rgba(255,191,0,0.15))",
                                        "drop-shadow(0 15px 25px rgba(0,0,0,0.2)) drop-shadow(0 0 5px rgba(255,191,0,0.05))"
                                    ]
                                }}
                                transition={isSorting ? {
                                    duration: 0.8,
                                    repeat: Infinity
                                } : {
                                    filter: {
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                }}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    maxWidth: '280px',
                                    margin: 0,
                                    cursor: !selectedHouse && !isSorting ? 'pointer' : 'help',
                                    zIndex: 10
                                }}
                            />

                            <AnimatePresence>
                                {selectedHouse && (
                                    <motion.div
                                        initial={{ opacity: 0, filter: 'blur(20px)', y: 30, rotate: -8 }}
                                        animate={{
                                            opacity: [0, 0.8, 1],
                                            filter: 'blur(0px)',
                                            y: -20,
                                            rotate: -5,
                                            x: [0, 5, -5, 0]
                                        }}
                                        transition={{
                                            duration: 2.5,
                                            ease: "easeOut",
                                            x: { duration: 10, repeat: Infinity, ease: "easeInOut" }
                                        }}
                                        className="absolute top-1/4 z-30 flex flex-col items-center pointer-events-none"
                                    >
                                        <span
                                            className="font-mono text-[1.4rem] font-black tracking-[0.6em] mb-1"
                                            style={{
                                                color: selectedHouse.color,
                                                textShadow: `0 0 20px ${selectedHouse.glow}, 0 0 40px ${selectedHouse.glow}`,
                                                WebkitTextStroke: '0.5px rgba(255,255,255,0.1)'
                                            }}
                                        >
                                            {selectedHouse.name}
                                        </span>
                                        <p className="font-mono text-[0.45rem] text-[#666] leading-relaxed uppercase tracking-[0.4em] max-w-[200px] text-center italic opacity-80">
                                            {selectedHouse.message}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>

            </div>

            {/* Kinetic DNA (Fireflies) */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{
                            duration: 15 + Math.random() * 20,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 10
                        }}
                        style={{
                            position: 'absolute',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: '1px',
                            height: '1px',
                            backgroundColor: NEON_GREEN,
                            borderRadius: '50%',
                            boxShadow: `0 0 4px ${NEON_GREEN}`
                        }}
                    />
                ))}
            </div>
        </section>
    );
};

export default Vision;
