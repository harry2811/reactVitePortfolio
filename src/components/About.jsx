import { motion } from 'framer-motion'
import { Download, Linkedin, Sparkles, Rocket, Users, Coffee } from 'lucide-react'
import { manifesto, techStack, stats } from '../data'
import CountUp from './CountUp'

const statIcons = [Rocket, Users, Sparkles, Coffee]

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="mb-10 max-w-2xl"
        >
          <div className="num-tag mb-2">04 — About</div>
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-ink-primary tracking-tight">
            A developer who <span className="text-gradient">thinks like a marketer</span>.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Manifesto */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="lg:col-span-7"
          >
            <ul className="space-y-3">
              {manifesto.map((line, i) => (
                <motion.li
                  key={line}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-baseline gap-4 font-display text-3xl sm:text-4xl md:text-5xl text-ink-primary"
                >
                  <span className="font-mono text-[0.7rem] tracking-eyebrow text-ink-muted w-6 shrink-0 mt-2">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={i === manifesto.length - 1 ? 'text-accent-cyan' : ''}>
                    {line}
                  </span>
                </motion.li>
              ))}
            </ul>

            <p className="mt-8 text-ink-muted text-sm md:text-base leading-relaxed max-w-xl">
              I'm a Shopify expert with <span className="text-ink-primary">3+ years</span> of
              experience building high-converting stores. I specialize in theme
              customization, Liquid, Hydrogen, and React — paired with a strong
              eye for design and a relentless focus on page speed.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#" className="btn-primary">
                <Download size={14} /> Resume
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="btn-ghost">
                <Linkedin size={14} /> LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Tech stack + stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="glass rounded-md p-5">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-ink-primary">
                  <span className="font-mono text-xs">stack.json</span>
                </div>
                <span className="font-mono text-[0.65rem] text-ink-muted uppercase tracking-eyebrow">v4</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {techStack.map((t) => (
                  <span key={t} className="chip text-ink-muted hover:text-accent-cyan hover:border-accent-cyan/40 transition-colors">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {stats.map((s, i) => {
                const Icon = statIcons[i] || Sparkles
                return (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="glass rounded-md p-4 text-center hover:border-accent-cyan/40 transition-colors"
                  >
                    <Icon size={14} className="mx-auto text-accent-cyan/80" />
                    <div className="mt-1.5 font-sans text-2xl md:text-3xl font-bold text-ink-primary">
                      <CountUp value={s.value} />
                    </div>
                    <div className="mt-0.5 text-[0.7rem] text-ink-muted uppercase tracking-eyebrow font-mono">
                      {s.label}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
