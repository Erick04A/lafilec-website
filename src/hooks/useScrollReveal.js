import { useEffect, useRef, useState } from 'react'
export default function useScrollReveal({ delay = 0, once = true, threshold = 0.1 } = {}) {
    const elementRef = useRef(null)
    const [isRevealed, setIsRevealed] = useState(false)
    useEffect(() => {
        const element = elementRef.current
        if (!element) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        console.log('🎯 Scroll Reveal: Element revealed', { delay, threshold, element })
                        setIsRevealed(true)
                    }, delay)
                    if (once) {
                        observer.disconnect()
                    }
                }
            },
            {
                threshold,
                rootMargin: '0px 0px -20px 0px' 
            }
        )
        observer.observe(element)
        return () => {
            if (observer) {
                observer.disconnect()
            }
        }
    }, [delay, once, threshold])
    return { ref: elementRef, isRevealed }
}
