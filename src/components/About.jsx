import SectionAmbientScene from './SectionAmbientScene'
import ReferenceArtwork from './ReferenceArtwork'

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
      <div className="max-shell poster-page about-page">
        <div className="poster-copy about-copy">
          <h2 className="poster-title">ABOUT</h2>
          <p className="poster-kicker">关于我</p>
          <span className="poster-rule" aria-hidden="true" />

          <h3>
            专注电商运营实践，
            <br />
            在执行、整理与优化中<span className="keep-phrase">持续成长</span>。
          </h3>
          <p>
            围绕商品维护、活动执行与订单协同持续积累经验，也在尝试用 AI 工具优化日常工作流程，
            让工作更高效，也让结果更清晰。
          </p>

          <div className="about-stats">
            {stats.map((stat) => (
              <div className="about-stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
                <small>{stat.meta}</small>
              </div>
            ))}
          </div>

          <div className="about-ability-row">
            {aboutAbilities.map((item) => (
              <article className="about-ability" key={item.title}>
                <span className={`line-icon line-icon-${item.icon}`} aria-hidden="true" />
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
          <div className="about-timeline">
            {timeline.map(([number, title, meta]) => (
              <div className="timeline-item" key={number}>
                <span>{number}</span>
                <strong>{title}</strong>
                <small>{meta}</small>
              </div>
            ))}
          </div>
          <div className="about-signature">
            <strong>Shu Xiang</strong>
            <span>KEEP BUILDING.</span>
            <span>KEEP IMPROVING.</span>
          </div>
        </div>

        <div className="section-footer-meta" aria-hidden="true">
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
