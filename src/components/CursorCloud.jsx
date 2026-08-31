import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Three layers with different spring weights — the lag between them is what
// reads as a drifting cloud rather than a dot glued to the pointer.
// Tints stay low-alpha on purpose: this sits behind body copy, so anything
// stronger costs text contrast.
const LAYERS = [
  { size: 620, stiffness: 45,  damping: 20, tint: 'rgba(100,255,218,0.10)' },
  { size: 460, stiffness: 80,  damping: 18, tint: 'rgba(167,139,250,0.11)' },
  { size: 240, stiffness: 190, damping: 22, tint: 'rgba(100,255,218,0.08)' },
]

function Layer({ x, y, size, stiffness, damping, tint }) {
  const sx = useSpring(x, { stiffness, damping, mass: 0.9 })
  const sy = useSpring(y, { stiffness, damping, mass: 0.9 })

  return (
    <motion.div
      className="absolute top-0 left-0 rounded-full will-change-transform"
      style={{
        x: sx,
        y: sy,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        background: `radial-gradient(circle at center, ${tint} 0%, transparent 72%)`,
      }}
    />
  )
}

export default function CursorCloud() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Pointer-driven decoration: skip it on touch and when motion is reduced.
    const fine = window.matchMedia('(pointer: fine)').matches
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || calm) return
    setEnabled(true)

    // Park it mid-screen so the first move drifts in instead of flying across.
    x.set(window.innerWidth / 2)
    y.set(window.innerHeight / 2)

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    document.addEventListener('pointerenter', onEnter)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('pointerenter', onEnter)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      // -z-10 keeps the cloud behind every section but above the body wash,
      // so it never washes out text.
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {LAYERS.map((l) => (
        <Layer key={l.size} x={x} y={y} {...l} />
      ))}
    </motion.div>
  )
}
