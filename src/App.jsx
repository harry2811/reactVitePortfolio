import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import SectionGutter from './components/SectionGutter'
import Preloader from './components/Preloader'
import CursorCloud from './components/CursorCloud'

export default function App() {
  // The page is mounted behind the loader (so assets and the 3D scene warm up),
  // but the hero holds its entrance until the panel has flicked away.
  const [ready, setReady] = useState(false)

  return (
    <div className="min-h-screen relative" aria-busy={!ready}>
      {!ready && <Preloader onDone={() => setReady(true)} />}
      <CursorCloud />
      <ScrollProgress />
      <Navbar />
      <SectionGutter />
      <main>
        <Hero ready={ready} />
        <Portfolio />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
