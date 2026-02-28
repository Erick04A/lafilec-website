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
        gradient: "linear-gradient(135deg, #FFD700 0%, #d32f2f 30%, #740001 70%, #FF8C00 100%)",
        message: "Eres Gryffindor. Valor y corazón revelados."
    },
    {
        id: "hufflepuff",
        name: "HUFFLEPUFF",
        color: "#ecb939",
        glow: "rgba(236, 185, 57, 0.4)",
        gradient: "linear-gradient(135deg, #DAA520 0%, #ecb939 40%, #8B6508 70%, #434B4D 100%)",
        message: "Eres Hufflepuff. Lealtad y paciencia encontradas."
    },
    {
        id: "ravenclaw",
        name: "RAVENCLAW",
        color: "#0e1a40",
        glow: "rgba(14, 26, 64, 0.4)",
        gradient: "linear-gradient(135deg, #CD7F32 0%, #b87333 30%, #0e1a40 70%, #000080 100%)",
        message: "Eres Ravenclaw. Sabiduría e intelecto florecen."
    },
    {
        id: "slytherin",
        name: "SLYTHERIN",
        color: "#1a472a",
        glow: "rgba(26, 71, 42, 0.4)",
        gradient: "linear-gradient(135deg, #E0FFFF 0%, #C0C0C0 30%, #1a472a 70%, #006400 100%)",
        message: "Eres Slytherin. Ambición y astucia reveladas."
    }
]

