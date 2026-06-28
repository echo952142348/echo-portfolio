const navItems = [
  { label: '首页', href: '#hero' },
  { label: '经历', href: '#about' },
  { label: '项目', href: '#projects' },
  { label: '优势', href: '#strengths' },
  { label: '联系', href: '#contact' },
]

export default function Header() {
  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="主导航">
        <a className="brand" href="#hero" aria-label="返回首页">
          <span className="brand-mark">SX</span>
          <span>舒翔</span>
        </a>

        <div className="nav-links">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>

        <a className="nav-contact" href="#contact">
          联系我
        </a>
      </nav>
    </header>
  )
}
