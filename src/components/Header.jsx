import { useCallback, useEffect, useRef, useState } from 'react'
import { scrollToSection, useOverlayHistory } from '../utils/navigation'

const navItems = [
  { label: '01 / PORTFOLIO', href: '#hero', key: 'portfolio' },
  { label: 'ABOUT', href: '#about', key: 'portfolio', menuOnly: true },
  { label: '02 / PROJECTS', href: '#projects', key: 'projects' },
  { label: '03 / CAPABILITIES', href: '#strengths', key: 'capabilities' },
  { label: 'CONTACT', href: '#contact', key: 'contact', menuOnly: true },
]

const sectionMeta = {
  hero: { key: 'portfolio', label: 'PORTFOLIO' },
  about: { key: 'portfolio', label: 'ABOUT' },
  projects: { key: 'projects', label: 'PROJECTS' },
  strengths: { key: 'capabilities', label: 'CAPABILITIES' },
  contact: { key: 'contact', label: 'CONTACT' },
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const navRef = useRef(null)
  const menuToggleRef = useRef(null)
  const closeMenu = useCallback(() => setMenuOpen(false), [])

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
    const sections = Object.keys(sectionMeta)
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (sections.length === 0) {
      return undefined
    }

    let frameId = 0

    const updateActiveSection = () => {
      frameId = 0

      const marker = window.innerHeight * 0.34
      const current =
        sections
          .filter((section) => section.getBoundingClientRect().top <= marker)
          .at(-1) ?? sections[0]

      if (current?.id) {
        setActiveSection(current.id)
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
        rootMargin: '-35% 0px -45% 0px',
        threshold: [0, 0.2, 0.45],
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', requestActiveUpdate)
      window.removeEventListener('resize', requestActiveUpdate)
      window.cancelAnimationFrame(frameId)
    }
  }, [])

  const handleNavClick = (event, href) => {
    event.preventDefault()

    if (menuOpen) {
      closeMenu()
      window.setTimeout(() => scrollToSection(href), 140)
      return
    }

    scrollToSection(href)
    closeMenu()
  }

  const activeMeta = sectionMeta[activeSection] ?? sectionMeta.hero

  return (
    <header className={`site-header ${menuOpen ? 'menu-open' : ''} ${activeSection === 'hero' ? 'is-hero-active' : ''}`}>
      <nav className="nav-shell" ref={navRef} aria-label="主导航">
        <a className="brand" href="#hero" aria-label="返回首页" onClick={(event) => handleNavClick(event, '#hero')}>
          <span>SX</span>
          <small>/</small>
          <strong>PORTFOLIO</strong>
        </a>

        <div className="nav-links" id="mobile-navigation-menu">
          {navItems.map((item) => (
            <a
              className={`${activeMeta.key === item.key ? 'is-active' : ''} ${item.menuOnly ? 'is-menu-extra' : ''}`}
              key={item.href}
              href={item.href}
              onClick={(event) => handleNavClick(event, item.href)}
            >
              {item.label}
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

        <a className="nav-contact" href="#contact" onClick={(event) => handleNavClick(event, '#contact')}>
          {activeMeta.label}
          <span />
        </a>
      </nav>
    </header>
  )
}