const Vision = () => {
    const { t, lang } = useLanguage()
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
                marginTop: '0px',
                maxWidth: '100vw',
                minHeight: '105vh',
                padding: '0rem 2rem 4.5rem 2rem'
            }}
        >
            {/* HARMONY STYLE INJECTION (IMMUNE CENTERING) */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.cdnfonts.com/css/harry-potter');

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
                .hat-shift-lock {
                    transform: translateX(20%);
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
                    .hat-shift-lock {
                        transform: translateX(0%);
                    }
                }
            `}} />

            {/* GLOBAL VERTICAL POSITIONING WRAPPER */}
            <div className="w-full relative z-20" style={{ transform: "translateY(20%)" }}>

                {/* INDEPENDENT 100% VIEWPORT WIDTH HEADER */}
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '8rem' }}>
                    <h3
                        className="font-bold text-center"
                        style={{
                            color: '#B8860B',
                            fontSize: 'clamp(1.9rem, 3.42vw, 2.19rem)',
                            letterSpacing: '0.15em',
                        }}
                    >
                        {manifestoTitle}
                    </h3>
                </div>

                {/* 50/50 LAYOUT: MANIFESTO & SORTING HAT */}
                <div className="container mx-auto vision-layout-lock" style={{ marginTop: '2rem' }}>

                    {/* COLUMN 1: MANIFESTO (CENTERED HARMONY) */}
                    <div className="vision-column-mass flex flex-col justify-center items-center">
                        <div className="max-w-[480px] manifesto-centering-lock">

                            <div className="flex flex-col gap-6 w-full items-center">
                                {manifestoLines.map((line, index) => {
                                    const isLast = index === manifestoLines.length - 1;
                                    return (
                                        <motion.p
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: isLast ? 1 : 0.85, y: 0 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{
                                                duration: 0.8,
                                                ease: "easeOut",
                                                delay: index * 0.2
                                            }}
                                            className={`text-center w-full ${isLast ? 'closure-highlight mt-4 font-bold' : ''}`}
                                            style={{
                                                fontSize: 'clamp(0.9rem, 1.4vw, 1.15rem)',
                                                lineHeight: 3.45,
                                                fontWeight: isLast ? '500' : '400',
                                                letterSpacing: '0.01em',
                                                margin: 0,
                                                color: isLast ? '#B8860B' : '#333333'
                                            }}
                                        >
                                            {line}
                                        </motion.p>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* COLUMN 2: SORTING HAT (SMOKE CALLIGRAPHY & CHROMATIC AURA) */}
                    <div className="vision-column-mass hat-shift-lock flex flex-col items-center justify-center relative min-h-[380px]">
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
                                            initial={{ opacity: 0, filter: 'blur(25px)', y: 50, rotate: -8 }}
                                            animate={{
                                                opacity: [0, 0.9, 1],
                                                filter: ['blur(20px)', 'blur(5px)', 'blur(0px)'],
                                                y: [-10, -20, -10],
                                                rotate: [-5, -2, -5],
                                                x: [0, 4, -4, 0]
                                            }}
                                            transition={{
                                                duration: 3,
                                                ease: "easeOut",
                                                y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                                                rotate: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                                                x: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                                            }}
                                            className="absolute top-1/4 z-30 flex flex-col items-center pointer-events-none"
                                        >
                                            <span
                                                className="font-black tracking-[0.1em] mb-4"
                                                style={{
                                                    fontFamily: "'Harry Potter', 'Cinzel Decorative', serif",
                                                    fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
                                                    background: selectedHouse.gradient,
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                    filter: `drop-shadow(0px 8px 12px rgba(0,0,0,0.6)) drop-shadow(0px 0px 15px ${selectedHouse.color})`,
                                                    lineHeight: 1.1
                                                }}
                                            >
                                                {t?.vision?.hat?.[selectedHouse.id] || selectedHouse.name}
                                            </span>
                                            <motion.div
                                                key={lang} // Forces unroll and typewriter restart on lang change
                                                initial={{ scaleY: 0, opacity: 0 }}
                                                animate={{ scaleY: 1, opacity: 1 }}
                                                transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 1 }}
                                                style={{
                                                    transformOrigin: "top center",
                                                    background: "linear-gradient(135deg, #fdf9ec 0%, #ecdcb0 100%)", /* sepia tone */
                                                    filter: `drop-shadow(0 10px 20px ${selectedHouse.glow}) drop-shadow(0 2px 4px rgba(139, 69, 19, 0.4))`,
                                                    marginTop: "0.5rem",
                                                    position: "relative",
                                                    zIndex: -1,
                                                    width: "fit-content",
                                                    display: "inline-flex"
                                                }}
                                                className="mx-auto"
                                            >
                                                <div
                                                    style={{
                                                        background: "linear-gradient(135deg, rgba(139, 69, 19, 0.05) 0%, transparent 100%)", /* subtle ageing */
                                                        clipPath: "polygon(1% 2%, 35% 0%, 65% 4%, 99% 1%, 100% 35%, 97% 65%, 98% 99%, 65% 97%, 35% 100%, 2% 98%, 0% 65%, 3% 35%)", // Torn paper effect
                                                        padding: "0.6rem 0.8rem", // Minimal padding to kill dead space
                                                    }}
                                                    className="flex flex-col items-center justify-center w-full"
                                                >
                                                    <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.3em] text-center italic flex flex-wrap justify-center relative z-10 w-full" style={{ margin: 0 }}>
                                                        {(t?.vision?.hat?.[`${selectedHouse.id}_desc`] || selectedHouse.message).split('').map((char, index) => (
                                                            <motion.span
                                                                key={index}
                                                                initial={{ opacity: 0, filter: 'blur(4px)' }}
                                                                animate={{ opacity: 1, filter: 'blur(0px)' }}
                                                                transition={{
                                                                    duration: 0.3,
                                                                    delay: 1.8 + index * 0.03, // Steady, mechanical reveal
                                                                    ease: "easeOut"
                                                                }}
                                                                style={{
                                                                    color: '#3d2514', // Marrón Sepia Oscuro Sólido
                                                                    textShadow: '0px 0px 1px rgba(61,37,20,0.5)', // Slight bleed for ink effect
                                                                    marginRight: char === ' ' ? '0.3em' : '0',
                                                                    display: 'inline-block'
                                                                }}
                                                            >
                                                                {char}
                                                            </motion.span>
                                                        ))}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>
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
