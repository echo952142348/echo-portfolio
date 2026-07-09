import { useState } from 'react'
import ProjectModal from './ProjectModal'
import ProjectVisual from './ProjectVisual'
import SectionAmbientScene from './SectionAmbientScene'

const projects = [
  {
    title: '男装批发商品上架与链接维护',
    cardTitle: '商品上架与链接维护',
    description: '围绕商品信息、标题关键词、主图详情页和链接展示进行日常维护，让商品页面更清晰、规范。',
    background:
      '围绕男装批发类目商品，完成日常商品链接上架、标题关键词整理、主图与详情页基础维护，并根据平台展示效果持续调整商品信息。',
    role: '负责商品基础信息整理、标题关键词梳理、主图与详情页维护、链接展示检查和日常更新记录。',
    process:
      '整理款式与规格信息 → 梳理标题关键词 → 维护主图与详情页内容 → 检查链接展示状态 → 根据反馈持续优化。',
    tools: '淘宝后台、抖店后台、千牛、Excel、Word、美图秀秀',
    takeaway: '沉淀出商品信息检查清单，让页面维护更规范，也减少标题、图片和详情信息遗漏。',
    tags: ['商品上架', '标题优化', '主图维护'],
    highlights: ['商品信息整理与标准化', '标题关键词优化思路', '页面维护与链接检查'],
    visual: 'listing',
  },
  {
    title: '店铺日常运营与订单协同流程',
    cardTitle: '店铺运营与订单协同',
    description: '负责客户咨询、订单处理、售后跟进与发货库存对接，保障店铺日常运营稳定进行。',
    background:
      '店铺日常运营涉及客户咨询、订单确认、售后反馈和发货库存对接，需要让信息在多个环节之间流转清楚、处理及时。',
    role: '负责客服接待、需求确认、订单处理、售后协同、发货库存对接和问题记录整理。',
    process:
      '接收客户咨询 → 确认款式与需求 → 跟进订单处理 → 对接发货与库存 → 记录售后反馈并持续跟进。',
    tools: '千牛、微信、淘宝后台、抖店后台、Excel',
    takeaway: '通过统一记录与节点跟进，让客户沟通、订单流转和售后反馈更有秩序，减少信息遗漏。',
    tags: ['客服沟通', '订单处理', '售后协同'],
    highlights: ['客户咨询与需求确认', '订单处理与发货对接', '售后问题跟进'],
    visual: 'operations',
  },
  {
    title: '活动报名与流程执行',
    cardTitle: '活动报名与流程执行',
    description: '配合店铺活动报名，整理活动资料、执行节点和复盘内容，让活动推进过程更清晰。',
    background:
      '围绕店铺活动报名与执行配合，需要提前整理商品资料、核对活动要求、跟进执行节点，并在活动后整理复盘内容。',
    role: '参与活动报名资料整理、执行事项跟进、节点记录、问题反馈和复盘内容归纳。',
    process:
      '核对活动要求 → 准备商品资料 → 跟进报名与执行节点 → 记录执行问题 → 整理复盘与优化建议。',
    tools: '淘宝后台、抖店后台、Excel、Word、微信',
    takeaway: '把活动执行过程拆成清晰节点，帮助报名、资料准备、执行跟进和复盘整理更有条理。',
    tags: ['活动配合', '流程执行', '复盘整理'],
    highlights: ['活动资料准备', '执行节点跟进', '复盘内容整理'],
    visual: 'campaign',
  },
  {
    title: 'AI 辅助电商运营效率提升',
    cardTitle: 'AI 辅助运营效率提升',
    description: '尝试用 AI 辅助商品标题、卖点文案、客服话术和工作流程整理，提高日常运营效率。',
    background:
      '在日常电商运营中，尝试将 AI 工具用于标题思路、商品卖点、客服话术和表格内容整理，辅助提升资料整理效率。',
    role: '负责梳理使用场景、整理提示词、筛选输出内容、结合实际运营需求进行人工优化。',
    process:
      '输入运营需求 → 生成标题或文案思路 → 人工筛选与调整 → 应用到商品维护、话术整理或表格归纳中。',
    tools: 'ChatGPT、Excel、Word、剪映、美图秀秀',
    takeaway: '把 AI 输出转化为可检查、可复用的整理方法，让日常运营资料处理更清晰、更高效。',
    tags: ['AI 工具', '文案整理', '效率提升'],
    highlights: ['AI 辅助标题与文案整理', '客服话术归纳', '工作流程提效'],
    visual: 'aiOps',
  },
]

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section className="section projects" id="projects">
      <SectionAmbientScene variant="projects" />
      <div className="max-shell">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">精选项目</p>
            <h2>精选项目展示</h2>
          </div>
          <p>
            {/* TODO: 后续可继续补充真实过程截图、作品链接和更完整的复盘说明，注意隐藏客户与订单隐私。 */}
            围绕电商运营中的商品维护、订单协同、活动执行与 AI 辅助效率提升，呈现更贴近求职展示的项目经验。
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project, index) => (
            <article className="project-card glass-panel" key={project.title}>
              {/* TODO: 后续可把 CSS 视觉占位替换为真实项目截图或封面图。 */}
                <ProjectVisual type={project.visual} label={`项目 0${index + 1}`} />
              <div className="project-body">
                <span className="project-card-number">项目 0{index + 1}</span>
                <h3>{project.cardTitle}</h3>
                <p>{project.description}</p>
                <div className="tag-row">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <ul className="project-highlights" aria-label={`${project.cardTitle}项目亮点`}>
                  {project.highlights.slice(0, 2).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <button
                  className="project-detail-link"
                  type="button"
                  onClick={() => setSelectedProject({ ...project, number: `项目 0${index + 1}` })}
                >
                  查看详情 →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}
