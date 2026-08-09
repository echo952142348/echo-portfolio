import { useCallback, useEffect, useRef, useState } from 'react'
import { scrollToSection, useOverlayHistory } from '../utils/navigation'

const sections = [
  { id: 'hero', label: 'PORTFOLIO', number: '01', href: '#hero', mobileLabel: '01 / PORTFOLIO' },
  { id: 'about', label: 'ABOUT', number: '02', href: '#about', mobileLabel: '02 / ABOUT' },
  { id: 'projects', label: 'PROJECTS', number: '03', href: '#projects', mobileLabel: '03 / PROJECTS' },
  { id: 'strengths', label: 'CAPABILITIES', number: '04', href: '#strengths', mobileLabel: '04 / CAPABILITIES' },
  { id: 'contact', label: 'CONTACT', number: '05', href: '#contact', mobileLabel: '05 / CONTACT' },
]

const sectionMeta = Object.fromEntries(sections.map((section) => [section.id, section]))

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isScrolled, setIsScrolled] = useState(false)
  const activeSectionRef = useRef('hero')
  const isScrolledRef = useRef(false)
  const navRef = useRef(null)
  const menuToggleRef = useRef(null)
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const setActiveSectionSafely = useCallback((sectionId) => {
    if (activeSectionRef.current === sectionId) {
      return
    }

    activeSectionRef.current = sectionId
    setActiveSection(sectionId)
  }, [])

  useOverlayHistory(menuOpen, closeMenu, 'mobile-menu')

  useEffect(() => {
    if (!menuOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuToggleRef.current?.focus({ preventScroll: true })
        return
      }

      if (event.key === 'Tab' && navRef.current) {
        const focusable = Array.from(navRef.current.querySelectorAll('a[href], button:not([disabled])')).filter(
          (element) => element instanceof HTMLElement && element.offsetParent !== null,
        )

        if (focusable.length === 0) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus({ preventScroll: true })
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus({ preventScroll: true })
        }
      }
    }

    const handlePointerDown = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)
    const focusTimer = window.setTimeout(() => {
      navRef.current?.querySelector('.nav-links a')?.focus({ preventScroll: true })
    }, 0)

    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [menuOpen])

  useEffect(() => {
    const sectionElements = sections
      .map(({ id }) => id)
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (sectionElements.length === 0) {
      return undefined
    }

    let frameId = 0

    const updateActiveSection = () => {
      frameId = 0

      const nextScrolled = window.scrollY > 24
      if (isScrolledRef.current !== nextScrolled) {
        isScrolledRef.current = nextScrolled
        setIsScrolled(nextScrolled)
      }

      if (document.body.classList.contains('modal-open')) {
        return
      }

      const marker = window.innerHeight * 0.42
      const current =
        sectionElements
          .filter((section) => section.getBoundingClientRect().top <= marker)
          .at(-1) ?? sectionElements[0]

      if (current?.id) {
        setActiveSectionSafely(current.id)
      }
    }

    const requestActiveUpdate = () => {
      if (frameId === 0) {
        frameId = window.requestAnimationFrame(updateActiveSection)
      }
    }

    requestActiveUpdate()

    window.addEventListener('scroll', requestActiveUpdate, { passive: true })
    window.addEventListener('resize', requestActiveUpdate)

    if (!('IntersectionObserver' in window)) {
      return () => {
        window.removeEventListener('scroll', requestActiveUpdate)
        window.removeEventListener('resize', requestActiveUpdate)
        window.cancelAnimationFrame(frameId)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          requestActiveUpdate()
        }
      },
      {
        root: null,
        rootMargin: '-35% 0px -55% 0px',
        threshold: [0, 0.2, 0.45],
      },
    )

    sectionElements.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', requestActiveUpdate)
      window.removeEventListener('resize', requestActiveUpdate)
      window.cancelAnimationFrame(frameId)
    }
  }, [setActiveSectionSafely])

  const handleNavClick = (event, href) => {
    event.preventDefault()
    const targetId = href.replace('#', '')

    if (sectionMeta[targetId]) {
      setActiveSectionSafely(targetId)
      window.dispatchEvent(new CustomEvent('motion:reveal-section', { detail: { id: targetId } }))
    }

    if (menuOpen) {
      closeMenu()
      window.setTimeout(() => scrollToSection(href), 230)
      return
    }

    scrollToSection(href)
    closeMenu()
  }

  const activeMeta = sectionMeta[activeSection] ?? sectionMeta.hero

  return (
    <header
      className={`site-header ${menuOpen ? 'menu-open' : ''} ${isScrolled ? 'is-scrolled' : ''} ${activeSection === 'hero' ? 'is-hero-active' : ''}`}
    >
      <nav className="nav-shell" ref={navRef} aria-label="主导航">
        <a className="brand" href="#hero" aria-label="返回首页" onClick={(event) => handleNavClick(event, '#hero')}>
          <span>SX</span>
          <small>/</small>
          <strong key={activeSection} className="brand-section-label">{activeMeta.label}</strong>
        </a>

        <div className="nav-links" id="mobile-navigation-menu">
          {sections.map((item) => (
            <a
              className={activeSection === item.id ? 'is-active' : ''}
              key={item.href}
              href={item.href}
              aria-current={activeSection === item.id ? 'page' : undefined}
              onClick={(event) => handleNavClick(event, item.href)}
            >
              <span className="nav-label-desktop">{item.number} / {item.label}</span>
              <span className="nav-label-mobile">{item.mobileLabel}</span>
            </a>
          ))}
        </div>

        <button
          className="mobile-menu-toggle"
          ref={menuToggleRef}
          type="button"
          aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <a className="nav-contact" href="#contact" aria-label="Contact" onClick={(event) => handleNavClick(event, '#contact')}>
          <span />
        </a>
      </nav>
    </header>
  )
}
