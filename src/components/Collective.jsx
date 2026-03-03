import React, { useState, useEffect } from 'react'
import { useLanguage } from '../store/LanguageContext'
import CardSkeleton from './CardSkeleton'
export default function Collective() {
    const { t } = useLanguage()
    const members = ['Leo', 'Max', 'Jake']
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1500)
        return () => clearTimeout(timer)
    }, [])
    return (
        <section id="collective" style={{ padding: '8rem 2rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h2 style={{
                    fontSize: '3rem',
                    marginBottom: '4rem',
                    borderLeft: '4px solid var(--color-primary)',
                    paddingLeft: '1rem',
                    fontFamily: 'var(--font-title)',
                    fontWeight: '700'
                }}>
                    {t.collective.title}
                </h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    alignItems: 'start'
                }}>
                    {loading ? (
                        members.map((name, i) => (
                            <div key={`skeleton-${i}`} style={{
                                marginTop: i % 2 !== 0 ? '4rem' : '0'
                            }}>
                                <CardSkeleton type="collective" />
                            </div>
                        ))
                    ) : (
                        members.map((name, i) => (
                            <div key={name} style={{
                                marginTop: i % 2 !== 0 ? '4rem' : '0'
                            }}>
                                <div style={{
                                    width: '100%',
                                    height: '400px',
                                    backgroundColor: '#e0e0e0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '1rem',
                                    borderRadius: '4px'
                                }}>
                                    <span style={{ color: '#999' }}>{t.collective.placeholder}: {name}</span>
                                </div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: '700' }}>{name}</h3>
                                <p style={{ fontSize: '0.9rem', opacity: 0.8, borderTop: '1px solid #ddd', paddingTop: '0.5rem' }}>
                                    {t.collective.role}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    )
}
