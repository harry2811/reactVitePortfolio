import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import * as Icons from 'lucide-react'
import { services } from '../data'

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl mb-10"
        >
          <div className="num-tag mb-2">03 — Services</div>
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-ink-primary tracking-tight">
            Services built around <span className="text-gradient">revenue</span>.
          </h2>
          <p className="mt-3 text-ink-muted text-sm md:text-base">
            From custom themes to headless commerce — every engagement is tied
            to the metrics that actually move a store.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => {
            const Icon = Icons[s.icon] || Icons.Code2
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -3 }}
                className="group relative p-6 rounded-md glass hover:border-accent-cyan/40 transition-colors overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-accent-cyan/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-white/10 bg-white/[0.03] text-accent-cyan group-hover:border-accent-cyan/50 group-hover:bg-accent-cyan/10 transition-colors">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-5 font-sans text-base font-semibold text-ink-primary">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed">{s.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-ink-dim group-hover:text-accent-cyan transition-colors">
                    Learn more <ArrowUpRight size={11} />
                  </div>
                </div>
                <div
                  className="absolute inset-x-0 bottom-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(100,255,218,0.6), transparent)' }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
