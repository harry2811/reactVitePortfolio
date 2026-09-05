import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const MIN_MS  = 1500  // the count always takes at least this long to run
const MAX_MS  = 6000  // failsafe — one stalled asset never holds the site hostage
const HOLD_MS = 420   // beat at 100% before the panel flicks up

// Status word swaps as the count climbs — reads as work, not decoration
const STAGES = [
  [0,  'booting'],
  [24, 'typefaces'],
  [48, 'screenshots'],
  [72, 'scene'],
  [95, 'ready'],
]
const stageFor = (p) =>
  STAGES.reduce((label, [at, next]) => (p >= at ? next : label), 'booting')

export default function Preloader({ onDone }) {
  const [pct, setPct] = useState(0)
  const [leaving, setLeaving] = useState(false)

  // Lock the page and start from the top — the reveal must land on the hero,
  // not wherever the browser restored the scroll position to.
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  useEffect(() => {
    // Keep startup light. Project thumbnails load lazily near the work section;
    // downloading full-page screenshots here caused a large decode spike on scroll.
    const total = 2
    let done = 0
    const bump = () => { done += 1 }

    if (document.fonts) document.fonts.ready.then(bump, bump)
    else bump()

    if (document.readyState === 'complete') bump()
    else window.addEventListener('load', bump, { once: true })

    const start = performance.now()
    let shown = 0
    let raf = requestAnimationFrame(tick)

    function tick(now) {
      const elapsed = now - start
      // Real progress, floored by time so the count is always readable,
      // and force-completed once MAX_MS is up.
      let target = Math.min(done / total, elapsed / MIN_MS)
      if (elapsed >= MAX_MS) target = 1

      shown += (target * 100 - shown) * (target >= 1 ? 0.22 : 0.14)
      if (target >= 1 && 100 - shown < 0.6) shown = 100
      setPct(Math.round(shown))

      if (shown >= 100) {
        setTimeout(() => setLeaving(true), HOLD_MS)
        return
      }
      raf = requestAnimationFrame(tick)
    }

    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <motion.div
      aria-hidden={leaving}
      className="fixed inset-0 z-[200] flex flex-col justify-between bg-bg-primary px-5 py-6 sm:px-10 sm:py-10"
      initial={{ y: 0 }}
      animate={{ y: leaving ? '-100%' : 0 }}
      transition={{ duration: 0.78, ease: [0.76, 0, 0.24, 1], delay: leaving ? 0.08 : 0 }}
      onAnimationComplete={() => { if (leaving) onDone?.() }}
    >
      {/* Inner content clears out a touch ahead of the panel */}
      <motion.div
        animate={{ opacity: leaving ? 0 : 1, y: leaving ? -28 : 0 }}
        transition={{ duration: 0.32, ease: 'easeIn' }}
        className="flex flex-col justify-between flex-1 min-h-0"
      >
        {/* Top row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center w-8 h-8 rounded-md bg-accent-cyan text-bg-primary">
              <span className="font-display text-xl leading-none -mt-0.5">h</span>
            </span>
            <span className="font-display text-2xl leading-none text-ink-primary">hassan.</span>
          </div>
          <span className="font-mono text-[0.65rem] tracking-eyebrow uppercase text-ink-dim">
            portfolio · v4
          </span>
        </div>

        {/* The count */}
        <div className="flex-1 grid place-items-center">
          <div>
            <div className="eyebrow mb-3 justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
              {stageFor(pct)}
            </div>
            <div className="flex items-end justify-center gap-2 leading-none">
              <span
                className="font-mono font-medium tabular-nums text-ink-primary"
                style={{ fontSize: 'clamp(4rem, 17vw, 11rem)' }}
              >
                {String(pct).padStart(3, '0')}
              </span>
              <span className="font-mono text-accent-cyan text-lg sm:text-2xl pb-2 sm:pb-5">%</span>
            </div>
          </div>
        </div>

        {/* Progress rule */}
        <div>
          <div
            role="progressbar"
            aria-label="Loading portfolio"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            className="relative h-px w-full bg-white/10"
          >
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent-cyan to-accent-violet transition-[width] duration-150 ease-linear"
              style={{ width: `${pct}%` }}
            >
              <span className="absolute right-0 -top-[3px] h-[7px] w-[7px] rounded-full bg-accent-cyan shadow-glow-cyan" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between font-mono text-[0.65rem] tracking-eyebrow uppercase text-ink-dim">
            <span>shopify · theme dev</span>
            <span>loading assets</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
