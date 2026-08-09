import SectionAmbientScene from './SectionAmbientScene'
import ReferenceArtwork from './ReferenceArtwork'
import IconBadge from './IconBadge'
import GlassBackgroundMotion from '../motion/GlassBackgroundMotion'

const strengths = [
  {
    title: '商品运营',
    text: '围绕商品上新、标题、主图与链接，保持信息清晰规范。',
    icon: 'eye',
    tier: 'primary',
  },
  {
    title: '店铺运营',
    text: '处理店铺日常事项，让咨询、订单与维护稳定推进。',
    icon: 'tool',
    tier: 'primary',
  },
  {
    title: '活动执行',
    text: '整理活动资料与节点，配合报名、执行和复盘跟进。',
    icon: 'flag',
    tier: 'primary',
  },
  {
    title: '数据整理 / 数据分析',
    text: '完成基础数据整理与观察，为日常运营判断提供依据。',
    icon: 'pie',
    tier: 'primary',
  },
  {
    title: '客户沟通',
    text: '准确确认需求与问题，保持清楚、及时的沟通反馈。',
    icon: 'people',
    tier: 'supporting',
  },
  {
    title: '订单与售后协同',
    text: '衔接订单、发货库存与售后节点，减少信息遗漏。',
    icon: 'doc',
    tier: 'supporting',
  },
  {
    title: '内容整理',
    text: '梳理商品、活动与运营资料，让复杂信息更易使用。',
    icon: 'book',
    tier: 'supporting',
  },
  {
    title: 'AI 工具辅助',
    text: '用 AI 辅助标题、话术与资料归纳，并进行人工校验。',
    icon: 'ai',
    tier: 'supporting',
  },
]

export default function Strengths() {
  return (
    <section className="section strengths" id="strengths">
      <SectionAmbientScene variant="strengths" />
      <ReferenceArtwork variant="strengths" />
      <GlassBackgroundMotion
        variant="capabilities"
        desktopMask="/motion-masks/capabilities-glass-desktop.svg"
        mobileMask="/motion-masks/capabilities-glass-mobile.svg"
      />
      <div className="max-shell poster-page strengths-page">
        <div className="poster-copy strengths-copy">
          <h2 className="poster-title" data-motion="mask-reveal">CAPABILITIES</h2>
          <p className="poster-kicker" data-motion="fade-in" style={{ '--motion-delay-desktop': '65ms', '--motion-delay-mobile': '30ms' }}>能力体系</p>
          <span className="poster-rule" aria-hidden="true" data-motion="line-x" style={{ '--motion-delay-desktop': '95ms', '--motion-delay-mobile': '45ms' }} />
          <h3 data-motion="fade-up" style={{ '--motion-delay-desktop': '135ms', '--motion-delay-mobile': '70ms' }}>
            在实践中不断拓展与沉淀，
            <br />
            构建<span className="keep-phrase">可持续成长</span>的能力体系。
          </h3>
          <p data-motion="fade-in" style={{ '--motion-delay-desktop': '200ms', '--motion-delay-mobile': '105ms' }}>
            围绕电商运营核心场景，沉淀 08 项能力方向，持续提升执行效率与业务质量。
          </p>
        </div>

        <div className="capability-tier-labels" aria-hidden="true">
          <span>PRIMARY CAPABILITIES</span>
          <span>SUPPORTING SKILLS</span>
        </div>

        <div className="strength-grid capability-list">
          {strengths.map((item, index) => (
            <article
              className={`strength-card capability-item capability-item--${item.tier} strength-card-${String(index + 1).padStart(2, '0')}`}
              data-tier={item.tier}
              key={item.title}
              data-motion={index < 4 ? 'capability-row-left' : 'capability-row-right'}
              style={{
                '--motion-delay-desktop': `${280 + (index % 4) * 60 + (index >= 4 ? 35 : 0)}ms`,
                '--motion-delay-mobile': '20ms',
              }}
            >
              <span className="capability-number">{String(index + 1).padStart(2, '0')}</span>
              <IconBadge name={item.icon} className={`capability-icon capability-icon-${item.icon} capability-icon-badge`} />
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
        <div className="section-footer-meta" aria-hidden="true" data-motion="fade-up" style={{ '--motion-delay-desktop': '620ms', '--motion-delay-mobile': '25ms' }}>
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
