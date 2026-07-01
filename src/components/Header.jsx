import { useCallback, useEffect, useState } from 'react'
import { scrollToSection, useOverlayHistory } from '../utils/navigation'

const navItems = [
  { label: '首页', href: '#hero' },
  { label: '经历', href: '#about' },
  { label: '项目', href: '#projects' },
  { label: '优势', href: '#strengths' },
  { label: '联系', href: '#contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
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

  return (
    <header className={`site-header ${menuOpen ? 'menu-open' : ''}`}>
      <nav className="nav-shell" aria-label="主导航">
        <a className="brand" href="#hero" aria-label="返回首页" onClick={(event) => handleNavClick(event, '#hero')}>
          <span className="brand-mark">SX</span>
          <span>舒翔</span>
        </a>

        <div className="nav-links">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={(event) => handleNavClick(event, item.href)}>
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
          联系我
        </a>
      </nav>
    </header>
  )
}
