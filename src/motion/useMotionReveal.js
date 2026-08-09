import { useEffect } from 'react'
import { prefersReducedMotion } from './useMotionPreference'

const motionSelector = '[data-motion]'

export function useMotionReveal() {
  useEffect(() => {
    const root = document.documentElement
    const elements = Array.from(document.querySelectorAll(motionSelector))

    if (elements.length === 0) {
      return undefined
    }

    root.classList.add('motion-ready')

    const reveal = (element) => element.classList.add('is-motion-visible')
    const revealAll = () => elements.forEach(reveal)

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      revealAll()
      return undefined
    }

    const mobileQuery = window.matchMedia('(max-width: 1024px)')
    let observer

    const createObserver = () => {
      observer?.disconnect()
      const sections = Array.from(
        new Set(elements.map((element) => element.closest('section')).filter(Boolean)),
      )

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return

            entry.target.querySelectorAll(motionSelector).forEach(reveal)
            observer?.unobserve(entry.target)
          })
        },
        mobileQuery.matches
          ? { root: null, rootMargin: '0px 0px 3% 0px', threshold: 0.08 }
          : { root: null, rootMargin: '0px 0px -5% 0px', threshold: 0.14 },
      )

      sections
        .filter((section) => section.querySelector(`${motionSelector}:not(.is-motion-visible)`))
        .forEach((section) => observer.observe(section))
    }

    const revealVisibleElements = () => {
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        if (rect.bottom > 0 && rect.top < window.innerHeight) reveal(element)
      })
    }

    const handleSectionReveal = (event) => {
      const sectionId = event.detail?.id
      const section = sectionId ? document.getElementById(sectionId) : null
      if (!section) return

      section.querySelectorAll(motionSelector).forEach(reveal)
    }

    const handlePageShow = () => window.requestAnimationFrame(revealVisibleElements)

    createObserver()
    const initialRevealFrame = window.requestAnimationFrame(revealVisibleElements)
    window.addEventListener('motion:reveal-section', handleSectionReveal)
    window.addEventListener('pageshow', handlePageShow)
    mobileQuery.addEventListener?.('change', createObserver)

    return () => {
      window.cancelAnimationFrame(initialRevealFrame)
      observer?.disconnect()
      window.removeEventListener('motion:reveal-section', handleSectionReveal)
      window.removeEventListener('pageshow', handlePageShow)
      mobileQuery.removeEventListener?.('change', createObserver)
    }
  }, [])
}
