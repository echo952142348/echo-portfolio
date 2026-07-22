import { useEffect } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Strengths from './components/Strengths.jsx'
import Contact from './components/Contact.jsx'
import { useGlassBackgroundMotion } from './motion/useGlassBackgroundMotion'

const ambientSectionIds = ['hero', 'about', 'projects', 'strengths', 'contact']
const DESIGN_WIDTH = 2048
const DESIGN_HEIGHT = 1152

function updateFidelityStageVars() {
  if (typeof window === 'undefined') return

  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const scale = Math.max(viewportWidth / DESIGN_WIDTH, viewportHeight / DESIGN_HEIGHT)
  const renderedWidth = DESIGN_WIDTH * scale
  const renderedHeight = DESIGN_HEIGHT * scale
  const offsetX = (viewportWidth - renderedWidth) / 2
  const offsetY = (viewportHeight - renderedHeight) / 2
  const rootStyle = document.documentElement.style

  rootStyle.setProperty('--stage-scale', String(scale))
  rootStyle.setProperty('--stage-x', `${offsetX}px`)
  rootStyle.setProperty('--stage-y', `${offsetY}px`)
  rootStyle.setProperty('--stage-rendered-width', `${renderedWidth}px`)
  rootStyle.setProperty('--stage-rendered-height', `${renderedHeight}px`)
}

function useFidelityStage() {
  useEffect(() => {
    updateFidelityStageVars()

    const observer = new ResizeObserver(updateFidelityStageVars)
    observer.observe(document.documentElement)
    window.addEventListener('resize', updateFidelityStageVars)
    window.addEventListener('orientationchange', updateFidelityStageVars)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateFidelityStageVars)
      window.removeEventListener('orientationchange', updateFidelityStageVars)
    }
  }, [])
}

function useAmbientSectionVisibility() {
  useEffect(() => {
    const sections = ambientSectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (sections.length === 0) {
      return undefined
    }

    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-visible'))
      return () => {
        sections.forEach((section) => section.classList.remove('is-visible'))
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-visible', entry.isIntersecting)
        })
      },
      {
        root: null,
        rootMargin: '-20% 0px -20% 0px',
        threshold: 0,
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
      sections.forEach((section) => section.classList.remove('is-visible'))
    }
  }, [])
}

export default function App() {
  useAmbientSectionVisibility()
  useFidelityStage()
  useGlassBackgroundMotion()

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Strengths />
        <Contact />
      </main>
    </>
  )
}
