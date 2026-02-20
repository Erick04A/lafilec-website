import React, { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { useLanguage } from '../store/LanguageContext'
import gsap from 'https://cdn.skypack.dev/gsap'
import { ScrollTrigger } from 'https://cdn.skypack.dev/gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Vision() {
    const { t } = useLanguage()
    const canvasRef = useRef(null)
    const containerRef = useRef(null)
    const textRef = useRef([])
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [hoveredLine, setHoveredLine] = useState(null)
    const particlesRef = useRef([])
    const animationFrameRef = useRef(null)


    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            gsap.to(canvasRef.current, {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            })


            textRef.current.forEach((line, i) => {

                const isLast = i === textRef.current.length - 1
                const targetColor = isLast ? '#B38728' : '#1A1A1A'

                gsap.fromTo(line,
                    {
                        opacity: 0,
                        y: 50,
                        filter: 'blur(10px)',
                        color: '#999999',
                        willChange: 'transform, filter, opacity, color'
                    },
                    {
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        color: targetColor,
                        duration: 1.5,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: line,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                )
            })

        }, containerRef)

        return () => ctx.revert()
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        const updateCanvasSize = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }
        updateCanvasSize()
        window.addEventListener('resize', updateCanvasSize)


        const isMobile = window.innerWidth <= 768
        const particleCount = isMobile ? 42 : 60
        particlesRef.current = Array.from({ length: particleCount }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.4 + 0.1,
            colorType: Math.random() > 0.6 ? 'gold' : 'grey',
            baseX: 0,
            baseY: 0
        }))

        particlesRef.current.forEach(p => {
            p.baseX = p.x
            p.baseY = p.y
        })

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            particlesRef.current.forEach(particle => {
                const dx = mousePos.x - particle.x
                const dy = mousePos.y - particle.y
                const distance = Math.sqrt(dx * dx + dy * dy)
                const repulsionRadius = hoveredLine !== null ? 200 : 150

                if (distance < repulsionRadius) {
                    const force = (repulsionRadius - distance) / repulsionRadius
                    const multiplier = hoveredLine !== null ? 3 : 2
                    particle.x -= (dx / distance) * force * multiplier
                    particle.y -= (dy / distance) * force * multiplier
                }

                particle.x += (particle.baseX - particle.x) * 0.01
                particle.y += (particle.baseY - particle.y) * 0.01

                particle.x += particle.vx
                particle.y += particle.vy

                if (particle.x < 0) particle.x = canvas.width
                if (particle.x > canvas.width) particle.x = 0
                if (particle.y < 0) particle.y = canvas.height
                if (particle.y > canvas.height) particle.y = 0

                particle.baseX += particle.vx * 0.1
                particle.baseY += particle.vy * 0.1

                if (particle.baseX < 0) particle.baseX = canvas.width
                if (particle.baseX > canvas.width) particle.baseX = 0
                if (particle.baseY < 0) particle.baseY = canvas.height
                if (particle.baseY > canvas.height) particle.baseY = 0


                const color = particle.colorType === 'gold'
                    ? `rgba(179, 135, 40, ${particle.opacity})`
                    : `rgba(150, 150, 150, ${particle.opacity})`

                ctx.fillStyle = color
                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
                ctx.fill()
            })

            animationFrameRef.current = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener('resize', updateCanvasSize)
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [mousePos, hoveredLine])

    const handleMouseMove = (e) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        })
    }

    return (
        <section
            ref={containerRef}
            id="about"
            onMouseMove={handleMouseMove}
            style={{
                padding: '10rem 2rem',
                background: 'var(--color-bg)',
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                transition: 'background-color 0.4s ease'
            }}
        >

            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    top: '-10%',
                    left: 0,
                    width: '100%',
                    height: '120%',
                    pointerEvents: 'none',
                    zIndex: 1,
                    willChange: 'transform'
                }}
            />


            <div style={{
                maxWidth: '900px',
                margin: '0 auto',
                textAlign: 'center',
                position: 'relative',
                zIndex: 2
            }}>
                <h2 style={{
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.25em',
                    marginBottom: '5rem',
                    color: '#B38728',
                    fontFamily: 'var(--font-body)',
                    fontWeight: '700',
                    opacity: 0.9
                }}>
                    {t.about.title}
                </h2>


                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3rem',
                    alignItems: 'center'
                }}>
                    {t.about.lines.map((line, index) => {
                        const isLastLine = index === t.about.lines.length - 1
                        const isHoveredLocal = hoveredLine === index

                        return (
                            <p
                                key={index}
                                className="manifesto-line"
                                ref={el => textRef.current[index] = el}
                                onMouseEnter={() => setHoveredLine(index)}
                                onMouseLeave={() => setHoveredLine(null)}
                                style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: isLastLine ? 'clamp(1.5rem, 3.5vw, 2rem)' : 'clamp(1.2rem, 3vw, 1.6rem)',
                                    lineHeight: 1.6,
                                    fontWeight: isLastLine ? '700' : '500',


                                    color: isLastLine ? '#B38728' : 'var(--color-text)',

                                    marginBottom: 0,
                                    letterSpacing: isHoveredLocal ? '0.05em' : '0.01em',

                                    // Subtle Paper Relief Shadow
                                    textShadow: '0 2px 4px rgba(0,0,0,0.05)',

                                    transition: 'letter-spacing 0.4s ease-out, transform 0.3s ease, color 0.3s ease',
                                    transform: isHoveredLocal ? 'scale(1.02)' : 'scale(1)',
                                    cursor: 'default',
                                    willChange: 'transform, filter, opacity, color'
                                }}
                            >
                                {line}
                            </p>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
