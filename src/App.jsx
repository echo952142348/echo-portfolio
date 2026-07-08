import { useEffect } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Strengths from './components/Strengths.jsx'
import Contact from './components/Contact.jsx'

const ambientSectionIds = ['hero', 'about', 'projects', 'strengths', 'contact']

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
