import { useEffect } from 'react'
import ProjectVisual from './ProjectVisual'
import { useOverlayHistory } from '../utils/navigation'

export default function ProjectModal({ project, onClose }) {
  useOverlayHistory(Boolean(project), onClose, 'project-modal')

  useEffect(() => {
    if (!project) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('modal-open')

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('modal-open')
    }
  }, [project, onClose])

  if (!project) return null

  const detailItems = [
    ['项目背景', project.background],
    ['我的职责', project.role],
    ['工作流程', project.process],
    ['使用工具', project.tools],
    ['项目沉淀', project.takeaway],
  ]

  return (
    <div className="project-modal-backdrop" onClick={onClose}>
      <div
        aria-modal="true"
        className="project-modal glass-panel"
        role="dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="project-modal-close" type="button" aria-label="关闭项目详情" onClick={onClose}>
          ×
        </button>

        <div className="project-modal-layout">
          <div className="project-modal-visual">
            <ProjectVisual type={project.visual} label={project.number} variant="modal" />
          </div>

          <div className="project-modal-content">
            <div className="project-modal-header">
              <span>{project.number}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>

            <dl className="project-modal-grid project-modal-grid-ecommerce">
              {detailItems.map(([title, content]) => (
                <div key={title}>
                  <dt>{title}</dt>
                  <dd>{content}</dd>
                </div>
              ))}
            </dl>

            <div className="project-modal-tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <div className="project-modal-footer">
              <button className="project-modal-action" type="button" onClick={onClose}>
                关闭详情
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
