import { useEffect, useState } from 'react'
import ContactModal from './ContactModal'
import SectionAmbientScene from './SectionAmbientScene'
import ReferenceArtwork from './ReferenceArtwork'
import { contactEmail, copyEmailAddress, emailCopyFailureMessage, emailCopySuccessMessage } from '../utils/contact'
import GlassBackgroundMotion from '../motion/GlassBackgroundMotion'

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
      <GlassBackgroundMotion
        variant="contact"
        desktopMask="/motion-masks/contact-glass-desktop.svg"
        mobileMask="/motion-masks/contact-glass-mobile.svg"
      />
      <div className="contact-shell max-shell poster-page contact-page">
        <div className="contact-content poster-copy contact-copy">
          <p className="poster-kicker" data-motion="fade-in">联系我</p>
          <h2 className="poster-title" data-motion="mask-reveal" style={{ '--motion-delay-desktop': '65ms', '--motion-delay-mobile': '30ms' }}>CONTACT</h2>
          <h3 data-motion="contact-statement" style={{ '--motion-delay-desktop': '135ms', '--motion-delay-mobile': '70ms' }}>
            <span>让下一次交流，</span>
            <br />
            <span>从清晰开始。</span>
          </h3>
          <p data-motion="fade-in" style={{ '--motion-delay-desktop': '235ms', '--motion-delay-mobile': '120ms' }}>
            如果你正在寻找一位重视执行、细节与协同的电商运营候选人，欢迎通过下方方式联系我。
            当前求职方向为电商运营、店铺运营与商品运营，目标城市合肥。
          </p>
          <div className="contact-actions">
            <button className="button primary" data-motion="fade-up" style={{ '--motion-delay-desktop': '315ms', '--motion-delay-mobile': '170ms' }} type="button" onClick={() => setIsContactModalOpen(true)}>
              联系我
            </button>
            <button className="contact-note" data-motion="fade-up" style={{ '--motion-delay-desktop': '355ms', '--motion-delay-mobile': '205ms' }} type="button" onClick={() => setIsContactModalOpen(true)}>
              微信：扫码添加
            </button>
          </div>
          <div className="contact-email" data-motion="fade-up" style={{ '--motion-delay-desktop': '420ms', '--motion-delay-mobile': '245ms' }}>
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

        <div className="contact-panel glass-panel" data-motion="contact-panel" style={{ '--motion-delay-desktop': '520ms', '--motion-delay-mobile': '285ms' }}>
          <span className="contact-focus-label">求职信息 / CAREER FOCUS</span>
          <strong className="contact-focus-title">
            <span className="contact-focus-line">电商运营 / 店铺运营</span>
            <span className="contact-focus-line">商品运营</span>
          </strong>
          <dl className="contact-career-facts">
            <div><dt>目标城市</dt><dd>合肥</dd></div>
            <div><dt>当前状态</dt><dd>OPEN TO WORK</dd></div>
            <div><dt>工作经验</dt><dd>2+ YEARS</dd></div>
          </dl>
          <div className="contact-platforms">
            <span>PLATFORMS &amp; TOOLS</span>
            <ul aria-label="熟悉的平台与工具">
              {['淘宝', '1688', '抖店', '千牛', 'Excel', '微信', 'AI Tools'].map((tool) => <li key={tool}>{tool}</li>)}
            </ul>
          </div>
        </div>
      </div>

      <ContactModal open={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </section>
  )
}
