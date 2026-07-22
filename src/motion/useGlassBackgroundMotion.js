import { useEffect } from 'react'

const sectionIds = ['hero', 'about', 'projects', 'strengths', 'contact']
const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

function queryEnabled(name) {
  return new URLSearchParams(window.location.search).get(name) === '1'
}

function backgroundMotionIsOff() {
  return new URLSearchParams(window.location.search).get('backgroundMotion') === 'off'
}

function readGlassMotionAudit(sections) {
  return sections.map((section) => {
    const tracks = [...section.querySelectorAll('.glass-edge-layer--primary .glass-flow__track')]
    const artwork = section.querySelector('.reference-art-clean')
    const motionCanvas = section.querySelector('.glass-motion__masked')
    const readElement = (element) => {
      if (!element) return null
      const style = getComputedStyle(element)
      const supportsAnimationsApi = typeof element.getAnimations === 'function'
      const animations = supportsAnimationsApi ? element.getAnimations() : []
      return {
        className: element.className,
        animationName: style.animationName,
        animationDuration: style.animationDuration,
        animationPlayState: style.animationPlayState,
        opacity: style.opacity,
        transform: style.transform,
        animationsApiSupported: supportsAnimationsApi,
        animations: animations.map((animation) => ({
          animationName: animation.animationName,
          currentTime: animation.currentTime,
          playState: animation.playState,
          playbackRate: animation.playbackRate,
        })),
      }
    }

    const readRect = (element) => {
      if (!element) return null
      const rect = element.getBoundingClientRect()
      return {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      }
    }

    return {
      id: section.id,
      active: section.classList.contains('is-glass-motion-active'),
      alignment: {
        artwork: readRect(artwork),
        motionCanvas: readRect(motionCanvas),
      },
      tracks: tracks.map((track) => ({
        track: readElement(track),
        lightPlane: readElement(track.querySelector('.glass-light-plane')),
      })),
      layers: [...section.querySelectorAll('.glass-edge-layer')].map((layer) => ({
        className: layer.className,
        maskImage: getComputedStyle(layer).maskImage || getComputedStyle(layer).webkitMaskImage,
        tracks: [...layer.querySelectorAll('.glass-track')].map(readElement),
      })),
    }
  })
}

export function useGlassBackgroundMotion() {
  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean)
    const reducedMotion = window.matchMedia(reducedMotionQuery)
    const motionDisabled = backgroundMotionIsOff()

    const maskDebugEnabled = queryEnabled('glassMaskDebug')
    const motionDebugEnabled = queryEnabled('glassMotionDebug')
    const edgeDebugEnabled = queryEnabled('glassEdgeDebug')
    const lightPlaneDebugEnabled = queryEnabled('glassLightPlaneDebug')
    body.toggleAttribute('data-glass-mask-debug', maskDebugEnabled)
    body.toggleAttribute('data-glass-motion-debug', motionDebugEnabled)
    body.toggleAttribute('data-glass-edge-debug', edgeDebugEnabled)
    body.toggleAttribute('data-glass-light-plane-debug', lightPlaneDebugEnabled)
    body.toggleAttribute('data-background-motion-off', motionDisabled)
    body.toggleAttribute('data-glass-motion-reduced', reducedMotion.matches)

    root.classList.add('glass-motion-ready')
    window.__glassMotionAudit = () => readGlassMotionAudit(sections)
    const writeGlassMotionAudit = () => {
      root.dataset.glassMotionAudit = JSON.stringify(readGlassMotionAudit(sections))
    }
    const auditTimer = motionDebugEnabled
      ? window.setInterval(writeGlassMotionAudit, 250)
      : 0

    if (sections.length === 0 || motionDisabled || reducedMotion.matches) {
      return () => {
        window.clearInterval(auditTimer)
        root.classList.remove('glass-motion-ready')
        delete root.dataset.glassMotionAudit
        delete window.__glassMotionAudit
        delete body.dataset.glassMotionPage
        delete body.dataset.glassMotionPaused
        delete body.dataset.glassEdgeDebug
        delete body.dataset.glassLightPlaneDebug
      }
    }

    let activeSection = null
    const visibility = new Map(sections.map((section) => [section, 0]))

    const motionIsPaused = () =>
      document.visibilityState !== 'visible' || body.classList.contains('modal-open')

    const chooseActiveSection = () => {
      const nextSection = sections.reduce((best, section) => {
        const ratio = visibility.get(section) ?? 0
        const bestRatio = best ? visibility.get(best) ?? 0 : 0
        return ratio > bestRatio ? section : best
      }, null)

      const next = nextSection && (visibility.get(nextSection) ?? 0) > 0 ? nextSection : null
      if (next === activeSection) return

      if (activeSection) {
        activeSection.classList.remove('is-glass-motion-active')
      }

      activeSection = next

      if (activeSection && !motionIsPaused()) {
        activeSection.classList.add('is-glass-motion-active')
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0)
        })
        chooseActiveSection()
      },
      {
        root: null,
        rootMargin: '-1px 0px -1px 0px',
        threshold: [0, 0.01, 0.08, 0.2, 0.4, 0.6, 0.8],
      },
    )

    sections.forEach((section) => observer.observe(section))

    const handleVisibilityChange = () => {
      body.toggleAttribute('data-glass-motion-page', document.visibilityState !== 'visible')
      if (document.visibilityState === 'visible') {
        chooseActiveSection()
      }
    }

    const syncPauseState = () => {
      const paused = motionIsPaused()
      body.toggleAttribute('data-glass-motion-paused', paused)
      if (paused) {
        activeSection?.classList.remove('is-glass-motion-active')
      } else {
        activeSection?.classList.add('is-glass-motion-active')
      }
    }

    const bodyObserver = new MutationObserver(syncPauseState)
    bodyObserver.observe(body, { attributes: true, attributeFilter: ['class'] })

    document.addEventListener('visibilitychange', handleVisibilityChange)
    syncPauseState()

    return () => {
      observer.disconnect()
      bodyObserver.disconnect()
      window.clearInterval(auditTimer)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      sections.forEach((section) => {
        section.classList.remove('is-glass-motion-active')
      })
      root.classList.remove('glass-motion-ready')
      delete root.dataset.glassMotionAudit
      delete window.__glassMotionAudit
      delete body.dataset.glassMotionPage
      delete body.dataset.glassMotionPaused
      delete body.dataset.glassEdgeDebug
      delete body.dataset.glassLightPlaneDebug
    }
  }, [])
}
