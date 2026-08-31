import { useEffect, useState } from 'react'

/**
 * Typewriter — cycles through strings, respects prefers-reduced-motion
 * (in that case it just shows the first word statically).
 */
export default function Typewriter({ words, className = '', typeSpeed = 75, deleteSpeed = 35, pause = 1300 }) {
  const [i, setI] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
  }, [])

  useEffect(() => {
    if (reduced) {
      setText(words?.[0] || '')
      return
    }
    if (!words?.length) return
    const current = words[i % words.length]
    const done = !deleting && text === current
    const cleared = deleting && text === ''

    let delay = deleting ? deleteSpeed : typeSpeed
    if (done || cleared) delay = pause

    const t = setTimeout(() => {
      if (cleared) {
        setDeleting(false)
        setI((v) => (v + 1) % words.length)
      } else if (done) {
        setDeleting(true)
      } else {
        setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1))
      }
    }, delay)

    return () => clearTimeout(t)
  }, [text, deleting, i, words, typeSpeed, deleteSpeed, pause, reduced])

  return (
    <span className={className}>
      {text}
      {!reduced && (
        <span
          aria-hidden
          className="inline-block w-[2px] h-[0.9em] align-middle bg-accent-cyan ml-1 animate-caret"
        />
      )}
    </span>
  )
}
