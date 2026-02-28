import React, { useState, useMemo, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useLanguage } from '../store/LanguageContext'
import { Download, X, Minus, Plus, MessageCircle } from 'lucide-react'
import CardSkeleton from './CardSkeleton'
import useScrollReveal from '../hooks/useScrollReveal'

import imgStickers from '../assets/shop/stickers.webp'
import imgPlushies from '../assets/shop/peluche.png'
const imgCookies = 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80'

export default function Services() {
    const { t } = useLanguage()
    const [activeCategory, setActiveCategory] = useState(null)
    const [cart, setCart] = useState({})
    const [loading, setLoading] = useState(true)
    const [imageLoaded, setImageLoaded] = useState({})
    const [isHoveringTotal, setIsHoveringTotal] = useState(false)

    // --- ECLIPSE MODE: Reservation Logic ---
    const THREE_HOURS = 3 * 60 * 60 * 1000
    const [reservations, setReservations] = useState(() => {
        try {
            const saved = localStorage.getItem('lafil_reservations')
            return saved ? JSON.parse(saved) : {}
        } catch (e) {
            return {}
        }
    })

    useEffect(() => {
        const timer = setInterval(() => {
            const now = Date.now()
            setReservations(prev => {
                const updated = { ...prev }
                let changed = false
                Object.keys(updated).forEach(id => {
                    if (now - updated[id] > THREE_HOURS) {
                        delete updated[id]
                        changed = true
                    }
                })
                if (changed) {
                    localStorage.setItem('lafil_reservations', JSON.stringify(updated))
                    return updated
                }
                return prev
            })
        }, 30000) // Pulse check every 30s
        return () => clearInterval(timer)
    }, [])
    // ----------------------------------------

    // Scroll reveal hooks for event cards only (3 cards)
    // Collection cards will be always visible for reliability
    const eventCard1 = useScrollReveal({ delay: 0 })
    const eventCard2 = useScrollReveal({ delay: 100 })
    const eventCard3 = useScrollReveal({ delay: 200 })

    useEffect(() => {
        // Simulated loading - remove or connect to real API in the future
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1200)

        return () => clearTimeout(timer)
    }, [])

    const categories = {
        stickers: {
            data: t.shop.inventory.stickers,
            img: imgStickers,
            title: t.shop.sticker.title
        },
        plushies: {
            data: t.shop.inventory.plushies,
            img: imgPlushies,
            title: t.shop.plushie.title
        },
        cookies: {
            data: t.shop.inventory.cookies,
            img: imgCookies,
            title: t.shop.cookie.title
        }
    }

    const updateQuantity = (id, delta) => {
        setCart(prev => {
            const current = prev[id] || 0

            // Hardware-level stock limit: Plushies = 1 unit
            const inventoryPlushies = t?.shop?.inventory?.plushies || []
            const isPlushie = inventoryPlushies.some(p => p.id === id)
            const maxStock = isPlushie ? 1 : Infinity

            if (delta > 0 && current >= maxStock) return prev

            const next = Math.max(0, current + delta)
            if (next === 0) {
                const { [id]: _, ...rest } = prev
                return rest
            }
            return { ...prev, [id]: next }
        })
    }

    const { totalItems, totalPrice } = useMemo(() => {
        let count = 0
        let price = 0

        const inventoryStickers = t?.shop?.inventory?.stickers || []
        const inventoryPlushies = t?.shop?.inventory?.plushies || []
        const inventoryCookies = t?.shop?.inventory?.cookies || []

        const allProducts = [
            ...inventoryStickers,
            ...inventoryPlushies,
            ...inventoryCookies
        ]

        Object.entries(cart).forEach(([id, qty]) => {
            const prod = allProducts.find(p => p.id === id)
            if (prod && !prod.isCustom) {
                const itemQty = Number(qty) || 0
                const itemPrice = parseFloat(prod.price) || 0
                count += itemQty
                price += itemPrice * itemQty
            }
        })
        return { totalItems: count, totalPrice: price.toFixed(2) }
    }, [cart, t.shop.inventory])

    const handleCheckout = () => {
        const allProducts = [
            ...t.shop.inventory.stickers,
            ...t.shop.inventory.plushies,
            ...t.shop.inventory.cookies
        ]

        let message = `${t.shop.msg_intro}\n`
        const newReservations = { ...reservations }
        let hasPlushies = false

        Object.entries(cart).forEach(([id, qty]) => {
            const prod = allProducts.find(p => p.id === id)
            if (prod) {
                message += `- ${qty}x ${prod.title} ($${prod.price})\n`

                // Mark plushies as reserved in Eclipse Mode
                const isPlushie = t.shop.inventory.plushies.some(p => p.id === id)
                if (isPlushie) {
                    newReservations[id] = Date.now()
                    hasPlushies = true
                }
            }
        })
        message += `\n${t.shop.msg_total} $${totalPrice}`

        if (hasPlushies) {
            setReservations(newReservations)
            localStorage.setItem('lafil_reservations', JSON.stringify(newReservations))
            // Transparently clear cart for reserved items to prevent double booking in same session
            setCart({})
        }

        window.open(`https://wa.me/593998770378?text=${encodeURIComponent(message)}`, '_blank')
    }

    return (
        <section id="curations" className="services-section" style={{ paddingTop: '0.5rem', marginTop: '-4.5rem', position: 'relative', zIndex: 10 }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>


                <div style={{ marginBottom: '6rem', textAlign: 'center', position: 'relative', zIndex: 20 }}>
                    <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem', fontFamily: 'var(--font-title)', fontWeight: '800' }}>
                        {t.events.title}
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        {t.events.subtitle}
                    </p>
                    <div style={{ width: '60px', height: '4px', background: 'var(--color-primary)', margin: '0 auto' }}></div>
                </div>


                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2.5rem',
                    marginBottom: '8rem',
                    padding: '0 10px'
                }}>

                    <div
                        ref={eventCard1.ref}
                        className={`scroll-reveal ${eventCard1.isRevealed ? 'revealed' : ''}`}
                        style={{
                            background: 'var(--card-bg, #fff)',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: 'var(--card-shadow, 0 0 15px rgba(196, 216, 46, 0.2))',
                            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            willChange: 'transform, opacity',
                            cursor: 'default',
                            border: '1px solid var(--color-divider)',
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: '400px'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 0 30px rgba(196, 216, 46, 0.4)';
                            e.currentTarget.style.zIndex = '10';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 0 15px rgba(196, 216, 46, 0.2)';
                            e.currentTarget.style.zIndex = '1';
                        }}
                    >
                        <div style={{ aspectRatio: '4/3', overflow: 'hidden', background: '#F9F9F9' }}>
                            <img
                                src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80"
                                alt={t.events.items[0].name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        <div style={{ padding: '0.6rem 1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.2rem', fontFamily: 'var(--font-title)', fontWeight: '700', color: 'var(--color-text)' }}>
                                {t.events.items[0].name}
                            </h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p className="event-date" style={{ fontSize: '0.85rem', color: 'var(--color-text)', fontWeight: '700', transition: 'text-shadow 0.3s' }}>
                                    {t.events.items[0].date}
                                </p>
                                <p style={{ fontSize: '0.8rem', color: 'var(--color-text)', opacity: 0.8 }}>
                                    {t.events.items[0].location}
                                </p>
                            </div>
                        </div>
                    </div>


                    <div
                        ref={eventCard2.ref}
                        className={`scroll-reveal ${eventCard2.isRevealed ? 'revealed' : ''}`}
                        style={{
                            background: 'var(--card-bg, #fff)',
                            borderRadius: '12px',
                            boxShadow: 'var(--card-shadow, 0 0 15px rgba(196, 216, 46, 0.2))',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            willChange: 'transform, opacity',
                            cursor: 'default',
                            border: '1px solid var(--color-divider)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '2rem 1.5rem',
                            height: '300px',
                            alignSelf: 'center'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-8px)';
                            e.currentTarget.style.boxShadow = '0 0 30px rgba(196, 216, 46, 0.4)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 0 15px rgba(196, 216, 46, 0.2)';
                        }}
                    >
                        <div className="bounce-icon">
                            <Download size={64} style={{ color: '#C4D82E', marginBottom: '2rem' }} />
                        </div>
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', fontFamily: 'var(--font-title)', fontWeight: '700', textAlign: 'center', color: '#1A2238' }}>
                            {t.events.program_card.title}
                        </h3>
                        <p style={{ color: '#666', lineHeight: 1.6, marginBottom: '2rem', fontSize: '0.95rem', textAlign: 'center', maxWidth: '280px' }}>
                            {t.events.program_card.desc}
                        </p>
                        <a
                            href="/program_placeholder.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: '#C4D82E',
                                color: '#000000',
                                border: 'none',
                                borderRadius: '50px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                fontSize: '0.95rem',
                                display: 'inline-block'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.boxShadow = '0 0 20px rgba(196, 216, 46, 0.5)'
                                e.currentTarget.style.transform = 'scale(1.05)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.boxShadow = 'none'
                                e.currentTarget.style.transform = 'scale(1)'
                            }}
                        >
                            {t.events.btn_program}
                        </a>
                    </div>


                    <div
                        ref={eventCard3.ref}
                        className={`scroll-reveal ${eventCard3.isRevealed ? 'revealed' : ''}`}
                        style={{
                            background: 'var(--card-bg, #fff)',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: 'var(--card-shadow, 0 0 15px rgba(196, 216, 46, 0.2))',
                            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            willChange: 'transform, opacity',
                            cursor: 'default',
                            border: '1px solid var(--color-divider)',
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: '400px'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 0 30px rgba(196, 216, 46, 0.4)';
                            e.currentTarget.style.zIndex = '10';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 0 15px rgba(196, 216, 46, 0.2)';
                            e.currentTarget.style.zIndex = '1';
                        }}
                    >
                        <div style={{ aspectRatio: '4/3', overflow: 'hidden', background: '#F9F9F9' }}>
                            <img
                                src={t.events.items[1].img}
                                alt={t.events.items[1].name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        <div style={{ padding: '0.6rem 1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.2rem', fontFamily: 'var(--font-title)', fontWeight: '700', color: 'var(--color-text)' }}>
                                {t.events.items[1].name}
                            </h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p className="event-date" style={{ fontSize: '0.85rem', color: 'var(--color-text)', fontWeight: '700', transition: 'text-shadow 0.3s' }}>
                                    {t.events.items[1].date}
                                </p>
                                <p style={{ fontSize: '0.8rem', color: 'var(--color-text)', opacity: 0.8 }}>
                                    {t.events.items[1].location}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


                <div style={{ marginBottom: '0rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3rem', borderBottom: '1px solid var(--color-divider)', paddingBottom: '1rem' }}>
                        <h3 className="section-title-collection" style={{ fontSize: '2rem', fontFamily: 'var(--font-title)', fontWeight: '700', color: '#1A1A1A' }}>{t.shop.title}</h3>
                        <div style={{ textAlign: 'right' }}>
                            <span className="collection-label" style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-primary)', display: 'block' }}>{t.shop.collectionLabel}</span>
                            {totalItems > 0 && (
                                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1A1A1A', display: 'block', marginTop: '0.5rem' }}>
                                    {t.shop.total}: ${totalPrice}
                                </span>
                            )}
                        </div>
                    </div>


                    <div className="services-grid">
                        {loading ? (
                            [1, 2, 3].map((i) => (
                                <CardSkeleton key={`skeleton-${i}`} type="product" />
                            ))
                        ) : (
                            [
                                {
                                    key: 'stickers',
                                    title: t.shop.sticker.title,
                                    desc: t.shop.sticker.desc,
                                    price: '1.00',
                                    img: imgStickers,
                                },
                                {
                                    key: 'plushies',
                                    title: t.shop.plushie.title,
                                    desc: t.shop.plushie.desc,
                                    price: '1.99',
                                    img: imgPlushies,
                                },
                                {
                                    key: 'cookies',
                                    title: t.shop.cookie.title,
                                    desc: t.shop.cookie.desc,
                                    price: '1.50',
                                    img: imgCookies,
                                    isCookie: true,
                                }
                            ].map((item) => {
                                const isReserved = item.key === 'plushies' && Object.keys(reservations).some(id =>
                                    t.shop.inventory.plushies.some(p => p.id === id)
                                )
                                // Note: For the main card, if ANY plushie is reserved we could show a partial state, 
                                // but the prompt asks for the card to reflect reservation. 
                                // In the 3-category view, if all plushies are limited to 1, we check if ALL are reserved?
                                // Actually, typically users reserve specific models. If we are in the category view (3 cards),
                                // it's better to show the grayscale if the category is "blocked" or just apply it inside the modal.
                                // However, the user said "tarjeta en la colección".

                                return (
                                    <div
                                        key={item.key}
                                        className="collection-card"
                                        onClick={() => setActiveCategory(item.key)}
                                    >
                                        <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                                            <img
                                                src={item.img}
                                                alt={item.title}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                                                className={`hardware-accelerated img-fade-in ${imageLoaded[item.key] ? 'img-loaded' : ''}`}
                                                loading="lazy"
                                                decoding="async"
                                                onLoad={() => setImageLoaded(prev => ({ ...prev, [item.key]: true }))}
                                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                            />
                                        </div>

                                        <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                                    <h4 className="product-title" style={{ fontSize: '1.4rem', fontWeight: '800', fontFamily: 'var(--font-title)', color: 'var(--color-text)' }}>{item.title}</h4>
                                                    <span className="product-price" style={{ fontSize: '0.9rem', color: 'var(--color-text)', opacity: 0.7 }}>{t.shop.price_from} ${item.price}</span>
                                                </div>
                                                <p className="product-desc" style={{ color: 'var(--color-text)', opacity: 0.8, marginBottom: '1.5rem', lineHeight: '1.4' }}>{item.desc}</p>

                                                {item.isCookie && (
                                                    <div className="promo-badge">
                                                        <span style={{ display: 'block', fontWeight: '700', color: 'var(--color-primary)', marginBottom: '0.2rem' }}>PROMO</span>
                                                        {t.shop.promo}
                                                    </div>
                                                )}
                                            </div>

                                            <button onClick={() => {
                                                setActiveCategory(item.key)
                                            }} className="neon-btn collection-btn" style={{
                                                padding: '0.85rem 2rem',
                                                // background/color handled by class
                                                borderRadius: '10px',
                                                cursor: 'pointer',
                                                fontWeight: '700',
                                                fontSize: '0.9rem',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.08em',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                fontFamily: 'var(--font-title)'
                                            }}>
                                                {t.shop.btn_catalog}
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>


                    {totalItems > 0 && (
                        <div style={{
                            position: 'fixed',
                            bottom: '2rem',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 1000,
                            animation: 'slideUp 0.3s ease-out'
                        }}>
                            <button
                                onClick={handleCheckout}
                                style={{
                                    background: '#25D366',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '1rem 3rem',
                                    borderRadius: '50px',
                                    fontWeight: '700',
                                    fontSize: '1.1rem',
                                    cursor: 'pointer',
                                    boxShadow: '0 10px 30px rgba(37, 211, 102, 0.5)',
                                    transition: 'transform 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                {t.shop.btn_order} • ${totalPrice}
                            </button>
                        </div>
                    )}
                </div>


            </div>


            {
                activeCategory && ReactDOM.createPortal(
                    <div
                        className="detail-overlay"
                        onClick={e => e.stopPropagation()}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100vh',
                            background: 'rgba(255,255,255,0.98)',
                            zIndex: 9990,
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '2rem',
                            overflowY: 'auto'
                        }}
                    >
                        <button
                            type="button"
                            id="detail-panel-close"
                            className="detail-close-btn"
                            onClick={e => {
                                e.stopPropagation()
                                setActiveCategory(null)
                            }}
                            aria-label="Cerrar panel"
                            style={{
                                position: 'fixed',
                                top: '1.5rem',
                                right: '1.5rem',
                                background: '#1A1A1A',
                                color: '#fff',
                                border: '2px solid transparent',
                                borderRadius: '50%',
                                width: '52px',
                                height: '52px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 5px 20px rgba(0,0,0,0.35)',
                                zIndex: 9999,
                                flexShrink: 0,
                            }}
                        >
                            <X size={24} />
                        </button>

                        <div style={{ maxWidth: '1200px', width: '100%', margin: '4rem auto', paddingBottom: '100px' }}>
                            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                                <h2 className="detail-title" style={{
                                    fontSize: 'clamp(2rem, 5vw, 3rem)',
                                    marginBottom: '1rem',
                                    fontFamily: 'var(--font-title)',
                                    fontWeight: '800',
                                    color: '#1A1A1A'
                                }}>
                                    {categories[activeCategory].title}
                                </h2>
                                {totalItems > 0 && (
                                    <div className="detail-total-badge" style={{
                                        display: 'inline-block',
                                        background: 'var(--color-primary)',
                                        padding: '0.5rem 1.5rem',
                                        borderRadius: '50px',
                                        fontWeight: 'bold',
                                        fontSize: '1.2rem',
                                        color: '#1A1A1A'
                                    }}>
                                        {t.shop.total}: ${totalPrice}
                                    </div>
                                )}
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: '2rem'
                            }}>
                                {categories[activeCategory].data.map((product) => {
                                    const quantity = cart[product.id] || 0
                                    return (
                                        <div key={product.id} style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '1rem'
                                        }}>

                                            <div style={{
                                                borderRadius: '16px',
                                                overflow: 'hidden',
                                                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                                                background: '#fff',
                                                aspectRatio: '1',
                                                position: 'relative',
                                                cursor: 'pointer',
                                                filter: reservations[product.id] ? 'grayscale(1) opacity(0.6)' : 'none'
                                            }}
                                                className="product-card"
                                            >
                                                <img
                                                    src={product.img || categories[activeCategory].img}
                                                    alt={product.title}
                                                    className="product-img hardware-accelerated"
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'contain',
                                                        padding: '1.5rem',
                                                        transition: 'transform 0.5s ease',
                                                        filter: reservations[product.id] ? 'grayscale(1) opacity(0.6)' : 'none'
                                                    }}
                                                    loading="lazy"
                                                    decoding="async"
                                                />

                                                <div style={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '4px',
                                                    background: 'linear-gradient(90deg, transparent, #FFD700, transparent)',
                                                    opacity: 0.5
                                                }}></div>
                                            </div>


                                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0.5rem' }}>
                                                <div>
                                                    <h4 className="product-title-label" style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.2rem', color: '#1A1A1A' }}>{product.title}</h4>


                                                    <p className="product-price-label" style={{
                                                        fontSize: '1.2rem',
                                                        color: '#B38728',
                                                        fontWeight: '700',
                                                        marginBottom: '0.5rem',
                                                        fontFamily: 'var(--font-heading)',
                                                        filter: reservations[product.id] ? 'grayscale(1)' : 'none'
                                                    }}>
                                                        {product.isCustom ? 'Precio a consultar' : `Precio: $${product.price}`}
                                                    </p>

                                                    {reservations[product.id] && (
                                                        <div style={{
                                                            background: 'rgba(0,0,0,0.05)',
                                                            borderLeft: '4px solid #C4D82E',
                                                            padding: '0.8rem',
                                                            marginTop: '1rem',
                                                            borderRadius: '4px'
                                                        }}>
                                                            <p style={{
                                                                color: 'var(--color-text)',
                                                                fontWeight: '800',
                                                                fontSize: '0.9rem',
                                                                margin: 0,
                                                                textTransform: 'uppercase',
                                                                letterSpacing: '0.05em'
                                                            }}>
                                                                PRODUCTO EN PROCESO DE COMPRA
                                                            </p>
                                                            <p style={{
                                                                color: 'var(--color-text)',
                                                                fontSize: '0.75rem',
                                                                opacity: 0.7,
                                                                margin: '0.3rem 0 0 0'
                                                            }}>
                                                                Si la venta no se concreta, volverá a estar disponible en unas horas.
                                                            </p>
                                                        </div>
                                                    )}

                                                    <p className="product-desc-text" style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem', lineHeight: '1.4' }}>{product.desc}</p>
                                                </div>


                                                {product.isCustom ? (
                                                    <button
                                                        onClick={() => window.open(`https://wa.me/593998770378?text=Hola LA FIL, estoy interesado en los Stickers Personalizados.`, '_blank')}
                                                        style={{
                                                            width: '100%',
                                                            padding: '0.8rem',
                                                            background: '#1A1A1A',
                                                            color: '#FFD700',
                                                            border: '1px solid #FFD700',
                                                            borderRadius: '50px',
                                                            fontWeight: '600',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.3s',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            gap: '0.5rem',
                                                            marginTop: 'auto'
                                                        }}
                                                        onMouseEnter={e => {
                                                            e.currentTarget.style.boxShadow = '0 0 15px #C4D82E'
                                                            e.currentTarget.style.color = '#C4D82E'
                                                            e.currentTarget.style.borderColor = '#C4D82E'
                                                        }}
                                                        onMouseLeave={e => {
                                                            e.currentTarget.style.boxShadow = 'none'
                                                            e.currentTarget.style.color = '#FFD700'
                                                            e.currentTarget.style.borderColor = '#FFD700'
                                                        }}
                                                    >

                                                        Cotizar en WhatsApp
                                                    </button>
                                                ) : reservations[product.id] ? null : (
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                                                        <div className="quantity-selector" style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            gap: '1.5rem',
                                                            background: '#FAFAFA',
                                                            borderRadius: '12px',
                                                            padding: '0.5rem',
                                                            border: '1px solid #E0E0E0'
                                                        }}>
                                                            <button onClick={() => updateQuantity(product.id, -1)} style={{
                                                                width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
                                                            }}
                                                                onMouseEnter={e => e.currentTarget.style.background = '#f0f0f0'}
                                                                onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                                                            >
                                                                <Minus size={16} />
                                                            </button>
                                                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1A1A1A', minWidth: '30px', textAlign: 'center' }}>{quantity}</span>
                                                            <button
                                                                disabled={activeCategory === 'plushies' && quantity >= 1}
                                                                onClick={() => updateQuantity(product.id, 1)}
                                                                style={{
                                                                    width: '36px', height: '36px', borderRadius: '50%', border: 'none', background: '#1A1A1A', cursor: (activeCategory === 'plushies' && quantity >= 1) ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.2)', transition: 'all 0.3s',
                                                                    opacity: (activeCategory === 'plushies' && quantity >= 1) ? 0.3 : 1
                                                                }}
                                                                onMouseEnter={e => {
                                                                    if (activeCategory === 'plushies' && quantity >= 1) return
                                                                    e.currentTarget.style.transform = 'scale(1.1)'
                                                                    e.currentTarget.style.boxShadow = '0 0 10px #C4D82E'
                                                                    e.currentTarget.style.borderColor = '#C4D82E'
                                                                }}
                                                                onMouseLeave={e => {
                                                                    if (activeCategory === 'plushies' && quantity >= 1) return
                                                                    e.currentTarget.style.transform = 'scale(1)'
                                                                    e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)'
                                                                    e.currentTarget.style.borderColor = 'transparent'
                                                                }}
                                                            >
                                                                <Plus size={16} color="#FFD700" />
                                                            </button>
                                                        </div>

                                                        {activeCategory === 'plushies' && quantity >= 1 && (
                                                            <p style={{
                                                                color: '#C4D82E', // Neon Yellow/Green Alerta
                                                                fontSize: '0.75rem',
                                                                marginTop: '0.4rem',
                                                                fontWeight: '700',
                                                                textAlign: 'center',
                                                                textShadow: '0 0 8px rgba(196, 216, 46, 0.5)',
                                                                animation: 'fadeIn 0.3s ease-out'
                                                            }}>
                                                                ¡Última unidad disponible!
                                                            </p>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            {totalItems > 0 && (
                                <div style={{
                                    position: 'fixed',
                                    bottom: '2.5rem',
                                    right: '2.5rem',
                                    zIndex: 10000,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    gap: '1rem'
                                }}>
                                    {isHoveringTotal && (
                                        <div style={{
                                            background: 'rgba(0, 0, 0, 0.85)',
                                            backdropFilter: 'blur(8px)',
                                            color: '#C4D82E',
                                            padding: '0.8rem 1.5rem',
                                            borderRadius: '12px',
                                            fontSize: '1rem',
                                            fontWeight: '800',
                                            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                                            animation: 'slideUp 0.3s ease-out',
                                            whiteSpace: 'nowrap',
                                            border: '1px solid rgba(196, 216, 46, 0.4)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em'
                                        }}>
                                            Total a pagar: ${totalPrice}
                                        </div>
                                    )}
                                    <button
                                        onClick={handleCheckout}
                                        onMouseEnter={() => setIsHoveringTotal(true)}
                                        onMouseLeave={() => setIsHoveringTotal(false)}
                                        style={{
                                            background: '#25D366',
                                            color: '#fff',
                                            border: 'none',
                                            width: '72px',
                                            height: '72px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            boxShadow: '0 0 20px rgba(37, 211, 102, 0.7), 0 0 40px rgba(37, 211, 102, 0.3)',
                                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                            transform: isHoveringTotal ? 'scale(1.15) rotate(5deg)' : 'scale(1)',
                                            padding: 0
                                        }}
                                        aria-label="Finalizar compra por WhatsApp"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            width="40"
                                            height="40"
                                            fill="currentColor"
                                        >
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    , document.body)
            }
        </section >
    )
}
