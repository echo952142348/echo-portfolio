import { useState } from 'react'
import ProjectModal from './ProjectModal'
import ProjectVisual from './ProjectVisual'

const projects = [
  {
    title: '个人主页视觉探索',
    description: '用于探索个人主页首屏结构、视觉层级和作品展示方式的页面练习。',
    role: '信息结构、视觉排版、页面节奏',
    highlight: '通过清晰的首屏表达，让访问者快速理解页面定位。',
    status: '占位项目，后续可替换为真实案例。',
    tags: ['网页设计', '品牌视觉', '界面表达'],
    visual: 'mockup',
  },
  {
    title: '内容整理工作流',
    description: '将零散素材、参考案例和待办信息整理成更容易复用的内容工作台。',
    role: '资料分类、结构梳理、输出规范',
    highlight: '让日常内容整理更有秩序，减少重复查找和沟通成本。',
    status: '占位项目，后续可替换为真实案例。',
    tags: ['运营', '内容整理', '工作流程'],
    visual: 'wall',
  },
  {
    title: '数据展示页面练习',
    description: '通过指标卡片、趋势图和说明模块，练习更清晰的数据表达方式。',
    role: '指标定义、页面布局、信息表达',
    highlight: '让数据页面更容易阅读，层级更清楚，视觉更轻盈。',
    status: '占位项目，后续可替换为真实案例。',
    tags: ['数据', '看板', '洞察'],
    visual: 'chart',
  },
  {
    title: 'AI 辅助创作流程',
    description: '围绕构思、生成、筛选和复盘，整理更高效的 AI 辅助创作流程。',
    role: '流程设计、提示词整理、效果评估',
    highlight: '把工具能力转化为更稳定、可复用的工作方法。',
    status: '占位项目，后续可替换为真实案例。',
    tags: ['AI 工具', '流程', '效率提升'],
    visual: 'nodes',
  },
]

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section className="section projects" id="projects">
      <div className="max-shell">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">精选项目</p>
            <h2>精选项目展示</h2>
          </div>
          <p>
            {/* TODO: 后续可根据真实项目替换为截图、链接、成果数据和过程说明。 */}
            先以 4 个通用项目搭建作品展示框架，呈现结构、节奏与视觉质感，后续可逐步替换为真实案例。
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project, index) => (
            <article className="project-card glass-panel" key={project.title}>
              {/* TODO: 后续可把 CSS 视觉占位替换为真实项目截图或封面图。 */}
              <ProjectVisual type={project.visual} label={`项目 0${index + 1}`} />
              <div className="project-body">
                <div className="tag-row">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <dl>
                  <div>
                    <dt>我的职责</dt>
                    <dd>{project.role}</dd>
                  </div>
                  <div>
                    <dt>项目亮点</dt>
                    <dd>{project.highlight}</dd>
                  </div>
                </dl>
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
