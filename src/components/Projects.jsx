import { useState } from 'react'
import ProjectModal from './ProjectModal'
import SectionAmbientScene from './SectionAmbientScene'
import ReferenceArtwork from './ReferenceArtwork'
import GlassBackgroundMotion from '../motion/GlassBackgroundMotion'

const projects = [
  {
    title: '男装批发商品上架与链接维护',
    cardTitle: '商品上架与链接维护',
    description: '商品上新、标题优化、主图维护，提升商品质量与曝光效率。',
    background:
      '围绕男装批发类目商品，完成日常商品链接上架、标题关键词整理、主图与详情页基础维护，并根据平台展示效果持续调整商品信息。',
    role: '负责商品基础信息整理、标题关键词梳理、主图与详情页维护、链接展示检查和日常更新记录。',
    process: '整理款式与规格信息 → 梳理标题关键词 → 维护主图与详情页内容 → 检查链接展示状态 → 根据反馈持续优化。',
    tools: '淘宝后台、抖店后台、千牛、Excel、Word、美图秀秀',
    takeaway: '沉淀出商品信息检查清单，让页面维护更规范，也减少标题、图片和详情信息遗漏。',
    tags: ['商品上架', '标题优化', '主图维护'],
    highlights: ['商品信息整理与标准化', '标题关键词优化思路', '页面维护与链接检查'],
    flow: ['LISTING', 'OPTIMIZE', 'MAINTAIN'],
    icon: 'bag',
    visual: 'listing',
  },
  {
    title: '店铺日常运营与订单协同流程',
    cardTitle: '店铺运营与订单协同',
    description: '店铺日常运营、客户沟通，订单处理及售后跟进。',
    background:
      '店铺日常运营涉及客户咨询、订单确认、售后反馈和发货库存对接，需要让信息在多个环节之间流转清楚、处理及时。',
    role: '负责客服接待、需求确认、订单处理、售后协同、发货库存对接和问题记录整理。',
    process: '接收客户咨询 → 确认款式与需求 → 跟进订单处理 → 对接发货与库存 → 记录售后反馈并持续跟进。',
    tools: '千牛、微信、淘宝后台、抖店后台、Excel',
    takeaway: '通过统一记录与节点跟进，让客户沟通、订单流转和售后反馈更有秩序，减少信息遗漏。',
    tags: ['客服沟通', '订单处理', '售后协同'],
    highlights: ['客户咨询与需求确认', '订单处理与发货对接', '售后问题跟进'],
    flow: ['ORDER', 'SERVICE', 'AFTER-SALES'],
    icon: 'store',
    visual: 'operations',
  },
  {
    title: '活动报名与流程执行',
    cardTitle: '活动报名与流程执行',
    description: '活动提报、素材准备、资源跟进，确保活动顺利落地执行。',
    background:
      '围绕店铺活动报名与执行配合，需要提前整理商品资料、核对活动要求、跟进执行节点，并在活动后整理复盘内容。',
    role: '参与活动报名资料整理、执行事项跟进、节点记录、问题反馈和复盘内容归纳。',
    process: '核对活动要求 → 准备商品资料 → 跟进报名与执行节点 → 记录执行问题 → 整理复盘与优化建议。',
    tools: '淘宝后台、抖店后台、Excel、Word、微信',
    takeaway: '把活动执行过程拆成清晰节点，帮助报名、资料准备、执行跟进和复盘整理更有条理。',
    tags: ['活动配合', '流程执行', '复盘整理'],
    highlights: ['活动资料准备', '执行节点跟进', '复盘内容整理'],
    flow: ['PLAN', 'EXECUTE', 'REVIEW'],
    icon: 'tag',
    visual: 'campaign',
  },
  {
    title: 'AI 辅助电商运营效率提升',
    cardTitle: 'AI 辅助运营效率提升',
    description: '借助 AI 工具优化日常工作，提升内容生产与运营效率。',
    background:
      '在日常电商运营中，尝试将 AI 工具用于标题思路、商品卖点、客服话术和表格内容整理，辅助提升资料整理效率。',
    role: '负责梳理使用场景、整理提示词、筛选输出内容，并结合实际运营需求进行人工优化。',
    process: '输入运营需求 → 生成标题或文案思路 → 人工筛选与调整 → 应用到商品维护、话术整理或表格归纳中。',
    tools: 'ChatGPT、Excel、Word、剪映、美图秀秀',
    takeaway: '把 AI 输出转化为可检查、可复用的整理方法，让日常运营资料处理更清晰、更高效。',
    tags: ['AI 工具', '文案整理', '效率提升'],
    highlights: ['AI 辅助标题与文案整理', '客服话术归纳', '工作流程提效'],
    flow: ['IDEA', 'AI TOOLS', 'OUTPUT'],
    icon: 'sparkle',
    visual: 'aiOps',
  },
]

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section className="section projects" id="projects">
      <SectionAmbientScene variant="projects" />
      <ReferenceArtwork variant="projects" />
      <GlassBackgroundMotion
        variant="projects"
        desktopMask="/motion-masks/projects-glass-desktop.svg"
        mobileMask="/motion-masks/projects-glass-mobile.svg"
      />
      <div className="max-shell poster-page projects-page">
        <div className="poster-copy projects-copy">
          <h2 className="poster-title">PROJECTS</h2>
          <p className="poster-kicker">项目作品</p>
          <span className="poster-rule" aria-hidden="true" />
          <h3>
            围绕电商运营核心流程，
            <br />
            持续沉淀可复用的方法与实践。
          </h3>
          <p>
            从商品到订单，从活动到效率，用执行力把每个环节做到更清晰、更可靠。
          </p>
        </div>

        <div className="project-grid poster-project-row">
          {projects.map((project, index) => (
            <article className="project-card glass-panel poster-project-card" key={project.title}>
              <span className={`poster-project-icon poster-project-icon-${project.icon}`} aria-hidden="true" />
              <div className="project-body">
                <span className="project-card-number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{project.cardTitle}</h3>
                <p>{project.description}</p>
                <div className="project-flow" aria-label={`${project.cardTitle}流程`}>
                  {project.flow.map((step, stepIndex) => (
                    <span key={step}>
                      {step}
                      {stepIndex < project.flow.length - 1 ? <i aria-hidden="true">→</i> : null}
                    </span>
                  ))}
                </div>
                <button
                  className="project-detail-link"
                  type="button"
                  onClick={() => setSelectedProject({ ...project, number: `项目 0${index + 1}` })}
                >
                  查看详情 <span aria-hidden="true">→</span>
                </button>
              </div>
            </article>
          ))}
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

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}
