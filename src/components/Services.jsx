import React, { useState, useMemo } from 'react'
import { useLanguage } from '../store/LanguageContext'
import { Download, X, Minus, Plus } from 'lucide-react'

// Local Assets for Collection
import imgStickers from '../assets/shop/stickers.jpg'
import imgPlushies from '../assets/shop/peluche.jpg'
const imgCookies = 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80' // Artisan cookies

export default function Services() {
    const { t } = useLanguage()
    const [activeCategory, setActiveCategory] = useState(null)
    const [cart, setCart] = useState({}) // { productId: quantity }

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
        // Iterate all categories to find products matching cart keys
        const allProducts = [
            ...t.shop.inventory.stickers,
            ...t.shop.inventory.plushies,
            ...t.shop.inventory.cookies
        ]

        Object.entries(cart).forEach(([id, qty]) => {
            const prod = allProducts.find(p => p.id === id)
            if (prod && !prod.isCustom) {
                count += qty
                price += parseFloat(prod.price) * qty
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
        Object.entries(cart).forEach(([id, qty]) => {
            const prod = allProducts.find(p => p.id === id)
            if (prod) {
                message += `- ${qty}x ${prod.title} ($${prod.price})\n`
            }
        })
        message += `\n${t.shop.msg_total} $${totalPrice}`

        window.open(`https://wa.me/593998770378?text=${encodeURIComponent(message)}`, '_blank')
    }

    return (
        <section id="curations" style={{ padding: '8rem 2rem', background: '#F9F9F9', color: '#1A1A1A' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                {/* Events Header */}
                <div style={{ marginBottom: '6rem', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '3rem', marginBottom: '1rem', fontFamily: 'var(--font-title)', fontWeight: '800' }}>
                        {t.events.title}
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        {t.events.subtitle}
                    </p>
                    <div style={{ width: '60px', height: '4px', background: 'var(--color-primary)', margin: '0 auto' }}></div>
                </div>

                {/* 3-Card Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '2.5rem',
                    marginBottom: '8rem'
                }}>
                    {/* Event Card 1 */}
                    <div
                        style={{
                            background: '#fff',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 0 15px rgba(196, 216, 46, 0.2)', // Neon glow
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            cursor: 'default',
                            border: '1px solid #C4D82E', // Neon Border
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: '400px' // Revert to reasonable flexible height
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
                        <div style={{ height: '480px', overflow: 'hidden', background: '#F9F9F9' }}>
                            <img
                                src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80"
                                alt={t.events.items[0].name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                loading="lazy"
                            />
                        </div>
                        <div style={{ padding: '0.6rem 1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.2rem', fontFamily: 'var(--font-title)', fontWeight: '700', color: '#1A2238' }}>
                                {t.events.items[0].name}
                            </h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p style={{ fontSize: '0.85rem', color: '#1A2238', fontWeight: '700' }}>
                                    {t.events.items[0].date}
                                </p>
                                <p style={{ fontSize: '0.8rem', color: '#666' }}>
                                    {t.events.items[0].location}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* PDF Program Card */}
                    <div
                        style={{
                            background: '#fff',
                            borderRadius: '12px',
                            boxShadow: '0 0 15px rgba(196, 216, 46, 0.2)', // Neon glow
                            transition: 'all 0.3s ease',
                            cursor: 'default',
                            border: '1px solid #C4D82E', // Neon Border
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '2rem 1.5rem',
                            height: '300px', // Fixed compact height
                            alignSelf: 'center' // Prevent grid stretching
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
                                background: '#C4D82E', // Neon Green
                                color: '#000000', // Black Text
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

                    {/* Event Card 2 */}
                    <div
                        style={{
                            background: '#fff',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 0 15px rgba(196, 216, 46, 0.2)',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            cursor: 'default',
                            border: '1px solid #C4D82E',
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
                        <div style={{ height: '480px', overflow: 'hidden', background: '#F9F9F9' }}>
                            <img
                                src={t.events.items[1].img}
                                alt={t.events.items[1].name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                loading="lazy"
                            />
                        </div>
                        <div style={{ padding: '0.6rem 1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.2rem', fontFamily: 'var(--font-title)', fontWeight: '700', color: '#1A2238' }}>
                                {t.events.items[1].name}
                            </h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p style={{ fontSize: '0.85rem', color: '#1A2238', fontWeight: '700' }}>
                                    {t.events.items[1].date}
                                </p>
                                <p style={{ fontSize: '0.8rem', color: '#666' }}>
                                    {t.events.items[1].location}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Shop Mini-Store (Human & Professional) */}
                <div style={{ marginBottom: '8rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3rem', borderBottom: '1px solid #ddd', paddingBottom: '1rem' }}>
                        <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-title)', fontWeight: '700', color: '#1A1A1A' }}>{t.shop.title}</h3>
                        <div style={{ textAlign: 'right' }}>
                            <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-primary)', display: 'block' }}>Collection 2026</span>
                            {totalItems > 0 && (
                                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1A1A1A', display: 'block', marginTop: '0.5rem' }}>
                                    {t.shop.total}: ${totalPrice}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Main Categories Grid */}
                    <div className="services-grid">
                        {[
                            {
                                key: 'stickers',
                                title: t.shop.sticker.title,
                                desc: t.shop.sticker.desc,
                                price: '3.00',
                                img: imgStickers,
                            },
                            {
                                key: 'plushies',
                                title: t.shop.plushie.title,
                                desc: t.shop.plushie.desc,
                                price: '15.00',
                                img: imgPlushies,
                            },
                            {
                                key: 'cookies',
                                title: t.shop.cookie.title,
                                desc: t.shop.cookie.desc,
                                price: '2.00',
                                img: imgCookies,
                                isCookie: true,
                            }
                        ].map((item) => (
                            <div key={item.key} style={{
                                background: '#fff',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.05)', // Soft shadow
                                border: '1px solid #E0E0E0', // Subtle grey border
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                                onClick={() => setActiveCategory(item.key)}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'translateY(-10px)';
                                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(196, 216, 46, 0.2)';
                                    e.currentTarget.style.borderColor = '#C4D82E';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
                                    e.currentTarget.style.borderColor = '#E0E0E0';
                                }}
                            >
                                <div style={{ height: '240px', overflow: 'hidden' }}>
                                    <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                        loading="lazy"
                                    />
                                </div>

                                <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                            <h4 style={{ fontSize: '1.4rem', fontWeight: '800', fontFamily: 'var(--font-title)', color: '#1A1A1A' }}>{item.title}</h4>
                                            <span style={{ fontSize: '0.9rem', color: '#666' }}>{t.shop.price_from} ${item.price}</span>
                                        </div>
                                        <p style={{ color: '#555', marginBottom: '1.5rem', lineHeight: '1.4' }}>{item.desc}</p>

                                        {item.isCookie && (
                                            <div style={{
                                                background: '#FFFEF2',
                                                border: '1px solid var(--color-primary)',
                                                borderRadius: '8px',
                                                padding: '0.5rem',
                                                marginBottom: '1.5rem',
                                                fontSize: '0.85rem',
                                                color: '#555'
                                            }}>
                                                <span style={{ display: 'block', fontWeight: '700', color: 'var(--color-primary)', marginBottom: '0.2rem' }}>PROMO</span>
                                                {t.shop.promo}
                                            </div>
                                        )}
                                    </div>

                                    <button style={{
                                        padding: '0.8rem 1.5rem',
                                        background: '#000',
                                        color: '#fff',
                                        border: '1px solid #FFD700',
                                        borderRadius: '50px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        transition: 'all 0.3s'
                                    }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.boxShadow = '0 0 15px #FFD700'
                                            e.currentTarget.style.color = '#FFD700'
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.boxShadow = 'none'
                                            e.currentTarget.style.color = '#fff'
                                        }}
                                    >
                                        {t.shop.btn_catalog}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sticky Checkout Button - Main Shop View */}
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

            {/* Shop Modal */}
            {activeCategory && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(255,255,255,0.98)',
                    zIndex: 2000,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '2rem',
                    overflowY: 'auto'
                }}>
                    <button
                        onClick={() => setActiveCategory(null)}
                        style={{
                            position: 'fixed',
                            top: '2rem',
                            right: '2rem',
                            background: '#1A1A1A',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '50%',
                            width: '50px',
                            height: '50px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                            zIndex: 2010
                        }}
                    >
                        <X size={24} />
                    </button>

                    <div style={{ maxWidth: '1200px', width: '100%', margin: '4rem auto', paddingBottom: '100px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <h2 style={{
                                fontSize: '3rem',
                                marginBottom: '1rem',
                                fontFamily: 'var(--font-title)',
                                fontWeight: '800',
                                color: '#1A1A1A'
                            }}>
                                {categories[activeCategory].title}
                            </h2>
                            {totalItems > 0 && (
                                <div style={{
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
                                        {/* Product Image Container with Zoom */}
                                        <div style={{
                                            borderRadius: '16px',
                                            overflow: 'hidden',
                                            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                                            background: '#fff',
                                            aspectRatio: '1',
                                            position: 'relative',
                                            cursor: 'pointer'
                                        }}
                                            className="product-card"
                                        >
                                            <img
                                                src={product.img || categories[activeCategory].img}
                                                alt={product.title}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'contain',
                                                    padding: '1.5rem',
                                                    transition: 'transform 0.5s ease'
                                                }}
                                                className="product-img"
                                                loading="lazy"
                                            />
                                            {/* Price Tag Removed from here */}
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

                                        {/* Product Details & Quantity Control */}
                                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0.5rem' }}>
                                            <div>
                                                <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.2rem', color: '#1A1A1A' }}>{product.title}</h4>

                                                {/* Price Moved Here - Left Aligned */}
                                                <p style={{
                                                    fontSize: '1.2rem',
                                                    color: '#B38728',
                                                    fontWeight: '700',
                                                    marginBottom: '0.5rem',
                                                    fontFamily: 'var(--font-heading)'
                                                }}>
                                                    {product.isCustom ? 'Precio a consultar' : `Precio: $${product.price}`}
                                                </p>

                                                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem', lineHeight: '1.4' }}>{product.desc}</p>
                                            </div>

                                            {/* Logic for Custom vs Standard Items */}
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
                                            ) : (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                    {/* Quantity Selector - Clean & Centered */}
                                                    <div style={{
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
                                                            <Minus size={16} color="#1A1A1A" />
                                                        </button>
                                                        <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1A1A1A', minWidth: '30px', textAlign: 'center' }}>{quantity}</span>
                                                        <button onClick={() => updateQuantity(product.id, 1)} style={{
                                                            width: '36px', height: '36px', borderRadius: '50%', border: 'none', background: '#1A1A1A', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.2)', transition: 'all 0.3s'
                                                        }}
                                                            onMouseEnter={e => {
                                                                e.currentTarget.style.transform = 'scale(1.1)'
                                                                e.currentTarget.style.boxShadow = '0 0 10px #C4D82E'
                                                                e.currentTarget.style.borderColor = '#C4D82E'
                                                            }}
                                                            onMouseLeave={e => {
                                                                e.currentTarget.style.transform = 'scale(1)'
                                                                e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)'
                                                                e.currentTarget.style.borderColor = 'transparent'
                                                            }}
                                                        >
                                                            <Plus size={16} color="#FFD700" />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Sticky Footer for Checkout */}
                    {totalItems > 0 && (
                        <div style={{
                            position: 'fixed',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            padding: '1.5rem',
                            background: '#fff',
                            boxShadow: '0 -10px 30px rgba(0,0,0,0.1)',
                            textAlign: 'center',
                            zIndex: 2005
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
                                    boxShadow: '0 5px 20px rgba(37, 211, 102, 0.4)',
                                    transition: 'transform 0.2s'
                                }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                {t.shop.btn_order} (${totalPrice})
                            </button>
                        </div>
                    )}

                    <style>{`
                        .product-card:hover .product-img {
                            transform: scale(1.1);
                        }
                        
                        @keyframes bounce {
                            0%, 100% { transform: translateY(0); }
                            50% { transform: translateY(-10px); }
                        }
                        .bounce-icon {
                            animation: bounce 2s infinite ease-in-out;
                            display: flex;
                            justify-content: center;
                        }
                    `}</style>
                </div>
            )}
        </section>
    )
}
