import { scrollToSection } from '../utils/navigation'

export default function Hero() {
  const handleHeroAction = (event, href) => {
    event.preventDefault()
    scrollToSection(href)
  }

  return (
    <section className="hero section-full" id="hero">
      <div className="hero-ambient" aria-hidden="true">
        <span className="hero-ambient-orb hero-ambient-orb-1" />
        <span className="hero-ambient-orb hero-ambient-orb-2" />
        <span className="hero-ambient-orb hero-ambient-orb-3" />
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
              {/* TODO: 后续替换为更真实的个人定位与一句话介绍。 */}
              <p>
                这里是舒翔的个人作品集入口，用于展示项目实践、能力方向与阶段性成长。
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
                <strong>持续整理中</strong>
                <small>项目 / 能力 / 作品展示</small>
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
