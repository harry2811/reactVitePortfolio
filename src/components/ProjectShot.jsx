import { useRef, useState } from 'react'

// Travel speed for the hover scroll. Slow enough to actually read the page.
const SPEED_PX_S = 100
const MIN_MS = 1600
const MAX_MS = 16000
const RETURN_MS = 800
// Below this there is nothing worth travelling — don't promise a viewer.
const MIN_TRAVEL_PX = 48

/**
 * Project screenshot that turns the card into a full-image viewer on hover:
 * the shot travels along whichever axis overflows the frame, then snaps back.
 *
 * - tall shot (full-page screenshot) → scrolls top → bottom
 * - wide shot (banner)               → pans left → right
 * - already fits                     → static, with a hair of zoom
 */
export default function ProjectShot({ src, name, aspect, accent, hovered }) {
  const wrapRef = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [shot, setShot] = useState({ mode: 'static', shift: 0, dur: MIN_MS })

  const accentText = accent === 'violet' ? 'text-accent-violet' : 'text-accent-cyan'
  const accentFrom = accent === 'violet' ? 'from-accent-violet/15' : 'from-accent-cyan/15'

  const measure = (e) => {
    const { naturalWidth: w, naturalHeight: h } = e.currentTarget
    setLoaded(true)
    if (!w || !h) return

    const imgAspect = w / h
    const frameW = wrapRef.current?.clientWidth || 480
    const frameH = frameW / aspect
    const travel = (px) => Math.min(MAX_MS, Math.max(MIN_MS, (px / SPEED_PX_S) * 1000))

    const overflowY = frameW / imgAspect - frameH
    const overflowX = frameH * imgAspect - frameW

    if (overflowY >= MIN_TRAVEL_PX) {
      // Taller than the frame — scroll it like a page. Shift is a share of the
      // image's own height, so it survives any resize without re-measuring.
      setShot({ mode: 'y', shift: (1 - imgAspect / aspect) * 100, dur: travel(overflowY) })
    } else if (overflowX >= MIN_TRAVEL_PX) {
      setShot({ mode: 'x', shift: (1 - aspect / imgAspect) * 100, dur: travel(overflowX) })
    } else {
      setShot({ mode: 'static', shift: 0, dur: MIN_MS })
    }
  }

  const { mode, shift, dur } = shot
  const moving = mode !== 'static'
  const active = hovered && moving

  const fit =
    mode === 'y' ? 'w-full h-auto'
    : mode === 'x' ? 'h-full w-auto max-w-none'
    : 'w-full h-full object-cover object-center'

  const transform =
    !hovered ? 'none'
    : mode === 'y' ? `translate3d(0, -${shift}%, 0)`
    : mode === 'x' ? `translate3d(-${shift}%, 0, 0)`
    : 'scale(1.03)'

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden">
      {/* Fallback: gradient + wordmark, visible until (or unless) the shot loads */}
      <div className={`absolute inset-0 bg-gradient-to-br ${accentFrom} via-bg-secondary to-bg-primary`} />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.2), transparent 50%), radial-gradient(circle at 80% 70%, rgba(100,255,218,0.18), transparent 50%)',
        }}
      />
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <span className={`font-display text-5xl sm:text-6xl md:text-7xl ${accentText} opacity-90`}>
          {name}
        </span>
      </div>

      {src && (
        <img
          src={src}
          alt={`${name} — project screenshot`}
          loading="lazy"
          decoding="async"
          onLoad={measure}
          onError={(e) => { e.currentTarget.style.display = 'none' }}
          className={`absolute left-0 top-0 ${fit} ${hovered ? 'will-change-transform' : ''}`}
          style={{
            opacity: loaded ? 1 : 0,
            transform,
            transitionProperty: 'transform, opacity',
            transitionDuration: `${hovered ? dur : RETURN_MS}ms, 500ms`,
            transitionTimingFunction: hovered
              ? 'cubic-bezier(0.33, 0, 0.15, 1)'
              : 'cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      )}

      {/* Hint — only where there is actually something to see */}
      {moving && loaded && (
        <div
          className="absolute top-3 left-3 chip !text-[0.55rem] !py-0.5 bg-bg-primary/70 backdrop-blur-sm uppercase tracking-eyebrow transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          {mode === 'y' ? 'full page ↕' : 'full width ↔'}
        </div>
      )}

      {/* Scrub bar — tracks the travel so the hover reads as a viewer, not a glitch */}
      {moving && loaded && (
        <div className="absolute bottom-0 inset-x-0 h-[2px] bg-white/10">
          <div
            className="h-full origin-left bg-gradient-to-r from-accent-cyan to-accent-violet"
            style={{
              transform: `scaleX(${active ? 1 : 0})`,
              transitionProperty: 'transform',
              transitionDuration: `${hovered ? dur : RETURN_MS}ms`,
              transitionTimingFunction: hovered
                ? 'cubic-bezier(0.33, 0, 0.15, 1)'
                : 'cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </div>
      )}
    </div>
  )
}
