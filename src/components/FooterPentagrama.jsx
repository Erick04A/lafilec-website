import React, { useRef, useEffect, useState } from 'react'
function drawNoteHead(ctx, x, y, size) {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(-0.42)
    ctx.beginPath()
    ctx.ellipse(0, 0, size * 1.3, size * 0.78, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
}
function drawQuarter(ctx, x, y, size) {
    drawNoteHead(ctx, x, y, size)
    ctx.beginPath()
    ctx.moveTo(x + size * 1.1, y - size * 0.3)
    ctx.lineTo(x + size * 1.1, y - size * 4.2)
    ctx.stroke()
}
function drawEighth(ctx, x, y, size) {
    drawNoteHead(ctx, x, y, size)
    const sx = x + size * 1.1
    const stemTop = y - size * 4.2
    ctx.beginPath()
    ctx.moveTo(sx, y - size * 0.3)
    ctx.lineTo(sx, stemTop)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(sx, stemTop)
    ctx.bezierCurveTo(
        sx + size * 2.2, stemTop + size * 1.2,
        sx + size * 2.8, stemTop + size * 2.4,
        sx + size * 1.6, stemTop + size * 3.6
    )
    ctx.stroke()
}
function drawSixteenth(ctx, x, y, size) {
    drawEighth(ctx, x, y, size)
    const sx = x + size * 1.1
    const stemTop = y - size * 4.2
    ctx.beginPath()
    ctx.moveTo(sx, stemTop + size * 1.4)
    ctx.bezierCurveTo(
        sx + size * 2.2, stemTop + size * 2.6,
        sx + size * 2.8, stemTop + size * 3.8,
        sx + size * 1.6, stemTop + size * 5.0
    )
    ctx.stroke()
}
function drawClef(ctx, x, y, size, alpha, rgb) {
    ctx.save()
    ctx.globalAlpha = alpha
    ctx.font = `bold ${Math.round(size * 5.5)}px Georgia, serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = `rgb(${rgb})`
    ctx.fillText('\u{1D11E}', x, y - size * 2.2)
    ctx.restore()
}
const GLYPH_TYPES = ['quarter', 'eighth', 'sixteenth', 'clef']
const LINE_SPACING = 8
const NUM_NOTES = 16
const REPEL_RADIUS = 90
const REPEL_FORCE = 3.5
const SPRING_K = 0.10
const DAMPING = 0.76
function makeNote(W, startY, idx) {
    const lineIndex = Math.floor(Math.random() * 5)
    const baseY = startY + lineIndex * LINE_SPACING
    return {
        x: Math.random() * W,
        y: 0, 
        vy: 0,
        lineIndex,
        speed: 0.35 + Math.random() * 0.35, 
        type: GLYPH_TYPES[Math.floor(Math.random() * GLYPH_TYPES.length)],
        size: 3.2 + Math.random() * 2.2,
        opacity: 0.58 + Math.random() * 0.38,
    }
}
export default function Pentagrama() {
    const canvasRef = useRef(null)
    const mouseRef = useRef({ x: null, y: null })
    const notesRef = useRef([])
    const [isDark, setIsDark] = useState(
        () => document.documentElement.getAttribute('data-theme') === 'dark'
    )
    useEffect(() => {
        const obs = new MutationObserver(() =>
            setIsDark(document.documentElement.getAttribute('data-theme') === 'dark')
        )
        obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
        return () => obs.disconnect()
    }, [])
    const handleMouseMove = (e) => {
        const rect = canvasRef.current?.getBoundingClientRect()
        if (!rect) return
        mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const handleMouseLeave = () => { mouseRef.current = { x: null, y: null } }
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let animId
        let time = 0
        const resize = () => {
            const dpr = window.devicePixelRatio || 1
            const rect = canvas.getBoundingClientRect()
            canvas.width = rect.width * dpr
            canvas.height = rect.height * dpr
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        }
        resize()
        const ro = new ResizeObserver(resize)
        ro.observe(canvas)
        const lineRgb = isDark ? '46, 91, 255' : '180, 145, 55'
        const noteRgb = isDark ? '196, 216, 46' : '196, 148, 30'
        const glowCol = isDark ? `rgba(196,216,46,0.75)` : `rgba(196,148,30,0.55)`
        const draw = () => {
            const W = canvas.getBoundingClientRect().width
            const H = canvas.getBoundingClientRect().height
            const staffH = LINE_SPACING * 4
            const startY = 100 
            if (notesRef.current.length === 0) {
                notesRef.current = Array.from({ length: NUM_NOTES }, (_, i) =>
                    makeNote(W, startY, i)
                )
            }
            ctx.clearRect(0, 0, W, H)
            const mx = mouseRef.current.x
            const my = mouseRef.current.y
            for (let i = 0; i < 5; i++) {
                const baseY = startY + i * LINE_SPACING
                const grad = ctx.createLinearGradient(0, 0, W, 0)
                grad.addColorStop(0.00, `rgba(${lineRgb},0)`)
                grad.addColorStop(0.12, `rgba(${lineRgb},0.55)`)
                grad.addColorStop(0.50, `rgba(${lineRgb},0.78)`)
                grad.addColorStop(0.88, `rgba(${lineRgb},0.55)`)
                grad.addColorStop(1.00, `rgba(${lineRgb},0)`)
                ctx.beginPath()
                for (let x = 0; x <= W; x += 3) {
                    let wY = baseY
                        + Math.sin(time * 1.1 + x * 0.013 + i * 0.72) * 1.4
                        + Math.sin(time * 0.6 + x * 0.007 + i * 1.10) * 0.5
                    if (mx !== null) {
                        const d = Math.abs(x - mx)
                        if (d < 200) {
                            const inf = (1 - d / 200) ** 2
                            wY += Math.sin(time * 14 + x * 0.04) * inf * 10
                        }
                    }
                    x === 0 ? ctx.moveTo(x, wY) : ctx.lineTo(x, wY)
                }
                ctx.strokeStyle = grad
                ctx.lineWidth = 1
                ctx.shadowBlur = 0
                ctx.stroke()
            }
            notesRef.current.forEach(note => {
                const noteBaseY = startY + note.lineIndex * LINE_SPACING
                const waveBase = noteBaseY
                    + Math.sin(time * 1.1 + note.x * 0.013 + note.lineIndex * 0.72) * 1.4
                note.vy += (waveBase - note.y) * SPRING_K
                note.vy *= DAMPING
                if (mx !== null && my !== null) {
                    const dx = note.x - mx
                    const dy = note.y - my
                    const dist = Math.hypot(dx, dy)
                    if (dist < REPEL_RADIUS && dist > 1) {
                        const f = ((REPEL_RADIUS - dist) / REPEL_RADIUS) ** 2 * REPEL_FORCE
                        note.vy += (dy / dist) * f
                    }
                }
                note.y += note.vy
                note.x += note.speed
                if (note.x > W + 40) note.x = -40
                const norm = note.x / W
                const edgeFade = Math.min(norm / 0.10, 1) * Math.min((1 - norm) / 0.10, 1)
                const alpha = Math.max(0, note.opacity * edgeFade)
                if (alpha < 0.02) return
                ctx.fillStyle = `rgba(${noteRgb}, ${alpha})`
                ctx.strokeStyle = `rgba(${noteRgb}, ${alpha * 0.82})`
                ctx.lineWidth = 1.2
                ctx.shadowBlur = isDark ? 9 : 5
                ctx.shadowColor = glowCol
                switch (note.type) {
                    case 'quarter': drawQuarter(ctx, note.x, note.y, note.size); break
                    case 'eighth': drawEighth(ctx, note.x, note.y, note.size); break
                    case 'sixteenth': drawSixteenth(ctx, note.x, note.y, note.size); break
                    case 'clef': drawClef(ctx, note.x, note.y, note.size, alpha, noteRgb); break
                    default: break
                }
                ctx.shadowBlur = 0
            })
            time += 0.016
            animId = requestAnimationFrame(draw)
        }
        animId = requestAnimationFrame(draw)
        return () => {
            cancelAnimationFrame(animId)
            ro.disconnect()
            notesRef.current = []  
        }
    }, [isDark])
    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                width: '100%',
                height: '280px',       
                background: 'var(--color-bg)',
                position: 'relative',
                cursor: 'crosshair',
                zIndex: 0,            
            }}
        >
            <canvas
                ref={canvasRef}
                aria-hidden="true"
                style={{
                    width: '100%',
                    height: '180px', 
                    display: 'block',
                    pointerEvents: 'none',
                }}
            />
        </div>
    )
}
