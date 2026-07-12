import { useEffect, useRef } from 'react'
import ProjectVisual from './ProjectVisual'
import { useOverlayHistory } from '../utils/navigation'

const focusableSelector =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null)
  const returnFocusRef = useRef(null)

  useOverlayHistory(Boolean(project), onClose, 'project-modal')

  useEffect(() => {
    if (!project) return undefined

    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) {
        return
      }

      const focusable = Array.from(dialogRef.current.querySelectorAll(focusableSelector)).filter(
        (element) => element instanceof HTMLElement && !element.hasAttribute('disabled'),
      )

      if (focusable.length === 0) {
        event.preventDefault()
        dialogRef.current.focus({ preventScroll: true })
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus({ preventScroll: true })
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus({ preventScroll: true })
      }
    }

    const focusTimer = window.setTimeout(() => {
      const firstFocusable = dialogRef.current?.querySelector(focusableSelector)
      if (firstFocusable instanceof HTMLElement) {
        firstFocusable.focus({ preventScroll: true })
      } else {
        dialogRef.current?.focus({ preventScroll: true })
      }
    }, 0)

    document.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('modal-open')

    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('modal-open')

      if (returnFocusRef.current && document.contains(returnFocusRef.current)) {
        returnFocusRef.current.focus({ preventScroll: true })
      }
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
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
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
