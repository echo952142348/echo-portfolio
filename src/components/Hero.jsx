import { useEffect, useRef } from 'react'
import { scrollToSection } from '../utils/navigation'

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    const finePointer = window.matchMedia('(pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!hero || !finePointer.matches || reducedMotion.matches) {
      return undefined
    }

    let frameId = 0
    let currentX = 0
    let currentY = 0
    let targetX = 0
    let targetY = 0

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.12
      currentY += (targetY - currentY) * 0.12

      hero.style.setProperty('--hero-parallax-left-x', `${(currentX * 12).toFixed(2)}px`)
      hero.style.setProperty('--hero-parallax-left-y', `${(currentY * 12).toFixed(2)}px`)
      hero.style.setProperty('--hero-parallax-top-x', `${(currentX * 8).toFixed(2)}px`)
      hero.style.setProperty('--hero-parallax-top-y', `${(currentY * 8).toFixed(2)}px`)
      hero.style.setProperty('--hero-parallax-front-x', `${(currentX * 18).toFixed(2)}px`)
      hero.style.setProperty('--hero-parallax-front-y', `${(currentY * 18).toFixed(2)}px`)
      hero.style.setProperty('--hero-parallax-small-x', `${(currentX * 4).toFixed(2)}px`)
      hero.style.setProperty('--hero-parallax-small-y', `${(currentY * 4).toFixed(2)}px`)
      hero.style.setProperty('--hero-parallax-tiny-x', `${(currentX * 3).toFixed(2)}px`)
      hero.style.setProperty('--hero-parallax-tiny-y', `${(currentY * 3).toFixed(2)}px`)

      if (Math.abs(targetX - currentX) > 0.004 || Math.abs(targetY - currentY) > 0.004) {
        frameId = window.requestAnimationFrame(updateParallax)
        return
      }

      frameId = 0
    }

    const requestParallaxFrame = () => {
      if (frameId === 0) {
        frameId = window.requestAnimationFrame(updateParallax)
      }
    }

    const handlePointerMove = (event) => {
      const rect = hero.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * -2
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * -2

      targetX = Math.max(-1, Math.min(1, x))
      targetY = Math.max(-1, Math.min(1, y))
      requestParallaxFrame()
    }

    const resetParallax = () => {
      targetX = 0
      targetY = 0
      requestParallaxFrame()
    }

    hero.addEventListener('pointermove', handlePointerMove, { passive: true })
    hero.addEventListener('pointerleave', resetParallax)

    return () => {
      hero.removeEventListener('pointermove', handlePointerMove)
      hero.removeEventListener('pointerleave', resetParallax)
      window.cancelAnimationFrame(frameId)
      hero.style.removeProperty('--hero-parallax-left-x')
      hero.style.removeProperty('--hero-parallax-left-y')
      hero.style.removeProperty('--hero-parallax-top-x')
      hero.style.removeProperty('--hero-parallax-top-y')
      hero.style.removeProperty('--hero-parallax-front-x')
      hero.style.removeProperty('--hero-parallax-front-y')
      hero.style.removeProperty('--hero-parallax-small-x')
      hero.style.removeProperty('--hero-parallax-small-y')
      hero.style.removeProperty('--hero-parallax-tiny-x')
      hero.style.removeProperty('--hero-parallax-tiny-y')
    }
  }, [])

  const handleHeroAction = (event, href) => {
    event.preventDefault()
    scrollToSection(href)
  }

  return (
    <section className="hero section-full" id="hero" ref={heroRef}>
      <div className="hero-sphere-scene" aria-hidden="true">
        <span className="hero-sphere-layer hero-sphere-layer-left">
          <span className="hero-sphere hero-sphere-left" />
        </span>
        <span className="hero-sphere-layer hero-sphere-layer-top">
          <span className="hero-sphere hero-sphere-top" />
        </span>
        <span className="hero-sphere-layer hero-sphere-layer-front">
          <span className="hero-sphere hero-sphere-front" />
        </span>
        <span className="hero-sphere-layer hero-sphere-layer-small">
          <span className="hero-sphere hero-sphere-small" />
        </span>
        <span className="hero-sphere-layer hero-sphere-layer-tiny">
          <span className="hero-sphere hero-sphere-tiny" />
        </span>
      </div>
      <div className="hero-shell max-shell">
        <div className="hero-showcase glass-panel">
          <div className="showcase-top">
            <div className="showcase-pills">
              <span>作品集</span>
              <span>项目 04</span>
              <span>能力 08</span>
            </div>
            <div className="showcase-focus">
              <span />
              聚焦 2026
            </div>
          </div>

          <div className="showcase-center">
            <div className="soft-ring" aria-hidden="true" />
            <div className="kinetic-title" aria-hidden="true">
              <span>Portfolio System · Personal Brand · Portfolio System · Personal Brand ·</span>
            </div>
            <p className="eyebrow">个人品牌 / 作品集系统</p>
            <h1>
              <span>让作品与能力</span>
              <span>被清楚看见。</span>
            </h1>
            <div className="showcase-cloud" aria-hidden="true" />
          </div>

          <div className="showcase-bottom">
            <div>
              <p>
                专注电商运营实践，围绕商品维护、活动执行与订单协同持续积累经验，也在尝试用 AI 工具优化日常工作流程——目前正在寻找新的电商运营岗位机会。
              </p>
              <div className="hero-actions">
                <a className="button primary" href="#projects" onClick={(event) => handleHeroAction(event, '#projects')}>
                  查看作品
                </a>
                <a className="button secondary" href="#contact" onClick={(event) => handleHeroAction(event, '#contact')}>
                  联系我
                </a>
              </div>
            </div>

            <div className="hero-overview" aria-hidden="true">
              <div className="overview-status">
                <span>作品集状态</span>
                <strong>作品集持续更新中</strong>
                <small>近期项目经验优先展示</small>
              </div>
              <div className="dashboard-tags">
                <span>设计</span>
                <span>数据</span>
                <span>AI 工具</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
