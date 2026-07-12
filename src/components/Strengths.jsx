import SectionAmbientScene from './SectionAmbientScene'
import ReferenceArtwork from './ReferenceArtwork'

const strengths = [
  {
    title: '项目执行',
    text: '高效推进项目落地，把控节奏与质量。',
    icon: 'flag',
  },
  {
    title: '内容整理',
    text: '信息整理与内容优化，提升呈现效率。',
    icon: 'doc',
  },
  {
    title: '数据分析',
    text: '基础数据分析与洞察，支撑运营决策。',
    icon: 'pie',
  },
  {
    title: '视觉审美',
    text: '具备基础审美能力，优化视觉呈现。',
    icon: 'eye',
  },
  {
    title: '工具使用',
    text: '熟练使用多种运营与设计工具。',
    icon: 'tool',
  },
  {
    title: '沟通协作',
    text: '良好沟通与协作，推动团队高效合作。',
    icon: 'people',
  },
  {
    title: '持续学习',
    text: '保持学习热情，持续吸收新知识。',
    icon: 'book',
  },
  {
    title: 'AI 工具辅助效率提升',
    text: '运用 AI 提升内容生产与运营效率。',
    icon: 'ai',
  },
]

export default function Strengths() {
  return (
    <section className="section strengths" id="strengths">
      <SectionAmbientScene variant="strengths" />
      <ReferenceArtwork variant="strengths" />
      <div className="max-shell poster-page strengths-page">
        <div className="poster-copy strengths-copy">
          <h2 className="poster-title">CAPABILITIES</h2>
          <p className="poster-kicker">能力体系</p>
          <span className="poster-rule" aria-hidden="true" />
          <h3>
            在实践中不断拓展与沉淀，
            <br />
            构建可持续成长的能力体系。
          </h3>
          <p>
            围绕电商运营核心场景，沉淀 08 项能力方向，持续提升执行效率与业务质量。
          </p>
        </div>

        <div className="strength-grid capability-list">
          {strengths.map((item, index) => (
            <article className={`strength-card capability-item strength-card-${String(index + 1).padStart(2, '0')}`} key={item.title}>
              <span className="capability-number">{String(index + 1).padStart(2, '0')}</span>
              <i className={`capability-icon capability-icon-${item.icon}`} aria-hidden="true" />
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
              <span className="capability-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <strong aria-hidden="true">→</strong>
            </article>
          ))}
        </div>
        <div className="capability-decor" aria-hidden="true">
          <span className="glass-loop" />
          <span className="poster-sphere poster-sphere-capability" />
          <span className="poster-sphere poster-sphere-capability-small" />
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
