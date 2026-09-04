import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Check, AlertCircle, Mail, MapPin, Clock, Sparkles } from 'lucide-react'

const initial = { name: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')
  const [focused, setFocused] = useState(null)

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const contactInfo = [
    { Icon: Mail,    color: 'text-accent-cyan',    text: 'hassanrazzaq0786@gmail.com' },
    { Icon: MapPin,  color: 'text-accent-violet',  text: 'Remote · Worldwide' },
    { Icon: Sparkles,color: 'text-accent-cyan',    text: 'Replies within 24h' },
    { Icon: Clock,   color: 'text-accent-violet',  text: 'Mon – Fri · 9am–6pm PKT' },
  ]

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-5"
          >
            <div className="num-tag mb-2">05 — Contact</div>
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-ink-primary tracking-tight">
              Let's build something <span className="text-gradient">fast</span>.
            </h2>
            <p className="mt-4 text-ink-muted text-sm md:text-base leading-relaxed">
              Have a Shopify project in mind? Send a quick message and I'll
              get back within 24 hours.
            </p>

            <div className="mt-6 space-y-3">
              {contactInfo.map(({ Icon, color, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 text-ink-muted hover:text-ink-primary transition-colors"
                >
                  <span className="grid place-items-center w-9 h-9 rounded-md glass">
                    <Icon size={14} className={color} />
                  </span>
                  <span className="text-sm">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            action="https://formspree.io/f/mrbkglwq"
            method="POST"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="lg:col-span-7 glass rounded-md p-5 sm:p-7"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { key: 'name',  label: 'Name',  type: 'text',  placeholder: 'Your name' },
                { key: 'email', label: 'Email', type: 'email', placeholder: 'you@brand.com' },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label htmlFor={key} className="block font-mono text-[0.65rem] tracking-eyebrow text-ink-muted uppercase mb-1.5">
                    {label}
                  </label>
                  <input
                    id={key}
                    name={key}
                    value={form[key]}
                    onChange={update(key)}
                    onFocus={() => setFocused(key)}
                    onBlur={() => setFocused(null)}
                    type={type}
                    placeholder={placeholder}
                    className={`w-full px-4 py-2.5 rounded-md bg-white/[0.03] border text-ink-primary text-sm placeholder:text-ink-dim transition-colors ${
                      focused === key ? 'border-accent-cyan/60' : 'border-white/10'
                    }`}
                  />
                </div>
              ))}
            </div>
            <div className="mt-4">
              <label htmlFor="message" className="block font-mono text-[0.65rem] tracking-eyebrow text-ink-dim uppercase mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={update('message')}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
                rows={5}
                placeholder="Tell me about your project, timeline, and goals..."
                className={`w-full px-4 py-2.5 rounded-md bg-white/[0.03] border text-ink-primary text-sm placeholder:text-ink-dim resize-none transition-colors ${
                  focused === 'message' ? 'border-accent-cyan/60' : 'border-white/10'
                }`}
              />
            </div>

            <div className="mt-5 flex items-center justify-between gap-4 flex-wrap">
              <div className="text-xs min-h-[1.25rem]">
                <AnimatePresence mode="wait">
                  {status === 'error' && (
                    <motion.span key="err" initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-1.5 text-rose-400">
                      <AlertCircle size={12} /> {error}
                    </motion.span>
                  )}
                  {status === 'sent' && (
                    <motion.span key="ok" initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-1.5 text-accent-cyan">
                      <Check size={12} /> Message sent — I'll be in touch soon.
                    </motion.span>
                  )}
                  {status === 'idle' && (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-ink-dim font-mono">
                      All fields required.
                    </motion.span>
                  )}
                  {status === 'sending' && (
                    <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-1.5 text-ink-muted">
                      <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="inline-block w-3 h-3 rounded-full border-2 border-accent-cyan border-t-transparent" />
                      Sending…
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: status === 'sending' ? 1 : 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Sending…' : (<>Send message <Send size={13} /></>)}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
