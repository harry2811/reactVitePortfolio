import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ExternalLink, X } from 'lucide-react'
import { projects } from '../data'
import ProjectShot from './ProjectShot'

// Curated filter set — keeps the bar readable, not chaotic
const FILTERS = ['All', 'Dawn', 'Editorial', 'Performance', 'CRO', 'CMS']

function ProjectCard({ p, onOpen, i, featured }) {
  const [hovered, setHovered] = useState(false)
  const accentClass = p.accent === 'violet' ? 'text-accent-violet' : 'text-accent-cyan'
  const accentBorder = p.accent === 'violet' ? 'group-hover:border-accent-violet/40' : 'group-hover:border-accent-cyan/40'
  const accentGlow = p.accent === 'violet' ? 'group-hover:shadow-glow-violet' : 'group-hover:shadow-glow-cyan'

  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      exit={{ opacity: 0, y: 8 }}
      onClick={() => onOpen(p)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className={`group relative text-left rounded-md glass overflow-hidden transition-all hover:-translate-y-0.5 ${accentBorder} ${accentGlow}`}
    >
      {/* Visual: the shot travels through the frame on hover */}
      <div className="relative aspect-[16/9] overflow-hidden bg-bg-secondary">
        <ProjectShot
          src={p.thumb || p.image}
          name={p.name}
          accent={p.accent}
          aspect={featured ? 21 / 9 : 16 / 9}
          hovered={hovered}
        />

        {/* Subtle dark scrim so the metric chip stays readable on bright images */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />

        {/* Metric chip — always top-right */}
        <div className="absolute top-3 right-3 chip !text-[0.6rem] !py-0.5 bg-bg-primary/70 backdrop-blur-sm">
          {p.metric}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-sans text-lg font-semibold text-ink-primary group-hover:text-accent-cyan transition-colors">
              {p.name}
            </h3>
            <p className="mt-1.5 text-sm text-ink-muted leading-relaxed clamp-2">
              {p.desc}
            </p>
          </div>
          <span className={`shrink-0 grid place-items-center w-8 h-8 rounded-md border border-white/10 text-ink-muted group-hover:${accentClass} group-hover:border-current transition-colors`}>
            <ArrowUpRight size={14} />
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span key={t} className="chip !text-[0.6rem] !py-0.5">{t}</span>
          ))}
        </div>
      </div>
    </motion.button>
  )
}

function ProjectModal({ project, onClose }) {
  const [shotOk, setShotOk] = useState(true)
  const accentClass = project.accent === 'violet' ? 'text-accent-violet' : 'text-accent-cyan'

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] grid place-items-center p-4 bg-bg-primary/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 8 }}
        transition={{ type: 'spring', stiffness: 240, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-auto glass-strong rounded-md shadow-glass"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 grid place-items-center w-9 h-9 rounded-md glass text-ink-primary hover:border-accent-cyan/60 transition-colors"
        >
          <X size={15} />
        </button>

        {/* Full shot — scroll the modal to read the whole page */}
        <div className="relative overflow-hidden rounded-t-md bg-bg-secondary">
          {(!project.image || !shotOk) && (
            <div className="relative aspect-[16/9]">
              <div className={`absolute inset-0 bg-gradient-to-br ${project.accent === 'violet' ? 'from-accent-violet/20' : 'from-accent-cyan/20'} via-bg-secondary to-bg-primary`} />
              <div className="absolute inset-0 grid place-items-center">
                <span className={`font-display text-6xl md:text-7xl ${accentClass}`}>
                  {project.name}
                </span>
              </div>
            </div>
          )}
          {project.image && shotOk && (
            <img
              src={project.image}
              alt={`${project.name} — full screenshot`}
              onError={() => setShotOk(false)}
              className="block w-full h-auto"
            />
          )}
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {project.tags.map((t) => (
              <span key={t} className="chip !text-[0.6rem] !py-0.5">{t}</span>
            ))}
            <span className={`chip !text-[0.6rem] !py-0.5 ${accentClass} !border-current/30`}>
              {project.metric}
            </span>
          </div>
          <h3 className="font-sans text-2xl font-semibold text-ink-primary">{project.name}</h3>
          <p className="mt-3 text-ink-muted text-sm leading-relaxed">{project.desc}</p>
          <p className="mt-3 text-ink-dim text-sm leading-relaxed">
            Built with measurable outcomes in mind — fast page loads, clean
            markup, and a checkout tuned to convert. Includes custom sections,
            dynamic metafields, and a fully responsive product experience.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={project.url || '#'} target={project.url ? '_blank' : undefined} rel={project.url ? 'noreferrer' : undefined} className="btn-primary !py-2 !px-4 !text-xs">
              <ExternalLink size={13} /> Live preview
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Portfolio() {
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState(null)

  const filtered = useMemo(() => {
    if (filter === 'All') return projects
    return projects.filter((p) => p.tags.includes(filter))
  }, [filter])

  return (
    <section id="work" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8"
        >
          <div className="max-w-xl">
            <div className="num-tag mb-2">02 — Work</div>
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-ink-primary tracking-tight">
              Selected <span className="text-gradient">stores</span>.
            </h2>
            <p className="mt-3 text-ink-muted text-sm md:text-base">
              A handful of recent Shopify builds — designed, coded, and tuned to convert.
            </p>
          </div>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ block: 'start' }) }}
            className="btn-ghost self-start md:self-auto"
          >
            Start a project <ArrowUpRight size={13} />
          </a>
        </motion.div>

        {/* Filter chips */}
        <div className="mb-8 flex flex-wrap gap-1.5">
          {FILTERS.map((t) => {
            const isActive = filter === t
            return (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-3 py-1 rounded-full text-[0.7rem] font-mono transition-colors ${
                  isActive
                    ? 'bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/40'
                    : 'bg-white/[0.03] text-ink-muted border border-white/10 hover:text-ink-primary'
                }`}
              >
                {t}
              </button>
            )
          })}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard
                key={p.name}
                p={p}
                i={i}
                featured={p.featured && filter === 'All'}
                onOpen={setActive}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-ink-muted py-12 text-sm">No projects match this filter yet.</p>
        )}
      </div>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  )
}
