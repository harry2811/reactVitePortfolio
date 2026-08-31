import { motion } from 'framer-motion'
import { ArrowRight, Zap, Sparkles } from 'lucide-react'
import { lazy, Suspense } from 'react'
import Typewriter from './Typewriter'

// Lazy-load the Three.js scene so the rest of the site paints fast
const Crate3D = lazy(() => import('./Crate3D'))

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero({ ready = true }) {
  return (
    <section id="home" className="relative pt-28 sm:pt-32 md:pt-40 pb-12 sm:pb-16 overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Text column */}
          <motion.div
            initial="hidden"
            animate={ready ? 'show' : 'hidden'}
            className="lg:col-span-7 text-center lg:text-left"
          >
            <motion.div custom={0} variants={fadeUp} className="chip mb-5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-cyan" />
              </span>
              <span>Available · Q1 2026</span>
              <Sparkles size={11} className="text-accent-cyan" />
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              className="font-sans font-bold tracking-tight leading-[1.02] text-ink-primary"
              style={{ fontSize: 'clamp(2.5rem, 5.5vw + 0.5rem, 5.25rem)' }}
            >
              Hi, I'm{' '}
              <span className="font-display text-accent-cyan inline-block -mt-2">
                hassan
              </span>
              .
              <br />
              <span className="text-ink-muted">I build</span>{' '}
              <span className="text-gradient">Shopify</span>{' '}
              <span className="text-ink-muted">stores that</span>{' '}
              <span className="text-ink-primary">sell.</span>
            </motion.h1>

            <motion.div
              custom={2}
              variants={fadeUp}
              className="mt-5 font-mono text-sm sm:text-base text-ink-muted min-h-[1.5em]"
            >
              <span className="text-ink-muted">{'> '}</span>
              <Typewriter
                words={[
                  'theme.liquid → section.blocks',
                  'react + hydrogen on the edge',
                  'LCP < 1s, CLS ≈ 0',
                  'aov +38%, abandon -22%',
                ]}
                className="text-accent-cyan"
              />
            </motion.div>

            <motion.p
              custom={3}
              variants={fadeUp}
              className="mt-6 max-w-xl mx-auto lg:mx-0 text-ink-muted text-sm sm:text-base leading-relaxed"
            >
              I'm a Shopify expert with 3+ years building high-converting
              storefronts — custom Liquid, Hydrogen, and the kind of page-speed
              work that shows up in your revenue, not just your Lighthouse score.
            </motion.p>

            <motion.div
              custom={4}
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              <a
                href="#work"
                onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ block: 'start' }) }}
                className="btn-primary"
              >
                See the work <ArrowRight size={14} />
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ block: 'start' }) }}
                className="btn-ghost"
              >
                Hire me <Zap size={13} />
              </a>
            </motion.div>
          </motion.div>

          {/* 3D column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
            transition={{ delay: ready ? 0.35 : 0, duration: 0.7 }}
            className="lg:col-span-5 relative h-[360px] sm:h-[440px] lg:h-[520px]"
          >
            <Suspense fallback={
              <div className="w-full h-full grid place-items-center">
                <div className="font-mono text-xs text-ink-dim tracking-eyebrow uppercase animate-pulse">
                  loading scene…
                </div>
              </div>
            }>
              <Crate3D />
            </Suspense>
            <div className="pointer-events-none absolute -top-2 left-2 font-mono text-[0.65rem] tracking-eyebrow text-ink-dim uppercase">
              Live · rotating
            </div>
            <div className="pointer-events-none absolute -bottom-2 right-2 font-mono text-[0.65rem] tracking-eyebrow text-ink-dim uppercase">
              drag · click face
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
