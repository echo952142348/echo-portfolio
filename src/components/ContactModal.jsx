import { useEffect, useRef, useState } from 'react'
import wechatQr from '../assets/wechat-qr.png'
import { contactEmail, copyEmailAddress, emailCopyFailureMessage, emailCopySuccessMessage } from '../utils/contact'
import { useOverlayHistory } from '../utils/navigation'

const focusableSelector =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function ContactModal({ open, onClose }) {
  const [copyMessage, setCopyMessage] = useState('')
  const dialogRef = useRef(null)
  const returnFocusRef = useRef(null)

  useOverlayHistory(open, onClose, 'contact-modal')

  useEffect(() => {
    if (!open) return undefined

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

      window.setTimeout(() => {
        if (returnFocusRef.current && document.contains(returnFocusRef.current)) {
          returnFocusRef.current.focus({ preventScroll: true })
        }
      }, 0)
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) {
      setCopyMessage('')
    }
  }, [open])

  useEffect(() => {
    if (!copyMessage) return undefined

    const timer = window.setTimeout(() => {
      setCopyMessage('')
    }, 1800)

    return () => window.clearTimeout(timer)
  }, [copyMessage])

  const handleCopyEmail = async () => {
    try {
      await copyEmailAddress()
      setCopyMessage(emailCopySuccessMessage)
    } catch {
      setCopyMessage(emailCopyFailureMessage)
    }
  }

  if (!open) return null

  return (
    <div className="contact-modal-backdrop" onClick={onClose}>
      <div
        aria-modal="true"
        className="contact-modal glass-panel"
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <button className="contact-modal-close" type="button" aria-label="关闭联系弹窗" onClick={onClose}>
          ×
        </button>

        <div className="contact-modal-header">
          <span>联系方式</span>
          <h3>联系我</h3>
          <p>如果你对项目、能力方向或后续合作感兴趣，可以通过以下方式联系我。</p>
        </div>

        <dl className="contact-modal-list">
          <div className="contact-modal-qr-row">
            <dt>微信</dt>
            <dd>
              <figure className="wechat-qr-card">
                <figcaption>扫码添加微信</figcaption>
                <img src={wechatQr} alt="微信二维码" loading="lazy" decoding="async" />
                <p>添加时请备注：作品集</p>
              </figure>
            </dd>
          </div>
          <div>
            <dt>邮箱</dt>
            <dd className="contact-email-line">
              <span>{contactEmail}</span>
              <button type="button" onClick={handleCopyEmail}>
                复制
              </button>
            </dd>
            {copyMessage ? <p className="contact-copy-tip">{copyMessage}</p> : null}
          </div>
          <div>
            <dt>当前状态</dt>
            <dd>作品集仍在持续完善中</dd>
          </div>
        </dl>

        <div className="contact-modal-footer">
          <button className="contact-modal-action" type="button" onClick={onClose}>
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}
