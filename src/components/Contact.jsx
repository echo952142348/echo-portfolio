import { useState } from 'react'
import ContactModal from './ContactModal'

export default function Contact() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  return (
    <section className="contact section-full" id="contact">
      <div className="contact-shell max-shell">
        <div className="contact-content">
          <p className="eyebrow">联系我</p>
          <h2>
            <span>让下一次交流，</span>
            <span>从清晰开始。</span>
          </h2>
          {/* TODO: 后续可替换为更符合个人语气的结束语。 */}
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
            <span className="contact-note">邮箱：952142348@qq.com</span>
          </div>
        </div>

        <div className="contact-panel glass-panel">
          <span className="contact-focus-label">可合作方向</span>
          <strong className="contact-focus-title">
            <span className="contact-focus-line">项目协作 / 内容整理</span>
            <span className="contact-focus-line">数据表达 / AI 效率实践</span>
          </strong>
          {/* TODO: 后续可替换为城市、服务范围、社交媒体等公开信息。 */}
          <p>保持开放，持续迭代，把想法变成更清晰的作品。</p>
        </div>
      </div>

      <ContactModal open={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </section>
  )
}
