import { useCallback, useEffect, useRef, useState } from 'react'
import ProjectVisual from './ProjectVisual'
import { useOverlayHistory } from '../utils/navigation'
import { prefersReducedMotion } from '../motion/useMotionPreference'

const focusableSelector =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null)
  const returnFocusRef = useRef(null)
  const closeTimerRef = useRef(0)
  const closingRef = useRef(false)
  const [isClosing, setIsClosing] = useState(false)

  const requestClose = useCallback(() => {
    if (closingRef.current) return

    if (prefersReducedMotion()) {
      onClose()
      return
    }

    closingRef.current = true
    setIsClosing(true)
    closeTimerRef.current = window.setTimeout(() => {
      closingRef.current = false
      setIsClosing(false)
      onClose()
    }, 230)
  }, [onClose])

  useOverlayHistory(Boolean(project), requestClose, 'project-modal')

  useEffect(() => {
    if (!project) return undefined

    closingRef.current = false
    setIsClosing(false)

    return () => {
      window.clearTimeout(closeTimerRef.current)
    }
  }, [project])

  useEffect(() => {
    if (!project) return undefined

    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        requestClose()
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
  }, [project, requestClose])

  if (!project) return null

  const detailItems = [
    ['项目类型 / Platform', `${project.projectType} · ${project.platform}`],
    ['项目背景', project.background],
    ['我的职责', project.role],
    ['实际执行 / 工作流程', project.process],
    ['使用工具', project.tools],
    ['最终产出', project.deliverable],
    ['项目沉淀', project.takeaway],
  ]

  return (
    <div className={`project-modal-backdrop ${isClosing ? 'is-closing' : ''}`} onClick={requestClose}>
      <div
        aria-modal="true"
        className="project-modal glass-panel"
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <button className="project-modal-close" type="button" aria-label="关闭项目详情" onClick={requestClose}>
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
              <button className="project-modal-action" type="button" onClick={requestClose}>
                关闭详情
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
