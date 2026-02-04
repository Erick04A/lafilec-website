import React, { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../store/LanguageContext'

export default function Carousel3D() {
    const { t } = useLanguage()
    const boxRef = useRef(null)
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        const box = boxRef.current
        if (!box) return

        // Apply hover scale effect
        if (isHovered) {
            box.style.transform = 'scale(1.1)'
            box.style.animationDuration = '80s' // Slow down rotation
        } else {
            box.style.transform = 'scale(1)'
            box.style.animationDuration = '50s' // Normal speed
        }
    }, [isHovered])

    // Placeholder images - will be replaced with LA FIL photos
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
                                    boxShadow: '0 0 15px rgba(196, 216, 46, 0.5)',
                                    border: '1px solid #C4D82E',
                                    transform: `rotateY(${index * 45}deg) translateZ(250px)`
                                }}
                            >
                                <div style={{
                                    height: '200px',
                                    width: '150px',
                                    transformStyle: 'preserve-3d',
                                    transition: '2s'
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
                                            WebkitBoxReflect: 'below 10px linear-gradient(transparent, transparent, rgba(196, 216, 46, 0.05))'
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
                                            WebkitBoxReflect: 'below 10px linear-gradient(transparent, transparent, rgba(196, 216, 46, 0.05))'
                                        }}
                                    />
                                </div>
                            </div>
                        ))}

                        {/* Piso energético */}
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
            `}</style>
        </section>
    )
}
