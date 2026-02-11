import React from 'react'

export default function CardSkeleton({ type = 'product' }) {
    const baseSkeletonStyle = {
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 2s infinite ease-in-out',
        borderRadius: '8px'
    }

    if (type === 'collective') {
        return (
            <div style={{ marginTop: 0 }}>
                <div style={{
                    width: '100%',
                    height: '400px',
                    ...baseSkeletonStyle,
                    marginBottom: '1rem',
                    borderRadius: '4px'
                }}></div>
                <div style={{
                    width: '60%',
                    height: '24px',
                    ...baseSkeletonStyle,
                    marginBottom: '0.5rem'
                }}></div>
                <div style={{
                    width: '80%',
                    height: '16px',
                    ...baseSkeletonStyle,
                    marginTop: '0.5rem',
                    opacity: 0.7
                }}></div>
            </div>
        )
    }

    return (
        <div style={{
            background: '#fff',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            border: '1px solid #E0E0E0',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{
                height: '240px',
                ...baseSkeletonStyle,
                borderRadius: '0'
            }}></div>

            <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <div style={{
                        width: '70%',
                        height: '20px',
                        ...baseSkeletonStyle,
                        marginBottom: '1rem'
                    }}></div>
                    <div style={{
                        width: '100%',
                        height: '14px',
                        ...baseSkeletonStyle,
                        marginBottom: '0.5rem',
                        opacity: 0.8
                    }}></div>
                    <div style={{
                        width: '90%',
                        height: '14px',
                        ...baseSkeletonStyle,
                        marginBottom: '0.5rem',
                        opacity: 0.8
                    }}></div>
                    <div style={{
                        width: '60%',
                        height: '14px',
                        ...baseSkeletonStyle,
                        opacity: 0.8
                    }}></div>
                </div>

                <div style={{
                    width: '100%',
                    height: '48px',
                    ...baseSkeletonStyle,
                    borderRadius: '50px',
                    marginTop: '1.5rem'
                }}></div>
            </div>
        </div>
    )
}
