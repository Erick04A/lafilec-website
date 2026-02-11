import React, { useEffect, useRef, useState } from 'react'

export default function KineticClock() {
    const secondsRef = useRef(null)
    const minutesRef = useRef(null)
    const minuteRef = useRef(null)
    const hourRef = useRef(null)

    useEffect(() => {
        const seconds = secondsRef.current
        const minutes = minutesRef.current


        for (let s = 0; s < 60; s++) {
            let mSpikeEl = document.createElement('i')
            let sSpikeEl = document.createElement('i')
            mSpikeEl.className = 'spike'
            sSpikeEl.className = 'spike'
            mSpikeEl.style.cssText = `--rotate: ${6 * s}deg;`
            sSpikeEl.style.cssText = `--rotate: ${6 * s}deg;`
            mSpikeEl.setAttribute('data-i', s)
            sSpikeEl.setAttribute('data-i', s)
            seconds.appendChild(sSpikeEl)
            minutes.appendChild(mSpikeEl)
        }

        function getTime() {
            let date = new Date()
            let s = date.getSeconds()
            let m = date.getMinutes()

            hourRef.current.textContent = date.getHours()
            minuteRef.current.textContent = m

            minutes.style.cssText = `--dRotate: ${6 * m}deg;`

            if (s === 0) {
                seconds.classList.add('stop-anim')
            } else {
                seconds.classList.remove('stop-anim')
            }

            if (m === 0) {
                minutes.classList.add('stop-anim')
            } else {
                minutes.classList.remove('stop-anim')
            }

            seconds.style.cssText = `--dRotate: ${6 * s}deg;`
        }

        const interval = setInterval(getTime, 1000)
        getTime()

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="clock">
            <div ref={secondsRef} className="seconds"></div>
            <div ref={minutesRef} className="minutes"></div>
            <div ref={minuteRef} className="minute">44</div>
            <div ref={hourRef} className="hour">12</div>
        </div>
    )
}
