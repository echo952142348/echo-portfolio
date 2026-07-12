import { useCallback, useEffect, useState } from 'react'
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
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useOverlayHistory(menuOpen, closeMenu, 'mobile-menu')

  useEffect(() => {
    if (!menuOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
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
      <nav className="nav-shell" aria-label="主导航">
        <a className="brand" href="#hero" aria-label="返回首页" onClick={(event) => handleNavClick(event, '#hero')}>
          <span>SX</span>
          <small>/</small>
          <strong>PORTFOLIO</strong>
        </a>

        <div className="nav-links">
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
          type="button"
          aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
          aria-expanded={menuOpen}
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
