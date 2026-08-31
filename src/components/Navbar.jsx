import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../data'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    let raf = 0
    const tick = () => {
      setScrolled(window.scrollY > 30)
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  const handleClick = (id) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ block: 'start' })
  }

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6"
    >
      <div className={`mt-3 sm:mt-4 mx-auto max-w-container flex items-center justify-between rounded-md transition-all duration-300 ${
        scrolled ? 'glass-strong shadow-glass px-3 sm:px-4 py-2.5' : 'bg-transparent px-2 py-3'
      }`}>
        {/* Wordmark */}
        <button
          onClick={() => handleClick('home')}
          className="group flex items-center gap-2.5"
          aria-label="Home"
        >
          <span className="relative grid place-items-center w-8 h-8 rounded-md bg-accent-cyan text-bg-primary">
            <span className="font-display text-xl leading-none -mt-0.5">h</span>
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-2xl leading-none text-ink-primary">hassan.</span>
            <span className="font-mono text-[0.65rem] text-ink-muted tracking-eyebrow uppercase hidden sm:block">shopify · dev</span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => {
            const isActive = active === l.id
            return (
              <button
                key={l.id}
                onClick={() => handleClick(l.id)}
                className={`relative px-3 py-1.5 text-sm rounded-md transition-colors ${
                  isActive ? 'text-accent-cyan' : 'text-ink-muted hover:text-accent-cyan'
                }`}
              >
                <span className="font-mono text-[0.65rem] tracking-eyebrow text-ink-dim mr-1.5">{l.num}</span>
                <span>{l.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-0.5 left-3 right-3 h-px bg-accent-cyan"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[0.65rem] tracking-eyebrow text-ink-dim uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
            v4
          </span>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleClick('contact') }}
            className="btn-primary !py-1.5 !px-3.5 !text-xs hidden sm:inline-flex"
          >
            Hire me
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden grid place-items-center w-9 h-9 rounded-md border border-white/10 text-ink-primary hover:border-accent-cyan/60 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mx-auto max-w-container mt-2"
          >
            <div className="glass-strong rounded-md p-2 shadow-glass">
              {navLinks.map((l) => (
                <button
                  key={l.id}
                  onClick={() => handleClick(l.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded text-sm transition-colors ${
                    active === l.id ? 'bg-white/[0.04] text-accent-cyan' : 'text-ink-primary hover:bg-white/[0.03]'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-[0.65rem] tracking-eyebrow text-ink-dim">{l.num}</span>
                    <span>{l.label}</span>
                  </span>
                  <span className="text-ink-dim">→</span>
                </button>
              ))}
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleClick('contact') }}
                className="mt-2 w-full btn-primary !text-xs justify-center"
              >
                Hire me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
