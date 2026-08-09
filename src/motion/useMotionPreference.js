import { useEffect, useState } from 'react'

const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

export function prefersReducedMotion() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }

  return window.matchMedia(reducedMotionQuery).matches
}

export function useMotionPreference() {
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined
    }

    const mediaQuery = window.matchMedia(reducedMotionQuery)
    const handleChange = () => setReducedMotion(mediaQuery.matches)

    handleChange()
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return reducedMotion
}
