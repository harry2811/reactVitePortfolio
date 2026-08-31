import { motion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 30, restDelta: 0.001 })
  const [show, setShow] = useState(false)

  useEffect(() => {
    let raf = 0
    const tick = () => {
      setShow(window.scrollY > 500)
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

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-cyan"
        style={{ scaleX }}
      />
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        animate={{
          opacity: show ? 1 : 0,
          y: show ? 0 : 16,
          pointerEvents: show ? 'auto' : 'none',
        }}
        transition={{ duration: 0.25 }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Back to top"
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 grid place-items-center w-11 h-11 rounded-md glass-strong text-ink-primary hover:border-accent-cyan/60 hover:text-accent-cyan transition-colors"
      >
        <ArrowUp size={16} />
      </motion.button>
    </>
  )
}
