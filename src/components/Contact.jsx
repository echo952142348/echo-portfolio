import { useEffect, useState } from 'react'
import ContactModal from './ContactModal'
import SectionAmbientScene from './SectionAmbientScene'
import ReferenceArtwork from './ReferenceArtwork'
import { contactEmail, copyEmailAddress, emailCopyFailureMessage, emailCopySuccessMessage } from '../utils/contact'

export default function Contact() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [copyMessage, setCopyMessage] = useState('')

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

  return (
    <section className="contact section-full" id="contact">
      <SectionAmbientScene variant="contact" />
      <ReferenceArtwork variant="contact" />
      <div className="contact-shell max-shell poster-page contact-page">
        <div className="contact-content poster-copy contact-copy">
          <p className="poster-kicker">联系我</p>
          <h2 className="poster-title">CONTACT</h2>
          <h3>
            让下一次交流，
            <br />
            从清晰开始。
          </h3>
          <p>
            如果你对我的项目、能力方向或后续合作感兴趣，可以通过下方预留方式联系我。
            当前页面仍在持续完善，更多真实作品与资料会陆续补充。
          </p>
          <div className="contact-actions">
            <button className="button primary" type="button" onClick={() => setIsContactModalOpen(true)}>
              联系我
            </button>
            <button className="contact-note" type="button" onClick={() => setIsContactModalOpen(true)}>
              微信：扫码添加
            </button>
          </div>
          <div className="contact-email">
            <a className="contact-email-link" href={`mailto:${contactEmail}`}>
              <span className="mail-icon" aria-hidden="true" />
              <strong>邮箱：</strong>
              <span>{contactEmail}</span>
            </a>
            <button className="contact-email-copy" type="button" onClick={handleCopyEmail}>
              复制
            </button>
            {copyMessage ? (
              <span className="contact-page-copy-toast" role="status" aria-live="polite">
                {copyMessage}
              </span>
            ) : null}
          </div>
        </div>

        <div className="contact-visual" aria-hidden="true">
          <span className="glass-building glass-building-back" />
          <span className="glass-building glass-building-front" />
          <span className="glass-band" />
          <span className="poster-sphere poster-sphere-contact" />
        </div>

        <div className="contact-panel glass-panel">
          <span className="contact-focus-label">可合作方向</span>
          <strong className="contact-focus-title">
            <span className="contact-focus-line">项目协作 / 内容整理</span>
            <span className="contact-focus-line">数据表达 / AI 效率实践</span>
          </strong>
          <p>
            保持开放，持续迭代，
            <br />
            把想法变成更清晰的作品。
          </p>
        </div>
      </div>

      <ContactModal open={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </section>
  )
}
