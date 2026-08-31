import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { navLinks } from '../data'

/**
 * Vertical section-number gutter — only on lg+. Tracks the active section
 * and gives the page an editorial, magazine-spread feel (borrowed from
 * Brittany Chiang's portfolio). Sits in a fixed position on the left edge.
 */
export default function SectionGutter() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    let raf = 0
    const tick = () => {
      const y = window.scrollY + window.innerHeight * 0.35
      let current = 'home'
      for (const l of navLinks) {
        const el = document.getElementById(l.id)
        if (el && el.offsetTop <= y && el.offsetTop + el.offsetHeight > y) {
          current = el.id
        }
      }
      setActive(current)
      raf = 0
    }
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(tick)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ block: 'start' })
  }

  return (
    <aside
      aria-hidden
      className="hidden 2xl:flex fixed left-6 2xl:left-10 top-1/2 -translate-y-1/2 z-30 flex-col items-end gap-3 select-none"
    >
      {navLinks.map((l) => {
        const isActive = active === l.id
        return (
          <button
            key={l.id}
            onClick={() => handleClick(l.id)}
            className="group flex items-center gap-3 cursor-hover"
            aria-label={`Jump to ${l.label}`}
          >
            <span
              className={`font-mono text-[0.7rem] tracking-eyebrow uppercase transition-colors ${
                isActive ? 'text-accent-cyan' : 'text-ink-dim group-hover:text-ink-primary'
              }`}
            >
              {l.label}
            </span>
            <span className="flex items-center gap-2">
              <motion.span
                animate={{ width: isActive ? 32 : 16 }}
                transition={{ duration: 0.3 }}
                className={`h-px ${isActive ? 'bg-accent-cyan' : 'bg-white/20 group-hover:bg-white/40'}`}
              />
              <span
                className={`font-mono text-[0.7rem] tracking-eyebrow ${
                  isActive ? 'text-accent-cyan' : 'text-ink-dim group-hover:text-ink-primary'
                }`}
              >
                {l.num}
              </span>
            </span>
          </button>
        )
      })}
    </aside>
  )
}
