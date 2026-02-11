import React, { useState, useEffect } from 'react'

export default function ResonantSeal({ triggerPulse = false }) {
    const [isHovered, setIsHovered] = useState(false)
    const [isPulsing, setIsPulsing] = useState(false)

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Trigger pulse animation when navbar links are hovered
    useEffect(() => {
        if (triggerPulse) {
            setIsPulsing(true)
            const timeout = setTimeout(() => setIsPulsing(false), 300)
            return () => clearTimeout(timeout)
        }
    }, [triggerPulse])

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // Bar configurations for asynchronous pulsing
    // Mobile: 2 bars | Desktop: 3 bars
    const barsLeft = isMobile
        ? [{ delay: '0s', duration: '1.2s' }, { delay: '0.2s', duration: '1.5s' }]
        : [{ delay: '0s', duration: '1.2s' }, { delay: '0.4s', duration: '1.5s' }, { delay: '0.2s', duration: '1.3s' }]

    const barsRight = isMobile
        ? [{ delay: '0.1s', duration: '1.4s' }, { delay: '0.3s', duration: '1.1s' }]
        : [{ delay: '0.1s', duration: '1.4s' }, { delay: '0.5s', duration: '1.1s' }, { delay: '0.3s', duration: '1.6s' }]

    // Shared filter for Holographic Aura + Edge Definition
    const holographicFilter = `
        drop-shadow(0 0 8px rgba(170, 255, 0, 0.6))
        drop-shadow(0 0 1px rgba(0,0,0,0.8))
    `

    return (
        <div
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`logo-holographic ${isPulsing ? 'logo-pulsing' : ''}`}
            style={{
                position: 'relative',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 10px',
                height: isMobile ? '40px' : '50px',
                background: 'transparent',
                transition: 'transform 0.3s ease',
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                gap: isMobile ? '4px' : '8px'
            }}
        >
            {/* Left Visualizer Bars */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                height: '100%',
                filter: holographicFilter // Apply aura to bars
            }}>
                {barsLeft.map((bar, i) => (
                    <div key={`l-${i}`} style={{
                        width: '2px',
                        height: isMobile ? '10px' : '12px',
                        background: '#C4D82E', // High visibility Lime
                        borderRadius: '1px',
                        animation: `pulse-height ${isHovered ? '0.6s' : bar.duration} ease-in-out infinite alternate`,
                        animationDelay: bar.delay
                    }} />
                ))}
            </div>

            {/* Logo Image */}
            <img
                src={`${import.meta.env.BASE_URL}logo.png`}
                alt="LA FIL"
                style={{
                    height: isMobile ? '24px' : '32px', // 20% smaller reduction roughly
                    width: 'auto',
                    objectFit: 'contain',
                    zIndex: 2,
                    filter: `${holographicFilter} brightness(1.1)`, // Apply aura + brightness
                    willChange: 'filter, transform'
                }}
            />

            {/* Right Visualizer Bars */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                height: '100%',
                filter: holographicFilter
            }}>
                {barsRight.map((bar, i) => (
                    <div key={`r-${i}`} style={{
                        width: '2px',
                        height: isMobile ? '10px' : '12px',
                        background: '#C4D82E',
                        borderRadius: '1px',
                        animation: `pulse-height ${isHovered ? '0.6s' : bar.duration} ease-in-out infinite alternate`,
                        animationDelay: bar.delay
                    }} />
                ))}
            </div>

            <style>{`
                @keyframes pulse-height {
                    0% { height: 6px; opacity: 0.8; }
                    100% { height: 16px; opacity: 1; }
                }
                
                /* Visual pulse animation for logo (300ms) */
                @keyframes logoPulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.08); }
                }
                
                /* Visual glow animation for logo (300ms) */
                @keyframes logoGlow {
                    0%, 100% { filter: drop-shadow(0 0 8px rgba(170, 255, 0, 0.6)) drop-shadow(0 0 1px rgba(0,0,0,0.8)); }
                    50% { filter: drop-shadow(0 0 16px rgba(170, 255, 0, 0.9)) drop-shadow(0 0 1px rgba(0,0,0,0.8)); }
                }
                
                /* Apply pulse on hover */
                .logo-holographic:hover {
                    animation: logoPulse 0.3s ease-out;
                }
                
                /* Apply glow to logo image on hover */
                .logo-holographic:hover img {
                    animation: logoGlow 0.3s ease-out;
                }
                
                /* Apply pulse when navbar links are hovered (triggered by state) */
                .logo-pulsing {
                    animation: logoPulse 0.3s ease-out !important;
                }
                
                .logo-pulsing img {
                    animation: logoGlow 0.3s ease-out !important;
                }
            `}</style>
        </div>
    )
}
