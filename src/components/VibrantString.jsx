import React, { useEffect, useRef, useState } from 'react'

export default function VibrantString() {
    const canvasRef = useRef(null)
    const particlesRef = useRef([])
    const mouseXRef = useRef(null)
    const scrollIntensityRef = useRef(0)
    const animationRef = useRef(null)
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        const updateSize = () => {
            canvas.width = window.innerWidth
            canvas.height = 100
        }
        updateSize()
        window.addEventListener('resize', updateSize)

        // Scroll listener for tension effect
        const handleScroll = () => {
            const scrollY = window.scrollY
            const heroHeight = window.innerHeight
            scrollIntensityRef.current = Math.min(scrollY / heroHeight, 1)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })

        // Mouse move for explosive interaction
        const handleMouseMove = (e) => {
            if (isHovered) {
                const rect = canvas.getBoundingClientRect()
                mouseXRef.current = e.clientX - rect.left

                // Create particle burst at cursor position
                for (let i = 0; i < 5; i++) {
                    particlesRef.current.push({
                        x: mouseXRef.current,
                        y: canvas.height / 2,
                        vx: (Math.random() - 0.5) * 3,
                        vy: -Math.random() * 5 - 2,
                        life: 1,
                        size: Math.random() * 3 + 1
                    })
                }
            }
        }
        canvas.addEventListener('mousemove', handleMouseMove)

        let time = 0
        const points = 300
        const segmentWidth = canvas.width / points

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            const centerY = canvas.height / 2
            const baseAmplitude = 3
            const scrollGlow = 4 + scrollIntensityRef.current * 12

            // Draw the pulsing string with gradient
            ctx.beginPath()
            ctx.lineWidth = 2
            ctx.shadowBlur = scrollGlow
            ctx.shadowColor = 'rgba(196, 216, 46, 0.8)'

            for (let i = 0; i <= points; i++) {
                const x = i * segmentWidth
                let y = centerY

                // Traveling wave (base animation)
                y += Math.sin(i * 0.05 - time * 2) * baseAmplitude

                // Explosive hover effect at cursor position
                if (isHovered && mouseXRef.current !== null) {
                    const distance = Math.abs(x - mouseXRef.current)
                    const influence = Math.max(0, 1 - distance / 200)
                    const explosiveAmplitude = influence * 25
                    y += Math.sin(time * 10) * explosiveAmplitude
                }

                if (i === 0) {
                    ctx.moveTo(x, y)
                } else {
                    ctx.lineTo(x, y)
                }
            }

            // Gradient stroke
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
            gradient.addColorStop(0, 'rgba(196, 216, 46, 0)')
            gradient.addColorStop(0.5, 'rgba(196, 216, 46, 1)')
            gradient.addColorStop(1, 'rgba(196, 216, 46, 0)')
            ctx.strokeStyle = gradient
            ctx.stroke()

            // Draw and update particles
            particlesRef.current = particlesRef.current.filter(p => {
                p.x += p.vx
                p.y += p.vy
                p.vy += 0.2 // gravity
                p.life -= 0.02

                if (p.life > 0) {
                    ctx.fillStyle = `rgba(196, 216, 46, ${p.life})`
                    ctx.beginPath()
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                    ctx.fill()
                    return true
                }
                return false
            })

            time += 0.016
            animationRef.current = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener('resize', updateSize)
            window.removeEventListener('scroll', handleScroll)
            canvas.removeEventListener('mousemove', handleMouseMove)
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [isHovered])

    return (
        <div
            style={{
                width: '100%',
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'crosshair',
                position: 'relative',
                background: 'var(--color-bg)'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false)
                mouseXRef.current = null
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    width: '100%',
                    height: '100px',
                    display: 'block'
                }}
            />
        </div>
    )
}
