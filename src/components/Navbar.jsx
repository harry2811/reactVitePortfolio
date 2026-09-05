import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Github, Linkedin, Menu, X } from 'lucide-react'
import { navLinks } from '../data'

const menuList = {
  hidden: {},
  show: { transition: { staggerChildren: 0.065, delayChildren: 0.18 } },
}

const menuItem = {
  hidden: { opacity: 0, x: 32, y: 8 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

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
      for (const link of navLinks) {
        const section = document.getElementById(link.id)
        if (section && section.offsetTop <= y && section.offsetTop + section.offsetHeight > y) current = link.id
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

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const handleClick = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ block: 'start' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6"
      >
        <div className={`mt-3 sm:mt-4 mx-auto max-w-container flex items-center justify-between rounded-md transition-all duration-300 ${
          scrolled || open ? 'glass-strong shadow-glass px-3 sm:px-4 py-2.5' : 'bg-transparent px-2 py-3'
        }`}>
          <button onClick={() => handleClick('home')} className="group flex items-center gap-2.5" aria-label="Home">
            <span className="relative grid place-items-center w-8 h-8 rounded-md bg-accent-cyan text-bg-primary">
              <span className="font-display text-xl leading-none -mt-0.5">h</span>
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-display text-2xl leading-none text-ink-primary">hassan.</span>
              <span className="font-mono text-[0.65rem] text-ink-muted tracking-eyebrow uppercase hidden sm:block">shopify · dev</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.id
              return (
                <button key={link.id} onClick={() => handleClick(link.id)} className={`relative px-3 py-1.5 text-sm rounded-md transition-colors ${isActive ? 'text-accent-cyan' : 'text-ink-muted hover:text-accent-cyan'}`}>
                  <span className="font-mono text-[0.65rem] tracking-eyebrow text-ink-dim mr-1.5">{link.num}</span>
                  <span>{link.label}</span>
                  {isActive && <motion.span layoutId="nav-dot" className="absolute -bottom-0.5 left-3 right-3 h-px bg-accent-cyan" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                </button>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[0.65rem] tracking-eyebrow text-ink-dim uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" /> v4
            </span>
            <a href="#contact" onClick={(event) => { event.preventDefault(); handleClick('contact') }} className="btn-primary !py-1.5 !px-3.5 !text-xs hidden sm:inline-flex">Hire me</a>
            <button
              onClick={() => setOpen((value) => !value)}
              className="md:hidden relative grid place-items-center w-10 h-10 rounded-full border border-white/15 bg-bg-primary/50 text-ink-primary hover:border-accent-cyan/60 transition-colors"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-navigation"
            >
              <Menu size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.header>

      {createPortal(
        <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.48, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 md:hidden overflow-hidden"
            style={{ background: '#070914', zIndex: 9999, isolation: 'isolate' }}
          >
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)', backgroundSize: '44px 44px', maskImage: 'linear-gradient(to bottom, black, transparent 85%)' }} />
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent-cyan/10 blur-3xl" />
            <div className="absolute bottom-10 -left-24 h-64 w-64 rounded-full bg-accent-violet/10 blur-3xl" />

            <div
              className="menu-scroll relative flex h-[100dvh] flex-col overflow-y-auto overflow-x-hidden"
              style={{
                paddingInline: 'clamp(1.5rem, 6vw, 2.5rem)',
                paddingTop: 'max(1.25rem, env(safe-area-inset-top))',
                paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
              }}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <button onClick={() => handleClick('home')} className="flex items-center gap-2.5" aria-label="Go home">
                  <span className="grid h-8 w-8 place-items-center rounded-md bg-accent-cyan font-display text-xl text-bg-primary">h</span>
                  <span className="font-display text-2xl text-ink-primary">hassan.</span>
                </button>
                <button onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full border border-accent-cyan/50 text-accent-cyan" aria-label="Close menu">
                  <X size={18} />
                </button>
              </div>

              <motion.div variants={menuList} initial="hidden" animate="show" className="flex flex-1 flex-col justify-center py-6">
                <motion.div variants={menuItem} className="mb-4 flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-eyebrow text-ink-dim">
                  <span className="h-px w-8 bg-accent-cyan" /> Navigate / 05
                </motion.div>
                <nav aria-label="Mobile navigation" className="border-t border-white/10">
                  {navLinks.map((link) => {
                    const isActive = active === link.id
                    return (
                      <motion.button variants={menuItem} key={link.id} onClick={() => handleClick(link.id)} whileTap={{ x: 8 }} className="group relative w-full border-b border-white/10 py-3 text-left">
                        <span className="flex items-center justify-between gap-4">
                          <span className="flex items-baseline gap-4">
                            <span className={`font-mono text-[0.65rem] tracking-eyebrow ${isActive ? 'text-accent-cyan' : 'text-ink-dim'}`}>{link.num}</span>
                            <span className={`font-sans text-[clamp(1.55rem,7vw,2.25rem)] font-semibold leading-tight transition-colors ${isActive ? 'text-accent-cyan' : 'text-ink-primary group-hover:text-accent-cyan'}`}>{link.label}</span>
                          </span>
                          <ArrowUpRight size={18} className={`transition-all ${isActive ? 'text-accent-cyan rotate-45' : 'text-ink-dim group-hover:text-accent-cyan group-hover:rotate-45'}`} />
                        </span>
                        {isActive && <motion.span layoutId="mobile-active" className="absolute bottom-0 left-0 h-px w-20 bg-accent-cyan shadow-glow-cyan" />}
                      </motion.button>
                    )
                  })}
                </nav>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.4 }} className="flex items-end justify-between gap-5 border-t border-white/10 pt-5">
                <div>
                  <p className="font-mono text-[0.6rem] uppercase tracking-eyebrow text-ink-dim">Have a project?</p>
                  <button onClick={() => handleClick('contact')} className="mt-1 inline-flex items-center gap-2 text-sm text-ink-primary">Let's work together <ArrowUpRight size={14} className="text-accent-cyan" /></button>
                </div>
                <div className="flex gap-2">
                  <a href="https://github.com/harry2811" target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-ink-muted transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"><Github size={15} /></a>
                  <a href="https://www.linkedin.com/in/muhammad-hassan-42645b24a/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-ink-muted transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"><Linkedin size={15} /></a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
