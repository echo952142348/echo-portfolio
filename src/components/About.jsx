import avatar from '../assets/avatar.jpg'

const stats = [
  { value: '3+', label: '项目经验' },
  { value: '5+', label: '技能方向' },
  { value: '100%', label: '持续学习' },
  { value: '多平台', label: '实践经验' },
]

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="max-shell">
        <div className="section-heading">
          <p className="eyebrow">关于我</p>
          <h2>个人经历与当前方向</h2>
        </div>

        <div className="about-layout">
          <div className="profile-card glass-panel">
            {/* TODO: 后续可替换为真实头像、个人标签或更完整的身份信息。 */}
            <div className="profile-orb">
              <img className="profile-avatar-image" src={avatar} alt="舒翔头像" />
            </div>
            <div className="profile-info">
              <p>个人档案</p>
              <h3>舒翔</h3>
              <span>作品 / 项目 / 能力</span>
            </div>
            <div className="profile-tags">
              <span>内容整理</span>
              <span>视觉表达</span>
              <span>工作流程</span>
            </div>
          </div>

          <div className="about-content glass-panel">
            {/* TODO: 后续替换为真实个人经历、岗位方向、项目背景。 */}
            <p>
              我正在搭建一个更系统的个人作品集，用来呈现项目成果、能力标签和阶段性成长。
              当前内容会先以通用占位为主，后续可以逐步替换为真实经历。
            </p>
            <p>
              页面重点不是罗列经历，而是用更清晰的结构展示做事方式、审美判断和持续实践的能力。
            </p>

            <div className="stats-grid">
              {stats.map((stat) => (
                <div className="stat-card" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
