import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { socials } from '../data'

export default function Footer() {
  return (
    <footer className="relative pt-12 pb-8 mt-8 border-t border-white/[0.06]">
      <div className="container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
          <div className="flex items-center gap-3">
            <span className="grid place-items-center w-8 h-8 rounded-md bg-accent-cyan text-bg-primary">
              <span className="font-display text-xl leading-none -mt-0.5">h</span>
            </span>
            <div className="leading-tight">
              <div className="font-display text-2xl text-ink-primary">hassan.</div>
              <div className="font-mono text-[0.65rem] text-ink-muted tracking-eyebrow uppercase">
                © {new Date().getFullYear()} · v4
              </div>
            </div>
          </div>

          <div className="flex items-center justify-start sm:justify-center gap-2">
            {socials.map((s) => {
              const Icon = Icons[s.icon] || Icons.Link
              return (
                <motion.a
                  key={s.name}
                  href={s.url}
                  target={s.url.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  className="grid place-items-center w-10 h-10 rounded-md glass text-ink-muted hover:text-accent-cyan hover:border-accent-cyan/40 transition-colors"
                  aria-label={s.name}
                >
                  <Icon size={15} />
                </motion.a>
              )
            })}
          </div>

          <div className="text-xs text-ink-muted font-mono sm:text-right">
            Built with <span className="font-display text-accent-cyan text-base">care</span> using React · Tailwind · R3F
          </div>
        </div>
      </div>
    </footer>
  )
}
