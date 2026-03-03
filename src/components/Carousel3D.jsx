import React, { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../store/LanguageContext'
export default function Carousel3D() {
    const { t } = useLanguage()
    const boxRef = useRef(null)
    const [isHovered, setIsHovered] = useState(false)
    useEffect(() => {
        const box = boxRef.current
        if (!box) return
        if (isHovered) {
            box.style.transform = 'scale(1.1)'
            box.style.animationDuration = '80s'
        } else {
            box.style.transform = 'scale(1)'
            box.style.animationDuration = '50s'
        }
    }, [isHovered])
    const placeholderImages = Array(8).fill({
        front: 'https://placehold.co/150x200/1a1a1a/C4D82E?text=PROXIMAMENTE&font=montserrat',
        back: 'https://placehold.co/150x200/1a1a1a/C4D82E?text=LA+FIL+2026&font=montserrat'
    })
    return (
        <section className="carousel-section" style={{
            background: '#0a0a0a', 
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                textAlign: 'center'
            }}>
                <h2 style={{
                    fontFamily: 'var(--font-title)',
                    fontSize: '3rem',
                    fontWeight: '900',
                    color: '#fff',
                    marginBottom: '4rem',
                    letterSpacing: '-1px'
                }}>
                    Nuestra Trayectoria
                </h2>
                <div
                    className="contenedor-3d carousel-container-wrapper"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div
                        ref={boxRef}
                        className="box-3d"
                        style={{
                            height: '100%',
                            width: '100%',
                            transformStyle: 'preserve-3d',
                            transition: 'transform 0.5s ease, animation-duration 0.5s ease',
                            position: 'relative'
                        }}
                    >
                        {placeholderImages.map((imgs, index) => (
                            <div
                                key={index}
                                className="carousel-card"
                                style={{
                                    height: '200px',
                                    width: '150px',
                                    position: 'absolute',
                                    background: 'var(--color-glass)', 
                                    backdropFilter: 'blur(4px)', 
                                    WebkitBackdropFilter: 'blur(4px)',
                                    border: '1px solid rgba(255, 255, 255, 0.4)', 
                                    borderTop: '1px solid rgba(255, 255, 255, 0.6)',
                                    borderBottom: '1px solid rgba(173, 216, 230, 0.3)', 
                                    borderRadius: '30px',
                                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                                    transform: `rotateY(${index * 45}deg) translateZ(250px)`,
                                    overflow: 'hidden',
                                    transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                    zIndex: 1
                                }}
                            >
                                {}
                                <div className="glass-overlay" style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: 'radial-gradient(circle at 10% 10%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.0) 40%)', 
                                    pointerEvents: 'none',
                                    zIndex: 10,
                                    mixBlendMode: 'overlay'
                                }} />
                                <div style={{
                                    height: '100%',
                                    width: '100%',
                                    position: 'relative',
                                    zIndex: 1
                                }}>
                                    <img
                                        src={imgs.front}
                                        alt="LA FIL"
                                        loading="lazy"
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                            objectFit: 'cover',
                                            position: 'absolute',
                                            backfaceVisibility: 'hidden',
                                            borderRadius: '30px',
                                            filter: 'brightness(1.02) contrast(1.05)',
                                            transition: 'filter 0.4s ease'
                                        }}
                                    />
                                    <img
                                        src={imgs.back}
                                        alt="LA FIL"
                                        loading="lazy"
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                            objectFit: 'cover',
                                            position: 'absolute',
                                            backfaceVisibility: 'hidden',
                                            transform: 'rotateY(180deg)',
                                            borderRadius: '30px',
                                            filter: 'brightness(1.02) contrast(1.05)',
                                            transition: 'filter 0.4s ease'
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                        <div style={{
                            height: '43em',
                            width: '43em',
                            transform: 'rotateX(90deg) translateX(-280px) translateY(40px) translateZ(140px)',
                            background: 'radial-gradient(circle at center, rgba(173, 216, 230, 0.1), transparent 70%)', 
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            filter: 'blur(40px)',
                            opacity: 0.6
                        }}>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes rotar-3d {
                    to {
                        transform: rotateY(-360deg);
                    }
                }
                .box-3d {
                    animation: rotar-3d 50s infinite linear;
                }
                .box-3d:hover {
                    animation-play-state: paused;
                }
                .elemento-3d:hover {
                    transform: translateY(-10px) scale(1.03) !important;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2) !important;
                    border-color: rgba(255, 255, 255, 0.9) !important;
                    z-index: 100 !important;
                }
                .elemento-3d:hover img {
                    filter: brightness(1.1) saturate(1.1) !important;
                }
                .elemento-3d:hover .glass-overlay {
                    background: radial-gradient(circle at 10% 10%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.0) 50%) !important;
                }
            `}</style>
        </section>
    )
}
