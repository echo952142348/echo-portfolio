import SectionAmbientScene from './SectionAmbientScene'

const strengths = [
  {
    title: '项目执行',
    text: '能够把复杂任务拆成清晰步骤，围绕目标稳定推进落地。',
  },
  {
    title: '内容整理',
    text: '擅长将零散信息整理成结构化内容，让表达更清楚。',
  },
  {
    title: '数据分析',
    text: '通过基础数据观察问题，辅助判断优化方向和执行重点。',
  },
  {
    title: '视觉审美',
    text: '关注页面层级、留白、配色和整体观感，提升内容质感。',
  },
  {
    title: '工具使用',
    text: '熟悉常用效率工具，提升资料整理、内容处理和执行效率。',
  },
  {
    title: '沟通协作',
    text: '能够围绕目标进行反馈、确认和推进，减少沟通成本。',
  },
  {
    title: '持续学习',
    text: '愿意持续学习新工具、新方法和新流程，保持成长状态。',
  },
  {
    title: 'AI 工具辅助效率提升',
    text: '使用 AI 辅助构思、整理、生成和优化内容，提高工作效率。',
  },
]

export default function Strengths() {
  return (
    <section className="section strengths" id="strengths">
      <SectionAmbientScene variant="strengths" />
      <div className="max-shell">
        <div className="section-heading">
          <p className="eyebrow">优势能力</p>
          <h2>个人优势与能力方向</h2>
        </div>

        <div className="strength-grid">
          {strengths.map((item, index) => (
            <article className={`strength-card strength-card-${String(index + 1).padStart(2, '0')}`} key={item.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              {/* TODO: 后续可将每项能力扩展为真实案例、工具栈或成果描述。 */}
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
