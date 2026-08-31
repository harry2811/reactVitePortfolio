import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

/**
 * CountUp — animates from 0 to the leading number in `value` when in view.
 * Preserves the suffix ("+", "x", "%") and decimals. No-ops on
 * prefers-reduced-motion.
 */
export default function CountUp({ value, duration = 1.4 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = useState(0)
  const [reduced, setReduced] = useState(false)

  const match = String(value).match(/^(\d+(?:\.\d+)?)(.*)$/)
  const target = match ? parseFloat(match[1]) : 0
  const suffix = match ? match[2] : value
  const decimals = match && match[1].includes('.') ? match[1].split('.')[1].length : 0

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setDisplay(target)
      return
    }
    let start = null
    let raf
    const step = (ts) => {
      if (start === null) start = ts
      const p = Math.min(1, (ts - start) / (duration * 1000))
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(target * eased)
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration, reduced])

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  )
}
