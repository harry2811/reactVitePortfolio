import { Suspense, useMemo, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { AnimatePresence, motion } from 'framer-motion'
import { crateLabels } from '../data'

/* A simple parcel/crate — soft chamfered box, taped cross, glowing accent on
   the front face. The whole group auto-rotates; we read the current Y rotation
   to compute which face is camera-facing and which HTML label to show. */

function Crate({ onFaceChange }) {
  const group = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    if (!group.current) return
    // Auto-rotate slowly
    group.current.rotation.y += delta * 0.25
    // Compute which face is most camera-facing (every 90°)
    const angle = ((group.current.rotation.y % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
    const face = Math.round(angle / (Math.PI / 2)) % 4
    onFaceChange(face)
  })

  // Wood-cardboard-ish color
  const bodyColor = '#1a1f2e'
  const tapeColor = '#64ffda'
  const tapeEmissive = '#64ffda'

  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
      <group
        ref={group}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Main body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial
            color={bodyColor}
            roughness={0.55}
            metalness={0.15}
          />
        </mesh>

        {/* Subtle edge wireframe for the editorial look */}
        <mesh scale={1.005}>
          <boxGeometry args={[2, 2, 2]} />
          <meshBasicMaterial color="#64ffda" wireframe transparent opacity={0.06} />
        </mesh>

        {/* Tape — vertical strip */}
        <mesh position={[0, 0, 1.001]}>
          <planeGeometry args={[0.4, 2.05]} />
          <meshStandardMaterial
            color={tapeColor}
            emissive={tapeEmissive}
            emissiveIntensity={hovered ? 0.6 : 0.35}
            roughness={0.4}
            transparent
            opacity={0.85}
          />
        </mesh>
        {/* Tape — horizontal strip on front face */}
        <mesh position={[0, 0, 1.002]}>
          <planeGeometry args={[2.05, 0.4]} />
          <meshStandardMaterial
            color={tapeColor}
            emissive={tapeEmissive}
            emissiveIntensity={hovered ? 0.6 : 0.35}
            roughness={0.4}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Top face label — a small monogram dot */}
        <mesh position={[0, 1.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.12, 32]} />
          <meshStandardMaterial color="#64ffda" emissive="#64ffda" emissiveIntensity={0.4} />
        </mesh>

        {/* Side face markers — dim dots, one per side */}
        {[0, 1, 2, 3].map((i) => {
          const angles = [0, Math.PI / 2, Math.PI, Math.PI * 1.5]
          const a = angles[i]
          return (
            <mesh
              key={i}
              position={[Math.sin(a) * 1.001, 0, Math.cos(a) * 1.001]}
              rotation={[0, a, 0]}
            >
              <circleGeometry args={[0.06, 24]} />
              <meshStandardMaterial
                color={i === 0 ? '#64ffda' : '#5b6480'}
                emissive={i === 0 ? '#64ffda' : '#000000'}
                emissiveIntensity={i === 0 ? 0.7 : 0}
              />
            </mesh>
          )
        })}
      </group>
    </Float>
  )
}

function FaceLabels({ face, onSelect }) {
  // Map face index → world position offset for the HTML label
  // We mount labels in screen-space via fixed positioning; Canvas just tells us which is "front"
  const label = crateLabels[face]
  if (!label) return null

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={face}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25 }}
        className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 max-w-[200px] sm:max-w-[240px]"
      >
        <button
          onClick={() => onSelect(label)}
          className="block w-full text-left glass-strong rounded-md p-3 sm:p-4 hover:border-accent-cyan/60 transition-colors"
        >
          <div className="font-mono text-[0.65rem] tracking-eyebrow text-accent-cyan uppercase">
            Case {String(face + 1).padStart(2, '0')}
          </div>
          <div className="mt-1.5 font-display text-xl sm:text-2xl text-ink-primary leading-tight">
            {label.title}
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-xs text-accent-cyan">{label.metric}</span>
            <span className="text-[0.7rem] text-ink-muted clamp-2">{label.desc}</span>
          </div>
        </button>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Crate3D() {
  const containerRef = useRef(null)
  const [face, setFace] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [inView, setInView] = useState(true)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
  }, [])

  useEffect(() => {
    const node = containerRef.current
    if (!node || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '150px 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  if (reducedMotion) {
    // Render a static SVG fallback for accessibility
    return (
      <div className="relative w-full h-full grid place-items-center">
        <div className="relative w-48 h-48 sm:w-56 sm:h-56">
          <div className="absolute inset-0 rounded-md bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10" />
          <div className="absolute top-1/2 left-0 right-0 h-3 -translate-y-1/2 bg-accent-cyan/80" />
          <div className="absolute top-0 bottom-0 left-1/2 w-3 -translate-x-1/2 bg-accent-cyan/80" />
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <Canvas
        shadows
        frameloop={inView ? 'always' : 'demand'}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.4, 5.2], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <directionalLight
            position={[4, 6, 4]}
            intensity={1.1}
            castShadow
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
          />
          <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#a78bfa" />
          <Crate onFaceChange={setFace} />
          <ContactShadows
            position={[0, -1.4, 0]}
            opacity={0.45}
            scale={6}
            blur={2.4}
            far={3}
            color="#000000"
          />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
      <FaceLabels face={face} onSelect={setExpanded} />

      {/* Expanded case-study panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 grid place-items-center bg-bg-primary/85 backdrop-blur-sm rounded-md p-4"
            onClick={() => setExpanded(null)}
          >
            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-md p-5 max-w-sm w-full"
            >
              <div className="font-mono text-[0.65rem] tracking-eyebrow text-accent-cyan uppercase">
                Case study
              </div>
              <h3 className="mt-1.5 font-display text-2xl text-ink-primary">{expanded.title}</h3>
              <div className="mt-3 font-mono text-sm text-accent-cyan">{expanded.metric}</div>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">{expanded.desc}</p>
              <button
                onClick={() => setExpanded(null)}
                className="mt-4 btn-ghost !py-1.5 !px-3 !text-xs"
              >
                Back to crate
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
