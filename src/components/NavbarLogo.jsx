import React, { useEffect, useState, useRef } from 'react'

export default function ResonantSeal() {
    const [isHovered, setIsHovered] = useState(false)
    const [frequencies, setFrequencies] = useState([])
    const animationRef = useRef(null)

    useEffect(() => {
        // Initialize 12 frequency bars around the logo
        const bars = Array.from({ length: 12 }, (_, i) => ({
            angle: (i * 30) * (Math.PI / 180),
            baseHeight: 3 + Math.random() * 2,
            phase: Math.random() * Math.PI * 2
        }))
        setFrequencies(bars)

        let time = 0
        const animate = () => {
            time += 0.05
            setFrequencies(prev => prev.map(bar => ({
                ...bar,
                height: bar.baseHeight + Math.sin(time + bar.phase) * (isHovered ? 3 : 1)
            })))
            animationRef.current = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [isHovered])

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const logoOpacity = isHovered ? 0.9 : 0.7
    const glowIntensity = isHovered ? 8 : 4

    return (
        <div
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                position: 'relative',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '80px',
                height: '50px'
            }}
        >
            {/* Frequency Bars Ring */}
            <svg
                width="80"
                height="50"
                viewBox="0 0 80 50"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0
                }}
            >
                {frequencies.map((bar, i) => {
                    const radius = 30
                    const x = 40 + radius * Math.cos(bar.angle)
                    const y = 25 + radius * Math.sin(bar.angle)
                    const height = bar.height || bar.baseHeight

                    return (
                        <line
                            key={i}
                            x1={x}
                            y1={y}
                            x2={x + height * Math.cos(bar.angle)}
                            y2={y + height * Math.sin(bar.angle)}
                            stroke="#C4D82E"
                            strokeWidth={isHovered ? "1.5" : "1"}
                            strokeLinecap="round"
                            opacity={isHovered ? 0.8 : 0.4}
                            style={{
                                transition: 'all 0.3s ease'
                            }}
                        />
                    )
                })}
            </svg>

            <img
                src={`${import.meta.env.BASE_URL}logo.png`}
                alt="LA FIL"
                style={{
                    height: '100%',
                    width: 'auto',
                    objectFit: 'contain',
                    filter: `drop-shadow(0 0 ${glowIntensity}px rgba(196, 216, 46, 0.4))`,
                    opacity: logoOpacity,
                    transition: 'all 0.3s ease',
                    userSelect: 'none'
                }}
            />
        </div>
    )
}
