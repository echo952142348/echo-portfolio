import { useEffect, useRef } from 'react'

export function scrollToSection(href) {
  if (typeof window === 'undefined') return

  const targetId = href?.startsWith('#') ? href.slice(1) : href
  const target = targetId ? document.getElementById(targetId) : null

  if (!target) return

  target.scrollIntoView({ behavior: 'smooth', block: 'start' })

  if (window.location.hash) {
    const cleanUrl = `${window.location.pathname}${window.location.search}`
    window.history.replaceState(window.history.state, '', cleanUrl)
  }
}

export function useOverlayHistory(isOpen, onClose, overlayName) {
  const onCloseRef = useRef(onClose)
  const closedByPopRef = useRef(false)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return undefined

    const marker = `${overlayName}-${Date.now()}-${Math.random().toString(36).slice(2)}`
    const currentState =
      window.history.state && typeof window.history.state === 'object' ? window.history.state : {}

    closedByPopRef.current = false
    window.history.pushState({ ...currentState, portfolioOverlay: marker }, '', window.location.href)

    const handlePopState = (event) => {
      if (event.state?.portfolioOverlay === marker) return

      closedByPopRef.current = true
      onCloseRef.current()
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)

      if (!closedByPopRef.current && window.history.state?.portfolioOverlay === marker) {
        window.history.back()
      }
    }
  }, [isOpen, overlayName])
}
