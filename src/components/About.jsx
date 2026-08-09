import SectionAmbientScene from './SectionAmbientScene'
import ReferenceArtwork from './ReferenceArtwork'
import IconBadge from './IconBadge'
import GlassBackgroundMotion from '../motion/GlassBackgroundMotion'

const stats = [
  { value: '2+', label: '年运营经验', meta: 'EXPERIENCE' },
  { value: '04', label: '个项目沉淀', meta: 'PROJECTS' },
  { value: '08', label: '项能力方向', meta: 'CAPABILITIES' },
]

const aboutAbilities = [
  {
    title: '执行力',
    text: '把想法落地，把细节做好。',
    icon: 'target',
  },
  {
    title: '整理力',
    text: '信息结构化，让复杂变清晰。',
    icon: 'grid',
  },
  {
    title: '运营思维',
    text: '关注流程与体验，驱动结果优化。',
    icon: 'trend',
  },
  {
    title: 'AI 工具辅助',
    text: '让重复工作更高效，让创造更专注。',
    icon: 'spark',
  },
]

const timeline = [
  ['01', '经历', 'EXPERIENCE'],
  ['02', '成长', 'GROWTH'],
  ['03', '方向', 'DIRECTION'],
]

export default function About() {
  return (
    <section className="section about" id="about">
      <SectionAmbientScene variant="about" />
      <ReferenceArtwork variant="about" />
      <GlassBackgroundMotion
        variant="about"
        desktopMask="/motion-masks/about-glass-desktop.svg"
        mobileMask="/motion-masks/about-glass-mobile.svg"
      />
      <div className="max-shell poster-page about-page">
        <div className="poster-copy about-copy">
          <h2 className="poster-title" data-motion="mask-reveal">ABOUT</h2>
          <p className="poster-kicker" data-motion="fade-in" style={{ '--motion-delay-desktop': '65ms', '--motion-delay-mobile': '30ms' }}>关于我</p>
          <span className="poster-rule" aria-hidden="true" data-motion="line-x" style={{ '--motion-delay-desktop': '95ms', '--motion-delay-mobile': '45ms' }} />

          <h3 data-motion="fade-up" style={{ '--motion-delay-desktop': '135ms', '--motion-delay-mobile': '70ms' }}>
            专注电商运营实践，
            <br />
            在执行、整理与优化中<span className="keep-phrase">持续成长</span>。
          </h3>
          <p data-motion="fade-in" style={{ '--motion-delay-desktop': '200ms', '--motion-delay-mobile': '105ms' }}>
            围绕商品维护、活动执行与订单协同持续积累经验，也在尝试用 AI 工具优化日常工作流程，
            让工作更高效，也让结果更清晰。
          </p>

          <div className="about-stats">
            {stats.map((stat, index) => (
              <div
                className="about-stat"
                key={stat.label}
                data-motion="stat-item"
                style={{ '--motion-delay-desktop': `${270 + index * 60}ms`, '--motion-delay-mobile': `${130 + index * 40}ms` }}
              >
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
                <small>{stat.meta}</small>
              </div>
            ))}
          </div>

          <div className="about-ability-row">
            {aboutAbilities.map((item, index) => (
              <article
                className="about-ability"
                key={item.title}
                data-motion="ability-row"
                style={{ '--motion-delay-desktop': `${420 + index * 55}ms`, '--motion-delay-mobile': '25ms' }}
              >
                <IconBadge name={item.icon} className={`line-icon line-icon-${item.icon} about-icon-badge`} />
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="about-visual" aria-hidden="true">
          <div className="glass-helix">
            <span />
            <span />
          </div>
          <div className="poster-sphere poster-sphere-about" />
        </div>

        <div className="about-side">
          <div className="about-timeline" data-motion="timeline-line" style={{ '--motion-delay-desktop': '300ms', '--motion-delay-mobile': '20ms' }}>
            {timeline.map(([number, title, meta], index) => (
              <div className="timeline-item" key={number} style={{ '--timeline-delay': `${index * 70}ms` }}>
                <span>{number}</span>
                <strong>{title}</strong>
                <small>{meta}</small>
              </div>
            ))}
          </div>
          <div className="about-signature" data-motion="fade-in" style={{ '--motion-delay-desktop': '610ms', '--motion-delay-mobile': '35ms' }}>
            <strong>Shu Xiang</strong>
            <span>KEEP BUILDING.</span>
            <span>KEEP IMPROVING.</span>
          </div>
        </div>

        <div className="section-footer-meta" aria-hidden="true" data-motion="fade-up" style={{ '--motion-delay-desktop': '670ms', '--motion-delay-mobile': '25ms' }}>
          <div>
            <span>BASED IN</span>
            <strong>HUANGSHAN</strong>
          </div>
          <i />
          <strong>HEFEI</strong>
          <em />
          <div>
            <span>ROLE</span>
            <strong>ECOMMERCE OPERATIONS</strong>
          </div>
        </div>
      </div>
    </section>
  )
}
