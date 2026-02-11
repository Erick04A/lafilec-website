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
            background: '#0a0a0a', // Keep minimal background if needed or move to CSS fully
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
                                className="elemento-3d"
                                style={{
                                    height: '200px',
                                    width: '150px',
                                    position: 'absolute',
                                    // Glassmorphism: Ultra-thin glass border
                                    border: '1px solid rgba(255, 255, 255, 0.18)',
                                    borderRadius: '14px',
                                    // Remove neon glow, add subtle glass shadow
                                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                                    // Backdrop blur for glass effect
                                    backdropFilter: 'blur(8px)',
                                    WebkitBackdropFilter: 'blur(8px)',
                                    transform: `rotateY(${index * 45}deg) translateZ(250px)`,
                                    overflow: 'hidden',
                                    // Smooth transitions for hover
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {/* Glass overlay for crystal reflection */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.05) 100%)',
                                    pointerEvents: 'none',
                                    zIndex: 2,
                                    borderRadius: '14px'
                                }} />

                                <div style={{
                                    height: '200px',
                                    width: '150px',
                                    transformStyle: 'preserve-3d',
                                    transition: '2s',
                                    position: 'relative'
                                }}>
                                    <img
                                        src={imgs.front}
                                        alt="LA FIL"
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                            objectFit: 'cover',
                                            position: 'absolute',
                                            backfaceVisibility: 'hidden',
                                            borderRadius: '14px',
                                            // Enhanced for glass effect clarity
                                            filter: 'brightness(1.05) contrast(1.05)',
                                            WebkitBoxReflect: 'below 10px linear-gradient(transparent, transparent, rgba(255, 255, 255, 0.03))'
                                        }}
                                    />
                                    <img
                                        src={imgs.back}
                                        alt="LA FIL"
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                            objectFit: 'cover',
                                            position: 'absolute',
                                            backfaceVisibility: 'hidden',
                                            transform: 'rotateY(180deg)',
                                            borderRadius: '14px',
                                            // Enhanced for glass effect clarity
                                            filter: 'brightness(1.05) contrast(1.05)',
                                            WebkitBoxReflect: 'below 10px linear-gradient(transparent, transparent, rgba(255, 255, 255, 0.03))'
                                        }}
                                    />
                                </div>
                            </div>
                        ))}


                        <div style={{
                            height: '43em',
                            width: '43em',
                            transform: 'rotateX(90deg) translateX(-280px) translateY(40px) translateZ(140px)',
                            background: 'radial-gradient(circle at center, rgba(196, 216, 46, 0.07), transparent)',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <div style={{
                                height: '200px',
                                width: '300px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: 'rgba(196, 216, 46, 0.3)',
                                fontFamily: 'var(--font-title)',
                                fontWeight: '700',
                                fontSize: '1.5em',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase'
                            }}>
                                <p style={{ margin: 0, padding: '5px' }}>Nuestra</p>
                                <p style={{ margin: 0, padding: '5px' }}>Trayectoria</p>
                            </div>
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

                /* Glassmorphism hover effects */
                .elemento-3d:hover {
                    border: 1px solid rgba(255, 255, 255, 0.35) !important;
                    box-shadow: 0 8px 40px 0 rgba(255, 255, 255, 0.15) !important;
                    transform: scale(1.05) !important;
                }

                .elemento-3d:hover img {
                    filter: brightness(1.15) contrast(1.1) !important;
                }
            `}</style>
        </section>
    )
}
