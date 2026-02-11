import { useEffect, useRef, useState } from 'react'

/**
 * Custom hook for scroll reveal animations using Intersection Observer
 * @param {Object} options - Configuration options
 * @param {number} options.delay - Delay in milliseconds before animation starts (for stagger effect)
 * @param {boolean} options.once - If true, animation fires only once
 * @param {number} options.threshold - Intersection threshold (0-1)
 * @returns {Object} - Ref to attach to element and revealed state
 */
export default function useScrollReveal({ delay = 0, once = true, threshold = 0.1 } = {}) {
    const elementRef = useRef(null)
    const [isRevealed, setIsRevealed] = useState(false)

    useEffect(() => {
        const element = elementRef.current
        if (!element) return

        // Create Intersection Observer
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Apply delay for stagger effect
                    setTimeout(() => {
                        console.log('🎯 Scroll Reveal: Element revealed', { delay, threshold, element })
                        setIsRevealed(true)
                    }, delay)

                    // Disconnect observer if once is true (optimization)
                    if (once) {
                        observer.disconnect()
                    }
                }
            },
            {
                threshold,
                rootMargin: '0px 0px -20px 0px' // Trigger earlier - reduced from -50px
            }
        )

        observer.observe(element)

        // Cleanup
        return () => {
            if (observer) {
                observer.disconnect()
            }
        }
    }, [delay, once, threshold])

    return { ref: elementRef, isRevealed }
}
