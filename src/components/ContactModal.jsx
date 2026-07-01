import { useEffect, useState } from 'react'
import wechatQr from '../assets/wechat-qr.png'
import { useOverlayHistory } from '../utils/navigation'

const email = '952142348@qq.com'

function copyTextFallback(text) {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.left = '-9999px'
  textarea.style.top = '0'
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()
  const copied = document.execCommand('copy')
  document.body.removeChild(textarea)

  if (!copied) {
    throw new Error('fallback copy failed')
  }
}

export default function ContactModal({ open, onClose }) {
  const [copyMessage, setCopyMessage] = useState('')

  useOverlayHistory(open, onClose, 'contact-modal')

  useEffect(() => {
    if (!open) return undefined

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
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(email)
        } catch {
          copyTextFallback(email)
        }
      } else {
        copyTextFallback(email)
      }

      setCopyMessage('邮箱已复制')
    } catch {
      setCopyMessage('复制失败，请手动复制')
    }
  }

  if (!open) return null

  return (
    <div className="contact-modal-backdrop" onClick={onClose}>
      <div
        aria-modal="true"
        className="contact-modal glass-panel"
        role="dialog"
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
              <span>{email}</span>
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
