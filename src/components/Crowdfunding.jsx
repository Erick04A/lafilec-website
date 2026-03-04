import React, { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../store/LanguageContext'
import { X } from 'lucide-react'
const lerp = (start, end, factor) => {
    return start + (end - start) * factor
}
export default function Crowdfunding() {
    const { t } = useLanguage()
    const [selectedGoal, setSelectedGoal] = useState(null)
    const [selectedAmount, setSelectedAmount] = useState(null)
    const [customAmount, setCustomAmount] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768)
    const [cardStackIndex, setCardStackIndex] = useState(0)

    const boxRef = useRef(null)
    const animationRef = useRef(null)
    const rotationRef = useRef(0)
    const speedRef = useRef(0.1)
    const baseUrl = import.meta.env.BASE_URL;

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const carouselImages = [
        { id: 1, src: `${baseUrl}assets/carousel/img1.jpg` },
        { id: 2, src: `${baseUrl}assets/carousel/img2.jpg` },
        { id: 3, src: `${baseUrl}assets/carousel/img3.jpg` },
        { id: 4, src: `${baseUrl}assets/carousel/img4.jpg` },
        { id: 5, src: `${baseUrl}assets/carousel/img5.jpg` },
        { id: 6, src: `${baseUrl}assets/carousel/img6.jpg` },
        { id: 7, src: `${baseUrl}assets/carousel/img7.jpg` },
        { id: 8, src: `${baseUrl}assets/carousel/img8.jpg` }
    ]
    const totalTarget = t.crowdfunding?.goals?.items ? t.crowdfunding.goals.items.reduce((sum, goal) => sum + goal.target, 0) : 0
    const totalCurrent = t.crowdfunding?.goals?.items ? t.crowdfunding.goals.items.reduce((sum, goal) => sum + goal.current, 0) : 0
    const overallProgress = totalTarget > 0 ? Math.round((totalCurrent / totalTarget) * 100) : 0
    useEffect(() => {
        const animate = () => {
            const targetSpeed = isHovered ? 0.02 : 0.1
            speedRef.current = lerp(speedRef.current, targetSpeed, 0.05)
            rotationRef.current += speedRef.current
            if (boxRef.current) {
                boxRef.current.style.transform = `rotateY(-${rotationRef.current}deg)`
            }
            animationRef.current = requestAnimationFrame(animate)
        }
        animationRef.current = requestAnimationFrame(animate)
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current)
        }
    }, [isHovered])
    const handleJoin = () => {
        if (selectedGoal !== null && (selectedAmount !== null || customAmount)) {
            setModalOpen(true)
        }
    }
    const handleWhatsApp = () => {
        const goalName = t.crowdfunding.goals.items[selectedGoal].name
        const amount = customAmount || selectedAmount
        const message = t.crowdfunding.modal.whatsapp_message.replace('{goal}', goalName)
        const whatsappUrl = `https://wa.me/593999999999?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, '_blank')
    }
    return (
        <section id="fuel" style={{
            padding: '8rem 2rem',
            background: 'var(--color-bg)',
            color: 'var(--color-text)',
            position: 'relative',
            fontFamily: 'sans-serif',
            transition: 'background-color 0.4s ease, color 0.4s ease'
        }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '2px',
                background: '#222'
            }}>
                <div style={{
                    height: '100%',
                    width: `${overallProgress}%`,
                    background: 'linear-gradient(90deg, #C4D82E, #F7FF3C)',
                    boxShadow: '0 0 10px rgba(196, 216, 46, 0.5)',
                    transition: 'width 0.5s ease'
                }} />
            </div>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 className="section-title-crowdfunding" style={{
                        fontSize: '3.5rem',
                        marginBottom: '1.5rem',
                        fontFamily: 'var(--font-title)',
                        fontWeight: '900',
                        letterSpacing: '-1px'
                    }}>
                        {t.crowdfunding.title}
                    </h2>
                    <p className="crowdfunding-vision">
                        {t.crowdfunding.vision}
                    </p>
                </div>
                <div
                    className="crowdfunding-carousel-container"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                        height: '290px',
                        width: '290px',
                        perspective: '1200px',
                        margin: '4rem auto',
                        transform: isHovered ? 'scale(1.15) rotateX(-10deg)' : 'scale(1.08) rotateX(-10deg)',
                        transformStyle: 'preserve-3d',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        transition: 'transform 0.8s ease-out',
                        zIndex: 1
                    }}
                >
                    <div
                        className="crowdfunding-carousel-box"
                        ref={boxRef}
                        style={{
                            height: '100%',
                            width: '100%',
                            transformStyle: 'preserve-3d',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            willChange: 'transform'
                        }}
                    >
                        {carouselImages.map((img, index) => {
                            const isDiscarded = isMobile && index < cardStackIndex
                            const isTop = isMobile && index === cardStackIndex
                            const offsetIndex = isMobile ? index - cardStackIndex : 0

                            return (
                                <div
                                    key={img.id}
                                    className="crowdfunding-carousel-item"
                                    onClick={() => {
                                        if (isMobile && isTop) {
                                            setCardStackIndex(prev => prev + 1)
                                        }
                                    }}
                                    style={{
                                        height: '290px',
                                        width: '216px',
                                        position: 'absolute',
                                        top: 0,
                                        left: '37px',
                                        boxShadow: isMobile ? '0 10px 30px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.1)' : '0 20px 40px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0,0,0,0.06)',
                                        border: '1px solid rgba(0,0,0,0.08)',
                                        borderRadius: '12px',
                                        transform: isMobile
                                            ? (isDiscarded ? 'translateX(180%) rotate(25deg)' : `translateY(${offsetIndex * 3}px) scale(${1 - offsetIndex * 0.02}) rotate(${offsetIndex % 2 === 0 ? offsetIndex * 3 : -offsetIndex * 3}deg)`)
                                            : `rotateY(${index * 45}deg) translateZ(380px)`,
                                        transformStyle: 'preserve-3d',
                                        backfaceVisibility: 'hidden',
                                        zIndex: isMobile ? carouselImages.length - index : 'auto',
                                        transition: isMobile ? 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s ease-out' : 'none',
                                        opacity: isMobile && isDiscarded ? 0 : 1,
                                        pointerEvents: isMobile ? (isTop ? 'auto' : 'none') : 'auto',
                                        cursor: isMobile ? (isTop ? 'pointer' : 'default') : 'default'
                                    }}
                                >
                                    <div style={{
                                        height: '100%',
                                        width: '100%',
                                        transformStyle: 'preserve-3d'
                                    }}>
                                        <img
                                            src={img.src}
                                            alt={`LA FIL Highlight ${img.id}`}
                                            loading="lazy"
                                            style={{
                                                height: '100%',
                                                width: '100%',
                                                objectFit: 'cover',
                                                position: 'absolute',
                                                backfaceVisibility: 'hidden',
                                                pointerEvents: 'none',
                                                filter: 'brightness(1.05)'
                                            }}
                                            decoding="async"
                                            className="hardware-accelerated"
                                        />
                                        <img
                                            src={img.src}
                                            alt={`LA FIL Highlight ${img.id}`}
                                            style={{
                                                height: '100%',
                                                width: '100%',
                                                objectFit: 'cover',
                                                position: 'absolute',
                                                backfaceVisibility: 'hidden',
                                                transform: 'rotateY(180deg)',
                                                pointerEvents: 'none',
                                                filter: 'brightness(0.5) sepia(1) hue-rotate(20deg)'
                                            }}
                                            decoding="async"
                                            className="hardware-accelerated"
                                        />
                                    </div>
                                </div>
                            )
                        })}
                        {/* RESTART CAROUSEL CTA (MOBILE ONLY) */}
                        {isMobile && cardStackIndex >= carouselImages.length && (
                            <div className="hard-center-cta">
                                <h4 style={{ color: 'var(--color-verde-esmeralda)', fontSize: '1.2rem', marginBottom: '1rem', fontWeight: 'bold' }}>
                                    Galería Completada
                                </h4>
                                <button
                                    onClick={() => setCardStackIndex(0)}
                                    style={{
                                        padding: '0.6rem 1.5rem',
                                        background: 'transparent',
                                        border: '1px solid var(--color-verde-esmeralda)',
                                        color: 'var(--color-verde-esmeralda)',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        textTransform: 'uppercase',
                                        letterSpacing: '2px',
                                        fontWeight: '900',
                                        fontFamily: 'var(--font-title)',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    RECARGAR
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div style={{
                    marginBottom: '4rem',
                    marginTop: '220px',
                    position: 'relative',
                    zIndex: 10
                }}>
                    <h3 className="section-title-goals" style={{
                        fontSize: '2rem',
                        marginBottom: '3rem',
                        fontFamily: 'var(--font-title)',
                        fontWeight: '700',
                        textAlign: 'center'
                    }}>
                        {t.crowdfunding.goals.title}
                    </h3>
                    <div className="crowdfunding-goals-container" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2.5rem'
                    }}>
                        {t.crowdfunding?.goals?.items && t.crowdfunding.goals.items.map((goal, idx) => {
                            const progress = (goal.current / goal.target) * 100
                            const isNearComplete = progress >= 80
                            const isSelected = selectedGoal === idx

                            return (
                                <div key={idx}
                                    className={`goal-card ${isSelected ? 'selected' : ''} ${isNearComplete ? 'near-complete' : ''}`}
                                    onClick={() => setSelectedGoal(idx)}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <div>
                                            <h4 className={`goal-title ${isSelected || isNearComplete ? 'active' : ''}`}>
                                                {goal.name}
                                            </h4>
                                            <span className="goal-amount">
                                                ${goal.current} / ${goal.target}
                                            </span>
                                        </div>
                                        <div className={`goal-percent ${isSelected || isNearComplete ? 'active' : ''}`}>
                                            {Math.round(progress)}%
                                        </div>
                                    </div>
                                    <div className="progress-track">
                                        <div
                                            className="progress-fill"
                                            style={{
                                                width: `${progress}%`,
                                            }}
                                        />
                                    </div>
                                    {isSelected && (
                                        <div style={{
                                            marginTop: '2rem',
                                            paddingTop: '2rem',
                                            borderTop: '1px solid var(--color-divider)'
                                        }}>
                                            <p className="crowdfunding-support-label">
                                                {t.crowdfunding.select_amount}
                                            </p>
                                            <div style={{
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
                                                gap: '1rem'
                                            }}>
                                                {t.crowdfunding.contribution_amounts.map((amount) => (
                                                    <button
                                                        key={amount}
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            setSelectedAmount(amount)
                                                            setCustomAmount('')
                                                        }}
                                                        style={{
                                                            padding: '1rem',
                                                            background: selectedAmount === amount ? '#C4D82E' : '#FFF',
                                                            color: selectedAmount === amount ? '#FFF' : '#333',
                                                            border: `1px solid ${selectedAmount === amount ? '#C4D82E' : '#DDD'}`,
                                                            borderRadius: '4px',
                                                            cursor: 'pointer',
                                                            fontWeight: '700',
                                                            fontSize: '1rem',
                                                            transition: 'all 0.3s ease',
                                                            fontFamily: 'monospace'
                                                        }}
                                                    >
                                                        ${amount}
                                                    </button>
                                                ))}
                                                <input
                                                    type="number"
                                                    placeholder={t.crowdfunding.custom_amount}
                                                    value={customAmount}
                                                    onClick={(e) => e.stopPropagation()}
                                                    onChange={(e) => {
                                                        setCustomAmount(e.target.value)
                                                        setSelectedAmount(null)
                                                    }}
                                                    style={{
                                                        padding: '1rem',
                                                        background: customAmount ? '#C4D82E' : '#FFF',
                                                        color: customAmount ? '#FFF' : '#333',
                                                        border: `1px solid ${customAmount ? '#C4D82E' : '#DDD'}`,
                                                        borderRadius: '4px',
                                                        fontWeight: '700',
                                                        fontSize: '1rem',
                                                        fontFamily: 'monospace',
                                                        gridColumn: 'span 2'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <button
                        onClick={handleJoin}
                        disabled={!(selectedGoal !== null && (selectedAmount !== null || customAmount))}
                        className={`join-btn ${(selectedGoal !== null && (selectedAmount !== null || customAmount)) ? 'active' : ''}`}
                    >
                        {t.crowdfunding.join_button}
                    </button>
                </div>
            </div>
            {modalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    background: 'rgba(0,0,0,0.95)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '2rem'
                }}
                    onClick={() => setModalOpen(false)}
                >
                    <div style={{
                        background: '#050505',
                        padding: '2rem',
                        border: '1px solid #333',
                        maxWidth: '500px',
                        width: '100%',
                        position: 'relative',
                        boxShadow: '0 0 50px rgba(0,0,0,0.8)',
                        textAlign: 'center',
                        borderRadius: '12px'
                    }}
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setModalOpen(false)}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '0.5rem',
                                color: '#FFD700',
                                transition: 'transform 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <X size={24} />
                        </button>
                        <div style={{
                            marginBottom: '2rem',
                            marginTop: '1rem',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: '1px solid #FFD700',
                            boxShadow: '0 0 25px rgba(196, 216, 46, 0.2)'
                        }}>
                            <img
                                src={`${import.meta.env.BASE_URL}assets/images/bank_details.png`}
                                alt="Datos Bancarios Oficiales"
                                loading="lazy"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                    userSelect: 'none',
                                    pointerEvents: 'none'
                                }}
                            />
                        </div>
                        {selectedGoal !== null && (
                            <p style={{
                                color: '#666',
                                fontSize: '0.85rem',
                                marginBottom: '1.5rem',
                                fontFamily: 'monospace'
                            }}>
                                APORTE: <span style={{ color: '#C4D82E' }}>${customAmount || selectedAmount}</span>
                            </p>
                        )}
                        <button
                            onClick={handleWhatsApp}
                            style={{
                                background: '#000',
                                color: '#C4D82E',
                                border: '1px solid #FFD700',
                                padding: '1rem 3rem',
                                fontSize: '0.9rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                transition: 'all 0.3s ease',
                                borderRadius: '4px',
                                width: '100%',
                                boxShadow: '0 0 10px rgba(196, 216, 46, 0.1)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = '0 0 30px #C4D82E'
                                e.currentTarget.style.textShadow = '0 0 10px #C4D82E'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = '0 0 10px rgba(196, 216, 46, 0.1)'
                                e.currentTarget.style.textShadow = 'none'
                            }}
                        >
                            {t.crowdfunding.modal.whatsapp_button}
                        </button>
                    </div>
                </div>
            )}
        </section>
    )
}
